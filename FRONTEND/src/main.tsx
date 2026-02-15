import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import "./font.css";
import ReactGA from "react-ga4";

ReactGA.initialize("G-6C7P47NKKZ");
createRoot(document.getElementById("root")!).render(
  // HelmetProvider is required for the <Helmet> tags in your pages to work
  <HelmetProvider>
    <App />
  </HelmetProvider>,
);
