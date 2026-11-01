---
title: "为什么选择 Niu？面向 Agent 的模型平台"
description: "Niu 为 coding agent 提供模型信息、请求证据与管理能力。你确定目标，审核重要决策。"
status: "published"
publishedAt: "2026-10-15"
updatedAt: "2026-10-31"
category: "产品"
author: "Niuer"
---

Coding agent 已经知道目标是什么：完成你的任务，并在质量、速度、可靠性与成本之间做出合理取舍。它需要的是可靠的信息，以及能把判断执行下去的管理能力。

**Niu 是面向 Agent 的模型平台。** Niu 提供这些信息和管理能力；Agent 根据具体任务作出决策。Niu 不承诺最优模型或必然节省费用。

## 为 Agent 提供信息与控制能力

Agent 可以检查可用模型、声明的能力与已发布的客户价格，在批准的测试预算内用任务样本比较输出，并直接读取请求耗时、用量和费用。缺失的证据仍然保持未知。

调用模型只是流程的一部分。Niu 还支持管理员管理的模型池与路由、有明确范围的权限和预算，以及请求诊断。Agent 可以提出模型池方案；目前 MCP 工具尚不能管理模型池或修改预算，这些变更需要有权限的管理员审核和执行。

## 保留重要的决策权

你说明期望结果，确定支出和权限边界。Agent 自行获取证据，在授权范围内完成工作。你审核重要变更，无需在系统之间搬运模型列表、JSON 或截图。

想亲自了解效果时，可以[浏览模型](/models/)、在 Niu 中试用，并检查结果、延迟、用量和客户费用。控制台仍然是探索、审阅和恢复操作的入口。

## 从你的 coding agent 开始

按照[用 Niu 开发](/docs/guides/personal-assistant/)的流程，把安装和配置交给 Agent。[可运行的个人助理示例](https://github.com/niu-io/niu/tree/main/examples/personal-assistant)提供一个具体起点。示例的目的是学会使用 Niu，而不是规定你应该开发什么应用。

目前通过本地 MCP 服务器和工作空间 API 密钥接入。不同 coding agent 的原生 plugin，以及由 Agent 管理的事件订阅仍在规划。Plugin 应按各宿主支持的形式提供同一套 Niu 能力，不会扩大权限或替代 Agent 的判断。

## 只读你需要的内容

这篇说明与接入流程应足以帮助你开始，其余参考资料主要由 Agent 按需查阅。你也可以[自行部署 Niu](/docs/deployment/single-container/)；实际可用能力取决于配置、权限和[发布验证范围](https://github.com/niu-io/niu/blob/main/docs/releases/first-release.md)。
