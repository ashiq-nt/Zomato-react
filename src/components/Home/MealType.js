import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function MealType() {
  // let { meal_id }= useParams();
  let navigate = useNavigate();
  let [mealList, setMealList] = useState([]);

  let getMenuList = async () => {
    let url = "http://localhost:5003/api/meal-type";
    let { data } = await axios.get(url);
    setMealList(data.location);
    // console.log(data);
  };

  useEffect(() => {
    getMenuList();
  }, []);

  


  return (
    <>
      <main className="container-fluid row d-flex justify-content-center mt-4 mb-5">
        <section className="col-10">
          <p className="h2 fw-bold">Quick Searches</p>
          <p className="text-secondary">Discover restaurants by type of meal</p>
        </section>
        <section className="col-10 ">
          <section className="d-flex flex-wrap gap-3 m-auto">
            {mealList.map((meal, index) => {
              return (
                <div key={index} className="quick-search d-flex" onClick={()=>navigate("/filter-page/" + meal.meal_type)}>
                  <img src={"/images/" + meal.image} />
                  <div className="p-2">
                    <p className="h5 fw-bold pt-1 ps-1">{meal.name}</p>
                    <span className="small text-secondary">{meal.content}</span>
                  </div>
                </div>
              );
            })}
          </section>
        </section>
      </main>
    </>
  );
}

export default MealType;
