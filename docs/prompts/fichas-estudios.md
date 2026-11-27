# Fichas de estudio para la enciclopedia de `pfd1795`

> **Herramienta de desarrollo.** Fichas de trabajo para el prompt
> [`crear-estudios.md`](./crear-estudios.md). Cada ficha se pega, tal cual, después del prompt en
> la conversación con el agente de IA: el agente devuelve el artículo completo y el bloque de
> integración.
>
> El agente no necesita saber nada más: toda la información del proyecto está en el prompt.

## Cómo usar

1. Abre el prompt [`crear-estudios.md`](./crear-estudios.md) y carga el archivo completo.
2. Copia **una** ficha de este documento y pégala en el chat.
3. El agente responde con el bloque `ARCHIVO:` / `CATEGORÍA:`, el HTML completo, el bloque de
   integración y las notas.
4. Repite con la siguiente ficha. No hace falta cerrar la conversación.

Las fichas cubren quince temas de la enciclopedia. Los temas pendientes se gestionan en
[`docs/informes/trabajo-pendiente.md`](../informes/trabajo-pendiente.md).

> Las fichas solo enlazan a artículos **ya publicados** (los que figuran en el roster del
> prompt). Cuando termines la tanda, puedes añadir enlaces entre los artículos nuevos desde el
> propio HTML.

---

## 1. Lógica digital y álgebra de Boole

```text
TEMA: Lógica digital y álgebra de Boole
SLUG: logica-booleana
CATEGORÍA: Fundamentos de computación
OBJETIVO: Que el lector pueda construir y simplificar expresiones lógicas, leer una tabla de
           verdad y entender cómo los operadores booleanos (AND, OR, NOT) se traducen a las
           puertas lógicas que usa el hardware.
NIVEL: básico
SECCIONES: qué es, proposiciones y conectores, tablas de verdad, simplificación de expresiones,
           De Morgan y leyes básicas, puertas lógicas, errores comunes
CÓDIGO: pseudocódigo de tablas de verdad y JavaScript con operadores &&, || y !
TABLAS / DIAGRAMAS: tabla de verdad de AND, OR, NOT y XOR; tabla de las puertas lógicas con su
           símbolo y equivalente booleano; diagrama de un circuito con tres puertas
VER TAMBIÉN: Sistemas numéricos y representación de datos, Sistemas operativos
```

## 2. C y gestión de memoria

```text
TEMA: C y gestión de memoria
SLUG: c-memoria
CATEGORÍA: Lenguajes de programación
OBJETIVO: Que el lector entienda cómo C reserva y libera memoria (pila y montón), qué son los
           punteros, por qué existen los desbordamientos de búfer y cómo se evita la fuga de
           memoria.
NIVEL: intermedio
SECCIONES: qué es, compilación y estructura de un programa, tipos y declaración de variables,
           punteros y direcciones de memoria, pila frente a montón, memoria dinámica con malloc
           y free, cadenas de caracteres, errores comunes
CÓDIGO: C (programa completo con malloc/free, arrays y punteros)
TABLAS / DIAGRAMAS: tabla de comparación entre pila y montón; diagrama de la memoria de un
           programa en ejecución
VER TAMBIÉN: Paradigmas de programación, Sistemas operativos
```

## 3. Frameworks de front-end

```text
TEMA: Frameworks de front-end
SLUG: frameworks-frontend
CATEGORÍA: Frameworks
OBJETIVO: Que el lector entienda qué es un framework de front-end, cuándo conviene usar uno y
           cómo se comparan React, Vue y Svelte en cuanto a estado, componentes y rendimiento.
NIVEL: intermedio
SECCIONES: qué es, por qué usar un framework, el concepto de componente, el estado y el flujo de
           datos unidireccional, comparativa de React, Vue y Svelte, virtual DOM y renderizado,
           cuándo NO usar un framework, errores comunes
CÓDIGO: un ejemplo equivalente de un contador en React, en Vue y en Svelte
TABLAS / DIAGRAMAS: tabla comparativa de React, Vue y Svelte; diagrama del flujo de datos de un
           componente
VER TAMBIÉN: JavaScript, HTML, CSS
```

## 4. Frameworks de back-end

