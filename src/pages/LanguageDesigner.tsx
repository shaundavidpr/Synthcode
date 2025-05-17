import React, { useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { Save, Play, Plus, X, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import SyntaxPreview from '../components/SyntaxPreview';

const LanguageDesigner: React.FC = () => {
  const [languageName, setLanguageName] = useState('MyLanguage');
  const [languageDesc, setLanguageDesc] = useState('A custom programming language');
  const [syntaxElements, setSyntaxElements] = useState([
    { id: '1', name: 'Variable Declaration', pattern: 'let', replacement: 'var', example: 'let x = 5' },
    { id: '2', name: 'Function Declaration', pattern: 'func', replacement: 'function', example: 'func add(a, b) { return a + b }' },
    { id: '3', name: 'Conditional', pattern: 'if', replacement: 'if', example: 'if (x > 5) { ... }' }
  ]);
  
  const [previewCode, setPreviewCode] = useState(`// Example code in ${languageName}
func greet(name) {
  let message = "Hello, " + name + "!"
  return message
}

// Main program
let user = "World"
print(greet(user))
`);
  
  const [targetLanguage, setTargetLanguage] = useState('javascript');
  
  const handleAddSyntaxElement = () => {
    const newId = (syntaxElements.length + 1).toString();
    setSyntaxElements([
      ...syntaxElements,
      { id: newId, name: 'New Element', pattern: '', replacement: '', example: '' }
    ]);
  };
  
  const handleRemoveSyntaxElement = (id: string) => {
    setSyntaxElements(syntaxElements.filter(element => element.id !== id));
  };
  
  const handleSyntaxElementChange = (id: string, field: string, value: string) => {
    setSyntaxElements(syntaxElements.map(element => 
      element.id === id ? { ...element, [field]: value } : element
    ));
  };
  
  return (
    <div className="h-[calc(100vh-12rem)]">
      <div className="flex items-center justify-between mb-6">
        <motion.h1 
          className="text-2xl font-bold text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Language Designer
        </motion.h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center">
            <Play size={16} className="mr-2 text-green-500" />
            Test
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center">
            <Save size={16} className="mr-2" />
            Save
          </button>
        </div>
      </div>
      
      <PanelGroup direction="horizontal" className="h-full">
        <Panel defaultSize={40} minSize={30}>
          <div className="h-full overflow-y-auto p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Language Name
              </label>
              <input 
                type="text" 
                value={languageName}
                onChange={(e) => setLanguageName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea 
                value={languageDesc}
                onChange={(e) => setLanguageDesc(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">Syntax Elements</h3>
                <button 
                  onClick={handleAddSyntaxElement}
                  className="p-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-md hover:bg-indigo-200 dark:hover:bg-indigo-800"
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <div className="space-y-4">
                {syntaxElements.map((element) => (
                  <motion.div 
                    key={element.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <input
                        type="text"
                        value={element.name}
                        onChange={(e) => handleSyntaxElementChange(element.id, 'name', e.target.value)}
                        className="font-medium bg-transparent focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded px-1 text-gray-800 dark:text-white"
                        placeholder="Element Name"
                      />
                      <button 
                        onClick={() => handleRemoveSyntaxElement(element.id)}
                        className="p-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div>
                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Pattern</label>
                        <input
                          type="text"
                          value={element.pattern}
                          onChange={(e) => handleSyntaxElementChange(element.id, 'pattern', e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Replacement</label>
                        <input
                          type="text"
                          value={element.replacement}
                          onChange={(e) => handleSyntaxElementChange(element.id, 'replacement', e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Example</label>
                      <input
                        type="text"
                        value={element.example}
                        onChange={(e) => handleSyntaxElementChange(element.id, 'example', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Target Language
              </label>
              <select
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="typescript">TypeScript</option>
                <option value="rust">Rust</option>
              </select>
            </div>
          </div>
        </Panel>
        
        <PanelResizeHandle className="w-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors cursor-col-resize" />
        
        <Panel defaultSize={60} minSize={30}>
          <div className="h-full flex flex-col">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-4 flex items-center text-sm">
              <Info size={16} className="text-indigo-500 mr-2" />
              <span className="text-gray-600 dark:text-gray-300">
                Write code using your language syntax in the editor below. The preview will show the translated code.
              </span>
            </div>
            
            <div className="flex-1 grid grid-rows-2 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 font-medium text-sm flex justify-between items-center">
                  <span>{languageName} Code</span>
                </div>
                <div className="p-4 h-full">
                  <textarea
                    value={previewCode}
                    onChange={(e) => setPreviewCode(e.target.value)}
                    className="w-full h-full p-2 font-mono text-sm resize-none focus:outline-none dark:bg-gray-800 dark:text-gray-200"
                  />
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 font-medium text-sm">
                  <span>Translated to {targetLanguage.charAt(0).toUpperCase() + targetLanguage.slice(1)}</span>
                </div>
                <div className="p-4 h-full overflow-auto">
                  <SyntaxPreview 
                    code={previewCode} 
                    syntaxElements={syntaxElements} 
                    targetLanguage={targetLanguage} 
                  />
                </div>
              </div>
            </div>
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default LanguageDesigner;