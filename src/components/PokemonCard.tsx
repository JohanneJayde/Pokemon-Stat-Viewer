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

        setPokemonInfo(PokemonInfo);
      });
  }, []);

  return (
    <div className="pokemon--card">
      <div className="pokemon--card--content">
        <div className="pokemon--card--header">
          <h4>{pokemonInfo && pokemonInfo.name}</h4>
          <span>PokeDex: #{pokemonInfo && pokemonInfo.Id}</span>
        </div>

        <div className="pokemon--card--details">
          <span>Weight: {pokemonInfo && pokemonInfo.weight}</span>
          <span>Height: {pokemonInfo && pokemonInfo.height}</span>
        </div>
        <div className="pokemon--card-types">
          <span>Types</span>
          <ul>
            {pokemonInfo && pokemonInfo.types.map((type) => <li>{type}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
