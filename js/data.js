/* ============================================================
   MK REAL ESTATE — SITE DATA
   Edit contact details, commission and listings here.
   All listings below are SAMPLE listings (marked sample: true).
   Replace them with real, verified properties before launch.
   ============================================================ */

const SITE = {
  name: "MK Real Estate",
  short: "MK Real Estate",
  tagline: "Property Dealers",
  url: "https://mkrealestate.vercel.app",
  logo: "https://mkrealestate.vercel.app/logo.png",
  phone: "+92 315 5881733",
  phoneLocal: "0315-5881733",
  phone2: "+92 313 5820606",
  phone2Local: "0313-5820606",
  email: "ah5909931@gmail.com",
  // Commission (percent of the deal value). Agreed before each transaction.
  commission: { seller: 2.5, buyer: 1.5 },
  // Primary service areas (SEO priority)
  areas: ["Havelian", "Sultanpur", "Abbottabad", "Hazara Region"],
  // All service areas (incl. secondary)
  serviceAreas: ["Havelian", "Sultanpur", "Abbottabad", "Hazara", "Haripur", "Mansehra"],
  region: "Hazara, Khyber Pakhtunkhwa, Pakistan",
  portfolio: "https://muhammad-ayan-khan-opal.vercel.app/",
  social: {
    facebook: "",
    instagram: "",
    linkedin: ""
  }
};

const OWNERS = [
  {
    key: "ayan",
    name: "Muhammad Ayan Khan",
    first: "Ayan",
    role: "Co-Owner",
    phone: "0315-5881733",
    tel: "+923155881733",
    wa: "923155881733",
    bio: "Entrepreneur and web developer from Havelian. Founder of Kor Da and Pactum, and a published author. He brings a modern, tech-driven approach to property dealing and keeps every client conversation clear and quick."
  },
  {
    key: "haider",
    name: "Haider Ali Shah",
    first: "Haider",
    role: "Co-Owner",
    phone: "0313-5820606",
    tel: "+923135820606",
    wa: "923135820606",
    bio: "Co-owner of MK Real Estate, helping buyers and sellers with property deals, site visits and negotiation across the Hazara region."
  }
];

const IMAGE = {
  hero: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1600&auto=format&fit=crop",
  plot: "https://images.unsplash.com/photo-1529147688730-3e0d079e9c02?q=80&w=900&auto=format&fit=crop",
  house: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=900&auto=format&fit=crop",
  commercial: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=900&auto=format&fit=crop",
  agricultural: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=900&auto=format&fit=crop",
  apartment: "https://images.unsplash.com/photo-1502672260266-1c1ef1d79d6d?q=80&w=900&auto=format&fit=crop",
  blog1: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=900&auto=format&fit=crop",
  blog2: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=900&auto=format&fit=crop",
  blog3: "https://images.unsplash.com/photo-1541888946425-d81bb19940f6?q=80&w=900&auto=format&fit=crop",
  blog4: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=900&auto=format&fit=crop",
  blog5: "https://images.unsplash.com/photo-1589829085417-564925afcf4a?q=80&w=900&auto=format&fit=crop",
  blog6: "https://images.unsplash.com/photo-1595828775279-f7d9502942c9?q=80&w=900&auto=format&fit=crop",
  blog7: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=900&auto=format&fit=crop",
  blog8: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=900&auto=format&fit=crop",
  blog9: "https://images.unsplash.com/photo-1556912116-1a0d78160671?q=80&w=900&auto=format&fit=crop",
  blog10: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=900&auto=format&fit=crop",
  blog11: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=900&auto=format&fit=crop",
  blog12: "https://images.unsplash.com/photo-1529147688730-3e0d079e9c02?q=80&w=900&auto=format&fit=crop"
};

/* LISTINGS — managed via Decap CMS, stored as individual JSON files in data/properties/
   Fetched asynchronously by main.js and exposed as window.PROPERTIES.
   Do not edit this array directly — use the CMS admin at /admin/.
*/

function findProperty(idOrSlug){
  return (window.PROPERTIES || []).find(p => p.id === idOrSlug || p.slug === idOrSlug);
}

/* ---------- Price formatting (Pakistani convention) ---------- */
// 1 Lac = 100,000 PKR
// 1 Crore = 10,000,000 PKR
function formatNumber(n){
  return n.toFixed(2).replace(/\.?0+$/, "");
}

function formatPrice(pkr, purpose){
  if (typeof pkr !== "number" || isNaN(pkr)) return "Price on request";
  if (purpose === "Rent") {
    return "PKR " + pkr.toLocaleString("en-PK") + " / month";
  }
  if (pkr >= 10000000) {
    return "PKR " + formatNumber(pkr / 10000000) + " Crore";
  }
  if (pkr >= 100000) {
    return "PKR " + formatNumber(pkr / 100000) + " Lac";
  }
  return "PKR " + pkr.toLocaleString("en-PK");
}

function formatPricePerMarla(pricePerMarla){
  if (typeof pricePerMarla !== "number" || isNaN(pricePerMarla)) return null;
  if (pricePerMarla >= 100000) {
    return "PKR " + formatNumber(pricePerMarla / 100000) + " Lac / Marla";
  }
  return "PKR " + pricePerMarla.toLocaleString("en-PK") + " / Marla";
}

