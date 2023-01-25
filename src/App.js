import React from "react";
import axios from "axios";
import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";



function App() {
  const [cartOpened, setCartOpener] = React.useState(false);
  const [sneakers, setSneakers] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');

  React.useEffect(()=>{
    axios.get('https://63cf94521098240437820504.mockapi.io/items').then((res)=>{
      setSneakers(res.data)
    })
  }, []);

  const onAddToCart = (obj) => {
    axios.post('https://63cf94521098240437820504.mockapi.io/cart', obj);
    setCartItems(prev => [...prev, obj])
  }

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  }

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClose={()=>setCartOpener(!cartOpened)}/>}    
      <Header onClickCart={()=>setCartOpener(!cartOpened)}/>
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>{searchValue ? `Поиск по запросу "${searchValue}"` : 'Все кроссовки'}</h1>
          <div className="search-block">
            <img src="/img/search.svg" alt="Search"/>
            <input placeholder="Поиск..." value={searchValue} onChange={onChangeSearchInput}/>
          </div>
        </div>
        <div className="d-flex flex-wrap">
        {sneakers.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase())).map((item, index) => (
          <Card 
            key={index}
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
