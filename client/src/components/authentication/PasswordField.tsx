import React, { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordFieldProps {
  label: string;
  registration: UseFormRegisterReturn;
  error?: string;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({ label, registration, error }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm text-text-secondary font-mono">{label}</label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          {...registration}
          className={`w-full bg-background border ${error ? 'border-danger focus:border-danger' : 'border-border focus:border-primary'} rounded p-2 text-text-DEFAULT outline-none transition-colors duration-200`}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-DEFAULT transition-colors duration-200"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && <span className="text-xs text-danger font-mono mt-1">{error}</span>}
    </div>
  );
};
