import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

let outputChannel: vscode.OutputChannel;
let statusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
    outputChannel = vscode.window.createOutputChannel('SATE AI');
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.text = '$(beaker) SATE AI';
    statusBarItem.tooltip = 'SATE AI - Click to run stress test';
    statusBarItem.command = 'sate-ai.runStressTest';
    statusBarItem.show();

    // Register commands
    const runStressTest = vscode.commands.registerCommand('sate-ai.runStressTest', runStressTestHandler);
    const runBaseline = vscode.commands.registerCommand('sate-ai.runBaseline', runBaselineHandler);
    const viewReport = vscode.commands.registerCommand('sate-ai.viewReport', viewReportHandler);
    const openDashboard = vscode.commands.registerCommand('sate-ai.openDashboard', openDashboardHandler);

    context.subscriptions.push(runStressTest, runBaseline, viewReport, openDashboard);
    checkSateAI();
    outputChannel.appendLine('SATE AI extension activated!');
}

export function deactivate() {
    outputChannel.dispose();
    statusBarItem.dispose();
}

async function checkSateAI() {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) return;

    const pubspecPath = path.join(workspaceFolder.uri.fsPath, 'pubspec.yaml');
    if (!fs.existsSync(pubspecPath)) return;

    const content = fs.readFileSync(pubspecPath, 'utf-8');
    if (!content.includes('sate_ai')) {
        vscode.window.showInformationMessage('SATE AI is not in pubspec.yaml. Add it to use this extension.');
        return;
    }

    statusBarItem.text = '$(check) SATE AI';
    statusBarItem.tooltip = 'SATE AI - Ready';
}

async function runStressTestHandler() {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
        vscode.window.showErrorMessage('Open a Flutter project first.');
        return;
    }

    const config = vscode.workspace.getConfiguration('sate-ai');
    const modelPath = await vscode.window.showInputBox({
        prompt: 'Enter path to your model file',
        placeHolder: 'models/model.gguf',
        value: config.get('modelPath') as string,
    });
    if (!modelPath) return;

    const injectorsInput = await vscode.window.showInputBox({
        prompt: 'Enter comma-separated injectors',
        placeHolder: 'memoryPressure,malformedInput',
        value: (config.get('injectors') as string[] || ['memoryPressure', 'malformedInput']).join(','),
    });
    if (injectorsInput === undefined) return;

    const finalInjectors = injectorsInput ? injectorsInput.split(',').map(s => s.trim()) : ['memoryPressure', 'malformedInput'];
    const timeout = config.get('timeout') as number || 30;

    outputChannel.clear();
    outputChannel.show();
    outputChannel.appendLine(`🧪 Running stress test on: ${modelPath}`);
    outputChannel.appendLine(`📋 Injectors: ${finalInjectors.join(', ')}`);

    statusBarItem.text = '$(sync~spin) SATE AI';
    statusBarItem.tooltip = 'Running stress test...';

    const terminal = vscode.window.createTerminal('SATE AI');
    terminal.show();

    const command = `flutter pub run sate_ai --model ${modelPath} --injectors ${finalInjectors.join(',')} --timeout ${timeout}`;
    terminal.sendText(command);

    // Track terminal exit
    await new Promise(resolve => setTimeout(resolve, 1000));

    statusBarItem.text = '$(check) SATE AI';
    statusBarItem.tooltip = 'SATE AI - Ready';
    outputChannel.appendLine('✅ Test completed. Check terminal for results.');
}

async function runBaselineHandler() {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
        vscode.window.showErrorMessage('Open a Flutter project first.');
        return;
    }

    const config = vscode.workspace.getConfiguration('sate-ai');
    const modelPath = await vscode.window.showInputBox({
        prompt: 'Enter path to your model file',
        placeHolder: 'models/model.gguf',
        value: config.get('modelPath') as string,
    });
    if (!modelPath) return;

    outputChannel.clear();
    outputChannel.show();
    outputChannel.appendLine(`📦 Saving baseline for: ${modelPath}`);

    const terminal = vscode.window.createTerminal('SATE AI Baseline');
    terminal.show();
    terminal.sendText(`flutter pub run sate_ai --model ${modelPath} --baseline`);
}

async function viewReportHandler() {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) return;

    const config = vscode.workspace.getConfiguration('sate-ai');
    const reportDir = config.get('reportDirectory') as string || 'stress_reports';
    const reportPath = path.join(workspaceFolder.uri.fsPath, reportDir);

    if (!fs.existsSync(reportPath)) {
        vscode.window.showInformationMessage('No reports found. Run a stress test first.');
        return;
    }

    const files = fs.readdirSync(reportPath).filter(f => f.endsWith('.json'));
    if (files.length === 0) {
        vscode.window.showInformationMessage('No reports found. Run a stress test first.');
        return;
    }

    const selected = await vscode.window.showQuickPick(files, {
        placeHolder: 'Select a report to view',
    });
    if (!selected) return;

    const fullPath = path.join(reportPath, selected);
    const doc = await vscode.workspace.openTextDocument(fullPath);
    await vscode.window.showTextDocument(doc);
}

async function openDashboardHandler() {
    vscode.env.openExternal(vscode.Uri.parse('https://assassinaj602.github.io/sate_ai/'));
}
