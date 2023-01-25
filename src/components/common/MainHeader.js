import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MainHeader(props) {
  let navigate = useNavigate();
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
  return (
    <>
      <GoogleOAuthProvider clientId="94201870585-75cn229n8bsarp0qa5ehce323pde0vf3.apps.googleusercontent.com">
        <div
          className="modal fade"
          id="google-login"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1
                  className="modal-title fs-5 text-primary"
                  id="exampleModalLabel"
                >
                  Login
                </h1>
                {/* <div className="d-flex justify-content-center align-items-center"> */}
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="icon_login m-auto">
                <img src="/images/assets/zomato2.png" />{" "}
              </div>
              <span className="text-primary h5 text-center">
                Please Login with youre Gmail account
              </span>
              <div className="modal-body  m-auto">
                <GoogleLogin onSuccess={onSuccess} onError={onError} />
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
        <header className={`row ${props.bg}`}>
          <div className="col-11 col-lg-10 m-auto d-flex justify-content-between align-items-center py-2">
            {props.bg ? <p className="brand_filter m-0">e!</p> : <p></p>}
            <div>
              {user === false ? (
                <button
                  className="btn btn-outline-light"
                  data-bs-toggle="modal"
                  data-bs-target="#google-login"
                >
                  Login
                </button>
              ) : (
                <>
                  <div className="d-none d-lg-block">
                    <span className="fw-bold text-white">
                      Welcome {user.name}
                    </span>
                    <button
                      className="btn btn-outline-light ms-3 btn-sm"
                      onClick={logout}
                    >
                      Logout
                    </button>
                    <button
                      className="btn btn-outline-light ms-2 m-0 p-1 btn-sm"
                      onClick={() => navigate("/order-details/")}
                    >
                      Orders
                    </button>
                  </div>

                  <div className="d-lg-none justify-content-center align-items-center ">
                    <div className="d-flex mt-2 m-0">
                      <p className="fw-bold text-white p-0 m-0 mt-1 verysmall_text">
                        Welcome {user.name}
                      </p>
                      <button
                        className="btn btn-outline-light ms-2 m-0 p-1 btn-sm"
                        onClick={logout}
                      >
                        Logout
                      </button>
                      <button
                        className="btn btn-outline-light ms-2 m-0 p-1 btn-sm"
                        onClick={() => navigate("/order-details/")}
                      >
                        Orders
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>
      </GoogleOAuthProvider>
    </>
  );
}

export default MainHeader;
