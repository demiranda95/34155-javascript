let salirMenu = false
do{
    let opcionIngresada = parseInt(prompt(`Ingrese la opción deseada
        1 - Calculadora de Notas Universitarias (Escala 1 al 10, notas ponderadas)
        2 - Calculador de Notas Colegio/Escuela (Escala de 1 al 7, notas parciales)
        0 - Salir del menu`))
    
    switch(opcionIngresada){

        case 1:
            let simulador1
            do{
                function saludarAlumno(nombre){
                    alert(`¡Bienvenido ${nombre}!`)
                }
                
                alert(`CALCULADORA DE PROMEDIOS PARA ALUMNOS. Este Simulador calcula el promedio de notas PONDERADAS del 1 al 10`)
                
                let nombreAlumno = prompt("Por favor introduce tu NOMBRE")
                
                saludarAlumno(nombreAlumno)
                
                let cantidadNotas = parseInt(prompt("Ingresa la cantidad de notas de tu curso:"))
                
                while(isNaN(cantidadNotas)){
                    cantidadNotas = parseInt(prompt(`TIPO DE DATO INCORRECTO, SOLO PUEDES INGRESAR VALORES NUMERICOS
                    Ingrese la cantidad de notas que deseas calcular para ${nombreAlumno}`))
                }

                let total = 0

                function sumarPonderado (total, nota, ponderacionNota) {
                    return total + nota*(ponderacionNota/100)
                }

                for(let i = 1; i <=cantidadNotas; i++){
                    let nota = parseInt(prompt(`Ingrese nota n° ${i}`))
                    while(isNaN(nota)){
                        nota = parseInt(prompt(`TIPO DE DATO INCORRECTO, SOLO PUEDES INGRESAR VALORES NUMERICOS. 
                        Ingrese nota n° ${i}`))
                    }
                    let ponderacionNota = parseInt(prompt(`Ingrese el % ponderación de Nota n° ${i}`))
                    while(isNaN(ponderacionNota)){
                        ponderacionNota = parseInt(prompt(`TIPO DE DATO INCORRECTO, SOLO PUEDES INGRESAR VALORES NUMERICOS.
                        Ingrese el % ponderación de nota n° ${i}`))
                    }
                    if(nota >=0 && nota <=10 && ponderacionNota >=0 && ponderacionNota <=100){
                        total = sumarPonderado(total, nota, ponderacionNota)
                        console.log(`El total parcial es ${total}`)
                    }else{
                        while(nota < 0 || nota > 10 && ponderacionNota < 0 || ponderacionNota > 100){
                            nota = parseInt(prompt(`¡ATENCIÓN! ingresa un valor entre 0 y 10 para la nota n°${i}`))
                        }
                        total = sumarPonderado(total, nota, ponderacionNota)
                        console.log(`El total parcial es ${total}`)
                    }
                }
                
                let promedio = total
                
                alert(`El promedio de ${nombreAlumno} es ${promedio.toFixed(1)}`)
                
                if(promedio == 10){
                    alert(`${nombreAlumno} has aprobado con la NOTA MAXIMA!`)
                }else if(promedio >= 5){
                    alert(`${nombreAlumno} has APROBADO el curso`) 
                }else{
                    alert(`${nombreAlumno} NO has aprobado`)
                }

                simulador1 = prompt("Responda si desea seguir ingresando alumnos. ESC para salir")
            }while(simulador1.toUpperCase() != "ESC")
        break
        
        case 2:
            let simulador2
            do{
                function saludarAlumno(nombre){
                    alert(`¡Bienvenido ${nombre}!`)
                }
                
                alert(`CALCULADORA DE PROMEDIOS PARA ALUMNOS DE COLEGIOS Y ESCUELAS. Este Simulador calcula el promedio de notas parciales del 1 al 7`)
                
                let nombreAlumno = prompt("Por favor introduce tu nombre")
                saludarAlumno(nombreAlumno)
                
                let cantidadNotas = parseInt(prompt("Ingresa la cantidad de notas de tu curso:"))
                
                while(isNaN(cantidadNotas)){
                    cantidadNotas = parseInt(prompt(`TIPO DE DATO INCORRECTO, SOLO PUEDES INGRESAR VALORES NUMERICOS
                    Ingrese la cantidad de notas que desea ingresar para ${nombreAlumno}`))
                }

                let total = 0
                function sumarParcial (total, nota) {
                    return total + nota
                }

                function calcularPromedio (total, cantidadNotas){
                    return total / cantidadNotas
                }
                
                for(let i = 1; i <=cantidadNotas; i++){
                    let nota = parseInt(prompt(`Ingrese nota n° ${i}`))
                    while(isNaN(nota)){
                        nota = parseInt(prompt(`TIPO DE DATO INCORRECTO, SOLO PUEDES INGRESAR VALORES NUMERICOS. Ingrese nota n° ${i}`))
                    }
                    if(nota >=0 && nota <=7){
                        total = sumarParcial(total, nota)
                        console.log(`El total parcial es ${total}`)
                    }else{
                        while(nota < 0 || nota > 7){
                            nota = parseInt(prompt(`Atención ingrese un valor entre 0 y 7 para la nota n°${i}`))
                        }
                        total = sumarParcial(total, nota)
                        console.log(`El total parcial es ${total}`)
                    }
                }

                let promedio = calcularPromedio(total, cantidadNotas)
                
                alert(`El promedio de ${nombreAlumno} es ${promedio.toFixed(1)}`)
                
                if(promedio == 7){
                    alert(`${nombreAlumno} has aprobado con la NOTA MAXIMA!`)
                }else if(promedio >= 4){
                    alert(`${nombreAlumno} has APROBADO el curso`) 
                }else{
                    alert(`${nombreAlumno} NO has aprobado`)
                }
                
                simulador2 = prompt("Responda si desea seguir ingresando alumnos. ESC para salir")
            }while(simulador2.toUpperCase() != "ESC")
        break

        case 0:
            alert("Gracias por probar mi APP. Desarrollada por Diego Miranda - Curso JavaScript CoderHouse 2023")
            salirMenu = true
        break

        default:
            console.log("Ingrese una opción correcta")
        break
    }
}while(!salirMenu)