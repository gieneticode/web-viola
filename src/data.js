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
  { label: "Performa sistem", pct: 95, sub: "Delivery yang andal" },
  { label: "Tepat waktu", pct: 90, sub: "Disiplin schedule" },
  { label: "Retensi klien", pct: 88, sub: "Mitra jangka panjang" },
  { label: "Output kreatif", pct: 92, sub: "Dari concept hingga final" },
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
  { id:"video", n:"01", t:"Video Production", d:"Dari concept hingga final cut, dirancang untuk brand storytelling.", items:[
    "Company & Brand Videos","Commercials / Advertisements","Short Movie & Documentaries","Social Media & Campaign Video"],
    img:"/assets/services/video-production.jpg" },
  { id:"social", n:"02", t:"Social Media", d:"Planning, production, dan management content yang berperforma tinggi.", items:[
    "Social Media Management","Content Strategy & Planning","Monthly Content Production","Copywriting & Calendar"],
    img:"/assets/services/social-media.jpg" },
  { id:"creative", n:"03", t:"Creative & Branding", d:"Pemikiran yang mendahului setiap shooting.", items:[
    "Creative & Campaign Concepts","Visual Direction","Brand Communication","Personal & Social Branding"],
    img:"/assets/services/creative-branding.jpg" },
  { id:"photo", n:"04", t:"Photo & Visual", d:"Stills dengan kualitas visual setara motion.", items:[
    "Product Photography","Event & Corporate Shoots","Portrait & Commercial","Documentation"],
    img:"/assets/services/photography.jpg" },
  { id:"aerial", n:"05", t:"Aerial Production", d:"Perspective yang tak terjangkau tripod.", items:[
    "Aerial Photo & Video","FPV Drone Sequences","Cinematic Drone","Property / Hotel / Villa"],
    img:"/assets/services/aerial.jpg" },
  { id:"post", n:"06", t:"Post Production", d:"Di mana footage bertransformasi menjadi film.", items:[
    "Cinematic Video Editing","Color Grading & Mastering","Motion Graphics","Sound Design & Mix"],
    img:"/assets/services/post-production.jpg" },
];

export const CATS = ["All","Film","Social Media","Branding","Commercial","Event","Drone"];

export const WORK = [
  { slug:"polda-riau-project", t:"Polda Riau Project", cat:"Film", client:"Polda Riau",
    project:"Polda Riau — 2 Films",
    services:"Production | Direction | Cinematography | FPV | Editing",
    desc:"Project kolaborasi dengan Polda Riau — 2 short movie yang diproduksi end-to-end oleh Vio.co, dari script development, direction, cinematography, hingga final edit.",
    role:"Full production oleh Vio.co sebagai production house dan creative lead.",
    cover:"/assets/work/tim-raga/01-crew-group.jpg",
    films:["tim-raga","call-110"] },
  { slug:"tim-raga", t:"Tim Raga", cat:"Film", client:"Polda Riau", child:true,
    project:"Short Movie — Tim Raga",
    services:"Production | Direction | Cinematography | FPV | Editing",
    desc:"Short narrative film yang diproduksi end-to-end — dari script development, direction, cinematography, FPV aerial sequences, hingga final edit.",
    role:"Full production oleh Vio.co sebagai production house dan creative lead.",
    cover:"/assets/work/tim-raga.jpg",
    video:"",
    // Galeri behind-the-scenes Tim Raga (11 foto, cover dikecualikan)
    gallery:[
      "/assets/work/tim-raga/01-crew-group.jpg",
      "/assets/work/tim-raga/02-makeup-blood.jpg",
      "/assets/work/tim-raga/04-cast-trio.jpg",
      "/assets/work/tim-raga/05-tactical-bw.jpg",
      "/assets/work/tim-raga/06-fpv-pilot.jpg",
      "/assets/work/tim-raga/07-tactical-lineup.jpg",
      "/assets/work/tim-raga/08-tactical-flag.jpg",
      "/assets/work/tim-raga/09-director-pilot.jpg",
      "/assets/work/tim-raga/10-lighting-setup.jpg",
      "/assets/work/tim-raga/11-makeup-actor.jpg",
      "/assets/work/tim-raga/12-camera-crew.jpg" ] },
  { slug:"call-110", t:"Call 110", cat:"Film", client:"Polda Riau", child:true,
    project:"Short Movie — Call 110",
    services:"Production | Direction | Cinematography | FPV | Editing",
    desc:"Film kedua dari Polda Riau Project — short movie yang diproduksi end-to-end oleh Vio.co. Foto dan video menyusul.",
    role:"Full production oleh Vio.co sebagai production house dan creative lead.",
    cover:"/assets/work/call-110.jpg",
    video:"" },
  { slug:"harbour-hotel", t:"Harbour Hotel", cat:"Drone", client:"Harbour Hotel",
    project:"Property Aerial Film",
    services:"Aerial | FPV | Editing | Color Grading",
    desc:"Cinematic aerial showcase dari properti tersebut — pool, suites, dan surroundings — yang disesuaikan untuk web dan social.",
    role:"Aerial unit, direction, dan post production.",
    cover:"/assets/work/harbour-hotel.jpg" },
  { slug:"seraya-villa", t:"Seraya Villa", cat:"Commercial", client:"Seraya Villa",
    project:"Brand Commercial",
    services:"Creative Concept | Direction | Production | Post",
    desc:"Commercial 45 detik tentang experience of arrival, diproduksi dalam dua hari on location.",
    role:"Concept, direction, production, dan post.",
    cover:"/assets/work/seraya-villa.jpg" },
  { slug:"nusantara-coffee", t:"Nusantara Coffee", cat:"Social Media", client:"Nusantara Coffee",
    project:"Monthly Content Production",
    services:"Content Strategy | Production | Editing | Publishing",
    desc:"Monthly content package yang berkelanjutan — reels, feed, dan TikTok — dilengkapi content calendar dan performance reporting.",
    role:"Social media management, production, dan reporting.",
    cover:"/assets/work/nusantara-coffee.jpg" },
  { slug:"riau-tourism", t:"Riau Tourism", cat:"Branding", client:"Dinas Pariwisata",
    project:"Destination Campaign",
    services:"Creative Strategy | Visual Direction | Production",
    desc:"Campaign identity dan visual direction untuk regional destination push — dari key visual hingga on-location capture.",
    role:"Creative strategy dan visual direction.",
    cover:"/assets/work/riau-tourism.jpg" },
  { slug:"annual-gala", t:"Annual Gala", cat:"Event", client:"Griya Corp",
    project:"Event Documentation",
    services:"Multi-cam | Photography | Post",
    desc:"Full event documentation dengan multi-camera coverage, photography, serta same-day highlight cut.",
    role:"Multi-cam unit, photography, dan same-day edit.",
    cover:"/assets/work/annual-gala.jpg" },
];

