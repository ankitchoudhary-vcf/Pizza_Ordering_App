import React, { useState } from "react";
import { showToast } from "../../Services/Reducer";
import { useStateValue } from "../../Services/StateProvider";
import IngredientItems from "../IngredientItems";
import SizeItems from "../SizeItems";
import info from '../../Assets/Img/info.svg'
import warning from '../../Assets/Img/warning.svg'
import "./style.css";

const Home = () => {
  const [totalPrice, setTotalPrice] = useState(100);
  const [state, dispatch] = useStateValue();
  const [SelectedSize, setSelectedSize] = useState({ Name: "Small - LightWeight", Price: 100 });
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const handleAddToCart = (e: any) => {
    e.preventDefault();

    if (selectedIngredients.length > 0) {
      const Cart = {
        "Price": totalPrice,
        "CartItems":
          selectedIngredients?.map((item: any) => (
            {
              "IngredientId": item.id,
            }
          ))
      }

      console.log(Cart)

      dispatch({
        type: "ADD_TO_CART",
        basket: Cart,
        info: info,
        dispatch: dispatch,
        totalPrice: totalPrice,
      })
    }
    else {
      showToast('warning', dispatch, {
        title: "Select Ingredients First",
        image: warning,
      })
    }

  }

  return (
    <div className="home">
      <div className="home_header">Customize your Pizza 🍕🍕</div>

      <div className="home_content">
        <div className="home_customize">
          <img
            className="home_image"
            src={require("../../Assets/Img/Pizza_Plate.jpg")}
          />
          <img
            className="ingredients"
            src={require("../../Assets/Img/PizzaBase.png")}
          />
          {selectedIngredients?.map((item: any) => (
            <img
              key={"IngredientImage" + item.id}
              className="ingredients"
              src={require(`../../Assets/Img/${item.AvatarURL}`)}
            />
          ))}
        </div>
        <div className="home_second_container">
          <div className="home_customize_details">
            <strong>Total Price: </strong> ₹ {totalPrice}
            <div>
              <button className="add_to_cart_button" onClick={handleAddToCart}>Add To Cart 🛒 </button>
            </div>
          </div>
          <div className="customize_size">
            <strong>Select Pizza Size :</strong>
            <div className="home_row">
              {state?.size?.map((item: any) => (
                <SizeItems
                  key={item.id}
                  data={item}
                  SelectedSize={SelectedSize}
                  setSelectedSize={setSelectedSize}
                  setTotalPrice={setTotalPrice}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="home_Ingredients_container home_row">
        {state?.ingredients?.map((item: any) => (
          <IngredientItems key={"Ingredients" + item.id} data={item} selectedIngredients={selectedIngredients} setSelectedIngredients={setSelectedIngredients} setTotalPrice={setTotalPrice} />
        ))}
      </div>
    </div>
  );
};

export default Home;
