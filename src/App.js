import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import Dashboard from "./components/admin/Dashboard";
import Login from "./components/login/Login";
import Navbar from "./components/admin/Navbar";
import Register from "./components/login/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={[<Navbar />, <Dashboard />]} />
        <Route path="/user" element={[<Navbar />, <UserList />]} />
        <Route path="/add" element={[<Navbar />, <AddUser />]} />
        <Route path="/edit/:id" element={[<Navbar />, <EditUser />]} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
