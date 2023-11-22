'use client';

import type { FC } from 'react';

const ErrorPage: FC<{ error: Error }> = ({ error }) => (
  <div className="container">
    <h2>500: Internal Server Error</h2>
    <h3>This Page has thrown a non-recoverable Error</h3>
    <small>
      Details: <br />
      <pre>
        <code>${error.message}</code>
      </pre>
    </small>
  </div>
);

export default ErrorPage;
