import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

function Header(props) {
  const { cartItems } = React.useContext(AppContext)
  const totalPrice = cartItems.reduce((sum, obj)=> obj.price + sum, 0)
console.log(totalPrice);
  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex align-center">
          <img width={40} height={40} src="img/logo.svg" alt="Logo"/>
          <div>
            <h3 className="text-uppercase">React sneakers</h3>
            <p className="opacity-5">Магазин лучших кросовок</p>
          </div>
        </div>
      </Link>
      <div>
        <ul className="d-flex">
          <li className="mr-30 cu-p" onClick={props.onClickCart}>
            <img width={18} height={18} src="img/cart.svg" alt="Cart"/>
            <span>{totalPrice} руб.</span>
          </li>
          <li className="mr-15 cu-p">
            <Link to="/favorites">
              <img width={18} height={18} src="img/heart.svg" alt="Heart" />
            </Link>
          </li>
          <li>
            <Link to="/orders">
              <img width={18} height={18} src="img/user.svg" alt="User"/>
            </Link>
          </li>
        </ul>
      </div>
     </header>
    )
}

export default Header;