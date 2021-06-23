import C3Chart from "react-c3js";
import React, { Component } from "react";

import "tabler-react/dist/Tabler.css";

import { Card, colors, Button } from "tabler-react";

class StatusCard extends Component {
  render() {
    return (
      <Card style={{ width: "30%"}}>
        <Card.Header>
          <Button color="percentage">63% Full</Button>
        </Card.Header>
        <Card.Body>
          <C3Chart
            style={{ height: "12rem" }}
            data={{
              columns: [
                // each columns data
                ["data1", 63],
                ["data2", 37],
              ],
              type: "donut", // default type of chart
              colors: {
                data1: colors["blue-dark"],
                data2: colors["blue-light"],
              },
              names: {
                // name of each serie
                data1: "Occupied",
                data2: "Available",
              },
            }}
            legend={{
              show: false, //hide legend
            }}
            padding={{
              bottom: 0,
              top: 0,
            }}
          />
        </Card.Body>
      </Card>
    );
  }
}

export default StatusCard;
