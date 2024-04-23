import { RootState } from 'appState/store'
import { createSelector } from '@reduxjs/toolkit'

export const usersSelector = (state: RootState) => state.users.users
export const usersListSelector = (state: RootState) => usersSelector(state).list
export const usersGetApiSelector = (state: RootState) => state.users.getUsersApi

export const usersByIdsSelector = createSelector(
  [usersListSelector, (state, ids: string[]) => ids],
  (users, ids) => {
    return users.filter((user) => ids.includes(user.id))
  },
)
