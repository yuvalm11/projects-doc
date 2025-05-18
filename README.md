# Dev Docs

A modern documentation website that fetches and displays README files from GitHub repositories. Built with Astro and deployed on GitHub Pages.

## Features

- 🚀 Built with Astro for optimal performance
- 📱 Responsive design with Tailwind CSS
- 🌙 Dark mode support
- 📄 GitHub README integration
- 🎨 Modern and clean UI
- 🔄 Automatic deployment to GitHub Pages

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm (comes with Node.js)
- A GitHub account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/[YOUR_USERNAME]/dev-docs.git
   cd dev-docs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:4321](http://localhost:4321) in your browser.

### Configuration

1. Update `astro.config.mjs` with your GitHub username:
   ```js
   site: 'https://[YOUR_GITHUB_USERNAME].github.io',
   ```

2. Add your GitHub repositories to fetch in the projects page.

### Deployment

The site will automatically deploy to GitHub Pages when you push to the main branch. Make sure to:

1. Enable GitHub Pages in your repository settings
2. Select the `gh-pages` branch as the source
3. Ensure the repository is public

## Development

- `npm run dev` - Start the development server
- `npm run build` - Build the site for production
- `npm run preview` - Preview the production build locally

## License

MIT License - feel free to use this project for your own documentation needs!

```sh
npm create astro@latest -- --template minimal
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/minimal)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/minimal)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/minimal/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
