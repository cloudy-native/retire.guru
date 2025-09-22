import { extendTheme, ThemeConfig } from "@chakra-ui/react";

// Color configuration for light/dark mode
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

// Custom theme definition with jewel tones
const theme = extendTheme({
  config,
  fonts: {
    heading: "'Source Sans Pro', sans-serif",
    body: "'Source Sans Pro', sans-serif",
  },
  components: {},
  styles: {},
});

export default theme;
