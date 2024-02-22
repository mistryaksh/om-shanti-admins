import { IAdminProps } from "./account.interface";
import { IEventCategoryProps } from "./category.interface";

export interface IBlogProps {
     image: string;
     label: string;
     category: IEventCategoryProps | string;
     description: string;
     postedBy?: IAdminProps | string;
     isActive?: boolean;
     _id?: string;
     createdAt?: string;
     updatedAt?: string;
}
