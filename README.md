<center>
	<img  src="https://img.shields.io/badge/npm-V9.2.0-blue"  alt="badge"  />
	<img  src="https://img.shields.io/badge/node-v14.19.3-blue"  alt="badge"  />
	<img  src="https://img.shields.io/badge/tested with-jest-green"  alt="badge"  />
</center>

# Wisengine Framework

Framework para soportar la implementación de aplicaciones de gestión del conocimiento.

## Instalación

Ejecutar en la consola:

`npm login`

Usuario: akelab-dev
Clave: @kel@bnpm1
Correo: accounts@akelab.org

`npm install @akelab/wisengine-framework`

Y en el archivo donde se quiera usar el componente Sort (por ejemplo) agregar:

`import {Sort} from '@akelab/wisengine-framework';`

`import "@akelab/wisengine-framework/build/style.css";`

## Componentes

* Sort
* FilterModal
* UpdateInput
* ImageProfile 
* Select
* [InputCreate](InputCreate.md).
* [Visor de contenidos](https://github.com/juanvelasco100/wisengine-framework/tree/master/src/content_viewer/README.md)
* [Gestor de contenidos](https://github.com/juanvelasco100/wisengine-framework/tree/master/src/content_portal/README.md)
* [Editor de contenidos](https://github.com/juanvelasco100/wisengine-framework/tree/master/src/content_manager/README.md)

## Actualizar

Para obtener los últimos cambios publicados ejecutar en la consola

`npm update @akelab/wisengine-framework`

## Ambiente de Desarrollo

Estas instrucciones son para hacer cambios en los componentes del framework. Se descarga el proyecto del framework desde github y se prueban los cambios en alguna aplicación que utilice el framework, como por ejemplo en nbd.

En la consola ejecutar:

`git clone https://github.com/juanvelasco100/wisengine-framework.git `

`cd wisengine-framework`

`git config core.autocrlf false`

`npm install --development`

El siguiente comando se ejecuta con permisos de administrador, (En Windows quitar el `sudo`)

`sudo npm link`

Renombramos los paquetes de react y react-dom para que no causen conflictos desde la aplicación de pruebas

`mv ./node_modules/react ./node_modules/reactXXX`

`mv ./node_modules/react-dom ./node_modules/react-domXXX`

Ahora nos ubicamos en la carpeta del proyecto donde se desean probar los componentes. En este caso por ejemplo nbd.

`cd ../nbd`

y luego ejecutamos

`npm link @akelab/wisengine-framework`

volvemos a ubicarnos en la carpeta del framework para realizar los cambios que deseamos en el framework

`cd ../wisengine-framework`

Una vez realizados cambios ejecutamos el siguiente comando para generar el build

`npm run build`

En este momento en la aplicación que estén usando para hacer pruebas se deben reflejar los cambios realizados. 
Cuando estén satisfechos con los cambios, actualizar la versión en package.json y ejecutar

`npm publish`

Este comando sube el nuevo build al repositorio de npm y queda disponible para que las aplicaciones utilicen estos nuevos cambios.

Ahora se deberían subir los cambios a Github.

## Desinstalación del ambiente de desarrollo

En la carpeta del framework ejecutar

`sudo npm unlink`

`npm install`

En la carpeta del proyecto de pruebas ejecutar

`npm unlink`

`npm install`

