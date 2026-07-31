#!/usr/bin/env node

import {
  existsSync,
  lstatSync,
  readdirSync,
  readFileSync,
  statSync,
} from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const checkExternalLinks = process.argv.includes("--external");
const errors = [];
const warnings = [];
const stats = {
  externalLinks: 0,
  localLinks: 0,
  markdownFiles: 0,
  evalScenarios: 0,
};

const ignoredDirectories = new Set([".git", "node_modules", ".cache"]);
const textExtensions = new Set([
  "",
  ".gitignore",
  ".json",
  ".jsonl",
  ".js",
  ".md",
  ".mjs",
  ".txt",
  ".yaml",
  ".yml",
]);

function toRepoPath(path) {
  return relative(root, path).split("\\").join("/");
}

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) return [];
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function readText(file) {
  return readFileSync(file, "utf8");
}

function addError(message) {
  errors.push(message);
}

function addWarning(message) {
  warnings.push(message);
}

const requiredDirectories = [
  "00-Map",
  "01-Methods",
  "02-Playbooks",
  "03-Templates",
  "04-Cases",
  "05-Engineering",
  "06-Sources",
  "07-Portfolio",
  "skills",
  "scripts",
];

const requiredFiles = [
  "README.md",
  "LICENSE",
  "NOTICE.md",
  "04-Cases/启衡课程沙盒报销预审PoC.md",
  "04-Cases/HIS客户问题诊断Agent.md",
  "07-Portfolio/公开发布说明.md",
  ".github/workflows/validate.yml",
];

for (const directory of requiredDirectories) {
  if (!existsSync(join(root, directory))) {
    addError(`缺少目录：${directory}`);
  }
}

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) {
    addError(`缺少文件：${file}`);
  }
}

const files = walk(root);
const markdownFiles = files.filter((file) => extname(file) === ".md");
stats.markdownFiles = markdownFiles.length;

for (const file of files) {
  if (lstatSync(file).isSymbolicLink()) {
    addError(`公开目录不允许符号链接：${toRepoPath(file)}`);
  }
  if (statSync(file).size === 0) {
    addError(`空文件：${toRepoPath(file)}`);
  }
}

