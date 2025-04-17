// We import this file before the root setup.mjs, so React is not automatically imported
import * as React from 'react';

import { mock } from 'node:test';

import '../../../tests/setup.mjs';

mock.module('next-intl', {
  namedExports: {
    useTranslations: () => key => key,

    useFormatter: () => {
      const formatWith = format => new Intl.DateTimeFormat('en-US', format);
      return {
        date: (date, format) => formatWith(format).format(date),
        dateTime: (date, format) => formatWith(format).format(date),
      };
    },
  },
});

mock.module('next-intl/navigation', {
  namedExports: {
    createNavigation: () => ({
      Link: props => <a {...props} onClick={e => e.preventDefault()} />,
    }),
  },
});
