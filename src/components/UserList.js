import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import tokenJwt from "../middleware/Jwt";
import { useNavigate } from "react-router-dom";
import refreshToken from "../middleware/RefreshToken";
import Swal from "sweetalert2";

const UserList = () => {
  const [users, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken().catch(() => {
      navigate("/");
    });
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await tokenJwt.get("http://localhost:5000/users");
    console.log(response);
    setUser(response.data);
  };

  const deleteUser = (id) => {
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
          tokenJwt.delete(`http://localhost:5000/users/${id}`).then((res) => {
            Swal.fire({
              icon: "success",
              title: "Mantap",
              text: res.data.message,
              showConfirmButton: false,
              timer: 3000,
            });
            getUsers();
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div class="container">
      <div className="columns">
        <div className="column">
          <Link to={"/add"} className="button is-warning mt-5">
            Tambah
          </Link>
          <table className="table is-striped is-fullwidth mt-5">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Foto</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>
                    <figure className="image is-square is-480x480">
                      <img src={user.url} alt="" />
                    </figure>
                  </td>
                  <td>
                    <Link
                      to={`/edit/${user._id}`}
                      className="button is-info is-small"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="button is-danger is-small"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
