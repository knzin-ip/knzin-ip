const DATA = {
  Apple: ["iPhone 11","iPhone 11 Pro","iPhone 11 Pro Max","iPhone 12 mini","iPhone 12","iPhone 12 Pro","iPhone 12 Pro Max","iPhone 13 mini","iPhone 13","iPhone 13 Pro","iPhone 13 Pro Max","iPhone 14","iPhone 14 Plus","iPhone 14 Pro","iPhone 14 Pro Max","iPhone 15","iPhone 15 Plus","iPhone 15 Pro","iPhone 15 Pro Max","iPhone 16e","iPhone 16","iPhone 16 Plus","iPhone 16 Pro","iPhone 16 Pro Max","iPhone 17e","iPhone 17","iPhone Air","iPhone 17 Pro","iPhone 17 Pro Max","iPhone 18 Pro","iPhone 18 Pro Max"],
  Samsung: ["Galaxy A04","Galaxy A05","Galaxy A05s","Galaxy A06","Galaxy A14","Galaxy A15","Galaxy A16","Galaxy A22","Galaxy A23","Galaxy A24","Galaxy A25","Galaxy A26","Galaxy A32","Galaxy A33","Galaxy A34","Galaxy A35","Galaxy A36","Galaxy A52","Galaxy A53","Galaxy A54","Galaxy A55","Galaxy A56","Galaxy M12","Galaxy M13","Galaxy M14","Galaxy M15","Galaxy M23","Galaxy M32","Galaxy M34","Galaxy M54","Galaxy S20 FE","Galaxy S21 FE","Galaxy S21","Galaxy S21+","Galaxy S21 Ultra","Galaxy S22","Galaxy S22+","Galaxy S22 Ultra","Galaxy S23","Galaxy S23+","Galaxy S23 Ultra","Galaxy S24 FE","Galaxy S24","Galaxy S24+","Galaxy S24 Ultra","Galaxy S25","Galaxy S25+","Galaxy S25 Ultra","Galaxy S26","Galaxy S26+","Galaxy S26 Ultra","Galaxy Note 20","Galaxy Note 20 Ultra","Galaxy Z Flip 4","Galaxy Z Flip 5","Galaxy Z Flip 6","Galaxy Z Flip 7","Galaxy Z Fold 4","Galaxy Z Fold 5","Galaxy Z Fold 6","Galaxy Z Fold 7"],
  Xiaomi: ["Xiaomi 11 Lite 5G NE","Xiaomi 12","Xiaomi 12 Lite","Xiaomi 12T","Xiaomi 12T Pro","Xiaomi 13 Lite","Xiaomi 13","Xiaomi 13 Pro","Xiaomi 13T","Xiaomi 13T Pro","Xiaomi 14","Xiaomi 14 Pro","Xiaomi 14T","Xiaomi 14T Pro","Xiaomi 15","Xiaomi 15T Pro","Redmi 12C","Redmi 13C","Redmi 14C","Redmi Note 11","Redmi Note 11S","Redmi Note 11 Pro","Redmi Note 11 Pro+ 5G","Redmi Note 12","Redmi Note 12 5G","Redmi Note 12 Pro","Redmi Note 12 Pro+ 5G","Redmi Note 13","Redmi Note 13 5G","Redmi Note 13 Pro","Redmi Note 13 Pro+ 5G","Redmi Note 14","Redmi Note 14 5G","Redmi Note 14 Pro","Redmi Note 14 Pro+ 5G","Poco X3 Pro","Poco X4 Pro 5G","Poco X5","Poco X5 Pro 5G","Poco X6","Poco X6 Pro","Poco X7","Poco X7 Pro","Poco X8 Pro","Poco M4 5G","Poco M4 Pro","Poco M5","Poco M6","Poco M6 Pro","Poco C40","Poco C65","Poco C75","Poco M8 5G"],
  Motorola: ["Moto G22","Moto G23","Moto G24","Moto G24 Power","Moto G32","Moto G34 5G","Moto G42","Moto G52","Moto G53 5G","Moto G54 5G","Moto G55 5G","Moto G56 5G","Moto G62 5G","Moto G72","Moto G73 5G","Moto G84 5G","Moto G85 5G","Moto G86 5G","Moto G Stylus 5G","Moto Edge 20","Moto Edge 20 Pro","Moto Edge 30","Moto Edge 30 Neo","Moto Edge 30 Fusion","Moto Edge 30 Pro","Moto Edge 40","Moto Edge 40 Neo","Moto Edge 40 Pro","Moto Edge 50 Fusion","Moto Edge 50 Neo","Moto Edge 50 Pro","Moto Edge 50 Ultra","Moto Edge 60 Fusion","Moto Edge 60 Pro"],
  Realme: ["Realme C25","Realme C31","Realme C33","Realme C35","Realme C51","Realme C53","Realme C55","Realme C61","Realme C63","Realme C65","Realme 8","Realme 8 Pro","Realme 9","Realme 9 Pro","Realme 10","Realme 10 Pro","Realme 11","Realme 11 Pro","Realme 12","Realme 12 Pro","Realme 13","Realme 13 Pro","Realme 14","Realme 14 Pro","Realme GT Neo 2","Realme GT Neo 3","Realme GT 2","Realme GT 2 Pro","Realme GT 5","Realme GT 6","Realme GT 7"],
  ASUS: ["ROG Phone 5","ROG Phone 5s","ROG Phone 5 Ultimate","ROG Phone 6","ROG Phone 6D","ROG Phone 6 Pro","ROG Phone 7","ROG Phone 7 Ultimate","ROG Phone 8","ROG Phone 8 Pro","ROG Phone 9","ROG Phone 9 Pro","Zenfone 8","Zenfone 9","Zenfone 10","Zenfone 11 Ultra","Zenfone 12 Ultra"],
  Infinix: ["Hot 10","Hot 11","Hot 12","Hot 20","Hot 30","Hot 40","Hot 50","Hot 60","Note 10","Note 11","Note 12","Note 30","Note 40","Note 50","Zero 20","Zero 30","Zero 40","GT 10 Pro","GT 20 Pro","GT 30 Pro"]
};

