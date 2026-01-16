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

    $('#menuLogout').on('click', function () {
        localStorage.removeItem('logged');
        window.location.href = 'index.html';
    });


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

});

