# criar um app
 - comando: bench new-app cmms

# Instalação de um aplicativo em um site 
    - comando: bench --site cmms.localhost install-app cmms

# Para verificar se o aplicativo foi instalado corretamente, execute o seguinte comando:
    - comando: bench --site cmms.localhost list-apps

# Limpar cache
 - bench migrate && bench clear-cache




# ERROS

Se não estiver mostrando comandos de estrutura, como migração de bancada ou construção de bancada.
Experimente isto:

cd ~ / frappe-bench
rm -rf env
configuração do banco env
./env/bin/pip install -U setuptools
./env/bin/pip install -e apps / frappe
bench setup requirements


validate: function(frm) {
		frappe.call({
			method: "frappe.client.get_value",
			args: {
				doctype: "Event",
				fieldname: "client",
				filters: {
					"customer": frm.doc.client,
					"date": frm.doc.starts_on
				}
			},
			callback: function(r, rt) {
				if (r.message.client) {
					frappe.throw(__(“Event {0} is already exists.”, [r.message.client]))
				}
			}
		});
	}