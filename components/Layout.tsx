import React, { FC, ReactElement } from 'react';
import { LayoutProps } from './LayoutProps/LayoutProps';

import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }: LayoutProps) => {
	return (
		<div className="layout">
			<Head>
				{/* Change */}
				<title>E-Commerce Store</title>
			</Head>
			<header>
				<Navbar />
			</header>
			<main className="main-container">{children}</main>
			<footer>
				<Footer />
			</footer>
		</div>
	);
};

export default Layout;
