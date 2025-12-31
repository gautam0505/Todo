## 👨‍💻 Installation

To install and run the project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/gautam0505/Todo.git
```

2. Navigate to the project directory:

```bash
cd Todo
```

3. Install the dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

The app will now be running at [http://localhost:5173/](http://localhost:5173/).

>

## 🌳 Project Structure

The folder structure for this project is as follows:

```
.
├── .github/
│   └── workflows/
│       └── ci.yml          # GitHub Actions CI workflow
├── node_modules/           # Project dependencies
├── src/
│   ├── components/
│   │   ├── settings/
│   │   │   ├── tabs/
│   │   │   │   ├── AppearanceTab.tsx
│   │   │   │   └── GithubTab.tsx
│   │   │   ├── settings.styled.ts
│   │   │   └── SettingsDialog.tsx
│   │   └── index.ts
│   ├── contexts/
│   │   └── UserContext.tsx
│   └── hooks/
│       └── useResponsiveDisplay.ts
├── .npmrc                  # npm configuration
├── README.md               # This file
├── index.html
├── package.json
├── package-lock.json
└── tsconfig.json
```
