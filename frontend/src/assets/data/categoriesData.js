export const categoriesData = [
    {
        name: "Makeup",
        url: "/products/makeup",
        isVisible: "isMakeupVisible",
        subcategories: [
            { name: "Blush", url: "products/makeup/blush" },
            { name: "Eyes + Brows", url: "products/makeup/eyes+brows" },
            { name: "Foundation", url: "products/makeup/foundation" },
            { name: "Lips", url: "products/makeup/lips" },
            { name: "Makeup Brushes", url: "products/makeup/brushes" }
        ]
    },
    {
        name: "Bath + Body",
        url: "/products/bath+body",
        isVisible: "isBathVisible",
        subcategories: [
            { name: "Body Lotion", url: "/products/bath+body/body-lotion" },
            { name: "Body Wash", url: "/products/bath+body/body-wash" },
            { name: "Hand Cream", url: "/products/bath+body/hand-cream" },
            { name: "Fragrance", url: "/products/bath+body/fragrance" },
            { name: "Soap", url: "/products/bath+body/soap" }
        ]
    },
    {
        name: "Skincare",
        url: "/products/skincare",
        isVisible: "isSkincareVisible",
        subcategories: [
            { name: "Cleansers", url: '/products/skincare/cleansers' },
            { name: "Masks + Exfoliants", url: '/products/skincare/masks+exfoliants' },
            { name: "Moisturizers", url: '/products/skincare/moisturizers' },
            { name: "Oils + Serums", url: '/products/skincare/oils+serums' },
            { name: "Toners", url: '/products/skincare/toners' }
        ]
    },
    {
        name: "Hair + Nails",
        url: '/products/hair+nails',
        isVisible: "isHairVisible",
        subcategories: [
            { name: "Conditioner", url: '/products/hair+nails/conditioner' },
            { name: "Nails", url: '/products/hair+nails/nails' },
            { name: "Shampoo", url: '/products/hair+nails/shampoo' },
            { name: "Treatment + Styling", url: '/products/hair+nails/treatment+styling' }
        ]
    },
    {
        name: "Wellness",
        url: '/products/wellness',
        isVisible: "isWellnessVisible",
        subcategories: [
            { name: "Candles", url: '/products/wellness/candles' },
            { name: "Edible Beauty", url: '/products/wellness/edible-beauty' },
            { name: "Cleaning", url: '/products/wellness/cleaning' }
        ]
    },
];
