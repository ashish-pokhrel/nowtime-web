import React from "react";
import { AxiosError } from "axios";
import { axiosInstance } from "./axiosInstance";
import { AxiosContext } from "./AxiosContext";
import GlobalLoader from "../components/GlobalLoader";
import { Snackbar, Alert } from "@mui/material";

export function AxiosProvider({ children }: { children: React.ReactNode }) {
  const [loadingCount, setLoadingCount] = React.useState(0);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const reqInterceptor = axiosInstance.interceptors.request.use((config) => {
      setLoadingCount((c) => c + 1);
      return config;
    });

   const resInterceptor = axiosInstance.interceptors.response.use(
  (response) => {
    setLoadingCount((c) => Math.max(c - 1, 0));
    return response;
  },
  (err: AxiosError<unknown>) => {
    setLoadingCount((c) => Math.max(c - 1, 0));

    const resData = err.response?.data;

    let message = "Something went wrong";
    if (typeof resData === "object" && resData !== null && "message" in resData) {
      const maybeMsg = (resData as { message?: unknown }).message;
      if (typeof maybeMsg === "string" && maybeMsg.trim().length > 0) {
        message = maybeMsg;
      }
    } else if (typeof err.message === "string" && err.message.trim().length > 0) {
      message = err.message;
    }

    setError(message);
    return Promise.reject(err);
  }
);


    return () => {
      axiosInstance.interceptors.request.eject(reqInterceptor);
      axiosInstance.interceptors.response.eject(resInterceptor);
    };
  }, []);

  return (
    <AxiosContext.Provider value={{ axios: axiosInstance }}>
      {children}

      {/* Global loader */}
      <GlobalLoader open={loadingCount > 0} />

      {/* Global error */}
      <Snackbar
        open={Boolean(error)}
        autoHideDuration={4000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </AxiosContext.Provider>
  );
}
