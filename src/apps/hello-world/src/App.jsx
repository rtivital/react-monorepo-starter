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
