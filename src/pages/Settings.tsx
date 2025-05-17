import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, RefreshCw, AlertTriangle, Info } from 'lucide-react';

const Settings: React.FC = () => {
  const [editorSettings, setEditorSettings] = useState({
    theme: 'system',
    fontSize: '14',
    tabSize: '2',
    lineNumbers: true,
    wordWrap: true
  });
  
  const [languageSettings, setLanguageSettings] = useState({
    defaultTargetLanguage: 'javascript',
    autoTranslate: true,
    saveHistory: true
  });
  
  const [projectSettings, setProjectSettings] = useState({
    defaultLicense: 'mit',
    defaultVersion: '0.1.0',
    createReadme: true
  });
  
  const handleEditorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    
    setEditorSettings({
      ...editorSettings,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value
    });
  };
  
  const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    
    setLanguageSettings({
      ...languageSettings,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value
    });
  };
  
  const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    
    setProjectSettings({
      ...projectSettings,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value
    });
  };
  
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSaveSettings = () => {
    setIsSaving(true);
    
    // Simulate saving settings
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <motion.h1 
        className="text-2xl font-bold text-gray-900 dark:text-white mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Settings
      </motion.h1>
      
      <div className="space-y-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Editor Settings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Theme
              </label>
              <select
                name="theme"
                value={editorSettings.theme}
                onChange={handleEditorChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="system">System Default</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Font Size
              </label>
              <select
                name="fontSize"
                value={editorSettings.fontSize}
                onChange={handleEditorChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="12">12px</option>
                <option value="14">14px</option>
                <option value="16">16px</option>
                <option value="18">18px</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tab Size
              </label>
              <select
                name="tabSize"
                value={editorSettings.tabSize}
                onChange={handleEditorChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="2">2 spaces</option>
                <option value="4">4 spaces</option>
                <option value="8">8 spaces</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="lineNumbers"
                name="lineNumbers"
                checked={editorSettings.lineNumbers}
                onChange={handleEditorChange}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label htmlFor="lineNumbers" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Show Line Numbers
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="wordWrap"
                name="wordWrap"
                checked={editorSettings.wordWrap}
                onChange={handleEditorChange}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label htmlFor="wordWrap" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Word Wrap
              </label>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Language Settings</h2>
          
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Default Target Language
              </label>
              <select
                name="defaultTargetLanguage"
                value={languageSettings.defaultTargetLanguage}
                onChange={handleLanguageChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="typescript">TypeScript</option>
                <option value="rust">Rust</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="autoTranslate"
                name="autoTranslate"
                checked={languageSettings.autoTranslate}
                onChange={handleLanguageChange}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label htmlFor="autoTranslate" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Auto-translate Code
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="saveHistory"
                name="saveHistory"
                checked={languageSettings.saveHistory}
                onChange={handleLanguageChange}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label htmlFor="saveHistory" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Save Translation History
              </label>
            </div>
          </div>
          
          <div className="flex items-start bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-lg p-3">
            <AlertTriangle size={18} className="text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-sm text-amber-800 dark:text-amber-300">
              Translation accuracy may vary depending on language complexity. Always review generated code for correctness.
            </p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Project Settings</h2>
          
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Default License
              </label>
              <select
                name="defaultLicense"
                value={projectSettings.defaultLicense}
                onChange={handleProjectChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="mit">MIT</option>
                <option value="apache">Apache 2.0</option>
                <option value="gpl">GPL 3.0</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Default Version
              </label>
              <input
                type="text"
                name="defaultVersion"
                value={projectSettings.defaultVersion}
                onChange={handleProjectChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="createReadme"
                name="createReadme"
                checked={projectSettings.createReadme}
                onChange={handleProjectChange}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label htmlFor="createReadme" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Automatically Create README.md
              </label>
            </div>
          </div>
          
          <div className="flex items-start bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-3">
            <Info size={18} className="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-sm text-blue-800 dark:text-blue-300">
              These settings will be applied to all new projects. You can override them on a per-project basis.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end">
        <button 
          onClick={handleSaveSettings}
          disabled={isSaving}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-300"
        >
          {isSaving ? (
            <>
              <RefreshCw size={16} className="mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save size={16} className="mr-2" />
              Save Settings
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Settings;