import axios, { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthState, ConfirmResetPasswordData, EditProfileData, EditProfileResponse, RegisterData, RegisterResponse, ResetPasswordData, ResetPasswordResponse, UpdatePasswordData, UpdatePasswordResponse } from "@/types/types";


const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const UpdatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (data: UpdatePasswordData, { rejectWithValue }) => {
    try {
      const response = await axios.post<UpdatePasswordResponse>(
        "/api/updatePassword",
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response) {
        return rejectWithValue(axiosError.response.data);
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
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(
        axiosError.response?.data || { message: "Failed to reset password" }
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
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response) {
        return rejectWithValue(axiosError.response.data);
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
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response) {
        return rejectWithValue(axiosError.response.data);
      }
      return rejectWithValue({ message: "An unexpected error occurred" });
    }
  }
);

export const Register = createAsyncThunk(
  "auth/register",
  async (data: RegisterData, { rejectWithValue }) => {
    try {
      const response = await axios.post<RegisterResponse>("/api/register", {
        email: data.email,
        username: data.username,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response) {
        return rejectWithValue(axiosError.response.data);
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

export default authSlice.reducer;
