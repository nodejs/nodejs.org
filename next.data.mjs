import getLocalisationData from './scripts/next-data/getLocalisationData.mjs';
import getNodeVersionData from './scripts/next-data/getNodeVersionData.mjs';

const cachedNodeVersionData = getNodeVersionData();
const cachedLocalisationData = getLocalisationData();

const getNextData = async (content, { route }) => {
  const localisationData = await cachedLocalisationData(route);
  const nodeVersionData = await cachedNodeVersionData(route);

  return `
    // add the mdx file content
    ${content}

    export const getStaticProps = () => {
      // eval'd the function content
      ${localisationData}

      const i18nProps = getLocalisationData();
      const nodeVersionData = ${JSON.stringify(nodeVersionData)};

      return { props: { ...i18nProps, nodeVersionData } };
    }
  `;
};

export default getNextData;
