import * as vscode from 'vscode';
import { gzip } from 'pako';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('extension.compressForChatGPT', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showInformationMessage('No active editor found.');
      return;
    }

    const selection = editor.selection;
    const text = editor.document.getText(selection.isEmpty ? undefined : selection);

    try {
      const compressed = gzip(text);
      const base64 = Buffer.from(compressed).toString('base64');
      const result = `🚀GZ-CHATGPT:v1:${base64}`;

      await vscode.env.clipboard.writeText(result);
      vscode.window.showInformationMessage('Compressed and copied to clipboard!');
    } catch (error: any) {
      vscode.window.showErrorMessage(`Compression failed: ${error.message}`);
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
