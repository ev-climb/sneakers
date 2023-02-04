import React from "react";
import { Route, Routes } from "react-router-dom";

import axios from "axios";

import Favorites from "./pages/Favorites";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";

export const AppContext = React.createContext({});

function App() {
  const [cartOpened, setCartOpened] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [sneakers, setSneakers] = React.useState([]);

  const api = 'https://63cf94521098240437820504.mockapi.io/';

  React.useEffect(()=>{
    async function fetchData() {      
      setIsLoaded(true)

      const cartRes = await axios.get(`${api}cart`)
      const favoritesRes = await axios.get(`${api}favorites`)
      const sneakersRes = await axios.get(`${api}items`)

      setIsLoaded(false)
      setCartItems(cartRes.data)
      setFavorites(favoritesRes.data)
      setSneakers(sneakersRes.data)
    }

    fetchData()
  }, []);

  const onAddToCart = (obj) => {
    try {
      if (cartItems.find((item) => item.imageUrl === obj.imageUrl)) {
        cartItems.find((item)=> axios.delete(`${api}cart/${item.id}`))
        setCartItems((prev) => prev.filter((item) => item.imageUrl !== obj.imageUrl))
      } else {
        axios.post(`${api}cart`, obj)
        .then(()=>setCartItems(axios.get(`${api}cart`)
        .then((res)=>{
          setCartItems(res.data)
        })))
      }
    } catch (error) {
      alert('Не удалось добавить в Корзину')
    }    
  }

  const onAddToFavorites = (obj) => {  
    try {
      if (favorites.find((favObj) => favObj.imageUrl === obj.imageUrl)) {   
        favorites.find((item)=> axios.delete(`${api}favorites/${item.id}`))   
        setFavorites((prev) => prev.filter((item) => item.imageUrl !== obj.imageUrl))
      } else {
          axios.post(`${api}favorites`, obj)
          .then(()=> setFavorites(axios.get(`${api}favorites`)
          .then((res)=>{ setFavorites(res.data) })))}
    } catch (error) {
      alert('Не удалось добавить в Избранное')
    }     
  }    
  
  const onRemoveItem = (obj) => {
    axios.delete(`${api}cart/${obj.id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== obj.id));
  }

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  }

  return (
    <AppContext.Provider value={{api, cartItems, setCartItems, favorites, sneakers, setCartOpened}}>
      <div className="wrapper clear">
        {cartOpened && 
          <Drawer 
            items={cartItems} 
            onRemove={onRemoveItem}
            onClose={()=>setCartOpened(!cartOpened)}          
          />
        }    
        <Header onClickCart={()=>setCartOpened(!cartOpened)}/>
        <Routes>
          <Route path="/" element={
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
          <Route path="/favorites" element={
            <Favorites onAddToFavorites={onAddToFavorites} />
          }/>                 
        </Routes>      
      </div>
    </AppContext.Provider>
  )
}

export default App;