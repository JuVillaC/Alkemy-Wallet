$(document).ready(function () {

    $('#newContactForm').hide();

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
        selectedIndex = null;
        $('#sendMoneyBtn').hide();
        $('#contactList').html('');

        contacts.forEach((c, index) => {
            $('#contactList').append(`
                <li class="contact-item" data-index="${index}">
                    <div class="contact-dot"></div>
                    <div class="contact-info">
                        <strong>${c.name}</strong>
                        <small>${c.bank} · ${c.account}</small>
                    </div>
                </li>
            `);
        });
    }


    renderContacts();

    // Mostrar formulario nuevo contacto
    $('#addContactBtn').on('click', function () {
        selectedIndex = null;
        $('input[name="contact"]').prop('checked', false);
        $('#sendMoneyBtn').hide();
        
        $('#newContactForm').slideDown();
        $(this).hide();
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

        $('#newContactForm').slideUp();
        $('#addContactBtn').show()
        $('#contactName, #contactRut, #contactTypeAccount, #contactNumberAccount, #contactBank').val('');
        renderContacts();
    });


    // Seleccionar contacto
    $(document).on('click', '.contact-item', function () {
        selectedIndex = $(this).data('index');
        $('.contact-item').removeClass('active');
        $(this).addClass('active')
        $('#sendMoneyBtn').fadeIn();
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
