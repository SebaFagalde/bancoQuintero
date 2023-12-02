fetch('./banco_data.json')
  .then(response => response.json())
  .then(data => {
    if (Array.isArray(data)) {
      localStorage.setItem('usuarios', JSON.stringify(data));
    } else {
      console.error('Error: Los datos del archivo JSON no son un array.');
    }
  })
  .catch(error => console.error('Error al cargar datos JSON:', error));


function obtenerUsuarios() {
  const usuariosJSON = localStorage.getItem('usuarios');
  return usuariosJSON ? JSON.parse(usuariosJSON) : [];
}

function obtenerUsuarioEnSesion() {
  const usuarioEnSesionJSON = localStorage.getItem('usuarioEnSesion');
  return usuarioEnSesionJSON ? JSON.parse(usuarioEnSesionJSON) : null;
}

function iniciarSesion() {
  const usuario = document.getElementById("usuario").value;
  const contrasena = document.getElementById("contrasena").value;
  const usuarios = obtenerUsuarios();
  const usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.contrasena === contrasena);

  if (usuarioEncontrado) {
       localStorage.setItem('usuarioEnSesion', JSON.stringify(usuarioEncontrado));

    document.getElementById("login-container").style.display = "none";
    document.getElementById("operaciones-container").style.display = "block";
    document.getElementById("resultado-container").style.display = "block";
    document.getElementById("resultado").textContent = "Sesión iniciada.";

    Swal.fire({
      title: "¡Sesión iniciada!",
      text: "Bienvenido al Banco Quintero",
      background: "./assets/LogoVector.png"
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

function cerrarSesion() {
  
  
  Swal.fire({
    title: "¿Estas Seguro de querer salir?",
    icon:"success",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, quiero salir"

  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Hasta Luego",
        imageUrl: "./assets/LogoVector.png",
        imageWidth: 350,
        imageHeight: 300,
        
        text: "Gracias por operar con nosotros"
      
        }).then(() => {
        
        window.location.href = "index.html";
      });
     
    }
  });
}
  

function actualizarHistorial(historial) {
  const historialList = document.getElementById("historial-list");
  historialList.innerHTML = '';

  historial.forEach(transaccion => {
    const nuevaTransaccion = document.createElement("li");
    nuevaTransaccion.textContent = `${transaccion.tipo}: $${transaccion.monto}`;
    historialList.appendChild(nuevaTransaccion);
  });
}

function actualizarTransferencias(transferencias) {
  // Actualizar la interfaz con el nuevo historial de transferencias
  const transferenciasList = document.getElementById("transferencias-list");
  transferenciasList.innerHTML = '';

  transferencias.forEach(transferencia => {
    const nuevaTransferencia = document.createElement("li");
    nuevaTransferencia.textContent = `Transferencia a ${transferencia.destinatario}: $${transferencia.monto}`;
    transferenciasList.appendChild(nuevaTransferencia);
  });
}

function registrarTransaccion(tipo, monto) {
  const usuarioEnSesion = obtenerUsuarioEnSesion();

  if (usuarioEnSesion) {
    const historial = {
      tipo: tipo,
      monto: monto,
      fecha: new Date().toLocaleString()
    };

    usuarioEnSesion.historialTransacciones.push(historial);
    localStorage.setItem('usuarios', JSON.stringify(obtenerUsuarios()));

    actualizarHistorial(usuarioEnSesion.historialTransacciones);
  } else {
    console.error("Usuario no encontrado en sesión");
  }
}

function registrarTransferencia(destinatario, monto) {
  const usuarioEnSesion = obtenerUsuarioEnSesion();

  if (usuarioEnSesion) {
    const transferencia = {
      destinatario: destinatario,
      monto: monto,
      fecha: new Date().toLocaleString()
    };

    usuarioEnSesion.historialTransferencias.push(transferencia);

    localStorage.setItem('usuarios', JSON.stringify(obtenerUsuarios()));


    actualizarTransferencias(usuarioEnSesion.historialTransferencias);
  } else {
    console.error("Usuario no encontrado en sesión");
  }
}

function realizarDeposito() {
  const montoInput = document.getElementById("monto");
  const monto = parseFloat(montoInput.value);
  const usuarioEnSesion = obtenerUsuarioEnSesion();

  if (usuarioEnSesion && !isNaN(monto) && monto > 0) {
    usuarioEnSesion.saldo += monto;
    localStorage.setItem('usuarioEnSesion', JSON.stringify(usuarioEnSesion));

    document.getElementById("resultado").textContent = `Depósito exitoso. Saldo actual: $${usuarioEnSesion.saldo}`;
    montoInput.value = "";
    registrarTransaccion("Depósito", monto);
  } else {
    document.getElementById("resultado").textContent = "Monto inválido.";
  }
}



function realizarRetiro() {
  const montoInput = document.getElementById("monto");
  const monto = parseFloat(montoInput.value);
  const usuarioEnSesion = obtenerUsuarioEnSesion();

  if (usuarioEnSesion && !isNaN(monto) && monto > 0) {
    if (monto <= usuarioEnSesion.saldo) {
      usuarioEnSesion.saldo -= monto;
      localStorage.setItem('usuarioEnSesion', JSON.stringify(usuarioEnSesion));

      document.getElementById("resultado").textContent = `Retiro exitoso. Saldo actual: $${usuarioEnSesion.saldo}`;
      montoInput.value = "";
      registrarTransaccion("Retiro", monto);
    } else {
      document.getElementById("resultado").textContent = "No hay suficientes fondos en su cuenta";
    }
  } else {
    document.getElementById("resultado").textContent = "Monto inválido. Por favor, ingrese un monto y vuelva a hacer clic en la operación";
  }
}

function realizarTransferencia() {
  const nombreDestinatario = document.getElementById("nombreDestinatario").value;
  const nombreCuenta = document.getElementById("nombreCuenta").value.toUpperCase();
  const bancoDestino = document.getElementById("bancoDestino").value.toUpperCase();
  const numeroDeCuenta = document.getElementById("numeroDeCuenta").value;
  const montoInput = document.getElementById("monto");
  const monto = parseFloat(montoInput.value);
  const usuarioEnSesion = obtenerUsuarioEnSesion();

  if (
    usuarioEnSesion &&
    nombreDestinatario &&
    nombreCuenta &&
    bancoDestino &&
    numeroDeCuenta &&
    !isNaN(monto) &&
    monto > 0
  ) {
    if (monto <= usuarioEnSesion.saldo) {
      usuarioEnSesion.saldo -= monto;
      localStorage.setItem('usuarioEnSesion', JSON.stringify(usuarioEnSesion));

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
      registrarTransferencia(nombreDestinatario, monto);
    } else {
      document.getElementById("resultado").textContent = "Fondos insuficientes para realizar la transferencia.";
    }
  } else {
    document.getElementById("resultado").textContent = "Por favor, complete todos los campos correctamente.";
  }
}

function consultarSaldo() {
  const usuarioEnSesion = obtenerUsuarioEnSesion();

  if (usuarioEnSesion) {
    const saldoActual = usuarioEnSesion.saldo;
    localStorage.setItem('usuarioEnSesion', JSON.stringify(usuarioEnSesion));
    document.getElementById("resultado").textContent = `Consulta de saldo: $${saldoActual}`;
    registrarTransaccion("Consulta de saldo", saldoActual);
  } else {
    console.error("Usuario no encontrado en sesión");
  }
}


