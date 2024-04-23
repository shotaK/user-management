import { type FC, useEffect, useState } from 'react'
import { Box, Skeleton } from '@mui/joy'

import HeadSection from 'pages/dashboard/UsersTable/HeadSection'
import TableActions from 'pages/dashboard/UsersTable/TableActions'
import TableContent from 'pages/dashboard/UsersTable/TableContent'
import { useAppDispatch, useAppSelector } from 'appState/hooks'
import { fetchUsersAction } from 'appState/features/users/usersActions'
import { usersGetApiSelector } from 'appState/features/users/usersSelectors'

const UsersTable: FC = () => {
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector(usersGetApiSelector)
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    dispatch(fetchUsersAction({ page, limit: rowsPerPage }))
  }, [dispatch, page, rowsPerPage])

  return (
    <Box sx={{ p: 0, border: '1px solid #12093129', borderRadius: '4px' }}>
      <HeadSection />

      {isLoading ? (
        <Box sx={{ padding: '0 1.5rem 1.5rem 1.5rem' }}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton
              key={index}
              animation='wave'
              variant='text'
              loading
              level='h2'
              sx={{ width: '100%' }}
            />
          ))}
        </Box>
      ) : (
        <>
          <TableActions setSearchTerm={setSearchTerm} />
          <TableContent
            page={page}
            rowsPerPage={rowsPerPage}
            setPage={setPage}
            setRowsPerPage={setRowsPerPage}
            searchTerm={searchTerm}
          />
        </>
      )}
    </Box>
  )
}

export default UsersTable
