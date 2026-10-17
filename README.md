# ⚡ HỌCLAPTRINH.EXE

Web học **Python & C++** bằng tiếng Việt — giao diện cyberpunk neon, không cần cài đặt gì để dùng.

## 🌆 Tính năng

- **2 lộ trình**: Python (22 bài / 5 chương) và C++ (20 bài / 6 chương) — đã phát hành đầy đủ **42/42 bài**.
- **Giải phẫu cú pháp**: từng thành phần của câu lệnh được bẻ nhỏ và chú thích màu (🔬).
- **Tự viết code + chấm điểm**: gõ code vào ô luyện tập, hệ thống chấm theo từng tiêu chí, có gợi ý và đáp án (✍️).
- **Quiz random**: thử thách sau mỗi cú pháp + kiểm tra cuối bài, đề trộn mới mỗi lần làm (🧪).
- **Tiến độ học**: đánh dấu hoàn thành, lưu bằng `localStorage` ngay trên máy bạn.
- **Dark / Light mode**: mặc định cyberpunk tối; nút ☀/☾ trên góc phải.
- **Copy code 1 chạm** + tô màu cú pháp (Prism.js qua CDN).

## 📁 Cấu trúc

```
hoc-lap-trinh/
├── index.html                  # Trang chủ
├── assets/
│   ├── css/style.css           # Toàn bộ giao diện cyberpunk
│   └── js/
│       ├── lessons-data.js     # Danh sách 42 bài của 2 lộ trình
│       ├── practice-data.js    # Ngân hàng quiz + bài tập tự viết code
│       └── main.js             # Engine: sidebar, tiến độ, chấm code, quiz
├── python/
│   ├── index.html              # Trang lộ trình Python
│   └── bai-01..bai-03...html   # Các bài học
└── cpp/
    ├── index.html              # Trang lộ trình C++
    └── bai-01..bai-03...html
```

## 🚀 Chạy thử trên máy

Mở trực tiếp `index.html` bằng trình duyệt là chạy ngay. Nếu muốn dùng đúng như server thật:

```bash
cd hoc-lap-trinh
python3 -m http.server 8000
# rồi mở http://localhost:8000
```

## 📚 Thêm một bài học mới (3 bước)

1. **Khai báo bài** trong `assets/js/lessons-data.js`: điền `file: "bai-04-ten-bai.html"` vào bài tương ứng (bài nào còn `file: null` sẽ hiện "SẮP RA MẮT").
2. **Tạo file bài học**: sao chép `python/bai-02-chuong-trinh-dau-tien.html` làm mẫu, đổi `data-lesson`, tiêu đề, nội dung. Các khối đặc biệt (JS tự điền nội dung):
   - Bài tập tự viết: `<div class="exercise-box" data-ex="MÃ-BÀI-TẬP"></div>`
   - Quiz theo chủ đề: `<div class="quiz-console" data-lesson="py-XX" data-topic="TÊN CHỦ ĐỀ" data-count="2">...</div>`
   - Quiz cuối bài: `<div class="quiz-console quiz-final" data-lesson="py-XX" data-final="true" data-count="5">...</div>`
3. **Thêm dữ liệu luyện tập** — chọn 1 trong 2 cách:
   - **Cách A (khuyên dùng cho bài mới)**: viết ngay trong file bài học, thêm một `<script>` inline ngay sau dòng nạp `practice-data.js`:
     ```html
     <script>
       QUIZZES["py-XX"] = [ /* câu hỏi choice / fill */ ];
       EXERCISES["py-XX-ex1"] = { topic, prompt, checks: [...], sample: "..." };
     </script>
     ```
     Kiểu này giúp mỗi bài "tự chứa" dữ liệu của nó, không sợ nhiều người sửa chung 1 file.
   - **Cách B**: thêm vào `assets/js/practice-data.js` như cũ — `QUIZZES["py-XX"]` và `EXERCISES["MÃ-BÀI-TẬP"]`.
   - Quy tắc chung: mỗi topic ≥ 4 câu (quiz theo topic lấy 2 câu random), tổng ngân hàng bài ≥ 10 câu (quiz cuối lấy 5), mép chấm dùng `regex` chạy với cờ `"gs"`, `answer` của câu `choice` phải nằm trong `options`, `answer` của `fill` là **mảng** biến thể.

> 💡 `data-topic` trong bài học phải khớp **chính xác** với trường `topic` của câu hỏi. Kiểm tra nhanh: `node /tmp/opencode/check-lesson.js <file.html>` (nếu có sẵn script kiểm tra), hoặc mở bài học trên trình duyệt — quiz và ô luyện tập sẽ tự hiện.

## 🌐 Deploy lên GitHub Pages (miễn phí)

### Lần đầu

1. Tạo tài khoản tại [github.com](https://github.com) (nếu chưa có) và bấm **New repository**.
2. Đặt tên repo, ví dụ `hoc-lap-trinh`, chọn **Public**, bấm **Create repository**.
3. Trên máy, mở terminal trong thư mục `hoc-lap-trinh` và chạy:

```bash
git init
git add .
git commit -m "Ra mat HOCLAPTRINH.EXE"
git branch -M main
git remote add origin https://github.com/TEN-BAN/hoc-lap-trinh.git
git push -u origin main
```

> Thay `TEN-BAN` bằng tên tài khoản GitHub của bạn.

4. Vào repo trên GitHub → **Settings** → **Pages**.
5. Mục **Build and deployment** → Source chọn **Deploy from a branch** → Branch chọn **main**, thư mục **/ (root)** → bấm **Save**.
6. Đợi 1–2 phút, web sẽ chạy tại địa chỉ:

```
https://TEN-BAN.github.io/hoc-lap-trinh/
```

### Cập nhật nội dung về sau

Mỗi khi thêm bài mới, chỉ cần:

```bash
git add .
git commit -m "Them bai hoc moi"
git push
```

GitHub Pages sẽ tự cập nhật sau khoảng 1 phút.

## 🛠 Ghi chú kỹ thuật

- **Không cần build tool** — HTML/CSS/JS thuần, sửa file nào reload thấy ngay.
- **Phụ thuộc CDN** (cần internet): Google Fonts (Orbitron, JetBrains Mono) và Prism.js. Nếu offline, web vẫn chạy, chỉ mất font đẹp và màu cú pháp.
- **localStorage keys**: `hlp-theme` (giao diện), `hlp-progress` (bài đã học), `hlp-scores` (kỷ lục quiz).
- **Chấm code là phân tích tĩnh**: bài tập được chấm bằng mẫu regex trên code bạn gõ — không chạy code thật. Đủ tốt để luyện cú pháp; muốn chạy thật thì có thể nâng cấp sau (ví dụ gắn Pyodide cho Python).

## 🗺 Lộ trình sắp tới

- [x] Viết đủ nội dung: Python 22 bài, C++ 20 bài — cả 42 bài đã lên web
- [ ] Trang tìm kiếm bài học
- [ ] Nâng cấp: chạy code Python thật bằng Pyodide
- [ ] Chế độ luyện tập tổng hợp (đề random nhiều bài)

---

Made with 💜 và JavaScript thuần.
