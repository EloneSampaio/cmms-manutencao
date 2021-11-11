# Copyright (c) 2021, Luaitech and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class LibraryTransaction(Document):
	def before_submit(self):
		if self.type == "Emitir":
			self.validate_issue()
			self.valid_maximo_emitido()
			article = frappe.get_doc("Artigo", self.article)
			article.status = "Emitido"
			article.save()

		elif self.type == "Devolver":
			self.validate_return()
			article = frappe.get_doc("Artigo", self.article)
			article.status = "Devolvido"
			article.save()

	def validate_issue(self):
		self.validate_membership()
		article = frappe.get_doc("Artigo", self.article)
		if article.status == "Emitido":
			frappe.throw("O artigo já foi emitido")
	def validate_return(self):
		self.validate_membership()
		article = frappe.get_doc("Artigo", self.article)
		if article.status == "Devolvido":
			frappe.throw("O artigo já foi devolvido")

	def valid_maximo_emitido(self):
		maximo_emitido = frappe.db.get_single_value("Library Settings", "max_number_article_issued")
		count_issued = frappe.db.count("Library Transaction", {
			"type": "Emitir",
			"member_library": self.member_library,
			"article": self.article,
			"data_transaction": ("<", self.data_transaction)
		})

		if count_issued >= maximo_emitido:
			frappe.throw("O limite de emissão de artigos foi atingido")

	def validate_membership(self):
		valid_member = frappe.db.exists("Library Membership", {
			"member_library": self.member_library,
			"from_date": ("<", self.data_transaction),
			"to_date": (">", self.data_transaction),
			"docstatus": 1
		})
		if not valid_member:
			frappe.throw("O usuário não possui associação com a biblioteca")

		

