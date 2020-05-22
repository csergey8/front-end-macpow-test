import React from 'react'
import { JokeType } from '../../store/context'
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import LaunchOutlinedIcon from '@material-ui/icons/LaunchOutlined';
import styles from './Joke.module.scss'
type PropsType = {
  item: JokeType | null
}

const Joke: React.FC<PropsType> = ({ item }) => {
  console.log(item)
    return item && (
        <div className={styles.container}>
            <div className={styles.chatIconBlock}>
              <MessageOutlinedIcon className={styles.chatIcon} />
            </div>
            <div>
                <div className={styles.id}>
                ID: <a href="">{item.id} <LaunchOutlinedIcon className={styles.launchIcon}/></a>
                </div>
                <div className={styles.text}>
                  {item.value}
                </div>
                <div>
                    <div>last update</div>
                    <div>category</div>
                </div>
                <div>favorite icon</div>
            </div>
            
        </div>
    )
}

export { Joke }
