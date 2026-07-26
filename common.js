
// NPO法人 越谷K・クラブ 共通パーツ
// このファイルを修正するだけで全ページに反映されます

const SITE = {
  name: "NPO法人 越谷K・クラブ",
  nameEn: "Koshigaya K-Club Baseball Organization",
  url: "https://k-club-portal.pages.dev",
  email: "koshigaya.k.club@gmail.com",
  facebook: "https://www.facebook.com/koshiga.k.club/",
  instagram: "https://www.instagram.com/",
  color: "#8D0000",
};

// ページの種類を判定
const path = window.location.pathname;
const isRoot = !path.includes("/boys/") && !path.includes("/central/");
const isBoys = path.includes("/boys/");
const isCentral = path.includes("/central/");
const prefix = (isRoot) ? "" : "../";

// ========== フローティングボタン ==========
function injectFloating() {
  const style = document.createElement("style");
  style.textContent = `
    .floating-btns{position:fixed;right:20px;bottom:30px;display:flex;flex-direction:column;gap:10px;align-items:flex-end;z-index:9999;}
    .float-top{width:46px;height:46px;border-radius:50%;background:#8D0000;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 14px rgba(141,0,0,0.4);transition:all 0.2s;text-decoration:none;}
    .float-top:hover{background:#5a0000;transform:translateY(-3px);}
    .float-btn{display:flex;align-items:center;gap:8px;padding:11px 16px;border-radius:30px;font-size:12px;font-weight:700;letter-spacing:0.05em;box-shadow:0 4px 14px rgba(141,0,0,0.4);transition:all 0.2s;text-decoration:none;white-space:nowrap;font-family:"Noto Sans JP",sans-serif;}
    .float-btn:hover{transform:translateY(-3px);box-shadow:0 8px 20px rgba(141,0,0,0.5);}
    .float-join{background:#8D0000;color:#fff;}
    .float-contact{background:#5a0000;color:#fff;}
    @media(max-width:480px){.float-btn span{display:none;}.float-btn{padding:11px;border-radius:50%;width:46px;height:46px;justify-content:center;}}
  `;
  document.head.appendChild(style);

  const div = document.createElement("div");
  div.className = "floating-btns";
  div.innerHTML = `
    <a href="#" onclick="window.scrollTo({top:0,behavior:'smooth'});return false;" class="float-top" aria-label="トップへ戻る">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e8b84b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>
    </a>
    <a href="${prefix}join.html" class="float-btn float-join">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e8b84b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M4.93 4.93c4.69 4.69 9.41 4.69 14.14 0"/><path d="M4.93 19.07c4.69-4.69 9.41-4.69 14.14 0"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/></svg>
      <span>入団のご相談はこちら</span>
    </a>
    <a href="${prefix}contact.html" class="float-btn float-contact">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e8b84b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
      <span>お問い合わせ</span>
    </a>
  `;
  document.body.appendChild(div);
}

// ========== JSON-LD 構造化データ ==========
function injectJsonLd() {
  const org = {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    "name": "NPO法人 越谷K・クラブ",
    "alternateName": ["越谷Kクラブ", "Koshigaya K-Club"],
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
      {
        "@type": "SportsTeam",
        "name": "越谷ボーイズ",
        "url": SITE.url + "/boys/",
        "sport": "野球",
        "memberOf": {"@type": "SportsOrganization", "name": "NPO法人 越谷K・クラブ"}
      },
      {
        "@type": "SportsTeam",
        "name": "越谷中央ボーイズ",
        "url": SITE.url + "/central/",
        "sport": "野球",
        "memberOf": {"@type": "SportsOrganization", "name": "NPO法人 越谷K・クラブ"}
      }
    ]
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "越谷ボーイズの体験練習は無料ですか？",
        "acceptedAnswer": {"@type": "Answer", "text": "はい、体験練習は無料です。道具がなくても参加できます。"}
      },
      {
        "@type": "Question",
        "name": "未経験者でも入団できますか？",
        "acceptedAnswer": {"@type": "Answer", "text": "はい、野球未経験者・初心者も大歓迎です。丁寧に指導します。"}
      },
      {
        "@type": "Question",
        "name": "越谷K・クラブはどこにありますか？",
        "acceptedAnswer": {"@type": "Answer", "text": "埼玉県越谷市を拠点として活動しています。越谷ボーイズと越谷中央ボーイズの2チームが所属しています。"}
      },
      {
        "@type": "Question",
        "name": "何歳から入団できますか？",
        "acceptedAnswer": {"@type": "Answer", "text": "小学生・中学生（男女問わず）が対象です。"}
      }
    ]
  };

  const script1 = document.createElement("script");
  script1.type = "application/ld+json";
  script1.text = JSON.stringify(org);
  document.head.appendChild(script1);

  const script2 = document.createElement("script");
  script2.type = "application/ld+json";
  script2.text = JSON.stringify(faq);
  document.head.appendChild(script2);
}

// ========== OGP メタタグ ==========
function injectOgp() {
  const title = document.title || SITE.name;
  const desc = document.querySelector('meta[name="description"]')?.content || "越谷市の少年野球チーム。越谷ボーイズ・越谷中央ボーイズ。体験練習無料・随時入団募集中。";

  const tags = [
    ["og:type", "website"],
    ["og:site_name", SITE.name],
    ["og:title", title],
    ["og:description", desc],
    ["og:url", SITE.url + window.location.pathname],
    ["og:image", SITE.url + "/favicon.png"],
    ["og:locale", "ja_JP"],
    ["twitter:card", "summary"],
    ["twitter:title", title],
    ["twitter:description", desc],
  ];

  tags.forEach(([name, content]) => {
    if (!document.querySelector(`meta[property="${name}"], meta[name="${name}"]`)) {
      const meta = document.createElement("meta");
      if (name.startsWith("og:")) meta.setAttribute("property", name);
      else meta.setAttribute("name", name);
      meta.setAttribute("content", content);
      document.head.appendChild(meta);
    }
  });
}

// ========== canonical URL ==========
function injectCanonical() {
  if (!document.querySelector('link[rel="canonical"]')) {
    const link = document.createElement("link");
    link.rel = "canonical";
    link.href = SITE.url + window.location.pathname;
    document.head.appendChild(link);
  }
}

// ========== 実行 ==========
document.addEventListener("DOMContentLoaded", function() {
  injectFloating();
  injectJsonLd();
  injectOgp();
  injectCanonical();
});
