import React from "react";
import axios from "axios";

import Info from "../Info";
import { AppContext } from "../../App";

import styles from './Drawer.module.scss'

const delay = (ms) => new Promise((res)=> setTimeout(res, ms))

function Drawer({onClose, onRemove, opened, items = []}) {
    const {cartItems, setCartItems, api} = React.useContext(AppContext)
    const [orderId, setOrderId] = React.useState(null)
    const [isOrderComplete, setIsOrderComplete] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const totalPrice = cartItems.reduce((sum, obj)=> obj.price + sum, 0)


    const onClickOrder = async () => {
        try {
            setIsLoading(true)
            const {data} = await axios.post(`${api}orders`, {items: cartItems})
            setOrderId(data.id)
            setIsOrderComplete(true)
            setCartItems([])

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                axios.delete(`${api}cart/` + item.id)
                await delay(1000)
            }
            
        } catch (error) {
            alert('Не удалось создать заказ')
            console.log(error);
        }
        setIsLoading(false)
    }

    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={styles.drawer}>
                <h2 className="mb-30 d-flex justify-between">Корзина
                    <img 
                        className="removeBtn" 
                        src="img/btn-remove.svg" 
                        alt="Close"
                        onClick={onClose}
                    />
                </h2>
                { items.length > 0 ? 
                    <>
                        <div className="items"> 
                            {items.map((obj)=>(                
                                <div className="cartItem d-flex align-center mb-20" key={obj.imageUrl}>
                                    <img 
                                        width={70}                    
                                        alt="Sneakers"
                                        className="mr-20" 
                                        src={obj.imageUrl} 
                                    />
                                    <div className="mr-20">
                                        <p className="mb-5">{obj.name}</p>
                                        <b>{obj.price} руб.</b>
                                    </div>
                                    <img 
                                        className="removeBtn" 
                                        src="img/btn-remove.svg" 
                                        alt="Remove" 
                                        onClick={()=> onRemove(obj.id)}
                                    />
                                </div>                                        
                            ))}
                        </div>
                        <div className="cartTotalBlock">
                            <ul>
                                <li className="d-flex mb-20">
                                    <span>Итого:</span>
                                    <div></div>
                                    <b>{totalPrice} руб.</b>
                                </li>
                                <li className="d-flex">
                                    <span>Налог 5%:</span>
                                    <div></div>
                                    <b>{totalPrice*0.05} руб.</b>
                                </li>
                            </ul>
                            <button 
                                disabled={isLoading}
                                onClick={onClickOrder} 
                                className="greenButton">Оформить заказ<img src="img/arrow.svg" alt="Arrow"/>
                            </button>
                        </div>
                    </>
                :   
                    <Info 
                        title={isOrderComplete ? "Заказ оформлен" : "Корзина пуста" }
                        description={isOrderComplete ? `Ваш заказ №${orderId} передан курьерской службе` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ"} 
                        image={isOrderComplete ? "img/order-ok.png" : "img/box.png"}
                    />                               
                }                        
            </div>
        </div>
    )
}

export default Drawer;