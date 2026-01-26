import { IdAttributePlugin, InputPathToUrlTransformPlugin, HtmlBasePlugin } from "@11ty/eleventy";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginNavigation from "@11ty/eleventy-navigation";
import yaml from "js-yaml";
import CleanCSS from "clean-css";
import { minify } from "terser";
import { library, config as fontAwesomeConfig } from '@fortawesome/fontawesome-svg-core';
import * as fas from '@fortawesome/free-solid-svg-icons';
import * as fab from '@fortawesome/free-brands-svg-icons';
import { PurgeCSS } from 'purgecss';
import dotenv from 'dotenv';
import pluginFilters from "./_config/filters.js";
import { execSync } from "child_process";
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import markdownItAttrs from 'markdown-it-attrs';
import markdownItFootnote from "markdown-it-footnote";
import markdownItTableOfContents from "markdown-it-table-of-contents";
import pluginTOC from 'eleventy-plugin-toc';
import shortcodes from "./_config/shortcodes.js";
import fs from 'fs/promises';
import path from 'path'; 
import { fileURLToPath } from 'url';

dotenv.config();

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function(eleventyConfig) {
    // 1. Initialize FontAwesome inside the config function
    library.add(fas.fas, fab.fab); 
    fontAwesomeConfig.autoAddCss = false;
    eleventyConfig.addPlugin(shortcodes);
    eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
        if(data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
            return false;
        }
    });

    eleventyConfig
        .addPassthroughCopy({ "./public/": "/" })
        .addPassthroughCopy("./content/feed/pretty-atom-feed.xsl");

    eleventyConfig.addWatchTarget("css/**/*.css");
    eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpg,jpeg,gif}");

    // Bundles
    eleventyConfig.addBundle("css", {
        toFileDirectory: "dist",
        bundleHtmlContentFromSelector: "style",
    });

    eleventyConfig.addBundle("js", {
        toFileDirectory: "dist",
        bundleHtmlContentFromSelector: "script",
    });

    // Filters
    eleventyConfig.addFilter("cssmin", (code) => {
        if (process.env.NODE_ENV === "production" && code) {
            return new CleanCSS({}).minify(code).styles;
        }
        return code || "";
    });

    // Plugins
    eleventyConfig.addPlugin(pluginSyntaxHighlight, {
        preAttributes: { tabindex: 0 }
    });
    eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));
    eleventyConfig.addPlugin(pluginNavigation);
    eleventyConfig.addPlugin(HtmlBasePlugin);
    eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);

const iconHandler = (iconType, iconName, classNames = "") => {
    const parts = iconName.toLowerCase().trim().split(/\s+/);
    const cleanIconName = parts[parts.length - 1]; 
    const finalIconName = cleanIconName
        .replace(/^fa[sb]?[- ]*/i, '')  // fa-, fas-, fab-
        .replace(/^solid|brands|regular[- ]*/i, '')  // solid, brands, regular
        .trim();
    
    // 3. Determine library: FAB dulu, fallback FAS
    const pascalName = finalIconName.split('-').map(part => 
        part.charAt(0).toUpperCase() + part.slice(1)
    ).join('');
    const finalName = `fa${pascalName}`;
    
    // Cek FAB dulu
    let iconData = fab[finalName];
    let prefix = 'fab';
    let iconLibrary = fab;
    
    // Fallback ke FAS
    if (!iconData) {
        iconData = fas[finalName];
        prefix = 'fas';
        iconLibrary = fas;
    }
    
    if (!iconData) {
        console.warn(`❌ Icon NOT FOUND: "${iconName}" → "${finalIconName}" (${finalName})`);
        return `<span class="missing-icon">[${finalIconName}]</span>`;
    }
    
    const [width, height, , , svgPathData] = iconData.icon;
    return `<svg aria-hidden="true" focusable="false" class="svg-inline--fa fa-${finalIconName} ${classNames}" 
            role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" 
            style="height: 1.8em; vertical-align: -0.125em; margin-right:20px; padding:2px;">
            <path fill="currentColor" d="${svgPathData}"></path></svg>`;
};



    eleventyConfig.addShortcode("icon", iconHandler);
    eleventyConfig.addJavaScriptFunction("renderIcon", iconHandler);
