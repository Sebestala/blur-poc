import DemoPage from '@components/DemoPage/DemoPage';
import NoBlurImage from '@components/DemoImage/NoBlurImage';
import { buildDemoProps } from '@lib/pageProps';
import styles from '@styles/Hero.module.css';

export default function HeroNoBlur({ template, solution, speed, images }) {
  return (
    <DemoPage template={template} solution={solution} speed={speed}>
      <div className={styles.banners}>
        {images.map((img, i) => (
          <NoBlurImage
            key={img.uuid}
            src={img.fullSrc}
            alt={img.label}
            width={img.width}
            height={img.height}
            priority={i === 0}
          />
        ))}
      </div>
    </DemoPage>
  );
}

export const getServerSideProps = buildDemoProps('hero', 'no-blur');
