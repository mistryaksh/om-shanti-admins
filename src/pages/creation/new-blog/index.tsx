import React, { useEffect, useState } from "react";
import { Layout } from "../../../layout";
import { AiOutlineDown, AiOutlineLeft } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { handleError, useLayoutSlice } from "../../../redux/app";
import { useCreateNewBlogMutation, useLazyGetAllCategoriesQuery, useLazyGetBlogByIdQuery } from "../../../redux/api";
import { useAppDispatch } from "../../../redux";
import { Button, Error, InputField } from "../../../component";
import { IBlogProps } from "../../../interface";
import { Listbox, Transition } from "@headlessui/react";
import { UploadBlogImage } from "../../../utils";
import QuillEditor from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
export const NewBlogPage = () => {
     const [image, setImage] = useState<File[] | null>(null);
     const [uploaded, setUploaded] = useState<string | null>(null);
     const [loading, setLoading] = useState<boolean>(false);
     const { error } = useLayoutSlice();
     const { blogId } = useParams();
     const dispatch = useAppDispatch();
     const navigate = useNavigate();
     const [blogInput, setBlogInput] = useState<IBlogProps>({
          description: "",
          image: "",
          label: "",
          category: "",
          isActive: false,
     });

     const [
          NewBlogs,
          {
               isError: isNewBlogError,
               error: newBlogError,
               data: newBlogData,
               isLoading: isNewBlogLoading,
               isSuccess: isNewBlogSuccess,
          },
     ] = useCreateNewBlogMutation();
     const [
          Categories,
          { isError: isCategoryError, error: categoryError, isLoading: isCategoryLoading, data: category },
     ] = useLazyGetAllCategoriesQuery();
     const [
          GetBlog,
          {
               isError: isBlogError,
               error: blogError,
               isLoading: isBlogLoading,
               isSuccess: isBlogSuccess,
               data: byIdBlog,
          },
     ] = useLazyGetBlogByIdQuery();

     useEffect(() => {
          if (isNewBlogError) {
               if ((newBlogError as any).data) {
                    console.log((newBlogError as any).data.message);
                    dispatch(handleError((newBlogError as any).data.message));
               } else {
                    console.log(newBlogError);
                    dispatch(handleError((newBlogError as any).error));
               }
          }
          if (isCategoryError) {
               if ((categoryError as any).data) {
                    console.log((categoryError as any).data.message);
                    dispatch(handleError((categoryError as any).data.message));
               } else {
                    console.log(categoryError);
                    dispatch(handleError((categoryError as any).error));
               }
          }
          if (isBlogError) {
               if ((blogError as any).data) {
                    console.log((blogError as any).data.message);
                    dispatch(handleError((blogError as any).data.message));
               } else {
                    console.log(blogError);
                    dispatch(handleError((blogError as any).error));
               }
          }
          if (isNewBlogSuccess) {
               toast.success(`${newBlogData?.data}`);
               navigate("/blogs", { replace: true });
          }
          if (blogId) {
               (async () => {
                    await GetBlog(blogId);
               })();
          }
          if (isBlogSuccess) {
               setBlogInput({
                    category: byIdBlog?.data._id as string,
                    description: byIdBlog?.data.description as string,
                    image: byIdBlog?.data.image as string,
                    label: byIdBlog?.data.label as string,
                    isActive: byIdBlog?.data.isActive as boolean,
                    postedBy: byIdBlog?.data.postedBy as string,
               });
          }
          (async () => {
               await Categories();
          })();
     }, [
          isNewBlogError,
          newBlogError,
          dispatch,
          isCategoryError,
          categoryError,
          Categories,
          isNewBlogSuccess,
          newBlogData?.data,
          navigate,
          isBlogError,
          blogError,
          blogId,
          GetBlog,
          isBlogSuccess,
          byIdBlog?.data,
     ]);

     const UploadBlog = async () => {
          if (!image || !blogInput) dispatch(handleError("Enter all fields to start upload"));
          else {
               setLoading(true);
               const firebaseImage = await UploadBlogImage(image[0] as File);
               console.log(firebaseImage);
               setUploaded(firebaseImage);
               setLoading(false);

               if (uploaded?.length) {
                    await NewBlogs({ ...blogInput, image: uploaded });
               }
               console.log(blogInput);
               setLoading(false);
          }
     };

     return (
          <Layout>
               <div className="w-[80%] mx-auto">
                    <div className="flex items-center gap-10">
                         <button type="button" onClick={() => navigate("/blogs", { replace: true })}>
                              <AiOutlineLeft size={26} />
                         </button>
                         <h6 className="text-2xl capitalize">Create new Blogs</h6>
                    </div>
                    <p className="text-gray-500 mt-3">
                         Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque error ipsum iusto odit eos,
                         non dignissimos? Libero impedit voluptatibus placeat.
                    </p>
                    <div className="w-full">{error && <Error text={error as string} />}</div>
                    <div className="mt-5 flex flex-col gap-5">
                         <InputField
                              label="Blog title"
                              value={blogInput.label}
                              onChange={(e) => setBlogInput({ ...blogInput, label: e.target.value })}
                         />

                         {!isCategoryLoading && (
                              <div className="flex flex-col relative">
                                   <label
                                        htmlFor="category"
                                        className="text-gray-400 capitalize text-left font-semibold select-none"
                                   >
                                        Select event category
                                   </label>
                                   <Listbox
                                        value={blogInput.category}
                                        onChange={(e) =>
                                             setBlogInput({
                                                  ...blogInput,
                                                  category: e,
                                             })
                                        }
                                   >
                                        <Listbox.Button
                                             id="category"
                                             className="border-2 flex gap-3 items-center w-full justify-start p-3 rounded-lg text-gray-500 capitalize mt-2"
                                        >
                                             {blogInput.category
                                                  ? (blogInput.category as string)
                                                  : "Blog belongs to which category"}
                                             <AiOutlineDown />
                                        </Listbox.Button>
                                        <Transition>
                                             <Listbox.Options className="flex flex-col gap-5 absolute top-24 bg-white z-50 w-full shadow-xl p-3 rounded-lg border-2">
                                                  {category?.data.map(({ label, _id }) => (
                                                       <Listbox.Option className="cursor-pointer" key={_id} value={_id}>
                                                            <p className="capitalize">{label}</p>
                                                       </Listbox.Option>
                                                  ))}
                                             </Listbox.Options>
                                        </Transition>
                                   </Listbox>
                              </div>
                         )}

                         <div>
                              <QuillEditor
                                   className="z-10 h-[400px]"
                                   value={blogInput.description}
                                   onChange={(e) =>
                                        setBlogInput({
                                             ...blogInput,
                                             description: e,
                                        })
                                   }
                              />
                         </div>
                         <div className="flex items-start justify-center w-full gap-5 flex-col mt-8">
                              <div className="flex flex-col">
                                   <label htmlFor="category" className="text-gray-400 font-semibold select-none">
                                        Upload image for event
                                   </label>
                                   <input
                                        className="file:bg-primary-500 file:border-0 file:p-3 file:rounded-md file:text-white placeholder:text-red-500 selection:text-red-500 flex-1 hover:bg-primary-300 rounded-lg hover:text-white pt-2"
                                        id="picture"
                                        name="picture"
                                        type="file"
                                        onChange={(e) => setImage(e.target.files as unknown as File[])}
                                   />
                              </div>
                              {uploaded?.length && <img src={uploaded} className="rounded-lg" alt={blogInput.label} />}
                              <p className="text-gray-500">{image && `${image[0]?.size} Bytes`}</p>
                         </div>
                         <div className="mb-10 flex justify-end">
                              <Button
                                   loading={loading || isNewBlogLoading || isBlogLoading}
                                   filled
                                   onClick={UploadBlog}
                              >
                                   {!uploaded?.length ? "Upload Image" : "Save Blog"}
                              </Button>
                         </div>
                    </div>
               </div>
          </Layout>
     );
};
