import { type FC, FormEvent, useMemo } from 'react'
import FormLabel from '@mui/joy/FormLabel'
import { Box, Button, IconButton, Input } from '@mui/joy'
import deleteIcon from 'assets/icons/bin-neutral.svg'
import deleteActiveIcon from 'assets/icons/bin.svg'
import addIcon from 'assets/icons/add-neutral.svg'
import { useAppDispatch } from 'appState/hooks'
import { inviteUsersAction } from 'appState/features/users/usersActions'

const InviteUsersForm: FC<{
  closeModal: () => void
  emailsList: string[]
  setEmailsList: (emails: string[]) => void
  handleInviteUsers: () => void
}> = ({ closeModal, emailsList, setEmailsList, handleInviteUsers }) => {
  const dispatch = useAppDispatch()

  const handleAddEmail = () => {
    setEmailsList([...emailsList, ''])
  }

  const updateEmail = (index: number, value: string) => {
    const newEmailsList = [...emailsList]
    newEmailsList[index] = value
    setEmailsList(newEmailsList)
  }

  const removeEmail = (index: number) => {
    const newEmailsList = [...emailsList]
    newEmailsList.splice(index, 1)
    setEmailsList(newEmailsList)
  }

  const inviteUsers = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    dispatch(inviteUsersAction({ emails: emailsList }))
    handleInviteUsers()
    closeModal()
  }

  const anyEmailEmpty = useMemo(() => {
    return emailsList.some((email) => email === '')
  }, [emailsList])

  return (
    <form onSubmit={(event) => inviteUsers(event)}>
      <Box>
        <FormLabel sx={{ mb: 2 }}>Email *</FormLabel>

        {emailsList.map((email, index) => (
          <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Input
              type='email'
              name={`email-${index}`}
              required
              value={email}
              placeholder={`Email ${index + 1}`}
              onChange={(e) => {
                updateEmail(index, e.target.value)
              }}
              sx={{ flexGrow: 1 }}
            />
            <IconButton
              variant='outlined'
              color={emailsList.length === 1 ? 'neutral' : 'danger'}
              disabled={emailsList.length === 1}
              onClick={() => {
                removeEmail(index)
              }}
            >
              <img
                width={20}
                src={emailsList.length === 1 ? deleteIcon : deleteActiveIcon}
                alt='Delete'
              />
            </IconButton>
          </Box>
        ))}

        <Box>
          <Button
            startDecorator={<img src={addIcon} alt='Add' />}
            variant='outlined'
            color='neutral'
            sx={{ mb: 2 }}
            onClick={handleAddEmail}
          >
            Add more
          </Button>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            variant='outlined'
            color='neutral'
            sx={{ mt: 2 }}
            onClick={closeModal}
          >
            Cancel
          </Button>

          <Button
            variant='solid'
            color='primary'
            disabled={anyEmailEmpty}
            sx={{ mt: 2 }}
            type="submit"
          >
            Send invites {emailsList.length > 0 ? `(${emailsList.length})` : ''}
          </Button>
        </Box>
      </Box>
    </form>
  )
}

export default InviteUsersForm
