import { createApi } from "@reduxjs/toolkit/query/react";
import { AppBaseQuery } from "../../utils";

const WebsiteApi = createApi({
     baseQuery: AppBaseQuery,
     reducerPath: "websiteApi",
     endpoints: ({ mutation, query }) => ({
          DataAnalyser: query<{ data: any }, void>({
               query: () => `/ngo/database/data-analyser`,
          }),
     }),
});

export const WebsiteApiReducer = WebsiteApi.reducer;
export const WebsiteApiMiddleware = WebsiteApi.middleware;
export const { useLazyDataAnalyserQuery } = WebsiteApi;
