import { Middleware, combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
     AuthApiMiddleware,
     AuthApiReducer,
     BlogApiMiddleware,
     BlogApiReducer,
     CategoryApiMiddleware,
     CategoryApiReducer,
     DonationApiMiddleware,
     DonationApiReducer,
     EventApiMiddleware,
     EventApiReducer,
     GalleryApiMiddleware,
     GalleryApiReducer,
} from "./api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { BlogReducer, CategoryReducer, DonationReducer, EventReducer, GalleryReducer, LayoutReducer } from "./app";
import { WebsiteApiMiddleware, WebsiteApiReducer } from "./api/website.api";

const rootReducer = combineReducers({
     layout: LayoutReducer,
     event: EventReducer,
     category: CategoryReducer,
     blog: BlogReducer,
     donation: DonationReducer,
     gallery: GalleryReducer,
     authApi: AuthApiReducer,
     eventApi: EventApiReducer,
     categoryApi: CategoryApiReducer,
     blogApi: BlogApiReducer,
     donationApi: DonationApiReducer,
     galleryApi: GalleryApiReducer,
     websiteApi: WebsiteApiReducer,
});
const rootMiddleware: Middleware[] = [
     AuthApiMiddleware,
     EventApiMiddleware,
     CategoryApiMiddleware,
     BlogApiMiddleware,
     DonationApiMiddleware,
     GalleryApiMiddleware,
     WebsiteApiMiddleware,
];

export const store = configureStore({
     reducer: rootReducer,
     middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(rootMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
setupListeners(store.dispatch);
