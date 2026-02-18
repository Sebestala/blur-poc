import DemoPage from '@components/DemoPage/DemoPage';
import NoBlurImage from '@components/DemoImage/NoBlurImage';
import { buildDemoProps } from '@lib/pageProps';
import styles from '@styles/Plp.module.css';

export default function PlpNoBlur({ template, solution, speed, images }) {
  return (
    <DemoPage template={template} solution={solution} speed={speed}>
      <div className={styles.grid}>
        {images.map((img, i) => (
          <div key={img.uuid} className={styles.card}>
            <NoBlurImage
              src={img.fullSrc}
              alt={img.label}
              width={img.width}
              height={img.height}
              priority={i < 2}
            />
            <div className={styles.cardInfo}>
              <span className={styles.cardName}>Product Name</span>
              <span className={styles.cardPrice}>$1,290</span>
            </div>
          </div>
        ))}
      </div>
    </DemoPage>
  );
}

export const getServerSideProps = buildDemoProps('plp', 'no-blur');
