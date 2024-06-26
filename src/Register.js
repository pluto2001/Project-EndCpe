import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import firebaseConfigadmin from "./configAdmin";
import { useNavigate, NavLink } from "react-router-dom";
import localImage from './machine.jpg';


const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    firebaseConfigadmin
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // การลงทะเบียนสำเร็จ
        navigate("/home");
        const user = userCredential.user;
        const uid = user.uid;
        const userRef = firebaseConfigadmin.database().ref(`users/${uid}`);
        userRef.set({
          email: email,
          isAdmin: false,
          password: password,

          // เพิ่มข้อมูลอื่น ๆ ตามต้องการ
        });
      })
      .catch((error) => {
        // เกิดข้อผิดพลาดในการลงทะเบียน
        setError(error.message);
        console.error("เกิดข้อผิดพลาดในการลงทะเบียน", error.message);
      });
  };

  return (
    <div className="welcome">
      <div className="app-grid">
        <div className="img_left">
          <img src="https://scontent-bkk1-2.xx.fbcdn.net/v/t1.15752-9/336583352_614116063455771_6983630435806267744_n.png?_nc_cat=107&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeEK0SO1aD2abGgaagLwFjVN7oH1dpuVsqLugfV2m5Wyoj3AsyG9_AFm7LjesTXUTDehBSdr1VunewPlWn04lIzF&_nc_ohc=IHsBP7ENyZIAX9RRXTZ&_nc_ht=scontent-bkk1-2.xx&oh=03_AdQ2P2k4dw-8Fdrr4juJIu62XoCPRWix9GqsmZDNV63F4w&oe=65E80788" />
        </div>
        <div className="img_right">
        <img src={localImage} alt="Description of the image" />

          <h3>REGISTER</h3>
          {error && (
            <div style={{ color: "red", marginTop: "10px" }}>
              <p>Error: {error}</p>
            </div>
          )}
          <form>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Enter Email"
              />
            </div>
            <div className="form-group">
              <label>Name </label>
              <input
                type="name"
                //value={name}
                className="form-control"
                placeholder="Enter Name"
              />
            </div>
            <div className="form-group">
              <label>LastName </label>
              <input
                type="lastname"
                //value={name}
                className="form-control"
                placeholder="Enter LastName"
              />
            </div>
            <div className="form-group">
              <label>Password </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Enter Password"
              />
            </div>

            <div className="d-grid gap-2 col-8 mx-auto">
              <button
                onClick={handleSubmit}
                type="submit"
                className="btn btn-primary"
              >
                Sign Up
              </button>
              <NavLink to="/">Member already</NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
