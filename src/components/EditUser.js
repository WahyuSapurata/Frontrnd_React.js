import React, { useEffect } from "react";
import tokenJwt from "../middleware/Jwt";
import { useNavigate, useParams } from "react-router-dom";
import refreshToken from "../middleware/RefreshToken";
import PreviewImage from "../middleware/PreviewImage";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const EditUser = () => {
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
    // setName(response.data.name);
    formik.setValues({
      name: response.data.name,
      email: response.data.email,
      gender: response.data.gender,
      url: response.data.url,
    });
    // setEmail(response.data.email);
    // setGender(response.data.gender);
  };

  const updateUser = async () => {
    const formData = new FormData();
    formData.append("name", formik.values.name);
    formData.append("email", formik.values.email);
    formData.append("gender", formik.values.gender);
    formData.append("file", formik.values.image);
    try {
      const response = await tokenJwt.put(
        `http://localhost:5000/users/${id}`,
        formData
      );
      Swal.fire({
        icon: "success",
        title: "Mantap",
        text: response.data.message,
        showConfirmButton: false,
        timer: 3000,
      });
      navigate("/user");
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      gender: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("name harus di isi")
        .min(8, "name harus berisi 8 karakter")
        .max(50, "name tidak boleh lebih dari 50 karakter"),
      // .matches(/[a-z]/g, "name harus berisi 1 huruf kecil")
      // .matches(/[A-Z]/g, "name harus berisi 1 huruf kapital")
      // .matches(/[0-9]/g, "name harus berisi 1 nomor")
      // .matches(/^\S*$/, "name tidak boleh ada spasi"),
      email: Yup.string()
        .required("email harus di isi")
        .email("email tidak sesuai format"),
      gender: Yup.string().required("pilih gender"),
    }),
    onSubmit: updateUser,
  });
  console.log(formik);

  return (
    <div className="container">
      <div className="columns">
        <div className="column is-half mt-5">
          <form
            onSubmit={formik.handleSubmit}
            encType="multipart/form-data"
            autoComplete="off"
          >
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Name"
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="has-text-danger-dark">
                    <small>{formik.errors.name}</small>
                  </div>
                )}
              </div>
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  type="email"
                  className="input"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Email"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="has-text-danger-dark">
                    <small>{formik.errors.email}</small>
                  </div>
                )}
              </div>
            </div>
            <div className="field">
              <label className="label">Gender</label>
              <div className="control">
                <div className="select is-fullwith">
                  <select
                    name="gender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="Male">Male</option>
                    <option value="Famale">Famale</option>
                  </select>
                  {formik.touched.gender && formik.errors.gender && (
                    <div className="has-text-danger-dark">
                      <small>{formik.errors.gender}</small>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Gambar</label>
              <div className="control">
                <div class="file is-info has-name">
                  <label class="file-label">
                    <input
                      type="file"
                      class="file-input"
                      accept="image/*"
                      onChange={(e) =>
                        formik.setFieldValue("image", e.currentTarget.files[0])
                      }
                      name="image"
                      onBlur={formik.handleBlur}
                    />
                    <span class="file-cta">
                      <span class="file-label">Choose file</span>
                    </span>
                    <span class="file-name" style={{ maxWidth: "none" }}>
                      {(() => {
                        if (formik.values.image) {
                          return <p>{formik.values.image.name}</p>;
                        } else {
                          return <p>no images</p>;
                        }
                      })()}
                    </span>
                  </label>
                </div>

                {(() => {
                  if (formik.values.image) {
                    return <PreviewImage file={formik.values.image} />;
                  } else {
                    return (
                      <img
                        style={{ width: "200px", marginTop: "10px" }}
                        src={formik.values.url}
                        alt=""
                      />
                    );
                  }
                })()}
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button type="submit" className="mt-4 button is-success">
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
