import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FolderPlus, ChevronDown, Check, Terminal, BookOpen, Globe, LayoutGrid } from 'lucide-react';

const ProjectGenerator: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [projectName, setProjectName] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const templates = [
    { id: 'web', name: 'Web Application', icon: <Globe size={24} className="text-blue-500" /> },
    { id: 'api', name: 'API Server', icon: <Terminal size={24} className="text-green-500" /> },
    { id: 'cli', name: 'Command Line Tool', icon: <BookOpen size={24} className="text-purple-500" /> },
    { id: 'ui', name: 'UI Library', icon: <LayoutGrid size={24} className="text-amber-500" /> }
  ];
  
  const languages = [
    { id: 'easyscript', name: 'EasyScript', description: 'Simplified JavaScript' },
    { id: 'simplepy', name: 'SimplePy', description: 'Clean Python variant' },
    { id: 'webflow', name: 'WebFlow', description: 'HTML/CSS generator' },
    { id: 'dataquery', name: 'DataQuery', description: 'SQL-like data operations' }
  ];
  
  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleGenerateProject();
    }
  };
  
  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleGenerateProject = () => {
    setIsGenerating(true);
    
    // Simulate project generation
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };
  
  const isNextDisabled = () => {
    if (step === 1) return !selectedTemplate;
    if (step === 2) return !projectName;
    if (step === 3) return !selectedLanguage;
    return false;
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <motion.h1 
        className="text-2xl font-bold text-gray-900 dark:text-white mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Project Generator
      </motion.h1>
      
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  s < step ? 'bg-green-500 text-white' : 
                  s === step ? 'bg-indigo-600 text-white' : 
                  'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}
              >
                {s < step ? (
                  <Check size={16} />
                ) : (
                  <span>{s}</span>
                )}
              </div>
              <span className={`text-sm ${
                s === step ? 'text-indigo-600 dark:text-indigo-400 font-medium' : 'text-gray-500 dark:text-gray-400'
              }`}>
                {s === 1 ? 'Template' : s === 2 ? 'Details' : 'Language'}
              </span>
            </div>
          ))}
          <div className="absolute left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700 top-[2.25rem] -z-10"></div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Select Project Template</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Choose a template to start with. You can customize it later.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {templates.map((template) => (
                <div 
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    selectedTemplate === template.id 
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="mr-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      {template.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{template.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Start with a {template.name.toLowerCase()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
        
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Project Details</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Enter information about your project.</p>
            
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Project Name
                </label>
                <input 
                  type="text" 
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="my-awesome-project"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea 
                  rows={3}
                  placeholder="A brief description of your project"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Version
                  </label>
                  <input 
                    type="text" 
                    defaultValue="0.1.0"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    License
                  </label>
                  <select
                    defaultValue="mit"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="mit">MIT</option>
                    <option value="apache">Apache 2.0</option>
                    <option value="gpl">GPL 3.0</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Choose Language</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Select a custom language for your project.</p>
            
            <div className="space-y-3 mb-8">
              {languages.map((language) => (
                <div 
                  key={language.id}
                  onClick={() => setSelectedLanguage(language.id)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedLanguage === language.id 
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{language.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{language.description}</p>
                    </div>
                    {selectedLanguage === language.id && (
                      <Check size={20} className="text-indigo-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-lg p-4 mb-8">
              <div className="flex">
                <div className="mr-3 text-indigo-500">
                  <Terminal size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-indigo-700 dark:text-indigo-300 mb-1">Target Output</h4>
                  <p className="text-sm text-indigo-600/80 dark:text-indigo-400/80">
                    Your custom language will be translated to JavaScript for execution, but you'll write code in your chosen syntax.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <button 
            onClick={handlePreviousStep}
            disabled={step === 1}
            className={`px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 ${
              step === 1 
                ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Back
          </button>
          
          <button 
            onClick={handleNextStep}
            disabled={isNextDisabled()}
            className={`px-4 py-2 rounded-lg ${
              isNextDisabled() 
                ? 'bg-indigo-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700'
            } text-white flex items-center`}
          >
            {isGenerating ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
                Generating...
              </>
            ) : (
              <>
                {step === 3 ? (
                  <>
                    <FolderPlus size={18} className="mr-2" />
                    Generate Project
                  </>
                ) : (
                  <>
                    Next
                    <ChevronDown size={18} className="ml-2 rotate-[-90deg]" />
                  </>
                )}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectGenerator;