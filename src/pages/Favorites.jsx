import Card from "../components/Card";

function Favorites({items}) {
    console.log(items);
    return (
        <div className="content p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1>Избранное</h1>
            
            </div>
            <div className="d-flex flex-wrap">
            {items.map((item, index) => (
                <Card 
                    key={index}
                    title = {item.title}
                    url = {item.url}
                    price = {item.price}
                    // onClickPlus = {(obj) => onAddToCart(obj)}
                    // onClickLike = {(obj) => onAddToFavorites(obj)}
                    // onRemoveItem = {(id) => onRemoveItem(id)}
                    id = {index}
                />
            ))}
            </div>
        </div>
    )
}

export default Favorites;