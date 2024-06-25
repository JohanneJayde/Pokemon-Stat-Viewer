import { useState } from "react";
import Pokemon from "../interfaces";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
} from "@mui/material";

const PokemonCard = ({ pokemonInfo }: { pokemonInfo: Pokemon }) => {
  const [typeVisibilty, setTypeVisibilty] = useState<boolean>(false);

  return (
    <>
      <Card sx={{ width: 200 }}>
        <CardHeader
          sx={{ background: "green", fontSize: 20 }}
          title={pokemonInfo && pokemonInfo.name}
          subheader={pokemonInfo && pokemonInfo.Id}
          color="blue"
        />
        <CardContent>
          <Stack spacing={1}>
            <span>Weight: {pokemonInfo && pokemonInfo.weight}</span>
            <span>Height: {pokemonInfo && pokemonInfo.height}</span>
          </Stack>
        </CardContent>
        <CardActions>
          <Button onClick={() => setTypeVisibilty(!typeVisibilty)}>
            Show Type
          </Button>
          {typeVisibilty && (
            <ul>
              {pokemonInfo &&
                pokemonInfo.types.map((type, i) => <li key={i}>{type}</li>)}
            </ul>
          )}
        </CardActions>
      </Card>
    </>
  );
};

export default PokemonCard;
