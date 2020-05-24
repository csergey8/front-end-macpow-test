import { JokeState, JokeType } from "./context";

enum jokesActions {
  GET_CATEGORIES = "@@JOKE/GET_CATEGORIES",
  SET_JOKE = "@@JOKE/SET_JOKE",
  SET_JOKES = "@@JOKE/SET_JOKES",
  CLEAR_JOKES = "@@JOKE/CLEAR_JOKES",
  ADD_JOKE_TO_FAVOURITE = "@@JOKE/ADD_JOKE_TO_FAVOURITE",
  REMOVE_JOKE_FROM_FAVOURITE = "@@JOKE/REMOVE_JOKE_FROM_FAVOURITE",
  SET_JOKES_FROM_STORAGE = "@@JOKE/SET_JOKES_FROM_STORAGE",
}

const handlers: any = {
  DEFAULT: (state: any) => state,
  [jokesActions.GET_CATEGORIES]: (state: JokeState, action: any) => ({
    ...state,
    categories: action.payload,
  }),
  [jokesActions.SET_JOKES]: (state: JokeState, action: any) => ({
    ...state,
    currentJokes: action.payload.slice(0, 5),
  }),
  [jokesActions.SET_JOKE]: (state: JokeState, action: any) => ({
    ...state,
    currentJokes: [action.payload],
  }),
  [jokesActions.CLEAR_JOKES]: (state: JokeState) => ({
    ...state,
    currentJokes: null,
  }),
  [jokesActions.ADD_JOKE_TO_FAVOURITE]: (state: JokeState, action: any) => {
    if (
      (state.favouriteJokes as JokeType[])
        .map((joke) => joke.id)
        .includes(action.payload.id)
    ) {
      return state;
    }
    const favouriteJokes = [...state.favouriteJokes, action.payload];
    localStorage.setItem("JOKES_FAVOURITE", JSON.stringify(favouriteJokes));
    return {
      ...state,
      favouriteJokes,
    };
  },
  [jokesActions.REMOVE_JOKE_FROM_FAVOURITE]: (
    state: JokeState,
    action: any
  ) => {
    const favouriteJokes = state.favouriteJokes.filter(
      (joke) => joke.id !== action.id
    );
    localStorage.setItem("JOKES_FAVOURITE", JSON.stringify(favouriteJokes));
    return {
      ...state,
      favouriteJokes,
    };
  },
  [jokesActions.SET_JOKES_FROM_STORAGE]: (state: JokeState, action: any) => ({
    ...state,
    favouriteJokes: action.payload,
  }),
};

const jokesReducer = (state: JokeState, action: any) => {
  const handle: any = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};

export { jokesReducer, jokesActions };
