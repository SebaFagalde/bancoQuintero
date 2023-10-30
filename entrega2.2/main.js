
const usuarios = [
      { usuario: "sebastian", contrasena: "contrasena1", saldo: 1000 },
      { usuario: "anabelen", contrasena: "contrasena2", saldo: 1500 },
      { usuario: "fabricio", contrasena:"tutorcoder", saldo:2000}
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
  } else {
    document.getElementById("resultado").textContent = "Credenciales incorrectas. Sesión cerrada.";
  }
}

function consultarSaldo() {
  document.getElementById("resultado").textContent = `Saldo disponible: $${usuarioActual.saldo}`;
}

function realizarDeposito() {
  const monto = parseFloat(prompt("Ingrese la cantidad de dinero que desea depositar:"));
  if (!isNaN(monto) && monto > 0) {
    usuarioActual.saldo += monto;
    document.getElementById("resultado").textContent = `Depósito exitoso. Saldo actual: $${usuarioActual.saldo}`;
  } else {
    document.getElementById("resultado").textContent = "Monto inválido.";
  }
}

function realizarRetiro() {
    const monto2 = parseFloat(prompt("Ingrese el monto a retirar"));
  
    if (!isNaN(monto2) && monto2 > 0) {
      if (monto2 <= usuarioActual.saldo) {
        usuarioActual.saldo -= monto2;
        document.getElementById("resultado").textContent = `Retiro exitoso. Saldo actual: $${usuarioActual.saldo}`;
      } else {
        document.getElementById("resultado").textContent = "No hay suficientes fondos en su cuenta";
      }
    } else {
      document.getElementById("resultado").textContent = "Monto inválido.";
    }
  }

  function realizarTransferencia() {
    let nombreDestinatario = prompt('Ingrese el nombre del destinatario');      
    let nombreCuenta = prompt('Nombre de la cuenta a transferir').toUpperCase();
    let bancoDestino = prompt('Banco del destinatario').toUpperCase();
    let numeroDeCuenta = prompt('Número de la cuenta destino');
    const monto3 = parseFloat(prompt("Ingrese el monto a transferir"));
  
    if (isNaN(monto3) || monto3 <= 0) {
      document.getElementById("resultado").textContent = "Monto inválido.";
      return;
    }
    
    if (monto3 > usuarioActual.saldo) {
      document.getElementById("resultado").textContent = "Fondos insuficientes para realizar la transferencia.";
      return;
    }
    
    usuarioActual.saldo -= monto3;
    
    const resultadoParrafo = document.createElement("p");
    resultadoParrafo.textContent = `Se ha realizado una transferencia a ${nombreDestinatario}
      por $${monto3}
      a ${nombreCuenta}
      banco: ${bancoDestino}
      a la cuenta Nº ${numeroDeCuenta}`;
      
    
    const resultadoContainer = document.getElementById("resultado");
    resultadoContainer.innerHTML = ''; 
    resultadoContainer.appendChild(resultadoParrafo);
  }
  function mostrarMenuOtrasOperaciones() {
    document.getElementById("operaciones-container").style.display = "none";
    document.getElementById("otras-operaciones-container").style.display = "block";
  }
function cerrarSesion (){
    alert("Gracias por operar con Banco Quintero");
    window.close();
 }