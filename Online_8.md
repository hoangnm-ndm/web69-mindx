# Bước 1: Tạo model cho Category.
# Bước 2: Tạo CRUD cho category
# Bước 3: Customize lại model của product và category
Thay đổi model của products để thêm categoryId vào model product,
Trong model của category, thay đổi để có thể lấy được productId theo category.
Khi thay đổi model, cũng cần thay đổi lại validator
# Bước 4: Trong controller của products:
- Update Category khi có 1 sản phẩm được thêm, sửa, xoá tương ứng
- populate("categoryId"): Gọi ra category tương ứng với product All và product Detail 

# Bước 5: Xử lý trường hợp 1 category bị xoá (null), các product của category đó sẽ trở về category mặc định.