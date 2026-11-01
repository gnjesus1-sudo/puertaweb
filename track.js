/* Puerta Web: visitas y formularios guardados en Supabase (sin cookies) */
(function(){
  var URL="https://hhygvkdfdgmrcvnvicci.supabase.co",KEY="sb_publishable_iCLa8SskhWH9WvDmKzZCGg_lYKzDRgI";
  function post(table,row){
    return fetch(URL+"/rest/v1/"+table,{method:"POST",keepalive:true,headers:{"apikey":KEY,"Authorization":"Bearer "+KEY,"Content-Type":"application/json","Prefer":"return=minimal"},body:JSON.stringify(row)})
      .then(function(r){if(!r.ok)throw new Error(r.status);return true;});
  }
  function get(path){return fetch(URL+"/rest/v1/"+path,{headers:{"apikey":KEY,"Authorization":"Bearer "+KEY}}).then(function(r){return r.ok?r.json():[]});}
  function source(ref){
    try{var p=new URLSearchParams(location.search).get("utm_source");if(p)return p.slice(0,60);}catch(e){}
    if(!ref)return "Directo";
    var h;try{h=new URL(ref).hostname.replace(/^www\./,"");}catch(e){return "Otro";}
    if(h===location.hostname)return null;
    var m=[["google","Google"],["bing","Bing"],["instagram","Instagram"],["facebook","Facebook"],["fb.","Facebook"],["t.co","X / Twitter"],["twitter","X / Twitter"],["linkedin","LinkedIn"],["tiktok","TikTok"],["whatsapp","WhatsApp"],["discord","Discord"],["yahoo","Yahoo"],["duckduckgo","DuckDuckGo"],["fiverr","Fiverr"]];
    for(var i=0;i<m.length;i++)if(h.indexOf(m[i][0])>-1)return m[i][1];
    return h.slice(0,60);
  }
  window.PW={
    lead:function(o){return post("leads",o);},
    review:function(o){return post("reviews",o);},
    published:function(){return get("reviews?select=nombre,negocio,puntuacion,opinion,created_at&status=eq.publicada&order=created_at.desc&limit=12");}
  };
  try{if(localStorage.getItem("pw_owner")==="1")return;}catch(e){}
  if(!/^https?:$/.test(location.protocol)||/localhost|127\.0\.0\.1/.test(location.hostname))return;
  var first=false;try{if(!sessionStorage.getItem("pw_s")){sessionStorage.setItem("pw_s","1");first=true;}}catch(e){}
  var w=Math.min(screen.width,screen.height),dev=/Mobi|Android|iPhone/i.test(navigator.userAgent)?(w>=600?"tablet":"movil"):(/iPad|Tablet/i.test(navigator.userAgent)?"tablet":"ordenador");
  var src=source(document.referrer);
  post("visits",{path:(location.pathname+location.hash).slice(0,300),referrer:document.referrer?document.referrer.slice(0,300):null,source:src||"Interno",device:dev,lang:(navigator.language||"").slice(0,20),first_in_session:first}).catch(function(){});
})();
