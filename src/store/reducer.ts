import { JokeState } from './context'

enum jokesActions {
    GET_CATEGORIES = '@@JOKE/GET_CATEGORIES',
    GET_RANDOM_JOKE = '@@JOKE/GET_RANDOM_JOKE',
    GET_JOKE_BY_SEARCH_TEXT = '@@JOKE/GET_JOKE_BY_SEARCH_TEXT',
    GET_JOKE_BY_CATEGORY = '@@JOKE/GET_JOKE_BY_CATEGORY',
    CLEAR_CURRENT_JOKE = '@@JOKE/CLEAR_CURRENT_JOKE',
    ADD_JOKE_TO_FAVORITE = '@@JOKE/ADD_JOKE_TO_FAVORITE',
    REMOVE_JOKE_FROM_FAVORITE = '@@JOKE/REMOVE_JOKE_FROM_FAVORITE',
}

const handlers: any = {
    DEFAULT: (state: any) => state,
    [jokesActions.GET_CATEGORIES]: (state: JokeState, action: any) => ({ ...state, categories: action.payload }),
    [jokesActions.GET_RANDOM_JOKE]: (state: JokeState, action: any) => ({ ...state, currentJoke: action.payload }),
    [jokesActions.CLEAR_CURRENT_JOKE]: (state: JokeState, action: any) => ({ ...state, currentJoke: null })
}

const jokesReducer = (state: JokeState, action: any) => {
    const handle: any = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}

export { jokesReducer, jokesActions }
