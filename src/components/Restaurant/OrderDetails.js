import axios from "axios";
import jwtDecode from "jwt-decode";
import { useState, useEffect } from "react";
import MainHeader from "../common/MainHeader";

function OrderDetails() {
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
    }
    // else{
    //     window.location.assign("/");
    // }
  };

  let [orderList, setOrderList] = useState([]);

  let getOrderDetails = async () => {
    let url = "http://localhost:5003/api/get-order-datails/" + user.email;
    let { data } = await axios.get(url);
    setOrderList(data.order);
    console.log(data);
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  return (
    <>
      <main className="container-fluid">
        <MainHeader  bg="bg-danger"/>
        <section className="col-12 col-lg-8 p-0 mt-2 mt-lg-3 m-auto">
          {orderList.length === 0 ? (
            <article className="w-100 p-4 shadow mb-3">
              Sorry there is no order found
            </article>
          ) : (
            <>
              {orderList.map((meal, index) => {
                return (
                  <article key={meal._id} className="w-100 p-4 shadow mb-3">
                    {meal.order_list.map((order, index) => {
                      return (
                        <section
                          key={index}
                          className="d-flex align-items-center"
                        >
                          <div className="search-result-image d-flex align-items-center">
                            <img src={"/images/" + order.image} alt="" />
                          </div>
                          <div className="search-result-details ms-4">
                            <p className="mb-1 h4">{order.name}</p>
                            <p className="mb-1 fw-bold">
                              Quantity :{order.qty}
                            </p>
                            <p className="mb-1 text-muted ">
                              Price: {order.price}
                            </p>
                            <p className="mb-1 text-muted">
                              Restaurant: {meal.rest_name}
                            </p>
                            <p className="mb-1 text-muted">
                              Contact: {meal.c_number}
                            </p>
                          </div>
                        </section>
                      );
                    })}

                    <hr />
                    <section className="d-flex edu-m-remove-para-margin">
                      <div>
                        <p>Total Amount:</p>
                        <p>Payment id:</p>
                      </div>
                      <div className="ms-4 fw-bold">
                        <p>{meal.totalAmount}</p>
                        <p>{meal.payment_id}</p>
                      </div>
                    </section>
                  </article>
                );
              })}
            </>
          )}
        </section>
      </main>
    </>
  );
}

export default OrderDetails;
