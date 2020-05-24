import React from "react";
import { chuckNorrisApi } from "../api";
import { jokesReducer, jokesActions } from "./reducer";

export type JokeType = {
  categories: Array<string> | [];
  created_at: string;
  updated_at: string;
  icon_url: string;
  id: string;
  url: string;
  value: string;
  date: string;
};

export interface JokeState {
  categories: Array<string> | null;
  currentJokes: Array<JokeType> | null;
  favouriteJokes: Array<JokeType> | [];
}

const initialState: JokeState = {
  categories: null,
  currentJokes: null,
  favouriteJokes: [],
};

const AppContext = React.createContext<{
  state: JokeState;
  getJoke: (type: string, cat: any, text: any) => void;
  getCategories: () => void;
  addToFavourite: (joke: JokeType) => void;
  removeFromFavorite: (id: string) => void;
}>({
  state: initialState,
  getJoke: () => null,
  getCategories: () => null,
  addToFavourite: () => null,
  removeFromFavorite: () => null,
});

const AppProvider: React.FC = ({ children }) => {
  const jokeType: any = {
    random: chuckNorrisApi.getRandomJoke,
    categories: chuckNorrisApi.getJokeByCategory,
    search: chuckNorrisApi.getJokeBySearchText,
  };

  React.useEffect(() => {
    getJokesFromStorage();
  }, []);

  const [state, dispatch] = React.useReducer(jokesReducer, initialState);

  const getCategories = async () => {
    const { data } = await chuckNorrisApi.getCategories();
    dispatch({ type: jokesActions.GET_CATEGORIES, payload: data });
  };

  const getJokesFromStorage = async () => {
    const jokes = await JSON.parse(
      localStorage.getItem("JOKES_FAVOURITE") || "{}"
    );
    dispatch({ type: jokesActions.SET_JOKES_FROM_STORAGE, payload: jokes });
  };

  const addToFavourite = (joke: JokeType) => {
    dispatch({ type: jokesActions.ADD_JOKE_TO_FAVOURITE, payload: joke });
  };

  const removeFromFavorite = (id: string) => {
    dispatch({ type: jokesActions.REMOVE_JOKE_FROM_FAVOURITE, id });
  };

  const getJoke = async (type: string, cat: any, text: any) => {
    const res = await jokeType[type](cat || text);
    if (!res.data.result) {
      dispatch({ type: jokesActions.SET_JOKE, payload: res.data });
    } else {
      console.log(res.data.result.length);
      dispatch({ type: jokesActions.SET_JOKES, payload: res.data.result });
    }
  };

  return (
    <AppContext.Provider
      value={{
        state,
        getJoke,
        getCategories,
        addToFavourite,
        removeFromFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
