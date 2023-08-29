import { defineConfig } from 'vitest/config'

import path from "path";

export default defineConfig({
  resolve:{
    alias: {
      "@sage": path.resolve(__dirname, "../package/src"),
      "@blog": path.resolve(__dirname, "../examples/blog/src"),
      "@social-network": path.resolve(__dirname, "../examples/social-network/src"),
    },
  }
})