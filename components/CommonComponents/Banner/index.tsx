import React, { useMemo } from 'react';
import { sanitize } from 'isomorphic-dompurify';
import { dateIsBetween } from '../../../util/dateIsBetween';
import { isAbsoluteUrl } from '../../../util/isAbsoluteUrl';
import styles from './index.module.scss';
import { WebsiteBanner } from '../../../types';

export interface BannerProps {
  bannersIndex: WebsiteBanner;
}

const useTextContent = ({ text, link, bannerBtnText }: WebsiteBanner) =>
  useMemo(() => {
    if (text) {
      return (
        <p>
          <a href={link} target="_blank" rel="noopener noreferrer">
            <button type="button">{bannerBtnText || 'Read More'}</button>
          </a>
          {text}
        </p>
      );
    }

    return null;
  }, [text, link, bannerBtnText]);

const useHtmlContent = ({ html, link }: WebsiteBanner) =>
  useMemo(() => {
    if (html) {
      const sanitizedHtml = sanitize(html);

      return (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />
      );
    }

    return null;
  }, [html, link]);

const Banner = ({ bannersIndex }: BannerProps) => {
  const showBanner = dateIsBetween(
    bannersIndex.startDate,
    bannersIndex.endDate
  );

  const link = !isAbsoluteUrl(bannersIndex.link)
    ? `http://nodejs.org/${bannersIndex.link}`
    : bannersIndex.link;

  const textContent = useTextContent({ ...bannersIndex, link });
  const htmlContent = useHtmlContent({ ...bannersIndex, link });

  if (showBanner) {
    return (
      <div className={styles.banner}>
        {bannersIndex.text ? textContent : htmlContent}
      </div>
    );
  }

  return null;
};

export default Banner;
