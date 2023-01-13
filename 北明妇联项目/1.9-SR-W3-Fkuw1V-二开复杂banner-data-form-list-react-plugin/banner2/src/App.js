import React from "react";
import {
  DesignConfiguration,
  Main
} from "./components";
import MsgCompConfig from "./components/main/msgCompConfig.js";
import Utils from "./utils/index.js";

//封装平台方法
export const mainInit = (Main, setId, actionDefinitions) => {
  if (setId) {
    const { customConfig } = Main;
    const componentId = Main.pluginId;
    //内部使用，需求编号，不需要可去掉，用来将需求编号打到dom元素上，方便以后处理问题
    const requirementNum = process.env.CUSTOM_PLUGIN["requirement-number"] === "需求编号"
                           ? ""
                           : process.env.CUSTOM_PLUGIN["requirement-number"];
    const customConfigId = customConfig?.id
                           ? `data-form-list_secondary_${requirementNum}_${customConfig.id}`
                           : `data-form-list_secondary_${requirementNum}_${Utils.generateUUID()}`;
    setId(customConfigId);
    const Event_Center_getName = () => {
      return customConfigId;
    };
    window?.componentCenter?.moduleRegister(componentId, "comp", { Event_Center_getName, ...actionDefinitions }, MsgCompConfig, Main.viewId);
  } else {
    const { customConfig } = Main.props;
    const componentId = Main.props.pluginId;
    window?.componentCenter?.moduleRegister(componentId, "comp", Main, MsgCompConfig, Main.props.viewId);
    //内部使用，需求编号，不需要可去掉，用来将需求编号打到dom元素上，方便以后处理问题
    const requirementNum = process.env.CUSTOM_PLUGIN["requirement-number"] === "需求编号"
                           ? ""
                           : process.env.CUSTOM_PLUGIN["requirement-number"];
    const id = customConfig?.id
               ? `data-form-list_secondary_${requirementNum}_${customConfig.id}`
               : `data-form-list_secondary_${requirementNum}_${Utils.generateUUID()}`;
    Main.setState({ id });
  }
};
const App = ({ type, ...props }) => {
  if (type == "designConfiguration") {
    props.changeCustomConfig = props.changeConfiguration;
    props.customConfig = JSON.parse(props.configuration);
    return <DesignConfiguration {...props} />;
  } else {
    props.mainInit = mainInit;
    props.customConfig = props.pluginConfig;
    return <Main {...props} />;
  }
};
App.propTypes = {};

export default App;
