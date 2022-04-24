import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, HashRouter } from "react-router-dom";
import Home from "./Components/Home";
import Header from "./Components/Header";
import axiosConfig from "./Services/axios/axios";
import { useStateValue } from "./Services/StateProvider";
import Toast from "./Components/Toast";
import { showToast } from "./Services/Reducer";
import error from "./Assets/Img/error.svg";
import Checkout from "./Components/Checkout";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Orders from "./Components/Orders";

function App() {
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    const getCart = async () => {
      await axiosConfig
        .get(`/api/cart/fetch/`)
        .then((response: any) => {
          dispatch({
            type: "INIT_BASKET",
            basket: response.data,
          });
        })
        .catch((err: any) => {
          console.log(err);
          showToast("danger", dispatch, {
            title: err?.message,
            image: error,
          });
        });
    };

    const getSizes = async () => {
      await axiosConfig
        .get(`/api/size/fetch/`)
        .then((response: any) => {
          dispatch({
            type: "INIT_SIZE",
            size: response.data,
          });
        })
        .catch((err: any) => {
          console.log(err);
          showToast("danger", dispatch, {
            title: err?.message,
            image: error,
          });
        });
    };
    getSizes();

    const getIngredients = async () => {
      await axiosConfig
        .get(`/api/ingredients/fetch`)
        .then((response: any) => {
          dispatch({
            type: "INIT_INGREDIENTS",
            ingredients: response.data,
          });
        })
        .catch((err: any) => {
          console.log(err);
          showToast("danger", dispatch, {
            title: err?.message,
            image: error,
          });
        });
    };
    getIngredients();

    if (state.user) {
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

      getCart();
    }
  }, [state.user]);

  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route
            path="/orders"
            element={
              <>
                <Header />
                <Orders />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                <Header />
                <Checkout />
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
        </Routes>
        <Toast
          toastList={state.toast}
          position="top-right"
          autoDelete={true}
          dismissTime={2000}
        />
      </div>
    </HashRouter>
  );
}

export default App;
