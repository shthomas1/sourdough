/**
 * Client-side API utilities for making requests to the backend server
 */

const API_BASE_URL = import.meta.env.PROD ? '/api' : 'http://localhost:3001/api'

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

/**
 * Generic API request function
 */
async function apiRequest<T>(
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
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.error || `HTTP error! status: ${response.status}`,
      }
    }

    return data
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    }
  }
}

/**
 * Create a new record
 */
export async function createRecord<T>(
  table: string,
  data: Record<string, unknown>
): Promise<ApiResponse<T>> {
  return apiRequest<T>(`/${table}`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

/**
 * Read all records (with optional filters)
 */
export async function readRecords<T>(
  table: string,
  filters?: Record<string, unknown>
): Promise<ApiResponse<T[]>> {
  const queryString = filters
    ? '?' + new URLSearchParams(filters as Record<string, string>).toString()
    : ''
  return apiRequest<T[]>(`/${table}${queryString}`, {
    method: 'GET',
  })
}

/**
 * Read a single record by ID
 */
export async function readRecordById<T>(
  table: string,
  id: string | number
): Promise<ApiResponse<T>> {
  return apiRequest<T>(`/${table}/${id}`, {
    method: 'GET',
  })
}

/**
 * Update a record
 */
export async function updateRecord<T>(
  table: string,
  id: string | number,
  data: Record<string, unknown>
): Promise<ApiResponse<T>> {
  return apiRequest<T>(`/${table}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

/**
 * Delete a record
 */
export async function deleteRecord(
  table: string,
  id: string | number
): Promise<ApiResponse<void>> {
  return apiRequest<void>(`/${table}/${id}`, {
    method: 'DELETE',
  })
}
