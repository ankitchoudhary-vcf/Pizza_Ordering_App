import React from 'react';
import './style.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from "react-router-dom";
import { useStateValue } from '../../Services/StateProvider'


const Header = () => {
    const [{ basket, user }, dispatch] = useStateValue()

    const handleAuthentication = () => {
        if (user) {
            dispatch({
                type: 'SIGN_OFF_USER'
            })
        }
    }

    return (
        <div className="header">

            {/*header logo*/}
            <Link to='/'>
                <img
                    className="header_logo"
                    src={require("../../Assets/Img/Icon.png")}
                    alt=""
                />
            </Link>

            {/*header search*/}
            <div className="header_search">
                <input type="text" placeholder="Search...." className="header_searchInput" />
                {/*search logo*/}
                <SearchIcon className="header_searchIcon" />
            </div>

            {/*header navigation*/}
            <div className="header_nav">
                <Link className="header_options" to={!user ? '/login' : ''} onClick={handleAuthentication}>
                    <span className="header_option_LineOne">Hello, {!user ? 'Guest' : user?.user?.Name}</span>
                    <span className="header_option_LineTwo">{user ? 'Sign Out' : 'Sign In'}</span>
                </Link>
                <Link className="header_options" to='/orders'>
                    <span className="header_option_LineOne">Returns</span>
                    <span className="header_option_LineTwo">& Orders</span>
                </Link>
                <Link className="header_optionBasket" to='/checkout'>
                    <ShoppingBasketIcon className="shopping_basket_icon" />
                    <span className="header_option_LineTwo header_basketCount">{basket?.length}</span>
                </Link>
            </div>
        </div>
    )
}

export default Header
