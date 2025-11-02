import type { Brand, DeliveryOption, WarrantyClaimStatus, ReturnRequestStatus, OrderStatus } from './types';
import MobileIcon from './components/icons/MobileIcon';

export const BRANDS_DATA: Brand[] = [
  {
    id: 1,
    name: "Apple Parts",
    category: 'Premium',
    rating: 4.9,
    shippingTime: 2,
    icon: MobileIcon,
    components: [
      { id: 101, name: 'iPhone 14 Pro Screen', description: 'Original OEM Super Retina XDR display for the iPhone 14 Pro.', price: 27999, icon: MobileIcon, compatibility: ['iPhone 14 Pro'], warrantyPeriod: '1 Year', specifications: { Type: 'LTPO Super Retina XDR OLED', Size: '6.1 inches', Resolution: '1179 x 2556 pixels' } },
      { id: 102, name: 'iPhone 13 Battery', description: 'High-capacity replacement battery with zero cycles.', price: 7199, icon: MobileIcon, compatibility: ['iPhone 13', 'iPhone 13 Pro'], warrantyPeriod: '6 Months', specifications: { Type: 'Li-Ion', Capacity: '3240 mAh', Voltage: '3.83 V' } },
      { id: 103, name: 'iPhone 12 Camera Module', description: 'Dual-camera system replacement for the main wide and ultra-wide cameras.', price: 10360, icon: MobileIcon, compatibility: ['iPhone 12'], warrantyPeriod: '1 Year', specifications: { Main: '12 MP, f/1.6', UltraWide: '12 MP, f/2.4', Video: '4K@24/30/60fps' } },
      { id: 104, name: 'iPhone 14 Battery', description: 'Genuine 3279mAh replacement battery for the iPhone 14.', price: 7899, icon: MobileIcon, compatibility: ['iPhone 14'], warrantyPeriod: '6 Months', specifications: { Type: 'Li-Ion', Capacity: '3279 mAh', Voltage: '3.83 V' } },
      { id: 105, name: 'iPhone 11 Charging Port', description: 'Lightning connector and microphone assembly replacement.', price: 2899, icon: MobileIcon, compatibility: ['iPhone 11'], warrantyPeriod: '3 Months', specifications: { Connector: 'Lightning', Audio: 'Stereo Microphone included' } },
      { id: 106, name: 'iPhone 13 Back Glass', description: 'Ceramic Shield back glass panel with MagSafe magnets.', price: 4500, icon: MobileIcon, compatibility: ['iPhone 13'], warrantyPeriod: 'Not Applicable', specifications: { Material: 'Ceramic Shield', Features: 'Embedded MagSafe magnet array' } },
      { id: 107, name: 'iPhone SE (2022) Speaker', description: 'Earpiece speaker and sensor assembly.', price: 2500, icon: MobileIcon, compatibility: ['iPhone SE (2022)'], warrantyPeriod: '6 Months', specifications: { Type: 'Earpiece Speaker', Features: 'Proximity sensor assembly' } },
      { id: 108, name: 'iPhone 14 Pro Max Battery', description: 'Genuine 4323mAh replacement battery.', price: 8500, icon: MobileIcon, compatibility: ['iPhone 14 Pro Max'], warrantyPeriod: '6 Months', specifications: { Type: 'Li-Ion', Capacity: '4323 mAh', Voltage: '3.83 V' } },
    ],
  },
  {
    id: 2,
    name: 'Samsung Spares',
    category: 'Premium',
    rating: 4.8,
    shippingTime: 1,
    icon: MobileIcon,
    components: [
      { id: 201, name: 'Galaxy S23 Ultra Screen', description: 'Dynamic AMOLED 2X display with frame assembly.', price: 31199, icon: MobileIcon, compatibility: ['Galaxy S23 Ultra'], warrantyPeriod: '1 Year', specifications: { Type: 'Dynamic AMOLED 2X', Size: '6.8 inches', Resolution: '1440 x 3088 pixels' } },
      { id: 202, name: 'Galaxy S22 Battery', description: 'Genuine 3700mAh replacement battery for the Samsung Galaxy S22.', price: 6040, icon: MobileIcon, compatibility: ['Galaxy S22'], warrantyPeriod: '6 Months', specifications: { Type: 'Li-Ion', Capacity: '3700 mAh', Charging: '25W Wired' } },
      { id: 203, name: 'Galaxy Note 20 Charging Port', description: 'USB-C charging port flex cable replacement.', price: 3679, icon: MobileIcon, compatibility: ['Galaxy Note 20'], warrantyPeriod: '3 Months', specifications: { Connector: 'USB Type-C 3.2', Features: 'OTG Support' } },
      { id: 204, name: 'Galaxy A53 Battery', description: '5000mAh high-capacity battery for the Galaxy A53 5G.', price: 4500, icon: MobileIcon, compatibility: ['Galaxy A53 5G'], warrantyPeriod: '6 Months', specifications: { Type: 'Li-Po', Capacity: '5000 mAh', Charging: '25W Wired' } },
      { id: 205, name: 'Galaxy S21 Camera Module', description: 'Triple camera main module for the Galaxy S21.', price: 11500, icon: MobileIcon, compatibility: ['Galaxy S21'], warrantyPeriod: '1 Year', specifications: { Main: '12 MP, f/1.8', Telephoto: '64 MP, f/2.0', UltraWide: '12 MP, f/2.2' } },
      { id: 206, name: 'Galaxy Z Fold 4 Main Screen', description: '7.6-inch foldable Dynamic AMOLED 2X display.', price: 45000, icon: MobileIcon, compatibility: ['Galaxy Z Fold 4'], warrantyPeriod: '1 Year', specifications: { Type: 'Foldable Dynamic AMOLED 2X', Size: '7.6 inches', Resolution: '1812 x 2176 pixels' } },
      { id: 207, name: 'Galaxy S23 Back Glass', description: 'Gorilla Glass Victus 2 back panel for S23.', price: 3800, icon: MobileIcon, compatibility: ['Galaxy S23'], warrantyPeriod: 'Not Applicable', specifications: { Material: 'Gorilla Glass Victus 2', Finish: 'Matte' } },
      { id: 208, name: 'Galaxy Buds 2 Pro Battery', description: 'Replacement battery for charging case.', price: 2800, icon: MobileIcon, compatibility: ['Galaxy Buds 2 Pro Case'], warrantyPeriod: '3 Months', specifications: { Type: 'Li-Ion', Capacity: '515 mAh' } },
    ],
  },
  {
    id: 3,
    name: 'Google Pixel Parts',
    category: 'OEM',
    rating: 4.7,
    shippingTime: 3,
    icon: MobileIcon,
    components: [
      { id: 301, name: 'Pixel 7 Pro Screen', description: '6.7-inch OLED display assembly with digitizer.', price: 19999, icon: MobileIcon, compatibility: ['Pixel 7 Pro'], warrantyPeriod: '1 Year', specifications: { Type: 'LTPO AMOLED', Size: '6.7 inches', Resolution: '1440 x 3120 pixels' } },
      { id: 302, name: 'Pixel 6a Battery', description: 'Original replacement battery to restore your phone\'s life.', price: 5520, icon: MobileIcon, compatibility: ['Pixel 6a'], warrantyPeriod: '6 Months', specifications: { Type: 'Li-Po', Capacity: '4410 mAh', Charging: '18W Wired' } },
      { id: 303, name: 'Pixel 5 Rear Camera', description: 'Main camera module replacement for the Google Pixel 5.', price: 7960, icon: MobileIcon, compatibility: ['Pixel 5'], warrantyPeriod: '1 Year', specifications: { Main: '12.2 MP, f/1.7', UltraWide: '16 MP, f/2.2' } },
      { id: 304, name: 'Pixel 7 Battery', description: '4355mAh replacement battery for the Google Pixel 7.', price: 5999, icon: MobileIcon, compatibility: ['Pixel 7'], warrantyPeriod: '6 Months', specifications: { Type: 'Li-Ion', Capacity: '4355 mAh', Charging: '20W Wired' } },
      { id: 305, name: 'Pixel 6 Charging Port', description: 'USB-C charging port assembly for the Pixel 6.', price: 3299, icon: MobileIcon, compatibility: ['Pixel 6'], warrantyPeriod: '3 Months', specifications: { Connector: 'USB Type-C 3.1' } },
      { id: 306, name: 'Pixel 7a Speaker', description: 'Bottom-firing stereo speaker module.', price: 2900, icon: MobileIcon, compatibility: ['Pixel 7a'], warrantyPeriod: '6 Months', specifications: { Type: 'Stereo Speakers' } },
      { id: 307, name: 'Pixel 8 Pro Camera Bar Glass', description: 'Replacement glass for the rear camera bar.', price: 2500, icon: MobileIcon, compatibility: ['Pixel 8 Pro'], warrantyPeriod: 'Not Applicable', specifications: { Material: 'Gorilla Glass Victus 2' } },
    ],
  },
  {
    id: 4,
    name: 'OnePlus Components',
    category: 'Mid-Range',
    rating: 4.6,
    shippingTime: 2,
    icon: MobileIcon,
    components: [
      { id: 401, name: 'OnePlus 11 Screen', description: 'Fluid AMOLED display with a 120Hz refresh rate. Includes frame.', price: 22399, icon: MobileIcon, compatibility: ['OnePlus 11'], warrantyPeriod: '1 Year', specifications: { Type: 'LTPO3 Fluid AMOLED', Size: '6.7 inches', Resolution: '1440 x 3216 pixels' } },
      { id: 402, name: 'OnePlus 9 Pro Battery', description: 'High-quality 4500mAh replacement battery.', price: 6800, icon: MobileIcon, compatibility: ['OnePlus 9 Pro'], warrantyPeriod: '6 Months', specifications: { Type: 'Li-Po', Capacity: '4500 mAh', Charging: '65W Wired' } },
      { id: 403, name: 'OnePlus Nord Charging Port', description: 'Replacement charging port and headphone jack assembly.', price: 3199, icon: MobileIcon, compatibility: ['OnePlus Nord'], warrantyPeriod: '3 Months', specifications: { Connector: 'USB Type-C 2.0', Audio: '3.5mm Jack included' } },
      { id: 404, name: 'OnePlus 8T Battery', description: 'Dual-cell 4500mAh battery with Warp Charge 65 support.', price: 5200, icon: MobileIcon, compatibility: ['OnePlus 8T'], warrantyPeriod: '6 Months', specifications: { Type: 'Li-Po', Capacity: '4500 mAh', Charging: '65W Wired' } },
      { id: 405, name: 'OnePlus 10 Pro Camera', description: 'Main camera sensor module developed with Hasselblad.', price: 13500, icon: MobileIcon, compatibility: ['OnePlus 10 Pro'], warrantyPeriod: '1 Year', specifications: { Main: '48 MP, f/1.8', Telephoto: '8 MP, f/2.4', UltraWide: '50 MP, f/2.2' } },
      { id: 406, name: 'OnePlus 11 Back Glass', description: 'Matte frosted glass back panel.', price: 3200, icon: MobileIcon, compatibility: ['OnePlus 11'], warrantyPeriod: 'Not Applicable', specifications: { Material: 'Gorilla Glass 5', Finish: 'Matte' } },
      { id: 407, name: 'OnePlus Nord 2 Speaker', description: 'Stereo speaker assembly for clear audio.', price: 2600, icon: MobileIcon, compatibility: ['OnePlus Nord 2'], warrantyPeriod: '6 Months', specifications: { Type: 'Stereo Speakers' } },
    ],
  },
  {
    id: 5,
    name: "Xiaomi Parts",
    category: 'Value',
    rating: 4.5,
    shippingTime: 2,
    icon: MobileIcon,
    components: [
      { id: 501, name: 'Redmi Note 12 Pro Screen', description: '6.67" FHD+ AMOLED DotDisplay for vibrant colors.', price: 8999, icon: MobileIcon, compatibility: ['Redmi Note 12 Pro'], warrantyPeriod: '1 Year', specifications: { Type: 'AMOLED', Size: '6.67 inches', Resolution: '1080 x 2400 pixels' } },
      { id: 502, name: 'Poco F5 Battery', description: '5000mAh battery to power your gaming sessions.', price: 4299, icon: MobileIcon, compatibility: ['Poco F5'], warrantyPeriod: '6 Months', specifications: { Type: 'Li-Po', Capacity: '5000 mAh', Charging: '67W Wired' } },
      { id: 503, name: 'Xiaomi 13T Camera Module', description: 'Leica professional main camera module.', price: 15500, icon: MobileIcon, compatibility: ['Xiaomi 13T'], warrantyPeriod: '1 Year', specifications: { Main: '50 MP, f/1.9', Telephoto: '50 MP, f/1.9', UltraWide: '12 MP, f/2.2' } },
      { id: 504, name: 'Redmi K20 Pro Battery', description: 'Original BN48 4000mAh replacement battery.', price: 3500, icon: MobileIcon, compatibility: ['Redmi K20 Pro', 'Mi 9T Pro'], warrantyPeriod: '6 Months', specifications: { Type: 'Li-Po', Capacity: '4000 mAh', Charging: '27W Wired' } },
      { id: 505, name: 'Poco X5 Pro Camera', description: '108MP primary camera sensor module.', price: 7800, icon: MobileIcon, compatibility: ['Poco X5 Pro'], warrantyPeriod: '1 Year', specifications: { Main: '108 MP, f/1.9', UltraWide: '8 MP, f/2.2' } },
      { id: 506, name: 'Redmi Note 11 Speaker', description: 'Earpiece and loudspeaker combo.', price: 1800, icon: MobileIcon, compatibility: ['Redmi Note 11'], warrantyPeriod: '6 Months', specifications: { Type: 'Stereo Speakers' } },
    ],
  },
  {
    id: 6,
    name: "Motorola Mobility",
    category: 'Mid-Range',
    rating: 4.4,
    shippingTime: 3,
    icon: MobileIcon,
    components: [
      { id: 601, name: 'Moto G Power (2022) Battery', description: '5000mAh battery for up to 3 days of life.', price: 4800, icon: MobileIcon, compatibility: ['Moto G Power (2022)'], warrantyPeriod: '6 Months', specifications: { Type: 'Li-Po', Capacity: '5000 mAh', Charging: '10W Wired' } },
      { id: 602, name: 'Moto Edge+ (2023) Screen', description: '6.67" pOLED Endless Edge display.', price: 21000, icon: MobileIcon, compatibility: ['Moto Edge+ (2023)'], warrantyPeriod: '1 Year', specifications: { Type: 'OLED', Size: '6.67 inches', Resolution: '1080 x 2400 pixels' } },
      { id: 603, name: 'Moto G Stylus 5G Camera', description: '50MP main camera module with OIS.', price: 6500, icon: MobileIcon, compatibility: ['Moto G Stylus 5G'], warrantyPeriod: '1 Year', specifications: { Main: '50 MP, f/1.8', UltraWide: '8 MP, f/2.2' } },
      { id: 604, name: 'Motorola Razr+ Charging Port', description: 'USB-C port for the foldable flagship.', price: 4100, icon: MobileIcon, compatibility: ['Motorola Razr+'], warrantyPeriod: '3 Months', specifications: { Connector: 'USB Type-C 2.0' } },
    ],
  },
  {
    id: 7,
    name: "Nokia Originals",
    category: 'Value',
    rating: 4.3,
    shippingTime: 4,
    icon: MobileIcon,
    components: [
      { id: 701, name: 'Nokia G50 Screen', description: '6.82" HD+ display assembly.', price: 7500, icon: MobileIcon, compatibility: ['Nokia G50'], warrantyPeriod: '1 Year', specifications: { Type: 'IPS LCD', Size: '6.82 inches', Resolution: '720 x 1560 pixels' } },
      { id: 702, name: 'Nokia XR20 Battery', description: 'Rugged 4630mAh battery for tough conditions.', price: 5100, icon: MobileIcon, compatibility: ['Nokia XR20'], warrantyPeriod: '6 Months', specifications: { Type: 'Li-Po', Capacity: '4630 mAh', Charging: '18W Wired' } },
      { id: 703, name: 'Nokia 8.3 5G Camera', description: 'ZEISS Optics 64MP main camera module.', price: 9200, icon: MobileIcon, compatibility: ['Nokia 8.3 5G'], warrantyPeriod: '1 Year', specifications: { Main: '64 MP, f/1.9', UltraWide: '12 MP, f/2.2' } },
      { id: 704, name: 'Nokia T20 Tablet Speaker', description: 'Stereo speaker for immersive sound.', price: 2200, icon: MobileIcon, compatibility: ['Nokia T20'], warrantyPeriod: '6 Months', specifications: { Type: 'Stereo Speakers' } },
    ],
  },
  {
    id: 8,
    name: "Realme Components",
    category: 'Value',
    rating: 4.5,
    shippingTime: 2,
    icon: MobileIcon,
    components: [
      { id: 801, name: 'Realme GT 2 Pro Screen', description: '2K Super Reality Display with LTPO 2.0.', price: 18500, icon: MobileIcon, compatibility: ['Realme GT 2 Pro'], warrantyPeriod: '1 Year', specifications: { Type: 'LTPO2 AMOLED', Size: '6.7 inches', Resolution: '1440 x 3216 pixels' } },
      { id: 802, name: 'Realme 9 Pro+ Battery', description: '4500mAh battery with 60W SuperDart Charge support.', price: 4800, icon: MobileIcon, compatibility: ['Realme 9 Pro+'], warrantyPeriod: '6 Months', specifications: { Type: 'Li-Po', Capacity: '4500 mAh', Charging: '60W Wired' } },
      { id: 803, name: 'Realme X50 Pro Camera', description: '64MP quad-camera setup module.', price: 8900, icon: MobileIcon, compatibility: ['Realme X50 Pro'], warrantyPeriod: '1 Year', specifications: { Main: '64 MP, f/1.8', Telephoto: '12 MP, f/2.5' } },
      { id: 804, name: 'Realme Buds Air 3 Battery', description: 'Replacement battery for earbuds.', price: 1500, icon: MobileIcon, compatibility: ['Realme Buds Air 3'], warrantyPeriod: '3 Months', specifications: { Type: 'Li-Ion', Capacity: '40 mAh (earbud)' } },
    ],
  },
  {
    id: 9,
    name: "Vivo Spares",
    category: 'Mid-Range',
    rating: 4.6,
    shippingTime: 2,
    icon: MobileIcon,
    components: [
      { id: 901, name: 'Vivo X80 Pro Camera', description: 'ZEISS T* Coating main camera module.', price: 17500, icon: MobileIcon, compatibility: ['Vivo X80 Pro'], warrantyPeriod: '1 Year', specifications: { Main: '50 MP, f/1.6', Gimbal: '8 MP, f/3.4' } },
      { id: 902, name: 'Vivo V25 Screen', description: '6.44" AMOLED display with HDR10+ support.', price: 12500, icon: MobileIcon, compatibility: ['Vivo V25'], warrantyPeriod: '1 Year', specifications: { Type: 'AMOLED', Size: '6.44 inches', Resolution: '1080 x 2404 pixels' } },
      { id: 903, name: 'Vivo iQOO 9T Battery', description: '4700mAh battery with 120W FlashCharge.', price: 6200, icon: MobileIcon, compatibility: ['Vivo iQOO 9T'], warrantyPeriod: '6 Months', specifications: { Type: 'Li-Po', Capacity: '4700 mAh', Charging: '120W Wired' } },
      { id: 904, name: 'Vivo Y75 Back Glass', description: 'Fluorite AG Glass back panel.', price: 2800, icon: MobileIcon, compatibility: ['Vivo Y75'], warrantyPeriod: 'Not Applicable', specifications: { Material: 'Fluorite AG Glass' } },
    ],
  }
];

export const DELIVERY_OPTIONS: DeliveryOption[] = [
    { id: 'standard', name: 'Standard Shipping', days: '5-7 days', cost: 0 },
    { id: 'express', name: 'Express Shipping', days: '2-3 days', cost: 500 },
    { id: 'nextday', name: 'Next-Day Delivery', days: '1 day', cost: 1200 },
];

// FIX: Added ORDER_STATUS_PROGRESSION to be exported.
export const ORDER_STATUS_PROGRESSION: OrderStatus[] = ['Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
export const WARRANTY_STATUS_PROGRESSION: WarrantyClaimStatus[] = ['Pending', 'Approved', 'Shipped'];
export const RETURN_STATUS_PROGRESSION: ReturnRequestStatus[] = ['Pending', 'Approved', 'Received'];