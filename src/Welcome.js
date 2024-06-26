import React, { useState } from "react";
import firebaseConfigadmin from "./configAdmin";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Welcome.css";
import localImage from './machine.jpg';

const Welcome = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    firebaseConfigadmin
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        // การเข้าสู่ระบบสำเร็จ
        //console.log("เข้าสู่ระบบสำเร็จ");
        //navigate("/home");
        const user = firebaseConfigadmin.auth().currentUser;
        if (user) {
          const uid = user.uid;

          // อ่านข้อมูล "isAdmin" จาก Firebase Realtime Database
          firebaseConfigadmin
            .database()
            .ref(`users/${uid}/isAdmin`)
            .once("value")
            .then((snapshot) => {
              const isAdmin = snapshot.val();

              if (isAdmin) {
                navigate("/homeadmin");
              } else {
                // ผู้ใช้ไม่ใช่ "admin" ให้เข้าหน้าที่ไม่ใช่ "admin" หรือแสดงข้อความแจ้งเตือน
                navigate("/home");
              }
            })
            .catch((error) => {
              console.error('เกิดข้อผิดพลาดในการอ่านข้อมูล "isAdmin":', error);
            });
        }
      })
      .catch((error) => {
        // เกิดข้อผิดพลาดในการเข้าสู่ระบบ
        setError(error.message);
        console.error("เกิดข้อผิดพลาดในการเข้าสู่ระบบ", error);
      });
    // Reset form fields
    setEmail("");
    setPassword("");
  };

  return (
    <div className="welcome">
      <div className="app-grid">
        <div className="img_left">
          <img src="https://www.oth.co.th/images/editor/Blog/blog24.jpg" />
        </div>

        <div className="img_right">
        <img src={localImage} alt="Description of the image" />
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
                placeholder="Email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                className="form-control"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 col-8 mx-auto">
              <button
                onClick={handleSubmit}
                type="submit"
                className="btn btn-primary"
              >
                Sign In
              </button>
              <NavLink to="/register">Not yet a member?</NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
