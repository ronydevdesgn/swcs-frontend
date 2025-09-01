/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext } from 'react';
import './DialogGlobal.css';

// Context para gerenciar o estado do Dialog
interface DialogContextType {
  isOpen: boolean;
  onClose: () => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

function useDialogContext() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error(
      'Os componentes de diálogo devem ser usados dentro do Dialog.Root',
    );
  }
  return context;
}

// Componente Root do Dialog
interface DialogRootProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function DialogRoot({ isOpen, onClose, children }: DialogRootProps) {
  if (!isOpen) return null;

  return (
    <DialogContext.Provider value={{ isOpen, onClose }}>
      <div className="dialog-overlay" onClick={onClose}>
        <div className="dialog-container" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </DialogContext.Provider>
  );
}

// Header do Dialog
interface DialogHeaderProps {
  title: string;
  subtitle?: string;
}

export function DialogHeader({ title, subtitle }: DialogHeaderProps) {
  return (
    <div className="dialog-header">
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}

// Body/Content do Dialog
interface DialogContentProps {
  children: React.ReactNode;
}

export function DialogContent({ children }: DialogContentProps) {
  return <div className="dialog-content">{children}</div>;
}

// Actions do Dialog
interface DialogActionsProps {
  children: React.ReactNode;
}

export function DialogActions({ children }: DialogActionsProps) {
  return <div className="dialog-actions">{children}</div>;
}

// Button do Dialog
interface DialogButtonProps {
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export function DialogButton({
  variant = 'primary',
  onClick,
  children,
  disabled,
}: DialogButtonProps) {
  const className = variant === 'primary' ? 'btn btn-submit' : 'btn btn-cancel';

  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

// Input do Dialog
interface DialogInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  closeOnEscape?: boolean;
}

export function DialogInput({
  placeholder,
  value,
  onChange,
  type = 'text',
  closeOnEscape = true,
}: DialogInputProps) {
  const { onClose } = useDialogContext();
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (closeOnEscape && e.key === 'Escape') {
      onClose(); // Fecha o dialog ao pressionar o botão Escape
    }
  };

  return (
    <div className="form-group">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="form-input"
      />
    </div>
  );
}

// Compound component
export const Dialog = {
  Root: DialogRoot,
  Header: DialogHeader,
  Content: DialogContent,
  Actions: DialogActions,
  Button: DialogButton,
  Input: DialogInput,
};
