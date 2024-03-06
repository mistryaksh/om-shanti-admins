import React, { useEffect } from "react";
import { Layout } from "../../../layout";
import ReactTable from "react-data-table-component";
import { useLazyGetAllAdminsQuery } from "../../../redux/api";
import { Button } from "../../../component";
import { useNavigate } from "react-router-dom";

export const AdminDetails = () => {
     const [GetAdmins, { isError: isAdminError, error: adminError, data: adminData, isLoading: isAdminLoading }] =
          useLazyGetAllAdminsQuery();
     const navigate = useNavigate();

     useEffect(() => {
          if (isAdminError) {
               if ((adminError as any).data) {
                    console.log((adminError as any).data);
               } else {
                    console.log(adminError);
               }
          }
          if (!adminData) {
               (async () => {
                    await GetAdmins();
               })();
          }
     }, [isAdminError, adminError, adminData?.data, GetAdmins, adminData]);

     return (
          <Layout>
               <div className="flex justify-between items-center">
                    <div className="flex flex-col flex-1">
                         <h6 className="text-2xl font-semibold">This admins are registered with this admin panel</h6>
                         <p className="text-gray-500">This users has your website controls</p>
                    </div>
                    <Button onClick={() => navigate("/settings/new-admin")} small filled>
                         add account
                    </Button>
               </div>
               <ReactTable
                    progressPending={isAdminLoading}
                    data={adminData?.data || []}
                    columns={[
                         {
                              id: "_id",
                              name: "#",
                              width: "100px",
                              cell: (_, index) => <p className="text-gray-500">{index + 1}</p>,
                         },
                         {
                              id: "name",
                              name: "Full name",
                              cell: ({ name }) => (
                                   <p className="text-gray-900">
                                        {name.lastName} {name.firstName}
                                   </p>
                              ),
                         },
                         {
                              id: "email",
                              name: "Email address",
                              cell: ({ contact }) => (
                                   <div>
                                        <p className="text-gray-500">{contact.email}</p>
                                   </div>
                              ),
                         },
                         {
                              id: "contact",
                              name: "Mobile Number",
                              cell: ({ contact }) => (
                                   <div>
                                        <p className="text-gray-500">{contact.mobile}</p>
                                   </div>
                              ),
                         },
                    ]}
               />
          </Layout>
     );
};
