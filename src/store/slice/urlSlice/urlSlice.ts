import { UrlState } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const initialState: UrlState = {
  urls: [],
  error: null,
  loading: false,
  showLoginPopup: false,
};

export const generateQRCode = createAsyncThunk(
  "url/generateQRCode",
  async (shortCode: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/generateQR",
        { shortCode },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;

      if (axiosError.response) {
        return rejectWithValue(
          axiosError.response.data.message || "Failed to generate QR code"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);
export const editUrl = createAsyncThunk(
  "url/editUrl",
  async (
    {
      shortCode,
      originalUrl,
      status,
    }: {
      shortCode: string;
      originalUrl: string;
      status: "Active" | "Inactive";
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        "/api/editUrl",
        { shortCode, originalUrl, status },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      return response.data.updatedUrl;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response) {
        return rejectWithValue(
          -axiosError.response.data.message || "Failed to edit URL"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export const deleteUrl = createAsyncThunk(
  "url/deleteUrl",
  async (shortCode: string, { rejectWithValue }) => {
    try {
      await axios.delete("/api/deleteUrl", {
        data: { shortCode },
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      return shortCode;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response) {
        return rejectWithValue(
          axiosError.response.data.message || "Failed to delete URL"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export const fetchUserUrls = createAsyncThunk(
  "url/fetchUserUrls",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/getUrl", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      return response.data.links;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response) {
        return rejectWithValue(
          axiosError.response.data.message || "Failed to fetch URLs"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export const shortUrl = createAsyncThunk(
  "url/shorten",
  async (
    { url, customSlug }: { url: string; customSlug?: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await axios.post(
        "/api/shortenUrl",
        { url, customSlug },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      await dispatch(fetchUserUrls());
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 403) {
        return rejectWithValue(
          "Guest limit reached. Please log in to continue."
        );
      } else if (axiosError.response?.status === 409) {
        return rejectWithValue(
          "Custom slug is already in use. Please choose another."
        );
      }
      return rejectWithValue({ message: "An unexpected error occurred" });
    }
  }
);

export const urlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(shortUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(shortUrl.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(shortUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserUrls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserUrls.fulfilled, (state, action) => {
        state.loading = false;
        state.urls = action.payload;
      })
      .addCase(fetchUserUrls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUrl.fulfilled, (state, action) => {
        state.loading = false;
        const shortCode = action.payload;
        state.urls = state.urls.filter(
          (url) => !url.shortenedUrl.includes(shortCode)
        );
      })
      .addCase(deleteUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(editUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUrl.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUrl = action.payload;
        const index = state.urls.findIndex((url) =>
          url.shortenedUrl.includes(updatedUrl.shortCode)
        );
        if (index !== -1) {
          state.urls[index] = {
            ...state.urls[index],
            originalUrl: updatedUrl.originalUrl,
            status: updatedUrl.status,
          };
        }
      })
      .addCase(editUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(generateQRCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateQRCode.fulfilled, (state, action) => {
        state.loading = false;
        const { qrCode, shortenedUrl } = action.payload;
        const index = state.urls.findIndex(
          (url) => url.shortenedUrl === shortenedUrl
        );
        if (index !== -1) {
          state.urls[index].qrCode = qrCode;
        }
      })
      .addCase(generateQRCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
// export const { hideLoginPopup } = urlSlice.actions;
export default urlSlice.reducer;
