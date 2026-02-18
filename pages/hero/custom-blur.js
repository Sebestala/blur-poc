import DemoPage from '@components/DemoPage/DemoPage';
import CustomBlurImage from '@components/DemoImage/CustomBlurImage';
import { buildDemoProps } from '@lib/pageProps';

export default function HeroCustomBlur({ template, solution, speed, transition, images }) {
  const hero = images[0];

  return (
    <DemoPage template={template} solution={solution} speed={speed}>
      <CustomBlurImage
        fullSrc={hero.fullSrc}
        blurSrc={hero.blurSrc}
        alt="Hero banner"
        width={hero.width}
        height={hero.height}
        priority
        transition={transition}
      />
    </DemoPage>
  );
}

export const getServerSideProps = buildDemoProps('hero', 'custom-blur');
