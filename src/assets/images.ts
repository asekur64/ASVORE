import heroFashionEditorial from './images/hero_fashion_editorial_1794457621413.jpg';
import panjabiTraditional from './images/category_panjabi_traditional_1794457622007.jpg';
import mensWatch from './images/category_mens_watch_1794457622556.jpg';
import perfumeLuxury from './images/product_perfume_luxury_1794457622809.jpg';
import mensShirt from './images/category_mens_shirt_1794460199747.jpg';
import mensTshirt from './images/category_mens_tshirt_1794460199784.jpg';
import mensTrouser from './images/category_mens_trouser_1794460201014.jpg';
import leatherBelt from './images/category_leather_belt_1794460201950.jpg';
import leatherWallet from './images/category_leather_wallet_1794460202382.jpg';
import mensSunglasses from './images/category_mens_sunglasses_1794460203074.jpg';

export const IMAGES = {
  heroFashionEditorial,
  panjabiTraditional,
  mensWatch,
  perfumeLuxury,
  mensShirt,
  mensTshirt,
  mensTrouser,
  leatherBelt,
  leatherWallet,
  mensSunglasses,
};

const LEGACY_PATH_MAP: Record<string, string> = {
  '/src/assets/images/hero_fashion_editorial_1794457621413.jpg': heroFashionEditorial,
  '/src/assets/images/category_panjabi_traditional_1794457622007.jpg': panjabiTraditional,
  '/src/assets/images/category_mens_watch_1794457622556.jpg': mensWatch,
  '/src/assets/images/product_perfume_luxury_1794457622809.jpg': perfumeLuxury,
  '/src/assets/images/category_mens_shirt_1794460199747.jpg': mensShirt,
  '/src/assets/images/category_mens_tshirt_1794460199784.jpg': mensTshirt,
  '/src/assets/images/category_mens_trouser_1794460201014.jpg': mensTrouser,
  '/src/assets/images/category_leather_belt_1794460201950.jpg': leatherBelt,
  '/src/assets/images/category_leather_wallet_1794460202382.jpg': leatherWallet,
  '/src/assets/images/category_mens_sunglasses_1794460203074.jpg': mensSunglasses,
};

export function resolveImageUrl(url: string): string {
  if (!url) return heroFashionEditorial;
  if (LEGACY_PATH_MAP[url]) return LEGACY_PATH_MAP[url];
  const fileName = url.split('/').pop();
  if (fileName) {
    const matchKey = Object.keys(LEGACY_PATH_MAP).find(k => k.endsWith(fileName));
    if (matchKey) return LEGACY_PATH_MAP[matchKey];
  }
  return url;
}
