import signUpStyleCss from "./signUp.module.css";
import { collection, query, where, getDocs ,addDoc} from "firebase/firestore";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../fireBase";
import { useAuthContext } from "../../authContext";

export const SignUp = () => {

    const navigate=useNavigate()
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const { signUp }=useAuthContext();

    const onChangeEmail=(e)=>{
        setEmail(e.target.value)
    }

    const onChangeName=(e)=>{
        setName(e.target.value)
    }

    const onChangePassword=(e)=>{
        setPassword(e.target.value)
    }

    const handleSubmit=async (e)=>{
        try {
            e.preventDefault()
            let data={
              name:name,
              email:email,
              password:password
            }
            await signUp(data)
            return navigate("/signIn")
        } catch (error) {
            toast(error.message);
            return navigate("/signUp")
        }
    }
  return (
    <>
      {/* main container  */}
      <div className={signUpStyleCss.container}>
        <div className={signUpStyleCss.inputForm}>
          {/* heading */}
          <h1>Sign Up</h1>
          {/* form to get user's data */}
          <form onSubmit={handleSubmit}>
            {/* for name */}
            <input
              type="text"
              placeholder="Enter Name"
              required
              value={name}
              onChange={onChangeName}
            />
            {/* for email */}
            <input
              type="email"
              placeholder="Enter Email"
              required
              value={email}
              onChange={onChangeEmail}
            />
            {/* for password */}
            <input
              type="password"
              placeholder="Enter Password"
              required
              value={password}
              onChange={onChangePassword}
            />
            {/* submit button */}
            <button>Sign Up</button>
          </form>
        </div>
      </div>
    </>
  );
};
