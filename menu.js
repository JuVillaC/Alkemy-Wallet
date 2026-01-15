$(document).ready(function () {

    if (!localStorage.getItem("logged")) {
        window.location.href = "index.html";
        return;
    }

    const balance = localStorage.getItem("balance") || 0;
    $('#balance').text(`$${balance}`);

    $('#depositBtn').on('click', function () {
        window.location.href = 'deposit.html';
    });

    $('#sendBtn').on('click', function () {
        window.location.href = 'sendmoney.html';
    });

    $('#movBtn').on('click', function () {
        window.location.href = 'transactions.html';
    });

    $('#logoutBtn').on('click', function () {
        localStorage.removeItem('logged');
        window.location.href = 'index.html';
    });

    // Abrir menú lateral
    $('#openMenu').on('click', function () {
    $('#sideMenu').addClass('active');
    });

    // Cerrar menú lateral
    $('#closeMenu').on('click', function () {
    $('#sideMenu').removeClass('active');
    });

    // Acciones del menú
    $('#menuDeposit').click(() => window.location.href = 'deposit.html');
    $('#menuSend').click(() => window.location.href = 'sendmoney.html');
    $('#menuMov').click(() => window.location.href = 'transactions.html');
    $('#menuLogout').click(() => {
    localStorage.removeItem('logged');
    window.location.href = 'index.html';
    });

    // Abrir notificaciones
    $('#openNotifications').on('click', function () {
        $('#notifications').addClass('active');
    });

    // Cerrar notificaciones
    $('#closeNotifications').on('click', function () {
        $('#notifications').removeClass('active');
    });

    // Abrir menú lateral
    $('#openMenu').on('click', function () {
        $('#sideMenu').addClass('active');
        $(this).addClass('icon-active');
    });

    // Cerrar menú lateral
    $('#closeMenu').on('click', function () {
        $('#sideMenu').removeClass('active');
        $('#openMenu').removeClass('icon-active');
    });

    // Abrir notificaciones
    $('#openNotifications').on('click', function () {
        $('#notifications').addClass('active');
        $(this).addClass('bell-active');
    });

    // Cerrar notificaciones
    $('#closeNotifications').on('click', function () {
        $('#notifications').removeClass('active');
        $('#openNotifications').removeClass('bell-active');
    });

    function abrirOverlay() {
        $('#overlay').addClass('active');
    }

    function cerrarOverlay() {
        $('#overlay').removeClass('active');
    }

    // Menú
    $('#openMenu').on('click', function () {
        $('#sideMenu').addClass('active');
        abrirOverlay();
    });

    $('#closeMenu').on('click', function () {
        $('#sideMenu').removeClass('active');
        cerrarOverlay();
    });

    // Notificaciones
    $('#openNotifications').on('click', function () {
        $('#notifications').addClass('active');
        abrirOverlay();
    });

    $('#closeNotifications').on('click', function () {
        $('#notifications').removeClass('active');
        cerrarOverlay();
    });

    // Cerrar tocando fondo
    $('#overlay').on('click', function () {
        $('#sideMenu, #notifications').removeClass('active');
        $('#openMenu').removeClass('icon-active');
        $('#openNotifications').removeClass('bell-active');
        cerrarOverlay();
    });


});
