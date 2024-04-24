import { type FC, useState } from 'react'
import {
  Dropdown,
  ListDivider,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
} from '@mui/joy'
import dotsMenu from 'assets/icons/dots-menu.svg'
import userLockIcon from 'assets/icons/user-lock.svg'
import editIcon from 'assets/icons/edit.svg'
import binIcon from 'assets/icons/bin.svg'
import UserEditModal from 'pages/dashboard/UsersTable/EntityMenu/UserEditModal'
import { IUser } from 'appState/features/users/usersTypes'

const EntityMenu: FC<{ user: IUser; handleDelete: () => void }> = ({
  user,
  handleDelete,
}) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Dropdown>
        <MenuButton
          variant='plain'
          onClick={(event) => {
            if (event) {
              event.stopPropagation()
            }
          }}
        >
          <img src={dotsMenu} alt='Actions' />
        </MenuButton>
        <Menu placement='bottom-end' color='neutral'>
          <MenuItem>
            <ListItemDecorator
              sx={{
                '--ListItemDecorator-size': '1.5rem',
              }}
            >
              <img src={userLockIcon} alt='Permissions' />
            </ListItemDecorator>
            Permissions
          </MenuItem>
          <MenuItem
            onClick={() => {
              setOpen(true)
            }}
          >
            <ListItemDecorator
              sx={{
                '--ListItemDecorator-size': '1.5rem',
              }}
            >
              <img src={editIcon} alt='Edit' />
            </ListItemDecorator>
            Edit
          </MenuItem>
          <ListDivider />
          <MenuItem
            onClick={(event) => {
              event.stopPropagation()
              handleDelete()
            }}
          >
            <ListItemDecorator
              sx={{
                '--ListItemDecorator-size': '1.5rem',
              }}
            >
              <img src={binIcon} alt='Delete' width={16} />
            </ListItemDecorator>
            Delete
          </MenuItem>
        </Menu>
      </Dropdown>

      <UserEditModal open={open} setOpen={setOpen} user={user} />
    </>
  )
}

export default EntityMenu
