// Copyright (c) 2021, Luaitech and contributors
// For license information, please see license.txt

frappe.ui.form.on('OrdemDeServico', {
	
	// Função que é chamada quando o formulário é carregado
	setup: function(frm) {

	
		frm.verificar_duplicidade = function(frm,row){

			frm.doc.items.forEach(item=>{
				if(item.item_nota=='' || row.idx==item.idx){
					return;
				}else if(item.item_nota==row.item_nota){
					row.item_nota = '';
					row.item_preco = '';
					frappe.throw( `${item.item_nota} "Item esta sendo duplicado na linha" ${item.idx}`);
					frappe.refresh_field('items');
				}

			});
		},

		//validar se a data é maior que a data atual
		frm.validar_data_mantenedor = function(frm,data){
			console.log('Validando data');

			if(data<frappe.datetime.now_datetime()){
				frm.disable_save();
				frappe.throw(`"A data não pode ser menor que a data atual "${moment(frappe.datetime.get_today()).format('DD-MM-YYYY')}`);
				frappe.validated = false;
				
			}else{
			    frappe.validated = true;
				frm.enable_save();
			}
		}
		//frm.set_value('data_mantenedor',frappe.datetime.now_datetime());
	},


	data_mantenedor: function(frm){
		frm.validar_data(frm,frm.doc.data_mantenedor);
	},
	date_inicio: function(frm){
		frm.validar_data(frm,frm.doc.date_inicio);
	}

		

});

frappe.ui.form.on('OrdemDeServico','validate', function(frm) {
	
});

frappe.ui.form.on('ItensDanota',{

item_nota: function(frm,cdt,cdn){
	let row = locals[cdt][cdn];
	frm.verificar_duplicidade(frm,row);
},

});
