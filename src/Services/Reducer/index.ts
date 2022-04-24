import axiosConfig from "../axios/axios";

export const initialState = {
  basket: [],
  user: null,
  toast: [],
  ingredients: [],
  size: [],
};

let toastProperties: any;

export const showToast = (type: any, dispatch: any, data: any) => {
  const id = Math.floor(Math.random() * 101 + 1);

  switch (type) {
    case "success":
      toastProperties = {
        id,
        title: data?.title,
        description: data?.info,
        backgroundColor: "#42ba96",
        icon: data?.image,
      };
      break;
    case "danger":
      toastProperties = {
        id,
        title: data?.title,
        description: data?.info,
        backgroundColor: "#df4759",
        icon: data?.image,
      };
      break;
    case "info":
      toastProperties = {
        id,
        title: data?.title,
        description: data?.info,
        backgroundColor: "#0275d8",
        icon: data?.image,
      };
      break;
    case "warning":
      toastProperties = {
        id,
        title: data?.title,
        description: data?.info,
        backgroundColor: "#eed202",
        icon: data?.image,
      };
      break;

    default:
      dispatch({
        type: "SET_TOAST",
        toast: null,
      });
  }

  dispatch({
    type: "SET_TOAST",
    toast: toastProperties,
  });
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "INIT_SIZE":
      return {
        ...state,
        size: [...action.size],
      };
    case "INIT_INGREDIENTS":
      return {
        ...state,
        ingredients: [...action.ingredients],
      };
    case "ADD_TO_CART":
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

        // API call to Add to Cart
        try {
          const cart = axiosConfig.post(`/api/cart/add`, { ...action.basket });
          showToast("info", action.dispatch, {
            title: "Pizza Added Successfully",
            info: `Price : ${action.totalPrice}`,
            image: action.info,
          });

          return {
            ...state,
            basket: [...state.basket, action.basket],
          };
        } catch (error) {
          console.log(error);
          return state;
        }
      } else {
        return {
          ...state,
          basket: [...state.basket, action.basket],
        };
      }
    case "SET_TOAST":
      if (action.toast !== null) {
        return {
          ...state,
          toast: [...state.toast, action.toast],
        };
      } else {
        return {
          ...state,
          toast: action.toast,
        };
      }
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "INIT_BASKET":
      return {
        ...state,
        basket: [...action.basket],
      };
    case "EMPTY_CART":
      return {
        ...state,
        basket: []
      }
    case "SIGN_OFF_USER":
      return {
        ...state,
        user: null
      }
    default:
      return state;
  }
};

export default reducer;
