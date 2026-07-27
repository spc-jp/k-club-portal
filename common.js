// NPO法人 越谷K・クラブ 共通パーツ
// このファイルを修正するだけで全ページに反映されます

var SITE = {
  name: "NPO法人 越谷K・クラブ",
  url: "https://k-club-portal.pages.dev",
  email: "koshigaya.k.club@gmail.com",
  facebook: "https://www.facebook.com/koshiga.k.club/",
  instagram: "https://www.instagram.com/",
};

var sitePath = window.location.pathname;
var isRoot = sitePath.indexOf("/boys/") === -1 && sitePath.indexOf("/central/") === -1;
var prefix = isRoot ? "" : "../";

// ========== 共通ヘッダー ==========
// メニューを増やしたい時は、下の NAV 配列に1行足すだけで全ページに反映されます。
var NAV = [
  { label: "法人について",     href: "about.html",   key: "about.html"  },
  { label: "越谷ボーイズ",     href: "boys/",        key: "/boys/"      },
  { label: "越谷中央ボーイズ", href: "central/",     key: "/central/"   },
  { label: "お知らせ",         href: "news.html",    key: "news.html"   },
  { label: "入団案内",         href: "join.html",    key: "join.html"   },
  { label: "よくある質問",     href: "faq.html",     key: "faq.html"    },
  { label: "アクセス",         href: "access.html",  key: "access.html" },
  { label: "お問い合わせ",     href: "contact.html", key: "contact.html", contact: true }
];

function injectHeader() {
  // 安全装置：ページに既にヘッダーが書かれている場合は何もしない（二重表示を防止）
  // → 各ページから古い <header> を消したページだけ、この共通ヘッダーが入ります
  if (document.querySelector("header")) { return; }

  var css = [
    ".kc-head{background:linear-gradient(100deg,#6e0000 0%,#8f0000 55%,#7d0012 100%);color:#fff;position:sticky;top:0;z-index:1000;box-shadow:0 2px 12px rgba(0,0,0,0.25);}",
    ".kc-inner{max-width:1120px;margin:0 auto;padding:10px 22px;display:flex;align-items:center;justify-content:space-between;gap:14px;box-sizing:border-box;}",
    ".kc-brand{display:flex;align-items:center;gap:12px;text-decoration:none;color:#fff;}",
    ".kc-brand img{width:46px;height:46px;border-radius:50%;flex:none;background:#fff;object-fit:cover;box-shadow:0 0 0 2px rgba(232,184,75,0.65);}",
    ".kc-name{font-weight:800;font-size:17px;letter-spacing:0.02em;line-height:1.25;}",
    ".kc-name small{display:block;font-size:10.5px;font-weight:600;color:#f0d9a6;letter-spacing:0.03em;}",
    ".kc-nav ul{list-style:none;display:flex;gap:3px;margin:0;padding:0;flex-wrap:wrap;justify-content:flex-end;align-items:center;}",
    ".kc-nav a{text-decoration:none;color:#fff;font-size:13.5px;font-weight:700;padding:8px 12px;border-radius:20px;white-space:nowrap;transition:background .2s,color .2s;}",
    ".kc-nav a:hover{background:rgba(255,255,255,0.15);}",
    ".kc-nav a.current{color:#e8b84b;}",
    ".kc-nav a.contact{background:#e8b84b;color:#5a0000;margin-left:4px;}",
    ".kc-nav a.contact:hover{background:#f3ca6a;}",
    "@media(max-width:820px){.kc-inner{flex-direction:column;align-items:stretch;}.kc-nav ul{justify-content:center;}}"
  ].join("");
  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  var path = window.location.pathname;

  // メニュー項目のHTMLを組み立て
  var lis = NAV.map(function(it){
    var cls = it.contact ? "contact" : "";
    // 現在ページをゴールドでハイライト
    if (path.indexOf(it.key) !== -1) {
      cls += (cls ? " " : "") + "current";
    }
    var clsAttr = cls ? ' class="' + cls + '"' : '';
    return '<li><a href="' + prefix + it.href + '"' + clsAttr + '>' + it.label + '</a></li>';
  }).join("");

  var header = document.createElement("header");
  header.className = "kc-head";
  header.innerHTML =
    '<div class="kc-inner">' +
      '<a class="kc-brand" href="' + prefix + 'index.html">' +
        '<img src="' + prefix + 'favicon.png" alt="越谷K・クラブ ロゴ">' +
        '<span class="kc-name">NPO法人 越谷K・クラブ<small>Koshigaya K-Club Baseball Organization</small></span>' +
      '</a>' +
      '<nav class="kc-nav"><ul>' + lis + '</ul></nav>' +
    '</div>';

  // ページの一番上に差し込む
  document.body.insertBefore(header, document.body.firstChild);
}

