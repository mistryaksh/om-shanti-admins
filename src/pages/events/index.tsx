import React, { useEffect } from "react";
import { Layout } from "../../layout";
import { useLazyGetAllEventsQuery } from "../../redux/api";
import { useAppDispatch } from "../../redux";
import { handleError, setEvent, useEventSlice } from "../../redux/app";
import { Button, EventCard } from "../../component";
import { useNavigate } from "react-router-dom";
import { IEventCategoryProps } from "../../interface/category.interface";

export const EventsPage = () => {
     const [
          GetEvents,
          {
               isError: isEventError,
               error: eventError,
               data: eventData,
               isLoading: isEventLoading,
               isSuccess: isEventSuccess,
          },
     ] = useLazyGetAllEventsQuery();

     const { events } = useEventSlice();
     const dispatch = useAppDispatch();
     const navigate = useNavigate();

     useEffect(() => {
          if (isEventError) {
               if ((eventError as any).data) {
                    dispatch(handleError((eventError as any).data.message));
               } else {
                    console.log((eventError as any).error);
                    dispatch(handleError((eventError as any).error));
               }
          }

          (async () => await GetEvents())();
          if (isEventSuccess) {
               // console.log(eventData?.data);
               eventData?.data.map((element) => {
                    if (!events.includes(element)) {
                         return dispatch(setEvent(element));
                    } else {
                         return null;
                    }
               });
          }
     }, [eventData?.data, dispatch, events, GetEvents, isEventSuccess, eventError, isEventError]);
     return (
          <Layout>
               <div className="flex items-center justify-between">
                    <h6 className="text-3xl font-semibold">Your Events is Listed here</h6>
                    <Button filled onClick={() => navigate("/events/new")}>
                         Upload
                    </Button>
               </div>
               {!isEventLoading && eventData?.data.length !== 0 && (
                    <div className="mt-10 grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 gap-5 md:grid-cols-6">
                         {eventData?.data?.map(({ label, image, createdAt, categoryId, _id }) => (
                              <EventCard
                                   key={_id}
                                   _id={_id as string}
                                   categoryLabel={(categoryId as IEventCategoryProps)?.label}
                                   createdAt={createdAt?.toString() as string}
                                   image={image}
                                   label={label}
                              />
                         ))}
                    </div>
               )}
               {!isEventLoading && !eventData?.data.length && (
                    <div className="flex  justify-center items-center flex-col w-[50%] mx-auto my-20">
                         <p className="text-gray-500 text-2xl capitalize mb-3">No events found</p>
                         <Button onClick={() => navigate("/events/new")} filled>
                              Upload new event
                         </Button>
                    </div>
               )}
               {isEventLoading && <p>Loading...</p>}
          </Layout>
     );
};