const CHECKOUT_URLS = { "7":"https://pay.monetizze.com.br/KNH470681", "30":"https://pay.monetizze.com.br/KBH470773", "365":"https://pay.monetizze.com.br/KKU470784" };
const STORAGE_KEYS = { profile:"knzin_profile_v3", configs:"knzin_configs_v3", training:"knzin_training_v3", challenges:"knzin_challenges_v3" };
const state = { selectedStyle:"rush", aim:"precise", currentConfig:null, training:null, bestScore:Number(localStorage.getItem(STORAGE_KEYS.training)||0) };


/* ===== Supabase authentication / access ===== */
const SUPABASE_URL = "https://jusybpaerrfjbhrejbas.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_LzxWN9OtDmLeBXuxisIV_Q_eqjmLdrZ";
const SITE_URL = "https://knzin-ip.github.io/knzin-ip/";
const supabaseClient = window.supabase?.createClient
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
    })
  : null;

const authState = { user:null, grant:null, active:false, loading:true, mode:"login" };

function setAuthMessage(message, type=""){
  const el=$("authMessage"); if(!el) return;
  el.textContent=message || "";
  el.className=`auth-message ${type}`.trim();
}

function formatExpiry(iso){
  if(!iso) return "—";
  const d=new Date(iso);
  if(Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat("pt-BR", {dateStyle:"medium", timeStyle:"short"}).format(d);
}

function authLockHtml(){
  return `<div class="access-lock"><div class="access-lock-inner"><span>ACESSO RESTRITO</span><h3 id="lockTitle">Entre para continuar.</h3><p id="lockText">Faça login com seu e-mail para verificarmos se seu plano KNZIN.IP está ativo.</p><button class="generate-btn full-btn lock-login" type="button">ENTRAR / CRIAR CONTA <span>→</span></button></div></div>`;
}

function renderAccessLocks(){
  document.querySelectorAll(".members-only").forEach(section=>{
    let lock=section.querySelector(":scope > .access-lock");
    if(!lock){
      section.insertAdjacentHTML("afterbegin", authLockHtml());
      lock=section.querySelector(":scope > .access-lock");
    }
    const locked=!authState.active;
    section.classList.toggle("auth-locked", locked);
    if(lock){
      // Use both hidden and inline display so the overlay is guaranteed to disappear
      // after a valid access is detected, even if another stylesheet affects [hidden].
      lock.hidden=locked ? false : true;
      lock.style.display=locked ? "grid" : "none";
    }
  });
  document.querySelectorAll(".lock-login").forEach(btn=>{
    if(btn.dataset.bound) return;
    btn.dataset.bound="1";
    btn.addEventListener("click", ()=>openAuthModal("login"));
  });
}

function updateHeaderAuth(){
  const btn=$("openProfile"); if(!btn) return;
  if(authState.user){
    btn.textContent=authState.active ? "Minha conta" : "Conta";
  }else{
    btn.textContent="Entrar";
  }
}

function updateAccountPanel(){
  const email=$("accountEmail"), access=$("accountAccess"), form=$("authForm"), tabs=$("authTabs"), account=$("authAccount"), note=$("authNote"), title=$("authTitle"), desc=$("authDescription");
  if(!email || !access) return;
  if(authState.user){
    if(form) form.classList.add("hidden");
    if(tabs) tabs.classList.add("hidden");
    account?.classList.remove("hidden");
    if(note) note.classList.add("auth-note-hidden");
    email.textContent=authState.user.email || "Conta KNZIN.IP";
    if(authState.active && authState.grant){
      access.className="account-access active";
      access.innerHTML=`<strong>ACESSO ATIVO</strong><br>Plano: ${authState.grant.plan_days} dias<br>Válido até: ${formatExpiry(authState.grant.expires_at)}`;
    }else{
      access.className="account-access inactive";
      access.innerHTML=`<strong>SEM ACESSO ATIVO</strong><br>Use o mesmo e-mail da compra. Caso a compra já tenha sido aprovada, aguarde o processamento do webhook.`;
    }
    if(title) title.textContent="Sua conta.";
    if(desc) desc.textContent="Aqui você acompanha o estado do seu acesso ao KNZIN.IP.";
  }else{
    if(form) form.classList.remove("hidden");
    if(tabs) tabs.classList.remove("hidden");
    account?.classList.add("hidden");
    if(note) note.classList.remove("auth-note-hidden");
  }
}

function setAuthMode(mode){
  authState.mode=mode;
  document.querySelectorAll(".auth-tab").forEach(b=>b.classList.toggle("active",b.dataset.authMode===mode));
  const title=$("authTitle"), desc=$("authDescription"), submit=$("authSubmit"), password=$("authPassword"), note=$("authNote");
  setAuthMessage("");
  if(mode==="signup"){
    title.textContent="Crie sua conta.";
    desc.textContent="Use o mesmo e-mail da compra para vincular seu acesso ao KNZIN.IP.";
    submit.innerHTML='CRIAR CONTA <span>→</span>';
    password.autocomplete="new-password";
    note.textContent="Depois de criar a conta, confirme o e-mail recebido antes de entrar.";
  }else{
    title.textContent="Entre no seu painel.";
    desc.textContent="Use o mesmo e-mail da sua compra para que o sistema encontre seu acesso.";
    submit.innerHTML='ENTRAR <span>→</span>';
    password.autocomplete="current-password";
    note.textContent="A confirmação de e-mail está ativa para a sua conta.";
  }
}

function openAuthModal(mode="login"){
  $("authModal").classList.remove("hidden");
  if(authState.user){ updateAccountPanel(); return; }
  setAuthMode(mode);
  setTimeout(()=>$("authEmail")?.focus(),50);
}

async function doAuthSubmit(){
  if(!supabaseClient){ setAuthMessage("A autenticação não carregou. Atualize a página.","error"); return; }
  const email=$("authEmail").value.trim().toLowerCase();
  const password=$("authPassword").value;
  if(!email || !email.includes("@")){ setAuthMessage("Digite um e-mail válido.","error"); return; }
  if(password.length < 6){ setAuthMessage("A senha precisa ter pelo menos 6 caracteres.","error"); return; }
  const submit=$("authSubmit"); submit.disabled=true;
  try{
    if(authState.mode==="signup"){
      const {data,error}=await supabaseClient.auth.signUp({email,password,options:{emailRedirectTo:SITE_URL}});
      if(error) throw error;
      if(data.session){
        setAuthMessage("Conta criada e login realizado. Verificando seu acesso...","success");
        await refreshAccess();
      }else{
        setAuthMessage("Conta criada. Confirme o e-mail recebido e depois entre no KNZIN.IP.","success");
      }
    }else{
      const {error}=await supabaseClient.auth.signInWithPassword({email,password});
      if(error) throw error;
      setAuthMessage("Login realizado. Verificando seu acesso...","success");
      await refreshAccess();
    }
  }catch(error){
    setAuthMessage(error?.message || "Não foi possível concluir o acesso.","error");
  }finally{
    submit.disabled=false;
  }
}

async function forgotPassword(){
  if(!supabaseClient){
    setAuthMessage("A autenticação não carregou. Atualize a página.","error");
    return;
  }

  const email = $("authEmail").value.trim().toLowerCase();

  if(!email || !email.includes("@")){
    setAuthMessage("Digite seu e-mail para receber o link de recuperação.","error");
    return;
  }

  try{
    const {error}=await supabaseClient.auth.resetPasswordForEmail(email,{
      redirectTo:SITE_URL
    });

    if(error) throw error;

    setAuthMessage(
      "Enviamos um link para redefinir sua senha. Verifique seu e-mail.",
      "success"
    );
  }catch(error){
    setAuthMessage(
      error?.message || "Não foi possível enviar o e-mail de recuperação.",
      "error"
    );
  }
}
async function logout(){
  if(!supabaseClient) return;
  const {error}=await supabaseClient.auth.signOut();
  if(error){ toast(error.message); return; }
  authState.user=null; authState.grant=null; authState.active=false;
  updateHeaderAuth(); updateAccountPanel(); renderAccessLocks(); toast("Você saiu da conta.");
  $("authModal").classList.add("hidden");
}

async function refreshAccess(){
  authState.loading=true;
  if(!supabaseClient){
    authState.user=null; authState.grant=null; authState.active=false; authState.loading=false;
    updateHeaderAuth(); renderAccessLocks(); return;
  }
  try{
    const {data:{session}}=await supabaseClient.auth.getSession();
    authState.user=session?.user || null;
    authState.grant=null; authState.active=false;
    if(authState.user){
      const {data,error}=await supabaseClient
        .from("access_grants")
        .select("plan_days, status, starts_at, expires_at, kiwify_order_id")
        .eq("user_id", authState.user.id)
        .order("expires_at",{ascending:false})
        .limit(1)
        .maybeSingle();
      if(error){
        console.error("Access check error",error);
        setAuthMessage("Não foi possível verificar seu acesso agora. Tente novamente em alguns segundos.","error");
      }else if(data){
        authState.grant=data;
        authState.active=data.status==="active" && new Date(data.expires_at).getTime()>Date.now();
      }
    }
  }catch(error){
    console.error(error);
    authState.user=null; authState.grant=null; authState.active=false;
  }finally{
    authState.loading=false;
    updateHeaderAuth(); updateAccountPanel(); renderAccessLocks();
  }
}
function openPasswordRecovery(){
  const newPassword=prompt("Digite sua nova senha:");

  if(!newPassword){
    return;
  }

  if(newPassword.length<6){
    alert("A senha precisa ter pelo menos 6 caracteres.");
    return;
  }

  supabaseClient.auth.updateUser({
    password:newPassword
  }).then(({error})=>{
    if(error){
      alert(error.message);
      return;
    }

    alert("Senha alterada com sucesso!");
    window.location.href=SITE_URL;
  });
}
function requireAccess(message="Entre para acessar o painel do KNZIN.IP."){
  if(authState.active) return true;
  openAuthModal(authState.user ? "login" : "login");
  setTimeout(()=>setAuthMessage(message, "error"),60);
  return false;
}



if(supabaseClient){
  supabaseClient.auth.onAuthStateChange((event, session)=>{
    if(event === "PASSWORD_RECOVERY"){
      setTimeout(()=>{
        openPasswordRecovery();
      },100);
      return;
    }

    setTimeout(refreshAccess,0);
  });
}document.addEventListener("DOMContentLoaded",()=>{
  document.querySelectorAll(".auth-tab").forEach(btn=>btn.addEventListener("click",()=>setAuthMode(btn.dataset.authMode)));
  $("authSubmit")?.addEventListener("click",doAuthSubmit);
  $("forgotPasswordBtn")?.addEventListener("click",forgotPassword);
  $("closeAuth")?.addEventListener("click",async()=>{
    $("authModal").classList.add("hidden");
    // Re-check access when the account modal is closed so the page unlocks immediately.
    await refreshAccess();
  });
  $("logoutBtn")?.addEventListener("click",logout);
  $("authModal")?.addEventListener("click",e=>{if(e.target===e.currentTarget)e.currentTarget.classList.add("hidden")});
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{
    const target=a.getAttribute("href");
    if(["#gerador","#salvas","#treino","#desafios"].includes(target) && !authState.active){
      e.preventDefault(); requireAccess("Faça login e tenha um acesso ativo para continuar.");
    }
  }));
  refreshAccess();
});

