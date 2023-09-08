import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import Link from 'next/link';
import type { ComponentProps, FC, PropsWithChildren } from 'react';
import styles from './index.module.scss';
import { component } from '@/types/component';
import classNames from 'classnames';

type BadgeProps = {
  kind?: component;
  badgeText?: string;
  children?: string;
} & ComponentProps<typeof Link>;

const Badge: FC<PropsWithChildren<BadgeProps>> = ({
  kind,
  badgeText,
  children,
  ...others
}) => {
  if (typeof kind === 'undefined') kind = component.Default;

  const iconClasses = classNames(styles['badge--icon'], {
    [styles['badge--icon-warning']]: kind === component.Warning,
    [styles['badge--icon-error']]: kind === component.Error,
    [styles['badge--icon-green']]: kind === component.Default,
  });

  return (
    <Link {...others}>
      <Wrapper kind={kind}>
        {badgeText && <Tag kind={kind}>{badgeText}</Tag>}
        <Content kind={kind}>{children}</Content>
        <ArrowRightIcon className={iconClasses} />
      </Wrapper>
    </Link>
  );
};

type WrapperProps = {
  kind?: component;
};

const Wrapper: FC<PropsWithChildren<WrapperProps>> = ({ children, kind }) => {
  const classList = classNames(styles['badge--wrapper'], {
    [styles['badge--wrapper-warning']]: kind === component.Warning,
    [styles['badge--wrapper-error']]: kind === component.Error,
    [styles['badge--wrapper-green']]: kind === component.Default,
  });

  return <div className={classList}>{children}</div>;
};

type TagProps = {
  kind?: component;
};

const Tag: FC<PropsWithChildren<TagProps>> = ({ children, kind }) => {
  const classList = classNames(styles['badge--tag'], {
    [styles['badge--tag-warning']]: kind === component.Warning,
    [styles['badge--tag-error']]: kind === component.Error,
    [styles['badge--tag-green']]: kind === component.Default,
  });

  return <span className={classList}>{children}</span>;
};

type ContentProps = {
  kind?: component;
};

const Content: FC<PropsWithChildren<ContentProps>> = ({ children, kind }) => {
  const classList = classNames(styles['badge--content'], {
    [styles['badge--content-warning']]: kind === component.Warning,
    [styles['badge--content-error']]: kind === component.Error,
    [styles['badge--content-green']]: kind === component.Default,
  });

  return <span className={classList}>{children}</span>;
};

export default Badge;
