import { Fragment, ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AlertTriangle, X, Loader2, CheckCircle, Info } from "lucide-react";

interface DialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  heading: string;
  messageDescription: string | ReactNode;
  okText: string;
  cancelText?: string;
  icon?: ReactNode;
  variant?: "danger" | "success" | "info" | "default"; // New: Preset styles
  okButtonColor?: string;
  cancelButtonColor?: string;
  okButtonAction?: () => void;
  loading?: boolean;
}

const DialogComponent: React.FC<DialogProps> = ({
  open,
  setOpen,
  heading,
  messageDescription,
  okText,
  cancelText = "Cancel",
  icon,
  variant = "default",
  okButtonColor,
  cancelButtonColor,
  okButtonAction,
  loading = false,
}) => {
  // Determine styles based on variant
  const getVariantStyles = () => {
    switch (variant) {
      case "danger":
        return {
          iconBg: "bg-red-100",
          iconColor: "text-red-600",
          defaultIcon: <AlertTriangle className="h-6 w-6 text-red-600" />,
          btnColor: "bg-red-600 hover:bg-red-700",
        };
      case "success":
        return {
          iconBg: "bg-green-100",
          iconColor: "text-green-600",
          defaultIcon: <CheckCircle className="h-6 w-6 text-green-600" />,
          btnColor: "bg-green-600 hover:bg-green-700",
        };
      case "info":
        return {
          iconBg: "bg-blue-100",
          iconColor: "text-blue-600",
          defaultIcon: <Info className="h-6 w-6 text-blue-600" />,
          btnColor: "bg-blue-600 hover:bg-blue-700",
        };
      default:
        return {
          iconBg: "bg-primary/10",
          iconColor: "text-primary",
          defaultIcon: <AlertTriangle className="h-6 w-6 text-primary" />,
          btnColor: "bg-primary hover:bg-primary/90",
        };
    }
  };

  const styles = getVariantStyles();
  const finalIcon = icon || styles.defaultIcon;
  const finalOkBtnColor = okButtonColor || styles.btnColor;
  const finalCancelBtnColor =
    cancelButtonColor ||
    "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50";

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[100]"
        onClose={() => setOpen(false)}
      >
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            {/* Panel Animation */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 w-full sm:max-w-lg border border-gray-100">
                {/* Close Button (Absolute) */}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="px-6 pt-6 pb-6">
                  <div className="sm:flex sm:items-start">
                    {/* Icon Bubble */}
                    <div
                      className={`mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${styles.iconBg} sm:mx-0 sm:h-10 sm:w-10`}
                    >
                      {finalIcon}
                    </div>

                    <div className="mt-4 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-semibold leading-6 text-gray-900"
                      >
                        {heading}
                      </Dialog.Title>
                      <div className="mt-2">
                        <div className="text-sm text-gray-500 leading-relaxed">
                          {messageDescription}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse gap-3">
                  <button
                    type="button"
                    onClick={okButtonAction}
                    disabled={loading}
                    className={`inline-flex w-full justify-center items-center rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all sm:ml-3 sm:w-auto ${finalOkBtnColor} disabled:opacity-70 disabled:cursor-not-allowed`}
                  >
                    {loading && (
                      <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    )}
                    {okText}
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    disabled={loading}
                    className={`mt-3 inline-flex w-full justify-center rounded-xl px-5 py-2.5 text-sm font-semibold shadow-sm sm:mt-0 sm:w-auto ${finalCancelBtnColor} transition-colors`}
                  >
                    {cancelText}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DialogComponent;
