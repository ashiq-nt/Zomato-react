import FilterHeader from "./FilterHeader";
import FilterOption from "./FilterOptions";
import RestaurantList from "./RestaurantList";
import FilterPagination from "./FilterPgination";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function FilterPage() {
  let { meal_id } = useParams();
  let [locationList, setLocationList] = useState([]);
  let [mealList, setMealList] = useState([]);
  let [restaurantList, setRestaurantList] = useState([]);
  let [pageCount, setPageCount] = useState(0);
  let [filterData, setFilterData] = useState({
    mealtype: meal_id,
  });

  let getLocationList = async () => {
    let url = "http://localhost:5003/api/get-location-list";
    let { data } = await axios.get(url);
    setLocationList(data.location);
  };


  let getMenuList = async () => {
    let url = "http://localhost:5003/api/meal-type-name/"+ meal_id;
    let { data } = await axios.get(url);
    setMealList(data.location);
   
  };
  console.log(mealList);

  let filter = async () => {
    let url = "http://localhost:5003/api/filter";
    // let { data } = await axios.post(url, filterData);
    // setRestaurantList(data.restaurants);
    // console.log(data.restaurants)
    try {
      let  { data } = await axios.post(url, filterData);
      // let { restaurants, pageCount } = response?.data;
      if ( data.status === true) {
        setRestaurantList(data.restaurants);
      setPageCount(data.pageCount);
      // console.log(data.restaurants);
      // console.log("page:"+data.pageCount);
    } else {
      setRestaurantList([]);
    }

    } catch (error) {
      alert(error);
    }


  };

  let getFilterResult= (event,type) =>{
    let value = event.target.value
    
    

    switch (type) {
      case "sort":
        filterData["sort"] = value;
        break;
        case "location":
          filterData["location"] = value;
          break;
        case "costForTwo":
         value = value.split("-")
        filterData["l_cost"] = Number(value[0])
        filterData["h_cost"] = Number(value[1])
        break;
        case "page":
          filterData["page"] = value;

        break;
        case "cuisine":
          let checked = event.target.checked;

          let cuisine =
          filterData.cuisine == undefined ? [] : [...filterData.cuisine];
        if (checked) {
          let isAvailable = cuisine.includes(Number(value));
          if (isAvailable === false) cuisine.push(Number(value));
        } else {
          let position = cuisine.indexOf(Number(value));
          cuisine.splice(position, 1);
        }
        if (cuisine.length > 0) {
          filterData["cuisine"] = cuisine;
        }
          
        break;
    
      default:
        break;
    }
    setFilterData({...filterData})
console.log(filterData);
  }

  useEffect(() => {
    getLocationList();
    filter();
    getMenuList();
  }, []);

  useEffect(()=>{
    filter()

  },[filterData])


  return (
    <>
      <main className="container-fluid">
        <FilterHeader />

        <section className="row mb-5">
          <div className="col-11 col-lg-10 m-auto mt-3 mt-lg-4">
            <h4 className="fw-bold h3">Find youre favourite places</h4>
            <div className="row gap-lg-5 mt-4">
              <FilterOption
                locationList={locationList}
                getFilterResult={getFilterResult}
              />
              <RestaurantList restaurantList={restaurantList} />
              <FilterPagination getFilterResult={getFilterResult}
                  pageCount={pageCount}/>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default FilterPage;
