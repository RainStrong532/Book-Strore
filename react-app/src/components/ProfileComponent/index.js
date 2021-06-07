import React, { useEffect, useState } from 'react';
import CoverImageComponent from './CoverImageComponent';
import AvatarComponent from './AvatarComponent';
import UserInforComponent from './UserInforComponent';
import "../../assets/css/coverImage.css";
import { Container } from 'react-bootstrap'
import { useAuth } from '../../contexts/UserContext';
import fetchApi from '../../services/fetchApi';
import * as urls from '../../services/url';
import { Redirect } from 'react-router';
import NotAuthorizedComponent from '../commons/NotAuthorizedComponent';
import LoadingComponent from '../commons/LoadingComponent';


function ProfileComponent(props) {
    const auth = useAuth();
    console.log("auth.....", auth);
    const [other, setOther] = useState(null);
    const [redirect, setRedirect] = useState(false);

    const loadUser = async () => {
        let profile_id = new URLSearchParams(props.location.search).get("profile_id");
        if (profile_id) {
            profile_id = parseInt(profile_id);
            if (Number.isInteger(profile_id)) {
                try {
                    const other = await fetchApi("GET", urls.PROFILE_URL + "/" + profile_id);
                    if (other.message) {
                        setOther(null);
                        setRedirect(true);
                    } else {
                        setOther(other);
                        console.log("other: ", other);
                    }

                } catch (err) {
                    setOther(null);
                    setRedirect(true);
                }
            }
        }
    }

    useEffect(() => {
        loadUser();
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    if (redirect) {
        return (
            <Redirect to="/404" />
        )
    }
    else {
        if (!other) {
            return (<LoadingComponent></LoadingComponent>)
        } else {
            console.log("auth: ", auth.roles, "user: ", other.roles);
            return (
                <>
                    {
                        auth.user.roles.length >= other.roles.length
                            ?
                            <Container style={{ background: "#fff", boxShadow: "2px 2px 5px #999", margin: "2rem auto", paddingTop: ".5rem", paddingBottom: ".5rem" }}>
                                <div className="profile">
                                    <CoverImageComponent user={auth.user} {...props} other={other} />
                                    <AvatarComponent user={auth.user} {...props} other={other} />
                                    <UserInforComponent user={auth.user} {...props} other={other} />

                                </div>
                            </Container>
                            :
                            <Container className="text-center">
                                <NotAuthorizedComponent></NotAuthorizedComponent>
                            </Container>
                    }
                </>

            )
        }
    }
}

export default ProfileComponent;