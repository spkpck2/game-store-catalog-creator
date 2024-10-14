import { GamePromptProps } from "./types";

export function GamePrompt({
  generateGameListing,
  loading,
  generatedImgs,
  setPrompt,
  prompt,
}: GamePromptProps) {
  return (
    <section className="flex flex-col w-full">
      <form
        onSubmit={generateGameListing}
        className="nes-container is-rounded flex flex-col gap-4  h-1/2   items-start "
      >
        <p>Enter what type of game you'd like, be specific:</p>
        <label id="prompt-label">Prompt</label>
        <input
          disabled={loading}
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="nes-input"
          id="prompt-label"
          placeholder="What type of game would you like?"
        />
        <button
          id="submit"
          type="submit"
          disabled={loading}
          className={`nes-btn is-primary  ${
            loading && "cursor-not-allowed !bg-gray-100"
          }`}
        >
          Generate Game
        </button>
      </form>
      {generatedImgs.length > 0 ? (
        <section className="nes-container with-title flex flex-col gap-4 my-4">
          <h3 className="title">Pictures to choose from...</h3>
          <div className="grid grid-cols-4">
            {generatedImgs.map((img, index) => {
              return (
                <img
                  className="m-auto"
                  key={index}
                  src={`data:image/jpeg;base64,${img}`}
                />
              );
            })}
          </div>
        </section>
      ) : null}
    </section>
  );
}
