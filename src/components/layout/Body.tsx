import { type FC, ReactNode } from 'react'
import { Sheet } from '@mui/joy'
import { dark } from 'config/styles/colors'

const Body: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Sheet
      color='neutral'
      variant='solid'
      sx={() => {
        return {
          padding: '1rem 0',
          backgroundColor: dark,
        }
      }}
    >
      {children}
    </Sheet>
  )
}

export default Body
