
// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import { Line } from "react-chartjs-2";
import Axios from "../../axios/Axios";
import { useState, useEffect } from "react";
import moment from 'moment';
import '../../assets/css/style.css';
import StakingCard from './components/StakingCard'
import axios from "axios";
import { io } from "socket.io-client";

function Dashboard() {

  // const socket = io.connect("http://localhost:5000");
  const [socket,setSocket] = useState(null)
  const [humidityData, setHumidityData] = useState([]);
  const [humidityStatData, setHumidityStatData] = useState(0);
  const [temperatureData, setTemperatureData] = useState([]);
  const [phData, setPHData] = useState([]);
  const [phStatData, setStatPHData] = useState(0);
  const [tempData, setTempData] = useState(0);
 
const [data,setData] = useState({})
  const humidityHandler = () => {
    Axios.get(`splTransfers?account=9iYqFPocWJhALeJ1bKPrF7k8La1UtV88XvP8aZTSho7y`)
      .then(response => {
        setHumidityData(response.data.data);
      })
      .catch(error => {
        console.log({ error });
      });
  };

  const tempHandler = () => {
    Axios.get(`splTransfers?account=FCgYUwNW3Dts3dteLQjQWwz5E6gytJgLDVcCqYXB7u4k`)
      .then(response => {
        // setTempData(response.data.data);
      })
      .catch(error => {
        console.log({ error });
      });
  }

  useEffect(
    () => {
  setSocket(io("http://localhost:5000"));//https://autoswap-server.herokuapp.com
  
    },
    []
  )

//   io.on("connection", (socket) => {
//     console.log(`⚡: ${socket.id} user just connected!`);

//     socket.on("taskDragged", (data) => {
//         console.log(data);
//     });

//     socket.on("disconnect", () => {
//         socket.disconnect();
//         console.log("🔥: A user disconnected");
//     });
// });
useEffect(() => {
  socket?.on("success",(res)=>{
  updateAllState(res)
  })
}, [socket]);


  const phHandler = () => {
    Axios.get(`splTransfers?account=FmA4MZVTtY8nKqUZY3voVc6yK6n6R3hh4dH9AxfmWJRb`)
      .then(response => {
        // setPhData(response.data.data);
      })
      .catch(error => {
        console.log({ error });
      });
  }

   const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y:
        {
          min: 0,
          // max: 15,
          stepSize: 10,
        },
      x:
        {
          
        },
    },
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("phantom_user"))
    console.log({user})
    axios
    .get("http://localhost:5000/api/sub/graph",{
     headers: {
        authorization:`Bearer ${user.token}`
      }
    })
    .then((res) => {
      // setLoading(false);
      console.log("jndnjdj")
      console.log({res})
    
      // setData(res.data)
      if(res.data.status){
      updateAllState(res)
      }else {
        console.log("error poo")
        setShowErrorMessage(` not found`)
      }
    })
    .catch((err) => {
      // setLoading(false);
      // alert("Invalid Credentials");
      console.log("The error", err)
      });
  }, []);
const updateAllState = (res) =>{
  setHumidityStatData(res.data.humidity)
  setTempData(res.data.temperature)
  setStatPHData(res.data.phVal);
    const humidityDataset =    [
      {
        label:"Humidity",
        data:new Array(10).fill(Math.round(res.data.humidity)),
                 borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ]
    const temperatureDataset =    [
      {
        label:"Temperature",
        data:new Array(10).fill(Math.round(res.data.temperature)),
                    borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ]
    const phDataset =    [
      {
        label:"phValue",
        data:new Array(10).fill(Math.round(Math.round(res.data.phVal))),
                    borderColor: 'rgb(25, 99, 232)',
        backgroundColor: 'rgba(55, 99, 32, 0.5)',
      }
    ]

    setHumidityData({labels:[1,2,3,4,5,6,7,8,9,10],datasets:humidityDataset})
    setTemperatureData({labels:[1,2,3,4,5,6,7,8,9,10],datasets:temperatureDataset})
    setPHData({labels:[1,2,3,4,5,6,7,8,9,10],datasets:phDataset})
   
}


  useEffect(() => {
    const myInterval = setInterval(function () {
      humidityHandler();
      tempHandler();
      phHandler();
    }, 60000);

    return () => {
      clearInterval(myInterval);
    }
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <StakingCard />
              <ComplexStatisticsCard
                color="dark"
                icon="ac_unit"
                title="Last Humidity"
                // count={humidityStatData.length && humidityStatData[0].changeAmount / 1000000000 + '%'}
                count={humidityStatData+ '%'}
                // percentage={{
                //   color: "success",
                //   amount: "+55%",
                //   label: "than lask week",
                // }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="device_thermostat"
                title="Last Temperature"
                count={tempData+ ' Celsius'}
                // percentage={{
                //   color: "success",
                //   amount: "+3%",
                //   label: "than last month",
                // }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="auto_graph"
                title="Last pH"
                count={phStatData}
                // percentage={{
                //   color: "success",
                //   amount: "+1%",
                //   label: "than yesterday",
                // }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="adjust"
                title="Last KHLR"
                count="33.33 KHLR"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
   {data ?   <Grid container>
          <Grid item xs={9}>
            <MDBox mt={4.5}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                  <MDBox mb={3}>
                    <div className="humidity-tooltip">
                      <Line data={humidityData} />
                      <span class="humidity-tooltiptext">{`https://public-api.solscan.io/account/splTransfers?account=9iYqFPocWJhALeJ1bKPrF7k8La1UtV88XvP8aZTSho7y`}</span>
                    </div>
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
          <Grid item xs={9}>
            <MDBox mt={4.5}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                  <MDBox mb={3}>
                    <div className="temp-tooltip">
                      <Line data={temperatureData} options={options}  />
                      <span class="temp-tooltiptext">{`https://public-api.solscan.io/account/splTransfers?account=9iYqFPocWJhALeJ1bKPrF7k8La1UtV88XvP8aZTSho7y`}</span>
                    </div>
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
          <Grid item xs={9}>
            <MDBox mt={4.5}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                  <MDBox mb={3}>
                    <div className="tooltip">
                      <Line data={phData} options={options}  />
                      <span class="tooltiptext">{`https://public-api.solscan.io/account/splTransfers?account=FmA4MZVTtY8nKqUZY3voVc6yK6n6R3hh4dH9AxfmWJRb`}</span>
                    </div>
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
        </Grid> : <MDBox sx={{
           width:"100%",
           color:"white",
           fontSize:"16px",
           display:"flex",
           justifyContent:"center",
           margin:"20px",
           padding:"30px"
        }}>No Mac Connected</MDBox>}
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
