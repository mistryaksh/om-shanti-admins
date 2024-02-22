import React, { useEffect, useState } from "react";
import { Layout } from "../../../layout";
import { Button, InputField } from "../../../component";
import { useLazyGetDonationByIdQuery, useSendingMailMutation } from "../../../redux/api";
import { useAppDispatch } from "../../../redux";
import { useNavigate, useParams } from "react-router-dom";
import { handleError } from "../../../redux/app";
import QuillEditor from "react-quill";
import { Upload80G } from "../../../utils";
import { toast } from "react-toastify";

interface MailProps {
     subject: string;
     email: string;
     file: File;
}

export const SendMailToDonationPage = () => {
     const { donationId } = useParams();
     const [mailDesc, setMailDesc] = useState<MailProps>({
          subject: "",
          file: {} as File,
          email: "",
     });
     const [selectedPDF, setSelectedPDF] = useState<string | null>(null);
     const [
          SendMail,
          {
               isError: isSendMailError,
               error: sendMailError,
               data: sendMailData,
               // isLoading: isSendMailLoading,
               isSuccess: isSendMailSuccess,
          },
     ] = useSendingMailMutation();
     const [
          GetDonation,
          {
               isError: isDonationError,
               error: donationError,
               // isLoading: isDonationLoading,
               isSuccess: isDonationSuccess,
               data: donationData,
          },
     ] = useLazyGetDonationByIdQuery();
     const dispatch = useAppDispatch();
     const navigate = useNavigate();

     const handlePDFFIle = async () => {
          if (mailDesc.file) {
               if (!selectedPDF) {
                    const pdf = await Upload80G(mailDesc.file);
                    setSelectedPDF(pdf);
               } else {
                    await SendMail({
                         subject: mailDesc.subject,
                         donatorMailId: donationData?.data.email as string,
                         fileLink: selectedPDF as string,
                    });
               }
          } else {
               dispatch(handleError("somthing went wrong"));
          }
     };

     useEffect(() => {
          if (isDonationError) {
               if ((donationError as any).data) {
                    dispatch(handleError((donationError as any).data.message));
               } else {
                    console.log((donationError as any).error);
                    dispatch(handleError((donationError as any).error));
               }
          }
          if (isSendMailError) {
               if ((sendMailError as any).data) {
                    dispatch(handleError((sendMailError as any).data.message));
               } else {
                    console.log((sendMailError as any).error);
                    dispatch(handleError((sendMailError as any).error));
               }
          }

          if (isSendMailSuccess) {
               if (sendMailData?.data === "MAIL_SENT") {
                    toast.success(`80G certificate has been sent to ${donationData?.data.email}`);
                    navigate("/dashboard", { replace: true });
               }
          }

          if (donationId) {
               (async () => {
                    await GetDonation(donationId as string);
               })();
          }
     }, [
          isDonationError,
          donationError,
          dispatch,
          donationId,
          GetDonation,
          isDonationSuccess,
          donationData?.data,
          isSendMailError,
          sendMailError,
          isSendMailSuccess,
          sendMailData?.data,
          navigate,
     ]);
     return (
          <Layout>
               <div className="flex items-center justify-between">
                    <div>
                         <h6 className="text-3xl font-semibold text-gray-900 capitalize">
                              You are sending mail to{" "}
                              <span
                                   className="text-primary-500 underline cursor-pointer"
                                   onClick={() => navigate(`/donations/details/${donationData?.data._id}`)}
                              >
                                   {donationData?.data.custName}
                              </span>
                         </h6>
                         <p className="mt-3 text-gray-500">Mail ID : {donationData?.data.email}</p>
                    </div>
                    <Button filled>Upload 80G pdf</Button>
               </div>
               <hr className="my-10 border-primary-500" />
               <div>
                    <InputField
                         type="email"
                         disabled
                         label={donationData?.data.custName as string}
                         value={donationData?.data.email}
                    />
                    <div className="my-10">
                         <label htmlFor="subject">Write message to your donator</label>
                         <QuillEditor
                              className="z-10 h-[400px]"
                              value={mailDesc.subject}
                              onChange={(e) => setMailDesc({ ...mailDesc, subject: e })}
                         />
                    </div>
                    <div className="flex flex-col mt-14">
                         <label htmlFor="category" className="text-gray-400 font-semibold select-none">
                              Upload 80G here
                         </label>
                         <input
                              className="file:bg-primary-500 file:border-0 file:p-3 file:rounded-md file:text-white flex-1 hover:bg-primary-300 rounded-lg hover:text-white mt-3"
                              id="picture"
                              name="picture"
                              type="file"
                              onChange={(e) => {
                                   if (e.target.files?.length) {
                                        const file = e.target.files[0];
                                        setMailDesc({
                                             ...mailDesc,
                                             file: file,
                                        });
                                   } else {
                                        dispatch(handleError("please select file"));
                                   }
                              }}
                         />
                    </div>
                    {selectedPDF?.length && (
                         <div className="py-10 flex flex-col items-end gap-5">
                              <Button dangerFilled small>
                                   remove pdf
                              </Button>
                              <iframe
                                   src={selectedPDF as string}
                                   className="w-full h-[50vh]"
                                   frameBorder={0}
                                   title="customer 80G"
                              />
                         </div>
                    )}
                    <div className="mt-10 flex justify-end" onClick={handlePDFFIle}>
                         <Button filled>Share now!</Button>
                    </div>
               </div>
          </Layout>
     );
};