const $ = (id)=>document.getElementById(id);
const brand = $("brand"), model = $("model"), search = $("search");
const styleButtons = [...document.querySelectorAll(".style")];
const aimButtons = [...document.querySelectorAll(".segment")];

function safeJSON(key, fallback){ try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } }
function saveJSON(key, value){ localStorage.setItem(key, JSON.stringify(value)); }
function toast(msg){ const t=$("toast"); t.textContent=msg; t.classList.add("show"); clearTimeout(window.__toastTimer); window.__toastTimer=setTimeout(()=>t.classList.remove("show"),2600); }
function seed(str){ return [...str].reduce((a,c)=>a+c.charCodeAt(0),0); }
function clamp(n,min=1,max=200){ return Math.max(min,Math.min(max,Math.round(n))); }
function getResolutionValue(){ const r=$("resolution").value; return r === "auto" ? 1080 : Number(r); }

Object.keys(DATA).forEach(b=>brand.add(new Option(b,b)));
function fillModels(filter=""){
  const list=DATA[brand.value]||[]; model.innerHTML="";
  list.filter(x=>x.toLowerCase().includes(filter.toLowerCase())).forEach(m=>model.add(new Option(m,m)));
}
fillModels();
brand.addEventListener("change",()=>{fillModels(search.value.trim());});
search.addEventListener("input",()=>{
  const q=search.value.trim().toLowerCase();
  if(!q){fillModels();return;}
  const found=[]; Object.entries(DATA).forEach(([b,arr])=>arr.forEach(m=>{if(m.toLowerCase().includes(q))found.push([b,m]);}));
  model.innerHTML=""; found.forEach(([b,m])=>model.add(new Option(`${b} · ${m}`,m)));
  if(found[0]) brand.value=found[0][0];
});
styleButtons.forEach(btn=>btn.addEventListener("click",()=>{styleButtons.forEach(x=>x.classList.remove("active"));btn.classList.add("active");state.selectedStyle=btn.dataset.style;}));
aimButtons.forEach(btn=>btn.addEventListener("click",()=>{aimButtons.forEach(x=>x.classList.remove("active"));btn.classList.add("active");state.aim=btn.dataset.aim;}));

