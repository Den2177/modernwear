const currentUser = JSON.parse(localStorage.getItem('user'))

if (!currentUser || !currentUser.token || !currentUser.isAdmin) {
    window.location.href = '/';
}
