function Drawer() {
    return (
        <div style={{display: 'none'}} className="overlay">
            <div className="drawer">
            <h2 className="mb-30 d-flex justify-between">Корзина<img className="removeBtn" src="/img/btn-remove.svg" alt="Remove"/></h2>
            <div className="items">
                <div className="cartItem d-flex align-center mb-20">
                <img className="mr-20" width={70} src="/img/sneakers/s1.jpg" alt="Sneakers"/>
                <div className="mr-20">
                    <p className="mb-5">Мужские Кроссовки Nike Air Max 270</p>
                    <b>12 999 руб.</b>
                </div>
                <img className="removeBtn" src="/img/btn-remove.svg" alt="Remove"/>
                </div>
                <div className="cartItem d-flex align-center mb-20">
                <img className="mr-20" width={70} src="/img/sneakers/s1.jpg" alt="Sneakers"/>
                <div className="mr-20">
                    <p className="mb-5">Мужские Кроссовки Nike Air Max 270</p>
                    <b>12 999 руб.</b>
                </div>
                <img className="removeBtn" src="/img/btn-remove.svg" alt="Remove"/>
                </div>
            </div>
            <div className="cartTotalBlock">
                <ul>
                <li className="d-flex mb-20">
                    <span>Итого:</span>
                    <div></div>
                    <b>21 498 руб.</b>
                </li>
                <li className="d-flex">
                    <span>Налог 5%:</span>
                    <div></div>
                    <b>1074 руб.</b>
                </li>
                </ul>
                <button className="greenButton">Оформить заказ<img src="/img/arrow.svg" alt="Arrow"/></button>
            </div>
            </div>
        </div>
    )
}

export default Drawer;