function generate(){
  const m=model.value||"Seu aparelho";
  const dpi=Number($("dpi").value), fps=Number($("fps").value), res=getResolutionValue();
  const base=seed(brand.value+m)+seed(state.selectedStyle)+seed(state.aim);
  const dpiFactor=(dpi-550)*0.055, fpsFactor=(fps-90)*0.07, resFactor=(1080-res)*0.018;
  const aimFactor={precise:-2,fast:5,balanced:1}[state.aim];
  const styleMod={rush:5,balanced:0,sniper:-5}[state.selectedStyle];
  const g=clamp(152+(base%38)+dpiFactor+fpsFactor+resFactor+aimFactor+styleMod);
  const r=clamp(139+(base%36)+dpiFactor+fpsFactor+aimFactor+(state.selectedStyle==='rush'?5:0));
  const x2=clamp(126+(base%34)+dpiFactor*.7+fpsFactor+resFactor);
  const x4=clamp(108+(base%39)+dpiFactor*.6+fpsFactor+resFactor+(state.selectedStyle==='sniper'?7:0));
  const awm=clamp(84+(base%45)+dpiFactor*.4+fpsFactor*.8+resFactor+(state.selectedStyle==='sniper'?11:0));
  const look=clamp(147+(base%31)+dpiFactor*.75+fpsFactor*.5+aimFactor+(state.selectedStyle==='rush'?7:0));
  const vals={geral:g,ponto_vermelho:r,mira_2x:x2,mira_4x:x4,awm,olhadinha:look};
  $("sGeral").textContent=g;$("sRed").textContent=r;$("s2x").textContent=x2;$("s4x").textContent=x4;$("sAwm").textContent=awm;$("sLook").textContent=look;
  $("deviceLabel").textContent=`${brand.value} · ${m}`;
  $("profileName").textContent=state.selectedStyle==='rush'?"RUSH":state.selectedStyle==='sniper'?"SNIPER":"EQUILÍBRIO";
  $("resultPerformance").textContent=`${dpi} / ${fps}`;
  $("resultResolution").textContent=$("resolution").value==='auto'?"Automática":`${res}p`;
  $("heroGeneral").textContent=g; $("heroStyle").textContent=$("profileName").textContent;
  state.currentConfig={marca:brand.value,modelo:m,estilo:state.selectedStyle,preferencia:state.aim,dpi,fps,resolucao:$("resolution").value,...vals,timestamp:new Date().toISOString()};
}
$("generate").addEventListener("click",()=>{if(!requireAccess("Faça login com um acesso ativo para gerar configurações."))return;generate();toast("Configuração gerada!");});
$("detect").addEventListener("click",()=>{ if(!requireAccess("Faça login com um acesso ativo para usar a detecção do aparelho."))return;
  const ua=navigator.userAgent.toLowerCase();
  let found=null;
  if(ua.includes("iphone"))found="Apple"; else if(ua.includes("samsung"))found="Samsung"; else if(ua.includes("xiaomi")||ua.includes("redmi")||ua.includes("poco"))found="Xiaomi"; else if(ua.includes("motorola"))found="Motorola"; else if(ua.includes("infinix"))found="Infinix"; else if(ua.includes("asus"))found="ASUS"; else if(ua.includes("realme"))found="Realme";
  if(found){brand.value=found;fillModels();toast(`Marca detectada: ${found}. Escolha o modelo.`);} else toast("Não foi possível identificar a marca automaticamente.");
});
$("copy").addEventListener("click",async()=>{ if(!requireAccess("Faça login com um acesso ativo para copiar sua configuração."))return;
  if(!state.currentConfig)generate();
  const c=state.currentConfig;
  const text=["KNZIN.IP — CONFIGURAÇÃO","",`${c.marca} ${c.modelo}`,`Estilo: ${c.estilo.toUpperCase()}`,`Preferência: ${c.preferencia.toUpperCase()}`,`DPI: ${c.dpi}`,`FPS: ${c.fps}`,`Resolução: ${c.resolucao==='auto'?"Automática":c.resolucao+"p"}`,"",`Geral: ${c.geral}`,`Ponto Vermelho: ${c.ponto_vermelho}`,`Mira 2x: ${c.mira_2x}`,`Mira 4x: ${c.mira_4x}`,`AWM/Sniper: ${c.awm}`,`Olhadinha: ${c.olhadinha}`].join("\n");
  try{await navigator.clipboard.writeText(text);toast("Configuração copiada!");}catch{toast("Não foi possível copiar automaticamente.");}
});

