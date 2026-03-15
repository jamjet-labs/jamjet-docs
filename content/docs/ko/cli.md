---
title: CLI 레퍼런스
description: jamjet 커맨드라인 인터페이스의 전체 레퍼런스입니다.
sidebar:
  order: 8
---

# CLI 레퍼런스

`jamjet` CLI는 프로젝트 관리, 워크플로우 실행, 실행 검사를 위한 주요 인터페이스입니다.

## 설치

```bash
pip install jamjet
jamjet --version

# JamJet CLI 0.1.0

```

## 전역 플래그

| 플래그 | 설명 |
|------|-------------|
| `--runtime URL` | 런타임 URL (기본값: `http://localhost:7700`) |
| `--api-key KEY` | 호스팅된 런타임용 API 키 |
| `--output json` | JSON으로 출력 (스크립팅용) |
| `-v, --verbose` | 상세 출력 |

## `jamjet init`

새 프로젝트를 스캐폴드하거나 기존 프로젝트에 JamJet을 추가합니다.

```bash

# 새 디렉토리에 새 프로젝트 생성

jamjet init my-agent
cd my-agent

# 현재 디렉토리에 추가 (git init처럼)

jamjet init
```

생성되는 파일:
- `workflow.yaml` — 스타터 워크플로우 템플릿
- `jamjet.toml` — 프로젝트 설정
- `README.md` — 프로젝트 readme

## `jamjet dev`

로컬 개발 런타임을 시작합니다.

```bash
jamjet dev
```

```
▶ JamJet Dev Runtime
  Port:  7700
  Mode:  local (SQLite)
  API:   http://localhost:7700

Ctrl+C를 눌러 종료하세요.
```

| 플래그 | 설명 |
|------|-------------|
| `--port N` | N번 포트에서 수신 (기본값: 7700) |
| `--db PATH` | SQLite 파일 경로 (기본값: `.jamjet/dev.db`) |
| `--with-mcp-server` | MCP 서버도 함께 시작 |
| `--with-a2a-server` | A2A 에이전트 서버도 함께 시작 |
| `--reload` | 워크플로우 파일 변경 시 자동 재로드 |

## `jamjet validate`

워크플로우 파일을 실행하지 않고 검증합니다.

```bash
jamjet validate workflow.yaml
```

```
Valid. workflow_id=hello-agent version=0.1.0
  Nodes: 4  Edges: 3
```

## `jamjet run`

워크플로우 실행을 제출하고 결과를 기다립니다.

```bash
jamjet run workflow.yaml --input '{"query": "What is JamJet?"}'
```

```
✓ Execution started: exec_01JM4X8NKWP2
  Status: running
✓ node_completed   think   claude-haiku  512ms
✓ Execution completed.
```

| 플래그 | 설명 |
|------|-------------|
| `--input JSON` | JSON 형식의 초기 상태 |
| `--input-file PATH` | JSON 파일에서 초기 상태 읽기 |
| `--stream` | 이벤트를 실시간으로 스트리밍 |
| `--wait / --no-wait` | 완료 대기 (기본값: wait) |
| `--timeout N` | 타임아웃(초) (기본값: 300) |

`--stream` 사용 시:

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

실행의 전체 상태와 이벤트 타임라인을 확인합니다.

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

최근 실행 목록을 표시합니다.

```bash
jamjet ls
```

```
ID                        Workflow         Status      Duration  Started
exec_01JM5Y9NKWP3        research-agent   completed   2.1s      2m ago
exec_01JM4X8NKWP2        hello-agent      completed   512ms     5m ago
exec_01JM3W7MKVM1        research-agent   failed      8.3s      12m ago
```

| Flag | Description |
|------|-------------|
| `--workflow ID` | 워크플로우 ID로 필터링 |
| `--status STATUS` | 상태로 필터링 (running, completed, failed) |
| `--limit N` | N개 결과 표시 (기본값: 20) |

## `jamjet resume`

대기 중이거나 실패한 실행을 재개합니다.

```bash

# 대기 중인 실행 재개 (예: 사람의 승인 후)

jamjet resume exec_01JM4X8NKWP2 --event human_approved --data '{"approved": true}'

# 마지막 체크포인트에서 실패한 실행 재시도

jamjet resume exec_01JM3W7MKVM1 --retry
```

## `jamjet cancel`

실행 중인 실행을 취소합니다.

```bash
jamjet cancel exec_01JM4X8NKWP2
```

## `jamjet tools`

MCP 도구 서버를 검사하고 테스트합니다.

```bash

# 사용 가능한 모든 도구 나열

jamjet tools list

# 도구 직접 호출 (테스트용)

jamjet tools call brave-search web_search --args '{"query": "JamJet"}'
```

## `jamjet agents`

A2A 에이전트 카드를 검사합니다.

```bash

# 원격 에이전트 검사

jamjet agents inspect https://agents.example.com/research-agent

# 로컬로 노출된 에이전트 목록

jamjet agents list
```

## `jamjet eval run`

워크플로에 대해 평가 데이터셋을 실행합니다.

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

| Flag | Description |
|------|-------------|
| `--workflow PATH` | 실행할 워크플로 파일 |
| `--rubric TEXT` | LLM 평가 기준 |
| `--model MODEL` | LLM 평가에 사용할 모델 (기본값: claude-haiku-4-5-20251001) |
| `--min-score N` | 최소 점수 1–5 (기본값: 4) |
| `--assert EXPR` | Python 어서션 (반복 가능) |
| `--latency-ms N` | 최대 지연 시간 임계값 |
| `--cost-usd N` | 행당 최대 비용 |
| `--concurrency N` | 병렬 실행 행 수 (기본값: 5) |
| `--fail-below N` | 통과율이 N 미만이면 종료 코드 1 반환 (기본값: 1.0) |
| `--output PATH` | 결과 JSON을 파일로 저장 |
