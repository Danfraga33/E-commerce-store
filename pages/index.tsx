import React, { FC } from 'react';
import { client } from '../lib/client';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';

import {
	HeroBanner,
	Product,
	Cart,
	Footer,
	FooterBanner,
	Navbar,
} from '../components/index';
import banner from '@/ecommerce/schemas/banner';

const Home: FC = ({
	products,
	bannerData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	console.log(products);
	return (
		<>
			<HeroBanner HeroBanner={bannerData.length && bannerData[0]} />

			<div className="product-heading">
				<h2>Best Selling Produts</h2>
				<p>Speakers of many variants</p>
			</div>
			<div className="products-container">
				{products?.map((product: any) => (
					<Product key={product.id} product={product} />
				))}
			</div>
			<Footer footerBanner={bannerData && bannerData[0]} />
		</>
	);
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
