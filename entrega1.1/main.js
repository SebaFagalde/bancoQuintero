class CajeroAutomatico {
    constructor() {
      this.saldo = 1000; 
      this.nombre = null;
    }
  
    iniciarSesion() {
      const nombre = prompt("Banco Quintero le da la bienvenida a su portal, a continuacion ingrese su nombre:");
      const apellido = prompt("Ingrese su apellido:");
     if (nombre === "sebastian" && apellido === "fagalde") {
        this.nombre = nombre;
        alert("Bienvenido" + " " + nombre + " " + apellido);
      } else {
        alert("credenciales incorrectas");
        return;
      }
  
      const saldoInicial = parseFloat(prompt("Ingrese la cantidad de dinero que desea manejar:"));
      if (!isNaN(saldoInicial) && saldoInicial >= 0) {
        this.saldo = saldoInicial;
      } else {
        alert("Cantidad inválida. Se establecerá un saldo inicial de $1000.");
      }
    }
  
    mostrarMenu() {
      let opcion;
      do {
        opcion = prompt(
          "Seleccione una operación:\n" +
            "1. Consultar Saldo\n" +
            "2. Depositar\n" +
            "3. Retirar\n" +
            "4. Transferir\n" +
            "5. Cerrar Sesión\n" +
            "Ingrese el número de la operación que desea realizar:"
        );
  
        switch (opcion) {
          case "1":
            this.consultarSaldo();
            break;
          case "2":
            this.depositar();
            break;
          case "3":
            this.retirar();
            break;
          case "4":
            this.transferir();
            break;
          case "5":
            this.cerrarSesion();
            break;
          default:
            alert("Opción inválida. Intente nuevamente.");
        }
      } while (opcion !== "5");
    }
  
    consultarSaldo() {
        alert(`Saldo disponible: $${this.saldo}`);
    }
  
    depositar() {
      const monto = parseFloat(prompt("Ingrese la cantidad de dinero que desea depositar:"));
        if (!isNaN(monto) && monto > 0) {
        this.saldo += monto;
        alert(`Depósito exitoso. Saldo actual: $${this.saldo}`);
      } else {
        alert("Monto inválido.");
      }
    }
  
    retirar() {
      const monto = parseFloat(prompt("Ingrese la cantidad de dinero que desea retirar:"));
        if (!isNaN(monto) && monto > 0 && monto <= this.saldo) {
        this.saldo -= monto;
        alert(`Retiro exitoso. Saldo actual: $${this.saldo}`);
      } else {
        alert("Monto insuficiente o inválido.");
      }
    }
  
    transferir() {
      const monto = parseFloat(prompt("Ingrese la cantidad de dinero que desea transferir:"));
        if (!isNaN(monto) && monto > 0 && this.saldo >= monto) {
        this.saldo -= monto;
        alert(`Transferencia exitosa. Saldo actual: $${this.saldo}`);
      } else {
        alert("Monto insuficiente o inválido.");
      }
    }
  
    cerrarSesion() {
      this.nombre = null;
      alert("Sesión cerrada.");
    }
  }
  
 
  const cajero = new CajeroAutomatico();
  cajero.iniciarSesion();
  cajero.mostrarMenu();
  alert("Gracias por operar con nosotros.");
  