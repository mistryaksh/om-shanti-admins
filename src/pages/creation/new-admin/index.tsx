import React, { useEffect } from "react";

import { Layout } from "../../../layout";
import { Button, InputField } from "../../../component";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { NewAdminValidationSchema, initialNewAdminValue } from "../../../validation";
import { INewAdminProps } from "../../../interface";
import { useRegisterNewAdminMutation } from "../../../redux/api";
import { toast } from "react-toastify";

export const NewAdminPage = () => {
     const navigate = useNavigate();
     const [
          AddAdmin,
          {
               isError: isRegisterError,
               error: registerError,
               data: register,
               isLoading: isRegisterLoading,
               isSuccess: isRegisterSuccess,
          },
     ] = useRegisterNewAdminMutation();

     useEffect(() => {
          if (isRegisterError) {
               if ((registerError as any).data) {
                    console.log((registerError as any).data);
               } else {
                    console.log(registerError);
               }
          }
          if (isRegisterSuccess) {
               toast.success(register?.data);
               navigate("/settings/account", { replace: true });
          }
     }, [isRegisterError, registerError, isRegisterSuccess, navigate, register?.data]);

     const CreateAdmin = async ({
          addressLine1,
          addressLine2,
          email,
          firstName,
          lastName,
          mobile,
          password,
     }: INewAdminProps) => {
          console.log({ addressLine1, addressLine2, email, firstName, lastName, mobile, password });
          await AddAdmin({
               addressLine1,
               addressLine2,
               email,
               firstName,
               lastName,
               mobile,
               password,
          });
     };

     return (
          <Layout>
               <div className="bg-gradient-to-tr from-primary-100 via-primary-100 to-red-100 p-3">
                    <div className="flex justify-between items-center container mx-auto">
                         <div className="flex flex-col flex-1">
                              <h6 className="text-2xl font-semibold">Create new admin account</h6>
                              <p className="text-gray-500">
                                   Be careful admin! by adding new admin account, that admin account can control over
                                   your website
                              </p>
                         </div>
                    </div>
                    <div className="w-[60%] mx-auto border mt-10 p-10 bg-white">
                         <Formik
                              enableReinitialize
                              initialValues={initialNewAdminValue}
                              validationSchema={NewAdminValidationSchema}
                              onSubmit={CreateAdmin}
                         >
                              {({ handleBlur, handleChange, handleSubmit, values, errors, touched }) => (
                                   <form onSubmit={handleSubmit}>
                                        <div className="flex flex-col gap-5">
                                             <div className="flex gap-5">
                                                  <div className="flex-1">
                                                       <InputField
                                                            label="first name"
                                                            value={values.firstName}
                                                            onChange={handleChange("firstName")}
                                                            onBlur={handleBlur("firstName")}
                                                            isError={touched.firstName}
                                                            error={errors.firstName}
                                                       />
                                                  </div>
                                                  <div className="flex-1">
                                                       <InputField
                                                            label="last name"
                                                            value={values.lastName}
                                                            onChange={handleChange("lastName")}
                                                            onBlur={handleBlur("lastName")}
                                                            isError={touched.lastName}
                                                            error={errors.lastName}
                                                       />
                                                  </div>
                                             </div>
                                             <div className="flex gap-5">
                                                  <div className="flex-1">
                                                       <InputField
                                                            label="email address"
                                                            value={values.email}
                                                            onChange={handleChange("email")}
                                                            onBlur={handleBlur("email")}
                                                            isError={touched.email}
                                                            error={errors.email}
                                                       />
                                                  </div>
                                             </div>
                                             <div className="flex gap-5">
                                                  <div className="flex-1">
                                                       <InputField
                                                            label="mobile number"
                                                            value={values.mobile}
                                                            onChange={handleChange("mobile")}
                                                            onBlur={handleBlur("mobile")}
                                                            isError={touched.mobile}
                                                            error={errors.mobile}
                                                       />
                                                  </div>
                                             </div>
                                             <div className="flex gap-5">
                                                  <div className="flex-1">
                                                       <InputField
                                                            label="Address Line 1"
                                                            value={values.addressLine1}
                                                            onChange={handleChange("addressLine1")}
                                                            onBlur={handleBlur("addressLine1")}
                                                            isError={touched.addressLine1}
                                                            error={errors.addressLine1}
                                                       />
                                                  </div>
                                                  <div className="flex-1">
                                                       <InputField
                                                            label="Address Line 2"
                                                            value={values.addressLine2}
                                                            onChange={handleChange("addressLine2")}
                                                            onBlur={handleBlur("addressLine2")}
                                                            isError={touched.addressLine2}
                                                            error={errors.addressLine2}
                                                       />
                                                  </div>
                                             </div>
                                             <div className="flex gap-5">
                                                  <div className="flex-1">
                                                       <InputField
                                                            label="create account password"
                                                            value={values.password}
                                                            onChange={handleChange("password")}
                                                            onBlur={handleBlur("password")}
                                                            isError={touched.password}
                                                            error={errors.password}
                                                       />
                                                  </div>
                                             </div>
                                             <div className="flex gap-5 justify-end">
                                                  <Button
                                                       type="button"
                                                       dangerOutlined
                                                       small
                                                       onClick={() => navigate(`/settings/admins`)}
                                                  >
                                                       cancel
                                                  </Button>
                                                  <Button type="submit" outlined small>
                                                       save
                                                  </Button>
                                             </div>
                                        </div>
                                   </form>
                              )}
                         </Formik>
                    </div>
               </div>
          </Layout>
     );
};
