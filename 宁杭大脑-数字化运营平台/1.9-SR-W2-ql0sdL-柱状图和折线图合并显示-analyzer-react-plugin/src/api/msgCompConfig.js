// 组件可派发事件
export const events = [];
// 组件可接收事件
export const actions = [
   {
      key: "updateEcharts",
      name: "更新堆叠折线图表",
      params: [
         {
            key: "value",
            name: "值",
            dataType: "string",
         },
      ],
   },
];

export default {
   actions,
   events,
};
