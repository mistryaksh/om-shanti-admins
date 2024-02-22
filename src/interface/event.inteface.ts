import { IEventCategoryProps } from "./category.interface";

export interface IEventsProps {
     image: string;
     label: string; // title
     subTitle: string;
     postedOn: Date;
     description: string; //should be an rich text string
     // bannerImage: string;
     active: boolean;
     categoryId: IEventCategoryProps | string;
     _id?: string;
     createdAt?: string;
     updateAt?: string;
}
