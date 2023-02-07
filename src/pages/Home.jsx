import React from "react";
import Card from "../components/Card"

function Home({
    sneakers,
    isLoaded,
    onAddToCart,
    searchValue,
    onAddToFavorites,
    onChangeSearchInput,
    }) 
    {
        const renderItems = () => {
            const filterItems = sneakers.filter((item)=> 
            item.title.toLowerCase().includes(searchValue.toLowerCase()));
            return (!isLoaded ? [...Array(8)] : filterItems).map((item, index) => (
                <Card 
                    {...item}
                    key={index}
                    loading={isLoaded} 
                    onClickPlus = {(obj) => onAddToCart(obj)}
                    onClickLike = {(obj) => onAddToFavorites(obj)}                      
                />
            ))
        }       

        return (
            <div className="content p-40">
                <div className="d-flex align-center mb-40 justify-between">
                        <h1>{searchValue ? `Поиск по запросу "${searchValue}"` : 'Все кроссовки'}</h1>
                    <div className="search-block">
                        <img src="img/search.svg" alt="Search"/>
                        <input placeholder="Поиск..." value={searchValue} onChange={onChangeSearchInput}/>
                    </div>
                </div>
                <div className="d-flex flex-wrap">
                    {renderItems()}
                </div>
            </div>
        )
    }

export default Home;