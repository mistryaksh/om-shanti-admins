import React, { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface AppWrapperProps {
     children: ReactNode;
}

export const AppWrapper: FC<AppWrapperProps> = ({ children }) => {
     return (
          <Provider store={store}>
               <ToastContainer />
               {children}
          </Provider>
     );
};
