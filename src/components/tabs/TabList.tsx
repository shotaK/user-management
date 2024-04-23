import { type FC, ReactNode } from 'react'
import { TabList as TabListLib, tabClasses } from '@mui/joy'
import { PropsType } from 'config/types/general'
import { primaryText } from 'config/styles/colors'

const TabList: FC<PropsType<typeof TabListLib> & { children: ReactNode }> = ({
  children,
  ...props
}) => {
  return (
    <TabListLib
      sx={{
        [`&& .${tabClasses.root}`]: {
          flex: 'initial',
          bgcolor: 'transparent',
          padding: 0,
          marginRight: '1rem',
          fontWeight: 500,
          '&:hover': {
            bgcolor: 'transparent',
          },
          [`&.${tabClasses.selected}`]: {
            color: primaryText,
            '&::after': {
              height: 3,
              bgcolor: 'primary.500',
            },
          },
        },
      }}
      {...props}
    >
      {children}
    </TabListLib>
  )
}

export default TabList
