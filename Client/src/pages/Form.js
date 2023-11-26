import * as React from 'react';
import './index.css';
import { useState, useEffect } from 'react';
import axios from 'axios';


export default function Form(){
    const [rut, setRut] = useState("");
    const [password, setPasword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    axios.defaults.withCredentials = true;
    
    const login = async () => {
        try {
          const response = await axios.post('http://localhost:3001/login', {
            rut: rut,
            password: password
          });
    
          if (response.data.message) {
            // Handle error messages from the server
            setLoginStatus(response.data.message);
          } else {
            // Handle successful login
            setLoginStatus(`Bienvenido, ${response.data[0].nombre}`); // Change this according to your response structure
          }
        } catch (error) {
          // Handle network errors or other issues
          console.error('Error during login:', error);
        }
    };
    
    useEffect(() => {
        axios.get('http://localhost:3001/login').then((response) => {
            if (response.data && response.data.loggedIn === true && response.data.user && response.data.user[0]) {
                setLoginStatus(response.data.user[0].rut);
            }  
        });
       
    }, []);
   
    return(
        <div className="flex w_full h-screen">
        <div className="w-full flex items-center justify-center lg:w-1/2">
        <div className='bg-white px-10 py-20 rounded-3xl border-2 border-gray-100'>
            <h1 className='text-5xl font-semibold'>Bienvenido</h1>
            <p className='font-medium text-lg text-gray-500 mt-4'>Bienvenido! a CalendarUcen.</p>
            <div className='mt-8'>
                <div>
                    <label className='text-lg font-medium'>Rut</label>
                    <input
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder='Ingresa tu Rut'
                        type="text"
                        value={rut} onChange={(e) => setRut(e.target.value)}
                
                        
                    />
                </div>
                <div>
                    <label className='text-lg font-medium'>Contraseña</label>
                    <input
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder='Ingresa tu contraseña'
                        type="password"
                        value={password} onChange={(e) => setPasword(e.target.value)}

                    />
                </div>
                <div className='mt-8 flex justify-between item-center'>
                    <div>
                        <input
                            type='checkbox'
                            id='remember'
                        />
                        <label className='ml-2 font-medium text-base' for="remember">Recuerdame</label>
                    </div>
                    <button className='font-medium text-base text-blue-20'>Recuperar Contraseña</button>
                </div>
                <div className='mt-8 flex flex-col gap-y-4'>
                <button className='active:scale-[.98] active-75 hover:scale[1.01] ease-in-out transition-all py-3 rounded-xl bg-blue-500 text-white text-lg font-bold' onClick={login}>
                    Iniciar Sesión
                </button>

                    <button>
                        Inicia sesion con Correo institucional
                    </button>
                </div>
                <div>
                    <h1>{loginStatus}</h1>
                </div>
            </div>
        </div>
        </div>
      <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">       
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Logo_nuevo_ucen.png/1200px-Logo_nuevo_ucen.png" 
        className="w-60 h-60 bg-gradient-to-tr  rounded-full animate-bounce" />
        <div className="w-full h-3/2 absolute bottom-0 bg-white backdrop-blur-lg"/>
      </div>
    </div>
    )
}