function getConfigs(){return safeJSON(STORAGE_KEYS.configs,[])}
function renderSaved(){
  const arr=getConfigs(); $("savedList").innerHTML="";
  if(!arr.length){$("savedList").innerHTML='<div class="empty-state">Nenhuma configuração salva ainda. Gere uma e clique em ★ SALVAR.</div>';} else arr.slice(0,8).forEach((c,i)=>{
    const item=document.createElement("div"); item.className="saved-item";
    item.innerHTML=`<div><b>${c.marca} · ${c.modelo}</b><small>${c.estilo.toUpperCase()} · DPI ${c.dpi} · ${c.fps} FPS · ${c.geral}/${c.ponto_vermelho}/${c.mira_2x}</small></div><div class="saved-actions"><button data-action="load" data-index="${i}">USAR</button><button data-action="remove" data-index="${i}">×</button></div>`;
    $("savedList").appendChild(item);
  });
  $("profileConfigs").textContent=arr.length; $("heroConfigs").textContent=arr.length;
}
$("saveConfig").addEventListener("click",()=>{if(!requireAccess("Faça login com um acesso ativo para salvar configurações."))return;if(!state.currentConfig)generate();const arr=getConfigs();const c={...state.currentConfig,id:crypto.randomUUID?crypto.randomUUID():String(Date.now())};arr.unshift(c);saveJSON(STORAGE_KEYS.configs,arr.slice(0,20));addXP(10);renderSaved();toast("Configuração salva no seu perfil.");});
$("savedList").addEventListener("click",e=>{
  const btn=e.target.closest("button"); if(!btn)return; const arr=getConfigs(); const idx=Number(btn.dataset.index); const c=arr[idx]; if(!c)return;
  if(btn.dataset.action==="remove"){arr.splice(idx,1);saveJSON(STORAGE_KEYS.configs,arr);renderSaved();toast("Configuração removida.");return;}
  brand.value=c.marca; fillModels(); model.value=c.modelo; $("dpi").value=String(c.dpi); $("fps").value=String(c.fps); $("resolution").value=String(c.resolucao); state.selectedStyle=c.estilo;state.aim=c.preferencia; styleButtons.forEach(x=>x.classList.toggle("active",x.dataset.style===state.selectedStyle));aimButtons.forEach(x=>x.classList.toggle("active",x.dataset.aim===state.aim));generate();document.querySelector("#gerador").scrollIntoView({behavior:"smooth"});toast("Configuração carregada.");
});
$("clearSaved").addEventListener("click",()=>{if(!requireAccess("Faça login com um acesso ativo para gerenciar seu histórico."))return;if(!getConfigs().length)return;saveJSON(STORAGE_KEYS.configs,[]);renderSaved();toast("Histórico limpo.");});

