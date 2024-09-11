import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import theme from "./Theme/theme.js";
import { ThemeProvider } from "@mui/material/styles";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
