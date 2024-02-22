import { createApi } from "@reduxjs/toolkit/query/react";
import { ADMIN_PREFIX, AppBaseQuery } from "../../utils";
import { IAdminProps, ILoginProps, INewAdminProps } from "../../interface";

const AuthenticationApi = createApi({
     baseQuery: AppBaseQuery,
     endpoints: ({ mutation, query }) => ({
          LoginAdmin: mutation<{ data: { token: string; email: string } }, ILoginProps>({
               query: (payload: ILoginProps) => {
                    return {
                         url: `/${ADMIN_PREFIX}/sign-in`,
                         body: { ...payload },
                         method: "POST",
                    };
               },
          }),
          ProfileAdmin: query<{ data: IAdminProps }, void>({
               query: () => `/${ADMIN_PREFIX}/profile`,
          }),
          LogoutAdmin: mutation<{ data: string }, void>({
               query: () => {
                    return {
                         url: `/${ADMIN_PREFIX}/sign-out`,
                         method: "POST",
                    };
               },
          }),
          RegisterNewAdmin: mutation<{ data: string }, INewAdminProps>({
               query: ({ addressLine1, addressLine2, email, firstName, lastName, mobile, password }) => {
                    return {
                         url: `/${ADMIN_PREFIX}/sign-up`,
                         body: {
                              addressLine1,
                              addressLine2,
                              email,
                              firstName,
                              lastName,
                              mobile,
                              password,
                         },
                         method: "POST",
                    };
               },
          }),
          GetAllAdmins: query<{ data: IAdminProps[] }, void>({
               query: () => `/${ADMIN_PREFIX}/admins`,
          }),
     }),
     reducerPath: "authApi",
});

export const AuthApiReducer = AuthenticationApi.reducer;
export const AuthApiMiddleware = AuthenticationApi.middleware;
export const {
     useLoginAdminMutation,
     useLogoutAdminMutation,
     useProfileAdminQuery,
     useRegisterNewAdminMutation,
     useLazyGetAllAdminsQuery,
} = AuthenticationApi;
