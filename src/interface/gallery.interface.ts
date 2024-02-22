import { IAdminProps } from "./account.interface";

export interface IGalleryProps {
     images: string[];
     title: string;
     description?: string;
     postedBy?: IAdminProps | string;
     _id?: string;
     createdAt?: string;
     updatedAt?: string;
}
