# 2fauth.online – SEO plan (2FA-first)

Last updated: 2026-10-08. This file is documentation only (it is not served by the website).

**Rules followed:** no keyword stuffing, no unsupported security claims, no fake reviews/backlinks.
**Data honesty:** I had no access to Ahrefs / Semrush / Search Console, so search volume, keyword difficulty and
competitor backlink data are marked **DATA UNAVAILABLE**. Competitor facts that were not checked from official sources
are marked **NEEDS VERIFICATION**.

---

## A. Master keyword list

| Keyword | Cluster | Intent | Priority | Target page |
|---|---|---|---|---|
| 2FA authenticator | Core | Tool | P1 | `/` |
| 2FA authenticator online / online 2FA authenticator | Online | Tool | P1 | `/` |
| 2 factor authenticator / two factor authenticator | Core | Tool | P1 | `/` |
| two factor authentication / 2FA authentication | Core | Info + tool | P1 | `/` (tool) + `/what-is-2fa` (info) |
| 2FA code / 2FA code online / 2FA code generator | Code | Tool | P1 | `/` |
| 2FA verification code / 2FA verification | Code | Info | P2 | `/what-is-2fa` |
| online 2FA / 2FA online | Online | Tool | P1 | `/` |
| online authenticator | Online | Tool | P2 | `/` |
| 2FA key / 2FA secret key / authenticator key | Key | Info | P1 | `/2fa-key` |
| 2FA authentication key / two factor authentication key | Key | Info | P2 | `/2fa-key` |
| 2FA key generator / online 2FA key | Key | Tool/Info | P2 | `/2fa-key` (explains key vs code) + `/` |
| 2FA setup key | Key | Info | P3 | `/2fa-key`, `/guide` |
| what is 2FA / how does two factor authentication work | Info | Info | P1 | `/what-is-2fa` |
| what is a 2FA authenticator | Info | Info | P2 | `/what-is-2fa` |
| how to use a 2FA authenticator / how to set up 2FA | Guide | Info | P1 | `/guide` |
| why is my 2FA code not working | Guide | Info | P2 | `/guide#troubleshooting` |
| TOTP authenticator / online TOTP generator | TOTP | Tool | P3 (supporting) | `/` (mentioned), `/what-is-totp` |
| what is TOTP / how does TOTP work / TOTP vs HOTP | TOTP | Info | P2 | `/what-is-totp` |
| 2FA security / authenticator security / privacy | Trust | Info | P2 | `/security` |

Search volume / KD / SERP features for every row: **DATA UNAVAILABLE** (fill in from Search Console after indexing,
or from a keyword tool).

One observation from a single web search: the SERP for "2FA authenticator" looks crowded with mobile-app store
listings, so *online-tool* phrasing ("2FA code online", "online 2FA authenticator") is the more natural fit for a
browser tool. This is an observation, not data – confirm in Search Console.

## B. Cluster map

```
2FA  (/what-is-2fa)
 └─ 2FA Authenticator  (/  – primary tool page)
     └─ Two Factor Authentication  (/what-is-2fa, / H1)
         └─ 2FA Code  (/ tool, /guide troubleshooting)
             └─ 2FA Key  (/2fa-key)
                 └─ Online 2FA  (/ , /security)
                     └─ TOTP  (/what-is-totp – supporting)
```

One primary intent = one primary page. No separate pages for near-duplicate phrases.

## C. Page-by-page plan (implemented)

| URL | Title | H1 | Primary keyword |
|---|---|---|---|
| `/` | 2FA Auth Online – Free 2FA Authenticator & Code Generator | 2FA Authenticator – Free Online Two Factor Authentication | 2FA authenticator |
| `/guide` | How to Use a 2FA Authenticator: Step-by-Step Guide | (same) | how to use a 2FA authenticator |
| `/what-is-2fa` | What Is 2FA? Two-Factor Authentication Explained | (same) | what is 2FA |
| `/2fa-key` | What Is a 2FA Key? Secret Key vs. Security Key | (same) | 2FA key |
| `/what-is-totp` | What Is TOTP? How Time-Based One-Time Passwords Work | (same) | what is TOTP |
| `/security` | Security & Privacy of the 2FA Auth Online Authenticator | (same) | online authenticator security |
| `/about`, `/contact`, `/privacy-policy`, `/terms`, `/disclaimer` | "<Name> – 2FA Auth Online" | page name | – (trust pages) |

