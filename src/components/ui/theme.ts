import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        white: { value: "#ffffff" },
        black: { value: "#242424" },
        "gray.950": { value: "#1a1a1a" },
      },
    },
  },
});

export default createSystem(defaultConfig, config);
