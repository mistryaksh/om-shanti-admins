import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "..";

export interface CategorySliceProps {}

const initialState: CategorySliceProps = {};

const CategorySlice = createSlice({
     initialState,
     name: "category",
     reducers: {},
});

export const CategoryReducer = CategorySlice.reducer;
export const useCategorySlice = () =>
     useAppSelector((state) => {
          return state.category;
     });
// export const {} = CategorySlice.actions;
