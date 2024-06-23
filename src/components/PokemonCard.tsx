import { useEffect, useState } from "react";
import Axios from "axios";

interface Pokemon {
  name: string;
  Id: number;
  weight: number;
  height: number;
  types: string[];
}

const PokemonCard = ({ pokemonName }: { pokemonName: string }) => {
  const [pokemonInfo, setPokemonInfo] = useState<Pokemon | null>(null);

  useEffect(() => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
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
    <div className="pokemon--card">
      <h3>Name: {pokemonInfo && pokemonInfo.name}</h3>
      <span>PokeDex ID: {pokemonInfo && pokemonInfo.Id}</span>

      <span>Weight: {pokemonInfo && pokemonInfo.weight}</span>
      <span>Height: {pokemonInfo && pokemonInfo.height}</span>

      <ul>{pokemonInfo && pokemonInfo.types.map((type) => <li>{type}</li>)}</ul>
    </div>
  );
};

export default PokemonCard;
