import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tokenJwt from "../middleware/Jwt";
import refreshToken from "../middleware/RefreshToken";
import PreviewImage from "../middleware/PreviewImage";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const AddUser = () => {
  // const [name, setName] = useState(formik.values);
  // const [email, setEmail] = useState("");
  // const [gender, setGender] = useState("Male");
  // // const [session] = useSession();
  // const [file, setFile] = useState("");
  // const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  // const loadImage = (e) => {
  //   const image = e.currentTarget.files[0];
  //   setFile(image);
  //   setPreview(URL.createObjectURL(image));
  // };

  // const saveUser = (values) => {
  //   console.log("form values", values);
  //   setTimeout(() => {
  //     formik.setSubmitting(false);
  //     formik.resetForm();
  //   }, 2000);
  // };

  // const [validation, setValidation] = useState([]);

  useEffect(() => {
    refreshToken().catch(() => {
      navigate("/");
    });
  }, []);

  const saveUser = async () => {
    const formData = new FormData();
    formData.append("name", formik.values.name);
    formData.append("email", formik.values.email);
    formData.append("gender", formik.values.gender);
    formData.append("file", formik.values.image);
    try {
      const response = await tokenJwt.post(
        "http://localhost:5000/users",
        formData
      );
      Swal.fire({
        icon: "success",
        title: "Mantap",
        text: response.data.message,
        showConfirmButton: false,
        timer: 3000,
      });
      // setTimeout(() => {
      //   formik.setSubmitting(false);
      //   formik.resetForm();
      // }, 2000);
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
      image: "",
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
      image: Yup.mixed()
        .required("gambar harus di isi")
        .test(
          "FILE_SIZE",
          "ukuran tidak boleh dari 5MB",
          (value) => value && value.size < 5000000
        )
        .test(
          "FILE_TYPE",
          "type file tidak cocok",
          (value) => value && ["image/png", "image/jpeg"].includes(value.type)
        ),
    }),
    onSubmit: saveUser,
  });

  return (
    <div class="container">
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
                  type="text"
                  className="input"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="email"
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
                <div className="select is-fullwith is-primary">
                  <select
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="gender"
                  >
                    <option>-- Plih --</option>
                    <option value="Male">Male</option>
                    <option value="Famale">Famale</option>
                  </select>
                </div>
                {formik.touched.gender && formik.errors.gender && (
                  <div className="has-text-danger-dark">
                    <small>{formik.errors.gender}</small>
                  </div>
                )}
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
                        if (formik.values.image === "") {
                          return <p>no images</p>;
                        } else if (formik.values.image == null) {
                          return <p>no images</p>;
                        } else if (formik.values.image) {
                          return <p>{formik.values.image.name}</p>;
                        }
                      })()}
                    </span>
                  </label>
                </div>

                {formik.values.image && (
                  <PreviewImage file={formik.values.image} />
                )}
                {formik.touched.image && formik.errors.image && (
                  <div className="has-text-danger-dark">
                    <small>{formik.errors.image}</small>
                  </div>
                )}
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="mt-4 button is-success"
                >
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
