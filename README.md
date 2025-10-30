# 🔧 CRUDius (Alpha)

<p align="center">
  <img src="./assets/crudius1.png" alt="Logo do Projeto" width="180"/>
</p>


Crudius is a Node.js-based API designed to **automatically generate CRUD boilerplate code**. It's aimed at accelerating the development of RESTful APIs by generating code from a JSON schema.

> ⚠️ This project is in **Alpha stage** and under active development.

With CRUDius, you can build a full backend MVP in seconds, giving you freedom to focus on the frontend or other parts of your project.
---

## 📦 Features

- Input your entity schema via JSON
- Generate RESTful CRUD endpoints (Create, Read, Update, Delete)
- Output includes:
  - `index.ts`
  - `routes.ts`
  - `controllers.ts`
  - `database.ts`
  - `README.md`
- Zips the output for easy download

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/pedrovjesus/CRUDius.git
cd CRUDius
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Server

```bash
npm run start
```

By default, the server runs at:
`http://localhost:3000`

---

## 📤 Sending a Request

You can generate code by sending a `POST` request to `/generate` with a JSON schema.

### Example Payload

Create a file named `payload.json`:

```json
{
  "entity": "Product",
  "fields": [
    { "name": "id", "type": "number", "primary": true },
    { "name": "name", "type": "string" },
    { "name": "price", "type": "number" },
    { "name": "description", "type": "string", "optional": true }
  ]
}
```

### Send the Request (PowerShell)

```powershell
Invoke-WebRequest `
  -Uri http://localhost:3000/generate `
  -Method POST `
  -ContentType "application/json" `
  -InFile .\payload.json `
  -OutFile .\generated.zip
```

This will download a `generated.zip` file containing your full CRUD boilerplate code.

---

## 🛠 Output Structure

The ZIP includes:

```
/src
  ├── controllers/
  ├── routes/
  ├── entites/
  └── index.ts
README.md
```

You can extract the zip, install dependencies, and immediately run the project or plug it into your larger system.

---

## Future Improvements
- Option to choose between Typescript (Express), Php, Java, Python
- Optional Swagger documentation generation
- Integration with database migration tools

## Next steps
- Build CLI tool for local code generation
- Support for relational fields (foreign keys)

---
## Why CRUDius?
- Rapid MVP development for clients
- Focus on frontend or business logic instead of boilerplate
- Consistent project structure ready to run immediately

## 📄 License

[MIT](./LICENSE.md) © [Pedro Jesus](https://github.com/pedrovjesus)


