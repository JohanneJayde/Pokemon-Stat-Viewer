const PokemonCard = ({ pokemonInfo }) => {
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
