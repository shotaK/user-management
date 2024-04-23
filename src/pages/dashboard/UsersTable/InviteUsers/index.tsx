import { type FC, useState } from 'react'
import { Box, Button, Modal, ModalClose, Sheet, Typography } from '@mui/joy'
import inviteIcon from 'assets/icons/invite.svg'
import InviteUsersForm from 'pages/dashboard/UsersTable/InviteUsers/InviteUsersForm'
import SnackbarHideDuration from 'components/SnackbarHideDuration'

const InviteUsers: FC = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [emailsList, setEmailsList] = useState<string[]>([''])

  const closeModal = () => {
    setOpen(false)
    setEmailsList([''])
  }

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Invite Users</Button>

      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby='invite-users'
        aria-describedby='invite-users-to-portal'
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
              startDecorator={<img src={inviteIcon} alt='Invite users' />}
              level='body-md'
              component='h2'
            >
              Invite users
            </Typography>
          </Box>
          <InviteUsersForm
            emailsList={emailsList}
            setEmailsList={setEmailsList}
            closeModal={closeModal}
            handleInviteUsers={() => setSnackbarOpen(true)}
          />
        </Sheet>
      </Modal>

      <SnackbarHideDuration
        text={`${emailsList.length} users invited`}
        open={snackbarOpen}
        duration={1000}
        color='success'
        horizontal='center'
        vertical='top'
        setOpen={setSnackbarOpen}
      />
    </div>
  )
}

export default InviteUsers
