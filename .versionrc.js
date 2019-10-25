const config = {
  scripts: {
    postchangelog: "sed -i '' -e 's/### [/## [/g' CHANGELOG.md",
  },
};

module.exports = config;
