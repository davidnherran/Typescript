<center>
	<img src="https://img.shields.io/badge/npm-V9.2.0-blue" alt="badge" />
	<img src="https://img.shields.io/badge/node-v14.19.3-blue" alt="badge" />
	<img src="https://img.shields.io/badge/tested with-jest-green" alt="badge" />
</center>

#  Gestor de contenidos

_El gestor de contenidos es un componente estructurado en una arquitectura micro frontend, su principal función es permitir la visualización de contenidos en una lista personalizable a modo de portal._

<a href="#">Demo</a>

##  Instalación

_Estas instrucciones te permitirán obtener una copia del proyecto en tu máquina local para propósitos de **desarrollo**._

###  Pre-requisitos 

```

	· React 16 o superior.
	· ReactDOM 16 o superior.
	· Node v14 o superior.

```

###  Instalación 

```

	npm install @akelab/wisengine-framework --save-dev
	o
	yarn add --dev @akelab/wisengine-framework

```

_El framework utiliza un componente `provider`, con el fin de propagar los datos en el árbol de elementos de la aplicación padre_

· Lo primero será importar el componente `WisengineProvider` y envolver nuestra aplicación

```

	import  {  WisengineProvider  }  from  "@akelab/wisengine-framework";

	<WisengineProvider>

		<Routes>
			...rutas
		</Routes>
	
	</WisengineProvider>

```
 
 _Una vez que `WisengineProvider` esté conectado, puede comenzar a utilizar cada uno de los componentes._

· El framework nos provee de el hook `WisengineContent`, desde el cual podremos llamar distintas funciones, entre ellas `getAllContent`, que para este ejemplo utilizaremos para llamar un array con los contenidos creados dentro de la plataforma.

```

	import  {  ContentPortal,  WisengineContent  }  from  "@akelab/wisengine-framework";

	const Example = () => {
		const { getAllContent } = WisengineContent();
		const { data } = getAllContent();

		return <ContentPortal content={data} />;
	};

	export  default  Example;

```
