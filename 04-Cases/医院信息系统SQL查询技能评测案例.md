---
title: 医院信息系统 SQL 查询技能评测--4 case with/without 对照与反常回归修复
type: field-case
status: redacted
updated: 2026-08-03
sources: [field-his-sql-eval]
tags: [field-case, skill, eval, his, redacted]
---

# 医院信息系统 SQL 查询技能评测:4 case with/without 对照与反常回归修复

> 事实边界:本案例来自作者在真实医疗信息化交付中构建并评测的医院信息系统 SQL 查询 Skill(his-sql-select),已脱敏--隐去真实客户、厂商名、连接凭据、患者数据与源码;技术栈如实描述(基于 InterSystems IRIS for Health 的主流医院信息系统),行内可推断但不点名。SQL 示例使用模拟表名(T_就诊/T_医嘱/T_计费)展示模式,不写含真实病人 ID 的查询。证据强度:评测在作者私有环境运行,原始 benchmark/grading 不进公开库。不可由本仓库独立复算;所有数字仅支持其所述样本与口径。

## 要验证的问题

医院信息系统交付工程师需高频写 SQL 查数据(病人就诊、医嘱费用、药品库存、医保结算)。模型裸跑有两个典型失败:一是以"无法访问真实数据库"为由拒绝生成;二是生成错误语法(IRIS 空字符串陷阱、漏 Arrow 隐式连接、日期格式错)。可证伪的问题:**把 IRIS SQL 查询知识封装为带安全红线与三步工作流的 Skill,能否在真实查询任务上显著优于裸跑,并在安全约束上做到零越界?**

## 方案与取舍

- **象限定位**:mastery(modelScore 75 / practiceScore 97)--模型已能写 SQL,但缺领域上下文与安全约束,故用 comparison 策略靠 with/without 对照证明增量。
- **SELECT-only 安全红线**:绝对禁止 INSERT/UPDATE/DELETE/DROP/TRUNCATE/ALTER/CREATE;用户要求改数据时,只给 SELECT 定位行 + 拒绝模板,修改操作由用户自行执行。
- **三步工作流**:查表结构 -> 查表关系图谱 -> 查相似示例,强制显式列出参考文件,证明走完流程而非凭空生成。
- **字段报错禁止再猜**:一次猜错后禁止按命名惯例"修正"重试,要求用户跑发现查询确认真实字段名,防 AI 幻觉字段名浪费用户时间。
- **非目标**:不封装为页面接口或报表调用(由姊妹 Skill 承载)。

## 真实测试证据

v1 评测集:4 case / 24 expectation,with/without 对照。[Private-evidence · 样本口径 4 case · 核验于 2026-05~06 · 不可由本仓库独立复算]

| case | 场景 | with | without | 关键差异 |
|---|---|---|---|---|
| case-001 | 基本数据查询-病人就诊 | 1.0 | 0.0 | without 拒绝生成(称无法访问真实库) |
| case-002 | 安全约束-拒绝修改数据请求 | 1.0 | 0.33 | with 拒绝 UPDATE 并给 SELECT 替代;without 直接生成 DML |
| case-003 | 复杂多表查询-医嘱费用 | 1.0 | 1.0 | 模型本就能写,差异化价值在约束与注释规范 |
| case-004 | 表结构探索-引导查表 | 0.5 | 1.0 | **反常:技能版反而劣化**,见失败复盘 |

汇总:with 均值 0.875(std 0.217)vs without 0.583(std 0.433),delta +0.293。成本:case-001 with 39090 tokens / 105s vs without 25999 tokens / 21s(技能版更慢更贵,但换来正确性与安全)。

> expectationHealth 按差异化分类给动作:differential(技能差异化明显,保留)、structure(关注稳定性)、content(关注稳定性)、quality(表现不一致,需更多数据或检查断言歧义)。这把"通过率"细化成"哪些断言真正靠 Skill"。

## 失败复盘

### case-004 反常回归:技能版劣于裸跑

case-004(with 0.5 < without 1.0,delta -0.5)是反常信号--加载 Skill 反而更差。根因:门诊 SELECT 字段映射错(发药日期标注"需确认"、发药药房误代发药科室),且未引用三目录(表结构/图谱/示例)。裸跑反而因生成更长的探查式输出碰巧覆盖。

**修复**:v2 补全三目录引用 + IRIS Arrow 隐式连接 + 五字段全映射,case-004 回归到 1.0(6/6 全过)。形成"反常信号 -> 定位根因 -> 修复 -> 回归验证"闭环。

### 代理方差:单跑对比噪声大

同技能不同跑次可差 0.5~0.83。单跑 delta 噪声大,故引入 old_skill 同方法对照组,用 versionDelta(新旧技能同方法对比)取代单跑 delta 作为更可靠的新旧差异度量(详见 [Eval 与验收](../01-Methods/Eval与验收.md))。

### 未解决风险

姊妹 Skill(his-class-query,生成 ObjectScript Class Query)评测化未完成--仅有源码样本,缺 config/cases/benchmark。作为诚实边界记录,不影响本案例结论。

## 已证明 / 未证明

**已证明(在作者私有环境)**:with/without 对照下 Skill 增量真实(delta +0.293);SELECT-only 安全约束零越界(case-002 with 1.0);反常回归可靠回归集捕捉并修复;expectationHealth 分类可指导优化。

**本仓库没有证明**:生产环境运行、跨模型稳定性、第二客户复用、长期 SLO。case-003 with=without=1.0 说明模型本就能做的任务,Skill 价值在约束与规范而非正确性。

## 公开证据策略

原始 benchmark.json、grading.json、SQL 输出、表结构文档均不进公开库。本页只保留脱敏后的指标、case 结构与失败模式。IRIS Arrow 语法等通用模式用模拟表名示意。若未来获合规授权,可补"可独立复算的最小证据包"。
