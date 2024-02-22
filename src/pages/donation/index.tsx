import React, { useEffect } from "react";
import { Layout } from "../../layout";
import { useLazyGetAllDonationsQuery } from "../../redux/api";
import { Button, Tooltip } from "../../component";
import { useAppDispatch } from "../../redux";
import { handleError, setDonations, useDonationSlice } from "../../redux/app";
import { IDonationProps } from "../../interface";
import ReactTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

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

     return (
          <Layout>
               <div className="flex justify-between items-center">
                    <div className="flex flex-col flex-1">
                         <h6 className="text-2xl font-semibold">Manage donations</h6>
                         <p className="text-gray-500">You can manage categories for your events and programs</p>
                    </div>
                    <div>
                         <Button type="button" small outlined>
                              export to excel
                         </Button>
                    </div>
               </div>
               {isDonationLoading && (
                    <div>
                         <p className="text-gray-500">please wait</p>
                    </div>
               )}
               {!isDonationLoading && (
                    <ReactTable
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
                                   cell: ({ email }) => <p className="text-gray-500 ">{email}</p>,
                              },
                              {
                                   id: "mobile",
                                   name: "Mobile",
                                   cell: ({ mobile }) => <p className="text-gray-500 ">+91{mobile}</p>,
                              },
                              {
                                   id: "amount",
                                   name: "Donated",
                                   cell: ({ amount }) => <p className="text-gray-500">INR {amount} /-</p>,
                              },
                              {
                                   id: "actions",
                                   name: "Actions",
                                   width: "100px",
                                   cell: ({ status }) => (
                                        <div className="flex items-center gap-5">
                                             {status === "INITIATED" && (
                                                  <p className="bg-yellow-100 text-yellow-500 p-2 rounded-lg">
                                                       Initiated
                                                  </p>
                                             )}
                                        </div>
                                   ),
                              },
                         ]}
                    />
               )}
          </Layout>
     );
};
