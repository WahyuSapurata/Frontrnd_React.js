import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tokenJwt from "../../middleware/Jwt";
import { useSession } from "../../middleware/UseSession";
import refreshToken from "../../middleware/RefreshToken";
import Swal from "sweetalert2";

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

  const getAdmins = async () => {
    // const session = sessionStorage.getItem("auth");
    const response = await tokenJwt.get("http://localhost:5000/admins", {
      headers: {
        Authorization: `Bearer ${session()}`,
      },
    });
    setAdmins(response.data);
  };

  const deleteAdmin = (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          tokenJwt
            .delete(`http://localhost:5000/deleteAdmin/${id}`)
            .then((res) => {
              Swal.fire({
                icon: "success",
                title: "Mantap",
                text: res.data.message,
                showConfirmButton: false,
                timer: 3000,
              });
              getAdmins();
            });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  // const name = tes.name;

  return (
    <div className="container mt-5">
      <h1>Welcome Back: {sessionStorage.getItem("name")}</h1>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin, index) => (
            <tr key={admin.id}>
              <td>{index + 1 + "."}</td>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>
                {(() => {
                  if (admin.name === sessionStorage.getItem("name")) {
                    return <p>Admin yang login</p>;
                  } else {
                    return (
                      <button
                        onClick={() => deleteAdmin(admin._id)}
                        className="button is-danger is-small"
                      >
                        Delete
                      </button>
                    );
                  }
                })()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
