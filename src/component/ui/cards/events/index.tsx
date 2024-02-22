import moment from "moment";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

export interface EventCardsProps {
     _id: string;
     image: string;
     label: string;
     categoryLabel: string;
     createdAt: string;
}

export const EventCard: FC<EventCardsProps> = ({ _id, categoryLabel, createdAt, image, label }) => {
     const navigate = useNavigate();
     return (
          <div className="group" key={_id}>
               <div className="object-fill h-[150px]">
                    <img src={image} className="w-full h-full rounded-lg" alt={label} />
               </div>
               <div className="py-3">
                    <h6
                         onClick={() => navigate(`/events/details/${_id}`)}
                         className="select-none group-hover:text-primary-500 transition-all duration-300 cursor-pointer truncate text-xl capitalize font-semibold"
                    >
                         {label}
                    </h6>
                    <p className="text-gray-500 capitalize">{categoryLabel}</p>
                    <p className="text-xs text-gray-500">
                         Uploaded on {moment(createdAt).format("Do MMM YYYY hh:mm A")}
                    </p>
               </div>
          </div>
     );
};
