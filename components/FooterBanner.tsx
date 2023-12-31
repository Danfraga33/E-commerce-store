import React, { FC } from 'react';
import Link from 'next/link';
import Footer from './Footer';

import { urlFor } from '@/lib/client';

interface FooterInterface {
	footerBanner: {
		discount: string;
		largeText1: string;
		largeText2: string;
		saleTime: string;
		midText: string;
		smallText: string;
		image: any;
		button: string;
		product: string;
		desc: string;
	};
}

const FooterBanner: FC<FooterInterface> = ({
	footerBanner: {
		discount,
		largeText1,
		largeText2,
		saleTime,
		midText,
		smallText,
		image,
		buttonText,
		product,
		desc,
	},
}: any) => {
	return (
		<div className="footer-banner-container">
			<div className="banner-desc">
				<div className="left">
					<p>{discount}</p>
					<h3>{largeText1}</h3>
					<h3>{largeText2}</h3>
					<p>{saleTime}</p>
				</div>
				<div className="right">
					<p>{smallText}</p>
					<h3>{midText}</h3>
					<p>{desc}</p>
					<Link href={`/product/${product}`}>
						<button type="button">{buttonText}</button>
					</Link>
				</div>
				<img src={urlFor(image).url()} className="footer-banner-image" alt="" />
			</div>
		</div>
	);
};

export default FooterBanner;
