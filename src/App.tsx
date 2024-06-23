import { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
import Pokemon from "./Pokemon";
import PokemonCard from "./components/PokemonCard";

function App() {
  const [pokemonInfo, setPokemonInfo] = useState<Pokemon | null>(null);

  useEffect(() => {
    Axios.get("https://pokeapi.co/api/v2/pokemon/charizard")
      .then((response) => response.data)
      .then((data) => {
        const PokemonInfo: Pokemon = {
          name: data.name,
          Id: data.id,
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
      <PokemonCard pokemonInfo={pokemonInfo} />
    </>
  );
}

export default App;
