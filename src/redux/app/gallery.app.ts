import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "..";
import { IGalleryProps } from "../../interface";

interface InputProps {
     desc: string;
     title: string;
}

export interface GallerySliceProps {
     selectedImage: File[];
     images: {
          image: string;
          size: number;
     }[];
     loading: boolean;
     uploadedImage: string[];
     galleryInput: InputProps;
     myGallery: IGalleryProps[];
     single: IGalleryProps;
     deleteModal: boolean;
}

const initialState: GallerySliceProps = {
     selectedImage: [],
     images: [],
     uploadedImage: [],
     loading: false,
     galleryInput: {} as InputProps,
     myGallery: [],
     single: {} as IGalleryProps,
     deleteModal: false,
};

const GallerySlice = createSlice({
     initialState,
     name: "gallery",
     reducers: {
          setImage: (state, action: PayloadAction<File[]>) => {
               for (var i = 0; i < action.payload.length; i++) {
                    var reader = URL.createObjectURL(action.payload[i]);
                    state.images.push({ image: reader, size: action.payload[i].size });
                    state.selectedImage.push(action.payload[i]);
               }
          },
          setUploadedImage: (state, action: PayloadAction<string>) => {
               state.uploadedImage.push(action.payload);
          },
          RemoveSelectedImages: (state) => {
               state.images = [];
               state.selectedImage = [];
          },
          handleLoading: (state, action: PayloadAction<boolean>) => {
               state.loading = action.payload;
          },
          handleDesc: (state, action: PayloadAction<string>) => {
               state.galleryInput = {
                    ...state.galleryInput,
                    desc: action.payload,
               };
          },
          handleTitle: (state, action: PayloadAction<string>) => {
               state.galleryInput = {
                    ...state.galleryInput,
                    title: action.payload,
               };
          },
          setGallery: (state, action: PayloadAction<IGalleryProps>) => {
               state.myGallery.push(action.payload);
          },
          setSingleGallery: (state, action: PayloadAction<IGalleryProps>) => {
               state.single = action.payload;
          },
          deleteFromPage: (state, action: PayloadAction<IGalleryProps>) => {
               state.myGallery.filter((item) => {
                    return item !== action.payload;
               });
          },
          toggleDeleteModal: (state) => {
               state.deleteModal = !state.deleteModal;
          },
     },
});

export const useGallerySlice = () =>
     useAppSelector((state) => {
          return state.gallery;
     });
export const GalleryReducer = GallerySlice.reducer;
export const {
     setImage,
     setUploadedImage,
     RemoveSelectedImages,
     handleLoading,
     handleDesc,
     handleTitle,
     setGallery,
     setSingleGallery,
     toggleDeleteModal,
     deleteFromPage,
} = GallerySlice.actions;
