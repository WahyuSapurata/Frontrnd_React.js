import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import tokenJwt from "../middleware/Jwt";
import { useNavigate } from "react-router-dom";
import refreshToken from "../middleware/RefreshToken";

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
    setUser(response.data);
  };

  const deleteUser = async (id) => {
    try {
      await tokenJwt.delete(`http://localhost:5000/users/${id}`);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div class="container">
      <div className="columns">
        <div className="column is-half">
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
