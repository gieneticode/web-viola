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
  { month: "Week 1 — Discovery & Concept", items: ["Brief & riset", "Creative concept", "Moodboard & treatment"] },
  { month: "Week 2 — Pre-Production", items: ["Script & storyboard", "Casting & location scouting", "Scheduling & crew"] },
  { month: "Week 3 — Production", items: ["Shoot day", "Directing", "Drone & multi-cam"] },
  { month: "Week 4 — Post & Delivery", items: ["Editing", "Color grading", "Sound design", "Final delivery & revisi"] },
];

/* capability progress rings — shown as futuristic feature cards */
export const METRICS = [
  { label: "Performa sistem", pct: 95, sub: "Pengiriman yang andal" },
  { label: "Tepat waktu", pct: 90, sub: "Disiplin jadwal" },
  { label: "Retensi klien", pct: 88, sub: "Mitra jangka panjang" },
  { label: "Output kreatif", pct: 92, sub: "Dari konsep hingga final" },
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
  { id:"video", n:"01", t:"Video Production", d:"Dari konsep hingga final cut — dirancang untuk cerita brand yang kuat.", items:[
    "Company & Brand Videos","Commercials / Advertisements","Short Movie & Documentaries","Social Media & Campaign Video"],
    img:"/assets/services/video-production.jpg" },
  { id:"social", n:"02", t:"Social Media", d:"Perencanaan, produksi, dan manajemen konten yang berperforma tinggi.", items:[
    "Social Media Management","Content Strategy & Planning","Monthly Content Production","Copywriting & Calendar"],
    img:"/assets/services/social-media.jpg" },
  { id:"creative", n:"03", t:"Creative & Branding", d:"Pemikiran yang mendahului setiap syuting.", items:[
    "Creative & Campaign Concepts","Visual Direction","Brand Communication","Personal & Social Branding"],
    img:"/assets/services/creative-branding.jpg" },
  { id:"photo", n:"04", t:"Photo & Visual", d:"Foto stills dengan kualitas visual setara motion.", items:[
    "Product Photography","Event & Corporate Shoots","Portrait & Commercial","Documentation"],
    img:"/assets/services/photography.jpg" },
  { id:"aerial", n:"05", t:"Aerial Production", d:"Sudut pandang yang tak terjangkau tripod.", items:[
    "Aerial Photo & Video","FPV Drone Sequences","Cinematic Drone","Property / Hotel / Villa"],
    img:"/assets/services/aerial.jpg" },
  { id:"post", n:"06", t:"Post Production", d:"Tempat footage bertransformasi menjadi film.", items:[
    "Cinematic Video Editing","Color Grading & Mastering","Motion Graphics","Sound Design & Mix"],
    img:"/assets/services/post-production.jpg" },
];

export const CATS = ["All","Film","Social Media","Branding","Commercial","Event","Drone"];

