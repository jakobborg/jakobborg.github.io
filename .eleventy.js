module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("wiki.html");
  eleventyConfig.addPassthroughCopy("css");
  return {
    dir: {
      input: 'src',
      output: 'public',
    },
  };
};
