import React, {useState, useContext} from 'react';
import AuthAPI from '../services/AuthAPI';
import AuthContext from '../contexts/AuthContext'
import Field from '../components/forms/Field';


const LoginPage = ({history}) => {

	const {setIsAuthenticated} = useContext(AuthContext)


	const [credentials, setCredentials] = useState({
		username: "",
		password: ""
	})
	const [error, setError] = useState("");

	const handleChange = ({currentTarget}) => {
		const value = currentTarget.value;
		const name = currentTarget.name;

		//On peut faire aussi const {name, value} = currentTarget;

		setCredentials({...credentials, [name]:value})
	}

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			await AuthAPI.authenticate(credentials);
			setError("");
			setIsAuthenticated(true);
			history.replace("/customers")
			
		} catch (error) {
			setError("Aucun compte ne possède cette addresse ou alors les informations ne correspondent pas")
		}
		
	}

	return ( 
		<>
			<h1>Connexion à l'application</h1>

			<form onSubmit={handleSubmit}>
				<Field 
					name="username" 
					label="Addresse Email" 
					value={credentials.username} 
					onChange={handleChange} 
					type="email"
					placeholder="Adresse email de conexion"
					error={error}
				/>
				<Field 
					name="password" 
					label="Mot de passe" 
					value={credentials.password} 
					onChange={handleChange} 
					type="password"
				/>
				<div className="form-group">
					<button type="submit" className="btn btn-success">Je me connecte</button>
				</div>
			</form>
		</>
	 );
}
 
export default LoginPage;