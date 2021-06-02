import React, { useEffect, useState } from 'react';
import { ROLES } from '../../constants';
import { useAuth } from '../../contexts/UserContext';
import ChatLeftView from './ChatLeftView';
import ChatRightView from './ChatRightView';

function MessageComponent({ message, id, showTitle }) {
    const auth = useAuth();
    const [isMe, setMe] = useState(null);
    const [role, setRole] = useState(ROLES['USER']);

    useEffect(() => {
        if (message.account_id === auth.user.account_id) {
            setMe(true);
        } else {
            setMe(false);
        }
        if (auth.user.roles.length > 1) {
            setRole(ROLES['ADMIN']);
        }
    }, [message])
    return (
        <div style={{ width: "80%" }}>
            {
                role === ROLES['USER']
                    ?
                    isMe
                        ?
                        <ChatRightView message={message} title="Tôi" showTitle={showTitle} />
                        :
                        <ChatLeftView message={{ ...message, avatar: null }} title="Admin" showTitle={showTitle} />
                    :
                    (isMe || message.account_id !== id)
                        ?
                        <ChatRightView message={message} title={isMe ? "Tôi" : message.firstname} showTitle={showTitle} />
                        :
                        <ChatLeftView message={message} title={message.firstname} showTitle={showTitle} />
            }
        </div>
    )
}

export default MessageComponent;