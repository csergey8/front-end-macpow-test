import React from 'react'
import { GetJoke, Header, Joke, Favorites } from './components'
import { AppContext } from './store/context'
import styles from './App.module.scss'

const App = () => {
  const { state } = React.useContext(AppContext)

  React.useEffect(() => {
    console.log(state)
    //getRandomJoke()
  }, [])
  return (
    <div className={styles.root}>
      <main className={styles.mainContainer}>
        <Header />
        <GetJoke />
        {state.currentJoke && <Joke item={state.currentJoke}/>}
      </main>
      <aside>
        <Favorites />
      </aside>
    </div>
  );
}

export default App
