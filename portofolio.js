/* ============ EDIT BAGIAN INI ============ */
const CONFIG = {
  name: "Dikri Taufik Akbar",
  github: "dikritaufikakbar",
  bio: "Aku kuliah di Universitas Mandiri Subang, jurusan Sistem Informasi, dan sedang belajar JavaScript.",
  avatar: "dikri.jpg"
  hobbies: ["Nonton anime", "Ngoding", "Main game", "Dengar musik"],
  education: [
    { period: "2026 - sekarang", school: "Universitas Mandiri Subang", detail: "Jurusan Sistem Informasi dan Semester 1" },
    { period: "2022 - 2024",     school: "SMA Negeri 2 Subang",     detail: "Jurusan IPS" },
    { period: "2019 - 2022",     school: "SMP Negeri 2 Subang",         detail: "" }
  ],
  /* Bagian tambahan di halaman Tentang Aku. Kosongkan array extras kalau tidak perlu. */
  extras: [
    { title: "Yang sedang kupelajari", items: ["Aku sedang mempelajari JavaScript, python sama C++"] },
    { title: "Game Favorit", items: ["Honkai: Star Rail", "PUBG Mobile", "Minecraft"] },
    { title: "Anime Favorit", items: ["Sousou no Frieren", "Tensei Shitara Slime Datta Ken", "Kusuriya no Hitorigoto", "Tensei Kizoku, Kantei Skill de Nariagaru"] }
  ],
  skills: [
    { name: "JavaScript", level: 75 },
    { name: "HTML", level: 85 },
    { name: "CSS", level: 80 },
    { name: "Git & GitHub", level: 65 }
  ],
  contacts: [
    { label: "GitHub", url: "https://github.com/dikritaufikakbar", icon: "github" },
    { label: "Instagram", url: "https://instagram.com/dikritaufik781", icon: "instagram" },
    { label: "TikTok", url: "https://tiktok.com/@zune100id", icon: "tiktok" },
    { label: "Email", url: "mailto:dikritaufikakbar84@gmail.com", icon: "email" }
  ],
  hideForks: true,
  maxRepos: 24,
  /* Karakter yang menampilkan pilihan. view: about | skills | repos | contact.
     img: isi dengan link/path gambar karakter kalau punya (misal "Foto/march7.jpg").
     Kalau kosong, tampil ikon emoji. */
  crew: [
    { view: "about",   name: "Sunday", path: "Harmony", elem: "Imaginary", stars: 5, icon: "🕊️", color: "#e8c25a", img: "sunday.jpg", choice: "Ceritakan tentang dirimu.",
      greet: "Silakan duduk. Aku akan menceritakan siapa pemilik kereta ini, mulai dari hobi sampai riwayat sekolahnya." },
    { view: "github",  name: "March 7th", path: "Preservation", elem: "Ice", stars: 4, icon: "📸", color: "#ff8fb8", img: "march7.jpg", choice: "Apa saja yang sudah kamu kerjakan di GitHub?",
      greet: "Aku sudah foto semua aktivitasnya! Lihat bahasa yang paling sering dipakai dan repo yang terakhir diperbarui." },
    { view: "skills",  name: "Dan Heng", path: "Hunt", elem: "Wind", stars: 4, icon: "🗡️", color: "#3fae9a", img: "danheng.jpg", choice: "Kemampuan apa yang kamu punya?",
      greet: "Daftar kemampuannya ada di sini. Lihat sendiri." },
    { view: "repos",   name: "Himeko", path: "Erudition", elem: "Fire", stars: 5, icon: "☕", color: "#d9505a", img: "himeko.jpg", choice: "Perlihatkan proyek-proyekmu.",
      greet: "Duduk dulu, ambil kopi. Semua proyek ada di meja ini, langsung dari GitHub." },
    { view: "contact", name: "Welt", path: "Nihility", elem: "Imaginary", stars: 5, icon: "🎩", color: "#3a5bd9", img: "welt.jpg", choice: "Bagaimana cara menghubungimu?",
      greet: "Pintu kereta selalu terbuka. Kirim pesan kapan saja." }
  ],
  demos: {
    "Tugas-latihan-javascript": [
      { label: "Demo Kalkulator", url: "https://dikritaufikakbar.github.io/Tugas-latihan-javascript/Tugas-kalkulator/Kalkulator.html" }
    ],
    "Projek-html-pertama": [
      { label: "Lihat Projek", url: "https://dikritaufikakbar.github.io/Projek-html-pertama/" }
    ],
    "dikritaufikakbar.github.io": [
      { label: "Buka Situs", url: "https://dikritaufikakbar.github.io/" }
    ],
    "dikritaufikakbar.github.io.": [
      { label: "Buka Situs", url: "https://dikritaufikakbar.github.io/" }
    ]
  }
};
const HOME_CHARACTER = { name: "Stelle", path: "Destruction", elem: "Physical", stars: 5, icon: "⭐", color: "#d9b86a", img: "stelle.jpg" };
const HOME_LINE = "Akhirnya kamu datang! Selamat datang di ruang kereta. Mau mulai dari mana?";
const SAMPLE = [
  { name: "tugas-web-1", description: "Tugas pemrograman web: halaman profil dengan HTML dan CSS.", language: "HTML", stargazers_count: 2, html_url: "#", homepage: "" },
  { name: "kalkulator-js", description: "Kalkulator sederhana dengan JavaScript DOM.", language: "JavaScript", stargazers_count: 5, html_url: "#", homepage: "" },
  { name: "todo-app", description: "Aplikasi daftar tugas dengan penyimpanan di browser.", language: "JavaScript", stargazers_count: 3, html_url: "#", homepage: "" }
];
/* ========================================= */

