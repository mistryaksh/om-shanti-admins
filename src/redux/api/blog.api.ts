import { createApi } from "@reduxjs/toolkit/query/react";
import { AppBaseQuery } from "../../utils";
import { IBlogProps } from "../../interface";

const BlogApi = createApi({
     baseQuery: AppBaseQuery,
     reducerPath: "blogApi",
     endpoints: ({ mutation, query }) => ({
          GetAllBlogs: query<{ data: IBlogProps[] }, void>({
               query: () => `/blogs/all`,
          }),
          GetBlogById: query<{ data: IBlogProps }, string>({
               query: (id) => `/blogs/${id}`,
          }),
          CreateNewBlog: mutation<{ data: string }, IBlogProps>({
               query: (payload) => {
                    return {
                         url: `/blogs`,
                         method: "POST",
                         body: { ...payload },
                    };
               },
          }),
          UpdateBlogById: mutation<{ data: string }, { id: string; payload: IBlogProps }>({
               query: ({ id, payload }) => {
                    return {
                         url: `/blogs/${id}`,
                         body: { ...payload },
                         method: "PUT",
                    };
               },
          }),
          DeleteBlogById: mutation<{ data: string }, string>({
               query: (id) => {
                    return {
                         url: `/blogs/${id}`,
                         method: "DELETE",
                    };
               },
          }),
     }),
});

export const BlogApiReducer = BlogApi.reducer;
export const BlogApiMiddleware = BlogApi.middleware;
export const {
     useCreateNewBlogMutation,
     useDeleteBlogByIdMutation,
     useGetAllBlogsQuery,
     useGetBlogByIdQuery,
     useLazyGetAllBlogsQuery,
     useLazyGetBlogByIdQuery,
     useUpdateBlogByIdMutation,
} = BlogApi;
