import React, { useContext } from 'react';
import { ActionsContext } from '../contexts/context';


const Scanner = () => {
  const { actions, setActions} = useContext(ActionsContext);
    return (
      <div className="scanner">
        <p className="scanner-exit" onClick={()=>setActions({...actions, scan: null})}>X</p>
        <div className="scanner-container">
          <img src='/spinner.gif' alt="spinning log" className="scanner-image"/>
          <p className="scanner-text">
            Scanning... now
          </p>
        </div>
      </div>
    );
};

export default Scanner;