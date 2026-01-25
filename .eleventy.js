module.exports = function (eleventyConfig) {
  // Tell Eleventy to copy CSS files as-is
  eleventyConfig.addPassthroughCopy("src/css");

  // Years collection for archives
  eleventyConfig.addCollection("postYears", function (collectionApi) {
    const posts = collectionApi.getFilteredByTag("posts");
    const years = new Set(posts.map((p) => p.date.getFullYear()));
    return Array.from(years).sort((a, b) => b - a); // newest year first
  });

  return {
    dir: {
      input: "src",
      output: "_site",
    },
    pathPrefix: "/greenhouse/",
  };
};
