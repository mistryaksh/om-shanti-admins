import React, { Fragment, useEffect } from "react";
import { Layout } from "../../../layout";
import { useProfileAdminQuery } from "../../../redux/api";
import { Button, Error, InputField } from "../../../component";
import { useAppDispatch } from "../../../redux";
import { handleError, useLayoutSlice } from "../../../redux/app";

export const AdminProfilePage = () => {
     const {
          data: profile,
          isError: isProfileError,
          error: profileError,
          isLoading: isProfileLoading,
     } = useProfileAdminQuery();
     const dispatch = useAppDispatch();
     const { error } = useLayoutSlice();
     useEffect(() => {
          if (isProfileError) {
               if ((profileError as any).data) {
                    dispatch(handleError((profileError as any).data.message));
               } else {
                    console.log((profileError as any).error);
                    dispatch(handleError((profileError as any).error));
               }
          }
     }, [isProfileError, profileError, dispatch]);
     return (
          <Layout>
               {!isProfileLoading && (
                    <Fragment>
                         <div className="flex items-center justify-between">
                              <h6 className="text-3xl font-semibold">
                                   <span className="capitalize">
                                        {profile?.data.name.lastName} {profile?.data.name.firstName}
                                   </span>
                                   's profile
                              </h6>
                         </div>
                         {error && <Error text={error} />}
                         <div className="w-[60%] mx-auto shadow-xl border-2 border-primary-500 rounded-xl py-10 px-5 mt-5 flex flex-col gap-5">
                              <div className="flex items-center gap-5">
                                   <div className="flex-1">
                                        <InputField label="first name" value={profile?.data.name.firstName} />
                                   </div>
                                   <div className="flex-1">
                                        <InputField label="last name" value={profile?.data.name.lastName} />
                                   </div>
                              </div>
                              <div className="flex items-center gap-5">
                                   <div className="flex-1">
                                        <InputField label="contact number" value={profile?.data.contact.mobile} />
                                   </div>
                              </div>
                              <div className="flex items-center gap-5">
                                   <div className="flex-1">
                                        <InputField label="email address" value={profile?.data.contact.email} />
                                   </div>
                              </div>
                              <div className="flex items-center gap-5">
                                   <div className="flex-1">
                                        <InputField
                                             label="your password"
                                             value={profile?.data.auth.password}
                                             disabled
                                             readOnly
                                             isError
                                             error="you cannot change password directly from here! please contact your developer"
                                        />
                                   </div>
                              </div>
                              <div className="flex justify-end items-center gap-5 mt-5">
                                   <a href="https://aksh.ltd/" target="__blank">
                                        <p className="text-indigo-500 capitalize">developer contact</p>
                                   </a>
                                   <Button type="button" filled>
                                        save changes
                                   </Button>
                              </div>
                         </div>
                    </Fragment>
               )}
               {isProfileLoading && (
                    <div>
                         <p>Please wait...</p>
                    </div>
               )}
          </Layout>
     );
};
