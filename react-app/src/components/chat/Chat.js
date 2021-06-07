import React, { useEffect, useRef, useState } from 'react';
import socketClient from "socket.io-client";
import { URL_DOMAIN } from '../../constants'
import { Button } from 'react-bootstrap'
import { useAuth } from '../../contexts/UserContext';
import * as urls from '../../services/url';
import fetchApi from '../../services/fetchApi';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router';
import MessageComponent from './Message';
import LoadingComponent from '../commons/LoadingComponent';

var socket;

function Chat() {

    const history = useHistory();

    const auth = useAuth();

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [typing, setTyping] = useState({ status: 0, statusText: "" });
    const [conversation_id, setConversationId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [ready, setReady] = useState(false);
    const lastMessageRef = useRef();
    const chatViewRef = useRef();

    const getConversation = async (id) => {
        setLoading(true);
        try {
            const token = Cookies.get('token');
            const res = await fetchApi('GET', `${urls.CONVERSATION_URL}/${id}`, null, token);
            if (res.status === 0) {
                alert(res.message);
                history.goBack();
            } else {
                if (res.message) {
                    saveConversation(id);
                    getMessage(id);
                } else {
                    getMessage(id);
                }
            }
        } catch (e) {
            alert(e.message);
            history.goBack();
        }
        setLoading(false);
    }

    const saveConversation = async (id) => {
        setLoading(true);
        try {
            const token = Cookies.get('token');
            const res = await fetchApi('POST', `${urls.CONVERSATION_URL}`, { user_id: id }, token);
            if (res.status === 0) {
                alert(res.message);
                history.goBack();
            }
        } catch (e) {
            alert(e.message);
            history.goBack();
        }
        setLoading(false);
    }
    const getMessage = async (id) => {
        setLoading(true);
        try {
            const token = Cookies.get('token');
            const res = await fetchApi('GET', `${urls.CONVERSATION_URL}/${id}/messages`, null, token);
            if (res.status === 0) {
                alert(res.message);
            } else {
                let data = res.data;
                data = data.reverse();
                setMessages([...data]);
            }
        } catch (e) {
            alert(e.message);
        }
        setReady(true);
        setLoading(false);
    }

    const handleTyping = () => {
        socket.emit('typing', auth.user);
    }

    const handleStopTyping = () => {
        socket.emit('stop-typing');
    }

    const handleSend = () => {
        if (message && message !== '') {
            let data = {
                account_id: auth.user.account_id,
                type: 1,
                content: message,
                conversation_id: conversation_id,
                avatar: auth.user.profile.avatar
            }
            socket.emit('sent', data);
            data.statusText = 'đang gửi';
            setMessages([...messages, data]);
            setMessage('');
        }
    }

    const initSocketRecieved = () => {
        socket.on('recieved', (data) => {
            setMessages([...messages, data]);
        });

        socket.on('sent', () => {
            let ms = messages;
            delete ms[messages.length-1].statusText;
            setMessages([...ms]);
        });

        socket.on('sent-err', () => {
            let ms = messages;
            ms[messages.length-1].statusText = 'Gửi thất bại';
            setMessages([...ms]);
        })
    }

    const initSocket = () => {
        socket = socketClient(URL_DOMAIN);

        socket.emit('join', conversation_id);

        socket.on('typing', () => {
            setTyping({ status: 1, statusText: "Đang nhập..." })
        })
        socket.on('stop-typing', () => {
            setTyping({ status: 0, statusText: '' })
        })
    }

    const scrollToBottom = () => {
        // chatViewRef.current.scrollIntoView({ behavior: "smooth" })
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "start"
            });
        }

    }

    useEffect(() => {

        const pathName = history.location.pathname;
        let p = pathName.split('/');
        let id = p[p.length - 1];
        id = parseInt(id);
        if (Number.isInteger(id)) {

            if (auth.user.roles.length === 1 && auth.user.account_id !== id) {
                alert("Không thể nhắn tin với người dùng khác");
                history.goBack();
            } else {

                getConversation(id);
                setConversationId(id);

            }
        } else {
            console.log("id not valid");
            history.push("/404")
        }

    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (conversation_id) {
            initSocket();
        }
    }, [conversation_id]);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (socket) {
            initSocketRecieved();
        }
        scrollToBottom();

    }, [messages, typing]);// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            {(loading || !ready) && <LoadingComponent />}
            <header className="py-4 mb-3" style={{ borderBottom: "1px solid #999" }}>
                <div className="align-center" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                    Nhắn tin
                </div>
            </header>
            <div ref={chatViewRef} className="chat-app d-flex flex-column align-items-center py-3" style={{ height: "80vh", overflowY: "scroll" }}>
                {
                    messages.map((message, index) => {
                        let showTitle = true;
                        if (index !== 0 && messages[index - 1].account_id === message.account_id) {
                            showTitle = false;
                        }
                        if (index === messages.length - 1) {
                            return (
                                <MessageComponent message={message} key={index} id={conversation_id} showTitle={showTitle} />
                            )
                        } else {
                            return (
                                <MessageComponent message={message} key={index} id={conversation_id} showTitle={showTitle} />
                            )
                        }
                    })
                }

                {
                    typing.status === 1
                        ?
                        <p className="text-center p-0" ref={lastMessageRef}>
                            {typing.statusText}
                        </p>
                        :
                        <p ref={lastMessageRef}></p>
                }
            </div>

            <div className="d-flex pt-3 mt-2" style={{ borderTop: '1px solid #999' }}>
                <div className="col-3" />
                <div className="col-4">
                    <input
                        className="form-control"
                        style={{ width: "100%", background: "#e5e5e5" }}
                        value={message}
                        onChange={(e) => {
                            handleTyping();
                            setMessage(e.target.value)
                        }}
                        onBlur={() => {
                            handleStopTyping();
                        }}
                    />
                </div>
                <div className="col-2">
                    <Button
                        variant="success"
                        style={{ width: "100%" }}
                        onClick={handleSend}
                    >
                        Gửi
                </Button>
                </div>
            </div>
        </div>
    )
}

export default Chat;