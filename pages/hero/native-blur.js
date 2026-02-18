import DemoPage from '@components/DemoPage/DemoPage';
import NativeBlurImage from '@components/DemoImage/NativeBlurImage';
import { buildDemoProps } from '@lib/pageProps';

// Pre-generated tiny blur data URLs for the hero image (10px, base64)
// These would normally be generated at build time
const HERO_BLUR_DATA_URL =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsM' +
  'DhEQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQU' +
  'FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAGAAoDAREAAhEBAxEB/8QAFgAB' +
  'AQEAAAAAAAAAAAAAAAAHBAYJ/8QAIhAAAQMEAgIDAAAAAAAAAAAAAQIDBAAFBhEHEiExQWFx/8QAFQEB' +
  'AQAAAAAAAAAAAAAAAAAAAQL/xAAYEQEBAQEBAAAAAAAAAAAAAAABAAIREv/aAAwDAQACEQMRAD8ALy7lh' +
  'uGK2W2WTKLc1KhR0MuRmlhxxCkgAlJ9Hf2rSIhf//Z';

export default function HeroNativeBlur({ template, solution, speed, images }) {
  const hero = images[0];

  return (
    <DemoPage template={template} solution={solution} speed={speed}>
      <NativeBlurImage
        src={hero.fullSrc}
        blurDataURL={HERO_BLUR_DATA_URL}
        alt="Hero banner"
        width={hero.width}
        height={hero.height}
        priority
      />
    </DemoPage>
  );
}

export const getServerSideProps = buildDemoProps('hero', 'native-blur');
