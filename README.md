# 📜 Ebenezer E-Journal

Ebenezer is a supplemental e-journal for Public Theology & Public Witness. Built with Eleventy (11ty), it is designed with a Tufte CSS aesthetic that prioritizes clean typography, margin notes, and high readability for academic and theological discourse.

Develop by adamdjbrett.com

Have Project ?? Contact Me
+ adamdjbrett.com
+ info@adamdjbrett.com

---

## 👥 Multi-Author System
This project supports collaborative writing (multiple authors per article). Author data is managed centrally to ensure consistency across the site.

1. Managing Author Data
All author information is stored in _data/authors.yaml. Ensure each author has a unique key. - ` # don't use spaces, underscores or special characters`

```
- key: john-dhoe
  name: John Doe
  bio: Researcher in Public Theology.
  image: /img/authors/john.jpg
  social:
    - title: "Website"
      icon: "fa-globe"
      url: "https://johndoe.com"
```

2. Assigning Authors to Articles
In your article's Frontmatter (content/blog/*.md), use the author key. For multiple authors, separate their keys with a comma or list.

```
---
title: "The Intersection of Faith and Public Life"
author: 
  - john-dhoe
  - jon-jones
tags: 
  - theology 
- public witness
---

```
## 🖋️ Tufte Shortcodes Documentation

Ebenezer utilizes custom shortcodes to render Tufte-style typographic elements. You can use these directly within your .md files:

---

### SHORTCODE

```
# EPIGRAH

{% epigraph "Mark Twain" %}
The man who does not read has no advantage over the man who cannot read.
{% endepigraph %}

# SIDENOTE

{% sidenote "sn01", "Typography", "Bringhurst" %}
Isi paragraf di sini. ID akan otomatis dibuat unik oleh sistem.
{% endsidenote %}


# SIDENOTE WITH URL

{% sidenoteexternal "02", "External Link", "Tufte Docs", "Klik sumber", "https://google.com" %}
Konten paragraf untuk sidenote eksternal.
{% endsidenoteexternal %}

# NOTES

{% notes "n1", "Ini adalah margin note tanpa nomor." %}

# FULL IMAGE

{% fullimage "https://images.unsplash.com/photo-1498050108023-c5249f4df085", "Clean Workspace" %}

# VIDEO

{% videos "https://www.youtube.com/embed/Z0X77m_J2tU", "Tutorial Video" %}
```

---

## 🚀 Sveltia CMS for Ebenezer

Sveltia CMS is a lightweight, git-based Content Management System. It serves as a modern, faster alternative to Decap CMS (formerly Netlify CMS). It requires no database, as it interacts directly with your GitHub repository.

### 🔑 2. GitHub Authentication
Since Sveltia CMS runs in the browser, it needs permission to push commits to your repo.

Create OAuth App: Go to GitHub Settings > Developer Settings > OAuth Apps > New OAuth App.

Homepage URL: Your site URL (e.g., https://ebenezer.net).

Authorization callback URL: https://api.sveltia.org/auth.

Client ID: Copy this ID into your config.yml under the backend section on `public/admin/config.yml` - then update `client_id: xxx `.

### 📖 3. Brief Tutorial

#### Managing Articles
+ Creating: Go to the Articles tab and click "New Article". Sveltia provides a Rich Text editor for your Markdown content.
+ Authors: When adding authors, type the key exactly as it appears in _data/authors.yaml (e.g., john-dhoe). This ensures your multi-author logic works correctly.

#### Updating Global Data
+ Authors List: You can add new authors, change bios, or upload new profile pictures under the Global Data > Authors menu.
+ Design & Metadata: Update your site title, social media links, or navigation menu without touching the code.

---

Have project to work with me ??
+ adamdjbrett.com
+ info@adamdjbrett.com
