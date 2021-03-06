import React, { useEffect, useState } from 'react';
import { firestore } from '../firebaseconfig'

const Admin = () => {

    const [idUser, setIdUser] = useState('')
    const [nombre, setNombre] = useState('')
    const [numero, setNumero] = useState('')
    const [agenda, setAgenda] = useState([])
    const [error, setError] = useState(null)
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        const getAgenda = async () => {
            const { docs } = await firestore.collection('agenda').get()
            const array = docs.map((item) => ({ id: item.id, ...item.data() }))
            setAgenda(array)
        }

        getAgenda()

    }, [])

    const setUsuarios = async (e) => {
        e.preventDefault()

        if (!nombre.trim() || !numero.trim()) {
            setError('Debe rellenar los campos')
            return
        }
        const user = {
            nombre: nombre,
            numero: numero
        }

        try {
            await firestore.collection('agenda').add(user)
            const { docs } = await firestore.collection('agenda').get()
            const array = docs.map((item) => ({ id: item.id, ...item.data() }))
            setAgenda(array)

        } catch (e) {
            console.log('el error', e);
        }

        setNombre('')
        setNumero('')
        setError(null)
    }

    const deleteUser = async (id) => {
        try {
            await firestore.collection('agenda').doc(id).delete()
            const { docs } = await firestore.collection('agenda').get()
            const array = docs.map((item) => ({ id: item.id, ...item.data() }))
            setAgenda(array)

        } catch (e) {
            console.log(e);
        }
    }

    const actualizar = async (id) => {
        try {
            const data = await firestore.collection('agenda').doc(id).get()
            const { nombre, numero } = data.data()
            setNombre(nombre)
            setNumero(numero)
            setEditMode(true)
            setIdUser(id)
            console.log(id);
        } catch (e) {
            console.log(e);
        }
    }

    const setUpdate = async (e) => {

        e.preventDefault()

        if (!nombre.trim() || !numero.trim()) setError('Debe rellenar los campos')

        const user = {
            nombre: nombre,
            numero: numero
        }

        try {
            await firestore.collection('agenda').doc(idUser).set(user)
            const { docs } = await firestore.collection('agenda').get()
            const array = docs.map((item) => ({ id: item.id, ...item.data() }))
            setAgenda(array)

        } catch (e) {
            console.log('el error', e);
        }

        setNombre('')
        setNumero('')
        setEditMode(false)
        setError(null)
        setIdUser('')
    }

    return (

        <div className="container mt-5 mb-5">
            <h1 className="text-center mb-5">Agenda de usuarios</h1>
            <hr />
            <div className="row">
                <div className="col">
                    <br />
                    <h2 className="text-center">Registrar persona</h2>
                    <form onSubmit={editMode ? setUpdate : setUsuarios} className="form-group mt-5">
                        <input value={nombre} onChange={(e) => { setNombre(e.target.value) }} type="text" placeholder="Nombre" className="form-control mt-3" />
                        <input value={numero} onChange={(e) => { setNumero(e.target.value) }} type="number" placeholder="Telefono" className="form-control mt-3" />
                        {
                            editMode ? (
                                <input type="submit" value="Editar" className="btn btn-dark btn-block mt-3" />
                            ) : (
                                    <input type="submit" value="Registrar" className="btn btn-dark btn-block mt-3" />
                                )
                        }
                    </form>
                    {
                        error != null ? (
                            <div className="alert alert-danger mt-3">{error}</div>
                        ) : (
                                <span></span>
                            )
                    }
                </div>
                <div className="col">
                    <div className="mt-5"></div>
                    <ul className="list-group">
                        {
                            agenda.length !== 0 ? (
                                agenda.map(item => (
                                    <li key={item.id} className="list-group-item">
                                        {item.nombre} - {item.numero}
                                        <button onClick={(id) => { deleteUser(item.id) }} className="btn btn-danger float-right">
                                            <i className="fas fa-trash-alt"></i>                                        </button>
                                        <button onClick={(id) => { actualizar(item.id) }} className="btn btn-success float-right">
                                            <i className="fas fa-user-edit"></i>
                                        </button>
                                    </li>
                                ))

                            ) : (
                                    <span className="alert alert-danger">No hay usuarios registrados</span>
                                )
                        }
                    </ul>
                </div>
            </div>
        </div>
    )

}
export default Admin;