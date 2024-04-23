import { type FC } from 'react'

import searchIcon from 'assets/icons/search-loop.svg'
import { Input } from '@mui/joy'

const Search: FC<{
  setSearchTerm: (term: string) => void
}> = ({ setSearchTerm }) => {
  return (
    <Input
      startDecorator={<img src={searchIcon} alt='Search' />}
      placeholder='Search'
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  )
}

export default Search
