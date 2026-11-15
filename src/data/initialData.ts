import { Product, Coupon, CustomerReview, SiteSettings, Order } from '../types';

export const INITIAL_SETTINGS: SiteSettings = {
  announcementText: {
    en: 'DISCOVER YOUR STYLE | PREMIUM MEN\'S FASHION ACROSS BANGLADESH',
    bn: 'আপনার নিজস্ব স্টাইল খুঁজুন | বাংলাদেশজুড়ে প্রিমিয়াম পুরুষ ফ্যাশন',
  },
  announcementActive: true,
  heroHeadline: {
    en: 'STYLE IS YOUR SIGNATURE.',
    bn: 'স্টাইলই আপনার অনন্য পরিচয়।',
  },
  heroSubtitle: {
    en: 'Discover modern men\'s fashion, timeless essentials, and premium accessories designed for everyday confidence.',
    bn: 'আধুনিক পুরুষের ফ্যাশন, ক্ল্যাসিক পোশাক এবং প্রিমিয়াম এক্সেসরিজ—প্রতিদিনের আত্মবিশ্বাসের নিখুঁত প্রকাশ।',
  },
  deliveryInsideDhaka: 60,
  deliveryOutsideDhaka: 120,
  freeDeliveryThreshold: 2500,
  phone: '+8801815951971',
  email: 'asekurr60@gmail.com',
  whatsappNumber: '+8801815951971',
  showroomAddress: {
    en: 'Shaplamill, Gaibandha Sadar, Gaibandha, Bangladesh.',
    bn: 'শাপলামিল, গাইবান্ধা সদর, গাইবান্ধা, বাংলাদেশ।',
  },
  facebookUrl: 'https://www.facebook.com/profile.php?id=61595394275864',
};

