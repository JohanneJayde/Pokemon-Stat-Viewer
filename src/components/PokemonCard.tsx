import { useState } from "react";
import Pokemon from "../interfaces";

const PokemonCard = ({ pokemonInfo }: { pokemonInfo: Pokemon }) => {
  const [typeVisibilty, setTypeVisibilty] = useState<boolean>(false);

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
        <div className="pokemon--card--types">
          <div className="pokemon--card--types--title">
            <span>Types</span>
            <button onClick={() => setTypeVisibilty(!typeVisibilty)}>+</button>
          </div>
          <div className="pokemon--card--types--list">
            {typeVisibilty && (
              <ul>
                {pokemonInfo &&
                  pokemonInfo.types.map((type, i) => <li key={i}>{type}</li>)}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
