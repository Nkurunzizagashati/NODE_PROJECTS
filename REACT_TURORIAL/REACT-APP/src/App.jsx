import './App.css';
import Aside from './Components/Aside';
import User from './Components/User';

function App() {
	return (
		<>
			<h1 className="header">LOADING SKELETONS</h1>
			<div className="contents">
				<Aside />
				<User />
			</div>
		</>
	);
}

export default App;