function formatArea(area, unit){
  if (area === null || area === undefined || unit === null || unit === undefined) return "Area not specified";
  return area + " " + unit;
}

function calculatePricePerMarla(price, area, unit){
  if (typeof price !== "number" || isNaN(price)) return null;
  if (area === null || area === undefined || unit === null || unit === undefined) return null;
  if (unit === "Marla") {
    return price / area;
  }
  if (unit === "Kanal") {
    return price / (area * 20);
  }
  return null;
}

/* LOCATIONS — dedicated local SEO landing pages */
const LOCATIONS = [
  {
    key: "havelian",
    url: "property-dealer-havelian/",
    name: "Havelian",
    h1: "Property Dealer in Havelian",
    title: "Property Dealer in Havelian | MK Real Estate | Houses & Plots for Sale",
    description: "Looking for a property dealer in Havelian? MK Real Estate helps you buy and sell houses, residential plots, commercial property and land in Havelian, Pakistan. Contact us on WhatsApp.",
    keywords: ["property dealer in Havelian", "real estate agent in Havelian", "houses for sale in Havelian", "plots for sale in Havelian", "land for sale in Havelian", "commercial property in Havelian", "real estate investment in Havelian", "property prices in Havelian", "best property dealers in Havelian", "buy property in Havelian Pakistan"],
    intro: "MK Real Estate is a trusted property dealer in Havelian, serving buyers, sellers and investors across the town and surrounding housing schemes. We deal in residential plots, houses, commercial property and agricultural land.",
    areas: ["Havelian", "Housing schemes Havelian", "Main Bazar Havelian"],
    faq: [
      {q:"What types of property are available in Havelian?",a:"Residential plots, houses, commercial shops and agricultural land are available in Havelian and surrounding housing schemes."},
      {q:"How can I contact a property dealer in Havelian?",a:"You can message MK Real Estate on WhatsApp or call Muhammad Ayan Khan at 0315-5881733 or Haider Ali Shah at 0313-5820606."},
      {q:"Are there plots for sale in Havelian?",a:"Yes. MK Real Estate lists residential plots in Havelian including corner plots and main road locations. Contact us for current availability."}
    ]
  },
  {
    key: "sultanpur",
    url: "real-estate-sultanpur/",
    name: "Sultanpur",
    h1: "Real Estate in Sultanpur | Property Dealer Near Havelian",
    title: "Real Estate in Sultanpur | MK Real Estate | Plots & Houses for Sale",
    description: "Real estate in Sultanpur near Havelian. Explore plots, houses and commercial property for sale in Sultanpur with MK Real Estate. Local property experts in the Hazara region.",
    keywords: ["property dealer in Sultanpur Havelian", "real estate in Sultanpur", "plots for sale in Sultanpur", "houses for sale in Sultanpur", "land for sale in Sultanpur", "commercial property in Sultanpur", "property prices in Sultanpur", "investment opportunities in Sultanpur", "property for sale near Havelian"],
    intro: "Sultanpur, near Havelian, is a growing residential and commercial market. MK Real Estate helps buyers and sellers find plots, houses, shops and land in Sultanpur and nearby areas.",
    areas: ["Sultanpur", "Sultanpur Havelian", "Main Bazar Sultanpur"],
    faq: [
      {q:"What types of property are available in Sultanpur?",a:"Residential plots, houses, commercial shops and agricultural land are available in Sultanpur near Havelian."},
      {q:"How can I contact a property dealer in Sultanpur?",a:"You can message MK Real Estate on WhatsApp or call Muhammad Ayan Khan at 0315-5881733 or Haider Ali Shah at 0313-5820606."},
      {q:"Are there plots for sale in Sultanpur?",a:"Yes. MK Real Estate lists residential plots in Sultanpur. Contact us for current availability and pricing."}
    ]
  },
  {
    key: "abbottabad",
    url: "property-dealer-abbottabad/",
    name: "Abbottabad",
    h1: "Property Dealer in Abbottabad | Real Estate Agents & Listings",
    title: "Property Dealer in Abbottabad | MK Real Estate | Houses, Plots & Commercial",
    description: "Property dealer in Abbottabad. MK Real Estate offers houses, plots, commercial property and agricultural land for sale in Abbottabad. Contact our local real estate agents.",
    keywords: ["property dealer in Abbottabad", "real estate agents in Abbottabad", "houses for sale in Abbottabad", "plots for sale in Abbottabad", "commercial property in Abbottabad", "agricultural land for sale in Abbottabad", "property investment in Abbottabad", "best real estate agency in Abbottabad", "property prices in Abbottabad"],
    intro: "Abbottabad is one of the fastest-growing real estate markets in the Hazara region. MK Real Estate is a local property dealer helping clients buy and sell houses, residential plots, commercial shops and agricultural land in Abbottabad.",
    areas: ["Abbottabad City", "Main Road Abbottabad", "Residential schemes Abbottabad"],
    faq: [
      {q:"What types of property are available in Abbottabad?",a:"Houses, residential plots, commercial shops and agricultural land are available in Abbottabad."},
      {q:"How can I contact a property dealer in Abbottabad?",a:"You can message MK Real Estate on WhatsApp or call Muhammad Ayan Khan at 0315-5881733 or Haider Ali Shah at 0313-5820606."},
      {q:"Is Abbottabad good for real estate investment?",a:"Abbottabad is one of the fastest-growing real estate markets in the Hazara region with steady demand for residential and commercial property."}
    ]
  },
  {
    key: "hazara",
    url: "real-estate-hazara/",
    name: "Hazara Region",
    h1: "Real Estate in Hazara Pakistan | Property Dealers & Land for Sale",
    title: "Real Estate in Hazara | MK Real Estate | Property Dealers in Hazara",
    description: "Real estate in Hazara, Pakistan. MK Real Estate — property dealers in Hazara offering land, houses and plots for sale across the Hazara region including Haripur and Mansehra.",
    keywords: ["real estate in Hazara Pakistan", "property dealers in Hazara", "land for sale in Hazara", "investment property in Hazara", "houses for sale in Hazara region", "property dealers in Haripur", "real estate in Mansehra"],
    intro: "The Hazara region of Khyber Pakhtunkhwa offers strong real estate opportunities — from residential plots in Abbottabad to agricultural land across Haripur and Mansehra. MK Real Estate operates across the region.",
    areas: ["Hazara Region", "Haripur", "Mansehra", "Abbottabad"],
    faq: [
      {q:"What types of property are available in Hazara?",a:"Residential plots, houses, commercial property and agricultural land are available across the Hazara region including Abbottabad, Haripur and Mansehra."},
      {q:"How can I contact a property dealer in Hazara?",a:"You can message MK Real Estate on WhatsApp or call Muhammad Ayan Khan at 0315-5881733 or Haider Ali Shah at 0313-5820606."},
      {q:"Is there agricultural land for sale in Hazara?",a:"Yes. MK Real Estate lists agricultural land across the Hazara region. Contact us for current availability."}
    ]
  },
  {
    key: "haripur",
    url: "real-estate-haripur/",
    name: "Haripur",
    h1: "Real Estate in Haripur | Property Dealers & Land for Sale",
    title: "Real Estate in Haripur | MK Real Estate | Plots, Houses & Land",
    description: "Real estate in Haripur. MK Real Estate — property dealers offering plots, houses, commercial property and agricultural land for sale in Haripur, Hazara region.",
    keywords: ["property dealers in Haripur", "real estate in Haripur", "plots for sale in Haripur", "houses for sale in Haripur", "land for sale in Haripur", "commercial property Haripur", "property investment Haripur"],
    intro: "Haripur is a key market in the Hazara region. MK Real Estate helps buyers and sellers with plots, houses, shops and agricultural land in Haripur and surrounding areas.",
    areas: ["Haripur City", "Khanpur", "Hazarduari"],
    faq: [
      {q:"What types of property are available in Haripur?",a:"Plots, houses, commercial property and agricultural land are available in Haripur and surrounding areas."},
      {q:"How can I contact a property dealer in Haripur?",a:"You can message MK Real Estate on WhatsApp or call Muhammad Ayan Khan at 0315-5881733 or Haider Ali Shah at 0313-5820606."},
      {q:"Are there plots for sale in Haripur?",a:"Yes. MK Real Estate lists residential plots in Haripur. Contact us for current availability."}
    ]
  },
  {
    key: "mansehra",
    url: "real-estate-mansehra/",
    name: "Mansehra",
    h1: "Real Estate in Mansehra | Property Dealers & Houses for Sale",
    title: "Real Estate in Mansehra | MK Real Estate | Plots, Houses & Land",
    description: "Real estate in Mansehra. MK Real Estate — property dealers offering plots, houses, commercial property and agricultural land for sale in Mansehra, Hazara region, Pakistan.",
    keywords: ["real estate in Mansehra", "property dealers in Mansehra", "plots for sale in Mansehra", "houses for sale in Mansehra", "land for sale in Mansehra", "commercial property Mansehra", "property investment Mansehra"],
    intro: "Mansehra is a growing city in the Hazara region with strong demand for residential plots, houses and commercial property. MK Real Estate serves buyers, sellers and investors across Mansehra.",
    areas: ["Mansehra City", "Balakot Road", "Shinkiari"],
    faq: [
      {q:"What types of property are available in Mansehra?",a:"Residential plots, houses, commercial property and agricultural land are available in Mansehra and surrounding localities."},
      {q:"How can I contact a property dealer in Mansehra?",a:"You can message MK Real Estate on WhatsApp or call Muhammad Ayan Khan at 0315-5881733 or Haider Ali Shah at 0313-5820606."},
      {q:"Are there houses for sale in Mansehra?",a:"Yes. MK Real Estate lists houses in Mansehra. Contact us for current availability."}
    ]
  }
];

