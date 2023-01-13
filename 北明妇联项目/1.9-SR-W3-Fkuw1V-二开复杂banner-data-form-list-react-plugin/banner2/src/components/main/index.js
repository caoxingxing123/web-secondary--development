/*
 * @Author: caoxingxing123 1104190972@qq.com
 * @Date: 2022-12-25 22:18:36
 * @LastEditors: caoxingxing123 1104190972@qq.com
 * @LastEditTime: 2023-01-12 15:48:05
 * @FilePath: /data-form-list-secondary/src/components/main/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { Component } from "react";
import { Swiper } from "antd-mobile-v5";
import "./index.less";

const pageSize = 8;

const mockData = [
  [{ key: 1 }],
  [{ key: 2 }],
  [{ key: 3 }],
  [{ key: 4 }],
  [{ key: 5 }],
  [{ key: 6 }],
  [{ key: 7 }],
  [{ key: 8 }],
  [{ key: 9 }],
  [{ key: 10 }],
  [{ key: 11 }],
  [{ key: 12 }],
  [{ key: 13 }],
  [{ key: 14 }],
];

// http://10.15.110.25:18880/storage_area/form/1234567890/96a9c04cc4f44607af697d64ed5c8c4a.png
export default class Main extends Component {
  state = {
    id: "",
    number: 1,
  };

  componentDidMount() {
    //封装平台方法
    //同时封装外层dom id为需求编号，初始化事件注册，重要勿删
    this.props.mainInit && this.props.mainInit(this);
    this.initComData();
    console.log("==========================");
    console.log("this.props", this.props);
    console.log("==========================");
  }

  initComData = () => {
    const { customConfig } = this.props;
    customConfig.number && this.setState({ number: customConfig.number });
  };

  Event_Center_getName() {
    return this.state.id;
  }

  /**
   * 用于触发事件方法，window.eventCenter?.triggerEvent封装了一层，
   * @param {String} eventName 事件名
   * @param {Array} payload 事件传参
   *
   */
  triggerEvent = (eventName, payload) => {
    const componentId =
      this.props.componentId || this.props?.customConfig.componentId;
    componentId &&
      window.eventCenter?.triggerEvent(
        componentId,
        eventName,
        //payload需为一个object
        payload
      );
  };
  handleClick = () => {
    console.log(this);
    this.triggerEvent("click", { value: "123" });
  };

  renderItem = (index) => {
    const { data = [], history = {} } = this.props;

    const dataSource = data.slice(
      index * pageSize,
      index * pageSize + pageSize
    );

    const results = dataSource.map((i) => {
      if (!i) return null;
      const pic = i.find((j) => j?.label === "图片");
      const link = i.find((j) => j?.label === "链接");
      const title = i.find((j) => j?.label === "标题");
      return (
        <div
          style={{
            height: "100px",
            width: "25%",
            padding: "6px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundImage: `url(${pic?.value?.value})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              width: "70%",
              height: "70%",
              borderRadius: "6px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center",
              overflow: "hidden",
            }}
            onClick={() => {
              if (link?.value?.value) {
                if (
                  link?.value?.value.startsWith("http://") ||
                  link?.value?.value.startsWith("https://")
                ) {
                  window.location.href = link?.value?.value;
                } else {
                  history.push(link?.value?.value);
                }
              }
            }}
          />
          <div
            style={{
              width: "100%",
              height: 25,
              color: "#666",
              textAlign: "center",
              lineHeight: "25px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {title?.value?.value || ""}
          </div>
        </div>
      );
    });
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100%",
          flexWrap: "wrap",
        }}
      >
        {results}
      </div>
    );
  };

  renderPage = () => {
    const { data = [] } = this.props;
    let components = [];
    for (let i = 0; i < data?.length; i = i + pageSize) {
      components.push(
        <Swiper.Item key={i}>
          <div style={{ height: "90%", display: "flex" }}>
            {this.renderItem(i / pageSize)}
          </div>
        </Swiper.Item>
      );
    }
    return components;
  };

  render() {
    return (
      <div className="app-secondary" id={this.state.id}>
        {/*以下为样例，正式开发请去除相关代码*/}
        {/* {this.state.number}
        <button onClick={this.handleClick}>测试逻辑控制</button> */}
        <div
          style={{
            padding: 12,
            color: "#333",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          精选服务
        </div>
        <div>
          <Swiper
            style={{ "--height": "240px" }}
            indicatorProps={{
              style: {
                "--dot-color": "rgba(0, 0, 0, 0.3)",
                "--active-dot-color": "rgba(255, 0, 0, 0.6)",
                "--dot-size": "10px",
                "--active-dot-size": "10px",
                "--dot-border-radius": "50%",
                "--active-dot-border-radius": "15px",
                "--dot-spacing": "8px",
              },
            }}
          >
            {this.renderPage()}
          </Swiper>
        </div>
      </div>
    );
  }
}
