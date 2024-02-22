import { boolean, object, string } from "yup";
import { IEventCategoryProps } from "../interface/category.interface";

export const CategoryInitialValues: IEventCategoryProps = {
     active: false,
     label: "",
     subTitle: "",
};

export const CategoryValidationSchema = object().shape({
     label: string().required("label is required"),
     subTitle: string(),
     active: boolean(),
});
