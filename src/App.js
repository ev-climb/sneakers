import React from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Favorites from "./pages/Favorites";



function App() {
  const [cartOpened, setCartOpener] = React.useState(false);
  const [sneakers, setSneakers] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [favorites, setFavorites] = React.useState([]);

  React.useEffect(()=>{
    axios.get('https://63cf94521098240437820504.mockapi.io/items').then((res)=>{
      setSneakers(res.data)
    });
    axios.get('https://63cf94521098240437820504.mockapi.io/cart').then((res)=>{
      setCartItems(res.data)
    });
    axios.get('https://63cf94521098240437820504.mockapi.io/favorites').then((res)=>{
      setFavorites(res.data)
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
      <Routes>
        <Route path="/" element={
          <Home 
          searchValue={searchValue}
          onChangeSearchInput={onChangeSearchInput}
          sneakers={sneakers}
          onAddToCart={onAddToCart}
          onAddToFavorites={onAddToFavorites}
          onRemoveItem={onRemoveItem}
          />
        }/>   
        <Route path="/favorites" element={
          <Favorites items={favorites}/>
        }/>                 
      </Routes>
      
    </div>
  );
}

export default App;
