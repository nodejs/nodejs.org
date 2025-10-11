import type { FC } from 'react';

import Button from '#site/components/Common/Button';
import Turtle from '#site/components/Common/Turtle';
import BaseLayout from '#site/layouts/Base';
import GlowingBackdropLayout from '#site/layouts/GlowingBackdrop';

const NotFoundPage: FC = () => (
  <html>
    <body>
      <BaseLayout>
        <GlowingBackdropLayout kind="default">
          <span>404</span>

          <h1 className="special -mt-4 text-center">Page could not be found</h1>

          <div className="my-4 flex h-[150px] items-center justify-center md:h-[300px]">
            <Turtle />
          </div>

          <p className="-mt-4 max-w-sm text-center text-lg">
            Sorry, we couldn't find the page you're after! Try starting again
            from the homepage.
          </p>

          <Button href="/">Back to Home</Button>
        </GlowingBackdropLayout>
      </BaseLayout>
    </body>
  </html>
);

export default NotFoundPage;
