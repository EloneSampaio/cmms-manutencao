// Copyright (c) 2021, Luaitech and contributors
// For license information, please see license.txt

frappe.ui.form.on('EntradaDeMaterial', {
	setup: function(frm) {

		frm.valorTotalNota = function(frm) {
	
			let total = 0;

			total = total + frm.doc.valor_da_nota;
			
			if(frm.doc.valor_da_nota_desconto){
				total = total - frm.doc.valor_da_nota_desconto;
				
			}
			if(frm.doc.valor_da_nota_acrescimo){
				total = total + frm.doc.valor_da_nota_acrescimo;
				
				
			}
			
			console.log(total);
			frm.set_value('total_nota',total); 
		
		},

		frm.verificar_duplicated_entrada = function(frm,row){

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

	total_nota: function(frm){
		frm.set_df_property('total_nota', 'read_only', true);
	},
	
	
	valor_da_nota: function(frm){
			frm.valorTotalNota(frm);
	},

	valor_da_nota_desconto: function(frm){
			frm.valorTotalNota(frm);
	},
	valor_da_nota_acrescimo: function(frm){
			frm.valorTotalNota(frm);
	},
	




});

frappe.ui.form.on('ItensDanota',{

item_nota: function(frm,cdt,cdn){
	let row = locals[cdt][cdn];
	frm.verificar_duplicated_entrada(frm,row);
},

});
