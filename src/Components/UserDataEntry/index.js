import React, {useState } from 'react';

function Index() {


    const [showhide, setShowhide] = useState("1");
    var today = new Date().toISOString().slice(0,10);
    var day = new Date().getDay();
    if(day === 0) {
        day = 'Sunday'
    }else if(day === 1) {
        day = 'Monday'
    }else if(day === 2) {
        day = 'Tuesday'
    }else if(day === 3) {
        day = 'Wednesday'
    }else if(day === 4) {
        day = 'Thursday'
    }else if(day === 5) {
        day = 'Friday'
    }else if(day === 6) {
        day = 'Saturday'
    }

    var time = new Date().getHours();
    if(time >= 22 && time < 7) {
        time = '1st Shift'
    }else if(time >= 7 && time <= 12) {
        time = '2nd Shift'
    }else {
        time = '3rd Shift'
    }

    const handleshowhide = (event) => {
        const getVal = event.target.value;
        setShowhide(getVal)
    }

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
                        <table className='table'>
                            <tr>
                                <td>
                                    <label><b>Date : </b></label><br></br>
                                    <input type="date" value={today} disabled/>
                                </td>

                                <td>
                                    <label><b>Day : </b></label><br></br>
                                    <input className='day' type="text" value={day} disabled/>
                                </td>

                                <td>
                                    <label><b>Shift Timing : </b></label><br></br>
                                    <input className='shift' type="text" value={time}/>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <label htmlFor="cashapp"><b>Our Cashapp :</b></label><br></br>
                                    <select name="cashapp" id="cashapp">
                                        <option value="#">--Select from below--</option>
                                        <option value="googlePay">Google Pay</option>
                                        <option value="payTM">PayTM</option>
                                        <option value="phonePe">PhonePe</option>
                                        <option value="WAPay">WhatApp Pay</option>
                                    </select>
                                </td>
                                
                                <td>
                                    <label><b>Our Cashtag : </b></label><br></br>
                                    <input className='cashtag' type="text" />
                                </td>

                                <td>
                                    <label><b>Customer cashapp name : </b></label><br></br>
                                    <input className='ccname' type="text" />
                                </td>

                                <td>
                                    <label><b>Customer cashapp time : </b></label><br></br>
                                    <input className='ccname' type="time" />
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <label htmlFor="fbook"><b>Facebook Account :</b></label><br></br>
                                    <select name="fbook" id="fbook">
                                        <option value="">1</option>
                                        <option value="">2</option>
                                        <option value="">3</option>
                                        <option value="">4</option>
                                    </select>
                                </td>

                                <td>
                                    <label htmlFor="action"><b>Action :</b></label><br></br>
                                    <select name="action" id="action" onChange={(e)=> (handleshowhide(e))}>
                                        <option value="1">Inward</option>
                                        <option value="2">Outward</option>
                                        <option value="3">Transfer</option>
                                        <option value="4">By client</option>
                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                <label htmlFor="gname"><b>Game Name :</b></label><br></br>
                                    <select name="gname" id="gname">
                                        <option value="">1</option>
                                        <option value="">2</option>
                                        <option value="">3</option>
                                        <option value="">4</option>
                                    </select>
                                </td>

                                <td>
                                    <label htmlFor="gameid"><b>Game ID : </b></label><br></br>
                                    <input type="text" disabled></input>
                                </td>
                            </tr>
                        

                            {
                                showhide === '1' && (
                                    <tr>
                                        <td>
                                            <label><b>Amount Recieved : </b></label><br></br>
                                            <input type='number' placeholder='0'></input>
                                        </td>

                                        <td>
                                            <label><b>Amount Loaded : </b></label><br></br>
                                            <input type='number' placeholder='0'></input>
                                        </td>

                                        <td>
                                            <label><b>Bonus : </b></label><br></br>
                                            <input type='number' placeholder='0'></input>
                                        </td>

                                        <td>
                                            <label><b>Total : </b></label><br></br>
                                            <input type='number' placeholder='0' disabled></input>
                                        </td>
                                    </tr>   
                                ) 
                            }

                            {
                                showhide === '2' && (
                                    <tr>
                                        <td>
                                            <label><b>Withdrawal Amount : </b></label><br></br>
                                            <input type='number' placeholder='0'></input>
                                        </td>

                                        <td>
                                            <label><b>Withdrawal Amount : </b></label><br></br>
                                            <input type='number' placeholder='0'></input>
                                        </td>

                                        <td>
                                            <label><b>Tips : </b></label><br></br>
                                            <input type='number' placeholder='0'></input>
                                        </td>

                                        <td>
                                            <label><b>Total : </b></label><br></br>
                                            <input type='number' placeholder='0' disabled></input>
                                        </td>
                                    </tr>
                                )
                            }

                            {
                                showhide === '3' && (
                                    <tr>
                                        <td>
                                            <label><b>Amount Transferred : </b></label><br></br>
                                            <input type='number' placeholder='0'></input>
                                        </td>

                                        <td>
                                            <label><b>Amount Transferred : </b></label><br></br>
                                            <input type='number' placeholder='0'></input>
                                        </td>

                                        <td>
                                            <label><b>Bonus : </b></label><br></br>
                                            <input type='number' placeholder='0'></input>
                                        </td>

                                        <td>
                                            <label><b>Total : </b></label><br></br>
                                            <input type='number' placeholder='0' disabled></input>
                                        </td>
                                    </tr>
                                )
                            }

                            {
                                showhide === '4' && (
                                    <tr>
                                        <td>
                                            <label><b>Amount Recieved : </b></label><br></br>
                                            <input type='number' placeholder='0'></input>
                                        </td>

                                        <td>
                                            <label><b>Amount Loaded : </b></label><br></br>
                                            <input type='number' placeholder='0'></input>
                                        </td>

                                        <td>
                                            <label><b>Bonus : </b></label><br></br>
                                            <input type='number' placeholder='0'></input>
                                        </td>

                                        <td>
                                            <label><b>Total : </b></label><br></br>
                                            <input type='number' placeholder='0' disabled></input>
                                        </td>
                                    </tr>
                                )
                            }
                        </table>
                    </div>
                    <div className='buttons'>
                        <button type='submit' className='btn btn-cancel m-1' >Cancel</button>
                        <button type='submit' className='btn btn-primary m-1' >Confirm</button>
                    </div>
                </div>
            </div>
        );
    }

export default Index;