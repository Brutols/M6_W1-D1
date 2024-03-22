import React, { useState } from "react";
import styles from "./addAuthor.module.css";
import axios from "axios"

const AddAuthor = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthday: "",
    avatar: ""
  });
  const [file, setFile] = useState(null)

    const uploadFile = async (file) => {
        const fileFormData = new FormData();
        fileFormData.append("avatar", file)
        try {
            const res = await fetch("http://localhost:3030/authors/uploadAvatar",
                {
                    method: "POST",
                    body: fileFormData
                },
            )

            return await res.source

        } catch (error) {
            console.log(error.message);
        }
    }

    const uploadAuthor = async (bodyToSend) => {
        if (!file) return;

        try {
            const res = await fetch("http://localhost:3030/authors",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bodyToSend)
            })
            return console.log(res.ok);
        } catch (error) {
            console.log(error.message);
        }
    }

    // const uploadFile = async () => {
    //     const fileData = new FormData();
    //     fileData.append("avatar", file);

    //     try {
    //         const res = await axios.post("http://localhost:3030/authors/uploadAvatar", fileData)
    //         return res.data
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // const uploadAuthor = async (e) => {
    //     e.preventDefault();
    //     if (file) {
    //         try {
    //             const uploadedFile = await uploadFile(file)
    //             const bodyToSend = {
    //                 ...formData,
    //                 avatar: uploadedFile.source
    //             }
    //             const res = await axios.post("http://localhost:3030/authors", bodyToSend, {
    //                 headers: {
    //                     "Content-Type": "application/json"
    //                 }
    //             })
    //          } catch (error) {
    //             console.log(error);
    //         }
    //     }
    // }

  const handleForm = async (e) => {
    e.preventDefault();
    const uploadedFile = await uploadFile(file)
    const bodyToSend = {
        ...formData,
        avatar: uploadedFile?.source
    }
    await uploadAuthor(bodyToSend)
    // const form = e.target;
    // const formData = new FormData(form);
    // const formDataObj = {}
    // formData.forEach((value, key) => {
    //     formDataObj[key] = value
    // })
    // setFormData(formDataObj)
    // console.log(formDataObj);
  };

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({
        ...formData,
        [name]: value
    })
  };

  const handleUpload = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className={styles["form-background"]}>
      <form encType="multipart/form-data" onSubmit={handleForm} className={styles["form-container"]}>
        <input
          onChange={handleChange}
          className={styles["form-input"]}
          type="text"
          placeholder="insert name"
          name="firstName"
          value={formData?.firstName}
        />
        <input
          onChange={handleChange}
          className={styles["form-input"]}
          type="text"
          placeholder="insert last name"
          name="lastName"
          value={formData?.lastName}
        />
        <input
          onChange={handleChange}
          className={styles["form-input"]}
          type="email"
          placeholder="insert email"
          name="email"
          value={formData?.email}
        />
        <input
          onChange={handleChange}
          className={styles["form-input"]}
          type="date"
          name="birthday"
          value={formData?.birthday}
        />
        <input
          onChange={handleUpload}
          className={styles["form-input"]}
          type="file"
          accept="png jpg jpeg"
          name="avatar"
        />
        <button type="submit" className={styles["form-button"]}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddAuthor;
