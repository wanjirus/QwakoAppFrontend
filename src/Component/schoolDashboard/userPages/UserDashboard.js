import React, { useState, useEffect } from "react";
import { Container } from '@material-ui/core';
import axios from 'axios';
import { Bar } from "react-chartjs-2";
import { getCurrentUser } from '../../../REST-API/auth/AuthProvider';
import IndividualReports from "../../IndividualReports";
import IndividualSchoolReport from "../../IndividualSchoolReport";

const UserDashboard = () => {
  const [totalTargets, setTotalTargets] = useState([]);
  const [totalTrees, setTotalTrees] = useState([]);
  const [totalMonitors, setTotalMonitor] = useState([]);
  const [label, setLabels] = useState([]);
  

  const user = getCurrentUser();
  const username = user.username;

  useEffect(() => {

    const fetchTreeData = () => {
      // Fetch total trees data from the API
      axios
        .get(`treeapi/api/v1/TreePlanting/getTotalTrees/${username}`)
        .then((response) => {
          setTotalTrees(response.data.map(entry => entry.total_trees));
          setTotalTargets(response.data.map(entry => entry.target_total_trees));
          setTotalMonitor(response.data.map(entry => entry.monitor_total_trees));

          setLabels(response.data.map(entry => entry.month_name));
          localStorage.setItem("totalTrees", totalTrees);
          localStorage.setItem("totalTargets", totalTargets);

          console.log('Total trees data:', response.data);
        })
        .catch((error) => {
          console.error("Error fetching total trees data:", error);
        });
    };

    fetchTreeData();
  }, []);

  const sessionReports = {
    labels: label,
    datasets: [
      {
        label: "Trees Planted",
        data: totalTrees,
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
      },
      {
        label: "Target Trees",
        data: totalTargets,
        borderColor: "green",
        backgroundColor: "rgba(0, 128, 0, 0.2)",
      },
      {
        label: "Tree Monitoring",
        data: totalMonitors,
        borderColor: "orange",
        backgroundColor: "orange",
      },
    ],
  };

  const chartStyles = {
    //width: "100%",
    height: "100hv",
    // marginBottom: "50px",
  };

  return (
    <Container
      sx={{ maxWidth: "100%" , height:'100hv'}}
      maxWidth={false}
      className="dashboard"
      marginTop="auto"
      style={{ backgroundColor: "white" }}
    >
      <h2>Dashboard</h2>
      <IndividualSchoolReport/>
      <div style={chartStyles}>
        <Bar
          data={sessionReports}
          options={{ scales: { x: { display: false }, y: { display: false } } }}
        />
      </div>
    </Container>
  );
};

export default UserDashboard;