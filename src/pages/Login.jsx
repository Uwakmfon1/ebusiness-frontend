// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import useAuth from "../context/useAuth";


// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const {login} = useAuth();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {       
//       const response = await axios.post("http://localhost:8000/api/login", {
//         email,
//         password,
//       });console.log(response.data.data.cartId);
//       localStorage.setItem("token", response.data.data.token);
//       localStorage.setItem("user", JSON.stringify(response.data.data.user));  
//       localStorage.setItem("cartId",response.data.data.cartId); 
//       login({token, user, cartId})   
//       navigate("/dashboard");
    
//     } catch (err) {       
//       setError("Invalid Credentials");
//     }

//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "auto" }}>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <br />

//         <input
//           type="password"
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <br />

//         <button type="submit">Login</button>

//         {error && <p style={{ color: "red" }}>{error}</p>}
//       </form>
//     </div>
//   );
// }

export default function Login(){

  return(
    <div>
      <h1>Welcome to the login page</h1>
    </div>
  )
}