import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { memo, ReactNode, useState } from "react";

interface ModelProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string; 
    children?: ReactNode;
}

const Model = ({ isOpen, onClose, title, children}: ModelProps) => {
  

  return (
     <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none "
        onClose={onClose}
      >
        <div className="fixed inset-0 backdrop-blur-sm z-10 w-screen overflow-y-auto ">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              
                {title && 
                    <DialogTitle
                    as="h3"
                    className="text-base/7 font-medium text-black"
                  >
                    {title}
                  </DialogTitle>
                }
             
              <div className="mt-4">
               {children}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
  
  );
};

export default memo(Model);
