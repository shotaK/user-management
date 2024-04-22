import { type FC, ReactNode } from 'react'
import { Tab as TabLib } from '@mui/joy'
import { PropsType } from 'config/types/general'

export const Tab: FC<PropsType<typeof TabLib> & { children: ReactNode }> = ({
  children,
  ...props
}) => {
  return (
    <TabLib color='primary' {...props}>
      {children}
    </TabLib>
  )
}
