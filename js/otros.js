// let salirMenu = false

// // Solicitar nombre de alumno
// let nombreAlumno = prompt("Por favor introduce tu NOMBRE")

// // Function para saludar alumno
// function saludarAlumno(nombre){
//     alert(`¡Bienvenido ${nombre}!`)
// }

// // Ejecutar el saludo a alumno con valor ingresado
// saludarAlumno(nombreAlumno)

// // Clase para notas
// class Nota {
//     constructor(id, alumno, nota, materia){
//         this.id = id,
//         this.alumno = alumno,
//         this.nota = nota,
//         this.materia = materia
//     }
// }

// // Array de notas vacio para iniciar
// const notas = []


// // Function para agrear notas
// function agregarNota(){
//     let notaIngresada = prompt("Ingrese Nota")
//     let materiaIngresada = prompt("Ingrese la materia")
//     //Nuevo objeto 
//     const registroNuevo = new Nota(notas.length+1, nombreAlumno, notaIngresada, materiaIngresada)
//     console.log(registroNuevo)
//     //Sumarlo al array de notas
//     notas.push(registroNuevo) 
//     console.log(notas)
// }

// // Function para ver registro de notas
// function verRegistro(array){
//     console.log("Tus Notas Registradas son:")
//     array.forEach((elem)=>{
//         console.log(elem.id, elem.alumno, elem.materia, elem.nota)
//     })
// }

// // Function para eliminar notas del registro
// function eliminarNota(array){
//     alert("A partir del registro ingrese el numero de la nota que desea eliminar")
//     for(let elem of array){
//         alert(`${elem.id} - Materia: ${elem.materia}, Nota: ${elem.nota}, Alumno: ${elem.alumno}`)
//     }
//     let idEliminar = parseInt(prompt("Ingrese el numero de nota a eliminar"))

//     // Map para que nos devuelva un array solo con id
//     let arrayID = array.map((elem) => elem.id)
//     console.log(arrayID)

//     // Le pasamos el parametro a indexOf para saber el indice donde se encuentra el parametro otorgado
//     let indice = arrayID.indexOf(idEliminar)

//     // Splice para indicar el indice y que nos permita eliminar el elemento
//     array.splice(indice, 1)
//     verRegistro(array)
// }

// // Function para ordenar notas del registro de Menor a Mayor
// function ordenarMenorMayor(array){
//     //Copia del array y posterior concatenacion
//     const menorMayor = [].concat(array)
//     //Ordenar de Menor a Mayor
//     menorMayor.sort((a,b) => a.nota - b.nota)
//     verRegistro(menorMayor)
// }

// // Function para ordenar notas del registro de Mayor a Menor
// function ordenarMayorMenor(array){
//     //Copia del array y posterior concatenacion
//     const mayorMenor = [].concat(array)
//     //Ordenar de Mayor a Menor
//     mayorMenor.sort((a,b) => b.nota - a.nota)
//     verRegistro(mayorMenor)
// }

// // Function para ordenar notas del registro Alfabeticamente según Materias
// function ordenarAlfabeticamente(array){
//     //Copia del array y posterior concatenacion
//     const ordenadoAlfabeticamente = [].concat(array)
//         //Ordenar Alfabeticamente tomando el value de Materia de los objetos
//         ordenadoAlfabeticamente.sort((a,b) => {
//             if(a.materia > b.materia) {
//             return 1
//             }
//             if (a.materia < b.materia) {
//             return -1
//             }
//             return 0;
//         })
//     verRegistro(ordenadoAlfabeticamente)
// }

// // Function el Menu de opciones de Ordenado
// function ordenar(array){
//     let opcion = parseInt(prompt(`
//     1 - Ordenar de menor a mayor
//     2 - Ordenar de mayor a menor
//     3 - Ordenar por Materia `))
//     switch(opcion){
//         case 1:
//             ordenarMenorMayor(array)
//         break
//         case 2:
//             ordenarMayorMenor(array)
//         break
//         case 3:
//             ordenarAlfabeticamente(array)
//         break
//         default:
//             console.log(`${opcion} no es válida para ordenar`)
//         break    
//     }
// }

