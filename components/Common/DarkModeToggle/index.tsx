import { useTheme } from 'next-themes';
import { useIntl } from 'react-intl';
import { MdLightMode, MdNightlight } from 'react-icons/md';
import styles from './index.module.scss';

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();

  const intl = useIntl();

  const isDark = theme === 'dark';

  const toggleTheme = (isKeyPress?: boolean) => {
    if (isKeyPress) {
      return;
    }

    setTheme(isDark ? 'light' : 'dark');
  };

  const ariaLabelText = intl.formatMessage({
    id: 'components.header.buttons.toggleDarkMode',
  });

  return (
    <button
      type="button"
      className={styles.darkModeToggle}
      onClick={() => toggleTheme()}
      onKeyDown={() => toggleTheme(true)}
      aria-pressed={isDark}
      aria-label={ariaLabelText}
    >
      <MdNightlight className="light-mode-only" />
      <MdLightMode className="dark-mode-only" />
    </button>
  );
};

export default DarkModeToggle;