const $ = id => document.getElementById(id);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

let ghUser = null, ghStars = 0;
let allRepos = [], repoNote = "", repoFilter = "Semua";
let activeView = "";

/* ---------- bintang & kecepatan warp ---------- */
let speed = 1;
(function(){
  const cv = $("stars"), ctx = cv.getContext("2d");
  let W, H, S = [];
  const size = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; };
  size(); addEventListener("resize", size);
  for (let i = 0; i < 160; i++) S.push({x:Math.random(), y:Math.random(), z:.2 + Math.random()});
  (function tick(){
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#fff"; ctx.strokeStyle = "#cfe8ff";
    for (const s of S){
      s.x -= s.z * .0015 * speed;
      if (s.x < 0){ s.x = 1; s.y = Math.random(); }
      const px = s.x * W, py = s.y * H;
      if (speed > 8){ ctx.lineWidth = s.z * 1.4; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + s.z * speed * 3, py); ctx.stroke(); }
      else ctx.fillRect(px, py, s.z * 2, s.z * 2);
    }
    if ($("intro")) requestAnimationFrame(tick);
  })();
})();

/* ---------- intro ---------- */
function enterGame(){
  const intro = $("intro");
  $("game").hidden = false;
  intro.classList.add("out");
  setTimeout(() => { intro.remove(); }, 900);
  speed = 1;
  goHome();
}
$("goBtn").onclick = () => {
  const intro = $("intro");
  intro.classList.add("warp"); speed = 40;
  setTimeout(() => intro.classList.add("flash"), 500);
  setTimeout(enterGame, reduce ? 0 : 1100);
};
$("skipBtn").onclick = enterGame;
setTimeout(() => $("intro") && $("intro").classList.add("stopped"), 3600);

