import { Room, DiningVenue, SanctuaryExperience, SeasonalOffer, GalleryPhoto } from '../types/hotel';

export const HOTEL_DETAILS = {
  name: "FOUNTANT HOTEL & BOTANICAL SANCTUARY",
  brandName: "FOUNTANT",
  tagline: "Thoughtfully designed spaces for extraordinary stays.",
  address: "144 Royal Palm Boulevard, Seaside Enclave",
  phone: "+1 (800) 843-3686",
  email: "reservations@founthanthotel.com",
  valetArrival: "East Gate Portico",
  helipad: "Grid B-4 (Coastal Coordinates 34.0259° N, 118.7798° W)",
  checkInTime: "15:00",
  checkOutTime: "12:00",
};

export const ROOMS_DATA: Room[] = [
  {
    id: "deluxe-room",
    slug: "deluxe-room",
    name: "Deluxe Room",
    refCode: "FL-102",
    pavilion: "Pavilion 01",
    category: "deluxe",
    tag: "Botanical Garden View",
    tagColor: "bg-[#001d0e] text-[#ffffff]",
    pricePerNight: 450,
    specs: {
      areaM2: 45,
      areaSqFt: 484,
      bed: "King",
      maxGuests: 2,
      aspect: "Private Courtyard",
      level: "Enclave Level 02 • West Courtyard",
    },
    shortDescription: "An idyllic sanctuary anchored by tranquil botanical vistas. Designed with unvarnished white oak, handmade ceramic vessels, and an opulent Italian marble ensuite with rain bath.",
    longDescription: "Conceived as an antidote to urban sensory overload, the Deluxe Room pairs raw tactile honesty with restrained European classicism. Honed Italian limestone floors are tempered with hand-knotted New Zealand wool rugs, while natural slaked-lime plaster walls gently capture the passage of daylight. The centerpiece custom king bed is enveloped in 600-thread-count bespoke Italian percale linens, paired with dual-density down pillows and an acoustically padded upholstered headboard anchored directly into solid fluted white oak. Acoustic insulation guarantees near-complete silence from the exterior world.",
    amenities: [
      "Marble Ensuite",
      "Artisan Coffee Press",
      "High-Speed Wi-Fi 6",
      "Linen Bathrobes",
      "Silent Radiant Subfloor Heating",
      "Concealed 55-inch 4K Display",
      "Artisanal Cellar Bar",
      "Apothecary Bath Flasks by Le Labo"
    ],
    keyAmenities: [
      "Ultra-Speed Wi-Fi 6 (Dedicated fiber node)",
      "Multi-Zone Radiant Climate Control",
      "55\" Concealed 4K Display behind linen millwork",
      "Artisanal Cellar Bar with biodynamic wines",
      "Bespoke Nespresso Atelier & Mariage Frères teas",
      "Diptyque & Le Labo Santal 33 Bath Elixirs",
      "Architectural Chamber Safe with internal charging",
      "24/7 White-Glove Butler & Chamber Dining"
    ],
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlW9YlAOZza9EXnrvsL76okQsSh-8gmGE-TBE2UXprVO2Mv-c3nZu-z5jHocrN0mG5yLQOMv6Ys9lp3wYzcW_LL0dHDdiMZ-6P27RV3m7dV2ZOvw_sTDB6aleDfGzuXsm0fgzAjTJ0dscqFA97pz16VVoU673SHfyXWH-4fBAqQYmyz2NdTt0sYhlJGMPqoJ6ojhhP41e41Qt52SUxMIA5AeqHnmZQYiQmGpGBmvCif27RMqpJp3KI",
    galleryImages: [
      {
        id: "view-1",
        title: "Master Bedstead & Courtyard Aspect",
        caption: "Master Bedstead & Courtyard Aspect",
        category: "01 Bedroom",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRLDgQJlvXO8WG5jaoSgNawVa0hccz3K3mrVeLZgfvinwTkJ-1nQO5ebpM_XiKa-vnuIV6MgNZ14vbXwiNUIS-Ud36KVDUD1eEw_cQ02a1XT_ykxDGg8kAQbJ2gYFh6pG3msrdstgegtgv90q5jPWFP1rUlLuOi84Vvw5fn_wZhZuW8gPRidTU15Mm6cHPb18LZyEuyRfyWaHbjqEmTgEz6EAQFwDCGGwjB_Nomr62eCLKwyGxe-Tl"
      },
      {
        id: "view-2",
        title: "Arabescato Honed Marble Bath & Soaking Tub",
        caption: "Arabescato Honed Marble Bath & Soaking Tub",
        category: "02 Marble Bath",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFyIalMhuVJqj5c_JQ16Bo6SCqFM3pfwPIsJTxYjEr60pS0xZAb0VgSz5lyPNZzJ2wXvIUuxzMiirp_yWE9dxlFBWG6o2iDTtvkSmkqCWEnUWPABXBfbFn0kv8a7TBKLIX54TdPZU9muuE9TIPwbbBLwRxS8v1rRwWPa4MK05U7ciY0xfyYXETUT2rF8RjkX8mM4ChjPaYmjIflmHzdQQ5znZ4PhK0frpdsybPp2-vdmnySyOLvKUT"
      },
      {
        id: "view-3",
        title: "Private Sunlit Courtyard Loggia",
        caption: "Private Sunlit Courtyard Loggia",
        category: "03 Terrace",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAICZ_GbXtFo_uvzhERRUiZGRdsrjbbcf_0N7oWBiNmxZaIkzmyke7HqEL6ZwSc9cwNONlNGcrNHMIN5kfxD2MXwf3MiJ_HOneG2l6wZtdvI3Jqd9kEiFyIYoszdLxzSi5U-shGq7q6e0RINLFc1q1o2XkML05YzsAyaRkzEVE7E__Iaclf-gHY-UwyT13ycNX2XmcZXf4BHa4adHjOsCIDbJwwdMmzHB5fpLke6X2MqwpO--v1BpVw"
      },
      {
        id: "view-4",
        title: "Intimate Reading Nook & Artisanal Salon",
        caption: "Intimate Reading Nook & Artisanal Salon",
        category: "04 Lounge Nook",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXzIQfO0BIvQDxMtxVv1BXZJI9g_l2hyir_sHAKpXi7PJAy4eSRDp4nLoNyOFt9j2eU8cdt--Top_vBaTKJZ-lhEtStDkO1JwQNCcoq_BmuB4uq1oy_aRvx9pb8ZWDD0BgqS82acd7q8rybDtTXkXmuLT9LpvNzlDwHqaiB0erAGJ3xa_CLagzBVKGb_h4SDXydnBKijh7vriwySe1h3s7_K6KRj01ePs5QazKH3zPdrL5CMvKWc6J"
      }
    ],
    highlights: [
      {
        icon: "volume_off",
        title: "Acoustic Seclusion",
        description: "Triple-glazed French casement windows ensuring complete serenity below 24dB."
      },
      {
        icon: "wb_incandescent",
        title: "Circadian Illumination",
        description: "Warm dimming architectural LED fixtures responding gently to seasonal biorhythms."
      },
      {
        icon: "bathtub",
        title: "Deep Stone Soaking",
        description: "Monolithic freestanding tub carved from a single block of Arabescato marble."
      }
    ],
    rating: 4.97,
    reviewCount: 68
  },
  {
    id: "premium-room",
    slug: "premium-room-with-balcony",
    name: "Premium Room with Balcony",
    refCode: "FL-208",
    pavilion: "Pavilion 02",
    category: "deluxe",
    tag: "Courtyard Fountain View",
    tagColor: "bg-[#775a19] text-[#ffffff]",
    pricePerNight: 580,
    specs: {
      areaM2: 55,
      areaSqFt: 624,
      bed: "King",
      maxGuests: 2,
      aspect: "Panoramic Fountain & Garden",
      level: "Enclave Level 03 • Fountain Terrace",
    },
    shortDescription: "Expansive, light-filled proportions paired with a private wrought iron balcony gazing onto FOUNTANT’s historic architectural fountain. Includes afternoon tea service on the terrace.",
    longDescription: "Bathed in warm golden-hour illumination, the Premium Room with Balcony honors the estate’s 19th-century architecture. French double doors open onto a private stone loggia complete with bespoke teak loungers and lush potted citrus trees. The bath features an open-concept travertine double vanity and an oversized monsoon walk-in shower with therapeutic water infusions.",
    amenities: [
      "Private Balcony",
      "Courtyard Fountain",
      "Walk-in Wardrobe",
      "Aromatherapy Turndown",
      "Travertine Double Vanity",
      "Artisan Teak Seating",
      "Afternoon Tea Ceremony"
    ],
    keyAmenities: [
      "Private Wrought Iron Fountain Balcony",
      "Afternoon Herbal Tea Ceremony on Terrace",
      "Walk-In Custom Cedar Wardrobe",
      "Aromatherapy Evening Turndown Service",
      "Travertine Double Vanity with Rain Shower",
      "High-Fidelity Acoustic Chamber Audio",
      "Complimentary Valet Garment Pressing"
    ],
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVWDnHGpcmAZdQRsivVGC_moggY8ydWzaQFhRwuw-09vIVk0tfs2hFlOWWkW5HO8V7_5kzHZtJfPqEkQhTlwcxKHGT_aWk2NAVa8eyFJknOINXZaw8bXeaCP44MwwGku_-dTXfYhkUYZ7-FLFlnV0-CEs1fWlH8vbe70_wq7Egs88x5jlg40Kvx1IM1vxCmdmhRQxgPTLGVmY22csLQVaCO4RZ39dsjcXVim6T4lxlm47japq_j_cF",
    galleryImages: [
      {
        id: "p-1",
        title: "Fountain Facing Loggia & Bedstead",
        caption: "Private Loggia over Ancient Fountain Courtyard",
        category: "01 Bedroom",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVWDnHGpcmAZdQRsivVGC_moggY8ydWzaQFhRwuw-09vIVk0tfs2hFlOWWkW5HO8V7_5kzHZtJfPqEkQhTlwcxKHGT_aWk2NAVa8eyFJknOINXZaw8bXeaCP44MwwGku_-dTXfYhkUYZ7-FLFlnV0-CEs1fWlH8vbe70_wq7Egs88x5jlg40Kvx1IM1vxCmdmhRQxgPTLGVmY22csLQVaCO4RZ39dsjcXVim6T4lxlm47japq_j_cF"
      },
      {
        id: "p-2",
        title: "Travertine Bath Suite",
        caption: "Double Travertine Vanity with Rain Shower",
        category: "02 Bath",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCYe4KnBXE8GQS9Hp-h0Y9huAsZvKHNGxLJcth2NDVvVOOpzTuTGg1WDTi_HHfLpMz34i0OVPa3e6vZRAPGiAhTQQesjpP_MzutJz6GrytebufDl9HENr4y9D8MYjKtuzdMLqIgNEGfKJaTRVodocMPlwaw1br1zXh5b6F1n3t5DXrcU79OVDeawWefuheTBkwlBkx3MPvohcZDHiW9ONDL7lCu-ATNcMz3dHoEN-UiUflu75Lb6SB"
      },
      {
        id: "p-3",
        title: "Terrace Sunset Lounge",
        caption: "Teak armchairs with courtyard perspective",
        category: "03 Balcony",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAICZ_GbXtFo_uvzhERRUiZGRdsrjbbcf_0N7oWBiNmxZaIkzmyke7HqEL6ZwSc9cwNONlNGcrNHMIN5kfxD2MXwf3MiJ_HOneG2l6wZtdvI3Jqd9kEiFyIYoszdLxzSi5U-shGq7q6e0RINLFc1q1o2XkML05YzsAyaRkzEVE7E__Iaclf-gHY-UwyT13ycNX2XmcZXf4BHa4adHjOsCIDbJwwdMmzHB5fpLke6X2MqwpO--v1BpVw"
      },
      {
        id: "p-4",
        title: "Writing Bureau",
        caption: "Artisanal oak desk with stationery portfolio",
        category: "04 Salon",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXzIQfO0BIvQDxMtxVv1BXZJI9g_l2hyir_sHAKpXi7PJAy4eSRDp4nLoNyOFt9j2eU8cdt--Top_vBaTKJZ-lhEtStDkO1JwQNCcoq_BmuB4uq1oy_aRvx9pb8ZWDD0BgqS82acd7q8rybDtTXkXmuLT9LpvNzlDwHqaiB0erAGJ3xa_CLagzBVKGb_h4SDXydnBKijh7vriwySe1h3s7_K6KRj01ePs5QazKH3zPdrL5CMvKWc6J"
      }
    ],
    highlights: [
      {
        icon: "balcony",
        title: "Private Stone Loggia",
        description: "Direct view of the 19th-century bronze fountain with quiet morning sunlight."
      },
      {
        icon: "local_cafe",
        title: "Bespoke Tea Ceremony",
        description: "Hand-poured single estate teas served daily on your private balcony."
      },
      {
        icon: "spa",
        title: "Aromatherapy Nightfall",
        description: "Essential organic oils diffused prior to sleep to cultivate deep restorative rest."
      }
    ],
    rating: 4.98,
    reviewCount: 92
  },
  {
    id: "executive-panorama",
    slug: "executive-panorama-room",
    name: "Executive Panorama Room",
    refCode: "FL-704",
    pavilion: "Tower Floors",
    category: "executive",
    tag: "High Floor · Skyline Panorama",
    tagColor: "bg-[#1b1714] text-[#ffffff]",
    pricePerNight: 750,
    specs: {
      areaM2: 70,
      areaSqFt: 775,
      bed: "King + Daybed",
      maxGuests: 3,
      aspect: "Coastal Horizon & Skyline",
      level: "Tower Enclave • Level 07",
    },
    shortDescription: "Tailored for creative professionals and elevated stays. Elevated above the 7th floor, presenting sweeping coastal horizons, custom acoustic isolation, and dedicated lounge privileges.",
    longDescription: "A serene studio aerie high above the tree canopies. Designed with a walnut library bureau, bespoke leather lounge chairs, and wall-to-wall panoramic glass looking toward the horizon. Resident guests enjoy uninterrupted access to the 8th-floor Sky Lounge, evening aperitivo tastings, and private concierge service.",
    amenities: [
      "Sky Lounge Access",
      "Evening Apertif Service",
      "Dyson Supersonic Care",
      "Bespoke Library",
      "Dual Terraces",
      "Private Butler Call"
    ],
    keyAmenities: [
      "Access to the Private 8th-Floor Sky Lounge",
      "Complimentary Evening Apertif & Canapés",
      "Dyson Supersonic Care Suite in Vanity",
      "Curated Architectural & Botanical Library",
      "Ergonomic Solid Walnut Executive Study Desk",
      "Nespresso Vertuo Atelier with Reserve Pods",
      "Dedicated Butler Line & Fast-Track Check-In"
    ],
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuC63NCy9IHIiAwHri-24jNecWSrSLoNNAKPqzdQqlU53D4oq_zJZCZIw50TsThos2nvXtz9g0ySMcSs6b55ykQpnAzSOfyYbeVq18eUNzhysNxzCtTDk4rhm5rv8kD4xTJf4-Dd6WrnyhjVT3UTQJrc0ntA_LM5xBo1C8OJO34ScJu7ASXZkhVYDOsVUqiANB7Cw6XCbXKXECStC6YKEO7xgXESZe_XMBpqmw0ZY4W3ah2V4McE3L5m",
    galleryImages: [
      {
        id: "e-1",
        title: "Executive Bedstead & Sunset Skyline",
        caption: "Panoramic Floor-to-Ceiling Windows over Coastline",
        category: "01 Chamber",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC63NCy9IHIiAwHri-24jNecWSrSLoNNAKPqzdQqlU53D4oq_zJZCZIw50TsThos2nvXtz9g0ySMcSs6b55ykQpnAzSOfyYbeVq18eUNzhysNxzCtTDk4rhm5rv8kD4xTJf4-Dd6WrnyhjVT3UTQJrc0ntA_LM5xBo1C8OJO34ScJu7ASXZkhVYDOsVUqiANB7Cw6XCbXKXECStC6YKEO7xgXESZe_XMBpqmw0ZY4W3ah2V4McE3L5m"
      },
      {
        id: "e-2",
        title: "Walnut Study & Library",
        caption: "Dedicated walnut library study and cocktail station",
        category: "02 Study",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDp3bv4-I6bqs5TdjdyIwXca9RlrwqEmRbWVq5W1BFfwjr38MRHyQSrHUVto_naAuSpjA1eMUENNOCigevqUykO4dD25jQSEL6ZJ1m7fXj-hVBOxyLd8CXDExK1ZEEVuVn8oRwZplVoxyIyhWi9VPvjbcoGr_eGGQtyQVT3lGm19uNAzWk4O28gm6vzQWvbJU8qxaGAgSxyAqljC71wezft9chnVP4sp58NLq-069wuXO5HGEAwvGtj"
      },
      {
        id: "e-3",
        title: "Marble En Suite",
        caption: "Honed Arabescato marble with panoramic double rain shower",
        category: "03 Bath",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFyIalMhuVJqj5c_JQ16Bo6SCqFM3pfwPIsJTxYjEr60pS0xZAb0VgSz5lyPNZzJ2wXvIUuxzMiirp_yWE9dxlFBWG6o2iDTtvkSmkqCWEnUWPABXBfbFn0kv8a7TBKLIX54TdPZU9muuE9TIPwbbBLwRxS8v1rRwWPa4MK05U7ciY0xfyYXETUT2rF8RjkX8mM4ChjPaYmjIflmHzdQQ5znZ4PhK0frpdsybPp2-vdmnySyOLvKUT"
      },
      {
        id: "e-4",
        title: "Sunset Loggia",
        caption: "Private dual terraces facing western sunset",
        category: "04 Terrace",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAICZ_GbXtFo_uvzhERRUiZGRdsrjbbcf_0N7oWBiNmxZaIkzmyke7HqEL6ZwSc9cwNONlNGcrNHMIN5kfxD2MXwf3MiJ_HOneG2l6wZtdvI3Jqd9kEiFyIYoszdLxzSi5U-shGq7q6e0RINLFc1q1o2XkML05YzsAyaRkzEVE7E__Iaclf-gHY-UwyT13ycNX2XmcZXf4BHa4adHjOsCIDbJwwdMmzHB5fpLke6X2MqwpO--v1BpVw"
      }
    ],
    highlights: [
      {
        icon: "visibility",
        title: "7th-Floor Vista",
        description: "Unmatched perspective overlooking ancient palms and sparkling coastal tides."
      },
      {
        icon: "auto_stories",
        title: "Bespoke Monograph Library",
        description: "Hand-curated rare editions on classical architecture and botanical histories."
      },
      {
        icon: "wine_bar",
        title: "Sky Lounge Privileges",
        description: "Complimentary evening aperitivo, vintage champagne, and artisanal bites."
      }
    ],
    rating: 4.99,
    reviewCount: 54
  },
  {
    id: "luxury-salon-suite",
    slug: "luxury-salon-suite",
    name: "Luxury Salon Suite",
    refCode: "FL-401",
    pavilion: "South Wing",
    category: "suites",
    tag: "Separate Living Salon · Soaking Tub",
    tagColor: "bg-[#001d0e] text-[#ffffff]",
    pricePerNight: 1100,
    specs: {
      areaM2: 95,
      areaSqFt: 1022,
      bed: "Super King",
      maxGuests: 4,
      aspect: "Private Harbor & Gardens",
      level: "South Wing Enclave • Level 04",
    },
    shortDescription: "A private residence concept offering discrete parlor entertaining, a standalone deep-immersion soaking tub overlooking royal palms, and a master bedroom cocooned in soundproofing raw silk.",
    longDescription: "Spanning nearly 100 square meters, the Luxury Salon Suite redefines private estate living. Sliding teak shoji panels seamlessly divide the entertaining parlor from the master sanctuary. Features an integrated temperature-controlled wine credenza, a dining salon for four, and an indulgent freestanding bath crafted from monolithic Italian stone.",
    amenities: [
      "Freestanding Soaking Tub",
      "Private Powder Room",
      "Curated Wine Credenza",
      "Airport Chauffeur Included",
      "Dining Salon for 4",
      "Walk-in Dressing Salon",
      "Private Butler Pantry"
    ],
    keyAmenities: [
      "Complimentary Airport Chauffeur in Hybrid Sedan",
      "Freestanding Stone Soaking Tub with Harbor Views",
      "Private Guest Powder Room & Double Dressing Salon",
      "Curated Sommelier Wine Credenza with Estate Reserves",
      "In-Suite Breakfast Served on Polished Silver Trays",
      "Bang & Olufsen Acoustic System throughout Suite",
      "Priority Table Reservations at The Orangery"
    ],
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuB39nZq1qxr9C0fF8zOMijhoMWDpieQhWoaIuaQEC5kGjO1_RX4icB6IFr8bM5NVj5V-o8aGwNg_vAMJAd7dgiF0EbDN2IXwVA3eZaAQgENsCAVvq-Gd40kIUTWZy6LQYomK6CaybQKtt1-12loe21yNiBL7bC86d55YGWrvhr49qM1rDOHMQTFlwFzXbKxiOHKE6pN-6uMaBjBpRVWtfBCP5Rv67U1UKQJQ_yTgUB8b5X4ykhvfiuv",
    galleryImages: [
      {
        id: "l-1",
        title: "Salon Living Room & Screened Bedroom",
        caption: "Open Teak Sliding Screens into Master Bedroom",
        category: "01 Salon",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB39nZq1qxr9C0fF8zOMijhoMWDpieQhWoaIuaQEC5kGjO1_RX4icB6IFr8bM5NVj5V-o8aGwNg_vAMJAd7dgiF0EbDN2IXwVA3eZaAQgENsCAVvq-Gd40kIUTWZy6LQYomK6CaybQKtt1-12loe21yNiBL7bC86d55YGWrvhr49qM1rDOHMQTFlwFzXbKxiOHKE6pN-6uMaBjBpRVWtfBCP5Rv67U1UKQJQ_yTgUB8b5X4ykhvfiuv"
      },
      {
        id: "l-2",
        title: "Stone Soaking Tub Sanctuary",
        caption: "Standalone stone tub overlooking royal palms",
        category: "02 Bath",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFyIalMhuVJqj5c_JQ16Bo6SCqFM3pfwPIsJTxYjEr60pS0xZAb0VgSz5lyPNZzJ2wXvIUuxzMiirp_yWE9dxlFBWG6o2iDTtvkSmkqCWEnUWPABXBfbFn0kv8a7TBKLIX54TdPZU9muuE9TIPwbbBLwRxS8v1rRwWPa4MK05U7ciY0xfyYXETUT2rF8RjkX8mM4ChjPaYmjIflmHzdQQ5znZ4PhK0frpdsybPp2-vdmnySyOLvKUT"
      },
      {
        id: "l-3",
        title: "Master Suite Chamber",
        caption: "Cocooned in acoustically treated raw silk drapery",
        category: "03 Master Bed",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRLDgQJlvXO8WG5jaoSgNawVa0hccz3K3mrVeLZgfvinwTkJ-1nQO5ebpM_XiKa-vnuIV6MgNZ14vbXwiNUIS-Ud36KVDUD1eEw_cQ02a1XT_ykxDGg8kAQbJ2gYFh6pG3msrdstgegtgv90q5jPWFP1rUlLuOi84Vvw5fn_wZhZuW8gPRidTU15Mm6cHPb18LZyEuyRfyWaHbjqEmTgEz6EAQFwDCGGwjB_Nomr62eCLKwyGxe-Tl"
      },
      {
        id: "l-4",
        title: "Veranda Loggia",
        caption: "Private balcony with afternoon aperitivo seating",
        category: "04 Veranda",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAICZ_GbXtFo_uvzhERRUiZGRdsrjbbcf_0N7oWBiNmxZaIkzmyke7HqEL6ZwSc9cwNONlNGcrNHMIN5kfxD2MXwf3MiJ_HOneG2l6wZtdvI3Jqd9kEiFyIYoszdLxzSi5U-shGq7q6e0RINLFc1q1o2XkML05YzsAyaRkzEVE7E__Iaclf-gHY-UwyT13ycNX2XmcZXf4BHa4adHjOsCIDbJwwdMmzHB5fpLke6X2MqwpO--v1BpVw"
      }
    ],
    highlights: [
      {
        icon: "meeting_room",
        title: "Dual Salon Configuration",
        description: "Discrete parlor allows entertaining guests without intruding on the private bedchamber."
      },
      {
        icon: "directions_car",
        title: "Complimentary Chauffeur",
        description: "Chauffeured airport transfer in our private hybrid fleet included with every booking."
      },
      {
        icon: "local_bar",
        title: "Curated Sommelier Credenza",
        description: "Stocked with biodynamic estate wines, botanical gin, and crystal tumblers."
      }
    ],
    rating: 5.0,
    reviewCount: 42
  },
  {
    id: "presidential-enclave",
    slug: "the-presidential-enclave",
    name: "The Presidential Enclave",
    refCode: "FL-PH01",
    pavilion: "Top Tier Penthouse",
    category: "signature",
    tag: "Signature Enclave · Penthouse",
    tagColor: "bg-[#fed488] text-[#261900]",
    pricePerNight: 2800,
    specs: {
      areaM2: 180,
      areaSqFt: 1937,
      bed: "2 Masters (2 Kings)",
      maxGuests: 6,
      aspect: "Private Horizon, Sea & Helipad",
      level: "Top Tier Enclave Penthouse",
    },
    shortDescription: "Our crown accommodation spanning 180 m² with two master suites, expansive botanical veranda, heated horizon plunge pool, private service pantry, and 24-hour dedicated British Butler Guild concierge.",
    longDescription: "The zenith of coastal sanctuary living. Occupying the entire highest tier of the estate, The Presidential Enclave commands uninterrupted 360-degree views of the azure coast and historical botanical canopy. Features a private heated infinity plunge pool, a private dining pavilion where our executive chef prepares bespoke multi-course menus in-suite, and direct access to Helipad Grid B-4.",
    amenities: [
      "Private Plunge Pool",
      "Dedicated 24h Butler",
      "Private Helipad Transfer",
      "Chef In-Suite Dining",
      "Heated Jade Pool",
      "Private Service Kitchen",
      "Bespoke Cigar Humidor"
    ],
    keyAmenities: [
      "Heated Jade Stone Infinity Plunge Pool overlooking the sea",
      "Dedicated 24-Hour British Butler Guild Concierge",
      "Private Helipad Grid B-4 Transfer & Direct Portico Escort",
      "Private Multi-Course In-Suite Dinner by Executive Chef",
      "Two Master Sanctuary Chambers with En Suite Spas",
      "Full Commercial Butler Service Pantry & Wine Room",
      "Complimentary Unlimited Thermal Spa Access for All Guests"
    ],
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqObO8SreOlZ7-nQ0wsfaoIuUx-MHIAwbPKl1taDTnPNQlo0toMdWbfXpRsb1uulPlw1qSjvITJVdFLJHRU1SQ5ZRxkR8Jner8JKIVvNtNF9Q3Y7Q6Moy72qzdZcD_Sl26o2JON38VHvyQmMo7-j6CgOcePoa_Q1brA9zxFi4d3XewsEzPm1VptAFooQuo3o3KQm5vDE8XL8DG8UFHfnHhe6NrwEScLlm-hlChEIIJrW8VxkDwz9P8",
    galleryImages: [
      {
        id: "p-enclave-1",
        title: "Penthouse Infinity Plunge Pool & Ocean Twilight",
        caption: "Jade-tiled heated pool overlooking botanical gardens and sea",
        category: "01 Pool",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqObO8SreOlZ7-nQ0wsfaoIuUx-MHIAwbPKl1taDTnPNQlo0toMdWbfXpRsb1uulPlw1qSjvITJVdFLJHRU1SQ5ZRxkR8Jner8JKIVvNtNF9Q3Y7Q6Moy72qzdZcD_Sl26o2JON38VHvyQmMo7-j6CgOcePoa_Q1brA9zxFi4d3XewsEzPm1VptAFooQuo3o3KQm5vDE8XL8DG8UFHfnHhe6NrwEScLlm-hlChEIIJrW8VxkDwz9P8"
      },
      {
        id: "p-enclave-2",
        title: "Grand Master Chamber",
        caption: "Super King Bed with dual outdoor verandas",
        category: "02 Master",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRLDgQJlvXO8WG5jaoSgNawVa0hccz3K3mrVeLZgfvinwTkJ-1nQO5ebpM_XiKa-vnuIV6MgNZ14vbXwiNUIS-Ud36KVDUD1eEw_cQ02a1XT_ykxDGg8kAQbJ2gYFh6pG3msrdstgegtgv90q5jPWFP1rUlLuOi84Vvw5fn_wZhZuW8gPRidTU15Mm6cHPb18LZyEuyRfyWaHbjqEmTgEz6EAQFwDCGGwjB_Nomr62eCLKwyGxe-Tl"
      },
      {
        id: "p-enclave-3",
        title: "Private In-Suite Dining Pavilion",
        caption: "Al fresco dining terrace with personal culinary chef",
        category: "03 Dining",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXzIQfO0BIvQDxMtxVv1BXZJI9g_l2hyir_sHAKpXi7PJAy4eSRDp4nLoNyOFt9j2eU8cdt--Top_vBaTKJZ-lhEtStDkO1JwQNCcoq_BmuB4uq1oy_aRvx9pb8ZWDD0BgqS82acd7q8rybDtTXkXmuLT9LpvNzlDwHqaiB0erAGJ3xa_CLagzBVKGb_h4SDXydnBKijh7vriwySe1h3s7_K6KRj01ePs5QazKH3zPdrL5CMvKWc6J"
      },
      {
        id: "p-enclave-4",
        title: "Penthouse Marble Oasis",
        caption: "Double marble soaking tubs and private infrared sauna",
        category: "04 Spa Bath",
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFyIalMhuVJqj5c_JQ16Bo6SCqFM3pfwPIsJTxYjEr60pS0xZAb0VgSz5lyPNZzJ2wXvIUuxzMiirp_yWE9dxlFBWG6o2iDTtvkSmkqCWEnUWPABXBfbFn0kv8a7TBKLIX54TdPZU9muuE9TIPwbbBLwRxS8v1rRwWPa4MK05U7ciY0xfyYXETUT2rF8RjkX8mM4ChjPaYmjIflmHzdQQ5znZ4PhK0frpdsybPp2-vdmnySyOLvKUT"
      }
    ],
    highlights: [
      {
        icon: "pool",
        title: "Horizon Plunge Pool",
        description: "Heated infinity pool tiled in natural jade overlooking the botanical canopy."
      },
      {
        icon: "flight_takeoff",
        title: "Private Helipad Transfer",
        description: "Direct touchdown on Helipad Grid B-4 with seamless private security escort."
      },
      {
        icon: "concierge",
        title: "Dedicated British Butler",
        description: "24-hour personalized service including course-by-course terrace dinners."
      }
    ],
    rating: 5.0,
    reviewCount: 29
  }
];

