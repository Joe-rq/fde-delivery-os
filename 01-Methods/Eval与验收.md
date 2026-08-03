---
title: Eval与验收
type: method
status: active
updated: 2026-07-31
sources: [anthropic-agent-evals, sandbox-poc-private-evidence, openai-knowledge-retrieval]
tags: [eval, acceptance, reliability]
---

# Eval 与验收

## Eval 是交付合同的一部分

评估集要在开发早期建立，不是在项目末尾证明“我们做得不错”。它同时定义：

- 什么叫好；
- 哪些错误可以接受；
- 哪些错误必须转人工；
- 迭代是否真实变好；
- 是否达到试运行或扩大的门槛。

## 四层评估

| 层 | 关注 | 示例 |
|---|---|---|
| 单元 | 确定性逻辑 | 规则、金额、权限、格式 |
| 任务 | 单个业务任务结果 | verdict、字段、引用、工具调用 |
| 流程 | 多步闭环 | 覆盖、恢复、幂等、人工接管 |
| 业务 | 真实使用结果 | 耗时、采纳、风险、产能 |

## 三类评审器

- 代码评审器：规则、结构、数值、状态等可确定判断。
- 模型评审器：语义质量、解释完整性等需 rubric 的判断。
- 人工评审器：高风险、业务偏好、责任和边界案例。

能确定性验证的，不优先交给模型判断。

## 最小 Eval 包

1. 代表性真实样本和边界样本。
2. 标准答案或业务 rubric。
3. 指标定义、分母、阈值和置信区间说明。
4. 错误分类：数据、检索、规则、模型、工具、权限、流程。
5. 人工升级策略和不可自动化项。
6. 回归频率、版本记录和发布门。

## 企业 AI 技术红线

- 没有评测集，不进生产。
- 没有明确人工复核策略，不写入关键系统。
- 没有追踪、失败分类和回滚，不扩大上线。
- 没有采用观测，不宣布业务成功。

启衡 **FDE 课程沙盒 PoC / 合成数据** 的本地摘要显示：30 条样本中 27 条的最终判定与违规代码同时一致。这个 90% 不能外推为生产指标，且原始数据未公开；它的公开价值只是说明好的 Eval 要指出差异来自数据、规则、模型、工具还是流程，并给出下一步工程动作。

## 真实评测实证（私有证据）

以下来自作者私有交付环境的两个 Skill 评测集（InterSystems IRIS for Health 场景），仅用于说明上面的方法论论点，不可外推为生产指标。[Private-evidence · 样本口径见下 · 核验于 2026-05~06 · 不可由本仓库独立复算]

| 方法论论点 | 评测集 | 数据 |
|---|---|---|
| with/without 对照暴露差异化价值 | his-sql-select v1（4 case / 24 expectation） | with 均值 0.875（std 0.217）vs without 0.583（std 0.433），delta +0.293 |
| 安全约束类断言是 skill-differential | his-sql-select case-002 | with 拒绝 UPDATE 并给 SELECT 替代 = 1.0；without 直接生成 DML = 0.33 |
| 单跑 delta 有噪声，需 versionDelta | imedway-pptx-template | v1 with 0.900 → v2 with 0.866（均值下降，但引入 old_skill 同方法对照组后 versionDelta +0.232，证明新技能有净增益；均值下降是代理方差噪声） |
| 代理方差须与技能改进区分 | imedway case-005 | with 3/6 = old_skill 3/6，证明回归与技能改动无关，纯代理方差（同技能不同跑次可差 0.5~0.83） |
| expectation 按差异化分类给动作 | his-sql-select expectationHealth | differential / structure / content / quality 四类，各自给"保留 / 关注稳定性 / 需更多数据"建议 |
| 成本是验收的一部分 | his-sql-select case-001 | with 39090 tokens / 105s vs without 25999 tokens / 21s |

> case-004 出现反常回归（with 0.5 < without 1.0，delta -0.5）：技能版反而劣化。根因是门诊 SELECT 字段映射错且未引用参考目录；v2 补全三目录引用后回归到 1.0（6/6 全过）。这是"迭代是否真实变好"必须靠回归集捕捉、而非靠均值粉饰的实证。

> 象限分类决定 strategy：modelScore 高（模型已能胜任，如 SQL 查询 75）属 mastery，用 comparison 策略靠 with/without 证明增量；modelScore 低（模型在该任务弱，如品牌 PPT 模板 38）属 codification，用 reference 策略把实践规范喂给模型。两象限 practiceScore 都高——有实践沉淀才值得做成 Skill。
