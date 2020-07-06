export default {
    isLogged: !!localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user')),
    token: localStorage.getItem('token') ||'',
    expires: localStorage.getItem('expires') || 0,
    isadmin: JSON.parse(localStorage.getItem('user')).isAdmin ||false
}