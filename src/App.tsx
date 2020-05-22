import React from 'react'
import { GetJoke, Header, Joke, Favorites } from './components'
import { AppContext } from './store/context';

const App = () => {
  const { state, getRandomJoke } = React.useContext(AppContext)

  React.useEffect(() => {
    console.log(state)
    getRandomJoke()
  }, [])
  return (
    <div>
      <main>
        <Header />
        <GetJoke />
        <Joke />
      </main>
      <aside>
        <Favorites />
      </aside>
    </div>
  );
}

export default App
