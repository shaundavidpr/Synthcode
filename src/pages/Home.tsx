import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Layers, FolderPlus, Lightbulb, Zap, Box, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const features = [
    {
      icon: <Code2 size={24} className="text-indigo-500" />,
      title: 'Custom Language Creation',
      description: 'Design your own programming language with intuitive syntax tailored to your specific needs.'
    },
    {
      icon: <Lightbulb size={24} className="text-amber-500" />,
      title: 'AI-Powered Assistance',
      description: 'Get intelligent suggestions and optimizations as you define your language features.'
    },
    {
      icon: <Layers size={24} className="text-emerald-500" />,
      title: 'Code Translation',
      description: 'Automatically translate your custom language to established programming languages.'
    },
    {
      icon: <Zap size={24} className="text-purple-500" />,
      title: 'Rapid Prototyping',
      description: 'Build and test concepts faster with a language designed specifically for your domain.'
    },
    {
      icon: <FolderPlus size={24} className="text-blue-500" />,
      title: 'Project Generation',
      description: 'Create entire project scaffolds with your custom language in seconds.'
    },
    {
      icon: <Share2 size={24} className="text-rose-500" />,
      title: 'Language Sharing',
      description: 'Share your custom languages with team members or the community.'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
          AI Code Synthesizer
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Create custom programming languages tailored to your specific needs, making coding easier and more intuitive.
        </p>
      </motion.div>

      <div className="mb-12">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={item}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-700 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col md:flex-row justify-center gap-4 mt-8"
      >
        <Link to="/designer" className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors duration-300">
          <Code2 size={20} className="mr-2" />
          Create a Language
        </Link>
        <Link to="/editor" className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white font-medium rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300">
          <Layers size={20} className="mr-2" />
          Try the Editor
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;