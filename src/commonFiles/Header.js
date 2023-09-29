// import { LOGO_IMG } from "../utils/common";
import { useState, useContext } from "react";
import { FiArrowDown } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { MdFastfood, MdDeliveryDining } from "react-icons/md";
// import {PiHandsPrayingFill} from 'react-icons/pi';
import {
  BiSolidCartAlt,
  BiSolidOffer,
  BiSolidLogInCircle,
  BiSolidLogOutCircle,
} from "react-icons/bi";
import { IoMdHelpCircle } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import useInternetConnection from "../hooks/useInternetConnection";
import UserContext from "../contextApi/UserContext";
import { useSelector } from "react-redux";


const Header = () => {
  const [loginBtn, setLoginBtn] = useState("Login");
  const internetStatus = useInternetConnection();

  // get here how to useContext api
  const { loggedInUser } = useContext(UserContext);

  // subscribing to the store using a useSelector
  const cartItem = useSelector((store) => store.cart.items);
  // console.log(cartItem);
  
  return (
    <div className="header-container">
      <div className="navbar">
        <div className="logo">
          <Link className="logolink" to="/">
            {/* <img width="200px" height="70px" src={foodlogo} alt="food-logo" /> */}
            {/* <h3>Namaste Food</h3> */}
              <h1>
               <MdFastfood
                 style={{
                   fontSize: "40px",
                   color: "black",
                   fontWeight: "bold",
                 }}
               />
               <span className="logonamaste" style={{ fontSize: "20px", fontWeight: "bolder", color: "black"}}>
                  Namaste Food 
                 {/* <PiHandsPrayingFill style={{ fontSize: "24px", fontWeight: "bolder"  }} />  */}
                
               </span>
             </h1>
          </Link>
          <div className="current-location">
            <p className="mainAddress">Pune</p>
            <p className="addresss">
            PUNE 406, Siddhi Complex Pune-412308
              <FiArrowDown style={{ color: "orangered", fontWeight: "bold" }} />
            </p>
          </div>
        </div>
        <div className="listnavbar">
          <ul className="nav-list">
            <li>
              <Link className="links" to="/searchBar">
                <FiSearch style={{ fontSize: "18px", marginRight: "3px" }} />
                Search
              </Link>
            </li>
            <li>
              <Link className="links" to="/offers">
                <BiSolidOffer /> Offer
                <sup style={{ color: "orangered" }}> New</sup>
              </Link>
            </li>
            <li>
              <Link className="links" to="/help">
                <IoMdHelpCircle /> Help
              </Link>
            </li>
            <li>
              <Link className="links font-bold" to="/cart">
                <BiSolidCartAlt /> Cart ({cartItem.length} items)
              </Link>
            </li>
            <li>
              <Link className="links" to="/contact">
                <FaUserCircle /> {loggedInUser}
              </Link>
            </li>
            <li>
              <Link
                className="links"
                to="/login"
                onClick={() => {
                  loginBtn === "Login"
                    ? setLoginBtn("Logout")
                    : setLoginBtn("Login");
                }}
              >
                {loginBtn === "Login" ? (
                  <BiSolidLogInCircle
                    style={{ fontSize: "20px", color: "green" }}
                  />
                ) : (
                  <BiSolidLogOutCircle
                    style={{ fontSize: "20px", color: "red" }}
                  />
                )}
                {loginBtn}
              </Link>
            </li>
            <li className="links">{internetStatus ? "✅" : "🔴"}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
