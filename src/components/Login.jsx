import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebaseconfig';

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const historial = useHistory()

    const RegistrarUser = (e) => {
        e.preventDefault()
        if(!email.trim() || !password.trim() )  { 
            setError('Debe rellenar los campos')
            return
        }
        auth.createUserWithEmailAndPassword(email, password)
        .then ( r => {
            historial.push('/')
        })
        .catch (e => {
            if(e.code == 'auth/invalid-email') setError('Formato de email incorrecto')
            if(e.code == 'auth/weak-password') setError('La password debe tener mínimo 6 caracteres')
        })
    }
    const Login = (e) => {
        e.preventDefault()
        if(!email.trim() || !password.trim() )  { 
            setError('Debe rellenar los campos')
            return
        }
        auth.signInWithEmailAndPassword(email, password)
        .then ( r => { historial.push('/')})
        .catch (e => {
            if(!email.trim() || !password.trim() ) setError('Debe rellenar los campos')
            if(e.code == 'auth/wrong-password') setError('Password Inválida')
            if(e.code == 'auth/user-not-found') setError('Usuario no registrado')
            if(e.code == 'auth/invalid-email') setError('Formato de email incorrecto')

        })
    }

    return(

        <div className="container mt-5">
            <div className="text-center">
                <h1>Login</h1>
                <form action="" className="form-group col-lg-6 offset-lg-3">
                    {
                        error != null ? (
                            <div className="alert alert-danger">{error}</div>
                        ) : (
                            <span></span>
                        )
                        

                    }
                    
                    <input onChange={(e) => {setEmail(e.target.value)}} type="text" placeholder="email" className="form-control mt-3"/>
                    <input  onChange={(e) => {setPassword(e.target.value)}} type="text" placeholder="password" className="form-control mt-3"/>
                    <button onClick={Login} className="btn btn-success btn-block mt-3">Login</button>
                    <button onClick={RegistrarUser}  type="submit" className="btn btn-dark btn-block mt-3">Registrar</button>
                </form>
            </div>
        </div>
    )

}

export default Login;