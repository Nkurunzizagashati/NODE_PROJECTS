import { useEffect, useState } from 'react';

const Aside = () => {
	const [articles, setArticles] = useState(null);
	const url = 'https://jsonplaceholder.typicode.com/posts';

	useEffect(() => {
		setTimeout(async () => {
			const response = await fetch(url);
			const data = await response.json();
			setArticles(data);
		}, 5000);
	}, [url]);

	return (
		<div className="aside">
			<h2>Aside contents</h2>
			{articles && (
				<div className="articles">
					<h3>{}</h3>
				</div>
			)}

			{!articles && <div>Loading...</div>}
		</div>
	);
};

export default Aside;