function getProfile(){return safeJSON(STORAGE_KEYS.profile,{nickname:"KNZIN PLAYER",xp:0,challenges:0});}
function setProfile(p){saveJSON(STORAGE_KEYS.profile,p);renderProfile();}
function renderProfile(){const p=getProfile();const level=Math.floor(p.xp/100)+1,levelXp=p.xp%100;$("profileNickname").textContent=p.nickname;$("profileLevel").textContent=level;$("profileXp").textContent=p.xp;$("profileXpBar").style.width=levelXp+"%";$("profileChallenges").textContent=p.challenges;$("heroLevel").textContent=level;$("heroScore").textContent=state.bestScore;$("profileTraining").textContent=state.bestScore;}
function addXP(amount){const p=getProfile();p.xp+=amount;setProfile(p);}
$("openProfile").onclick=()=>{ if(authState.user) openAuthModal(); else openAuthModal("login"); };
$("editProfile").onclick=()=>openProfileModal();
function openProfileModal(){const p=getProfile();$("nicknameInput").value=p.nickname;$("profileModal").classList.remove("hidden");}
$("closeProfile").onclick=()=>$("profileModal").classList.add("hidden");$("saveNickname").onclick=()=>{const nickname=$("nicknameInput").value.trim()||"KNZIN PLAYER";const p=getProfile();p.nickname=nickname;setProfile(p);$("profileModal").classList.add("hidden");toast("Perfil atualizado.");};
$("openPlans")?.addEventListener("click",()=>{
  $("plansModal")?.classList.remove("hidden");
});