// // Function para buscar notas según Materia
// function buscarNotasMateria(array){
//     //Ingresar el nombre de la Materia a buscar
//     let materiaBuscada = prompt("Ingrese el nombre de la materia que está buscando")
//     //Realizar la busqueda de filter para que nos devuelva un Array
//     //Se utiliza propiedad de .toLowerCase para evitar diferencias con el string ingresado
//     let busqueda = array.filter((nota)=> nota.materia.toLowerCase() == materiaBuscada.toLowerCase())
//     if(busqueda.length == 0){
//         console.log(`No hay notas registradas para la materia "${materiaBuscada}"`)
//     }else{
//         //Console.log para verificar el estado de la consulta
//         console.log(busqueda)
//         verRegistro(busqueda)
//     }
// }

// // Function el Menu de opciones de Calculadoras
// function calculadoras(){
//     let opcion = parseInt(prompt(`
//     1 - Calculadora de Notas Universitarias (Escala 1 al 10, notas ponderadas)
//     2 - Calculador de Notas Colegio/Escuela (Escala de 1 al 7, notas parciales)
//     0 - Volver al Menu Principal
//     `))
//     switch(opcion){
//         case 1:
//             let simulador1
//             do{
//                 alert(`CALCULADORA DE PROMEDIOS PARA ALUMNOS. Este Simulador calcula el promedio de notas PONDERADAS del 1 al 10`)
                
//                 let cantidadNotas = parseInt(prompt("Ingresa la cantidad de notas de tu curso:"))
                
//                 while(isNaN(cantidadNotas)){
//                     cantidadNotas = parseInt(prompt(`TIPO DE DATO INCORRECTO, SOLO PUEDES INGRESAR VALORES NUMERICOS
//                     Ingrese la cantidad de notas que deseas calcular para ${nombreAlumno}`))
//                 }

//                 let total = 0

//                 function sumarPonderado (total, nota, ponderacionNota) {
//                     return total + nota*(ponderacionNota/100)
//                 }

//                 for(let i = 1; i <=cantidadNotas; i++){
//                     let nota = parseInt(prompt(`Ingrese nota n° ${i}`))
//                     while(isNaN(nota)){
//                         nota = parseInt(prompt(`TIPO DE DATO INCORRECTO, SOLO PUEDES INGRESAR VALORES NUMERICOS. 
//                         Ingrese nota n° ${i}`))
//                     }
//                     let ponderacionNota = parseInt(prompt(`Ingrese el % ponderación de Nota n° ${i}`))
//                     while(isNaN(ponderacionNota)){
//                         ponderacionNota = parseInt(prompt(`TIPO DE DATO INCORRECTO, SOLO PUEDES INGRESAR VALORES NUMERICOS.
//                         Ingrese el % ponderación de nota n° ${i}`))
//                     }
//                     if(nota >=0 && nota <=10 && ponderacionNota >=0 && ponderacionNota <=100){
//                         total = sumarPonderado(total, nota, ponderacionNota)
//                         console.log(`El total parcial es ${total}`)
//                     }else{
//                         while(nota < 0 || nota > 10 && ponderacionNota < 0 || ponderacionNota > 100){
//                             nota = parseInt(prompt(`¡ATENCIÓN! ingresa un valor entre 0 y 10 para la nota n°${i}`))
//                         }
//                         total = sumarPonderado(total, nota, ponderacionNota)
//                         console.log(`El total parcial es ${total}`)
//                     }
//                 }
                
//                 let promedio = total
                
//                 alert(`El promedio de ${nombreAlumno} es ${promedio.toFixed(1)}`)
                
