import React, { useEffect } from "react";
import { Layout } from "../../layout";
import { useLazyGetGalleryImageQuery } from "../../redux/api";
import { useAppDispatch } from "../../redux";
import { setGallery, useGallerySlice } from "../../redux/app";
import { Button } from "../../component";
import { useNavigate } from "react-router-dom";
import { IAdminProps } from "../../interface";
import moment from "moment";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const GalleryPage = () => {
     const [
          GetGalleries,
          {
               isError: isGalleryError,
               error: galleryError,
               isLoading: isGalleryLoading,
               isSuccess: isGallerySuccess,
               data: galleryData,
          },
     ] = useLazyGetGalleryImageQuery();
     const { myGallery } = useGallerySlice();
     const dispatch = useAppDispatch();
     const navigate = useNavigate();

     useEffect(() => {
          (async () => {
               await GetGalleries();
          })();

          if (isGalleryError) {
               if ((galleryError as any).data) {
                    console.log((galleryError as any).data);
               } else {
                    console.log(galleryError);
               }
          }
          if (isGallerySuccess) {
               galleryData?.data.map((element) => {
                    if (!myGallery.includes(element)) {
                         return dispatch(setGallery(element));
                    } else {
                         return null;
                    }
               });
          }
     }, [GetGalleries, dispatch, isGallerySuccess, galleryData?.data, myGallery, isGalleryError, galleryError]);

     return (
          <Layout>
               <div className="flex justify-between items-center">
                    <div className="flex flex-col flex-1">
                         <h6 className="text-2xl font-semibold">Manage Events (gallery)</h6>
                         <p className="text-gray-500">You can manage categories for your events and programs</p>
                    </div>
                    <div>
                         <Button onClick={() => navigate("/gallery/new")} type="button" small outlined>
                              upload
                         </Button>
                    </div>
               </div>
               {!isGalleryLoading && myGallery.length !== 0 && (
                    <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-4 gap-5 md:grid-cols-6 mt-10">
                         {myGallery.map(({ images, title, postedBy, _id, createdAt, description }) => (
                              <div
                                   key={_id}
                                   onClick={() => navigate(`/gallery/${_id}`)}
                                   className="group hover:cursor-pointer"
                              >
                                   <div className="">
                                        <LazyLoadImage
                                             src={images[0]}
                                             alt={title}
                                             height={200}
                                             className="rounded-lg"
                                             effect="opacity"
                                        />
                                   </div>

                                   <h6 className="text-2xl group-hover:text-primary-500 font-semibold truncate capitalize mt-5">
                                        {title}
                                   </h6>
                                   <p className="text-gray-500 capitalize">
                                        Posted by :- {(postedBy as IAdminProps).name.firstName}{" "}
                                        {(postedBy as IAdminProps).name.lastName}
                                   </p>
                                   <p className="text-gray-500 capitalize text-sm">
                                        Posted on :-
                                        {moment(createdAt).format("Do MMMM yyyy hh:mm A")}
                                   </p>
                              </div>
                         ))}
                    </div>
               )}
               {isGalleryLoading && (
                    <div>
                         <p>Please wait...</p>
                    </div>
               )}
          </Layout>
     );
};
