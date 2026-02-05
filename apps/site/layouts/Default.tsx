import Article from '@node-core/ui-components/Containers/Article';

import WithBreadcrumbs from '#site/components/withBreadcrumbs';
import WithFooter from '#site/components/withFooter';
import WithNavBar from '#site/components/withNavBar';
import WithSidebar from '#site/components/withSidebar';
import WithSidebarCrossLinks from '#site/components/withSidebarCrossLinks';
import WithTOC from '#site/components/withTOC';

import type { NavigationKeys } from '../types';
import type { FC, PropsWithChildren } from 'react';

type DefaultLayoutProps = {
  navKeys?: Array<NavigationKeys>;
  showBreadcrumbs?: boolean;
};

const DefaultLayout: FC<PropsWithChildren<DefaultLayoutProps>> = ({
  children,
  navKeys = [],
  showBreadcrumbs = false,
}) => (
  <>
    <WithNavBar />

    <Article>
      <WithSidebar navKeys={navKeys} />

      <div>
        <WithTOC />

        <main id="main" tabIndex={-1}>
          {children}
        </main>
      </div>

      {showBreadcrumbs && <WithBreadcrumbs navKeys={navKeys} />}
    </Article>

    <WithFooter />
  </>
);

export default DefaultLayout;

export const AboutPageLayout: FC<PropsWithChildren> = props => (
  <DefaultLayout
    navKeys={['about', 'getInvolved']}
    showBreadcrumbs={true}
    {...props}
  />
);

export const LearnPageLayout: FC<PropsWithChildren> = ({ children }) => (
  <DefaultLayout navKeys={['learn']} showBreadcrumbs={true}>
    {children}
    <WithSidebarCrossLinks navKey="learn" />
  </DefaultLayout>
);
