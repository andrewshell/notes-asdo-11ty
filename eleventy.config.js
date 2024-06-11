import "dotenv/config";

export default async function (eleventyConfig) {
  eleventyConfig.addBundle("css");

  eleventyConfig.addPassthroughCopy({
    "./public/": "/",
  });

  eleventyConfig.addFilter("toJSON", function (obj) {
    return JSON.stringify(obj);
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
