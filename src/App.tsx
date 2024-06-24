import { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
import PokemonCard from "./components/PokemonCard";
import Navbar from "./components/Navbar";

function App() {
  const [pokemonList, setPokemonList] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

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
      <Navbar onSearch={setSearchTerm} />
      <div className="pokemon--container">
        {pokemonList.map(
          (pokemon) =>
            pokemon.toLowerCase().startsWith(searchTerm.toLowerCase()) && (
              <PokemonCard pokemonName={pokemon} />
            )
        )}
      </div>
    </>
  );
}

export default App;
