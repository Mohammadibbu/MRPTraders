import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import "./font.css";

createRoot(document.getElementById("root")!).render(
  // HelmetProvider is required for the <Helmet> tags in your pages to work
  <HelmetProvider>
    <App />
  </HelmetProvider>,
);
