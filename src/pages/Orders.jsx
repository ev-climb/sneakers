import React from "react";
import Card from "../components/Card";
import axios from "axios";
import { AppContext } from "../App";

function Orders() {
    const [orders, setOrders] = React.useState([]);
    const [isLoaded, setIsLoaded] = React.useState(true);
    const {api} = React.useContext(AppContext)

    React.useEffect(()=>{
        (async () => {
            try {
                const {data} = await axios.get(`${api}orders`)
                setOrders(data.reduce((prev, obj)=>[...prev, ...obj.items], []))
                setIsLoaded(false)
            } catch (err) {
                alert('Не удалось загрузить покупки')
                console.log(err);
            }
        })()
    }, [])
    return (
        <div className="content p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1>Мои заказы</h1>         
            </div>
            <div className="d-flex flex-wrap">
                {(isLoaded ? [...Array(8)]: orders).map((item, index) => (
                    <Card 
                        {...item}
                        key={index}
                        loading={isLoaded} 
                    />
                ))}
            </div>
        </div>
    )
}

export default Orders;