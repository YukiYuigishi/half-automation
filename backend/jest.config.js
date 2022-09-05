// jest.config.js
module.exports = {
   testEnvironment: "miniflare",
   testMatch: [
      "**/test/**/*.+(ts|tsx|js)",
      "**/src/**/(*.)+(spec|test).+(ts|tsx|js)",
   ],
   transform: {
      "^.+\\.(ts|tsx)$": "ts-jest",
   }
};
