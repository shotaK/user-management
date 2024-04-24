import { type FC, useState } from 'react'
import { Box, Button, Modal, ModalClose, Sheet, Typography } from '@mui/joy'
import binIcon from 'assets/icons/bin-neutral.svg'
import { usersByIdsSelector } from 'appState/features/users/usersSelectors'
import { useAppDispatch, useAppSelector } from 'appState/hooks'
import { deleteUsersByIds } from 'appState/features/users/usersSlice'

const DeleteUsersModal: FC<{
  open: boolean
  setOpen: (open: boolean) => void
  selected: string[]
  setSelected: (selected: string[]) => void
  setDeleteModalSnackbarOpen: ({
    numOfUsers,
    open,
  }: {
    numOfUsers: number
    open: boolean
  }) => void
}> = ({ open, setOpen, selected, setSelected, setDeleteModalSnackbarOpen }) => {
  const dispatch = useAppDispatch()
  const numberOfUsers = selected.length

  const deleteUsers = () => {
    dispatch(deleteUsersByIds(selected))
    setOpen(false)
    setDeleteModalSnackbarOpen({ numOfUsers: numberOfUsers, open: true })
    setSelected([])
  }


  const users = useAppSelector((state) => usersByIdsSelector(state, selected))

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='delete-users'
        aria-describedby='delete-users-modal'
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant='outlined'
          sx={{
            width: '30rem',
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <Box
            sx={{
              paddingBottom: 3,
              mb: 3,
              borderBottom: '1px solid #D6D4DC',
            }}
          >
            <ModalClose />
            <Typography
              startDecorator={<img src={binIcon} alt='Delete users' />}
              level='body-md'
              component='h2'
            >
              Delete: {numberOfUsers} users
            </Typography>
          </Box>

          <Box>
            <Typography>Are you sure you want to delete:</Typography>
            <ul>
              {users.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
            <Typography color='danger'>
              NOTE: This action is permanent.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant='outlined'
              color='neutral'
              sx={{ mt: 2 }}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              variant='solid'
              color='danger'
              sx={{ mt: 2 }}
              onClick={deleteUsers}
            >
              Yes, delete ({numberOfUsers})
            </Button>
          </Box>
        </Sheet>
      </Modal>
    </>
  )
}

export default DeleteUsersModal