```text
TEMA: Frameworks de back-end
SLUG: frameworks-backend
CATEGORÍA: Frameworks
OBJETIVO: Que el lector entienda el papel de un framework de servidor, cómo se organiza una
           aplicación por capas (routing, controladores, servicios, acceso a datos) y qué
           diferencia hay entre renderizado en servidor, API REST y tiempo real.
NIVEL: intermedio
SECCIONES: qué es, el ciclo petición-respuesta, enrutado, controladores y middlewares,
           capas de una aplicación, ORM y acceso a datos, renderizado en servidor frente a API,
           GraphQL y WebSockets, autenticación y middleware, errores comunes
CÓDIGO: un servidor HTTP mínimo en Node.js con Express y un endpoint REST completo
TABLAS / DIAGRAMAS: tabla de comparación entre REST, GraphQL y WebSockets; diagrama de las
           capas de una aplicación de back-end
VER TAMBIÉN: Cliente-servidor y APIs, HTTP y navegador web, JavaScript
```

## 5. Principios de diseño y SOLID

```text
TEMA: Principios de diseño y SOLID
SLUG: solid
CATEGORÍA: Arquitectura y diseño de software
OBJETIVO: Que el lector pueda aplicar los cinco principios SOLID, medir el acoplamiento y la
           cohesión de sus clases y refactorizar código que los incumple.
NIVEL: intermedio
SECCIONES: qué es, acoplamiento y cohesión, responsabilidad única, abierto-cerrado,
           substitución de Liskov, segregación de interfaces, inversión de dependencias,
           aplicando SOLID a un ejemplo, errores comunes
CÓDIGO: JavaScript con un ejemplo de código que viola cada principio y su refactorización
TABLAS / DIAGRAMAS: tabla resumen de los cinco principios con su firma y su pregunta guía;
           diagrama de dependencias antes y después de aplicar inversión de dependencias
VER TAMBIÉN: Patrones de diseño, Paradigmas de programación
```

## 6. Editores, IDEs y depuración

```text
TEMA: Editores, IDEs y depuración
SLUG: editores-ides-depuracion
CATEGORÍA: Herramientas
OBJETIVO: Que el lector pueda elegir entre editor e IDE, trabajar con control de versiones desde
           el editor y depurar su código con puntos de ruptura, pila de llamadas y expresiones
           de watching.
NIVEL: básico
SECCIONES: qué es, editor frente a IDE, configuración y extensiones, control de versiones
           integrado, la depuración y sus herramientas, puntos de ruptura y pila de llamadas,
           depuración en el navegador y en el terminal, perfilado y búsqueda de rendimiento,
           errores comunes
CÓDIGO: JavaScript con un ejemplo de error acotado y su traza; comandos de terminal para
           inspeccionar un proceso
TABLAS / DIAGRAMAS: tabla de atajos y acciones esenciales por IDE; diagrama de la pila de
           llamadas durante una excepción
VER TAMBIÉN: Terminal y línea de comandos, Git, JavaScript
```

## 7. Empaquetado y despliegue

```text
TEMA: Empaquetado y despliegue
SLUG: empaquetado-despliegue
CATEGORÍA: Herramientas
OBJETIVO: Que el lector entienda qué es un build, cómo se empaqueta una aplicación web, qué son
           las variables de entorno y cómo se despliega y se mantiene en producción.
NIVEL: intermedio
SECCIONES: qué es, el ciclo build-deploy, empaquetado de estáticos, variables de entorno y
           configuración, procesos de construcción, integración y despliegue continuos,
           publicación en un servidor estático, CDN y caché, dominios y HTTPS, despliegues
           atómicos y reversión, errores comunes
CÓDIGO: un script de build con npm, un archivo .env de ejemplo y un flujo de GitHub Actions
TABLAS / DIAGRAMAS: tabla de entornos (local, prueba, producción) con su configuración;
           diagrama del flujo de un despliegue continuo
VER TAMBIÉN: Git, HTTP y navegador web, Terminal y línea de comandos
```

## 8. TypeScript

