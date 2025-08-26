// Ultra TV — app.js
// Depend: hls.js (via CDN loaded in index.html)

// ----- Initial channels (example) -----
const DEFAULT_CHANNELS = [
  {
    id: genId(),
    name: "GARUDATV (LIVE)",
    url: "https://hgmtv.com:19360/garudatvlivestreaming/garudatvlivestreaming.m3u8",
    logo: "https://iili.io/FLSkGov.jpg"
  },
  {
    id: genId(),
    name: "INDOSIAR (LIVE)",
    url: "http://khano.nng.cloudns.us/live/m3u8/id/575eeb9f08dc8db.m3u8",
    logo: "https://iili.io/FLSUOrl.jpg"
  },
 {
    id: genId(),
    name: "SCTV SERVER 1 (LIVE)",
    url: "http://khano.nng.cloudns.us/live/m3u8/id/2b8fc230e8f847a.m3u8",
    logo: "https://iili.io/FLSE6SR.jpg"
  },
 {
    id: genId(),
    name: "SCTV SERVER 2 (LIVE)",
    url: "http://op-group1-swiftservehd-1.dens.tv/h/h217/01.m3u8",
    logo: "https://iili.io/FLSE6SR.jpg"
  },
 {
    id: genId(),
    name: "MDTV (LIVE)",
    url: "https://op-group1-swiftservesd-1.dens.tv/h/h06/index.m3u8",
    logo: "https://iili.io/FLSsI6u.jpg"
  },
{
    id: genId(),
    name: "MAGNA (LIVE)",
    url: "https://edge.medcom.id/live-edge/smil:magna.smil/playlist.m3u8",
    logo: "https://iili.io/FLU9DhJ.jpg"
  },
{
    id: genId(),
    name: "CNNINDONESIA (LIVE)",
    url: "https://live.cnnindonesia.com/livecnn/smil:cnntv.smil/playlist.m3u8",
    logo: "https://iili.io/FLU3PO7.jpg"
  },
{
    id: genId(),
    name: "CNBCINDONESIA (LIVE)",
    url: "https://live.cnbcindonesia.com/livecnbc/smil:cnbctv.smil/chunklist.m3u8",
    logo: "https://iili.io/FLUteuj.jpg"
  },
{
    id: genId(),
    name: "ALWAFA TV (LIVE)",
    url: "https://ammedia.siar.us/ammedia/live/playlist.m3u8",
    logo: "https://iili.io/FLUQqMP.jpg"
  },
{
    id: genId(),
    name: "NET TV (LIVE)",
    url: "http://boosstalive1-a.akamaihd.net/f894a6ebf56c4569bea516042afd1d55/ap-southeast-1/5664852414001/profile_0/chunklist.m3u8",
    logo: "https://iili.io/FLUaOa2.jpg"
  },
{
    id: genId(),
    name: "BANDUNG TV (LIVE)",
    url: "http://202.150.153.254:65500/bandungtvWEBSITE.m3u8",
    logo: "https://iili.io/FLUsI0g.jpg"
  },
{
    id: genId(),
    name: "BANTEN TV (LIVE)",
    url: "https://5bf7b725107e5.streamlock.net/bantentv/bantentv/playlist.m3u8",
    logo: "https://iili.io/FLU1nMg.jpg"
  },
{
    id: genId(),
    name: "BALIKAPAN TV (LIVE)",
    url: "https://5bf7b725107e5.streamlock.net/btv/btv/playlist.m3u8",
    logo: "https://iili.io/FLUSy3Q.jpg"
  },
{
    id: genId(),
    name: "TransTV (LIVE)",
    url: "https://video.detik.com/transtv/smil:transtv.smil/chunklist_w2114898498_b744100_sleng.m3u8",
    logo: "https://iili.io/FL4D46l.jpg"
  },
{
    id: genId(),
    name: "BTV (LIVE)",
    url: "https://btv.secureswiftcontent.com/han/btv/btv10005r/srtoutput/manifest.m3u8",
    logo: "https://iili.io/FLPYrNV.jpg"
  },
{
    id: genId(),
    name: "NusantaraTV (LIVE)",
    url: "https://nusantaratv.siar.us/nusantaratv/live/playlist.m3u8",
    logo: "https://iili.io/FLP7TIS.jpg"
  },
{
    id: genId(),
    name: "DaaiTV (LIVE)",
    url: "https://pull.daaiplus.com/live-DAAIPLUS/live-DAAIPLUS_HD.m3u8",
    logo: "https://iili.io/FL4bQlp.jpg"
  },
{
    id: genId(),
    name: "MNCTV (LIVE)",
    url: "https://sindikasi.inews.id/embed/video/YWdlbnQ9ZGVza3RvcCZ1cmw9aHR0cHMlM0ElMkYlMkZlbWJlZC5yY3RpcGx1cy5jb20lMkZsaXZlJTJGbW5jdHYlMkZpbmV3c2lkJmhlaWdodD0xMDAlMjUmd2lkdGg9MTAwJTI1",
    logo: "https://iili.io/FZJuRRe.png"
  },
]

