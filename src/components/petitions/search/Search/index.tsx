// Components
import * as Components from './components'

function Search() {

  return (
    <div className="flex items-center gap-2 rounded-lg mr-auto mb-8">
      <Components.Header />
      <div className="relative flex flex-col gap-1">
        <Components.SearchInput />
        <Components.ClearBtn />
      </div>
    </div>
  )
}

export default Search