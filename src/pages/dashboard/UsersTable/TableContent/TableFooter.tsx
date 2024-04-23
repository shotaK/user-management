import * as React from 'react'
import { type FC } from 'react'
import Box from '@mui/joy/Box'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Select from '@mui/joy/Select'
import Option from '@mui/joy/Option'
import Typography from '@mui/joy/Typography'
import keyboardArrowLeftIcon from 'assets/icons/arrow-left.svg'
import keyboardArrowRightIcon from 'assets/icons/arrow-right.svg'
import { IUser } from 'appState/features/users/usersTypes'
import { Button } from '@mui/joy'
import { useAppSelector } from 'appState/hooks'
import { usersSelector } from 'appState/features/users/usersSelectors'

function labelDisplayedRows({
  from,
  to,
  count,
}: {
  from: number
  to: number
  count: number
}) {
  return `${from} to ${to} of ${count !== -1 ? count : `more than ${to}`} entries`
}

const TableFooter: FC<{
  rows: IUser[]
  page: number
  rowsPerPage: number
  setPage: (page: number) => void
  setRowsPerPage: (rowsPerPage: number) => void
}> = ({ rows, setPage, setRowsPerPage, page, rowsPerPage }) => {
  const { total } = useAppSelector(usersSelector)

  const hasNextPage = total > page * rowsPerPage

  const handleChangePage = (newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: any, newValue: number | null) => {
    setRowsPerPage(parseInt(newValue!.toString(), 10))
    setPage(1)
  }

  return (
    <tfoot>
      <tr>
        <td colSpan={6}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              <Typography>Showing</Typography>
              <Typography textAlign='center' sx={{ minWidth: 80 }}>
                {labelDisplayedRows({
                  from: rows.length === 0 ? 0 : ((page - 1) * rowsPerPage) + 1,
                  to: Math.min(page * rowsPerPage, total),
                  count: total,
                })}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Button
                size='sm'
                color='neutral'
                variant='plain'
                disabled={page === 1}
                onClick={() => handleChangePage(page - 1)}
                startDecorator={<img src={keyboardArrowLeftIcon} alt='Back' />}
              >
                Back
              </Button>
              <Typography color='neutral'>{page}</Typography>
              <Button
                size='sm'
                color='neutral'
                variant='plain'
                disabled={!hasNextPage}
                onClick={() => handleChangePage(page + 1)}
                endDecorator={<img src={keyboardArrowRightIcon} alt='Next' />}
              >
                Next
              </Button>
            </Box>

            <FormControl
              orientation='horizontal'
              size='sm'
              sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
            >
              <FormLabel>Show</FormLabel>
              <Select
                onChange={handleChangeRowsPerPage}
                value={rowsPerPage}
                variant='soft'
                sx={{ boxShadow: 'none' }}
              >
                <Option value={10}>10</Option>
                <Option value={15}>15</Option>
                <Option value={30}>30</Option>
              </Select>
              <Typography>per page</Typography>
            </FormControl>
          </Box>
        </td>
      </tr>
    </tfoot>
  )
}

export default TableFooter
