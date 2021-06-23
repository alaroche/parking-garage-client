// @flow

import * as React from "react";
import logo from './logo.svg';
import './App.css';

import {
  Page,
  Grid,
  Card,
  colors,
  Site,
  SiteHeader,
} from "tabler-react";

import C3Chart from "react-c3js";

function App() {
  return (
    <Site>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome to Parking Garage
        </p>
        </header>
        <Card>
          <Card.Header>
            <Card.Title>Chart title</Card.Title>
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
                  data1: "Maximum",
                  data2: "Minimum",
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
      </div>
    </Site>
  );
}

export default App;

