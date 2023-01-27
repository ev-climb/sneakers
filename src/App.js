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
  const [favorites, setFavorites] = React.useState('');

  React.useEffect(()=>{
    axios.get('https://63cf94521098240437820504.mockapi.io/items').then((res)=>{
      setSneakers(res.data)
    });
    axios.get('https://63cf94521098240437820504.mockapi.io/cart').then((res)=>{
      setCartItems(res.data)
    })
  }, []);

  const onAddToCart = (obj) => {
    axios.post('https://63cf94521098240437820504.mockapi.io/cart', obj)
    .then((res)=>setCartItems(prev => [...prev, obj]))
  }

  const onAddToFavorites = (obj) => {
    axios.post('https://63cf94521098240437820504.mockapi.io/favorites', obj)
    .then((res)=>setFavorites(prev => [...prev, obj]))
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://63cf94521098240437820504.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  }

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClose={()=>setCartOpener(!cartOpened)} onRemove={onRemoveItem}/>}    
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
            onClickLike = {(obj) => onAddToFavorites(obj)}
            onRemoveItem = {(id) => onRemoveItem(id)}
            id = {index}
            />
        ))}
        </div>
      </div>
    </div>
  );
}

export default App;
