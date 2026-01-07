'use client';

import { useContext } from 'react';

import { MatterContext } from '#site/providers/matterProvider';

import type { ClientSharedServerContext } from '#site/types';

export default () => useContext(MatterContext) as ClientSharedServerContext;
