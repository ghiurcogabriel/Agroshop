import { Category, Highlights, Tire } from './types';

const resolveApiBase = (): string => {
  const configured = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

  if (!configured) {
    return 'http://localhost:3002/api/v1';
  }

  // If someone sets /api/v1, force backend host to avoid hitting Next.js routes.
  if (configured.startsWith('/')) {
    return `http://localhost:3002${configured}`;
  }

  return configured.replace(/\/+$/, '');
};

export const API_BASE = resolveApiBase();

const fetchJson = async <T>(path: string): Promise<T> => {
  const response = await fetch(`${API_BASE}${path}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`API error ${response.status} for ${path}`);
  }

  return response.json() as Promise<T>;
}

const fetchJsonWithAuth = async <T>(
  path: string,
  token: string,
  options?: RequestInit,
): Promise<T> => {
  const response = await fetch(`${API_BASE}${path}`, {
    cache: 'no-store',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options?.headers ?? {}),
    },
  });

  if (!response.ok) {
    let message = `API error ${response.status}`;

    try {
      const data = (await response.json()) as { message?: string | string[] };
      if (Array.isArray(data.message)) {
        message = data.message.join(', ');
      } else if (typeof data.message === 'string' && data.message.length > 0) {
        message = data.message;
      }
    } catch {
      // Keep fallback.
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return null as T;
  }

  return response.json() as Promise<T>;
};

export interface AdminLoginResponse {
  accessToken: string;
  role: 'admin';
  username: string;
}

export interface AdminLoginPayload {
  username: string;
  password: string;
}

export interface AdminTirePayload {
  brand: string;
  width: string;
  height: string;
  diameter: string;
  price: number;
  description: string;
  imageUrl: string;
  categoryId?: string;
  addedById?: string;
}

export interface AdminOrderItemResponse {
  id: string;
  tireId: string;
  diameter: string;
  width: string;
  height: string;
  brand: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface AdminOrderResponse {
  id: string;
  orderNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  county: string;
  total: number;
  status: string;
  notes?: string | null;
  createdAt?: string;
  updatedAt?: string;
  items: AdminOrderItemResponse[];
}

export interface AdminUser {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  role?: string;
}

export const adminLogin = async (
  payload: AdminLoginPayload,
): Promise<AdminLoginResponse> => {
  const response = await fetch(`${API_BASE}/auth/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Autentificare esuata. Verifica utilizatorul si parola.');
  }

  return response.json() as Promise<AdminLoginResponse>;
};

export const adminGetProducts = async (token: string): Promise<Tire[]> => {
  return fetchJsonWithAuth<Tire[]>('/tires', token);
};

export const adminCreateProduct = async (
  token: string,
  payload: AdminTirePayload,
): Promise<Tire> => {
  return fetchJsonWithAuth<Tire>('/tires/add-tires', token, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

export const adminUpdateProduct = async (
  token: string,
  id: string,
  payload: Partial<AdminTirePayload>,
): Promise<Tire> => {
  return fetchJsonWithAuth<Tire>(`/tires/${id}`, token, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
};

export const adminDeleteProduct = async (
  token: string,
  id: string,
): Promise<{ success: boolean; id: string }> => {
  return fetchJsonWithAuth<{ success: boolean; id: string }>(`/tires/${id}`, token, {
    method: 'DELETE',
  });
};

export const adminGetOrders = async (token: string): Promise<AdminOrderResponse[]> => {
  return fetchJsonWithAuth<AdminOrderResponse[]>('/orders/admin', token);
};

export const adminGetOrderById = async (
  token: string,
  id: string,
): Promise<AdminOrderResponse> => {
  return fetchJsonWithAuth<AdminOrderResponse>(`/orders/admin/${id}`, token);
};

export const adminUpdateOrderStatus = async (
  token: string,
  id: string,
  status: string,
): Promise<AdminOrderResponse> => {
  return fetchJsonWithAuth<AdminOrderResponse>(`/orders/admin/${id}/status`, token, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
};

export const adminGetUsers = async (token: string): Promise<AdminUser[]> => {
  return fetchJsonWithAuth<AdminUser[]>('/users', token);
};

export interface CreateOrderItemPayload {
  tireId: string;
  diameter: string;
  width: string;
  height: string;
  brand: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface CreateOrderPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  county: string;
  notes?: string;
  items: CreateOrderItemPayload[];
}

export interface OrderResponse extends CreateOrderPayload {
  id: string;
  orderNumber: string;
  total: number;
  status: string;
  createdAt?: string;
  updatedAt?: string;
  items: Array<CreateOrderItemPayload & { id: string }>;
}

export const createOrder = async (payload: CreateOrderPayload): Promise<OrderResponse> => {
  const response = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let message = 'Nu am putut finaliza comanda.';
    try {
      const data = (await response.json()) as { message?: string | string[] };
      if (Array.isArray(data.message)) {
        message = data.message.join(', ');
      } else if (typeof data.message === 'string' && data.message.length > 0) {
        message = data.message;
      }
    } catch {
      // Keep fallback message when response body is not JSON.
    }
    throw new Error(message);
  }

  return response.json() as Promise<OrderResponse>;
}

export const getOrderById = async (id: string): Promise<OrderResponse | null> => {
  try {
    return await fetchJson<OrderResponse>(`/orders/${id}`);
  } catch {
    return null;
  }
}

export const getCategories = async (): Promise<Category[]> => {
  try {
    return await fetchJson<Category[]>('/categories');
  } catch {
    return [];
  }
}

export const getHighlights = async (): Promise<Highlights> => {
  try {
    return await fetchJson<Highlights>('/tires/highlights');
  } catch {
    return { recent: [], premium: [] };
  }
}

export const getTires = async (): Promise<Tire[]> => {
  try {
    return await fetchJson<Tire[]>('/tires');
  } catch {
    return [];
  }
}

export const getTireById = async (id: string): Promise<Tire | null> => {
  try {
    return await fetchJson<Tire>(`/tires/${id}`);
  } catch {
    return null;
  }
}
