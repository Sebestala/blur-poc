import DemoPage from '@components/DemoPage/DemoPage';
import CustomBlurImage from '@components/DemoImage/CustomBlurImage';
import { buildDemoProps } from '@lib/pageProps';
import styles from '@styles/Hero.module.css';

export default function HeroCustomBlur({ template, solution, speed, transition, images }) {
  return (
    <DemoPage template={template} solution={solution} speed={speed}>
      <div className={styles.banners}>
        {images.map((img, i) => (
          <CustomBlurImage
            key={img.uuid}
            fullSrc={img.fullSrc}
            blurSrc={img.blurSrc}
            alt={img.label}
            width={img.width}
            height={img.height}
            priority={i === 0}
            transition={transition}
          />
        ))}
      </div>
    </DemoPage>
  );
}

export const getServerSideProps = buildDemoProps('hero', 'custom-blur');