export const DINING_VENUES: DiningVenue[] = [
  {
    id: "the-orangery",
    name: "The Orangery",
    subtitle: "Farm-to-Table Botanical Conservatory",
    hours: "Breakfast: 07:00 – 11:00 · Lunch: 12:30 – 15:30 · Dinner: 18:30 – 22:30",
    dressCode: "Smart Casual · Collared Shirts Recommended for Dinner",
    description: "Housed beneath soaring arched ironwork glass within the historic citrus conservatory. Executive Chef Laurent Vasseur crafts seasonal menus drawing from our own estate kitchen gardens and Mediterranean sustainable fisheries.",
    atmosphere: "Light-dappled morning sunshine, fragrant sweet orange blossoms, and candlelit evening jazz.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAICZ_GbXtFo_uvzhERRUiZGRdsrjbbcf_0N7oWBiNmxZaIkzmyke7HqEL6ZwSc9cwNONlNGcrNHMIN5kfxD2MXwf3MiJ_HOneG2l6wZtdvI3Jqd9kEiFyIYoszdLxzSi5U-shGq7q6e0RINLFc1q1o2XkML05YzsAyaRkzEVE7E__Iaclf-gHY-UwyT13ycNX2XmcZXf4BHa4adHjOsCIDbJwwdMmzHB5fpLke6X2MqwpO--v1BpVw",
    menu: [
      {
        category: "First Courses",
        items: [
          {
            name: "Estate Burrata with Pressed Fig & Lemon Verbena",
            description: "Handcrafted artisan cheese, biodynamic estate figs, aged Modena balsamic, micro-herbs.",
            price: "₹38",
            dietary: "Vegetarian"
          },
          {
            name: "Wild Sea Bass Carpaccio with Finger Lime",
            description: "Line-caught local bass, cold-pressed estate olive oil, pink peppercorn, sea purslane.",
            price: "₹44",
            dietary: "Gluten-Free"
          },
          {
            name: "Charred Heirloom Courgette Blossoms",
            description: "Stuffed with whipped goat ricotta, thyme honey glaze, toasted pine nut praline.",
            price: "₹36",
            dietary: "Vegetarian"
          }
        ]
      },
      {
        category: "Sanctuary Mains",
        items: [
          {
            name: "Slow-Braised Saltmarsh Lamb Shoulder",
            description: "12-hour braised shoulder, rosemary roasted baby parsnip, pomegranate jus.",
            price: "₹68"
          },
          {
            name: "Pan-Seared Red Mullet in Saffron Broth",
            description: "Crispy skin mullet, baby fennel, saffron shellfish bouillon, rouille crostini.",
            price: "₹62"
          },
          {
            name: "Hand-Rolled Agnolotti del Plin",
            description: "Stuffed with sweet corn puree and black summer truffle, brown butter emulsion.",
            price: "₹52",
            dietary: "Vegetarian"
          }
        ]
      },
      {
        category: "Pastry & Confections",
        items: [
          {
            name: "Seaside Meyer Lemon Tart",
            description: "Torched Italian meringue, candied estate lemon peel, basil gelato.",
            price: "₹24"
          },
          {
            name: "Single-Origin 72% Dark Chocolate Soufflé",
            description: "Warm Venezuelan chocolate, Madagascar vanilla bean crème anglaise.",
            price: "₹28"
          }
        ]
      }
    ]
  },
  {
    id: "botanical-bar",
    name: "The Botanical Evening Bar & Library Salon",
    subtitle: "Aperitivo, Single-Cask Spirits & Rare Botanical Infusions",
    hours: "Daily: 16:00 – 00:00 · Aperitivo Hour: 17:00 – 19:00",
    dressCode: "Sophisticated Leisure",
    description: "An intimate haven of fluted oak bookshelves, low-slung bouclé seating, and an unhurried crackling limestone fireplace. Featuring rare amari, small-batch botanical gins distilled with flora from our gardens, and cellar reserve vintage champagnes.",
    atmosphere: "Subdued amber lighting, vinyl jazz selections, velvet armchairs, and unhurried intellectual conversation.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXzIQfO0BIvQDxMtxVv1BXZJI9g_l2hyir_sHAKpXi7PJAy4eSRDp4nLoNyOFt9j2eU8cdt--Top_vBaTKJZ-lhEtStDkO1JwQNCcoq_BmuB4uq1oy_aRvx9pb8ZWDD0BgqS82acd7q8rybDtTXkXmuLT9LpvNzlDwHqaiB0erAGJ3xa_CLagzBVKGb_h4SDXydnBKijh7vriwySe1h3s7_K6KRj01ePs5QazKH3zPdrL5CMvKWc6J",
    menu: [
      {
        category: "Signature Botanical Cocktails",
        items: [
          {
            name: "The Fountant Fountain No. 4",
            description: "House-distilled rosemary botanical gin, white vermouth, bergamot liqueur, champagne mist.",
            price: "₹26"
          },
          {
            name: "Old Smoked Cedar Negroni",
            description: "Campari infused with estate cypress needles, sweet vermouth, small-batch rye, cedar smoke.",
            price: "₹28"
          },
          {
            name: "Jasmine Blossom Spritz (Zero-Proof)",
            description: "Wild jasmine cold brew, verjus, elderflower tonic, effervescent spring water.",
            price: "₹18",
            dietary: "Non-Alcoholic"
          }
        ]
      },
      {
        category: "Library Salon Small Plates",
        items: [
          {
            name: "24-Month Jamón Ibérico de Bellota",
            description: "Hand-carved acorn-fed ham, crystal bread with grated sun-ripened tomatoes.",
            price: "₹36"
          },
          {
            name: "Truffle & Comté Gougères",
            description: "Warm savory choux pastry, aged 30-month Comté cheese, Périgord truffle dust.",
            price: "₹22"
          }
        ]
      }
    ]
  }
];

