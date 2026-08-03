---
title: Skill与Harness
type: engineering
status: active
updated: 2026-07-31
sources: [public-portfolio-evidence, openfde-chatdemo, restricted-course-inspiration]
tags: [skill, harness, judgment-unit]
---

# Skill 与 Harness

## 分工

- Harness 提供运行、工具、上下文、权限、追踪、恢复和评测机制。
- Skill 承载领域流程、判断、模板、边界和输出格式。

推荐策略是“稳定 Harness、可版本化 Skill”：把通用运行约束留在 Harness，把变化更快、需要专家维护的业务判断放进 Skill。

## 什么时候应该做成 Skill

一个判断或流程至少满足两项：

- 输入、输出和责任边界可描述；
- 有明确错误类型和人工升级条件；
- 能用样本、规则或人工 rubric 测试；
- 第二次不应再从聊天记录重建；
- 需要领域专家持续修订，而不必重构运行时；
- 已在多个合规场景中出现，或明确标记为待验证复用假设。

“在课程沙盒中出现”只能形成候选模式，不能写成跨客户验证。

### 象限分类：什么时候做成 Skill

用 modelScore（模型在该任务的能力）× practiceScore（实践沉淀厚度）双维判断。有实践沉淀才值得做成 Skill；modelScore 决定象限与策略：

| 象限 | 特征 | 策略 | 实证（私有证据） |
|---|---|---|---|
| mastery | 模型能胜任，实践更强 | comparison：靠 with/without 对照证明增量 | 医院信息系统 SQL 查询（modelScore 75 / practiceScore 97），with 0.875 vs without 0.583，delta +0.293 |
| codification | 模型在该任务弱，靠实践规范补足 | reference：把规范喂给模型 | 品牌 PPT 模板（modelScore 38 / practiceScore 86），靠精确匹配断言 |

> 两条评测设计不同：mastery 用差异化断言（skill-differential），codification 用精确匹配断言。混淆会把"模型本就会"的任务做成过度约束，或把"模型不会"的任务做成无效对照。[Private-evidence · 核验于 2026-05~06 · 不可由本仓库独立复算]

## Skill 最小结构

- 触发与不触发条件；
- 输入、输出与前置证据；
- 执行步骤及判断依据；
- 事实、假设与未知的处理；
- 错误、边界、人工升级和回滚；
- 参考模板或脚本；
- 至少 2 条场景测试；
- 版本、作者、来源和许可。

## Skill 上下文经济学

结构对还不够，要控制 token 成本。三层渐进加载是核心设计原则：

| 层 | 内容 | 加载时机 | 成本 |
|---|---|---|---|
| 元数据层 | name + description | 常驻启动 | ~百级 token |
| 指令层 | SKILL.md 正文 | 触发时加载 | 控制在 5k token 内 |
| 资源层 | references/、脚本、参考 | 按需读取 | 近乎无限 |

- description 是 Skill 被发现和调用的唯一路由依据，必须穷举触发场景与动词——写不清等于不存在。
- 主文件只放核心用法，重资源外移到 references/（本仓库 `fde-opportunity-diagnosis` 的 `references/scorecard.md` 即按需加载范例）。
- 参考文件一层直达，禁止 A 引 B 引 C 的套娃（越靠后越易被截断）；超 100 行的参考开头放目录。

## 本仓库的 3 个公开 Skills

| Skill | 状态 | 公开证据 |
|---|---|---|
| `fde-opportunity-diagnosis` | draft / callable | `SKILL.md`、2 个参考文件、3 条 eval 场景 |
| `fde-eval-acceptance` | draft / callable | `SKILL.md`、1 个参考模板、3 条 eval 场景 |
| `fde-knowledge-ingest` | draft / callable | `SKILL.md`、1 个来源策略、3 条 eval 场景 |

这里的“可调用”指结构满足 Agent Skill 的触发、流程和输出要求；不表示已经产生用户采用、生产结果或跨模型稳定性。

> 生产采用说明（私有证据）：上表 3 个公开 Skill 标 draft，仅证明结构满足。作者私有交付环境另有约 16 个同类 Skill 在真实医院信息系统交付中持续使用（非 draft），覆盖需求结构化 -> SQL/原型开发 -> 知识入库 -> 接口交接 -> 日报月报全链路。本仓库不公开其内容、院区名、表名与厂商名；它佐证 Skill 模式在真实交付中持续有效，而非停留在结构层。[Private-evidence]

## 基于 Agent 轨迹的 Skill 迭代

Skill 好坏不能拍脑袋，要看 Agent 真实使用轨迹。五个诊断信号：

| 信号 | 含义 | 动作 |
|---|---|---|
| 出现意外路径 | Agent 走了没设计的路 | 补边界或加引导 |
| 遗漏连接 | 该读的参考没读 | 调整 description 或引用 |
| 反复读取 | 同一文件读多次 | 信息没组织好，重构 |
| 从未访问 | 某参考没人用 | 评估是否多余 |
| 元数据触发不准 | description 没引来对的场景 | 重写触发词 |

基于观察迭代，而非凭空想象。

## 从 Skill 回到工程

Skill 不是隐藏业务逻辑的借口。高风险判断仍需：

1. 将确定性部分外移到代码或规则；
2. 为模型判断定义 rubric 和校准样本；
3. 为写操作设置权限、批准和审计；
4. 将失败样本进入回归集；
5. 在 Harness 层提供追踪、恢复和版本化。

> 写操作权限实证（私有证据）：一个医院信息系统 SQL 查询 Skill 把"只读"固化为硬约束--绝对禁止生成 INSERT/UPDATE/DELETE/DROP 等修改语句，用户要求改数据时只给 SELECT 定位行 + 拒绝模板。评测 case-002 实证：with 拒绝 UPDATE 并给 SELECT 替代 = 1.0；without 直接生成 DML = 0.33。字段报错时禁止"再猜"--要求用户跑发现查询确认真实字段名，防 AI 幻觉字段名。这是"为写操作设置权限"与"失败样本进入回归集"的实证。[Private-evidence · 核验于 2026-05~06 · 不可由本仓库独立复算]

具体文件见 [Skills 导航](../skills/README.md)。
