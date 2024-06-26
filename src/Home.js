import React, { useEffect, useState } from "react";
import firebaseConfigadmin from "./configAdmin";
import firebaseConfig from "./config";
import firebaseConfigMachine from "./configMachine";
import { useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { ResponsiveContainer } from "recharts";
import CircleIcon from '@mui/icons-material/Circle';


const styles = (theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
  },

  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

const Home = () => {
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

  //resetdatay

  useEffect(() => {
    const resetdata = async () => {
      const user = firebaseConfigadmin.auth().currentUser;

      if (user) {
        const dataBottle = firebaseConfig.database().ref("/");
        const dataMach = firebaseConfigMachine.database().ref("/");

        try {
          await dataBottle.remove();
          await dataMach.remove();
          console.log("Data reset successful");
        } catch (error) {
          console.error("Error resetting data", error);
        }
      }
    };

    resetdata();
  }, []);

  //ดึงข้อมูล realtime
  const [nodeData1, setNodeData1] = useState({});
  const [nodeData2, setNodeData2] = useState({});
  const [nodeData3, setNodeData3] = useState({});
  const [nodeData4, setNodeData4] = useState({});
  const [nodeDataM1, setNodeDataM1] = useState({});
  const [nodeDataM2, setNodeDataM2] = useState({});
  const [nodeDataM3, setNodeDataM3] = useState({});
  const [nodeDataM4, setNodeDataM4] = useState({});
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);
  const [loading4, setLoading4] = useState(true);
  const [loading5, setLoading5] = useState(true);
  const [loading6, setLoading6] = useState(true);
  const [loading7, setLoading7] = useState(true);
  const [loading8, setLoading8] = useState(true);

  useEffect(() => {
    // ชื่อโหนดที่คุณต้องการดึงข้อมูล
    const nodeName1 = "Small"; // เปลี่ยนเป็นชื่อโหนดที่ต้องการ
    const nodeName2 = "Medium";
    const nodeName3 = "Big";
    const nodeName4 = "count";
    const nodeName5 = "Bottle";
    const nodeName6 = "Motor_A";
    const nodeName7 = "Motor_B";
    const nodeName8 = "System";

    const nodeRef1 = firebaseConfig.database().ref(nodeName1);
    nodeRef1.on(
      "value",
      (snapshot) => {
        const data = snapshot.val();
        setNodeData1(data);
        setLoading1(false);
      },
      (error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
        setLoading1(false);
      }
    );

    // ดึงข้อมูลจากโหนดที่สอง
    const nodeRef2 = firebaseConfig.database().ref(nodeName2);
    nodeRef2.on(
      "value",
      (snapshot) => {
        const data = snapshot.val();
        setNodeData2(data);
        setLoading2(false);
      },
      (error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
        setLoading2(false);
      }
    );
    // ดึงข้อมูลจากโหนดที่สาม
    const nodeRef3 = firebaseConfig.database().ref(nodeName3);
    nodeRef3.on(
      "value",
      (snapshot) => {
        const data = snapshot.val();
        setNodeData3(data);
        setLoading3(false);
      },
      (error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
        setLoading3(false);
      }
    );
    const nodeRef4 = firebaseConfig.database().ref(nodeName4);
    nodeRef4.on(
      "value",
      (snapshot) => {
        const data = snapshot.val();
        setNodeData4(data);
        setLoading4(false);
      },
      (error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
        setLoading4(false);
      }
    );

    const nodeRef5 = firebaseConfigMachine.database().ref(nodeName5);
    nodeRef5.on(
      "value",
      (snapshot) => {
        const data = snapshot.val();
        setNodeDataM1(data);
        setLoading5(false);
      },
      (error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
        setLoading5(false);
      }
    );

    const nodeRef6 = firebaseConfigMachine.database().ref(nodeName6);
    nodeRef6.on(
      "value",
      (snapshot) => {
        const data = snapshot.val();
        setNodeDataM2(data);
        setLoading6(false);
      },
      (error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
        setLoading6(false);
      }
    );

    const nodeRef7 = firebaseConfigMachine.database().ref(nodeName7);
    nodeRef7.on(
      "value",
      (snapshot) => {
        const data = snapshot.val();
        setNodeDataM3(data);
        setLoading7(false);
      },
      (error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
        setLoading7(false);
      }
    );

    const nodeRef8 = firebaseConfigMachine.database().ref(nodeName8);
    nodeRef8.on(
      "value",
      (snapshot) => {
        const data = snapshot.val();
        setNodeDataM4(data);
        setLoading8(false);
      },
      (error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
        setLoading8(false);
      }
    );

    return () => {
      nodeRef1.off();
      nodeRef2.off();
      nodeRef3.off();
      nodeRef4.off();
      nodeRef5.off();
      nodeRef6.off();
      nodeRef7.off();
      nodeRef8.off();
    };
  }, []);

  const reset = () => {
    firebaseConfigMachine.database().ref("/").remove();
    firebaseConfig.database().ref("/").remove();

    //window.location.reload();
  };
  if (
    loading1 ||
    loading2 ||
    loading3 ||
    loading4 ||
    loading5 ||
    loading6 ||
    loading6 ||
    loading7 ||
    loading8
  ) {
    return <p>กำลังโหลดข้อมูล...</p>;
  }

  // กำหนดสีของไอคอนตามสถานะของเครื่องฮาร์ดแวร์

  const iconColor1 = nodeDataM1 === "มีขวดอยู่ในถัง" ? "green" : "orange";
  const iconColor2 = nodeDataM2 === "มอเตอร์สายพานส่วนคัดแยกทำงานปกติ" ? 'green' : 'orange';
  const iconColor3 = nodeDataM3 === "มอเตอร์สายพานส่วนถังพักขวดทำงานปกติ" ? 'green' : 'orange';


  

  
  

  // กำหนดไอคอนตามสถานะของเครื่องฮาร์ดแวร์

  const icon1 =
    nodeDataM1 === "Ready" ? (
      <CircleIcon style={{ color: iconColor1 }} />
    ) : (
      <CircleIcon style={{ color: iconColor1 }} />
    );
  
  const icon3 = nodeDataM2 === "Ready" ? (
    <CircleIcon style={{ color: iconColor2 }} />
  ) : (
    <CircleIcon style={{ color: iconColor2 }} />
  );
  const icon4 = nodeDataM3 === "Ready" ? (
    <CircleIcon style={{ color: iconColor3 }} />
  ) : (
    <CircleIcon style={{ color: iconColor3 }} />
  );
  

  return (
    <div>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <i class="bi bi-grid"></i>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Plastic Bottle Size Sorting Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <div className={styles.appBarSpacer} />
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <button
              onClick={handleLogout}
              className="btn btn-danger m-2 float-end col-1 "
            >
              Logout
            </button>
            <button
              type="reset"
              className=" btn btn-warning m-2 float-end col-1"
              onClick={reset}
            >
              Reset
            </button>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={styles.paper}>
              <Typography align="center">Small size bottle</Typography>
              <h1 align="center">{JSON.stringify(nodeData1, null, 2)}</h1>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={styles.paper}>
              <Typography align="center">Medium size bottle</Typography>
              <h1 align="center">{JSON.stringify(nodeData2, null, 2)}</h1>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={styles.paper}>
              <Typography align="center">Big size bottle</Typography>
              <h1 align="center">{JSON.stringify(nodeData3, null, 2)}</h1>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className={styles.paper}>
              <Typography align="center">Total</Typography>
              <h1 align="center">{JSON.stringify(nodeData4, null, 2)}</h1>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={styles.paper}>
              <div>
                <Bar
                  data={{
                    // labels: ['Small','Medium', 'Big'],// ตั้งชื่อของข้อมูลตามแกน X
                    datasets: [
                      {
                        // label: "Small,Medium",
                        data: [nodeData1, nodeData2, nodeData3, nodeData4], // ข้อมูลจาก root path ที่ 1
                        fill: false,
                        backgroundColor: [
                          "#EA9999",
                          "#9FC5E8",
                          "#FFE599",
                          "#B6D7A8",
                        ],
                        borderColor: "rgba(75,192,192,1)",
                      },
                    ],
                  }}
                  options={{
                    scales: {
                      x: {
                        type: "category", // ตั้งประเภทของแกน X เป็น "category"
                        labels: ["Small", "Medium", "Big", "Total"], // ตั้งชื่อของข้อมูลตามแกน X
                      },
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={styles.paper}>
              <ResponsiveContainer width="100%" height={300}>
                <h2 align="center">Status Machine</h2>
                <h5>Bottle : {JSON.stringify(nodeDataM1, null, 2)} {icon1}</h5>
                <h5>Motor_A : {JSON.stringify(nodeDataM2, null, 2)} {icon3}</h5>
                <h5>Motor_B : {JSON.stringify(nodeDataM3, null, 2)} {icon4}</h5>
                <h5>Status : {JSON.stringify(nodeDataM4, null, 2)}  </h5>
                
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
