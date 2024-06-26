import { SetStateAction, useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
import PokemonCard from "./components/PokemonCard";
import Pokemon from "./interfaces";
import {
  AppBar,
  Box,
  Container,
  Grid,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
} from "@mui/material";

function App() {
  const generationIndex = [
    [151, 0],
    [251 - 151, 151],
    [386 - 251, 251],
    [493 - 386, 386],
    [648 - 493, 494],
    [720 - 648, 649],
    [808 - 720, 721],
    [904 - 808, 809],
    [1024, 905],
  ];

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [selectedType, setSelectType] = useState<string>("All");
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);
  const [generation, setGeneration] = useState<number>(1);
  const [generationDex, setGenerationDex] = useState<number[]>(
    generationIndex[generation - 1]
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    Axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${generationDex[0]}&offset=${generationDex[1]}`
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
          setIsLoading(false);
        });
      });
  }, [generationDex]);

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

  const handleGeneration = (
    _event: React.MouseEvent<HTMLElement>,
    generation: number
  ) => {
    if (generation) {
      setGeneration(generation);
      setGenerationDex(generationIndex[generation - 1]);
    }
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
      <Container
        sx={{
          marginX: "auto",
          marginY: 3,
        }}
      >
        <ToggleButtonGroup
          value={generation}
          onChange={handleGeneration}
          exclusive
          color="primary"
        >
          <ToggleButton value={1}>Gen 1</ToggleButton>
          <ToggleButton value={2}>Gen 2</ToggleButton>
          <ToggleButton value={3}>Gen 3</ToggleButton>
          <ToggleButton value={4}>Gen 4</ToggleButton>
          <ToggleButton value={5}>Gen 5</ToggleButton>
          <ToggleButton value={6}>Gen 6</ToggleButton>
          <ToggleButton value={7}>Gen 7</ToggleButton>
          <ToggleButton value={8}>Gen 8</ToggleButton>
          <ToggleButton value={9}>Gen 9</ToggleButton>
        </ToggleButtonGroup>
      </Container>
      <Container sx={{ width: "100%" }}>
        <LinearProgress
          variant="indeterminate"
          sx={{ display: isLoading ? "block" : "none" }}
        />
      </Container>
      <Box margin={3} sx={{ display: !isLoading ? "block" : "none" }}>
        <Container maxWidth="lg">
          <Grid container spacing={2} justifyContent="center">
            {filter(pokemon).map((pokemon) => (
              <Grid item key={pokemon.Id} xs={12} sm={6} md={3} lg={3}>
                <PokemonCard pokemonInfo={pokemon} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default App;
