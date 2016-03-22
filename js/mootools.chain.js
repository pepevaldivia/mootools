 // nombre : mootools.chain.js
// version : 1.0
// dependencias : mootools-core-min.js, mootools-min.js, underscore-min.js, jquery.min.js

 IChainOperacion = new Interface( "IChainOperacion", { 
    SetearSiguienteInstancia: function(instancia){},
    SiguienteEslabon: function(operacion, obj_query_event, objeto) {}, 
    EjecutarOperacion: function(operacion, obj_query_event, objeto) {}
}); 

var AgregarFila = new Class({
    Interfaces: [ IChainOperacion ], 
    SetearSiguienteInstancia: function(instancia){
        //implementación de IChainOperacion
         this.siguiente_instancia = instancia;
    },
    SiguienteEslabon: function(operacion, thisDOM, objeto) {
        //implementación de IChainOperacion
        this.siguiente_instancia.EjecutarOperacion(operacion, thisDOM, objeto);
    }, 
    EjecutarOperacion: function(operacion, thisDOM, objeto) {
        //implementación de IChainOperacion
        if(operacion == "AgregarFila"){
            //console.log("Debería agregar una fila"); console.log(objeto);
            var array_json_td = objeto.array_json_td;
            var array_json_th = objeto.array_json_th;
            var nueva_fila = "<tr>";

            for( var k = 0; k < array_json_th.length; k++){
                 var index_td = array_json_td[k].index;
                 var tipo_form = array_json_td[k].tipo; 
                 //console.log(array_json_td[k].tipo); //console.log(index_td); //console.log(valor_ajax_dao);
                 switch(tipo_form) {
                     case "text":
                         //console.log("tenemos un texto");
                         var input_text = new InputText();
                         var estilos = array_json_td[k].estilos;
                         var edicion = array_json_td[k].edicion;
                         var valor = "";
                         input_text.Crear(estilos,edicion,valor, objeto.objeto); //console.log(input_text.GetHtml());
                         nueva_fila = nueva_fila + input_text.GetHtml();
                         break;
                     case "label":
                         //console.log("tenemos un label");
                         var label = new Label();
                         var titulo_th = array_json_th[k].titulo;
                         var estilos = array_json_td[k].estilos;
                         var valor = "";

                         if(titulo_th == "id"){
                            valor = objeto.id_dom.substring(1) + "_"+ _.random(0, 1000);
                         }

                         label.Crear(estilos, valor, objeto);//console.log(label.GetHtml());
                         nueva_fila = nueva_fila + label.GetHtml();
                         break;
                      case "label_id":
                         //console.log("tenemos un label");
                         var label = new LabelId();
                         var titulo_th = array_json_th[k].titulo;
                         var estilos = array_json_td[k].estilos;
                         var valor = "";

                         if(titulo_th == "id"){
                            valor = objeto.id_dom.substring(1) + "_"+ _.random(0, 1000);
                         }

                         label.Crear(estilos, valor, objeto);//console.log(label.GetHtml());
                         nueva_fila = nueva_fila + label.GetHtml();
                         break;
                      case "label_id_mongo":
                         //console.log("tenemos un label");
                         var label_id_mongo = new LabelId();
                         var estilos = array_json_td[k].estilos;
                         var titulo_th = array_json_th[k].titulo;
                         
                         if(titulo_th == "id"){
                            valor = objeto.id_dom.substring(1) + "_"+ _.random(0, 1000);
                         }

                         label_id_mongo.Crear(estilos, valor, index_td);//console.log(label.GetHtml());
                         nueva_fila = nueva_fila + label_id_mongo.GetHtml();
                         break;
                     case "botones":
                         var botones_fila = new BotonesFila();
                         var estilos = array_json_td[k].estilos;
                         
                         botones_fila.Crear(array_json_btn_td, estilos, this.objeto); //console.log(botones_fila.GetHtml());
                         nueva_fila = nueva_fila + botones_fila.GetHtml();
                         break;
                     default:
                        console.log("SetTableBody:'" + tipo_form + "' no tiene una implementación.");
                 }    
            }

            nueva_fila = nueva_fila + "</tr>";
            //console.log(nueva_fila);
            $(objeto.id_dom + " tbody").append(nueva_fila);
        }else{
           try {
              this.SiguienteEslabon(operacion, thisDOM, objeto);
           }catch(error){
              console.log("Operación no implementada");
           }
        }
    }
});

