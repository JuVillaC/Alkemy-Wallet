$(document).ready(function () {

    // Asegurar overlay apagado
    $('#overlay').removeClass('active');

    if (!localStorage.getItem("logged")) {
        window.location.href = "index.html";
        return;
    }

    const balance = localStorage.getItem("balance") || 0;
    $('#balance').text(`$${balance}`);

    $('#sendBtn').on('click', () => {
        window.location.href = 'sendmoney.html';
    });

    $('#depositBtn').on('click', () => {
        window.location.href = 'deposit.html';
    });

    $('#movBtn').on('click', () => {
        window.location.href = 'transactions.html';
    });

    $('#logoutBtn, #menuLogout').on('click', () => {
        localStorage.removeItem('logged');
        window.location.href = 'index.html';
    });

    $('#menuDeposit').click(() => window.location.href = 'deposit.html');
    $('#menuSend').click(() => window.location.href = 'sendmoney.html');
    $('#menuMov').click(() => window.location.href = 'transactions.html');

    $('#openMenu').click(() => $('#sideMenu').addClass('active'));
    $('#closeMenu').click(() => $('#sideMenu').removeClass('active'));

    $('#openNotifications').click(() => $('#notifications').addClass('active'));
    $('#closeNotifications').click(() => $('#notifications').removeClass('active'));
});
