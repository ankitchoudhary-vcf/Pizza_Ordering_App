import React, { useState } from "react";
import "./style.css";

type Props = {
  data: any;
  SelectedSize: any;
  setSelectedSize: any;
  setTotalPrice: any;
};

const SizeItems = ({
  data,
  SelectedSize,
  setSelectedSize,
  setTotalPrice,
}: Props) => {
  const handleSize = () => {
    setTotalPrice((totalPrice:any) => { return totalPrice = totalPrice - SelectedSize.Price + data.Price });
    setSelectedSize(data);
  };

  return (
    <div
      className={
        data.Name === SelectedSize.Name
          ? "SizeItem_container SizeItem_Selected"
          : " SizeItem_container"
      }
      onClick={() => {
        handleSize();
      }}
    >
      <div className="SizeItem_info ">{data.Name}</div>
      <div className="SizeItem_price">
        <strong>Price : </strong> ₹ {data.Price}
      </div>
    </div>
  );
};

export default SizeItems;
