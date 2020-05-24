import React from "react";
import { JokeType, AppContext } from "../../store/context";
import MessageOutlinedIcon from "@material-ui/icons/MessageOutlined";
import LaunchOutlinedIcon from "@material-ui/icons/LaunchOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import styles from "./Joke.module.scss";

type PropsType = {
  item: JokeType | null;
  favouriteJoke?: boolean;
  likedJoke?: boolean;
};

const Joke: React.FC<PropsType> = ({
  item,
  favouriteJoke = false,
  likedJoke = false,
}) => {
  const { state, addToFavourite, removeFromFavorite } = React.useContext(
    AppContext
  );
  const now = new Date().getTime();
  let updatedHoursAgo;
  let favourite = false;
  if (item) {
    const updateAt = new Date(item.updated_at).getTime();
    updatedHoursAgo = Math.floor((now - updateAt) / (60 * 60 * 1000));
    favourite =
      (state.favouriteJokes as JokeType[])
        .map((joke) => joke.id)
        .indexOf(item.id) !== -1;
  }
  const containerClass = `${
    favouriteJoke ? `${styles.container} ${styles.favourite}` : styles.container
  }`;
  return (
    item && (
      <div className={containerClass}>
        <div className={styles.chatIconBlock}>
          <MessageOutlinedIcon className={styles.chatIcon} />
        </div>
        <div className={styles.jokeContainer}>
          <div className={styles.id}>
            ID:{" "}
            <a href={item.url} rel="noopener noreferrer" target="_blank">
              {item.id}
              <LaunchOutlinedIcon className={styles.launchIcon} />
            </a>
          </div>
          <div className={styles.jokeText}>{item.value}</div>
          <div className={styles.jokeInfo}>
            <div className={styles.updated}>
              Last update: {updatedHoursAgo} hours ago
            </div>
            {item.categories.length > 0 ? (
              <div className={styles.category}>{item.categories[0]}</div>
            ) : null}
          </div>
        </div>
        <div className={styles.favouriteIcon}>
          {(favourite && favouriteJoke) === true || likedJoke ? (
            <FavoriteIcon onClick={() => removeFromFavorite(item.id)} />
          ) : (
            <FavoriteBorderIcon onClick={() => addToFavourite(item)} />
          )}
        </div>
      </div>
    )
  );
};

export { Joke };
