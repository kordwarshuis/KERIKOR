import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {useAllDocsData} from '@docusaurus/plugin-content-docs/client';

function Sitemap() {
  const allDocsData = useAllDocsData();
  const docs = Object.values(allDocsData)
    .flatMap((pluginData) => pluginData.versions)
    .flatMap((version) =>
      version.docs.map((doc) => ({
        title: doc.title || doc.id,
        permalink: doc.permalink,
      })),
    )
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <Layout title="Sitemap" description="Human-readable sitemap for KERIKOR">
      <main className="container margin-vert--lg">
        <h1>Sitemap</h1>
        <p>
          This human-readable sitemap lists the documentation pages available on the
          site.
        </p>

        {docs.length > 0 ? (
          <section>
            <h2>Docs</h2>
            <ul>
              {docs.map((doc) => (
                <li key={doc.permalink}>
                  <Link to={doc.permalink}>{doc.title}</Link>
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <p>No documentation pages are available.</p>
        )}
      </main>
    </Layout>
  );
}

export default Sitemap;
