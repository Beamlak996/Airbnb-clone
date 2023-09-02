"use client";

import { ReactElement, useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

type ModalProps = {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: ReactElement;
  footer?: ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
};

const Modals = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}: ModalProps) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }
    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className='flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none bg-neutral-800/70 z-50'>
        <div className='relative w-full md:w-3/4 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto'>
          {/* Content */}
          <div
            className={`translate duration-300 h-full ${
              showModal ? "translate-y-0" : "translate-y-full"
            } ${showModal ? `opacity-100` : `opacity-0`}`}
          >
            <div className='translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
              {/* Header */}
              <div className='flex items-center p-4 rounded-t justify-center relative border-b-[1px]'>
                <button
                  className='p-1 border-0 hover:opacity-70 transition absolute left-9'
                  onClick={handleClose}
                >
                  <IoMdClose size={18} />
                </button>
                <div className='font-semibold text-lg'>{title}</div>
              </div>
              {/* Body */}
              <div className='p-4 relative flex-auto'>{body}</div>
              {/* Footer */}
              <div className='flex flex-col gap-2 p-4'>
                <div className='flex items-center gap-4 w-full'>
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                      disabled={disabled}
                      outline
                    />
                  )}
                  <Button
                    label={actionLabel}
                    onClick={handleSubmit}
                    disabled={disabled}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modals;
