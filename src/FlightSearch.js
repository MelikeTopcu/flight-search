import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlaneDeparture, faPlaneArrival, faCalendarAlt, faUserAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Button, Overlay, Popover } from 'react-bootstrap';
import { useHistory } from "react-router-dom";


function FlightSearch({ calendarRef }) {
     const ref = useRef(null);
    library.add(faPlaneDeparture, faPlaneArrival, faCalendarAlt, faUserAlt, faUserPlus);

    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);

    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
    };

    const [counter, setCounter] = useState(1);
    const increase = () => {
        setCounter(prevCount => {
            const newCount = Number(prevCount) + 1;
            localStorage.setItem("counter", newCount);
            return newCount;
        });
    };

    let decrease = () => {
        setCounter(prevCount => {
            const newCount = Number(prevCount) - 1;
            localStorage.setItem("counter", newCount);
            return newCount;
        });
    };

    if (counter <= 0) {
        decrease = () => setCounter(1);
    }

    const history = useHistory();

    const routeChange = () => {
        if (valueDeparture === "İSTANBUL" && valueArrival === "ANTALYA") {
            let path = `/flightList`;
            history.push(path);
        }
    }

    const [valueDeparture, setValueDeparture] = useState(null);
    const [valueArrival, setValueArrival] = useState(null);

    useEffect(() => {
        const initialValue = localStorage.getItem("counter");
        window.localStorage.setItem('departure', valueDeparture);
        window.localStorage.setItem('arrival', valueArrival);

        if (initialValue) setCounter(initialValue);
    }, [valueDeparture, valueArrival]);


    return (
        <div className="flight-search" ref={ref}>

            <header className="flight-search-header">
                <span>
                    {'Merhaba,'}
                </span>
                <span>
                    {'Nereyi keşfetmek istersiniz?'}
                </span>
                <div>
                    <div className="search-form-label">
                        <div className="select-origin">
                            <FontAwesomeIcon className="plane-icon" icon="plane-departure" />
                            <select className="select"
                                value={valueDeparture !== '' ? valueDeparture : 'Nereden'}
                                onChange={(e) => {
                                    window.localStorage.setItem('departure', e.target.value);
                                    setValueDeparture(e.target.value);
                                }}
                            >
                                <option disabled selected value={'Nereden' || ''}>{'Nereden'}</option>
                                <option>{'İSTANBUL'}</option>
                                <option>{'ANTALYA'}</option>
                                <option>{'İZMİR'}</option>
                                <option>{'ANKARA'}</option>
                            </select>
                        </div>
                        <div className="select-destination">
                            <FontAwesomeIcon className="plane-icon" icon="plane-arrival" />
                            <select className="select"
                                value={valueArrival !== '' ? valueArrival : 'Nereye'}
                                onChange={(e) => {
                                    window.localStorage.setItem('arrival', e.target.value);
                                    setValueArrival(e.target.value);
                                }}>
                                <option disabled selected value={'Nereye' || ''}>{'Nereye'}</option>
                                <option>{'İSTANBUL'}</option>
                                <option>{'ANTALYA'}</option>
                                <option>{'İZMİR'}</option>
                                <option>{'ANKARA'}</option>
                            </select>
                        </div>
                        <Button className="button-date" active="false" variant="secondary">{'Tarih   '}<FontAwesomeIcon icon="calendar-alt" /></Button>
                        {
                            counter > 1 ?
                                <Button className="button-passanger-count"
                                    onClick={handleClick}><FontAwesomeIcon icon="user-plus" />{' '}{counter}</Button>
                                :
                                <Button className="button-passanger-count"
                                    onClick={handleClick}><FontAwesomeIcon icon="user-alt" />{' '}{counter}</Button>
                        }
                        <Overlay
                            show={show}
                            target={target}
                            placement="bottom"
                            container={ref}
                            containerPadding={20}
                        >
                            <Popover id="popover-contained">
                                <Popover.Header as="h3">{'Kabin ve Yolcu Seçimi'}</Popover.Header>
                                <Popover.Body>
                                    <div>
                                        <input id="r1" type="radio" name="radioButtonSet" value='input1' /><label htmlFor="r1">{'Economy Class'}</label>
                                        <input id="r2" type="radio" name="radioButtonSet" value='input2' /><label htmlFor="r2">{'Business Class'}</label>
                                        <br></br>
                                        <div className="passenger">
                                            <h5>{'Yolcu'}</h5>
                                            <Button className="button" variant="secondary" onClick={decrease}>{'-'}</Button>
                                            <label style={{ marginTop: "5px" }}>{counter}</label>
                                            <Button className="button" variant="secondary" onClick={increase}>{'+'}</Button>
                                        </div>

                                    </div>
                                </Popover.Body>
                            </Popover>
                        </Overlay>
                        <Button style={{ backgroundColor: '#E81932' }} onClick={routeChange} variant="danger">{'>'}</Button>
                    </div>
                </div>
            </header>
        </div >
    );
}
export default FlightSearch;