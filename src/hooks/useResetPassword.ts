import { useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { useRouter, useSearchParams } from "next/navigation";
import { ResetPassword } from "@/store/slice/authSlice/authSlice";
const registerSchema = Yup.object({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function useResetPassword() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading: reduxLoading } = useAppSelector((state) => state.auth);
  const searchParams = useSearchParams();
  const token = searchParams.get("Token");

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const data = { token, password };

    try {
      await registerSchema.validate({ password }, { abortEarly: false });
      if (!token) {
        toast.error("Invalid or missing reset token");
        return;
      }
      const result = await dispatch(ResetPassword(data)).unwrap();

      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success(result.message || "Password Reset successful");
      setPassword("");
      router.push("/login");
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
    password,
    setPassword,
    handleResetPassword,
    loading: loading || reduxLoading,
  };
}
