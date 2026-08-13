export interface LoginFormData {
  identifier: string;
  password: string;
  rememberMe: boolean;
}

export interface FormErrors {
  identifier?: string;
  password?: string;
  general?: string;
}

export interface UserSession {
  email: string;
  name: string;
  loginTime: string;
  rememberMe: boolean;
}
