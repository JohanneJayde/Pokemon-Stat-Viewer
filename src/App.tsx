import { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  interface Pokemon {
    name: string;
    Id: number;
    weight: number;
    height: number;
    types: string[];
  }

  const [pokemonInfo, setPokemonInfo] = useState<Pokemon | null>(null);

  useEffect(() => {
    Axios.get("https://pokeapi.co/api/v2/pokemon/charizard")
      .then((response) => response.data)
      .then((data) => {
        const PokemonInfo: Pokemon = {
          name: data.name,
          Id: data.Id,
          weight: data.weight,
          height: data.height,
          types: data.types.map((type) => type.type.name),
        };

        console.log(PokemonInfo);

        setPokemonInfo(PokemonInfo);
      });
  }, []);

  return (
    <>
      <h1>Name: {pokemonInfo && pokemonInfo.name}</h1>
      <h1>PokeDex ID: {pokemonInfo && pokemonInfo.Id}</h1>

      <h1>Weight: {pokemonInfo && pokemonInfo.weight}</h1>
      <h1>Height: {pokemonInfo && pokemonInfo.height}</h1>

      <ul>{pokemonInfo && pokemonInfo.types.map((type) => <li>{type}</li>)}</ul>
    </>
  );
}

export default App;
