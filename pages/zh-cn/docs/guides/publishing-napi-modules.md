---
title: 如何发布 N-API 包
layout: docs.hbs
---

# 发布混合了 N-API 和 non-N-API 包

以下步骤基于 `iotivity-node` 进行说明：

* 首先，发布一个 non-N-API 版本：
  * 更新 `package.json` 版本。对于 `iotivity-node`，目前版本号是 `1.2.0-2`。
  * 通览所有的清单（确保测试/示例/文档都正常）。
  * `npm publish`
* 其次，发布 N-API 版本：
  * 更新 `package.json` 版本。 在这种情况下，`iotivity-node` 的版本变成了 `1.2.0-3`。
  版本审查， 我们推荐以下预发布的版本架构，由 [semver.org](https://semver.org/#spec-item-9)提供。如： `1.2.0-napi`。
  * 通览所有的清单（确保测试/示例/文档都正常）。
  * `npm publish --tag n-api`

在这个例子中，标记为 `n-api` 的发布版已经确保尽管其版本 1.2.0-3 比 non-N-API 的版本号要延后一些，但如果有人简单通过运行 `npm install iotivity-node` 安装 `iotivity-node`，它不会被安装而只会默认安装 non-N-API。此人应该运行 `npm install iotivity-node@n-api` 得到 N-API 的版本号，有关使用标签的更多详情请查阅 ["使用目标标签"][]。

## 在某个版本的 N-API 包中引入特定的依赖

为了将 `iotivity-node` 的 N-API 版本作为依赖进行添加安装，`package.json` 应如下形式呈现：

```json
"dependencies": {
  "iotivity-node": "n-api"
}
```

**注意：** 如 ["使用目标标签"][] 的解释，不同于一般的版本号，标记的版本号不能在 `package.json` 中通过版本范围（诸如 `"^2.0.0"` 的形式）进行追踪。所以，版本维护者使用相同的标签但选择了一个稍晚一些的版本， `npm update` 将收到稍晚的版本。这在当前试验环境下的 N-API 是可以接受的。为了依赖于一个 N-API 特定版本而不是最新的发布版，`package.json` 依赖不得不引用具体的版本范围，如下所示：

```json
"dependencies": {
  "iotivity-node": "1.2.0-3"
}
```

["使用目标标签"]: https://docs.npmjs.com/getting-started/using-tags
