import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco, atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface SyntaxElement {
  id: string;
  name: string;
  pattern: string;
  replacement: string;
  example: string;
}

interface SyntaxPreviewProps {
  code: string;
  syntaxElements: SyntaxElement[];
  targetLanguage: string;
}

const SyntaxPreview: React.FC<SyntaxPreviewProps> = ({ code, syntaxElements, targetLanguage }) => {
  const isDarkMode = document.documentElement.classList.contains('dark');
  
  // Function to translate the code based on the syntax elements
  const translateCode = (sourceCode: string): string => {
    let translatedCode = sourceCode;
    
    // Apply each syntax element replacement
    syntaxElements.forEach(element => {
      if (element.pattern && element.replacement) {
        const regex = new RegExp(element.pattern, 'g');
        translatedCode = translatedCode.replace(regex, element.replacement);
      }
    });
    
    // Add language-specific modifications
    if (targetLanguage === 'python') {
      // Replace semicolons and braces
      translatedCode = translatedCode
        .replace(/;/g, '')
        .replace(/{/g, ':')
        .replace(/}/g, '')
        .replace(/(\s*)\)/g, '$1):');
    }
    
    return translatedCode;
  };
  
  const translatedCode = translateCode(code);
  
  return (
    <SyntaxHighlighter
      language={targetLanguage}
      style={isDarkMode ? atomOneDark : docco}
      customStyle={{
        backgroundColor: 'transparent',
        margin: 0,
        padding: 0,
        fontSize: '0.9rem',
      }}
    >
      {translatedCode}
    </SyntaxHighlighter>
  );
};

export default SyntaxPreview;