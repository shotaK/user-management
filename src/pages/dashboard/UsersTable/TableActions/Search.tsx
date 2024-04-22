import { type FC } from 'react'

import searchIcon from 'assets/icons/search-loop.svg'
import { Input } from '@mui/joy'

const Search: FC = () => {
  return (
    <Input
      startDecorator={<img src={searchIcon} alt='Search' />}
      placeholder='Search'
    />
  )
}

export default Search
