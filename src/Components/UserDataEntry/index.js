import React, { Component } from 'react';
import startFirebase from '../firebase';
import {ref, set} from 'firebase/database';
import { v4 as uuid } from 'uuid'
class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            db : '',
            dropDown : '1',
            date : new Date().toISOString().slice(0, 10),
            day : new Date().toLocaleString('en-us', {weekday: 'long'}),
            timeHours : new Date().getHours(),
            shift : '-',
            cashApp : 'null',
            cashTag : 'null',
            customerCashAppName : 'null',
            customerCashAppTime : '00:00 --',
            facebookAccount : 'null',
            gameName : 'null',
            gameID : 'null',
            amountRecieved : '0',
            amountLoaded : '0',
            bonus : '0',
            amountTotal : '0',
            tips : '0',
            redeemedTotal : '0',
            amountTransferred : '0',
            unique : uuid()
        }

        this.handleShift = this.handleShift.bind()
        this.addData = this.addData.bind(this)
    }

    handledropDown = (event) => {
        this.setState({dropDown: event.target.value});
    }

    handleShift = () => {
        var time = this.state.timeHours
        if(time > '23' && time < '7'){
            this.setState({shift : '1st Shift'})
        }else if(time >= '7' && time < '12'){
            this.setState({shift: '2nd Shift'})
        }else{
            this.setState({shift: '3rd Shift'})
        }
    }

    handleCashTag = (event) => {
        this.setState({cashApp : event.target.value})
        const cashName = event.target.value
        if(cashName === 'Kyla Jones') {
            this.setState({cashTag : '$F53535'})
        }else if(cashName === 'Brian Moore'){
            this.setState({cashTag : '$G23232'})
        }else if(cashName === 'Kim Wood'){
            this.setState({cashTag : '$F74747'})
        }else if(cashName === 'Client'){
            this.setState({cashTag : 'Client'})
        }else if(cashName === 'Transfer'){
            this.setState({cashTag : 'Transfer'})
        }else{
            this.setState({cashTag : ''})
        }
    }
    
    handleGameName = (event) => {
        const gName = event.target.value
        this.setState({gameID : gName})
        const lastFour = gName.slice(-4)
        if(lastFour === '7506'){
            this.setState({gameName : 'Fire Kirin'})
        }else if(lastFour === '7503'){
            this.setState({gameName : 'Milky Way'})
        }else if(lastFour === '7504'){
            this.setState({gameName : 'Orion Stars'})
        }else if(lastFour === '7507'){
            this.setState({gameName : 'Game Valley'})
        }else if(lastFour === '7512'){
            this.setState({gameName : 'Panda Mania'})
        }else {
            this.setState({gameName : 'Invalid Game ID'})
        }

    }

    storeAmountLoaded = (event) => {
        this.setState({amountLoaded : event.target.value})
        this.handleTotal()
    }

    storeBonus = (event) => {
        this.setState({bonus : event.target.value})
        this.handleTotal()
    }

    handleTotal = () => {
        const amtLoaded = this.state.amountLoaded
        const bonus = this.state.bonus

        this.setState({amountTotal : ( parseInt(amtLoaded) + parseInt(bonus))})

    }

    handleRedeemedTotal = () => {
        
    }

    componentDidMount(){
        this.setState({
            db:startFirebase()
        });
    }


    getAllInputs(){
        return{
            date : this.state.date,
            day : this.state.day,
            timeHours : this.state.timeHours,
            shift : this.state.shift,
            cashApp : this.state.cashApp,
            cashTag : this.state.cashTag,
            customerCashAppName : this.state.customerCashAppName,
            customerCashAppTime : this.state.customerCashAppTime,
            facebookAccount : this.state.facebookAccount,
            gameName : this.state.gameName,
            gameID : this.state.gameID,
            amountRecieved : this.state.amountRecieved,
            amountLoaded : this.state.amountLoaded,
            bonus : this.state.bonus,
            amountTotal : this.state.amountTotal,
            tips : this.state.tips,
            redeemedTotal : this.state.redeemedTotal,
            amountTransferred : this.state.amountTransferred,
            unique : this.state.unique
        }
    }

    addData(){
        const db = this.state.db;
        const data=this.getAllInputs();

        set(ref(db, 'user/'+ this.state.gameID),
        {
            date : data.date,
            day : data.day,
            timeHours : data.timeHours,
            shift : data.shift,
            cashApp : data.cashApp,
            cashTag : data.cashTag,
            customerCashAppName : data.customerCashAppName,
            customerCashAppTime : data.customerCashAppTime,
            facebookAccount : data.facebookAccount,
            gameName : data.gameName,
            gameID : data.gameID,
            amountRecieved : data.amountRecieved,
            amountLoaded : data.amountLoaded,
            bonus : data.bonus,
            amountTotal : data.amountTotal,
            tips : data.tips,
            redeemedTotal : data.redeemedTotal,
            amountTransferred : data.amountTransferred,
            unique : data.unique
        })
        .then(()=> {alert('Data added successfully!')})
        .catch((error)=>{alert(error)});
    }

    render() {
        console.log(this.state.timeHours)
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
                            <tbody>
                                <tr>
                                    <td>
                                        <label><b>Date : </b></label><br></br>
                                        <input className='input' type="date" value={this.state.date} disabled/>
                                    </td>

                                    <td>
                                        <label><b>Day : </b></label><br></br>
                                        <input className='input' type="text" value={this.state.day} disabled/>
                                    </td>

                                    <td>
                                        <label><b>Shift Timing : </b></label><br></br>
                                        <input className='input' type="text" value={this.state.shift}  disabled/>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <label htmlFor="cashapp"><b>Our Cashapp :</b></label><br></br>
                                        <select className='input' name="cashapp" id="cashapp" required
                                        onChange={this.handleCashTag} onClick={this.handleShift}>
                                            <option value="#">--Select cashapp name--</option>
                                            <option value="Kyla Jones">Kyla Jones</option>
                                            <option value="Brian Moore">Brian Moore</option>
                                            <option value="Kim Wood">Kim Wood</option>
                                            <option value="Client">Client</option>
                                            <option value="Transfer">Transfer</option>
                                        </select>
                                    </td>
                                    
                                    <td>
                                        <label><b>Our Cashtag : </b></label><br></br>
                                        <input className='input' type="text" disabled required
                                        value={this.state.cashTag}/>
                                    </td>

                                    <td>
                                        <label><b>Customer cashapp name : </b></label><br></br>
                                        <input className='input' type="text" required
                                        onChange={e =>{this.setState({customerCashAppName : e.target.value});}}/>
                                    </td>

                                    <td>
                                        <label><b>Customer cashapp time : </b></label><br></br>
                                        <input className='input' type="time" required
                                        onChange={e =>{this.setState({customerCashAppTime : e.target.value});}}/>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <label htmlFor="fbook"><b>Facebook Account :</b></label><br></br>
                                        <select className='input' name="fbook" id="fbook" required
                                        onChange={e =>{this.setState({facebookAccount : e.target.value});}}>
                                            <option value="Austin Scott">Austin Scott</option>
                                            <option value="Lipa Lynn">Lipa Lynn</option>
                                            <option value="Grace Lessen">Grace Lessen</option>
                                            <option value="Colton Hammer">Colton Hammer</option>
                                        </select>
                                    </td>

                                    <td>
                                        <label htmlFor="action"><b>Action :</b></label><br></br>
                                        <select className='input' name="action" id="action" onChange={this.handledropDown} required>
                                            <option value="1">Inward</option>
                                            <option value="2">Outward</option>
                                            <option value="3">Transfer</option>
                                            <option value="4">By client</option>
                                        </select>
                                    </td>
                                </tr>

                                <tr>

                                    <td>
                                        <label htmlFor="gameid"><b>Game ID : </b></label><br></br>
                                        <input className='input' type="text" value={this.state.gameID} required
                                        onChange={this.handleGameName}></input>
                                    </td>

                                    <td>
                                    <label htmlFor="gname"><b>Game Name :</b></label><br></br>
                                        <select className='input' name="gname" id="gname" value={this.state.gameName} required>
                                        <option value="#">--Select Game Name--</option>
                                            <option value="Fire Kirin">Fire Kirin</option>
                                            <option value="Milky Way">Milky Way</option>
                                            <option value="Orion Stars">Orion Stars</option>
                                            <option value="Game Valley">Game Valley</option>
                                            <option value="Panda Mania">Panda Mania</option>
                                        </select>
                                    </td>

                                </tr>
                        

                                {
                                    this.state.dropDown === '1' && (
                                        <tr>
                                            <td>
                                                <label><b>Amount Recieved : </b></label><br></br>
                                                <input className='input' type='number'  id='amtRec' required
                                                onChange={e =>{this.setState({amountRecieved : e.target.value});}} ></input>
                                            </td>

                                            <td>
                                                <label><b>Amount Loaded : </b></label><br></br>
                                                <input className='input' type='number'  id='amtLod' required
                                                /*onChange={e =>{this.setState({amountLoaded : e.target.value});}}*/
                                                onSubmit={this.storeAmountLoaded} ></input>
                                            </td>

                                            <td>
                                                <label><b>Bonus : </b></label><br></br>
                                                <input className='input' type='number'  id='bonus' required
                                                /*onChange={e =>{this.setState({bonus : e.target.value});}}*/
                                                onChange={this.storeBonus}></input>
                                            </td>

                                            <td>
                                                <label><b>Total : </b></label><br></br>
                                                <input  className='input'type='number' required   
                                                disabled value={this.state.amountTotal}></input>
                                            </td>
                                        </tr>   
                                    ) 
                                }

                                {
                                    this.state.dropDown === '2' && (
                                        <tr>
                                            <td>
                                                <label><b>Withdrawal Amount : </b></label><br></br>
                                                <input type='number' required
                                                onChange={e =>{this.setState({withdrawalAmount : e.target.value});}}></input>
                                            </td>

                                            <td>
                                                <label><b>Withdrawal Amount : </b></label><br></br>
                                                <input type='number' required
                                                onChange={e =>{this.setState({withdrawalAmount : e.target.value});}}></input>
                                            </td>

                                            <td>
                                                <label><b>Tips : </b></label><br></br>
                                                <input type='number' required 
                                                onChange={e =>{this.setState({tips : e.target.value});}}></input>
                                            </td>

                                            <td>
                                                <label><b>Total : </b></label><br></br>
                                                <input type='number'  disabled  
                                                onChange={e =>{this.setState({redeemedTotal : e.target.value});}}></input>
                                            </td>
                                        </tr>
                                    )
                                }

                                {
                                    this.state.dropDown === '3' && (
                                        <tr>
                                            <td>
                                                <label><b>Amount Transferred : </b></label><br></br>
                                                <input type='number' required  
                                                onChange={e =>{this.setState({amountTransferred : e.target.value});}}></input>
                                            </td>

                                            <td>
                                                <label><b>Amount Transferred : </b></label><br></br>
                                                <input type='number' required
                                                onChange={e =>{this.setState({amountTransferred : e.target.value});}}></input>
                                            </td>

                                            <td>
                                                <label><b>Bonus : </b></label><br></br>
                                                <input type='number' required  
                                                onChange={e =>{this.setState({bonus : e.target.value});}}></input>
                                            </td>

                                            <td>
                                                <label><b>Total : </b></label><br></br>
                                                <input type='number'  disabled 
                                                onChange={e =>{this.setState({amountTotal : e.target.value});}}></input>
                                            </td>
                                        </tr>
                                    )
                                }

                                {
                                    this.state.dropDown === '4' && (
                                        <tr>
                                            <td>
                                                <label><b>Amount Recieved : </b></label><br></br>
                                                <input type='number' required 
                                                onChange={e =>{this.setState({amountRecieved : e.target.value});}}></input>
                                            </td>

                                            <td>
                                                <label><b>Amount Loaded : </b></label><br></br>
                                                <input type='number' required 
                                                onChange={e =>{this.setState({amountLoaded : e.target.value});}}></input>
                                            </td>

                                            <td>
                                                <label><b>Bonus : </b></label><br></br>
                                                <input type='number' required 
                                                onChange={e =>{this.setState({bonus : e.target.value});}}></input>
                                            </td>

                                            <td>
                                                <label><b>Total : </b></label><br></br>
                                                <input type='number'  disabled 
                                                onChange={e =>{this.setState({amountTotal : e.target.value});}}></input>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='buttons'>
                        <button type='submit' className='btn btn-cancel m-1'>Cancel</button>
                        <button type='submit' className='btn btn-primary m-1' onClick={this.addData}>Confirm</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;
