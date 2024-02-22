import React, { useEffect } from "react";
import { Layout } from "../../../layout";
import { useDeleteGalleryByIdMutation, useGetGalleryByIdQuery } from "../../../redux/api";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../component";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { IAdminProps, IGalleryProps } from "../../../interface";
import { useAppDispatch } from "../../../redux";
import { deleteFromPage, setSingleGallery, toggleDeleteModal, useGallerySlice } from "../../../redux/app";
import moment from "moment";
import { AiOutlineLeft } from "react-icons/ai";
import { toast } from "react-toastify";

export const GalleryDetailsPage = () => {
     const { galleryId } = useParams();
     const { single, deleteModal } = useGallerySlice();
     const {
          data: gallery,
          isError: isGalleryError,
          error: galleryError,
          isLoading: isGalleryLoading,
          isSuccess: isGallerySuccess,
     } = useGetGalleryByIdQuery(galleryId as string);
     const [
          DeleteGallery,
          {
               isError: isGalleryDeleteError,
               error: galleryDeleteError,
               data: deleteGalleryData,
               isSuccess: isDeleteSuccess,
               isLoading: isDeleteGalleryLoading,
          },
     ] = useDeleteGalleryByIdMutation();
     const navigate = useNavigate();
     const dispatch = useAppDispatch();

     useEffect(() => {
          if ((isGalleryError as any).data) {
               console.log((galleryError as any).data);
          } else {
               console.log(galleryError);
          }
          if ((isGalleryDeleteError as any).data) {
               console.log((galleryDeleteError as any).data);
          } else {
               console.log(galleryDeleteError);
          }
          if (isGallerySuccess) {
               dispatch(setSingleGallery(gallery?.data));
          } else {
               navigate("/gallery", { replace: true });
          }
          if (isDeleteSuccess) {
               toast.success(deleteGalleryData?.data);
               navigate("/gallery", { replace: true });
          }
     }, [
          isGalleryError,
          galleryError,
          isGallerySuccess,
          navigate,
          dispatch,
          gallery?.data,
          isGalleryDeleteError,
          galleryDeleteError,
          isDeleteSuccess,
          deleteGalleryData?.data,
     ]);

     const handleDeleteGallery = async () => {
          dispatch(deleteFromPage(gallery?.data as IGalleryProps));
          await DeleteGallery(gallery?.data._id as string);
     };

     return (
          <Layout>
               <div className="flex items-center justify-start gap-5 my-5">
                    <button onClick={() => navigate("/gallery")}>
                         <AiOutlineLeft size={26} />
                    </button>
                    <h6 className="text-3xl font-semibold capitalize">{single?.title}</h6>
               </div>
               <div className="w-[60%] mx-auto mb-10">
                    <Carousel
                         animationHandler="fade"
                         autoPlay
                         interval={3000}
                         showArrows
                         infiniteLoop
                         showStatus={false}
                    >
                         {gallery?.data?.images.map((element, i) => (
                              <div key={i}>
                                   <img src={element} alt={gallery?.data?.title} />
                              </div>
                         ))}
                    </Carousel>
                    <h6 className="text-3xl font-semibold capitalize">{single?.title}</h6>
                    {(gallery?.data?.postedBy as IAdminProps)?.name?.firstName}{" "}
                    {(gallery?.data?.postedBy as IAdminProps)?.name?.lastName}
                    <p className="text-gray-500 capitalize">
                         uploaded on :- {moment(gallery?.data.createdAt).format("Do MMM YYYY hh:mm A")} (
                         {moment(gallery?.data.createdAt).fromNow()})
                    </p>
                    <p dangerouslySetInnerHTML={{ __html: gallery?.data.description as unknown as TrustedHTML }}></p>
                    <hr className="my-10 border-primary-500" />
                    <p className="text-gray-500 capitalize">Actions :</p>
                    <div className="flex gap-5 justify-end">
                         <Button filled small onClick={() => dispatch(toggleDeleteModal())}>
                              Delete
                         </Button>
                         <Button filled small>
                              Share
                         </Button>
                    </div>
               </div>

               {deleteModal && (
                    <>
                         <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                   {/*content*/}
                                   <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                        {/*body*/}
                                        <div className="relative p-6 flex-auto">
                                             <h3 className="text-3xl font-semibold">
                                                  This action will affect your website
                                             </h3>
                                             <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                                  Are you sure wants to delete / remove {gallery?.data.title}?
                                             </p>
                                        </div>
                                        {/*footer*/}
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                             <button
                                                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                  type="button"
                                                  onClick={() => dispatch(toggleDeleteModal())}
                                             >
                                                  Close
                                             </button>
                                             <button
                                                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                  type="button"
                                                  onClick={handleDeleteGallery}
                                             >
                                                  Confirm
                                             </button>
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
               )}
          </Layout>
     );
};
