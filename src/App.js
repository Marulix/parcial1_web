import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import './App.css';

function App() {
  // async function getDatos() {
  //   const response = await fetch("https://gist.githubusercontent.com/dburgos26/a09fc5108186b8ce6bd0e7c5a38b2432/raw/e6e879db208b06c15647c94df54f26b352dd4f72/cellphones.json");
  //   const data = await response.json();
  //   return data;
  // }

  // useEffect(() => {
  //   async function fetchData() {
  //     const data = await getDatos();
  //     console.log(data);

  //     localStorage.setItem("phoneList", JSON.stringify(data));

  //     data.forEach((cellphone) => {
  //       localStorage.setItem(`cel${cellphone.id}`, JSON.stringify(cellphone));
  //     });
  //   }
  //   fetchData();
  // }, []);


  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  )
}

export default App;
