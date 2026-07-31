---
name: fde-eval-acceptance
description: Design evaluation and acceptance for enterprise AI systems and agents. Use whenever the user needs a golden set, metrics, graders, error taxonomy, human-review boundary, release gate, regression plan, or contract-ready acceptance criteria. Translates business decisions into reproducible tests and separates target metrics from contractual commitments.
license: LicenseRef-FDE-Delivery-OS
compatibility: Suitable for RAG, classification, extraction, tool-using agents, workflow automation, and human-in-the-loop systems.
metadata:
  author: Joe-rq
  version: "0.1.0"
  domain: fde
---

# FDE Eval & Acceptance

把“看起来不错”转化为可重复运行、可定位失败、可由业务方确认的证据链。

## 必读参考

生成正式方案时，读取 `references/eval-plan.md`。

## 工作流

### 1. 从业务决策开始

先回答：

- 系统正在帮助谁做什么决定；
- 错误会造成什么业务后果；
- 哪些结果可自动通过，哪些必须人工确认；
- 最终验收人是谁。

不要从抽象准确率开始。

### 2. 建立可追溯链

对每项验收要求建立：

业务目标 → 代表性任务 → 样本 → 期望结果 → 评分器 → 阈值 → 发布/回滚动作

如果任一环缺失，将其标为 `Unknown`，不要伪造验收线。

### 3. 分离四层指标

- `Baseline`：当前人工或旧系统表现；
- `Target`：希望达到的改进；
- `Acceptance`：双方同意的最低通过线；
- `Business Outcome`：收入、成本、风险等最终影响。

仅把系统可控、口径稳定且已经通过样本验证的指标写成刚性验收条件。

### 4. 设计代表性样本

样本至少覆盖：

- 常规样本；
- 关键业务规则；
- 边界和歧义；
- 缺失、脏数据和格式异常；
- 权限不足、工具失败和超时；
- 高风险误判；
- 历史线上失败样本。

划分开发集、验证集和锁定验收集。避免在锁定集上反复调参。

### 5. 选择评分器

组合使用：

- 代码评分：格式、字段、数值、状态、工具轨迹；
- 模型评分：开放式质量、引用支持度、规则解释；
- 人工评分：领域判断、风险、可接受性。

模型评分器必须有清晰 rubric，并用人工样本校准。可确定性判断不得全部交给模型评分。

### 6. 建立错误分类

至少区分：

- 输入/数据错误；
- 检索或上下文错误；
- 推理或规则错误；
- 工具选择/参数错误；
- 权限或系统错误；
- 输出格式错误；
- 人机边界错误；
- 评测口径错误。

每类错误指定归属、修复方式和回归样本。

### 7. 定义发布门槛

写清：

- 总体通过线；
- 关键子集通过线；
- 零容忍错误；
- 人工复核条件；
- 观察期；
- 降级和回滚条件；
- 回归频率。

总体均值不能掩盖高风险子集失败。

### 8. 形成验收动作

说明谁准备环境、谁提供数据、谁运行测试、谁复核争议、谁签字。验收必须产生可保存的运行记录和结果清单。

## 输出要求

使用 `references/eval-plan.md`，至少交付：

- 决策与风险边界；
- 指标四层；
- 数据集设计；
- 评分器和 rubric；
- 错误分类；
- 发布/回滚门槛；
- 验收角色和证据；
- 未确认项。

## 边界

- 不用单一总体准确率代表全部质量。
- 不根据少量 Demo 样本承诺生产指标。
- 不让模型评分器成为高风险场景的唯一裁判。
- 不因上游数据缺失，把责任错误归因于模型。
- 不把业务愿景直接变成供应方单方合同责任。
