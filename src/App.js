import './App.css'
import Home from './Home'
import NavAuth from './NavAuth'
import { Route, Routes } from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import Profile from './Profile'
import PrivateRoute from './PrivateRoute'
import DisplayErrors from './DisplayErrors'
import UsersList from './Components/ManageUsers/UsersList'
import EditUser from './Components/ManageUsers/EditUser'
import EquipmentsList from './Components/ManageEquipments/EquipmentsList'
import AddEquipment from './Components/ManageEquipments/AddEquipment'
import EditEquipment from './Components/ManageEquipments/EditEquipment'
import EditDepartment from './Components/ManageDepartments/EditDepartment'
import DepartmentsList from './Components/ManageDepartments/DepartmentsList'
import AddDepartment from './Components/ManageDepartments/AddDepartment'
import RequestsList from './Components/ManageRequests/RequestsList'
import AddRequest from './Components/ManageRequests/AddRequest'
import RequestDetails from './Components/ManageRequests/RequestDetails'
import PendingRequests from './Components/ManageRequests/PendingRequests'
import MyReviews from './Components/ManageRequests/MyReviews'
import MyAssignments from './Components/ManageRequests/MyAssignments'
import Sidebar from './Components/Layout/Sidebar'
import { useLocation } from 'react-router-dom'
import AllRequests from './Components/ManageRequests/AllRequests'
import Dashboard from './Components/Dashbords/Dashbord'
function App() {
  const currentLocation = useLocation()
  const showSidebar = !['/', '/Login'].includes(currentLocation.pathname)
  return (
    <div className="App">
      <NavAuth />
      <DisplayErrors />

      <div className="d-flex">
        {showSidebar && <Sidebar />}

        <main className="flex-grow-1 p-4">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Register' element={<PrivateRoute> <Register /></PrivateRoute>} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path='/Users' element={<PrivateRoute><UsersList /></PrivateRoute>} />
            <Route path='/EditUser/:id' element={<PrivateRoute><EditUser /></PrivateRoute>} />
            <Route path="/Equipments" element={<PrivateRoute><EquipmentsList /></PrivateRoute>} />
            <Route path="/AddEquipment" element={<PrivateRoute><AddEquipment /></PrivateRoute>} />
            <Route path="/EditEquipment/:id" element={<PrivateRoute><EditEquipment /></PrivateRoute>} />
            <Route path="/Departments" element={<PrivateRoute><DepartmentsList /></PrivateRoute>} />
            <Route path="/AddDepartment" element={<PrivateRoute><AddDepartment /></PrivateRoute>} />
            <Route path="/EditDepartment/:id" element={<PrivateRoute><EditDepartment /></PrivateRoute>} />
            <Route path="/Requests" element={<PrivateRoute><RequestsList /></PrivateRoute>} />
            <Route path="/AddRequest" element={<PrivateRoute><AddRequest /></PrivateRoute>} />
            <Route path="/RequestDetails/:id" element={<PrivateRoute><RequestDetails /></PrivateRoute>} />
            <Route path="/PendingRequests" element={<PrivateRoute><PendingRequests /></PrivateRoute>} />
            <Route path="/MyReviews" element={<PrivateRoute><MyReviews /></PrivateRoute>} />
            <Route path="/MyAssignments" element={<PrivateRoute><MyAssignments /></PrivateRoute>} />
            <Route path="/AllRequests" element={<PrivateRoute><AllRequests /></PrivateRoute>} />
            <Route path="/Dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;






