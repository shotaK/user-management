export interface ApiCycleState {
  isLoading?: boolean
  isSuccess?: boolean
  error?: { message?: string } | null
}

export const apiStateDefaults: ApiCycleState = {
  isLoading: false,
  isSuccess: false,
  error: null,
}
