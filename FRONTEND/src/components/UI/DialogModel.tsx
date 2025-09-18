import { Dialog, DialogTitle, DialogPanel } from "@headlessui/react";
import { AlertTriangle, X, Loader } from "lucide-react"; // Added X icon for close functionality
import { ReactNode } from "react";

interface DialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  heading: string;
  messageDescription: string;
  okText: string;
  cancelText: string;
  icon?: ReactNode; // Optional icon
  iconColor?: string; // Optional icon color (defaults to primary color)
  okButtonColor?: string; // Optional ok button color
  cancelButtonColor?: string; // Optional cancel button color
  okButtonAction?: () => void;
  loading?: boolean;
}

const DialogComponent: React.FC<DialogProps> = ({
  open,
  setOpen,
  heading,
  messageDescription,
  okText,
  cancelText,
  icon = <AlertTriangle className="text-primary h-6 w-6" />, // Default icon is AlertTriangle
  // iconColor = "text-red-400", // Default icon color
  okButtonColor = "bg-primary", // Default OK button color (primary)
  cancelButtonColor = "bg-secondarylight", // Default cancel button color (secondarylight)
  okButtonAction,
  loading = false,
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-10"
    >
      {/* Custom backdrop using Tailwind styles */}
      <div className="fixed  inset-0 bg-gray-900/50 transition-opacity" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-secondary text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-secondarylight px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-500/10 sm:mx-0 sm:size-10">
                  {icon}
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold text-primary"
                  >
                    {heading}
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-primary/70">
                      {messageDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-primary/10 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              {/* OK Button */}
              <button
                type="button"
                // onClick={() => setOpen(false)}
                onClick={() => {
                  okButtonAction?.();
                }}
                disabled={loading}
                className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white hover:bg-red-400 sm:ml-3 sm:w-auto ${okButtonColor} shadow-button-primary hover:shadow-button-hover`}
              >
                {okText}
                {loading ? (
                  <Loader className="animate-spin ms-2 h-5 w-5" />
                ) : (
                  ""
                )}
              </button>
              {/* Cancel Button */}
              <button
                type="button"
                data-autofocus
                onClick={() => setOpen(false)}
                className={`mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-primary/90 inset-ring inset-ring-white/5 hover:bg-secondary hover:text-primary sm:mt-0 sm:w-auto ${cancelButtonColor}`}
              >
                {cancelText}
              </button>
            </div>
            {/* Close Button (X Icon) */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-primary/50 hover:text-primary"
            >
              <X className="text-xl font-bold" />
            </button>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default DialogComponent;
