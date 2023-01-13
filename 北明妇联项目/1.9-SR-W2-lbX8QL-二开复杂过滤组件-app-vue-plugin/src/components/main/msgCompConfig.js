// 组件可派发事件
export const events = [
   {
      key: "dropCitycode",
      name: "下拉菜单-城市",
      payload: [
         {
            name: "城市",
            key: "citycode",
            dataType: "string",
         },
      ],
   },
   {
      key: "dropTypevalue",
      name: "下拉菜单-类型",
      payload: [
         {
            name: "类型",
            key: "typevalue",
            dataType: "string",
         },
      ],
   },
   {
      key: "dropTime",
      name: "下拉菜单-时间",
      payload: [
         {
            name: "开始时间",
            key: "starttime",
            dataType: "number",
         },
         {
            name: "结束时间",
            key: "endtime",
            dataType: "number",
         },
      ],
   },
];

// 组件可接收事件
export const actions = [
   // {
   //   key: "setValue",
   //   name: "设值",
   //   params: [
   //     {
   //       key: "value",
   //       name: "值",
   //       dataType: "string"
   //     }
   //   ],
   //   hasReturn: false,
   //   // hasReturn为false则不用写returns选项
   //   returns: [
   //     {
   //       key: "value",
   //       name: "值",
   //       dataType: "string"
   //     }
   //   ]
   // }
];

export default {
   actions,
   events,
};