function findLocation(key){
  return LOCATIONS.find(l => l.key === key);
}

/* BLOG — 10 SEO-focused articles */
const BLOG = [
  {
    slug: "complete-guide-buying-property-havelian-abbottabad",
    title: "Complete Guide to Buying Property in Havelian, Abbottabad",
    image: IMAGE.blog1,
    author: "Muhammad Ayan Khan",
    date: "2026-11-10",
    updated: "2026-11-10",
    excerpt: "A step-by-step guide for buyers looking at houses, plots and commercial property in Havelian and Abbottabad — from budgeting to registry.",
    content: `<p>Buying property in Havelian or Abbottabad is a major decision. Whether you are looking for a 5 Marla plot, a family house or a commercial shop, this guide walks you through the process step by step.</p>
<h2>1. Define Your Budget and Purpose</h2>
<p>Start by deciding how much you can invest and what you want — a home to live in, a plot to build on, or a commercial property for business. Prices in Havelian and Abbottabad vary by area, road access and development stage.</p>
<h2>2. Choose the Right Location</h2>
<p>Location drives both livability and resale value. In Havelian, plots near the main bazar and developed housing schemes are in demand. In Abbottabad, main-road and established residential zones hold value well.</p>
<h2>3. Verify Ownership Documents</h2>
<p>Never hand over money before verifying the property's ownership documents, registry (fard), and that there are no disputes or dues. We guide clients through document checks at every step.</p>
<h2>4. Site Visit and Negotiation</h2>
<p>Always visit the site before deciding. Check road access, water, electricity and the neighbourhood. Once satisfied, we help negotiate a fair price with the seller.</p>
<h2>5. Agreement and Registry</h2>
<p>After agreement, the deal moves to stamp paper and registry at the relevant sub-registrar office. We assist with paperwork so the transfer is clean and legal.</p>
<div class="note">Document requirements and registry fees change over time. Confirm current rates and procedures with the local sub-registrar office or a legal adviser before proceeding.</div>
<h2>Frequently Asked Questions</h2>
<h3>Can overseas Pakistanis buy property in Havelian or Abbottabad?</h3>
<p>Yes. Overseas Pakistanis can buy property in Pakistan. We recommend completing document verification and registry through a trusted local representative.</p>
<h3>What types of property are available in Havelian?</h3>
<p>Residential plots, houses, commercial shops and agricultural land are commonly available in and around Havelian.</p>
<h3>How can MK Real Estate help me buy?</h3>
<p>We shortlist verified options based on your budget, arrange site visits, support negotiation and guide you through documentation.</p>`,
    faq: [
      {q:"Can overseas Pakistanis buy property in Havelian or Abbottabad?",a:"Yes. Overseas Pakistanis can buy property in Pakistan. We recommend completing document verification and registry through a trusted local representative."},
      {q:"What types of property are available in Havelian?",a:"Residential plots, houses, commercial shops and agricultural land are commonly available in and around Havelian."},
      {q:"How can MK Real Estate help me buy?",a:"We shortlist verified options based on your budget, arrange site visits, support negotiation and guide you through documentation."}
    ],
    related: ["best-areas-buy-residential-plots-sultanpur", "property-investment-opportunities-abbottabad"]
  },
  {
    slug: "best-areas-buy-residential-plots-sultanpur",
    title: "Best Areas to Buy Residential Plots in Sultanpur",
    image: IMAGE.blog2,
    author: "Haider Ali Shah",
    date: "2026-10-28",
    updated: "2026-10-28",
    excerpt: "Discover the best localities for residential plots in Sultanpur near Havelian, with insight on road access, amenities and investment potential.",
    content: `<p>Sultanpur, near Havelian, is emerging as a preferred locality for residential plots. Buyers looking for affordable plots with growth potential often start their search here.</p>
<h2>What Makes a Plot Location Good?</h2>
<p>We look at road access, proximity to markets and schools, water and electricity availability, and whether the area is a developed or developing housing scheme.</p>
<h2>Popular Areas in Sultanpur</h2>
<p>Plots near the main bazar and along the main road offer commercial convenience and strong footfall. Interior residential lanes suit buyers seeking quieter, family-oriented locations.</p>
<h2>Investment Considerations</h2>
<p>Plot prices in Sultanpur are generally more accessible than in Abbottabad, making them attractive for first-time buyers and investors. Always verify registry and land status before purchase.</p>
<h2>Frequently Asked Questions</h2>
<h3>Are plots in Sultanpur good for investment?</h3>
<p>Sultanpur plots can be a sound long-term investment due to proximity to Havelian and ongoing area development. Verify documentation before buying.</p>
<h3>How do I check if a plot in Sultanpur is registered?</h3>
<p>Ask for the fard and ownership documents, then verify them at the local land record / sub-registrar office. We assist clients with this verification.</p>`,
    faq: [
      {q:"Are plots in Sultanpur good for investment?",a:"Sultanpur plots can be a sound long-term investment due to proximity to Havelian and ongoing area development. Verify documentation before buying."},
      {q:"How do I check if a plot in Sultanpur is registered?",a:"Ask for the fard and ownership documents, then verify them at the local land record / sub-registrar office. We assist clients with this verification."}
    ],
    related: ["complete-guide-buying-property-havelian-abbottabad", "things-check-before-buying-land-havelian"]
  },
  {
    slug: "property-investment-opportunities-abbottabad",
    title: "Property Investment Opportunities in Abbottabad",
    image: IMAGE.blog3,
    author: "Muhammad Ayan Khan",
    date: "2026-10-20",
    updated: "2026-10-20",
    excerpt: "Why Abbottabad is a strong real estate investment market — residential plots, houses, commercial property and agricultural land.",
    content: `<p>Abbottabad combines a pleasant climate, growing infrastructure and steady housing demand, making it one of the Hazara region's most active property investment markets.</p>
<h2>Investment Options in Abbottabad</h2>
<ul>
<li><strong>Residential plots</strong> in established and emerging housing schemes for long-term appreciation.</li>
<li><strong>Houses</strong> for end-use or rental income in family neighbourhoods.</li>
<li><strong>Commercial property</strong> — shops and buildings on main roads with business footfall.</li>
<li><strong>Agricultural land</strong> on the outskirts for farming or future development.</li>
</ul>
<h2>What Drives Value?</h2>
<p>Proximity to the main road, commercial centres, schools and hospitals typically supports stronger prices and easier resale in Abbottabad.</p>
<h2>Frequently Asked Questions</h2>
<h3>Is Abbottabad good for real estate investment?</h3>
<p>Abbottabad's climate, location and steady demand make it a well-regarded investment market in the Hazara region. Returns depend on location, property type and holding period.</p>
<h3>Do you provide agricultural land in Abbottabad?</h3>
<p>Yes. We list agricultural land options in and around Abbottabad. Contact us with your requirements.</p>`,
    faq: [
      {q:"Is Abbottabad good for real estate investment?",a:"Abbottabad's climate, location and steady demand make it a well-regarded investment market in the Hazara region. Returns depend on location, property type and holding period."},
      {q:"Do you provide agricultural land in Abbottabad?",a:"Yes. We list agricultural land options in and around Abbottabad. Contact us with your requirements."}
    ],
    related: ["complete-guide-buying-property-havelian-abbottabad", "complete-guide-buying-house-abbottabad"]
  },
  {
    slug: "things-check-before-buying-land-havelian",
    title: "Things to Check Before Buying Land in Havelian",
    image: IMAGE.blog4,
    author: "Haider Ali Shah",
    date: "2026-10-14",
    updated: "2026-10-14",
    excerpt: "A checklist for land buyers in Havelian — documents, road access, utilities and legal verification.",
    content: `<p>Buying land in Havelian requires careful checks before any payment. Use this checklist to avoid common pitfalls.</p>
<h2>Document Checklist</h2>
<ul>
<li>Original ownership documents (fard / registry)</li>
<li>Seller's CNIC and proof of ownership</li>
<li>No-Objection Certificate (where applicable)</li>
<li>Verification that there are no disputes, dues or encumbrances</li>
</ul>
<h2>Physical Checks</h2>
<ul>
<li>Visit the site and confirm boundaries</li>
<li>Check road access and width</li>
<li>Confirm water and electricity availability</li>
<li>Assess flood or drainage risk in the area</li>
</ul>
<h2>Frequently Asked Questions</h2>
<h3>What document proves land ownership in Pakistan?</h3>
<p>The fard (record of rights) and registered sale deed are the primary documents. Verify them at the local land record office.</p>
<h3>Should I visit the land before buying?</h3>
<p>Always. A site visit confirms access, boundaries, neighbourhood and utilities — things photos cannot show.</p>`,
    faq: [
      {q:"What document proves land ownership in Pakistan?",a:"The fard (record of rights) and registered sale deed are the primary documents. Verify them at the local land record office."},
      {q:"Should I visit the land before buying?",a:"Always. A site visit confirms access, boundaries, neighbourhood and utilities — things photos cannot show."}
    ],
    related: ["complete-guide-buying-property-havelian-abbottabad", "understanding-property-registry-pakistan"]
  },
  {
    slug: "understanding-property-registry-pakistan",
    title: "Understanding Property Registry and Ownership Documents in Pakistan",
    image: IMAGE.blog5,
    author: "Muhammad Ayan Khan",
    date: "2026-10-05",
    updated: "2026-10-05",
    excerpt: "A plain-language overview of fard, sale deed, stamp paper and the registry process for property buyers in Havelian, Sultanpur and Abbottabad.",
    content: `<p>Property registry in Pakistan transfers legal ownership from seller to buyer. Here is what buyers and sellers in Havelian, Sultanpur and Abbottabad should know.</p>
<h2>Key Documents</h2>
<ul>
<li><strong>Fard</strong> — the record of rights showing current ownership.</li>
<li><strong>Sale deed / registry</strong> — the registered document that transfers ownership.</li>
<li><strong>Stamp paper</strong> — the agreement executed on appropriate stamp duty.</li>
<li><strong>CNIC copies</strong> of buyer and seller, plus witnesses.</li>
</ul>
<h2>How Registry Works</h2>
<p>After agreement, the parties execute a sale deed on stamp paper and appear before the sub-registrar to register the transfer. Fees and stamp duty vary by province and property value.</p>
<h2>Frequently Asked Questions</h2>
<h3>How long does property registry take?</h3>
<p>Timelines vary by office and document completeness. Once documents are in order, registration at the sub-registrar office is typically completed within days to a few weeks.</p>
<h3>Can MK Real Estate handle registry paperwork?</h3>
<p>We guide clients through the process and coordinate with document writers and the sub-registrar office. We are not a law firm; for legal advice, consult a qualified legal adviser.</p>`,
    faq: [
      {q:"How long does property registry take?",a:"Timelines vary by office and document completeness. Once documents are in order, registration at the sub-registrar office is typically completed within days to a few weeks."},
      {q:"Can MK Real Estate handle registry paperwork?",a:"We guide clients through the process and coordinate with document writers and the sub-registrar office. We are not a law firm; for legal advice, consult a qualified legal adviser."}
    ],
    related: ["things-check-before-buying-land-havelian", "complete-guide-buying-property-havelian-abbottabad"]
  },
  {
    slug: "residential-vs-commercial-hazara",
    title: "Residential vs Commercial Property Investment in Hazara",
    image: IMAGE.blog6,
    author: "Haider Ali Shah",
    date: "2026-09-27",
    updated: "2026-09-27",
    excerpt: "Comparing residential plots and houses with commercial shops and buildings for investors in Abbottabad, Haripur and Mansehra.",
    content: `<p>Investors in the Hazara region often choose between residential and commercial property. Each serves a different goal.</p>
<h2>Residential Property</h2>
<p>Plots and houses suit end-users and long-term investors. Demand is driven by families, and resale is usually straightforward in established neighbourhoods across Abbottabad, Haripur and Mansehra.</p>
<h2>Commercial Property</h2>
<p>Shops and buildings on main roads can generate rental income from businesses. They typically require higher capital and depend on commercial footfall and local business activity.</p>
<h2>Frequently Asked Questions</h2>
<h3>Which is better — residential or commercial?</h3>
<p>It depends on your budget and goal. Residential is often simpler for first-time investors; commercial can offer rental yield but carries different risks.</p>
<h3>Where is commercial property available in Hazara?</h3>
<p>Main-road locations in Abbottabad, Haripur and Mansehra commonly have commercial shops and buildings available.</p>`,
    faq: [
      {q:"Which is better — residential or commercial?",a:"It depends on your budget and goal. Residential is often simpler for first-time investors; commercial can offer rental yield but carries different risks."},
      {q:"Where is commercial property available in Hazara?",a:"Main-road locations in Abbottabad, Haripur and Mansehra commonly have commercial shops and buildings available."}
    ],
    related: ["property-investment-opportunities-abbottabad", "best-areas-buy-residential-plots-sultanpur"]
  },
  {
    slug: "complete-guide-buying-house-abbottabad",
    title: "Complete Guide to Buying a House in Abbottabad",
    image: IMAGE.blog7,
    author: "Muhammad Ayan Khan",
    date: "2026-09-19",
    updated: "2026-09-19",
    excerpt: "Everything you need to know before buying a house in Abbottabad — budget, neighbourhoods, documents and inspection.",
    content: `<p>Buying a house in Abbottabad means finding the right balance of neighbourhood, budget, size and legal clarity. This guide covers the essentials.</p>
<h2>Set Your Budget</h2>
<p>House prices in Abbottabad depend on marla size, number of storeys, location and condition. Decide your upper limit before viewing properties.</p>
<h2>Choose a Neighbourhood</h2>
<p>Consider proximity to work, schools, hospitals and markets. Established areas suit families; developing zones may offer better long-term appreciation.</p>
<h2>Inspect the House</h2>
<p>Check the structure, plumbing, electrical wiring, water supply and neighbourhood noise. Visit at different times of day if possible.</p>
<h2>Verify Documents</h2>
<p>Confirm ownership documents, registry and that utility dues are cleared before payment.</p>
<h2>Frequently Asked Questions</h2>
<h3>Are houses for rent available in Abbottabad?</h3>
<p>Yes. Houses and upper/lower portions are available for rent across Abbottabad. Contact us with your budget and preferred area.</p>
<h3>How can MK Real Estate help me buy a house?</h3>
<p>We shortlist houses matching your budget and area, arrange site visits, support negotiation and guide you through documentation and registry.</p>`,
    faq: [
      {q:"Are houses for rent available in Abbottabad?",a:"Yes. Houses and upper/lower portions are available for rent across Abbottabad. Contact us with your budget and preferred area."},
      {q:"How can MK Real Estate help me buy a house?",a:"We shortlist houses matching your budget and area, arrange site visits, support negotiation and guide you through documentation and registry."}
    ],
    related: ["property-investment-opportunities-abbottabad", "complete-guide-buying-property-havelian-abbottabad"]
  },
  {
    slug: "how-to-sell-property-havelian",
    title: "How to Sell Your Property Faster in Havelian",
    image: IMAGE.blog8,
    author: "Haider Ali Shah",
    date: "2026-09-12",
    updated: "2026-09-12",
    excerpt: "Tips for sellers in Havelian — pricing, listing, documentation and working with a local property dealer.",
    content: `<p>Selling property in Havelian works best when the property is priced right, presented well and backed by clean documentation.</p>
<h2>Price It Right</h2>
<p>Overpricing is the most common reason properties sit unsold. We help you set a realistic asking price based on recent Havelian market activity.</p>
<h2>Prepare the Property</h2>
<p>Clean the site, mark boundaries clearly, and take clear photographs. A well-presented plot or house attracts serious buyers faster.</p>
<h2>Keep Documents Ready</h2>
<p>Buyers will ask for ownership documents, fard and CNIC. Having them ready speeds up the sale and builds buyer confidence.</p>
<h2>Frequently Asked Questions</h2>
<h3>What commission do you charge sellers?</h3>
<p>Our commission is 2.5% from the selling party and 1.5% from the buying party, on the final agreed deal value. Commission terms are agreed before the transaction.</p>
<h3>How do I list my property with MK Real Estate?</h3>
<p>Send us the property details, location, asking price and documents on WhatsApp. We verify it, list it and connect you with serious buyers.</p>`,
    faq: [
      {q:"What commission do you charge sellers?",a:"Our commission is 2.5% from the selling party and 1.5% from the buying party, on the final agreed deal value. Commission terms are agreed before the transaction."},
      {q:"How do I list my property with MK Real Estate?",a:"Send us the property details, location, asking price and documents on WhatsApp. We verify it, list it and connect you with serious buyers."}
    ],
    related: ["complete-guide-buying-property-havelian-abbottabad", "things-check-before-buying-land-havelian"]
  },
  {
    slug: "property-prices-market-trends-sultanpur",
    title: "Property Prices and Market Trends in Sultanpur",
    image: IMAGE.blog9,
    author: "Muhammad Ayan Khan",
    date: "2026-09-04",
    updated: "2026-09-04",
    excerpt: "An overview of property price ranges and market activity in Sultanpur, near Havelian, for buyers and sellers.",
    content: `<p>Property prices in Sultanpur depend on plot size, road access and whether the land is in a developed or developing area. This article gives buyers and sellers a general frame of reference.</p>
<h2>Price Drivers</h2>
<p>Main-road and bazar-adjacent plots command higher prices due to commercial potential. Interior residential plots are typically more affordable and suited to end-users.</p>
<h2>Market Activity</h2>
<p>Sultanpur benefits from its location near Havelian. Steady buyer interest keeps the local market active for plots, houses and shops.</p>
<div class="note">The figures and observations in this article are general market commentary, not a valuation or a guarantee of future prices. Always confirm current pricing with a local property dealer before transacting.</div>
<h2>Frequently Asked Questions</h2>
<h3>Are property prices in Sultanpur rising?</h3>
<p>Demand near Havelian has kept Sultanpur's plot and house market active. Actual price movement depends on location, documentation and individual transactions.</p>
<h3>Can MK Real Estate give me a price estimate?</h3>
<p>We can share indicative price ranges based on recent activity. For a formal valuation, consult a qualified valuer.</p>`,
    faq: [
      {q:"Are property prices in Sultanpur rising?",a:"Demand near Havelian has kept Sultanpur's plot and house market active. Actual price movement depends on location, documentation and individual transactions."},
      {q:"Can MK Real Estate give me a price estimate?",a:"We can share indicative price ranges based on recent activity. For a formal valuation, consult a qualified valuer."}
    ],
    related: ["best-areas-buy-residential-plots-sultanpur", "property-investment-opportunities-abbottabad"]
  },
  {
    slug: "beginners-guide-real-estate-investment-hazara",
    title: "A Beginner's Guide to Real Estate Investment in Hazara",
    image: IMAGE.blog10,
    author: "Haider Ali Shah",
    date: "2026-08-27",
    updated: "2026-08-27",
    excerpt: "How to start investing in real estate across the Hazara region — Abbottabad, Haripur, Mansehra and Havelian.",
    content: `<p>Real estate investment in the Hazara region — covering Abbottabad, Haripur, Mansehra, Havelian and Sultanpur — offers options from residential plots to agricultural land.</p>
<h2>Start With Your Goal</h2>
<p>Are you investing for long-term appreciation, rental income, or a home to live in? Your goal determines whether you look at plots, houses, commercial shops or agricultural land.</p>
<h2>Pick a Location</h2>
<p>Abbottabad and Haripur have developed residential and commercial markets. Mansehra and Havelian offer growing demand. Sultanpur is popular for affordable plots.</p>
<h2>Verify Before You Invest</h2>
<p>Check ownership documents, fard, road access and utilities. Never pay without verifying the seller's title.</p>
<h2>Frequently Asked Questions</h2>
<h3>Which Hazara city is best for first-time investors?</h3>
<p>It depends on budget. Abbottabad and Haripur have more developed markets; Havelian and Sultanpur offer more affordable entry points for plots.</p>
<h3>How do I contact MK Real Estate about investing?</h3>
<p>Message us on WhatsApp or call either owner directly. We will discuss your budget and shortlist suitable options.</p>`,
    faq: [
      {q:"Which Hazara city is best for first-time investors?",a:"It depends on budget. Abbottabad and Haripur have more developed markets; Havelian and Sultanpur offer more affordable entry points for plots."},
      {q:"How do I contact MK Real Estate about investing?",a:"Message us on WhatsApp or call either owner directly. We will discuss your budget and shortlist suitable options."}
    ],
    related: ["property-investment-opportunities-abbottabad", "best-areas-buy-residential-plots-sultanpur"]
  },
  {
    slug: "property-investment-haripur",
    title: "Property Investment in Haripur: A Complete Guide",
    image: IMAGE.blog11,
    author: "Haider Ali Shah",
    date: "2026-08-15",
    updated: "2026-08-15",
    excerpt: "Everything you need to know about investing in property in Haripur — plots, houses, commercial land and market trends.",
    content: `<p>Haripur is a key city in the Hazara region with growing real estate activity. Whether you are looking for residential plots, commercial shops or agricultural land, Haripur offers opportunities for both end-users and investors.</p>
<h2>Investment Options in Haripur</h2>
<ul>
<li><strong>Residential plots</strong> in established and developing housing schemes for long-term appreciation.</li>
<li><strong>Houses</strong> for end-use or rental income in family neighbourhoods.</li>
<li><strong>Commercial property</strong> on main roads with business footfall and rental yield potential.</li>
<li><strong>Agricultural land</strong> on the outskirts of Haripur for farming or future development.</li>
</ul>
<h2>Why Invest in Haripur?</h2>
<p>Haripur's location on the Grand Trunk Road, proximity to Havelian and Abbottabad, and ongoing development make it a practical choice for property investment. Land prices are generally more accessible than in Abbottabad, with strong rental demand from the local workforce.</p>
<h2>Frequently Asked Questions</h2>
<h3>Is Haripur good for property investment?</h3>
<p>Haripur offers affordable entry points for first-time investors and steady demand for residential and commercial property. Returns depend on location, property type and holding period.</p>
<h3>What types of property are available in Haripur?</h3>
<p>Residential plots, houses, commercial shops and agricultural land are available across Haripur and nearby areas including Khanpur.</p>
<h3>How can MK Real Estate help me invest in Haripur?</h3>
<p>We shortlist verified options based on your budget, arrange site visits, support negotiation and guide you through documentation.</p>`,
    faq: [
      {q:"Is Haripur good for property investment?",a:"Haripur offers affordable entry points for first-time investors and steady demand for residential and commercial property. Returns depend on location, property type and holding period."},
      {q:"What types of property are available in Haripur?",a:"Residential plots, houses, commercial shops and agricultural land are available across Haripur and nearby areas including Khanpur."},
      {q:"How can MK Real Estate help me invest in Haripur?",a:"We shortlist verified options based on your budget, arrange site visits, support negotiation and guide you through documentation."}
    ],
    related: ["best-areas-buy-residential-plots-sultanpur", "beginners-guide-real-estate-investment-hazara"]
  },
  {
    slug: "real-estate-opportunities-mansehra",
    title: "Real Estate Opportunities in Mansehra: Complete Guide",
    image: IMAGE.blog12,
    author: "Muhammad Ayan Khan",
    date: "2026-08-01",
    updated: "2026-08-01",
    excerpt: "A complete guide to buying and investing in property in Mansehra — plots, houses, land and market overview.",
    content: `<p>Mansehra is a growing city in the Hazara region of Khyber Pakhtunkhwa. With steady demand for residential plots, houses and agricultural land, Mansehra offers real estate opportunities for buyers, sellers and investors.</p>
<h2>Property Options in Mansehra</h2>
<ul>
<li><strong>Residential plots</strong> in Mansehra city and surrounding localities such as Shinkiari and Balakot Road.</li>
<li><strong>Houses</strong> for families and end-users in established neighbourhoods.</li>
<li><strong>Agricultural land</strong> on the outskirts for farming and long-term investment.</li>
<li><strong>Commercial property</strong> along main roads with business potential.</li>
</ul>
<h2>Market Overview</h2>
<p>Mansehra benefits from its position as a regional hub connecting Abbottabad, Balakot and the Kaghan Valley. Property prices are generally more affordable than in Abbottabad, making it attractive for first-time buyers and investors looking for growth potential.</p>
<h2>Frequently Asked Questions</h2>
<h3>Is Mansehra good for real estate investment?</h3>
<p>Mansehra offers affordable property options with steady local demand. As a regional hub, it supports both residential and commercial real estate activity. Returns depend on location, property type and holding period.</p>
<h3>What types of property are available in Mansehra?</h3>
<p>Residential plots, houses, agricultural land and commercial property are available across Mansehra city and nearby areas.</p>
<h3>How can MK Real Estate help me buy property in Mansehra?</h3>
<p>We shortlist verified options based on your budget and preferred area, arrange site visits, support negotiation and guide you through documentation and registry.</p>`,
    faq: [
      {q:"Is Mansehra good for real estate investment?",a:"Mansehra offers affordable property options with steady local demand. As a regional hub, it supports both residential and commercial real estate activity. Returns depend on location, property type and holding period."},
      {q:"What types of property are available in Mansehra?",a:"Residential plots, houses, agricultural land and commercial property are available across Mansehra city and nearby areas."},
      {q:"How can MK Real Estate help me buy property in Mansehra?",a:"We shortlist verified options based on your budget and preferred area, arrange site visits, support negotiation and guide you through documentation and registry."}
    ],
    related: ["beginners-guide-real-estate-investment-hazara", "property-investment-opportunities-abbottabad"]
  }
];

function findBlog(slug){
  return BLOG.find(b => b.slug === slug);
}
