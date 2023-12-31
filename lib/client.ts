import sanityClient from '@sanity/client';
import ImageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = sanityClient({
	projectId: '09dg4a19',
	dataset: 'production',
	apiVersion: '2023-12-30',
	useCdn: true,
	token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder = ImageUrlBuilder(client);

export const urlFor = (source: SanityImageSource) => builder.image(source);
