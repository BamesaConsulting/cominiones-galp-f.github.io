
let excelData = []
window.onload = function() {
    fetch('data.xlsx')
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });

            // Obtener la primera hoja
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            // Convertir a JSON
            excelData = XLSX.utils.sheet_to_json(worksheet);
    
               
            // Asignar los valores de Excel a los inputs de la tabla
        })
        .catch(error => console.error('Error al cargar el archivo Excel:', error));
};
// Este es un ejemplo básico de cómo podrías empezar a llenar los campos calculados
document.getElementById('tarifa').addEventListener('change', calcular);
document.getElementById('mes').addEventListener('change', calcular);
document.getElementById('consumo').addEventListener('input', calcular);
document.getElementById('fee').addEventListener('input', calcular);

function calcular() {
    const consumo = parseFloat(document.getElementById('consumo').value) || 0;
    const fee = parseFloat(document.getElementById('fee').value) || 0;
    const tarifa = document.getElementById('tarifa').value
    let mes = document.getElementById('mes').value

    let buscarValor = (mes, tipo, duracion,column) => {
        let resultado = excelData.find(item => 
            item.MES === mes && item.TARIFA === tipo && item.MESES === duracion
        );
        return resultado ? resultado[column] : null; // Devuelve el valor de P1 o null si no se encontró
    };

    if (consumo >0){
        for (i=0; i<6;i++){
            document.getElementById(`energia_12_p${i+1}`).value = buscarValor(mes,tarifa,12,`TerminoVariableP${i+1}`) === "" || buscarValor(mes,tarifa,12,`TerminoVariableP${i+1}`) === 0 ? "" : ((buscarValor(mes,tarifa,12,`TerminoVariableP${i+1}`) + fee/1000) + (fee*1.2/1000)).toFixed(6)    
            document.getElementById(`energia_24_p${i+1}`).value = buscarValor(mes,tarifa,24,`TerminoVariableP${i+1}`) === "" || buscarValor(mes,tarifa,24,`TerminoVariableP${i+1}`) === 0 ? "" : ((buscarValor(mes,tarifa,24,`TerminoVariableP${i+1}`) + fee/1000) + (fee*1.2/1000)).toFixed(6)    
            document.getElementById(`energia_36_p${i+1}`).value = buscarValor(mes,tarifa,36,`TerminoVariableP${i+1}`) === "" || buscarValor(mes,tarifa,36,`TerminoVariableP${i+1}`) === 0 ? "" : ((buscarValor(mes,tarifa,36,`TerminoVariableP${i+1}`) + fee/1000) + (fee*1.2/1000)).toFixed(6)    
            document.getElementById(`potencia_12_p${i+1}`).value = buscarValor(mes,tarifa,12,`PotenciaP${i+1}`) === "" || buscarValor(mes,tarifa,12,`PotenciaP${i+1}`) === 0 ? "" : ((buscarValor(mes,tarifa,12,`PotenciaP${i+1}`))).toFixed(6) 
            document.getElementById(`potencia_24_p${i+1}`).value = buscarValor(mes,tarifa,24,`PotenciaP${i+1}`) === "" || buscarValor(mes,tarifa,24,`PotenciaP${i+1}`) === 0 ? "" : ((buscarValor(mes,tarifa,24,`PotenciaP${i+1}`))).toFixed(6) 
            document.getElementById(`potencia_36_p${i+1}`).value = buscarValor(mes,tarifa,36,`PotenciaP${i+1}`) === "" || buscarValor(mes,tarifa,36,`PotenciaP${i+1}`) === 0 ? "" : ((buscarValor(mes,tarifa,36,`PotenciaP${i+1}`))).toFixed(6) 
        }   

    }
    
    
    
    
    

}