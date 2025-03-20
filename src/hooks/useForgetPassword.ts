import { useEffect, useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { useRouter } from "next/navigation";
import { ForgetPassword } from "@/store/slice/authSlice/authSlice";

const registerSchema = Yup.object({
 email: Yup.string()
     .email("Invalid email format")
     .required("Email is required"),
});

export default function useForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
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
      console.log("Data being sent:", { email });
      const result = await dispatch(
        ForgetPassword(data)
      ).unwrap();
      console.log("Result:", result);
      if (!result.success) {
        toast.error(result.message); 
        return;
      }
      toast.success(result.message || "A reset link has been sent to your email.");
      setEmail("");
      
    } catch (error: any) {
      if (error instanceof Yup.ValidationError) {
        toast.error(error.errors.join(", "));
      } else {
        toast.error(error.message);
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
