# SATE AI - VS Code Extension

Run SATE AI stress tests for on-device AI models directly from VS Code.

## Features

- 🧪 **Run Stress Tests**: Execute SATE AI stress tests from Command Palette or right-click context menu on model files.
- 📦 **Baseline Management**: Save golden baselines and compare runs.
- 📊 **View Reports**: Inspect JSON and Markdown stress test reports directly in the editor.
- 🌐 **Real-time Dashboard**: Open the SATE AI web monitoring dashboard with a single command.
- ⚡ **Status Bar Integration**: Quick status indicator and launcher.

## Requirements

- Flutter / Dart project with `sate_ai` listed in `pubspec.yaml`.

## Extension Settings

This extension contributes the following settings:

* `sate-ai.modelPath`: Default path to the AI model file (e.g. `models/model.gguf`)
* `sate-ai.injectors`: Default fault injectors to execute (`memoryPressure`, `malformedInput`, etc.)
* `sate-ai.timeout`: Timeout per test cycle in seconds (default: `30`)
* `sate-ai.reportDirectory`: Directory to store generated reports (default: `stress_reports`)

## Commands

- `SATE AI: Run SATE AI Stress Test`
- `SATE AI: Save as Baseline`
- `SATE AI: View Latest Report`
- `SATE AI: Open Dashboard`

## License

MIT
