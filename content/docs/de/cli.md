---
title: CLI-Referenz
description: Vollständige Referenz für das jamjet Command-Line-Interface.
sidebar:
  order: 8
---

# CLI-Referenz

Die `jamjet` CLI ist die primäre Schnittstelle für die Verwaltung von Projekten, das Ausführen von Workflows und die Inspektion von Ausführungen.

## Installation

```bash
pip install jamjet
jamjet --version

# JamJet CLI 0.1.0

```

## Globale Flags

| Flag | Beschreibung |
|------|-------------|
| `--runtime URL` | Runtime-URL (Standard: `http://localhost:7700`) |
| `--api-key KEY` | API-Key für gehostete Runtime |
| `--output json` | Ausgabe als JSON (für Skripting) |
| `-v, --verbose` | Ausführliche Ausgabe |

## `jamjet init`

Erstelle ein neues Projekt oder füge JamJet zu einem bestehenden hinzu.

```bash

# Neues Projekt in neuem Verzeichnis

jamjet init my-agent
cd my-agent

# Zum aktuellen Verzeichnis hinzufügen (wie git init)

jamjet init
```

Erstellt:
- `workflow.yaml` — Starter-Workflow-Template
- `jamjet.toml` — Projektkonfiguration
- `README.md` — Projekt-Readme

## `jamjet dev`

Starte die lokale Development-Runtime.

```bash
jamjet dev
```

```
▶ JamJet Dev Runtime
  Port:  7700
  Mode:  local (SQLite)
  API:   http://localhost:7700

Drücke Strg+C zum Beenden.
```

| Flag | Beschreibung |
|------|-------------|
| `--port N` | Lausche auf Port N (Standard: 7700) |
| `--db PATH` | SQLite-Dateipfad (Standard: `.jamjet/dev.db`) |
| `--with-mcp-server` | MCP-Server zusätzlich starten |
| `--with-a2a-server` | A2A-Agent-Server zusätzlich starten |
| `--reload` | Auto-Reload bei Workflow-Dateiänderungen |

## `jamjet validate`

Validiere eine Workflow-Datei ohne sie auszuführen.

```bash
jamjet validate workflow.yaml
```

```
Gültig. workflow_id=hello-agent version=0.1.0
  Nodes: 4  Edges: 3
```

## `jamjet run`

Sende eine Workflow-Ausführung und warte auf das Ergebnis.

```bash
jamjet run workflow.yaml --input '{"query": "Was ist JamJet?"}'
```

```
✓ Ausführung gestartet: exec_01JM4X8NKWP2
  Status: running
✓ node_completed   think   claude-haiku  512ms
✓ Ausführung abgeschlossen.
```

| Flag | Beschreibung |
|------|-------------|
| `--input JSON` | Initialer State als JSON |
| `--input-file PATH` | Initialen State aus JSON-Datei lesen |
| `--stream` | Events in Echtzeit streamen |
| `--wait / --no-wait` | Auf Abschluss warten (Standard: wait) |
| `--timeout N` | Timeout in Sekunden (Standard: 300) |

Mit `--stream`:

```bash
jamjet run workflow.yaml --input '{"query": "Erkläre Event Sourcing"}' --stream
```

```
✓ exec_01JM5Y9... gestartet
 → node_started    think
✓ node_completed   think   claude-haiku  489ms  (64→312 tokens)
✓ Stream abgeschlossen
```

## `jamjet inspect`

Den vollständigen Zustand und die Event-Timeline einer Ausführung anzeigen.

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

Kürzlich ausgeführte Executions auflisten.

```bash
jamjet ls
```

```
ID                        Workflow         Status      Duration  Started
exec_01JM5Y9NKWP3        research-agent   completed   2.1s      2m ago
exec_01JM4X8NKWP2        hello-agent      completed   512ms     5m ago
exec_01JM3W7MKVM1        research-agent   failed      8.3s      12m ago
```

| Flag | Beschreibung |
|------|-------------|
| `--workflow ID` | Nach Workflow-ID filtern |
| `--status STATUS` | Nach Status filtern (running, completed, failed) |
| `--limit N` | N Ergebnisse anzeigen (Standard: 20) |

## `jamjet resume`

Eine wartende oder fehlgeschlagene Execution fortsetzen.

```bash

# Eine wartende Execution fortsetzen (z. B. nach manueller Freigabe)

jamjet resume exec_01JM4X8NKWP2 --event human_approved --data '{"approved": true}'

# Eine fehlgeschlagene Execution vom letzten Checkpoint neu versuchen

jamjet resume exec_01JM3W7MKVM1 --retry
```

## `jamjet cancel`

Eine laufende Execution abbrechen.

```bash
jamjet cancel exec_01JM4X8NKWP2
```

## `jamjet tools`

MCP-Tool-Server inspizieren und testen.

```bash

# Alle verfügbaren Tools auflisten

jamjet tools list

# Ein Tool direkt aufrufen (zum Testen)

jamjet tools call brave-search web_search --args '{"query": "JamJet"}'

## `jamjet agents`

A2A-Agent-Cards inspizieren.

```bash

# Einen Remote-Agent inspizieren

jamjet agents inspect https://agents.example.com/research-agent

# Lokal exponierte Agents auflisten

jamjet agents list
```

## `jamjet eval run`

Führe ein Eval-Dataset gegen einen Workflow aus.

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

| Flag | Beschreibung |
|------|-------------|
| `--workflow PATH` | Auszuführende Workflow-Datei |
| `--rubric TEXT` | Bewertungskriterien für LLM-Judge |
| `--model MODEL` | Modell für LLM-Judge (Standard: claude-haiku-4-5-20251001) |
| `--min-score N` | Mindestpunktzahl 1–5 (Standard: 4) |
| `--assert EXPR` | Python-Assertion (wiederholbar) |
| `--latency-ms N` | Maximale Latenz-Schwelle |
| `--cost-usd N` | Maximale Kosten pro Zeile |
| `--concurrency N` | Parallele Zeilen (Standard: 5) |
| `--fail-below N` | Exit-Code 1 bei Erfolgsrate unter N (Standard: 1.0) |
| `--output PATH` | Ergebnis-JSON in Datei schreiben |
