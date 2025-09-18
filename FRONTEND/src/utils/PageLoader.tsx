import React from "react";

const FullPageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white z-[9999] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-opacity-50"></div>
    </div>
  );
};

export default FullPageLoader;
