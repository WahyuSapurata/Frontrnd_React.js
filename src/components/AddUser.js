import React, { useState, useEffect } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useSession } from "../middleware/UseSession";
import tokenJwt from "../middleware/Jwt";
import refreshToken from "../middleware/RefreshToken";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  // const [session] = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken().catch(() => {
      navigate("/");
    });
  }, []);

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await tokenJwt.post("http://localhost:5000/users", {
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
    <div class="container">
      <div className="columns">
        <div className="column is-half mt-5">
          <form onSubmit={saveUser}>
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
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
