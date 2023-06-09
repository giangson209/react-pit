import React from 'react';
import styles from '@/styles/rich-text.module.scss';
import useBoolean from '@/hooks/useBoolean';
import clsx from 'clsx';

type Props = {};

const HTMLContent = (props: Props) => {
  const { value: isShow, toggle } = useBoolean(false);
  return (
    <>
      <div id="rich_content" className={clsx(styles.rich, isShow ? '' : styles.hide)}>
        <h2>
          <strong>Thông tin sản phẩm</strong>
        </h2>
        <h2>
          <strong>Máy tính bảng Samsung Tab S8 Ultra - Thiết kế đẹp, pin khủng</strong>
        </h2>
        <p>
          Chiếc tablet
          <strong>
            <a href="/" title="Galaxy Tab S8 Ultra" target="_blank">
              Galaxy Tab S8 Ultra
            </a>
          </strong>
          &nbsp;vừa được Samsung ra mắt cùng với Tab S8 và Tab S8 Plus mới đây. Máy tính bảng sở hữu thiết kế mới đột phá có độ mỏng vô cùng
          ấn tượng, cấu hình mạnh mẽ, dung lượng pin khủng cùng với những tính năng tân tiến nhất hiện nay. Đây hứa hẹn là dòng máy tính
          bảng sẽ làm mưa làm gió trong thời gian sắp tới.
        </p>
        <h3>
          <strong>Thiết kế tinh tế siêu mỏng với các đường nét vuông vắn, màu sắc thời thượng</strong>
        </h3>
        <p>
          Ấn tượng đầu tiên của Samsung Galaxy Tab S8 Ultra chính là thiết kế với độ mỏng nhẹ ấn tượng và các đường nét có đường nét vuông
          vắn hơn, hiện đại hơn. Bốn góc được bo tròn đã giúp cho tổng thể không quá sắc cạnh mà có phần mềm mại hơn.
        </p>
        <p>
          <img
            src="https://cdn2.cellphones.com.vn/x,webp,q100/media/wysiwyg/tablet/samsung/samsung-galaxy-tab-s8-ultra-3_1.jpg"
            alt="Samsung Galaxy Tab S8 Ultra"
            loading="lazy"
          />
        </p>
        <p>
          Samsung Galaxy Tab S8 Ultra có phần khung nhôm Armor Aluminum tạo nên sự sang trọng cùng với màu sắc thanh lịch, trending hiện nay
          và bảo vệ an toàn tối ưu cho tablet.
        </p>
        <h3>
          <strong>Màn hình Super AMOLED tần số quét cao</strong>
        </h3>
        <p>
          Màn hình Samsung Tab S8 Ultra khi so với người anh em tiền nhiệm là Tab S7 trước đó đã có sự thay đổi khi sở hữu viền màn hình
          mỏng hơn và kích thước màn hình lớn mang đến cho người dùng trải nghiệm hình ảnh không giới hạn.
        </p>
        <p>
          <img
            src="https://cdn2.cellphones.com.vn/x,webp,q100/media/wysiwyg/tablet/samsung/samsung-galaxy-tab-s8-ultra-6_1.jpg"
            alt="Samsung Galaxy Tab S8 Ultra"
            loading="lazy"
          />
        </p>
        <p>
          Bên cạnh đó, việc trang bị công nghệ màn hình Super AMOLED với tần số quét cao, độ tương phản cao giúp người dùng có những khung
          hình trung thực, sống động và sắc nét đến từng chi tiết, hiển thị sắc nét, màu sắc đẹp trong nhiều điều kiện ánh sáng môi trường.
        </p>
        <h3>
          <strong>Hiệu năng mạnh mẽ với chip Snapdragon® 8 Gen 1 Mobile Platform</strong>
        </h3>
        <p>
          Samsung Galaxy Tab S8 Ultra cũng sở hữu hiệu năng mạnh mẽ với con chip Snapdragon® 8 Gen 1 Mobile Platform có hiệu năng cao hiện
          nay giúp Samsung Galaxy Tab S8 Ultra mặc dù chỉ là một chiếc tablet nhưng vẫn có sức mạnh không thua kém bất cứ dòng laptop nào.
        </p>
        <p>
          <img
            src="https://cdn2.cellphones.com.vn/x,webp,q100/media/wysiwyg/tablet/samsung/samsung-galaxy-tab-s8-ultra-5_1.jpg"
            alt="Samsung Galaxy Tab S8 Ultra"
            loading="lazy"
          />
        </p>
        <h3>
          <strong>Hệ thống camera thỏa sức sáng tạo nội dung hình ảnh hay video</strong>
        </h3>
        <p>
          Máy tính bảng Samsung Tab S8 Ultra được trang bị hệ thống camera bao gồm camera trước góc rộng, góc siêu rộng 12 MP mang đến khả
          năng chụp ảnh sắc nét, video call chất lượng cao.
        </p>
        <p>
          <img
            src="https://cdn2.cellphones.com.vn/x,webp,q100/media/wysiwyg/tablet/samsung/samsung-galaxy-tab-s8-ultra-4_1.jpg"
            alt="Samsung Galaxy Tab S8 Ultra"
            loading="lazy"
          />
        </p>
        <p>
          Bạn có thể thỏa sức sáng tạo những khung hình ấn tượng, sáng tạo những nội dung hình ảnh, video chất lượng cao một cách thuận tiện
          hơn.
        </p>
        <h3>
          <strong>Pin khủng với thời lượng kéo dài và công nghệ sạc nhanh 45W</strong>
        </h3>
        <p>
          Samsung Galaxy Tab S8 Ultra sở hữu viên pin có mức dung lượng ấn tượng, pin khủng cho thời lượng kéo dài, liên tục suốt cả ngày để
          bạn thoải mái sử dụng.
        </p>
        <p>
          <img
            src="https://cdn2.cellphones.com.vn/x,webp,q100/media/wysiwyg/tablet/samsung/samsung-galaxy-tab-s8-ultra-2_1.jpg"
            alt="Samsung Galaxy Tab S8 Ultra"
            loading="lazy"
          />
        </p>
        <p>
          Bên cạnh đó tablet cũng được tích hợp công nghệ sạc nhanh với công suất sạc 45W nên việc nạp lại năng lượng cho tablet cũng sẽ
          diễn ra nhanh chóng hơn, giúp bạn nạp lại pin cho viên pin khủng mà không mất nhiều thời gian.
        </p>
        <h3>
          <strong>Hỗ trợ bàn phím, bút S-Pen biến tablet thì một chiếc laptop thực thụ</strong>
        </h3>
        <p>
          Việc hỗ trợ bàn phím và bút S-Pen sẽ giúp bạn ngay lập tức biến chiếc tablet thành một chiếc laptop thực thụ. Khi kết nối với bàn
          phím, bạn có thể xử lý các công việc liên quan đến văn phòng nhanh chóng hơn.
        </p>
        <p>
          Bút S-Pen có độ nhạy cao, là món phụ kiện đắc lực giúp người dùng viết, vẽ và việc kết hợp Galaxy Tab S8 Ultra với S-Pen biến
          chiếc máy tính bảng của bạn thành một chiếc wacom – thiết bị không thể thiếu của những nhà thiết kế đồ họa, họa sĩ chuyên nghiệp.
        </p>
        <p>
          <img
            src="https://cdn2.cellphones.com.vn/x,webp,q100/media/wysiwyg/tablet/samsung/samsung-galaxy-tab-s8-ultra-1_1.jpg"
            alt="Hỗ trợ bàn phím, bút S-Pen"
            loading="lazy"
          />
        </p>
        <h2>
          <strong>Samsung Galaxy Tab S8 Ultra giá bao nhiêu? khi nào ra mắt?</strong>
        </h2>
        <p>
          Hiện tại Samsung vẫn chưa công bố về thời gian ra mắt chính thức của Samsung Tab S8 Ultra và chúng tôi vẫn liên tục cập nhật thông
          tin ra mắt sớm nhất để khách hàng có thể theo dõi. Về giá bán, máy tính bảng Tab S8 Ultra hiện có giá khởi điểm tại Hàn Quốc như
          sau:
        </p>
        <ul>
          <li>
            <p>- Phiên bản WiFi: 1.469.000 KRW (khoảng hơn 30.000.000 VNĐ).</p>
          </li>
          <li>
            <p>- Phiên bản hỗ trợ 4G: 1.569.000 KRW (khoảng hơn 32.000.000 VNĐ).</p>
          </li>
          <li>
            <p>- Phiên bản hỗ trợ 5G: 1.669.000 KRW (khoảng hơn 34.000.000 VNĐ).</p>
          </li>
        </ul>
        <h2>
          <strong>Mua ngay Galaxy Tab S8 Ultra chính hãng giá rẻ tại CellphoneS</strong>
        </h2>
        <p>
          Hiện bạn đã có thể đăng ký nhận những thông tin mới nhất về sản phẩm <strong>Samsung Galaxy Tab S8 Ultra</strong> chính hãng để
          cập nhật thời gian cập bến tại Việt Nam và sở hữu sớm thiết bị ngay hôm nay tại CellphoneS bằng cách liên hệ với CellphoneS qua
          website cellphones.com.vn. Năm 2023, Samsung ra mắt
          <a href="/imall/2" title="Galaxy Tab S9 Ultra" target="_blank">
            <strong>Galaxy Tab S9 Ultra</strong>
          </a>
          với nhiều cải tiến so với S8 Ultra mà có thể quý khách sẽ quan tâm!
        </p>
        <div id="gtx-trans" style={{ position: 'absolute', left: 877, top: 3699 }}>
          <div className="gtx-trans-icon"></div>
        </div>
      </div>
      <div className="max-md:hidden mt-8 text-center">
        <button type="button" onClick={toggle} className="btn-primary btn-outline btn w-[12.5rem] rounded-full">
          Xem thêm
        </button>
      </div>
    </>
  );
};

export default HTMLContent;