export const INITIAL_PRODUCTS: Product[] = [
  // 1. Panjabi
  {
    id: 'asv-panjabi-01',
    sku: 'ASV-PJB-01',
    name: {
      en: 'Aristocrat Embroidered Semi-Silk Panjabi',
      bn: 'অ্যারিস্টোক্র্যাট এমব্রয়ডারি সেমি-সিল্ক পাঞ্জাবি',
    },
    category: 'Panjabis',
    images: [
      '/src/assets/images/category_panjabi_traditional_1794457622007.jpg',
      '/src/assets/images/hero_fashion_editorial_1794457621413.jpg',
    ],
    description: {
      en: 'Crafted from premium blended semi-silk, this bespoke ivory Panjabi features intricate hand-guided tone-on-tone threadwork along the band collar and placket. Designed for festivals, weddings, and formal evening gatherings.',
      bn: 'প্রিমিয়াম সেমি-সিল্ক ফেব্রিক দ্বারা নির্মিত এই আইভরি পাঞ্জাবিতে রয়েছে নিখুঁত হ্যান্ড-গাইডেড থ্রেডওয়ার্ক কলার ও প্লাকেটে। যেকোনো উৎসব, জমকালো অনুষ্ঠান কিংবা বিশেষ সান্ধ্যকালীন আয়োজনের জন্য আদর্শ।',
    },
    details: {
      en: [
        'Fabric: 80% Mulberry Silk Blend, 20% Fine Combed Cotton',
        'Collar: Mandarin Band with minimal embroidery',
        'Fitting: Modern Slim / Regular comfort fit',
        'Closure: Handcrafted cloth-wrapped buttons',
        'Care: Dry Clean Recommended'
      ],
      bn: [
        'ফেব্রিক: ৮০% তুঁত রেশম ব্লেন্ড, ২০% সুতি সুতা',
        'কলার: সূক্ষ্ম এমব্রয়ডারিসহ ম্যান্ডারিন ব্যান্ড',
        'ফিটিং: মডার্ন রেগুলার/স্লিম কমফোর্ট ফিট',
        'বোতাম: হস্তনির্মিত ক্লথ-র‍্যাপড বাটন',
        'যত্ন: ড্রাই ক্লিন করার পরামর্শ দেওয়া হয়'
      ]
    },
    price: 3450,
    salePrice: 2890,
    stock: 18,
    sizes: ['M (40)', 'L (42)', 'XL (44)', 'XXL (46)'],
    colors: [
      { name: 'Warm Ivory', hex: '#F7F4EE' },
      { name: 'Midnight Charcoal', hex: '#1C1D21' },
      { name: 'Desert Sand', hex: '#D2C3B2' }
    ],
    specifications: {
      'Origin': 'Dhaka & Gaibandha Atelier',
      'Weave': 'Fine Silk-Cotton Jacquard',
      'Length': 'Long Knee Length',
      'Pockets': 'Dual Concealed Side Pockets'
    },
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    isTrending: true,
    isDemo: true,
    rating: 4.9,
    reviewCount: 38,
    createdAt: '2026-03-01T10:00:00Z',
  },
  // 2. Watch
  {
    id: 'asv-watch-01',
    sku: 'ASV-WTC-01',
    name: {
      en: 'Chronos Minimalist Steel Chronograph',
      bn: 'ক্রোনস মিনিমালিস্ট স্টিল ক্রোনোগ্রাফ ঘড়ি',
    },
    category: 'Watches',
    images: [
      '/src/assets/images/category_mens_watch_1794457622556.jpg',
    ],
    description: {
      en: 'Precision Japanese quartz movement housed in a surgical-grade 316L brushed stainless steel case. Features a matte obsidian dial with dual sub-dials, scratch-resistant sapphire crystal glass, and a solid link steel bracelet.',
      bn: 'জাপানিজ প্রেসিশন কোয়ার্টজ মুভমেন্ট এবং ৩১৬এল সার্জিক্যাল-গ্রেড স্টেইনলেস স্টিল কেস। ম্যাট ব্ল্যাক ডায়াল, স্যাফায়ার ক্রিস্টাল গ্লাস এবং ওয়াটার-রেজিস্ট্যান্ট স্ট্রাকচার।',
    },
    details: {
      en: [
        'Case Diameter: 41mm',
        'Thickness: 10.5mm',
        'Glass: Sapphire Crystal with Anti-Reflective Coating',
        'Movement: Miyota Chronograph Quartz',
        'Water Resistance: 5 ATM (50 meters)',
        'Warranty: 1 Year ASVORE International Warranty'
      ],
      bn: [
        'কেস ডায়ামিটার: ৪১ মিমি',
        'গ্লাস: অ্যান্টি-রিফ্লেক্টিভ স্যাফায়ার ক্রিস্টাল',
        'মুভমেন্ট: মিয়োটা ক্রোনোগ্রাফ কোয়ার্টজ',
        'ওয়াটার রেজিস্ট্যান্স: ৫০ মিটার',
        'ওয়ারেন্টি: ১ বছরের অফিশিয়াল ওয়ারেন্টি'
      ]
    },
    price: 4800,
    salePrice: 3950,
    stock: 12,
    colors: [
      { name: 'Brushed Silver / Black', hex: '#B8B8B8' },
      { name: 'All Black Obsidian', hex: '#111111' }
    ],
    specifications: {
      'Movement': 'Japanese Miyota OS10 Quartz',
      'Glass': 'Scratch-Proof Sapphire',
      'Strap Width': '20mm Solid Link',
      'Weight': '138 grams'
    },
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isTrending: true,
    isDemo: true,
    rating: 4.9,
    reviewCount: 42,
    createdAt: '2026-02-15T10:00:00Z',
  },
  // 3. Perfume
  {
    id: 'asv-perfume-01',
    sku: 'ASV-PRF-01',
    name: {
      en: 'ASVORE Noir Oud & Amber Eau de Parfum (100ml)',
      bn: 'অ্যাসভোর নোয়ার উদ অ্যান্ড অ্যাম্বার পারফিউম (১০০ মি.লি.)',
    },
    category: 'Perfumes',
    images: [
      '/src/assets/images/product_perfume_luxury_1794457622809.jpg',
    ],
    description: {
      en: 'An intoxicating masculine statement opening with spicy cardamom and Calabrian bergamot, descending into smoky Cambodian agarwood, roasted tonka bean, and warm ambergris. Exceptional sillage and 14+ hours longevity.',
      bn: 'ক্যালাব্রিয়ান বার্গামট ও এলাচের সতেজতার সাথে স্মোকি উদ, টঙ্কা বিন এবং অ্যাম্বারগ্রিসের সমৃদ্ধ সুবাস। দীর্ঘস্থায়ী ১৪+ ঘণ্টার গভীর ও মোহনীয় প্রিমিয়াম পারফিউম।',
    },
    details: {
      en: [
        'Concentration: Eau de Parfum (24% Oil Concentration)',
        'Top Notes: Italian Bergamot, Cardamom, Pink Pepper',
        'Heart Notes: Cambodian Oud, Smoked Cedar, Patchouli',
        'Base Notes: Ambergris, Madagascar Vanilla, Vetiver',
        'Volume: 100ml / 3.4 FL. OZ.'
      ],
      bn: [
        'কনসেনট্রেশন: ইও দে পারফিউম (২৪% সুগন্ধি তেল)',
        'টপ নোটস: ইতালীয় বার্গামট, এলাচ, পিংক পিপার',
        'হার্ট নোটস: কম্বোডিয়ান উদ, সিডারউড, প্যাচৌলি',
        'বেইজ নোটস: অ্যাম্বারগ্রিস, মাদাগাস্কার ভ্যানিলা, ভেটিভার',
        'পরিমাণ: ১০০ মি.লি.'
      ]
    },
    price: 3600,
    salePrice: 2950,
    stock: 25,
    specifications: {
      'Category': 'Woody Oriental / Amber',
      'Longevity': '12–16 Hours on fabric',
      'Bottle': 'Heavy smoked crystal with magnetic cap',
      'Origin': 'Formulated in Grasse, France'
    },
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    isTrending: true,
    isDemo: true,
    rating: 5.0,
    reviewCount: 56,
    createdAt: '2026-03-05T10:00:00Z',
  },
  // 4. Shirts
  {
    id: 'asv-shirt-01',
    sku: 'ASV-SHR-01',
    name: {
      en: 'Royal Oxford Slim-Fit Formal Shirt',
      bn: 'রয়্যাল অক্সফোর্ড স্লিম-ফিট ফরমাল শার্ট',
    },
    category: 'Shirts',
    images: [
      '/src/assets/images/category_mens_shirt_1794460199747.jpg',
    ],
    description: {
      en: 'Woven with 100% two-ply Egyptian long-staple cotton, this shirt features a crisp semi-spread collar, mother-of-pearl buttons, and wrinkle-resistant basket-weave finish. Perfect for business boardrooms and smart evening dinners.',
      bn: '১০০% ইজিপশিয়ান লং-স্টেপল কটনে তৈরি স্লিম-ফিট শার্ট। প্রিমিয়াম ফিনিশিং, নিখুঁত সেলাই এবং মিটিং বা যেকোনো ফরমাল ইভেন্টের জন্য সেরা চয়েস।',
    },
    details: {
      en: [
        'Fabric: 100% Long-Staple Egyptian Cotton',
        'Weave: 80s Two-Ply Pinpoint Oxford',
        'Collar: Semi-Spread Collar with removable collar stays',
        'Cuffs: Adjustable French beveled barrel cuffs',
        'Buttons: Real Trochus Shell buttons'
      ],
      bn: [
        'ফেব্রিক: ১০০% সুপ্রিম ইজিপশিয়ান কটন',
        'বুনন: পিনপয়েন্ট অক্সফোর্ড',
        'কলার: সেমি-স্প্রেড ফরমাল কলার',
        'ফিটিং: স্লিম কমফোর্ট টেইলরিং'
      ]
    },
    price: 2450,
    salePrice: 1950,
    stock: 30,
    sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)'],
    colors: [
      { name: 'Pure White', hex: '#FFFFFF' },
      { name: 'Sky Celeste', hex: '#D6E4F0' },
      { name: 'Muted Rose', hex: '#E8D3D1' }
    ],
    specifications: {
      'Fit': 'Tailored Slim',
      'Collar Stay': 'Brass stays included',
      'Wash': 'Machine wash cold, easy iron'
    },
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    isTrending: true,
    isDemo: true,
    rating: 4.8,
    reviewCount: 29,
    createdAt: '2026-02-20T10:00:00Z',
  },
  // 5. T-Shirts
  {
    id: 'asv-tshirt-01',
    sku: 'ASV-TEE-01',
    name: {
      en: 'Signature Supima Heavyweight Minimalist Tee',
      bn: 'সিগনেচার সুপিমা হেভিওয়েট মিনিমালিস্ট টি-শার্ট',
    },
    category: 'T-Shirts',
    images: [
      '/src/assets/images/category_mens_tshirt_1794460199784.jpg',
    ],
    description: {
      en: '260 GSM custom-knit American Supima cotton. Offers an elevated drape, structured neckline that never sags, and an ultra-soft peached texture. Minimal tonal embroidered ASVORE monogram on hem.',
      bn: '২৬০ জিএসএম হেভিওয়েট সুপিমা কটন। মজবুত ও মার্জিত কলার, মসৃণ ফিনিশিং এবং প্রতিদিনের ক্যাজুয়াল পরিধানের জন্য অত্যন্ত আরামদায়ক।',
    },
    details: {
      en: [
        'Weight: 260 GSM Heavyweight Premium Jersey',
        'Yarn: 100% Combed Compact Supima Cotton',
        'Neckline: 1x1 Heavy Ribbed Crewneck (Antisag)',
        'Hem: Subtle tone-on-tone embroidered monogram'
      ],
      bn: [
        'ওজন: ২৬০ জিএসএম প্রিমিয়াম জার্সি',
        'সুতা: ১০০% কম্বড সুপিমা কটন',
        'কলার: হেভি রিবড ক্রু-নেক',
        'ফিট: ড্রপ-শোল্ডার রিল্যাক্সড ফিট'
      ]
    },
    price: 1250,
    salePrice: 950,
    stock: 45,
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Pitch Black', hex: '#111111' },
      { name: 'Chalk White', hex: '#F5F5F3' },
      { name: 'Vintage Olive', hex: '#4B5320' },
      { name: 'Mocha Tan', hex: '#8C705F' }
    ],
    specifications: {
      'Pre-shrunk': 'Yes, bio-washed twice',
      'Cut': 'Modern Relaxed Boxy Fit'
    },
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    isTrending: true,
    isDemo: true,
    rating: 4.9,
    reviewCount: 64,
    createdAt: '2026-03-02T10:00:00Z',
  },
  // 6. Trousers
  {
    id: 'asv-trouser-01',
    sku: 'ASV-TRS-01',
    name: {
      en: 'Tailored Pleated Gurkha Smart Trouser',
      bn: 'টেইলরড প্লিটেড গুর্খা স্মার্ট ট্রাউজার',
    },
    category: 'Trousers',
    images: [
      '/src/assets/images/category_mens_trouser_1794460201014.jpg',
    ],
    description: {
      en: 'A revival of classical sartorial craftsmanship. High-rise silhouette with adjustable side-buckles (Gurkha waistband), double inward pleats, and a clean tapered hem. Woven in breathable wool-touch stretch gabardine.',
      bn: 'ক্ল্যাসিক্যাল গুর্খা স্টাইলের হাই-রাইজ ট্রাউজার। সাইড বাকল এডজাস্টমেন্ট, মার্জিত ডাবল প্লিট এবং দীর্ঘক্ষণ স্বাচ্ছন্দ্যময় চলাচলের জন্য স্ট্রেচ গ্যাবার্ডিন ফেব্রিক।',
    },
    details: {
      en: [
        'Waistband: Extended Gurkha waistband with brass buckles',
        'Pleats: Double inward reverse pleats',
        'Fabric: 68% Poly, 28% Rayon Viscose, 4% Spandex',
        'Pockets: Slanted side pockets and double welt back pockets'
      ],
      bn: [
        'কোমর: এডজাস্টেবল গুর্খা বেল্টলেস বাকল',
        'প্লিট: ডাবল ফরমাল প্লিট',
        'ফেব্রিক: প্রিমিয়াম ভিসকোস ও গ্যাবার্ডিন ব্লেন্ড',
        'ফিট: ট্যাপার্ড হাই-রাইজ'
      ]
    },
    price: 2850,
    salePrice: 2350,
    stock: 22,
    sizes: ['30', '32', '34', '36', '38'],
    colors: [
      { name: 'Charcoal Grey', hex: '#2C2E33' },
      { name: 'Camel Tan', hex: '#C19A6B' },
      { name: 'Navy Blue', hex: '#1B263B' }
    ],
    specifications: {
      'Rise': 'High Rise (11.5 inches)',
      'Leg Opening': '14.5 inch tailored cuff'
    },
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    isTrending: true,
    isDemo: true,
    rating: 4.8,
    reviewCount: 19,
    createdAt: '2026-01-28T10:00:00Z',
  },
  // 7. Belts
  {
    id: 'asv-belt-01',
    sku: 'ASV-BLT-01',
    name: {
      en: 'Full-Grain Italian Leather Reversible Belt',
      bn: 'ফুল-গ্রেইন লেদার রিভার্সিবল বেল্ট',
    },
    category: 'Belts',
    images: [
      '/src/assets/images/category_leather_belt_1794460201950.jpg',
    ],
    description: {
      en: 'Dual-tone reversible belt crafted from 100% full-grain vegetable-tanned leather. Features a rotating brushed titanium buckle allowing effortless switching between Classic Black and Warm Cognac Brown.',
      bn: '১০০% জেনুইন ফুল-গ্রেইন লেদারের তৈরি ডুয়াল-টোন বেল্ট। রোটেটিং বাকল দিয়ে এক পলকেই ব্ল্যাক থেকে ব্রাউন কালারে পরিবর্তনযোগ্য।',
    },
    details: {
      en: [
        'Leather: 100% Full-Grain Vegetable Tanned Cowhide',
        'Buckle: Rotatable Solid Brass with Brushed Gunmetal finish',
        'Width: 35mm (Standard formal and smart-casual width)',
        'Versatility: 2-in-1 reversible design (Black / Cognac Brown)'
      ],
      bn: [
        'চামড়া: ১০০% জেনুইন ভেজিটেবল ট্যানড কাওহাইড',
        'বাকল: রোটেটেবল সলিড ব্রাশড গানমেটাল বাকল',
        'প্রস্থ: ৩৫ মিমি'
      ]
    },
    price: 1850,
    salePrice: 1450,
    stock: 35,
    sizes: ['32', '34', '36', '38', '40'],
    colors: [
      { name: 'Black / Cognac Dual', hex: '#2B1B17' }
    ],
    specifications: {
      'Leather Origin': 'Tuscany Certified Leather',
      'Edge': 'Hand-beveled and burnished'
    },
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    isTrending: false,
    isDemo: true,
    rating: 4.7,
    reviewCount: 15,
    createdAt: '2026-02-10T10:00:00Z',
  },
  // 8. Wallets
  {
    id: 'asv-wallet-01',
    sku: 'ASV-WLT-01',
    name: {
      en: 'Slim Bifold RFID-Protected Leather Wallet',
      bn: 'স্লিম বাইফোল্ড আরএফআইডি প্রোটেক্টেড লেদার ওয়ালেট',
    },
    category: 'Wallets',
    images: [
      '/src/assets/images/category_leather_wallet_1794460202382.jpg',
    ],
    description: {
      en: 'Ultra-thin profile engineered to eliminate pocket bulge. Holds up to 10 cards and flat currency notes with certified RFID-blocking inner lining to protect against electronic skimming.',
      bn: 'পাতলা ও সহজে পকেটে বহনযোগ্য স্লিম বাইফোল্ড ওয়ালেট। ১০টি কার্ড ও ক্যাশ রাখার পর্যাপ্ত স্লট এবং আরএফআইডি সিকিউরিটি প্রোটেকশন।',
    },
    details: {
      en: [
        'Capacity: 8 dedicated card slots + 2 hidden pockets + 1 cash divider',
        'Security: Certified RFID-blocking electromagnetic mesh',
        'Material: Top-Grain Nappa Leather with waxed hand-stitching',
        'Dimensions: 11cm x 8.5cm x 0.9cm'
      ],
      bn: [
        'ধারণক্ষমতা: ৮টি কার্ড স্লট + ২টি হিডেন পকেট + ক্যাশ চেম্বার',
        'নিরাপত্তা: আরএফআইডি ব্লকিং লেয়ার',
        'উপাদান: টপ-গ্রেইন নাপ্পা চামড়া'
      ]
    },
    price: 1650,
    salePrice: 1250,
    stock: 28,
    colors: [
      { name: 'Onyx Black', hex: '#1C1C1C' },
      { name: 'Espresso Brown', hex: '#3E2723' }
    ],
    specifications: {
      'Warranty': '2-Year Craftsmanship Guarantee',
      'Weight': '55 grams'
    },
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    isTrending: true,
    isDemo: true,
    rating: 4.9,
    reviewCount: 33,
    createdAt: '2026-01-15T10:00:00Z',
  },
  // 9. Sunglasses
  {
    id: 'asv-sunglasses-01',
    sku: 'ASV-SNG-01',
    name: {
      en: 'Aviator Acetate Polarized Sunglasses',
      bn: 'অ্যাভিয়েটর অ্যাসিটেট পোলারাইজড সানগ্লাস',
    },
    category: 'Sunglasses',
    images: [
      '/src/assets/images/category_mens_sunglasses_1794460203074.jpg',
    ],
    description: {
      en: 'Re-engineered aviator silhouette handcrafted from Mazzucchelli Italian cellulose acetate. Features TAC polarized lenses with 100% UV400 ultraviolet protection and reinforced 5-barrel hinges.',
      bn: 'হস্তনির্মিত প্রিমিয়াম সেলুলোজ অ্যাসিটেট ফ্রেম এবং টিএসি পোলারাইজড লেন্স। ১০০% ইউভি৪০০ সুরক্ষা এবং স্টাইলিশ অ্যাভিয়েটর লুক।',
    },
    details: {
      en: [
        'Lens: Triacetate Cellulose (TAC) Polarized with AR Coating',
        'Protection: UV400 (Blocks 100% UVA & UVB)',
        'Frame: Custom Tortoiseshell Acetate with wire-core temples',
        'Includes: Hard leather travel case and microfiber cloth'
      ],
      bn: [
        'লেন্স: পোলারাইজড ইউভি৪০০ প্রটেকশন',
        'ফ্রেম: হস্তনির্মিত ইতালিয়ান অ্যাসিটেট',
        'সাথে থাকবে: লেদার ট্রাভেল কেস ও ক্লিনিং ক্লথ'
      ]
    },
    price: 2650,
    salePrice: 2150,
    stock: 14,
    colors: [
      { name: 'Amber Tortoise', hex: '#6D4C41' },
      { name: 'Midnight Smoke', hex: '#212121' }
    ],
    specifications: {
      'Bridge Width': '18mm',
      'Lens Width': '54mm',
      'Temple Length': '145mm'
    },
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    isTrending: true,
    isDemo: true,
    rating: 4.8,
    reviewCount: 22,
    createdAt: '2026-02-25T10:00:00Z',
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'cp-01',
    code: 'ASVORE10',
    type: 'percentage',
    value: 10,
    minSpend: 1500,
    maxDiscount: 500,
    expiryDate: '2026-12-31',
    isActive: true,
    usageCount: 142,
  },
  {
    id: 'cp-02',
    code: 'FIRSTBUY',
    type: 'fixed',
    value: 200,
    minSpend: 1000,
    expiryDate: '2026-12-31',
    isActive: true,
    usageCount: 88,
  },
  {
    id: 'cp-03',
    code: 'EIDVIP',
    type: 'percentage',
    value: 15,
    minSpend: 3000,
    maxDiscount: 1000,
    expiryDate: '2026-08-31',
    isActive: true,
    usageCount: 65,
  }
];

