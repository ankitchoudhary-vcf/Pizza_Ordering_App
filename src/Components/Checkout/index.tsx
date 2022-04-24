import React from 'react'
import { useStateValue } from '../../Services/StateProvider';
import CheckoutProduct from '../CheckoutProduct';
import Subtotal from '../Subtotal'
import './style.css'

const Checkout = () => {
  const [state, dispatch] = useStateValue();


  return (
    <div className="checkout">
        <div className="checkout_panel">
                <div className="checkout_left">
                    <img
                        className="checkout_ad"
                        src="https://designs.princesharma.in/wp-content/uploads/2021/08/Pizza-scaled.jpg"
                        alt=""
                    />
                </div>
                <div className="checkout_right">
                    <Subtotal />
                </div>
            </div>

            <div>
                <h2 className="checkout_title">Your Shopping Basket</h2>
                {state.basket.map(
                    (
                        item: any
                    ) => (
                        <CheckoutProduct
                            key={`${item.id}_checkout`}
                            data={item}
                            />
                    )
                )}

            </div>
    </div>
  )
}

export default Checkout