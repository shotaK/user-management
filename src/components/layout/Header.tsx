import { type FC } from 'react'
import { Typography } from '@mui/joy'

const Header: FC = () => {
  return (
    <>
      <Typography level='h4' component='h1'>
        User management
      </Typography>
      <Typography
        level='body-sm'
        sx={{
          marginBottom: '1rem',
        }}
      >
        Invite, manage and update users.
      </Typography>
    </>
  )
}

export default Header
