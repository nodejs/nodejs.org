import Image from 'next/image';
import figma from './figma.svg';
import styles from './color.module.scss';
import type { FC } from 'react';

const BrandColor: FC = () => (
  <>
    <h1>Brand Color</h1>
    <div className={styles.container}>
      <div>
        <h2>Color from variable</h2>
        <div className={styles.colors}>
          <div className={styles.color}>
            <div className="bg-green-100" />
            <div className="bg-green-200" />
            <div className="bg-green-300" />
            <div className="bg-green-400" />
            <div className="bg-green-600" />
            <div className="bg-green-700" />
            <div className="bg-green-800" />
            <div className="bg-green-900" />
          </div>
          <div className={styles.color}>
            <div className="bg-neutral-100" />
            <div className="bg-neutral-200" />
            <div className="bg-neutral-300" />
            <div className="bg-neutral-400" />
            <div className="bg-neutral-600" />
            <div className="bg-neutral-700" />
            <div className="bg-neutral-800" />
            <div className="bg-neutral-900" />
          </div>
          <div className={styles.color}>
            <div className="bg-danger-100" />
            <div className="bg-danger-200" />
            <div className="bg-danger-300" />
            <div className="bg-danger-400" />
            <div className="bg-danger-600" />
            <div className="bg-danger-700" />
            <div className="bg-danger-800" />
            <div className="bg-danger-900" />
          </div>
          <div className={styles.color}>
            <div className="bg-warning-100" />
            <div className="bg-warning-200" />
            <div className="bg-warning-300" />
            <div className="bg-warning-400" />
            <div className="bg-warning-600" />
            <div className="bg-warning-700" />
            <div className="bg-warning-800" />
            <div className="bg-warning-900" />
          </div>
          <div className={styles.color}>
            <div className="bg-info-100" />
            <div className="bg-info-200" />
            <div className="bg-info-300" />
            <div className="bg-info-400" />
            <div className="bg-info-600" />
            <div className="bg-info-700" />
            <div className="bg-info-800" />
            <div className="bg-info-900" />
          </div>
          <div className={styles.color}>
            <div className="bg-accent1-100" />
            <div className="bg-accent1-200" />
            <div className="bg-accent1-300" />
            <div className="bg-accent1-400" />
            <div className="bg-accent1-600" />
            <div className="bg-accent1-700" />
            <div className="bg-accent1-800" />
            <div className="bg-accent1-900" />
          </div>
          <div className={styles.color}>
            <div className="bg-accent2-100" />
            <div className="bg-accent2-200" />
            <div className="bg-accent2-300" />
            <div className="bg-accent2-400" />
            <div className="bg-accent2-600" />
            <div className="bg-accent2-700" />
            <div className="bg-accent2-800" />
            <div className="bg-accent2-900" />
          </div>
          <div className={styles.color}>
            <div className="bg-white" />
            <div className="bg-black" />
          </div>
        </div>
      </div>
      <div>
        <h2>Display from figma</h2>
        <Image src={figma} alt="figma" width={500} height={500} />
      </div>
    </div>
  </>
);

export default BrandColor;
