# criar um app
 - comando: bench new-app cmms

# Instalação de um aplicativo em um site 
    - comando: bench --site cmms.localhost install-app cmms

# Para verificar se o aplicativo foi instalado corretamente, execute o seguinte comando:
    - comando: bench --site cmms.localhost list-apps

# Limpar cache
 - bench migrate && bench clear-cache