// ----- Helpers -----
function genId(){ return Math.random().toString(36).slice(2,9) }

// localStorage key
const LS_KEY = "ultra_tv_playlist_v1"

// load saved or default
function loadPlaylist(){
  try {
    const raw = localStorage.getItem(LS_KEY)
    if(!raw) return DEFAULT_CHANNELS.slice()
    return JSON.parse(raw)
  } catch(e){
    console.error("load playlist", e)
    return DEFAULT_CHANNELS.slice()
  }
}
function savePlaylist(list){
  localStorage.setItem(LS_KEY, JSON.stringify(list))
}

// ----- App state -----
let channels = loadPlaylist()

// ----- UI refs -----
const channelsGrid = document.getElementById("channelsGrid")
const playerOverlay = document.getElementById("playerOverlay")
const videoEl = document.getElementById("video")
const playerTitle = document.getElementById("playerTitle")
const closePlayer = document.getElementById("closePlayer")
const fabAdd = document.getElementById("fabAdd")
const drawer = document.getElementById("drawer")
const menuBtn = document.getElementById("menuBtn")
const settingsBtn = document.getElementById("settingsBtn")
const closeDrawer = document.getElementById("closeDrawer")
const m3uInput = document.getElementById("m3uInput")
const loadM3U = document.getElementById("loadM3U")
const clearPlaylist = document.getElementById("clearPlaylist")
const addManual = document.getElementById("addManual")
const manualName = document.getElementById("manualName")
const manualUrl = document.getElementById("manualUrl")
const manualLogo = document.getElementById("manualLogo")
const searchInput = document.getElementById("searchInput")
const themeToggle = document.getElementById("themeToggle")
const pipBtn = document.getElementById("pipBtn")
const popoutBtn = document.getElementById("popoutBtn")

// ------- Render functions -------
function renderGrid(filter = ""){
  channelsGrid.innerHTML = ""
  const q = filter.trim().toLowerCase()
  const list = channels.filter(c => !q || c.name.toLowerCase().includes(q))
  if(list.length === 0){
    channelsGrid.innerHTML = `<div class="muted" style="padding:20px">Tidak ada channel</div>`
    return
  }
  list.forEach(ch => {
    const card = document.createElement("div")
    card.className = "card"
    card.dataset.id = ch.id
    card.innerHTML = `
      <img src="${escapeHtml(ch.logo || '')}" alt="${escapeHtml(ch.name)}" onerror="this.src='https://via.placeholder.com/120x80.png?text=No+Logo'">
      <div class="name">${escapeHtml(ch.name)}</div>
    `
    card.addEventListener("click", ()=> openPlayer(ch))
    // long-press to edit/remove (simple: right click)
    card.addEventListener("contextmenu", (ev)=>{
      ev.preventDefault()
      showCardContext(ch)
    })
    channelsGrid.appendChild(card)
  })
}

function shortUrl(u){
  try{
    const url = new URL(u)
    return url.hostname + (url.pathname.length>1? url.pathname.substring(0,12)+"…": "")
  }catch(e){
    return u.slice(0,28) + (u.length>28 ? "…" : "")
  }
}

