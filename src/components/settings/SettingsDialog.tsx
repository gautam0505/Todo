import { PaletteRounded, SettingsRounded } from "@mui/icons-material";
import { Box, CircularProgress, Dialog, DialogContent, Divider, useTheme } from "@mui/material";
import {
  JSX,
  lazy,
  LazyExoticComponent,
  ReactElement,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { CustomDialogTitle } from "..";
import { UserContext } from "../../contexts/UserContext";
import { useResponsiveDisplay } from "../../hooks/useResponsiveDisplay";
import { CloseButton, CloseButtonContainer, TabHeading } from "./settings.styled";

const AppearanceTab = lazy(() => import("./tabs/AppearanceTab"));

interface SettingsProps {
  open: boolean;
  onClose: () => void;
  handleOpen: () => void;
}

export const SettingsDialog = ({ open, onClose, handleOpen }: SettingsProps) => {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();
  const isMobile = useResponsiveDisplay();
  const muiTheme = useTheme();

  const handleDialogClose = useCallback(() => {
    onClose();
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }, [onClose]);

  const handleHashChange = useCallback(() => {
    const hash = window.location.hash;
    if (!hash.startsWith("#settings")) {
      onClose();
    }
  }, [onClose]);

  const handleHashOpen = useCallback(() => {
    if (window.location.hash.startsWith("#settings")) {
      handleOpen();
    }
  }, [handleOpen]);

  useEffect(() => {
    const onHashChange = () => {
      handleHashChange();
      handleHashOpen();
    };

    onHashChange();

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [handleHashChange, handleHashOpen]);

  useEffect(() => {
    if (open) {
      const hash = window.location.hash;
      if (!hash.startsWith("#settings")) {
        window.location.hash = "#settings";
      }
    }
  }, [open]);

  // theme color management
  useEffect(() => {
    const themeColorMeta = document.querySelector("meta[name=theme-color]");
    const defaultThemeColor = muiTheme.palette.secondary.main;

    if (themeColorMeta) {
      // ensure this runs after App.tsx useEffect to override theme-color
      setTimeout(() => {
        if (open) {
          themeColorMeta.setAttribute(
            "content",
            muiTheme.palette.mode === "dark" ? "#383838" : "#ffffff",
          );
        } else {
          themeColorMeta.setAttribute("content", defaultThemeColor);
        }
      }, 10);
    }
  }, [muiTheme.palette.mode, muiTheme.palette.secondary.main, open, user.theme, user.darkmode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "p") {
        e.preventDefault();
        handleDialogClose();
        navigate("/");
        setTimeout(async () => {
          // ensure all emojis are loaded before printing
          await Promise.all(
            Array.from(
              document.querySelectorAll<HTMLImageElement>("img.epr-emoji-img[loading='lazy']"),
            ).map((img) =>
              img.complete
                ? Promise.resolve()
                : new Promise<void>((resolve) => {
                    const preloader = new Image();
                    preloader.src = img.src;
                    preloader.onload = () => resolve();
                    preloader.onerror = () => resolve();
                  }),
            ),
          );
          window.print();
        }, 500);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate, handleDialogClose]);

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
      slotProps={{
        paper: {
          style: {
            padding: isMobile ? "12px 0" : "12px",
            borderRadius: isMobile ? 0 : "24px",
            minWidth: "400px",
            maxHeight: isMobile ? undefined : "500px",
            overflow: "hidden",
          },
        },
      }}
    >
      <CustomDialogTitle
        icon={<SettingsRounded />}
        title="Settings"
        subTitle="Manage Your settings and preferences"
        onClose={handleDialogClose}
        removeDivider
      />
      <Divider sx={{ mb: 2 }} />
      <DialogContent
        className="customScrollbar"
        sx={{
          minHeight: 400,
          m: isMobile ? "0 12px" : "0 20px",
          p: 0,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Suspense
          fallback={
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              minHeight={isMobile ? 150 : 400}
            >
              <CircularProgress size={48} />
            </Box>
          }
        >
          <TabHeading>Appearance</TabHeading>
          <AppearanceTab />
        </Suspense>
      </DialogContent>
      {isMobile && (
        <CloseButtonContainer>
          <CloseButton variant="contained" onClick={handleDialogClose}>
            Close
          </CloseButton>
        </CloseButtonContainer>
      )}
    </Dialog>
  );
};
