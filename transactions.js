$(document).ready(function() {

  // Protección de sesión
  if (!localStorage.getItem("logged")) {
    window.location.href = "index.html";
    return;
  }
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

  // Volver al menú
  $('#backMenu').click(() => {
    window.location.href = 'menu.html';
  });

  function mostrarUltimosMovimientos(filtro) {
      $('#list').html('');
  
      const filtradas = transactions
          .slice()
          .reverse()
          .filter(t => filtro === 'all' || t.includes(filtro));
  
      if (filtradas.length === 0) {
          $('#list').append(`
              <li class="list-group-item text-center text-muted">
                  <strong>No hay movimientos</strong><br>
                  <small>Realiza un depósito o transferencia</small>
              </li>
          `);
          return;
      }
  
      filtradas.forEach(t => {
          $('#list').append(`
              <li class="list-group-item">
                  ${t}
              </li>
          `);
      });
  }


  // Mostrar todos al cargar
  mostrarUltimosMovimientos('all');

  // Filtro
  $('#filter').on('change', function () {
    mostrarultimosMovimientos($(this).val());
  });
});