const sensitivePatterns = [
  { label: "macOS 本地绝对路径", regex: /\/Users\/[^\s)"'`<>]+/g },
  { label: "Linux 用户绝对路径", regex: /\/home\/[^\s)"'`<>]+/g },
  { label: "Windows 用户绝对路径", regex: /[A-Za-z]:\\Users\\[^\s)"'`<>]+/g },
  {
    label: "真实姓名",
    regex: new RegExp(
      [
        ["乔", "瑞", "琪"].join(""),
        ["周", "晓"].join(""),
        ["张", "蕴"].join(""),
        ["范", "志", "明"].join(""),
      ].join("|"),
      "g",
    ),
  },
  {
    label: "受限课程或内部材料标识",
    regex: new RegExp(
      [
        ["观", "猹"].join(""),
        ["猹", "馆"].join(""),
        ["watcha", "\\.cn"].join(""),
        ["qiheng", "-env"].join(""),
      ].join("|"),
      "gi",
    ),
  },
  { label: "旧作者标识", regex: /author:\s*qrq\b/gi },
  { label: "电子邮箱", regex: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi },
  { label: "OpenAI 风格密钥", regex: /\bsk-[A-Za-z0-9_-]{16,}\b/g },
  { label: "AWS Access Key", regex: /\bAKIA[0-9A-Z]{16}\b/g },
  { label: "私钥", regex: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g },
  { label: "JWT", regex: /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/g },
  {
    label: "疑似明文凭据",
    regex:
      /\b(?:api[_-]?key|access[_-]?token|secret|password)\s*[:=]\s*["'][^"'${}<>\s]{8,}["']/gi,
  },
];

for (const file of files) {
  const extension = extname(file) || (file.endsWith(".gitignore") ? ".gitignore" : "");
  if (!textExtensions.has(extension)) continue;

  const content = readText(file);
  for (const { label, regex } of sensitivePatterns) {
    regex.lastIndex = 0;
    for (const match of content.matchAll(regex)) {
      const line = content.slice(0, match.index).split("\n").length;
      addError(`${label}：${toRepoPath(file)}:${line}`);
    }
  }
}

function normalizeMarkdownTarget(rawTarget) {
  let target = rawTarget.trim();
  if (target.startsWith("<") && target.endsWith(">")) {
    target = target.slice(1, -1);
  }
  const titleSeparator = target.search(/\s+["']/);
  if (titleSeparator >= 0) target = target.slice(0, titleSeparator);
  return target;
}

const externalUrls = new Set();

for (const file of markdownFiles) {
  const content = readText(file);
  const relativePath = toRepoPath(file);
  const isReference = relativePath.includes("/references/");

  if (!isReference && !content.startsWith("---\n")) {
    addError(`缺少 YAML frontmatter：${relativePath}`);
  }

  for (const match of content.matchAll(/\[\[[^\]]+\]\]/g)) {
    const line = content.slice(0, match.index).split("\n").length;
    addError(`GitHub 不支持的双链：${relativePath}:${line} → ${match[0]}`);
  }

  for (const match of content.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = normalizeMarkdownTarget(match[1]);
    if (!target || target.startsWith("#")) continue;

    if (/^https?:\/\//i.test(target)) {
      externalUrls.add(target);
      continue;
    }
    if (/^(mailto:|tel:|data:)/i.test(target)) continue;

    if (
      target.startsWith("/") ||
      /^[A-Za-z]:[\\/]/.test(target) ||
      target.startsWith("~")
    ) {
      addError(`Markdown 使用绝对路径：${relativePath} → ${target}`);
      continue;
    }

    let pathPart = target.split("#")[0].split("?")[0];
    try {
      pathPart = decodeURIComponent(pathPart);
    } catch {
      addError(`Markdown 链接编码无效：${relativePath} → ${target}`);
      continue;
    }

    if (!pathPart) continue;
    stats.localLinks += 1;
    const resolvedTarget = resolve(dirname(file), pathPart);
    if (!resolvedTarget.startsWith(`${root}/`) && resolvedTarget !== root) {
      addError(`Markdown 链接越出仓库：${relativePath} → ${target}`);
    } else if (!existsSync(resolvedTarget)) {
      addError(`Markdown 本地链接不存在：${relativePath} → ${target}`);
    }
  }
}

stats.externalLinks = externalUrls.size;

const sourceRegisterPath = join(root, "06-Sources", "来源登记.md");
if (existsSync(sourceRegisterPath)) {
  const sourceRegister = readText(sourceRegisterPath);
  for (const file of markdownFiles) {
    const content = readText(file);
    const match = content.match(/^sources:\s*\[([^\]]*)\]/m);
    if (!match) continue;
    const ids = match[1]
      .split(",")
      .map((id) => id.trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean);
    for (const id of ids) {
      if (!sourceRegister.includes(`| ${id} |`)) {
        addError(`来源 ID 未登记：${toRepoPath(file)} → ${id}`);
      }
    }
  }
}

const qihengFiles = files.filter((file) => {
  if (!textExtensions.has(extname(file))) return false;
  return readText(file).includes("启衡");
});

for (const file of qihengFiles) {
  const content = readText(file);
  if (!content.includes("FDE 课程沙盒 PoC") || !content.includes("合成数据")) {
    addError(`启衡口径不完整：${toRepoPath(file)}`);
  }
}

const hisFiles = files.filter((file) => {
  if (!textExtensions.has(extname(file))) return false;
  return /\bHIS\b/.test(readText(file));
});

for (const file of hisFiles) {
  const content = readText(file);
  if (!content.includes("project-candidate / discovery-needed")) {
    addError(`HIS 口径不完整：${toRepoPath(file)}`);
  }
}

const qihengCase = join(root, "04-Cases", "启衡课程沙盒报销预审PoC.md");
if (existsSync(qihengCase)) {
  const content = readText(qihengCase);
  if (!/^type:\s*synthetic-case$/m.test(content)) {
    addError("启衡案例必须声明 type: synthetic-case");
  }
  if (!/^status:\s*sandbox-poc$/m.test(content)) {
    addError("启衡案例必须声明 status: sandbox-poc");
  }
}

const hisCase = join(root, "04-Cases", "HIS客户问题诊断Agent.md");
if (existsSync(hisCase)) {
  const content = readText(hisCase);
  if (!/^type:\s*project-candidate$/m.test(content)) {
    addError("HIS 候选必须声明 type: project-candidate");
  }
  if (!/^status:\s*discovery-needed$/m.test(content)) {
    addError("HIS 候选必须声明 status: discovery-needed");
  }
}

const requiredSkills = new Set([
  "fde-eval-acceptance",
  "fde-knowledge-ingest",
  "fde-opportunity-diagnosis",
]);
const skillRoot = join(root, "skills");
const skillDirectories = existsSync(skillRoot)
  ? readdirSync(skillRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
  : [];

for (const skill of requiredSkills) {
  if (!skillDirectories.includes(skill)) addError(`缺少 Skill：${skill}`);
}

if (skillDirectories.length !== 3) {
  addError(`公开资产口径要求正好 3 个 Skill，实际为 ${skillDirectories.length} 个`);
}

for (const skill of skillDirectories) {
  const skillFile = join(skillRoot, skill, "SKILL.md");
  const evalFile = join(skillRoot, skill, "evals", "evals.json");

  if (!existsSync(skillFile)) {
    addError(`Skill 缺少 SKILL.md：${skill}`);
    continue;
  }

  const content = readText(skillFile);
  for (const field of ["name", "description", "license", "compatibility"]) {
    if (!new RegExp(`^${field}:\\s*.+$`, "m").test(content)) {
      addError(`Skill 元数据缺少 ${field}：${skill}`);
    }
  }
  if (!new RegExp(`^name:\\s*${skill}$`, "m").test(content)) {
    addError(`Skill name 与目录不一致：${skill}`);
  }

  for (const match of content.matchAll(/`(references\/[^`]+)`/g)) {
    const referencePath = join(skillRoot, skill, match[1]);
    if (!existsSync(referencePath)) {
      addError(`Skill 引用文件不存在：${skill}/${match[1]}`);
    }
  }

  if (!existsSync(evalFile)) {
    addError(`Skill 缺少 evals/evals.json：${skill}`);
    continue;
  }

  try {
    const parsed = JSON.parse(readText(evalFile));
    if (parsed.skill_name !== skill) {
      addError(`Skill 测试名称不一致：${skill}`);
    }
    if (!Array.isArray(parsed.evals) || parsed.evals.length < 2) {
      addError(`Skill 测试场景不足：${skill}`);
    } else {
      stats.evalScenarios += parsed.evals.length;
      const ids = new Set();
      for (const scenario of parsed.evals) {
        if (ids.has(scenario.id)) addError(`Skill eval ID 重复：${skill} → ${scenario.id}`);
        ids.add(scenario.id);
        if (!scenario.prompt || !scenario.expected_output) {
          addError(`Skill eval 内容不完整：${skill} → ${scenario.id}`);
        }
        if (!Array.isArray(scenario.expectations) || scenario.expectations.length < 2) {
          addError(`Skill eval expectations 不足：${skill} → ${scenario.id}`);
        }
      }
    }
  } catch (error) {
    addError(`Skill 测试 JSON 无效：${skill}（${error.message}）`);
  }
}

const expectedAssetCounts = [
  ["01-Methods", 6],
  ["02-Playbooks", 4],
  ["03-Templates", 7],
];

for (const [directory, expected] of expectedAssetCounts) {
  const actual = readdirSync(join(root, directory), { withFileTypes: true }).filter((entry) =>
    entry.isFile(),
  ).length;
  if (actual !== expected) {
    addError(`公开资产数量与简历口径不一致：${directory} 期望 ${expected}，实际 ${actual}`);
  }
}

if (stats.evalScenarios !== 9) {
  addError(`公开资产口径要求 9 条 eval 场景，实际为 ${stats.evalScenarios} 条`);
}

async function validateExternalUrls() {
  const urls = [...externalUrls].sort();
  const concurrency = 4;
  let index = 0;

  async function worker() {
    while (index < urls.length) {
      const url = urls[index++];
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15_000);

      try {
        const response = await fetch(url, {
          method: "GET",
          redirect: "follow",
          signal: controller.signal,
          headers: {
            Accept: "text/html,application/json;q=0.9,*/*;q=0.8",
            Range: "bytes=0-0",
            "User-Agent": "fde-delivery-os-link-check/1.0",
          },
        });
        await response.body?.cancel();

        if (response.status === 404 || response.status === 410) {
          addError(`外部链接失效（${response.status}）：${url}`);
        } else if (response.status === 403 || response.status === 429) {
          addWarning(`外部站点限制自动检查（${response.status}）：${url}`);
        } else if (!response.ok) {
          addWarning(`外部链接返回 ${response.status}：${url}`);
        }
      } catch (error) {
        addWarning(`外部链接无法自动确认：${url}（${error.message}）`);
      } finally {
        clearTimeout(timeout);
      }
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, urls.length) }, () => worker()));
}

if (checkExternalLinks) {
  await validateExternalUrls();
}

if (warnings.length > 0) {
  console.warn(`FDE Delivery OS 校验警告（${warnings.length} 项）：`);
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (errors.length > 0) {
  console.error(`FDE Delivery OS 校验失败（${errors.length} 项）：`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

const externalSummary = checkExternalLinks
  ? `，已尝试核验 ${stats.externalLinks} 个外部链接`
  : `，发现 ${stats.externalLinks} 个外部链接（使用 --external 联网核验）`;

console.log(
  `FDE Delivery OS 校验通过：${stats.markdownFiles} 个 Markdown 文件，${stats.localLinks} 个本地链接，3 个 Skills，${stats.evalScenarios} 条 eval 场景${externalSummary}。`,
);
