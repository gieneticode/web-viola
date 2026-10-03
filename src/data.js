export const BRAND = {
  name: "Vio.co",
  tagline: "Production House · Creative Agency & Social Media Specialist",
  big: "From Creative Strategy to Production, From Content to Social Media.",
  wa: "https://wa.me/6280000000000",
  email: "hello@vio.co",
  ig: "https://instagram.com/",
  site: "www.vio.co",
  role: "Creative Production House & Agency",
};

export const ROADMAP = [
  { month: "Month 1", items: ["Market research", "User needs analysis"] },
  { month: "Month 2", items: ["Product design", "System development"] },
  { month: "Month 3", items: ["Beta launch", "User feedback", "Performance optimization"] },
];

/* capability progress rings — shown as futuristic feature cards */
export const METRICS = [
  { label: "System performance", pct: 95, sub: "Reliable delivery" },
  { label: "On-time delivery", pct: 90, sub: "Schedule discipline" },
  { label: "Client retention", pct: 88, sub: "Long-term partners" },
  { label: "Creative output", pct: 92, sub: "Concept to final" },
];

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services", children: [
    { to: "/services#video", label: "Video Production" },
    { to: "/services#social", label: "Social Media" },
    { to: "/services#creative", label: "Creative & Branding" },
    { to: "/services#photo", label: "Photography" },
    { to: "/services#aerial", label: "Aerial & FPV" },
    { to: "/services#post", label: "Post Production" },
  ]},
  { to: "/work", label: "Work" },
  { to: "/process", label: "Process" },
  { to: "/contact", label: "Contact" },
];

export const SERVICES = [
  { id:"video", n:"01", t:"Video Production", d:"Concept to final cut, built for brand storytelling.", items:[
    "Company Profile","Corporate Video","Brand Video","Commercial / Advertisement","Short Movie",
    "Documentary","Social Media Video","Event Video","Campaign Video","Video Profile","Product Video"],
    img:"https://images.unsplash.com/photo-1574717024653-61fd2cf4d44a?w=600&q=80" },
  { id:"social", n:"02", t:"Social Media", d:"Planning, producing and managing content that performs.", items:[
    "Social Media Management","Instagram Management","TikTok Management","Content Planning",
    "Content Strategy","Content Creation","Social Media Branding","Monthly Content Production",
    "Copywriting","Content Calendar"],
    img:"https://images.unsplash.com/photo-1611162616805-e7af1f97f334?w=600&q=80" },
  { id:"creative", n:"03", t:"Creative & Branding", d:"The thinking that comes before the shooting.", items:[
    "Creative Concept","Campaign Concept","Visual Direction","Brand Communication",
    "Personal Branding","Social Media Branding","Creative Strategy"],
    img:"https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&q=80" },
  { id:"photo", n:"04", t:"Photo & Visual", d:"Stills that carry the same weight as the motion.", items:[
    "Product Photography","Event Photography","Corporate Photography","Portrait Photography",
    "Campaign Photography","Documentation"],
    img:"https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&q=80" },
  { id:"aerial", n:"05", t:"Aerial Production", d:"Perspective no tripod can reach.", items:[
    "Aerial Photography","Aerial Videography","FPV Drone","Cinematic Drone",
    "Property / Hotel / Villa Aerial Video"],
    img:"https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=600&q=80" },
  { id:"post", n:"06", t:"Post Production", d:"Where the footage becomes a film.", items:[
    "Video Editing","Cinematic Editing","Social Media Editing","Motion Graphic",
    "Color Grading","Sound Design","Trailer / Teaser"],
    img:"https://images.unsplash.com/photo-1536243287037-7f14440b3407?w=600&q=80" },
];

export const CATS = ["All","Video","Social Media","Branding","Commercial","Event","Drone"];

