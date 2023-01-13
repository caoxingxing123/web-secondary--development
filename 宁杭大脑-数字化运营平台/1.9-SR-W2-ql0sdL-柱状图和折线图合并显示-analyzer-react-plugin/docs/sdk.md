---
title: sdk
nav:
  title: 分析仪
  path: /analyzer
group:
  title: sdk
  path: /dev
toc: menu
---

## **场景说明**

如果开发插件涉及到使用JS SDK基础API功能，并且数睿企业级无代码开发平台也提供此能力，用户可通过接入JS SDK实现。

## **操作步骤**

步骤1、打开cmd窗口，执行以下命令安装JS SDK。

**npm install @sdsdk/app-sdk**

步骤2、使用以下命令将app-sdk引入二开插件中。

**import { getAnalysisData } from "@sdsdk/analyzer-sdk";**

| 字段 | 说明 |
| --- | --- |
| @sdsdk/app-sdk | JS SDK名称 |
| getPageData | 接口名称。此处以getAnalysisData为例，目前支持的接口主要包括：getAnalysisData，getPluginVariables。 |

## 接口名称

### getAnalysisData

* 使用范围：可在type 为 analyzer 时调用。
* 描述：获取分析仪数据
* 使用方法
    **import { getAnalysisData } from "@sdsdk/analyzer-sdk";**
    **const data = getAnalysisData ();**
* 返回的结构

```
[
    ["公司", "大小"],
    ["A", 21],
    ["A", 22],
    ["B", 14],
    ["B", 23],
    ["C", 11],
    ["C", 15],
    ["D", 26],
    ["D", 25]
]
```

### getPluginVariables

* 使用范围：可在type 为 analyzer 时调用
* 描述：获取插件变量。
* 使用方法
    **import { getPluginVariables } from "@sdsdk/analyzer-sdk";\*\***
    **const data = getBlockOptions();**
* 返回的结构

~~~
{
    "num":20
}
~~~
