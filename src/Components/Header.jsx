import { Link } from "react-router-dom";

import logo from "../assets/MyEstate.png";

function Header() {
  return (
    <>
      <div className="headerRow">
        <div className="left">
          
<Link to="/"><img src={logo} alt="logo" className="LogoImage"/></Link>
        </div>

        <div className="right">
<Link to="/search" className="headerbutton">Search</Link>
<Link to="/favourites" className="headerbutton">Favourites</Link>

        </div>
      </div>

      <hr />
    </>
  );
}

export default Header;
