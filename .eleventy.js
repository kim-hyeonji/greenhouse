module.exports = function (eleventyConfig) {
  // Tell Eleventy to copy CSS files as-is
  eleventyConfig.addPassthroughCopy("src/css");

  eleventyConfig.addPassthroughCopy("src/images");

  // Years collection for archives
  eleventyConfig.addCollection("postYears", function (collectionApi) {
    const posts = collectionApi.getFilteredByTag("posts");
    const years = new Set(posts.map((p) => p.date.getFullYear()));
    return Array.from(years).sort((a, b) => b - a); // newest year first
  });

  // Prev / Next navigation for posts
  eleventyConfig.addCollection("postsNav", function (collectionApi) {
    const posts = collectionApi
      .getFilteredByTag("posts")
      .sort((a, b) => a.date - b.date); // oldest → newest

    for (let i = 0; i < posts.length; i++) {
      const prev = i > 0 ? posts[i - 1] : null;
      const next = i < posts.length - 1 ? posts[i + 1] : null;

      posts[i].data.prevPost = prev;
      posts[i].data.nextPost = next;
    }

    return posts;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
    },
    pathPrefix: "/greenhouse/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
