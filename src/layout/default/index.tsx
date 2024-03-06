import React, { FC, ReactNode, useEffect } from "react";
import { AppLink, Button } from "../../component";
import { MdAutoGraph, MdOutlineEmojiEvents, MdOutlineCategory, MdOutlineSettings, MdOutlineMenu } from "react-icons/md";
import { LuGalleryHorizontal } from "react-icons/lu";
import { PiPenNibLight } from "react-icons/pi";
import { IoReceiptOutline } from "react-icons/io5";
import { TbWorldWww } from "react-icons/tb";
import { handleError, handleSideNav, handleSuccess, removeToken, useLayoutSlice } from "../../redux/app";
import { useAppDispatch } from "../../redux";
import { useLogoutAdminMutation } from "../../redux/api";
import { useNavigate } from "react-router-dom";

export interface LayoutProps {
     children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
     const { sideNav } = useLayoutSlice();
     const dispatch = useAppDispatch();
     const [Logout, { isError: isLogoutError, error: logoutError, data: logoutData, isSuccess: isLogoutSuccess }] =
          useLogoutAdminMutation();
     const navigate = useNavigate();

     useEffect(() => {
          if (isLogoutError) {
               if ((logoutError as any).data) {
                    dispatch(handleError((logoutError as any).data.message));
               } else {
                    console.log((logoutError as any).error);
                    dispatch(handleError((logoutError as any).error));
               }
          }
          if (isLogoutSuccess) {
               dispatch(handleSuccess(logoutData?.data as string));
               dispatch(removeToken());
               navigate("/", { replace: true });
          }
     }, [isLogoutError, logoutError, isLogoutSuccess, dispatch, navigate, logoutData]);

     return (
          <div className="flex h-screen">
               {sideNav && (
                    <nav className="w-[260px] p-3 flex flex-col items-center gap-5 justify-between">
                         <div className="flex flex-col gap-3 w-full">
                              <div className="h-full w-[30%] object-fill">
                                   <img src={require("../../assets/logo.jpeg")} alt="om_shanti" />
                              </div>
                              <AppLink Icon={MdAutoGraph} label="dashboard" path="/dashboard" />
                              <AppLink Icon={MdOutlineCategory} label="categories" path="/category" />
                              <AppLink Icon={LuGalleryHorizontal} label="events (images)" path="/gallery" />
                              <AppLink Icon={MdOutlineEmojiEvents} label="programs" path="/events" />
                              <AppLink Icon={PiPenNibLight} label="blogs" path="/blogs" />
                              <AppLink Icon={IoReceiptOutline} label="donations" path="/donations" />
                              <AppLink Icon={TbWorldWww} label="website admins" path="/settings/admins" />
                              <AppLink Icon={MdOutlineSettings} label="Account" path="/settings/account" />
                         </div>
                         <div className="w-full pb-5">
                              <Button
                                   fullWidth
                                   small
                                   type="button"
                                   dangerOutlined
                                   onClick={async () => {
                                        await Logout();
                                   }}
                              >
                                   Logout
                              </Button>
                         </div>
                    </nav>
               )}
               <main className="flex-1 relative overflow-y-scroll h-screen">
                    <nav className="fixed w-full px-2 bg-white py-3 flex justify-between items-center">
                         <button type="button" className="p-2" onClick={() => dispatch(handleSideNav())}>
                              <MdOutlineMenu size={26} />
                         </button>
                    </nav>
                    <section className="mt-14 p-3">{children}</section>
               </main>
          </div>
     );
};
