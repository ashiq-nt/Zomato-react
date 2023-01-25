import Home from "./components/Home/Home";
import FilterPage from "./components/Filter/FilterPage";
import { Route, Routes } from "react-router-dom";
import Restaurant from "./components/Restaurant/Restaurant";
import OrderDetails from "./components/Restaurant/OrderDetails";

function App() {
  return <>
  <main className="container_fluid">
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/filter-page/:meal_id" element={<FilterPage/>}/>
      <Route path="/Restaurant_order/:rest_id" element={<Restaurant/>}/>
      <Route path="/order-details/" element={<OrderDetails/>} />
    </Routes>
  </main>
  
     </>;
}

export default App;
