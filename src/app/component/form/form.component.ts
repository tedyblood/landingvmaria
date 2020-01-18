import { Component, OnInit, Input, Output } from "@angular/core";
import { HtmlParser } from "@angular/compiler";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class FormComponent implements OnInit {
  constructor() {}

  @Output("name") name: string;
  @Output("email") email: string;
  @Output("tel") tel: string;

  ngOnInit() {}

  send(form: NgForm) {
    // console.log("Control: ", form.value);
    var formulario: any = document.getElementById("formulario");
    var respuesta = document.getElementById("respuesta");
    respuesta.classList.remove("displayOff");

    formulario.addEventListener("submit", e => {
      e.preventDefault();
      var datos: any = new FormData(formulario);
      // console.log(datos.get("name"));
      // console.log(datos.get("email"));
      // console.log(datos.get("tel"));

      fetch("./assets/php/sendmail.php", {
        method: "POST",
        body: datos
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data === "error") {
            respuesta.innerHTML = `<p class='error'>Algo salió mal. Inténtalo de nuevo o llámenos al 6251-0186</p>`;
            //console.log("Mensaje de Error JS");
          } else {
            respuesta.innerHTML = `<p class='success'>Gracias por contactarnos. Nos pondremos en contacto con usted lo antes posible!</p>`;
            //console.log("Mensaje de Exito JS");
          }
        });
    });
  }
}
