import React from "react";
import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";


function App() {
  const [cartOpened, setCartOpener] = React.useState(false);
  const [sneakers, setSneakers] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])

  React.useEffect(()=>{
    fetch('https://63cf94521098240437820504.mockapi.io/items')
    .then((res)=>{
      return res.json();
    })
    .then((json)=>{
      setSneakers(json)
    })
  }, []);

  const onAddToCart = (obj) => {
    setCartItems(prev => [...prev, obj])
  }

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClose={()=>setCartOpener(!cartOpened)}/>}    
      <Header onClickCart={()=>setCartOpener(!cartOpened)}/>
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>Все кросовки</h1>
          <div className="search-block">
            <img src="/img/search.svg" alt="Search"/>
            <input placeholder="Поиск..."/>
          </div>
        </div>
        <div className="d-flex flex-wrap">
        {sneakers.map((item) => (
          <Card 
            title = {item.name}
            url = {item.imageUrl}
            price = {item.price}
            onClickPlus = {(obj) => onAddToCart(obj)}
            onClickLike = {() => console.log('Нажали лайк')}
            />
        ))}
        </div>
      </div>
    </div>
  );
}

export default App;
