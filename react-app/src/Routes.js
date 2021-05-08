import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import * as pages from './pages'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={pages.PublicPage.HomePage} />
                <Route exact path="/login" component={pages.PublicPage.LoginPage} />
                <Route exact path="/private" component={pages.PrivatePage.PrivatePage} />
                <Route exact path="*" component={pages.PublicPage.NotFoundPage} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;