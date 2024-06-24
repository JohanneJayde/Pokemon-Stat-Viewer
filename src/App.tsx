import { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
import PokemonCard from "./components/PokemonCard";
import Navbar from "./components/Navbar";
import Pokemon from "./interfaces";

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [selectedType, setSelectType] = useState<string>("All");
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);
  useEffect(() => {
    Axios.get("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
      .then((res) => res.data)
      .then((data) => {
        const pokemonNames = data.results.map((pokemon) => pokemon.name);

        const pokemon = pokemonNames.map((pokemonName) => {
          return Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then((response) => response.data)
            .then((data) => {
              return {
                name: data.name,
                Id: data.id,
                weight: data.weight,
                height: data.height,
                types: data.types.map((type) => type.type.name),
              };
            });
        });
        Promise.all(pokemon).then((pokemon) => {
          setPokemon(pokemon);
        });
      });
  }, []);

  useEffect(() => {
    Axios.get("https://pokeapi.co/api/v2/type")
      .then((res) => res.data)
      .then((data) => {
        setPokemonTypes(data.results.map((type) => type.name));
      });
  }, []);

  function filter(pokemon: Pokemon[]) {
    let filteredPokmeon: Pokemon[] = [];

    filteredPokmeon = pokemon.filter((pokemon) =>
      pokemon.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

    if (selectedType !== "All") {
      filteredPokmeon = filteredPokmeon.filter((pokemon) =>
        pokemon.types.includes(selectedType)
      );
    }

    return filteredPokmeon;
  }

  return (
    <>
      <Navbar
        onSearch={setSearchTerm}
        items={pokemonTypes}
        onSelectType={setSelectType}
      />
      <div className="pokemon--container">
        {filter(pokemon).map((pokemon) => (
          <PokemonCard pokemonInfo={pokemon} />
        ))}
      </div>
    </>
  );
}

export default App;
