---
title: Referencia de CLI
description: Referencia completa para la interfaz de línea de comandos de jamjet.
sidebar:
  order: 8
---

# Referencia CLI

El CLI `jamjet` es la interfaz principal para gestionar proyectos, ejecutar flujos de trabajo e inspeccionar ejecuciones.

## Instalación

```bash
pip install jamjet
jamjet --version

# JamJet CLI 0.1.0

```

## Flags globales

| Flag | Descripción |
|------|-------------|
| `--runtime URL` | URL del runtime (por defecto: `http://localhost:7700`) |
| `--api-key KEY` | Clave API para runtime alojado |
| `--output json` | Salida como JSON (para scripting) |
| `-v, --verbose` | Salida detallada |

## `jamjet init`

Crea un nuevo proyecto o añade JamJet a uno existente.

```bash

# Nuevo proyecto en un directorio nuevo

jamjet init my-agent
cd my-agent

# Añadir al directorio actual (como git init)

jamjet init
```

Crea:
- `workflow.yaml` — plantilla de flujo de trabajo inicial
- `jamjet.toml` — configuración del proyecto
- `README.md` — readme del proyecto

## `jamjet dev`

Inicia el runtime de desarrollo local.

```bash
jamjet dev
```

```
▶ JamJet Dev Runtime
  Puerto:  7700
  Modo:  local (SQLite)
  API:   http://localhost:7700

Presiona Ctrl+C para detener.
```

| Flag | Descripción |
|------|-------------|
| `--port N` | Escuchar en el puerto N (por defecto: 7700) |
| `--db PATH` | Ruta del archivo SQLite (por defecto: `.jamjet/dev.db`) |
| `--with-mcp-server` | También iniciar el servidor MCP |
| `--with-a2a-server` | También iniciar el servidor de agentes A2A |
| `--reload` | Recarga automática al cambiar archivos de flujo de trabajo |

## `jamjet validate`

Valida un archivo de flujo de trabajo sin ejecutarlo.

```bash
jamjet validate workflow.yaml
```

```
Válido. workflow_id=hello-agent version=0.1.0
  Nodos: 4  Aristas: 3
```

## `jamjet run`

Envía una ejecución de flujo de trabajo y espera el resultado.

```bash
jamjet run workflow.yaml --input '{"query": "What is JamJet?"}'
```

```
✓ Ejecución iniciada: exec_01JM4X8NKWP2
  Estado: en ejecución
✓ node_completed   think   claude-haiku  512ms
✓ Ejecución completada.
```

| Flag | Descripción |
|------|-------------|
| `--input JSON` | Estado inicial como JSON |
| `--input-file PATH` | Leer estado inicial desde un archivo JSON |
| `--stream` | Transmitir eventos en tiempo real |
| `--wait / --no-wait` | Esperar finalización (por defecto: esperar) |
| `--timeout N` | Tiempo de espera en segundos (por defecto: 300) |

Con `--stream`:

```bash
jamjet run workflow.yaml --input '{"query": "Explain event sourcing"}' --stream
```

```
✓ exec_01JM5Y9... iniciada
 → node_started    think
✓ node_completed   think   claude-haiku  489ms  (64→312 tokens)
✓ Transmisión completada
```

## `jamjet inspect`

Ver el estado completo y la línea de tiempo de eventos de una ejecución.

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

Listar ejecuciones recientes.

```bash
jamjet ls
```

```
ID                        Workflow         Status      Duration  Started
exec_01JM5Y9NKWP3        research-agent   completed   2.1s      2m ago
exec_01JM4X8NKWP2        hello-agent      completed   512ms     5m ago
exec_01JM3W7MKVM1        research-agent   failed      8.3s      12m ago
```

| Flag | Descripción |
|------|-------------|
| `--workflow ID` | Filtrar por ID de workflow |
| `--status STATUS` | Filtrar por estado (running, completed, failed) |
| `--limit N` | Mostrar N resultados (por defecto: 20) |

## `jamjet resume`

Reanudar una ejecución en espera o fallida.

```bash

# Reanudar una ejecución en espera (por ejemplo, después de aprobación humana)

jamjet resume exec_01JM4X8NKWP2 --event human_approved --data '{"approved": true}'

# Reintentar una ejecución fallida desde el último checkpoint

jamjet resume exec_01JM3W7MKVM1 --retry
```

## `jamjet cancel`

Cancelar una ejecución en curso.

```bash
jamjet cancel exec_01JM4X8NKWP2
```

## `jamjet tools`

Inspeccionar y probar servidores de herramientas MCP.

```bash

# Listar todas las herramientas disponibles

jamjet tools list

# Llamar una herramienta directamente (para pruebas)

jamjet tools call brave-search web_search --args '{"query": "JamJet"}'
```

## `jamjet agents`

Inspeccionar agent cards A2A.

```bash

# Inspeccionar un agente remoto

jamjet agents inspect https://agents.example.com/research-agent

# Listar agentes expuestos localmente

jamjet agents list
```

## `jamjet eval run`

Ejecuta un conjunto de datos de evaluación contra un flujo de trabajo.

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

| Flag | Descripción |
|------|-------------|
| `--workflow PATH` | Archivo de flujo de trabajo a ejecutar |
| `--rubric TEXT` | Rúbrica del juez LLM |
| `--model MODEL` | Modelo para el juez LLM (predeterminado: claude-haiku-4-5-20251001) |
| `--min-score N` | Puntuación mínima 1–5 (predeterminado: 4) |
| `--assert EXPR` | Aserción Python (repetible) |
| `--latency-ms N` | Umbral máximo de latencia |
| `--cost-usd N` | Costo máximo por fila |
| `--concurrency N` | Filas paralelas (predeterminado: 5) |
| `--fail-below N` | Código de salida 1 si la tasa de aprobación está por debajo de N (predeterminado: 1.0) |
| `--output PATH` | Escribir resultados JSON en archivo |