export const EXPERIENCES: SanctuaryExperience[] = [
  {
    id: "thermal-spa",
    title: "Thermal Hydrotherapy & Botanical Spa",
    subtitle: "Sacred Restoration of Mind & Body",
    duration: "2 to 4 Hours",
    inclusions: [
      "Cedar thermal saunas & ice plunge basins",
      "Hydrotherapy jet pools overlooking cypress gardens",
      "Herbal exfoliation with harvested botanical salts",
      "60-min Deep Restoration Aromatherapy Massage"
    ],
    description: "Nestled within an isolated subterranean wing of classical stone vaults, our thermal sanctuary harnesses natural mineral waters, cedar heat chambers, and organic herbal oils to induce profound calm.",
    price: "Complimentary for Residents / Private Spa Suite ₹240",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFyIalMhuVJqj5c_JQ16Bo6SCqFM3pfwPIsJTxYjEr60pS0xZAb0VgSz5lyPNZzJ2wXvIUuxzMiirp_yWE9dxlFBWG6o2iDTtvkSmkqCWEnUWPABXBfbFn0kv8a7TBKLIX54TdPZU9muuE9TIPwbbBLwRxS8v1rRwWPa4MK05U7ciY0xfyYXETUT2rF8RjkX8mM4ChjPaYmjIflmHzdQQ5znZ4PhK0frpdsybPp2-vdmnySyOLvKUT",
    category: "Wellness"
  },
  {
    id: "yacht-excursion",
    title: "Sunrise Estuary Yacht Excursion",
    subtitle: "Private Maritime Charter on the Azure Coast",
    duration: "3 Hours",
    inclusions: [
      "Private 46ft Solaris motor yacht charter",
      "Champagne breakfast prepared by personal chef on board",
      "Coastal cliff exploration & secluded cove swimming",
      "Chauffeured port transfer directly from East Portico"
    ],
    description: "Depart from our private pier at first light to witness dawn cresting over limestone cliffs. Unwind with fresh pastries, cold-pressed pomegranate juices, and iced champagne while gliding past secluded maritime grottos.",
    price: "₹850 per charter (up to 4 guests)",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAICZ_GbXtFo_uvzhERRUiZGRdsrjbbcf_0N7oWBiNmxZaIkzmyke7HqEL6ZwSc9cwNONlNGcrNHMIN5kfxD2MXwf3MiJ_HOneG2l6wZtdvI3Jqd9kEiFyIYoszdLxzSi5U-shGq7q6e0RINLFc1q1o2XkML05YzsAyaRkzEVE7E__Iaclf-gHY-UwyT13ycNX2XmcZXf4BHa4adHjOsCIDbJwwdMmzHB5fpLke6X2MqwpO--v1BpVw",
    category: "Maritime"
  },
  {
    id: "sommelier-tasting",
    title: "Estate Sommelier Cellar Tasting",
    subtitle: "Curated Masterclass in the 19th-Century Vaults",
    duration: "90 Minutes",
    inclusions: [
      "Private tasting of 6 rare European and coastal vintages",
      "Estate cold-pressed olive oils & sourdough pairing",
      "Artisan cheese collection curated by master affineur",
      "Personalized sommelier tasting notebook"
    ],
    description: "Descend into our candlelit limestone cellar housing over 4,000 bottles of historic vintages. Our Head Sommelier guides you through rare biodynamic crus, vintage champagne developments, and terroir storytelling.",
    price: "₹180 per guest",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXzIQfO0BIvQDxMtxVv1BXZJI9g_l2hyir_sHAKpXi7PJAy4eSRDp4nLoNyOFt9j2eU8cdt--Top_vBaTKJZ-lhEtStDkO1JwQNCcoq_BmuB4uq1oy_aRvx9pb8ZWDD0BgqS82acd7q8rybDtTXkXmuLT9LpvNzlDwHqaiB0erAGJ3xa_CLagzBVKGb_h4SDXydnBKijh7vriwySe1h3s7_K6KRj01ePs5QazKH3zPdrL5CMvKWc6J",
    category: "Culinary"
  },
  {
    id: "helicopter-cliffs",
    title: "Helicopter Horizon Flight & Portico Transfer",
    subtitle: "Aviation Excellence from Helipad Grid B-4",
    duration: "45 Minutes",
    inclusions: [
      "Twin-engine executive helicopter charter",
      "Scenic panoramic flight over coastal peninsulas",
      "Direct landing at Helipad Grid B-4 with white-glove escort",
      "Chilled Dom Pérignon upon arrival"
    ],
    description: "Bypass regional traffic and arrive with dramatic poise. Experience breathtaking aerial panoramas of coastal fjords, ancient lighthouses, and estate botanical gardens before touching down gracefully on our private helipad.",
    price: "₹1,200 per flight (up to 4 guests)",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqObO8SreOlZ7-nQ0wsfaoIuUx-MHIAwbPKl1taDTnPNQlo0toMdWbfXpRsb1uulPlw1qSjvITJVdFLJHRU1SQ5ZRxkR8Jner8JKIVvNtNF9Q3Y7Q6Moy72qzdZcD_Sl26o2JON38VHvyQmMo7-j6CgOcePoa_Q1brA9zxFi4d3XewsEzPm1VptAFooQuo3o3KQm5vDE8XL8DG8UFHfnHhe6NrwEScLlm-hlChEIIJrW8VxkDwz9P8",
    category: "Aviation"
  }
];

