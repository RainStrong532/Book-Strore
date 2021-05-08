import React from 'react';
import "../../assets/css/loading.css";
import spinner from '../../assets/images/circle-notch-solid.svg'

function LoadingComponent({desc}) {
    return (
        <div className="loading">
            <div className="spinner">
                <img src={spinner} alt="Loading..." />
            </div>
            <div className="desc">{desc ? desc : "Đang tải..."}</div>
        </div>
    )
}

export default LoadingComponent;
