'use client';

import { use } from 'react';

import { MatterContext } from '#site/providers/matterProvider';

import type { ClientSharedServerContext } from '#site/types';

export default () => use(MatterContext) as ClientSharedServerContext;
