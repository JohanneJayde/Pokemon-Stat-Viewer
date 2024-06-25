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

  return (
    <>
      <Card>
        <CardHeader
          sx={{
            background: blue[500],
            fontSize: 20,
            textTransform: "capitalize",
            height: 20,
          }}
          titleTypographyProps={{
            style: { fontSize: "14px", margin: 0 },
          }}
          subheaderTypographyProps={{
            style: { fontSize: "12px" },
          }}
          title={pokemonInfo && pokemonInfo.name}
          subheader={`PokeDex #: ${pokemonInfo && pokemonInfo.Id}`}
          color="blue"
        />
        <CardContent>
          <Stack spacing={1}>
            <Typography sx={{ fontSize: "12px" }}>
              Weight: {pokemonInfo && pokemonInfo.weight}
            </Typography>
            <Typography sx={{ fontSize: "12px" }}>
              Height: {pokemonInfo && pokemonInfo.height}
            </Typography>
          </Stack>
        </CardContent>
        <CardActions>
          <Stack>
            <Button onClick={() => setTypeVisibilty(!typeVisibilty)}>
              Show Type
            </Button>
            <List>
              {typeVisibilty &&
                pokemonInfo &&
                pokemonInfo.types.map((type, i) => (
                  <ListItem key={i}>{type}</ListItem>
                ))}
            </List>
          </Stack>
        </CardActions>
      </Card>
    </>
  );
};

export default PokemonCard;
