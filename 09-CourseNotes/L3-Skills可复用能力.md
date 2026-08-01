---
title: 第三课 · 把人的经验变成 Agent 可复用能力（Skills）
type: course-note
status: inspiration-only
updated: 2026-08-01
sources: [restricted-course-inspiration]
tags: [course, fde, l3, skills, agent-capability, knowledge-asset]
---

# 第三课 · 把人的经验变成 Agent 可复用能力（Skills）

> **来源**：FDE 共学营第一期。本页只记录受课程启发的方法论骨架与项目映射，**不复制课程正文、PPT 或讲义**。课程原始内容受版权保护，公开改编许可未确认，详见 [来源登记](../06-Sources/来源登记.md)。
>
> **覆盖**：PPT 85 页（失败 2 页）

> **案例口径**：本文提及的「启衡」指启衡 FDE 课程沙盒 PoC（合成数据），非真实客户或生产证据；详见 [来源登记](../06-Sources/来源登记.md)。

## 核心论点

把散落脑中的经验，按「轻入口、深能力、按需加载」结构封装成 Agent 可随时调用的 Skill，让一次性灵感变成可复用、可评测、可变现的能力资产——经验的价值不在「知道」，而在「能被稳定调用」。

## 方法论地图

### 1. 认知与定位：为什么经验必须变成 Skills（p1-7）

- **要点**：
  - AI 成熟度从单点提效跨向平台 AI 化，拐点是个人手感变团队基础设施
  - 岗位壁垒被统一工具栈抹平，价值=理解问题+调用工具
  - 人机协作向 AI 主导迁移，人留方向决策、AI 接管执行
- **框架/术语**：AI 提效四阶段、岗位→能力重画、人机协作三阶段演进
- **项目对应**：`00-Map/FDE能力地图与成长路线.md`、`00-Map/个人FDE定位.md`
- **Gap**：✅已覆盖——项目用「八维交付能力」回答证明什么，课程用「岗位重画」回答为什么工具化，视角互补不构成实质 gap
- **吸收建议**：无需补充；认知层叙事不宜进方法库

### 2. Skills 的本质与标准结构（p8-17）

- **要点**：
  - Skill=任务说明书+工具包+最佳实践，治上下文有限、多步不稳、知行脱节
  - Skill 是目录不是单文件：SKILL.md 最小入口，references/scripts 按需加载
  - 三层加载：元数据常驻、指令触发加载、资源按需读取，最低开销最高密度
  - description 是被 Agent 发现的唯一路由，须穷举触发场景与动词
- **框架/术语**：Skill 三合一、三种来源、三层渐进加载、轻入口深能力、YAML 元数据 + Markdown 正文
- **项目对应**：`05-Engineering/Skill与Harness.md`、`skills/fde-*/SKILL.md` + `references/` + `evals/`
- **Gap**：⚠️缺口——项目 3 个 Skill 物理分层合格，但没把「三层加载」与「上下文经济学」写成显式设计原则，也没讲 description 为何是路由开关
- **吸收建议**：在 `Skill与Harness.md` 补「Skill 上下文经济学」一节，用 fde-opportunity-diagnosis 的 references 举例

### 3. Skills 化案例与自动化运行（p18-26）

- **要点**：
  - 共性：把「人找资料」反转为「资料主动服务」，经验固化换效率
  - 复杂任务拆多个 Skill 串联，质量靠原始+校对版+完整性检查兜底
  - Quest 实现 hands-off：人定目标，Skill 后台串联，错峰执行降本
  - 能力封装三阶段：提示词→网页智能体→Skill
- **框架/术语**：沉淀→调用→生成、Quest on hands off、错峰执行、封装三阶段、Skill 三特性
- **项目对应**：`01-Methods/复用飞轮.md`、`04-Cases/启衡课程沙盒报销预审PoC.md`、`skills/fde-knowledge-ingest/SKILL.md`
- **Gap**：🔧补强——飞轮与入库已覆盖，但项目缺「Quest/无人值守/定时/错峰」运行编排视角
- **吸收建议**：在 `Skill与Harness.md` 补一句「Skill 成熟度含能否被定时触发与错峰调度」作选型检查项，不绑定平台

### 4. 从经验到 Skill 的判断与方法论（p27-38）

