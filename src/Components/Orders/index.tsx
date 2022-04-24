import React, { useEffect, useState } from 'react'
import axiosConfig from '../../Services/axios/axios';
import { showToast } from '../../Services/Reducer';
import { useStateValue } from '../../Services/StateProvider';
import error from '../../Assets/Img/error.svg'
import Order from '../Order';
import './style.css'

const Orders = () => {

  const [state, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const getOrders = async () => {
      await axiosConfig
        .get(`/api/orders/fetch/`)
        .then((response: any) => {
          setOrders(response.data)
          dispatch({
            type: "EMPTY_CART"
          })
        })
        .catch((err: any) => {
          showToast("danger", dispatch, {
            title: err?.message,
            image: error,
          });
        });
    }

    if(state.user){
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

      getOrders();
    }
  },[state.user])

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders_order">
        {orders?.map((order: any) => (
          <Order
            key={`${order?.id}_ordered`}
            order={order}
          />
        ))}
      </div>
    </div>
  )
}

export default Orders