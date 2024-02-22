import { createApi } from "@reduxjs/toolkit/query/react";
import { AppBaseQuery } from "../../utils";
import { IEventCategoryProps } from "../../interface/category.interface";

const CategoryApi = createApi({
     baseQuery: AppBaseQuery,
     reducerPath: "categoryApi",
     tagTypes: ["category"],
     endpoints: ({ mutation, query }) => ({
          GetAllCategories: query<{ data: IEventCategoryProps[] }, void>({
               query: () => `/category/all`,
               providesTags: ["category"],
          }),
          GetCategoryById: query<{ data: IEventCategoryProps }, string>({
               query: (categoryId) => `/category/${categoryId}`,
               providesTags: ["category"],
          }),
          CreateNewCategory: mutation<{ data: string }, IEventCategoryProps>({
               query: (payload) => {
                    return {
                         url: `/category`,
                         body: { ...payload },
                         method: "POST",
                    };
               },
               invalidatesTags: ["category"],
          }),
          UpdateCategoryById: mutation<{ data: string }, { payload: IEventCategoryProps; id: string }>({
               query: ({ id, payload }) => {
                    return {
                         url: `/category/by-id/${id}`,
                         body: { ...payload },
                         method: "PUT",
                    };
               },
               invalidatesTags: ["category"],
          }),
          DeleteCategoryById: mutation<{ data: string }, string>({
               query: (id) => {
                    return {
                         url: `/category/${id}`,
                         method: "DELETE",
                    };
               },
               invalidatesTags: ["category"],
          }),
     }),
});

export const CategoryApiReducer = CategoryApi.reducer;
export const CategoryApiMiddleware = CategoryApi.middleware;
export const {
     useCreateNewCategoryMutation,
     useDeleteCategoryByIdMutation,
     useGetAllCategoriesQuery,
     useGetCategoryByIdQuery,
     useLazyGetAllCategoriesQuery,
     useLazyGetCategoryByIdQuery,
     useUpdateCategoryByIdMutation,
} = CategoryApi;
