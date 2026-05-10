import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'KERI',
    Svg: require('@site/static/img/keri.svg').default,
    description: (
      <>
        Key Event Receipt Infrastructure
      </>
    ),
  },
  {
    title: 'ACDC',
    Svg: require('@site/static/img/acdc.svg').default,
    description: (
      <>
        Authentic Chained Data Container
      </>
    ),
  },
  {
    title: 'CESR',
    Svg: require('@site/static/img/cesr.svg').default,
    description: (
      <>
        Composable Event Streaming Representation
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
