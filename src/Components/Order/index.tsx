import React from "react";
import CheckoutProduct from "../CheckoutProduct";
import "./style.css";

const Order = ({ order }: any) => {
  return (
    <div className="order">
      <h2>Order</h2>
      <p>{order.createdAt}</p>
      <p className="order_id">
        <small>{order.id}</small>
      </p>
      <CheckoutProduct data={order} isOrdered={true} />
      <h3>Order Total: {order.Price}</h3>
    </div>
  );
};

export default Order;
