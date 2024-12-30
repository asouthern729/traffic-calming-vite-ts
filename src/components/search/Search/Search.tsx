import styles from './Search.module.css'

// Types
import { SearchProps } from './types'

// Components
import { SearchInput, ClearSearchBtn } from './components'

function Search({ placeholder }: SearchProps) {

  return (
    <div data-testid="search" className={styles.container}>

      <h2 className={styles.header}>Search</h2>

      <div className="w-full">
        <SearchInput placeholder={placeholder} />
        <ClearSearchBtn />
      </div>
      
    </div>
  )
}

export default Search