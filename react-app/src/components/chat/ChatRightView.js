import React from 'react';
import avatar from '../../assets/images/avatar.jpg';

function Message({ message, title, showTitle }) {
    return (
        <>
            <div className="message-item d-flex px-3 py-1" style={{ width: "80%", margin: "0 auto" }}>
                <div className="inner" style={{ width: "5rem" }}>

                </div>
                <div className="flex-grow-1 d-flex justify-content-end flex-column">
                    <div className="d-flex justify-content-end p-2 align-items-center ml-4" style={{ background: "blue", borderRadius: ".5rem" }}>
                        ‍<span style={{ color: "#FFF" }}>{message.content}</span>
                    </div>
                    {
                        message.statusText
                            ?
                            <p className="text-center p-0">{message.statusText}</p>
                            :
                            <></>
                    }
                </div>
                <div className="d-flex flex-column ml-3">
                    {
                        (showTitle === undefined || showTitle)
                            ?
                            <p className="p-0 text-center" style={{ marginBottom: "0.5rem" }}>{title}</p>
                            :
                            <></>
                    }

                    <div className="d-flex justify-content-center align-items-center" style={{ width: "50px", height: (showTitle === undefined || showTitle) ? "50px" : "auto", borderRadius: "50%", overflow: "hidden" }}>
                        {
                            (showTitle === undefined || showTitle)
                                ?
                                <img src={message.avatar ? message.avatar.url : avatar} alt="Ảnh đại diện" style={{ width: "100%", height: "auto" }} />
                                :
                                <></>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Message;