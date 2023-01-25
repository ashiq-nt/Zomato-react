import { useNavigate, useParams } from "react-router-dom";

function RestaurantList(props) {
  let { restaurantList } = props;
  let navigate = useNavigate();

  return (
    <>
      <section className="col-12 col-lg-8 p-0 mt-2 mt-lg-0">
        {restaurantList.length === 0 ? (
          <article className="w-100 p-4 shadow mb-3">
            Sorry no restaurant found
          </article>
        ) : (
          <>
            {restaurantList.map((restaurant, index) => {
              return (
                <article
                  onClick={() =>
                    navigate("/Restaurant_order/" + restaurant._id)
                  }
                  key={index}
                  className="w-100 p-4 shadow mb-3"
                >
                  <section className="d-flex align-items-center">
                    <div className="search-result-image d-flex align-items-center">
                      <img src={"/images/" + restaurant.image} alt="" />
                    </div>
                    <div className="search-result-details ms-4">
                      <p className="mb-1 h4">{restaurant.name}</p>
                      <p className="mb-1 fw-bold">FORT</p>
                      {/* <p className="mb-1 text-muted ">
                    Contact Number: {restaurant.contact_number}
                  </p> */}
                      <p className="mb-1 text-muted">
                        {restaurant.locality},{restaurant.city}
                      </p>
                    </div>
                  </section>
                  <hr />
                  <section className="d-flex edu-m-remove-para-margin">
                    <div>
                      <p>CUISINES:</p>
                      <p>COST FOR TWO:</p>
                    </div>
                    <div className="ms-4 fw-bold">
                      <p>
                        {restaurant.cuisine.reduce((pv, cv) => {
                          let value = pv === "" ? cv.name : pv + " ," + cv.name;
                          return value;
                        }, "")}
                      </p>
                      <p>{restaurant.min_price}</p>
                    </div>
                  </section>
                </article>
              );
            })}
          </>
        )}
      </section>
    </>
  );
}

export default RestaurantList;
