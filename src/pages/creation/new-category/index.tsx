import { Formik } from "formik";
import { Layout } from "../../../layout";
import { Button, InputField } from "../../../component";
import { IEventCategoryProps } from "../../../interface/category.interface";
import { CategoryValidationSchema } from "../../../validation";
import {
     useCreateNewCategoryMutation,
     useLazyGetCategoryByIdQuery,
     useUpdateCategoryByIdMutation,
} from "../../../redux/api";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineLeft } from "react-icons/ai";

export const NewCategoryPage = () => {
     const { categoryId } = useParams();
     const [
          UploadCategory,
          {
               data: categories,
               isError: isCategoryError,
               error: categoryError,
               isLoading: isCategoryLoading,
               isSuccess: isCategorySuccess,
          },
     ] = useCreateNewCategoryMutation();
     const [
          GetCategory,
          {
               isError: isGetCategoryError,
               error: getCategoryError,
               isLoading: isGetCategoryLoading,
               data: categoryState,
          },
     ] = useLazyGetCategoryByIdQuery();
     const [
          UpdateCategory,
          {
               isError: isUpdateCategoryError,
               error: updateCategoryError,
               isLoading: isUpdateCategoryLoading,
               data: updateCategoryData,
               isSuccess: isUpdateCategorySuccess,
          },
     ] = useUpdateCategoryByIdMutation();

     const navigate = useNavigate();

     useEffect(() => {
          if (isCategoryError) {
               console.log(categoryError);
          }
          if (isGetCategoryError) {
               if ((getCategoryError as any).data) {
                    console.log((getCategoryError as any).data);
               } else {
                    console.log(getCategoryError);
               }
          }

          if (isUpdateCategoryError) {
               if ((updateCategoryError as any).data) {
                    console.log((updateCategoryError as any).data);
               } else {
                    console.log(updateCategoryError);
               }
          }
          if (isCategorySuccess) {
               navigate("/category", { replace: true });
          }
          if (categoryId) {
               (async () => {
                    await GetCategory(categoryId);
               })();
          }
          if (isCategorySuccess) {
               console.log(categories?.data);
               toast.success(categories?.data);
          }
          if (isUpdateCategorySuccess) {
               toast.success(updateCategoryData?.data);
               navigate("/category", { replace: true });
          }
     }, [
          isCategoryError,
          categoryError,
          isCategorySuccess,
          categories?.data,
          navigate,
          categoryId,
          GetCategory,
          isGetCategoryError,
          getCategoryError,
          isUpdateCategoryError,
          updateCategoryError,
          isUpdateCategorySuccess,
          updateCategoryData?.data,
     ]);

     const CreateCategory = async ({ active, label, subTitle }: IEventCategoryProps) => {
          console.log(active, label, subTitle);
          if (categoryId) {
               await UpdateCategory({ id: categoryId, payload: { active, label, subTitle } });
          } else {
               await UploadCategory({ label, active, subTitle });
          }
     };
     return (
          <Layout>
               <div className="flex justify-center items-center w-full">
                    <div className="w-[50%] mx-auto shadow-xl p-3 my-20 border">
                         <div className="flex items-center gap-5">
                              <button onClick={() => navigate("/category")} className="bg-gray-100 p-3 rounded-lg">
                                   <AiOutlineLeft size={26} />
                              </button>
                              {/* <h6 className="text-3xl capitalize">Upload new category</h6> */}
                         </div>
                         <div className="my-5">
                              <Formik
                                   enableReinitialize
                                   initialValues={{
                                        active: categoryState?.data.active || false,
                                        label: categoryState?.data.label || "",
                                        subTitle: categoryState?.data.subTitle || "",
                                   }}
                                   validationSchema={CategoryValidationSchema}
                                   onSubmit={CreateCategory}
                              >
                                   {({ handleBlur, handleChange, handleSubmit, values, errors, touched }) => (
                                        <form onSubmit={handleSubmit}>
                                             <div className="flex flex-col gap-3">
                                                  <InputField
                                                       label="Category Name"
                                                       value={values.label}
                                                       onChange={handleChange("label")}
                                                       onBlur={handleBlur("label")}
                                                       error={errors.label}
                                                       isError={touched.label}
                                                  />
                                                  <InputField
                                                       label="Sub title for your category (comments)"
                                                       value={values.subTitle}
                                                       onChange={handleChange("subTitle")}
                                                       onBlur={handleBlur("subTitle")}
                                                       error={errors.subTitle}
                                                       isError={touched.subTitle}
                                                  />
                                                  <div className="flex items-center gap-3 w-full">
                                                       <input
                                                            className="w-5 h-5"
                                                            type="checkbox"
                                                            id="status"
                                                            name="status"
                                                            checked={values.active}
                                                            onChange={handleChange("active")}
                                                            onBlur={handleBlur("active")}
                                                       />
                                                       <label
                                                            htmlFor="status"
                                                            className="text-gray-400 font-semibold select-none"
                                                       >
                                                            Upload as active
                                                       </label>
                                                  </div>
                                                  <Button
                                                       loading={
                                                            isCategoryLoading ||
                                                            isGetCategoryLoading ||
                                                            isUpdateCategoryLoading
                                                       }
                                                       type="submit"
                                                       filled
                                                  >
                                                       {categoryId ? "save changes" : "upload"}
                                                  </Button>
                                             </div>
                                        </form>
                                   )}
                              </Formik>
                         </div>
                    </div>
               </div>
          </Layout>
     );
};
