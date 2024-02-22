import clsx from "clsx";
import React, { FC } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export interface ButtonProps {
     outlined?: boolean;
     filled?: boolean;
     dangerFilled?: boolean;
     dangerOutlined?: boolean;
     successOutlined?: boolean;
     successFilled?: boolean;
     loading?: boolean;
     small?: boolean;
     fullWidth?: boolean;
}

export const Button: FC<
     ButtonProps & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({
     outlined,
     filled,
     dangerOutlined,
     dangerFilled,
     successFilled,
     successOutlined,
     loading,
     children,
     small,
     fullWidth,
     ...rest
}) => {
     return (
          <button
               {...rest}
               className={clsx(
                    "transition-all duration-300 rounded-md disabled:bg-gray-300 uppercase",
                    small ? "py-2 px-5" : "py-3 px-10",
                    fullWidth && "w-full",
                    filled && "bg-primary-500 hover:bg-primary-700  text-white",
                    outlined &&
                         "hover:border-transparent border-2 border-primary-500 hover:bg-primary-500 hover:text-white text-primary-500",
                    dangerFilled && "bg-red-500 hover:bg-red-700 text-white",
                    dangerOutlined &&
                         "hover:border-transparent border-2 text-red-500 border-red-500 hover:bg-red-500 hover:text-white",
                    successFilled && "bg-green-500 hover:bg-green-700 text-white",
                    successOutlined &&
                         "hover:border-transparent border-2 text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
               )}
               disabled={loading}
          >
               {loading ? (
                    <div className="animate-spin flex justify-center w-full items-center">
                         <AiOutlineLoading3Quarters size={30} />
                    </div>
               ) : (
                    children
               )}
          </button>
     );
};
