import React, { FC } from "react";
import { IconType } from "react-icons";
import { useNavigate } from "react-router-dom";

export interface DashboardCardProps {
     Icon: IconType;
     label: string;
     path: string;
     value: string;
}

export const DashboardCard: FC<DashboardCardProps> = ({ Icon, label, path, value }) => {
     const navigate = useNavigate();
     return (
          <div
               className="shadow-xl px-5 py-2 border-primary-500 border-2 gap-10 flex items-center cursor-pointer bg-indigo-50 rounded-xl text-gray-900 hover:bg-indigo-500 hover:text-white transition-all duration-300 group"
               onClick={() => navigate(path)}
          >
               <div className="flex gap-5 items-center flex-col">
                    <Icon size={50} className="text-primary-500 group-hover:text-white" />
                    <h6 className="text-2xl capitalize">{label}</h6>
               </div>
               <h3 className="text-4xl text-center w-full">{value}</h3>
          </div>
     );
};
