/* PDG website content — solo studio (Allen): Web, Logo & Brand, Video.
 * Services are organised into four tabs shown inline on the homepage.
 * Pricing strings are kept exactly as written; never converted to single prices. */
export const PDG_DATA = {
  studio: {
    name: "PDG Marketing Agency",
    owner: "",
    tagline: "Custom websites, logos, and video, designed and built from scratch.",
    email: "hello@pdgmarketingagency.com",
    site: "pdgmarketingagency.com",
    location: "For local businesses",
  },

  serviceTabs: [
    {
      key: "design",
      label: "Design",
      line: "websites",
      accent: "var(--teal-deep)",
      eyebrow: "Web design",
      headline: "Sites that make you look the part",
      intro: "Custom websites, built from scratch and never from a template. Fast, professional, and unmistakably yours. Designed to turn visitors into real leads.",
      faq: [
        { q: "How long does a website take?", a: "A Starter site is usually two to three weeks; a full Premium build runs four to six, depending on how fast content and feedback come back." },
        { q: "Do you write the copy too?", a: "Yes. Premium builds include copywriting and on-page SEO. For smaller sites, PDG polishes and structures whatever you provide." },
        { q: "What about a domain?", a: "If you already own a domain, PDG links it to your new site. If you don't, PDG helps you find and set one up, so you launch on the right web address either way." },
        { q: "Can I update it myself later?", a: "Yes. PDG builds on tools you can actually manage and walks you through editing text, images, and pages. Prefer hands off? A Website Care Plan covers the updates for you." },
        { q: "What do you need from me to start?", a: "Your goals, any brand assets or content you already have, and a few examples of sites you like. PDG handles the rest and tells you exactly what's needed at each step." },
        { q: "What happens after launch?", a: "You can take it from there, or stay on a Website Care Plan for hosting, updates, backups, and monthly edits." },
      ],
      groups: [
        {
          services: [
            { name: "Premium Business Website", price: "from $3,500", description: "Five to seven custom pages, copy, SEO, forms, analytics.", badge: "Flagship" },
            { name: "Starter Website", price: "from $1,800", description: "Three pages: home, about, contact. Clean and fast." },
            { name: "Landing Page", price: "from $900", description: "One high-converting page for a campaign or launch." },
            { name: "E-commerce / Booking Site", price: "from $5,500", description: "Online store or booking with payments built in." },
            { name: "Website Care Plan", price: "from $150/mo", description: "Hosting, updates, backups, and monthly edits." },
          ],
        },
      ],
    },

    {
      key: "logos",
      label: "Logos & Brand",
      line: "logos",
      accent: "var(--blue-deep)",
      eyebrow: "Logo & brand design",
      headline: "A mark you build everything on",
      intro: "From a clean starter logo to a complete identity system, designed around your business from the first sketch and delivered in every format you'll ever need.",
      faq: [
        { q: "Do I own the logo files?", a: "Completely. You receive full rights and every source file, so the mark is yours to use anywhere, forever." },
        { q: "What formats do I get?", a: "Everything you'll ever need: vector (SVG, AI, EPS), PNG and JPG in light and dark, plus favicon and social sizes." },
        { q: "Can you refresh an existing logo?", a: "Often, yes. If your current mark has good bones, PDG can modernize it rather than start over. If not, we build fresh." },
        { q: "How many concepts will I see?", a: "A focused set of directions, not a random pile. Then we refine the strongest one together until it feels right." },
        { q: "What is a brand identity system?", a: "More than a logo: colors, type, secondary marks, and usage rules, so everything you make looks like one business." },
        { q: "How long does branding take?", a: "A logo alone is about one to two weeks. A full identity system runs three to four, with time built in for review." },
      ],
      groups: [
        {
          services: [
            { name: "Essential Logo", price: "starting at $350", description: "A clean, professional mark with 2 concepts and final files." },
            { name: "Signature Logo", price: "starting at $750", description: "A developed identity with submark, palette, and usage sheet.", badge: "Most popular" },
            { name: "Premium Brand Identity", price: "starting at $1,500", description: "A complete visual identity system and brand guidelines." },
          ],
        },
      ],
    },

    {
      key: "video",
      label: "Video",
      line: "video",
      accent: "var(--violet)",
      eyebrow: "Video production",
      headline: "Content businesses actually use",
      intro: "Shot, edited, captioned, and ready to post. One shoot day becomes a month of content, built around how people actually watch and scroll.",
      faq: [
        { q: "What happens on a shoot day?", a: "PDG shows up, directs, and films everything in three to four hours on location. You just run your business while it gets captured." },
        { q: "How many videos do I get?", a: "The Monthly Content Package delivers six to ten short videos from a single shoot day, all edited and captioned for you." },
        { q: "Do you handle captions and sizing?", a: "Always. Every video comes captioned and exported in the right aspect ratios for Reels, TikTok, Shorts, and your site." },
        { q: "Can we start small?", a: "Yes. A Single Short-Form Video is the easiest, lowest-risk way to see what video does for you before committing monthly." },
      ],
      groups: [
        {
          services: [
            { name: "Monthly Content Package", price: "from $1,200/mo", description: "Six to ten short videos a month, one shoot day.", badge: "Most popular" },
            { name: "Brand Story Video", price: "from $1,200", description: "One cinematic 60 to 90 second film of your business." },
            { name: "Business / Property Walkthrough", price: "from $450", description: "A polished tour of a space or listing." },
            { name: "Single Short-Form Video", price: "from $250", description: "One Reel, TikTok, or Short. A good first test." },
            { name: "Half-Day Content Shoot", price: "from $600", description: "Three to four hours on location. Raw clips plus three edits." },
          ],
        },
      ],
    },

    {
      key: "packages",
      label: "Packages",
      line: "packages",
      accent: "var(--gold-deep)",
      eyebrow: "Bundles",
      headline: "Better together, one price",
      intro: "The services that work best side by side, combined into a single project. A website, a logo, and video that all speak the same language from day one.",
      groups: [
        {
          services: [
            { name: "The Launch Bundle", price: "from $2,600", description: "Starter website, essential logo, and one short-form video.", badge: "Most popular", combines: ["Website", "Logo", "Video"] },
            { name: "Brand + Web Bundle", price: "from $4,800", description: "A full brand identity paired with a premium website.", combines: ["Brand", "Website"] },
            { name: "Content Creator Bundle", price: "from $1,900/mo", description: "A signature logo plus a monthly content package.", combines: ["Logo", "Video"] },
            { name: "The Full Presence", price: "from $6,500", description: "Website, brand identity, and monthly video. The works.", badge: "Flagship", combines: ["Website", "Brand", "Video"] },
          ],
        },
      ],
    },
  ],

  work: {
    site: {
      url: "https://www.willlambley.com",
      host: "willlambley.com",
      shot: { key: "willlambleyHome", fallback: "/assets/work/willlambley-home.png" },
      title: "Will Lambley, Keynote Speaker & Podcast Host",
      blurb: "A full marketing site for a national keynote speaker: story-driven long-form layout, booking flow, and an embedded podcast. Designed and built end to end.",
      tags: ["Web design", "Development", "Brand"],
    },
    brand: {
      heading: "The Rise Above Podcast identity",
      primary: { key: "riseAboveHorizontalDark", fallback: "/assets/work/rise-above-horizontal-dark.jpg", alt: "The Rise Above Podcast horizontal logo, white on dark", label: "Primary lockup", bg: "#1a2129", ratio: "16 / 11" },
      light: { key: "riseAboveHorizontalLight", fallback: "/assets/work/rise-above-horizontal-light.jpg", alt: "The Rise Above Podcast horizontal logo, dark on light", label: "Light variant", bg: "#ffffff" },
      mark: { key: "riseAboveMarkDark", fallback: "/assets/work/rise-above-mark-dark.jpg", alt: "The Rise Above Podcast icon mark", label: "Icon mark", bg: "#1a2129" },
    },
    video: {
      heading: "Video & podcast production",
      intro: "Full editing and production, from long-form podcast episodes to short-form recap films.",
      items: [
        { caption: "The Rise Above Podcast with guest Ryan Silverfield, fully edited episode", youtube: "ihwkb3KQOrI" },
        { caption: "NWA Gives Rally Recap Video", placeholder: true },
      ],
    },
  },

  testimonials: {
    items: [
      { quote: "Working with PDG on my website was a great experience from start to finish. They were professional, responsive, and clearly knew what they were doing. They took the time to understand what I needed and delivered a site that exceeded my expectations. I'd recommend them to anyone looking for a team that takes their work seriously.", name: "Will Lambley", role: "The Rise Above Podcast", tone: "teal" },
    ],
  },

  serviceDetails: {
    "Premium Business Website": { summary: "The flagship build for businesses that want their website to do real work. Five to seven custom pages designed and developed from scratch, copywriting, on-page SEO, and connected forms and analytics so you can see what's working. Built to load fast and convert, never to look like a template.", includes: ["Five to seven custom designed pages", "Copywriting and on-page SEO", "Contact and lead capture forms", "Analytics and conversion tracking", "Mobile and speed optimization"] },
    "Starter Website": { summary: "A clean, fast three-page site for businesses that need to look credible and get found, without the full custom build. Perfect for a new business or a long overdue refresh, and still a custom design rather than an off-the-shelf theme.", includes: ["Home, about, and contact pages", "Custom design in your brand", "Mobile friendly and fast", "Basic SEO setup", "Contact form"] },
    "Landing Page": { summary: "One focused, high-converting page built around a single goal, like a campaign, launch, or promotion. Every element points toward one clear action so the traffic you send to it actually turns into leads.", includes: ["Single conversion focused page", "Custom design and copy", "Lead form or booking link", "Fast load and mobile ready", "Built for a specific campaign"] },
    "E-commerce / Booking Site": { summary: "A complete online store or booking system with payments built in, so customers can buy or book without ever leaving your site. Product or service setup, checkout, and connections to your payment and scheduling tools, all handled.", includes: ["Online store or booking flow", "Secure payment processing", "Product or service catalog setup", "Customer accounts and confirmations", "Inventory or calendar sync"] },
    "Website Care Plan": { summary: "Ongoing peace of mind after launch. Hosting, software updates, backups, and a set amount of monthly edits so your site stays fast, secure, and current without you ever thinking about it.", includes: ["Managed hosting", "Software and security updates", "Regular backups", "Monthly content edits", "Priority support"] },

    "Essential Logo": { summary: "A clean, professional logo built around your brand. Two initial concepts to choose from, two rounds of revisions to get it right, and final files delivered in PNG, JPG, and SVG. Ideal for new businesses that need a strong, simple mark to launch with.", includes: ["2 initial logo concepts", "2 rounds of revisions", "Final files in PNG, JPG, and SVG", "Different color variations", "Ideal for a fast, confident launch"] },
    "Signature Logo": { summary: "A fully developed logo identity with more creative range. Three initial concepts and unlimited revisions, plus primary and secondary logo versions, a submark, and a coordinated color palette. Final files in every standard format with a basic usage sheet. Best for businesses that want flexibility across web, print, and social.", includes: ["3 initial concepts, unlimited revisions", "Primary and secondary logo versions", "A submark for compact spaces", "Coordinated color palette", "All standard formats plus a usage sheet"] },
    "Premium Brand Identity": { summary: "A complete visual identity system. Everything in Signature plus typography selection, a full brand color system, logo variations for every use case, ready-made social assets, and a complete brand guidelines document. Built for businesses that want a polished, cohesive presence from day one.", includes: ["Everything in Signature", "Typography selection and color system", "Logo variations for every use case", "Social media asset pack", "Full brand guidelines document"] },

    "Monthly Content Package": { summary: "The easiest way to stay consistent on video. One shoot day a month becomes six to ten short, edited, captioned videos ready to post across your platforms. Shot planning, on-location filming, and delivery sized for each channel.", includes: ["One shoot day per month", "Six to ten short-form videos", "Editing, captions, and sizing", "Platform-ready exports", "Shot planning and direction"] },
    "Brand Story Video": { summary: "One cinematic 60 to 90 second film that tells the story of your business, the people behind it, and why customers choose you. The anchor piece for your homepage, ads, and socials.", includes: ["60 to 90 second finished film", "On-location shoot", "Interview and b-roll direction", "Music, color, and captions", "Multiple aspect ratios"] },
    "Business / Property Walkthrough": { summary: "A polished walkthrough that shows off a space or listing the way being there actually feels. Great for realtors, restaurants, gyms, venues, and any business where the space sells the experience.", includes: ["On-location shoot", "Smooth walkthrough footage", "Edit with music and captions", "Listing or social ready exports", "Quick turnaround"] },
    "Single Short-Form Video": { summary: "One Reel, TikTok, or Short, shot and edited start to finish. The easiest, lowest-risk way to see what video can do for you before committing to a monthly package.", includes: ["One short-form video", "Shoot and edit", "Captions and music", "Vertical platform export", "A simple first step"] },
    "Half-Day Content Shoot": { summary: "Three to four hours on location to capture a batch of content in one go. You walk away with the raw clips plus three finished edits, perfect for stocking up before a busy season.", includes: ["Three to four hours on location", "Raw clips delivered to you", "Three finished edits", "Captions and sizing", "Efficient batch capture"] },

    "The Launch Bundle": { summary: "Everything a new business needs to open its doors online, in one coordinated project. A clean three-page Starter Website, an Essential Logo, and one short-form video to announce yourself. All designed together so the look is consistent from the first day.", includes: ["Starter Website (3 pages)", "Essential Logo with final files", "One short-form launch video", "One consistent look across all three", "Bundled pricing vs. buying separately"] },
    "Brand + Web Bundle": { summary: "For businesses that want to look established from the start. A complete Premium Brand Identity paired with a Premium Business Website, designed as one system so your brand and your site speak exactly the same language.", includes: ["Premium Brand Identity system", "Premium Business Website (5 to 7 pages)", "Shared color, type, and voice", "Copywriting and on-page SEO", "Brand guidelines document"] },
    "Content Creator Bundle": { summary: "Build a brand and feed it every month. A Signature Logo up front, then an ongoing Monthly Content Package so you always have fresh, on-brand video to post. Ideal for personal brands and local businesses that live on social.", includes: ["Signature Logo identity", "Monthly Content Package (6 to 10 videos)", "One shoot day per month", "Captions and platform sizing", "Consistent branded look across posts"] },
    "The Full Presence": { summary: "The complete package: a Premium Business Website, a Premium Brand Identity, and a Monthly Content Package. Everything you need to look and sound like the best business in your market, built and maintained by one person who knows the whole picture.", includes: ["Premium Business Website", "Premium Brand Identity system", "Monthly Content Package", "One cohesive brand across web and video", "A single point of contact for all of it"] },
  },
};
