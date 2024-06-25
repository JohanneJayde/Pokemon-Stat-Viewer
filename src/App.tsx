import { SetStateAction, useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
import PokemonCard from "./components/PokemonCard";
import Pokemon from "./interfaces";
import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

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

  const handleSelectChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectType(event.target.value);
  };

  const handleSearchTerm = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
  };

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
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Pokemon Stats Viewer
          </Typography>
          <Button
            variant="contained"
            onClick={() => setPageNumber(pageNumber - 1)}
          >
            Previous Page
          </Button>
          <Button
            variant="contained"
            onClick={() => setPageNumber(pageNumber + 1)}
          >
            Next Page
          </Button>
          <Box marginX={3} />
          <TextField
            variant="outlined"
            label="Search Pokemon"
            value={searchTerm}
            inputProps={{
              sx: { borderRadius: 3, background: "background" },
            }}
            onChange={handleSearchTerm}
          />
          <Box marginX={3} />
          <Select
            inputProps={{
              sx: { borderRadius: 3, background: "background" },
            }}
            value={selectedType}
            onChange={handleSelectChange}
          >
            <MenuItem defaultValue="All" value="All">
              All
            </MenuItem>
            {pokemonTypes.map((item: string) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </Select>
        </Toolbar>
      </AppBar>
      <Box margin={3} justifyContent={"center"}>
        <ButtonGroup>
          <Button>Generation 1</Button>
          <Button>Generation 2</Button>
          <Button>Generation 3</Button>
          <Button>Generation 4</Button>
          <Button>Generation 5</Button>
          <Button>Generation 6</Button>
          <Button>Generation 7</Button>
          <Button>Generation 8</Button>
          <Button>Generation 9</Button>
        </ButtonGroup>
      </Box>
      <Box margin={3}>
        <Container maxWidth="lg">
          <Grid container spacing={2} justifyContent="center">
            {filter(pokemon).map((pokemon) => (
              <Grid item key={pokemon.Id} xs={12} sm={6} md={3} lg={3}>
                <PokemonCard pokemonInfo={pokemon} />
              </Grid>
            ))}
          </Grid>
        </Container>
        <Box marginY={3}>
          <Grid container spacing={2} justifyContent={"center"}>
            <Grid item>
              <Button
                variant="contained"
                onClick={() => setPageNumber(pageNumber - 1)}
              >
                Previous Page
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={() => setPageNumber(pageNumber + 1)}
              >
                Next Page
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default App;
