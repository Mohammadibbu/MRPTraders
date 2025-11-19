import { toast } from "sonner";

type ToastType = "info" | "success" | "error" | "warning" | "default";

const cancelButtonStyle = {
  position: "absolute" as const,
  top: "6px",
  right: "10px",

  padding: "4px 10px",
  fontSize: "12px",
  fontWeight: "600",

  color: "#ffffff",

  border: "none",
  borderRadius: "4px",

  cursor: "pointer",
  minWidth: "auto",
  height: "auto",

  transition: "all 0.2s ease-in-out", // smooth hover
};

export const showtoast = (
  message: string,
  description = "",
  type: ToastType = "default",
  duration = 3000
) => {
  switch (type) {
    case "info":
      toast.info(message, toastOptions(description, duration));
      break;
    case "success":
      toast.success(message, toastOptions(description, duration));
      break;
    case "error":
      toast.error(message, toastOptions(description, duration));
      break;
    case "warning":
      toast.warning(message, toastOptions(description, duration));
      break;
    case "default":
      toast(message, toastOptions(description, duration));
      break;
    default:
      toast(message, toastOptions(description, duration));
      break;
  }
};

const toastOptions = (description: string, duration: number) => ({
  description,
  duration,
  cancel: {
    label: "X",
    onClick: () => {
      // Default behavior dismisses, but we can add logic here if needed
    },
  },
  cancelButtonStyle: cancelButtonStyle,
  style: {
    backgroundColor: "#111827",
    color: "#faf7fc",
    fontSize: "14px",
    border: "none",
    // boxShadow: "rgb(95, 26, 53) 2px 2px 5px 0px",
    userSelect: "none" as "none",
  },
});

// Toast promise function to handle async actions with showtoast
export const showToastPromise = <T>(
  promise: Promise<T>,
  messages: {
    loading: string;
    success: string | ((data: T) => string);
    error: string | ((error: any) => string);
  },
  duration: number = 3000
) => {
  return toast.promise(promise, {
    loading: messages.loading,
    success: messages.success,
    error: messages.error,
    cancel: {
      // We explicitly cast to 'any' to avoid TypeScript errors with the library
      label: "X",
      onClick: () => {
        // Default behavior dismisses, but we can add logic here if needed
      },
    },
    cancelButtonStyle: cancelButtonStyle,
    duration,
    style: {
      backgroundColor: "#111827",
      color: "#faf7fc",
      fontSize: "14px",
      border: "none",
      // boxShadow: "rgb(95, 26, 53) 2px 2px 5px 0px",
    },
  });
};
