/**
 * English4Kids - Phase 3: Alphabet (ABC) & Basic Phonics
 * Features:
 * - Complete 26 letters A-Z (Uppercase + Lowercase, Vowel/Consonant classification)
 * - Letter Name vs. Phonics Sound comparison with Vietnamese pronunciation tips
 * - 3 illustrated example words per letter + spoken phonics chant
 * - Animated ABC Song & Read-Along (Web Audio melody + synchronized letter highlight)
 * - Interactive CVC Blending Builder (10 beginner 3-letter words)
 * - Phonics Listening Quiz with streaks and star rewards
 */
(function () {
  const ALPHABET_DATA = [
    {
      letter: 'A',
      isVowel: true,
      nameIpa: '/eɪ/',
      nameVi: 'Đọc là "ây"',
      nameSpeak: 'Letter A',
      phonicsIpa: '/æ/',
      phonicsVi: 'Âm ngắn "e-a"',
      phonicsSpeak: 'ah, ah, apple',
      phonicsShort: 'ah',
      tip: 'Mở rộng miệng đọc âm ngắn "e-a", như trong từ Apple!',
      color: '#EF4444',
      bg: '#FEE2E2',
      examples: [
        { en: 'Apple', vi: 'Quả Táo', emoji: '🍎' },
        { en: 'Ant', vi: 'Con Kiến', emoji: '🐜' },
        { en: 'Alligator', vi: 'Cá Sấu', emoji: '🐊' }
      ]
    },
    {
      letter: 'B',
      isVowel: false,
      nameIpa: '/biː/',
      nameVi: 'Đọc là "bi"',
      nameSpeak: 'Letter B',
      phonicsIpa: '/b/',
      phonicsVi: 'Âm bật "bờ"',
      phonicsSpeak: 'buh, buh, ball',
      phonicsShort: 'buh',
      tip: 'Mím nhẹ hai môi rồi bật hơi ra âm "bờ", như trong Ball!',
      color: '#F97316',
      bg: '#FFEDD5',
      examples: [
        { en: 'Ball', vi: 'Quả Bóng', emoji: '⚽' },
        { en: 'Banana', vi: 'Quả Chuối', emoji: '🍌' },
        { en: 'Bear', vi: 'Con Gấu', emoji: '🐻' }
      ]
    },
    {
      letter: 'C',
      isVowel: false,
      nameIpa: '/siː/',
      nameVi: 'Đọc là "xi"',
      nameSpeak: 'Letter C',
      phonicsIpa: '/k/',
      phonicsVi: 'Âm "cờ / khờ"',
      phonicsSpeak: 'kuh, kuh, cat',
      phonicsShort: 'kuh',
      tip: 'Chữ C thường đọc là âm "cờ" nhẹ ở cổ họng, như trong Cat!',
      color: '#EAB308',
      bg: '#FEF9C3',
      examples: [
        { en: 'Cat', vi: 'Con Mèo', emoji: '🐱' },
        { en: 'Car', vi: 'Xe Ô Tô', emoji: '🚗' },
        { en: 'Cake', vi: 'Bánh Kem', emoji: '🎂' }
      ]
    },
    {
      letter: 'D',
      isVowel: false,
      nameIpa: '/diː/',
      nameVi: 'Đọc là "đi"',
      nameSpeak: 'Letter D',
      phonicsIpa: '/d/',
      phonicsVi: 'Âm "đờ"',
      phonicsSpeak: 'duh, duh, dog',
      phonicsShort: 'duh',
      tip: 'Chạm đầu lưỡi lên hàm trên và bật ra âm "đờ", như trong Dog!',
      color: '#22C55E',
      bg: '#DCFCE7',
      examples: [
        { en: 'Dog', vi: 'Con Chó', emoji: '🐶' },
        { en: 'Duck', vi: 'Con Vịt', emoji: '🦆' },
        { en: 'Drum', vi: 'Cái Trống', emoji: '🥁' }
      ]
    },
    {
      letter: 'E',
      isVowel: true,
      nameIpa: '/iː/',
      nameVi: 'Đọc là "i"',
      nameSpeak: 'Letter E',
      phonicsIpa: '/e/',
      phonicsVi: 'Âm ngắn "e"',
      phonicsSpeak: 'eh, eh, egg',
      phonicsShort: 'eh',
      tip: 'Đọc ngắn và gọn âm "e" như tiếng Việt, như trong Egg!',
      color: '#14B8A6',
      bg: '#CCFBF1',
      examples: [
        { en: 'Egg', vi: 'Quả Trứng', emoji: '🥚' },
        { en: 'Elephant', vi: 'Con Voi', emoji: '🐘' },
        { en: 'Ear', vi: 'Cái Tai', emoji: '👂' }
      ]
    },
    {
      letter: 'F',
      isVowel: false,
      nameIpa: '/ef/',
      nameVi: 'Đọc là "ép"',
      nameSpeak: 'Letter F',
      phonicsIpa: '/f/',
      phonicsVi: 'Âm thổi "phờ"',
      phonicsSpeak: 'fff, fff, fish',
      phonicsShort: 'fff',
      tip: 'Răng trên chạm nhẹ môi dưới và thổi hơi ra âm "phờ" nhẹ!',
      color: '#0EA5E9',
      bg: '#E0F2FE',
      examples: [
        { en: 'Fish', vi: 'Con Cá', emoji: '🐟' },
        { en: 'Frog', vi: 'Con Ếch', emoji: '🐸' },
        { en: 'Flower', vi: 'Bông Hoa', emoji: '🌸' }
      ]
    },
    {
      letter: 'G',
      isVowel: false,
      nameIpa: '/dʒiː/',
      nameVi: 'Đọc là "gi"',
      nameSpeak: 'Letter G',
      phonicsIpa: '/ɡ/',
      phonicsVi: 'Âm "gờ"',
      phonicsSpeak: 'guh, guh, goat',
      phonicsShort: 'guh',
      tip: 'Phát âm "gờ" từ cuống họng thật rõ ràng, như trong Goat!',
      color: '#3B82F6',
      bg: '#DBEAFE',
      examples: [
        { en: 'Goat', vi: 'Con Dê', emoji: '🐐' },
        { en: 'Grapes', vi: 'Chùm Nho', emoji: '🍇' },
        { en: 'Gift', vi: 'Hộp Quà', emoji: '🎁' }
      ]
    },
    {
      letter: 'H',
      isVowel: false,
      nameIpa: '/eɪtʃ/',
      nameVi: 'Đọc là "ết-chờ"',
      nameSpeak: 'Letter H',
      phonicsIpa: '/h/',
      phonicsVi: 'Âm thở "hờ"',
      phonicsSpeak: 'huh, huh, hat',
      phonicsShort: 'huh',
      tip: 'Hà hơi nhẹ ra khỏi miệng như đang sưởi ấm bàn tay: "hờ"!',
      color: '#6366F1',
      bg: '#E0E7FF',
      examples: [
        { en: 'Hat', vi: 'Cái Mũ', emoji: '🎩' },
        { en: 'Horse', vi: 'Con Ngựa', emoji: '🐴' },
        { en: 'House', vi: 'Ngôi Nhà', emoji: '🏠' }
      ]
    },
    {
      letter: 'I',
      isVowel: true,
      nameIpa: '/aɪ/',
      nameVi: 'Đọc là "ai"',
      nameSpeak: 'Letter I',
      phonicsIpa: '/ɪ/',
      phonicsVi: 'Âm ngắn "i"',
      phonicsSpeak: 'ih, ih, igloo',
      phonicsShort: 'ih',
      tip: 'Mỉm cười nhẹ và đọc nhanh âm "i" ngắn, như trong Igloo!',
      color: '#8B5CF6',
      bg: '#EDE9FE',
      examples: [
        { en: 'Igloo', vi: 'Lều Tuyết', emoji: '❄️' },
        { en: 'Ice Cream', vi: 'Que Kem', emoji: '🍦' },
        { en: 'Insect', vi: 'Côn Trùng', emoji: '🐞' }
      ]
    },
    {
      letter: 'J',
      isVowel: false,
      nameIpa: '/dʒeɪ/',
      nameVi: 'Đọc là "giây"',
      nameSpeak: 'Letter J',
      phonicsIpa: '/dʒ/',
      phonicsVi: 'Âm "giờ" bật',
      phonicsSpeak: 'juh, juh, jam',
      phonicsShort: 'juh',
      tip: 'Tròn môi nhẹ và bật ra âm "giờ" mạnh mẽ, như trong Jam!',
      color: '#EC4899',
      bg: '#FCE7F3',
      examples: [
        { en: 'Jam', vi: 'Mứt Trái Cây', emoji: '🍓' },
        { en: 'Juice', vi: 'Nước Ép', emoji: '🧃' },
        { en: 'Jellyfish', vi: 'Con Sứa', emoji: '🪼' }
      ]
    },
    {
      letter: 'K',
      isVowel: false,
      nameIpa: '/keɪ/',
      nameVi: 'Đọc là "kây"',
      nameSpeak: 'Letter K',
      phonicsIpa: '/k/',
      phonicsVi: 'Âm "khờ"',
      phonicsSpeak: 'kuh, kuh, kite',
      phonicsShort: 'kuh',
      tip: 'Giống âm của chữ C, bật hơi "khờ" dứt khoát như trong Kite!',
      color: '#F43F5E',
      bg: '#FFE4E6',
      examples: [
        { en: 'Kite', vi: 'Cánh Diều', emoji: '🪁' },
        { en: 'King', vi: 'Nhà Vua', emoji: '👑' },
        { en: 'Koala', vi: 'Gấu Túi', emoji: '🐨' }
      ]
    },
    {
      letter: 'L',
      isVowel: false,
      nameIpa: '/el/',
      nameVi: 'Đọc là "eo"',
      nameSpeak: 'Letter L',
      phonicsIpa: '/l/',
      phonicsVi: 'Âm "lờ"',
      phonicsSpeak: 'lll, lll, lion',
      phonicsShort: 'lll',
      tip: 'Cong nhẹ đầu lưỡi chạm lợi trên và ngân âm "lờ", như Lion!',
      color: '#FF7A00',
      bg: '#FFF4D6',
      examples: [
        { en: 'Lion', vi: 'Con Sư Tử', emoji: '🦁' },
        { en: 'Lemon', vi: 'Quả Chanh', emoji: '🍋' },
        { en: 'Leaf', vi: 'Chiếc Lá', emoji: '🍃' }
      ]
    },
    {
      letter: 'M',
      isVowel: false,
      nameIpa: '/em/',
      nameVi: 'Đọc là "em"',
      nameSpeak: 'Letter M',
      phonicsIpa: '/m/',
      phonicsVi: 'Âm "mờ"',
      phonicsSpeak: 'mmm, mmm, monkey',
      phonicsShort: 'mmm',
      tip: 'Mím môi lại và ngân "mmm..." như khi ăn món ngon vậy!',
      color: '#F59E0B',
      bg: '#FEF3C7',
      examples: [
        { en: 'Monkey', vi: 'Con Khỉ', emoji: '🐵' },
        { en: 'Moon', vi: 'Mặt Trăng', emoji: '🌙' },
        { en: 'Milk', vi: 'Ly Sữa', emoji: '🥛' }
      ]
    },
    {
      letter: 'N',
      isVowel: false,
      nameIpa: '/en/',
      nameVi: 'Đọc là "en"',
      nameSpeak: 'Letter N',
      phonicsIpa: '/n/',
      phonicsVi: 'Âm "nờ"',
      phonicsSpeak: 'nnn, nnn, nest',
      phonicsShort: 'nnn',
      tip: 'Đặt lưỡi chạm nhẹ hàm trên và ngân âm "nờ" qua mũi!',
      color: '#10B981',
      bg: '#D1FAE5',
      examples: [
        { en: 'Nest', vi: 'Tổ Chim', emoji: '🪹' },
        { en: 'Nose', vi: 'Cái Mũi', emoji: '👃' },
        { en: 'Nine', vi: 'Số Chín', emoji: '9️⃣' }
      ]
    },
    {
      letter: 'O',
      isVowel: true,
      nameIpa: '/əʊ/',
      nameVi: 'Đọc là "âu"',
      nameSpeak: 'Letter O',
      phonicsIpa: '/ɒ/',
      phonicsVi: 'Âm ngắn "o"',
      phonicsSpeak: 'aw, aw, octopus',
      phonicsShort: 'aw',
      tip: 'Tròn miệng thành hình chữ O và đọc âm "o", như Octopus!',
      color: '#06B6D4',
      bg: '#CFFAFE',
      examples: [
        { en: 'Octopus', vi: 'Bạch Tuộc', emoji: '🐙' },
        { en: 'Orange', vi: 'Quả Cam', emoji: '🍊' },
        { en: 'Owl', vi: 'Chim Cú', emoji: '🦉' }
      ]
    },
    {
      letter: 'P',
      isVowel: false,
      nameIpa: '/piː/',
      nameVi: 'Đọc là "pi"',
      nameSpeak: 'Letter P',
      phonicsIpa: '/p/',
      phonicsVi: 'Âm bật gió "pờ"',
      phonicsSpeak: 'puh, puh, pig',
      phonicsShort: 'puh',
      tip: 'Mím môi và bật hơi thật mạnh ra ngoài: "pờ" (như thổi nến)!',
      color: '#EC4899',
      bg: '#FCE7F3',
      examples: [
        { en: 'Pig', vi: 'Con Heo', emoji: '🐷' },
        { en: 'Pencil', vi: 'Bút Chì', emoji: '✏️' },
        { en: 'Panda', vi: 'Gấu Trúc', emoji: '🐼' }
      ]
    },
    {
      letter: 'Q',
      isVowel: false,
      nameIpa: '/kjuː/',
      nameVi: 'Đọc là "kiu"',
      nameSpeak: 'Letter Q',
      phonicsIpa: '/kw/',
      phonicsVi: 'Âm "quờ"',
      phonicsSpeak: 'kwuh, kwuh, queen',
      phonicsShort: 'kwuh',
      tip: 'Chữ Q thường đi cùng bạn U thành "QU", đọc là "quờ" như Queen!',
      color: '#8B5CF6',
      bg: '#F3E8FF',
      examples: [
        { en: 'Queen', vi: 'Nữ Hoàng', emoji: '👸' },
        { en: 'Question', vi: 'Câu Hỏi', emoji: '❓' },
        { en: 'Quiet', vi: 'Im Lặng', emoji: '🤫' }
      ]
    },
    {
      letter: 'R',
      isVowel: false,
      nameIpa: '/ɑːr/',
      nameVi: 'Đọc là "a-rờ"',
      nameSpeak: 'Letter R',
      phonicsIpa: '/r/',
      phonicsVi: 'Âm uốn lưỡi "rờ"',
      phonicsSpeak: 'rrr, rrr, rabbit',
      phonicsShort: 'rrr',
      tip: 'Cong nhẹ đầu lưỡi vào trong (không chạm nóc miệng): "rrr"!',
      color: '#EF4444',
      bg: '#FEE2E2',
      examples: [
        { en: 'Rabbit', vi: 'Con Thỏ', emoji: '🐰' },
        { en: 'Rainbow', vi: 'Cầu Vồng', emoji: '🌈' },
        { en: 'Robot', vi: 'Người Máy', emoji: '🤖' }
      ]
    },
    {
      letter: 'S',
      isVowel: false,
      nameIpa: '/es/',
      nameVi: 'Đọc là "ét-xì"',
      nameSpeak: 'Letter S',
      phonicsIpa: '/s/',
      phonicsVi: 'Âm xì "xờ"',
      phonicsSpeak: 'sss, sss, sun',
      phonicsShort: 'sss',
      tip: 'Khép nhẹ răng và thổi gió "sss..." giống tiếng bạn rắn trườn!',
      color: '#F59E0B',
      bg: '#FEF9C3',
      examples: [
        { en: 'Sun', vi: 'Mặt Trời', emoji: '☀️' },
        { en: 'Star', vi: 'Ngôi Sao', emoji: '⭐' },
        { en: 'Snake', vi: 'Con Rắn', emoji: '🐍' }
      ]
    },
    {
      letter: 'T',
      isVowel: false,
      nameIpa: '/tiː/',
      nameVi: 'Đọc là "ti"',
      nameSpeak: 'Letter T',
      phonicsIpa: '/t/',
      phonicsVi: 'Âm bật "tờ"',
      phonicsSpeak: 'tuh, tuh, tiger',
      phonicsShort: 'tuh',
      tip: 'Bật hơi nhẹ ở đầu lưỡi: "tờ, tờ" như tiếng đồng hồ tích tắc!',
      color: '#22C55E',
      bg: '#DCFCE7',
      examples: [
        { en: 'Tiger', vi: 'Con Hổ', emoji: '🐯' },
        { en: 'Train', vi: 'Tàu Hỏa', emoji: '🚂' },
        { en: 'Tree', vi: 'Cái Cây', emoji: '🌳' }
      ]
    },
    {
      letter: 'U',
      isVowel: true,
      nameIpa: '/juː/',
      nameVi: 'Đọc là "iu"',
      nameSpeak: 'Letter U',
      phonicsIpa: '/ʌ/',
      phonicsVi: 'Âm ngắn "ă"',
      phonicsSpeak: 'uh, uh, umbrella',
      phonicsShort: 'uh',
      tip: 'Thả lỏng miệng đọc nhanh âm "ă", như trong Umbrella!',
      color: '#3B82F6',
      bg: '#DBEAFE',
      examples: [
        { en: 'Umbrella', vi: 'Cái Ô / Dù', emoji: '☂️' },
        { en: 'Up', vi: 'Đi Lên', emoji: '⬆️' },
        { en: 'Unicorn', vi: 'Kỳ Lân', emoji: '🦄' }
      ]
    },
    {
      letter: 'V',
      isVowel: false,
      nameIpa: '/viː/',
      nameVi: 'Đọc là "vi"',
      nameSpeak: 'Letter V',
      phonicsIpa: '/v/',
      phonicsVi: 'Âm rung "vờ"',
      phonicsSpeak: 'vvv, vvv, van',
      phonicsShort: 'vvv',
      tip: 'Răng trên chạm môi dưới và rung cổ họng tạo âm "vờ"!',
      color: '#6366F1',
      bg: '#E0E7FF',
      examples: [
        { en: 'Van', vi: 'Xe Tải Nhỏ', emoji: '🚐' },
        { en: 'Violin', vi: 'Đàn Vĩ Cầm', emoji: '🎻' },
        { en: 'Volcano', vi: 'Núi Lửa', emoji: '🌋' }
      ]
    },
    {
      letter: 'W',
      isVowel: false,
      nameIpa: '/ˈdʌb.əl.juː/',
      nameVi: 'Đọc là "đắp-bờ-liu"',
      nameSpeak: 'Letter W',
      phonicsIpa: '/w/',
      phonicsVi: 'Âm "uờ"',
      phonicsSpeak: 'wuh, wuh, whale',
      phonicsShort: 'wuh',
      tip: 'Chụm tròn môi như đang huýt sáo rồi mở ra đọc "uờ", như Whale!',
      color: '#0EA5E9',
      bg: '#E0F2FE',
      examples: [
        { en: 'Whale', vi: 'Cá Voi', emoji: '🐳' },
        { en: 'Watermelon', vi: 'Dưa Hấu', emoji: '🍉' },
        { en: 'Watch', vi: 'Đồng Hồ', emoji: '⌚' }
      ]
    },
    {
      letter: 'X',
      isVowel: false,
      nameIpa: '/eks/',
      nameVi: 'Đọc là "éc-xì"',
      nameSpeak: 'Letter X',
      phonicsIpa: '/ks/',
      phonicsVi: 'Âm "k-xờ"',
      phonicsSpeak: 'ks, ks, box',
      phonicsShort: 'ks',
      tip: 'Đọc ghép nhanh âm "cờ" + "xì" thành "k-xờ", thường ở cuối từ Box, Fox!',
      color: '#14B8A6',
      bg: '#CCFBF1',
      examples: [
        { en: 'Box', vi: 'Cái Hộp', emoji: '📦' },
        { en: 'Fox', vi: 'Con Cáo', emoji: '🦊' },
        { en: 'Xylophone', vi: 'Đàn Phiến Gỗ', emoji: '🎶' }
      ]
    },
    {
      letter: 'Y',
      isVowel: false,
      nameIpa: '/waɪ/',
      nameVi: 'Đọc là "oai"',
      nameSpeak: 'Letter Y',
      phonicsIpa: '/j/',
      phonicsVi: 'Âm "dờ / iờ"',
      phonicsSpeak: 'yuh, yuh, yo-yo',
      phonicsShort: 'yuh',
      tip: 'Đọc nhẹ nhàng âm "i-ờ", như trong Yellow và Yo-yo!',
      color: '#EAB308',
      bg: '#FEF9C3',
      examples: [
        { en: 'Yellow', vi: 'Màu Vàng', emoji: '💛' },
        { en: 'Yo-yo', vi: 'Con Quay Yo-yo', emoji: '🪀' },
        { en: 'Yogurt', vi: 'Sữa Chua', emoji: '🥛' }
      ]
    },
    {
      letter: 'Z',
      isVowel: false,
      nameIpa: '/ziː/',
      nameVi: 'Đọc là "di"',
      nameSpeak: 'Letter Z',
      phonicsIpa: '/z/',
      phonicsVi: 'Âm rung "dờ-zờ"',
      phonicsSpeak: 'zzz, zzz, zebra',
      phonicsShort: 'zzz',
      tip: 'Khép răng và rung cổ họng tạo tiếng "zzz..." như chú ong bay!',
      color: '#A855F7',
      bg: '#F3E8FF',
      examples: [
        { en: 'Zebra', vi: 'Ngựa Vằn', emoji: '🦓' },
        { en: 'Zoo', vi: 'Sở Thú', emoji: '🦒' },
        { en: 'Zero', vi: 'Số Không (0)', emoji: '0️⃣' }
      ]
    }
  ];

  // 10 Beginner CVC Blending Words for 6-year-olds
  const BLEND_WORDS = [
    { word: 'CAT', vi: 'Con Mèo', emoji: '🐱', ipa: '/kæt/', parts: [{ ch: 'C', speak: 'kuh', ipa: '/k/' }, { ch: 'A', speak: 'ah', ipa: '/æ/' }, { ch: 'T', speak: 'tuh', ipa: '/t/' }] },
    { word: 'DOG', vi: 'Con Chó', emoji: '🐶', ipa: '/dɒɡ/', parts: [{ ch: 'D', speak: 'duh', ipa: '/d/' }, { ch: 'O', speak: 'aw', ipa: '/ɒ/' }, { ch: 'G', speak: 'guh', ipa: '/ɡ/' }] },
    { word: 'SUN', vi: 'Mặt Trời', emoji: '☀️', ipa: '/sʌn/', parts: [{ ch: 'S', speak: 'sss', ipa: '/s/' }, { ch: 'U', speak: 'uh', ipa: '/ʌ/' }, { ch: 'N', speak: 'nnn', ipa: '/n/' }] },
    { word: 'BUS', vi: 'Xe Buýt', emoji: '🚌', ipa: '/bʌs/', parts: [{ ch: 'B', speak: 'buh', ipa: '/b/' }, { ch: 'U', speak: 'uh', ipa: '/ʌ/' }, { ch: 'S', speak: 'sss', ipa: '/s/' }] },
    { word: 'PIG', vi: 'Con Heo', emoji: '🐷', ipa: '/pɪɡ/', parts: [{ ch: 'P', speak: 'puh', ipa: '/p/' }, { ch: 'I', speak: 'ih', ipa: '/ɪ/' }, { ch: 'G', speak: 'guh', ipa: '/ɡ/' }] },
    { word: 'HAT', vi: 'Cái Mũ', emoji: '🎩', ipa: '/hæt/', parts: [{ ch: 'H', speak: 'huh', ipa: '/h/' }, { ch: 'A', speak: 'ah', ipa: '/æ/' }, { ch: 'T', speak: 'tuh', ipa: '/t/' }] },
    { word: 'BED', vi: 'Cái Giường', emoji: '🛏️', ipa: '/bed/', parts: [{ ch: 'B', speak: 'buh', ipa: '/b/' }, { ch: 'E', speak: 'eh', ipa: '/e/' }, { ch: 'D', speak: 'duh', ipa: '/d/' }] },
    { word: 'CUP', vi: 'Cái Cốc', emoji: '☕', ipa: '/kʌp/', parts: [{ ch: 'C', speak: 'kuh', ipa: '/k/' }, { ch: 'U', speak: 'uh', ipa: '/ʌ/' }, { ch: 'P', speak: 'puh', ipa: '/p/' }] },
    { word: 'BOX', vi: 'Cái Hộp', emoji: '📦', ipa: '/bɒks/', parts: [{ ch: 'B', speak: 'buh', ipa: '/b/' }, { ch: 'O', speak: 'aw', ipa: '/ɒ/' }, { ch: 'X', speak: 'ks', ipa: '/ks/' }] },
    { word: 'FOX', vi: 'Con Cáo', emoji: '🦊', ipa: '/fɒks/', parts: [{ ch: 'F', speak: 'fff', ipa: '/f/' }, { ch: 'O', speak: 'aw', ipa: '/ɒ/' }, { ch: 'X', speak: 'ks', ipa: '/ks/' }] }
  ];

  // Classic Twinkle-Twinkle / ABC Song note frequencies (26 letters mapped sequentially)
  const ABC_MELODY = [
    261.63, 261.63, 392.00, 392.00, 440.00, 440.00, 392.00, // A B C D E F G
    349.23, 349.23, 329.63, 329.63, 293.66, 293.66, 261.63, // H I J K L M N
    392.00, 392.00, 349.23, 349.23, 329.63, 329.63, 293.66, // O P Q R S T U
    392.00, 392.00, 349.23, 329.63, 293.66                  // V W X Y Z
  ];

  const pState = {
    selectedIndex: 0,
    filter: 'all', // 'all' | 'vowels'
    activeTab: 'board', // 'board' | 'blend' | 'quiz'
    songPlaying: false,
    songTimers: [],
    blendIndex: 0,
    blendTimers: [],
    quiz: {
      pool: [],
      index: 0,
      streak: 0,
      answer: null,
      mode: 'name', // 'name' | 'phonics'
      answered: false
    }
  };

  const $ = id => document.getElementById(id);

  function playNote(freq, duration = 0.28) {
    if (!state.soundEnabled || typeof getAudioContext !== 'function') return;
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  function stopAbcSong() {
    pState.songPlaying = false;
    pState.songTimers.forEach(t => clearTimeout(t));
    pState.songTimers = [];
    const btn = $('btn-abc-song');
    if (btn) {
      btn.textContent = '🎶 Hát & Đọc A–Z';
      btn.classList.remove('playing');
    }
    document.querySelectorAll('.alpha-tile.singing').forEach(el => el.classList.remove('singing'));
  }

  function stopBlendTimers() {
    pState.blendTimers.forEach(t => clearTimeout(t));
    pState.blendTimers = [];
    document.querySelectorAll('.blend-letter-tile.active-sound').forEach(el => el.classList.remove('active-sound'));
  }

  function updatePhonicsProgressUI() {
    const count = state.learnedLetters.size;
    const homeBadge = $('phonics-home-progress');
    if (homeBadge) homeBadge.textContent = `⭐ Đã thuộc: ${ count } / 26 chữ`;
    const pill = $('phonics-mastered-pill');
    if (pill) pill.textContent = `⭐ Đã thuộc: ${ count } / 26`;
  }

  /* ==========================================================================
     Navigation & Tabs
     ========================================================================== */
  function openPhonics(initialTab = 'board') {
    stopAbcSong();
    stopBlendTimers();
    document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));
    $('view-phonics').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    switchPhonicsTab(initialTab);
  }

  function switchPhonicsTab(tab) {
    stopAbcSong();
    stopBlendTimers();
    pState.activeTab = tab;

    ['board', 'blend', 'quiz'].forEach(name => {
      const btn = $(`tab-phonics-${ name }`);
      const panel = $(`phonics-panel-${ name }`);
      const active = name === tab;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
      panel.classList.toggle('hidden', !active);
    });

    if (tab === 'board') {
      renderAlphabetGrid();
      renderLetterSpotlight(false);
    } else if (tab === 'blend') {
      renderBlendWord(true);
    } else if (tab === 'quiz') {
      startPhonicsQuiz();
    }
  }

  function goHomeFromPhonics() {
    stopAbcSong();
    stopBlendTimers();
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));
    $('view-home').classList.add('active');
    updatePhonicsProgressUI();
    renderTopicsGrid();
  }

  /* ==========================================================================
     Tab 1: Alphabet A-Z Grid & Spotlight Card
     ========================================================================== */
  function renderAlphabetGrid() {
    const grid = $('alphabet-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const items = ALPHABET_DATA.map((item, idx) => ({ item, idx }))
      .filter(({ item }) => pState.filter === 'all' || item.isVowel);

    items.forEach(({ item, idx }) => {
      const tile = document.createElement('button');
      tile.type = 'button';
      tile.className = 'alpha-tile';
      tile.id = `alpha-tile-${ item.letter }`;
      if (item.isVowel) tile.classList.add('is-vowel');
      if (idx === pState.selectedIndex) tile.classList.add('selected');
      if (state.learnedLetters.has(item.letter)) tile.classList.add('learned');

      tile.style.setProperty('--alpha-color', item.color);
      tile.style.setProperty('--alpha-bg', item.bg);

      tile.innerHTML = `
        <span class="alpha-pair">${ item.letter }<small>${ item.letter.toLowerCase() }</small></span>
        <span class="alpha-emoji">${ item.examples[0].emoji }</span>
      `;

      tile.addEventListener('click', () => {
        stopAbcSong();
        playSoundEffect('pop');
        pState.selectedIndex = idx;
        renderAlphabetGrid();
        renderLetterSpotlight(true);
      });

      grid.appendChild(tile);
    });
  }

  function renderLetterSpotlight(autoSpeak = false) {
    const data = ALPHABET_DATA[pState.selectedIndex];
    if (!data) return;

    const card = $('phonics-spotlight-card');
    card.style.setProperty('--spot-color', data.color);
    card.style.setProperty('--spot-bg', data.bg);

    const typeBadge = $('letter-type-badge');
    if (data.isVowel) {
      typeBadge.textContent = '🌟 Nguyên âm (Vowel)';
      typeBadge.classList.add('vowel');
    } else {
      typeBadge.textContent = '🔤 Phụ âm (Consonant)';
      typeBadge.classList.remove('vowel');
    }

    const isLearned = state.learnedLetters.has(data.letter);
    $('letter-learned-badge').classList.toggle('visible', isLearned);

    $('spotlight-upper').textContent = data.letter;
    $('spotlight-lower').textContent = data.letter.toLowerCase();
    $('spotlight-name-ipa').textContent = data.nameIpa;
    $('spotlight-name-vi').textContent = `(${ data.nameVi })`;
    $('spotlight-phonics-ipa').textContent = data.phonicsIpa;
    $('spotlight-phonics-vi').textContent = `(${ data.phonicsVi })`;
    $('spotlight-tip').innerHTML = `💡 Mẹo đọc: ${ data.tip }`;
    $('examples-letter-label').textContent = data.letter;

    const examplesGrid = $('letter-examples-grid');
    examplesGrid.innerHTML = '';
    data.examples.forEach(ex => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'letter-example-btn';
      btn.innerHTML = `
        <span class="lex-emoji">${ ex.emoji }</span>
        <div class="lex-text">
          <strong>${ ex.en }</strong>
          <span>${ ex.vi }</span>
        </div>
        <span class="lex-speaker">🔊</span>
      `;
      btn.addEventListener('click', () => {
        playSoundEffect('pop');
        speakEnglish(ex.en, 0.88);
      });
      examplesGrid.appendChild(btn);
    });

    const markBtn = $('btn-mark-letter-learned');
    if (isLearned) {
      markBtn.classList.add('is-learned');
      $('mark-letter-icon').textContent = '🌟';
      $('mark-letter-text').textContent = `Đã thuộc chữ ${ data.letter }! (+1 Sao)`;
    } else {
      markBtn.classList.remove('is-learned');
      $('mark-letter-icon').textContent = '⭐';
      $('mark-letter-text').textContent = `Bé đã thuộc chữ ${ data.letter }!`;
    }

    updatePhonicsProgressUI();

    if (autoSpeak) {
      setTimeout(() => {
        speakEnglish(`${ data.letter }, ${ data.phonicsSpeak }`, 0.86);
      }, 140);
    }
  }

  function navigateLetter(delta) {
    stopAbcSong();
    const pool = pState.filter === 'vowels'
      ? ALPHABET_DATA.map((item, idx) => ({ item, idx })).filter(x => x.item.isVowel)
      : ALPHABET_DATA.map((item, idx) => ({ item, idx }));
    const pos = Math.max(0, pool.findIndex(x => x.idx === pState.selectedIndex));
    const next = pool[(pos + delta + pool.length) % pool.length];
    pState.selectedIndex = next.idx;
    playSoundEffect('pop');
    renderAlphabetGrid();
    renderLetterSpotlight(true);
  }

  function toggleMarkLetterLearned() {
    const data = ALPHABET_DATA[pState.selectedIndex];
    if (!data) return;

    if (!state.learnedLetters.has(data.letter)) {
      state.learnedLetters.add(data.letter);
      state.stars += 1;
      playSoundEffect('star');
      launchConfettiBurst();
      speakEnglish(`Awesome! ${ data.letter } is for ${ data.examples[0].en }!`, 0.92);
    } else {
      state.learnedLetters.delete(data.letter);
      state.stars = Math.max(0, state.stars - 1);
      playSoundEffect('pop');
    }

    saveProgress();
    updateHeaderAndMissionUI();
    renderAlphabetGrid();
    renderLetterSpotlight(false);
  }

  function toggleAbcSong() {
    if (pState.songPlaying) {
      stopAbcSong();
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      return;
    }

    // Ensure all 26 letters are visible for the ABC song
    if (pState.filter !== 'all') {
      pState.filter = 'all';
      $('btn-filter-all-letters').classList.add('active');
      $('btn-filter-vowels').classList.remove('active');
    }

    pState.songPlaying = true;
    const btn = $('btn-abc-song');
    btn.textContent = '⏹️ Dừng bài hát';
    btn.classList.add('playing');

    const stepMs = 760;
    ALPHABET_DATA.forEach((item, idx) => {
      const timerId = setTimeout(() => {
        if (!pState.songPlaying) return;
        pState.selectedIndex = idx;
        renderAlphabetGrid();
        renderLetterSpotlight(false);

        const tile = $(`alpha-tile-${ item.letter }`);
        if (tile) tile.classList.add('singing');

        playNote(ABC_MELODY[idx], 0.34);
        speakEnglish(item.letter, 0.96);

        if (idx === ALPHABET_DATA.length - 1) {
          const endTimer = setTimeout(() => {
            stopAbcSong();
            playSoundEffect('star');
            launchConfettiBurst();
          }, 950);
          pState.songTimers.push(endTimer);
        }
      }, idx * stepMs);
      pState.songTimers.push(timerId);
    });
  }

  /* ==========================================================================
     Tab 2: CVC Word Blending
     ========================================================================== */
  function renderBlendWord(autoSpeak = false) {
    stopBlendTimers();
    const item = BLEND_WORDS[pState.blendIndex];
    if (!item) return;

    $('blend-progress-label').textContent = `Từ ${ pState.blendIndex + 1 } / ${ BLEND_WORDS.length }`;
    $('blend-emoji').textContent = item.emoji;
    $('blend-full-word').textContent = item.word;
    $('blend-ipa').textContent = item.ipa;
    $('blend-vi').textContent = item.vi;

    const row = $('blend-tiles-row');
    row.innerHTML = '';

    item.parts.forEach((part, idx) => {
      if (idx > 0) {
        const plus = document.createElement('span');
        plus.className = 'blend-plus';
        plus.textContent = '+';
        row.appendChild(plus);
      }

      const tile = document.createElement('button');
      tile.type = 'button';
      tile.className = 'blend-letter-tile';
      tile.id = `blend-tile-${ idx }`;
      const isVowel = ['A', 'E', 'I', 'O', 'U'].includes(part.ch);
      if (isVowel) tile.classList.add('is-vowel');
      tile.innerHTML = `
        <span class="blend-ch">${ part.ch }</span>
        <span class="blend-ipa-chip">${ part.ipa }</span>
      `;
      tile.addEventListener('click', () => {
        playSoundEffect('pop');
        tile.classList.add('active-sound');
        setTimeout(() => tile.classList.remove('active-sound'), 450);
        speakEnglish(part.speak, 0.85);
      });
      row.appendChild(tile);
    });

    if (autoSpeak) {
      setTimeout(() => speakEnglish(item.word.toLowerCase(), 0.85), 180);
    }
  }

  function playBlendingSequence(slow = false) {
    stopBlendTimers();
    const item = BLEND_WORDS[pState.blendIndex];
    if (!item) return;

    const step = slow ? 850 : 600;
    item.parts.forEach((part, idx) => {
      const t = setTimeout(() => {
        const tile = $(`blend-tile-${ idx }`);
        document.querySelectorAll('.blend-letter-tile').forEach(el => el.classList.remove('active-sound'));
        if (tile) tile.classList.add('active-sound');
        speakEnglish(part.speak, slow ? 0.72 : 0.88);
      }, idx * step);
      pState.blendTimers.push(t);
    });

    const finalTimer = setTimeout(() => {
      document.querySelectorAll('.blend-letter-tile').forEach(el => el.classList.add('active-sound'));
      playSoundEffect('pop');
      speakEnglish(item.word.toLowerCase(), slow ? 0.75 : 0.9);
      const clearT = setTimeout(() => {
        document.querySelectorAll('.blend-letter-tile').forEach(el => el.classList.remove('active-sound'));
      }, 900);
      pState.blendTimers.push(clearT);
    }, item.parts.length * step + 180);

    pState.blendTimers.push(finalTimer);
  }

  /* ==========================================================================
     Tab 3: Phonics Quiz
     ========================================================================== */
  function startPhonicsQuiz() {
    pState.quiz.pool = shuffleArray(ALPHABET_DATA).slice(0, 8);
    pState.quiz.index = 0;
    pState.quiz.streak = 0;
    renderPhonicsQuizQuestion();
  }

  function speakPhonicsQuizPrompt() {
    const q = pState.quiz;
    if (!q.answer) return;
    if (q.mode === 'name') {
      speakEnglish(`${ q.answer.nameSpeak }`, 0.86);
    } else {
      speakEnglish(`${ q.answer.phonicsSpeak }`, 0.85);
    }
  }

  function renderPhonicsQuizQuestion() {
    const q = pState.quiz;
    const target = q.pool[q.index];
    q.answer = target;
    q.answered = false;
    q.mode = q.index % 2 === 0 ? 'phonics' : 'name';

    $('pquiz-progress-label').textContent = `Câu ${ q.index + 1 } / ${ q.pool.length }`;
    $('pquiz-streak-label').textContent = `🔥 Chuỗi đúng: ${ q.streak }`;

    $('pquiz-instruction').textContent = q.mode === 'phonics'
      ? `👂 Nghe âm Phonics và chọn chữ cái bắt đầu cho từ mẫu nhé!`
      : `👂 Nghe tên chữ cái tiếng Anh và chọn đúng thẻ chữ nhé!`;

    const hintBox = $('pquiz-hint-box');
    hintBox.textContent = `${ target.examples[0].emoji } ${ target.examples[0].en } (${ target.examples[0].vi })`;
    hintBox.classList.add('hidden');
    $('pquiz-feedback-banner').classList.add('hidden');

    const distractors = shuffleArray(ALPHABET_DATA.filter(x => x.letter !== target.letter)).slice(0, 3);
    const options = shuffleArray([target, ...distractors]);

    const grid = $('pquiz-options-grid');
    grid.innerHTML = '';

    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pquiz-option-btn';
      btn.style.setProperty('--opt-color', opt.color);
      btn.style.setProperty('--opt-bg', opt.bg);
      btn.innerHTML = `
        <span class="pquiz-letter">${ opt.letter } <small>${ opt.letter.toLowerCase() }</small></span>
        <span class="pquiz-word-hint">${ opt.examples[0].emoji }</span>
      `;
      btn.addEventListener('click', () => handlePhonicsQuizPick(btn, opt));
      grid.appendChild(btn);
    });

    setTimeout(speakPhonicsQuizPrompt, 200);
  }

  function handlePhonicsQuizPick(btn, chosen) {
    const q = pState.quiz;
    if (q.answered) return;
    const target = q.answer;

    if (chosen.letter === target.letter) {
      q.answered = true;
      q.streak += 1;
      state.stars += 2;
      state.learnedLetters.add(target.letter);
      saveProgress();
      updateHeaderAndMissionUI();
      updatePhonicsProgressUI();

      btn.classList.add('correct');
      playSoundEffect('correct');
      launchConfettiBurst();
      speakEnglish(`Great! ${ target.letter } is for ${ target.examples[0].en }!`, 0.92);

      $('pquiz-hint-box').classList.remove('hidden');
      const isLast = q.index >= q.pool.length - 1;
      $('pquiz-feedback-msg').textContent = `🎉 Giỏi lắm! Chữ ${ target.letter } (${ target.examples[0].en } - ${ target.examples[0].vi }) (+2 Sao)`;
      $('btn-pquiz-next').textContent = isLast ? '🏆 Hoàn thành & Chơi lại' : 'Câu tiếp theo ➔';
      $('pquiz-feedback-banner').classList.remove('hidden');
      $('pquiz-streak-label').textContent = `🔥 Chuỗi đúng: ${ q.streak }`;
    } else {
      q.streak = 0;
      $('pquiz-streak-label').textContent = '🔥 Chuỗi đúng: 0';
      btn.classList.add('wrong');
      btn.disabled = true;
      playSoundEffect('wrong');
      speakPhonicsQuizPrompt();
    }
  }

  /* ==========================================================================
     Event Binding & Initialization
     ========================================================================== */
  function bindPhonicsEvents() {
    document.querySelectorAll('[data-phonics-tab]').forEach(tile => {
      tile.addEventListener('click', () => {
        playSoundEffect('pop');
        openPhonics(tile.dataset.phonicsTab);
      });
    });

    $('btn-phonics-back').addEventListener('click', () => {
      playSoundEffect('pop');
      goHomeFromPhonics();
    });

    $('btn-home-logo').addEventListener('click', () => {
      stopAbcSong();
      stopBlendTimers();
      updatePhonicsProgressUI();
    });

    $('tab-phonics-board').addEventListener('click', () => {
      playSoundEffect('pop');
      switchPhonicsTab('board');
    });
    $('tab-phonics-blend').addEventListener('click', () => {
      playSoundEffect('pop');
      switchPhonicsTab('blend');
    });
    $('tab-phonics-quiz').addEventListener('click', () => {
      playSoundEffect('pop');
      switchPhonicsTab('quiz');
    });

    $('btn-filter-all-letters').addEventListener('click', () => {
      stopAbcSong();
      playSoundEffect('pop');
      pState.filter = 'all';
      $('btn-filter-all-letters').classList.add('active');
      $('btn-filter-vowels').classList.remove('active');
      renderAlphabetGrid();
    });

    $('btn-filter-vowels').addEventListener('click', () => {
      stopAbcSong();
      playSoundEffect('pop');
      pState.filter = 'vowels';
      $('btn-filter-vowels').classList.add('active');
      $('btn-filter-all-letters').classList.remove('active');
      if (!ALPHABET_DATA[pState.selectedIndex].isVowel) {
        pState.selectedIndex = 0; // 'A'
      }
      renderAlphabetGrid();
      renderLetterSpotlight(true);
    });

    $('btn-abc-song').addEventListener('click', toggleAbcSong);

    $('btn-prev-letter').addEventListener('click', () => navigateLetter(-1));
    $('btn-next-letter').addEventListener('click', () => navigateLetter(1));

    $('btn-play-letter-name').addEventListener('click', () => {
      const data = ALPHABET_DATA[pState.selectedIndex];
      if (data) speakEnglish(data.nameSpeak, 0.86);
    });

    $('btn-play-letter-phonics').addEventListener('click', () => {
      const data = ALPHABET_DATA[pState.selectedIndex];
      if (data) speakEnglish(data.phonicsSpeak, 0.82);
    });

    $('btn-play-letter-chant').addEventListener('click', () => {
      const data = ALPHABET_DATA[pState.selectedIndex];
      if (data) speakEnglish(`${ data.letter } is for ${ data.examples[0].en }. ${ data.phonicsSpeak }!`, 0.85);
    });

    $('btn-mark-letter-learned').addEventListener('click', toggleMarkLetterLearned);

    // Blending tab buttons
    $('btn-blend-word').addEventListener('click', () => playBlendingSequence(false));
    $('btn-blend-slow').addEventListener('click', () => playBlendingSequence(true));
    $('btn-blend-prev').addEventListener('click', () => {
      playSoundEffect('pop');
      pState.blendIndex = (pState.blendIndex - 1 + BLEND_WORDS.length) % BLEND_WORDS.length;
      renderBlendWord(true);
    });
    $('btn-blend-next').addEventListener('click', () => {
      playSoundEffect('pop');
      pState.blendIndex = (pState.blendIndex + 1) % BLEND_WORDS.length;
      renderBlendWord(true);
    });

    // Quiz tab buttons
    $('btn-pquiz-replay').addEventListener('click', speakPhonicsQuizPrompt);
    $('btn-pquiz-hint').addEventListener('click', () => {
      $('pquiz-hint-box').classList.remove('hidden');
    });
    $('btn-pquiz-next').addEventListener('click', () => {
      playSoundEffect('pop');
      if (pState.quiz.index < pState.quiz.pool.length - 1) {
        pState.quiz.index += 1;
        renderPhonicsQuizQuestion();
      } else {
        startPhonicsQuiz();
      }
    });
  }

  window.refreshPhonicsUI = function () {
    updatePhonicsProgressUI();
    if ($('view-phonics') && $('view-phonics').classList.contains('active')) {
      renderAlphabetGrid();
      renderLetterSpotlight(false);
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    updatePhonicsProgressUI();
    bindPhonicsEvents();
  });
})();
