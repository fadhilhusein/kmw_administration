// API Configuration
const API_BASE_URL = 'https://kmw-backend-production.up.railway.app/api';

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

export interface LoginAccountRequest {
  nim: string;
  password: string;
}

// API Service Class
class ApiService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
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
}

export const apiService = new ApiService();