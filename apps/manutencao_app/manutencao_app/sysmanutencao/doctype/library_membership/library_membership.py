# Copyright (c) 2021, Luaitech and contributors
# For license information, please see license.txt

# import frappe
import frappe
from frappe.model.document import Document

class LibraryMembership(Document):
	def before_submit(self):
		data = self
		self.validate_duplicate_membership(data)

	def validate_duplicate_membership(self, data):
	
		exists = frappe.db.exists("Library Membership", 
		{"member_library": data.member_library,
		 "docstatus": 1,
		 "to_date" : (">", data.from_date),
		 })
		if exists:
			frappe.throw("Já existe uma associação com o mesmo membro para a biblioteca selecionada")
		periodo_maximo = frappe.db.get_single_value("Library Settings", "periodo_emprestimo_maximo")
		data.to_date = frappe.utils.add_days(data.from_date, periodo_maximo or 15)
