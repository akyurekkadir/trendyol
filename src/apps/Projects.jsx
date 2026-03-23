import React, { useState } from 'react';
import { Folder, ExternalLink, Github, ChevronRight } from 'lucide-react';

const projects = [
  {
    id: 'haier',
    title: 'Haier Demand Forecasting',
    subtitle: 'Datathon 2nd Place Winner',
    date: 'Nov 2025',
    description: 'Developed a robust 12-month demand forecasting model handling SKU phase-outs and seasonality. Engineered a hybrid ensemble strategy combining LightGBM Classifiers with MAE & Tweedie Regressors to effectively handle zero-inflated demand data. Achieved 2nd Place on Private Leaderboard (out of 74 teams).',
    tags: ['Python', 'LightGBM', 'Time Series Forecasting'],
    githubUrl: 'https://github.com/akyurekkadir/haier-demand-forecasting-final-solution',
    files: ['train.csv', 'test.csv', 'model.pkl']
  },
  {
    id: 'vton',
    title: 'Virtual Try-On Studio',
    subtitle: 'ComfyUI & Deep Learning Vision Project',
    date: 'Spring 2024',
    description: 'A diffusion-based virtual try-on system designed natively using ComfyUI. It allows users to realistically transpose clothing items onto images of people while preserving body pose and garment texture seamlessly.',
    tags: ['ComfyUI', 'PyTorch', 'Stable Diffusion', 'React'],
    githubUrl: 'https://github.com/akyurekkadir/virtual-tryon-studio',
    youtubeUrl: 'https://youtu.be/mclvx8pwn74',
    files: ['app.py', 'diffusion_model.pt']
  },
  {
    id: 'fridge',
    title: 'IoT Smart Fridge',
    subtitle: 'Embedded Systems & ML',
    date: 'Fall 2023',
    description: 'A smart fridge simulation that tracks inventory using computer vision. The system actively detects whether produce (such as oranges or apples) is fresh or rotten, and predicts when users need to restock items based on their routines.',
    tags: ['OpenCV', 'Raspberry Pi', 'IoT', 'Python'],
    githubUrl: 'https://github.com/akyurekkadir/iot-smart-fridge',
    videoUrl: 'https://youtu.be/3ElFaKVzq6I',
    files: ['object_detection.py', 'inventory.db']
  },
  {
    id: 'yzta',
    title: 'Market Product Price Prediction',
    subtitle: 'Google AI Academy Datathon',
    date: '2025',
    description: 'Built a regression model on 200,000+ samples to predict over 45,000 product prices. Applied feature engineering, encoding, log transformations, and hyperparameter optimization with Keras Tuner. Achieved Top 10 ranking (out of 135 teams) with an RMSE of 4.6.',
    tags: ['Deep Learning', 'TensorFlow', 'Keras', 'Python'],
    githubUrl: 'https://github.com/akyurekkadir/yzta-datathon',
    files: ['churn_analysis.ipynb']
  }
];

export default function Projects() {
  const [activeProjectId, setActiveProjectId] = useState(projects[0].id);

  const activeProject = projects.find(p => p.id === activeProjectId);

  return (
    <div className="flex h-full w-full bg-gray-900 text-white font-sans select-none">

      {/* Left Sidebar - Master List */}
      <div className="w-[35%] min-w-[250px] border-r border-gray-800 bg-gray-800/30 flex flex-col">
        <div className="h-12 px-4 flex items-center text-sm font-semibold text-gray-300 border-b border-gray-800">
          Projects Folder
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {projects.map(project => (
            <div
              key={project.id}
              onClick={() => setActiveProjectId(project.id)}
              className={`px-3 py-3 rounded-xl cursor-default flex items-center gap-3 transition-colors
                ${activeProjectId === project.id ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
            >
              <Folder className={`w-8 h-8 ${activeProjectId === project.id ? 'text-white' : 'text-blue-400'}`} fill="currentColor" />
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${activeProjectId === project.id ? 'text-white' : 'text-gray-200'}`}>
                  {project.title}
                </p>
                <p className={`text-[11px] truncate ${activeProjectId === project.id ? 'text-blue-200' : 'text-gray-500'}`}>
                  {project.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Content - Detail View */}
      <div className="flex-1 overflow-y-auto bg-gray-900 flex flex-col">
        {activeProject && (
          <div className="p-8 max-w-3xl">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-2 text-white">{activeProject.title}</h1>
                <p className="text-xl text-gray-400">{activeProject.subtitle}</p>
                <p className="text-sm font-medium text-blue-500 mt-2">{activeProject.date}</p>
              </div>
              <Folder className="w-20 h-20 text-blue-500 opacity-20" />
            </div>

            <div className="prose prose-invert border-b border-gray-800 pb-8 mb-8">
              <p className="text-gray-300 text-lg leading-relaxed">{activeProject.description}</p>
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {activeProject.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-xs text-gray-300 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4 mt-12 flex-wrap">
              {activeProject.githubUrl && activeProject.githubUrl !== '#' && (
                <a href={activeProject.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors">
                  <Github size={18} /> View GitHub
                </a>
              )}
              {activeProject.demoUrl && (
                <a href={activeProject.demoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-colors">
                  <ExternalLink size={18} /> Live Demo
                </a>
              )}
              {(activeProject.youtubeUrl || activeProject.videoUrl) && (
                <a href={activeProject.youtubeUrl || activeProject.videoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 transition-colors">
                  YouTube Video
                </a>
              )}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
