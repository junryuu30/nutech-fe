import React, { useContext, useEffect } from "react";
import "./App.css";
import Formnutech from "./pages/Formnutech";
import { Routes, Route} from "react-router-dom";
import Landing from "./pages/Landing";
import { API, setAuthToken } from "./config/api";
import { UserContext } from "./components/context/userContext";

function App() {

  const [state, dispatch] = useContext(UserContext);

  useEffect(()=>{
    if(localStorage.token){
      setAuthToken(localStorage.token)
    }
  },[state])

  const checkUser = async () => {
    try {
      // setIsLoading(true);
      const response = await API.get("/check-auth");

      const payload = response.data.data;
      // console.log("ini payload",payload)
      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });

      // setIsLoading(false);
    } catch (error) {
      console.log(error);
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);



  return (
    <div className="App">
      <Routes>
        <Route exac path="/" element={<Landing />} />
        <Route exac path="/form" element={<Formnutech />} />
      </Routes>
    </div>
  );
}

export default App;
