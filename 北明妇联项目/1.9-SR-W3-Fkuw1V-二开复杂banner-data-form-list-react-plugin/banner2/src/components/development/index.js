import React, { useState } from "react";
import "./development.less";
import { DesignConfiguration, Main } from "../index.js";
// import { Carousel } from "antd";
import { mockCustomConfig, mockChangeCustomConfig } from "./mockData.js";
import Utils from "../../utils";
import { mainInit } from "../../App.js";

// const renderMap = [Main, DesignConfiguration];
const renderMap = [Main];

const Development = () => {
  console.log(mockCustomConfig);
  const [customConfig, setCustomConfig] = useState(mockCustomConfig);
  const changeCustomConfig = (customConfig) => {
    setCustomConfig(JSON.parse(customConfig));
    mockChangeCustomConfig(JSON.parse(customConfig));
  };
  return (
    <div id="development">
      {/* <Carousel> */}
      {renderMap.map((item, index) => {
        let props;
        if (item === DesignConfiguration) {
          props = {
            customConfig,
            changeCustomConfig,
          };
        } else {
          props = {
            customConfig,
            mainInit,
          };
        }
        let Comp = item;
        return (
          <div key={index}>
            {<Comp {...props} key={Utils.generateUUID()} />}
          </div>
        );
      })}
      {/* </Carousel> */}
    </div>
  );
};

Development.propTypes = {};

export default Development;
