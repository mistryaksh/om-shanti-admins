import React, { useEffect } from "react";
import { Layout } from "../../layout";
import { useLazyGetAllDonationsQuery } from "../../redux/api";
import { Tooltip } from "../../component";
import { useAppDispatch } from "../../redux";
import { handleError, setDonations, useDonationSlice } from "../../redux/app";
import { IDonationProps } from "../../interface";
import ReactTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import { FaRegFileExcel, FaEnvelope, FaPhone } from "react-icons/fa";
import moment from "moment";

export const DonationPage = () => {
     const [
          GetDonations,
          {
               isError: isDonationError,
               error: donationError,
               data: donationData,
               isLoading: isDonationLoading,
               isSuccess: isDonationSuccess,
          },
     ] = useLazyGetAllDonationsQuery();
     const dispatch = useAppDispatch();
     const { donations } = useDonationSlice();
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
          (async () => {
               await GetDonations();
          })();
          if (isDonationSuccess) {
               donationData?.data.map((element: IDonationProps) => {
                    if (!donations.includes(element)) {
                         return dispatch(setDonations(element));
                    } else {
                         return null;
                    }
               });
          }
     }, [donationError, dispatch, GetDonations, isDonationError, donationData?.data, isDonationSuccess, donations]);

     const ExportToExcel = (data: IDonationProps[]) => {
          if (data.length) {
               const worksheet = XLSX.utils.json_to_sheet(data);
               const workbook = XLSX.utils.book_new();
               XLSX.utils.book_append_sheet(workbook, worksheet, "Om shanti donations");
               XLSX.writeFile(workbook, "Om shanti donations.xlsx");
          } else {
               toast.info("cannot use this feature as no donations found!");
          }
     };
     return (
          <Layout>
               <div className="flex justify-between items-center my-5">
                    <div className="flex flex-col flex-1">
                         <h6 className="text-2xl font-semibold">Manage donations</h6>
                         <p className="text-gray-500">You can manage categories for your events and programs</p>
                    </div>
                    <div>
                         <button type="button" onClick={() => ExportToExcel(donationData?.data as IDonationProps[])}>
                              <FaRegFileExcel size={30} className="fill-primary-500" />
                         </button>
                    </div>
               </div>
               {isDonationLoading && (
                    <div>
                         <p className="text-gray-500">please wait</p>
                    </div>
               )}
               <ReactTable
                    pagination
                    progressPending={isDonationLoading}
                    data={donationData?.data || []}
                    columns={[
                         {
                              id: "_id",
                              name: "#",
                              width: "100px",
                              cell: (_, index) => <p className="text-gray-500">{index + 1}</p>,
                         },
                         {
                              id: "custName",
                              width: "250px",
                              name: "Donator Name",
                              cell: ({ custName, _id }) => (
                                   <button type="button" onClick={() => navigate(`/donations/details/${_id}`)}>
                                        <Tooltip message="send 80G">
                                             <p className="text-gray-900 font-semibold capitalize">{custName}</p>
                                        </Tooltip>
                                   </button>
                              ),
                         },
                         {
                              id: "email",
                              name: "Email address",
                              cell: ({ email, mobile, _id }) => (
                                   <div className="flex flex-col">
                                        <div className="flex gap-3 items-center">
                                             <FaPhone className=" fill-gray-500" />
                                             <p className="text-gray-500 ">+91{mobile}</p>
                                        </div>
                                        <div className="flex gap-3 items-center">
                                             <FaEnvelope className="fill-gray-500" />
                                             <p
                                                  className="text-gray-500 underline cursor-pointer"
                                                  onClick={() => {
                                                       return navigate(`/donations/details/${_id}`);
                                                  }}
                                             >
                                                  {email}
                                             </p>
                                        </div>
                                   </div>
                              ),
                         },

                         {
                              id: "amount",
                              width: "200px",
                              name: "Phone Pe Ref ID",
                              cell: ({ referenceId }) => <p className="text-gray-500">{referenceId}</p>,
                         },
                         {
                              id: "amount",
                              name: "Donated",
                              cell: ({ amount }) => <p className="text-gray-500">INR {amount} /-</p>,
                         },
                         {
                              id: "actions",
                              name: "Status",
                              width: "120px",
                              cell: ({ status, createdAt }) => (
                                   <div className="flex items-center py-4 gap-3 flex-col">
                                        {moment(createdAt).format("Do MMM YYYY")}
                                        {status === "INITIATED" && (
                                             <p className="bg-yellow-100 text-yellow-500 p-2 rounded-lg">Initiated</p>
                                        )}
                                        {status === "SUCCESS" && (
                                             <p className="bg-green-100 text-green-500 p-2 rounded-lg">Successful</p>
                                        )}
                                   </div>
                              ),
                         },
                    ]}
               />
          </Layout>
     );
};
