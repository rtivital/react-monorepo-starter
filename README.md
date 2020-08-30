# React Monorepository Starter

This project includes basic configuration that you can use to work with react in monorepository.

## Scripts

- `npm start @application/name` – start any application
  - `npm start @application/name -- --port 3000` – start application on port 3000
- `npm run storybook` – start storybook with all packages and apps
  - `npm run storybook @package/name` – start storybook with specific package
  - `npm run storybook @package/first @package/second` – start storybook with specificified list of packages
