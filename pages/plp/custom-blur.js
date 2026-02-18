import DemoPage from '@components/DemoPage/DemoPage';
import CustomBlurImage from '@components/DemoImage/CustomBlurImage';
import { buildDemoProps } from '@lib/pageProps';
import styles from '@styles/Plp.module.css';

export default function PlpCustomBlur({ template, solution, speed, transition, images }) {
  return (
    <DemoPage template={template} solution={solution} speed={speed}>
      <div className={styles.grid}>
        {images.map((img, i) => (
          <div key={`${img.uuid}-${i}`} className={styles.card}>
            <CustomBlurImage
              fullSrc={img.fullSrc}
              blurSrc={img.blurSrc}
              alt={img.label}
              width={img.width}
              height={img.height}
              priority={i < 4}
              transition={transition}
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

export const getServerSideProps = buildDemoProps('plp', 'custom-blur');
