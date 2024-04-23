import { createAsyncThunk, nanoid } from '@reduxjs/toolkit'
import { fetchUsers } from 'appState/features/users/usersApi'
import { AppDispatch } from 'appState/store'
import { IUser } from 'appState/features/users/usersTypes'
import { inviteUsers } from 'appState/features/users/usersSlice'

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

export const inviteUsersAction =
  ({ emails }: { emails: string[] }) =>
  (dispatch: AppDispatch) => {
    const users: IUser[] = emails.map((email) => {
      return {
        id: nanoid(8),
        email,
        active: false,
        created: new Date().toISOString(),
        name: '',
        profileImgSrc: '',
      }
    })

    dispatch(inviteUsers(users))
  }
