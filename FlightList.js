import './App.css';
import React, { useRef, useEffect, useState } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { useHistory } from "react-router-dom";

function FlightList() {
    const ref = useRef(null);

    const getData = () => {
        fetch('flights.json'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                setData(myJson)
            });
    }
    useEffect(() => {
        getData()
    }, [])
    let [data, setData] = useState([]);

    const history = useHistory();
    const routeChange = () => {
        let path = `/`;
        history.push(path);
    }

    let [newData, setNew] = useState(0);


    const handle = (e) => {
        newData = e.target.value;
        setNew(newData);

        let prevOrders = [...data.flights];
        let clicked = newData.slice(2, 3);
        var itemToMove = prevOrders.splice(clicked, 1);
        var updatedOrderList = itemToMove.concat(prevOrders)
        data = [{ flights: updatedOrderList }]

        document.getElementById(newData.slice(0, 2) + 0).checked = true;

        setData(data[0])
    }

    let [price, setPrice] = useState(0);

    const handleFly = (e) => {
        price = e.target.value;
        setPrice(price);

        localStorage.setItem("price", price);

        if (localStorage.getItem('status') === "AVAILABLE") {
            let path = `successPage`;
            history.push(path);
        } else if (localStorage.getItem('status') === "ERROR") {
            let path = `errorPage`;
            history.push(path);
        }
    }

    const [show, setSwitch] = useState(false);
    const handleSwitchButton = () => {
        setSwitch(!show);
        console.log("saadas", show)
    }

    let [newList] = useState([]);

    const handleSortPrice = () => {
        newList = data.flights.sort(function (a, b) {
            return parseInt(a.fareCategories.ECONOMY.subcategories[0].price.amount) - parseInt(b.fareCategories.ECONOMY.subcategories[0].price.amount);
        })
        data = [{ flights: newList }]
        setData(data[0])
        document.getElementById('re' + 0).checked = false;
        document.getElementById('rb' + 0).checked = false;
    }

    let [newListTime, getNumberFromTime] = useState([]);

    const handleSortTime = () => {
        getNumberFromTime = (time) => +time.replace(/:/g, '')
        newListTime = data.flights.sort((a, b) => getNumberFromTime(a.arrivalDateTimeDisplay) - getNumberFromTime(b.arrivalDateTimeDisplay))
        data = [{ flights: newListTime }]
        setData(data[0])
        document.getElementById('re' + 0).checked = false;
        document.getElementById('rb' + 0).checked = false;
    }
    return (
        <div className="flight-list" ref={ref}>
            <div className="flight-pro-info">
                <Button style={{ width: '150px' }} onClick={routeChange} variant="danger">{'Uçuş'}</Button>
                <br></br>
                <div>
                    {localStorage.getItem('departure')}-{localStorage.getItem('arrival')},  {localStorage.getItem("counter") ? localStorage.getItem("counter") : '1'} {'Yolcu'}
                </div>
                <br>
                </br>
                <div>
                    <span style={{ fontWeight: 'bold', marginRight: '10px' }}>{'Promosyon Kodu'}</span>
                    <BootstrapSwitchButton onChange={handleSwitchButton} checked={show} onstyle="outline-primary" offstyle="outline-dark" />
                    <br></br>
                    {
                        show === true &&
                        <div style={{ width: 'max-content' }}>
                            <span>{'Promosyon Kodu seçeneği ile tüm Economy kabini Eco fly paketlerini %50 indirimle satın alabilirsiniz!'}</span> <br></br>
                            <br></br>
                            <span>{'Promosyon Kodu seçeneği aktifken Eco Fly Haricinde seçim yapılmamaktadır.'}</span>
                        </div>
                    }
                </div>
            </div>
            <Card className="flight-list-card">
                <Card.Header className="card-filter-criteria">
                    <span className="sort-criteria">{'Sıralama Kriteri'}</span>
                    <span className="sort-filter-button">
                        <Button onClick={handleSortPrice} variant="Light" style={{ color: 'white', border: '1px solid white' }}>{'Ekonomi Ücreti'}</Button>
                        <Button onClick={handleSortTime} variant="Light" style={{ color: 'white', border: '1px solid white' }}>{'Kalkış Saati'}</Button>
                    </span>
                </Card.Header>

                <Card.Body>
                    <Card.Text >
                        <div className="card-list-groups">
                            <ListGroup>
                                {data && data.flights && data.flights.map((each, index) =>
                                    <ListGroup.Item key={index}>

                                        <div className="card-list-info">
                                            <ListGroup.Item style={{ display: 'flex' }}>
                                                <div className="card-list-first">
                                                    <div style={{ fontWeight: 'bold' }} className="card-info"><span>{each.arrivalDateTimeDisplay}</span> {'-'}<span>{each.departureDateTimeDisplay}</span></div>
                                                    <hr></hr>
                                                    <div className="card-info"><span>{each.originAirport.code}</span><span>{each.destinationAirport.code}</span></div>
                                                    <div className="card-info"><span>{each.originAirport.city.name}</span>-<span>{each.destinationAirport.city.name}</span></div>
                                                </div>
                                                <div className="card-list-second">
                                                    <span>{'Uçuş Süresi'}</span>
                                                    <div style={{ fontWeight: 'bold' }}>{each.flightDuration}</div>
                                                </div>
                                            </ListGroup.Item>
                                            <ListGroup.Item style={{ width: '40%' }}>
                                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                                    <div>
                                                        <input onClick={handle} id={'re' + index} type="radio" name="radioButtonSet" value={'re' + index} /><label htmlFor={'re' + index}>ECONOMY</label>
                                                    </div>
                                                    <div>{'Yolcu Başına'}
                                                        <br></br>
                                                        <span style={{ fontWeight: 'bold' }}>{each.fareCategories.ECONOMY && each.fareCategories.ECONOMY.subcategories && each.fareCategories.ECONOMY.subcategories[0].price.currency}
                                                            {''} {each.fareCategories.ECONOMY && each.fareCategories.ECONOMY.subcategories 
                                                           && show ? each.fareCategories.ECONOMY.subcategories[0].price.amount / 2 : each.fareCategories.ECONOMY.subcategories[0].price.amount}</span>
                                                    </div>
                                                </div>
                                            </ListGroup.Item>

                                            <ListGroup.Item style={{ width: '40%' }}>
                                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                                    <div>
                                                        <input onClick={handle} id={'rb' + index} type="radio" name="radioButtonSet" value={'rb' + index} /><label htmlFor={'rb' + index}>BUSINESS</label>
                                                    </div>
                                                    <div>{'Yolcu Başına'}
                                                        <br></br>
                                                        <span style={{ fontWeight: 'bold' }}>{each.fareCategories.BUSINESS && each.fareCategories.BUSINESS.subcategories && each.fareCategories.BUSINESS.subcategories[0].price.currency}
                                                            {''}  {each.fareCategories.BUSINESS && each.fareCategories.BUSINESS.subcategories && each.fareCategories.BUSINESS.subcategories[0].price.amount}</span>
                                                    </div>
                                                </div>

                                            </ListGroup.Item>
                                        </div>
                                        {document.getElementById('re' + index) && document.getElementById('re' + index).checked &&
                                            <ListGroup.Item style={{ display: 'flex' }}>
                                                {each.fareCategories.ECONOMY && each.fareCategories.ECONOMY.subcategories && each.fareCategories.ECONOMY.subcategories.map((item, idx) =>
                                                    <Card style={{ width: '33%', height: '310px' }} key={'re' + idx}>
                                                        <Card.Header>
                                                            <div className="card-list-header">
                                                                <div>{item.brandCode}</div>
                                                                <div>{item.price.currency} {show && item.brandCode === "ecoFly" ? item.price.amount / 2 : item.price.amount}</div>
                                                            </div>
                                                        </Card.Header>
                                                        <Card.Body>
                                                            {
                                                                item.rights.map((eac) => <ListGroup.Item>{eac}</ListGroup.Item>)
                                                            }
                                                        </Card.Body>
                                                        {
                                                            idx > 0 && show ?
                                                                <Button id={idx} value={item.price.amount} onClick={handleFly} disabled={show} variant="danger">{'Uçuşu Seç'}</Button>
                                                                : <Button id={idx} value={show ? item.price.amount / 2 : item.price.amount} onClick={handleFly} variant="danger">{'Uçuşu Seç'}</Button>
                                                        }
                                                        {
                                                            localStorage.setItem("status", item.status)
                                                        }
                                                    </Card>)}
                                            </ListGroup.Item>
                                        }
                                        {document.getElementById('rb' + index) && document.getElementById('rb' + index).checked &&
                                            <ListGroup.Item style={{ display: 'flex' }}>
                                                {each.fareCategories.BUSINESS && each.fareCategories.BUSINESS.subcategories && each.fareCategories.BUSINESS.subcategories.map((item, idx) =>
                                                    <Card style={{ width: '33%', height: '310' }} key={'rb' + idx}>
                                                        <Card.Header>
                                                            <div className="card-list-header">
                                                                <div>{item.brandCode}</div>
                                                                <div>{item.price.currency} {item.price.amount}</div>
                                                            </div>
                                                        </Card.Header>
                                                        <Card.Body>
                                                            {
                                                                item.rights.map((eac) => <ListGroup.Item>{eac}</ListGroup.Item>)
                                                            }
                                                        </Card.Body>
                                                        {
                                                             show ?
                                                                <Button id={idx} value={item.price.amount} onClick={handleFly} disabled={show} variant="danger">{'Uçuşu Seç'}</Button>
                                                                : <Button id={idx} value={item.price.amount} onClick={handleFly} variant="danger">{'Uçuşu Seç'}</Button>
                                                        }
                                                        {
                                                            localStorage.setItem("status", item.status)
                                                        }
                                                    </Card>)}
                                            </ListGroup.Item>
                                        }
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card >

        </div >
    );
}
export default FlightList;