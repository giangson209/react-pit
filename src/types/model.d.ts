export declare namespace Model {
  interface User {
    id: number;
    email: string?;
    name: string?;
    role: any?;
  }
  interface Product {
    id: number;
    /**
     * name of product
     *
     * E.g: `Iphone 13`
     */
    name: string;
    desc: string?;
    slug: string;
    thumbnail: string;

    tags?: string[];

    category_id: number?;
    brand_id: number?;

    sale_expiry: string?;
    installment?: boolean;
  }

  interface Attribute {
    id: number;
    product_id: number;
    name: string;
    value: string;
  }

  interface ProductAttachment {
    id: number;
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
    product_id: number;
  }

  /**
   * Variant of product
   * e.g:
   */
  interface Variant {
    id: number;
    name: string;
    sku: string;
    price: number;
    quantity: number;
    sold: number;
    discount_percentage: number;
    discount_price?: number?;

    /**
     * example `[3,6,9,12]`
     */
    installment_options: number[]; // represents the number of installments available

    product_id: number;
  }

  /**
   * Option of product
   */
  interface Option {
    id: number;
    /**
     * Example: `Storage Capacity` `Color`
     */
    name: string;
    product_id: number;
    default_value: number?;
    is_required: boolean;
  }
  interface OptionValue {
    id: number;
    option_id: number;
    /**
     * Example storage: `128GB` `64GB`
     * Example color: `Blue` `Black`
     */
    value: string;
  }

  interface OptionCombination {
    id: number;
    variant_id: number;
    option_value_id: number;
  }

  interface ProductOption {
    id: number;
    /**
     * Example: `Storage Capacity` `Color`
     */
    name: string;
    product_id: number;
    option_id: number;
    default_value: string?;
    is_required: boolean;
  }

  interface Rating {
    id: number;
    product_id: number;
    rate: number;
  }

  interface Category {
    id: number;
    name: string;
    parent_id: number?;
  }

  interface Brand {
    id: number;
    name: string;
  }

  interface Gift {
    id: number;
    name: string;
    image: string;
    price: number;
    count: number;
  }

  interface DiscountCode {
    id: number;
    code: string;
    name: string;
    image: string;
    is_fix: boolean;
    uses: number;
    max_uses: number;
    max_uses_user: number;
    discount_amount: number;
    minimum_order_amount: number; // Đơn hàng tối thiểu để áp dụng mã giảm giá (đơn vị là VNĐ)
    maximum_discount_amount: number; // Giá trị giảm tối đa (đơn vị là VNĐ)
    expires_at: string;
  }

  // Sim
  interface Sim {
    id: number;
    phone: string;

    sale_expiry: string?;

    price: number;
    discount_price?: number;
    discount_percentage?: number;

    is_vip?: boolean;
  }
  interface PackOfData {
    id: number;
    name: string;
    price: number;
    discount_price?: number;
    price_type: 'month' | 'week' | 'day' | 'year';
    data: number;
    data_type: 'day' | 'week' | 'month' | 'year';
  }

  // Files
  type AttachmentFile = Image | File | Video;
  interface Image {
    id: number;
    type: 'img';
    url: string;
    thumbnail?: string;
  }
  interface File {
    id: number;
    type: 'file';
    url: string;
  }
  interface Video {
    id: number;
    type: 'video';
    url: string;
    thumbnail: string;
  }

  // Comment
  interface Comment {
    id: number;
    user_name: string;
    user_avatar: string;
    user_rating: number;
    content: string | null;
    attachments: AttachmentFile[];

    created_at: string;
    updated_at: string;
  }

  interface Voucher {
    id: number;
    title: string;
    deadline: string;
    img: string;
    logo: string;
    point: number;
    long: string;
  }

  interface VoucherHOT {
    id: number;
    title: string;
    time: string;
    img: string;
    brand: string;
    genre: string;
  }

  interface Short {
    id: number;
    title: string;
    desc: string;
    date: string;
    thumbnail: string;
    source: string;
  }

  //iwow
  interface IzuiCheckin {
    id: number;
    title: string;
    img: string;
    value: number;
    state: number;
  }

  interface IzuiGift {
    id: number;
    title: string;
    img: string;
    logo: string;
    time: string;
  }

  interface INewsCategory {
    path: string;
    name: string;
    routeName: string;
  }
}

export declare namespace Data {
  type ProductDetail = Model.Product & {
    options: Array<Model.Option & { options: Array<Model.OptionValue> }>;
    brand: Model.Brand | null;
    variants: Array<Model.Variant>;
    optionCombinations: Array<Model.OptionCombination>;
    attributes: Array<Model.Attribute>;
    attachments: Array<Model.ProductAttachment>;
    priceRange: { min: number; max: number; discount_min: number; discount_max: number };
  };
  type Product = Model.Product & {
    variant: Model.Variant;
    priceRange: { min: number; max: number; discount_min: number; discount_max: number };
  };
  type Vouchers = { data: Model.Voucher[]; page: number };
  type VoucherDetail = Model.Voucher & {
    typeName: string;
    discount: number;
    require: {
      descHTML: string;
    };
    infomationHTML: string;
    from: string;
  };
  type VouchersHOT = { data: Model.VoucherHOT[]; page: number };
  type Shorts = { data: Model.Short[]; page: number };
  type IzuiCheckinList = { data: Model.IzuiCheckin[] };
  type IzuiCheckinListGift = { data: Model.IzuiGift[] };
}
