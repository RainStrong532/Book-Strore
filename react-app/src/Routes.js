import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import * as pages from './pages'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/admin/home" component={pages.AdminPage.AdminWelcome} />
                <Route exact path="/admin/managements/books">
                        <Redirect to="/admin/home"/>
                </Route>
                <Route exact path="/" component={pages.PublicPage.HomePage} />
                <Route exact path="/login" component={pages.PublicPage.LoginPage} />
                <Route  path="/home" component={function(){return<Redirect to="/"/>}} />
                <Route exact path="/profiles" >
                    {pages.PrivatePage.ProfilePage}
                </Route>
                <Route exact path="/verify" component={pages.PublicPage.VerifyPage} />
                <Route exact path="/forgot-password" component={pages.PublicPage.ForgotPassword} />
                <Route exact path="/private" component={pages.PrivatePage.PrivatePage} />
                <Route exact path="/change-password" component={pages.PrivatePage.ChangePassword} />
                <Route exact path="/404" component={pages.PublicPage.NotFoundPage} />
        
                <Route exact path="*" component={pages.PublicPage.NotFoundPage} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;