import { X } from "lucide-react";
import { toast } from "sonner";

type ToastType = "info" | "success" | "error" | "warning" | "default";

const cancelButtonStyle = {
  position: "absolute" as const,
  top: "6px",
  right: "10px",
  padding: "4px 10px",
  color: "#ffffff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  minWidth: "auto",
  height: "auto",
  transition: "all 0.2s ease-in-out",
};

export const showtoast = (
  message: string,
  description = "",
  type: ToastType = "default",
  duration = 3000
) => {
  const opts = toastOptions(description, duration);

  switch (type) {
    case "info":
      toast.info(message, opts);
      break;
    case "success":
      toast.success(message, opts);
      break;
    case "error":
      toast.error(message, opts);
      break;
    case "warning":
      toast.warning(message, opts);
      break;
    default:
      toast(message, opts);
  }
};

const toastOptions = (description: string, duration: number) => ({
  description,
  duration,
  cancel: {
    label: <X size={16} strokeWidth={3} />,
    onClick: () => {},
  },
  cancelButtonStyle,
  style: {
    backgroundColor: "#111827",
    color: "#faf7fc",
    fontSize: "14px",
    border: "none",
    userSelect: "none" as const,
  },
});

// ToastPromise with JSX label
export const showToastPromise = <T,>(
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
      label: <X size={16} strokeWidth={3} />,
      onClick: () => {},
    },
    cancelButtonStyle,
    duration,
    style: {
      backgroundColor: "#111827",
      color: "#faf7fc",
      fontSize: "14px",
      border: "none",
    },
  });
};
