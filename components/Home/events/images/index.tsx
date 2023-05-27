import { useState, useEffect } from 'react';
import styles from './index.module.scss';
import type { FC } from 'react';

// update this data with new images
const images = [
  'claudio-speak.jpg',
  'room.jpg',
  'peoples.jpg',
  'teams.jpeg',
  'joe-speak.jpg',
  'matteo.jpg',
  'micheal-speak.jpg',
  'robin-kylie.jpg',
];

const EventsImages: FC = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(Math.floor(Math.random() * images.length));
    }, 5000);
    return () => clearInterval(interval);
  }, [currentImage]);

  const handleClick = () => {
    setCurrentImage(Math.floor(Math.random() * images.length));
  };

  return (
    <div className={styles.image} onClick={handleClick}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/static/images/events/openjs-world-2023/${images[currentImage]}`}
        alt="Event illustration image"
      />
    </div>
  );
};

export default EventsImages;
