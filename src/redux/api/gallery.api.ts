import { createApi } from "@reduxjs/toolkit/query/react";
import { AppBaseQuery } from "../../utils";
import { IGalleryProps } from "../../interface";

const GalleryApi = createApi({
     baseQuery: AppBaseQuery,
     reducerPath: "galleryApi",
     endpoints: ({ mutation, query }) => ({
          GetGalleryImage: query<{ data: IGalleryProps[] }, void>({
               query: () => "/gallery",
          }),
          GetGalleryById: query<{ data: IGalleryProps }, string>({
               query: (id) => `/gallery/${id}`,
          }),
          UploadNewGallery: mutation<{ data: string }, IGalleryProps>({
               query: (payload) => {
                    return {
                         url: "/gallery",
                         method: "POST",
                         body: { ...payload },
                    };
               },
          }),
          UpdateGalleryById: mutation<{ data: string }, { payload: IGalleryProps; id: string }>({
               query: ({ id, payload }) => {
                    return {
                         url: `/gallery/${id}`,
                         method: "PUT",
                         body: { ...payload },
                    };
               },
          }),
          DeleteGalleryById: mutation<{ data: string }, string>({
               query: (id) => {
                    return {
                         url: `/gallery/${id}`,
                         method: "DELETE",
                    };
               },
          }),
     }),
});

export const GalleryApiReducer = GalleryApi.reducer;
export const GalleryApiMiddleware = GalleryApi.middleware;
export const {
     useDeleteGalleryByIdMutation,
     useGetGalleryByIdQuery,
     useGetGalleryImageQuery,
     useLazyGetGalleryByIdQuery,
     useLazyGetGalleryImageQuery,
     useUpdateGalleryByIdMutation,
     useUploadNewGalleryMutation,
} = GalleryApi;
