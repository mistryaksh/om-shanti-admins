import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "..";
import { RemoveAuthToken, SetAuthToken } from "../../utils";

export interface LayoutSliceProps {
     sideNav: boolean;
     error: string | null;
     success: string | null;
     token: string | null;
}

const initialState: LayoutSliceProps = {
     sideNav: true,
     error: null,
     success: null,
     token: null,
};

const LayoutSlice = createSlice({
     initialState,
     name: "layout",
     reducers: {
          handleSideNav: (state) => {
               state.sideNav = !state.sideNav;
          },
          handleError: (state, action: PayloadAction<string | null>) => {
               state.error = action.payload;
          },
          handleToken: (state, action: PayloadAction<string>) => {
               state.token = action.payload;
               SetAuthToken(state.token);
          },
          removeToken: (state) => {
               state.token = null;
               RemoveAuthToken();
          },
          handleSuccess: (state, action: PayloadAction<string | null>) => {
               state.success = action.payload;
          },
     },
});

export const useLayoutSlice = () =>
     useAppSelector((state) => {
          return state.layout;
     });
export const LayoutReducer = LayoutSlice.reducer;
export const { handleSideNav, handleError, handleToken, removeToken, handleSuccess } = LayoutSlice.actions;
