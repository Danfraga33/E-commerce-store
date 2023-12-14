import React, { FC } from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';

interface HeroBannerProps {
	HeroBanner: {
		smallText?: string;
		midText?: string;
		largeText?: string;
		image?: any; // Change
		buttonText?: string;
		desc?: string;
		smallTe?: string;
		product: string;
	};
}
const HeroBanner: FC<HeroBannerProps> = ({ HeroBanner }) => {
	return (
		<div className="hero-banner-container">
			<div>
				<p className="beats-solo">{HeroBanner?.smallText}</p>
			</div>
			<h3>{HeroBanner?.midText}</h3>
			<h1>{HeroBanner?.largeText}</h1>
			<img
				src={urlFor(HeroBanner?.image).url()}
				alt="headphones"
				className="hero-banner-image"
			/>

			<div>
				<Link href={`/product/headphones`}>
					<button type="button"> {HeroBanner?.buttonText}</button>
				</Link>
				<div className="desc">
					<h5>{HeroBanner?.desc}</h5>
					<p>{HeroBanner?.desc}</p>
				</div>
			</div>
		</div>
	);
};

export default HeroBanner;
