<template>
   <div :id="id" ref="app-secondary" class="app-secondary">
      <van-dropdown-menu active-color="#1989fa" :overlay="true" :lock-scroll="false">
         <van-dropdown-item :title="cityTitle" class="dropdown_city" v-model="city" :options="cityList" @change="changeCityDropDown" />
         <van-dropdown-item :title="typeTitle" v-model="type" :options="typeList" @change="changeTypeDropDown" />
         <van-dropdown-item :title="dateTitle" v-model="date" :options="dateList" @change="changeDateDropDown" />
      </van-dropdown-menu>
   </div>
</template>

<script>
import "./app.less";
import { queryAssetById, queryAreaByApi, jsSdkConfig, queryAddress } from "../../api/asset";

import VConsole from "vconsole";

export default {
   name: "Main",

   props: {
      customConfig: Object,
      info: Object,
      appletiables: Array,
      sysletiables: Array,
      themeInfo: Object,
      intlGetKey: Function,
      history: Object,
      mainInit: Function,
   },

   data() {
      return {
         id: "",

         city: "",
         cityTitle: "城市",
         cityList: [],

         type: "",
         typeTitle: "类型",
         typeList: [],

         date: "",
         dateTitle: "时间",
         dateList: [
            { text: "近一个月", value: "0" },
            { text: "近三个月", value: "1" },
            { text: "近半年", value: "2" },
         ],

         eventData: {
            citycode: "",
            typevalue: "",
            starttime: "",
            endtime: "",
         },
      };
   },

   mounted() {
      // new VConsole();

      // 事件注册
      this.mainInit(this);

      // 获取接口数据
      this.getDataByApi();
   },

   methods: {
      // 数据转换
      translatePlatformDataToJsonArray(originTableData) {
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
      },

      // 获取城市/类型资产数据
      getDataByApi() {
         // 请求类型数据
         queryAssetById("64c4b0e0-4d4f-ea0a-49f1-70de1fc941f6").then((res) => {
            let resData = this.translatePlatformDataToJsonArray(res);
            resData.forEach((item) => {
               this.typeList.push({
                  text: item.type_name,
                  value: item.data_id,
               });
            });
            this.type = this.typeList[0].value;
         });
         // 请求城市数据
         queryAreaByApi().then((res) => {
            res.data.result.forEach((item, index) => {
               if (index > 0) {
                  this.cityList.push({
                     text: item.cityname,
                     value: item.citycode,
                  });
               }
            });
            this.getJSSDK();
         });
      },

      // 切换城市
      changeCityDropDown(value) {
         this.cityTitle = this.filterData(this.cityList, value);
         this.eventData.citycode = value;
         this.triggerEvent("dropCitycode", { citycode: value });
      },
      // 切换类型
      changeTypeDropDown(value) {
         this.typeTitle = this.filterData(this.typeList, value);

         this.eventData.typevalue = value;

         this.triggerEvent("dropTypevalue", { typevalue: value });
      },
      // 切换日期
      changeDateDropDown(value) {
         this.dateTitle = this.filterData(this.dateList, value);

         if (this.dateTitle == "近一个月") {
            this.eventData.starttime = this.getDateTime(1).starttime;
            this.eventData.endtime = this.getDateTime(1).endtime;
         } else if (this.dateTitle == "近三个月") {
            this.eventData.starttime = this.getDateTime(3).starttime;
            this.eventData.endtime = this.getDateTime(3).endtime;
         } else if (this.dateTitle == "近半年") {
            this.eventData.starttime = this.getDateTime(6).starttime;
            this.eventData.endtime = this.getDateTime(6).endtime;
         }

         this.triggerEvent("dropTime", { starttime: this.eventData.starttime, endtime: this.eventData.endtime });
      },

      // 获取定位
      async getJSSDK() {
         let url = encodeURIComponent(window.location.href.split("#")[0]);
         let { data: res } = await jsSdkConfig(url);
         window.wx.config({
            debug: false, // 开启调试模式,调用的所有 api 的返回值会在客户端 alert 出来，若要查看传入的参数，可以在 pc 端打开，参数信息会通过 log 打出，仅在 pc 端时才会打印。
            appId: res.appId, // 必填，公众号的唯一标识
            timestamp: res.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.nonceStr, // 必填，生成签名的随机串
            signature: res.signature, // 必填，签名
            jsApiList: ["getLocation"], // 必填，需要使用的 JS 接口列表
         });
         window.wx.ready(() => {
            window.wx.getLocation({
               type: "gcj02",
               success: (resp) => {
                  this.setDefaultCity(resp);
               },
               fail(error) {},
            });
         });
      },

      // 获取默认城市编码
      setDefaultCity(res) {
         let loglat = `${res.latitude},${res.longitude}`;

         queryAddress(loglat).then((res) => {
            let cityName = res.data.ad_info.city;

            let cityArr = this.cityList.filter((item) => {
               return item.text == cityName;
            });

            this.city = cityArr[0].value;
            this.cityTitle = cityArr[0].text;
         });
      },

      // 获取日期时间
      getDateTime(n) {
         let end = new Date();
         let year = end.getFullYear();
         let month = end.getMonth() + 1;
         let day = end.getDate();

         let dateObj = {};
         dateObj.end = year + "-" + month + "-" + day;

         let endMonthDay = new Date(year, month, 0).getDate(); //当前月的总天数

         if (month - n <= 0) {
            let startMonthDay = new Date(year - 1, 12 - (n - parseInt(month)), 0).getDate();
            if (startMonthDay < day) {
               dateObj.start = year - 1 + "-" + (12 - (n - month)) + "-" + startMonthDay;
            } else {
               dateObj.start = year - 1 + "-" + (12 - (n - month)) + "-" + day;
            }
         } else {
            let startMonthDay = new Date(year, parseInt(month) - n, 0).getDate();
            if (startMonthDay < day) {
               if (day < endMonthDay) {
                  dateObj.start = year + "-" + (month - n) + "-" + (startMonthDay - (endMonthDay - day));
               } else {
                  dateObj.start = year + "-" + (month - n) + "-" + startMonthDay;
               }
            } else {
               dateObj.start = year + "-" + (month - n) + "-" + day;
            }
         }

         return {
            starttime: Date.parse(new Date(dateObj.start)),
            endtime: Date.parse(new Date(dateObj.end)),
         };
      },

      // 过滤数据
      filterData(dataList, value) {
         let row = dataList.filter((item) => {
            return item.value == value;
         });
         return row[0].text;
      },

      // 逻辑控制事件方法
      triggerEvent(eventName, payload) {
         let { componentId, appId } = this.customConfig || {};
         componentId && appId && window.eventCenter?.triggerEvent(componentId, eventName, payload);
      },

      //必需，不可删除
      Event_Center_getName() {
         return this.id;
      },
   },

   beforeDestroy() {
      window.componentCenter?.removeInstance(this.customConfig?.componentId);
   },
};
</script>

<style lang="less"></style>
