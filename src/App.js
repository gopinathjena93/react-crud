import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';

import StudentManage from './components/StudentManage';
import StudentAdd from './components/StudentAdd';
import StudentEdit from './components/StudentEdit';

function App() {
	return (
		<Router>
			<Switch>					
				<Route exact  path="/student/add" component={StudentAdd} />
				<Route exact  path="/student/edit/:id" component={StudentEdit} />			
				<Route exact  path="/" component={StudentManage} />	
			</Switch>
		</Router>		
			
			
	);
}

export default App;
