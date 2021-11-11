from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in cmms/__init__.py
from cmms import __version__ as version

setup(
	name="cmms",
	version=version,
	description="Manutençao de maquinas e equipamentos",
	author="Luaitech",
	author_email="gomcalsam@gmail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
