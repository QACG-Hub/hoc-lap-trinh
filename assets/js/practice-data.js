/* ============================================================
   HỌCLAPTRINH.EXE — Ngân hàng câu hỏi & bài tập tự viết code
   ------------------------------------------------------------
   QUIZZES[lessonId] = [ câu hỏi trắc nghiệm / điền khuyết ]
     - type "choice": options + answer (1 đáp án đúng, chuỗi)
     - type "fill"  : answer (mảng các đáp án được chấp nhận)
     - topic        : dùng để random theo đúng cú pháp vừa học
     - code         : (tuỳ chọn) đoạn code hiển thị phía trên câu hỏi
   EXERCISES[exId] = { prompt, checks, sample }
     - checks[i] = { regex, minCount?, desc, hint }
       regex dùng cờ "gs" (Global + dotAll) -> viết \\s, \\b, ...
       minCount: số lần khớp tối thiểu (mặc định 1)
   ============================================================ */

const QUIZZES = {

  /* ================= PYTHON ================= */

  "py-01": [
    /* --- Tổng quan (4) --- */
    { topic: "Tổng quan", type: "choice", question: "Python là ngôn ngữ lập trình thuộc nhóm nào?", options: ["Biên dịch (compiled)", "Thông dịch (interpreted)", "Mã máy (machine code)", "Đánh dấu (markup)"], answer: "Thông dịch (interpreted)", explain: "Python dùng trình thông dịch: đọc và chạy từng dòng lệnh, không cần biên dịch trước." },
    { topic: "Tổng quan", type: "choice", question: "Ai là người tạo ra Python?", options: ["Bill Gates", "Guido van Rossum", "Bjarne Stroustrup", "Linus Torvalds"], answer: "Guido van Rossum", explain: "Guido van Rossum tạo Python năm 1991. (Bjarne Stroustrup là cha đẻ C++ — nhớ nhé!)" },
    { topic: "Tổng quan", type: "choice", question: "Đuôi file chương trình Python là gì?", options: [".py", ".java", ".cpp", ".exe"], answer: ".py", explain: "Ví dụ hello.py, main.py..." },
    { topic: "Tổng quan", type: "choice", question: "Vì sao Python phù hợp với người mới học?", options: ["Cú pháp dễ đọc, gần tiếng Anh", "Phải học thuộc nhiều ký hiệu phức tạp", "Là ngôn ngữ cũ, ít ai dùng", "Chỉ chạy được trên Linux"], answer: "Cú pháp dễ đọc, gần tiếng Anh", explain: "Python đọc như tiếng Anh, ít ký hiệu rối — tập trung vào tư duy lập trình." },
    /* --- Cài đặt & chạy (5) --- */
    { topic: "Cài đặt & chạy", type: "choice", question: "Lệnh nào kiểm tra phiên bản Python đã cài?", options: ["python --version", "check python", "python install", "version python"], answer: "python --version", explain: "Trên macOS/Linux thường là python3 --version." },
    { topic: "Cài đặt & chạy", type: "choice", question: "Khi cài Python trên Windows, cần tick tùy chọn nào cho đúng?", options: ["Bỏ tick tất cả", "Add Python to PATH", "Install for all users (không được tick)", "Add Python to PATH và Use admin privileges"], answer: "Add Python to PATH", explain: "Add to PATH giúp gõ được lệnh python ở mọi thư mục trong terminal." },
    { topic: "Cài đặt & chạy", type: "choice", question: "REPL là gì?", options: ["Trình soạn thảo đồ họa", "Môi trường gõ lệnh Python trực tiếp và nhận kết quả ngay", "Một loại file Python", "Trình biên dịch C++"], answer: "Môi trường gõ lệnh Python trực tiếp và nhận kết quả ngay", explain: "Gõ python (hoặc python3) trong terminal để mở REPL — hợp để thử nhanh." },
    { topic: "Cài đặt & chạy", type: "choice", question: "Trình soạn thảo mã (IDE) được giới thiệu trong bài là?", options: ["Microsoft Word", "VS Code", "Paint", "Excel"], answer: "VS Code", explain: "VS Code miễn phí, có extension Python, giao diện đẹp — chuẩn dân lập trình." },
    { topic: "Cài đặt & chạy", type: "fill", question: "Gõ lệnh chạy file hello.py trong terminal:", answer: ["python hello.py", "python3 hello.py"], explain: "python hello.py, trên macOS/Linux có thể là python3 hello.py." }
  ],

  "py-02": [
    /* --- print() (9) --- */
    { topic: "print()", type: "choice", question: "Hàm nào dùng để in ra màn hình trong Python?", options: ["echo()", "print()", "cout", "console.log()"], answer: "print()", explain: "print() là câu lệnh quen thuộc nhất của mọi người mới học Python." },
    { topic: "print()", type: "choice", code: "print(\"2 + 3\")", question: "Đoạn code trên in ra gì?", options: ["5", "2 + 3", "Lỗi cú pháp", "23"], answer: "2 + 3", explain: "Có dấu nháy → đây là CHUỖI nên in nguyên văn, không tính toán." },
    { topic: "print()", type: "choice", code: "print(2 + 3)", question: "Đoạn code trên in ra gì?", options: ["2 + 3", "5", "Lỗi cú pháp", "2+3"], answer: "5", explain: "Không có dấu nháy → Python TÍNH biểu thức rồi in kết quả." },
    { topic: "print()", type: "choice", code: "print(\"a\", \"b\")", question: "Đoạn code trên in ra gì?", options: ["a b", "ab", "a, b", "Lỗi"], answer: "a b", explain: "Nhiều đối số cách nhau bởi dấu cách." },
    { topic: "print()", type: "choice", code: "print(\"a\", \"b\", sep=\"-\")", question: "Đoạn code trên in ra gì?", options: ["a-b", "a b", "ab", "Lỗi"], answer: "a-b", explain: "sep=\"-\" đổi dấu phân cách giữa các đối số thành dấu gạch ngang." },
    { topic: "print()", type: "choice", question: "print() không có gì bên trong sẽ làm gì?", options: ["Báo lỗi", "In ra một dòng trống", "In chữ print", "Tắt chương trình"], answer: "In ra một dòng trống", explain: "print() in dòng trống — hữu ích để ngăn cách các phần kết quả." },
    { topic: "print()", type: "choice", code: "print(\"Học\" + \"vui\")", question: "Đoạn code trên in ra gì?", options: ["Học vui", "Họcvui", "Học+vui", "Lỗi"], answer: "Họcvui", explain: "Dấu + nối hai chuỗi LIỀN nhau, không tự thêm khoảng trắng." },
    { topic: "print()", type: "choice", code: "print('A')", question: "Đoạn code trên in ra gì?", options: ["A", "'A'", "\"A\"", "Lỗi"], answer: "A", explain: "print in NỘI DUNG chuỗi, không in dấu nháy." },
    { topic: "print()", type: "fill", question: "Viết lệnh in ra chữ NEON (gõ cả lệnh hoàn chỉnh):", answer: ["print(\"neon\")", "print('neon')"], explain: "print(\"NEON\") — chuỗi nằm trong dấu nháy." },
    /* --- Ghi chú (comment) (4) --- */
    { topic: "Ghi chú (comment)", type: "choice", question: "Ký hiệu bắt đầu comment trong Python là gì?", options: ["//", "#", "/* */", "--"], answer: "#", explain: "# biến phần còn lại của dòng thành ghi chú, Python bỏ qua khi chạy." },
    { topic: "Ghi chú (comment)", type: "choice", question: "Comment (ghi chú) dùng để làm gì?", options: ["Chạy chương trình nhanh hơn", "Giải thích code cho người đọc, không ảnh hưởng khi chạy", "In ra màn hình", "Bắt buộc phải có trong mọi file"], answer: "Giải thích code cho người đọc, không ảnh hưởng khi chạy", explain: "Comment giúp người đọc (kể cả bạn của tương lai) hiểu code." },
    { topic: "Ghi chú (comment)", type: "choice", code: "# print(\"A\")\nprint(\"B\")", question: "Đoạn code trên in ra gì?", options: ["A", "B", "A B", "Không in gì"], answer: "B", explain: "Dòng bị comment bị Python bỏ qua — chỉ còn print(\"B\") chạy." },
    { topic: "Ghi chú (comment)", type: "choice", question: "Đoạn nào là comment HỢP LỆ trong Python?", options: ["# tính tổng hai số", "// tính tổng hai số", "/* tính tổng hai số */", "-- tính tổng hai số"], answer: "# tính tổng hai số", explain: "Python chỉ dùng dấu # cho comment." }
  ],

  "py-03": [
    /* --- Biến (5) --- */
    { topic: "Biến", type: "choice", question: "Cách gán giá trị 10 cho biến diem nào sau đây ĐÚNG?", options: ["diem == 10", "diem = 10", "10 = diem", "let diem = 10"], answer: "diem = 10", explain: "Dấu = là GÁN giá trị; dấu == là SO SÁNH." },
    { topic: "Biến", type: "choice", question: "Tên biến nào KHÔNG hợp lệ trong Python?", options: ["ten_tuoi", "_dem", "2ban", "hoVaTen"], answer: "2ban", explain: "Tên biến không được bắt đầu bằng chữ số." },
    { topic: "Biến", type: "choice", code: "x = 5\nx = x + 3\nprint(x)", question: "Đoạn code trên in ra gì?", options: ["5", "8", "53", "Lỗi"], answer: "8", explain: "x được gán lại thành 5 + 3 = 8." },
    { topic: "Biến", type: "choice", question: "Trong Python, biến có cần khai báo kiểu trước khi dùng không?", options: ["Có, luôn luôn", "Không — kiểu được suy ra từ giá trị gán vào", "Chỉ khi dùng số", "Chỉ khi dùng chuỗi"], answer: "Không — kiểu được suy ra từ giá trị gán vào", explain: "Đây là điểm khác biệt lớn so với C++ (phải ghi rõ kiểu)." },
    { topic: "Biến", type: "fill", question: "Gõ lệnh gán giá trị 2026 cho biến nam:", answer: ["nam = 2026", "nam=2026"], explain: "nam = 2026 — dấu = gán giá trị bên phải cho biến bên trái." },
    /* --- Kiểu dữ liệu (7) --- */
    { topic: "Kiểu dữ liệu", type: "choice", question: "Giá trị 3.14 thuộc kiểu dữ liệu nào?", options: ["int", "float", "str", "bool"], answer: "float", explain: "Số có phần thập phân là float (số thực)." },
    { topic: "Kiểu dữ liệu", type: "choice", question: "Giá trị \"5\" (có dấu nháy) thuộc kiểu nào?", options: ["int", "str", "float", "bool"], answer: "str", explain: "Có dấu nháy là chuỗi (str) — số 5 trong ngoặc kép chỉ là văn bản!" },
    { topic: "Kiểu dữ liệu", type: "choice", code: "print(type(7))", question: "Đoạn code trên in ra gì?", options: ["<class 'int'>", "<class 'str'>", "7", "int"], answer: "<class 'int'>", explain: "type(x) trả về kiểu dữ liệu của x; 7 là số nguyên." },
    { topic: "Kiểu dữ liệu", type: "choice", question: "Kiểu bool có hai giá trị nào?", options: ["0 và 1", "True và False", "yes và no", "Đúng và Sai (tiếng Việt)"], answer: "True và False", explain: "Python dùng True/False với chữ cái đầu VIẾT HOA." },
    { topic: "Kiểu dữ liệu", type: "choice", code: "print(7 / 2)", question: "Đoạn code trên in ra gì?", options: ["3", "3.5", "4", "Lỗi"], answer: "3.5", explain: "Phép chia / luôn trả về số thực (float), kể cả khi chia hết." },
    { topic: "Kiểu dữ liệu", type: "choice", code: "print(7 // 2)", question: "Đoạn code trên in ra gì?", options: ["3", "3.5", "4", "3.0"], answer: "3", explain: "// là chia lấy phần nguyên (7 chia 2 được 3 dư 1 → lấy 3)." },
    { topic: "Kiểu dữ liệu", type: "choice", code: "print(\"5\" + \"3\")", question: "Đoạn code trên in ra gì?", options: ["8", "53", "5 3", "Lỗi"], answer: "53", explain: "Dấu + với hai chuỗi là NỐI chuỗi, không phải cộng số." },
    /* --- Ép kiểu (5) --- */
    { topic: "Ép kiểu", type: "choice", code: "print(int(\"123\"))", question: "Đoạn code trên in ra gì?", options: ["123", "\"123\"", "Lỗi vì thiếu dấu nháy", "123.0"], answer: "123", explain: "int() đổi chuỗi số thành số nguyên — in ra 123 không nháy." },
    { topic: "Ép kiểu", type: "choice", code: "print(float(\"2.5\"))", question: "Đoạn code trên in ra gì?", options: ["2.5", "25", "2", "Lỗi vì 2.5 là chuỗi"], answer: "2.5", explain: "float() đổi chuỗi thành số thực." },
    { topic: "Ép kiểu", type: "choice", question: "Muốn chuyển số 10 thành chuỗi \"10\" thì dùng lệnh nào?", options: ["str(10)", "int(10)", "text(10)", "string(10)"], answer: "str(10)", explain: "str() đổi giá trị thành chuỗi." },
    { topic: "Ép kiểu", type: "choice", code: "print(int(3.9))", question: "Đoạn code trên in ra gì?", options: ["3", "4", "3.9", "Lỗi"], answer: "3", explain: "int() CẮT phần thập phân, không làm tròn." },
    { topic: "Ép kiểu", type: "choice", code: "print(int(\"abc\"))", question: "Đoạn code trên sẽ ra sao?", options: ["In ra 0", "Báo lỗi ValueError", "In ra \"abc\"", "In ra None"], answer: "Báo lỗi ValueError", explain: "Không thể đổi chuỗi chữ thành số — Python báo lỗi ngay." }
  ],

  /* ================= C++ ================= */

  "cpp-01": [
    /* --- Tổng quan (5) --- */
    { topic: "Tổng quan", type: "choice", question: "Ai là người tạo ra C++?", options: ["Guido van Rossum", "Bjarne Stroustrup", "Dennis Ritchie", "James Gosling"], answer: "Bjarne Stroustrup", explain: "Bjarne Stroustrup tạo C++ năm 1985 tại Bell Labs." },
    { topic: "Tổng quan", type: "choice", question: "C++ thuộc nhóm ngôn ngữ nào?", options: ["Thông dịch (interpreted)", "Biên dịch (compiled)", "Đánh dấu (markup)", "Truy vấn (query)"], answer: "Biên dịch (compiled)", explain: "Code C++ phải được compiler dịch thành mã máy TRƯỚC khi chạy." },
    { topic: "Tổng quan", type: "choice", question: "Đuôi file code C++ là gì?", options: [".cpp", ".py", ".csi", ".exe"], answer: ".cpp", explain: "Ví dụ hello.cpp. File .exe là kết quả sau biên dịch trên Windows." },
    { topic: "Tổng quan", type: "choice", question: "Vì sao C++ chạy nhanh hơn Python?", options: ["Được biên dịch thành mã máy tối ưu", "Viết ít chữ hơn", "Không cần compiler", "Chạy trong trình duyệt"], answer: "Được biên dịch thành mã máy tối ưu", explain: "Compiler tối ưu toàn bộ chương trình thành mã máy — tốc độ sát phần cứng." },
    { topic: "Tổng quan", type: "fill", question: "Gõ tên trình biên dịch GNU cho C++ (bắt đầu bằng chữ g):", answer: ["g++", "gcc", "clang++", "clang"], explain: "Phổ biến nhất là g++ (GNU). clang++ cũng phổ biến trên macOS." },
    /* --- Cài đặt & biên dịch (5) --- */
    { topic: "Cài đặt & biên dịch", type: "choice", question: "Lệnh nào biên dịch file hello.cpp thành chương trình tên hello?", options: ["g++ hello.cpp -o hello", "g++ -o hello.cpp hello", "compile hello.cpp", "cpp hello.cpp > hello"], answer: "g++ hello.cpp -o hello", explain: "-o <tên> đặt tên file đầu ra; nếu bỏ qua sẽ tạo file a.out (Linux/macOS)." },
    { topic: "Cài đặt & biên dịch", type: "choice", question: "Trên Linux/macOS, chạy chương trình vừa biên dịch tên hello bằng lệnh?", options: ["./hello", "run hello", "hello.exe", "python hello"], answer: "./hello", explain: "Dấu ./ nghĩa là chạy file trong thư mục hiện tại." },
    { topic: "Cài đặt & biên dịch", type: "choice", question: "Trên Ubuntu, lệnh cài trình biên dịch g++ là?", options: ["sudo apt install g++", "npm install g++", "get install g++", "pip install g++"], answer: "sudo apt install g++", explain: "apt là trình quản lý gói của Ubuntu/Debian." },
    { topic: "Cài đặt & biên dịch", type: "choice", question: "Nếu code C++ sai cú pháp, khi biên dịch sẽ xảy ra chuyện gì?", options: ["Chương trình vẫn chạy bình thường", "Compiler báo lỗi kèm số dòng cần sửa", "Compiler tự sửa lỗi giúp bạn", "Máy tự cài lại hệ điều hành"], answer: "Compiler báo lỗi kèm số dòng cần sửa", explain: "Đọc kỹ thông báo lỗi — nó chỉ luôn dòng và lý do, rất hữu ích!" },
    { topic: "Cài đặt & biên dịch", type: "choice", question: "Extension VS Code phổ biến để viết C++ là?", options: ["C/C++ (Microsoft)", "Python", "Prettier", "One Dark Theme"], answer: "C/C++ (Microsoft)", explain: "Extension C/C++ giúp gợi ý code, báo lỗi, format — cài ngay sau VS Code." }
  ],

  "cpp-02": [
    /* --- Cấu trúc chương trình (5) --- */
    { topic: "Cấu trúc chương trình", type: "choice", question: "Chương trình C++ luôn bắt đầu thực thi từ đâu?", options: ["Dòng đầu tiên của file", "Hàm main()", "Hàm cout()", "Dòng #include"], answer: "Hàm main()", explain: "Máy luôn tìm và chạy hàm main() trước tiên." },
    { topic: "Cấu trúc chương trình", type: "choice", question: "#include <iostream> dùng để làm gì?", options: ["Nạp thư viện nhập/xuất (cin, cout)", "Xóa màn hình", "Khai báo biến", "Kết thúc chương trình"], answer: "Nạp thư viện nhập/xuất (cin, cout)", explain: "iostream = input/output stream — nhớ nó mỗi khi muốn in ra màn hình." },
    { topic: "Cấu trúc chương trình", type: "choice", question: "Mỗi câu lệnh trong C++ kết thúc bằng ký tự nào?", options: [";", "dấu cách", ":", "."], answer: ";", explain: "Quên dấu ; là lỗi kinh điển của người mới học C++!" },
    { topic: "Cấu trúc chương trình", type: "choice", question: "return 0; ở cuối main() có ý nghĩa gì?", options: ["Bắt đầu chương trình", "Báo chương trình kết thúc thành công (mã 0)", "In ra số 0", "Không bao giờ dùng đến"], answer: "Báo chương trình kết thúc thành công (mã 0)", explain: "Trả mã 0 cho hệ điều hành = 'mọi thứ ổn'." },
    { topic: "Cấu trúc chương trình", type: "fill", question: "Điền tên hàm chính của mọi chương trình C++:", answer: ["main", "main()"], explain: "int main() { ... } — mọi dòng code nằm trong main hầu hết bắt đầu từ đây." },
    /* --- cout (6) --- */
    { topic: "cout", type: "choice", code: "cout << \"2 + 3\";", question: "Đoạn code trên in ra gì?", options: ["5", "2 + 3", "Lỗi cú pháp", "\"2 + 3\""], answer: "2 + 3", explain: "Chuỗi trong dấu nháy in nguyên văn — giống print() của Python." },
    { topic: "cout", type: "choice", code: "cout << 2 + 3;", question: "Đoạn code trên in ra gì?", options: ["2 + 3", "5", "Lỗi cú pháp", "23"], answer: "5", explain: "Không có dấu nháy → C++ tính biểu thức 2+3 rồi in 5." },
    { topic: "cout", type: "choice", question: "Toán tử << trong cout có nghĩa là gì?", options: ["Dịch bit sang trái", "Chèn dữ liệu vào luồng cout để in ra màn hình", "So sánh nhỏ hơn kép", "Bắt đầu comment"], answer: "Chèn dữ liệu vào luồng cout để in ra màn hình", explain: "Hình dung << như mũi tên đẩy dữ liệu về phía màn hình." },
    { topic: "cout", type: "choice", question: "Cách xuống dòng khi in trong C++ là?", options: ["endl hoặc \\n", "\\n đặt ngoài dấu nháy", "enter()", "<br>"], answer: "endl hoặc \\n", explain: "cout << ... << endl; hoặc cout << \"...\\n\"; đều xuống dòng." },
    { topic: "cout", type: "choice", code: "cout << \"A\";\ncout << \"B\";", question: "Đoạn code trên in ra gì?", options: ["AB", "A B", "A\\nB", "Lỗi"], answer: "AB", explain: "Không có endl hay \\n nên 'A' và 'B' dính liền nhau." },
    { topic: "cout", type: "choice", question: "using namespace std; giúp gì?", options: ["Cho phép viết cout thay vì std::cout", "Xóa namespace khỏi chương trình", "Nạp thư viện iostream", "Tăng tốc chương trình"], answer: "Cho phép viết cout thay vì std::cout", explain: "Giúp gõ ngắn hơn — hầu hết code mẫu đều có dòng này." },
    /* --- Comment (3) --- */
    { topic: "Comment", type: "choice", question: "Comment một dòng trong C++ bắt đầu bằng?", options: ["//", "#", "/* */", "<!-- -->"], answer: "//", explain: "// ghi chú một dòng — tương đương # của Python." },
    { topic: "Comment", type: "choice", question: "Comment nhiều dòng trong C++ dùng cặp ký hiệu nào?", options: ["// ... //", "\"\"\" ... \"\"\"", "/* ... */", "-- ... --"], answer: "/* ... */", explain: "Mọi thứ giữa /* và */ đều bị bỏ qua." },
    { topic: "Comment", type: "choice", code: "// cout << \"A\";\ncout << \"B\";", question: "Đoạn code trên in ra gì?", options: ["A", "B", "A B", "Không in gì"], answer: "B", explain: "Dòng bị comment không chạy — chỉ còn lệnh in B." }
  ],

  "cpp-03": [
    /* --- Biến (5) --- */
    { topic: "Biến", type: "choice", question: "Cách khai báo biến số nguyên trong C++ nào ĐÚNG?", options: ["int tuoi = 20;", "tuoi = 20;", "integer tuoi = 20;", "var tuoi = 20;"], answer: "int tuoi = 20;", explain: "C++ bắt buộc ghi rõ KIỂU trước tên biến — khác Python." },
    { topic: "Biến", type: "choice", question: "Trong C++, biến có cần khai báo kiểu không?", options: ["Không cần", "Có — luôn ghi rõ kiểu dữ liệu", "Chỉ khi dùng chuỗi", "Chỉ khi giá trị âm"], answer: "Có — luôn ghi rõ kiểu dữ liệu", explain: "Đây là điểm khác biệt lớn nhất so với Python khi mới chuyển sang." },
    { topic: "Biến", type: "choice", question: "Từ khóa const dùng để làm gì?", options: ["Tạo hằng số — giá trị không thể thay đổi", "Xóa biến khỏi bộ nhớ", "Chuyển kiểu dữ liệu", "In giá trị ra màn hình"], answer: "Tạo hằng số — giá trị không thể thay đổi", explain: "const double PI = 3.14; — gán lại sẽ báo lỗi ngay." },
    { topic: "Biến", type: "fill", question: "Khai báo biến số nguyên tên diem bằng 10 (đúng cú pháp, kèm dấu ;):", answer: ["int diem = 10;", "int diem=10;", "int diem =10;", "int diem= 10;"], explain: "int diem = 10; — kiểu, tên, dấu =, giá trị, dấu chấm phẩy." },
    { topic: "Biến", type: "choice", code: "int a = 5;\na = 7;\ncout << a;", question: "Đoạn code trên in ra gì?", options: ["5", "7", "57", "Lỗi"], answer: "7", explain: "Biến thường gán lại được; chỉ const mới không đổi." },
    /* --- Kiểu dữ liệu (6) --- */
    { topic: "Kiểu dữ liệu", type: "choice", question: "Kiểu số thực có độ chính xác gấp đôi float trong C++ là?", options: ["int", "double", "char", "bool"], answer: "double", explain: "double chính xác hơn float — mặc định nên dùng double cho số thực." },
    { topic: "Kiểu dữ liệu", type: "choice", question: "'A' (nháy ĐƠN) là kiểu dữ liệu nào?", options: ["char", "string", "int", "bool"], answer: "char", explain: "Nháy đơn = một ký tự (char); nháy kép = chuỗi (string)." },
    { topic: "Kiểu dữ liệu", type: "choice", question: "\"A\" (nháy KÉP) nên dùng kiểu nào (cần #include <string>)?", options: ["char", "string", "double", "void"], answer: "string", explain: "string trong STL chứa cả chuỗi nhiều ký tự." },
    { topic: "Kiểu dữ liệu", type: "choice", code: "cout << 7 / 2;", question: "Đoạn code trên in ra gì?", options: ["3.5", "3", "4", "Lỗi"], answer: "3", explain: "Chia HAI SỐ NGUYÊN ra số nguyên (cắt phần thập phân)! Muốn 3.5 phải ép kiểu." },
    { topic: "Kiểu dữ liệu", type: "choice", question: "Kiểu bool lưu giá trị nào?", options: ["true hoặc false", "0 đến 255 ký tự", "Số thực", "Chuỗi dài"], answer: "true hoặc false", explain: "bool chỉ có hai giá trị true/false — viết thường trong C++." },
    { topic: "Kiểu dữ liệu", type: "choice", code: "cout << 5 % 2;", question: "Đoạn code trên in ra gì?", options: ["2", "2.5", "1", "0"], answer: "1", explain: "% là chia lấy DƯ: 5 chia 2 được 2 dư 1." },
    /* --- Ép kiểu (4) --- */
    { topic: "Ép kiểu", type: "choice", code: "cout << (double)7 / 2;", question: "Đoạn code trên in ra gì?", options: ["3", "3.5", "4", "Lỗi"], answer: "3.5", explain: "Ép 7 thành double trước khi chia → kết quả số thực." },
    { topic: "Ép kiểu", type: "choice", question: "Cách ép kiểu 'kiểu C' viết thế nào?", options: ["(double)7", "double(7)", "7 as double", "<double>7"], answer: "(double)7", explain: "(kiểu)giá trị — cách cổ điển, vẫn dùng rộng rãi." },
    { topic: "Ép kiểu", type: "choice", question: "Cách ép kiểu hiện đại của C++ là?", options: ["static_cast<double>(7)", "cast<double>(7)", "static<7>double", "double static 7"], answer: "static_cast<double>(7)", explain: "static_cast<kiểu>(giá trị) — an toàn hơn, được khuyến nghị trong C++ hiện đại." },
    { topic: "Ép kiểu", type: "choice", code: "int x = 3.9;\ncout << x;", question: "Đoạn code trên in ra gì?", options: ["4", "3", "3.9", "Lỗi"], answer: "3", explain: "Gán số thực vào int sẽ CẮT phần thập phân (không làm tròn) — coi chừng!" }
  ]
};

