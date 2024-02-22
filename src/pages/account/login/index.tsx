import React, { FC, useEffect } from "react";

import { Formik } from "formik";
import { initialLoginProps, loginValidationSchema } from "../../../validation";
import { ILoginProps } from "../../../interface";
import { Link, useNavigate } from "react-router-dom";
import { Button, Error, InputField, Success } from "../../../component";
import { useLoginAdminMutation } from "../../../redux/api";
import { useAppDispatch } from "../../../redux";
import { handleError, handleToken, useLayoutSlice } from "../../../redux/app";

export const LoginPage: FC = () => {
     const [
          Login,
          {
               isError: isLoginError,
               error: loginError,
               data: login,
               isSuccess: isLoginSuccess,
               isLoading: isLoginLoading,
          },
     ] = useLoginAdminMutation();
     const { error, success } = useLayoutSlice();
     const dispatch = useAppDispatch();
     const navigate = useNavigate();

     useEffect(() => {
          if (isLoginError) {
               if ((loginError as any).data) {
                    dispatch(handleError((loginError as any).data.message));
               } else {
                    console.log((loginError as any).error);
                    dispatch(handleError((loginError as any).error));
               }
          }
          if (isLoginSuccess) {
               dispatch(handleToken(login?.data?.token as string));
               navigate("/dashboard", { replace: true });
          }
     }, [isLoginError, loginError, isLoginSuccess, login?.data, dispatch, navigate]);

     const LoginFunction = async ({ email, password }: ILoginProps) => {
          return await Login({ email, password });
     };
     return (
          <div className="flex h-screen items-center justify-center w-screen">
               <div className="flex-1 bg-gradient-to-tr from-primary-200  h-full w-full to-indigo-200"></div>
               <div className="flex-1 flex flex-col justify-between items-start h-[60%] w-full p-3">
                    <div>
                         <h6 className="text-3xl font-semibold">Login to your account</h6>
                         <p className="text-gray-500">
                              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere dolor eaque eligendi
                              omnis adipisci natus.
                         </p>
                    </div>
                    <div className="w-[80%] mx-auto">
                         <Formik
                              initialValues={initialLoginProps}
                              validationSchema={loginValidationSchema}
                              onSubmit={LoginFunction}
                         >
                              {({ handleBlur, handleChange, handleSubmit, values, errors, touched }) => (
                                   <form onSubmit={handleSubmit}>
                                        <div className="py-3 mt-5 flex flex-col gap-5">
                                             {error && <Error text={error} />}
                                             {success && <Success text={success} />}
                                             <InputField
                                                  type="email"
                                                  label="Enter email address"
                                                  isError={touched.email as boolean}
                                                  error={errors.email as string}
                                                  value={values.email}
                                                  onChange={handleChange("email")}
                                                  onBlur={handleBlur("email")}
                                                  placeholder="abc123@gmail.com"
                                             />
                                             <InputField
                                                  type="password"
                                                  label="Enter password"
                                                  isError={touched.password as boolean}
                                                  error={errors.password as string}
                                                  value={values.password}
                                                  onChange={handleChange("password")}
                                                  onBlur={handleBlur("password")}
                                                  placeholder="******"
                                             />
                                             <Button loading={isLoginLoading} filled>
                                                  Take me to dashboard
                                             </Button>
                                        </div>
                                   </form>
                              )}
                         </Formik>
                    </div>
                    <div className="flex gap-10 justify-end w-full mt-10">
                         <a href="https://aksh.ltd/" target="__blank" className="text-primary-500 capitalize ">
                              developer contact
                         </a>

                         <Link to="#" className="text-primary-500 capitalize">
                              forgot password
                         </Link>
                    </div>
               </div>
          </div>
     );
};
