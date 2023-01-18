import { FormattedMessage } from 'react-intl';
import Link from 'next/link';

type FooterProps = { className?: string };

// Note.: We don't expect to translate these items as we're going to replace with `nodejs/nodejs.dev` footer
const Footer = ({ className }: FooterProps) => (
  <>
    <Link href="#" id="scroll-to-top">
      <span>
        &uarr; <FormattedMessage id="components.footer.scrollToTop.button" />
      </span>
    </Link>
    <footer className={className}>
      <div className="container">
        <div className="openjsfoundation-footer">
          <p>
            Copyright <Link href="https://openjsf.org">OpenJS Foundation</Link>{' '}
            and Node.js contributors. All rights reserved. The{' '}
            <Link href="https://openjsf.org">OpenJS Foundation</Link> has
            registered trademarks and uses trademarks. For a list of trademarks
            of the <Link href="https://openjsf.org">OpenJS Foundation</Link>,
            please see our{' '}
            <Link href="https://trademark-policy.openjsf.org">
              Trademark Policy
            </Link>{' '}
            and{' '}
            <Link href="https://trademark-list.openjsf.org">
              Trademark List
            </Link>
            . Trademarks and logos not indicated on the{' '}
            <Link href="https://trademark-list.openjsf.org">
              list of OpenJS Foundation trademarks
            </Link>{' '}
            are trademarks&trade; or registered&reg; trademarks of their
            respective holders. Use of them does not imply any affiliation with
            or endorsement by them.
          </p>
          <p className="openjsfoundation-footer-links">
            <Link href="https://openjsf.org">The OpenJS Foundation</Link>
            &nbsp;|&nbsp;
            <Link href="https://terms-of-use.openjsf.org">Terms of Use</Link>
            &nbsp;|&nbsp;
            <Link href="https://privacy-policy.openjsf.org">
              Privacy Policy
            </Link>
            &nbsp;|&nbsp;
            <Link href="https://bylaws.openjsf.org">Bylaws</Link>&nbsp;|&nbsp;
            <Link href="https://code-of-conduct.openjsf.org">
              Code of Conduct
            </Link>
            &nbsp;|&nbsp;
            <Link href="https://trademark-policy.openjsf.org">
              Trademark Policy
            </Link>
            &nbsp;|&nbsp;
            <Link href="https://trademark-list.openjsf.org">
              Trademark List
            </Link>
            &nbsp;|&nbsp;
            <Link href="https://www.linuxfoundation.org/cookies">
              Cookie Policy
            </Link>
          </p>
          <div className="openjsfoundation-footer-edit"></div>
        </div>
      </div>
    </footer>
  </>
);

export default Footer;
