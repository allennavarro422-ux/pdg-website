import { Resend } from "resend";

// Where every booking is delivered.
const RECIPIENTS = ["megansarah003@gmail.com", "allen.navarro422@gmail.com"];
// Verified sender on your domain (set up in Resend). Falls back to Resend's
// shared onboarding sender if the domain isn't verified yet.
const FROM = process.env.BOOKING_FROM || "PDG Bookings <onboarding@resend.dev>";

const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(request) {
  try {
    const data = await request.json();
    const name = (data.name || "").trim();
    const email = (data.email || "").trim();

    // Minimal validation — name + a plausible email are required.
    if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return Response.json({ error: "Name and a valid email are required." }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      return Response.json({ error: "Email service not configured." }, { status: 500 });
    }
    const resend = new Resend(process.env.RESEND_API_KEY);

    const rows = [
      ["Name", name],
      ["Email", email],
      ["Business", data.business],
      ["Phone", data.phone],
      ["Service", data.service],
      ["Requested date", data.date],
      ["Requested time", data.time],
      ["Message", data.message],
    ].filter(([, v]) => v && String(v).trim());

    const html = `
      <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;margin:0 auto;color:#2C2C2A">
        <h2 style="margin:0 0 4px;font-size:20px">New booking request</h2>
        <p style="margin:0 0 18px;color:#6F6E68;font-size:14px">Submitted from pdgmarketingagency.com</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          ${rows
            .map(
              ([k, v]) =>
                `<tr>
                   <td style="padding:9px 12px;border:1px solid #eee;background:#faf6ee;font-weight:600;white-space:nowrap;vertical-align:top">${esc(k)}</td>
                   <td style="padding:9px 12px;border:1px solid #eee">${esc(v).replace(/\n/g, "<br>")}</td>
                 </tr>`
            )
            .join("")}
        </table>
      </div>`;

    const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

    const { error } = await resend.emails.send({
      from: FROM,
      to: RECIPIENTS,
      replyTo: email,
      subject: `New booking — ${name}${data.service ? ` · ${data.service}` : ""}`,
      html,
      text,
    });

    if (error) {
      return Response.json({ error: error.message || "Send failed." }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ error: "Unexpected error." }, { status: 500 });
  }
}
