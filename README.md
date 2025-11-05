# CRUDius CLI

<p align="center">
  <img src="./assets/crudius1.png" alt="Crudius Logo" width="140"/>
</p>

**CRUDius** is a **tool** built with **Node.js** and **TypeScript** that helps you automatically generate CRUD boilerplate code based on interactive prompts or a JSON configuration.

Currently in **under development**, CRUDius aims to accelerate backend development by providing a fast way to scaffold standard CRUD code with minimal setup.

---

## Features

* Interactive setup wizard (`crudius init`)
* JSON-based configuration generation (`crudius init-json`)
* Configuration validation (`crudius validate`)
* Clean command for removing temporary files (`crudius clean`)
* Generates a ready-to-use `.zip` with all source code
* Written entirely in TypeScript for flexibility and future extensibility

> Support for languages (python, php) and databases (e.g. Knex, Prisma, MongoDB) is **planned**, but not yet included in this version.

---

## Installation

Since this project is not yet published to npm, you can install it locally for development and testing.

```bash
git clone https://github.com/pedrovjesus/CRUDius.git
cd CRUDius
npm install
npm run build
npm link
```

This will make the `crudius` command available globally on your system.

---

## Usage

### Initialize a new project interactively

```bash
crudius init
```

This command walks you through an interactive setup process to define your entities and their fields.

Example session:

```
Entity name: Product
Field name: name
Field type: string
Add another field? Yes
Field name: price
Field type: number
Add another field? No
```

At the end, a configuration file named `crudius.config.json` is generated, and you can optionally generate the project code immediately.

---

### Generate from an existing configuration

```bash
crudius init-json
```

This uses an existing configuration file to generate code directly.

**Example:**

```json
{
  "generationConfigs": [
    {
      "entityName": "User",
      "properties": [
        { "field": "id", "type": "number", "primary": true },
        { "field": "name", "type": "string" },
        { "field": "email", "type": "string" }
      ]
    }
  ]
}
```

---

### Validate a configuration file

```bash
crudius validate
```

Validates your `crudius.config.json` structure using the built-in validator before attempting code generation.

---

### Clean generated files

```bash
crudius clean
```

Removes generated files (e.g. `crudius.config.json` and `crudius-output.zip`).

---

## Command Reference

| Command             | Description                              |
| ------------------- | ---------------------------------------- |
| `crudius init`      | Start interactive CRUD setup             |
| `crudius init-json` | Generate CRUD structure from JSON config |
| `crudius validate`  | Validate existing configuration          |
| `crudius clean`     | Remove generated and temporary files     |

---

## Output Structure

When generation is complete, a file named `crudius-output.zip` will be created with the following structure:

```
/src
  ├── controllers/
  ├── routes/
  ├── entities/
  └── index.ts
README.md
```

The generated files currently follow a **generic boilerplate** structure in TypeScript.
Database and framework integration (e.g. Express + Knex) will be introduced in future versions.

---

## Roadmap

**Upcoming Features**

* Add support for Express + Knex integration
* Add relation handling (foreign keys)
* Expand language support (PHP, Python)
* Optional Swagger/OpenAPI documentation

---

## Why CRUDius?

* Rapid backend prototyping
* Consistent project structure
* Fully local, no server or internet required
* Ideal for generating early MVP backends

---

## License

[MIT](./LICENSE.md) © [Pedro Jesus](https://github.com/pedrovjesus)