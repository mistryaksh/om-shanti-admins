import { object, string } from "yup";
import { ILoginProps } from "../interface";

export const initialLoginProps: ILoginProps = {
     email: "",
     password: "",
};

export const loginValidationSchema = object().shape({
     email: string().required("email is required").email("email is not valid"),
     password: string().required("password is required").min(6).max(12),
});

interface INewAdminProps {
     firstName: string;
     lastName: string;
     email: string;
     mobile: string;
     addressLine1: string;
     addressLine2: string;
     password: string;
}

export const initialNewAdminValue: INewAdminProps = {
     addressLine1: "d-203, devi park, nr. saraswati school",
     addressLine2: "nallasopara east - 401209, palghar",
     email: "test@test.com",
     firstName: "test@admin",
     lastName: "ltest@admin",
     mobile: "1234567890",
     password: "abc123",
};

export const NewAdminValidationSchema = object().shape({
     addressLine1: string().required("please enter address"),
     addressLine2: string().required("please enter address"),
     email: string().email().required("please email address"),
     firstName: string().required("please first name"),
     lastName: string().required("please last name"),
     mobile: string().required("please enter mobile number"),
     password: string().required("please password"),
});
