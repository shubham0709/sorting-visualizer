import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import ReactDOM from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

const theme = createTheme({
  // components: {
  //   MuiButton: {
  //     styleOverrides: {
  //       root: {
  //         color: "#ffffff",
  //         backgroundColor: "#084298",
  //       },
  //     },
  //   },
  // },
  palette: {
    primary: {
      light: "#63b8ff",
      main: "#084298",
      dark: "#005db0",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#000",
      secondary: "#426078",
    },
  },
  typography: {
    fontSize: 12,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
