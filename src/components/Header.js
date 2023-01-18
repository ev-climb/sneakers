function Header() {
    return (
        <header className="d-flex justify-between align-center p-40">
      <div className="d-flex align-center">
        <img width={40} height={40} src="/img/logo.svg"/>
        <div>
          <h3 className="text-uppercase">React sneakers</h3>
          <p className="opacity-5">Магазин лучших кросовок</p>
        </div>
      </div>
      <div>
        <ul className="d-flex">
          <li className="mr-30">
          <img width={18} height={18} src="/img/cart.svg"/>
            <span>1205 руб.</span>
          </li>
          <li>
          <img width={20} height={20} src="/img/user.svg"/>
          </li>
        </ul>
      </div>
     </header>
    )
}

export default Header;