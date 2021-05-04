module.exports = {
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
      },
    ],
    "@semantic-release/release-notes-generator",
    "@semantic-release/github",
    [
      "@semantic-release/exec",
      {
        [
          "@semantic-release/exec",
          {
            successCmd:
              "echo ::set-output name=RELEASE_VERSION::${nextRelease.version}",
          },
        ],
      },
    ],
  ],
};
