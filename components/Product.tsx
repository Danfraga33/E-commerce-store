import React, { FC } from 'react';
// To link to product details
import Link from 'next/link';
//To get image

interface ProductType {
	product: {
		image: any; // Change
		name: string;
		slug: {
			[key: string]: string;
		};
		price: number;
	};
}

import { urlFor } from '@/lib/client';

const Product: FC<ProductType> = ({
	product: { image, name, slug, price },
}) => {
	return (
		<div>
			<Link href={`/product/${slug.current}`}>
				<div className="product-card">
					<img
						src={urlFor(image && image[0]).url()}
						width={250}
						height={250}
						className="product-image"
					/>
					<p className="product-name">{name}</p>
					<p className="product-name">${price}</p>
				</div>
			</Link>
		</div>
	);
};

export default Product;
