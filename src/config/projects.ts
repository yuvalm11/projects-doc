export interface Project {
  name: string;
  description: string;
  repo: string;
  tags: string[];
  githubUrl: string;
}

export const projects: Project[] = [
  {
    name: 'Inverted Pendulum',
    description: 'Policy Gradient RL algorithm for the cartpole problem',
    repo: 'inverted-pendulum',
    tags: ['Reinforcement Learning', 'JAX', 'Control Theory'],
    githubUrl: 'https://github.com/yuvalm11/inverted-pendulum'
  },
  {
    name: 'Hemingway LLM',
    description: 'Fine tuning an LLM that generates Hemingway-style text',
    repo: 'hemingway',
    tags: ['LLM', 'Fine Tuning', 'Transformers', 'Generative AI'],
    githubUrl: 'https://github.com/yuvalm11/hemingway'
  },
  {
    name: 'Prompter Plotter', 
    description: 'Use AI image generation to create a real life drawing',
    repo: 'prompter-plotter',
    tags: ['Generative AI', 'Machine building', 'Control Systems', 'Image processing'],
    githubUrl: 'https://github.com/yuvalm11/prompter-plotter'
  },
  {
    name: 'MNIST Variational Autoencoder',
    description: 'Variational Autoencoder for MNIST image generation with a lightweight CNN classifier',
    repo: 'mnist-vae',
    tags: ['Variational Autoencoder', 'Computer Vision', 'PyTorch', 'CNN'],
    githubUrl: 'https://github.com/yuvalm11/mnist-vae'
  },
  {
    name: 'Motor Position Correction',
    description: 'Error correction algorithm using Fourier analysis for accurate stepper motor control',
    repo: 'motor-position-correction',
    tags: ['Signal Processing', 'Control Systems', 'Python', 'Fourier Analysis'],
    githubUrl: 'https://github.com/yuvalm11/motor-position-correction'
  },
  {
    name: 'Insta Bot',
    description: 'An automation script to post my photos daily on my Instagram account',
    repo: 'insta-bot',
    tags: ['Instagram Graph API', "Automation", "Photography", "GitHub Actions"],
    githubUrl: 'https://github.com/yuvalm11/insta-bot'
  },
  {
    name: 'Table Timer',
    description: 'A tiny desk clock to remind me to stay mobile in my office work',
    repo: 'table-timer',
    tags: ['Embedded systems', "Electronics", "Product Design"],
    githubUrl: 'https://github.com/yuvalm11/table-timer'
  },
  {
    name: 'Personal Website',
    description: 'It\'s this website! Automatically parses GitHub READMEs to a nice documentation website',
    repo: 'projects-doc',
    tags: ['Astro', 'Web Development', 'GitHub Actions', 'TypeScript'],
    githubUrl: 'https://github.com/yuvalm11/projects-doc'
  }
  // Add more projects here as they become available
]; 
