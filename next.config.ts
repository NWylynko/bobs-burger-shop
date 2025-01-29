import type { NextConfig } from "next";

export default {
  experimental: {
    ppr: true,
    reactCompiler: true,
    dynamicIO: true
  }
} satisfies NextConfig