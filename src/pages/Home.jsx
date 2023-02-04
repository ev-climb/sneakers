import React from "react";
import Card from "../components/Card"

function Home({
    sneakers,
    isLoaded,
    onAddToCart,
    searchValue,
    onAddToFavorites,
    onChangeSearchInput,
    }) {


    

    const renderItems = () => {
        return (!isLoaded ? sneakers.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase())) : [...Array(8)])
        .map((item, index) => (
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
                    <img src="/img/search.svg" alt="Search"/>
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