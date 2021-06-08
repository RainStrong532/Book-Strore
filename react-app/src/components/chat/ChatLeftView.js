import React from 'react';
import { useHistory } from 'react-router';
import avatar from '../../assets/images/avatar.jpg';
import { useAuth } from '../../contexts/UserContext';

function Message({ message, title, showTitle }) {
    const history = useHistory();
    const auth = useAuth();

    const goToProfile = () => {
        if(auth.user.roles.length > 1){
            history.push(`/profiles?profile_id=${message.account_id}`);
        }
    }
    return (
        <>
            <div className="message-item d-flex px-3 py-1" style={{ width: "80%", margin: "0 auto" }}>
                <div className="d-flex flex-column mr-3">
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
                                <img
                                    onClick={goToProfile}
                                    src={message.avatar ? message.avatar.url : avatar} alt="Ảnh đại diện" style={{ width: "100%", height: "auto", cursor: "pointer"}} />
                                :
                                <></>
                        }

                    </div>
                </div>
                <div className="flex-grow-1 d-flex justify-content-end flex-column">
                    ‍<div className="justify-content-start p-2 align-items-center mr-4" style={{ background: "#e5e5e5", borderRadius: ".5rem" }}>
                        <span style={{ color: "#333" }}>{message.content}</span>
                    </div>
                    {
                        message.statusText
                            ?
                            <p className="text-center p-0">{message.statusText}</p>
                            :
                            <></>
                    }
                </div>
                <div className="inner" style={{ width: "5rem" }}>

                </div>
            </div>
        </>
    )
}

export default Message;