import { extendTheme, ThemeConfig } from "@chakra-ui/react";

// Color configuration for light/dark mode
const config: ThemeConfig = {
	initialColorMode: "light",
	useSystemColorMode: false,
};

// Custom theme definition with jewel tones
const theme = extendTheme({
	config,
	colors: {
		primary: {
			50: "#f0f9ff",
			100: "#e0f2fe",
			200: "#bae6fd",
			300: "#7dd3fc",
			400: "#38bdf8",
			500: "#0ea5e9",
			600: "#0284c7",
			700: "#0369a1",
			800: "#075985",
			900: "#0c4a6e",
		},
		neutral: {
			50: "#fafafa",
			100: "#f5f5f5",
			200: "#e5e5e5",
			300: "#d4d4d4",
			400: "#a3a3a3",
			500: "#737373",
			600: "#525252",
			700: "#404040",
			800: "#262626",
			900: "#171717",
		},
	},
	fonts: {
		heading: "'Source Sans Pro', sans-serif",
		body: "'Source Sans Pro', sans-serif",
	},
	components: {},
	styles: {},
});

export default theme;
