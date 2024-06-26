import React, { useEffect, useState } from "react";
import firebaseConfigadmin from "./configAdmin";
import { useNavigate } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";


const Homeadmin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const database = firebaseConfigadmin.database();
      const usersRef = database.ref("users"); // เปลี่ยนเป็น path ที่คุณใช้

      usersRef.on("value", (snapshot) => {
        const usersFromDB = snapshot.val();
        const usersArray = usersFromDB
          ? Object.keys(usersFromDB).map((key) => ({
              id: key,
              ...usersFromDB[key],
            }))
          : [];

        setUsers(usersArray);
      });
    };

    fetchData();
  }, []);
  const handleEdit = (id) => {
    // นำทางไปยังหน้าแก้ไขโดยให้ ID เป็นพารามิเตอร์
    //history.push(`/edit-user/${id}`);
  };

  const handleDelete = (id) => {
    // ยืนยันการลบหรือแสดงกล่องสอบก่อนลบ
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      // ลบข้อมูลโดยให้ ID เป็นพารามิเตอร์
      firebaseConfigadmin.database().ref(`users/${id}`).remove();
      
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    firebaseConfigadmin
      .auth()
      .signOut()
      .then(() => {
        // ออกจากระบบสำเร็จ
        navigate("/");
      })
      .catch((error) => {
        // เกิดข้อผิดพลาดในการออกจากระบบ
        console.error(error);
      });
  };
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ตรวจสอบสถานะผู้ใช้เมื่อโคมโพเนนต์ถูกโหลด
    const unsubscribe = firebaseConfigadmin
      .auth()
      .onAuthStateChanged((currentUser) => {
        setUser(currentUser);
      });

    // ตั้งค่าเหตุการณ์เมื่อคอมโพเนนต์ถูกถอด
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <i class="bi bi-grid"></i>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Plastic Bottle Size Sorting Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <button
        onClick={handleLogout}
        className="btn btn-outline-danger m-2 float-end col-1 "
      >
        Logout
      </button>
      <table className="table table-bordered m-2">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="btn btn-danger m-2 "
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Homeadmin;
