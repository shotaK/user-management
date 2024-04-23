import { type FC, useState } from 'react'
import { Box, Button, Typography } from '@mui/joy'
import { highLight } from 'config/styles/colors'
import binIcon from 'assets/icons/bin.svg'
import DeleteUsersModal from 'pages/dashboard/UsersTable/TableContent/DeleteUsersModal'

const DeletePromptBar: FC<{
  setSelected: (selected: string[]) => void
  selected: string[]
}> = ({ selected, setSelected }) => {
  const [open, setOpen] = useState<boolean>(false)

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
            onClick={() => setOpen(true)}
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

      <DeleteUsersModal
        selected={selected}
        open={open}
        setOpen={setOpen}
        setSelected={setSelected}
      />
    </>
  )
}

export default DeletePromptBar
