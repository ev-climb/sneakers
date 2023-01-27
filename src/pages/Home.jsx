import Card from "../components/Card"

function Home({
    searchValue,
    onChangeSearchInput,
    sneakers,
    onAddToCart,
    onAddToFavorites,
    onRemoveItem}) {
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
    )
}

export default Home;