import React from 'react'
import { chuckNorrisApi } from '../api'
import { jokesReducer, jokesActions } from './reducer'

export type JokeType = {
    categories: Array<string> | []
    created_at: string
    updated_at: string
    icon_url: string
    id: string
    url: string
    value: string
    date: string
}

export interface JokeState {
    categories: Array<string> | null
    currentJoke: JokeType | null
    favoriteJokes: Array<JokeType> | null
}

const initialState: JokeState = {
    categories: null,
    currentJoke: null,
    favoriteJokes: null,
}

const AppContext = React.createContext<{state: JokeState; getRandomJoke: () => void; getCategories: () => void}>({ state: initialState, getRandomJoke: () => null, getCategories: () => null})

const AppProvider: React.FC = ({ children }) => {

    const [state, dispatch] = React.useReducer(jokesReducer, initialState)

    const getRandomJoke = async () => {
        const res = await chuckNorrisApi.getRandomJoke();
        dispatch({ type: jokesActions.GET_RANDOM_JOKE, payload: res.data })
    }

    const getCategories = async () => {
        const res = await chuckNorrisApi.getCategories();
        dispatch({ type: jokesActions.GET_CATEGORIES, payload: res.data })
    }



    return <AppContext.Provider value={{state, getRandomJoke, getCategories}}>{children}</AppContext.Provider>
}


export { AppContext, AppProvider }