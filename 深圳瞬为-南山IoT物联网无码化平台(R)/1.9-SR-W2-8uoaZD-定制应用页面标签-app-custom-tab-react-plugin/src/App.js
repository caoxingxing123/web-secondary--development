import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Tabs, Menu } from "antd";
import qs from "querystringify";
import $ from "jquery";
// import appService from "@njsdata/app-sdk";
import "./app.less";

const { TabPane } = Tabs;

const App = (props) => {
   const { pageTabs = [], menuDatas = [], onChange, onRemove, getMenuName } = props;
   // 储存禁止删除页签的ID
   let [unCloseTabId, setUnCloseTabId] = useState("");

   // 当前页签数组的数据
   let [tabData, setTabData] = useState([]);

   //  保存当前DOM元素
   let [nodeKey, setNodeKey] = useState("");

   // 移除的key
   let [removeKey, setRemoveKey] = useState("");

   // 页签ID
   let [menuKey, setMenuKey] = useState("");

   useEffect(() => {
      // 标签DOM
      let tabList = $("#nskg_tabs .ant-tabs-nav .ant-tabs-nav-wrap")[0];
      // 菜单DOM
      let menu = document.getElementById("nskg_rightMenu");
      // 右键点击事件
      $(tabList).on("contextmenu", ".ant-tabs-tab", function (e) {
         e.preventDefault();

         let idKey = $(e.target).attr("data-node-key");

         if (idKey) {
            setNodeKey(idKey);
         } else {
            let parentIdKey = $(e.target).parent();
            setNodeKey(parentIdKey);
         }

         menu.style.left = e.clientX + "px";
         menu.style.top = e.clientY + "px";
         menu.style.display = "block";
      });
      // 添加点击关闭菜单事件
      document.body.addEventListener("click", () => {
         if (menu.style.display == "block") {
            menu.style.display = "none";
         }
      });
   }, []);

   useEffect(() => {
      let dataList = JSON.parse(JSON.stringify(pageTabs));
      console.log("dataList--->", dataList);
      console.log("props--->", props);

      // 获取首页ID
      let homeId = "";
      menuDatas.forEach((item) => {
         if (item.name == "首页") {
            homeId = item.id + "#3";
            setUnCloseTabId(homeId);
         }
      });
      // 添加首页
      dataList.unshift({ id: homeId });
      // 数组去重
      for (let i = 0; i < dataList.length; i++) {
         for (let j = i + 1; j < dataList.length; j++) {
            if (dataList[i].id == dataList[j].id) {
               dataList.splice(j, 1);
               j--;
            }
         }
      }
      if (removeKey) {
         setTabData([{ id: unCloseTabId }]);
         onRemove(menuKey);
         setRemoveKey("");
         setMenuKey("");
      } else {
         setTabData(dataList);
      }
      // 设置tab数组
   }, [pageTabs]);

   // 右键菜单
   const handleMenu = (value) => {
      let dataList = JSON.parse(JSON.stringify(pageTabs));

      if (value.key == "关闭其他页签") {
         dataList.forEach((item) => {
            if (item.id != unCloseTabId && item.id != nodeKey) {
               onRemove(item.id);
            }
         });
      }

      if (value.key == "关闭所有页签") {
         dataList.forEach((item) => {
            if (item.id != unCloseTabId) {
               onRemove(item.id);
            }
         });
      }
   };

   // 删除方法
   const onRemoveTab = (key) => {
      let dataList = JSON.parse(JSON.stringify(pageTabs));

      if (dataList.length <= 1) {
         let menuId = qs.parse(window.location.search).menuId;

         setTabData([{ id: unCloseTabId }]);
         onChange(unCloseTabId);
         setRemoveKey(key);
         setMenuKey(menuId);
      }

      onRemove(key);
   };

   return (
      <>
         {/* Tabs */}
         <Tabs id="nskg_tabs" className="tabsAll" type="editable-card" onChange={onChange} hideAdd={true} onEdit={onRemoveTab} activeKey={qs.parse(window.location.search).menuId}>
            {tabData.map((item) => (
               <TabPane tab={getMenuName(item.id)} key={item.id} closable={item.id != unCloseTabId && tabData.length !== 1}></TabPane>
            ))}
         </Tabs>
         {/* 菜单 */}
         <div id="nskg_rightMenu" className="right_menu">
            <Menu
               onClick={handleMenu}
               items={[
                  { key: "关闭其他页签", label: <span>关闭其他页签</span> },
                  { key: "关闭所有页签", label: <span>关闭所有页签</span> },
               ]}
            />
         </div>
      </>
   );
};

App.propTypes = {
   pageTabs: PropTypes.array, // 应用页签集合
   menuDatas: PropTypes.array, // 应用页签菜单数据
   onChange: PropTypes.func, // 应用页签的change方法
   onRemove: PropTypes.func, // 应用页签的删除方法
   getMenuName: PropTypes.func, // 获取应用页签的名称
};

export default App;
