import clsx from "clsx";
import React, { FC } from "react";
import { IconType } from "react-icons";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

export interface AppLinkProps {
     label: string;
     path: string;
     Icon?: IconType;
}

export const AppLink: FC<AppLinkProps> = ({ label, path, Icon }) => {
     let resolved = useResolvedPath(path);
     let match = useMatch({ path: resolved.pathname, end: true });
     return (
          <Link to={path}>
               <div className="flex gap-3 w-full justify-start cursor-pointer">
                    <div
                         className={clsx(
                              "flex items-center gap-4 p-3  w-full rounded-lg transition-all duration-300 hover:shadow-md",
                              match
                                   ? "bg-primary-100 text-primary-500 shadow-md  transition-all duration-300"
                                   : "text-gray-500"
                         )}
                    >
                         {Icon && <Icon size={22} />}
                         <p className="font-semibold capitalize">{label}</p>
                    </div>
               </div>
          </Link>
     );
};