```text
TEMA: TypeScript
SLUG: typescript
CATEGORÍA: Lenguajes de programación
OBJETIVO: Que el lector entienda el sistema de tipos de TypeScript (anotaciones, inferencia,
           interfaces, genéricos y uniones) y sepa por qué el compilador detecta errores que
           en JavaScript solo aparecen en producción.
NIVEL: intermedio
SECCIONES: qué es, tipos primitivos e inferencia, anotaciones y variables, interfaces y tipos,
           uniones e intersección, funciones, genéricos, narrowing y control de flujo, módulos
           y configuración del compilador, migración desde JavaScript, errores comunes
CÓDIGO: TypeScript con ejemplos equivalentes al JavaScript, genéricos y un caso de narrowing
TABLAS / DIAGRAMAS: tabla de tipos de JavaScript frente a su equivalente en TypeScript
VER TAMBIÉN: JavaScript, Paradigmas de programación, HTML
```

## 9. Accesibilidad web

```text
TEMA: Accesibilidad web
SLUG: accesibilidad
CATEGORÍA: Web (HTML, CSS y JavaScript)
OBJETIVO: Que el lector pueda aplicar los principios de accesibilidad (perceptible, operable,
           comprensible y robusto) y corregir los fallos más habituales en HTML, CSS y
           JavaScript.
NIVEL: intermedio
SECCIONES: qué es y para quién, el modelo de accesibilidad del navegador, semántica y HTML,
           foco y orden de tabulación, navegación por teclado, contraste y color, textos
           alternativos, roles y atributos ARIA, formularios accesibles,
           reducir movimiento y animación, pruebas con lector de pantalla y auditoría
           automática, errores comunes
CÓDIGO: HTML con dos versiones de un mismo componente (accesible e inaccesible) y JavaScript
           para gestionar el foco de un menú
TABLAS / DIAGRAMAS: tabla de la jerarquía de encabezados; tabla de atajos de teclado más
           usados; diagrama del orden de foco
VER TAMBIÉN: HTML, CSS, JavaScript
```

## 10. Bases de datos NoSQL

```text
TEMA: Bases de datos NoSQL
SLUG: nosql
CATEGORÍA: Bases de datos
OBJETIVO: Que el lector pueda distinguir los modelos NoSQL (documentales, clave-valor, columnas y
           grafos), sepa cuándo encajan frente a un modelo relacional y evite los errores
           típicos de modelar y consultar mal.
NIVEL: intermedio
SECCIONES: qué es, por qué aparecieron, clave-valor, documentos, columnas y grafos, consistencia
           y CAP, modelado de documentos y desnormalización, consultas e índices, cuándo usar
           NoSQL y cuándo SQL, migraciones y evolución del esquema, errores comunes
CÓDIGO: MongoDB con consultas y agregaciones, y un ejemplo en Redis y en Neo4j
TABLAS / DIAGRAMAS: tabla comparativa de los cuatro modelos NoSQL; diagrama de un documento
           anidado y de su equivalente relacional
VER TAMBIÉN: SQL y bases de datos relacionales, Modelado de datos y normalización
```

## 11. Testing automatizado

```text
TEMA: Testing automatizado
SLUG: testing
CATEGORÍA: Herramientas
OBJETIVO: Que el lector distinga los niveles de prueba (unitarias, de integración y de extremo a
           extremo), aplique el patrón Arrange-Act-Assert y sepa medir la cobertura sin
           confundirla con calidad.
NIVEL: intermedio
SECCIONES: qué es y por qué, niveles de prueba, pruebas unitarias, el patron Arrange-Act-Assert,
           dobles de prueba y cuándo usarlos, pruebas de integración, extremo a extremo y su
           coste, cobertura de código y sus límites, pruebas en la práctica local y en
           integración continua, antipatrones, errores comunes
CÓDIGO: JavaScript con un runner de pruebas y ejemplos de prueba unitaria, de integración y
           de extremo a extremo
TABLAS / DIAGRAMAS: tabla de niveles de prueba con velocidad, alcance y coste; diagrama de la
           pirámide de pruebas
VER TAMBIÉN: JavaScript, Patrones de diseño, Git
```

## 12. GitHub Actions y CI/CD

```text
TEMA: GitHub Actions y CI/CD
SLUG: ci-cd
CATEGORÍA: Control de versiones
OBJETIVO: Que el lector entienda qué es la integración y entrega continua, cómo se declara un
           flujo de trabajo en GitHub Actions y cómo designing un pipeline con etapas de
           comprobación, pruebas y publicación.
NIVEL: intermedio
SECCIONES: qué es, qué es CI y qué es CD, anatomía de un workflow de GitHub Actions,
           eventos y disparadores, jobs, pasos y runners, variables y secretos, matrices y
           estrategias de ejecución, caché y artefactos, del commit al despliegue, ramas y
           entornos de protección, errores comunes
CÓDIGO: un archivo .github/workflows/yml completo y comentado
TABLAS / DIAGRAMAS: tabla de eventos y su uso típico; diagrama del pipeline con sus etapas
VER TAMBIÉN: Git, Terminal y línea de comandos, HTTP y navegador web
```

