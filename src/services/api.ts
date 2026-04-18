import { cookies } from "next/headers";

// API Configuration
const API_BASE_URL = 'https://kmw-backend-2.onrender.com/api';

// Helper to get token from localStorage
async function getToken() {
  const cookieStore = await cookies();
  const tokenFromCookie = cookieStore.get("user_session")?.value;
  if (tokenFromCookie) {
    return tokenFromCookie;
  }
  return null;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Register Member Types
export interface RegisterMemberRequest {
  name: string;
  nim: string;
  email: string;
  divisionCode: string;
  role: string;
}

export interface RegisterMemberResponse {
  id: string;
  name: string;
  nim: string;
  divisionCode: string;
  role: string;
  createdAt: string;
}

// Activate Account Types
export interface ActivateAccountRequest {
  nim: string;
  code: string;
  password: string;
}

export interface ActivateAccountResponse {
  id: string;
  nim: string;
  isActive: boolean;
  message: string;
}

// Activate Account Types
export interface ConfirmResetPasswordRequest {
  nim: string;
  token: string;
  password: string;
}

export interface ConfirmResetPasswordResponse {
  message: string;
}

export interface LoginAccountRequest {
  nim: string;
  password: string;
}

// Rest Password Types
export interface ResetPasswordRequest {
  nim: string;
}

export interface ResetPasswordResponse {
  message: string;
}

// Staff Management Types
export interface Staff {
  id: string;
  name: string;
  nim: string;
  email: string;
  role: string;
  divisionCode: string;
  divisionName?: string;
  isActive: boolean;
  createdAt?: string;
}

export interface GetStaffQuery {
  divisionCode?: string;
  isActive?: boolean;
  search?: string;
}

export interface UpdateStaffRequest {
  name?: string;
  role?: string;
  divisionCode?: string;
  isActive?: boolean;
}

export interface DeleteStaffResponse {
  message: string;
}

// API Service Class
class ApiService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    // Get token from localStorage and add to Authorization header
    const token = await getToken();

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || data.message || 'Something went wrong',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  // Reset Password
  async requestPasswordReset(data: ResetPasswordRequest): Promise<ApiResponse<ResetPasswordResponse>> {
    return this.makeRequest<ResetPasswordResponse>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Confirm Reset Password
  async confirmResetPassword(data: ConfirmResetPasswordRequest): Promise<ApiResponse<ConfirmResetPasswordResponse>> {
    return this.makeRequest<ConfirmResetPasswordResponse>('/auth/confirm-reset-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Register Member
  async registerMember(data: RegisterMemberRequest): Promise<ApiResponse<RegisterMemberResponse>> {
    return this.makeRequest<RegisterMemberResponse>('/auth/register-member', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Sign In (placeholder for future implementation)
  async signIn(data: LoginAccountRequest): Promise<ApiResponse<any>> {
    return this.makeRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Activate Account
  async activateAccount(data: ActivateAccountRequest): Promise<ApiResponse<ActivateAccountResponse>> {
    return this.makeRequest<ActivateAccountResponse>('/auth/activate', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Get Staff List with optional filters
  async getStaff(query?: GetStaffQuery): Promise<ApiResponse<Staff[]>> {
    const params = new URLSearchParams();
    if (query?.divisionCode) params.append('divisionCode', query.divisionCode);
    if (query?.isActive !== undefined) params.append('isActive', query.isActive.toString());
    if (query?.search) params.append('search', query.search);

    const queryString = params.toString() ? `?${params.toString()}` : '';
    return this.makeRequest<Staff[]>(`/staff${queryString}`, {
      method: 'GET',
    });
  }

  // Get Single Staff by NIM
  async getStaffByNim(nim: string): Promise<ApiResponse<Staff>> {
    return this.makeRequest<Staff>(`/staff/${nim}`, {
      method: 'GET',
    });
  }

  // Update Staff
  async updateStaff(nim: string, data: UpdateStaffRequest): Promise<ApiResponse<Staff>> {
    return this.makeRequest<Staff>(`/staff/${nim}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Delete Staff
  async deleteStaff(nim: string): Promise<ApiResponse<DeleteStaffResponse>> {
    return this.makeRequest<DeleteStaffResponse>(`/staff/${nim}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();