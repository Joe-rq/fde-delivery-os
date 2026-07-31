---
title: SOW-Spec-Demo证据链
type: method
status: active
updated: 2026-07-31
sources: [restricted-course-inspiration, openfde]
tags: [sow, spec, demo, scope]
---

# SOW、Spec、Demo 证据链

## 三者边界

| 产物 | 回答 | 不应承担 |
|---|---|---|
| SOW | 商业上答应什么、怎样算赢 | 每个实现细节 |
| Spec | 系统具体怎样实现和验证 | 未经确认的商业扩张 |
| Demo / 原型 | 哪个关键假设被最低成本证明 | 生产稳定性承诺 |

## SOW 范围六问

1. 为什么做：业务目标与 baseline。
2. 做什么：In Scope、P0/P1/P2。
3. 不做什么：Out of Scope。
4. 依赖什么：数据、接口、人员、环境、合规。
5. 怎么证明：样本、指标、容错、试运行、确认动作。
6. 谁来确认：双方负责人、业务专家、数据 owner、验收人。

## 指标四层

| 层级 | 用途 | 合同处理 |
|---|---|---|
| Baseline | 当前表现 | 应记录 |
| Target | 希望达到 | 可作为项目目标 |
| Acceptance | 最低验收线 | 只承诺可控且已验证部分 |
| Business Outcome | 收入、整体降本、风险 | 明确归因边界 |

所有项目都要有指标，但不是所有指标都应立刻成为刚性合同责任。

## 最短证据链

原型只跑一条最能代表价值的路径：

`真实输入 → 关键处理 → 人机判断 → 真实输出/回写 → 指标与证据`

原型完成后，先更新 Spec 和风险，再决定是否进入 MVP。不要把 Demo 代码直接打补丁变成生产系统。
