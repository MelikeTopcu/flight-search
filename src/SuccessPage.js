import './App.css';
import React, { useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

library.add(faCheckCircle);

function SuccessPage() {
    const ref = useRef(null);

    return (
        <div className="success-page" ref={ref}>
              <FontAwesomeIcon color="green" icon="check-circle" />  {'Kabin seçiminiz tamamlandı.'}
            <hr></hr>
            {'Toplam tutar'} {'TRY'} {localStorage.getItem('price')} 
        </div >
    );
 }                                           
export default SuccessPage;