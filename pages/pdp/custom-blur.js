import DemoPage from '@components/DemoPage/DemoPage';
import CustomBlurImage from '@components/DemoImage/CustomBlurImage';
import { buildDemoProps } from '@lib/pageProps';
import styles from '@styles/Pdp.module.css';

export default function PdpCustomBlur({ template, solution, speed, transition, images, thumbnails }) {
  return (
    <DemoPage template={template} solution={solution} speed={speed}>
      <div className={styles.layout}>
        <div className={styles.gallery}>
          {images.map((img, i) => (
            <CustomBlurImage
              key={img.uuid}
              fullSrc={img.fullSrc}
              blurSrc={img.blurSrc}
              alt={i === 0 ? 'Product main image' : 'Product alternate view'}
              width={img.width}
              height={img.height}
              priority={i === 0}
              transition={transition}
            />
          ))}
          <div className={styles.thumbnails}>
            {thumbnails.map((thumb, i) => (
              <div key={`${thumb.uuid}-${i}`} className={styles.thumbnail}>
                <img src={thumb.fullSrc} alt="" width={80} height={80} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
        <ProductInfo />
      </div>
    </DemoPage>
  );
}

function ProductInfo() {
  return (
    <div className={styles.info}>
      <div className={styles.brand}>Burberry</div>
      <h2 className={styles.productName}>EKD Wool Cashmere Sweater</h2>
      <div className={styles.price}>$890</div>
      <div className={styles.colorLabel}>Colour: Vert Tent</div>
      <div className={styles.sizeLabel}>Size</div>
      <div className={styles.sizes}>
        {['XS', 'S', 'M', 'L', 'XL'].map((s) => (
          <div key={s} className={styles.size}>{s}</div>
        ))}
      </div>
      <button className={styles.addToBag}>Add to Bag</button>
      <p className={styles.description}>
        Knitted in a wool-cashmere blend, this sweater is adorned with the
        Equestrian Knight Design. Finished with ribbed trims at the neck,
        cuffs and hem
      </p>
    </div>
  );
}

export const getServerSideProps = buildDemoProps('pdp', 'custom-blur');