$("closePlans")?.addEventListener("click",()=>{
  $("plansModal")?.classList.add("hidden");
});

$("closePlansBtn")?.addEventListener("click",()=>{
  $("plansModal")?.classList.add("hidden");
});

$("buy7Days")?.addEventListener("click",()=>{
  window.location.href=CHECKOUT_URLS["7"];
});

$("buy30Days")?.addEventListener("click",()=>{
  window.location.href=CHECKOUT_URLS["30"];
});
$("buy365Days")?.addEventListener("click", ()=>{
  window.location.href=CHECKOUT_URLS["365"];
});
function dayKey(){return new Date().toISOString().slice(0,10)}
const challengeTemplates=[{title:"Gerar uma configuração",desc:"Gere uma nova sensibilidade para qualquer aparelho.",xp:15},{title:"Treinar reflexo",desc:"Complete uma sessão de treino sem sair antes do fim.",xp:25},{title:"Salvar uma configuração",desc:"Salve pelo menos uma configuração no seu histórico.",xp:10}];
function renderChallenges(){const saved=safeJSON(STORAGE_KEYS.challenges,{});const day=dayKey();if(saved.day!==day){saved.day=day;saved.done={};saveJSON(STORAGE_KEYS.challenges,saved);}const box=$("challengeGrid");box.innerHTML="";challengeTemplates.forEach((c,i)=>{const done=!!saved.done?.[i];const el=document.createElement("article");el.className="challenge-card";el.innerHTML=`<span class="challenge-tag">DESAFIO ${String(i+1).padStart(2,"0")}</span><h3>${c.title}</h3><p>${c.desc}</p><div class="challenge-foot"><span class="challenge-xp">+${c.xp} XP</span><button class="challenge-action ${done?"done":""}" data-index="${i}">${done?"CONCLUÍDO":"MARCAR FEITO"}</button></div>`;box.appendChild(el);});}
$("challengeGrid").addEventListener("click",e=>{if(!requireAccess("Faça login com um acesso ativo para concluir desafios."))return;const btn=e.target.closest("button");if(!btn)return;const i=Number(btn.dataset.index);const saved=safeJSON(STORAGE_KEYS.challenges,{day:dayKey(),done:{}});if(saved.done?.[i])return; saved.done=saved.done||{};saved.done[i]=true;saveJSON(STORAGE_KEYS.challenges,saved);const p=getProfile();p.challenges=(p.challenges||0)+1;saveJSON(STORAGE_KEYS.profile,p);addXP(challengeTemplates[i].xp);renderChallenges();toast("Desafio concluído. XP adicionado!");});

