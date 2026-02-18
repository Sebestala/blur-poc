import Head from 'next/head';
import CompatBadge from '@components/CompatBadge/CompatBadge';
import LcpMeasure from '@components/LcpMeasure/LcpMeasure';
import { SOLUTION_CONFIG, TEMPLATE_CONFIG } from '@lib/images';
import styles from './DemoPage.module.css';

export default function DemoPage({ template, solution, speed, children }) {
  const solutionLabel = SOLUTION_CONFIG[solution]?.label || solution;
  const templateLabel = TEMPLATE_CONFIG[template]?.label || template;

  return (
    <>
      <Head>
        <title>{`${solutionLabel} - ${templateLabel} | Blur POC`}</title>
      </Head>

      <div className={styles.pageHeader}>
        <h1 className={styles.title}>
          {templateLabel}
        </h1>
        <div className={styles.subtitle}>
          <span className={styles.solutionName}>{solutionLabel}</span>
          <CompatBadge solution={solution} />
          {speed !== 'fast' && (
            <span className={styles.speedBadge}>
              {speed === '3g' ? '3G' : 'Slow 3G'} simulation
            </span>
          )}
        </div>
        <p className={styles.description}>
          {solution === 'no-blur' && 'Standard image loading with grey placeholder background. LCP = full image load time.'}
          {solution === 'native-blur' && 'Next.js Image with placeholder="blur" and tiny blurDataURL (~10px). UX improvement but LCP unchanged.'}
          {solution === 'custom-blur' && 'Low-quality full-size placeholder with CSS blur. The blur IS the LCP element (~90% lighter than full image).'}
        </p>
      </div>

      <div className={styles.demoArea}>
        {children}
      </div>

      <LcpMeasure template={template} solution={solution} speed={speed} />
    </>
  );
}