var QuitarFila = new Class({
    Interfaces: [ IChainOperacion ],
    SetearSiguienteInstancia: function(instancia){
        //implementación de IChainOperacion
        this.siguiente_instancia = instancia;
    },
    SiguienteEslabon: function(operacion, thisDOM, objeto) {
        //implementación de IChainOperacion
        this.siguiente_instancia.EjecutarOperacion(operacion, thisDOM, objeto);
    }, 
    EjecutarOperacion: function(operacion, thisDOM, objeto) {
        //implementación de IChainOperacion
        if(operacion == "QuitarFila"){
            //console.log("Debería quitar una fila");
            var id_fila = thisDOM[0].getParent().getParent().getChildren()[0].getChildren().get('html')[0];
            var tipo_arreglo = "eliminado";
            var id_tabla =  thisDOM[0].getParent().getParent().getParent().getParent().get('id');
            var fila =  thisDOM[0].getParent().getParent();
            fila.remove();
            ObservadorConcreto.NotificarObservadores(objeto.observador, tipo_arreglo, id_fila);
        }else{
             try {
              this.SiguienteEslabon(operacion, thisDOM, objeto);
           }catch(error){
              console.log("Operación no implementada");
           }
        }
    }
});

var EditarFila = new Class({
    Interfaces: [ IChainOperacion ],
    SetearSiguienteInstancia: function(instancia){
        //implementación de IChainOperacion
        this.siguiente_instancia = instancia;
    },
    SiguienteEslabon: function(operacion, thisDOM, objeto) {
        //implementación de IChainOperacion
        this.siguiente_instancia.EjecutarOperacion(operacion, thisDOM, objeto);
    }, 
    EjecutarOperacion: function(operacion, thisDOM, objeto) {
        //implementación de IChainOperacion
        if(operacion == "EditarFila"){
            console.log("Debería editar una fila");
        }else{
             try {
              this.SiguienteEslabon(operacion, thisDOM, objeto);
           }catch(error){
              console.log("Operación no implementada");
           }
        }
    }
});

