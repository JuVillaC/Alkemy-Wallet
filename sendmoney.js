$(document).ready(function () {

    // Protección de sesión
    if (!localStorage.getItem("logged")) {
        window.location.href = "index.html";
        return;
    }

    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    let selectedIndex = null;

    // Volver al menú
    $('#backMenu').click(() => {
        window.location.href = 'menu.html';
    });

    // Render contactos
    function renderContacts() {
        $('#contactList').html('');
        contacts.forEach((c, index) => {
            $('#contactList').append(`
                <li class="list-group-item">
                    <input type="radio" name="contact" value="${index}">
                    <strong>${c.name}</strong><br>
                    <small>${c.bank} · ${c.account}</small>
                </li>
            `);
        });
    }

    renderContacts();

    // Abrir modal
    $('#addContactBtn').click(() => {
        $('#contactModal').modal('show');
    });

    // Guardar contacto
    $('#saveContactBtn').click(() => {
        const name = $('#contactName').val().trim();
        const rut = $('#contactRut').val().trim();
        const typeAccount = $('#contactTypeAccount').val();
        const account = $('#contactNumberAccount').val().trim();
        const bank = $('#contactBank').val().trim();

        $('#alert-container').html('');

        if (!name || !rut || !typeAccount || !account || !bank) {
            $('#alert-container').html(
                '<div class="alert alert-danger text-center">Completa todos los campos</div>'
            );
            return;
        }

        if (!/^\d{8}$/.test(account)) {
            $('#alert-container').html(
                '<div class="alert alert-danger text-center">El número de cuenta debe tener 8 dígitos</div>'
            );
            return;
        }

        contacts.push({ name, rut, typeAccount, account, bank });
        localStorage.setItem("contacts", JSON.stringify(contacts));

        $('#contactModal').modal('hide');
        $('#contactName, #contactRut, #contactTypeAccount, #contactNumberAccount, #contactBank').val('');
        renderContacts();
    });

    // Seleccionar contacto
    $(document).on('change', 'input[name="contact"]', function () {
        selectedIndex = $(this).val();
        $('#sendMoneyBtn').fadeIn();
        $(this).closest('li').addClass('active')
            .siblings().removeClass('active');
    });

    // Enviar dinero
    $('#sendMoneyBtn').click(() => {

        const amount = Number($('#amount').val());
        let balance = Number(localStorage.getItem("balance")) || 0;

        if (selectedIndex === null) {
            $('#alert-container').html(
                '<div class="alert alert-danger text-center">Seleccione un contacto</div>'
            );
            return;
        }

        if (isNaN(amount) || amount <= 0) {
            $('#alert-container').html(
                '<div class="alert alert-danger text-center">Ingrese un monto válido</div>'
            );
            return;
        }

        if (balance < amount) {
            $('#alert-container').html(
                '<div class="alert alert-danger text-center">Saldo insuficiente</div>'
            );
            return;
        }

        balance -= amount;
        localStorage.setItem("balance", balance);

        const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
        const contact = contacts[selectedIndex];
        transactions.push(`Transferencia a ${contact.name} - $${amount}`);
        localStorage.setItem("transactions", JSON.stringify(transactions));

        $('#alert-container').html(
            '<div class="alert alert-success text-center">Transferencia realizada con éxito</div>'
        );

        setTimeout(() => {
            window.location.href = 'menu.html';
        }, 1200);
    });

});
