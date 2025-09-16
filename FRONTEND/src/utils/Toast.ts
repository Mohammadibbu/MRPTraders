import { toast } from "sonner";

type ToastType = "info" | "success" | "error" | "warning" | "default";

export const showtoast = (
  message: string,
  description = "",
  duration = 3000,
  type: ToastType = "default"
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
  style: {
    backgroundColor: "#F7F4F1",
    color: "#5F1A35",
    fontSize: "14px",
    border: "none",
    boxShadow: "rgb(95, 26, 53) 2px 2px 5px 0px",
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
    duration,
    style: {
      backgroundColor: "#F7F4F1",
      color: "#5F1A35",
      fontSize: "14px",
      border: "none",
      boxShadow: "rgb(95, 26, 53) 2px 2px 5px 0px",
    },
  });
};
