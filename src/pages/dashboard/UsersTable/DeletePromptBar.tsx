import { type FC } from 'react'
import { Box, Button, Typography } from '@mui/joy'
import { highLight } from 'config/styles/colors'
import binIcon from 'assets/icons/bin.svg'

const DeletePromptBar: FC = () => {
  return (
    <Box
      sx={{
        p: '0.75rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        borderTop: '1px lightGrey solid',
        backgroundColor: highLight,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography color='success'>2 rows selected</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: '0.75rem',
        }}
      >
        <Button
          variant='soft'
          color='danger'
          startDecorator={<img src={binIcon} alt='Delete' />}
        >
          Delete
        </Button>
        <Button variant='outlined' color='neutral'>
          Cancel
        </Button>
      </Box>
    </Box>
  )
}

export default DeletePromptBar
