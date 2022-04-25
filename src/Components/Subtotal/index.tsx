import React from "react";
import "./style.css";
import { useStateValue } from "../../Services/StateProvider";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../../Services/axios/axios";
import { showToast } from '../../Services/Reducer/index';
import warning from '../../Assets/Img/warning.svg'
import success from '../../Assets/Img/check.svg'

const Subtotal = () => {
  const [state, dispatch] = useStateValue();
  const navigate = useNavigate();

  const order = (e: any) => {
    e.preventDefault();

    // Adding the authorization Bearer Token to the api configuration.
    axiosConfig.interceptors.request.use(
      (config: any) => {
        config.headers.authorization = `Bearer ${state.user.token}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const orderItems = {
      Price: getBasketTotal(state.basket),
      OrderItem: state.basket.map((item: any) => ({
        "Price": item.Price,
        "CartItems": item.CartItems,
      })),
    };

    axiosConfig
      .post(`/api/orders/add`, orderItems)
      .then((response) => {
        showToast('success', dispatch, {
          title: "Order Placed Successfully",
          image: success,
        })
        dispatch({
          type: "EMPTY_CART"
        })
        navigate('/orders');
      })
      .catch((error) => {
        showToast('warning', dispatch, {
          title: error.message,
          image: warning,
        })
      });

  };

  const getBasketTotal = (basket: any) => {
    return basket?.reduce((Price: any, item: any) => item.Price + Price, 0);
  };

  return (
    <div className="subtotal">
      <div className="subtotal_info">
        <strong>Total Amount : </strong> ₹ <>{getBasketTotal(state.basket)}</>
      </div>
      <button onClick={(e) => (state.user ? order(e) : navigate("/login"))}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Subtotal;
