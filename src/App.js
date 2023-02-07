import React from "react";
import { Route, Routes } from "react-router-dom";
import { HashRouter as Router } from "react-router-dom";

import axios from "axios";

import Favorites from "./pages/Favorites";
import Header from "./components/Header";
import Drawer from "./components/Drawer/Drawer";
import Orders from "./pages/Orders";
import Home from "./pages/Home";

export const AppContext = React.createContext({});

function App() {
  const [cartOpened, setCartOpened] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [sneakers, setSneakers] = React.useState([]);

  const api = 'https://63cf94521098240437820504.mockapi.io/';

  React.useEffect(()=>{
    async function fetchData() {      
      try {
        const [cartRes, favoritesRes, sneakersRes] = await Promise.all([
          axios.get(`${api}cart`),
          axios.get(`${api}favorites`),
          axios.get(`${api}items`)
        ]);
        setIsLoaded(false)
        setCartItems(cartRes.data)
        setFavorites(favoritesRes.data)
        setSneakers(sneakersRes.data)       
      } catch (err) {
        alert('Ошибка запроса данных :(')
        console.log(err);
      }
    }
    fetchData()
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item)=> item.imageUrl === obj.imageUrl);
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.itemId) !== Number(obj.id)));       
        await axios.delete(`${api}cart/${findItem.id}`);
      } else {
        setCartItems((prev)=>[...prev, obj]);
        const { data } = await axios.post(`${api}cart`, obj);
        setCartItems((prev) => prev.map((item) => {
          if (item.itemId === data.itemId) {
            return {
              ...item,
              id: data.id
            };
          }
          return item;
        }))
      }
    } catch (error) {
      alert('Не удалось добавить в Корзину')
      console.log(error);
    }    
  }

  const onAddToFavorites = async (obj) => {  
    try {
      const findItem = favorites.find((favObj)=> favObj.imageUrl === obj.imageUrl);
      if (findItem) {     
        setFavorites((prev) => prev.filter((item) => Number(item.itemId) === Number(obj.id)));
        await axios.delete(`${api}favorites/${findItem.id}`); 
      } else {
          const {data} = await axios.post(`${api}favorites`, obj);
          setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в Избранное')
      console.log(error);
    }     
  }    
  
  const onRemoveItem = (id) => {
    try {
      axios.delete(`${api}cart/${id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    } catch (error) {
      alert('Ошибка при удалении из корзины');
      console.log(error);
    }
  }

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.itemId) === Number(id));
  };

  return (
    <AppContext.Provider 
      value={{
        api, 
        sneakers, 
        cartItems, 
        favorites, 
        onAddToCart,
        isItemAdded,
        setCartItems, 
        setCartOpened,       
        onAddToFavorites
      }}>
      <div className="wrapper clear">
        <Drawer 
          items={cartItems} 
          opened={cartOpened}
          onRemove={onRemoveItem}
          onClose={()=>setCartOpened(!cartOpened)}          
        /> 
        <Header onClickCart={()=>setCartOpened(!cartOpened)}/>
        <Routes>
          <Route path="" exact element={
            <Home 
              sneakers={sneakers}
              isLoaded={isLoaded}
              cartItems={cartItems}
              searchValue={searchValue}
              onAddToCart={onAddToCart}
              onRemoveItem={onRemoveItem}
              onAddToFavorites={onAddToFavorites}
              onChangeSearchInput={onChangeSearchInput}
            />
          }/>   
          <Route path="favorites" exact element={
            <Favorites />
          }/>       
          <Route path="orders" exact element={
            <Orders onAddToFavorites={onAddToFavorites} />
          }/>             
        </Routes>      
      </div>
    </AppContext.Provider>
  )
}

export default App;