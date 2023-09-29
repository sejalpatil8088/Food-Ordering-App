import React, { useState, useEffect } from "react";
import RestaurantCardList, { withPromotedLable } from "./RestaurantCardList";
import SliderCard from "./SliderCard";
import { restListNew } from "../utils/common";
import { FiSearch } from "react-icons/fi";
import Shimmer from "./Shimmer";
import useInternetConnection from "../hooks/useInternetConnection";
// import TikTokGame from "../game/TikTokGame";

const Home = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [searchFilter, setSearchFilter] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  // Hooks
  const internetStatus = useInternetConnection();
  // Highr order components
  const RestaurantCardPromoted = withPromotedLable(RestaurantCardList);

  // initialize checkJsonData() function to check Swiggy Restaurant data
  const getRestaurantApi = async () => {
    try {
      const response = await fetch(restListNew);
      const json = await response.json();
      console.log(json.data);
      let checkData =
        json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;
      setRestaurantList(checkData);
      setSearchFilter(checkData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRestaurantApi();
  }, []);

  if (internetStatus === false) {
    return (
      <p style={{ textAlign: "center", marginTop: "15px", color: "red" }}>
           You are offline
         {/* <TikTokGame /> */}
       </p>
    );
  }

  // Filter the restaurant data according input type
  const handleSearchClick = () => {
    const filterBySearch = restaurantList.filter((item) =>
      item.info.name.toLowerCase().includes(searchVal.toLowerCase())
    );
    setSearchFilter(filterBySearch);
  };
  // Filter the Top restaurant data according buttom type
  const handleTopratingRestaurant = () => {
    const filterTopRatedRestaurant = restaurantList.filter(
      (res) => res.info.avgRating > 4
    );
    setSearchFilter(filterTopRatedRestaurant);
  };
  // Filter the below price data according buttom type
  const handleBelowPrice = () => {
    setRestaurantList(restaurantList);
    const FindBelowPrice = restaurantList.filter(
      (res) => res?.info?.costForTwo < "₹300 for two"
    );
    // console.log(findPriceRange);
    setSearchFilter(FindBelowPrice);
  };
  // Filter the above price data according buttom type
  const handleAbovePrice = () => {
    setRestaurantList(restaurantList);
    const findGreaterprice = restaurantList.filter(
      (res) => res?.info?.costForTwo >= "₹300 for two"
    );
    // console.log(findGreaterprice);
    setSearchFilter(findGreaterprice);
  };

  return restaurantList?.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <div className="Restaurant-List">
        <div className="container">
          <SliderCard />
          <div className="headingTitle">
            <h4 className="mb-3" style={{ fontWeight: "bolder" }}>
              Restaurants with online food delivery in Pune
            </h4>
          </div>
          <div className="row">
            <div className="col-md-8">
              <div className="top-restaurant">
                <button
                  className="filterbtn"
                  onClick={handleTopratingRestaurant}
                >
                  Rating 4.0+
                  <span
                    className="fa fa-star filterbtnn"
                    style={{ color: "orange" }}
                  ></span>
                </button>
                <button className="filterbtn" onClick={handleBelowPrice}>
                  Less than Rs.300
                </button>
                <button className="filterbtn" onClick={handleAbovePrice}>
                  Rs.300 - Rs.600
                </button>
                <button className="filterbtn">Non-veg 🍗</button>
                <button className="filterbtn">Pure Veg 🥗</button>
                <button className="filterbtn">Fast Delivery 🚚</button>
              </div>
            </div>
            <div className="col-md-4">
              <div className="searchFilter">
                <input
                  className="form-control mr-sm-1"
                  type="search"
                  value={searchVal}
                  onChange={(e) => {
                    setSearchVal(e.target.value);
                  }}
                  placeholder="Search for restaurant and food"
                  aria-label="Search"
                />
                <button
                  className="btn btn-warning"
                  type="submit"
                  onClick={handleSearchClick}
                >
                  <FiSearch />
                </button>
              </div>
            </div>
          </div>
          <hr></hr>
          <div className="row">
            {searchFilter?.map((restdetails) => {
              // console.log("helllo" +restdetails?.info?.name);
              return (
                <>
                  {restdetails?.info?.isOpen ? (
                    <RestaurantCardPromoted
                      key={restdetails?.info?.isOpen}
                      {...restdetails}
                    />
                  ) : (
                    <RestaurantCardList
                      key={restdetails?.info?.name}
                      {...restdetails}
                    />
                  )}
                </>
              );
            })}
          </div>
          <hr></hr>
        </div>
      </div>
    </>
  );
};

export default Home;
