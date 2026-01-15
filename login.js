$(document).ready(function () {

    $('#loginForm').submit(function (e) {
    e.preventDefault();

    const email = $('#email').val().trim();
    const pwd = $('#pwd').val().trim();

    $('#alert-container').html('');

    if (!email || !pwd) {
        $('#alert-container').html(`
        <div class="alert alert-danger text-center">
            Complete todos los campos
        </div>
        `);
        return;
    }

    if (email === "usuario@wallet.cl" && pwd === "1234") {
        localStorage.setItem('logged', 'true');

        if (!localStorage.getItem('balance')) {
        localStorage.setItem('balance', 79438);
        localStorage.setItem('transactions', JSON.stringify([]));
        }

        setTimeout(() => {
        window.location.href = "menu.html";
        }, 600);

    } else {
        $('#alert-container').html(`
        <div class="alert alert-danger text-center">
            Credenciales incorrectas
        </div>
        `);
    }
    });

});
