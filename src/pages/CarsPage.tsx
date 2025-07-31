import { useEffect, useState } from 'react';
import { fetchFromApi } from '../api/client';

type Car = {
	id: number;
	make: string;
	model: string;
	year: number;
}

export const CarsPage = () => {
	const [cars, setCars] = useState<Car[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetchFromApi('/cars')
			.then(data => {
				setCars(data);
				setIsLoading(false);
			})
			.catch(err =>{
				console.error(err);
				setError('Не вдалося завантажити список авто');
				setIsLoading(false);
			});
	}, []);

	if (isLoading) return <p>Завантаження...</p>;
	if (error) return <p>{error}</p>;

	return (
		<div>
			<ul>
				{cars.map((car: any) => (
					<li
						key={car.id}
					>
						{car.make} {car.model}
					</li>
				))}
			</ul>
		</div>
	);
}
