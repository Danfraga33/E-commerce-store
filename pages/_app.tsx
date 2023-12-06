import '@/styles/globals.css';
import React from 'react';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import { StateContext } from '@/context/StateContext';
import { Toaster } from 'react-hot-toast';
import type { AppProps } from 'next/app';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page) => page);
	return (
		<StateContext>
			getLayout(
			<Component {...pageProps} />
			);
		</StateContext>
	);
}
