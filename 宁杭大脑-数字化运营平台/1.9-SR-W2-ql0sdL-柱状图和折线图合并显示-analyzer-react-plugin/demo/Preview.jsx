import React from "react";
import App from "../src/App";
const dataSource = [
  ["标题一", "标题二", "标题三"],
  ["标题一数据一", "标题二数据一", "标题三数据一"],
  ["标题一数据二", "标题二数据二", "标题三数据二"],
  ["标题一数据三", "标题二数据三", "标题三数据三"],
];
const options = {
  externalVariables: {
    headerBGColor: "#000",
  },
};

const AnalyzerComponent = props => {
  return <App dataSource={dataSource} options={options}></App>;
};

AnalyzerComponent.propTypes = {};

export default AnalyzerComponent;
