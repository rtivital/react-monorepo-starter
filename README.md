# React Monorepo Starter

This project includes bare minimum configuration that you can use to work with react in monorepo. It includes workflow to work both with packages and apps (without ssr). All packages included by default are used for testing and showcasing, you can remove them safely after you finish playing around.

## Scripts

- **npm start** script:
  - `npm start @application/name` – start any application
  - `npm start @application/name -- --port 3000` – start application on port 3000
- **Storybook** script:
  - `npm run storybook` – start storybook with all packages and apps
  - `npm run storybook @package/name` – start storybook with specific package
  - `npm run storybook @package/first @package/second` – start storybook with specified list of packages
- **Build** script:
  - `npm run build @package/name` – build single package
  - `npm run build @package/first @package/second` – build list of packages
- **Syncpack** scripts:
  - `npm run syncpack:list` – list all used dependencies
  - `npm run syncpack:format` – format all package.json files
  - `npm run syncpack:mismatch` – list dependencies with different versions (e.g. react@16 and react@17 used in different packages) – can be used in precommit hook to check dependencies sync
  - `npm run syncpack:mismatch:fix` – update all dependencies listed by `npm run syncpack:mismatch` to highest used version

## Technical details and concepts

Since this is monorepo all building and starting scripts run from root and share the same webpack configuration. Packages and apps can be referred only by name defined in package.json.

### Workspcases

To work with monorepo you are required to use yarn, since it natively supports workspaces. Workspaces are defined in root package.json:

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

```js
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

### Managing dependencies

There are two approaches for managing dependencies in monorepo. You can combine both to reach desired behaviour.

#### Shared dependencies

- On **core** level: install all globally used dependencies: react, prop-types, classnames, etc. (All dependencies that are expected to use in each package). Install these dependencies as peers on **package** level.
- On **package** level: install package specific dependencies that are used only in this package.

This approach will allow you to quickly update shared dependencies without need to get through each package and updating versions.

#### Packages dependencies

- On **core** level do not install any package related dependencies.
- On **package** level install all package dependencies.

This approach is pretty heavy and hard to use but will allow you to fully manage versions of dependencies used in each package.

### Have questions?

Let's talk, I'm always open for discussion, please create an issue with your question.
