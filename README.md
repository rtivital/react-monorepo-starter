# React Monorepository Starter

This project includes bare minimum configuration that you can use to work with react in monorepository. It includes workflow to work both with packages and apps (without ssr). All packages included by default are used for testing and showcasing, you can remove them safely arter you fininish playing around.

## Scripts

- **npm start** script:
  - `npm start @application/name` – start any application
  - `npm start @application/name -- --port 3000` – start application on port 3000
- **Storybook** script:
  - `npm run storybook` – start storybook with all packages and apps
  - `npm run storybook @package/name` – start storybook with specific package
  - `npm run storybook @package/first @package/second` – start storybook with specificified list of packages
- **Build** script:
  - `npm run build @package/name` – build single package
  - `npm run build @package/first @package/second` – build list of packages

## Technical details and concepts

Since this is monorepository all building and starting scripts run from root and share the same webpack configuration. Packages and apps can be referred only by name defined in package.json.

### Workspcases

To work with monorepository you are required to use yarn, since it natively supports workspaces. Workspcases are defined in root package.json:

```js
// ...
"workspaces": [
  "src/packages/*",
  "src/apps/*"
],
// ...
```

### Packages scope

It is a good idea to use the same scope (`@scope/`) for each package in monorepo to easily identify packages. Although it is not required and packages can use names that include different scopes or no scope at all.

### Aliases

Any package can refer to other package using webpack aliases that are automatically generated. Packages and apps aliases resolve src directory of corresponding package.

```jsx
// example with included @monorepo/hello-world app
import React from 'react';
import { Text } from '@monorepo/typography';
import Button from '@monorepo/ui/Button/Button';

export default function App() {
  return (
    <div>
      <Text style={{ marginBottom: 20 }}>Welcome to monorepo starter</Text>
      <Button>Hello</Button>
    </div>
  );
}
```
