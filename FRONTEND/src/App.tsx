// App.tsx
import { BrowserRouter as Router } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import AppRoutes from "./AppRoutes";
import { Toaster } from "sonner";
import RouteChangeLoader from "./utils/RouteChangeLoader";

function App() {
  return (
    <AppProvider>
      <Router>
        <RouteChangeLoader />
        <AppRoutes />
        <Toaster
          position="bottom-right"
          richColors
          swipeDirections={["right", "left"]}
        />
      </Router>
    </AppProvider>
  );
}

export default App;
