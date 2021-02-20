(() => {
    document.querySelector('#join').addEventListener('click', function () {
        let username = document.querySelector('#username').value;
        if (username) {
            localStorage.setItem('username', username);
        } else {
            localStorage.setItem('username', '');
        }
        window.location.href = '/chat';
    });
})();