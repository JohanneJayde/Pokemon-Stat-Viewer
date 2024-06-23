import { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
import PokemonCard from "./components/PokemonCard";

function App() {
  const [pokemonList, setPokemonList] = useState<string[]>([]);

  useEffect(() => {
    Axios.get("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
      .then((res) => res.data)
      .then((data) => {
        const pokemonNames: string[] = data.results.map(
          (pokemon) => pokemon.name
        );

        setPokemonList(pokemonNames);
      });
  }, []);

  return (
    <>
      <div className="pokemon--container">
        {pokemonList.map((pokmeon) => (
          <PokemonCard pokemonName={pokmeon} />
        ))}
      </div>
    </>
  );
}

export default App;
