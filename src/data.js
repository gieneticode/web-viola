export const BRAND = {
  name: "Vio.co",
  tagline: "Production House · Creative Agency & Social Media Specialist",
  big: "From Creative Strategy to Production, From Content to Social Media.",
  wa: "https://wa.me/6287840403048",
  email: "hello@violaofficial.web.id",
  ig: "https://instagram.com/violadwijenita",
  tiktok: "https://tiktok.com/@violadwijenita",
  site: "https://violaofficial.web.id",
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
    "Company & Brand Videos","Commercials / Advertisements","Short Movie & Documentaries","Social Media & Campaign Video"],
    img:"/assets/services/video-production.jpg" },
  { id:"social", n:"02", t:"Social Media", d:"Planning, producing and managing content that performs.", items:[
    "Social Media Management","Content Strategy & Planning","Monthly Content Production","Copywriting & Calendar"],
    img:"/assets/services/social-media.jpg" },
  { id:"creative", n:"03", t:"Creative & Branding", d:"The thinking that comes before the shooting.", items:[
    "Creative & Campaign Concepts","Visual Direction","Brand Communication","Personal & Social Branding"],
    img:"/assets/services/creative-branding.jpg" },
  { id:"photo", n:"04", t:"Photo & Visual", d:"Stills that carry the same weight as the motion.", items:[
    "Product Photography","Event & Corporate Shoots","Portrait & Commercial","Documentation"],
    img:"/assets/services/photography.jpg" },
  { id:"aerial", n:"05", t:"Aerial Production", d:"Perspective no tripod can reach.", items:[
    "Aerial Photo & Video","FPV Drone Sequences","Cinematic Drone","Property / Hotel / Villa"],
    img:"/assets/services/aerial.jpg" },
  { id:"post", n:"06", t:"Post Production", d:"Where the footage becomes a film.", items:[
    "Cinematic Video Editing","Color Grading & Mastering","Motion Graphics","Sound Design & Mix"],
    img:"/assets/services/post-production.jpg" },
];

export const CATS = ["All","Video","Social Media","Branding","Commercial","Event","Drone"];

export const WORK = [
  { slug:"tim-raga", t:"Tim Raga", cat:"Video", client:"Polda Riau",
    project:"Short Movie — Tim Raga",
    services:"Production | Direction | Cinematography | FPV | Editing",
    desc:"A short narrative film produced end-to-end — from script development through direction, cinematography, FPV aerial sequences and final edit.",
    role:"Full production by Vio.co as production house and creative lead.",
    cover:"/assets/work/tim-raga.jpg" },
  { slug:"harbour-hotel", t:"Harbour Hotel", cat:"Drone", client:"Harbour Hotel",
    project:"Property Aerial Film",
    services:"Aerial | FPV | Editing | Color Grading",
    desc:"Cinematic aerial showcase of the property — pool, suites and surroundings — cut for web and social.",
    role:"Aerial unit, direction and post production.",
    cover:"/assets/work/harbour-hotel.jpg" },
  { slug:"seraya-villa", t:"Seraya Villa", cat:"Commercial", client:"Seraya Villa",
    project:"Brand Commercial",
    services:"Creative Concept | Direction | Production | Post",
    desc:"A 45-second commercial built around the experience of arrival, shot over two days on location.",
    role:"Concept, direction, production and post.",
    cover:"/assets/work/seraya-villa.jpg" },
  { slug:"nusantara-coffee", t:"Nusantara Coffee", cat:"Social Media", client:"Nusantara Coffee",
    project:"Monthly Content Production",
    services:"Content Strategy | Production | Editing | Publishing",
    desc:"Rolling monthly content package — reels, feed and TikTok — with a content calendar and performance reporting.",
    role:"Social media management, production and reporting.",
    cover:"/assets/work/nusantara-coffee.jpg" },
  { slug:"riau-tourism", t:"Riau Tourism", cat:"Branding", client:"Dinas Pariwisata",
    project:"Destination Campaign",
    services:"Creative Strategy | Visual Direction | Production",
    desc:"Campaign identity and visual direction for a regional destination push — from key visual to on-location capture.",
    role:"Creative strategy and visual direction.",
    cover:"/assets/work/riau-tourism.jpg" },
  { slug:"annual-gala", t:"Annual Gala", cat:"Event", client:"Griya Corp",
    project:"Event Documentation",
    services:"Multi-cam | Photography | Post",
    desc:"Full event documentation with multi-camera coverage, photography and a same-day highlight cut.",
    role:"Multi-cam unit, photography and same-day edit.",
    cover:"/assets/work/annual-gala.jpg" },
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
  ["Director","Creative direction and storytelling.","/assets/team/director.jpg"],
  ["Camera Crew","Cinematography and coverage.","/assets/team/camera-crew.jpg"],
  ["Drone Pilot","Aerial and FPV flight.","/assets/team/drone-pilot.jpg"],
  ["Lighting","Set lighting and mood.","/assets/team/lighting.jpg"],
  ["Makeup","Talent grooming and continuity.","/assets/team/makeup.jpg"],
  ["Editor","Cut, grade, sound and motion.","/assets/team/editor.jpg"],
];

/* ── Stock covers for About 4-photo grid & Process feed ── */
export const ABOUT_PHOTOS = [
  "/assets/about/team.jpg",
  "/assets/about/on-set.jpg",
  "/assets/about/bts.jpg",
  "/assets/about/editing.jpg",
];

export const SOCIAL_FEED = [
  "/assets/work/nusantara-coffee.jpg",
  "/assets/work/seraya-villa.jpg",
  "/assets/services/social-media.jpg",
  "/assets/services/video-production.jpg",
];