export const SEASONAL_OFFERS: SeasonalOffer[] = [
  {
    id: "autumn-awakening",
    title: "The Autumn Botanical Awakening",
    subtitle: "3-Night Curated Sanctuary Retreatment",
    badge: "Seasonal Privilege",
    description: "Embrace the crisp golden foliage of our subtropical gardens. Enjoy three consecutive nights in an idyllic suite, inclusive of bespoke daily breakfast, ₹150 spa credit, and a chauffeured airport arrival.",
    perks: [
      "Complimentary 3rd Night when booking two nights",
      "Daily breakfast à la carte at The Orangery",
      "₹150 Thermal Spa and Hydrotherapy credit",
      "Guaranteed late check-out until 15:00"
    ],
    savings: "Complimentary 3rd Night (Save up to ₹450)",
    validUntil: "November 30, 2024",
    defaultRoomId: "deluxe-room",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlW9YlAOZza9EXnrvsL76okQsSh-8gmGE-TBE2UXprVO2Mv-c3nZu-z5jHocrN0mG5yLQOMv6Ys9lp3wYzcW_LL0dHDdiMZ-6P27RV3m7dV2ZOvw_sTDB6aleDfGzuXsm0fgzAjTJ0dscqFA97pz16VVoU673SHfyXWH-4fBAqQYmyz2NdTt0sYhlJGMPqoJ6ojhhP41e41Qt52SUxMIA5AeqHnmZQYiQmGpGBmvCif27RMqpJp3KI"
  },
  {
    id: "honeymoon-fellowship",
    title: "The Architectural Fellowship for Couples",
    subtitle: "Intimate Romance in the Fountain Pavilion",
    badge: "Signature Experience",
    description: "Designed for discerning couples seeking restorative stillness. Includes a welcome magnum of vintage champagne, private candlelight dinner under the courtyard fountain archways, and bespoke couple's spa ritual.",
    perks: [
      "Suite upgrade to Balcony Room upon availability",
      "Welcome bottle of vintage champagne on ice",
      "Private 5-course dinner at The Orangery pavilion",
      "Two 90-minute bespoke deep immersion massage rituals"
    ],
    savings: "Valued at ₹680 in complimentary inclusions",
    validUntil: "December 20, 2024",
    defaultRoomId: "premium-room",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVWDnHGpcmAZdQRsivVGC_moggY8ydWzaQFhRwuw-09vIVk0tfs2hFlOWWkW5HO8V7_5kzHZtJfPqEkQhTlwcxKHGT_aWk2NAVa8eyFJknOINXZaw8bXeaCP44MwwGku_-dTXfYhkUYZ7-FLFlnV0-CEs1fWlH8vbe70_wq7Egs88x5jlg40Kvx1IM1vxCmdmhRQxgPTLGVmY22csLQVaCO4RZ39dsjcXVim6T4lxlm47japq_j_cF"
  },
  {
    id: "extended-residency",
    title: "The Extended Resident Sabbatical",
    subtitle: "7+ Nights of Creative Contemplation",
    badge: "Extended Privileges",
    description: "For authors, thinkers, and seekers needing uninterrupted quiet. Receive 25% preferential rate reductions on weekly residencies, bespoke executive desk appointments, and dedicated secretarial concierge assistance.",
    perks: [
      "25% preferential tariff reduction on 7+ nights",
      "Unlimited laundry and valet garment pressing",
      "Dedicated high-speed VPN node and ergonomic study setup",
      "Complimentary access to the Sommelier Reserve Bar"
    ],
    savings: "25% Reduced Tariff across entire stay",
    validUntil: "March 31, 2025",
    defaultRoomId: "executive-panorama",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC63NCy9IHIiAwHri-24jNecWSrSLoNNAKPqzdQqlU53D4oq_zJZCZIw50TsThos2nvXtz9g0ySMcSs6b55ykQpnAzSOfyYbeVq18eUNzhysNxzCtTDk4rhm5rv8kD4xTJf4-Dd6WrnyhjVT3UTQJrc0ntA_LM5xBo1C8OJO34ScJu7ASXZkhVYDOsVUqiANB7Cw6XCbXKXECStC6YKEO7xgXESZe_XMBpqmw0ZY4W3ah2V4McE3L5m"
  }
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "g-1",
    title: "Deluxe Chamber Morning Glow",
    category: "Chambers",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlW9YlAOZza9EXnrvsL76okQsSh-8gmGE-TBE2UXprVO2Mv-c3nZu-z5jHocrN0mG5yLQOMv6Ys9lp3wYzcW_LL0dHDdiMZ-6P27RV3m7dV2ZOvw_sTDB6aleDfGzuXsm0fgzAjTJ0dscqFA97pz16VVoU673SHfyXWH-4fBAqQYmyz2NdTt0sYhlJGMPqoJ6ojhhP41e41Qt52SUxMIA5AeqHnmZQYiQmGpGBmvCif27RMqpJp3KI",
    caption: "Subtle natural light cascading across custom Italian linen and fluted oak walls."
  },
  {
    id: "g-2",
    title: "Courtyard Fountain Balcony",
    category: "Architecture",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVWDnHGpcmAZdQRsivVGC_moggY8ydWzaQFhRwuw-09vIVk0tfs2hFlOWWkW5HO8V7_5kzHZtJfPqEkQhTlwcxKHGT_aWk2NAVa8eyFJknOINXZaw8bXeaCP44MwwGku_-dTXfYhkUYZ7-FLFlnV0-CEs1fWlH8vbe70_wq7Egs88x5jlg40Kvx1IM1vxCmdmhRQxgPTLGVmY22csLQVaCO4RZ39dsjcXVim6T4lxlm47japq_j_cF",
    caption: "The classical stone tiered fountain viewed from the second-floor wrought iron loggia."
  },
  {
    id: "g-3",
    title: "Executive Skyline Aerie",
    category: "Chambers",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC63NCy9IHIiAwHri-24jNecWSrSLoNNAKPqzdQqlU53D4oq_zJZCZIw50TsThos2nvXtz9g0ySMcSs6b55ykQpnAzSOfyYbeVq18eUNzhysNxzCtTDk4rhm5rv8kD4xTJf4-Dd6WrnyhjVT3UTQJrc0ntA_LM5xBo1C8OJO34ScJu7ASXZkhVYDOsVUqiANB7Cw6XCbXKXECStC6YKEO7xgXESZe_XMBpqmw0ZY4W3ah2V4McE3L5m",
    caption: "Sunset overlooking coastal cliffs and pristine architectural grounds."
  },
  {
    id: "g-4",
    title: "Luxury Suite Living Salon",
    category: "Chambers",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB39nZq1qxr9C0fF8zOMijhoMWDpieQhWoaIuaQEC5kGjO1_RX4icB6IFr8bM5NVj5V-o8aGwNg_vAMJAd7dgiF0EbDN2IXwVA3eZaAQgENsCAVvq-Gd40kIUTWZy6LQYomK6CaybQKtt1-12loe21yNiBL7bC86d55YGWrvhr49qM1rDOHMQTFlwFzXbKxiOHKE6pN-6uMaBjBpRVWtfBCP5Rv67U1UKQJQ_yTgUB8b5X4ykhvfiuv",
    caption: "Warm candlelight, teak screens, and bespoke New Zealand wool area rugs."
  },
  {
    id: "g-5",
    title: "The Penthouse Horizon Pool",
    category: "Architecture",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqObO8SreOlZ7-nQ0wsfaoIuUx-MHIAwbPKl1taDTnPNQlo0toMdWbfXpRsb1uulPlw1qSjvITJVdFLJHRU1SQ5ZRxkR8Jner8JKIVvNtNF9Q3Y7Q6Moy72qzdZcD_Sl26o2JON38VHvyQmMo7-j6CgOcePoa_Q1brA9zxFi4d3XewsEzPm1VptAFooQuo3o3KQm5vDE8XL8DG8UFHfnHhe6NrwEScLlm-hlChEIIJrW8VxkDwz9P8",
    caption: "Jade-tiled heated pool meeting the sea horizon at blue hour."
  },
  {
    id: "g-6",
    title: "Arabescato Honed Marble Bath",
    category: "Wellness",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFyIalMhuVJqj5c_JQ16Bo6SCqFM3pfwPIsJTxYjEr60pS0xZAb0VgSz5lyPNZzJ2wXvIUuxzMiirp_yWE9dxlFBWG6o2iDTtvkSmkqCWEnUWPABXBfbFn0kv8a7TBKLIX54TdPZU9muuE9TIPwbbBLwRxS8v1rRwWPa4MK05U7ciY0xfyYXETUT2rF8RjkX8mM4ChjPaYmjIflmHzdQQ5znZ4PhK0frpdsybPp2-vdmnySyOLvKUT",
    caption: "Monolithic standalone stone soaking bathtub in Arabescato marble."
  },
  {
    id: "g-7",
    title: "The Orangery Conservatory Dining",
    category: "Gastronomy",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAICZ_GbXtFo_uvzhERRUiZGRdsrjbbcf_0N7oWBiNmxZaIkzmyke7HqEL6ZwSc9cwNONlNGcrNHMIN5kfxD2MXwf3MiJ_HOneG2l6wZtdvI3Jqd9kEiFyIYoszdLxzSi5U-shGq7q6e0RINLFc1q1o2XkML05YzsAyaRkzEVE7E__Iaclf-gHY-UwyT13ycNX2XmcZXf4BHa4adHjOsCIDbJwwdMmzHB5fpLke6X2MqwpO--v1BpVw",
    caption: "Farm-to-table lunch amidst sweet citrus blossom archways."
  },
  {
    id: "g-8",
    title: "Library Salon Evening Cocktail Nook",
    category: "Gastronomy",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXzIQfO0BIvQDxMtxVv1BXZJI9g_l2hyir_sHAKpXi7PJAy4eSRDp4nLoNyOFt9j2eU8cdt--Top_vBaTKJZ-lhEtStDkO1JwQNCcoq_BmuB4uq1oy_aRvx9pb8ZWDD0BgqS82acd7q8rybDtTXkXmuLT9LpvNzlDwHqaiB0erAGJ3xa_CLagzBVKGb_h4SDXydnBKijh7vriwySe1h3s7_K6KRj01ePs5QazKH3zPdrL5CMvKWc6J",
    caption: "Aperitivo hour with vintage spirits and rare architectural monographs."
  }
];

