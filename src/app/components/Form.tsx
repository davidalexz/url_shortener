'use client';
import { useState } from 'react';
import { IoCopyOutline } from 'react-icons/io5';
import dynamic from 'next/dynamic';

type FormProps = {
	onSubmit: (data: { getUrl: string }) => void;
	shortUrl?: string | null;
	setShortUrl: (url: string | null) => void;
};

//Make sure that ldrs package only runs on the client side and is not rendered during SSR
const Spinner = dynamic(() => import('./Spinner'), {
	ssr: false,
});

export default function UrlForm({
	onSubmit,
	shortUrl,
	setShortUrl,
}: FormProps) {
	const [getUrl, setGetUrl] = useState<string>('');
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [copyMessage, setCopyMessage] = useState<string | null>(null);
	const [isSpinning, setIsSpinning] = useState<boolean>(false);

	const handleCopy = () => {
		if (shortUrl) {
			navigator.clipboard.writeText(shortUrl);
			setCopyMessage('Copied to clipboard!');
			setShortUrl(null);
			setIsSubmitting(false);
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);
		setIsSpinning(true);
		onSubmit({ getUrl });
		setGetUrl('');
		setCopyMessage(null);
	};

	if (shortUrl && isSpinning) {
		setIsSpinning(false);
	}

	return (
		<div>
			<form className="flex justify-center gap-2" onSubmit={handleSubmit}>
				<input
					type="url"
					className="w-96 border-black border-2 p-2.5 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#FFA6F6] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-md"
					value={getUrl}
					onChange={(e) => setGetUrl(e.target.value)}
					required
					placeholder="full link here!"
				/>

				<button
					type="submit"
					disabled={isSubmitting}
					className={`h-12 border-black border-2 p-2.5 rounded-md ${
						isSubmitting
							? 'bg-gray-400 cursor-not-allowed'
							: 'bg-[#A6FAFF] hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF]'
					}`}
				>
					Submit
				</button>
			</form>
			{isSpinning && <Spinner />}
			{shortUrl && (
				<div className="relative mt-5 w-96">
					<input
						type="text"
						className="w-full border-black border-2 p-2.5 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#FFA6F6] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-md"
						placeholder="short link here!"
						readOnly
						value={shortUrl || ''}
					/>
					<IoCopyOutline
						className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:cursor-pointer transition-transform hover:scale-110 active:scale-95"
						onClick={handleCopy}
					/>
					{copyMessage && <p className="mt-2">{copyMessage}</p>}
				</div>
			)}
		</div>
	);
}
