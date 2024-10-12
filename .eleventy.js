module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("css");
  return {
    dir: {
      input: 'src',
      output: 'public',
    },
  };
};
