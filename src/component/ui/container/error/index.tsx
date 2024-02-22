import React, { FC } from "react";
import { useAppDispatch } from "../../../../redux";
import { IoMdClose } from "react-icons/io";
import { handleError } from "../../../../redux/app";

export interface ErrorProps {
     text: string;
}

export const Error: FC<ErrorProps> = ({ text }) => {
     const dispatch = useAppDispatch();
     return (
          <div className="bg-red-200 p-3 rounded-md shadow-lg flex justify-between items-center">
               <p className="text-sm text-red-500 capitalize">{text}</p>
               <button type="button" onClick={() => dispatch(handleError(null))}>
                    <IoMdClose className="text-red-500" />
               </button>
          </div>
     );
};
