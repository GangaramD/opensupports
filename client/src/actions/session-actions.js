import API from 'lib-app/api-call';
import sessionStore from 'lib-app/session-store';
import store from 'app/store';

export default {
    login(loginData) {
        return {
            type: 'LOGIN',
            payload: API.call({
                path: '/user/login',
                data: loginData
            })
        };
    },

    autoLogin() {
        const rememberData = sessionStore.getRememberData();

        return {
            type: 'LOGIN_AUTO',
            payload: API.call({
                path: '/user/login',
                data: {
                    userId: rememberData.userId,
                    rememberToken: rememberData.token,
                    isAutomatic: true
                }
            })
        };
    },

    logout() {
        return {
            type: 'LOGOUT',
            payload: API.call({
                path: '/user/logout',
                data: {}
            })
        };
    },

    initSession() {
        return {
            type: 'CHECK_SESSION',
            payload: API.call({
                path: '/user/check-session',
                data: {}
            }).then((result) => {
                if (!result.data.sessionActive) {
                    if (sessionStore.isRememberDataExpired()) {
                        store.dispatch({
                            type: 'LOGOUT_FULFILLED'
                        });
                    } else {
                        store.dispatch(this.autoLogin());
                    }
                } else {
                    store.dispatch({
                        type: 'SESSION_CHECKED'
                    });
                }
            })
        }
    }
};