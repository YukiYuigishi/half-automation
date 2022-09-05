// jest.config.js
module.exports = {
   testEnvironment: "miniflare",
   roots: ["<rootDir>/src"],
   testMatch: ["**/?(*.)+(spec|test).+(ts|tsx|js)"],
   transform: {
      "^.+\\.(ts|tsx)$": "esbuild-jest",
   },
};
