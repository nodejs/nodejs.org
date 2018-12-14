---
tiêu đề: Lỗi - Bắt Đầu
bố trí: tài liệu.cơ sở kinh doanh
---

# Lỗi Hướng Dẫn

Hướng dẫn này sẽ giúp anh bắt đầu lỗi của bạn Node.js ứng dụng và kịch bản.

## Cho Phép Thanh Tra

Khi bắt đầu với các **--kiểm tra** chuyển, một Node.js quá trình nghe qua WebSockets
cho chẩn đoán lệnh theo định nghĩa của [thanh Tra giao Thức][],
định tổ chức và cổng 127.0.0.1:9229. Mỗi quá trình cũng được
độc đáo [điều khiển][] (ví dụ `0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`).

Thanh tra khách hàng phải biết và lưu trữ xác định địa chỉ, cổng, và điều khiển kết nối
để Đã diện. Địa chỉ đầy đủ
`t://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e` dĩ nhiên là phụ thuộc
trên thực tế lưu trữ và cảng và với chính xác điều khiển cho dụ.

Thanh tra cũng bao gồm một HTTP cuối để phục vụ siêu dữ liệu về debuggee,
bao gồm cả của nó Đã URL điều khiển, và Crôm! địa chỉ. Nhận được dữ liệu này
bởi gửi một yêu cầu HTTP để `http://[chủ:cổng]/hệt/danh sách`. Này trả về
HỆT đối tượng thích sau, sử dụng `webSocketDebuggerUrl` tài sản như thế
Địa chỉ để kết nối trực tiếp với thanh Tra.

<!-- eslint-bỏ qua -->
``javascript
{
"mô tả": "node.js ví dụ",
 "devtoolsFrontendUrl": "chrome-devtools://devtools/bundled/inspector.html?experiments=true&v8only=true&ws=127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e",
"faviconUrl": "https://nodejs.org/static/favicon.ico",
"id": "0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e",
"hiệu": "nút",
"loại": "nút",
"đã": "tập tin://",
"webSocketDebuggerUrl": "t://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e"
}
``

Một Node.js quá trình bắt đầu mà không có ** `--kiểm tra` cũng có thể được huấn luyện để bắt đầu
nghe cho lỗi tin nhắn của tín hiệu đó với `SIGUSR1` (trên nề và
HỆ ĐIỀU HÀNH X). Như của Nút 7 này sẽ kích hoạt di sản Lỗi API trong Nút 8 và sau đó
nó sẽ kích hoạt các thanh Tra.

---
## Ý Nghĩa An Ninh

Kể từ lỗi đã truy cập vào Node.js thực hiện môi trường
diễn viên độc hại thể kết nối đến cổng này có thể được, có thể thực hiện bất
mã đại diện của Nút quá trình. Điều quan trọng là phải hiểu được an ninh
ý nghĩa của lộ trình lỗi cảng và mạng.

### Lộ gỡ cổng công khai là không an toàn

Nếu lỗi bị ràng buộc vào một địa chỉ IP công cộng, hoặc để 0.0.0.0, bất kỳ khách hàng đó
có thể đạt được địa chỉ IP của bạn sẽ có thể kết nối với các lỗi không có bất kỳ
hạn chế và sẽ có thể chạy mã tùy ý.

Bởi định `nút-kiểm tra` liên kết với 127.0.0.1. Bạn cần phải rõ ràng để cung cấp một
địa chỉ IP công cộng hay 0.0.0.0., nếu bạn có ý định để cho phép kết nối bên ngoài
để gỡ lỗi. Làm như vậy có một khả năng an ninh quan trọng
mối đe dọa. Chúng ta đề nghị bạn đảm bảo thích hợp tường lửa và truy cập vào điều khiển tại chỗ
để ngăn chặn một an ninh tiếp xúc.

Xem phần '[kích hoạt từ xa lỗi kịch bản](#kích hoạt từ xa lỗi-kịch bản)' về một số lời khuyên về cách
để an toàn cho phép lỗi khách hàng để kết nối.

### Ứng dụng địa phương có thể truy cập vào các thanh tra

Thậm chí nếu bạn ràng buộc các thanh tra cổng để 127.0.0.1 (mặc), bất kỳ ứng dụng
chạy địa phương trên máy tính của bạn sẽ có thể truy cập không giới hạn. Đây là thiết kế bởi
để cho địa phương trình gỡ để có thể gắn thuận tiện.

### Duyệt WebSockets và cùng nguồn gốc mật

