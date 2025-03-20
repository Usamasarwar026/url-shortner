import { useEffect, useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { useRouter, useSearchParams } from "next/navigation";
import { ResetPassword } from "@/store/slice/authSlice/authSlice";

const registerSchema = Yup.object({
  password: Yup.string()
    .min(2, "Password must be at least 6 characters")
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
      console.log("Data being sent:", { password });
      const result = await dispatch(ResetPassword(data)).unwrap();
      console.log("Result:", result);
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success(result.message || "Password Reset successful");
      setPassword("");
      router.push("/login");
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
    handleResetPassword,
    loading: loading || reduxLoading,
  };
}
