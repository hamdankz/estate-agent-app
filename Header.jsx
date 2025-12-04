import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="headerRow">
        <div className="left">
          
<Link to="/"><img src="/logo.png" alt="logo" /> My Estate</Link>
        </div>

        <div className="right">
<Link to="/search">Search Properties</Link>
<Link to="/favourites">Favourites</Link>

        </div>
      </div>

      <hr />
    </>
  );
}

export default Header;
