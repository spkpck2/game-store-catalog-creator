import { generateClient } from "aws-amplify/api";
import { Schema } from "../../amplify/data/resource";
import React, { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import GameInformation from "../components/GameInfo";
import { GamePrompt } from "../components/GamePrompt";

export function AddGame() {
  const client = generateClient<Schema>();
  const [prompt, setPrompt] = React.useState("");
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const [response, setResponse] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState("");
  const [generatedImages, setGeneratedImages] = React.useState<string[]>([]);
  const navigate = useNavigate();

  async function generateGameListing(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!prompt) return;
    setLoading(true);
    const { data: listing } = await client.queries.generateGameListing({
      description: prompt,
    });

    setName(listing?.name || "");
    setPrompt("");
    setResponse(listing?.name || "");
    await generateImages();
    setLoading(false);
  }

  async function generateImages() {
    setLoading(true);
    const img1 = client.queries.generateImage({
      prompt,
    });
    const img2 = client.queries.generateImage({
      prompt: prompt + " overheard view",
    });
    const img3 = client.queries.generateImage({
      prompt: prompt + " randomized view",
    });
    const img4 = client.queries.generateImage({
      prompt: prompt + " close up",
    });

    Promise.allSettled([img1, img2, img3, img4]).then((results) => {
      const images = results.map((result) => {
        if (result.status === "fulfilled") {
          return (result.value.data?.[0] as string) ?? "";
        } else return "";
      }, []);
      setGeneratedImages(images);
      setLoading(false);
    });
  }

  async function createGame() {
    setLoading(true);

    await client.models.Game.create({
      name,
      description,
      rating,
      price,
      image,
    });

    navigate("/");
    setLoading(false);
  }

  return (
    <div>
      <h1 className="text-4xl text-orange-500">Add Game</h1>
      <div className="flex  gap-8">
        <GameInformation
          createGame={createGame}
          description={description}
          image={image}
          loading={loading}
          name={name}
          price={price}
          rating={rating}
          setDescription={setDescription}
          setImage={setImage}
          setName={setName}
          setPrice={setPrice}
          setRating={setRating}
        />
        <GamePrompt
          generateGameListing={generateGameListing}
          loading={loading}
          generatedImages={generatedImages}
          prompt={prompt}
          setPrompt={setPrompt}
	  response={response}
	  setResponse={setResponse}
        />
      </div>
    </div>
  );
}
