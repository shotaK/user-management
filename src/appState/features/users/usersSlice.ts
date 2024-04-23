import { ApiCycleState, apiStateDefaults } from 'appState/types'
import { IUser } from 'appState/features/users/usersTypes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchUsersAction } from 'appState/features/users/usersActions'

interface UsersState {
  users: {
    list: IUser[]
    total: number
  }
  getUsersApi: ApiCycleState
}

const initialState: UsersState = {
  users: {
    list: [],
    total: 0,
  },
  getUsersApi: apiStateDefaults,
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    inviteUsers: (state, action: PayloadAction<IUser[]>) => {
      const { payload: users } = action
      state.users.list = [...state.users.list, ...users]
    },

    deleteUsersByIds: (state, action: PayloadAction<string[]>) => {
      const { payload: ids } = action
      state.users.list = state.users.list.filter(
        (user) => !ids.includes(user.id),
      )
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsersAction.fulfilled, (state, action) => {
      const { data, total } = action.payload
      state.users = {
        list: data,
        total: total,
      }
      state.getUsersApi = { isLoading: false, isSuccess: true, error: null }
    })

    builder.addCase(fetchUsersAction.pending, (state) => {
      state.getUsersApi = { isLoading: true, isSuccess: false, error: null }
    })

    builder.addCase(fetchUsersAction.rejected, (state, action) => {
      state.getUsersApi = {
        isLoading: false,
        isSuccess: false,
        error: {
          message: action.error.message,
        },
      }
    })
  },
})

export const { inviteUsers, deleteUsersByIds } = usersSlice.actions

export default usersSlice.reducer
