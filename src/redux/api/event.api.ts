import { createApi } from "@reduxjs/toolkit/query/react";
import { ADMIN_EVENTS, AppBaseQuery } from "../../utils";
import { IEventsProps } from "../../interface/event.inteface";

const EventApi = createApi({
     baseQuery: AppBaseQuery,
     reducerPath: "eventApi",
     tagTypes: ["eventApi"],
     endpoints: ({ mutation, query }) => ({
          GetAllEvents: query<{ data: IEventsProps[] }, void>({
               query: () => `/${ADMIN_EVENTS}/all`,
               providesTags: ["eventApi"],
          }),
          GetEventById: query<{ data: IEventsProps }, string>({
               query: (id) => `/${ADMIN_EVENTS}/${id}`,
               providesTags: ["eventApi"],
          }),
          RegisterNewEvent: mutation<{ data: string }, IEventsProps>({
               query: (payload) => {
                    return {
                         url: `/${ADMIN_EVENTS}/`,
                         method: "POST",
                         body: { ...payload },
                    };
               },
               invalidatesTags: ["eventApi"],
          }),
          UpdateEventById: mutation<{ data: string }, { id: string; payload: IEventsProps }>({
               query: ({ payload, id }) => {
                    return {
                         url: `/${ADMIN_EVENTS}/${id}`,
                         method: "PUT",
                         body: { ...payload },
                    };
               },
               invalidatesTags: ["eventApi"],
          }),
          DeleteEventById: mutation<{ data: string }, string>({
               query: (eventId) => {
                    return {
                         url: `/${ADMIN_EVENTS}/${eventId}`,
                         method: "DELETE",
                    };
               },
               invalidatesTags: ["eventApi"],
          }),
     }),
});

export const EventApiReducer = EventApi.reducer;
export const EventApiMiddleware = EventApi.middleware;
export const {
     useDeleteEventByIdMutation,
     useGetAllEventsQuery,
     useGetEventByIdQuery,
     useLazyGetAllEventsQuery,
     useLazyGetEventByIdQuery,
     useRegisterNewEventMutation,
     useUpdateEventByIdMutation,
} = EventApi;
