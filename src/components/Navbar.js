import React from 'react'
    //Navbar with account address
    function Navbar({account}) {

            return(
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container d-flex align-items-center">
                  <a className="navbar-brand" href="#"><h3>Voting App</h3></a>
                    <span className="text-white ml-auto">
                      <h5 className="text-white">Your account: {account} </h5>
                    </span>
                    </div>
                </nav>
            );
    }

export default Navbar
