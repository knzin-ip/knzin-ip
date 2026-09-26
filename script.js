const DATA = {
  Apple: ["iPhone 11","iPhone 12","iPhone 13","iPhone 14","iPhone 15","iPhone 16","iPhone 16 Pro"],
  Samsung: ["Galaxy A14","Galaxy A24","Galaxy A34","Galaxy A54","Galaxy S21 FE","Galaxy S23","Galaxy S24"],
  Xiaomi: ["Redmi Note 11","Redmi Note 12","Redmi Note 13","Poco X3 Pro","Poco X5 Pro","Poco X6 Pro"],
  Motorola: ["Moto G54","Moto G84","Moto G85","Edge 30","Edge 40","Edge 50"],
  Realme: ["C55","C67","10 Pro","11 Pro","GT Neo 3"],
  ASUS: ["ROG Phone 5","ROG Phone 6","ROG Phone 7","ROG Phone 8"],
  Infinix: ["Hot 30","Hot 40","Note 30","GT 20 Pro"]
};

const brand = document.querySelector("#brand");
const model = document.querySelector("#model");
const search = document.querySelector("#search");
const styleButtons = [...document.querySelectorAll(".style")];
const styles = {rush:0, balanced:1, sniper:2};
let selectedStyle = "rush";

Object.keys(DATA).forEach(b => brand.add(new Option(b,b)));
function fillModels(filter=""){
  const list = DATA[brand.value] || [];
  model.innerHTML = "";
  list.filter(x=>x.toLowerCase().includes(filter.toLowerCase())).forEach(m=>model.add(new Option(m,m)));
}
fillModels();
brand.addEventListener("change",()=>fillModels());
search.addEventListener("input",()=>{
  const q=search.value.trim().toLowerCase();
  if(!q){fillModels();return}
  const found=[];
  Object.entries(DATA).forEach(([b,arr])=>arr.forEach(m=>{if(m.toLowerCase().includes(q)) found.push([b,m])}));
  model.innerHTML="";
  found.forEach(([b,m])=>model.add(new Option(`${b} · ${m}`,m)));
  if(found[0]) brand.value=found[0][0];
});
styleButtons.forEach(btn=>{
  btn.addEventListener("click",()=>{
    styleButtons.forEach(x=>x.classList.remove("active"));
    btn.classList.add("active"); selectedStyle=btn.dataset.style;
  });
});

function seedFromModel(str){
  return [...str].reduce((a,c)=>a+c.charCodeAt(0),0);
}
function generate(){
  const m=model.value || "Seu aparelho";
  const base=seedFromModel(brand.value+m)+styles[selectedStyle]*17;
  const clamp=(n)=>Math.max(1,Math.min(200,n));
  let g=clamp(150+(base%46)), r=clamp(135+(base%51)), x2=clamp(120+(base%55)), x4=clamp(100+(base%61)), awm=clamp(82+(base%69)), look=clamp(145+(base%48));
  if(selectedStyle==="rush"){g+=5;r+=6;look+=7}
  if(selectedStyle==="sniper"){g-=5;r-=3;x4+=8;awm+=10}
  const vals=[g,r,x2,x4,awm,look];
  ["sGeral","sRed","s2x","s4x","sAwm","sLook"].forEach((id,i)=>document.getElementById(id).textContent=vals[i]);
  document.getElementById("deviceLabel").textContent=`${brand.value} · ${m}`;
  document.getElementById("resultDevice").textContent=m;
  document.getElementById("profileName").textContent=selectedStyle==="rush"?"RUSH":selectedStyle==="sniper"?"SNIPER":"EQUILÍBRIO";
  document.getElementById("heroGeneral").textContent=g;
  window.currentConfig={marca:brand.value,modelo:m,estilo:selectedStyle,geral:g,ponto_vermelho:r,mira_2x:x2,mira_4x:x4,awm,olhadinha:look};
}
document.getElementById("generate").addEventListener("click",generate);
document.getElementById("randomHero").addEventListener("click",()=>{
  const brands=Object.keys(DATA); brand.value=brands[Math.floor(Math.random()*brands.length)]; fillModels();
  model.selectedIndex=Math.floor(Math.random()*model.options.length);
  const keys=Object.keys(styles); selectedStyle=keys[Math.floor(Math.random()*keys.length)];
  styleButtons.forEach(x=>x.classList.toggle("active",x.dataset.style===selectedStyle));
  generate(); document.querySelector("#gerador").scrollIntoView({behavior:"smooth"});
});
document.getElementById("copy").addEventListener("click",async()=>{
  if(!window.currentConfig){generate()}
  const c=window.currentConfig;
  const text=`SENSI LAB\n${c.marca} ${c.modelo}\nEstilo: ${c.estilo.toUpperCase()}\nGeral: ${c.geral}\nPonto Vermelho: ${c.ponto_vermelho}\nMira 2x: ${c.mira_2x}\nMira 4x: ${c.mira_4x}\nAWM/Sniper: ${c.awm}\nOlhadinha: ${c.olhadinha}`;
  try{await navigator.clipboard.writeText(text);toast("Configuração copiada!")}catch{toast("Selecione e copie a configuração pelo navegador.")}
});
document.getElementById("detect").addEventListener("click",()=>{
  const ua=navigator.userAgent.toLowerCase();
  let found=null;
  if(ua.includes("iphone")) found="Apple";
  else if(ua.includes("samsung")) found="Samsung";
  else if(ua.includes("xiaomi")||ua.includes("redmi")||ua.includes("poco")) found="Xiaomi";
  else if(ua.includes("motorola")) found="Motorola";
  if(found){brand.value=found;fillModels();toast(`Marca detectada: ${found}. Escolha o modelo.`)}
  else toast("Não foi possível identificar a marca automaticamente.");
});
document.getElementById("apply").addEventListener("click",()=>toast("Ajustes aplicados à sessão atual."));
function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.tt);window.tt=setTimeout(()=>t.classList.remove("show"),2800)}

const modal=document.getElementById("privateModal");
document.getElementById("openPrivate").onclick=()=>modal.classList.remove("hidden");
document.getElementById("closePrivate").onclick=()=>modal.classList.add("hidden");
modal.addEventListener("click",e=>{if(e.target===modal)modal.classList.add("hidden")});
document.getElementById("privateLogin").onclick=()=>{
  // TROQUE ESTA SENHA antes de publicar. Isto é apenas uma barreira de interface,
  // não um sistema de autenticação seguro para dados confidenciais.
  const PASSWORD="troque-esta-senha";
  const value=document.getElementById("privatePassword").value;
  if(value===PASSWORD){modal.classList.add("hidden");toast("Acesso liberado nesta sessão.");localStorage.setItem("privateUnlocked","1")}
  else toast("Senha incorreta.");
};

window.addEventListener("load",()=>generate());
