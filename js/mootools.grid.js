// nombre : mootools.grid.js
// version : 1.0
// dependencias : mootools-core-min.js, mootools-min.js, underscore-min.js, jquery.min.js, mootools.dao.js

IGridPlan = new Interface( "IGridPlan", {
    SetTableId: function(id_tabla) {},
    SetTableObj: function(objeto) {},
    SetTableHeader: function(array_json_th) {},
    SetTableBody: function(array_json_td, array_json_btn_td, ajax_dao) {},
    SetTableFooter: function(array_json_btn, tamanio_pagina) {},
    SetURLGuardar: function(url) {} 
});

var Grid = new Class({
    Interfaces: [ IGridPlan ],
    html_gird : "",
    SetTableId: function(id_tabla) {
        this.id_dom = "#" + id_tabla;
        this.observador = new Observador(id_tabla);
        ObservadorConcreto.RegistrarObservador(this.observador);
    },
    SetTableObj: function(objeto) {
        this.objeto = objeto;
    },
    SetTableHeader: function(array_json_th) {
        this.array_json_th = array_json_th;
        var cabecera = "<thead><tr>";
        for(var i = 0; i < array_json_th.length; i++){
            //console.log(array_json_th[i]);
            cabecera = cabecera + "<th style='"+ array_json_th[i].estilos +"'>" + array_json_th[i].titulo + "</th>";
        }
        cabecera = cabecera + "</tr></thead>";
        //this.cabecera = cabecera;
        this.html_gird = this.html_gird + cabecera;
    },
    SetTableBody: function(array_json_td, array_json_btn_td, ajax_dao) {
        //console.log(array_json_td); //console.log(array_json_btn_td); //console.log(ajax_dao.GetRespuesta());
        this.array_json_td = array_json_td; this.array_json_btn = array_json_btn;
        this.html_gird = this.html_gird + "<tbody>";
        for( var i = 0; i < ajax_dao.GetRespuesta().length; i++){
            this.html_gird = this.html_gird + "<tr>"; 
           for( var k = 0; k < array_json_td.length; k++){
                var index_td = array_json_td[k].index;
                var tipo_form = array_json_td[k].tipo; 
                //console.log(array_json_td[k].tipo); //console.log(index_td); //console.log(valor_ajax_dao);
                switch(tipo_form) {
                    case "text":
                        //console.log("tenemos un texto");
                        var input_text = new InputText();
                        var estilos = array_json_td[k].estilos;
                        var edicion = array_json_td[k].edicion;
                        var valor = ajax_dao.GetRespuesta()[i][index_td];
                        
                        input_text.Crear(estilos,edicion,valor, this.objeto); //console.log(input_text.GetHtml());
                        this.html_gird = this.html_gird + input_text.GetHtml();
                        break;
                    case "label":
                        //console.log("tenemos un label");
                        var label = new Label();
                        var estilos = array_json_td[k].estilos;
                        var valor = ajax_dao.GetRespuesta()[i][index_td];

                        label.Crear(estilos, valor, index_td);//console.log(label.GetHtml());
                        this.html_gird = this.html_gird + label.GetHtml();
                        break;
                    case "label_id":
                        //console.log("tenemos un label");
                        var label_id = new LabelId();
                        var estilos = array_json_td[k].estilos;
                        var valor = ajax_dao.GetRespuesta()[i][index_td];

                        label_id.Crear(estilos, valor, index_td);//console.log(label.GetHtml());
                        this.html_gird = this.html_gird + label_id.GetHtml();
                        break;
                    case "label_id_mongo":
                        //console.log("tenemos un label");
                        var label_id_mongo = new LabelId();
                        var estilos = array_json_td[k].estilos;
                        var valor = ajax_dao.GetRespuesta()[i][index_td]; valor = valor["$oid"];

                        label_id_mongo.Crear(estilos, valor, index_td);//console.log(label.GetHtml());
                        this.html_gird = this.html_gird + label_id_mongo.GetHtml();
                        break;
                    case "botones":
                        var botones_fila = new BotonesFila();
                        var estilos = array_json_td[k].estilos;
                        
                        botones_fila.Crear(array_json_btn_td, estilos, this.objeto); //console.log(botones_fila.GetHtml());
                        this.html_gird = this.html_gird + botones_fila.GetHtml();
                        break;
                    default:
                        console.log("SetTableBody:'" + tipo_form + "' no tiene una implementación.");
                }    
           }
           this.html_gird = this.html_gird + "</tr>"; 
        }
        this.html_gird = this.html_gird + "</tbody>"; 
    },
    SetTableFooter: function(array_json_btn, tamanio_pagina) {
        this.html_gird = this.html_gird + "<tfoot><tr><td colspan='1000' style='text-align:right'>";
        
        for( var i = 0; i < array_json_btn.length; i++){
            //tipo: "agrega_fila", operacion:"AgregarFila", icono: "fa fa-plus", label: "Agregar Registro"
            var boton = new Button();
            boton.Crear(array_json_btn[i].label, array_json_btn[i].icono, array_json_btn[i].operacion, array_json_btn[i].clase, this.objeto);
            this.html_gird = this.html_gird + boton.GetHtml();
        }

        this.html_gird = this.html_gird + "</td></tr></tfoot>";
    },
    SetURLGuardar: function(url) {
        this.url_guardar = url;
    },
    MostrarTable: function(){
        //console.log(this.id_dom);//console.log(this.html_gird);
        $(this.id_dom).append(this.html_gird);
    } ,
    BorrarTable: function(){
        this.html_gird = "";
        $(this.id_dom).children().remove();
    },
    GetEstructuraFila: function(){
        var rpta = [];
        rpta[0] = array_json_td; rpta[1] = array_json_btn_td;
        return rpta;
    }
});