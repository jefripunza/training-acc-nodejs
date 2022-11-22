# training-acc-nodejs

## Perkenalan Teknologi

dikarenakan saya menggunakan **NodeJS**, maka yang harus dipersiapkan terlebih dahulu adalah :
| Aplikasi  | Kegunaan                                                                                   | Link                                                                     |
|-----------|--------------------------------------------------------------------------------------------|--------------------------------------------------------------------------|
| NodeJS    | lingkungan javascript untuk running JS diluar browser                                      | [download & install](https://nodejs.org/en/)                             |
| Yarn      | package manager yang lebih mudah digunakan daripada **NPM**                                | [doc](https://yarnpkg.com/getting-started/usage)                         |
| Nodemon   | auto reload service jika project di save (for development only)                            | [doc](https://www.npmjs.com/package/nodemon)                             |
| ExpressJS | framework web app untuk **NodeJS** yang ditulis dengan bahasa pemrograman JavaScript       | [doc](https://expressjs.com/en/starter/basic-routing.html)               |
| TypeORM   | sebagai penghubung dan mempermudah membuat aplikasi menggunakan database berbasis rasional | [doc](https://typeorm.io/#/connection-options/common-connection-options) |

---

<br/>

### Install Global Dependencies (if not installed) (first user? WAJIB...)

```bash
npm i -g nodemon yarn cross-env
```

<br/>

### Install Dependencies

```bash
npm install

// or

yarn install
```

<br/>

### All Script App

```bash
//-> start project (if you have finished build project)

npm run start

// or

yarn start


//-> start project (development)

npm run dev

// or

yarn dev

// or

nodemon


//-> clean all error file

yarn clean


//-> delete node_modules and install again

yarn reset


//-> build !!!

npm run build

// or

yarn build
```

<br/>

---

<!-- ## Publish -->


<!-- ## Log (NodeJS+WebSocket)
[url_log]:     https://acc.jefriherditriyanto.com/log     "log system"

> [https://acc.jefriherditriyanto.com/log][url_log]

---

## Documentation (Swagger)
[url_swagger]: https://acc.jefriherditriyanto.com/swagger "all endpoint documentation"

> [https://acc.jefriherditriyanto.com/swagger][url_swagger]

--- -->