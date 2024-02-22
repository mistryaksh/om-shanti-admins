import React, { useEffect } from "react";
import { Layout } from "../../layout";
import { useLazyDataAnalyserQuery } from "../../redux/api/website.api";
import { useAppDispatch } from "../../redux";
import { handleError } from "../../redux/app";
import { useProfileAdminQuery } from "../../redux/api";
import { DashboardCard } from "../../component";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { LuGalleryHorizontal } from "react-icons/lu";
import { IoReceiptOutline } from "react-icons/io5";
import { PiPenNibLight } from "react-icons/pi";

export const DashboardPage = () => {
     const [GetDataAnalytics, { isError: isDataError, error: dataError, isLoading: isDataLoading, data }] =
          useLazyDataAnalyserQuery();
     const { data: profile, isError: isProfileError, error: profileError } = useProfileAdminQuery();
     const dispatch = useAppDispatch();

     useEffect(() => {
          if (isDataError) {
               if ((dataError as any).data) {
                    dispatch(handleError((dataError as any).data.message));
               } else {
                    console.log((dataError as any).error);
                    dispatch(handleError((dataError as any).error));
               }
          }
          if (isProfileError) {
               if ((profileError as any).data) {
                    dispatch(handleError((profileError as any).data.message));
               } else {
                    console.log((profileError as any).error);
                    dispatch(handleError((profileError as any).error));
               }
          }
          if (!data) {
               (async () => {
                    await GetDataAnalytics();
               })();
          }
     }, [isDataError, dataError, dispatch, GetDataAnalytics, data, isProfileError, profileError]);

     return (
          <Layout>
               <h6 className="text-3xl font-semibold capitalize">
                    Welcome {profile?.data.name.lastName} {profile?.data.name.firstName}!
               </h6>
               <p className="text-gray-500">Greetings from Akshal Web Solutions</p>
               {!isDataLoading && (
                    <div className="mt-10 grid grid-cols-1 xl:grid-cols-4 gap-10 lg:grid-cols-4 md:grid-cols-2">
                         <DashboardCard
                              Icon={LuGalleryHorizontal}
                              label="events"
                              path="/events"
                              value={data?.data.event}
                         />
                         <DashboardCard
                              Icon={MdOutlineEmojiEvents}
                              label="programs"
                              path="/gallery"
                              value={data?.data.program}
                         />
                         <DashboardCard
                              Icon={IoReceiptOutline}
                              label="total donations"
                              path="/donations"
                              value={data?.data.donations}
                         />
                         <DashboardCard Icon={PiPenNibLight} label="blogs" path="/blogs" value={data?.data.blogs} />
                    </div>
               )}
               {isDataLoading && (
                    <div>
                         <p>Please wait....</p>
                    </div>
               )}
          </Layout>
     );
};
