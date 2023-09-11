import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import Link from 'next/link';
import type { ComponentProps, FC, PropsWithChildren } from 'react';
import styles from './index.module.scss';
import { component } from '@/types/component';
import classNames from 'classnames';

type BadgeProps = {
  kind?: component;
  badgeText?: string;
} & ComponentProps<typeof Link>;

const Badge: FC<PropsWithChildren<BadgeProps>> = ({
  kind,
  badgeText,
  children,
  ...args
}) => {
  if (typeof kind === 'undefined') kind = component.Default;
  const iconClasses = classNames(styles.icon, {
    [styles.iconWarning]: kind === component.Warning,
    [styles.iconError]: kind === component.Error,
    [styles.iconGreen]: kind === component.Default,
  });

  const wrapperClasses = classNames(styles.wrapper, {
    [styles.wrapperWarning]: kind === component.Warning,
    [styles.wrapperError]: kind === component.Error,
    [styles.wrapperGreen]: kind === component.Default,
  });

  const badgeClasses = classNames(styles.badge, {
    [styles.badgeWarning]: kind === component.Warning,
    [styles.badgeError]: kind === component.Error,
    [styles.badgeGreen]: kind === component.Default,
  });

  const contentClasses = classNames(styles.content, {
    [styles.contentWarning]: kind === component.Warning,
    [styles.contentError]: kind === component.Error,
    [styles.contentGreen]: kind === component.Default,
  });

  return (
    <Link {...args}>
      <div className={wrapperClasses}>
        {badgeText && <span className={badgeClasses}>{badgeText}</span>}
        <span className={contentClasses}>{children}</span>
        <ArrowRightIcon className={iconClasses} />
      </div>
    </Link>
  );
};

export default Badge;
