// nombre : mootools.form.js
// version : 1.0
// dependencias : mootools-core-min.js, mootools-min.js, underscore-min.js,

IForm = new Interface("IForm", {
	Crear: function(){},
	GetHtml: function(){}
});

var InputText = new Class({
	Interfaces: [ IForm ],
	Crear: function(estilos,edicion,valor, objeto){
		if (typeof valor === 'undefined'){
			this.html = "<td title = 'text'><input type='text' id='' name='' value class='mootools' operacion='EditarInputText' objeto='" + objeto + "'  style='"+ estilos +"' "+ edicion + "></td>";
		}else{
			this.html = "<td title = 'text'><input type='text' id='' name='' value='" + valor + "' operacion='EditarInputText' class='mootools' objeto='" + objeto + "' style='"+ estilos +"' "+ edicion + "></td>";
		}
	},
	GetHtml: function(){
		return this.html;
	}
});

var Label = new Class({
	Interfaces: [ IForm ],
	Crear: function(estilos, valor){
		if(typeof valor === 'undefined'){valor = ' ';}
       if(typeof clase === 'undefined'){clase= ' ';}
       this.html = "<td  title = 'label' style='"+estilos+"'><label>"+ valor +"</label></td>";
	},
	GetHtml: function(){
		return this.html;
	}
});

var LabelId = new Class({
	Interfaces: [ IForm ],
	Crear: function(estilos, valor){
		if(typeof valor === 'undefined'){valor = ' ';}
       if(typeof clase === 'undefined'){clase= ' ';}
       this.html = "<td  title = 'label_id' style='"+estilos+"'><label>"+ valor +"</label></td>";
	},
	GetHtml: function(){
		return this.html;
	}
});

var Button = new Class({
	Interfaces: [ IForm ],
	//Button(array_json_btn[i].label, array_json_btn[i].icono, array_json_btn[i].operacion);
	Crear: function(label, icono, operacion, clase, objeto){
		if(typeof label === 'undefined'){valor = ' ';}
       if(typeof icono === 'undefined'){clase= ' ';}
       if(typeof operacion === 'undefined'){clase= ' ';}
       if(typeof clase === 'undefined'){clase= ' ';}
       this.html = "<button class= 'btn " + clase + "' operacion= '" + operacion +"' objeto='" + objeto + "'> <i class='" +icono + "' style='margin-right:5px' ></i>" + label + "</button>";
       //var boton = "<b title='Agregar Registro' class='btn-small boton-tabla mootools' href='#' style='margin-left:10px;' operacion=" + operacion + "><i class='fa fa-plus' style='margin-right: 5px;'></i>Agregar Registro</b>";
	},
	GetHtml: function(){
		return this.html;
	}
});

var BotonesFila = new Class({
	Interfaces: [ IForm ],
	Crear: function(array_json_btn_td, estilos, objeto){
		var botones_html = "<td title = 'botonesTd' style='"+ array_json_btn_td[0].estilos + "'>" ;
		
		for( var i = 0; i < array_json_btn_td.length; i++){
			//console.log(array_json_btn_td[i]);
			var boton = "<b operacion = '" + array_json_btn_td[i].operacion + "' objeto='" + objeto +"' class='mootools'><a title = '" + array_json_btn_td[i].alt + "' class = 'boton-tabla-td ' href = '" + array_json_btn_td[i].url + "' ><i class='" + array_json_btn_td[i].clase + "'></i></a></b>";
			botones_html = botones_html + boton;
		}

		this.html = botones_html + "</td>";
	},
	GetHtml: function(){
		return this.html;
	}
});