export const WORK = [
  { slug:"polda-riau-project", t:"Polda Riau Project", cat:"Film", client:"Polda Riau",
    project:"Polda Riau — 2 Film",
    services:"Production | Direction | Cinematography | FPV | Editing",
    desc:"Proyek kolaborasi dengan Polda Riau — 2 film pendek yang diproduksi end-to-end oleh Vio.co, dari pengembangan naskah, penyutradaraan, sinematografi, hingga edit final.",
    role:"Produksi penuh oleh Vio.co sebagai production house dan creative lead.",
    cover:"/assets/work/tim-raga/01-crew-group.jpg",
    films:["tim-raga","call-110"] },
  { slug:"tim-raga", t:"Tim Raga", cat:"Film", client:"Polda Riau", child:true,
    project:"Film Pendek — Tim Raga",
    services:"Production | Direction | Cinematography | FPV | Editing",
    desc:"Film naratif pendek yang diproduksi end-to-end — dari pengembangan naskah, penyutradaraan, sinematografi, sekuens aerial FPV, hingga edit final.",
    role:"Produksi penuh oleh Vio.co sebagai production house dan creative lead.",
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
    project:"Film Pendek — Call 110",
    services:"Production | Direction | Cinematography | FPV | Editing",
    desc:"Film kedua dari Polda Riau Project — film pendek yang diproduksi end-to-end oleh Vio.co. Foto dan video menyusul.",
    role:"Produksi penuh oleh Vio.co sebagai production house dan creative lead.",
    cover:"/assets/work/call-110.jpg",
    video:"" },
  { slug:"harbour-hotel", t:"Harbour Hotel", cat:"Drone", client:"Harbour Hotel",
    project:"Film Aerial Properti",
    services:"Aerial | FPV | Editing | Color Grading",
    desc:"Showcase aerial sinematik dari properti — kolam, suite, dan sekitarnya — yang disesuaikan untuk web dan sosial media.",
    role:"Unit aerial, penyutradaraan, dan pasca-produksi.",
    cover:"/assets/work/harbour-hotel.jpg" },
  { slug:"seraya-villa", t:"Seraya Villa", cat:"Commercial", client:"Seraya Villa",
    project:"Iklan Brand",
    services:"Creative Concept | Direction | Production | Post",
    desc:"Iklan 45 detik tentang pengalaman kedatangan, diproduksi dalam dua hari di lokasi.",
    role:"Konsep, penyutradaraan, produksi, dan pasca.",
    cover:"/assets/work/seraya-villa.jpg" },
  { slug:"nusantara-coffee", t:"Nusantara Coffee", cat:"Social Media", client:"Nusantara Coffee",
    project:"Produksi Konten Bulanan",
    services:"Content Strategy | Production | Editing | Publishing",
    desc:"Paket konten bulanan yang berkelanjutan — reels, feed, dan TikTok — dilengkapi kalender konten dan laporan performa.",
    role:"Manajemen sosial media, produksi, dan pelaporan.",
    cover:"/assets/work/nusantara-coffee.jpg" },
  { slug:"riau-tourism", t:"Riau Tourism", cat:"Branding", client:"Dinas Pariwisata",
    project:"Kampanye Destinasi",
    services:"Creative Strategy | Visual Direction | Production",
    desc:"Identitas kampanye dan arahan visual untuk dorongan destinasi regional — dari key visual hingga pengambilan di lokasi.",
    role:"Strategi kreatif dan arahan visual.",
    cover:"/assets/work/riau-tourism.jpg" },
  { slug:"annual-gala", t:"Annual Gala", cat:"Event", client:"Griya Corp",
    project:"Dokumentasi Acara",
    services:"Multi-cam | Photography | Post",
    desc:"Dokumentasi acara penuh dengan liputan multi-kamera, fotografi, serta potongan highlight di hari yang sama.",
    role:"Unit multi-kamera, fotografi, dan edit di hari yang sama.",
    cover:"/assets/work/annual-gala.jpg" },
];

export const CLIENTS = ["POLDA RIAU","HARBOUR HOTEL","SERAYA VILLA","NUSANTARA COFFEE","GRIYA CORP","LOCAL BRAND"];

export const CAPS = [
  ["camera","Kamera Profesional"],["drone","Drone Aerial"],["fpv","Drone FPV"],
  ["audio","Produksi Audio"],["lighting","Lighting"],["cinematic","Produksi Sinematik"],["post","Pasca-Produksi"],
];

export const CAPABILITY_STEPS = [
  ["01","Strategy","Kami memahami kebutuhan dan tujuan brand kamu."],
  ["02","Creative","Kami mengembangkan konsep dan arahan visual."],
  ["03","Production","Kami menjalankan syuting dan proses produksi."],
  ["04","Post Production","Editing, color grading, sound, dan motion grafis."],
  ["05","Social Media","Adaptasi konten dan distribusi."],
  ["06","Analytics","Evaluasi performa dan pengembangan konten."],
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
  ["Director","Arahan kreatif dan penceritaan.","/assets/team/director.jpg"],
  ["Camera Crew","Sinematografi dan liputan.","/assets/team/camera-crew.jpg"],
  ["Drone Pilot","Penerbangan aerial dan FPV.","/assets/team/drone-pilot.jpg"],
  ["Lighting","Pencahayaan set dan suasana.","/assets/team/lighting.jpg"],
  ["Makeup","Tata rias talenta dan kontinuitas.","/assets/team/makeup.jpg"],
  ["Editor","Potongan, grading, suara, dan motion.","/assets/team/editor.jpg"],
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