/* ---------- dialog ---------- */
let typer;
function say(speaker, text){
  $("speaker").textContent = speaker;
  const el = $("line"); clearInterval(typer);
  if (reduce){ el.textContent = text; return; }
  let i = 0; el.textContent = "";
  typer = setInterval(() => { el.textContent = text.slice(0, ++i); if (i >= text.length) clearInterval(typer); }, 22);
}
function setChar(c){
  const p = $("portrait");
  p.style.setProperty("--c", c.color);
  p.innerHTML = c.img ? '<img src="' + esc(c.img) + '" alt="' + esc(c.name) + '">' : '<span id="pIcon">' + c.icon + '</span>';
  if (c.path) p.innerHTML += '<div class="pbadge"><span>' + esc(c.elem) + '</span><span>' + esc(c.path) + '</span></div><div class="rarity" aria-hidden="true">' + "★".repeat(c.stars || 5) + '</div><div class="pname" aria-hidden="true">' + esc(c.name) + '</div>';
  p.classList.remove("swap"); void p.offsetWidth; p.classList.add("swap");
}
function renderChoices(current){
  $("choices").innerHTML = CONFIG.crew.map((c, i) =>
    '<li><button class="choice' + (c.view === current ? " on" : "") + '" data-i="' + i + '"><b>' + (i + 1) + '</b>' + esc(c.choice) + '</button></li>'
  ).join("");
}
$("choices").onclick = e => {
  const b = e.target.closest(".choice"); if (b) pick(+b.dataset.i);
};
function goHome(){
  activeView = "";
  setChar(HOME_CHARACTER); $("view").hidden = true; $("hudSection").textContent = "Beranda";
  say(HOME_CHARACTER.name, HOME_LINE); renderChoices("");
}
function animateBars(){
  const v = $("view");
  requestAnimationFrame(() => setTimeout(() => v.querySelectorAll("i[data-w]").forEach(b => b.style.width = b.dataset.w + "%"), 60));
}
function refreshView(){
  if (activeView !== "github") return;
  $("view").innerHTML = VIEWS.github(); animateBars();
}
const visited = new Set(); let toastT;
function toast(t, s){
  const el = $("toast"); el.innerHTML = "<b>" + esc(t) + "</b><span>" + esc(s) + "</span>"; el.hidden = false;
  el.style.animation = "none"; void el.offsetWidth; el.style.animation = "";
  clearTimeout(toastT); toastT = setTimeout(() => el.hidden = true, 3200);
}
function track(i){
  if (visited.has(i)) return;
  visited.add(i);
  $("mission").textContent = visited.size + "/" + CONFIG.crew.length;
  $("jade").textContent = visited.size * 160;
  if (visited.size === CONFIG.crew.length) toast("MISI SELESAI", "Semua kru sudah kamu temui. +1 Tiket Warp Kereta Bintang!");
  else toast("+160 STELLAR JADE", "Kamu bertemu " + CONFIG.crew[i].name + ".");
}
function pick(i){
  const c = CONFIG.crew[i];
  track(i);
  activeView = c.view;
  setChar(c);
  say(c.name, c.greet);
  $("hudSection").textContent = c.name;
  renderChoices(c.view);
  const v = $("view"); v.hidden = false;
  v.style.animation = "none"; void v.offsetWidth; v.style.animation = "";
  v.innerHTML = VIEWS[c.view]();
  v.scrollTop = 0;
  animateBars();
  if (c.view === "repos"){ bindChips(); }
}
$("homeBtn").onclick = goHome;
addEventListener("keydown", e => {
  if ($("game").hidden) return;
  if (e.key === "Escape") goHome();
  const n = parseInt(e.key, 10);
  if (n >= 1 && n <= CONFIG.crew.length) pick(n - 1);
});

