import React, { useEffect } from "react";
import { Layout } from "../../../layout";
import { useLazyGetDonationByIdQuery } from "../../../redux/api";
import { useAppDispatch } from "../../../redux";
import { handleError } from "../../../redux/app";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { Button } from "../../../component";

export const DonationUserDetails = () => {
     const { donationId } = useParams();
     const [
          GetDonation,
          {
               isError: isDonationError,
               error: donationError,
               isLoading: isDonationLoading,
               isSuccess: isDonationSuccess,
               data: donationData,
          },
     ] = useLazyGetDonationByIdQuery();
     const dispatch = useAppDispatch();
     const navigate = useNavigate();

     useEffect(() => {
          if (isDonationError) {
               if ((donationError as any).data) {
                    dispatch(handleError((donationError as any).data.message));
               } else {
                    console.log((donationError as any).error);
                    dispatch(handleError((donationError as any).error));
               }
          }

          if (donationId) {
               (async () => {
                    await GetDonation(donationId as string);
               })();
          }
          if (isDonationSuccess) {
               console.log(donationData?.data);
          }
     }, [isDonationError, donationError, dispatch, donationId, GetDonation, isDonationSuccess, donationData?.data]);
     return (
          <Layout>
               {!isDonationLoading && (
                    <div className="gap-5 flex justify-center flex-col items-center mt-5">
                         <div className="w-full flex items-center justify-between">
                              <div>
                                   <h6 className="text-2xl font-semibold uppercase text-primary-500">
                                        om shanti welfare trust
                                   </h6>
                              </div>
                              <img
                                   src={require("../../../assets/logo.jpeg")}
                                   className="rounded-full w-[150px]"
                                   alt=""
                              />
                         </div>
                         <hr className="border-primary-500 border w-full" />
                         <div className="flex flex-col items-start w-full">
                              <div className="flex justify-between items-center w-full">
                                   <div>
                                        <h6 className="capitalize font-semibold text-primary-500">
                                             Donated : ₹ {donationData?.data.amount} INR
                                        </h6>
                                        <h6 className="capitalize font-semibold text-gray-400">
                                             Date : {moment(donationData?.data.createdAt).format("DD-MM-YYYY")}
                                        </h6>
                                   </div>
                                   <div>
                                        <p className="text-gray-500">Receipt No. : {donationData?.data.referenceId}</p>
                                   </div>
                              </div>
                         </div>
                         <hr className="border-primary-500 border w-full" />
                         <div className="w-full">
                              <p className="text-lg">
                                   Donor Name : <span className="text-primary-500 ">{donationData?.data.custName}</span>
                              </p>
                              <p>
                                   Email address : <span>{donationData?.data.email}</span>
                              </p>
                              <p>
                                   Mobile Number : <span>{donationData?.data.mobile}</span>
                              </p>
                         </div>
                         <div className="flex justify-end items-end flex-col gap-3 w-full">
                              <button type="button" className="p-3 bg-yellow-100 text-yellow-500">
                                   {donationData?.data.status}
                              </button>
                              <p>Payment mode : UPI</p>
                         </div>
                    </div>
               )}
               {isDonationLoading && (
                    <div>
                         <p>Please wait....</p>
                    </div>
               )}
               <div className="flex mt-20 gap-5 justify-end">
                    <Button
                         outlined
                         small
                         onClick={() => navigate(`/website/send-mail/${donationData?.data._id}`, { replace: true })}
                    >
                         Share to donator
                    </Button>
                    <Button filled small>
                         print receipt
                    </Button>
               </div>
          </Layout>
     );
};
