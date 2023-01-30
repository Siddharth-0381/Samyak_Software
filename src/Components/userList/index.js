import React, { Component } from 'react';
import { BsDownload, BsUpload } from "react-icons/bs";

class Index extends Component {
    render() {
        return (
            <div>
                <div className='card border-secondary mb-4 m-5' style={{background: '#E3F6FF'}}>
                <div className='card-header'>
                        <h3 style={{margin: 40}}>Add User</h3>
                        <div className='userDetails-box' style={{background: '#FFF'}}>
                            <img className='imageIcon' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgiCAtQgM3cTIjwusaENd25jahrqpsHlCAcQ&usqp=CAU' alt='' ></img>
                            <div className='username-box'>
                                <h6>Username</h6>
                                <button type='submit' className='btn btn-primary'>Logout</button>
                            </div>
                        </div>
                    </div>
                    <div className='card-body'>
                        <div className='addDetails-div'>
                            <button type='submit' className='btn btn-primary'>Add Details</button>
                            <form className="form-inline my-2 my-lg-0">
                                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                                <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                            </form>
                            <form className="form-inline my-2 my-lg-0">
                                <button className='btn btn-outline-primary my-2 my-sm-0 m-1' type='submit'> <BsDownload/> Import</button>
                                <button className='btn btn-outline-primary my-2 my-sm-0 m-1' type='submit'> <BsUpload/> Export</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;
