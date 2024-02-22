import React, { FC } from "react";
import { useAppDispatch } from "../../../../redux";
import { IoMdClose } from "react-icons/io";
import { handleError } from "../../../../redux/app";

export interface SuccessProps {
     text: string;
}

export const Success: FC<SuccessProps> = ({ text }) => {
     const dispatch = useAppDispatch();
     return (
          <div className="bg-green-200 p-3 rounded-md shadow-lg flex justify-between items-center">
               <p className="text-sm text-green-500 capitalize">{text}</p>
               <button type="button" onClick={() => dispatch(handleError(null))}>
                    <IoMdClose className="text-green-500" />
               </button>
          </div>
     );
};
