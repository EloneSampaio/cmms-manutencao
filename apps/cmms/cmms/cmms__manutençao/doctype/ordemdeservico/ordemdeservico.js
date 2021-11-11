// Copyright (c) 2021, Luaitech and contributors
// For license information, please see license.txt

frappe.ui.form.on('OrdemDeServico', {
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
		}


	},


});

frappe.ui.form.on('ItensDanota',{

item_nota: function(frm,cdt,cdn){
	let row = locals[cdt][cdn];
	frm.verificar_duplicidade(frm,row);
},

});
