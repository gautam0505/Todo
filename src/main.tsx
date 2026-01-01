import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { initColors } from "ntc-ts";
import { ORIGINAL_COLORS } from "ntc-ts";
import { UserContextProvider } from "./contexts/UserProvider.tsx";
import { registerSW } from "virtual:pwa-register";
import { showToast } from "./utils/showToast.tsx";
import { updatePrompt } from "./utils/updatePrompt.tsx";
import { CircularProgress } from "@mui/material";
import toast from "react-hot-toast";
import { TaskProvider } from "./contexts/TaskProvider.tsx";

// initialize ntc colors
initColors(ORIGINAL_COLORS);

const offlinePreparationCount = parseInt(
  // prevent toast from showing infinitely on older versions of the app
  localStorage.getItem("offlinePreparationCount") || "0",
  10,
);

if (
  offlinePreparationCount < 3 &&
  !localStorage.getItem("initialCachingComplete") &&
  process.env.NODE_ENV !== "development"
) {
  showToast("Loading", {
    duration: Infinity,
    type: "blank",
    id: "initial-offline-preparation",
    icon: <CircularProgress size={20} thickness={4} />,
  });

  localStorage.setItem("offlinePreparationCount", (offlinePreparationCount + 1).toString());
}

// Show a prompt to update the app when a new version is available
const updateSW = registerSW({
  onRegistered(r) {
    if (r) {
      updatePrompt(r);

      // Check for updates every 30 seconds
      setInterval(() => {
        r.update();
      }, 30000);
    }
  },
  onOfflineReady() {
    toast.dismiss("initial-offline-preparation");

    if (!localStorage.getItem("initialCachingComplete")) {
      showToast("Hello");
      localStorage.setItem("initialCachingComplete", "true");
    }
  },
  immediate: true, // Check for updates immediately on load
});

// Check for updates when the page becomes visible again
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    updateSW(true); // Force check for updates
  }
});

// Listen for the `SKIP_WAITING` message and reload the page when the new SW takes over
navigator.serviceWorker?.addEventListener("controllerchange", () => {
  window.location.reload();
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <UserContextProvider>
      <TaskProvider>
        <App />
      </TaskProvider>
    </UserContextProvider>
  </BrowserRouter>,
);
