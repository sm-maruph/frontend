import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#780000", // You can also use a custom hex code like '#3f51b5'
    },
    white: {
      main: "#ffffff",
      text: "#ffffff",
    },
    black: {
      main: "#000000",
    },
    success: {
      main: "#4CAF50", // Replace with your desired green color
    },
    secondary: {
      main: "#999999",
    },
    green: {
      main: "#0D7C6630",
    },
  },
});

export default theme;
