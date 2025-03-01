# Yulog

A modern, responsive personal blog and portfolio site built with React, TypeScript and Tailwind CSS.

<!-- Note: Add a screenshot of your site here -->
<!-- ![Yulog Screenshot](public/screenshot.png) -->

## Features

- 🔍 **Search functionality** - Find blog posts easily
- 📱 **Fully responsive design** - Looks great on all devices
- 🎨 **Dark theme** - Easy on the eyes
- 📝 **Rich Markdown support** - Write content with formatting, code blocks, and more
- 📑 **Table of Contents** - Auto-generated for blog posts
- 🔗 **SEO optimized** - Dynamic page titles and descriptions
- 💻 **Code syntax highlighting** - With copy-to-clipboard functionality
- ⚡ **Fast loading** - Optimized for performance
- 🔙 **Back to top button** - Easy navigation for long posts
- 🔄 **Load more pagination** - Smooth infinite scroll-like experience

## Tech Stack

- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Markdown**: React Markdown with remark/rehype plugins
- **Build Tool**: Vite
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/yulog.git
cd yulog
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and visit `http://localhost:3000`

## Project Structure

```
yulog/
├── public/             # Static assets
├── src/
│   ├── components/     # React components
│   │   ├── blog/       # Blog-specific components
│   │   ├── common/     # Reusable components
│   │   └── ...
│   ├── services/       # API and other services
│   ├── App.tsx         # Main application component
│   ├── main.tsx        # Entry point
│   └── ...
├── package.json        # Dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## Key Components

### Blog Components

- **Blog**: Main blog listing page with search functionality
- **PostDetail**: Blog post detail page with table of contents
- **TableOfContents**: Auto-generated navigation from post headings
- **MarkdownRenderers**: Custom renderers for Markdown content

### Common Components

- **PageTitle**: SEO-friendly dynamic page titles
- **ProjectCard**: Showcases projects with links
- **SocialLink**: Displays social media links
- **LoadingSpinner**: Loading indicator

## Building for Production

To build the app for production, run:

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory, ready to be deployed.

## Customization

### Styling

The project uses Tailwind CSS for styling. You can customize the theme in `tailwind.config.js`.

### Content

Update the content in the appropriate components:

- Home page content: `src/components/Home.tsx`
- Blog posts: Managed through the API service

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- Created by [yudopr](https://github.com/yudopr11)
- Built with [Vite](https://vitejs.dev/), [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), and [Tailwind CSS](https://tailwindcss.com/) 
- Deploy with [Railway](https://railway.app)