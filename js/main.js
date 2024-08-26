const comisiones = {

"accesorios": 0.22,
"automotriz": 0.13,
"belleza": 0.20,
"calzado": 0.22,
"consumomasivo": 0.15,
"decohogar": 0.25,
"deporte": 0.22,
"electrohogar": 0.12,
"infantil": 0.22,
"mascotas": 0.20,
"mejoramientodelhogar": 0.15,
"moda": 0.25,
"otrascategorías": 0.22,
"salud": 0.18,
"tecnología": 0.12
};

const calcularComision = () => {
    const categoria = document.getElementById("categoria").value;
    const precio = document.getElementById("precio").value;

    if (!categoria) {
        alert("Por favor, selecciona una categoría antes de calcular.");
        return;
    }

    if (isNaN(precio) || precio <= 0) {
        alert("El precio no puede ser 0 o un valor menor a 0. Por favor, ingrese un valor mayor a 0.");
        return;
    }

    if (categoria && precio > 0) {
        const porcentajeComision = comisiones[categoria] * 100;
        const comision = precio * comisiones[categoria];
        const montoFinal = precio - comision;

        let porcentajeComisionStr = Number.isInteger(porcentajeComision)
        ? porcentajeComision.toString()
        : porcentajeComision.toFixed(2);

        document.getElementById("comision").value = `${porcentajeComisionStr}%`;
        document.getElementById("montoFinal").value = montoFinal.toFixed(2);
        }
};

document.getElementById("precio").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        calcularComision();
    }
});
document.getElementById("calcularBtn").addEventListener("click", calcularComision);

const resetCampos = () => {
    document.getElementById("categoria").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("comision").value = "";
    document.getElementById("montoFinal").value = "";
};
document.getElementById("resetBtn").addEventListener("click", resetCampos);
