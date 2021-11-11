// Copyright (c) 2021, Luaitech and contributors
// For license information, please see license.txt

frappe.ui.form.on('MembroBiblioteca', {
	 refresh: function(frm) {
		frm.add_custom_button('Criar MemerShip ', ()=>{
			frappe.new_doc("Library Membership",{
				member_library: frm.doc.name
			})

		})

		frm.add_custom_button('Criar transação',()=>{
			frappe.new_doc("Library Transaction",{
				library_transaction: frm.doc.name
			})
		})
	 }
});
