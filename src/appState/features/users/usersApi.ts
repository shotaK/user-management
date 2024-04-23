import { IUser } from 'appState/features/users/usersTypes'
import { usersSeedData } from 'appState/features/users/usersSeedData'

export function fetchUsers({
  page = 1,
  limit = 10,
}: {
  page: number
  limit: number
}) {
  return new Promise<{ data: IUser[]; total: number }>((resolve) =>
    setTimeout(
      () =>
        resolve({
          data: usersSeedData.slice((page - 1) * limit, page * limit),
          total: 34,
        }),
      500,
    ),
  )
}
