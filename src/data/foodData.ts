export type Verdict = 'safe' | 'moderate' | 'avoid';

export interface Food {
  id: string;
  name: string;
  emoji: string;
  verdict: Verdict;
  reason: string;
  nutritionalInfo: string;
}

export interface DiseaseData {
  name: string;
  icon: string;
  color: string;
  description: string;
  foods: Food[];
}

export const foodData: Record<string, DiseaseData> = {
  diabetes: {
    name: 'Diabetes',
    icon: '🩸',
    color: '#3b82f6',
    description: 'Manage blood sugar levels with smart food choices',
    foods: [
      {
        id: 'db1',
        name: 'Broccoli',
        emoji: '🥦',
        verdict: 'safe',
        reason: 'Low glycemic index, high in fiber and chromium which helps regulate blood sugar levels. Rich in antioxidants that protect against diabetes complications.',
        nutritionalInfo: 'Carbs: 6g per 100g | Fiber: 2.6g | GI: 10'
      },
      {
        id: 'db2',
        name: 'Salmon',
        emoji: '🐟',
        verdict: 'safe',
        reason: 'Rich in omega-3 fatty acids that reduce inflammation and improve insulin sensitivity. Excellent protein source with zero carbs.',
        nutritionalInfo: 'Protein: 25g per 100g | Omega-3: 2.3g | Carbs: 0g'
      },
      {
        id: 'db3',
        name: 'Avocado',
        emoji: '🥑',
        verdict: 'safe',
        reason: 'Healthy monounsaturated fats slow down digestion and prevent blood sugar spikes. High in fiber and potassium.',
        nutritionalInfo: 'Fiber: 7g per 100g | Healthy fats: 15g | GI: 15'
      },
      {
        id: 'db4',
        name: 'Berries',
        emoji: '🫐',
        verdict: 'safe',
        reason: 'Low glycemic index, packed with antioxidants and fiber. Natural sugars are released slowly into bloodstream.',
        nutritionalInfo: 'Carbs: 14g per 100g | Fiber: 2.4g | GI: 25'
      },
      {
        id: 'db5',
        name: 'White Bread',
        emoji: '🍞',
        verdict: 'avoid',
        reason: 'Very high glycemic index causes rapid blood sugar spikes. Refined carbs with minimal fiber or nutrients.',
        nutritionalInfo: 'Carbs: 49g per 100g | Fiber: 2.7g | GI: 75'
      },
      {
        id: 'db6',
        name: 'Soda',
        emoji: '🥤',
        verdict: 'avoid',
        reason: 'Liquid sugar causes immediate blood glucose surge. No nutritional value, high fructose corn syrup damages insulin response.',
        nutritionalInfo: 'Sugar: 39g per can | Carbs: 39g | GI: 63'
      },
      {
        id: 'db7',
        name: 'Brown Rice',
        emoji: '🍚',
        verdict: 'moderate',
        reason: 'Better than white rice due to fiber content, but still moderately high in carbs. Portion control is essential.',
        nutritionalInfo: 'Carbs: 23g per 100g | Fiber: 1.8g | GI: 50'
      },
      {
        id: 'db8',
        name: 'Banana',
        emoji: '🍌',
        verdict: 'moderate',
        reason: 'Contains natural sugars and carbs. Green bananas are better due to resistant starch. Best in small portions.',
        nutritionalInfo: 'Carbs: 23g per 100g | Sugar: 12g | GI: 51'
      }
    ]
  },
  hypertension: {
    name: 'Hypertension',
    icon: '💓',
    color: '#ef4444',
    description: 'Lower blood pressure with heart-healthy nutrition',
    foods: [
      {
        id: 'hp1',
        name: 'Spinach',
        emoji: '🥬',
        verdict: 'safe',
        reason: 'High in potassium, magnesium, and nitrates which naturally lower blood pressure. Rich in heart-protective antioxidants.',
        nutritionalInfo: 'Potassium: 558mg per 100g | Magnesium: 79mg | Sodium: 79mg'
      },
      {
        id: 'hp2',
        name: 'Beets',
        emoji: '🌰',
        verdict: 'safe',
        reason: 'Dietary nitrates convert to nitric oxide which relaxes blood vessels. Can lower BP within hours of consumption.',
        nutritionalInfo: 'Nitrates: 250mg per 100g | Potassium: 325mg | Sodium: 78mg'
      },
      {
        id: 'hp3',
        name: 'Oatmeal',
        emoji: '🥣',
        verdict: 'safe',
        reason: 'Soluble fiber (beta-glucan) reduces cholesterol and blood pressure. Whole grains support cardiovascular health.',
        nutritionalInfo: 'Fiber: 10g per 100g | Beta-glucan: 4g | Sodium: 2mg'
      },
      {
        id: 'hp4',
        name: 'Banana',
        emoji: '🍌',
        verdict: 'safe',
        reason: 'Excellent source of potassium which counteracts sodium effects. Helps maintain healthy blood pressure levels.',
        nutritionalInfo: 'Potassium: 358mg per 100g | Sodium: 1mg | Magnesium: 27mg'
      },
      {
        id: 'hp5',
        name: 'Pizza',
        emoji: '🍕',
        verdict: 'avoid',
        reason: 'Extremely high in sodium, saturated fats, and processed ingredients. Major contributor to hypertension.',
        nutritionalInfo: 'Sodium: 700mg per slice | Sat. fat: 5g | Calories: 285'
      },
      {
        id: 'hp6',
        name: 'Pickles',
        emoji: '🥒',
        verdict: 'avoid',
        reason: 'Preservation process adds massive amounts of sodium. One pickle can contain 50% of daily sodium limit.',
        nutritionalInfo: 'Sodium: 1208mg per 100g | Potassium: 23mg'
      },
      {
        id: 'hp7',
        name: 'Dark Chocolate',
        emoji: '🍫',
        verdict: 'moderate',
        reason: 'Flavonoids can lower BP, but must be 70%+ cocoa and consumed in small amounts. Watch sugar content.',
        nutritionalInfo: 'Flavonoids: 500mg per 100g | Sugar: 24g | Serving: 1 oz'
      },
      {
        id: 'hp8',
        name: 'Coffee',
        emoji: '☕',
        verdict: 'moderate',
        reason: 'Caffeine can temporarily raise BP, but regular consumption may have neutral or beneficial effects. Limit to 2 cups.',
        nutritionalInfo: 'Caffeine: 95mg per cup | Antioxidants: high | Sodium: 5mg'
      }
    ]
  },
  thyroid: {
    name: 'Thyroid',
    icon: '🦋',
    color: '#8b5cf6',
    description: 'Support thyroid function with nutrient-rich foods',
    foods: [
      {
        id: 'th1',
        name: 'Seaweed',
        emoji: '🌊',
        verdict: 'safe',
        reason: 'Excellent source of iodine essential for thyroid hormone production. Contains selenium and tyrosine for optimal function.',
        nutritionalInfo: 'Iodine: 2000mcg per 100g | Selenium: 7mcg | Tyrosine: present'
      },
      {
        id: 'th2',
        name: 'Brazil Nuts',
        emoji: '🥜',
        verdict: 'safe',
        reason: 'Richest food source of selenium which converts T4 to active T3 hormone. Just 2 nuts provide daily needs.',
        nutritionalInfo: 'Selenium: 1917mcg per 100g | Zinc: 4mg | Magnesium: 376mg'
      },
      {
        id: 'th3',
        name: 'Eggs',
        emoji: '🥚',
        verdict: 'safe',
        reason: 'Contains iodine, selenium, and tyrosine - all critical for thyroid health. Complete protein supports metabolism.',
        nutritionalInfo: 'Iodine: 24mcg per egg | Selenium: 15mcg | Tyrosine: 250mg'
      },
      {
        id: 'th4',
        name: 'Chicken',
        emoji: '🍗',
        verdict: 'safe',
        reason: 'High-quality protein with zinc and selenium. Supports thyroid function and maintains healthy metabolism.',
        nutritionalInfo: 'Protein: 27g per 100g | Selenium: 24mcg | Zinc: 1.3mg'
      },
      {
        id: 'th5',
        name: 'Soy',
        emoji: '🫘',
        verdict: 'avoid',
        reason: 'Isoflavones interfere with thyroid peroxidase enzyme. Can block iodine absorption and hormone production.',
        nutritionalInfo: 'Isoflavones: 25mg per 100g | Goitrogens: high | Protein: 36g'
      },
      {
        id: 'th6',
        name: 'Raw Cabbage',
        emoji: '🥬',
        verdict: 'avoid',
        reason: 'Contains goitrogens that block iodine uptake. Cooking reduces this effect. Avoid in large raw quantities.',
        nutritionalInfo: 'Goitrogens: high when raw | Fiber: 2.5g | Vitamin C: 37mg'
      },
      {
        id: 'th7',
        name: 'Yogurt',
        emoji: '🥛',
        verdict: 'moderate',
        reason: 'Good iodine source but dairy can be inflammatory for some. Choose plain, probiotic-rich varieties.',
        nutritionalInfo: 'Iodine: 75mcg per cup | Calcium: 300mg | Probiotics: 1B CFU'
      },
      {
        id: 'th8',
        name: 'Millet',
        emoji: '🌾',
        verdict: 'moderate',
        reason: 'Contains goitrogens but also nutrients. Safe in moderation if iodine intake is adequate. Cooking helps.',
        nutritionalInfo: 'Goitrogens: moderate | Protein: 11g per 100g | Fiber: 8.5g'
      }
    ]
  },
  obesity: {
    name: 'Obesity',
    icon: '⚖️',
    color: '#f59e0b',
    description: 'Achieve healthy weight with smart nutrition choices',
    foods: [
      {
        id: 'ob1',
        name: 'Leafy Greens',
        emoji: '🥗',
        verdict: 'safe',
        reason: 'Extremely low in calories, high in volume and fiber. Creates satiety while providing essential nutrients.',
        nutritionalInfo: 'Calories: 23 per 100g | Fiber: 2.2g | Water: 92%'
      },
      {
        id: 'ob2',
        name: 'Grilled Chicken',
        emoji: '🍗',
        verdict: 'safe',
        reason: 'Lean protein increases satiety and preserves muscle during weight loss. High thermic effect boosts metabolism.',
        nutritionalInfo: 'Protein: 31g per 100g | Calories: 165 | Fat: 3.6g'
      },
      {
        id: 'ob3',
        name: 'Apple',
        emoji: '🍎',
        verdict: 'safe',
        reason: 'High in fiber and water content promotes fullness. Natural sweetness satisfies cravings with fewer calories.',
        nutritionalInfo: 'Calories: 52 per 100g | Fiber: 2.4g | Water: 86%'
      },
      {
        id: 'ob4',
        name: 'Lentils',
        emoji: '🫘',
        verdict: 'safe',
        reason: 'Rich in protein and fiber for sustained energy. Resistant starch reduces calorie absorption and feeds good gut bacteria.',
        nutritionalInfo: 'Protein: 9g per 100g | Fiber: 8g | Calories: 116'
      },
      {
        id: 'ob5',
        name: 'Donuts',
        emoji: '🍩',
        verdict: 'avoid',
        reason: 'Calorie bomb with refined flour, sugar, and trans fats. Zero nutritional value, triggers cravings and fat storage.',
        nutritionalInfo: 'Calories: 452 per donut | Sugar: 25g | Trans fats: 3g'
      },
      {
        id: 'ob6',
        name: 'French Fries',
        emoji: '🍟',
        verdict: 'avoid',
        reason: 'Deep-fried in inflammatory oils, very high in calories. Refined carbs spike insulin and promote fat storage.',
        nutritionalInfo: 'Calories: 312 per 100g | Fat: 15g | Sodium: 210mg'
      },
      {
        id: 'ob7',
        name: 'Nuts',
        emoji: '🥜',
        verdict: 'moderate',
        reason: 'Nutrient-dense but calorie-rich. Small portions provide healthy fats and protein. Easy to overeat.',
        nutritionalInfo: 'Calories: 579 per 100g | Healthy fats: 49g | Serving: 28g'
      },
      {
        id: 'ob8',
        name: 'Granola',
        emoji: '🥣',
        verdict: 'moderate',
        reason: 'Marketed as healthy but often loaded with sugar and oil. Check labels, measure portions carefully.',
        nutritionalInfo: 'Calories: 471 per 100g | Sugar: 20g | Serving: 50g'
      }
    ]
  }
};
