import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { auth } from '../firebaseconfig'
import { useHistory } from 'react-router-dom';

const Menu = () => {

    const [user, setUser] = useState(null)
    const historial = useHistory()

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) setUser(user)
        })
    }, [])

    const signOut = () => {
        auth.signOut()
        setUser(null)
        historial.push('/login')
    }

    return (

        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to='/'>Inicio</Link>
                    </li>
                    <li className="nav-item">
                        {
                            !user ? (
                                <Link className="nav-link" to='/login'>Login</Link>
                            ) : (
                                    <span></span>
                                )
                        }

                    </li>
                    <li className="nav-item">
                        {
                            user ? (
                                <Link className="nav-link" to='/admin'>Admin</Link>
                            ) : (
                                    <span></span>
                                )
                        }

                    </li>
                </ul>
                {
                    user ? (
                        <button onClick={signOut} className="btn btn-success float-right">Cerrar sesión</button>
                    ) : (
                            <span></span>
                        )
                }
            </nav>
        </div>
    )

}


export default Menu;