//                 if(promedio == 10){
//                     alert(`${nombreAlumno} has aprobado con la NOTA MAXIMA!`)
//                 }else if(promedio >= 5){
//                     alert(`${nombreAlumno} has APROBADO el curso`) 
//                 }else{
//                     alert(`${nombreAlumno} NO has aprobado`)
//                 }

//                 simulador1 = prompt("Responda si desea seguir calculando promedios. ESC para salir")
//             }while(simulador1.toUpperCase() != "ESC")
//         break
        
//         case 2:
//             let simulador2
//             do{                
//                 let cantidadNotas = parseInt(prompt("Ingresa la cantidad de notas de tu curso:"))
                
//                 while(isNaN(cantidadNotas)){
//                     cantidadNotas = parseInt(prompt(`TIPO DE DATO INCORRECTO, SOLO PUEDES INGRESAR VALORES NUMERICOS
//                     Ingrese la cantidad de notas que desea ingresar para ${nombreAlumno}`))
//                 }

//                 let total = 0
//                 function sumarParcial (total, nota) {
//                     return total + nota
//                 }

//                 function calcularPromedio (total, cantidadNotas){
//                     return total / cantidadNotas
//                 }
                
//                 for(let i = 1; i <=cantidadNotas; i++){
//                     let nota = parseInt(prompt(`Ingrese nota n° ${i}`))
//                     while(isNaN(nota)){
//                         nota = parseInt(prompt(`TIPO DE DATO INCORRECTO, SOLO PUEDES INGRESAR VALORES NUMERICOS. Ingrese nota n° ${i}`))
//                     }
//                     if(nota >=0 && nota <=7){
//                         total = sumarParcial(total, nota)
//                         console.log(`El total parcial es ${total}`)
//                     }else{
//                         while(nota < 0 || nota > 7){
//                             nota = parseInt(prompt(`Atención ingrese un valor entre 0 y 7 para la nota n°${i}`))
//                         }
//                         total = sumarParcial(total, nota)
//                         console.log(`El total parcial es ${total}`)
//                     }
//                 }

//                 let promedio = calcularPromedio(total, cantidadNotas)
                
//                 alert(`El promedio de ${nombreAlumno} es ${promedio.toFixed(1)}`)
                
//                 if(promedio == 7){
//                     alert(`${nombreAlumno} has aprobado con la NOTA MAXIMA!`)
//                 }else if(promedio >= 4){
//                     alert(`${nombreAlumno} has APROBADO el curso`) 
//                 }else{
//                     alert(`${nombreAlumno} NO has aprobado`)
//                 }
                
//                 simulador2 = prompt("Responda si desea seguir calculando promedios. ESC para salir")
//                 console.log(simulador2)
//             }while(simulador2.toUpperCase() != "ESC")
//         break
//         default:
//             console.log(`${opcion} no es válida para ordenar`)
//         break    
//     }
// }


// // Menu de Opciones
// do{
//     let opcionIngresada = parseInt(prompt(`Ingrese la opción deseada
//         1 - Calculadoras de Notas Universitarias o Colegios/Escuelas
//         2 - Registrar Nota Nueva
//         3 - Eliminar Nota
//         4 - Ver Registro de Notas
//         5 - Ordenar Notas
//         6 - Buscar Notas Según Materia
//         0 - Salir del menu`))
    
//     switch(opcionIngresada){

//         case 1:
//             calculadoras()
//         break

//         case 2:
//             agregarNota()
//         break

//         case 3:
//             eliminarNota(notas)
//         break

//         case 4:
//             verRegistro(notas)
//         break
        
//         case 5:
//             ordenar(notas)
//         break

//         case 6:
//             buscarNotasMateria(notas)
//         break
            
//         case 0:
//             alert("Gracias por probar mi APP. Desarrollada por Diego Miranda - Curso JavaScript CoderHouse 2023")
//             salirMenu = true
//         break

//         default:
//             console.log("Ingrese una opción correcta")
//         break
//     }
// }while(!salirMenu)