- **要点**：
  - 没有场景，提示词只是灵感；有场景，Skills 才是资产
  - 三维度筛选：省时（≥3 次/周）、省钱（外包/返工）、赚钱（可交付）
  - 模糊到可变现五步：需求显形→引导澄清→路径拆解→关键预判→打磨
  - 动手前四步：定义输出→反推输入→梳理 SOP→定义验证
  - 效果是系统乘积：Skill×模型×输入×反馈协同决定质量
- **框架/术语**：省时/省钱/赚钱三维度、雏形口述测试、五步法、三个转变、四步校准、效果系统乘积、经验老三样
- **项目对应**：`05-Engineering/Skill与Harness.md`（六条判断）、`01-Methods/项目机会筛选.md`、`skills/fde-opportunity-diagnosis/SKILL.md`
- **Gap**：🔧补强——项目六条偏工程视角，课程三维度偏业务价值；缺「效果归因四因子」诊断框架
- **吸收建议**：(1) 补「经验筛选视角」小节（三维度+频率信号）；(2) 在 `01-Methods/Eval与验收.md` 补「质量归因四因子」用于短板定位

### 5. 企业集成：CLI+MCP+Skills 打通系统（p39-56）

- **要点**：
  - 两大支柱：CLI 提供操作入口，Skills 封装可复用使用方式
  - CLI 封装 Skill 三步：识别核心命令→设计参数流程→固化调用规范
  - Skill 是能力三件套：命令调用+知识注入+工作流编排
  - 自动化四阶段核心：人不该当系统间手工接口
  - 演进：MCP 解决连接，CLI+Skills 解决分发
- **框架/术语**：CLI 封装三步法、能力三件套、AGENTS.md、自动化四阶段、MCP→CLI+Skills
- **项目对应**：`05-Engineering/Production-Agent参考架构.md`、`05-Engineering/Skill与Harness.md`、`06-Sources/来源登记.md`
- **Gap**：⚠️缺口——项目有 MCP 连接登记和七层架构，但缺「把平台 CLI 封装成 Skill」的具体路径和三件套打包视角，企业集成最后一公里空白
- **吸收建议**：在 `02-Playbooks` 新增「平台能力 Skill 化」playbook，写清三步法 + AGENTS.md + 三件套打包

### 6. Skill 工程规范与最佳实践（p57-68）

- **要点**：
  - Skill 是一组工作流资产（指令/脚本/素材/工具/模板），协作铁律：自然语言意图、脚本确定性、模型创造性
  - YAML 硬约束：name≤64 字符避保留词，description≤1024 字符说清干什么+何时用
  - 上下文做减法：剔除背景/历史/冗长/过期四类无价值信息
  - 参考文件一层直达禁套娃，超 100 行前置 Contents 目录
  - 自由度三档：高风险给护栏、报告给微调、审查给方向
  - 模型档位：沉淀用强模型，运行用普通模型控成本
- **框架/术语**：五类组件、协作铁律、YAML 硬约束、做减法四剔除、一层直达、自由度三档、模型档位策略
- **项目对应**：`05-Engineering/Skill与Harness.md`（确定性外移）、`skills/fde-*/SKILL.md`
- **Gap**：🔧补强——协作铁律已覆盖，但 name/description 硬约束、自由度三档、模型档位、引用规则均未显式化
- **吸收建议**：(1) 补「Skill 写作硬约束」可结合 `scripts/check-kb.mjs` 自动校验；(2) 补自由度三档对齐已有安全边界；(3) 补模型档位策略

### 7. 进阶模式：统一入口、范式库与可验证中间输出（p69-71）

- **要点**：
  - 统一入口+意图路由：一个 Skill 分发多个子模式，避免碎片化
  - Skill 内置规则约束（如安全词库合规自检），不止流程封装
  - 范式库三段式：定义+结构步骤+模板示例，沉淀创作手感
  - 高风险三段：计划-验证-执行，结构化中间产物作可校验可回滚载体
- **框架/术语**：统一入口路由、范式库三段式、计划-验证-执行、可验证中间输出
- **项目对应**：`02-Playbooks/从原型到生产.md`、`03-Templates/`
- **Gap**：🔧补强——重构门思路相通，但缺「结构化中间产物作计划载体」模式；统一入口路由项目暂无
- **吸收建议**：(1) 在从原型到生产补「可验证中间输出」模式；(2) 统一入口暂缓，Skill 数量增长到存在意图歧义时再考虑

