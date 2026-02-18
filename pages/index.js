import Head from 'next/head';
import styles from '@styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>Blur Image Placeholder POC - Kering Web Performance</title>
      </Head>

      <div className={styles.container}>
        <h1 className={styles.title}>Blur Image Placeholder POC</h1>
        <p className={styles.subtitle}>
          Kering Web Performance - Compare 3 image loading strategies across Hero, PLP, and PDP templates
        </p>

        {/* Solutions */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>The 3 Solutions</h2>
          <div className={styles.solutionsGrid}>
            <div className={styles.solutionCard}>
              <div className={styles.solutionNumber}>Solution 1</div>
              <div className={styles.solutionName}>No Blur (Current State)</div>
              <p className={styles.solutionDesc}>
                Standard image loading with a grey background placeholder.
                The user sees nothing until the full image is downloaded.
              </p>
              <div className={styles.solutionMeta}>
                <span>LCP = full image load time</span>
                <span>Platforms: All (Next.js + SFCC)</span>
              </div>
            </div>

            <div className={styles.solutionCard}>
              <div className={styles.solutionNumber}>Solution 2</div>
              <div className={styles.solutionName}>Native Next.js Blur</div>
              <p className={styles.solutionDesc}>
                Uses Next.js Image component with placeholder="blur" and a tiny
                base64 blurDataURL (~10px). Better UX but the placeholder is too
                small to be considered as LCP by the browser.
              </p>
              <div className={styles.solutionMeta}>
                <span>LCP = full image load time (unchanged)</span>
                <span>Platforms: Next.js only (AMQ, YSL)</span>
              </div>
            </div>

            <div className={styles.solutionCard}>
              <div className={styles.solutionNumber}>Solution 3</div>
              <div className={styles.solutionName}>Custom Blur (LCP-optimized)</div>
              <p className={styles.solutionDesc}>
                Low-quality image at full display size with CSS blur filter.
                The browser considers this placeholder as the LCP element because
                it has enough pixels. ~90% lighter than the full image.
              </p>
              <div className={styles.solutionMeta}>
                <span>LCP = blur placeholder load time (fast)</span>
                <span>Platforms: All (Next.js + SFCC)</span>
              </div>
            </div>
          </div>
        </section>

        {/* How to use */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>How to Use</h2>
          <ol className={styles.howToList}>
            <li>Select a template (Hero, PLP, or PDP) from the header navigation</li>
            <li>Switch between solutions (S1, S2, S3) to compare visual loading experience</li>
            <li>Change the network speed (Fast, 3G, Slow 3G) to see the impact on slower connections</li>
            <li>For S3, try different transitions (Fade, Blur-to-Sharp, Cross-fade)</li>
            <li>Watch the LCP badge (bottom right) to see measured performance</li>
            <li>Visit the Results page to compare all LCP measurements</li>
          </ol>
        </section>

        {/* Navigation grid */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Demo Pages</h2>
          <div className={styles.navGrid}>
            <div className={styles.navHeader}>S1 - No Blur</div>
            <div className={styles.navHeader}>S2 - Native Blur</div>
            <div className={styles.navHeader}>S3 - Custom Blur</div>

            <a href="/hero/no-blur" className={styles.navLink}>Hero Banner</a>
            <a href="/hero/native-blur" className={styles.navLink}>Hero Banner</a>
            <a href="/hero/custom-blur" className={styles.navLink}>Hero Banner</a>

            <a href="/plp/no-blur" className={styles.navLink}>PLP Grid</a>
            <a href="/plp/native-blur" className={styles.navLink}>PLP Grid</a>
            <a href="/plp/custom-blur" className={styles.navLink}>PLP Grid</a>

            <a href="/pdp/no-blur" className={styles.navLink}>PDP</a>
            <a href="/pdp/native-blur" className={styles.navLink}>PDP</a>
            <a href="/pdp/custom-blur" className={styles.navLink}>PDP</a>
          </div>
        </section>

        {/* Technical note */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Technical Note - BPP Threshold</h2>
          <p className={styles.solutionDesc}>
            Chrome ignores images that are too small or too low-entropy for LCP measurement.
            An image must have at least 0.05 BPP (bits per pixel) to qualify as an LCP candidate.
            Additionally, Chrome applies an upscaling penalty: a 10px image displayed at 1440px
            gets its effective area reduced to near-zero and will never be the LCP element.
            This is why S2 (native blur with tiny blurDataURL) does not improve LCP, while
            S3 (full-size low-quality image) does.
          </p>
        </section>
      </div>
    </>
  );
}
