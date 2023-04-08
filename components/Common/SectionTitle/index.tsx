import styles from './index.module.scss';

interface Props {
  path: string[];
}

const SectionTitle = ({ path }: Props) => (
  <div className={styles.sectionTitle}>
    {path.map((item, index) => {
      const isLast = index === path.length - 1;

      if (isLast) {
        return (
          <span className={styles.active} key={item}>
            {item}
          </span>
        );
      }

      return `${item} / `;
    })}
  </div>
);

export default SectionTitle;