function escapeHtml(s){ return (s||"").replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') }

// show edit/remove prompt
function showCardContext(ch){
  if(!confirm(`Edit channel "${ch.name}"?\nPilih OK untuk menghapus.`)) return
  // simple behavior: remove on OK
  channels = channels.filter(x=>x.id !== ch.id)
  savePlaylist(channels)
  renderGrid(searchInput.value)
}

// ------- Player -------
let hlsInstance = null
function openPlayer(channel){
  playerOverlay.classList.remove("hidden")
  playerOverlay.setAttribute("aria-hidden", "false")
  playerTitle.textContent = channel.name

  const iframe = document.getElementById("iframePlayer")

  stopPlayback() // reset video/hls

  if(channel.url.includes("embed")) {
    // mainkan via iframe
    videoEl.classList.add("hidden")
    iframe.classList.remove("hidden")
    iframe.src = channel.url
  } else {
    // mainkan via video/hls
    iframe.classList.add("hidden")
    iframe.src = ""
    videoEl.classList.remove("hidden")
    playUrl(channel.url)
  }
}

function closePlayerOverlay(){
  playerOverlay.classList.add("hidden")
  playerOverlay.setAttribute("aria-hidden", "true")
  stopPlayback()
}

function stopPlayback(){
  try{
    if(hlsInstance){
      hlsInstance.destroy()
      hlsInstance = null
    }
    videoEl.pause()
    videoEl.src = ""
    const iframe = document.getElementById("iframePlayer")
    iframe.src = ""
    iframe.classList.add("hidden")
  }catch(e){ console.warn(e) }
}


function playUrl(url){
  stopPlayback()
  // if browser supports native HLS (Safari), set src directly
  const isNative = videoEl.canPlayType('application/vnd.apple.mpegurl')
  if(!isNative && window.Hls && Hls.isSupported()){
    hlsInstance = new Hls()
    hlsInstance.loadSource(url)
    hlsInstance.attachMedia(videoEl)
    hlsInstance.on(Hls.Events.MANIFEST_PARSED, function() {
      videoEl.play().catch(()=>{})
    })
  } else {
    videoEl.src = url
    videoEl.play().catch(()=>{})
  }
}

// pip / popout
pipBtn.addEventListener("click", async ()=>{
  try {
    if(document.pictureInPictureElement){
      await document.exitPictureInPicture()
    } else if(videoEl.requestPictureInPicture){
      await videoEl.requestPictureInPicture()
    } else {
      alert("PiP tidak tersedia di browser ini.")
    }
  } catch(e){ console.error(e); alert("PiP error: "+e.message) }
})

popoutBtn.addEventListener("click", ()=>{
  window.open(videoEl.currentSrc || "", "_blank")
})

// UI events
closePlayer.addEventListener("click", closePlayerOverlay)
menuBtn.addEventListener("click", ()=> { drawer.classList.toggle("hidden") })
settingsBtn.addEventListener("click", ()=> { drawer.classList.toggle("hidden") })
closeDrawer.addEventListener("click", ()=> drawer.classList.add("hidden"))
fabAdd.addEventListener("click", ()=> {
  // quick open drawer and focus manual add
  drawer.classList.remove("hidden")
  manualName.focus()
})

// search
searchInput.addEventListener("input", (e)=> renderGrid(e.target.value))

// ---- M3U Loading ----
function parseM3U(content){
  // Very small parser: extracts name (from EXTINF) and url next line, supports tvg-logo attr.
  const lines = content.split(/\r?\n/).map(l=>l.trim()).filter(Boolean)
  const out = []
  for(let i=0;i<lines.length;i++){
    const ln = lines[i]
    if(ln.startsWith("#EXTINF")){
      const info = ln
      // try extract tvg-logo="..."
      let logo = ""
      const mLogo = info.match(/tvg-logo\s*=\s*"([^"]+)"/i)
      if(mLogo) logo = mLogo[1]
      // extract name after comma
      const nameMatch = info.split(",")
      const name = nameMatch.length>1 ? nameMatch.slice(1).join(",").trim() : "Unnamed"
      // find next line that's a URL
      let url = ""
      for(let j=i+1;j<lines.length;j++){
        if(!lines[j].startsWith("#")){
          url = lines[j]; break
        }
      }
      if(url) out.push({ id: genId(), name, url, logo })
    } else if(!ln.startsWith("#") && ln.includes("http")){
      // raw URL line without EXTINF -> create generic name
      out.push({ id: genId(), name: ln.split("/").pop() || ln, url: ln, logo: "" })
    }
  }
  return out
}

