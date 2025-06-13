'use client';

import { useContext } from 'react';

import { ReleaseContext } from '#site/providers/releaseProvider';

import WSLMessage from './WSLMessage';

const WindowsWSLMessage = () => {
  const { os } = useContext(ReleaseContext);
  // conditions to check if the operating system is selected as Windows or not 
  if (os !== 'WIN') return null;
  return <WSLMessage />;
};

export default WindowsWSLMessage;
