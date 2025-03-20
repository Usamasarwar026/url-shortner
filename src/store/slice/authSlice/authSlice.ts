import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface RegisterData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

interface RegisterResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    username: string;
  };
}
interface AuthState {
  user: { id: string; email: string; username: string } | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}
interface EditProfileData {
  email: string;
  username: string;
}

interface EditProfileResponse {
  success: boolean;
  message: string;
  user: { id: string; email: string; username: string } | null;
}
interface ResetPasswordData {
  email: string;
}

interface ResetPasswordResponse {
  success: boolean;
  message: string;
}
interface ConfirmResetPasswordData {
  token: string | null;
  password: string;
}

interface ResetPasswordResponse {
  success: boolean;
  message: string;
}
interface UpdatePasswordData {
  password: string;
  newPassword: string;
}

interface UpdatePasswordResponse {
  success: boolean;
  message: string;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const UpdatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (data: UpdatePasswordData, { rejectWithValue }) => {
    console.log("data in authslice",data)
    try {
      const response = await axios.post<UpdatePasswordResponse>(
        "/api/updatePassword",
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Update password API response:", response.data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: "Failed to update password" });
    }
  }
);


export const ResetPassword = createAsyncThunk(
  "auth/confirmResetPassword",
  async (data: ConfirmResetPasswordData, { rejectWithValue }) => {
    try {
      const response = await axios.post<ResetPasswordResponse>(
        "/api/forget/reset",
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to reset password" }
      );
    }
  }
);

export const ForgetPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data: ResetPasswordData, { rejectWithValue }) => {
    try {
      const response = await axios.post<ResetPasswordResponse>(
        "/api/forget",
        data
      );
      console.log("API response:", response.data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: "An unexpected error occurred" });
    }
  }
);

export const EditProfile = createAsyncThunk(
  "auth/editProfile",
  async (data: EditProfileData, { rejectWithValue }) => {
    try {
      const response = await axios.put<EditProfileResponse>(
        "/api/profile",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("API response:", response.data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: "An unexpected error occurred" });
    }
  }
);

export const Register = createAsyncThunk(
  "auth/register",
  async (data: RegisterData, { rejectWithValue }) => {
    try {
      console.log("Thunk sending data to /api/register:", data);
      const response = await axios.post<RegisterResponse>("/api/register", {
        email: data.email,
        username: data.username,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      console.log("API response:", response.data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: "An unexpected error occurred" });
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || null;
        state.error = null;
        state.isAuthenticated = !!action.payload.user;
      })
      .addCase(Register.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as { message: string })?.message ||
          "Registration failed";
        state.isAuthenticated = false;
      })
      .addCase(EditProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(EditProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || state.user;
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(EditProfile.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as { message: string })?.message ||
          "Failed to update profile";
      })
      .addCase(ForgetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ForgetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(ForgetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as { message: string })?.message ||
          "Failed to reset password";
      })
      .addCase(ResetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ResetPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(ResetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as { message: string })?.message ||
          "Failed to reset password";
      })
      .addCase(UpdatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdatePassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(UpdatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as { message: string })?.message || "Failed to update password";
      });
  },
});

// export const {  } = authSlice.actions

export default authSlice.reducer;
