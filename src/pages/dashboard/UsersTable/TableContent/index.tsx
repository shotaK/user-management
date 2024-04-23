import Table from '@mui/joy/Table'
import Sheet from '@mui/joy/Sheet'
import Checkbox from '@mui/joy/Checkbox'
import { IUser } from 'appState/features/users/usersTypes'
import { TableOrder } from 'components/table'
import TableHead from 'pages/dashboard/UsersTable/TableContent/TableHead'
import { getComparator, stableSort } from 'utils/sort'
import DeletePromptBar from 'pages/dashboard/UsersTable/TableContent/DeletePromptBar'
import TableFooter from 'pages/dashboard/UsersTable/TableContent/TableFooter'
import {
  ChangeEvent,
  CSSProperties,
  FC,
  MouseEvent,
  useMemo,
  useState,
} from 'react'
import { useAppSelector } from 'appState/hooks'
import { usersSelector } from 'appState/features/users/usersSelectors'
import { formatDate } from 'utils/date'
import { Chip } from '@mui/joy'
import EntityMenu from 'pages/dashboard/UsersTable/EntityMenu'

const TableContent: FC<{
  page: number
  rowsPerPage: number
  setPage: (page: number) => void
  setRowsPerPage: (rowsPerPage: number) => void
  searchTerm: string
}> = ({ page, rowsPerPage, setPage, setRowsPerPage, searchTerm }) => {
  const [order, setOrder] = useState<TableOrder>('asc')
  const [orderBy, setOrderBy] = useState<keyof IUser>('name')
  const [selected, setSelected] = useState<string[]>([])

  const { list: rows } = useAppSelector(usersSelector)

  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof IUser,
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const handleClick = (event: MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected: string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }

    setSelected(newSelected)
  }

  const isSelected = (name: string) => selected.indexOf(name) !== -1

  const numSelected = selected.length

  const usersSearchTermFiltered = useMemo(() => {
    return !searchTerm
      ? rows
      : rows.filter(
          (row) =>
            row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.email.toLowerCase().includes(searchTerm.toLowerCase()),
        )
  }, [rows, searchTerm])

  return (
    <Sheet variant='plain' sx={{ width: '100%' }}>
      {numSelected > 0 && (
        <DeletePromptBar selected={selected} setSelected={setSelected} />
      )}
      <Table
        aria-labelledby='tableTitle'
        hoverRow
        sx={{
          '--TableCell-headBackground': 'transparent',
          '--TableCell-paddingX': '1.5rem',
          '--TableCell-selectedBackground': (theme) =>
            theme.vars.palette.success.softBg,
          '& thead th:nth-child(1)': {
            width: '40px',
          },
          '& thead th:nth-child(2)': {
            width: '25%',
          },
          '& thead th:nth-child(3)': {
            width: '30%',
          },
        }}
      >
        <TableHead
          numSelected={selected.length}
          order={order}
          orderBy={orderBy}
          onSelectAllClick={handleSelectAllClick}
          onRequestSort={handleRequestSort}
          rowCount={rows.length}
        />
        <tbody>
          {stableSort<IUser>(
            usersSearchTermFiltered,
            getComparator(order, orderBy),
          ).map((row, index) => {
            const isItemSelected = isSelected(row.id)
            const labelId = `enhanced-table-checkbox-${index}`

            return (
              <tr
                onClick={(event) => handleClick(event, row.id)}
                role='checkbox'
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.id}
                style={
                  isItemSelected
                    ? ({
                        '--TableCell-dataBackground':
                          'var(--TableCell-selectedBackground)',
                        '--TableCell-headBackground':
                          'var(--TableCell-selectedBackground)',
                      } as CSSProperties)
                    : {}
                }
              >
                <th scope='row'>
                  <Checkbox
                    checked={isItemSelected}
                    slotProps={{
                      input: {
                        'aria-labelledby': labelId,
                      },
                    }}
                    sx={{ verticalAlign: 'top' }}
                  />
                </th>
                <th id={labelId} scope='row'>
                  {row.name}
                </th>
                <td>{row.email}</td>
                <td>{formatDate(row.created)}</td>
                <td>
                  {row.active ? (
                    <Chip color='success' variant='soft'>
                      active
                    </Chip>
                  ) : (
                    <Chip color='warning' variant='soft'>
                      invited
                    </Chip>
                  )}
                </td>
                <td>
                  <EntityMenu user={row} />
                </td>
              </tr>
            )
          })}
        </tbody>
        <TableFooter
          rows={usersSearchTermFiltered}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      </Table>
    </Sheet>
  )
}

export default TableContent