export const CLIENTS = ["POLDA RIAU","HARBOUR HOTEL","SERAYA VILLA","NUSANTARA COFFEE","GRIYA CORP","LOCAL BRAND"];

export const CAPS = [
  ["🎥","Professional Camera"],["🚁","Aerial Drone"],["🚀","FPV Drone"],
  ["🎙️","Audio Production"],["💡","Lighting"],["🎬","Cinematic Production"],["✂️","Post Production"],
];

export const CAPABILITY_STEPS = [
  ["01","Strategy","Kami memahami needs dan goals dari brand kamu."],
  ["02","Creative","Kami mengembangkan concept dan visual direction."],
  ["03","Production","Kami menjalankan shooting dan production process."],
  ["04","Post Production","Editing, color grading, sound, motion graphic."],
  ["05","Social Media","Content adaptation dan distribution."],
  ["06","Analytics","Performance evaluation dan content development."],
];

export const PROCESS_STEPS = [
  ["IDE","Idea","Brief, references, dan creative direction."],
  ["PRE","Pre-Production","Script, storyboard, schedule, crew, dan locations."],
  ["PROD","Production","Shooting days — camera, lighting, audio, drone."],
  ["POST","Post-Production","Editing, color grading, sound design, motion graphic."],
  ["FINAL","Final Delivery","Master files, cutdowns, dan platform-ready versions."],
];

export const SOCIAL_FLOW = [
  "Content Strategy","Content Planning","Production","Editing","Publishing","Analytics",
];

export const MARQUEE = [
  "Video Production","·","Social Media","·","Creative Strategy","·",
  "Aerial & FPV","·","Photography","·","Post Production","·",
];

export const TEAM_ROLES = [
  ["Director","Creative direction dan storytelling.","/assets/team/director.jpg"],
  ["Camera Crew","Cinematography dan coverage.","/assets/team/camera-crew.jpg"],
  ["Drone Pilot","Aerial dan FPV flight.","/assets/team/drone-pilot.jpg"],
  ["Lighting","Set lighting dan mood.","/assets/team/lighting.jpg"],
  ["Makeup","Talent grooming dan continuity.","/assets/team/makeup.jpg"],
  ["Editor","Cut, grade, sound, dan motion.","/assets/team/editor.jpg"],
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
