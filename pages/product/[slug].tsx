import React, { ReactElement, FC, useState } from 'react';
import { client, urlFor } from '@/lib/client';
import { Layout, Product } from '@/components';
import type { InferGetStaticPropsType, GetStaticProps } from 'next';
import type { NextPageWithLayout } from '../_app';
import {
	AiOutlineMinus,
	AiOutlinePlus,
	AiFillStar,
	AiOutlineStar,
} from 'react-icons/ai';

import { useStateContext } from '@/context/StateContext';

interface ProductDetails {
	product: {
		image: any; // change
		name: string;
		price: string;
		details: string;
	};
	slug: {
		image: any; // change
		name: string;
		price: string;
		details: string;
		current: any;
	};
	current: {
		image: any; // change
		name: string;
		price: string;
		details: string;
	};
	products: {};
}

const ProductDetails: NextPageWithLayout<ProductDetails> = (
	{ product, products }: any //Change
) => {
	if (!products) {
		return <div>Loading...</div>; // or handle the loading state in another way
	}
	const [index, setIndex] = useState(0);
	const { image, name, details, price } = product;
	const { decQty, incQty, qty, onAdd }: any = useStateContext(); // Change
	return (
		<div>
			<div className="product-detail-container">
				<div className="image-container">
					<img
						src={urlFor(image && image[index]).url()}
						className="product-detail-image"
					/>
					<div>
						<div className="small-image-container">
							{image?.map((item: HTMLImageElement, i: number) => (
								<img
									key={i}
									src={urlFor(item).url()}
									alt={`Thumbnail ${i + 1}`}
									onMouseEnter={() => setIndex(i)}
									className={
										i === index ? 'small-image selected-image' : 'small-image'
									}
								/>
							))}
						</div>
					</div>
				</div>

				<div className="product-detail-desc">
					<h1>{name}</h1>
					<div className="reviews">
						<div className="flex">
							<AiFillStar />
							<AiFillStar />
							<AiFillStar />
							<AiFillStar />
							<AiOutlineStar />
						</div>
						<p>(20)</p>
					</div>
					<h4>Details: </h4>
					<p>{details}</p>
					<p className="price">${price}</p>
					<h3>Quantity: </h3>
					<p className="quantity-desc">
						<span className="minus" onClick={decQty}>
							<AiOutlineMinus />
						</span>
						<span className="num">{qty}</span>
						<span className="plus" onClick={incQty}>
							<AiOutlinePlus />
						</span>
					</p>
					<div className="buttons">
						<button
							type="button"
							className="add-to-cart"
							onClick={() => onAdd(product, qty)}
						>
							Add to Cart
						</button>
						<button type="button" className="buy-now">
							Buy Now
						</button>
					</div>
				</div>

				<div className="maylike-products-wrapper">
					<h2>You may also like:</h2>
					<div className="marquee">
						<div className="maylike-products-container track">
							{products.map((item: any) => (
								<Product key={item.id} product={item} />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

ProductDetails.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export const getStaticPaths = async () => {
	const query = `*[_type == "product"] {
		slug {
			current
		}
	}`;

	const products = await client.fetch(query);
	const paths = products.map((product: ProductDetails) => ({
		params: {
			slug: product.slug.current,
		},
	}));

	return {
		paths,
		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps = async ({
	params: { slug },
}: any) => {
	const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
	const productsQuery = '*[_type == "product"]';
	const product = await client.fetch(query);
	const products = await client.fetch(productsQuery);

	return {
		props: {
			product,
			products,
		},
	};
};

export default ProductDetails;
