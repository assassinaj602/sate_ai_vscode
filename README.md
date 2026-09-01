# SATE AI - VS Code Extension

Comprehensive fault injection, performance benchmarking, and stress testing tool for on-device AI models in Flutter and Dart projects.

## Overview

The SATE AI VS Code extension provides native developer workflow integration for the `sate_ai` framework. It enables machine learning engineers, mobile developers, and QA teams to run automated stress tests, inject synthetic edge failures (memory pressure, malformed inputs, thermal throttling), compare reports against golden baselines, and stream real-time test telemetry directly from the editor workspace.

## Key Capabilities

### 1. Model Stress Testing
Execute configurable fault injection pipelines across target AI models.
- Trigger stress tests via Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`).
- Right-click model artifacts (`.gguf`, `.tflite`, `.onnx`) directly in the File Explorer.
- Run customizable injectors including memory pressure, malformed inputs, latency drop, data corruption, and thermal throttling.

### 2. Golden Baseline Management
Maintain regression guards for AI model iterations.
- Capture baseline performance benchmarks for latency, memory utilization, and pass/fail boundaries.
- Compare subsequent test runs against stored baselines to detect performance degradation prior to deployment.

### 3. Report Inspection
Analyze diagnostic results in native editor documents.
- Open JSON and Markdown stress reports directly within VS Code tabs.
- Inspect structured breakdown of fault results, error traces, and percentile distributions (p50, p90, p99).

### 4. Real-time Telemetry Dashboard
Launch live monitoring for ongoing stress test runs.
- Open the SATE AI web monitoring interface using a single command.
- Stream Server-Sent Events (SSE) progress logs, throughput metrics, and active failure states.

### 5. Status Bar Integration
Always-on status monitoring in the bottom status bar.
- Indicates framework availability when a valid `pubspec.yaml` containing `sate_ai` is detected.
- Reflects active test execution states (running, passed, failed).
- Serves as a single-click shortcut to launch stress tests.

## Requirements

- Flutter or Dart project workspace.
- `sate_ai` package added to `dependencies` or `dev_dependencies` in `pubspec.yaml`.

```yaml
dev_dependencies:
  sate_ai: ^0.10.0
```

## Commands

- `SATE AI: Run SATE AI Stress Test` - Launches a stress test run with prompts for model path, injectors, and timeout.
- `SATE AI: Save as Baseline` - Saves current execution results as a golden baseline for future comparison.
- `SATE AI: View Latest Report` - Displays the most recent JSON stress report in an editor tab.
- `SATE AI: Open Dashboard` - Opens the real-time SSE web monitoring dashboard.

## Extension Configuration Settings

This extension contributes the following configurable properties via Workspace Settings (`.vscode/settings.json`):

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `sate-ai.modelPath` | `string` | `"models/model.gguf"` | Default relative filepath to the AI model file under test. |
| `sate-ai.injectors` | `array` | `["memoryPressure", "malformedInput"]` | List of fault injectors to apply during stress runs. |
| `sate-ai.timeout` | `integer` | `30` | Execution timeout limit in seconds per test pass. |
| `sate-ai.reportDirectory` | `string` | `"stress_reports"` | Target directory where execution reports are stored. |

## Workflow Example

1. Open a Flutter project containing `sate_ai` in `pubspec.yaml`.
2. Open the Command Palette (`Ctrl+Shift+P`) and type `SATE AI: Run SATE AI Stress Test`.
3. Provide the target model path (e.g. `assets/models/classifier.tflite`).
4. Select desired fault injectors and press `Enter`.
5. View live terminal output and open generated report artifacts in the `stress_reports/` folder.

## Support & Feedback

For issue reporting, feature requests, and documentation, visit:
- Repository: https://github.com/assassinaj602/sate_ai_vscode
- Issue Tracker: https://github.com/assassinaj602/sate_ai_vscode/issues

## License

Distributed under the MIT License.
