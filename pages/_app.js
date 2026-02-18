import { DemoProvider } from '@context/DemoContext';
import Layout from '@components/Layout/Layout';
import '@styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <DemoProvider initialSpeed={pageProps.speed} initialTransition={pageProps.transition}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </DemoProvider>
  );
}
