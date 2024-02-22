import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "..";
import { IDonationProps } from "../../interface";

export interface DonationSliceProps {
     donations: IDonationProps[];
}

const initialState: DonationSliceProps = {
     donations: [],
};

const DonationSlice = createSlice({
     initialState,
     name: "donation",
     reducers: {
          setDonations: (state, action: PayloadAction<IDonationProps>) => {
               state.donations.push(action.payload);
          },
     },
});

export const useDonationSlice = () =>
     useAppSelector((state) => {
          return state.donation;
     });
export const DonationReducer = DonationSlice.reducer;
export const { setDonations } = DonationSlice.actions;
