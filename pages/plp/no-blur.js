import DemoPage from '@components/DemoPage/DemoPage';
import NoBlurImage from '@components/DemoImage/NoBlurImage';
import { buildDemoProps } from '@lib/pageProps';
import styles from '@styles/Plp.module.css';

export default function PlpNoBlur({ template, solution, speed, images }) {
  return (
    <DemoPage template={template} solution={solution} speed={speed}>
      <div className={styles.grid}>
        {images.map((img, i) => (
          <div key={`${img.uuid}-${i}`} className={styles.card}>
            <NoBlurImage
              src={img.fullSrc}
              alt={img.label}
              width={img.width}
              height={img.height}
              priority={i < 4}
            />
            <div className={styles.cardInfo}>
              <span className={styles.cardName}>{img.name || 'Product'}</span>
              <span className={styles.cardPrice}>${img.price || '990'}</span>
            </div>
          </div>
        ))}
      </div>
    </DemoPage>
  );
}

export const getServerSideProps = buildDemoProps('plp', 'no-blur');
