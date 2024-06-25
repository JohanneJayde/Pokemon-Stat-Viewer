import { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
import PokemonCard from "./components/PokemonCard";
import Navbar from "./components/Navbar";
import Pokemon from "./interfaces";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  colors,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Title } from "@mui/icons-material";

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [selectedType, setSelectType] = useState<string>("All");
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);

  useEffect(() => {
    Axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=32&offset=${pageNumber * 40}`
    )
      .then((res) => res.data)
      .then((data) => {
        const pokemonNames = data.results.map(
          (pokemon: { name: string; url: string }) => pokemon.name
        );

        const pokemon = pokemonNames.map((pokemonName: string) => {
          return Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then((response) => response.data)
            .then((data) => {
              return {
                name: data.name,
                Id: data.id,
                weight: data.weight,
                height: data.height,
                types: data.types.map(
                  (type: {
                    type: { name: string; url: string };
                    url: string;
                  }) => type.type.name
                ),
              };
            });
        });
        Promise.all(pokemon).then((pokemon) => {
          setPokemon(pokemon);
        });
      });
  }, [pageNumber]);

  useEffect(() => {
    Axios.get("https://pokeapi.co/api/v2/type")
      .then((res) => res.data)
      .then((data) => {
        setPokemonTypes(
          data.results.map((type: { name: string; url: string }) => type.name)
        );
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
      <Container>
        <Grid container spacing={2} justifyContent="center">
          {filter(pokemon).map((pokemon) => (
            <Grid item key={pokemon.Id} xs={12} sm={6} md={3} lg={3}>
              <PokemonCard pokemonInfo={pokemon} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <div className="pagination">
        <button onClick={() => setPageNumber(pageNumber - 1)}>
          Previous Page
        </button>
        <button onClick={() => setPageNumber(pageNumber + 1)}>Next Page</button>
      </div>
    </>
  );
}

export default App;
