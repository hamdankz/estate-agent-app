import { Link } from "react-router-dom";


function Hero() {
  return (
    <>
      <section className="hero">

        <div className="heroCard">

            <div className="heroContent">

            <h1>Find Your Perfect Home</h1>
            <p>Search thousands of properties across London with smart filters.</p>

            <Link to="/search" className="headerbutton">Start Searching</Link>
            
            </div>

        </div>

      </section>
    </>
  );
}

export default Hero;
