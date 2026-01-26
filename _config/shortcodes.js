export default function(eleventyConfig) {
    const clean = (html) => html.replace(/\s+/g, ' ').trim();

    // Helper untuk membuat ID unik jika terjadi tabrakan
    const getUniqueId = (id) => `${id}-${Math.random().toString(36).substr(2, 5)}`;

    eleventyConfig.addPairedShortcode("epigraph", (content, footer) => 
        clean(`<div class="epigraph"><blockquote><p>${content}</p><footer>${footer}</footer></blockquote></div>`)
    );

    eleventyConfig.addPairedShortcode("sidenote", (content, id, title, sidenote) => {
        const uid = getUniqueId(id);
        return clean(`
            <span class="newthought">${title}
                <label for="${uid}" class="margin-toggle sidenote-number"></label>
            </span>
            <input type="checkbox" id="${uid}" class="margin-toggle"/>
            <span class="sidenote">
                <a href="#${uid}" class="no-deco"><em>${sidenote}</em></a>
            </span> ${content}
        `);
    });

    eleventyConfig.addPairedShortcode("sidenoteexternal", (content, id, title, sidenote, content_link, url) => {
        const uid = getUniqueId(id);
        return clean(`
            <span class="newthought">${title}
                <label for="${uid}" class="margin-toggle sidenote-number"></label>
            </span>
            <input type="checkbox" id="${uid}" class="margin-toggle"/>
            <span class="sidenote">
                <em>${sidenote}</em> <a href="${url}">${content_link}</a>
            </span> ${content}
        `);
    });

    eleventyConfig.addShortcode("notes", (id, content) => {
        const uid = getUniqueId(id);
        return clean(`
            <label for="${uid}" class="margin-toggle">&#8853;</label>
            <input type="checkbox" id="${uid}" class="margin-toggle"/>
            <span class="marginnote">${content}</span>
        `);
    });

    eleventyConfig.addShortcode("fullimage", (image, alt) => 
        clean(`<figure class="fullwidth"><img src="${image}" alt="${alt}"></figure>`)
    );

    eleventyConfig.addShortcode("videos", (video, title) => 
        clean(`
            <figure class="iframe-wrapper">
                <div class="video-container">
                    <iframe width="100%" src="${video}" title="${title}" frameborder="0" allowfullscreen></iframe>
                </div>
            </figure>
        `)
    );
};