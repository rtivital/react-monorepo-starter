import React from 'react';
import Text from './Text';

export default {
  title: 'Text',
  component: Text,
};

const Template = args => <Text {...args} />;

export const GeneralUsage = Template.bind({});

GeneralUsage.args = {
  children: 'General usage',
};
