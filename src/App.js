import React, { Component, Suspense, lazy } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import MoreInfo from './containers/MoreInfo/MoreInfo';
import Movies from './containers/Movies/Movies';
import Layout from './hoc/Layout/Layout';
import Modal from './hoc/Modal/Modal';
import Spinner from './components/ATOMS/UI-A/Spinner-A/Spinner';

import * as actionsMovies from './store/actions/MoviesActions';
import * as actionsTV from './store/actions/TVActions';
import * as actionsApp from './store/actions/AppActions';
import * as actionsLogin from './store/actions/LoginActions';
import * as actionsProfile from './store/actions/ProfileActions';
import * as u from './shared/Utility';

const TV = lazy(() =>
    import ('./containers/TV/TV'));
const Search = lazy(() =>
    import ('./containers/Search/Search'));
const Discover = lazy(() =>
    import ('./containers/Discover/Discover'));
const Login = lazy(() =>
    import ('./containers/Login/Login'));
const Profile = lazy(() =>
    import ('./containers/Profile/Profile'));
const People = lazy(() =>
    import ('./containers/People/People'));

class App extends Component {
    prevLocation = this.props.location;

    componentDidMount() {
        this.props.onFetchConfigInit();

        const routePrefix = /(\b[a-zA-Z]+\b(?=\/)?)/.exec(this.props.location.pathname);
        if (routePrefix) {
            if (routePrefix[0] === 'movie' ||
                routePrefix[0] === 'tv' ||
                routePrefix[0] === 'find') {
                this.props.history.push(`/${routePrefix[0]}`);
            } else if (routePrefix[0] === 'people') {
                this.props.history.push(`/movie`);
            }
        }

        if (JSON.parse(localStorage.getItem('session'))) {
            if (JSON.parse(localStorage.getItem('session')).type === 'login') {
                this.props.onLoginSuccess('login');
            } else {
                this.props.onLoginSuccess('guest');
            }
            this.props.onGetProfileInit();
        }
    }

    componentDidUpdate() {
        // If current location is not modal
        let { location, history } = this.props;
        let session = JSON.parse(localStorage.getItem('session'));

        if (history !== 'POP' && (!location.state || !location.state.modal)) {
            this.prevLocation = this.props.location;
        }

        if (session) {
            if (this.props.authType === 'guest') {
                if (Date.now() >= session.expires_at - u.HtoMS(12)) {
                    this.props.onLogout();
                }
            } else if (this.props.authType === 'login') {
                if (Date.now() >= session.expires_at + u.HtoMS(6)) {
                    this.props.onLogout();
                }
            }
        } else if (!session && !!this.props.authType) {
            this.props.onLogout();
        }
    }

    render() {
            let { location, loggedIn, videoDetails, onClearMovieDetails, onClearTVDetails, loading, fetched } = this.props;

            let modalRoute = null;
            let videoType = location.state && location.state.type;
            let isModal = !!(location.state && location.state.modal &&
                this.prevLocation !== location);

            let loginRoute = < Route path = "/login"
            render = {
                    props => < Login {...props }
                    />} / > ;
                    let redirectProfile = < Redirect from = '/profile'
                    to = 'login' / > ;

                    if (loggedIn) {
                        loginRoute = < Route path = "/profile"
                        render = {
                            props => < Profile {...props }
                            />} / > ;
                            redirectProfile = < Redirect from = '/login'
                            to = 'profile' / > ;
                        }

                        if (isModal && u.isObjNotEmpty(videoDetails)) {
                            // Clear current loaded film details when modal closes
                            const clearVideoDetails = videoType === 'movie' ?
                                onClearMovieDetails : onClearTVDetails;

                            const modal = () => ( <
                                Modal modalClosed = { clearVideoDetails } >
                                <
                                MoreInfo type = { videoType }
                                videoDetails = { videoDetails }
                                /> < /
                                Modal >
                            );

                            let pathBasedOnType = `/${videoType}/:${videoType}Id`;
                            // For special URL paths with additional route string
                            if (location && location.state && location.state.pathBase) {
                                pathBasedOnType = `${location.state.pathBase}${videoType}/:${videoType}Id`;
                            }

                            modalRoute = < Route path = { pathBasedOnType }
                            component = { modal }
                            />;
                        }

                        let routes = null;
                        if (!loading && fetched) {
                            routes = ( <
                                    Layout >
                                    <
                                    Suspense fallback = { < Spinner suspense / > } >
                                    <
                                    Switch > { redirectProfile } <
                                    Route path = "/movie"
                                    component = { Movies }
                                    /> <
                                    Route path = "/tv"
                                    render = {
                                        props => < TV {...props }
                                        />} / >
                                        <
                                        Route path = "/find"
                                        render = {
                                            props => < Search {...props }
                                            />} / >
                                            <
                                            Route path = "/discover"
                                            render = {
                                                props => < Discover {...props }
                                                />} / >
                                                <
                                                Route path = "/people"
                                                render = {
                                                    props => < People {...props }
                                                    />} / > { loginRoute } <
                                                    Redirect to = '/movie' / >
                                                    <
                                                    /Switch>         < /
                                                    Suspense > { modalRoute } <
                                                    /Layout>
                                                );
                                            }

                                            return routes;
                                        }
                                    }

                                    const mapStateToProps = state => {
                                        return {
                                            videoDetails: state.movies.currentMovieDetails || state.tv.currentTVDetails,
                                            loading: state.app.loading,
                                            fetched: state.app.initLoaded,
                                            loggedIn: state.login.loggedIn,
                                            authType: state.login.authType
                                        }
                                    }

                                    const mapDispatchToProps = dispatch => {
                                        return {
                                            onFetchConfigInit: () => dispatch(actionsApp.fetchConfigInit()),
                                            onClearMovieDetails: () => dispatch(actionsMovies.clearMovieDetails()),
                                            onClearTVDetails: () => dispatch(actionsTV.clearTVDetails()),
                                            onLoginSuccess: (type) => dispatch(actionsLogin.loginSuccess(type)),
                                            onLogout: () => dispatch(actionsLogin.logout()),
                                            onGetProfileInit: () => dispatch(actionsProfile.getProfileInit())
                                        }
                                    }

                                    export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));