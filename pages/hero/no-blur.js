import DemoPage from '@components/DemoPage/DemoPage';
import NoBlurImage from '@components/DemoImage/NoBlurImage';
import { buildDemoProps } from '@lib/pageProps';

export default function HeroNoBlur({ template, solution, speed, images }) {
  const hero = images[0];

  return (
    <DemoPage template={template} solution={solution} speed={speed}>
      <NoBlurImage
        src={hero.fullSrc}
        alt="Hero banner"
        width={hero.width}
        height={hero.height}
        priority
      />
    </DemoPage>
  );
}

export const getServerSideProps = buildDemoProps('hero', 'no-blur');
