import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

export interface BlogCardProps {
     label: string;
     image: string;
     category: string;
     postedBy: string;
     _id: string;
}

export const BlogCard: FC<BlogCardProps> = ({ category, image, label, postedBy, _id }) => {
     const navigate = useNavigate();
     return (
          <div className="">
               <div className="object-fill h-[150px]">
                    <img src={image} className="w-full h-full rounded-lg" alt={label} />
               </div>
               <h6
                    onClick={() => navigate(`/blogs/details/${_id}`)}
                    className="select-none group-hover:text-primary-500 transition-all duration-300 cursor-pointer truncate text-xl capitalize font-semibold"
               >
                    {label}
               </h6>
               <p className="text-gray-500 capitalize">{category}</p>
               <p className="capitalize">Posted By {postedBy}</p>
          </div>
     );
};
