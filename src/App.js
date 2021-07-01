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
      <Site.Wrapper>
        <Site.Header className="header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Welcome to Parking Garage</p>
        </Site.Header>
        <Card>
          <Card.Header>
            <Card.Title>Free Parking</Card.Title>
          </Card.Header>
          <Card.Body>
            <C3Chart
              style={{ height: "12rem" }}
              data={{
                names: {
                  data1: "Taken",
                  data2: "Available",
                },
                columns: [
                  // ["data-item-name", data-point-int]
                  ["data1", 63],
                  ["data2", 37],
                ],
                type: "donut",
                colors: {
                  data1: colors["blue-dark"],
                  data2: colors["blue-light"],
                },
              }}
              legend={{ show: false }}
              padding={{ bottom: 0, top: 0 }}
            />
          </Card.Body>
        </Card>
      </Site.Wrapper>
    </Site>
  );
}

export default App;