## 13. Docker y contenedores

```text
TEMA: Docker y contenedores
SLUG: docker
CATEGORÍA: Herramientas
OBJETIVO: Que el lector entienda qué es una imagen y un contenedor, cómo se construyen con un
           Dockerfile y cómo se publican y consumen en un registro.
NIVEL: intermedio
SECCIONES: qué es, imágenes y contenedores, el Dockerfile y sus instrucciones, construcción y
           capas, volumes y datos persistentes, redes y puertos, variables de entorno y
           configuración, registries y publicación, compose para servicios múltiples,
           cuando usar contenedores y cuando no, errores comunes
CÓDIGO: un Dockerfile con varias capas y un docker-compose.yml con dos servicios
TABLAS / DIAGRAMAS: tabla de los comandos más usados con su efecto; diagrama de las capas de
           una imagen
VER TAMBIÉN: Terminal y línea de comandos, Sistemas operativos
```

## 14. Linux y servidores

```text
TEMA: Linux y servidores
SLUG: linux-servidores
CATEGORÍA: Comandos y terminal
OBJETIVO: Que el lector sepa administrar un servidor Linux: estructura del sistema de archivos,
           usuarios y permisos, procesos y servicios, red y cortafuegos, y el despliegue de una
           aplicación.
NIVEL: intermedio
SECCIONES: qué es, estructura del sistema de archivos, usuarios, grupos y permisos, procesos y
           señales, servicios con systemd, red, DNS y cortafuegos, SSH y acceso remoto,
           despliegue de una aplicación y reverse proxy, registros y rotación, actualizaciones y
           parches de seguridad, errores comunes
CÓDIGO: comandos de terminal comentados por sección (ls, chmod, systemctl, journalctl, ss, ufw)
TABLAS / DIAGRAMAS: tabla de permisos y su valor octal; diagrama de la pila de un proceso
VER TAMBIÉN: Terminal y línea de comandos, Sistemas operativos, Redes: fundamentos
```

## 15. Expresiones regulares

```text
TEMA: Expresiones regulares
SLUG: regex
CATEGORÍA: Lenguajes de programación
OBJETIVO: Que el lector pueda leer una expresión regular, construir una para un caso real
           (validar un correo o extraer datos de un texto) y aplicarla en JavaScript sin
           copiarla a ciegas.
NIVEL: intermedio
SECCIONES: qué es, sintaxis básica y metacaracteres, cuantificadores y carácter ávido,
           grupos y capturas, alternancia y agrupamiento, classes de caracteres y límites,
           uso en JavaScript con RegExp, match, replace y.test, greedy frente a lazy,
           errores comunes y rendimiento
CÓDIGO: JavaScript con RegExp, extract, replace y test, más ejemplos en Python y en grep
TABLAS / DIAGRAMAS: tabla de metacaracteres con su significado; diagrama del flujo de una
           coincidencia
VER TAMBIÉN: JavaScript, Terminal y línea de comandos
```

---

## Integración al terminar la tanda

Cuando hayas publicado los artículos, el proyecto necesita estos tres ajustes:

1. **Manifiesto** (`pages/my-studies/data/articulos.json`): añadir la entrada de cada artículo al
   array `items` (el bloque que entrega el agente: `slug`, `title {es}`, `description {es}`,
   `keywords`, `category`, `status: "published"`). La grilla del índice se genera sola desde el
   manifiesto: no editar tarjetas estáticas en `pages/my-studies/index.html`.
2. **Service Worker** (`service-worker.js`): añadir cada artículo nuevo
   (`./my-studies<slug>/index.html`) a `PRECACHE_URLS` y subir `CACHE_NAME`
   un nivel respecto al valor actual de `service-worker.js` (`pwa-cache-vN`) para
   forzar el refresco del precache.
3. **Documentación**: actualizar el número de artículos publicados en `README.md` y
   `docs/LIMITACIONES.md`, y el listado de temas en `pages/my-studies/AGENTS.md`.
