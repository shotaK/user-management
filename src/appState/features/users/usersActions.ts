import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchUsers } from 'appState/features/users/usersApi'

export const fetchUsersAction = createAsyncThunk(
  'users/fetchUsers',
  async ({ page = 1, limit = 10 }: { page: number; limit: number }) => {
    try {
      return await fetchUsers({ page, limit })
    } catch (error) {
      throw new Error('There was an issue fetching users. Please try again.')
    }
  },
)
