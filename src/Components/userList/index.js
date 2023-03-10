import React, { Component } from 'react';
import {BsEye, BsPencilSquare, BsTrash, BsUpload } from "react-icons/bs";
import startFirebase from '../firebase';
import { ref, onValue, remove, child, get, update, set } from 'firebase/database';
import { Table, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
 import * as XLSX from 'xlsx';
 import * as FileSaver from 'file-saver';
import { read, utils } from 'xlsx';

const db = startFirebase();

class Index extends Component {

    constructor() {
        super();
        this.state = {
            tableData: [],
            table2: [],
            InfoRows: [],
            gameID: '',
            isOpen: false,
            openView: false,
            dropDown: '1',
            date: '',
            day: '',
            shift: '',
            cashApp: '',
            cashTag: '',
            customerCashAppName: '',
            customerCashAppTime: '',
            facebookAccount: '',
            gameName: '',
            amountRecieved: '',
            amountLoaded: '',
            bonus: '',
            amountTotal: '',
            withdrawalAmount: '',
            tips: '',
            redeemedTotal: '',
            amountTransferred: ''
        }

        this.handleShift = this.handleShift.bind()
    }

    componentDidMount() {
        const dbRef = ref(db, 'user');
        onValue(dbRef, (snapshot) => {
            let records = [];
            let list = [];
            snapshot.forEach(childSnapshot => {
                let keyName = childSnapshot.key;
                let data = childSnapshot.val();
                records.push({ "key": keyName, "data": data });
                list.push(data)
            });
            this.setState({ tableData: records });
            this.setState({ gameID: records["gameID"] });
            this.setState({ table2: list });
        });
    }

    handleImport = ($event) => {
        const files = $event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    this.setState({ InfoRows: rows })
                    
                    
                    
                    for(let i of rows){
                        console.log(i)
                        set(ref(db, 'user/' + i['gameID']),
                        {
                            date: i['date'],
                            day: i['day'],
                            timeHours: i['timeHours'],
                            shift: i['shift'],
                            cashApp: i['cashApp'],
                            cashTag: i['cashTag'],
                            customerCashAppName: i['customerCashAppName'],
                            customerCashAppTime: i['customerCashAppTime'],
                            facebookAccount: i['facebookAccount'],
                            gameName: i['gameName'],
                            gameID: i['gameID'],
                            amountRecieved: i['amountRecieved'],
                            amountLoaded: i['amountLoaded'],
                            bonus: i['bonus'],
                            amountTotal: i['amountTotal'],
                            withdrawalAmount: i['withdrawalAmount'],
                            tips: i['tips'],
                            redeemedTotal: i['redeemedTotal'],
                            amountTransferred: i['amountTransferred'],
                            dropDown: i['dropDown']
                        })
                        .catch((error) => { alert(error) });
                    }
                    alert("Data added successfully!!")
                    
                }

            }
            reader.readAsArrayBuffer(file);

        }

    }

    handleExport = () => {
        
        const fileName = "Samyak"
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const ws = XLSX.utils.json_to_sheet(this.state.table2);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);

    }

    handledropDown = (event) => {
        this.setState({ dropDown: event.target.value });
    }

    handleShift = () => {
        var time = this.state.timeHours
        if (time > '23' && time < '7') {
            this.setState({ shift: '1st Shift' })
        } else if (time >= '7' && time < '12') {
            this.setState({ shift: '2nd Shift' })
        } else {
            this.setState({ shift: '3rd Shift' })
        }
    }

    handleCashTag = (event) => {
        this.setState({ cashApp: event.target.value })
        const cashName = event.target.value
        if (cashName === 'Kyla Jones') {
            this.setState({ cashTag: '$F53535' })
        } else if (cashName === 'Brian Moore') {
            this.setState({ cashTag: '$G23232' })
        } else if (cashName === 'Kim Wood') {
            this.setState({ cashTag: '$F74747' })
        } else if (cashName === 'Client') {
            this.setState({ cashTag: 'Client' })
        } else if (cashName === 'Transfer') {
            this.setState({ cashTag: 'Transfer' })
        } else {
            this.setState({ cashTag: '' })
        }
    }

    handleGameName = (event) => {
        const gName = event.target.value
        this.setState({ gameID: gName })
        const lastFour = gName.slice(-4)
        if (lastFour === '7506') {
            this.setState({ gameName: 'Fire Kirin' })
        } else if (lastFour === '7503') {
            this.setState({ gameName: 'Milky Way' })
        } else if (lastFour === '7504') {
            this.setState({ gameName: 'Orion Stars' })
        } else if (lastFour === '7507') {
            this.setState({ gameName: 'Game Valley' })
        } else if (lastFour === '7512') {
            this.setState({ gameName: 'Panda Mania' })
        } else {
            this.setState({ gameName: 'Invalid Game ID' })
        }

    }

    storeAmountLoaded = (event) => {
        this.setState({ amountLoaded: event.target.value })
        this.handleTotal()
    }

    storeBonus = (event) => {
        this.setState({ bonus: event.target.value })
        this.handleTotal()
    }

    showDetails = (key, status) => {
        if (status === 'edit') {
            this.setState({ isOpen: true });
        } else {
            this.setState({ openView: true });
        }

        const dbref = ref(db, 'user')
        get(child(dbref, '/' + key)).then((snapshot) => {
            this.setState({
                date: snapshot.val().date,
                day: snapshot.val().day,
                shift: snapshot.val().shift,
                cashApp: snapshot.val().cashApp,
                cashTag: snapshot.val().cashTag,
                customerCashAppName: snapshot.val().customerCashAppName,
                customerCashAppTime: snapshot.val().customerCashAppTime,
                facebookAccount: snapshot.val().facebookAccount,
                gameID: key,
                gameName: snapshot.val().gameName,
                dropDown: snapshot.val().dropDown,
                amountRecieved: snapshot.val().amountRecieved,
                amountLoaded: snapshot.val().amountLoaded,
                bonus: snapshot.val().bonus,
                amountTotal: snapshot.val().amountTotal,
                withdrawalAmount: snapshot.val().withdrawalAmount,
                tips: snapshot.val().tips,
                redeemedTotal: snapshot.val().redeemedTotal,
                amountTransferred: snapshot.val().amountTransferred
            })
        })
    }

    hideDetails = () => {
        this.setState({
            isOpen: false,
            openView: false
        })
    }

    deleteData = (key) => {
        const userData = ref(db, "user/" + key);
        remove(userData);
    }

    updateChanges = (key) => {
        update(ref(db, 'user/' + key),
            {
                cashApp: this.state.cashApp,
                cashTag: this.state.cashTag,
                customerCashAppName: this.state.customerCashAppName,
                customerCashAppTime: this.state.customerCashAppTime,
                dropDown: this.state.dropDown,
                facebookAccount: this.state.facebookAccount,
                gameName: this.state.gameName,
                amountRecieved: this.state.amountRecieved,
                amountLoaded: this.state.amountLoaded,
                bonus: this.state.bonus,
                amountTotal: this.state.amountTotal,
                tips: this.state.tips,
                redeemedTotal: this.state.redeemedTotal,
                amountTransferred: this.state.amountTransferred,
            })
            .then(() => { alert('Data updated successfully!') })
            .catch((error) => { alert(error) });
    }


    render() {
        return (

            <div>
                <div className='card border-secondary mb-4 m-5' style={{ background: '#E3F6FF' }}>
                    <div className='card-header'>
                        <h3 style={{ margin: 40 }}>Add User</h3>
                        <div className='userDetails-box' style={{ background: '#FFF' }}>
                            <img className='imageIcon' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgiCAtQgM3cTIjwusaENd25jahrqpsHlCAcQ&usqp=CAU' alt='' ></img>
                            <div className='username-box'>
                                <h6>Username</h6>
                                <button type='submit' className='btn btn-primary'>Logout</button>
                            </div>
                        </div>
                    </div>
                    <div className='card-body'>
                        <div className='addDetails-div'>
                            <button type='submit' className='btn btn-primary m-2'>
                                <Link style={{ textDecoration: 'none' }} to='/userDetails' className='link'>Add Details</Link>
                            </button>
                            <form className="form-inline my-2 my-lg-0">
                                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                                <button className='btn btn-outline-primary my-2 my-sm-0 m-5' type='submit' onClick={this.handleExport}> <BsUpload /> Export</button>
                            </form>
                            <form className="form-inline my-2 my-lg-0">
                           
                                {/* <button className='btn btn-outline-primary my-2 my-sm-0 m-1' type='file' onClick={this.handleImport}> <BsDownload /> Import</button> */}
                                <div className="custom-file">
    
                                    <input type="file" name="file" className="custom-file-input" id="inputGroupFile" required onChange={this.handleImport}
                                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                                    <label className="custom-file-label" >Import .csv file</label>
                                </div>
                                
                            </form>
                        </div>
                        <div>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Sr. No.</th>
                                        <th>Cashpp Name</th>
                                        <th>Cashapp Name</th>
                                        <th>Total Loaded</th>
                                        <th>Total Redemeed</th>
                                        <th>GameID</th>
                                        <th>GameName</th>
                                        <th>Referral Bonus</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.tableData.map((rowdata, index) => {
                                        return (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{rowdata.data.cashApp}</td>
                                                <td>{rowdata.data.customerCashAppName}</td>
                                                <td>{rowdata.data.amountLoaded}</td>
                                                <td>{rowdata.data.redeemedTotal}</td>
                                                <td>{rowdata.key}</td>
                                                <td>{rowdata.data.gameName}</td>
                                                <td>{rowdata.data.bonus}</td>
                                                <td>
                                                    <BsEye style={{ margin: "5px" }} onClick={() => this.showDetails(rowdata.key, "view")}
                                                        onMouseOver={({ target }) => target.style.color = "blue"}
                                                        onMouseOut={({ target }) => target.style.color = "black"} />
                                                    <BsPencilSquare style={{ margin: "5px" }} onClick={() => this.showDetails(rowdata.key, "edit")}
                                                        onMouseOver={({ target }) => target.style.color = "blue"}
                                                        onMouseOut={({ target }) => target.style.color = "black"} />
                                                    <BsTrash style={{ margin: "5px" }} onClick={() => this.deleteData(rowdata.key)}
                                                        onMouseOver={({ target }) => target.style.color = "blue"}
                                                        onMouseOut={({ target }) => target.style.color = "black"} />
                                                </td>
                                            </tr>

                                        )
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
                <Modal show={this.state.isOpen} dialogClassName='modalClass'>
                    <div className='card border-secondary mb-4 m-5' style={{ background: '#E3F6FF' }}>
                        <div className='card-header'>
                            <h3 style={{ margin: 40 }}>Edit User Details</h3>
                        </div>
                        <div className='card-body'>
                            <table className='table'>
                                <tbody>
                                    <tr>
                                        <td>
                                            <label><b>Date : </b></label><br></br>
                                            <input className='input' type="date" value={this.state.date} disabled />
                                        </td>

                                        <td>
                                            <label><b>Day : </b></label><br></br>
                                            <input className='input' type="text" value={this.state.day} disabled />
                                        </td>

                                        <td>
                                            <label><b>Shift Timing : </b></label><br></br>
                                            <input className='input' type="text" value={this.state.shift} disabled />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <label htmlFor="cashapp"><b>Our Cashapp :</b></label><br></br>
                                            <select className='input' name="cashapp" id="cashapp" required value={this.state.cashApp}
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
                                                value={this.state.cashTag} />
                                        </td>

                                        <td>
                                            <label><b>Customer cashapp name : </b></label><br></br>
                                            <input className='input' type="text" required value={this.state.customerCashAppName}
                                                onChange={e => { this.setState({ customerCashAppName: e.target.value }); }} />
                                        </td>

                                        <td>
                                            <label><b>Customer cashapp time : </b></label><br></br>
                                            <input className='input' type="time" required value={this.state.customerCashAppTime}
                                                onChange={e => { this.setState({ customerCashAppTime: e.target.value }); }} />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <label htmlFor="fbook"><b>Facebook Account :</b></label><br></br>
                                            <select className='input' name="fbook" id="fbook" required value={this.state.facebookAccount}
                                                onChange={e => { this.setState({ facebookAccount: e.target.value }); }}>
                                                <option value="Austin Scott">Austin Scott</option>
                                                <option value="Lipa Lynn">Lipa Lynn</option>
                                                <option value="Grace Lessen">Grace Lessen</option>
                                                <option value="Colton Hammer">Colton Hammer</option>
                                            </select>
                                        </td>

                                        <td>
                                            <label htmlFor="action"><b>Action :</b></label><br></br>
                                            <select className='input' name="action" id="action" value={this.state.dropDown}
                                                onChange={this.handledropDown} required>
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
                                            <input className='input' type="text" value={this.state.gameID} required disabled
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
                                                    <input className='input' type='number' id='amtRec' required
                                                        onChange={e => { this.setState({ amountRecieved: e.target.value }); }} ></input>
                                                </td>

                                                <td>
                                                    <label><b>Amount Loaded : </b></label><br></br>
                                                    <input className='input' type='number' id='amtLod' required
                                                        onChange={this.storeAmountLoaded} ></input>
                                                </td>

                                                <td>
                                                    <label><b>Bonus : </b></label><br></br>
                                                    <input className='input' type='number' id='bonus' required
                                                        onChange={this.storeBonus}></input>
                                                </td>

                                                <td>
                                                    <label><b>Total : </b></label><br></br>
                                                    <input className='input' type='number' required
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
                                                        onChange={e => { this.setState({ withdrawalAmount: e.target.value }); }}></input>
                                                </td>

                                                <td>
                                                    <label><b>Withdrawal Amount : </b></label><br></br>
                                                    <input type='number' required
                                                        onChange={e => { this.setState({ withdrawalAmount: e.target.value }); }}></input>
                                                </td>

                                                <td>
                                                    <label><b>Tips : </b></label><br></br>
                                                    <input type='number' required
                                                        onChange={e => { this.setState({ tips: e.target.value }); }}></input>
                                                </td>

                                                <td>
                                                    <label><b>Total : </b></label><br></br>
                                                    <input type='number' disabled
                                                        onChange={e => { this.setState({ redeemedTotal: e.target.value }); }}></input>
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
                                                        onChange={e => { this.setState({ amountTransferred: e.target.value }); }}></input>
                                                </td>

                                                <td>
                                                    <label><b>Amount Transferred : </b></label><br></br>
                                                    <input type='number' required
                                                        onChange={e => { this.setState({ amountTransferred: e.target.value }); }}></input>
                                                </td>

                                                <td>
                                                    <label><b>Bonus : </b></label><br></br>
                                                    <input type='number' required
                                                        onChange={e => { this.setState({ bonus: e.target.value }); }}></input>
                                                </td>

                                                <td>
                                                    <label><b>Total : </b></label><br></br>
                                                    <input type='number' disabled
                                                        onChange={e => { this.setState({ amountTotal: e.target.value }); }}></input>
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
                                                        onChange={e => { this.setState({ amountRecieved: e.target.value }); }}></input>
                                                </td>

                                                <td>
                                                    <label><b>Amount Loaded : </b></label><br></br>
                                                    <input type='number' required
                                                        onChange={e => { this.setState({ amountLoaded: e.target.value }); }}></input>
                                                </td>

                                                <td>
                                                    <label><b>Bonus : </b></label><br></br>
                                                    <input type='number' required
                                                        onChange={e => { this.setState({ bonus: e.target.value }); }}></input>
                                                </td>

                                                <td>
                                                    <label><b>Total : </b></label><br></br>
                                                    <input type='number' disabled
                                                        onChange={e => { this.setState({ amountTotal: e.target.value }); }}></input>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='buttons'>
                        <button type='submit' className='btn btn-danger m-1' onClick={() => this.hideDetails()}>Cancel</button>
                        <button type='submit' className='btn btn-primary m-1' onClick={() => this.updateChanges(this.state.gameID)}>
                            Confirm</button>
                    </div>
                </Modal>

                <Modal show={this.state.openView} dialogClassName='modalClass'>
                    <div className='card border-secondary mb-4 m-5' style={{ background: '#E3F6FF' }}>
                        <div className='card-header'>
                            <h3 style={{ margin: 40 }}>Viewing user Details</h3>
                        </div>
                        <div className='card-body'>
                            <table className='table'>
                                <tbody>
                                    <tr>
                                        <td>
                                            <label><b>Date : </b></label><br></br>
                                            <input className='input' type="date" value={this.state.date} disabled />
                                        </td>

                                        <td>
                                            <label><b>Day : </b></label><br></br>
                                            <input className='input' type="text" value={this.state.day} disabled />
                                        </td>

                                        <td>
                                            <label><b>Shift Timing : </b></label><br></br>
                                            <input className='input' type="text" value={this.state.shift} disabled />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <label htmlFor="cashapp"><b>Our Cashapp :</b></label><br></br>
                                            <select className='input' name="cashapp" id="cashapp" required disabled value={this.state.cashApp}
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
                                                value={this.state.cashTag} />
                                        </td>

                                        <td>
                                            <label><b>Customer cashapp name : </b></label><br></br>
                                            <input className='input' type="text" required disabled value={this.state.customerCashAppName} />
                                        </td>

                                        <td>
                                            <label><b>Customer cashapp time : </b></label><br></br>
                                            <input className='input' type="time" required disabled value={this.state.customerCashAppTime} />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <label htmlFor="fbook"><b>Facebook Account :</b></label><br></br>
                                            <select className='input' name="fbook" id="fbook"
                                                value={this.state.facebookAccount} required disabled>
                                                <option value="Austin Scott">Austin Scott</option>
                                                <option value="Lipa Lynn">Lipa Lynn</option>
                                                <option value="Grace Lessen">Grace Lessen</option>
                                                <option value="Colton Hammer">Colton Hammer</option>
                                            </select>
                                        </td>

                                        <td>
                                            <label htmlFor="action"><b>Action :</b></label><br></br>
                                            <select className='input' name="action" id="action"
                                                value={this.state.dropDown} required disabled>
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
                                            <input className='input' type="text" value={this.state.gameID} required disabled></input>
                                        </td>

                                        <td>
                                            <label htmlFor="gname"><b>Game Name :</b></label><br></br>
                                            <select className='input' name="gname" id="gname" value={this.state.gameName} required disabled>
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
                                                    <input className='input' type='number' id='amtRec' required disabled
                                                        value={this.state.amountRecieved}></input>
                                                </td>

                                                <td>
                                                    <label><b>Amount Loaded : </b></label><br></br>
                                                    <input className='input' type='number' id='amtLod' required disabled
                                                        value={this.state.amountLoaded}></input>
                                                </td>

                                                <td>
                                                    <label><b>Bonus : </b></label><br></br>
                                                    <input className='input' type='number' id='bonus' required disabled
                                                        value={this.state.bonus}></input>
                                                </td>

                                                <td>
                                                    <label><b>Total : </b></label><br></br>
                                                    <input className='input' type='number' required disabled
                                                        value={this.state.amountTotal}></input>
                                                </td>
                                            </tr>
                                        )
                                    }

                                    {
                                        this.state.dropDown === '2' && (
                                            <tr>
                                                <td>
                                                    <label><b>Withdrawal Amount : </b></label><br></br>
                                                    <input type='number' required disabled
                                                        value={this.state.withdrawalAmount}></input>
                                                </td>

                                                <td>
                                                    <label><b>Withdrawal Amount : </b></label><br></br>
                                                    <input type='number' required disabled
                                                        value={this.state.withdrawalAmount}></input>
                                                </td>

                                                <td>
                                                    <label><b>Tips : </b></label><br></br>
                                                    <input type='number' required disabled
                                                        value={this.state.tips}></input>
                                                </td>

                                                <td>
                                                    <label><b>Total : </b></label><br></br>
                                                    <input type='number' disabled
                                                        value={this.state.redeemedTotal}></input>
                                                </td>
                                            </tr>
                                        )
                                    }

                                    {
                                        this.state.dropDown === '3' && (
                                            <tr>
                                                <td>
                                                    <label><b>Amount Transferred : </b></label><br></br>
                                                    <input type='number' required disabled
                                                        value={this.state.amountTransferred}></input>
                                                </td>

                                                <td>
                                                    <label><b>Amount Transferred : </b></label><br></br>
                                                    <input type='number' required disabled
                                                        value={this.state.amountTransferred}></input>
                                                </td>

                                                <td>
                                                    <label><b>Bonus : </b></label><br></br>
                                                    <input type='number' required disabled
                                                        value={this.state.bonus}></input>
                                                </td>

                                                <td>
                                                    <label><b>Total : </b></label><br></br>
                                                    <input type='number' disabled
                                                        value={this.state.amountTotal}></input>
                                                </td>
                                            </tr>
                                        )
                                    }

                                    {
                                        this.state.dropDown === '4' && (
                                            <tr>
                                                <td>
                                                    <label><b>Amount Recieved : </b></label><br></br>
                                                    <input type='number' required disabled
                                                        value={this.state.amountRecieved}></input>
                                                </td>

                                                <td>
                                                    <label><b>Amount Loaded : </b></label><br></br>
                                                    <input type='number' required disabled
                                                        value={this.state.amountLoaded}></input>
                                                </td>

                                                <td>
                                                    <label><b>Bonus : </b></label><br></br>
                                                    <input type='number' required disabled
                                                        value={this.state.bonus}></input>
                                                </td>

                                                <td>
                                                    <label><b>Total : </b></label><br></br>
                                                    <input type='number' disabled
                                                        value={this.state.amountTotal}></input>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='buttons'>
                        <button type='submit' className='btn btn-danger m-1' onClick={() => this.hideDetails()}>Cancel</button>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Index;