export const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-01',
    productId: 'asv-panjabi-01',
    customerName: 'Tanvir Hossain',
    rating: 5,
    comment: 'The quality of this semi-silk Panjabi surpassed my expectations. The subtle embroidery on the collar is top notch. Wore it to an event in Gulshan and received endless compliments.',
    date: '2026-03-04',
    isApproved: true,
    verifiedPurchase: true,
  },
  {
    id: 'rev-02',
    productId: 'asv-perfume-01',
    customerName: 'Shakil Ahmed',
    rating: 5,
    comment: 'Noir Oud smells exceptionally rich and sophisticated. It easily lasts throughout an entire working day in Dhaka humidity. A true luxury scent at an accessible price.',
    date: '2026-03-07',
    isApproved: true,
    verifiedPurchase: true,
  },
  {
    id: 'rev-03',
    productId: 'asv-watch-01',
    customerName: 'Mahmudur Rahman',
    rating: 5,
    comment: 'Solid weight, flawless brushed steel finish, and clear sapphire crystal. Exactly what I was looking for. Fast delivery to Uttara within 24 hours.',
    date: '2026-02-28',
    isApproved: true,
    verifiedPurchase: true,
  },
  {
    id: 'rev-04',
    productId: 'asv-tshirt-01',
    customerName: 'Farhan Kabir',
    rating: 5,
    comment: 'Best heavyweight t-shirt in Bangladesh hands down. Collar does not stretch out after washing and the fabric feels substantial. Buying 2 more colors.',
    date: '2026-03-05',
    isApproved: true,
    verifiedPurchase: true,
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'ASV-8942',
    createdAt: '2026-03-10T14:32:00Z',
    customer: {
      fullName: 'Abrar Chowdhury',
      phone: '01712345678',
      email: 'abrar.c@example.com',
      division: 'Dhaka',
      district: 'Dhaka',
      upazila: 'Gulshan-2',
      address: 'House 14, Road 71, Gulshan 2, Dhaka',
      notes: 'Please call before arriving.',
    },
    items: [
      {
        id: 'asv-panjabi-01-L',
        productId: 'asv-panjabi-01',
        name: {
          en: 'Aristocrat Embroidered Semi-Silk Panjabi',
          bn: 'অ্যারিস্টোক্র্যাট এমব্রয়ডারি সেমি-সিল্ক পাঞ্জাবি',
        },
        category: 'Panjabis',
        image: '/src/assets/images/category_panjabi_traditional_1794457622007.jpg',
        price: 2890,
        size: 'L (42)',
        color: 'Warm Ivory',
        quantity: 1,
        maxStock: 18,
      }
    ],
    subtotal: 2890,
    discount: 0,
    deliveryCharge: 60,
    total: 2950,
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Pending',
    status: 'Shipped',
    trackingNumber: 'STE-DK-90412',
    statusHistory: [
      { status: 'Order Placed', timestamp: '2026-03-10T14:32:00Z', note: 'Order placed by customer via Cash on Delivery' },
      { status: 'Order Confirmed', timestamp: '2026-03-10T15:10:00Z', note: 'Order confirmed by ASVORE fulfillment team' },
      { status: 'Processing', timestamp: '2026-03-10T17:00:00Z', note: 'Quality inspection passed, packed in luxury box' },
      { status: 'Shipped', timestamp: '2026-03-11T09:30:00Z', note: 'Handed over to Steadfast Courier (Tracking: STE-DK-90412)' }
    ]
  },
  {
    id: 'ord-102',
    orderNumber: 'ASV-8919',
    createdAt: '2026-03-08T11:15:00Z',
    customer: {
      fullName: 'Zubair Al-Mamun',
      phone: '01815951971',
      email: 'zubair@example.com',
      division: 'Rangpur',
      district: 'Gaibandha',
      upazila: 'Gaibandha Sadar',
      address: 'Near Shaplamill, Gaibandha Sadar, Gaibandha',
    },
    items: [
      {
        id: 'asv-perfume-01-std',
        productId: 'asv-perfume-01',
        name: {
          en: 'ASVORE Noir Oud & Amber Eau de Parfum (100ml)',
          bn: 'অ্যাসভোর নোয়ার উদ অ্যান্ড অ্যাম্বার পারফিউম (১০০ মি.লি.)',
        },
        category: 'Perfumes',
        image: '/src/assets/images/product_perfume_luxury_1794457622809.jpg',
        price: 2950,
        quantity: 1,
        maxStock: 25,
      }
    ],
    subtotal: 2950,
    discount: 200,
    couponCode: 'FIRSTBUY',
    deliveryCharge: 120,
    total: 2870,
    paymentMethod: 'bKash',
    paymentStatus: 'Paid',
    status: 'Delivered',
    trackingNumber: 'RED-GB-11029',
    statusHistory: [
      { status: 'Order Placed', timestamp: '2026-03-08T11:15:00Z', note: 'Order placed with bKash TrxID BK99283921' },
      { status: 'Order Confirmed', timestamp: '2026-03-08T11:45:00Z', note: 'Payment verified and confirmed' },
      { status: 'Processing', timestamp: '2026-03-08T14:00:00Z', note: 'Fragrance packed in protective bubble wrap' },
      { status: 'Shipped', timestamp: '2026-03-09T08:00:00Z', note: 'Dispatched to Gaibandha hub' },
      { status: 'Out for Delivery', timestamp: '2026-03-09T14:30:00Z', note: 'Delivery agent en route' },
      { status: 'Delivered', timestamp: '2026-03-09T16:45:00Z', note: 'Successfully delivered to customer' }
    ]
  }
];
