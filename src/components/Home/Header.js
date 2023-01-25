import { useEffect, useState } from "react";
import MainHeader from "../common/MainHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Header() {
  let navigate = useNavigate();
  let [locationList, setLocationList] = useState([]);
  let [locationId, setLocationId] = useState("");
  let [restaurantInputText, setRestaurantInputText] = useState("");
  let [searchList, setSearchList] = useState([]);

  let getLocationList = async () => {
    let url = "http://localhost:5003/api/get-location-list";
    let { data } = await axios.get(url);
    setLocationList(data.location);
  };
  let getSelectValue = (event) => {
    let { value } = event.target;
    setLocationId(value);
  };
  let searchForRestaurant = async (e) => {
    let { value } = e.target;
    setRestaurantInputText(value);
    // console.log(value);
    if (value !== "") {
      let url = "http://localhost:5003/api/search-restaurant";
      let { data } = await axios.post(url, {
        restaurant: value,
        loc_id: locationId,
      });
      setSearchList(data.result);
      // console.log(data.result);
    }
  };

  useEffect(() => {
    setRestaurantInputText("");
    setSearchList([]);
  }, [locationId]); // on update

  useEffect(() => {
    getLocationList();
  }, []);
  return (
    <>
      <main className="container-fluid background m-0">
        {/* <header className="row d-none d-lg-block d-md-block p-3 m-0">
          <div className="col-11 d-flex justify-content-end">
            <button className="btn text-white">Login</button>
            <button className="btn btn-outline-light">Create An Account</button>
          </div>
        </header> */}
        <MainHeader />
        <section className="row m-0">
          <div className="col-12 mt-5">
            <p className="col-1 brand fw-bold m-auto">e!</p>
          </div>
          <div className="col-lg-12 d-flex justify-content-center align-content-center m-3 mt-lg-4 m-md-0">
            <p className="h1 fw-bold text-white text-center">
              Find the best restaurants, cafés, and bars
            </p>
          </div>
          <div className="row">
            <div className="col-12 d-none d-lg-block d-md-block mt-4">
              <div className="d-flex justify-content-center gap-4">
                <div className="">
                  <select
                    type="text"
                    placeholder="Please type a location"
                    className="outline ps-3 py-3 pe-5"
                    onChange={getSelectValue}
                  >
                    <option value="">Please select location</option>
                    {locationList.map((location, index) => {
                      return (
                        <option key={index} value={location.location_id}>
                          {location.name},{location.city}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="bg-light outline">
                  <input
                    type="text"
                    placeholder="Search for restaurants"
                    className="border border-0 outline py-3 pe-4"
                    value={restaurantInputText}
                    disabled={locationId === "" ? true : false}
                    onChange={searchForRestaurant}
                  />
                  <ul className="list-group absolute bottom-0 w-100">
                    {searchList.map((restaurant) => {
                      return (
                        <li
                          key={restaurant._id}
                          className="list-group-item"
                          onClick={() =>
                            navigate("/restaurant_order/" + restaurant._id)
                          }
                        >
                          {restaurant.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <div className="row d-lg-none d-md-none">
              <div className="col-12 bg-light m-3 p-0">
                <select
                  type="text"
                  placeholder="Please type a location"
                  className="py-3 ps-2 pe-5 border-0 outline"
                  onChange={getSelectValue}
                >
                  <option value="">Please select location</option>
                  {locationList.map((location, index) => {
                    return (
                      <option key={index} value={location.location_id}>
                        {location.name},{location.city}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="col-12 d-flex  small_phone bg-light m-3 p-0">
                <i
                  className="fa fa-search fs-5 text-secondary ps-2 pt-3"
                  aria-hidden="true"
                  aria-placeholder="Search for restaurants "
                ></i>

                <input
                  type="text"
                  placeholder="Search for restaurants"
                  className="border border-0 outline ps-1 py-3 pe-4"
                  value={restaurantInputText}
                  disabled={locationId === "" ? true : false}
                  onChange={searchForRestaurant}
                />
                <ul className="list-group absolute bottom-0 w-100">
                  {searchList.map((restaurant) => {
                    return (
                      <li
                        key={restaurant._id}
                        className="list-group-item"
                        onClick={() =>
                          navigate("/restaurant_order/" + restaurant._id)
                        }
                      >
                        {restaurant.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Header;
