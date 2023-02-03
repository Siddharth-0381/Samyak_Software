import React, { Component } from 'react';
import { BsDownload, BsUpload } from "react-icons/bs";
import startFirebase from '../firebase';
import {ref, onValue} from 'firebase/database';
import { Table } from 'react-bootstrap';

const db= startFirebase();

class Index extends Component {

    constructor(){
        super();
        this.state={
            tableData:[]
        }
    }
    componentDidMount(){
        const dbRef = ref(db, 'user');
        onValue(dbRef, (snapshot)=>{
            let records=[];
            snapshot.forEach(childSnapshot=>{
                let keyName=childSnapshot.key;
                let data=childSnapshot.val();
                records.push({"key":keyName, "data":data});
            });
            this.setState({tableData:records});
        });
    }

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
                        <div>
                            <Table>
                                <thead>
                                <tr>
                                <th>Index</th>
                                <th>CashApp Name</th>
                                <th>CustCashApp Name</th>
                                <th>Total Loaded</th>
                                <th>Total Redemeed</th>
                                <th>GameID</th>
                                <th>GameName</th>
                                <th>Referral Bonus</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {this.state.tableData.map((rowdata, index)=>{
                                        return(
                                        <tr>
                                            <td>{index}</td>
                                            <td>{rowdata.data.cashApp}</td>
                                            <td>{rowdata.data.customerCashAppName}</td>
                                            <td>{rowdata.data.amountLoaded}</td>
                                            <td>{rowdata.data.redeemedTotal}</td>
                                            <td>{rowdata.key}</td>
                                            <td>{rowdata.data.gameName}</td>
                                            <td>{rowdata.data.bonus}</td>
                                        </tr>
                                        )
                                    })}

                                </tbody>
                            </Table>

                        </div>
                    </div>
                </div>
            </div>


        );
    }
}

export default Index;