export const INITIAL_RESERVATIONS = [
  {
    id: "res-001",
    refCode: "FT-89240",
    roomId: "deluxe-room",
    roomName: "Deluxe Garden Suite",
    roomImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCWhllUgbiWTkbK3_tycQjEeNZl86bCwkFtmeaKne-iE9lse5COokwREGaDLHhCBQ9y-QUXV7p3vxjOTS9HNYuVplMBQfaikGTkyzJTpkzCw4knL0v_q7OWX0zWtoujAw9hvhGdu1rFcMdF8o53LOEdG2l_boZdM1QlYZb2Mv1aR6rnQgPKKDE0p2oEUz0255nP4pvKmnoyOdXb1Nc7vSWz3tHYWL60aQ2cwsLKqh3FWLSvUFzMWQI",
    category: "Deluxe Suite",
    checkIn: "2024-10-14",
    checkOut: "2024-10-17",
    nights: 3,
    adults: 2,
    firstName: "Julian",
    lastName: "Vane-Tempest",
    email: "julian.vane@curzon-estate.co.uk",
    phone: "+44 7911 123456",
    specialRequests: "Vegetarian breakfast preference and late arrival around 19:30.",
    privileges: {
      airportTransfer: true,
      earlyArrival: true,
      featherFree: false,
      champagneOnArrival: true
    },
    nightlyRate: 450,
    subtotal: 1350,
    serviceFee: 108,
    taxes: 54,
    total: 1512,
    status: "confirmed" as const,
    createdAt: "2024-09-24T14:32:00Z"
  }
];