loadM3U.addEventListener("click", ()=>{
  const raw = m3uInput.value.trim()
  if(!raw){ alert("Masukkan URL M3U atau paste isi file M3U di textarea."); return }
  // if looks like URL -> try fetch (note: CORS may block)
  if(raw.startsWith("http://") || raw.startsWith("https://")){
    fetch(raw).then(r=>{
      if(!r.ok) throw new Error("Gagal fetch M3U")
      return r.text()
    }).then(text=>{
      const parsed = parseM3U(text)
      if(parsed.length === 0) alert("Tidak menemukan entri di M3U. Mungkin format berbeda.")
      else {
        channels = channels.concat(parsed)
        savePlaylist(channels)
        renderGrid(searchInput.value)
        alert(`Berhasil load ${parsed.length} channel dari playlist`)
        m3uInput.value = ""
      }
    }).catch(err=>{
      // fallback: treat raw as content if fetch fails
      const parsed = parseM3U(raw)
      if(parsed.length){
        channels = channels.concat(parsed)
        savePlaylist(channels)
        renderGrid(searchInput.value)
        m3uInput.value = ""
        alert(`Parsed ${parsed.length} channel dari input (fetch gagal).`)
      } else {
        alert("Gagal memuat M3U: " + err.message)
      }
    })
  } else {
    // treat as M3U content pasted
    const parsed = parseM3U(raw)
    if(parsed.length === 0) { alert("Tidak menemukan entri M3U di input.") }
    else {
      channels = channels.concat(parsed)
      savePlaylist(channels)
      renderGrid(searchInput.value)
      alert(`Berhasil parse ${parsed.length} channel dari input`)
      m3uInput.value = ""
    }
  }
})

// clear playlist
clearPlaylist.addEventListener("click", ()=>{
  if(!confirm("Hapus semua playlist dan kembalikan ke default?")) return
  channels = DEFAULT_CHANNELS.slice()
  savePlaylist(channels)
  renderGrid()
})

// add manual channel
addManual.addEventListener("click", ()=>{
  const name = manualName.value.trim()
  const url = manualUrl.value.trim()
  const logo = manualLogo.value.trim()
  if(!name || !url){ alert("Nama dan URL wajib"); return }
  channels.unshift({ id: genId(), name, url, logo })
  savePlaylist(channels)
  renderGrid(searchInput.value)
  manualName.value = manualUrl.value = manualLogo.value = ""
  alert("Channel ditambahkan")
})

// simple theme toggle (dark/light)
themeToggle.addEventListener("click", ()=>{
  const root = document.documentElement
  if(root.style.getPropertyValue("--bg") === ""){
    // set to light (simple inversion)
    root.style.setProperty("--bg","#f7fafc")
    root.style.setProperty("--card","#ffffff")
    root.style.setProperty("--text","#0b1220")
    root.style.setProperty("--muted","#475569")
    root.style.setProperty("--glass","rgba(2,6,23,0.03)")
  } else {
    // reset (reload styles to default by clearing inline)
    root.style.removeProperty("--bg")
    root.style.removeProperty("--card")
    root.style.removeProperty("--text")
    root.style.removeProperty("--muted")
    root.style.removeProperty("--glass")
  }
})

// save playlist before unload
window.addEventListener("beforeunload", ()=> savePlaylist(channels))

// quick edit: when pressing trash icon? (not present) — not required

// init
renderGrid()

// Utility: try to enable autoplay on mobile by user gesture; handled by click to open player

// Keep keyboard Escape to close player/drawer
document.addEventListener("keydown",(e)=>{
  if(e.key === "Escape"){
    closePlayerOverlay()
    drawer.classList.add("hidden")
  }
})
