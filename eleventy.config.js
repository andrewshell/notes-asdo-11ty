import "dotenv/config";

import pluginBacklinks from './plugins/backlinks.js';
import pluginSyntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import rssPlugin from "@11ty/eleventy-plugin-rss";
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

export default async function (eleventyConfig) {
  eleventyConfig.addGlobalData('year', new Date().getFullYear());

  eleventyConfig.addBundle("css");

  eleventyConfig.addPlugin(pluginBacklinks);
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  eleventyConfig.addPlugin(pluginSyntaxHighlight, {
    preAttributes: { tabindex: 0 }
  });

  eleventyConfig.addPlugin(rssPlugin);

  eleventyConfig.addPassthroughCopy({
    "./public/": "/",
  });

  // Filters
  eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
    // Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
    return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
  });

  eleventyConfig.addFilter("encodeURIComponent", (text) => {
    return encodeURIComponent(text);
  });

  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    // dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  eleventyConfig.addNunjucksGlobal("isDiffDay", (d1, d2) => {
    return d1 && DateTime.fromJSDate(d1, {zone: 'utc'}).toFormat('yyyy-LL-dd')
      !== DateTime.fromJSDate(d2, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  eleventyConfig.addShortcode("youtube", (videoURL) => {
  const url = new URL(videoURL);
  const id = url.searchParams.get("v");
  return `<div class="embedVideo"><iframe src="https://www.youtube-nocookie.com/embed/${id}" title="YouTube video player" frameborder="0" allowfullscreen></iframe></div>
`;
  });

  eleventyConfig.addShortcode("vimeo", (videoURL) => {
  // const url = new URL(videoURL);
  // const id = url.searchParams.get("v");
  return `<div class="embedVideo"><iframe src="${videoURL}" title="Vimeo video player" frameborder="0" allowfullscreen></iframe></div>
`;
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if(!Array.isArray(array) || array.length === 0) {
      return [];
    }
    if( n < 0 ) {
      return array.slice(n);
    }
    return array.slice(0, n);
  });

  // Return the smallest number argument
  eleventyConfig.addFilter("min", (...numbers) => {
    return Math.min.apply(null, numbers);
  });

  eleventyConfig.addFilter("forMonth", (collection, month) => {
    return collection.filter(item => {
      let slug = DateTime.fromJSDate(item.date, "utc").toFormat("y-LL");
      return slug === month;
    });
  });

  eleventyConfig.addCollection("months", function(collectionApi) {
    let months = new Map();
    for (let item of collectionApi.getFilteredByTag('essays')) {
      let slug = DateTime.fromJSDate(item.date, "utc").toFormat("y-LL");
      let title = DateTime.fromJSDate(item.date, "utc").toFormat("LLLL yyyy");
      months.set(slug, { slug, title });
    }
    return Array.from(months.values());
  });
}

export const config = {
  dir: {
    input: "content",          // default: "."
    includes: "../_includes",  // default: "_includes"
    data: "../_data",          // default: "_data"
    output: "_site"
  },
  templateFormats: ["html", "njk", "md", "11ty.js"],
  markdownTemplateEngine: "njk",
  htmlTemplateEngine: "njk",
};
