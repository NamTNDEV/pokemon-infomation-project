import React from "react";
import "./App.css";
import axois from "axios";
import PokemonCollection from "./components/PokemonCollection";
import { Detail, Pokemon } from "./interface";

interface PokemonUrl {
  name: string;
  url: string;
}
const App: React.FC = () => {
  const [pokemons, setPokemons] = React.useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(true);
  const [viewDetail, setViewDetail] = React.useState<Detail>({
    id: 0,
    isOpened: false,
  });

  React.useEffect(() => {
    const getPokemons = async () => {
      const pokemonUrlList = await axois.get(
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
      );
      setNextUrl(pokemonUrlList.data.next);
      pokemonUrlList.data.results.forEach(async (pokemonUrl: PokemonUrl) => {
        const pokemon = await axois.get(`${pokemonUrl.url}`);
        setPokemons((pokes) => [...pokes, pokemon.data]);
      });
      setLoading(false);
    };
    getPokemons();
  }, []);
  const handleNextPage = async () => {
    setLoading(true);
    let pokemonUrlList = await axois.get(nextUrl);
    setNextUrl(pokemonUrlList.data.next);
    pokemonUrlList.data.results.forEach(async (pokemonUrl: PokemonUrl) => {
      const pokemon = await axois.get(`${pokemonUrl.url}`);
      setPokemons((pokes) => [...pokes, pokemon.data]);
    });
    setLoading(false);
  };
  return (
    <div className="App">
      <div className="container">
        <div className="pokemon-header">Pokemon</div>
        <PokemonCollection
          pokemons={pokemons}
          viewDetail={viewDetail}
          setViewDetail={setViewDetail}
        />
        {!viewDetail.isOpened && (
          <div className="btn">
            <button onClick={handleNextPage}>
              {loading ? "Loading..." : "Load more"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
