import { type FC, FormEvent, useState } from 'react'
import {
  Box,
  Button,
  Input,
  Modal,
  ModalClose,
  Sheet,
  Typography,
} from '@mui/joy'
import editIcon from 'assets/icons/edit.svg'
import { useAppDispatch } from 'appState/hooks'
import { IUser } from 'appState/features/users/usersTypes'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import { updateUserById } from 'appState/features/users/usersSlice'
import SnackbarHideDuration from 'components/snackbarHideDuration'

const UserEditModal: FC<{
  open: boolean
  setOpen: (open: boolean) => void
  user: IUser
}> = ({ open, setOpen, user }) => {
  const dispatch = useAppDispatch()
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const updateUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const formJson = Object.fromEntries((formData as any).entries())

    dispatch(updateUserById({ ...formJson, id: user.id }))

    setOpen(false)
    setSnackbarOpen(true)
  }

  return (
    <>
      <Modal
        open={open}
        onClick={(event) => event.stopPropagation()}
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
          <form onSubmit={(event) => updateUser(event)}>
            <Box
              sx={{
                paddingBottom: 3,
                mb: 3,
                borderBottom: '1px solid #D6D4DC',
              }}
            >
              <ModalClose />
              <Typography
                startDecorator={<img src={editIcon} alt='Edit user' />}
                level='body-md'
                component='h2'
              >
                Edit: {user?.name}
              </Typography>
            </Box>

            <Box>
              <FormControl sx={{ mb: 2 }}>
                <FormLabel>Name</FormLabel>
                <Input type='text' name='name' defaultValue={user?.name} />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  required
                  name='email'
                  type='email'
                  defaultValue={user?.email}
                />
              </FormControl>
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
                type='submit'
                variant='solid'
                color='primary'
                sx={{ mt: 2 }}
              >
                Update
              </Button>
            </Box>
          </form>
        </Sheet>
      </Modal>

      <SnackbarHideDuration
        text='User updated'
        open={snackbarOpen}
        duration={1000}
        color='success'
        horizontal='center'
        vertical='top'
        setOpen={setSnackbarOpen}
      />
    </>
  )
}

export default UserEditModal
