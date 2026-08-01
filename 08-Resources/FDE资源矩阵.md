---
title: FDE资源矩阵
type: resource-matrix
status: active
updated: 2026-08-01
tags: [resources, official, open-source, license]
---

# FDE 资源矩阵

## FDE 角色与全生命周期

| 资源 | 证据级 | 最有价值的内容 | 转化产出 | 边界 |
|---|---|---|---|---|
| [OpenAI FDE 岗位](https://openai.com/careers/forward-deployed-engineer-%28fde%29-nyc-new-york-city/) | O | Discovery、scoping、build、rollout、adoption、eval 回流 | 能力地图和作品验收线 | 岗位页可变，记录核验日期 |
| [Palantir Architecture Center](https://www.palantir.com/docs/foundry/architecture-center/overview/) | O | 现场问题、平台架构与产品回流 | 复用飞轮和 Field RFC | 产品架构不等于所有企业都需要重型本体 |
| [OpenFDE](https://openfde.net/zh) | R | 系统化交付流程与能力地图 | 个人学习地图 | 文档与代码许可需分开核对 |
| [FDE Guidance Book](https://github.com/xdash/FDE-the-Guidance-Book-of-Forward-Deployed-Engineer) | R | PSF、影子工作、MVD、采用与复用 | 机会评分和现场诊断 | 免费阅读/非商业分享；商业使用需授权 |

## Agent 架构、工具与语义

| 资源 | 证据级 | 最有价值的内容 | 转化产出 | 边界 |
|---|---|---|---|---|
| [Anthropic Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents) | O | Workflow 与 Agent 的区别；从简单可组合模式开始 | 架构选型记录 | 只在开放性和灵活性真的需要时增加自主性 |
| [OpenAI Agent Guide](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf) | O | 工具、编排、guardrail、human-in-the-loop | 工具合同与人工边界 | 不把厂商示例直接当成企业架构 |
| [Model Context Protocol](https://modelcontextprotocol.io/docs/getting-started/intro) | O | 连接数据、工具和工作流的开放标准 | MCP 服务器边界、权限和版本记录 | MCP 降低连接成本，不自动解决权限和数据质量 |
| [Palantir Ontology System](https://www.palantir.com/docs/foundry/architecture-center/ontology-system) | O | 对象、属性、逻辑、动作和权限的统一语义 | 业务对象和动作清单 | 中小项目可先建类型/语义层，不必一次建完整 Ontology |
| [12-Factor Agents](https://github.com/humanlayer/12-factor-agents) | R | 确定性代码与 LLM 步骤的组合、状态和编排原则 | Production Agent 设计检查 | 正文 CC BY-SA 4.0，代码 Apache-2.0 |

## Eval、可观测与安全

| 资源 | 证据级 | 最有价值的内容 | 转化产出 | 边界 |
|---|---|---|---|---|
| [Anthropic Agent Evals](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) | O | 代码、模型与人工 grader 的组合 | Eval Plan 和 rubric | 高风险结果不让模型 grader 单独决定 |
| [OpenAI Evals](https://evals.openai.com/) | O | 真实任务、可执行评分和基准设计 | 任务级验收集 | 通用 benchmark 不替代企业自己的业务集 |
| [Arize Phoenix](https://github.com/Arize-ai/phoenix) | R | tracing、dataset、experiment、retrieval/response eval | 可观测 PoC 和回归流水线 | Elastic License 2.0；引入前评估部署与许可 |
| [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) | O | Govern / Map / Measure / Manage 风险治理 | 风险登记和持续复核机制 | 框架为自愿使用；不等于特定行业合规认证 |
| [OWASP GenAI Security](https://genai.owasp.org/llm-top-10/) | O | prompt injection、数据暴露、工具滥用等威胁 | 威胁模型和安全回归集 | 使用时记录所参考的版本 |
| [OpenAI Harness Engineering](https://openai.com/index/harness-engineering/) | O | 确定性反馈、代理审查、可读环境与迭代循环 | 工程 Harness 清单 | 软件工程案例；迁移到业务 Agent 时需重新定义 ground truth |

## 学习路线与 Demo 资产

| 资源 | 证据级 | 最有价值的内容 | 转化产出 | 边界 |
|---|---|---|---|---|
| [Awesome FDE Roadmap](https://github.com/pierpaolo28/Awesome-FDE-Roadmap) | R | AI、数据、咨询和企业架构技能全景 | 能力 Gap 检查 | 广度大于深度，不要按链接数量学习 |
| [FDE Career Roadmap](https://github.com/thecoder8890/forward-deployed-engineer-roadmap) | R | 作品、面试、部署和采用证据 | 项目完成定义 | 自定义许可；仅做学习线索 |
| [OpenFDEAI ChatDemo](https://github.com/OpenFDEAI/ChatDemo) | R | 从会议材料快速生成需求证据与 Demo | Demo Factory 工作流 | “卖 PoC”不等于生产交付；代码与文档许可分开 |
| [OpenAI Knowledge Retrieval](https://github.com/openai/openai-knowledge-retrieval) | O | 配置驱动的 ingest、retrieval、citation 和 eval | 企业 RAG 工程参考 | MIT 代码不等于可直接复制业务数据和配置 |

## 采用结论

本仓库只把这些资源当作证据和设计输入。项目最终采用哪项方法，要由真实流程、数据、风险和 Eval 结果决定。

