import React from "react";
import { Detail, Pokemon, PokemonDetail } from "../interface";
import PokemonInf from "./PokemonInf";
import "./pokemon.css";

interface Props {
  pokemons: PokemonDetail[];
  viewDetail: Detail;
  setViewDetail: React.Dispatch<React.SetStateAction<Detail>>;
}

const PokemonCollection: React.FC<Props> = (props) => {
  const { pokemons, viewDetail, setViewDetail } = props;
  const selectPokemon = (id: number) => {
    if (!viewDetail.isOpened) {
      setViewDetail({
        id: id,
        isOpened: true,
      });
    }
  };
  return (
      <section
        className={
          viewDetail.isOpened
            ? "collection-container-active"
            : "collection-container"
        }
      >
        {viewDetail.isOpened ? <div className="overlay"></div> : <div></div>}
        {pokemons.map((pokemon) => {
          return (
            <div
              key={pokemon.id}
              className=""
              onClick={() => selectPokemon(pokemon.id)}
            >
              <PokemonInf
                viewDetail={viewDetail}
                setViewDetail={setViewDetail}
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.sprites.front_default}
                abilities={pokemon.abilities}
              />
            </div>
          );
        })}
      </section>
  );
};

export default PokemonCollection;
