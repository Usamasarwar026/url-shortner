export type InputProps = {
  type: string;
  placeholder: string;
  className?: string;
  border?: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type LinkData = {
  shortLink: string;
  originalLink: string;
  clicks: number;
  status: "Active" | "Inactive";
  date: string;
  qrCode: string;
};
export type Url = {
  shortenedUrl: string;
  originalUrl: string;
  clicks: number;
  createdAt: string;
  status: "Active" | "Inactive";
  shortCode?: string;
  qrCode?: string;
};
export type UrlState = {
  urls: Url[];
  error: string | null;
  loading: boolean;
  showLoginPopup: boolean;
};

export type RegisterData = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export type RegisterResponse = {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    username: string;
  };
};
export type AuthState = {
  user: { id: string; email: string; username: string } | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
};
export type EditProfileData = {
  email: string;
  username: string;
};

export type EditProfileResponse = {
  success: boolean;
  message: string;
  user: { id: string; email: string; username: string } | null;
};
export type ResetPasswordData = {
  email: string;
};

export type ResetPasswordResponse = {
  success: boolean;
  message: string;
};
export type ConfirmResetPasswordData = {
  token: string | null;
  password: string;
};

export type UpdatePasswordData = {
  password: string;
  newPassword: string;
};

export type UpdatePasswordResponse = {
  success: boolean;
  message: string;
};

export type ButtonInputProps = {
  class1: string;
  class2: string;
  placeholder: string;
  value: string;
  title: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  onSubmit: (value: string) => void;
};

export type ButtonProps = {
  className: string;
  onClick?: () => void;
  title: string;
};

