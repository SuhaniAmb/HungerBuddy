import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Category from "./admin/category/Category";
import BranchLogin from "./admin/Branch/BranchLogin";
import BranchDashboard from "./admin/Branch/BranchDashboard"
import Branch from "./admin/Branch/Branch"
import FoodInterface from "./admin/fooditems/FoodInterface"
import DisplayAllFoodItem from "./admin/fooditems/DisplayAllFoodItems";
import BatchInterface from "./admin/batch/BatchInterface";
import DisplayAllBatch from "./admin/batch/DislpayAllBatch";
import SectionInterface from "./admin/section/SectionInterface";
import DisplayAllSection from "./admin/section/DisplayAllSection";
import StudentInterface from "./admin/students/StudentInterface";
import DisplayAllStudent from "./admin/students/DisplayAllStudent";
import EmployeeInterface from "./admin/employees/EmployeeInterface";
import DisplayAllEmployee from "./admin/employees/DisplayAllEmployee";
import DeliveryboyInterface from "./admin/deliveryboy/DeliveryboyInterface";
import DisplayDeliveryboy from "./admin/deliveryboy/DisplayDeliveryboy";
import AdminLogin from "./admin/adminlogin/AdminLogin";
import AdminDashboard from "./admin/adminlogin/AdminDashboard";
import Batch from "./admin/batch/Batch";
import Section from "./admin/section/Section";


function App() {
  return (
    <div style={{fontFamily:'Quicksand'}} >
     <Router>
      <Routes>

        <Route element={<BranchLogin/>} path='/branchlogin' />
        <Route element={<BranchDashboard/>} path='/branchdashboard/*' />
        <Route element={<Category/>} path='/category' />
        <Route element={<Branch/>} path='/branch' />
        <Route element={<FoodInterface/>} path='/foodinterface' />
        <Route element={<DisplayAllFoodItem/>} path='/displayfooditems' />
        <Route element={<BatchInterface/>} path='/batchinterface' />
        <Route element={<DisplayAllBatch/>} path='/displaybatch' />
        <Route element={<SectionInterface/>} path='/sectioninterface' />
        <Route element={<DisplayAllSection/>} path='/displaysection' />
        <Route element={<StudentInterface/>} path='/studentinterface' />
        <Route element={<DisplayAllStudent/>} path='/displaystudent' />
        <Route element={<EmployeeInterface/>} path='/employeeinterface' />
        <Route element={<DisplayAllEmployee/>} path='/displayemployee' />
        <Route element={<DeliveryboyInterface/>} path='/deliveryboyinterface' />
        <Route element={<DisplayDeliveryboy/>} path='/displaydeliveryboy' />
        <Route element={<AdminLogin/>} path='/adminlogin' />
        <Route element={<AdminDashboard/>} path='/admindashboard/*' />
        <Route element={<Batch/>} path='/batch' />
        <Route element={<Section/>} path='/section' />



      </Routes>
     </Router>
    </div>
  );
}

export default App;
