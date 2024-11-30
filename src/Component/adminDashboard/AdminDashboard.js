import React from "react";
import { Container } from "@material-ui/core";
import TargetTrees from "./adminPages/TargetTrees";
import PlantedTrees from "./adminPages/PlantedTrees";
import Monitoring from "./adminPages/Monitoring";

const AdminDashboard = () => {
  const containerStyle = {
    background: 'white',
  };

  return (
    <Container style={containerStyle}>
      <TargetTrees />
      <PlantedTrees />
      <Monitoring />
    </Container>
  );
};

export default AdminDashboard;
