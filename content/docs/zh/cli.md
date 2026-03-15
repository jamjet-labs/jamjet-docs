---
title: CLI 参考
description: jamjet 命令行界面的完整参考。
sidebar:
  order: 8
---

# CLI 参考手册

`jamjet` CLI 是管理项目、运行工作流和检查执行过程的主要接口。

## 安装

```bash
pip install jamjet
jamjet --version

# JamJet CLI 0.1.0

```

## 全局标志

| 标志 | 说明 |
|------|-------------|
| `--runtime URL` | 运行时 URL(默认:`http://localhost:7700`) |
| `--api-key KEY` | 托管运行时的 API 密钥 |
| `--output json` | 以 JSON 格式输出(用于脚本) |
| `-v, --verbose` | 详细输出 |

## `jamjet init`

搭建新项目或将 JamJet 添加到现有项目。

```bash

# 在新目录中创建新项目

jamjet init my-agent
cd my-agent

# 添加到当前目录(类似 git init)

jamjet init
```

创建:
- `workflow.yaml` — 入门工作流模板
- `jamjet.toml` — 项目配置
- `README.md` — 项目说明文档

## `jamjet dev`

启动本地开发运行时。

```bash
jamjet dev
```

```
▶ JamJet Dev Runtime
  Port:  7700
  Mode:  local (SQLite)
  API:   http://localhost:7700

按 Ctrl+C 停止。
```

| 标志 | 说明 |
|------|-------------|
| `--port N` | 在端口 N 上监听(默认:7700) |
| `--db PATH` | SQLite 文件路径(默认:`.jamjet/dev.db`) |
| `--with-mcp-server` | 同时启动 MCP 服务器 |
| `--with-a2a-server` | 同时启动 A2A 代理服务器 |
| `--reload` | 工作流文件变更时自动重载 |

## `jamjet validate`

验证工作流文件,不运行它。

```bash
jamjet validate workflow.yaml
```

```
有效。workflow_id=hello-agent version=0.1.0
  节点:4  边:3
```

## `jamjet run`

提交工作流执行并等待结果。

```bash
jamjet run workflow.yaml --input '{"query": "What is JamJet?"}'
```

```
✓ 执行已启动:exec_01JM4X8NKWP2
  状态:运行中
✓ node_completed   think   claude-haiku  512ms
✓ 执行已完成。
```

| 标志 | 说明 |
|------|-------------|
| `--input JSON` | 初始状态,JSON 格式 |
| `--input-file PATH` | 从 JSON 文件读取初始状态 |
| `--stream` | 实时流式传输事件 |
| `--wait / --no-wait` | 等待完成(默认:等待) |
| `--timeout N` | 超时时间(秒)(默认:300) |

使用 `--stream`:

```bash
jamjet run workflow.yaml --input '{"query": "Explain event sourcing"}' --stream
```

```
✓ exec_01JM5Y9... 已启动
 → node_started    think
✓ node_completed   think   claude-haiku  489ms  (64→312 tokens)
✓ 流式传输完成
```

## `jamjet inspect`

查看执行的完整状态和事件时间线。

```bash
jamjet inspect exec_01JM4X8NKWP2
```

```
执行：exec_01JM4X8NKWP2
  工作流：hello-agent v0.1.0
  状态：  已完成
  耗时：  512ms

状态：
  query:  "什么是 JamJet？"
  answer: "JamJet 是一个原生智能体运行时..."

事件：
  09:31:00.001  execution_started
  09:31:00.012  node_started      think
  09:31:00.524  node_completed    think    claude-haiku（64 输入 / 312 输出 tokens）
  09:31:00.525  execution_completed

Token 用量：
  输入：  64
  输出：  312
  成本：  约 $0.00012
```

## `jamjet ls`

列出最近的执行记录。

```bash
jamjet ls
```

```
ID                        工作流          状态        耗时      开始时间
exec_01JM5Y9NKWP3        research-agent   已完成      2.1s      2分钟前
exec_01JM4X8NKWP2        hello-agent      已完成      512ms     5分钟前
exec_01JM3W7MKVM1        research-agent   失败        8.3s      12分钟前
```

| 标志 | 说明 |
|------|-------------|
| `--workflow ID` | 按工作流 ID 筛选 |
| `--status STATUS` | 按状态筛选（running、completed、failed）|
| `--limit N` | 显示 N 条结果（默认：20）|

## `jamjet resume`

恢复等待中或失败的执行。

```bash

# 恢复等待中的执行（例如，在人工批准后）

jamjet resume exec_01JM4X8NKWP2 --event human_approved --data '{"approved": true}'

# 从最后检查点重试失败的执行

jamjet resume exec_01JM3W7MKVM1 --retry
```

## `jamjet cancel`

取消正在运行的执行。

```bash
jamjet cancel exec_01JM4X8NKWP2
```

## `jamjet tools`

检查和测试 MCP 工具服务器。

```bash

# 列出所有可用工具

jamjet tools list

# 直接调用工具（用于测试）

jamjet tools call brave-search web_search --args '{"query": "JamJet"}'

## `jamjet agents`

检查 A2A 智能体卡片。

```bash

# 检查远程智能体

jamjet agents inspect https://agents.example.com/research-agent

# 列出本地暴露的智能体

jamjet agents list
```

## `jamjet eval run`

对工作流运行评估数据集。

```bash
jamjet eval run dataset.jsonl \
  --workflow workflow.yaml \
  --rubric "Is the answer accurate and complete?" \
  --min-score 4 \
  --assert "len(output.answer) > 0" \
  --fail-below 0.9
```

```
Running 50 eval rows... ████████████████████ 50/50

┌─────────┬────────────┬───────┬──────────┬────────────────────┐
│ Row     │ Status     │ Score │ Latency  │ Note               │
├─────────┼────────────┼───────┼──────────┼────────────────────┤
│ row_001 │ ✓ passed   │ 4.8   │  512ms   │                    │
│ row_002 │ ✗ failed   │ 2.1   │  891ms   │ Answer too vague   │
│ ...     │ ...        │ ...   │ ...      │ ...                │
└─────────┴────────────┴───────┴──────────┴────────────────────┘

Results: 47/50 passed (94.0%) — above threshold 90.0% ✓
```

| 选项 | 说明 |
|------|-------------|
| `--workflow PATH` | 要运行的工作流文件 |
| `--rubric TEXT` | LLM 评判标准 |
| `--model MODEL` | LLM 评判使用的模型(默认:claude-haiku-4-5-20251001) |
| `--min-score N` | 最低分数 1–5(默认:4) |
| `--assert EXPR` | Python 断言(可重复) |
| `--latency-ms N` | 最大延迟阈值 |
| `--cost-usd N` | 每行最大成本 |
| `--concurrency N` | 并行行数(默认:5) |
| `--fail-below N` | 通过率低于 N 时退出码为 1(默认:1.0) |
| `--output PATH` | 将结果 JSON 写入文件 |
