import { type FC, ReactNode } from 'react'
import { Sheet } from '@mui/joy'
import { lightGrey } from 'config/styles/colors'

const Content: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Sheet
      color='neutral'
      variant='solid'
      sx={() => {
        return {
          margin: '0 1rem 0 6rem',
          padding: '1.5rem',
          backgroundColor: lightGrey,
          borderRadius: '8px',
        }
      }}
    >
      {children}
    </Sheet>
  )
}

export default Content
