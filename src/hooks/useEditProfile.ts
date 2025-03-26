import { useEffect, useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { EditProfile } from "@/store/slice/authSlice/authSlice";

const profileSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
});

export default function useEditProfile() {
  const { data: session, update } = useSession();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, loading: reduxLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (session?.user) {
      setEmail(session.user.email || "");
      setUsername(session.user.name || "");
    } else if (user) {
      setEmail(user.email || "");
      setUsername(user.username || "");
    }
  }, [session, user]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = { email, username };

    try {
      await profileSchema.validate(data, { abortEarly: false });

      const result = await dispatch(EditProfile(data)).unwrap();
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      await update({
        ...session,
        user: {
          ...session?.user,
          email: result.user?.email,
          username: result.user?.username,
        },
      });
      toast.success(result.message || "Profile updated successfully");
      router.push("/main");
    } catch (error) {
      let errorMessage = "Error processing request";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
      if (error instanceof Yup.ValidationError) {
        toast.error(error.errors.join(", "));
      } else {
        toast.error(errorMessage || "An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    username,
    setUsername,
    handleUpdate,
    loading: loading || reduxLoading,
  };
}
