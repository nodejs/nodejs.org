import type { Meta, StoryObj } from '@storybook/react';
import Banner from './';

const meta: Meta<typeof Banner> = {
  title: 'Banner',
  component: Banner,
};

export default meta;
type Story = StoryObj<typeof Banner>;

const startDate = new Date();
const endDate = new Date();
endDate.setDate(endDate.getDate() + 3);

export const WithText: Story = {
  args: {
    bannersIndex: {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      text: 'Banner Text',
      link: 'https://nodejs.org/en/',
      bannerBtnText: 'Read more',
    },
  },
};

export const WithHTML: Story = {
  args: {
    bannersIndex: {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      html: '<p>Banner HTML</p>',
      link: 'https://nodejs.org/en/',
    },
  },
};
