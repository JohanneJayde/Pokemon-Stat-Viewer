import { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [dittoInfo, setDittoInfo] = useState(null);

  useEffect(() => {
    Axios.get("https://pokeapi.co/api/v2/pokemon/ditto")
      .then((response) => response.data)
      .then((data) => setDittoInfo(data));
  }, []);

  return (
    <>
      <h1>{dittoInfo && dittoInfo.name}</h1>
    </>
  );
}

export default App;
