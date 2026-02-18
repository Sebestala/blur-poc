import DemoPage from '@components/DemoPage/DemoPage';
import NativeBlurImage from '@components/DemoImage/NativeBlurImage';
import { buildDemoProps } from '@lib/pageProps';
import styles from '@styles/Hero.module.css';

const BLUR_DATA_URL =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsM' +
  'DhEQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQU' +
  'FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAGAAoDAREAAhEBAxEB/8QAFgAB' +
  'AQEAAAAAAAAAAAAAAAAHBAYJ/8QAIhAAAQMEAgIDAAAAAAAAAAAAAQIDBAAFBhEHEiExQWFx/8QAFQEB' +
  'AQAAAAAAAAAAAAAAAAAAAQL/xAAYEQEBAQEBAAAAAAAAAAAAAAABAAIREv/aAAwDAQACEQMRAD8ALy7lh' +
  'uGK2W2WTKLc1KhR0MuRmlhxxCkgAlJ9Hf2rSIhf//Z';

export default function HeroNativeBlur({ template, solution, speed, images }) {
  return (
    <DemoPage template={template} solution={solution} speed={speed}>
      <div className={styles.banners}>
        {images.map((img, i) => (
          <NativeBlurImage
            key={img.uuid}
            src={img.fullSrc}
            blurDataURL={BLUR_DATA_URL}
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
