import React from "react";
import "./style.css";
import { useStateValue } from "../../Services/StateProvider";

type Props = {
  data: any;
  isOrdered?: any;
};

const CheckoutProduct = ({ data, isOrdered }: Props) => {
  const [state, dispatch] = useStateValue();

  return (
    <div className="checkoutProduct">
      <img
        className="checkoutProduct_image"
        src={require("../../Assets/Img/Pizza_Plate.jpg")}
      />
      <img
        className="checkout_ingredients"
        src={require("../../Assets/Img/PizzaBase.png")}
      />

      {isOrdered
        ? data.OrderItem.map((item: any) =>
            state?.ingredients.map(
              (ingredient: any) =>
                ingredient.id === item.IngredientId && (
                  <img
                    key={`CheckOut_ingredients${item.IngredientId}`}
                    className="checkout_ingredients"
                    src={require(`../../Assets/Img/${ingredient.AvatarURL}`)}
                  />
                )
            )
          )
        : data.CartItems.map((item: any) =>
            state?.ingredients.map(
              (ingredient: any) =>
                ingredient.id === item.IngredientId && (
                  <img
                    key={`CheckOut_ingredients${item.IngredientId}`}
                    className="checkout_ingredients"
                    src={require(`../../Assets/Img/${ingredient.AvatarURL}`)}
                  />
                )
            )
          )}
      <div className="checkoutProduct_info">
        <p className="checkoutProduct_title">{"Your  Pizza 🍕"}</p>
        <p className="checkoutProduct_price">
          <strong>Amount : </strong>
          <small>₹</small>
          <strong>{data.Price}</strong>
        </p>
      </div>
    </div>
  );
};

export default CheckoutProduct;