export const WORK = [
  { slug:"tim-raga", t:"Tim Raga", cat:"Video", client:"Polda Riau",
    project:"Short Movie — Tim Raga",
    services:"Production | Direction | Cinematography | FPV | Editing",
    desc:"A short narrative film produced end-to-end — from script development through direction, cinematography, FPV aerial sequences and final edit.",
    role:"Full production by Vio.co as production house and creative lead.",
    cover:"https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=600&q=80" },
  { slug:"harbour-hotel", t:"Harbour Hotel", cat:"Drone", client:"Harbour Hotel",
    project:"Property Aerial Film",
    services:"Aerial | FPV | Editing | Color Grading",
    desc:"Cinematic aerial showcase of the property — pool, suites and surroundings — cut for web and social.",
    role:"Aerial unit, direction and post production.",
    cover:"https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80" },
  { slug:"seraya-villa", t:"Seraya Villa", cat:"Commercial", client:"Seraya Villa",
    project:"Brand Commercial",
    services:"Creative Concept | Direction | Production | Post",
    desc:"A 45-second commercial built around the experience of arrival, shot over two days on location.",
    role:"Concept, direction, production and post.",
    cover:"https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=600&q=80" },
  { slug:"nusantara-coffee", t:"Nusantara Coffee", cat:"Social Media", client:"Nusantara Coffee",
    project:"Monthly Content Production",
    services:"Content Strategy | Production | Editing | Publishing",
    desc:"Rolling monthly content package — reels, feed and TikTok — with a content calendar and performance reporting.",
    role:"Social media management, production and reporting.",
    cover:"https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=600&q=80" },
  { slug:"riau-tourism", t:"Riau Tourism", cat:"Branding", client:"Dinas Pariwisata",
    project:"Destination Campaign",
    services:"Creative Strategy | Visual Direction | Production",
    desc:"Campaign identity and visual direction for a regional destination push — from key visual to on-location capture.",
    role:"Creative strategy and visual direction.",
    cover:"https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80" },
  { slug:"annual-gala", t:"Annual Gala", cat:"Event", client:"Griya Corp",
    project:"Event Documentation",
    services:"Multi-cam | Photography | Post",
    desc:"Full event documentation with multi-camera coverage, photography and a same-day highlight cut.",
    role:"Multi-cam unit, photography and same-day edit.",
    cover:"https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80" },
];

export const CLIENTS = ["POLDA RIAU","HARBOUR HOTEL","SERAYA VILLA","NUSANTARA COFFEE","GRIYA CORP","LOCAL BRAND"];

export const CAPS = [
  ["🎥","Professional Camera"],["🚁","Aerial Drone"],["🚀","FPV Drone"],
  ["🎙️","Audio Production"],["💡","Lighting"],["🎬","Cinematic Production"],["✂️","Post Production"],
];

export const CAPABILITY_STEPS = [
  ["01","Strategy","We understand the needs and goals of your brand."],
  ["02","Creative","We develop the concept and the visual direction."],
  ["03","Production","We run the shooting and the production process."],
  ["04","Post Production","Editing, color grading, sound, motion graphic."],
  ["05","Social Media","Content adaptation and distribution."],
  ["06","Analytics","Performance evaluation and content development."],
];

export const PROCESS_STEPS = [
  ["IDE","Idea","Brief, references and creative direction."],
  ["PRE","Pre-Production","Script, storyboard, schedule, crew and locations."],
  ["PROD","Production","Shooting days — camera, lighting, audio, drone."],
  ["POST","Post-Production","Editing, color grading, sound design, motion graphic."],
  ["FINAL","Final Delivery","Master files, cutdowns and platform-ready versions."],
];

export const SOCIAL_FLOW = [
  "Content Strategy","Content Planning","Production","Editing","Publishing","Analytics",
];
export const MARQUEE = [
  "Video Production","·","Social Media","·","Creative Strategy","·",
  "Aerial & FPV","·","Photography","·","Post Production","·",
];

export const TEAM_ROLES = [
  ["Director","Creative direction and storytelling.","https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"],
  ["Camera Crew","Cinematography and coverage.","https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&q=80"],
  ["Drone Pilot","Aerial and FPV flight.","https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&q=80"],
  ["Lighting","Set lighting and mood.","https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&q=80"],
  ["Makeup","Talent grooming and continuity.","https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80"],
  ["Editor","Cut, grade, sound and motion.","https://images.unsplash.com/photo-1574717024653-61fd2cf4d44a?w=400&q=80"],
];

/* ── Stock covers for About 4-photo grid & Process feed ── */
export const ABOUT_PHOTOS = [
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=80",
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80",
  "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&q=80",
  "https://images.unsplash.com/photo-1536243287037-7f14440b3407?w=600&q=80",
];
export const SOCIAL_FEED = [
  "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&q=80",
  "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=600&q=80",
  "https://images.unsplash.com/photo-1611162616805-e7af1f97f334?w=600&q=80",
  "https://images.unsplash.com/photo-1590602847861-f357a8f7aaa8?w=600&q=80",
];
