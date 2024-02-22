import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "..";
import { IBlogProps } from "../../interface";

export interface IBlogSliceProps {
     blogs: IBlogProps[];
}

const initialState: IBlogSliceProps = {
     blogs: [],
};

const BlogSlice = createSlice({
     initialState,
     name: "blog",
     reducers: {
          setBlogs: (state, action: PayloadAction<IBlogProps>) => {
               state.blogs.push(action.payload);
          },
     },
});

export const useBlogSlice = () =>
     useAppSelector((state) => {
          return state.blog;
     });
export const BlogReducer = BlogSlice.reducer;
export const { setBlogs } = BlogSlice.actions;
