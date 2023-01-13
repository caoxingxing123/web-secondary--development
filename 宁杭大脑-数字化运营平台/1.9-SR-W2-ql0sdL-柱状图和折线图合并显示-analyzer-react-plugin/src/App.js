import React, { Component } from "react";
import * as echarts from "echarts";
import "./app.less";

import MsgCompConfig from "./api/msgCompConfig";
import { queryAssetById } from "./api/asset";

export default class App extends Component {
   constructor(props) {
      super(props);

      let external = props.options?.externalVariables ? props.options.externalVariables : {};

      // 全局配置
      this.barDataOrder = external["柱形数据排列数据"] || "南京段,溧阳段,宜兴段,溧马段,溧芜段";
      this.backgroundColor = external["背景颜色"] || "transparent";

      // 图例配置
      this.legendGap = external["图例元素间距"] || "50";
      this.legendLabelColor = external["图例文字颜色"] || "#fff";
      this.legendLabelFontSize = external["图例文字字号"] || "14";

      // X轴配置
      this.xAxisLineColor = external["X轴轴线颜色"] || "#fff";
      this.xAxisLabelColor = external["X轴文字颜色"] || "#fff";
      this.xAxisLabelFontSize = external["X轴文字字号"] || "14";

      // Y轴配置
      this.yAxisTitleColor = external["Y轴标题文字颜色"] || "#fff";
      this.yAxisTitleFontSize = external["Y轴标题文字字号"] || "14";
      this.yAxisTitlePadding = external["Y轴标题位置"] || "10";
      this.yAxisLabelColor = external["Y轴文字颜色"] || "#fff";
      this.yAxisLabelFontSize = external["Y轴文字字号"] || "14";

      // 折线图配置
      this.yAxisLineColor = external["折线颜色"] || "#C6EA8D";
      this.yAxisLineMax = external["折线Y轴最大值"] || "100";
      this.yAxisSymbolSize = external["折线拐点大小"] || "6";
      this.yAxisSymbolColor = external["折线拐点颜色"] || "#BFF97F";
      this.yAxisSymbolBorderWidth = external["折线拐点边框大小"] || "";
      this.yAxisSymbolBorderColor = external["折线拐点边框颜色"] || "";

      // 辅助线配置
      this.markLineColor = external["辅助线颜色"] || "#FFFE7E";

      // 柱形数据配置
      this.barWidth = external["柱形数据宽度"] || "70";
      this.barColorList = external["柱形数据颜色数组"] || "#FBC78B-#FFFE7E";
   }

   componentDidMount() {
      this.refs["nhdn_stacking"].parentNode.style.width = "100%";
      this.refs["nhdn_stacking"].parentNode.style.height = "100%";
      this.refs["nhdn_stacking"].parentNode.parentNode.style.minHeight = 0;

      const { componentId, updateProcess } = this.props;
      window?.componentCenter?.register(componentId, "comp", this, MsgCompConfig);
      updateProcess && updateProcess();

      if (process.env.NODE_ENV !== "production") {
         this.do_EventCenter_updateEcharts({ value: "hour" });
      }

      this.handleEchartsData("hour");
   }

   // 数据转换
   translatePlatformDataToJsonArray = (originTableData) => {
      let originTableHeader = originTableData.data[0];
      let tableHeader = [];
      originTableHeader.forEach((item) => {
         tableHeader.push(item.col_name);
      });
      let tableBody = originTableData.data[1];
      let tableData = [];
      tableBody.forEach((tableItem) => {
         let temp = {};
         tableItem.forEach((item, index) => {
            temp[tableHeader[index]] = item;
         });
         tableData.push(temp);
      });
      return tableData;
   };

   handleEchartsData(type) {
      // 图例数据
      let legendData = this.barDataOrder.split(",");

      let seriesData = {
         carData: [],
         truckData: [],
         roundData: [],
      };

      // 接口参数
      let dataForm = {
         column: "type",
         datatype: 0,
         type: 10,
         compareObj: type,
      };

      // 获取资产数据
      queryAssetById("b4f8e890-263d-d2c1-0cb7-475a8c995ce4", dataForm).then((res) => {
         let resData = this.translatePlatformDataToJsonArray(res);

         legendData.forEach((item, index) => {
            resData.forEach((e) => {
               if (e.name == item) {
                  seriesData.carData[index] = e.car_flow_num;
                  seriesData.truckData[index] = e.truck_flow_num;
                  seriesData.roundData[index] = e.car_truck_round_rate;
               }
            });
         });

         this.initEcharts(legendData, seriesData);
      });
   }

