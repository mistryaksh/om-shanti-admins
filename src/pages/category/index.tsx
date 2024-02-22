import React, { useEffect } from "react";
import { Layout } from "../../layout";
import { useDeleteCategoryByIdMutation, useGetAllCategoriesQuery } from "../../redux/api";
import { Button } from "../../component";
import { useNavigate } from "react-router-dom";
import ReactTable from "react-data-table-component";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { toast } from "react-toastify";

export const CategoryPage = () => {
     const {
          data: category,
          isError: isCategoryError,
          // isLoading: isCategoryLoading,
          error: categoryError,
     } = useGetAllCategoriesQuery();
     const [
          DeleteCategory,
          {
               data: deleteCategory,
               isError: isDeleteCategoryError,
               error: deleteCategoryError,
               // isLoading: isDeleteCategoryLoading,
               isSuccess: isDeleteCategorySuccess,
          },
     ] = useDeleteCategoryByIdMutation();
     const navigate = useNavigate();

     useEffect(() => {
          if (isCategoryError) {
               console.log(categoryError);
          }
          if ((isDeleteCategoryError as any).data) {
               console.log((deleteCategoryError as any).data);
          } else {
               console.log(deleteCategoryError);
          }
          if (isDeleteCategorySuccess) {
               toast.success(deleteCategory?.data);
          }
     }, [
          isCategoryError,
          categoryError,
          isDeleteCategoryError,
          deleteCategoryError,
          isDeleteCategorySuccess,
          deleteCategory?.data,
     ]);

     return (
          <Layout>
               <div className="relative">
                    <div className="flex justify-between items-center">
                         <div className="flex flex-col flex-1">
                              <h6 className="text-2xl font-semibold">Manage category</h6>
                              <p className="text-gray-500">You can manage categories for your events and programs</p>
                         </div>
                         <div>
                              <Button onClick={() => navigate("/category/new")} type="button" small outlined>
                                   upload
                              </Button>
                         </div>
                    </div>
                    <div className="mt-10">
                         <ReactTable
                              data={category?.data || []}
                              columns={[
                                   {
                                        id: "_id",
                                        name: "#",
                                        width: "100px",
                                        cell: (_, index) => <p className="text-gray-500">{index + 1}</p>,
                                   },
                                   {
                                        id: "label",
                                        width: "250px",
                                        name: "Category Name",
                                        cell: ({ label, _id }) => (
                                             <button onClick={() => navigate(`/category/${_id}`)}>
                                                  <p className="capitalize text-gray-900 font-semibold">{label}</p>
                                             </button>
                                        ),
                                   },
                                   {
                                        id: "subTitle",
                                        name: "Sub Title / Comments",
                                        cell: ({ subTitle }) => <p className="capitalize text-gray-500 ">{subTitle}</p>,
                                   },
                                   {
                                        id: "actions",
                                        name: "Actions",
                                        width: "100px",
                                        cell: ({ _id }) => (
                                             <div className="flex items-center gap-5">
                                                  <button onClick={() => navigate(`/category/${_id}`)} type="button">
                                                       <AiOutlineEdit size={20} />
                                                  </button>
                                                  <button
                                                       onClick={async () => await DeleteCategory(_id as string)}
                                                       type="button"
                                                  >
                                                       <AiOutlineDelete size={20} />
                                                  </button>
                                             </div>
                                        ),
                                   },
                              ]}
                         />
                    </div>
               </div>
          </Layout>
     );
};
