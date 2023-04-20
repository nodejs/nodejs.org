import { FormattedMessage } from 'react-intl';

type FooterProps = { className?: string };

// Note.: We don't expect to translate these items as we're going to replace with `nodejs/nodejs.dev` footer
const Footer = ({ className }: FooterProps) => (
  <>
    <a href="#" id="scroll-to-top">
      <span>
        &uarr; <FormattedMessage id="components.footer.scrollToTop.button" />
      </span>
    </a>
    <footer className={className}>
      <div className="container">
        <div className="openjsfoundation-footer">
          <p>
            Copyright <a href="https://openjsf.org">OpenJS Foundation</a> and
            Node.js contributors. All rights reserved. The{' '}
            <a href="https://openjsf.org">OpenJS Foundation</a> has registered
            trademarks and uses trademarks. For a list of trademarks of the{' '}
            <a href="https://openjsf.org">OpenJS Foundation</a>, please see our{' '}
            <a href="https://trademark-policy.openjsf.org">Trademark Policy</a>{' '}
            and <a href="https://trademark-list.openjsf.org">Trademark List</a>.
            Trademarks and logos not indicated on the{' '}
            <a href="https://trademark-list.openjsf.org">
              list of OpenJS Foundation trademarks
            </a>{' '}
            are trademarks&trade; or registered&reg; trademarks of their
            respective holders. Use of them does not imply any affiliation with
            or endorsement by them.
          </p>
          <p className="openjsfoundation-footer-links">
            <a href="https://openjsf.org">The OpenJS Foundation</a>
            &nbsp;|&nbsp;
            <a href="https://terms-of-use.openjsf.org">Terms of Use</a>
            &nbsp;|&nbsp;
            <a href="https://privacy-policy.openjsf.org">Privacy Policy</a>
            &nbsp;|&nbsp;
            <a href="https://bylaws.openjsf.org">Bylaws</a>&nbsp;|&nbsp;
            <a href="https://code-of-conduct.openjsf.org">Code of Conduct</a>
            &nbsp;|&nbsp;
            <a href="https://trademark-policy.openjsf.org">Trademark Policy</a>
            &nbsp;|&nbsp;
            <a href="https://trademark-list.openjsf.org">Trademark List</a>
            &nbsp;|&nbsp;
            <a href="https://www.linuxfoundation.org/cookies">Cookie Policy</a>
          </p>
          <div className="openjsfoundation-footer-edit"></div>
        </div>
      </div>
    </footer>
  </>
);

export default Footer;