// ========== フローティングボタン ==========
function injectFloating() {
  var style = document.createElement("style");
  style.textContent = [
    ".floating-btns{position:fixed;right:20px;bottom:30px;display:flex;flex-direction:column;gap:10px;align-items:flex-end;z-index:9999;}",
    ".float-top{width:46px;height:46px;border-radius:50%;background:#8D0000;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 14px rgba(141,0,0,0.4);transition:all 0.2s;text-decoration:none;}",
    ".float-top:hover{background:#5a0000;transform:translateY(-3px);}",
    ".float-btn{display:flex;align-items:center;gap:8px;padding:11px 16px;border-radius:30px;font-size:12px;font-weight:700;letter-spacing:0.05em;box-shadow:0 4px 14px rgba(141,0,0,0.4);transition:all 0.2s;text-decoration:none;white-space:nowrap;}",
    ".float-btn:hover{transform:translateY(-3px);}",
    ".float-join{background:#8D0000;color:#fff;}",
    ".float-contact{background:#5a0000;color:#fff;}"
  ].join("");
  document.head.appendChild(style);

  var wrap = document.createElement("div");
  wrap.className = "floating-btns";

  // トップへ戻るボタン（タップ：ページトップ / 長押し：サイトトップ）
  var topBtn = document.createElement("a");
  topBtn.href = "#";
  topBtn.className = "float-top";
  topBtn.setAttribute("aria-label", "トップへ戻る");

  var topSvg = document.createElementNS("http://www.w3.org/2000/svg","svg");
  topSvg.setAttribute("width","20"); topSvg.setAttribute("height","20");
  topSvg.setAttribute("viewBox","0 0 24 24"); topSvg.setAttribute("fill","none");
  topSvg.setAttribute("stroke","#e8b84b"); topSvg.setAttribute("stroke-width","2.5");
  topSvg.setAttribute("stroke-linecap","round"); topSvg.setAttribute("stroke-linejoin","round");
  var topPath = document.createElementNS("http://www.w3.org/2000/svg","path");
  topPath.setAttribute("d","M18 15l-6-6-6 6");
  topSvg.appendChild(topPath);
  topBtn.appendChild(topSvg);

  // 長押し用タイマー
  var pressTimer = null;
  var isLongPress = false;

  // タッチ開始
  topBtn.addEventListener("touchstart", function(e){
    isLongPress = false;
    topBtn.style.background = "#e8b84b";
    pressTimer = setTimeout(function(){
      isLongPress = true;
      topBtn.style.background = "#e8b84b";
      // サイトトップへ移動
      var siteTop = isRoot ? "/" : "../";
      window.location.href = siteTop + "index.html";
    }, 800);
  }, {passive: true});

  // タッチ終了
  topBtn.addEventListener("touchend", function(e){
    clearTimeout(pressTimer);
    topBtn.style.background = "#8D0000";
    if(!isLongPress){
      e.preventDefault();
      window.scrollTo({top:0,behavior:"smooth"});
    }
  });

  // タッチキャンセル
  topBtn.addEventListener("touchcancel", function(){
    clearTimeout(pressTimer);
    topBtn.style.background = "#8D0000";
  });

  // PC用クリック
  topBtn.addEventListener("click", function(e){
    e.preventDefault();
    if(!isLongPress){ window.scrollTo({top:0,behavior:"smooth"}); }
  });

  // PC用ダブルクリック
  topBtn.addEventListener("dblclick", function(e){
    e.preventDefault();
    window.location.href = (isRoot ? "" : "../") + "index.html";
  });

  wrap.appendChild(topBtn);

  // 入団相談ボタン
  var joinBtn = document.createElement("a");
  joinBtn.href = prefix + "join.html";
  joinBtn.className = "float-btn float-join";
  joinBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e8b84b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M4.93 4.93c4.69 4.69 9.41 4.69 14.14 0"/><path d="M4.93 19.07c4.69-4.69 9.41-4.69 14.14 0"/></svg> 入団のご相談はこちら';
  wrap.appendChild(joinBtn);

  // お問い合わせボタン
  var contactBtn = document.createElement("a");
  contactBtn.href = prefix + "contact.html";
  contactBtn.className = "float-btn float-contact";
  contactBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e8b84b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> お問い合わせ';
  wrap.appendChild(contactBtn);

  document.body.appendChild(wrap);
}

