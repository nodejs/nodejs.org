import Footer from './index';
import type { Meta as MetaObj } from '@storybook/react';

type Meta = MetaObj<typeof Footer>;

export const Default = () => <Footer />;

export default {
  title: 'New Layout/Footer',
  component: Footer,
} as Meta;