### 8. 能力分层、评测、治理与生态（p72-83）

- **要点**：
  - 四层金字塔：工具→平台型→业务型→个性化，越上越贴业务
  - 看 Agent 真实轨迹五信号：意外路径/遗漏连接/反复读取/从未访问/触发不准
  - 个人 Skills 进私有 Git：版本/追溯/回滚/Diff/分支闭环
  - With vs Without 四维对照：质量/耗时/Token/稳定性
  - skill-optimizer 六维审查：触发/流程/资源/边界/依赖/README
  - 四层能力架构：风险控制→连接→协同增强→Skill 方法
- **框架/术语**：金字塔四层、轨迹五信号、Git 化五价值、With/Without 四维、evals 四要素、六维审查、四层架构、README vs SKILL
- **项目对应**：`00-Map/FDE能力地图与成长路线.md`、`05-Engineering/Skill与Harness.md`、`01-Methods/Eval与验收.md`、`skills/fde-*/evals/evals.json`、`skills/README.md`
- **Gap**：🔧补强——evals 已比课程更成熟，但缺「基于轨迹迭代」五信号、「skill-optimizer 元技能」六维审查、Skill 资产自身分层视角
- **吸收建议**：(1) 孵化第 4 个 Skill `fde-skill-health-check`（五信号+六维审查）；(2) 在 `skills/README.md` 补 With/Without 四维价值证明；(3) 在 `Skill与Harness.md` 补「Skill 能力分层」与八维地图互补

## 本课最值得吸收的点

1. **渐进式三层加载 + 上下文经济学**：项目 Skill 结构合格但缺设计哲学显式化。补「Skill 上下文经济学」一节（三层加载、description 路由、避免嵌套、长文件前置 Contents、YAML 硬约束），并用 `scripts/check-kb.mjs` 扩成自动校验项。
2. **基于 Agent 真实轨迹的 Skill 迭代 + 元优化技能**：从「结构合格」到「持续变好」的关键缺口。观察 Agent 从哪进、读哪些、跳过哪些（五信号），并孵化 `fde-skill-health-check` 元技能做六维审查。
3. **CLI/MCP 封装成 Skill 的操作路径 + 能力三件套**：补齐企业集成最后一公里。识别核心命令→设计参数流程→固化调用规范三步法，加命令+知识+编排三件套打包，落地为「平台能力 Skill 化」playbook。
4. **With/Without 四维价值量化 + 模型档位/成本调度**：项目 evals 偏交付验收，缺 Skill 级价值证明（质量/耗时/Token/稳定性 A/B 对照）与「沉淀强模型、运行普通模型」档位策略。
5. **自由度三档 + 可验证中间输出**：任务脆弱性驱动指令精度（高/中/低），加「计划-验证-执行 + 机器可校验中间产物（changes.json）」把不可逆变可逆，吸收进从原型到生产的高风险动作处理。

## 与项目资产的映射

| 课程章节 | 项目位置 | 关系 |
|---|---|---|
| 认知与定位 | `00-Map/FDE能力地图与成长路线.md` | ✅已覆盖 |
| Skills 本质与结构 | `05-Engineering/Skill与Harness.md` | ⚠️缺口 |
| 案例与自动化运行 | `01-Methods/复用飞轮.md`、`skills/fde-knowledge-ingest/` | 🔧补强 |
| 判断与方法论 | `05-Engineering/Skill与Harness.md`、`01-Methods/项目机会筛选.md` | 🔧补强 |
| 企业集成 CLI+MCP+Skills | `05-Engineering/Production-Agent参考架构.md` | ⚠️缺口 |
| 工程规范与最佳实践 | `05-Engineering/Skill与Harness.md`、`skills/fde-*/` | 🔧补强 |
| 进阶模式（统一入口/中间输出） | `02-Playbooks/从原型到生产.md`、`03-Templates/` | 🔧补强 |
| 能力分层/评测/治理 | `01-Methods/Eval与验收.md`、`skills/fde-*/evals/` | 🔧补强 |
