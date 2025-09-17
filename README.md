# Simple debt market Frontend Application

## ENVIRONMENT VARIABLES
- Create local `.env` file (is added to the `.gitignore` file)
- Fill up the `.env` according to `.env.template` file
- If you need to add new environment variable remember about describing it in `.env.template` file

## How to install and run the project

`pnpm install` - install all dependencies
`pnpm dev` - run vite dev server

## How to build the application

`pnpm build` - build the application

## Linter and prettier

`pnpm lint:check` - check code with linter
`pnpm lint:fix` - resolve problems which can be fixed automatically

`pnpm prettier:check` - check code with prettier
`pnpm prettier:format` - resolve problems which can be fixed automatically

It's recommended to connect prettier and linter with IDE to fix some problems automatically `on save` action.

## Repo structure and naming convention

- `src/` - workspace app
    - `assets` - extra assets required to use inside components - images for example
    - `componets` - reusable components which create views and app
    - `styles` - global styles for app
    - _(optional)_ `hooks` - custom React hooks for app
    - _(optional)_ `views` - directory to place views which create application and include reusable components

All directories and files should be named using `kebab-case` convention.

`PascalCase` convention should be used for component names and Typescript types. 
Constants should be named using `UPPER_CASE`.

## Component structure

In the main component file, we try to preserve a following structure:

1. Hook calls
2. Derived state
3. Event handlers
4. Conditional returns
