import { toast } from "react-toastify";

const theme = () => localStorage.getItem(import.meta.env.VITE_THEME);

export const ErrorHandler = new (class {
  isNetworkError = { status: false, informed: false };
  reject;

  handle(error, reject) {
    const { code, message, response } = error;
    const errorMessage = response?.data || "";
    this.reject = reject;

    const isAuthError = response?.status === 401;
    const isClientError = response?.status >= 400 && response?.status < 500;
    const isServerError = response?.status >= 500;

    if (code === "ERR_NETWORK") this.handleNetworkError(message);
    else this.resetNetworkStatus();

    if (isAuthError) this.handleAuthentication();
    if (isClientError && !isAuthError) this.alert(errorMessage);
    if (isServerError) this.alert(errorMessage);
  }

  handleNetworkError(message) {
    this.isNetworkError.status = true;
    if (this.isNetworkError.informed) return;

    this.alert(message);
    this.isNetworkError.informed = true;
  }

  resetNetworkStatus() {
    if (!this.isNetworkError.status) return;

    this.isNetworkError.status = false;
    this.isNetworkError.informed = false;
  }

  handleAuthentication() {
    this.alert("Authentication Failed");
  }

  alert(message) {
    toast.error(message, { theme: theme() });
    this.reject(message);
  }
})();
