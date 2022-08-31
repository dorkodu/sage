module.exports = {
  preset: "ts-jest",
  rootDir: "../",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  collectCoverageFrom: ["./*/source/**/*.{ts,tsx,js,jsx}"],
  // setupFilesAfterEnv: ['./server/jest.setup.js'],
  globals: {
    "ts-jest": {
      tsconfig: {
        jsx: "react",
        target: "ES2020",
      },
    },
  },
  // setupFiles: ['core-js', 'regenerator-runtime/runtime'],
};
