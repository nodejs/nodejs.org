---
layout: about.hbs
title: Giới thiệu
trademark: Nhãn hiệu
---

# Giới thiệu về Node.js®

Là một thời gian chạy JavaScript hướng sự kiện không đồng bộ, Node.js được thiết
kế để xây dựng các ứng dụng mạng có thể mở rộng. Trong ví dụ "hello world" sau
đây, nhiều kết nối có thể được xử lý đồng thời. Sau mỗi kết nối, cuộc gọi lại là
đã kích hoạt, nhưng nếu không có việc phải làm, Node.js sẽ ngủ.

```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Kiểu nội dung', 'văn bản/đơn giản');
  res.end('Xin chào thế giới');
});

server.listen(port, hostname, () => {
   console.log(`Máy chủ đang chạy tại http://${hostname}:${port}/`);
});
```

Điều này trái ngược với mô hình đồng thời phổ biến hơn hiện nay, trong đó các
luồng hệ điều hành được tuyển dụng. Mạng dựa trên luồng tương đối kém hiệu quả
và rất Khó sử dụng. Hơn nữa, người dùng Node.js không phải lo lắng về khóa chết
quá trình, vì không có ổ khóa. Hầu như không có chức năng trong Node.js trực
tiếp thực hiện I/O, do đó, quy trình không bao giờ bị chặn trừ khi I/O được thực
hiện bằng cách sử dụng các phương thức đồng bộ của thư viện chuẩn Node.js. Bởi
vì không có gì chặn, các hệ thống có thể mở rộng rất hợp lý để phát triển trong
Node.js.

Nếu một số ngôn ngữ này không quen thuộc, có một bài báo đầy đủ về [Chặn so với
Không chặn][].

---

Node.js có thiết kế tương tự và bị ảnh hưởng bởi các hệ thống như của Ruby [Máy
sự kiện][] và [Twisted][] của Python. Node.js lấy mô hình sự kiện một chút hơn
nữa. Nó trình bày [vòng lặp sự kiện][] dưới dạng cấu trúc thời gian chạy thay vì
dưới dạng thư viện. Trong các hệ thống khác, luôn có một cuộc gọi chặn để bắt
đầu vòng lặp sự kiện. Thông thường, hành vi được xác định thông qua các cuộc gọi
lại ở đầu tập lệnh và cuối cùng, một máy chủ được bắt đầu thông qua lệnh gọi
chặn như `EventMachine::run()`. Trong Node.js, không có lệnh gọi vòng lặp bắt
đầu sự kiện như vậy. Node.js chỉ cần vào vòng lặp sự kiện sau khi thực thi tập
lệnh đầu vào. Node.js thoát khỏi vòng lặp sự kiện khi không còn cuộc gọi lại nào
để thực hiện. hành vi này giống như JavaScript của trình duyệt — vòng lặp sự
kiện bị ẩn khỏi người dùng.

HTTP là công dân hạng nhất trong Node.js, được thiết kế với tính năng phát trực
tuyến và tốc độ thấp độ trễ trong tâm trí. Điều này làm cho Node.js rất phù hợp
với nền tảng của web thư viện hoặc khuôn khổ.

Node.js được thiết kế không có luồng không có nghĩa là bạn không thể thực hiện
lợi thế của nhiều lõi trong môi trường của bạn. Các tiến trình con có thể được
sinh ra bằng cách sử dụng API [`child_ process.fork()`][] của chúng tôi và được
thiết kế để dễ dàng giao tiếp với. Được xây dựng trên cùng giao diện đó là
mô-đun [`cluster`][], cho phép bạn chia sẻ ổ cắm giữa các quy trình để kích hoạt
cân bằng tải trên lõi của bạn.

[Chặn so với Không chặn]: /vn/docs/guides/blocking-vs-non-blocking/
[`child_ process.fork()`]: https://nodejs.org/api/child_ process.html#child_ process_child_ process_fork_modulepath_args_options
[`cluster`]: https://nodejs.org/api/cluster.html
[Vòng lặp sự kiện]: /vn/docs/guides/event-loop-timers-and-nexttick/
[Máy sự kiện]: https://github.com/eventmachine/eventmachine
[Xoắn]: https://twistedmatrix.com/trac/