/* ---------- isi tiap pilihan ---------- */
const VIEWS = {
  about: () => {
    const pic = CONFIG.avatar || (ghUser && ghUser.avatar_url);
    return '<h2>Tentang Aku</h2><div class="about"><div class="avatar">' +
      (pic ? '<img src="' + esc(pic) + '" alt="Foto ' + esc(CONFIG.name) + '">' : "🌌") +
      '</div><div><h3>' + esc(CONFIG.name) + '</h3><p>' + esc(CONFIG.bio) + '</p></div></div>' +
      '<h4 class="sh">Hobi</h4><div class="chips">' + CONFIG.hobbies.map(h => '<span class="tag">' + esc(h) + '</span>').join("") + '</div>' +
      '<h4 class="sh">Riwayat pendidikan</h4><ol class="tl">' + CONFIG.education.map(e =>
        '<li><span class="when">' + esc(e.period) + '</span><b>' + esc(e.school) + '</b>' + (e.detail ? '<small>' + esc(e.detail) + '</small>' : "") + '</li>').join("") + '</ol>' +
      CONFIG.extras.map(x => '<h4 class="sh">' + esc(x.title) + '</h4><ul class="pts">' + x.items.map(i => '<li>' + esc(i) + '</li>').join("") + '</ul>').join("");
  },
  github: () => {
    if (!ghUser) return '<h2>Profil GitHub</h2><p>' + esc(repoNote || "Memuat data GitHub...") + '</p>';
    const langs = {};
    allRepos.forEach(r => { if (r.language) langs[r.language] = (langs[r.language] || 0) + 1; });
    const rows = Object.entries(langs).sort((a, b) => b[1] - a[1]);
    const recent = allRepos.slice().sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at)).slice(0, 5);
    const fmt = d => d ? new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) : "-";
    return '<h2>Profil GitHub</h2><div class="about"><div class="avatar"><img src="' + esc(ghUser.avatar_url) + '" alt="Foto GitHub"></div><div>' +
      '<h3><a href="' + esc(ghUser.html_url) + '" target="_blank" rel="noopener">@' + esc(ghUser.login) + '</a></h3>' +
      '<p>' + esc(ghUser.bio || "Belum ada bio di GitHub.") + '</p><div class="stats">' +
      '<div class="stat"><b>' + ghUser.public_repos + '</b>repo publik</div>' +
      '<div class="stat"><b>' + ghStars + '</b>bintang</div>' +
      '<div class="stat"><b>' + ghUser.followers + '</b>pengikut</div>' +
      '<div class="stat"><b>' + new Date(ghUser.created_at).getFullYear() + '</b>bergabung</div></div></div></div>' +
      '<h4 class="sh">Bahasa yang paling sering dipakai</h4><div class="skills">' + (rows.map(([l, n]) =>
        '<div class="skill"><div class="top"><span>' + esc(l) + '</span><span>' + n + ' repo</span></div><div class="bar"><i data-w="' + Math.round(n / allRepos.length * 100) + '"></i></div></div>').join("") || "<p>Belum ada data bahasa.</p>") + '</div>' +
      '<h4 class="sh">Terakhir diperbarui</h4><ol class="tl">' + recent.map(r =>
        '<li><span class="when">' + fmt(r.pushed_at) + '</span><b><a href="' + esc(r.html_url) + '" target="_blank" rel="noopener">' + esc(r.name) + '</a></b>' +
        (r.description ? '<small>' + esc(r.description) + '</small>' : "") + '</li>').join("") + '</ol>';
  },
  skills: () =>
    '<h2>Skill</h2><div class="skills">' + CONFIG.skills.map(s =>
      '<div class="skill"><div class="top"><span>' + esc(s.name) + '</span><span>' + s.level + '%</span></div><div class="bar"><i data-w="' + s.level + '"></i></div></div>'
    ).join("") + '</div>',
  repos: () =>
    '<h2>Proyek</h2><div class="chips" id="chips" role="group" aria-label="Filter bahasa">' + chipsHtml() + '</div>' +
    '<div class="grid" id="repos">' + reposHtml() + '</div><p class="note">' + esc(repoNote) + '</p>',
  contact: () => {
    const icons = {
      github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.68c-2.78.61-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.48-1.11-1.48-.91-.62.07-.61.07-.61 1 .07 1.52 1.03 1.52 1.03.9 1.54 2.35 1.1 2.92.84.09-.66.35-1.1.63-1.35-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.02A9.5 9.5 0 0 1 12 6.84c.85 0 1.7.11 2.5.33 1.9-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.41.1 2.66.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.93.68 1.87v2.77c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>',
      instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.25A4.75 4.75 0 1 1 7.25 12 4.75 4.75 0 0 1 12 7.25Zm0 2A2.75 2.75 0 1 0 14.75 12 2.75 2.75 0 0 0 12 9.25Zm5.25-3.25a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25Z"/></svg>',
      tiktok: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.5 2c.4 1.7 1.6 3.1 3.3 3.7v2.5a6.5 6.5 0 0 1-3.3-1v7.9a5.7 5.7 0 1 1-5.7-5.7c.2 0 .4 0 .6.1v2.7a3.1 3.1 0 1 0 2 3V2h3.1Z"/></svg>',
      email: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6.5A2.5 2.5 0 0 1 5.5 4h13A2.5 2.5 0 0 1 21 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5v-11Zm2.1-.5 6.9 5.2 6.9-5.2H5.1Zm14.4 2.4-7.1 5.4a1 1 0 0 1-1.2 0L4.5 8.4v9.1c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5V8.4Z"/></svg>'
    };
    return '<h2>Kontak</h2><p>Mau kolaborasi atau tukar ide? Kirim pesan saja.</p><div class="links big contact-list">' +
      CONFIG.contacts.map(c => '<a class="contact-link" target="_blank" rel="noopener" href="' + esc(c.url) + '"><span class="contact-icon">' + (icons[c.icon] || '') + '</span><span>' + esc(c.label) + '</span></a>').join("") + '</div>';
  }
};
function chipsHtml(){
  const langs = ["Semua", ...new Set(allRepos.map(r => r.language).filter(Boolean))];
  return langs.map(l => '<button class="chip" aria-pressed="' + (l === repoFilter) + '" data-l="' + esc(l) + '">' + esc(l) + '</button>').join("");
}
function reposHtml(){
  const list = repoFilter === "Semua" ? allRepos : allRepos.filter(r => r.language === repoFilter);
  if (!list.length) return "<p>Belum ada repo untuk bahasa ini.</p>";
  return list.map(r => {
    const cfg = CONFIG.demos[r.name] || [];
    const links = cfg.map(d => '<a class="demo" target="_blank" rel="noopener" href="' + esc(d.url) + '">' + esc(d.label) + '</a>').join("");
    const home = r.homepage && !cfg.some(d => d.url === r.homepage) ? '<a class="demo" target="_blank" rel="noopener" href="' + esc(r.homepage) + '">Demo</a>' : "";
    return '<article class="repo"><h3>' + esc(r.name) + '</h3><p>' + esc(r.description || "Belum ada deskripsi.") + '</p>' +
      '<div class="meta">' + (r.language ? '<span>' + esc(r.language) + '</span>' : "") + '<span>★ ' + (r.stargazers_count || 0) + '</span></div>' +
      '<div class="links"><a target="_blank" rel="noopener" href="' + esc(r.html_url) + '">Kode</a>' + home + links + '</div></article>';
  }).join("");
}
function bindChips(){
  $("chips").onclick = e => {
    const b = e.target.closest(".chip"); if (!b) return;
    repoFilter = b.dataset.l;
    $("chips").innerHTML = chipsHtml();
    $("repos").innerHTML = reposHtml();
  };
}

