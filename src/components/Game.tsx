import { Schema } from "../../amplify/data/resource";
import styles from "./Game.module.css";
export function Game({
  name,
  price,
  image,
  description,
  rating,
}: Schema["Game"]["type"]) {
  return (
    <section className={styles.showcase}>
      <div className="nes-container with-title max-w-2xl flex flex-col gap-2 h-full">
        <h3>{name}</h3>
        <div className="img">
          <img src={image} alt="" />
        </div>
        <p>{description}</p>
        <div className="flex items-center ">
          <p>Rating: {rating}/5</p>
          <progress
            className="nes-progress is-primary"
            value={rating}
            max="5"
          ></progress>
        </div>
        <button type="button" className="nes-btn is-success w-1/2 m-auto">
          Pay ${price}
        </button>
      </div>
    </section>
  );
}
