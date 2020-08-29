import React from 'react';
import Button from './Button';

export default {
  title: 'Button',
  component: Button,
};

const Template = args => <Button {...args} />;

export const GeneralUsage = Template.bind({});

GeneralUsage.args = {
  children: 'General usage',
};