var EditarInputText = new Class({
    Interfaces: [ IChainOperacion ],
    SetearSiguienteInstancia: function(instancia){
        //implementación de IChainOperacion
        this.siguiente_instancia = instancia;
    },
    SiguienteEslabon: function(operacion, thisDOM, objeto) {
        //implementación de IChainOperacion
        this.siguiente_instancia.EjecutarOperacion(operacion, thisDOM, objeto);
    }, 
    EjecutarOperacion: function(operacion, thisDOM, objeto) {
        //implementación de IChainOperacion
        if(operacion == "EditarInputText"){
            var id_fila = thisDOM.parent().parent().children(0).children(0).html();
            var id_tabla =  thisDOM.parent().parent().parent().parent().attr("id");
            //console.log(id_tabla);console.log(id_fila);console.log(id_fila.indexOf(id_tabla));
            if(id_fila.indexOf(id_tabla) > -1){
                //console.log("es una fila nueva");
                var tipo_arreglo = "nuevo";
            }else{
                //console.log("es una fila editada");
                var tipo_arreglo = "editado";
            }
           
           ObservadorConcreto.NotificarObservadores(objeto.observador, tipo_arreglo, id_fila);
        }else{
             try {
              this.SiguienteEslabon(operacion, thisDOM, objeto);
           }catch(error){
              console.log("Operación no implementada");
           }
        }
    }
});

 var GuardarTabla = new Class({
    Interfaces: [ IChainOperacion ],
    SetearSiguienteInstancia: function(instancia){
        //implementación de IChainOperacion
        this.siguiente_instancia = instancia;
    },
    SiguienteEslabon: function(operacion, thisDOM, objeto) {
        //implementación de IChainOperacion
        this.siguiente_instancia.EjecutarOperacion(operacion, thisDOM, objeto);
    }, 
    EjecutarOperacion: function(operacion, thisDOM, objeto) {
        //implementación de IChainOperacion
        if(operacion == "GuardarTabla"){
           //GENERAR UN OBJETO A ENVIAR POR AJAX QUE TENGA LOS OBJETOS EDITADOS; NUEVOS y ELIMINADOS EN FUNCION A "array_json_td"
           var tabla_actual = objeto.id_dom.substring(1);
           var objeto_observado;
           for( var k = 0 ; k < ObservadorConcreto.observador_array.length ; k++){
               if(ObservadorConcreto.observador_array[k].tabla_observada == tabla_actual){
                   objeto_observado = ObservadorConcreto.observador_array[k];
               }  
           }
           //console.log(objeto_observado);
           var arreglo_nuevos = [];            var arreglo_editados = [];           var arreglo_eliminados = []; 
           for(var k = 0; k < $(objeto.id_dom).children("tbody").children().length; k++){
               var fila = $(objeto.id_dom).children("tbody").children()[k];
               for(var i = 0; i < $(fila).children().length; i++){
                   var titulo_td = $($(fila).children()[i]).attr("title");
                   var id = $($(fila).children()[i]).children().html();
                   if(titulo_td == "label_id" || titulo_td == "label_id_mongo"){
                      console.log("XDXFAFASDFADSF");
                       if (_.contains(objeto_observado.arreglo_editados, id)){
                          var fila_editado = $($(fila).children()[i]).parent();
                          //console.log("EDITADO");
                          var temp = this.GenerarObjetoJSON(fila_editado, objeto.array_json_th);
                          arreglo_editados.push(temp);
                       }
                       if (_.contains(objeto_observado.arreglo_nuevos, id)){
                           var fila_nueva = $($(fila).children()[i]).parent();
                          //console.log("NUEVO");
                          var temp = (this.GenerarObjetoJSON(fila_nueva, objeto.array_json_th));
                          arreglo_nuevos.push(temp);
                       }
                   }
               }
           }
           //console.log("arreglo_nuevos");console.log(arreglo_nuevos);console.log("arreglo_editados");console.log(arreglo_editados);console.log("arreglo_eliminados");console.log(arreglo_eliminados);
           
           //ENVIARLOS POR AJAX
           if(arreglo_nuevos.length == 0 && arreglo_editados.length == 0 && objeto_observado.arreglo_eliminados.length == 0){
               alert("No ha ejecutado cambios en la tabla");
           }else{
               var array_json_datos_ajax = [];
               var json_datos_ajax_nuevos = {};    var json_datos_ajax_editados = {};    var json_datos_ajax_eliminados = {};
               
               json_datos_ajax_nuevos["tipo"] = "nuevos";    
               json_datos_ajax_nuevos["contenido"] = arreglo_nuevos;
               array_json_datos_ajax.push(json_datos_ajax_nuevos);
               
               json_datos_ajax_editados["tipo"] = "editados";    
               json_datos_ajax_editados["contenido"] = arreglo_editados;
               array_json_datos_ajax.push(json_datos_ajax_editados);
               
               json_datos_ajax_eliminados["tipo"] = "elimnados";    
               json_datos_ajax_eliminados["contenido"] = objeto_observado.arreglo_eliminados;
               array_json_datos_ajax.push(json_datos_ajax_eliminados);

               //console.log(array_json_datos_ajax);  //esto es para comprobar el formato a enviar
               var json_parse = JSON.stringify(array_json_datos_ajax);
               var ajax_tabla = new AjaxRuby(); 
               //ajax_tabla.Constructor("POST", BASE_URL_R + "departamento/guarda_tabla?array_json_tabla=" + json_parse , "", false);
               //ajax_tabla.Constructor("POST", BASE_URL_R + "departamento/guardar_tabla/" + json_parse , "", false);
               ajax_tabla.Constructor("POST", objeto.url_guardar + json_parse , "", false);
           }
           
           //SI NO HAY ERROR EN EL AJAX, ENTONCES QUITO EL OBSERVADOR

           //FIN

           //console.log(tipo_arreglo);
           //ObservadorConcreto.NotificarObservadores(objeto.observador, tipo_arreglo, id_fila);
        }else{
             try {
              this.SiguienteEslabon(operacion, thisDOM, objeto);
           }catch(error){
              console.log("Operación no implementada");
           }
        }
    },
    GenerarObjetoJSON: function(objeto_fila, array_json_th){
        var arreglo_indices = [];
        var arreglo_rpta = [];
        //console.log(array_json_th);
        for( var k = 0; k < array_json_th.length; k++){
            arreglo_indices.push(array_json_th[k].index);
        }

        var objeto_nuevo  = {};
        for( var k = 0; k < objeto_fila.children().length ; k++){
           var titulo_td = $($(objeto_fila.children())[k]).attr("title");
           console.log(titulo_td);
           switch(titulo_td) {
               case "text":
                  //console.log(k + " tenemos un texto");
                  var llave = arreglo_indices[k];
                  var valor = $(objeto_fila.children()[k]).children().val();
                  objeto_nuevo[llave] = valor;
                  //console.log(llave + " : " + valor);
                  break;
               case "label":
                  console.log(k + " tenemos un label");
                   var llave = arreglo_indices[k];
                   var valor = $(objeto_fila.children()[k]).children().html();
                  objeto_nuevo[llave] = valor;
                  //console.log(llave + " : " + valor);
                   break;
               case "label_id":
                  //console.log(k + " tenemos un label_id");
                   var llave = arreglo_indices[k];
                   var valor = $(objeto_fila.children()[k]).children().html();
                   objeto_nuevo[llave] = valor;
                  //console.log(llave + " : " + valor);
                   break;
               case "label_id_mongo":
                  //console.log(k + " tenemos un label_id");
                   var llave = arreglo_indices[k];
                   var valor = $(objeto_fila.children()[k]).children().html();
                   objeto_nuevo[llave] = valor;
                  //console.log(llave + " : " + valor);
                   break;
               case "botonesTd":
                   //No hace nada porque lo botones no cambian
                   //console.log(k + " tenemos un conjunto de botones");
                   break;
               default:
                  console.log("GenerarObjetoJSON:'" + tipo_form + "' no tiene una implementación.");
           } 
        }
        //console.log(objeto_nuevo);
        return objeto_nuevo;
    }
});