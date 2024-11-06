import React, { useState } from 'react';
import axios from 'axios';

function Loginpage() {
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    const[isLoggedIn,setIsLoggedIn]=useState(false);
    const[error,setError]=useState("");
    const[dashboardmessage,setDashboardmessage]=useState("");

    const handlelogin = async(e)=>{
        e.preventDefault();
        try{
            const response=await axios.post("http://localhost:4000/login",{
                username,
                password,
            });
            localStorage.setItem("token",response.data.token);
            setIsLoggedIn(true);
            setError("");

        }catch(err){
            setError("invalid creditials");
        }
    };

     const fetchDashboard = async()=>{
        try{
            const token = localStorage.getItem("token")
            const response= await axios.get("http://localhost:4000/dashboard",{
               headers:{Authorization:token}, 
            });
            setDashboardmessage(response.data.message);
        }catch(err){
            setDashboardmessage("error fetching dashboard");
        }
     };

     const handlelogout = ()=>{
        localStorage.removeItem("token")
        setIsLoggedIn(false)
        setDashboardmessage("")
     };
  return (
    <div>
        {!isLoggedIn?(
            <form onSubmit={handlelogin}>
                <div>
                    <label>username</label>
                    <input type='text' value={username} onChange={(e)=>setUsername(e.target.value)}/>
                </div>
                <div>
                    <label>password</label>
                    <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button type='submit'>Login</button>
                {error && <p style={{color:"blue"}}>{error}</p>}
            </form>
        ) :(
            <div>
                <h2>welcome,{username}!</h2>
                <button onClick={fetchDashboard}>Go to dashboard</button>
                {dashboardmessage && <p>{dashboardmessage}</p>}
                <button onClick={handlelogout}>Logout</button>
            </div>
        )}
    </div>
  );
}

export default Loginpage;