# Bước 1: Tạo model cho Category.
# Bước 2: Tạo CRUD cho category
# Bước 3: Thay đổi model của products để thêm categoryId vào model product.
# Bước 4: Trong controller của products: populate products khi thêm, sửa product.
# Bước 5: Trong model của category, thay đổi để có thể lấy được productId theo category.
# Bước 6: Trong controller của category, get, getAll sao cho lấy được danh sách sản phẩm theo danh mục.
# Bước 7: Xử lý trường hợp 1 category bị xoá, các product của category đó sẽ trở về category mặc định.