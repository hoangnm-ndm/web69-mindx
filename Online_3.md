# Bước 1: Cài đặt axios, concurrently, json-server, dotenv

- Tạo file db.json và thêm data fake.
- Tạo file ".env" và khai báo biến môi trường

# Bước 2: Sửa package.json

```json
"dev": "concurrently \"json-server -w db.json --port 3000\" \"nodemon app.js\""
```

# Bước 3: Code
