// @refresh reload
import { Suspense } from 'solid-js';
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from 'solid-start';
import './root.css';
import '../styles/fonts.css';
import './styles/animations.css';
import Header from './components/Header';
import Layout from './components/Layout';
import FilterProvider from './components/Filter/FilterProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';

const queryClient = new QueryClient();

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>tonemato</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body class="bg-white dark:bg-black">
        <Suspense>
          <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
              <FilterProvider>
                <Header />
                <Layout>
                  <Routes>
                    <FileRoutes />
                  </Routes>
                </Layout>
              </FilterProvider>
            </QueryClientProvider>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
