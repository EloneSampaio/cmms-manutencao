from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in manutencao_app/__init__.py
from manutencao_app import __version__ as version

setup(
	name="manutencao_app",
	version=version,
	description="Sistma de manutencao mecanica",
	author="Luaitech",
	author_email="sam@gmail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
