import DemoPage from '@components/DemoPage/DemoPage';
import NativeBlurImage from '@components/DemoImage/NativeBlurImage';
import { buildDemoProps } from '@lib/pageProps';
import styles from '@styles/Hero.module.css';

export default function HeroNativeBlur({ template, solution, speed, images }) {
  return (
    <DemoPage template={template} solution={solution} speed={speed}>
      <div className={styles.banners}>
        {images.map((img, i) => (
          <NativeBlurImage
            key={img.uuid}
            src={img.fullSrc}
            blurDataURL={img.blurDataURL}
            alt={img.label}
            width={img.width}
            height={img.height}
            priority={i === 0}
            sizes="100vw"
          />
        ))}
      </div>
    </DemoPage>
  );
}

export const getServerSideProps = buildDemoProps('hero', 'native-blur');
