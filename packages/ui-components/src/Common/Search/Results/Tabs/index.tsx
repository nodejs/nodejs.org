import { FacetTabs } from '@orama/ui/components';
import classNames from 'classnames';
import type { ComponentProps, FC } from 'react';

import styles from './index.module.css';

type TabsProps = Omit<
  ComponentProps<typeof FacetTabs.Item>,
  'group' | 'filterBy'
> & {
  selectedFacet?: string | null;
  searchTerm?: string | null;
};

const Tabs: FC<TabsProps> = ({ selectedFacet, ...props }) => (
  <FacetTabs.Wrapper className={styles.facetTabsWrapper}>
    <FacetTabs.List className={styles.facetTabsList}>
      {(group, isSelected) => (
        <FacetTabs.Item
          {...props}
          isSelected={group.name === selectedFacet}
          group={group}
          filterBy="siteSection"
          className={classNames(
            isSelected && styles.facetTabItemSelected,
            styles.facetTabItem
          )}
        >
          {group.name}
          <span className={styles.facetTabItemCount}>({group.count})</span>
        </FacetTabs.Item>
      )}
    </FacetTabs.List>
  </FacetTabs.Wrapper>
);

export default Tabs;
