import Banner from './index';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof Banner>;
type Meta = MetaObj<typeof Banner>;

const addDaysToDate = (numDays: number, date: Date) => {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + numDays);
  return newDate;
};

// Create mock start and end dates as Banner Component renders
// only if end date is on or after today's date
const startDate = new Date();
const endDate = addDaysToDate(3, startDate);

export const WithText: Story = {
  args: {
    bannersIndex: {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      text: 'Banner Text',
      link: 'https://nodejs.org/en/',
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

export const WithHTMLImage: Story = {
  args: {
    bannersIndex: {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      html: '<img src="/static/images/nodejs-training.png" alt="Banner Image" />',
      link: 'https://nodejs.org/en/',
    },
  },
};

export default { component: Banner } as Meta;
