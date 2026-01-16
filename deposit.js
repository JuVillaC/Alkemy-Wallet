$(document).ready(function () {

    // Protección de sesión
    if (!localStorage.getItem("logged")) {
        window.location.href = "index.html";
        return;
    }

    // Mostrar saldo actual
    let balance = Number(localStorage.getItem("balance")) || 0;
    $('#saldoActual').text(`$${balance}`);

    // Volver a menú principal
    $('#backMenu').on('click', function () {
        window.location.href = 'menu.html';
    });

    // Depositar dinero
    $('#depositForm').on('submit', function (e) {
        e.preventDefault();
        const amount = Number($('#amount').val());
        
        $('#alert-container').html('');

        // Validación
        if (isNaN(amount) || amount <= 0) {
            $('#alert-container').html('<div class="alert alert-danger text-center">Ingrese un monto válido</div>');
            return;
        }

        // Actualizar saldo
        balance += amount;
        localStorage.setItem("balance", balance);

        // Registrar depósito

        const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
        transactions.push(`Depósito +$${amount}`);
        localStorage.setItem("transactions", JSON.stringify(transactions));

        // Mensaje éxito
        $('#alert-container').html('<div class="alert alert-success text-center">Depósito realizado con éxito</div>');

        // Redirección con delay
        setTimeout(() => {
            window.location.href = 'menu.html';
        }, 1200);
        
    });

});
