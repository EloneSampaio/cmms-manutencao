
// Copyright (c) 2021, Luaitech and contributors
// For license information, please see license.txt

frappe.ui.form.on('SaidaDeMaterial', {
	setup: function(frm) {


		frm.verificar_duplicated_saida = function(frm,row){

			frm.doc.items.forEach(item=>{
				if(item.item_nota=='' || row.idx==item.idx){
					return;
				}else if(item.item_nota==row.item_nota){
					row.item_nota = '';
					row.item_preco = '';
					frappe.throw( `${item.item_nota} "Item duplicado na linha" ${item.idx}`);
					frappe.refresh_field('items');
				}

			});
		}


	},

	
	




});

frappe.ui.form.on('ItensDanota',{

item_nota: function(frm,cdt,cdn){
	let row = locals[cdt][cdn];
	frm.verificar_duplicated_saida(frm,row);
},

});

