module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/CNAME");
  return {
    dir: {
      input: 'src',
      output: 'public',
    },
  };
};
