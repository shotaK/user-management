import { type FC } from 'react'
import { Box, Typography } from '@mui/joy'
import usersIcon from 'assets/icons/users.svg'
import InviteUsers from 'pages/dashboard/UsersTable/InviteUsers'

const HeadSection: FC = () => {
  return (
    <Box sx={{ p: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <img src={usersIcon} alt='Users' />
        <Typography level='title-md' component='h5'>
          Users
        </Typography>
      </Box>

      <InviteUsers />
    </Box>
  )
}

export default HeadSection
