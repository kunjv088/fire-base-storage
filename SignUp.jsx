import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; 
import { Link } from 'react-router-dom';  
import "./SignUp.css"

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        setName('');
        
        setEmail('');
        setPassword('');

    }, []);

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("User  signed up:", userCredential);
                setEmail('');
                setPassword('');
                setName('');
                
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <div id='kunj'>
            <h2 id='s'>- - SIGN UP - -</h2>
            <input id='s1' style={{width:'85%'}} type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}/>
            <input  id='s3'
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input  id='s3'
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button id='s4' onClick={handleSignUp}>Sign Up</button>
            {error && <p style={{color: 'red'}}>{error}</p>}
            
            <p  id='s5'>
             <Link to="/">Login</Link>
            </p>
        </div>
    );
};

export default SignUp;