import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainHeader from "../common/MainHeader";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import jwtDecode from "jwt-decode";
import useRazorpay from "react-razorpay";

function Restaurant() {
 
  let getUserLoginData = () => {
    let token = localStorage.getItem("zomatoToken");
    if (token == null) {
      return false;
    } else {
      try {
        let result = jwtDecode(token);
        return result;
      } catch (error) {
        localStorage.removeItem("zomatoToken");
        return false;
      }
    }
  };

  let [user, setUser] = useState(getUserLoginData());

  let onSuccess = (response) => {
    let token = response.credential;
    localStorage.setItem("zomatoToken", token);
    alert("login in successfully");
    window.location.assign("/");
  };
  let onError = () => {
    console.log("Login Failed");
  };

  let logout = () => {
    let doLogout = window.confirm("Are you sure to logout ?");
    if (doLogout === true) {
      localStorage.removeItem("zomatoToken");
      window.location.assign("/");
    } else {
      window.location.assign("/");
    }
  };

  let { rest_id } = useParams();
  let initRestaurant = {
    aggregate_rating: "",
    city: "",
    city_id: 0,
    contact_number: "",
    cuisine: [],
    cuisine_id: [],
    image: "retaurent-background.png",
    locality: "",
    location_id: 0,
    mealtype_id: 0,
    min_price: 0,
    name: "sss",
    rating_text: "",
    thumb: [],
    _id: "",
  };
  let [restToggle, setRestToggle] = useState(true);
  let [menuList, setMenuList] = useState([]);
  let [rDetails, setRDetails] = useState({ ...initRestaurant });
  let [rName, setRName] = useState();
  let [rNumber, setRNumber] = useState();
  let [totalPrice, setTotalPrice] = useState(0);

  let getRestaurantDetails = async () => {
    let url = "http://localhost:5003/api/restaurant-list/" + rest_id;
    let { data } = await axios.get(url);
    // (data.restaurant);
    if (data.status === true) {
      setRDetails({ ...data.restaurant });
      setRName(data.restaurant.name)
      setRNumber(data.restaurant.contact_number)
    } else {
      setRDetails({ ...data.initRestaurant });
    }
  };
  let getMenuItems = async () => {
    let url = "http://localhost:5003/api/get-menu-items/" + rest_id;
    let { data } = await axios.get(url);
    console.log(data.menu_items);
    if (data.status === true) {
      setMenuList([...data.menu_items]);
    } else {
      setMenuList([]);
    }
    setTotalPrice(0);
  };
  let addItem = (index) => {
    let _menuList = [...menuList];
    _menuList[index].qty += 1;
    setMenuList(_menuList);
    setTotalPrice(totalPrice + _menuList[index].price);
  };
  let removeItem = (index) => {
    let _menuList = [...menuList];
    _menuList[index].qty -= 1;
    setMenuList(_menuList);
    setTotalPrice(totalPrice - _menuList[index].price);
  };

  let makePayment = async () => {
    let userOrder = menuList.filter((menu) => menu.qty > 0);
    let url = "http://localhost:5003/api/gen-order-id";
    let { data } = await axios.post(url, { amount: totalPrice });
    console.log(data);
    if (data.status === false) {
      alert("Unable to generate order");
      return false;
    }
    let { order } = data;

    var options = {
      key: "rzp_test_RB0WElnRLezVJ5", // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: order.currency,
      name: "Zomato Order",
      description: "Make a payment for youre order",
      image: "/images/assets/zomato2.png",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        let verifyData = {
          payment_id: response.razorpay_payment_id,
          order_id: response.razorpay_order_id,
          signature: response.razorpay_signature,
          name: user.name,
          mobile: 9999999999,
          email: user.email,
          rest_name:rName,
          c_number:rNumber,
          order_list: userOrder,
          totalAmount: totalPrice,
        };
        let { data } = await axios.post(
          "http://localhost:5003/api/verify-payment",
          verifyData
        );
        if (data.status === true) {
          alert("Payment completed successfully");
          window.location.assign("/order-details/")
        } else {
          alert("Payment fails");
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: 9835672456,
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  

  useEffect(() => {
    getRestaurantDetails();
    getMenuItems();
  }, []);

  return (
    <>
      <main className="container-fluid">
        <div
          className="modal fade"
          id="modalUserDetails"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel2"
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalToggleLabel2">
                  name
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter full Name"
                    value={user.name}
                    onChange={() => {}}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="name@example.com"
                    value={user.email}
                    onChange={() => {}}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Address
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    // value="cccccccccccc"
                    onChange={() => {}}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-danger"
                  data-bs-target="#modalMenuList"
                  data-bs-toggle="modal"
                >
                  Back
                </button>
                <button className="btn btn-success" onClick={makePayment}>
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="modalMenuList"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel"
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalToggleLabel">
                  {rDetails.name}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body ">
                {menuList.map((menu, index) => {
                  return (
                    <div className="row p-2" key={menu._id}>
                      <div className="col-8">
                        <p className="mb-1 h6">{menu.name}</p>
                        <p className="mb-1">{menu.price}</p>
                        <p className="small text-muted">{menu.description}</p>
                      </div>
                      <div className="col-4 d-flex justify-content-end">
                        <div className="menu-food-item">
                          <img src={"/images/" + menu.image} alt="" />

                          {menu.qty === 0 ? (
                            <button
                              className="btn btn-primary btn-sm add"
                              onClick={() => addItem(index)}
                            >
                              Add
                            </button>
                          ) : (
                            <div className="order-item-count section ">
                              <span
                                className="hand"
                                onClick={() => removeItem(index)}
                              >
                                -
                              </span>
                              <span>{menu.qty}</span>
                              <span
                                className="hand"
                                onClick={() => addItem(index)}
                              >
                                +
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <hr className=" p-0 my-2" />
                    </div>
                  );
                })}
                <div className="d-flex justify-content-between">
                  <h4>Total Price:{" "+totalPrice}</h4>
                  <button
                    className="btn btn-danger"
                    data-bs-target="#modalUserDetails"
                    data-bs-toggle="modal"
                  >
                    Process
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="modalGallery"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-lg my_model_section "
            style={{ height: "55vh" }}
          >
            <div className="modal-content">
              <div className="modal-body h-55">
                <Carousel showThumbs={false} infiniteLoop={true}>
                  {rDetails.thumb.map((value, index) => {
                    return (
                      <div key={index} className="w-100 my_model_section">
                        <img src={"/images/" + value} />
                      </div>
                    );
                  })}
                </Carousel>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <MainHeader bg="bg-danger" />
        </div>

        <div className="row justify-content-center">
          <div className="col-10">
            <div className="row">
              <div className="col-12 mt-5">
                <div className="restaurant-main-image position-relative">
                  <img src={"/images/" + rDetails.image} alt="" className="" />
                  <button
                    className="btn btn-outline-light position-absolute btn-gallery"
                    data-bs-toggle="modal"
                    data-bs-target="#modalGallery"
                  >
                    Click To Get Image Gallery
                  </button>
                </div>
              </div>
              <div className="col-12">
                <h3 className="mt-4">{rDetails.name}</h3>
                <div className="d-flex">
                <button className="btn-sm bg-success bord border border-0 text-white px-2 py-0">
                        {rDetails.aggregate_rating}★
                      </button><p className="ms-2 mt-2">{rDetails.rating_text}</p></div>
                <div className="d-flex justify-content-between">
               
                  <ul className="list-unstyled d-flex gap-3 mb-0">
                    <p
                      onClick={() => setRestToggle(true)}
                      className="fw-bold point h5 avg_text"
                    >
                      Overview
                    </p>
                    <p
                      onClick={() => setRestToggle(false)}
                      className="fw-bold point h5 avg_text"
                    >
                      Contact

                    </p>
                  </ul>
                  {user === false ? (
                    <button
                      disabled
                      className="btn btn-danger align-self-start mb-1  small_text"
                    >
                      Please Login to place order
                    </button>
                  ) : (
                    <a
                      className="btn btn-danger align-self-start  mb-1 small_text btn_show"
                      data-bs-toggle="modal"
                      href="#modalMenuList"
                      role="button"
                      onClick={getMenuItems}
                    >
                      Show Menu List
                    </a>
                  )}
                </div>
                <hr className="mt-0" />

                {restToggle === true ? (
                  <div className="over-view">
                    <p className="h5 mb-4">About this place</p>

                    <p className="mb-0 fw-bold">Cuisine</p>
                    <p>
                      {rDetails.cuisine.reduce((pValue, cValue) => {
                        let value = "";
                        if (pValue === "") {
                          value = cValue.name;
                        } else {
                          value = `${pValue}, ${cValue.name}`;
                        }
                        return value;
                      }, "")}
                    </p>

                    <p className="mb-0 fw-bold">Average Cost</p>
                    <p>₹ {rDetails.min_price} for two people (approx.)</p>
                  </div>
                ) : (
                  <div className="over-view">
                    <p className="mb-0 fw-bold">Phone Number</p>
                    <p>+{rDetails.contact_number}</p>

                    <p className="mb-0 fw-bold">Address</p>
                    <p>
                      {" "}
                      {rDetails.locality}, {rDetails.city}{" "}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Restaurant;
