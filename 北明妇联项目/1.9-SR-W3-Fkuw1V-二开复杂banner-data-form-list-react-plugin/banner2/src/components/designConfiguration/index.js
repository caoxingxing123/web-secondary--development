import React from "react";
import { Form, Input } from "antd";

function DesignConfiguration(props) {
  const [form] = Form.useForm();
  //此处的customConfig已经封装为一个object，可以直接使用,changeCustomConfig的入参应为一个json字符串
  const { changeCustomConfig, customConfig } = props;
  //id为默认添加的配置项，勿删
  !customConfig.id && (customConfig.id = "");
  //此处为最简单的样例
  !customConfig.number && (customConfig.number = 1);
  const handleClick = () => {
    customConfig.number++;
    changeCustomConfig(JSON.stringify(customConfig));
  };
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  const handleValueChange = (changedValues, allValues) => {
    changeCustomConfig(JSON.stringify(allValues));
  };
  return (
    <div className="designConfiguration">
      {/* <Form {...formItemLayout} form={form} onValuesChange={handleValueChange}>
        <Form.Item label="id" name="id">
          <Input defaultValue={customConfig.id}></Input>
        </Form.Item>
      </Form>
      <button onClick={handleClick}>测试加一</button> */}
    </div>
  );
}

export default DesignConfiguration;
