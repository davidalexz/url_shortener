'use client';

import { useState } from 'react';
import UrlForm from './components/Form';

export default function Home() {
	const [getShortUrl, setGetShortUrl] = useState<string | null>(null);

	const handleSubmit = async (formData: { getUrl: string }): Promise<void> => {
		try {
			const response = await fetch('/api/posturl', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});
			const result = await response.json();
			if (response.ok) {
				setGetShortUrl(result.short_url);
			} else {
				console.error();
			}
		} catch (error) {
			console.error('Unexpected error', error);
		}
	};
	return (
		<div className="flex flex-col items-center">
			<h1 className="w-1/2 mx-auto my-28 text-center text-xl">Shorten URL</h1>
			<UrlForm
				onSubmit={handleSubmit}
				shortUrl={getShortUrl}
				setShortUrl={setGetShortUrl}
			/>
		</div>
	);
}