Internal links: every page is in the header and/or footer; the homepage links to all informational pages
(hero, FAQ answers, "Learn more" cards); each article ends with related-page cards and a call to action back to the tool.

## D. Technical SEO – what was changed

- Real content is now **static HTML** (H1, intro, all sections, FAQ, policies). JavaScript only translates for non-English users.
- English is the default language and the only indexed one. Other languages stay a browser-side option (same URL).
- Canonical host **https://www.2fauth.online**; bare domain and plain http are 301-redirected (`server.js`).
- Canonical, Open Graph, Twitter card, theme-color, favicon (ico/svg/png), Apple touch icon, web manifest, OG image.
- Structured data: `Organization`, `WebSite`, `WebApplication` (free), `FAQPage` (matches visible FAQ),
  `Article` + `BreadcrumbList` on article pages. No ratings, reviews or fake authors.
- `/guide-video` → `/guide` (301). Old `.html` URLs still redirect.
- Sitemap with `lastmod`; robots.txt points to the www sitemap; 404 is `noindex`.
- Server: gzip, caching headers, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`,
  `Permissions-Policy` (camera allowed for QR scan), HSTS when behind https.
- Page-load overlay (`loader.js`) is no longer used; the file is left in `assets/` unreferenced.
- jsQR is no longer loaded on every home visit (it loads only when scanning needs it).
- Google Fonts: Arabic font loads only for Arabic users. Empty ad boxes no longer reserve blank space.
- Wrong contact email (`support@2faauth.org`) replaced with `support@2fauth.online` everywhere; placeholder social links removed.

## E. Content gap analysis

| Topic | Status |
|---|---|
| What is 2FA | Done (`/what-is-2fa`) |
| What is a 2FA key (secret key vs hardware key) | Done (`/2fa-key`) |
| What is TOTP / TOTP vs HOTP | Done (`/what-is-totp`) |
| How to use a 2FA authenticator + troubleshooting | Done (`/guide`) |
| Security & privacy transparency | Done (`/security`) |
| How to set up 2FA on specific services (Google, GitHub, etc.) | Missing – write only with real tested screenshots |
| 2FA backup codes: how to store them | Missing (recommended next) |
| Authenticator app vs online authenticator | Missing (recommended next; must be honest about trade-offs) |
| 2FA security best practices | Partly covered in `/security` |

## F. Competitor gap analysis (requires verification)

I did not verify competitor pages from official sources in this pass, so everything below is a **hypothesis to check**:

| Area | What to check on Authy / 2FAS / Google Authenticator / 2FAuth / 2fa.co.com / 2fa.cn / 2fa-auth.com / 2facter.com / Auth0 | Our position |
|---|---|---|
| Content | Do they have "what is 2FA/TOTP" pages and troubleshooting? | Now present |
| Privacy | Do they state what is/is not stored, and list third parties? | `/security` does |
| Trust | Real contact, about page, open source link | Present (GitHub, email) |
| Features | Vault/sync/backup (apps) vs no-account tool (us) | Different by design – do not add accounts |
| Backlinks | **DATA UNAVAILABLE** | Start with GitHub README link |

## G. Backlink plan (legitimate only)

1. Add the website link and a short description to the GitHub repo "About" box and README.
2. Share the tool honestly on developer/privacy communities (Show HN-style posts, relevant subreddits, Product Hunt)
   following each community's self-promotion rules – one genuine post, not mass posting.
3. Publish the YouTube guide (below) and link to `/guide`.
4. Pitch `/2fa-key` and `/what-is-totp` to security/dev newsletters as reference material only if they are useful to their readers.
5. Avoid: paid links, PBNs, automated tools, comment spam, directory floods.

## H. YouTube guide

- **Title:** How to Use 2fauth.online – Online 2FA Authenticator Guide (Free, No Login)
- **Description start:** link to `https://www.2fauth.online/guide` in the first line, then chapters.
- **Chapters:** 0:00 What 2FA is · 0:40 Get your secret key · 1:30 Paste or scan the QR code · 2:30 Enter the code · 3:15 Safety tips.
- **Thumbnail:** the 6-digit code + countdown bar, big text "2FA CODE ONLINE".
- **On the site:** put the video ID in `guide.html` (`var YT_ID = ''`). The video block appears automatically.

