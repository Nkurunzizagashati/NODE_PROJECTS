import { useEffect, useState } from 'react';

const User = () => {
	const [profile, setProfile] = useState(null);
	const url = 'https://jsonplaceholder.typicode.com/users/1';

	useEffect(() => {
		setTimeout(async () => {
			const response = await fetch(url);
			const data = await response.json();
			setProfile(data);
		}, 5000);
	}, [url]);
	return (
		<div className="user">
			<h2>User Profile</h2>
			{profile ? (
				<div className="profile">
					<h3>{profile.username}</h3>
					<p>{profile.email}</p>
					<a href={profile.website}>{profile.website}</a>
				</div>
			) : (
				<div>Loading...</div>
			)}
		</div>
	);
};

export default User;
