# Copyright (c) 2021, Luaitech and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class EntradaDeMaterial(Document):
	def on_submit(self):
		self.update_stock_add()
		
	def on_cancel(self):
		self.update_stock_sub()


	def update_stock_add(self):
		for item in self.items:
		  frappe.db.sql(""" UPDATE `tabMaterial` SET qtd_disponivel = qtd_disponivel + %s WHERE nome = %s """ , (item.item_qtd, item.item_nota))

	def update_stock_sub(self):
		for item in self.items:
		  frappe.db.sql(""" UPDATE `tabMaterial` SET qtd_disponivel = qtd_disponivel - %s WHERE nome = %s """ , (item.item_qtd, item.item_nota))

	
