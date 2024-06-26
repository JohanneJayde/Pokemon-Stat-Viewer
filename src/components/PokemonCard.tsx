import { useState } from "react";
import Pokemon from "../interfaces";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";

const PokemonCard = ({ pokemonInfo }: { pokemonInfo: Pokemon }) => {
  const [typeVisibilty, setTypeVisibilty] = useState<boolean>(false);
  const [statsVisibilty, setStatsVisibilty] = useState<boolean>(false);

  return (
    <>
      <Card>
        <CardHeader
          sx={{
            background: blue[500],
            fontSize: 20,
            textTransform: "capitalize",
          }}
          title={pokemonInfo && pokemonInfo.name}
          subheader={`PokeDex #: ${pokemonInfo && pokemonInfo.Id}`}
          color="blue"
        />
        <CardContent>
          <Stack spacing={1}>
            <Typography>Weight: {pokemonInfo && pokemonInfo.weight}</Typography>
            <Typography>Height: {pokemonInfo && pokemonInfo.height}</Typography>
          </Stack>
        </CardContent>
        <CardActions>
          <Stack>
            <Button
              variant="outlined"
              onClick={() => setTypeVisibilty(!typeVisibilty)}
            >
              Show Type
            </Button>

            <List>
              {typeVisibilty &&
                pokemonInfo &&
                pokemonInfo.types.map((type, i) => (
                  <ListItem key={i}>{type.toUpperCase()}</ListItem>
                ))}
            </List>

            <Button
              variant="outlined"
              onClick={() => setStatsVisibilty(!statsVisibilty)}
            >
              Show Stats
            </Button>

            {statsVisibilty &&
              pokemonInfo &&
              pokemonInfo.stats.map((stat, i) => (
                <Stack direction="row" spacing={2}>
                  <ListItem key={i}>{stat.name.toUpperCase()}</ListItem>
                  <ListItem key={i}>{stat.base_stat}</ListItem>
                  <ListItem key={i}>{stat.effort}</ListItem>
                </Stack>
              ))}
          </Stack>
        </CardActions>
      </Card>
    </>
  );
};

export default PokemonCard;
