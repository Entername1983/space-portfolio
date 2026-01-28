# Space Portfolio

An interactive space-themed portfolio website for Kevin McCarthy, built with TypeScript, Vite, and GSAP. Explore the cosmos while discovering projects, bio information, and more through an immersive spaceship experience.

## Features

- **Space-themed UI** with animated starfield, planets, and space elements
- **Interactive spaceship interior** with control panels and monitors
- **Multiple content sections**: Projects, Bio, Captain's Log, and project showcases
- **Responsive design** with portrait/landscape orientation support
- **Rich animations** using GSAP for smooth transitions and effects
- **Audio controls** with mute/unmute functionality
- **Video backgrounds** for different space scenes
- **Mobile-optimized** with touch controls and adaptive layouts

## Tech Stack

- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server
- **GSAP** - Professional animation library
- **HTML5/CSS3** - Modern web standards
- **Canvas API** - Starfield and custom animations

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd space-porftolio
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 📁 Project Structure

```
space-porftolio/
├── src/
│   ├── data/                 # Static data and configurations
│   │   ├── projects.ts
│   │   ├── clickables-data.ts
│   │   ├── hoverables-data.ts
│   │   └── mappings.ts
│   ├── managers/             # Feature managers
│   │   ├── display-manager/
│   │   ├── projects-content-manager/
│   │   ├── space-scene-manager/
│   │   ├── intro-manager/
│   │   ├── log-content-manager/
│   │   ├── alien-manager/
│   │   ├── state-manager/
│   │   ├── layout-manager/
│   │   ├── monitor-manager/
│   │   └── animation-manager/
│   ├── assets/               # Images, videos, CSS
│   ├── templates/            # HTML templates
│   ├── main.ts              # Application entry point
│   ├── engine.ts            # Core engine
│   ├── clickables.ts        # Clickable elements
│   ├── canvas-animations.ts  # Canvas animations
│   └── state/               # State management
├── public/                  # Static assets
├── index.html              # Main HTML file
└── package.json
```

## 🎮 Navigation

The portfolio uses an interactive spaceship interface:

- **Space Scene**: Click on space elements (planets, satellites, etc.) to explore
- **Spaceship Interior**: Navigate through different sections using control panels
- **Control Buttons**: Access different content areas:
  - **Light Speed**: Fast navigation
  - **Projects**: Project showcase
  - **Work**: Professional experience
  - **Captain's Log**: Blog and updates
  - **coming-soon**: Special projects
  - **Bio**: Personal information

## Customization

### Adding Projects

Edit `src/data/projects.ts` to add new projects:

```typescript
export const PROJECTS = [
  {
    id: "project-id",
    title: "Project Title",
    description: "Project description",
    image: "path/to/image.webp",
    link: "https://project-url.com",
    technologies: ["Tech1", "Tech2"],
  },
  // ... more projects
];
```

### Modifying Space Elements

Update `src/data/clickables-data.ts` and `src/data/hoverables-data.ts` to modify interactive elements.

### Styling

Main styles are in `src/assets/css/main.css`. The project uses CSS custom properties for theming.

## Animation System

The project uses GSAP for animations with a manager-based architecture:

- **Animation Manager**: Coordinates all animations
- **Space Scene Manager**: Handles space element animations
- **Intro Manager**: Manages introduction sequences
- **Layout Manager**: Handles layout transitions

## 📱 Mobile Support

The portfolio is fully responsive with:

- Touch-friendly controls
- Adaptive layouts for portrait/landscape
- Optimized animations for mobile performance
- Mobile-specific spaceship interior overlay

## 🔧 Configuration

### Vite Config

The project uses standard Vite configuration. Modify `vite.config.ts` for custom build settings.

### TypeScript

TypeScript configuration is in `tsconfig.json`. The project uses strict type checking.

## Deployment

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Deploy to Static Hosting

The `dist/` folder can be deployed to any static hosting service:

- Netlify
- Vercel
- GitHub Pages
- AWS S3

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is private and unlicensed.

## Credits

- **Developed by**: Kevin McCarthy
- **Animations**: GSAP
- **Space Assets**: Custom created
- **Fonts**: Orbitron & Press Start 2P (Google Fonts)

#🐛 Issues

If you encounter any issues, please check:

- Browser compatibility (modern browsers recommended)
- JavaScript is enabled
- Console for any error messages

## Future Enhancements

- [ ] Add more interactive space elements
- [ ] Add sound effects
- [ ] Enhanced mobile gestures
- [ ] Performance optimizations

_Explore the digital cosmos and discover the universe of development possibilities!_
