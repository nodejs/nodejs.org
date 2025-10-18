'use server';

import StatelessSelect from '@node-core/ui-components/Common/Select/StatelessSelect';
import type { ComponentProps, FC } from 'react';

import Link from '#site/components/Link';
import provideReleaseData from '#site/next-data/providers/releaseData';
import type { NodeRelease } from '#site/types';
import { STATUS_ORDER } from '#site/util/download';

type Navigations = Record<string, Array<{ label: string; value: string }>>;

/**
 * Generates the navigation links for the Node.js download archive
 * It creates a list of links for each major release, grouped by status,
 * formatted with the major version and codename if available.
 */
const groupReleasesByStatus = (releases: Array<NodeRelease>) => {
  const groupedByStatus = releases.reduce((acc, release) => {
    const { status, major, codename, versionWithPrefix } = release;

    if (!acc[status]) {
      acc[status] = [];
    }

    acc[status].push({
      label: `Node.js v${major}.x ${codename ? `(${codename})` : ''}`,
      value: `/download/archive/${versionWithPrefix}`,
    });

    return acc;
  }, {} as Navigations);

  return STATUS_ORDER.filter(status => groupedByStatus[status]).map(status => ({
    label: status,
    items: groupedByStatus[status],
  }));
};

type WithReleaseSelectProps = Omit<
  ComponentProps<typeof StatelessSelect>,
  'values' | 'as'
>;

const WithReleaseSelect: FC<WithReleaseSelectProps> = async ({ ...props }) => {
  const releaseData = await provideReleaseData();
  const navigation = groupReleasesByStatus(releaseData);

  return (
    <StatelessSelect
      {...props}
      values={navigation}
      as={Link}
      className="w-full md:w-64"
      ariaLabel={props.defaultValue}
    />
  );
};

export default WithReleaseSelect;
