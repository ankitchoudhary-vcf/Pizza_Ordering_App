import React, { useEffect, useState } from "react";
import "./style.css";

type Props = {
  data: any;
  selectedIngredients: any;
  setSelectedIngredients: any;
  setTotalPrice: any;
};

const IngredientItems = ({
  data,
  selectedIngredients,
  setSelectedIngredients,
  setTotalPrice,
}: Props) => {
  const [selected, SetSelected] = useState(false);

  const handleIngredient = () => {
    if (!selected) {
      setSelectedIngredients([...selectedIngredients, data]);
      SetSelected(!selected);
      setTotalPrice((totalPrice: any) => {
        return (totalPrice += data?.Price);
      });
    } else {
        setSelectedIngredients((selectedIngredients:any) => {return selectedIngredients.filter((item:any) => item.id !== data.id) });
        SetSelected(!selected);
        setTotalPrice((totalPrice: any) => {
            return (totalPrice -= data?.Price);
        });
    }
  };

  return (
    <div
      className={
        selected
          ? "IngredientItem_container SelectedIngredient "
          : "IngredientItem_container"
      }
      onClick={handleIngredient}
    >
      <div className="IngredientItem_img">
        <img src={require(`../../Assets/Img/${data.AvatarURL}`)} />
      </div>
      <div className="IngredientItem_info">
        {data.Name}
        <div className="IngredientItem_price">
          <strong>Price : </strong> ₹ {data.Price}
        </div>
      </div>
    </div>
  );
};

export default IngredientItems;
