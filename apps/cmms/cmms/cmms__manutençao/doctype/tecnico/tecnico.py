# Copyright (c) 2021, Luaitech and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document

class Tecnico(Document):
	def before_save(self):
		self.full_name = self.nome + " " + self.sobrenome
