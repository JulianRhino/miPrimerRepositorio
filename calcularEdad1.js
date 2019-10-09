function CalcularEdad(){
    //variables para obtener el valor del campo que deseamos y la fecha actual.
    var fechaNacimiento = Xrm.Page.getAttribute("birthdate").getValue();
    var fechaActual = new Date();

    //Con el metodo getTime() obtenemos un valor numerico de las fechas.
    //Despues con ese valor obtenemos la diferencia entre ambas fechas.
    var diferencia = fechaActual.getTime() - fechaNacimiento.getTime();

    //Declaro las variables para determinar si un año es bisiesto
   var añoA = fechaActual.getFullYear(), añoN = fechaNacimiento.getFullYear();
   var añoB = 0, cont = 0, bis = 0;

   //Determinar si mi año de nacimiento es bisiesto
    if(añoN % 4 == 0)
    {
        if(añoN % 100 == 0)
        {
            if(añoN % 400 == 0)
                bis = 1;
        }
        else
            bis = 1;
    }

   // Ciclo contador para saber cuantos años dentro del rango son Bisiestos
   for(var año = añoN; año <= añoA; año++)
   {
       if(año % 4 == 0)
       {
           if(año % 100 == 0)
           {
               if(año % 400 == 0)
                   añoB += 366;
               else
                   añoB += 365;
           }
           else
               añoB += 366;
       }
       else 
           añoB += 365;     
    cont += 1;
   }
   //Variable que almacena el promedio de años bisiesto dentro del rango de diferencia
   var prom = añoB / cont;

   /*El valor obtenido se divide y se multiplica entre los siguiente valores:
    60(que corresponde a los segundos de 1 minuto)
    60(que corresponde a los minuntos de 1 hora)
    24(que corresponde a las horas normales de 1 dia)
    1000(para reducir 3 cifras del resultado final)
    prom(se divide entre los dias promedio que tiene 1 año)
    */
    var operacion = (diferencia / (60*60*24*1000) / prom);

    //La siguiente varible contiene el valor con decimales, por lo que
    //se utiliza el metodo Math.floor() y quedarnos asi solo con la parte entera, que correspondera a los años cumplidos
    var edad = Math.floor(operacion);

    //Compara si es su cumpleaños y manda felicitaciones.
    if((fechaNacimiento.getDate() == fechaActual.getDate()) && (fechaNacimiento.getMonth() == fechaActual.getMonth()))
    {   
        if(bis == 1)
            Xrm.Navigation.openAlertDialog({text: "El Usuario esta cumpliendo: " + (edad + 1) + " años. Felicidades"});
        else 
            Xrm.Navigation.openAlertDialog({text: "El Usuario esta cumpliendo: " + edad + " años. Felicidades"});
    }
    else
        Xrm.Navigation.openAlertDialog({text: "El Usuario tiene: " + edad + " años cumplidos."});    
}