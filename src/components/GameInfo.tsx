import { GameInformationProps } from "./types";

export default function GameInformation({
  name,
  loading,
  description,
  rating,
  price,
  image,
  createGame,
  setName,
  setDescription,
  setRating,
  setImage,
  setPrice,
}: GameInformationProps) {
  return (
    <section className="nes-container with-title w-full h-3/4">
      <h3 className="title">Game Information</h3>

      <div className="nes-field">
        <label id="name-label">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="nes-input"
          id="name-label"
          required
          placeholder="Enter the game name"
          disabled={loading}
        />
      </div>
      <div className="nes-field">
        <label htmlFor="description_field">Description</label>
        <textarea
          disabled={loading}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id="description_field"
          className="nes-textarea"
          placeholder="Enter your description"
        />
      </div>

      <div className="nes-field">
        <label htmlFor="rating" id="rating">
          Rating
        </label>
        <input
          type="text"
          disabled={loading}
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          className="nes-input"
          id="rating"
          required
          placeholder="Enter rating"
        />
      </div>

      <div className="nes-field">
        <label htmlFor="price_field">Price</label>
        <input
          disabled={loading}
          type="number"
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value))}
          id="price_field"
          className="nes-input"
          placeholder="Enter price"
        />
      </div>
      <div className="nes-field">
        <label htmlFor="image_field">Image file name</label>
        <input
          disabled={loading}
          type="string"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          id="image_field"
          className="nes-input"
          placeholder="Enter image name"
        />
      </div>
      <button
        id="submit"
        type="submit"
        className={`nes-btn is-success  ${
          loading && "cursor-not-allowed !bg-gray-100"
        }`}
        disabled={loading}
        onClick={createGame}
      >
        Submit Game
      </button>
    </section>
  );
}
