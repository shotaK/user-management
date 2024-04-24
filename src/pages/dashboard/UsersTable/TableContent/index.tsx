import Sheet from '@mui/joy/Sheet'
import Checkbox from '@mui/joy/Checkbox'
import { IUser } from 'appState/features/users/usersTypes'
import Table, { TableOrder } from 'components/table'
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
import { Box, Chip } from '@mui/joy'
import EntityMenu from 'pages/dashboard/UsersTable/EntityMenu'
import { selectionHandler } from 'components/table/helpers'
import DeleteUsersModal from 'pages/dashboard/UsersTable/TableContent/DeleteUsersModal'

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
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
  const [deleteModalSnackbarOpen, setDeleteModalSnackbarOpen] = useState({
    numOfUsers: 0,
    open: false,
  })

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
    let newSelected: string[] = selectionHandler({
      selectedIndex,
      id,
      selected,
    })

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
    <>
      <Sheet variant='plain' sx={{ width: '100%' }}>
        {numSelected > 0 && (
          <DeletePromptBar
            selected={selected}
            setSelected={setSelected}
            setDeleteModalOpen={setDeleteModalOpen}
          />
        )}
        <Table aria-labelledby='tableTitle' hoverRow>
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
              const imgSrc = row.profileImgSrc
                ? `/images/profile/${row.profileImgSrc}`
                : '/images/profile/no-user.png'

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
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <img src={imgSrc} alt={row.name} />
                      {row.name}
                    </Box>
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
                    <EntityMenu
                      user={row}
                      handleDelete={() => {
                        setSelected([row.id])
                        setDeleteModalOpen(true)
                      }}
                    />
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
      <DeleteUsersModal
        selected={selected}
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        setSelected={setSelected}
        setDeleteModalSnackbarOpen={setDeleteModalSnackbarOpen}
        deleteModalSnackbarOpen={deleteModalSnackbarOpen}
      />
    </>
  )
}

export default TableContent
