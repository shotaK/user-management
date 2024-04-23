import { RootState } from 'appState/store'

export const usersSelector = (state: RootState) => state.users.users
export const usersGetApiSelector = (state: RootState) => state.users.getUsersApi
