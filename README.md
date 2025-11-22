# CRUDius CLI

<p align="center">
  <img src="./assets/crudius1.png" alt="Crudius Logo" width="140"/>
</p>

<p align="center">
  <a href="https://github.com/pedrovjesus/CRUDius/blob/main/LICENSE.md">
    <img src="https://img.shields.io/github/license/pedrovjesus/CRUDius" alt="License">
  </a>
  <a href="https://www.npmjs.com/package/crudius">
    <img src="https://img.shields.io/npm/v/crudius" alt="NPM Version">
  </a>
</p>

**CRUDius** is a **Node.js + TypeScript CLI tool** that automatically generates CRUD boilerplate code based on interactive prompts or a JSON configuration.

> ⚠️ Currently under development. Features are evolving and more integrations are planned.

---

## Features

- Interactive setup wizard (`crudius init`)  
- JSON-based configuration generation (`crudius init-json`)  
- Configuration validation (`crudius validate`)  
- Clean command to remove temporary files (`crudius clean`)  
- Generates a ready-to-use `.zip` with full source code
- Supports Express.js with Knex.js
- Modular project structure (controllers, routes, services, entities)
- Documented code generation for easy understanding
- Written entirely in TypeScript for flexibility and extensibility  

> Planned: Support for other languages (Python, PHP) and databases (Knex, Prisma, MongoDB).

---

## Installation

You can install CRUDius **globally** to use it anywhere:

```bash
npm install -g crudius
````
---

## Quick Start

After cloning the repository:

```bash
# 1. Install dependencies
npm install

# 2. Build the project
npm run build

# 3. (Optional) Link globally to test locally
npm link
```

> Now you can run `crudius` from anywhere.

---

## Usage

### 1. Initialize a new project interactively

```bash
crudius init
```

* Walks you through prompts for entities and fields.
* Generates a `crudius.config.json` file.

**Example session:**

```
Entity name: Product
Field name: name
Field type: string
Is this field optional? No
Is this field searchable? Yes
Add another field? Yes
Field name: price
Field type: number
Add another field? No
```

---

### 2. Generate from an existing JSON config

```bash
crudius init-json
```

* Uses a JSON configuration file to generate the project automatically.

**Example `crudius.config.json`:**

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

### 3. Validate configuration

```bash
crudius validate
```

* Checks if your `crudius.config.json` follows the correct structure before generating code.

---

### 4. Clean generated files

```bash
crudius clean
```

* Removes generated files (`crudius.config.json`, `crudius-output.zip`, etc.)

---

## Generated Project Structure

When generation completes, the `.zip` file contains:

```
/src
  ├── controllers/
  ├── routes/
  ├── entities/
  ├── services/
  ├── database/
  ├── server.ts
  └── app.ts

README.md
```

---

## After Unzipping the Generated Project

1. Install dependencies:

```bash
npm install
```

2. Run migrations using Knex:

```bash
npm run knex:migrate
```

3. Start the server:

```bash
npm run dev
```

> Your backend is now ready to test with CRUD endpoints.

---

## Command Reference

| Command             | Description                              |
| ------------------- | ---------------------------------------- |
| `crudius init`      | Start interactive CRUD setup             |
| `crudius init-json` | Generate CRUD structure from JSON config |
| `crudius validate`  | Validate existing configuration          |
| `crudius clean`     | Remove generated and temporary files     |
| `crudius generate`  | Generate CRUD from JSON config           |

---

## Roadmap

* Foreign key / relations support
* Additional languages (PHP, Python)
* More database integrations (Prisma, MongoDB)

---

## Why CRUDius?

* Rapid backend prototyping
* Consistent project structure
* Fully local, no server or internet required
* Perfect for MVP development

---

## License

[MIT](./LICENSE.md) © [Pedro Jesus](https://github.com/pedrovjesus)

