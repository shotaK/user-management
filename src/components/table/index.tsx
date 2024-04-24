import TableLib from '@mui/joy/Table'

import { type FC, ReactNode } from 'react'
import { PropsType } from 'config/types/general'

export type TableOrder = 'asc' | 'desc'

const Table: FC<PropsType<typeof TableLib> & { children: ReactNode }> = ({
  children,
  ...rest
}) => {
  return (
    <TableLib
      sx={{
        '--TableCell-headBackground': 'transparent',
        '--TableCell-paddingX': '1.5rem',
        '--TableCell-selectedBackground': (theme) =>
          theme.vars.palette.success.softBg,
        '& thead th:nth-child(1)': {
          width: '40px',
        },
        '& thead th:nth-child(2)': {
          width: '25%',
        },
        '& thead th:nth-child(3)': {
          width: '30%',
        },
      }}
      {...rest}
    >
      {children}
    </TableLib>
  )
}

export default Table
