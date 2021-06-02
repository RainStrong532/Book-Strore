import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Chat from './components/chat/Chat';
import * as pages from './pages'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/admin/home" component={pages.AdminPage.AdminWelcome} />
                <Route exact path="/admin/managements/books">
                        <Redirect to="/admin/home"/>
                </Route>
                <Route exact path="/chats/conversation/:account_id" component={pages.PrivatePage.ChatPage}/>
                <Route exact path="/admin/managements/books/add" component={pages.AdminPage.BookCreatePage}/>
                <Route exact path="/admin/managements/books/categories/add" component={pages.AdminPage.CategoryCreatePage}/>
                <Route exact path="/admin/managements/books/categories/update/:category_id" component={pages.AdminPage.CategoryUpdatePage}/>
                <Route exact path="/admin/managements/books/categories/:category_id" component={pages.AdminPage.CategoryDetailPage}/>

                <Route exact path="/admin/managements/books/authors/add" component={pages.AdminPage.AuthorCreatePage}/>
                <Route exact path="/admin/managements/books/authors/update/:author_id" component={pages.AdminPage.AuthorUpdatePage}/>
                <Route exact path="/admin/managements/books/authors/:author_id" component={pages.AdminPage.AuthorDetailPage}/>

                <Route exact path="/admin/managements/books/update/:book_id" component={pages.AdminPage.UpdateBookPage}/>
                <Route exact path="/admin/managements/books/:book_id" component={pages.AdminPage.BookDetailPage}/>
                <Route exact path="/" component={pages.PublicPage.HomePage} />
                <Route exact path="/login" component={pages.PublicPage.LoginPage} />
                <Route exact  path="/home" component={function(){return<Redirect to="/"/>}} />
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