/* ============================================================
   HỌCLAPTRINH.EXE — Dữ liệu lộ trình
   Thêm bài học mới: điền "file" vào bài tương ứng (đường dẫn
   tương đối trong thư mục ngôn ngữ, ví dụ "bai-04-nhap-du-lieu.html")
   ============================================================ */

const SITE = {
  name: "HỌCLAPTRINH.EXE",
  tagline: "Học Python & C++ trong thế giới neon"
};

const COURSES = [
  {
    id: "python",
    name: "Python",
    icon: "🐍",
    accent: "cyan",
    desc: "Ngôn ngữ thân thiện nhất để bắt đầu. Cú pháp dễ đọc, gần tiếng Anh — ứng dụng từ web, tự động hóa đến AI.",
    chapters: [
      {
        title: "Chương 1 — Nhập môn",
        lessons: [
          { id: "py-01", title: "Giới thiệu Python & cài đặt", file: "bai-01-gioi-thieu.html" },
          { id: "py-02", title: "Chương trình đầu tiên: print() & comment", file: "bai-02-chuong-trinh-dau-tien.html" },
          { id: "py-03", title: "Biến & kiểu dữ liệu", file: "bai-03-bien-va-kieu-du-lieu.html" },
          { id: "py-04", title: "Nhập dữ liệu với input()", file: "bai-04-nhap-du-lieu-input.html" },
          { id: "py-05", title: "Toán tử & biểu thức", file: "bai-05-toan-tu.html" }
        ]
      },
      {
        title: "Chương 2 — Cấu trúc điều khiển",
        lessons: [
          { id: "py-06", title: "Rẽ nhánh if / elif / else", file: "bai-06-if-elif-else.html" },
          { id: "py-07", title: "Vòng lặp for", file: "bai-07-vong-lap-for.html" },
          { id: "py-08", title: "Vòng lặp while, break & continue", file: "bai-08-vong-lap-while.html" }
        ]
      },
      {
        title: "Chương 3 — Cấu trúc dữ liệu",
        lessons: [
          { id: "py-09", title: "List — danh sách", file: "bai-09-list.html" },
          { id: "py-10", title: "Tuple", file: "bai-10-tuple.html" },
          { id: "py-11", title: "Dictionary — từ điển", file: "bai-11-dictionary.html" },
          { id: "py-12", title: "Set — tập hợp", file: "bai-12-set.html" },
          { id: "py-13", title: "Xử lý chuỗi chuyên sâu", file: "bai-13-xu-ly-chuoi.html" }
        ]
      },
      {
        title: "Chương 4 — Hàm & module",
        lessons: [
          { id: "py-14", title: "Hàm (function)", file: "bai-14-ham.html" },
          { id: "py-15", title: "Lambda & phạm vi biến", file: "bai-15-lambda-scope.html" },
          { id: "py-16", title: "Module & thư viện chuẩn", file: "bai-16-module-thu-vien.html" },
          { id: "py-17", title: "Xử lý file", file: "bai-17-xu-ly-file.html" },
          { id: "py-18", title: "Xử lý lỗi với try/except", file: "bai-18-try-except.html" }
        ]
      },
      {
        title: "Chương 5 — Nâng cao",
        lessons: [
          { id: "py-19", title: "OOP: Class & Object", file: "bai-19-oop-class-object.html" },
          { id: "py-20", title: "OOP nâng cao: Kế thừa & đa hình", file: "bai-20-oop-ke-thua-da-hinh.html" },
          { id: "py-21", title: "Comprehension & generator", file: "bai-21-comprehension-generator.html" },
          { id: "py-22", title: "Dự án tổng hợp: Quản lý sinh viên", file: "bai-22-du-an-quan-ly-sinh-vien.html" }
        ]
      }
    ]
  },
  {
    id: "cpp",
    name: "C++",
    icon: "⚙️",
    accent: "magenta",
    desc: "Ngôn ngữ hiệu năng cao — nền tảng của game, hệ điều hành và các kỳ thi thuật toán. Học xong Python, C++ sẽ là bước tiến lớn.",
    chapters: [
      {
        title: "Chương 1 — Nhập môn",
        lessons: [
          { id: "cpp-01", title: "Giới thiệu C++ & cài đặt", file: "bai-01-gioi-thieu.html" },
          { id: "cpp-02", title: "Chương trình đầu tiên: cout", file: "bai-02-chuong-trinh-dau-tien.html" },
          { id: "cpp-03", title: "Biến & kiểu dữ liệu", file: "bai-03-bien-va-kieu-du-lieu.html" }
        ]
      },
      {
        title: "Chương 2 — Cấu trúc điều khiển",
        lessons: [
          { id: "cpp-04", title: "Rẽ nhánh if / else & switch", file: "bai-04-if-else-switch.html" },
          { id: "cpp-05", title: "Vòng lặp for, while, do-while", file: "bai-05-vong-lap.html" }
        ]
      },
      {
        title: "Chương 3 — Hàm & mảng",
        lessons: [
          { id: "cpp-06", title: "Hàm (function)", file: "bai-06-ham.html" },
          { id: "cpp-07", title: "Mảng một chiều", file: "bai-07-mang-mot-chieu.html" },
          { id: "cpp-08", title: "Mảng hai chiều", file: "bai-08-mang-hai-chieu.html" },
          { id: "cpp-09", title: "Chuỗi: string & char[]", file: "bai-09-chuoi-string.html" }
        ]
      },
      {
        title: "Chương 4 — Con trỏ & bộ nhớ",
        lessons: [
          { id: "cpp-10", title: "Con trỏ (pointer) cơ bản", file: "bai-10-con-tro.html" },
          { id: "cpp-11", title: "Cấp phát động: new & delete", file: "bai-11-cap-phat-dong.html" }
        ]
      },
      {
        title: "Chương 5 — Lập trình hướng đối tượng",
        lessons: [
          { id: "cpp-12", title: "Struct", file: "bai-12-struct.html" },
          { id: "cpp-13", title: "Class & Object", file: "bai-13-class-object.html" },
          { id: "cpp-14", title: "Constructor & Destructor", file: "bai-14-constructor-destructor.html" },
          { id: "cpp-15", title: "Kế thừa & đa hình", file: "bai-15-ke-thua-da-hinh.html" }
        ]
      },
      {
        title: "Chương 6 — STL & nâng cao",
        lessons: [
          { id: "cpp-16", title: "Vector", file: "bai-16-vector.html" },
          { id: "cpp-17", title: "String trong STL", file: "bai-17-string-stl.html" },
          { id: "cpp-18", title: "Map, Set & Pair", file: "bai-18-map-set-pair.html" },
          { id: "cpp-19", title: "Xử lý file với fstream", file: "bai-19-xu-ly-file.html" },
          { id: "cpp-20", title: "Dự án tổng hợp: Quản lý điểm sinh viên", file: "bai-20-du-an-quan-ly-diem.html" }
        ]
      }
    ]
  }
];
