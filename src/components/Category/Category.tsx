import React, { Dispatch, SetStateAction } from 'react'
import styles from './Category.module.scss';

type PropsType = {
  selected: boolean
  name: string
  selectHandler: Dispatch<SetStateAction<string>>
}

const Category: React.FC<PropsType> = ({name, selected, selectHandler}) => {
  return (
    <div onClick={() => selectHandler(name)} className={`${styles.categoryBlock} ${selected ? styles.categoryBlockSelected : null}`}>
      {name}
    </div>
  )
}

export { Category }