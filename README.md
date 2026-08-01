---
title: FDE Delivery OS
type: index
status: public-review
updated: 2026-08-01
tags: [fde, delivery, playbook, skills, evidence]
---

# FDE Delivery OS

一套面向企业 AI 交付者的公开工作系统：把模糊机会推进为可定界、可评测、可运行、可采用、可复用的交付闭环。

它是 [Joe-rq](https://github.com/Joe-rq) 的 FDE 作品集总入口，重点展示方法、Playbook、模板、可调用 Skills、评测设计和证据治理，不包含客户原始材料、内部数据或私有交付证据。

## 适合谁

- 需要把“想用 AI”收敛为可执行项目的 FDE、解决方案工程师和技术负责人；
- 需要在 SOW、Spec、Eval、上线和采用之间建立证据链的交付团队；
- 想判断 Agent、Workflow、规则引擎与人工复核应如何分工的 AI 应用工程师；
- 希望用公开作品验证交付判断，而不是只展示 Demo 的招聘方。

## 它解决什么问题

企业 AI 项目常在三个地方失真：需求没有进入真实流程，Demo 指标被外推成生产承诺，单次项目没有沉淀为下一次可复用资产。本仓库用同一套生命周期连接：

`机会判断 → 现场发现 → 范围与 SOW → Spec / 原型 → Eval → 生产化 → 采用 → 复用`

## 十步交付闭环

| 步骤 | 核心问题 | 公开产物 |
|---|---|---|
| 1. 机会选择 | 值不值得做 | [机会评分卡](03-Templates/机会评分卡.md) |
| 2. 现场发现 | 工作实际怎样发生 | [五张地图模板](03-Templates/五张地图模板.md) |
| 3. 问题定义 | 哪个问题可证伪 | baseline、假设与问题陈述 |
| 4. 商业/技术定界 | 哪些承诺可控 | Scope、依赖、风险、人机边界 |
| 5. SOW | 双方怎样算赢 | [SOW 模板](03-Templates/SOW模板.md) |
| 6. Spec / 原型 | 怎样最低成本验证理解 | 设计说明、最小闭环 |
| 7. Eval | 什么叫好、错在哪里 | [Eval 计划模板](03-Templates/Eval计划模板.md) |
| 8. 生产化 | 能否稳定、安全、可恢复 | 权限、审计、回滚、Runbook |
| 9. 采用 | 用户行为是否改变 | 试运行与采用指标 |
| 10. 复用 | 第二次是否更快 | Skill、连接器、模板、Field RFC |

完整定义见 [FDE 交付闭环](00-Map/FDE交付闭环.md)。

## 快速开始

1. 有一个模糊机会：先运行 [fde-opportunity-diagnosis](skills/fde-opportunity-diagnosis/SKILL.md)。
2. 已经有方案或 Demo：用 [fde-eval-acceptance](skills/fde-eval-acceptance/SKILL.md) 定义评测与发布门。
3. 要把资料或复盘沉淀进体系：用 [fde-knowledge-ingest](skills/fde-knowledge-ingest/SKILL.md) 做去重、来源分级和许可检查。
4. 只需要文档：从 [Playbooks](02-Playbooks/) 选择执行流程，再复制 [Templates](03-Templates/)。
5. 验证仓库完整性：运行 `node scripts/check-kb.mjs`；需要联网核验外链时运行 `node scripts/check-kb.mjs --external`。
6. 不知道该读什么：从 [FDE 资源导航](08-Resources/README.md) 按当前项目阶段选资料，不从工具列表开始。

## 3 个可调用 Skills

| Skill | 何时调用 | 自带评测 |
|---|---|---|
| [机会诊断](skills/fde-opportunity-diagnosis/SKILL.md) | 判断问题、证据、替代方案和 Go / Hold / No-Go | 3 条 eval 场景 |
| [评测与验收](skills/fde-eval-acceptance/SKILL.md) | 把业务风险转为数据集、指标、评分器和发布门 | 3 条 eval 场景 |
| [知识入库](skills/fde-knowledge-ingest/SKILL.md) | 将新资料转为方法、模板、案例或待验证问题 | 3 条 eval 场景 |

Skills 目录、安装思路和安全边界见 [skills/README.md](skills/README.md)。

## 导航

| 入口 | 内容 |
|---|---|
| [00-Map](00-Map/) | 十步闭环、能力地图、公开定位 |
| [01-Methods](01-Methods/) | 机会筛选、Discovery、SOW、Eval、生产与复用 |
| [02-Playbooks](02-Playbooks/) | 从线索到 SOW、进场诊断、原型到生产、项目复盘 |
| [03-Templates](03-Templates/) | 7 个可复制模板/示例 |
| [04-Cases](04-Cases/) | 合成沙盒案例、项目候选、真实脱敏案例与外部模式索引 |
| [05-Engineering](05-Engineering/) | Production Agent、Skill 与 Harness、CLI 工作流纪律 |
| [06-Sources](06-Sources/) | 来源登记、事实状态、证据与许可边界 |
| [07-Portfolio](07-Portfolio/) | 作品集导航、简历表述与发布验收记录 |
| [08-Resources](08-Resources/) | 官方、开源、私有研究与课程启发的分层资源地图 |
| [09-CourseNotes](09-CourseNotes/) | FDE 共学营的方法论骨架与项目 gap 映射 |
| [scripts](scripts/) | 本地链接、敏感信息、事实口径和文件完整性校验 |

## 与工程案例的关系

`FDE Delivery OS` 是方法体系层；[ai-native-delivery-workbench](https://github.com/Joe-rq/ai-native-delivery-workbench) 是可运行工程案例层。前者回答“怎样发现、定界、评测、验收和复用”，后者回答“这些约束怎样进入实际工程”。两者上下衔接，不复制实现。

其他已核验的公开实践：

- [iris-eval](https://github.com/Joe-rq/iris-eval)：可离线复现的评测工程样本：同一批 GSM8K 生成，换答案抽取器差 34 分（strict 64% / flexible 98%），实证「评测分数 = 模型能力 × 评测方法」；
- [travel-reimbursement-agent](https://github.com/Joe-rq/travel-reimbursement-agent)：可运行的报销辅助 Agent；
- `my-content-workflow`：**TODO — 2026-07-31 公开链接返回 404，发布前确认仓库名或公开状态。**

## 证据边界

- “启衡”只表示 **FDE 课程沙盒 PoC / 合成数据**，不是付费客户、生产交付或真实采用证据。
- [HIS 问题诊断 Agent](04-Cases/HIS客户问题诊断Agent.md) 始终是 `project-candidate / discovery-needed`，没有客户授权、样本、上线或业务效果证据。
- 真实脱敏案例（field-case / redacted）来自作者实际交付，已隐去客户、厂商与凭据；其证据为 private-evidence（测试库验证或方法论应用），不可由本仓库独立复算，也不代表生产采用。
- 原始交付物、课程正文、客户数据、公司内部材料和本地路径不进入本仓库。
- 数字必须同时说明样本、口径和证据强度；资产数量不得解释为用户采用或业务效果。
- 许可范围见 [LICENSE](LICENSE) 与 [NOTICE](NOTICE.md)；文档公开再利用许可仍有发布阻塞项。

## 当前限制

- 课程沙盒的原始数据和运行证据因公开边界未收录，因此案例指标不能由本仓库独立复算。
- 3 个 Skills 已有结构化 eval 定义，但尚未提供跨模型、跨运行时的自动评分结果。
- 生产采用、真实 ROI、第二客户复用和长期 SLO 均未被本仓库证明。
- Skills、文档和模板仍需完成逐项课程来源权利核验；在此之前不宣称其可自由再授权。

发布状态、阻塞项和一页简历表述见 [公开发布说明](07-Portfolio/公开发布说明.md)。
