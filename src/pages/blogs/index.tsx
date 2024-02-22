import React, { useEffect } from "react";
import { Layout } from "../../layout";
import { useLazyGetAllBlogsQuery } from "../../redux/api";
import { useAppDispatch } from "../../redux";
import { handleError, setBlogs, useBlogSlice } from "../../redux/app";
import { BlogCard, Button } from "../../component";
import { useNavigate } from "react-router-dom";
import { IEventCategoryProps } from "../../interface/category.interface";
import { IAdminProps } from "../../interface";

export const BlogsPage = () => {
     const [
          GetAllBlogs,
          {
               isError: isBlogError,
               error: blogError,
               isSuccess: isBlogSuccess,
               isLoading: isBlogLoading,
               data: blogData,
          },
     ] = useLazyGetAllBlogsQuery();
     const { blogs } = useBlogSlice();
     const dispatch = useAppDispatch();
     const navigate = useNavigate();

     useEffect(() => {
          if (isBlogError) {
               if ((blogError as any).data) {
                    dispatch(handleError((blogError as any).data.message));
               } else {
                    console.log((blogError as any).error);
                    dispatch(handleError((blogError as any).error));
               }
          }

          (async () => await GetAllBlogs())();
          if (isBlogSuccess) {
               // console.log(eventData?.data);
               blogData?.data.map((element) => {
                    if (!blogs.includes(element)) {
                         return dispatch(setBlogs(element));
                    } else {
                         return null;
                    }
               });
          }
     }, [blogData?.data, dispatch, GetAllBlogs, isBlogSuccess, blogError, isBlogError, blogs]);

     return (
          <Layout>
               <div className="flex items-center justify-between">
                    <h6 className="text-3xl font-semibold">Your Blogs is Listed here</h6>
                    <Button filled onClick={() => navigate("/blogs/new")}>
                         Upload
                    </Button>
               </div>

               {!isBlogLoading && (
                    <div className="mt-10 grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-2 gap-5 md:grid-cols-6">
                         {blogs?.map(({ category, image, label, postedBy, _id }) => (
                              <BlogCard
                                   key={_id}
                                   _id={_id as string}
                                   label={label}
                                   category={(category as IEventCategoryProps)?.label}
                                   image={image}
                                   postedBy={`${(postedBy as IAdminProps).name?.firstName} ${
                                        (postedBy as IAdminProps).name?.lastName
                                   }`}
                              />
                         ))}
                    </div>
               )}
               {isBlogLoading && (
                    <div>
                         <p>Please wait we are loading...</p>
                    </div>
               )}
          </Layout>
     );
};
