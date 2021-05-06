import React from 'react';

function LoginPage() {
    return (
        <div className="login">
            <div className="cont">
                <div className="form sign-in">
                    <h2 className="h2-login">Welcome back,</h2>
                    <label className="label-login">
                        <span>Email</span>
                        <input className="input-login" type="email" />
                    </label>
                    <label className="label-login">
                        <span>Password</span>
                        <input className="input-login" type="password" />
                    </label>
                    <p className="forgot-pass">Forgot password?</p>
                    <button type="button" className="submit button-login">Sign In</button>
                    <button type="button" className="fb-btn button-login">Connect with <span>facebook</span></button>
                    <button type="button" className="fb-btn button-login g-btn">Join with <span>Goole+</span></button>
                </div>
                <div className="sub-cont">
                    <div className="img">
                        <div className="img__text m--up">
                            <h2>New here?</h2>
                            <p>Sign up and discover great amount of new opportunities!</p>
                        </div>
                        <div className="img__text m--in">
                            <h2>One of us?</h2>
                            <p>If you already has an account, just sign in. We've missed you!</p>
                        </div>
                        <div className="img__btn">
                            <span className="m--up">Sign Up</span>
                            <span className="m--in">Sign In</span>
                        </div>
                    </div>
                    <div className="form sign-up">
                        <h2 className="h2-login">Time to feel like home,</h2>
                        <label className="label-login">
                            <span>Name</span>
                            <input className="input-login" type="text" />
                        </label>
                        <label className="label-login">
                            <span>Email</span>
                            <input className="input-login" type="email" />
                        </label>
                        <label className="label-login">
                            <span>Password</span>
                            <input className="input-login" type="password" />
                        </label>
                        <button type="button" className="submit button-login">Sign Up</button>
                        <button type="button" className="fb-btn button-login">Join with <span>facebook</span></button>
                        <button type="button" className="fb-btn button-login g-btn">Join with <span>Goole+</span></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;