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
   const qs = require("querystringify");

   let pageTabs = [{ id: "1#3" }, { id: "2#3" }, { id: "3#3" }];

   let menuDatas = [
      { id: "1", name: "首页" },
      { id: "2", name: "测试2" },
      { id: "3", name: "测试3" },
   ];

   const onChange = (e) => {
      window.location.search = `?menuId=${e}`;
   };

   const onRemove = (id) => {
      if (id === qs.parse(window.location.search).menuId) {
         let index = pageTabs.findIndex((a) => a.id === id);
         const menuId = pageTabs[pageTabs.length === index + 1 ? index - 1 : index + 1].id;
         window.location.search = `?menuId=${menuId}`;
      }
      pageTabs = [...pageTabs.filter((a) => a.id !== id)];
      console.log(pageTabs);
   };

   const getMenuName = (id) => {
      id = (id || "").split("#")[0];
      let menuName = "";
      if (id === "system") {
         return "应用管理";
      }
      if (menuDatas && id) {
         menuDatas.forEach((item) => {
            if (item.id === id) {
               menuName = item.name;
            }
         });
      }
      return menuName;
   };

   let props = {
      pageTabs,
      menuDatas,
      onChange,
      onRemove,
      getMenuName,
   };

   ReactDOM.render(<App {...props} />, document.getElementById("root"));
} else {
   if (!window.CUSTOM_PLUGIN) {
      window.CUSTOM_PLUGIN = new Map();
   }

   window.CUSTOM_PLUGIN.set(process.env.CUSTOM_PLUGIN_ID, (dom, props) => {
      ReactDOM.render(<App {...props} />, dom);
   });
}
