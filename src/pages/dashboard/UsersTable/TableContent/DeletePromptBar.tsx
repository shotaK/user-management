import { type FC, useState } from 'react'
import { Box, Button, Typography } from '@mui/joy'
import { highLight } from 'config/styles/colors'
import binIcon from 'assets/icons/bin.svg'

const DeletePromptBar: FC<{
  setDeleteModalOpen: (open: boolean) => void
  setSelected: (selected: string[]) => void
  selected: string[]
}> = ({ selected, setSelected, setDeleteModalOpen }) => {
  return (
    <>
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
          <Typography color='success'>
            {selected.length} rows selected
          </Typography>
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
            onClick={() => setDeleteModalOpen(true)}
          >
            Delete
          </Button>
          <Button
            variant='outlined'
            color='neutral'
            onClick={() => {
              setSelected([])
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default DeletePromptBar