eleventyConfig.addFilter("getAuthor", (authorList, authKey) => {
    return authorList.find(a => a.key === authKey);
  });
    // Transforms
    eleventyConfig.addTransform("purge-css", async function(content) {
        if (process.env.NODE_ENV === "production" && this.page.outputPath && this.page.outputPath.endsWith(".html")) {
            try {
                const purgeCSSResults = await new PurgeCSS().purge({
                    content: [{ raw: content, extension: 'html' }],
                    css: ['_site/css/bs.css'],
                    safelist: {
                        standard: [/active$/, /collaps/, /show$/, /dropdown/],
                        deep: [/svg-inline--fa/]
                    }
                });
                const minifiedCSS = new CleanCSS({}).minify(purgeCSSResults[0].css).styles;
                return content.replace(/<link rel="stylesheet" href="\/css\/bs.css"[^>]*>/, `<style>${minifiedCSS}</style>`);
            } catch (e) {
                return content;
            }
        }
        return content;
    });

    eleventyConfig.addJavaScriptFunction("jsmin", async function(code) {
        if (process.env.NODE_ENV === "production" && code) {
            try {
                const minified = await minify(code);
                return minified.code;
            } catch (err) {
                console.error("Terser Error:", err);
                return code;
            }
        }
        return code || "";
    });

    eleventyConfig.addTransform("htmlmin", function(content) {
        if (process.env.NODE_ENV === "production" && this.page.outputPath && this.page.outputPath.endsWith(".html")) {
            return content.replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim();
        }
        return content;
    });
    
	const md = new markdownIt({
		html: true,
		breaks: true,
		linkify: true,
	});
	eleventyConfig.addFilter("md", function (content) {
		return md.render(content);
	});

  let options = {
    html: true,
    breaks: true,
    linkify: true,
      permalink: true,
    typographer: true,
      permalinkClass: "direct-link",
      permalinkSymbol: "#"
  };
  eleventyConfig.addFilter("byAuthor", (posts, authorKey) => {
  if (!posts || !Array.isArray(posts)) {
    return [];
  }
  
  const targetKey = String(authorKey).trim();

  return posts.filter(post => {
    const postAuthorData = post.data.author;

    if (!postAuthorData || typeof postAuthorData !== 'string') {
      return false; 
    }
    const authors = postAuthorData.split(',')
      .map(a => a.trim());
    return authors.includes(targetKey);
  });
});
eleventyConfig.addFilter("getPostsByAuthor", (posts, authorKey) => {
  if (!posts || !Array.isArray(posts)) {
    return [];
  }

  const targetKey = String(authorKey).trim();

  return posts.filter(post => {
    const postAuthorData = post.data.author;

    if (!postAuthorData) {
      return false;
    }
    if (typeof postAuthorData !== 'string') {
        return false; 
    }
    const authors = postAuthorData.split(',')
      .map(a => a.trim());
    return authors.includes(targetKey);
  });
});

eleventyConfig.addFilter("getAuthors", (authors, label) => {
    let labels = label.split(','); 
    return authors.filter(a => labels.includes(a.key));
});
eleventyConfig.addFilter("findAuthorByKey", (authors, authorKey) => {
        if (!authorKey || !authors || !Array.isArray(authors)) return null;
        const key = String(authorKey).trim().toLowerCase();
        return authors.find(author => 
            String(author.key || '').trim().toLowerCase() === key
        );
    });
	
  let markdownLib = markdownIt(options).use(markdownItAttrs).use(markdownItFootnote).use(markdownItTableOfContents);
  eleventyConfig.setLibrary("md", markdownLib);
	  eleventyConfig.amendLibrary("md", mdLib => {
		mdLib.use(markdownItAnchor, {
			permalink: markdownItAnchor.permalink.ariaHidden({
				placement: "after",
				class: "header-anchor",
				symbol: "",
				ariaHidden: false,
			}),
			level: [1,2,3,4],
			slugify: eleventyConfig.getFilter("slugify")
		});
	});
	  eleventyConfig.addPlugin(pluginTOC, {
		tags: ['h2', 'h3', 'h4', 'h5'],
		  id: 'toci', 
		  class: 'list-group',
		ul: true,
		flat: true,
		wrapper: 'div'
	  });

	  eleventyConfig.on("eleventy.after", ({ dir }) => {
  try {
    console.log('🔄 Building Pagefind index...');
    execSync(`npx pagefind --site ${dir.output} --glob "**/*.html"`, {
      encoding: "utf-8",
      stdio: 'inherit'  // Show Pagefind output
    });
    console.log('✅ Pagefind ready!');
  } catch (error) {
    console.error('❌ Pagefind failed:', error.message);
  }
});

	eleventyConfig.addPlugin(IdAttributePlugin, {
		slugify: (text) => {
			const slug = eleventyConfig.getFilter("slugify")(text);
			return `print-${slug}`;
		},
	});


    eleventyConfig.addPlugin(feedPlugin, {
        type: "atom",
        outputPath: "/feed/feed.xml",
        stylesheet: "pretty-atom-feed.xsl",
        templateData: {
            eleventyNavigation: { key: "Feed", order: 4 }
        },
        collection: { name: "posts", limit: 10 },
        metadata: {
            language: "en",
            title: "Blog Title",
            subtitle: "Description",
            base: "https://example.com/",
            author: { name: "Your Name" }
        }
    });

    eleventyConfig.addPlugin(pluginFilters);
    eleventyConfig.addPlugin(IdAttributePlugin);
    eleventyConfig.addShortcode("currentBuildDate", () => (new Date()).toISOString());
};

export const config = {
    templateFormats: ["md", "njk", "html", "liquid", "11ty.js"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
        input: "content",
        includes: "../_includes",
        data: "../_data",
        output: "_site"
    },
};