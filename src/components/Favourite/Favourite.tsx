import React from "react";
import styles from "./Favourite.module.scss";
import { JokeType } from "../../store/context";
import { Joke } from "..";

type PropsType = {
  items: Array<JokeType> | [];
};

const Favourite: React.FC<PropsType> = ({ items }) => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>Favourite</div>
      {items.length > 0 &&
        (items as JokeType[]).map((item: JokeType) => (
          <Joke favouriteJoke={true} item={item} />
        ))}
    </div>
  );
};

export { Favourite };
