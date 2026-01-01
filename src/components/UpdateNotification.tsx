import { useEffect } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import { showToast } from "../utils";

export const UpdateNotification = () => {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log("SW Registered: " + r);
    },
    onRegisterError(error) {
      console.log("SW registration error", error);
    },
    onOfflineReady() {
      // This empty function prevents the "app is ready for offline use" toast.
    },
  });

  useEffect(() => {
    if (needRefresh) {
      showToast(
        <div>
          <b>New version available!</b>
          <br />
          Update now to get the latest features and improvements.
        </div>,
        {
          type: "info",
          duration: Infinity,
          dismissButton: false,
          id: "update-available",
        },
      );
    }
  }, [needRefresh]);

  const handleUpdate = () => {
    setNeedRefresh(false);
    updateServiceWorker(true);
  };

  if (!needRefresh) return null;

  return null; // Toast handles the UI
};