function positionTarget(){const stage=$("trainingStage");const existing=stage.querySelector(".target"); if(existing)existing.remove(); const target=document.createElement("button");target.className="target";const maxX=stage.clientWidth-58,maxY=stage.clientHeight-58;target.style.left=`${18+Math.random()*Math.max(1,maxX-36)}px`;target.style.top=`${48+Math.random()*Math.max(1,maxY-66)}px`;target.addEventListener("click",onHit);stage.appendChild(target);}
function onHit(e){e.stopPropagation();if(!state.training?.running)return;state.training.hits++;$("hits").textContent=state.training.hits;positionTarget();}
function endTraining(){
  if(!state.training)return;
  state.training.running=false;
  clearInterval(state.training.interval);
  state.training.interval=null;
  const score=Math.max(0,state.training.hits*10-state.training.misses*3);
  const isNewRecord=score>state.bestScore;
  if(isNewRecord){
    state.bestScore=score;
    localStorage.setItem(STORAGE_KEYS.training,String(state.bestScore));
    addXP(25);
  }
  $("bestScore").textContent=state.bestScore;
  $("trainingState").textContent="FINALIZADO";
  $("trainingTimer").textContent="20s";
  const target=$("trainingStage").querySelector(".target");
  if(target)target.remove();
  const center=$("trainingStage").querySelector(".stage-center");
  if(center)center.innerHTML=`<strong>RESULTADO: ${score} PONTOS</strong><small>${state.training.hits} acertos · ${state.training.misses} erros</small><button class="start-training" id="startTraining">TENTAR NOVAMENTE</button>`;
  $("startTraining").onclick=startTraining;
  renderProfile();
  renderChallenges();
  toast(isNewRecord?"Novo recorde! +25 XP":"Treino finalizado.");
}
function startTraining(){
  if(!requireAccess("Faça login com um acesso ativo para iniciar o treino."))return;
  const stage=$("trainingStage");
  stage.innerHTML='<div class="stage-center"><strong>ACESSE OS ALVOS</strong><small>20 segundos</small></div>';
  state.training={running:true,hits:0,misses:0,seconds:20,interval:null};
  $("hits").textContent="0";
  $("misses").textContent="0";
  $("trainingState").textContent="EM TREINO";
  $("trainingTimer").textContent="20s";
  stage.onclick=(event)=>{
    if(!state.training?.running)return;
    if(event.target.closest('.target'))return;
    state.training.misses++;
    $("misses").textContent=state.training.misses;
  };
  positionTarget();
  state.training.interval=setInterval(()=>{
    if(!state.training?.running)return;
    state.training.seconds--;
    $("trainingTimer").textContent=`${state.training.seconds}s`;
    if(state.training.seconds<=0)endTraining();
  },1000);
}
$("startTraining").onclick=startTraining;


const tipText={"Como testar uma sensibilidade":"Faça mudanças pequenas e controladas. Escolha uma configuração, treine, anote o resultado e compare apenas um ajuste por vez. Isso facilita entender o que realmente mudou.","DPI, FPS e toque":"DPI, FPS e resolução alteram a sensação do toque. Use os mesmos parâmetros durante o teste para conseguir uma comparação consistente.","Monte uma rotina de treino":"Comece com cinco minutos. Faça um treino de reflexo, depois teste a sensibilidade e registre seu melhor resultado. A repetição cria uma referência melhor do que trocar tudo a cada partida."};
document.querySelectorAll(".tip-open").forEach(btn=>btn.addEventListener("click",()=>{$("tipTitle").textContent=btn.dataset.tip;$("tipBody").textContent=tipText[btn.dataset.tip]||"Dica em preparação.";$("tipModal").classList.remove("hidden");}));
$("closeTip").onclick=()=>$("tipModal").classList.add("hidden");$("closeTipBtn").onclick=()=>$("tipModal").classList.add("hidden");

document.querySelectorAll(".plan-btn").forEach(btn=>btn.addEventListener("click",(e)=>{const key=btn.dataset.plan;const url=CHECKOUT_URLS[key];if(url){btn.href=url;return;}e.preventDefault();toast("O checkout da Kiwify será conectado neste botão antes da publicação final.");}));

renderProfile();renderSaved();renderChallenges();renderAccessLocks();generate();
