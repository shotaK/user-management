import { type FC } from 'react'
import { Box } from '@mui/joy'

import HeadSection from 'pages/dashboard/UsersTable/HeadSection'
import TableActions from 'pages/dashboard/UsersTable/TableActions'
import DeletePromptBar from 'pages/dashboard/UsersTable/DeletePromptBar'
import TableSortAndSelection from 'pages/dashboard/UsersTable/TableItems'

const UsersTable: FC = () => {
  return (
    <Box sx={{ p: 0, border: '1px solid #12093129', borderRadius: '4px' }}>
      <HeadSection />
      <TableActions />
      <DeletePromptBar />

      <TableSortAndSelection />
    </Box>
  )
}

export default UsersTable