const EXERCISES = {

  /* ================= PYTHON ================= */

  "py-01-ex1": {
    topic: "Kiểm tra phiên bản Python",
    prompt: "Trong terminal, viết lệnh kiểm tra phiên bản Python đã cài trên máy.",
    checks: [
      { regex: "python3?\\s+--version", desc: "Có lệnh python (hoặc python3) kèm tùy chọn --version", hint: "Cú pháp gợi ý: python --version hoặc python3 --version" }
    ],
    sample: "python3 --version"
  },

  "py-02-ex1": {
    topic: "In dòng chữ đầu tiên",
    prompt: "Viết lệnh in ra đúng dòng chữ: Hello, World!",
    checks: [
      { regex: "print\\s*\\(", desc: "Dùng hàm print(...)", hint: "Bắt đầu bằng print rồi mở ngoặc đơn" },
      { regex: "[\"']Hello,\\s*World![\"']", desc: "Chuỗi Hello, World! nằm trong dấu nháy", hint: "Đặt Hello, World! trong cặp dấu nháy kép \"...\"" }
    ],
    sample: "print(\"Hello, World!\")"
  },

  "py-02-ex2": {
    topic: "In hai dòng",
    prompt: "Dùng HAI lệnh print để in ra hai dòng: dòng 1 là Học Python, dòng 2 là Thật vui.",
    checks: [
      { regex: "[\"']Học Python[\"']", desc: "Có chuỗi \"Học Python\"", hint: "Chuỗi thứ nhất: \"Học Python\"" },
      { regex: "[\"']Thật vui[\"']", desc: "Có chuỗi \"Thật vui\"", hint: "Chuỗi thứ hai: \"Thật vui\"" },
      { regex: "print\\s*\\(", minCount: 2, desc: "Dùng ít nhất 2 lệnh print(...)", hint: "Mỗi dòng cần một lệnh print riêng" }
    ],
    sample: "print(\"Học Python\")\nprint(\"Thật vui\")"
  },

  "py-02-ex3": {
    topic: "Thêm ghi chú cho code",
    prompt: "Thêm ít nhất một dòng comment (ghi chú) vào code, bắt đầu bằng ký hiệu #.",
    checks: [
      { regex: "#.*\\S", desc: "Có ít nhất 1 dòng comment bắt đầu bằng # và có nội dung", hint: "Ví dụ: # Chương trình đầu tiên của tôi" }
    ],
    sample: "# Chương trình đầu tiên của tôi\nprint(\"Hello\")"
  },

  "py-03-ex1": {
    topic: "Tạo biến đầu tiên",
    prompt: "Tạo biến tuoi và gán giá trị 20.",
    checks: [
      { regex: "\\btuoi\\s*=\\s*20\\b", desc: "Có dòng gán: tuoi = 20", hint: "Viết đúng: tuoi = 20 (dấu = để gán giá trị)" }
    ],
    sample: "tuoi = 20"
  },

  "py-03-ex2": {
    topic: "Biến chuỗi",
    prompt: "Tạo biến ten gán một chuỗi bất kỳ (tên bạn chẳng hạn), rồi dùng print() để in biến đó ra.",
    checks: [
      { regex: "\\bten\\s*=\\s*[\"'][^\"']+[\"']", desc: "Gán một chuỗi (trong dấu nháy) cho biến ten", hint: "ten = \"An\" — nội dung trong dấu nháy kép" },
      { regex: "print\\s*\\([^)]*\\bten\\b[^)]*\\)", desc: "Dùng print() để in ra biến ten", hint: "print(ten) hoặc print(f\"Chào {ten}\")" }
    ],
    sample: "ten = \"An\"\nprint(ten)"
  },

  "py-03-ex3": {
    topic: "Ép kiểu số học",
    prompt: "Chuyển chuỗi \"2026\" thành số nguyên, cộng thêm 1 rồi in kết quả ra màn hình (kết quả mong đợi: 2027).",
    checks: [
      { regex: "int\\s*\\(\\s*[\"']2026[\"']\\s*\\)", desc: "Chuyển chuỗi \"2026\" thành số nguyên bằng int(...)", hint: "Dùng int(\"2026\") để đổi chuỗi thành số" },
      { regex: "\\+\\s*1\\b", desc: "Có phép cộng thêm 1", hint: "Cộng 1 vào kết quả: int(\"2026\") + 1" },
      { regex: "print\\s*\\(", desc: "In kết quả ra màn hình bằng print()", hint: "Đừng quên print(...) kết quả cuối cùng" }
    ],
    sample: "nam = int(\"2026\") + 1\nprint(nam)"
  },

  /* ================= C++ ================= */

  "cpp-01-ex1": {
    topic: "Lệnh biên dịch đầu tiên",
    prompt: "Viết lệnh biên dịch file hello.cpp thành chương trình có tên hello.",
    checks: [
      { regex: "\\bg\\+\\+", desc: "Dùng trình biên dịch g++", hint: "Bắt đầu lệnh bằng g++" },
      { regex: "hello\\.cpp", desc: "Biên dịch file hello.cpp", hint: "Ghi tên file nguồn: hello.cpp" },
      { regex: "-o\\s+hello\\b", desc: "Có tùy chọn -o hello để đặt tên file chạy", hint: "-o <tên> đặt tên file đầu ra: -o hello" }
    ],
    sample: "g++ hello.cpp -o hello"
  },

  "cpp-02-ex1": {
    topic: "Chương trình Hello World đầy đủ",
    prompt: "Viết chương trình C++ hoàn chỉnh in ra Hello, World! — gồm đủ: include iostream, hàm main, cout và return 0.",
    checks: [
      { regex: "#include\\s*<iostream>", desc: "Nạp thư viện iostream", hint: "Dòng đầu tiên: #include <iostream>" },
      { regex: "int\\s+main\\s*\\(", desc: "Có hàm int main()", hint: "int main() { ... }" },
      { regex: "cout\\s*<<\\s*[\"'][^\"']*Hello,\\s*World![^\"']*[\"']", desc: "In Hello, World! bằng cout <<", hint: "cout << \"Hello, World!\";" },
      { regex: "return\\s+0\\s*;", desc: "Kết thúc main bằng return 0;", hint: "Dòng cuối trong main: return 0;" }
    ],
    sample: "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello, World!\" << endl;\n    return 0;\n}"
  },

  "cpp-02-ex2": {
    topic: "Xuống dòng trong cout",
    prompt: "In ra Học C++ rồi xuống dòng, sau đó in tiếp Thật thú vị (dùng \\n hoặc endl).",
    checks: [
      { regex: "[\"']Học C\\+\\+", desc: "In chuỗi Học C++", hint: "cout << \"Học C++\";" },
      { regex: "[\"']Thật thú vị[\"']", desc: "In chuỗi Thật thú vị", hint: "cout << \"Thật thú vị\";" },
      { regex: "(\\\\n|endl)", desc: "Có \\n hoặc endl để xuống dòng", hint: "Thêm \\n trong chuỗi hoặc << endl sau chuỗi" }
    ],
    sample: "cout << \"Học C++\\n\";\ncout << \"Thật thú vị\";"
  },

  "cpp-03-ex1": {
    topic: "Khai báo biến có kiểu",
    prompt: "Khai báo biến tuoi kiểu int bằng 20 và biến diem kiểu double bằng 8.5.",
    checks: [
      { regex: "\\bint\\s+tuoi\\s*=\\s*20\\s*;", desc: "Khai báo int tuoi = 20;", hint: "int tuoi = 20; — nhớ dấu chấm phẩy cuối dòng" },
      { regex: "\\bdouble\\s+diem\\s*=\\s*8\\.5\\s*;", desc: "Khai báo double diem = 8.5;", hint: "double diem = 8.5; — số thực dùng dấu chấm" }
    ],
    sample: "int tuoi = 20;\ndouble diem = 8.5;"
  },

  "cpp-03-ex2": {
    topic: "In biến ra màn hình",
    prompt: "In giá trị biến tuoi (kiểu int) ra màn hình bằng cout và xuống dòng (dùng endl hoặc \\n).",
    checks: [
      { regex: "cout\\s*<<\\s*tuoi", desc: "In biến tuoi bằng cout <<", hint: "cout << tuoi;" },
      { regex: "(endl|\\\\n)", desc: "Xuống dòng bằng endl hoặc \\n", hint: "cout << tuoi << endl;" }
    ],
    sample: "cout << tuoi << endl;"
  },

  "cpp-03-ex3": {
    topic: "Ép kiểu chia số thực",
    prompt: "Ép kiểu để phép tính 7 / 2 ra kết quả 3.5, rồi in kết quả bằng cout.",
    checks: [
      { regex: "(\\(\\s*double\\s*\\)\\s*7|static_cast\\s*<\\s*double\\s*>\\s*\\(\\s*7\\s*\\)|7\\.0)", desc: "Ép 7 thành số thực (double)", hint: "Dùng (double)7 hoặc static_cast<double>(7) hoặc viết 7.0" },
      { regex: "cout\\s*<<", desc: "In kết quả bằng cout", hint: "cout << (double)7 / 2 << endl;" }
    ],
    sample: "cout << (double)7 / 2 << endl;"
  }
};
