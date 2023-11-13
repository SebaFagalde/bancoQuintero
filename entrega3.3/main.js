
const usuarios = [
      { usuario: "sebastian", contrasena: "1234", saldo: 21000 },
      { usuario: "anabelen", contrasena: "contrasena2", saldo: 31500 },
      { usuario: "fabricio", contrasena:"tutorcoder", saldo:32000}
    ];

let usuarioActual = null;

function buscarUsuario(usuario) {
  return usuarios.find((u) => u.usuario === usuario);
}

function iniciarSesion() {
  const usuario = document.getElementById("usuario").value;
  const contrasena = document.getElementById("contrasena").value;
  const usuarioEncontrado = buscarUsuario(usuario);
  if (usuarioEncontrado && usuarioEncontrado.contrasena === contrasena) {
    usuarioActual = usuarioEncontrado;
    document.getElementById("login-container").style.display = "none";
    document.getElementById("operaciones-container").style.display = "block";
    document.getElementById("resultado-container").style.display = "block";
    document.getElementById("resultado").textContent = "Sesión iniciada.";
    Swal.fire({
      title: "¡Sesión iniciada!",
      text: "Bienvenido al Banco Quintero",
      icon: "success"
    });
  } else {
    document.getElementById("resultado").textContent = "Credenciales incorrectas. Sesión cerrada.";
    Swal.fire({
      title: "¡Error!",
      text: "Credenciales incorrectas. Sesión cerrada.",
      icon: "error"
    });
  }
}

// function consultarSaldo() {
//   document.getElementById("resultado").textContent = `Saldo disponible: $${usuarioActual.saldo}`;
//   registrarTransaccion("Consulta de saldo", monto);
// }


function realizarDeposito() {
  const montoInput = document.getElementById("monto");
  const monto = parseFloat(montoInput.value);
  if (!isNaN(monto) && monto > 0) {
        usuarioActual.saldo += monto;
    document.getElementById("resultado").textContent = `Depósito exitoso. Saldo actual: $${usuarioActual.saldo}`;
  } else {
        document.getElementById("resultado").textContent = "Monto inválido.";
  }
  montoInput.value = "";
  registrarTransaccion("Depósito", monto);
}

function realizarRetiro() {
  const montoInput = document.getElementById("monto");
  const monto = parseFloat(montoInput.value);
    if (!isNaN(monto) && monto > 0) {
      if (monto <= usuarioActual.saldo) {
        usuarioActual.saldo -= monto;
        document.getElementById("resultado").textContent = `Retiro exitoso. Saldo actual: $${usuarioActual.saldo}`;
      } else {
        document.getElementById("resultado").textContent = "No hay suficientes fondos en su cuenta";
      }
    } else {
      document.getElementById("resultado").textContent = "Monto inválido.Por favor ingrese un monto y vuelva a clickear la operación";
    }
    montoInput.value = "";
    registrarTransaccion("Retiro", monto);
  }
  
  function realizarTransferencia() {
    const nombreDestinatario = document.getElementById("nombreDestinatario").value;
    const nombreCuenta = document.getElementById("nombreCuenta").value.toUpperCase();
    const bancoDestino = document.getElementById("bancoDestino").value.toUpperCase();
    const numeroDeCuenta = document.getElementById("numeroDeCuenta").value;
    const monto = parseFloat(document.getElementById("monto").value);
  
        if (!nombreDestinatario || !nombreCuenta || !bancoDestino || !numeroDeCuenta || isNaN(monto) || monto <= 0) {
      document.getElementById("resultado").textContent = "Por favor, complete todos los campos correctamente.";
      return;
    }
  
    if (monto > usuarioActual.saldo) {
      document.getElementById("resultado").textContent = "Fondos insuficientes para realizar la transferencia.";
      return;
    }
  
      usuarioActual.saldo -= monto;
  
    const resultadoParrafo = document.createElement("p");
    resultadoParrafo.textContent = `Se ha realizado una transferencia a ${nombreDestinatario}
      por $${monto}
      a ${nombreCuenta}
      banco: ${bancoDestino}
      a la cuenta Nº ${numeroDeCuenta}`;
  
    const resultadoContainer = document.getElementById("resultado");
    resultadoContainer.innerHTML = '';
    resultadoContainer.appendChild(resultadoParrafo);
    document.getElementById("transferencia-form").reset();
    registrarTransaccion("Transferencia", monto);
  }
  function registrarTransaccion(tipo, monto) {
    const historialList = document.getElementById("historial-list");
    const nuevaTransaccion = document.createElement("li");
    nuevaTransaccion.textContent = `${tipo}: $${monto}`;
    historialList.appendChild(nuevaTransaccion);
  }
  
  function consultarSaldo() {
    const saldoActual = usuarioActual.saldo;
    document.getElementById("resultado").textContent = `Consulta de saldo: $${saldoActual}`;
    registrarTransaccion("Consulta de saldo", saldoActual);
  }
  
  
function cerrarSesion (){
  localStorage.removeItem('usuario');
  window.location.href="index.html"
   window.close();
 }