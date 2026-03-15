---
title: CLIリファレンス
description: jamjetコマンドラインインターフェースの完全なリファレンスです。
sidebar:
  order: 8
---

# CLIリファレンス

`jamjet` CLIは、プロジェクト管理、ワークフロー実行、実行結果の検査を行うための主要なインターフェースです。

## インストール

```bash
pip install jamjet
jamjet --version

# JamJet CLI 0.1.0

```

## グローバルフラグ

| フラグ | 説明 |
|------|-------------|
| `--runtime URL` | ランタイムURL(デフォルト: `http://localhost:7700`) |
| `--api-key KEY` | ホスト型ランタイム用のAPIキー |
| `--output json` | JSON形式で出力(スクリプト用) |
| `-v, --verbose` | 詳細な出力 |

## `jamjet init`

新規プロジェクトを作成するか、既存プロジェクトにJamJetを追加します。

```bash

# 新しいディレクトリに新規プロジェクトを作成

jamjet init my-agent
cd my-agent

# 現在のディレクトリに追加(git initのように)

jamjet init
```

以下を作成:
- `workflow.yaml` — スターターワークフローテンプレート
- `jamjet.toml` — プロジェクト設定
- `README.md` — プロジェクトreadme

## `jamjet dev`

ローカル開発ランタイムを起動します。

```bash
jamjet dev
```

```
▶ JamJet Dev Runtime
  Port:  7700
  Mode:  local (SQLite)
  API:   http://localhost:7700

Ctrl+Cで停止します。
```

| フラグ | 説明 |
|------|-------------|
| `--port N` | ポートN で待ち受け(デフォルト: 7700) |
| `--db PATH` | SQLiteファイルパス(デフォルト: `.jamjet/dev.db`) |
| `--with-mcp-server` | MCPサーバーも起動 |
| `--with-a2a-server` | A2Aエージェントサーバーも起動 |
| `--reload` | ワークフローファイル変更時に自動リロード |

## `jamjet validate`

ワークフローファイルを実行せずに検証します。

```bash
jamjet validate workflow.yaml
```

```
Valid. workflow_id=hello-agent version=0.1.0
  Nodes: 4  Edges: 3
```

## `jamjet run`

ワークフロー実行をサブミットし、結果を待ちます。

```bash
jamjet run workflow.yaml --input '{"query": "What is JamJet?"}'
```

```
✓ Execution started: exec_01JM4X8NKWP2
  Status: running
✓ node_completed   think   claude-haiku  512ms
✓ Execution completed.
```

| フラグ | 説明 |
|------|-------------|
| `--input JSON` | 初期状態をJSONで指定 |
| `--input-file PATH` | 初期状態をJSONファイルから読み込み |
| `--stream` | リアルタイムでイベントをストリーミング |
| `--wait / --no-wait` | 完了を待機(デフォルト: wait) |
| `--timeout N` | タイムアウト秒数(デフォルト: 300) |

`--stream`を使用した場合:

```bash
jamjet run workflow.yaml --input '{"query": "Explain event sourcing"}' --stream
```

```
✓ exec_01JM5Y9... started
 → node_started    think
✓ node_completed   think   claude-haiku  489ms  (64→312 tokens)
✓ Stream complete
```

## `jamjet inspect`

実行の完全な状態とイベントタイムラインを表示します。

```bash
jamjet inspect exec_01JM4X8NKWP2
```

```
Execution: exec_01JM4X8NKWP2
  Workflow: hello-agent v0.1.0
  Status:   completed
  Duration: 512ms

State:
  query:  "What is JamJet?"
  answer: "JamJet is an agent-native runtime..."

Events:
  09:31:00.001  execution_started
  09:31:00.012  node_started      think
  09:31:00.524  node_completed    think    claude-haiku (64 in / 312 out tokens)
  09:31:00.525  execution_completed

Token usage:
  Input:  64
  Output: 312
  Cost:   ~$0.00012
```

## `jamjet ls`

最近の実行を一覧表示します。

```bash
jamjet ls
```

```
ID                        Workflow         Status      Duration  Started
exec_01JM5Y9NKWP3        research-agent   completed   2.1s      2m ago
exec_01JM4X8NKWP2        hello-agent      completed   512ms     5m ago
exec_01JM3W7MKVM1        research-agent   failed      8.3s      12m ago
```

| フラグ | 説明 |
|------|-------------|
| `--workflow ID` | ワークフローIDでフィルタ |
| `--status STATUS` | ステータスでフィルタ（running、completed、failed） |
| `--limit N` | N件の結果を表示（デフォルト：20） |

## `jamjet resume`

待機中または失敗した実行を再開します。

```bash

# 待機中の実行を再開（例：人間の承認後）

jamjet resume exec_01JM4X8NKWP2 --event human_approved --data '{"approved": true}'

# 最後のチェックポイントから失敗した実行を再試行

jamjet resume exec_01JM3W7MKVM1 --retry
```

## `jamjet cancel`

実行中の実行をキャンセルします。

```bash
jamjet cancel exec_01JM4X8NKWP2
```

## `jamjet tools`

MCPツールサーバーを検査およびテストします。

```bash

# 利用可能なすべてのツールを一覧表示

jamjet tools list

# ツールを直接呼び出し（テスト用）

jamjet tools call brave-search web_search --args '{"query": "JamJet"}'
```

## `jamjet agents`

A2Aエージェントカードを検査します。

```bash

# リモートエージェントを検査

jamjet agents inspect https://agents.example.com/research-agent

# ローカルで公開されているエージェントを一覧表示

jamjet agents list
```

## `jamjet eval run`

評価データセットをワークフローに対して実行します。

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

| フラグ | 説明 |
|------|-------------|
| `--workflow PATH` | 実行するワークフローファイル |
| `--rubric TEXT` | LLM評価の評価基準 |
| `--model MODEL` | LLM評価に使用するモデル(デフォルト: claude-haiku-4-5-20251001) |
| `--min-score N` | 最小スコア 1–5(デフォルト: 4) |
| `--assert EXPR` | Pythonアサーション(繰り返し可) |
| `--latency-ms N` | 最大レイテンシ閾値 |
| `--cost-usd N` | 行あたりの最大コスト |
| `--concurrency N` | 並列実行する行数(デフォルト: 5) |
| `--fail-below N` | 合格率がN未満の場合、終了コード1で終了(デフォルト: 1.0) |
| `--output PATH` | 結果のJSONをファイルに書き出す |