Trang web mở trong một trang web có thể làm cho Se và yêu cầu HTTP dưới
duyệt an ninh. Một đầu nối HTTP là cần thiết để có được một
độc đáo lỗi phiên id. Giống-nguồn gốc-mật ngăn ngừa trang web được
có thể để thực hiện điều này HTTP kết nối. Cho thêm an ninh chống lại
[DNS rebinding tấn công](https://en.wikipedia.org/wiki/DNS_rebinding), Node.js
xác nhận rằng máy Chủ ' đầu cho sự kết nối hoặc là
chỉ một địa chỉ IP hoặc `cách` hoặc `localhost6` chính xác.

Những chính sách bảo mật không cho phép kết nối với một điều khiển từ xa gỡ lỗi chủ bởi
xác định máy. Bạn có thể làm việc này hạn chế bởi xác định
hoặc là các địa chỉ IP hoặc bằng cách sử dụng ssh đường hầm mô tả như dưới đây.

## Thanh Tra Khách Hàng

Nhiều thương mại và mở nguồn công cụ có thể kết nối với Nút thanh Tra. Cơ bản
thông tin về những sau:

#### [nút-kiểm tra](https://github.com/nodejs/node-inspect)

* CLI Lỗi hỗ trợ bởi Node.js nền Tảng mà sử dụng [thanh Tra giao Thức][].
* Một phiên bản là kèm với Nút và có thể được sử dụng với `nút kiểm tra myscript.js`.
* Phiên bản mới nhất cũng có thể được cài đặt một cách độc lập (ví dụ `tiếng cài đặt -g nút-kiểm tra`)
và sử dụng với `nút-kiểm tra myscript.js`.

#### [Crôm!] (https://github.com/ChromeDevTools/devtools-frontend) 55+

* **Lựa chọn 1**: Mở cụ://kiểm tra` trong một Crom-dựa
duyệt. Bấm nút Cấu hình và đảm bảo mục tiêu của bạn lưu trữ và port
được liệt kê.
* **Lựa chọn 2**: sao Chép `devtoolsFrontendUrl` từ đầu ra của `/hệt/danh sách`
(xem ở trên) hoặc --kiểm tra gợi ý văn bản và dán thành Rôm.
* **Lựa chọn 3**: Cài đặt máy ĐÂY (Nút thanh Tra Lý): 
http://chrome.google.com/webstore/detail/nim-node-inspector-manage/gnhhdgbaldcilmgcpfddgdbkhjohddkj

#### [Visual Studio Mã](https://github.com/microsoft/vscode) 1.10+

* Trong bảng điều khiển Gỡ lỗi, nhấn vào những biểu tượng cài đặt để mở `.vscode/khởi động.trong c`.
Chọn "Node.js" cho ban đầu thiết lập.

#### [Visual Studio](https://github.com/Microsoft/nodejstools) 2017

* Chọn "Gỡ lỗi > bắt Đầu Lỗi" từ các đơn hoặc đánh F5.
* [Hướng dẫn chi tiết](https://github.com/Microsoft/nodejstools/wiki/Debugging).

#### [JetBrains WebStorm](https://www.jetbrains.com/webstorm/) 2017.1 và JetBrains Cùng

* Tạo ra một new Node.js gỡ hình ảnh và nhấn Gỡ lỗi. `--kiểm tra` sẽ được sử dụng
 mặc định cho Node.js 7+. Đến vô hiệu hóa bỏ `trojan.sửa lỗi.nút.sử dụng.kiểm tra` 
lập trình đăng Ký.

#### [pop-remote-diện](https://github.com/cyrus-and/chrome-remote-interface)

* Thư viện để dễ dàng kết nối đến thanh Tra giao Thức thiết bị đầu cuối.

---

## Dòng lệnh lựa chọn

Các bảng danh sách các tác động của các chạy lá cờ trên lỗi:

<bàn cellpadding="0" cellspacing="0">
<tr><thứ>Cờ</thứ><thứ>ý Nghĩa</thứ></tr>
<tr>
<td>--kiểm tra</td>
<td>
<ul>
<li>cho Phép thanh tra lý</li>
<li>Nghe mặc định địa chỉ và cổng (127.0.0.1:9229)</li>
</ul>
</td>
</tr>
<tr>
<td>--kiểm tra=<i>[chủ:cổng]</i></td>
<td>
<ul>
<li>cho Phép thanh tra lý</li>
<li>liên Kết với địa chỉ hoặc tên <i>chủ</i> (định: 127.0.0.1)</li>
<li>Nghe trên cổng <i>cổng</i> (định: 9229)</li>
</ul>
</td>
</tr>
<tr>
<td>--kiểm tra-z</td>
<td>
<ul>
<li>cho Phép thanh tra lý</li>
<li>Nghe mặc định địa chỉ và cổng (127.0.0.1:9229)</li>
<li>Ngơi trước khi người dùng mã bắt đầu</li>
</ul>
</td>
</tr>
<tr>
<td>--kiểm tra-z=<i>[chủ:cổng]</i></td>
<td>
<ul>
<li>cho Phép thanh tra lý</li>
<li>liên Kết với địa chỉ hoặc tên <i>chủ</i> (định: 127.0.0.1)</li>
<li>Nghe trên cổng <i>cổng</i> (định: 9229)</li>
<li>Ngơi trước khi người dùng mã bắt đầu</li>
</ul>
</td>
</tr>
<tr>
<td><mã>nút kiểm tra <i>script.js</i></mã></td>
<td>
<ul>
<li>Đẻ đứa trẻ quá trình để chạy dùng kịch bản dưới --kiểm tra cờ;
và sử dụng quá trình chính chạy CLI lỗi.</li>
</ul>
</td>
</tr>
<tr>
<td><mã>nút kiểm tra --cổng=. <i>script.js</i></mã></td>
<td>
<ul>
<li>Đẻ đứa trẻ quá trình để chạy dùng kịch bản dưới --kiểm tra cờ;
và sử dụng quá trình chính chạy CLI lỗi.</li>
<li>Nghe trên cổng <i>cổng</i> (định: 9229)</li>
</ul>
</td>
</tr>
</bảng>

---

## Kích hoạt từ xa lỗi kịch bản

Chúng tôi khuyên bạn không bao giờ có lỗi nghe, một địa chỉ IP công cộng. Nếu
bạn cần phải cho phép lỗi kết nối chúng ta nên sử dụng ssh
đường hầm thay thế. Chúng tôi cung cấp những ví dụ cho mục đích minh họa.
Xin hãy hiểu cho sự an nguy cơ cho phép truy cập vào một đặc quyền
dịch vụ trước khi tiến hành.

Hãy nói bạn đang chạy Nút trên máy tính từ xa, remote.example.com rằng bạn
muốn để có thể gỡ lỗi. Trên máy đó, bạn nên bắt đầu nút quá trình
với thanh tra nghe chỉ để sử (mặc).

``bash
$ nút-kiểm tra server.js
``

Bây giờ, trên máy địa phương của bạn từ nơi bạn muốn bắt đầu một gỡ khách hàng
kết nối, bạn có thể thiết lập một đường hầm ssh:

``bash
$ ssh -L 9221:cách:9229 user@remote.example.com
``

Này, bắt đầu một đường hầm ssh phiên nơi một kết nối đến cổng 9221 của địa phương
máy sẽ được chuyển đến cảng trên 9229 remote.example.com. Bây giờ bạn có thể gắn
một lỗi như crom! hoặc Visual Studio Mã để sử:9221,
mà nên có thể sửa lỗi nếu như Node.js ứng dụng đã chạy địa phương.

---

## Di Sản Lỗi

**Những di sản lỗi đã phản đối của Nút 7.7.0. Xin vui lòng sử dụng-kiểm tra
và thanh Tra thay thế.**

Khi bắt đầu với các **--gỡ lỗi** **--gỡ-sp** chuyển trong phiên bản 7 và
trước đó, Node.js nghe cho lỗi lệnh xác định bởi sự ngưng
V8 Lỗi giao Thức kết nối cảng, bằng cách mặc định `5858`. Bất kỳ lỗi khách hàng
mà nói giao thức này có thể kết nối với và gỡ các chạy quá trình; 
vài người có dưới đây.

Động cơ V8 Lỗi giao Thức không còn duy trì hoặc tài liệu.

#### [Được xây dựng trong Lỗi](https://nodejs.org/dist/latest-v6.x/docs/api/debugger.html)

Bắt đầu `nút gỡ script_name.js` để bắt đầu của kịch bản dưới Nút dựng sẵn
dòng lệnh lỗi. Kịch bản của bạn bắt đầu trong một Nút quá trình bắt đầu với
`--gỡ-z` lựa chọn đầu tiên Nút quá trình chạy `_debugger.js`
kịch bản và kết nối với mục tiêu của bạn.

#### [nút-thanh tra](https://github.com/node-inspector/node-inspector)

Lỗi của bạn Node.js ứng dụng với Crôm! bằng cách sử dụng một trung gian quá trình
mà dịch các thanh Tra giao Thức được sử dụng trong Crom để V8 Lỗi
giao thức được sử dụng trong Node.js.

<!-- trọng tài -->

[Thanh tra giao Thức]: https://chromedevtools.github.io/debugger-protocol-viewer/v8/
[Điều khiển]: https://tools.ietf.org/html/rfc4122