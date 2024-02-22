import React, { useEffect } from "react";
import { Layout } from "../../../layout";
import {
     RemoveSelectedImages,
     handleDesc,
     handleError,
     handleLoading,
     handleTitle,
     setImage,
     setUploadedImage,
     useGallerySlice,
     useLayoutSlice,
} from "../../../redux/app";
import { Button, Error, InputField } from "../../../component";
import { useAppDispatch } from "../../../redux";
import { GetBytes, UploadGalleryImage } from "../../../utils";
import QuillEditor from "react-quill";
import { AiOutlineLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useUploadNewGalleryMutation } from "../../../redux/api";
import { toast } from "react-toastify";

export const NewGalleryPage = () => {
     const { selectedImage, images, uploadedImage, loading, galleryInput } = useGallerySlice();
     const [
          UploadGallery,
          {
               isError: isGalleryError,
               error: galleryError,
               data: galleryData,
               isLoading: isGalleryLoading,
               isSuccess: isGallerySuccess,
          },
     ] = useUploadNewGalleryMutation();

     const { error } = useLayoutSlice();
     const dispatch = useAppDispatch();
     const navigate = useNavigate();

     useEffect(() => {
          if (isGalleryError) {
               if ((galleryError as any).data) {
                    console.log((galleryError as any).data);
               } else {
                    console.log(galleryError);
               }
          }
          if (isGallerySuccess) {
               toast.success(galleryData?.data);
               navigate("/gallery", { replace: true });
          }
     }, [isGalleryError, galleryError, isGallerySuccess, galleryData?.data, navigate]);

     const UploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
          if (!event.target.files?.length) {
               dispatch(handleError("please select image"));
          } else {
               dispatch(setImage(event.target.files as any));
          }
     };

     const StartImageUpload = async () => {
          if (!selectedImage.length) {
               dispatch(handleError("please select images"));
          } else {
               console.log("SELECT  IMAGE", selectedImage);
               dispatch(handleLoading(true));
               selectedImage.map(async (images) => {
                    const uploadedLinks = await UploadGalleryImage(images);
                    dispatch(handleLoading(false));
                    return dispatch(setUploadedImage(uploadedLinks));
               });

               dispatch(RemoveSelectedImages());
          }
     };

     const UploadEvent = async () => {
          console.log({ images: uploadedImage, title: galleryInput.title, description: galleryInput.desc });
          await UploadGallery({
               images: uploadedImage as string[],
               title: galleryInput.title as string,
               description: galleryInput.desc as string,
          });
     };

     return (
          <Layout>
               {error && <Error text={error} />}
               <div className="mb-10">
                    <div className="flex items-center gap-5">
                         <button type="button" onClick={() => navigate("/events", { replace: true })}>
                              <AiOutlineLeft size={26} />
                         </button>
                         <h6 className="text-2xl capitalize">Create new event</h6>
                    </div>
                    <p className="text-gray-500 ml-[4%]">
                         Be careful while uploading events, this events cannot be edited once it's upload to your
                         website
                    </p>
               </div>
               <div className="flex w-[80%] mx-auto">
                    {uploadedImage.length < 1 && (
                         <input
                              className="file:bg-primary-500 file:border-0 file:p-3 file:rounded-md file:text-white flex-1 rounded-lg hover:text-primary-500 mx-auto"
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={(e) => UploadImage(e)}
                         />
                    )}
               </div>
               {images.length !== 0 && (
                    <div className="flex gap-5 overflow-x-scroll my-5 w-[80%] mx-auto">
                         {!loading &&
                              images.map(({ image, size }, i) => (
                                   <div>
                                        <img key={i} className="w-[300px] rounded-lg" src={image} alt={image} />
                                        <p>{GetBytes(size.toString())}</p>
                                   </div>
                              ))}

                         {loading === true && <div>please wait uploading images...</div>}
                    </div>
               )}

               {selectedImage.length !== 0 && (
                    <Button onClick={StartImageUpload} filled>
                         save images for events
                    </Button>
               )}
               <div className="w-[80%] mx-auto flex flex-col gap-5">
                    {uploadedImage.length !== 0 && (
                         <h6 className="text-gray-500 text-xl capitalize">Your saved images this event</h6>
                    )}
                    <div className="flex gap-5 overflow-x-scroll">
                         {!loading &&
                              uploadedImage.map((element, i) => (
                                   <img key={i} className="w-[300px] rounded-lg" src={element} alt={element} />
                              ))}

                         {loading === true && <div>please wait uploading images...</div>}
                    </div>
                    {uploadedImage.length !== 0 && (
                         <>
                              <InputField
                                   label="What is this event about?"
                                   value={galleryInput.title}
                                   onChange={(e) => dispatch(handleTitle(e.target.value))}
                              />
                              <div>
                                   <label htmlFor="desc" className="text-gray-400 font-semibold select-none">
                                        Description
                                   </label>
                                   <QuillEditor
                                        id="desc"
                                        className="z-10 h-[400px]"
                                        value={galleryInput.desc}
                                        onChange={(e) => dispatch(handleDesc(e))}
                                   />
                              </div>
                              <div className="mt-14">
                                   <Button outlined onClick={UploadEvent}>
                                        Save event
                                   </Button>
                              </div>
                         </>
                    )}
               </div>
          </Layout>
     );
};
