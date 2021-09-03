import logo from './logo.svg';
import './App.css';
import { OverView } from './Components/OverView/OverViewComponent';
import TopMenu from './Components/TopMenu/TopMenu'
import { SideMenu } from './Components/SideMenu/SideMenu';

import React, { useEffect } from 'react';

function App() {
  const [ligaTipos, setLigaTipos] = React.useState();
  
  let datoUrl = "https://pokeapi.co/api/v2/type/13/"
  const dato = (liga) => {
    setLigaTipos(liga);
    if (liga !== undefined) {
      datoUrl = liga;
    } 
    console.log(liga)
  }

  useEffect(() => {
    
  })

  return (
      <div className="">
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        <TopMenu dataReturn = {dato.bind()}></TopMenu>
        <OverView ligaTipos = {datoUrl}></OverView>
      </div>
  );
}

export default App;
