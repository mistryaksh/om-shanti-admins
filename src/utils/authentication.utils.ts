import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const SetAuthToken = (token: string) => {
     return localStorage.setItem("ADMIN", token);
};

export const GetAuthToken = () => {
     return localStorage.getItem("ADMIN");
};

export const RemoveAuthToken = () => {
     return localStorage.removeItem("ADMIN");
};

export const AppBaseQuery = fetchBaseQuery({
     baseUrl: "http://localhost:8080/api/1.0",
     prepareHeaders(headers, api) {
          headers.set("Authorization", GetAuthToken()?.toString() as string);
     },
});
