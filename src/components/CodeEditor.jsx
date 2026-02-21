import React from 'react';
import Editor from '@monaco-editor/react';
import './CodeEditor.css';

const CodeEditor = ({ value, onChange, language = 'python', height = '400px' }) => {
  const editorOptions = {
    minimap: { enabled: false },
    fontSize: 14,
    lineNumbers: 'on',
    roundedSelection: true,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: 4,
    wordWrap: 'on',
    theme: 'vs-dark'
  };

  const handleEditorChange = (value) => {
    onChange(value || '');
  };

  return (
    <div className="code-editor-container">
      <Editor
        height={height}
        language={language}
        value={value}
        onChange={handleEditorChange}
        options={editorOptions}
        theme="vs-dark"
      />
    </div>
  );
};

export default CodeEditor;