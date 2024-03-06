import { createApi } from "@reduxjs/toolkit/query/react";
import { AppBaseQuery } from "../../utils";
import { IDonationProps, SendMailProps } from "../../interface";

const DonationApi = createApi({
     baseQuery: AppBaseQuery,
     reducerPath: "donationApi",
     endpoints: ({ query, mutation }) => ({
          GetAllDonations: query<{ data: IDonationProps[] }, void>({
               query: () => `/donation/all`,
          }),
          GetDonationById: query<{ data: IDonationProps }, string>({
               query: (id) => `/donations/${id}`,
          }),
          SendingMail: mutation<{ data: any }, SendMailProps>({
               query: (payload) => {
                    return {
                         url: `/donations/send-mail`,
                         body: { ...payload },
                         method: "POST",
                    };
               },
          }),
     }),
});

export const DonationApiReducer = DonationApi.reducer;
export const DonationApiMiddleware = DonationApi.middleware;
export const { useLazyGetAllDonationsQuery, useLazyGetDonationByIdQuery, useSendingMailMutation } = DonationApi;
