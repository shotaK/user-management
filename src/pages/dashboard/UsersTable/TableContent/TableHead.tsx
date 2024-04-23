import { MouseEvent, ChangeEvent, type FC } from 'react'
import { IUser } from 'appState/features/users/usersTypes'
import { TableOrder } from 'components/table'
import Checkbox from '@mui/joy/Checkbox'
import Link from '@mui/joy/Link'
import Box from '@mui/joy/Box'
import arrowSortIcon from 'assets/icons/sort-arrow.svg'
import { visuallyHidden } from '@mui/utils'

interface TableHeadProps {
  numSelected: number
  onRequestSort: (event: MouseEvent<unknown>, property: keyof IUser) => void
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void
  order: TableOrder
  orderBy: string
  rowCount: number
}

interface HeadCell {
  disablePadding: boolean
  id: keyof IUser | string
  label?: string
  sortable?: boolean
}

export const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    sortable: true,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'email',
    sortable: true,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'created',
    sortable: true,
    disablePadding: false,
    label: 'Created on',
  },
  {
    id: 'status',
    sortable: false,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'actions',
    sortable: false,
    disablePadding: false,
  },
]

const TableHead: FC<TableHeadProps> = ({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
}) => {
  const createSortHandler =
    (property: keyof IUser) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }

  return (
    <thead>
      <tr>
        <th>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            slotProps={{
              input: {
                'aria-label': 'select all',
              },
            }}
            sx={{ verticalAlign: 'sub' }}
          />
        </th>
        {headCells.map((headCell) => {
          const active = orderBy === headCell.id
          return (
            <th
              key={headCell.id}
              aria-sort={
                active
                  ? ({ asc: 'ascending', desc: 'descending' } as const)[order]
                  : undefined
              }
            >
              {headCell.id === 'actions' || !headCell?.sortable ? (
                headCell.label
              ) : (
                <Link
                  underline='none'
                  color='neutral'
                  textColor={active ? 'primary.plainColor' : undefined}
                  component='button'
                  onClick={createSortHandler(headCell.id as keyof IUser)}
                  fontWeight='lg'
                  startDecorator={
                    active ? (
                      <Box>
                        <img src={arrowSortIcon} alt='Sort' />
                      </Box>
                    ) : null
                  }
                  sx={{
                    '& svg': {
                      transition: '0.2s',
                      transform:
                        active && order === 'desc'
                          ? 'rotate(0deg)'
                          : 'rotate(180deg)',
                    },
                    '&:hover': { '& svg': { opacity: 1 } },
                  }}
                >
                  {headCell.label}
                  {active ? (
                    <Box component='span' sx={visuallyHidden}>
                      {order === 'desc'
                        ? 'sorted descending'
                        : 'sorted ascending'}
                    </Box>
                  ) : null}
                </Link>
              )}
            </th>
          )
        })}
      </tr>
    </thead>
  )
}

export default TableHead