   initEcharts(legendData, seriesData) {
      let myChart = echarts.init(this.refs["nhdn_stacking"]);
      let option = {};

      // Y轴最大最小值
      let _max = Number(this.yAxisLineMax);
      let _min = Number(-_max);
      // 柱形数据颜色
      let _colorList = this.barColorList.split("-");

      option = {
         backgroundColor: this.backgroundColor,
         // 悬浮窗
         tooltip: {
            trigger: "axis",
            axisPointer: {
               type: "shadow",
            },
         },
         // 分析仪整体
         grid: {
            top: "8%",
            bottom: "3%",
            left: "3%",
            right: "3%",
            containLabel: true,
         },
         // 图例数据
         legend: {
            top: "5%",
            left: "center",
            // 图例距离
            itemGap: Number(this.legendGap),
            itemWidth: 20,
            itemHeight: 10,
            // 文字样式
            textStyle: {
               color: this.legendLabelColor,
               fontSize: this.legendLabelFontSize,
            },
            data: [
               {
                  name: "客车流量",
                  icon: "rect",
               },
               {
                  name: "货车流量",
                  icon: "rect",
               },
               {
                  name: "客货总流量环比",
               },
            ],
         },
         // X轴
         xAxis: [
            {
               type: "category",
               // 轴线配置
               axisLine: {
                  lineStyle: { color: this.xAxisLineColor },
               },
               // 轴线文字配置
               axisLabel: {
                  color: this.xAxisLabelColor,
                  fontSize: this.xAxisLabelFontSize,
               },
               axisTick: { show: false },
               data: legendData,
            },
         ],
         // Y轴
         yAxis: [
            {
               type: "value",
               name: "流量：辆/h",
               nameTextStyle: {
                  align: "center",
                  color: this.yAxisTitleColor,
                  fontSize: this.yAxisTitleFontSize,
                  padding: [0, 0, Number(this.yAxisTitlePadding), 0],
               },
               splitLine: { show: false },
               axisLine: { show: true },
               axisLabel: {
                  color: this.yAxisLabelColor,
                  fontSize: this.yAxisLabelFontSize,
               },
            },
            {
               type: "value",
               min: _min,
               max: _max,
               splitLine: { show: false },
               axisLine: { show: false },
               axisLabel: { show: false },
            },
         ],
         // 数据
         series: [
            {
               name: "客车流量",
               type: "bar",
               stack: "AA",
               barWidth: this.barWidth,
               itemStyle: { color: _colorList[0] },
               data: seriesData.carData,
            },
            {
               name: "货车流量",
               type: "bar",
               stack: "AA",
               barWidth: this.barWidth,
               itemStyle: { color: _colorList[1] },
               data: seriesData.truckData,
            },
            {
               name: "客货总流量环比",
               type: "line",
               yAxisIndex: 1,
               symbol: "circle",
               symbolSize: this.yAxisSymbolSize,
               smooth: true,
               itemStyle: {
                  color: this.yAxisSymbolColor,
                  borderWidth: this.yAxisSymbolBorderWidth,
                  borderColor: this.yAxisSymbolBorderColor,
               },
               lineStyle: {
                  color: this.yAxisLineColor,
               },
               markLine: {
                  symbol: "none",
                  data: [
                     {
                        yAxis: 0,
                        lineStyle: {
                           color: this.markLineColor,
                        },
                        label: {
                           color: this.yAxisLabelColor,
                           fontSize: this.yAxisLabelFontSize,
                        },
                     },
                  ],
               },
               data: seriesData.roundData,
            },
         ],
      };

      option && myChart.setOption(option);

      function debounce(func, ms = 1000) {
         let timer;
         return function (...args) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
               func.apply(this, args);
            }, ms);
         };
      }
      const task = () => {
         myChart.resize();
      };
      const debounceTask = debounce(task, 300);
      window.addEventListener("resize", debounceTask);
   }

   Event_Center_getName = () => {
      return "宁杭大脑-堆叠折柱混合";
   };

   // 切换事件点
   do_EventCenter_updateEcharts({ value }) {
      console.log("获取到过滤条件", value);
      this.handleEchartsData(value);
   }

   render() {
      return <div ref="nhdn_stacking" style={{ width: "100%", height: "100%" }}></div>;
   }
}
