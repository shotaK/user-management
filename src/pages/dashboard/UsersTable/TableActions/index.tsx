import { type FC } from 'react'
import { Box, Button } from '@mui/joy'

import columns from 'assets/icons/columns.svg'
import density from 'assets/icons/density.svg'
import Search from 'pages/dashboard/UsersTable/TableActions/Search'

const TableActions: FC<{
  setSearchTerm: (term: string) => void
}> = ({ setSearchTerm }) => {
  return (
    <Box
      sx={{
        p: '0.75rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        borderTop: '1px lightGrey solid',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '0.75rem',
        }}
      >
        <Button
          variant='outlined'
          color='neutral'
          startDecorator={<img src={columns} alt='Columns' />}
        >
          Columns
        </Button>
        <Button
          variant='outlined'
          color='neutral'
          startDecorator={<img src={density} alt='Density' />}
        >
          Density
        </Button>
      </Box>
      <Search setSearchTerm={setSearchTerm} />
    </Box>
  )
}

export default TableActions
