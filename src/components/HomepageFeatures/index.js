import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Free',
    svg: "/img/undraw_money.svg",
    description: (
      <>
        CloseVector is free to use for personal projects.
      </>
    ),
  },
  {
    title: 'Scalable',
    svg: "/img/undraw_rocket.svg",
    description: (
      <>
        CloseVector is built on top of cloudflare workers, which means it can scale to handle any amount of traffic.
      </>
    ),
  },
  {
    title: 'Extensible',
    svg: "/img/undraw_inspired.svg",
    description: (
      <>
        API is built to be extensible.
      </>
    ),
  },
];

function Feature({svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img src={svg} alt={title} className={styles.featureSvg} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
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
