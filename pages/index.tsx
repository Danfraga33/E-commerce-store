import React, { ReactElement } from 'react';
import { client } from '../lib/client';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';

import { HeroBanner, Product, FooterBanner, Layout } from '../components/index';
import type { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = ({
	products,
	bannerData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	console.log(products);
	return (
		<>
			<HeroBanner HeroBanner={bannerData.length && bannerData[0]} />

			<div className="products-heading">
				<h2>Best Selling Produts</h2>
				<p>Speakers of many variants</p>
			</div>
			<div className="products-container">
				{products?.map((product: any) => (
					<Product key={product.id} product={product} />
				))}
			</div>
			<FooterBanner footerBanner={bannerData && bannerData[0]} />
		</>
	);
};

Home.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async () => {
	// Get dataa
	// Products
	const query = '*[_type == "product"]';
	const products = await client.fetch(query);
	// Branch

	const bannerQuery = '*[_type == "banner"]';
	const bannerData = await client.fetch(bannerQuery);

	//Create data object
	return {
		props: {
			products,
			bannerData,
		},
	};
};

export default Home;
