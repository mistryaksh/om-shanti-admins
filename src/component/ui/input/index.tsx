import React, { FC } from "react";

export interface InputFieldProps {
     label: string;
     isError?: boolean;
     error?: string;
     type?: React.HTMLInputTypeAttribute;
}

export const InputField: FC<
     InputFieldProps & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
> = ({ label, isError, error, type, ...rest }) => {
     return (
          <div className="">
               <label htmlFor={label} className="text-gray-400 font-semibold select-none capitalize">
                    {label}
               </label>
               <div className="flex items-center gap-3">
                    <input
                         {...rest}
                         type={type}
                         className="border-2 px-5 py-3 rounded-md w-full mt-2 focus:border-primary-500 focus:outline-none transition-all duration-300 placeholder:text-gray-300 disabled:border-primary-100 disabled:opacity-50"
                    />
               </div>
               {isError && <p className="text-right font-mono text-rose-500 uppercase text-xs mt-2">{error}</p>}
          </div>
     );
};
