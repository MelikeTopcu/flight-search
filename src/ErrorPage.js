import './App.css';
import React, { useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

library.add(faTimesCircle);

function ErrorPage() {
    const ref = useRef(null);
    const history = useHistory();

    const returnHome = () => {
        let path = `/`;
        history.push(path);
        window.localStorage.clear();
    }
    return (
        <div className="error-page" ref={ref}>
            <FontAwesomeIcon color="red" icon="times-circle" /> {'Kabin seçiminiz tamamlanamadı.'}
            <hr></hr>
            <Button onClick={returnHome} variant="danger">{'Başa Dön'}</Button>
        </div >
    );
}
export default ErrorPage;