import React, {useState } from 'react';
import database from '../firebase';

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

    const [cashApp, setCashApp] = useState();
    const [cashTag, setcashTag] = useState();
    const [ccName, setccName] = useState();
    const [cTime, setcTime] = useState();
    const [fbPage, setfbPage] = useState();
    const [gName, setgName] = useState();
    const [gTag, setgTag] = useState();
    const [amtRec, setamtRec] = useState('0');
    const [amtLod, setamtLod] = useState('0');
    const [bonus, setbonus] = useState('0');
    const [total, settotal] = useState('0');
    const [widAmt, setcwidAmt] = useState('0');
    const [tips, setTips] = useState('0');
    const [redTotal, setredTotal] = useState('0')
    const [amtTrans, setAmtTrans] = useState('0')

    const Push = () => {
        database.ref("user").set({
            today : today,
            day : day,
            time : time,
            cashApp : cashApp,
            cashTag : cashTag,
            ccName : ccName,
            cTime : cTime,
            fbPage : fbPage,
            gName : gName,
            gTag : gTag,
            amtRec : amtRec,
            amtLod : amtLod,
            bonus : bonus,
            total : total,
            widAmt : widAmt,
            tips : tips,
            redTotal : redTotal,
            amtTrans : amtTrans
        }).catch(alert);   
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
                                    <input className='shift' type="text" value={time} disabled/>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <label htmlFor="cashapp"><b>Our Cashapp :</b></label><br></br>
                                    <select name="cashapp" id="cashapp" value={cashApp} onChange={(e) => setCashApp(e.target.value)}>
                                        <option value="#">--Select from below--</option>
                                        <option value="googlePay">Google Pay</option>
                                        <option value="payTM">PayTM</option>
                                        <option value="phonePe">PhonePe</option>
                                        <option value="WAPay">WhatApp Pay</option>
                                    </select>
                                </td>
                                
                                <td>
                                    <label><b>Our Cashtag : </b></label><br></br>
                                    <input className='cashtag' type="text" value={cashTag} onChange={(e) => setcashTag(e.target.value)}/>
                                </td>

                                <td>
                                    <label><b>Customer cashapp name : </b></label><br></br>
                                    <input className='ccname' type="text" value={ccName} onChange={(e) => setccName(e.target.value)}/>
                                </td>

                                <td>
                                    <label><b>Customer cashapp time : </b></label><br></br>
                                    <input className='ccname' type="time" value={cTime} onChange={(e) => setcTime(e.target.value)}/>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <label htmlFor="fbook"><b>Facebook Account :</b></label><br></br>
                                    <select name="fbook" id="fbook" value={fbPage} onChange={(e) => setfbPage(e.target.value)}>
                                        <option value="">1</option>
                                        <option value="">2</option>
                                        <option value="">3</option>
                                        <option value="">4</option>
                                    </select>
                                </td>

                                <td>
                                    <label htmlFor="action"><b>Action :</b></label><br></br>
                                    <select name="action" id="action" value={showhide} onChange={(e)=> (handleshowhide(e))}>
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
                                    <select name="gname" id="gname" value={gName} onChange={(e) => setgName(e.target.value)}>
                                        <option value="">1</option>
                                        <option value="">2</option>
                                        <option value="">3</option>
                                        <option value="">4</option>
                                    </select>
                                </td>

                                <td>
                                    <label htmlFor="gameid"><b>Game ID : </b></label><br></br>
                                    <input type="text" value={gTag} onChange={(e) => setgTag(e.target.value)}></input>
                                </td>
                            </tr>
                        

                            {
                                showhide === '1' && (
                                    <tr>
                                        <td>
                                            <label><b>Amount Recieved : </b></label><br></br>
                                            <input type='number' placeholder='0' value={amtRec} onChange={(e) => setamtRec(e.target.value)}></input>
                                        </td>

                                        <td>
                                            <label><b>Amount Loaded : </b></label><br></br>
                                            <input type='number' placeholder='0' value={amtLod} onChange={(e) => setamtLod(e.target.value)}></input>
                                        </td>

                                        <td>
                                            <label><b>Bonus : </b></label><br></br>
                                            <input type='number' placeholder='0' value={bonus} onChange={(e) => setbonus(e.target.value)}></input>
                                        </td>

                                        <td>
                                            <label><b>Total : </b></label><br></br>
                                            <input type='number' placeholder='0' value={total} disabled onChange={(e) => settotal(e.target.value)}></input>
                                        </td>
                                    </tr>   
                                ) 
                            }

                            {
                                showhide === '2' && (
                                    <tr>
                                        <td>
                                            <label><b>Withdrawal Amount : </b></label><br></br>
                                            <input type='number' placeholder='0' value={widAmt} onChange={(e) => setcwidAmt(e.target.value)}></input>
                                        </td>

                                        <td>
                                            <label><b>Withdrawal Amount : </b></label><br></br>
                                            <input type='number' placeholder='0'></input>
                                        </td>

                                        <td>
                                            <label><b>Tips : </b></label><br></br>
                                            <input type='number' placeholder='0' value={tips} onChange={(e) => setTips(e.target.value)}></input>
                                        </td>

                                        <td>
                                            <label><b>Total : </b></label><br></br>
                                            <input type='number' placeholder='0' disabled value={redTotal} onChange={(e) => setredTotal(e.target.value)}></input>
                                        </td>
                                    </tr>
                                )
                            }

                            {
                                showhide === '3' && (
                                    <tr>
                                        <td>
                                            <label><b>Amount Transferred : </b></label><br></br>
                                            <input type='number' placeholder='0' value={amtTrans} onChange={(e) => setAmtTrans(e.target.value)}></input>
                                        </td>

                                        <td>
                                            <label><b>Amount Transferred : </b></label><br></br>
                                            <input type='number' placeholder='0'></input>
                                        </td>

                                        <td>
                                            <label><b>Bonus : </b></label><br></br>
                                            <input type='number' placeholder='0' value={bonus} onChange={(e) => setbonus(e.target.value)}></input>
                                        </td>

                                        <td>
                                            <label><b>Total : </b></label><br></br>
                                            <input type='number' placeholder='0' disabled value={total} onChange={(e) => settotal(e.target.value)}></input>
                                        </td>
                                    </tr>
                                )
                            }

                            {
                                showhide === '4' && (
                                    <tr>
                                        <td>
                                            <label><b>Amount Recieved : </b></label><br></br>
                                            <input type='number' placeholder='0' value={amtRec} onChange={(e) => setamtRec(e.target.value)}></input>
                                        </td>

                                        <td>
                                            <label><b>Amount Loaded : </b></label><br></br>
                                            <input type='number' placeholder='0' value={amtLod} onChange={(e) => setamtLod(e.target.value)}></input>
                                        </td>

                                        <td>
                                            <label><b>Bonus : </b></label><br></br>
                                            <input type='number' placeholder='0' value={bonus} onChange={(e) => setbonus(e.target.value)}></input>
                                        </td>

                                        <td>
                                            <label><b>Total : </b></label><br></br>
                                            <input type='number' placeholder='0' disabled value={total} onChange={(e) => settotal(e.target.value)}></input>
                                        </td>
                                    </tr>
                                )
                            }
                        </table>
                    </div>
                    <div className='buttons'>
                        <button type='submit' className='btn btn-cancel m-1' >Cancel</button>
                        <button type='submit' className='btn btn-primary m-1' onClick={Push}>Confirm</button>
                    </div>
                </div>
            </div>
        );
    }

export default Index;