import React, { useState, useEffect } from "react";
import tokenJwt from "../middleware/Jwt";
import { useNavigate, useParams } from "react-router-dom";
import refreshToken from "../middleware/RefreshToken";

const EditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    refreshToken().catch(() => {
      navigate("/");
    });
    getUserById();
  }, []);

  const getUserById = async () => {
    const response = await tokenJwt.get(`http://localhost:5000/users/${id}`);
    setName(response.data.name);
    setEmail(response.data.email);
    setGender(response.data.gender);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await tokenJwt.put(`http://localhost:5000/users/${id}`, {
        name,
        email,
        gender,
      });
      navigate("/user");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="columns">
        <div className="column is-half mt-5">
          <form onSubmit={updateUser}>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  type="email"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Gender</label>
              <div className="control">
                <div className="select is-fullwith">
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="Male">Male</option>
                    <option value="Famale">Famale</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button type="submit" className="button is-success">
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
