import "bootstrap/dist/css/bootstrap.min.css";
import React, { lazy, Suspense, useEffect, useState } from "react";
import Login from "./commonFiles/Login";
import Header from "./commonFiles/Header";
import Home from "./components/Home";
import Contact from "./commonFiles/Contact";
import Footer from "./commonFiles/Footer";
import Error from "./commonFiles/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import SearchBar from "./components/SearchBar";
import Cart from "./components/Cart";
import Shimmer from "./components/Shimmer";
import { Route, Routes } from "react-router-dom";
import UserContext from "./contextApi/UserContext";
import { Provider } from "react-redux";
import appStore from "./reduxToolkit/appStore";
import Offers from "./components/Offers";
// import About from "./commonFiles/About";

const About = lazy(() => import("./commonFiles/About"));

const App = () => {
  const [userName, setUserName] = useState();

  useEffect(() => {
    const data = {
      name: "Sejal",
    };
    setUserName(data.name);
  }, []);
  return (
    <>
      <Provider store={appStore}>
        {/* outside is fefault user name */}
        <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
          {/* inside is rahul name */}
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/searchBar" element={<SearchBar />} />
            <Route
              path="/about"
              element={
                <Suspense fallback={<Shimmer />}>
                  <About />
                </Suspense>
              }
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/error" element={<Error />} />
            <Route
              path="/restaurantMenu/:restid"
              element={<RestaurantMenu />}
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/*" element={<Error />} />
          </Routes>
        </UserContext.Provider>
        <UserContext.Provider value={{ loggedInUser: "Sejal Patil" }}>
          
          <Footer />
        </UserContext.Provider>
      </Provider>
    </>
  );
};
export default App;