/* ---------- GitHub ---------- */
async function loadGitHub(){
  const user = CONFIG.github;
  if (!user || user.startsWith("username-")) return useSample("Username GitHub belum diisi. Ganti nilai github di CONFIG.");
  try {
    const [uRes, rRes] = await Promise.all([
      fetch("https://api.github.com/users/" + encodeURIComponent(user)),
      fetch("https://api.github.com/users/" + encodeURIComponent(user) + "/repos?per_page=100&sort=updated")
    ]);
    if (!uRes.ok || !rRes.ok) throw new Error("status");
    const u = await uRes.json(), repos = await rRes.json();
    allRepos = repos.filter(r => !(CONFIG.hideForks && r.fork)).slice(0, CONFIG.maxRepos);
    ghUser = u; ghStars = repos.reduce((n, r) => n + r.stargazers_count, 0);
    repoNote = allRepos.length ? "" : "Belum ada repo publik di akun ini.";
    refreshView();
  } catch (err){
    useSample("GitHub tidak bisa dihubungi sekarang. Menampilkan contoh repo.");
  }
}
function useSample(msg){
  allRepos = SAMPLE; repoNote = msg; ghUser = null;
  refreshView();
}

document.title = CONFIG.name + " | Portofolio";
$("introTitle").textContent = CONFIG.name;
$("hudName").textContent = CONFIG.name;
$("footName").textContent = CONFIG.name;
$("year").textContent = new Date().getFullYear();
loadGitHub();
