import React from 'react'
import { AppContext } from '../../store/context'
import styles from './GetJoke.module.scss'
import { Category } from '../'

const GetJoke = () => {
    const { state, getCategories, getJoke } = React.useContext(AppContext)
    const [radioChecked, setRadioChecked] = React.useState('random')
    const [selectedCategory, setSelectedCategory] = React.useState('')
    const [searchText, setSearchText] = React.useState('');

    React.useEffect(() => {
        getCategories()
    }, [])

    const onSubmitHandler = (e: any) => {
        e.preventDefault()
        getJoke(radioChecked, selectedCategory, searchText)
    }

    const checked = {
      random: 'random' === radioChecked,
      categories: 'categories' === radioChecked,
      search: 'search' === radioChecked,
    }

    const radioHandler = (e: any) => {
      setRadioChecked(e.target.value)
    }

    const inputSearchHandler = (e: any) => {
      setSearchText(e.target.value)
    } 

    return (
        <section className={styles.container}>
            <div className={styles.primaryText}>Hey</div>
            <div className={styles.secondaryText}>Let's try to find a joke for you: </div>
            <form onSubmit={onSubmitHandler} className={styles.form}>
                <div className={styles.radioContainer}>
                  <input onChange={radioHandler} checked={checked.random} className={styles.radioBtn} type="radio" id="random" name="radio" value="random" />
                  <label htmlFor="random">Random</label>
                </div>
                <div className={styles.radioContainer}>
                  <input onChange={radioHandler} checked={checked.categories} type="radio" id="categories" name="radio" value="categories" />
                  <label htmlFor="categories">From categories</label>
                  {checked.categories && <div className={styles.categoriesContainer}>
                  {state.categories?.map((category: string) => <Category selected={selectedCategory === category} name={category} selectHandler={setSelectedCategory}/>)}
                  </div>
                  }
                </div>
                <div className={styles.radioContainer}>
                  <input onChange={radioHandler} checked={checked.search} type="radio" id="search" name="radio" value="search" />
                  <label htmlFor="search">Search</label>
                  {checked.search && <div>
                    <input onChange={inputSearchHandler} className={styles.searchInput} type="text" placeholder="Free text search..." value={searchText}/>
                  </div>
                  }
                </div>
                <button className={styles.button} type="submit">Get a joke</button>
            </form>
        </section>
    )
}

export { GetJoke }
