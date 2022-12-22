import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tokenJwt from "../../middleware/Jwt";
import refreshToken from "../../middleware/RefreshToken";
import { useSession } from "../../middleware/UseSession";
import jwtDecode from "jwt-decode";

const Dashboard = () => {
  const [admins, setAdmins] = useState([]);
  const navigate = useNavigate();
  const [session] = useSession();

  useEffect(() => {
    refreshToken().catch(() => {
      navigate("/");
    });
    getAdmins();
  }, []);

  const decode = jwtDecode(session());
  const name = decode.name;

  const getAdmins = async () => {
    // const session = sessionStorage.getItem("auth");
    const response = await tokenJwt.get("http://localhost:5000/admins", {
      headers: {
        Authorization: `Bearer ${session()}`,
      },
    });
    setAdmins(response.data);
  };

  return (
    <div className="container mt-5">
      <h1>Welcome Back: {name}</h1>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin, index) => (
            <tr key={admin.id}>
              <td>{index + 1}</td>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
