import React, { FC, ReactElement } from 'react';

import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout: FC = ({ children }: any) => {
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
