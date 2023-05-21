import React from "react";
import "./pokemon.css";
import { Detail } from "../interface";

interface Props {
  id: number;
  name: string;
  image: string;
  abilities:
    | {
        name: string;
        ability: string;
      }[]
    | undefined;
  viewDetail: Detail;
  setViewDetail: React.Dispatch<React.SetStateAction<Detail>>;
}

const PokemonInf: React.FC<Props> = (props) => {
  const { id, name, image, abilities, viewDetail, setViewDetail } = props;
  const [isSelected, setIsSelected] = React.useState(false);

  React.useEffect(() => {
    setIsSelected(id === viewDetail?.id);
  });
  const closeDetail = () => {
    setViewDetail({
      id: 0,
      isOpened: false,
    });
  };
  return (
    <div>
      {isSelected ? (
        <section className="pokemon-list-detailed">
          <div className="detail-container">
            <p className="detail-close" onClick={closeDetail}>
              X
            </p>
            <div className="detail-info">
              <img src={image} alt="pokemon" className="detail-img" />
              <p className="detail-name">{name}</p>
            </div>
            <p className="detail-ability">Abilities: </p>
            <div className="detail-skill">
              {abilities?.map((abi: any, index:number) => {
                return <div style={{
                  "width": '100%'
                }}>{index + 1}. {abi.ability.name}</div>;
              })}
            </div>
          </div>
        </section>
      ) : (
        <section className="pokemon-list-container">
          <p className="pokemon_name">{name}</p>
          <img src={image} alt="pokemon" />
          {/* <div className="detail-skill">
          <p className="detail-ability">Abilities: </p>
        </div> */}
        </section>
      )}
    </div>
  );
};

export default PokemonInf;
