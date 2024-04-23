import Table from '@mui/joy/Table'
import Sheet from '@mui/joy/Sheet'
import Checkbox from '@mui/joy/Checkbox'
import { IUser } from 'appState/features/users/usersTypes'
import { TableOrder } from 'components/table'
import TableHead from 'pages/dashboard/UsersTable/TableContent/TableHead'
import { getComparator, stableSort } from 'utils/sort'
import DeletePromptBar from 'pages/dashboard/UsersTable/TableContent/DeletePromptBar'
import TableFooter from 'pages/dashboard/UsersTable/TableContent/TableFooter'
import { ChangeEvent, useState, MouseEvent, CSSProperties, FC } from 'react'
import { useAppSelector } from 'appState/hooks'
import { usersSelector } from 'appState/features/users/usersSelectors'
import { formatDate } from 'utils/date'
import { Chip } from '@mui/joy'

const TableContent: FC<{
  page: number
  rowsPerPage: number
  setPage: (page: number) => void
  setRowsPerPage: (rowsPerPage: number) => void
}> = ({ page, rowsPerPage, setPage, setRowsPerPage }) => {
  const [order, setOrder] = useState<TableOrder>('asc')
  const [orderBy, setOrderBy] = useState<keyof IUser>('name')
  const [selected, setSelected] = useState<readonly string[]>([])

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
      const newSelected = rows.map((n) => n.name)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const handleClick = (event: MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected: readonly string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
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

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const numSelected = selected.length

  return (
    <Sheet variant='plain' sx={{ width: '100%' }}>
      {numSelected > 0 && <DeletePromptBar numSelected={numSelected} />}
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
          {stableSort<IUser>(rows, getComparator(order, orderBy)).map(
            (row, index) => {
              const isItemSelected = isSelected(row.name)
              const labelId = `enhanced-table-checkbox-${index}`

              return (
                <tr
                  onClick={(event) => handleClick(event, row.name)}
                  role='checkbox'
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.name}
                  // selected={isItemSelected}
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
                  <td></td>
                </tr>
              )
            },
          )}
        </tbody>
        <TableFooter
          rows={rows}
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
