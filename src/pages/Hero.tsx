import { useEffect, useState } from "react";
import { Game } from "../components/Game";
import { useNavigate } from "react-router-dom";
import { generateClient } from "aws-amplify/api";
import { Schema } from "../../amplify/data/resource";

export function Hero() {
  const navigate = useNavigate();

  const client = generateClient<Schema>();
  const [games, setGames] = useState<Schema["Game"]["type"][]>([]);

  useEffect(() => {
    async function fetchGames() {
      const { data: allGames } = await client.models.Game.list();
      setGames(allGames);
    }

    fetchGames();
  }, []);
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-4xl text-orange-500">Game World</h1>
        <button
          onClick={() => navigate("/add")}
          type="button"
          className="nes-btn is-primary"
        >
          Try QuizMeBtPromo
        </button>
      </div>

      <section className="grid grid-cols-3 grid-">
        {games.map((game) => (
          <Game key={game.id} {...game} />
        ))}
      </section>
    </div>
  );
}
