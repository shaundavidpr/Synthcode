import React, { useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { Play, Save, FileCode, Download, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco, atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeEditor: React.FC = () => {
  const isDarkMode = document.documentElement.classList.contains('dark');
  
  const [currentLanguage, setCurrentLanguage] = useState({
    id: '1',
    name: 'EasyScript',
    description: 'A simpler JavaScript variant with cleaner syntax',
    syntaxElements: [
      { pattern: 'func', replacement: 'function' },
      { pattern: 'var', replacement: 'let' },
      { pattern: 'print', replacement: 'console.log' }
    ]
  });
  
  const [savedLanguages] = useState([
    {
      id: '1',
      name: 'EasyScript',
      description: 'A simpler JavaScript variant with cleaner syntax'
    },
    {
      id: '2',
      name: 'SimplePy',
      description: 'Python with more explicit syntax'
    },
    {
      id: '3',
      name: 'WebFlow',
      description: 'HTML/CSS generator with simplified commands'
    }
  ]);
  
  const [code, setCode] = useState(`// Example code in ${currentLanguage.name}
func greet(name) {
  var message = "Hello, " + name + "!"
  print(message)
  return message
}

// Main program
var user = "World"
greet(user)
`);
  
  const [output, setOutput] = useState('');
  
  const handleRunCode = () => {
    // Translate the code based on the current language rules
    let translatedCode = code;
    currentLanguage.syntaxElements.forEach(element => {
      translatedCode = translatedCode.replace(new RegExp(element.pattern, 'g'), element.replacement);
    });
    
    setOutput(`/* Translated to JavaScript */\n\n${translatedCode}\n\n/* Output */\nHello, World!`);
  };
  
  return (
    <div className="h-[calc(100vh-12rem)]">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <motion.h1 
          className="text-2xl font-bold text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Code Editor
        </motion.h1>
        
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <select
              className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={currentLanguage.id}
              onChange={(e) => {
                const selected = savedLanguages.find(lang => lang.id === e.target.value);
                if (selected) {
                  setCurrentLanguage({
                    ...currentLanguage,
                    id: selected.id,
                    name: selected.name,
                    description: selected.description
                  });
                }
              }}
            >
              {savedLanguages.map(language => (
                <option key={language.id} value={language.id}>
                  {language.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <FileCode size={16} className="text-gray-500 dark:text-gray-400" />
            </div>
          </div>
          
          <button 
            onClick={handleRunCode}
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Play size={16} className="mr-2" />
            Run
          </button>
          
          <button className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <Save size={16} className="mr-2" />
            Save
          </button>
          
          <button className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
            <Download size={16} className="mr-2" />
            Export
          </button>
          
          <button className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
            <Share2 size={16} className="mr-2" />
            Share
          </button>
        </div>
      </div>
      
      <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        {currentLanguage.description}
      </div>
      
      <PanelGroup direction="horizontal" className="h-full">
        <Panel defaultSize={60} minSize={30}>
          <div className="h-full bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 font-medium text-sm text-gray-700 dark:text-gray-200">
              {currentLanguage.name} Code
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-[calc(100%-2.5rem)] p-4 font-mono text-sm resize-none focus:outline-none dark:bg-gray-800 dark:text-gray-200"
            />
          </div>
        </Panel>
        
        <PanelResizeHandle className="w-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors cursor-col-resize" />
        
        <Panel defaultSize={40} minSize={30}>
          <div className="h-full bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 font-medium text-sm text-gray-700 dark:text-gray-200">
              Output
            </div>
            <div className="h-[calc(100%-2.5rem)] overflow-auto p-4">
              {output ? (
                <SyntaxHighlighter
                  language="javascript"
                  style={isDarkMode ? atomOneDark : docco}
                  customStyle={{
                    backgroundColor: 'transparent',
                    margin: 0,
                    padding: 0,
                    fontSize: '0.9rem',
                  }}
                >
                  {output}
                </SyntaxHighlighter>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                  Run your code to see output here
                </div>
              )}
            </div>
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default CodeEditor;