// ========== JSON-LD ==========
function injectJsonLd() {
  var org = {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    "name": "NPO法人 越谷K・クラブ",
    "alternateName": ["越谷Kクラブ","Koshigaya K-Club"],
    "url": SITE.url,
    "email": SITE.email,
    "sport": "野球",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "越谷市",
      "addressRegion": "埼玉県",
      "addressCountry": "JP"
    },
    "sameAs": [SITE.facebook],
    "subOrganization": [
      {"@type":"SportsTeam","name":"越谷ボーイズ","url":SITE.url+"/boys/","sport":"野球"},
      {"@type":"SportsTeam","name":"越谷中央ボーイズ","url":SITE.url+"/central/","sport":"野球"}
    ]
  };
  var faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {"@type":"Question","name":"体験練習は無料ですか？","acceptedAnswer":{"@type":"Answer","text":"はい、体験練習は無料です。道具がなくても参加できます。"}},
      {"@type":"Question","name":"未経験者でも入団できますか？","acceptedAnswer":{"@type":"Answer","text":"はい、野球未経験者・初心者も大歓迎です。"}},
      {"@type":"Question","name":"越谷K・クラブはどこにありますか？","acceptedAnswer":{"@type":"Answer","text":"埼玉県越谷市を拠点として活動しています。"}},
      {"@type":"Question","name":"何歳から入団できますか？","acceptedAnswer":{"@type":"Answer","text":"小学生・中学生（男女問わず）が対象です。"}}
    ]
  };
  var s1 = document.createElement("script"); s1.type = "application/ld+json"; s1.text = JSON.stringify(org); document.head.appendChild(s1);
  var s2 = document.createElement("script"); s2.type = "application/ld+json"; s2.text = JSON.stringify(faq); document.head.appendChild(s2);
}

// ========== OGP ==========
function injectOgp() {
  var title = document.title || SITE.name;
  var descEl = document.querySelector('meta[name="description"]');
  var desc = descEl ? descEl.content : "越谷市の少年野球チーム。体験練習無料・随時入団募集中。";
  var tags = [
    ["og:type","website"],["og:site_name",SITE.name],["og:title",title],
    ["og:description",desc],["og:url",SITE.url+window.location.pathname],
    ["og:image",SITE.url+"/favicon.png"],["og:locale","ja_JP"],
    ["twitter:card","summary"],["twitter:title",title],["twitter:description",desc]
  ];
  tags.forEach(function(t){
    var name = t[0]; var content = t[1];
    if(!document.querySelector('meta[property="'+name+'"],meta[name="'+name+'"]')){
      var m = document.createElement("meta");
      if(name.indexOf("og:") === 0) m.setAttribute("property",name);
      else m.setAttribute("name",name);
      m.setAttribute("content",content);
      document.head.appendChild(m);
    }
  });
}

// ========== canonical ==========
function injectCanonical() {
  if(!document.querySelector('link[rel="canonical"]')){
    var l = document.createElement("link");
    l.rel = "canonical"; l.href = SITE.url + window.location.pathname;
    document.head.appendChild(l);
  }
}

// ========== Apple Touch Icon（iPhoneホーム画面用）==========
function injectAppleTouchIcon() {
  var isSubDir = window.location.pathname.indexOf("/boys/") !== -1 || window.location.pathname.indexOf("/central/") !== -1;
  var iconPath = isSubDir ? "../favicon.png" : "favicon.png";
  if(!document.querySelector('link[rel="apple-touch-icon"]')){
    var l = document.createElement("link");
    l.rel = "apple-touch-icon";
    l.setAttribute("sizes","200x200");
    l.href = iconPath;
    document.head.appendChild(l);
  }
  // iOSのステータスバー設定
  if(!document.querySelector('meta[name="apple-mobile-web-app-capable"]')){
    var m1 = document.createElement("meta");
    m1.name = "apple-mobile-web-app-capable";
    m1.content = "yes";
    document.head.appendChild(m1);
  }
  if(!document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')){
    var m2 = document.createElement("meta");
    m2.name = "apple-mobile-web-app-status-bar-style";
    m2.content = "black-translucent";
    document.head.appendChild(m2);
  }
  if(!document.querySelector('meta[name="apple-mobile-web-app-title"]')){
    var m3 = document.createElement("meta");
    m3.name = "apple-mobile-web-app-title";
    m3.content = "越谷K・クラブ";
    document.head.appendChild(m3);
  }
}

// ========== 実行 ==========
document.addEventListener("DOMContentLoaded", function() {
  injectHeader();
  injectFloating();
  injectJsonLd();
  injectOgp();
  injectCanonical();
  injectAppleTouchIcon();
});
