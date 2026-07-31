---
name: fde-opportunity-diagnosis
description: Diagnose vague enterprise AI opportunities before solutioning. Use whenever the user provides customer notes, a workflow, an AI idea, or a request such as “这个项目值不值得做、先做什么、需求怎么收敛、是否适合 Agent”. Produces an evidence-aware problem definition, five-map gaps, opportunity score, minimum closed loop, and Go/Hold/No-Go recommendation. Do not use for pure implementation after scope and acceptance have already been frozen.
license: LicenseRef-FDE-Delivery-OS
compatibility: Works with local notes, meeting records, workflow descriptions, screenshots, and project documents.
metadata:
  author: Joe-rq
  version: "0.1.0"
  domain: fde
---

# FDE Opportunity Diagnosis

在提出技术方案之前，先判断问题是否真实、条件是否具备、项目是否值得推进。

## 必读参考

- 需要评分时，读取 `references/scorecard.md`。
- 需要生成正式交付物时，读取 `references/output-template.md`。

## 工作流

### 1. 建立证据台账

从材料中抽取并分组：

- `Confirmed`：材料直接支持的事实；
- `Inferred`：由多条事实推导的判断；
- `Hypothesis`：需要客户确认或样本验证的假设；
- `Unknown`：缺失且会改变决策的信息。

不得把课程观点、营销数字或单个受访者的看法写成已确认事实。

### 2. 复述当前业务

至少识别：

- Trigger：什么事件触发任务；
- Actor：谁执行、谁决策、谁验收；
- Input：输入、来源和质量；
- Process：真实步骤、返工和绕行；
- Decision：关键判断及依据；
- Exception：异常如何处理；
- Output：最终业务结果；
- Metric：当前如何衡量结果。

若无法复述当前流程，不得直接设计 Agent。

### 3. 完成五张地图的最小版本

检查流程、数据、系统、组织、政治五张地图。只记录与当前项目判断有关的内容，不为追求完整而无限调研。

### 4. 测试问题是否值得用 AI

先比较现有替代方案：

- 实习生或增加一名操作人员；
- Excel、表单、SOP；
- 规则引擎、RPA、搜索；
- 现有软件配置或流程调整。

明确 AI 带来的新增价值。若确定性方法更便宜、更稳，应推荐确定性方案或混合方案。

### 5. 通过 PSF 与机会评分

依次检查：

1. 痛点：具体角色是否反复承受具体损失；
2. 经济性：改进结果是否值得投入；
3. 可行性：数据、系统、评测和组织条件是否存在；
4. 项目性：决策、成本、责任和复用是否成立。

按 `references/scorecard.md` 评分。分数是讨论工具，不得替代关键红线判断。

### 6. 定义最小闭环

最小闭环必须从真实触发开始，到业务结果或人工确认结束。写清：

- AI 负责什么；
- 确定性系统负责什么；
- 人必须确认什么；
- 失败时如何降级；
- 用什么样本证明有效。

### 7. 给出推进结论

- `Go`：证据足以进入 SOW/验证阶段；
- `Hold`：方向可能成立，但关键依赖或证据缺失；
- `No-Go`：问题弱、替代方案更优、红线不可解或经济性不成立。

不要为了显得积极而默认给出 Go。

## 输出要求

使用 `references/output-template.md` 的结构。结论必须包含：

- 一句话问题定义；
- 事实、假设与未知；
- 当前流程与五张地图缺口；
- 替代方案比较；
- 分项评分及理由；
- 最小闭环；
- Go/Hold/No-Go；
- 下一步最小证据请求。

只在一个未知信息会实质改变结论时，提出一个最高价值的澄清问题；其余内容继续完成。

## 边界

- 不承诺未经样本验证的准确率或业务收益。
- 不把 Demo 能运行等同于生产可交付。
- 不替客户决定其预算、合规责任或组织利益。
- 涉及医疗、财务、法律或生产写入时，默认建议人工复核和可回滚机制。
