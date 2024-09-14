import { ring } from 'ldrs';
ring.register();

export default function Spinner() {
	return (
		<div className="flex justify-center mt-3">
			<l-ring
				size="32"
				stroke="3"
				stroke-length="0.25"
				bg-opacity="0.1"
				speed="1.5"
				color="black"
			></l-ring>
		</div>
	);
}
