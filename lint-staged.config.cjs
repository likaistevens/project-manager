module.exports = {
  // "*.{js,jsx,mjs,mjsx,cjs,cjsx}": (filenames) =>
  //   `node precommit.js ${filenames.join(" ")}`,
  // "*.{ts,tsx}": (filenames) => `node precommit.js ${filenames.join(" ")}`,
  "*": (filenames) => `node precommit.js ${filenames.join(" ")}`,
  "*.{js,jsx,mjs,mjsx,cjs,cjsx,ts,tsx}": "eslint --fix",
};
