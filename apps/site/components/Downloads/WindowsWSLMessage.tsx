'use client';

import { useContext } from 'react';

import { ReleaseContext } from '#site/providers/releaseProvider';

import WSLMessage from './WSLMessage';

const WindowsWSLMessage = () => {
  const { os } = useContext(ReleaseContext);
  // consitioms to chekc ifo the operating system is selcted as Linux or not
  if (os !== 'WIN') return null;
  return <WSLMessage />;
};

export default WindowsWSLMessage;
