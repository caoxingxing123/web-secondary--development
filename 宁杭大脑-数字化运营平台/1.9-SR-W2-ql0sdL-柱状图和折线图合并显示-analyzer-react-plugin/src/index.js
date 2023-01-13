/*
 * @Author: wangchengyuan
 * @Email: wangchengyuan@njsdata.com
 * @LastEditors: Do not edit
 * @Date: 2021-04-06 09:58:34
 * @LastEditTime: 2021-10-19 17:43:29
 * @FilePath: \om-app-plugin-react-boilerplate\src\index.js
 * @Description: 请描述文件作用
 */
/* 可以考虑在发布的代码里移除这个css */
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

/**
 * 生产打包时为了减少体积，不引入 antd.css (可节约 2.5M左右的包体积)
 * 生产包是当做 onemind 主站插件使用的，页面里已经有一份 ant.css 了，所以这里可以省去
 * 从功能通过 webpack.IgnorePlugin 插件实现，如果想要打入此 css，请在 webpack 配置中做修改。
 */
if (process.env.NODE_ENV !== "production") {
   require("antd/dist/antd.css");

   // 资产数据
   const dataSource = [
      ["路段名称", "客车流量", "货车流量", "客货总流量环比"],
      ["溧芜段", 454454, 0, 0],
      ["溧马段", 16899, 0, -4],
      ["溧芜段", 31271, 0, -12],
      ["南京段", 3832278, 0, 0],
      ["溧阳段", 11606, 0, -5],
      ["溧阳段", 110075, 0, -17],
      ["南京段", 15893, 0, -23],
      ["宜兴段", 2341333, 0, 0],
      ["溧马段", 3398540, 0, 0],
      ["宜兴段", 12928, 0, -6],
      ["溧阳段", 2805378, 0, 0],
      ["溧芜段", 4186, 0, 12],
      ["宜兴段", 120864, 0, -17],
      ["溧马段", 177172, 0, -18],
      ["南京段", 171235, 0, -19],
   ];

   // 配置项
   const options = {
      externalVariables: {
         配置项: "",
      },
   };

   ReactDOM.render(<App dataSource={dataSource} options={options} />, document.getElementById("root"));
} else {
   if (!window.CUSTOM_PLUGIN) {
      window.CUSTOM_PLUGIN = new Map();
   }
   window.CUSTOM_PLUGIN.set(process.env.CUSTOM_PLUGIN_ID, (dom, props) => {
      ReactDOM.render(<App {...props} />, dom);
   });
}
