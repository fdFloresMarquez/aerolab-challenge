![Aerolab](./src/assets/logo.svg "Aerolab")

# aerolab-challenge

Live Demo: https://aerolab-challenge-ff.vercel.app/

Se debe crear una tienda de productos basada en puntos.

## Decisiones tomadas: 

- Migrado a React 18
- Cambiado la referencia en alias a "@"
- Utilizar ChakraUI para el estilado
- Utilizar context para pasar información del usuario a todos los componentes
- Acceder a History del usuario con rutas utilizando React-Router
- Guardar token de api en una variable de entorno

## Definición funcional
El usuario tiene una cantidad definida de puntos y cada producto vale una cantidad de puntos especifica.

* Cada producto debe tener un precio en puntos de manera visible.
* El usuario debería poder filtrar los productos por precio, de mayor a menor y viceversa.
* El usuario debería poder ver cuantos puntos tienen en su cuenta.
* Debería haber una manera clara para el usuario de ver que productos puede comprar y cuales no.
* El botón de comprar debería estar disponible en los productos que el usuario tiene suficientes puntos para comprar.
* Un botón de "comprar ahora" debería mostrarse cuando el usuario interactúa con un producto que puede comprar.
* Cuando el usuario no puede comprar un producto, debería ver cuantos puntos le faltan para poder comprarlo.
* Un usuario no debería poder comprar un producto del cual no tiene suficientes puntos para comprar.
* Cuando el usuario compra, la cantidad de puntos debe ser deducida automaticamente de los puntos disponibles.
* Debe haber una pantalla donde ver el historial de productos canjeados
* No debo poder comprar un producto mientras cargo puntos o estoy comprando otro producto
* Debe haber un máximo de 16 productos en pantalla pero debo poder cambiar de página para ver el resto

## API
Podés encontrar la documentación [acá](https://aerolabchallenge.docs.apiary.io/) y podés obtener una API key [acá](https://aerolab.co/coding-challenge)

## Instrucciones: 
Si desean probarlo localmente, deben clonar el repositorio:
```
git clone https://github.com/fdFloresMarquez/aerolab-challenge
cd aerolab-challenge
```
Instalar dependencias:
```
npm install
```
Correr app (necesitan un token para conectar a la API):
```
npm run dev
```
