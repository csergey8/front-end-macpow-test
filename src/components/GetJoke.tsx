import React from 'react'
import { AppContext } from '../store/context'

const GetJoke = () => {
    const { state, getCategories } = React.useContext(AppContext)
    React.useEffect(() => {
        getCategories()
    }, [])
    const onSubmitHandler = (e: any) => {
        e.preventDefault()
        //getRandomJoke()
    }
    return (
        <React.Fragment>
            <h1>Hey</h1>
            <h2>Let's try to find: </h2>
            <form onSubmit={onSubmitHandler}>
                <input type="radio" id="random" name="radio" value="random" />
                <label htmlFor="random">Random</label>
                <input type="radio" id="categories" name="radio" value="categories" />
                <label htmlFor="random">From categories</label>
                {state.categories?.map((category: any) => <div>{category}</div>)}
                <input type="radio" id="search" name="radio" value="search" />
                <label htmlFor="random">Search</label>
                <input type="text" placeholder="Free text search..." />
                <button type="submit">Get a joke</button>
            </form>
        </React.Fragment>
    )
}

export { GetJoke }
