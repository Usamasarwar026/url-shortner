import { useEffect, useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { useRouter } from "next/navigation";
import { UpdatePassword } from "@/store/slice/authSlice/authSlice";

const updatePasswordSchema = Yup.object({
  password: Yup.string().required("==password is required"),
  newPassword: Yup.string()
    .min(3, "New password must be at least 6 characters")
    .required("New password is required"),
});

export default function useUpdatePassword() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {user, loading: reduxLoading} = useAppSelector(state => state.auth)

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const data = { password, newPassword };

    try {
      await updatePasswordSchema.validate(
        { password, newPassword},
        { abortEarly: false }
      );
      console.log("Data being sent:", { password,newPassword });
      const result = await dispatch(
        UpdatePassword(data)
      ).unwrap();
      console.log("Result:", result);
      if (!result.success) {
        toast.error(result.message); 
        return;
      }
      toast.success(result.message || "Password updated successfully");
      setPassword("");
      setNewPassword("");
      router.push('/login')
      
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
   password,
   setPassword,
   newPassword,
   setNewPassword,
    handleUpdatePassword,
    loading: loading || reduxLoading,
  };
}
