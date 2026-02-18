import DemoPage from '@components/DemoPage/DemoPage';
import NativeBlurImage from '@components/DemoImage/NativeBlurImage';
import { buildDemoProps } from '@lib/pageProps';
import styles from '@styles/Plp.module.css';

export default function PlpNativeBlur({ template, solution, speed, images }) {
  return (
    <DemoPage template={template} solution={solution} speed={speed}>
      <div className={styles.grid}>
        {images.map((img, i) => (
          <div key={`${img.uuid}-${i}`} className={styles.card}>
            <NativeBlurImage
              src={img.fullSrc}
              blurDataURL={img.blurDataURL}
              alt={img.label}
              width={img.width}
              height={img.height}
              priority={i < 4}
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
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

export const getServerSideProps = buildDemoProps('plp', 'native-blur');
