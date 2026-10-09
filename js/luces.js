let formularioCantidad = document.querySelector("#formulario-cantidad");
let cantidadObrasInput = document.querySelector("#cantidad-obras");
let datosObras = document.querySelector("#datos-obras");
let botonPreparar = document.querySelector("#preparar-obras");
let botonCalcular = document.querySelector("#calcular");
let botonReiniciar = document.querySelector("#reiniciar");

let cantidad = 0;
let consumoTotal = 0;
let consumoPromedio = 0;
let porcentaje = 0;
let mayorTiempo = 0;
let nombreMayorTiempo = "";


function prepararObras(){
    cantidad =
    Number(cantidadObrasInput.value);
    if (cantidad < 1 || cantidadObrasInput.value ==""){
        alert("ingresá una cantidad válidad de obras.");
        return;
    }
    datosObras.textContent = "";

    for(let i=0; i <cantidad; i++){
        let titulo = document.createElement("h3");
        titulo.textContent = "Obra" + (i+1);
        datosObras.appendChild(titulo);

        let nombre = document.createElement("input");
        nombre.placeholder = "nombnre de la obra";
        nombre.className = "nombre-obra";
        nombre.required = true;
        datosObras.appendChild(nombre);

        let luces = document.createElement("input");
        luces.type = "number";
        luces.placeholder = "cabtidad de luces móviles";
        luces.min = "1";
        luces.className = "cantidad-luces";
        luces.required = true;
        datosObras.appendChild(luces);

        let horas = document.createElement("input")
        horas.type = "number";
        horas.placeholder = "horas de funcionamiento por día";
        horas.min = "0";
        horas.max = "24";
        horas.step = "any"
        horas.className = "horas-obras";
        horas.required = true;
        datosObras.appendChild(horas);
        }
        let consumo = document.createElement("input");
        consumo.type = "number";
        consumo.placeholder = "consumo por hora de cada lus (kwh)";
        consumo.min = "0";
        consumo.step = "any";
        consumo.required = true;
        consumo.id = "consumo-por-hora";
        datosObras.appendChild(consumo);

        let costo = document.createElement("input");
        costo.type = "number";
        costo.placeholder = "costo por kwh";
        costo.min = "0";
        costo.step = "any";
        costo.required = true;
        costo.id = "costo-kwh";
        datosObras.appendChild(costo);

        botonPreparar.disabled = true;
        botonCalcular.disabled = false; 
        }

function calcularResultados(){
            let nombres  = document.querySelectorAll(".nombre-obra");
            let luces = document.querySelectorAll(".cantidad-luces");
            let horas = document.querySelectorAll(".horas-obra");
            let consumoHoraInput = document.querySelector ("#consumo-por-hora");
            let costokwhInput = document.querySelector("#costo-kwh");

            consumoTotal = 0;
            mayorTiempo = -1;
            nombreMayorTiempo = "";
            let costoMayor = 0;
            let obrasConMuchasLuces = 0;

            for (let i = 0; i <nombres.length; i++){
            if (
                nombres[i].value.trim()==""||
                luces[i].value == ""||
                Number(luces[i].value)<1 ||
                horas[i].value == ""||
                Number(horas[i].value)< 0 ||
                Number(horas[i].value)> 24
            ){
                alert("Completá corretamente los datos de todas las obras.");
                return;
            }
            if (Number(luces[i].value) % 1 != 0){
                alert("La cantidad de luces debe ser un número entero.");
                return;
                        }
                        if (Number(horas[i].value)>mayorTiempo){
                            mayorTiempo = Number(horas[i].value);
                            nombreMayorTiempo = nombres[i].value;
                            costoMayor = Number(luces[i].value)*
                            mayorTiempo * 
                            Number(consumoHoraInput.value)*
                            Number(costokwhInput.value);
                            }
                            consumoTotal = consumoTotal + 
                            Number(luces[i].value)*
                            Number(horas[i].value)*
                            Number(consumoHoraInput.value);

                            if(Number(luces[i].value)>20){
                                obrasConMuchasLuces++;
                            }
        } 
        if(
            !consumoHoraInput ||
            !costokwhInput ||
            consumoHoraInput.value ===""||
            Number(consumoHoraInput.value)<0||
            costokwh === ""||
            Number(costokwhInput.value)<0
        ){
            alert("ingresá valores válidos de consumo y costo por kwh");
            return;
        }
        let consumoHora = Number(consumoHoraInput.value);
        let costokwh = Number(costokwhInput.value);

        consumoPromedio = consumoTotal / cantidad;
        porcentaje = obrasConMuchasLuces * 100 / cantidad;

        document.querySelector("#consumo-total").textContent = "Consumo diario total:" +
        consumoTotal.toFixed(2) + "kwh";

        document.querySelector("#consumo-promedio").textContent = "Consumo diario promedio por obra" + consumoPromedio.toFixed(2) + "kwh";

        document.querySelector("#obra-mayor-tiempo").textContent = "Obra con mayor tiempo" + nombreMayorTiempo + "tiempo diario" + mayorTiempo + "hora. Costo diario:$" +
        costoMayor.toFixed(2);

        document.querySelector("#porcentaje-obras").textContent = "obras que usan más de 20 lucas:" +porcentaje.toFixed(2)+"%";

        botonPreparar.disabled = false;
        botonCalcular.disabled = true;
        botonReiniciar = true;
        }


function reiniciar (){
    datosObras.textContent = "";
    cantidadObrasInput.value = "";

    document.querySelector("#consumo-total").textContent = "";
    document.querySelector("#consumo-promedio").textContent = "";
    document.querySelector("#obra-mayor-tiempo").textContent = "";
    document.querySelector("#porcentaje-obras").textContent = "";

    cantidad = 0;
    consumoTotal = 0;
    consumoPromedio = 0;
    porcentaje = 0;
    mayorTiempo = 0;
    nombreMayorTiempo = "";

    botonPreparar.disabled = true;
    botonCalcular.disabled = true;
    botonReiniciar.disabled = false;
}
botonPreparar.addEventListener("click",function(event){
    event.preventDefault();
    prepararObras();
    calcularResultados();
});
botonCalcular.addEventListener("click",function(event){
    event.preventDefault();
    });
    botonCalcular.addEventListener("click",function(event){
        event.preventDefault; 
        calcularResultados();
    });
    botonReiniciar.addEventListener("click",reiniciar);