## I. Google Search Console checklist

1. Add the property for `https://www.2fauth.online` (domain property is best) and verify.
2. Submit `https://www.2fauth.online/sitemap.xml`.
3. URL Inspection → Request indexing for `/`, `/guide`, `/what-is-2fa`, `/2fa-key`, `/what-is-totp`, `/security`.
4. Check Pages (indexing), Core Web Vitals and Enhancements (FAQ, breadcrumbs).
5. Track queries, impressions, CTR, average position.

| When | What to look at |
|---|---|
| 7 days | Are all pages indexed? Any redirect/crawl errors? Does the site name/favicon show? |
| 30 days | Queries and impressions per page; fix titles with low CTR; check Core Web Vitals |
| 90 days | Which keywords grow? Which pages need depth? Plan next articles from real queries |

No rankings or timelines are promised.

## J. 30/60/90 plan

- **Days 1–30:** deploy, verify canonical host, submit sitemap, confirm indexing, add real YouTube ID.
- **Days 31–60:** backup-codes article, "authenticator app vs online authenticator" article, improve internal links from real queries.
- **Days 61–90:** legitimate outreach (above), consider English-first translations as separate URLs (`/ru/`, `/es/` …) with `hreflang` if there is real demand.

## K. Items that still NEED YOUR VERIFICATION

- The site code makes no request that sends your key – verified in this repository. Your hosting/CDN may still keep standard logs.
- Is the GitHub repository public? The site links to it from the footer and the security page.
- Confirm `https://www.2fauth.online` is your real production host (the code now redirects the bare domain to it).
- The non-English translations still contain the old wording "your secret never leaves your device" – consider softening them.

---

## H. Keyword hub page: `/2fa-secret-key-to-code` (added 2026-10-08)

Source: `2fauth_1000_seo_keywords.csv` (1,000 keywords in 15 clusters). Per-keyword status: `docs/keyword-coverage.csv`.

**Approach.** One page, one primary intent ("secret key to 2FA code"), organised so every usable cluster has a real
section. Keywords are used as headings, table rows, FAQ questions and normal sentences. The 1,000 keywords were
*not* pasted onto the page: that is keyword stuffing and would work against ranking.

| Cluster (CSV) | Where it lives on the page |
|---|---|
| Core & Transactional (150) | Homepage `/` stays the primary target (avoids cannibalisation); main phrases also appear in the lead, title and H1 |
| 25 services x 10 | "Which accounts work..." table, plus two service FAQs. Not one block per service (doorway-style repetition) |
| WhatsApp / Apple / Steam | Listed as **not compatible** (PIN / trusted device / Steam's own 5-character format), checked against public sources |
| Competitor & brand (150) | Neutral "authenticator apps and other online tools" section. No claims about other sites (not verified) |
| Long-tail & problem-solving (198) | 25 FAQ questions + "Why is my 2FA code not working?" fix list |
| Feature & tech modifiers (149) | "Browser-based, client-side" and "What it supports and what it does not" sections |
| Typos & misspellings (97) | Excluded (Google corrects them; adding misspellings is a spam signal). Correctly spelled variants only |
| Additional variations (6) | Excluded (auto-generated, e.g. "tool tool") |

**Deliberately not targeted** (the tool does not do these, so claiming them would be misleading): SHA-256/SHA-512,
HOTP, code validation/debugging, otpauth URI *generation*, secret-key *generation*, multi-account management.

**Keep in sync with the code.** If `assets/tool.js` gains any of the above, update the "What it supports" table first.

Linked from: all page footers, homepage "Learn more" cards, `/2fa-key` related cards. In sitemap and `server.js`.
