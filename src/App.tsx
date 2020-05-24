import React from "react";
import { GetJoke, Header, Joke, Favourite } from "./components";
import { AppContext, JokeType } from "./store/context";
import styles from "./App.module.scss";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const App = () => {
  const { state } = React.useContext(AppContext);
  const [sideSlideFavOpen, setSideSlideFavOpen] = React.useState(false);

  const asideClass = sideSlideFavOpen ? styles.show : "";

  const favouriteInSearchRender = () => {
    const favouriteInSearchJokes = state.currentJokes?.filter((joke) => {
      const favIds = (state.favouriteJokes as JokeType[]).map(
        (joke: JokeType) => joke.id
      );
      return favIds.includes(joke.id);
    });
    return favouriteInSearchJokes
      ? (favouriteInSearchJokes as JokeType[]).map((joke) => (
          <Joke likedJoke item={joke} />
        ))
      : null;
  };

  return (
    <div className={styles.root}>
      {sideSlideFavOpen && (
        <div
          onClick={() => setSideSlideFavOpen(false)}
          className={styles.sideWrapper}
        ></div>
      )}
      <main className={styles.mainContainer}>
        <section className={styles.sectionContainer}>
          <Header />
          <GetJoke />
          {state.currentJokes?.map((joke) => (
            <Joke item={joke} />
          ))}
          {favouriteInSearchRender()}
        </section>
      </main>
      <aside className={asideClass}>
        <Favourite items={state.favouriteJokes} />
      </aside>
      <div
        className={styles.favouriteBtnMenu}
        onClick={() => setSideSlideFavOpen(!sideSlideFavOpen)}
      >
        {!sideSlideFavOpen ? (
          <PauseCircleFilledIcon className={styles.favouriteBtnOpen} />
        ) : (
          <AddCircleIcon className={styles.favouriteBtnClose} />
        )}
        <div className={styles.favouriteBtnText}>Favourite</div>
      </div>
    </div>
  );
};

export default App;
