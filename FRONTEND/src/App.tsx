// App.tsx.....
import { BrowserRouter as Router } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import AppRoutes from "./AppRoutes";
import { Toaster } from "sonner";
import RouteChangeLoader from "./utils/RouteChangeLoader";
import LoadingScreen from "./utils/LoadingScreen";
import TrackPageViews from "./utils/TrackPageViews";

function App() {
  return (
    <AppProvider>
      <Router>
        <TrackPageViews />

        <RouteChangeLoader />
        <AppRoutes />
        <LoadingScreen />

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
