import { useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { ForgetPassword } from "@/store/slice/authSlice/authSlice";

const registerSchema = Yup.object({
 email: Yup.string()
     .email("Invalid email format")
     .required("Email is required"),
});

export default function useForgetForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { loading: reduxLoading } = useAppSelector((state) => state.auth);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  const data ={
   email
  }

    try {
      await registerSchema.validate(
        { email },
        { abortEarly: false }
      );
      const result = await dispatch(
        ForgetPassword(data)
      ).unwrap();
      if (!result.success) {
        toast.error(result.message); 
        return;
      }
      toast.success(result.message || "A reset link has been sent to your email.");
      setEmail("");
      
    } catch (error) {
      let errorMessage = "Error processing request";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
      if (error instanceof Yup.ValidationError) {
        toast.error(error.errors.join(", "));
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };
 

  return {
   email,
   setEmail,
    handleUpdatePassword,
    loading: loading || reduxLoading,
  };
}
