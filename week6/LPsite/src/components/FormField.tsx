import { type FieldError, type UseFormRegisterReturn } from 'react-hook-form';

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  isLabelSrOnly?: boolean;
  children?: React.ReactNode;
}

const FormField = ({ id, label, type = 'text', placeholder, register, error, isLabelSrOnly = true, children }: FormFieldProps) => {
  return (
    <div className="relative">
      <label htmlFor={id} className={isLabelSrOnly ? 'sr-only' : ''}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register}
        className="w-full px-3 py-2 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
      {children}
      {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};

export default FormField;
