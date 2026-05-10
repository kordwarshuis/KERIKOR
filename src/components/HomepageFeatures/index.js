import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Key Event Receipt Infrastructure',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        KERI delivers secure, verifiable identity using self-certifying keys and
        event logs, enabling decentralized agents to authenticate state changes
        without centralized trust.
      </>
    ),
  },
  {
    title: 'Self-Sovereign Identity',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Build identities that rotate keys, prove ownership, and interoperate across
        ecosystems while keeping control with the key owner, not a third party.
      </>
    ),
  },
  {
    title: 'Composable Credential Flows',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Create rich trust architectures with workflows for issuance, rotation,
        delegation, and verification using KERI&apos;s event-driven architecture.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
