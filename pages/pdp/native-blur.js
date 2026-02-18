import DemoPage from '@components/DemoPage/DemoPage';
import NativeBlurImage from '@components/DemoImage/NativeBlurImage';
import { buildDemoProps } from '@lib/pageProps';
import styles from '@styles/Pdp.module.css';

const BLUR_DATA_URL =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsM' +
  'DhEQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQU' +
  'FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAGAAoDAREAAhEBAxEB/8QAFgAB' +
  'AQEAAAAAAAAAAAAAAAAHBAYJ/8QAIhAAAQMEAgIDAAAAAAAAAAAAAQIDBAAFBhEHEiExQWFx/8QAFQEB' +
  'AQAAAAAAAAAAAAAAAAAAAQL/xAAYEQEBAQEBAAAAAAAAAAAAAAABAAIREv/aAAwDAQACEQMRAD8ALy7lh' +
  'uGK2W2WTKLc1KhR0MuRmlhxxCkgAlJ9Hf2rSIhf//Z';

export default function PdpNativeBlur({ template, solution, speed, images, thumbnails }) {
  const main = images[0];

  return (
    <DemoPage template={template} solution={solution} speed={speed}>
      <div className={styles.layout}>
        <div className={styles.gallery}>
          <NativeBlurImage
            src={main.fullSrc}
            blurDataURL={BLUR_DATA_URL}
            alt="Product main image"
            width={main.width}
            height={main.height}
            priority
          />
          <div className={styles.thumbnails}>
            {thumbnails.map((thumb) => (
              <div key={thumb.uuid} className={styles.thumbnail}>
                <img src={thumb.fullSrc} alt="" width={80} height={80} />
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
      <div className={styles.brand}>Brand Name</div>
      <h2 className={styles.productName}>Leather Shoulder Bag</h2>
      <div className={styles.price}>$2,490</div>
      <div className={styles.sizeLabel}>Size</div>
      <div className={styles.sizes}>
        {['S', 'M', 'L'].map((s) => (
          <div key={s} className={styles.size}>{s}</div>
        ))}
      </div>
      <button className={styles.addToBag}>Add to Bag</button>
      <p className={styles.description}>
        Crafted from premium leather with meticulous attention to detail.
        This shoulder bag features an adjustable strap and signature hardware.
        Interior compartment with zip pocket.
      </p>
    </div>
  );
}

export const getServerSideProps = buildDemoProps('pdp', 'native-blur');
