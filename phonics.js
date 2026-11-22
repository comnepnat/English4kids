/**
 * English4Kids - Phase 3 (Expanded): ABC, 8 Digraphs, 32 Word-Family Blending & 3-Mode Phonics Quiz
 * Features:
 * - 26 letters A-Z with 4 illustrated words each (104 words) + Vowel filter
 * - 8 Grade-1 Digraphs (SH, CH, TH, PH, WH, CK, NG, OO) with 4 words each (32 words)
 * - Animated ABC Song & Read-Along (Web Audio melody + synchronized letter highlight)
 * - 32 Blending words organized into 6 Word Families (-at/-an, -og/-ox, -un/-ug, -ig/-in, -ed/-en, sh/ch/th)
 * - 3-Mode Phonics Quiz: Listen & Pick, Beginning Sound (_at), and Rhyming Match
 */
(function () {
  const ALPHABET_DATA = [
    {
      letter: 'A', isVowel: true, nameIpa: '/eɪ/', nameVi: 'Đọc là "ây"', nameSpeak: 'Letter A',
      phonicsIpa: '/æ/', phonicsVi: 'Âm ngắn "e-a"', phonicsSpeak: 'ah, ah, apple',
      tip: 'Mở rộng miệng đọc âm ngắn "e-a", như trong từ Apple!', color: '#EF4444', bg: '#FEE2E2',
      examples: [
        { en: 'Apple', vi: 'Quả Táo', emoji: '🍎' },
        { en: 'Ant', vi: 'Con Kiến', emoji: '🐜' },
        { en: 'Alligator', vi: 'Cá Sấu', emoji: '🐊' },
        { en: 'Airplane', vi: 'Máy Bay', emoji: '✈️' }
      ]
    },
    {
      letter: 'B', isVowel: false, nameIpa: '/biː/', nameVi: 'Đọc là "bi"', nameSpeak: 'Letter B',
      phonicsIpa: '/b/', phonicsVi: 'Âm bật "bờ"', phonicsSpeak: 'buh, buh, ball',
      tip: 'Mím nhẹ hai môi rồi bật hơi ra âm "bờ", như trong Ball!', color: '#F97316', bg: '#FFEDD5',
      examples: [
        { en: 'Ball', vi: 'Quả Bóng', emoji: '⚽' },
        { en: 'Banana', vi: 'Quả Chuối', emoji: '🍌' },
        { en: 'Bear', vi: 'Con Gấu', emoji: '🐻' },
        { en: 'Bus', vi: 'Xe Buýt', emoji: '🚌' }
      ]
    },
    {
      letter: 'C', isVowel: false, nameIpa: '/siː/', nameVi: 'Đọc là "xi"', nameSpeak: 'Letter C',
      phonicsIpa: '/k/', phonicsVi: 'Âm "cờ / khờ"', phonicsSpeak: 'kuh, kuh, cat',
      tip: 'Chữ C thường đọc là âm "cờ" nhẹ ở cổ họng, như trong Cat!', color: '#EAB308', bg: '#FEF9C3',
      examples: [
        { en: 'Cat', vi: 'Con Mèo', emoji: '🐱' },
        { en: 'Car', vi: 'Xe Ô Tô', emoji: '🚗' },
        { en: 'Cake', vi: 'Bánh Kem', emoji: '🎂' },
        { en: 'Cow', vi: 'Con Bò', emoji: '🐮' }
      ]
    },
    {
      letter: 'D', isVowel: false, nameIpa: '/diː/', nameVi: 'Đọc là "đi"', nameSpeak: 'Letter D',
      phonicsIpa: '/d/', phonicsVi: 'Âm "đờ"', phonicsSpeak: 'duh, duh, dog',
      tip: 'Chạm đầu lưỡi lên hàm trên và bật ra âm "đờ", như trong Dog!', color: '#22C55E', bg: '#DCFCE7',
      examples: [
        { en: 'Dog', vi: 'Con Chó', emoji: '🐶' },
        { en: 'Duck', vi: 'Con Vịt', emoji: '🦆' },
        { en: 'Drum', vi: 'Cái Trống', emoji: '🥁' },
        { en: 'Dolphin', vi: 'Cá Heo', emoji: '🐬' }
      ]
    },
    {
      letter: 'E', isVowel: true, nameIpa: '/iː/', nameVi: 'Đọc là "i"', nameSpeak: 'Letter E',
      phonicsIpa: '/e/', phonicsVi: 'Âm ngắn "e"', phonicsSpeak: 'eh, eh, egg',
      tip: 'Đọc ngắn và gọn âm "e" như tiếng Việt, như trong Egg!', color: '#14B8A6', bg: '#CCFBF1',
      examples: [
        { en: 'Egg', vi: 'Quả Trứng', emoji: '🥚' },
        { en: 'Elephant', vi: 'Con Voi', emoji: '🐘' },
        { en: 'Ear', vi: 'Cái Tai', emoji: '👂' },
        { en: 'Eight', vi: 'Số Tám', emoji: '8️⃣' }
      ]
    },
    {
      letter: 'F', isVowel: false, nameIpa: '/ef/', nameVi: 'Đọc là "ép"', nameSpeak: 'Letter F',
      phonicsIpa: '/f/', phonicsVi: 'Âm thổi "phờ"', phonicsSpeak: 'fff, fff, fish',
      tip: 'Răng trên chạm nhẹ môi dưới và thổi hơi ra âm "phờ" nhẹ!', color: '#0EA5E9', bg: '#E0F2FE',
      examples: [
        { en: 'Fish', vi: 'Con Cá', emoji: '🐟' },
        { en: 'Frog', vi: 'Con Ếch', emoji: '🐸' },
        { en: 'Flower', vi: 'Bông Hoa', emoji: '🌸' },
        { en: 'Fox', vi: 'Con Cáo', emoji: '🦊' }
      ]
    },
    {
      letter: 'G', isVowel: false, nameIpa: '/dʒiː/', nameVi: 'Đọc là "gi"', nameSpeak: 'Letter G',
      phonicsIpa: '/ɡ/', phonicsVi: 'Âm "gờ"', phonicsSpeak: 'guh, guh, goat',
      tip: 'Phát âm "gờ" từ cuống họng thật rõ ràng, như trong Goat!', color: '#3B82F6', bg: '#DBEAFE',
      examples: [
        { en: 'Goat', vi: 'Con Dê', emoji: '🐐' },
        { en: 'Grapes', vi: 'Chùm Nho', emoji: '🍇' },
        { en: 'Gift', vi: 'Hộp Quà', emoji: '🎁' },
        { en: 'Giraffe', vi: 'Hươu Cao Cổ', emoji: '🦒' }
      ]
    },
    {
      letter: 'H', isVowel: false, nameIpa: '/eɪtʃ/', nameVi: 'Đọc là "ết-chờ"', nameSpeak: 'Letter H',
      phonicsIpa: '/h/', phonicsVi: 'Âm thở "hờ"', phonicsSpeak: 'huh, huh, hat',
      tip: 'Hà hơi nhẹ ra khỏi miệng như đang sưởi ấm bàn tay: "hờ"!', color: '#6366F1', bg: '#E0E7FF',
      examples: [
        { en: 'Hat', vi: 'Cái Mũ', emoji: '🎩' },
        { en: 'Horse', vi: 'Con Ngựa', emoji: '🐴' },
        { en: 'House', vi: 'Ngôi Nhà', emoji: '🏠' },
        { en: 'Heart', vi: 'Trái Tim', emoji: '❤️' }
      ]
    },
    {
      letter: 'I', isVowel: true, nameIpa: '/aɪ/', nameVi: 'Đọc là "ai"', nameSpeak: 'Letter I',
      phonicsIpa: '/ɪ/', phonicsVi: 'Âm ngắn "i"', phonicsSpeak: 'ih, ih, igloo',
      tip: 'Mỉm cười nhẹ và đọc nhanh âm "i" ngắn, như trong Igloo!', color: '#8B5CF6', bg: '#EDE9FE',
      examples: [
        { en: 'Igloo', vi: 'Lều Tuyết', emoji: '❄️' },
        { en: 'Ice Cream', vi: 'Que Kem', emoji: '🍦' },
        { en: 'Insect', vi: 'Côn Trùng', emoji: '🐞' },
        { en: 'Island', vi: 'Hòn Đảo', emoji: '🏝️' }
      ]
    },
    {
      letter: 'J', isVowel: false, nameIpa: '/dʒeɪ/', nameVi: 'Đọc là "giây"', nameSpeak: 'Letter J',
      phonicsIpa: '/dʒ/', phonicsVi: 'Âm "giờ" bật', phonicsSpeak: 'juh, juh, jam',
      tip: 'Tròn môi nhẹ và bật ra âm "giờ" mạnh mẽ, như trong Jam!', color: '#EC4899', bg: '#FCE7F3',
      examples: [
        { en: 'Jam', vi: 'Mứt Trái Cây', emoji: '🍓' },
        { en: 'Juice', vi: 'Nước Ép', emoji: '🧃' },
        { en: 'Jellyfish', vi: 'Con Sứa', emoji: '🪼' },
        { en: 'Jacket', vi: 'Áo Khoác', emoji: '🧥' }
      ]
    },
    {
      letter: 'K', isVowel: false, nameIpa: '/keɪ/', nameVi: 'Đọc là "kây"', nameSpeak: 'Letter K',
      phonicsIpa: '/k/', phonicsVi: 'Âm "khờ"', phonicsSpeak: 'kuh, kuh, kite',
      tip: 'Giống âm của chữ C, bật hơi "khờ" dứt khoát như trong Kite!', color: '#F43F5E', bg: '#FFE4E6',
      examples: [
        { en: 'Kite', vi: 'Cánh Diều', emoji: '🪁' },
        { en: 'King', vi: 'Nhà Vua', emoji: '👑' },
        { en: 'Koala', vi: 'Gấu Túi', emoji: '🐨' },
        { en: 'Key', vi: 'Chìa Khóa', emoji: '🔑' }
      ]
    },
    {
      letter: 'L', isVowel: false, nameIpa: '/el/', nameVi: 'Đọc là "eo"', nameSpeak: 'Letter L',
      phonicsIpa: '/l/', phonicsVi: 'Âm "lờ"', phonicsSpeak: 'lll, lll, lion',
      tip: 'Cong nhẹ đầu lưỡi chạm lợi trên và ngân âm "lờ", như Lion!', color: '#FF7A00', bg: '#FFF4D6',
      examples: [
        { en: 'Lion', vi: 'Con Sư Tử', emoji: '🦁' },
        { en: 'Lemon', vi: 'Quả Chanh', emoji: '🍋' },
        { en: 'Leaf', vi: 'Chiếc Lá', emoji: '🍃' },
        { en: 'Lamp', vi: 'Đèn Bàn', emoji: '💡' }
      ]
    },
    {
      letter: 'M', isVowel: false, nameIpa: '/em/', nameVi: 'Đọc là "em"', nameSpeak: 'Letter M',
      phonicsIpa: '/m/', phonicsVi: 'Âm "mờ"', phonicsSpeak: 'mmm, mmm, monkey',
      tip: 'Mím môi lại và ngân "mmm..." như khi ăn món ngon vậy!', color: '#F59E0B', bg: '#FEF3C7',
      examples: [
        { en: 'Monkey', vi: 'Con Khỉ', emoji: '🐵' },
        { en: 'Moon', vi: 'Mặt Trăng', emoji: '🌙' },
        { en: 'Milk', vi: 'Ly Sữa', emoji: '🥛' },
        { en: 'Mango', vi: 'Quả Xoài', emoji: '🥭' }
      ]
    },
    {
      letter: 'N', isVowel: false, nameIpa: '/en/', nameVi: 'Đọc là "en"', nameSpeak: 'Letter N',
      phonicsIpa: '/n/', phonicsVi: 'Âm "nờ"', phonicsSpeak: 'nnn, nnn, nest',
      tip: 'Đặt lưỡi chạm nhẹ hàm trên và ngân âm "nờ" qua mũi!', color: '#10B981', bg: '#D1FAE5',
      examples: [
        { en: 'Nest', vi: 'Tổ Chim', emoji: '🪹' },
        { en: 'Nose', vi: 'Cái Mũi', emoji: '👃' },
        { en: 'Nine', vi: 'Số Chín', emoji: '9️⃣' },
        { en: 'Noodles', vi: 'Mì Sợi', emoji: '🍜' }
      ]
    },
    {
      letter: 'O', isVowel: true, nameIpa: '/əʊ/', nameVi: 'Đọc là "âu"', nameSpeak: 'Letter O',
      phonicsIpa: '/ɒ/', phonicsVi: 'Âm ngắn "o"', phonicsSpeak: 'aw, aw, octopus',
      tip: 'Tròn miệng thành hình chữ O và đọc âm "o", như Octopus!', color: '#06B6D4', bg: '#CFFAFE',
      examples: [
        { en: 'Octopus', vi: 'Bạch Tuộc', emoji: '🐙' },
        { en: 'Orange', vi: 'Quả Cam', emoji: '🍊' },
        { en: 'Owl', vi: 'Chim Cú', emoji: '🦉' },
        { en: 'Onion', vi: 'Củ Hành', emoji: '🧅' }
      ]
    },
    {
      letter: 'P', isVowel: false, nameIpa: '/piː/', nameVi: 'Đọc là "pi"', nameSpeak: 'Letter P',
      phonicsIpa: '/p/', phonicsVi: 'Âm bật gió "pờ"', phonicsSpeak: 'puh, puh, pig',
      tip: 'Mím môi và bật hơi thật mạnh ra ngoài: "pờ" (như thổi nến)!', color: '#EC4899', bg: '#FCE7F3',
      examples: [
        { en: 'Pig', vi: 'Con Heo', emoji: '🐷' },
        { en: 'Pencil', vi: 'Bút Chì', emoji: '✏️' },
        { en: 'Panda', vi: 'Gấu Trúc', emoji: '🐼' },
        { en: 'Pizza', vi: 'Bánh Pizza', emoji: '🍕' }
      ]
    },
    {
      letter: 'Q', isVowel: false, nameIpa: '/kjuː/', nameVi: 'Đọc là "kiu"', nameSpeak: 'Letter Q',
      phonicsIpa: '/kw/', phonicsVi: 'Âm "quờ"', phonicsSpeak: 'kwuh, kwuh, queen',
      tip: 'Chữ Q thường đi cùng bạn U thành "QU", đọc là "quờ" như Queen!', color: '#8B5CF6', bg: '#F3E8FF',
      examples: [
        { en: 'Queen', vi: 'Nữ Hoàng', emoji: '👸' },
        { en: 'Question', vi: 'Câu Hỏi', emoji: '❓' },
        { en: 'Quiet', vi: 'Im Lặng', emoji: '🤫' },
        { en: 'Quilt', vi: 'Chăn Bông', emoji: '🛏️' }
      ]
    },
    {
      letter: 'R', isVowel: false, nameIpa: '/ɑːr/', nameVi: 'Đọc là "a-rờ"', nameSpeak: 'Letter R',
      phonicsIpa: '/r/', phonicsVi: 'Âm uốn lưỡi "rờ"', phonicsSpeak: 'rrr, rrr, rabbit',
      tip: 'Cong nhẹ đầu lưỡi vào trong (không chạm nóc miệng): "rrr"!', color: '#EF4444', bg: '#FEE2E2',
      examples: [
        { en: 'Rabbit', vi: 'Con Thỏ', emoji: '🐰' },
        { en: 'Rainbow', vi: 'Cầu Vồng', emoji: '🌈' },
        { en: 'Robot', vi: 'Người Máy', emoji: '🤖' },
        { en: 'Rocket', vi: 'Tên Lửa', emoji: '🚀' }
      ]
    },
    {
      letter: 'S', isVowel: false, nameIpa: '/es/', nameVi: 'Đọc là "ét-xì"', nameSpeak: 'Letter S',
      phonicsIpa: '/s/', phonicsVi: 'Âm xì "xờ"', phonicsSpeak: 'sss, sss, sun',
      tip: 'Khép nhẹ răng và thổi gió "sss..." giống tiếng bạn rắn trườn!', color: '#F59E0B', bg: '#FEF9C3',
      examples: [
        { en: 'Sun', vi: 'Mặt Trời', emoji: '☀️' },
        { en: 'Star', vi: 'Ngôi Sao', emoji: '⭐' },
        { en: 'Snake', vi: 'Con Rắn', emoji: '🐍' },
        { en: 'Strawberry', vi: 'Dâu Tây', emoji: '🍓' }
      ]
    },
    {
      letter: 'T', isVowel: false, nameIpa: '/tiː/', nameVi: 'Đọc là "ti"', nameSpeak: 'Letter T',
      phonicsIpa: '/t/', phonicsVi: 'Âm bật "tờ"', phonicsSpeak: 'tuh, tuh, tiger',
      tip: 'Bật hơi nhẹ ở đầu lưỡi: "tờ, tờ" như tiếng đồng hồ tích tắc!', color: '#22C55E', bg: '#DCFCE7',
      examples: [
        { en: 'Tiger', vi: 'Con Hổ', emoji: '🐯' },
        { en: 'Train', vi: 'Tàu Hỏa', emoji: '🚂' },
        { en: 'Tree', vi: 'Cái Cây', emoji: '🌳' },
        { en: 'Turtle', vi: 'Con Rùa', emoji: '🐢' }
      ]
    },
    {
      letter: 'U', isVowel: true, nameIpa: '/juː/', nameVi: 'Đọc là "iu"', nameSpeak: 'Letter U',
      phonicsIpa: '/ʌ/', phonicsVi: 'Âm ngắn "ă"', phonicsSpeak: 'uh, uh, umbrella',
      tip: 'Thả lỏng miệng đọc nhanh âm "ă", như trong Umbrella!', color: '#3B82F6', bg: '#DBEAFE',
      examples: [
        { en: 'Umbrella', vi: 'Cái Ô / Dù', emoji: '☂️' },
        { en: 'Up', vi: 'Đi Lên', emoji: '⬆️' },
        { en: 'Unicorn', vi: 'Kỳ Lân', emoji: '🦄' },
        { en: 'Uncle', vi: 'Chú / Bác', emoji: '🧔' }
      ]
    },
    {
      letter: 'V', isVowel: false, nameIpa: '/viː/', nameVi: 'Đọc là "vi"', nameSpeak: 'Letter V',
      phonicsIpa: '/v/', phonicsVi: 'Âm rung "vờ"', phonicsSpeak: 'vvv, vvv, van',
      tip: 'Răng trên chạm môi dưới và rung cổ họng tạo âm "vờ"!', color: '#6366F1', bg: '#E0E7FF',
      examples: [
        { en: 'Van', vi: 'Xe Tải Nhỏ', emoji: '🚐' },
        { en: 'Violin', vi: 'Đàn Vĩ Cầm', emoji: '🎻' },
        { en: 'Volcano', vi: 'Núi Lửa', emoji: '🌋' },
        { en: 'Vegetables', vi: 'Rau Củ', emoji: '🥦' }
      ]
    },
    {
      letter: 'W', isVowel: false, nameIpa: '/ˈdʌb.əl.juː/', nameVi: 'Đọc là "đắp-bờ-liu"', nameSpeak: 'Letter W',
      phonicsIpa: '/w/', phonicsVi: 'Âm "uờ"', phonicsSpeak: 'wuh, wuh, whale',
      tip: 'Chụm tròn môi như đang huýt sáo rồi mở ra đọc "uờ", như Whale!', color: '#0EA5E9', bg: '#E0F2FE',
      examples: [
        { en: 'Whale', vi: 'Cá Voi', emoji: '🐳' },
        { en: 'Watermelon', vi: 'Dưa Hấu', emoji: '🍉' },
        { en: 'Watch', vi: 'Đồng Hồ', emoji: '⌚' },
        { en: 'Wind', vi: 'Gió Thổi', emoji: '🌬️' }
      ]
    },
    {
      letter: 'X', isVowel: false, nameIpa: '/eks/', nameVi: 'Đọc là "éc-xì"', nameSpeak: 'Letter X',
      phonicsIpa: '/ks/', phonicsVi: 'Âm "k-xờ"', phonicsSpeak: 'ks, ks, box',
      tip: 'Đọc ghép nhanh âm "cờ" + "xì" thành "k-xờ", thường ở cuối từ Box, Fox!', color: '#14B8A6', bg: '#CCFBF1',
      examples: [
        { en: 'Box', vi: 'Cái Hộp', emoji: '📦' },
        { en: 'Fox', vi: 'Con Cáo', emoji: '🦊' },
        { en: 'Xylophone', vi: 'Đàn Phiến Gỗ', emoji: '🎶' },
        { en: 'Six', vi: 'Số Sáu (6)', emoji: '6️⃣' }
      ]
    },
    {
      letter: 'Y', isVowel: false, nameIpa: '/waɪ/', nameVi: 'Đọc là "oai"', nameSpeak: 'Letter Y',
      phonicsIpa: '/j/', phonicsVi: 'Âm "dờ / iờ"', phonicsSpeak: 'yuh, yuh, yo-yo',
      tip: 'Đọc nhẹ nhàng âm "i-ờ", như trong Yellow và Yo-yo!', color: '#EAB308', bg: '#FEF9C3',
      examples: [
        { en: 'Yellow', vi: 'Màu Vàng', emoji: '💛' },
        { en: 'Yo-yo', vi: 'Con Quay Yo-yo', emoji: '🪀' },
        { en: 'Yogurt', vi: 'Sữa Chua', emoji: '🥛' },
        { en: 'Yak', vi: 'Bò Tây Tạng', emoji: '🐂' }
      ]
    },
    {
      letter: 'Z', isVowel: false, nameIpa: '/ziː/', nameVi: 'Đọc là "di"', nameSpeak: 'Letter Z',
      phonicsIpa: '/z/', phonicsVi: 'Âm rung "dờ-zờ"', phonicsSpeak: 'zzz, zzz, zebra',
      tip: 'Khép răng và rung cổ họng tạo tiếng "zzz..." như chú ong bay!', color: '#A855F7', bg: '#F3E8FF',
      examples: [
        { en: 'Zebra', vi: 'Ngựa Vằn', emoji: '🦓' },
        { en: 'Zoo', vi: 'Sở Thú', emoji: '🦒' },
        { en: 'Zero', vi: 'Số Không (0)', emoji: '0️⃣' },
        { en: 'Zipper', vi: 'Khóa Kéo', emoji: '🤐' }
      ]
    }
  ];

  // 8 Essential Grade-1 Digraphs (Âm ghép đôi)
  const DIGRAPHS_DATA = [
    {
      letter: 'SH', isDigraph: true, nameIpa: 'S + H', nameVi: 'Ghép S và H', nameSpeak: 'S, H',
      phonicsIpa: '/ʃ/', phonicsVi: 'Âm "sờ" nặng chu môi', phonicsSpeak: 'shhh, shhh, ship',
      tip: 'Chu tròn môi và thổi hơi nhẹ "suỵt... suỵt..." như khi giữ trật tự!', color: '#0EA5E9', bg: '#E0F2FE',
      examples: [
        { en: 'Ship', vi: 'Con Tàu', emoji: '🚢' },
        { en: 'Shoe', vi: 'Chiếc Giày', emoji: '👟' },
        { en: 'Sheep', vi: 'Con Cừu', emoji: '🐑' },
        { en: 'Shark', vi: 'Cá Mập', emoji: '🦈' }
      ]
    },
    {
      letter: 'CH', isDigraph: true, nameIpa: 'C + H', nameVi: 'Ghép C và H', nameSpeak: 'C, H',
      phonicsIpa: '/tʃ/', phonicsVi: 'Âm "chờ" bật hơi', phonicsSpeak: 'chuh, chuh, chair',
      tip: 'Bật hơi mạnh âm "chờ" như tiếng đoàn tàu hỏa kêu xình xịch!', color: '#F97316', bg: '#FFEDD5',
      examples: [
        { en: 'Chair', vi: 'Cái Ghế', emoji: '🪑' },
        { en: 'Cheese', vi: 'Phô Mai', emoji: '🧀' },
        { en: 'Chicken', vi: 'Con Gà', emoji: '🐔' },
        { en: 'Cherry', vi: 'Quả Anh Đào', emoji: '🍒' }
      ]
    },
    {
      letter: 'TH', isDigraph: true, nameIpa: 'T + H', nameVi: 'Ghép T và H', nameSpeak: 'T, H',
      phonicsIpa: '/θ/', phonicsVi: 'Thổi hơi qua đầu lưỡi', phonicsSpeak: 'thhh, three',
      tip: 'Đặt nhẹ đầu lưỡi giữa hai hàm răng rồi thổi hơi nhẹ ra ngoài!', color: '#EC4899', bg: '#FCE7F3',
      examples: [
        { en: 'Three', vi: 'Số Ba (3)', emoji: '3️⃣' },
        { en: 'Thumb', vi: 'Ngón Tay Cái', emoji: '👍' },
        { en: 'Bath', vi: 'Bồn Tắm', emoji: '🛁' },
        { en: 'Tooth', vi: 'Cái Răng', emoji: '🦷' }
      ]
    },
    {
      letter: 'PH', isDigraph: true, nameIpa: 'P + H', nameVi: 'Ghép P và H', nameSpeak: 'P, H',
      phonicsIpa: '/f/', phonicsVi: 'Đọc giống âm "phờ" (F)', phonicsSpeak: 'fff, phone',
      tip: 'Khi thấy P đi cùng H thì đọc nhẹ nhàng thành âm "phờ" như chữ F!', color: '#8B5CF6', bg: '#EDE9FE',
      examples: [
        { en: 'Phone', vi: 'Điện Thoại', emoji: '📱' },
        { en: 'Photo', vi: 'Bức Ảnh', emoji: '📸' },
        { en: 'Dolphin', vi: 'Cá Heo', emoji: '🐬' },
        { en: 'Elephant', vi: 'Con Voi', emoji: '🐘' }
      ]
    },
    {
      letter: 'WH', isDigraph: true, nameIpa: 'W + H', nameVi: 'Ghép W và H', nameSpeak: 'W, H',
      phonicsIpa: '/w/', phonicsVi: 'Âm "uờ"', phonicsSpeak: 'wuh, whale',
      tip: 'Chụm tròn môi đọc âm "uờ" (chữ H thường đứng im không phát âm)!', color: '#06B6D4', bg: '#CFFAFE',
      examples: [
        { en: 'Whale', vi: 'Cá Voi', emoji: '🐳' },
        { en: 'Wheel', vi: 'Bánh Xe', emoji: '🛞' },
        { en: 'White', vi: 'Màu Trắng', emoji: '⬜' },
        { en: 'Whistle', vi: 'Cái Còi', emoji: '🪈' }
      ]
    },
    {
      letter: 'CK', isDigraph: true, nameIpa: 'C + K', nameVi: 'Ghép C và K', nameSpeak: 'C, K',
      phonicsIpa: '/k/', phonicsVi: 'Âm "cờ" ngắn ở cuối', phonicsSpeak: 'kuh, duck',
      tip: 'C và K đứng cạnh nhau cùng tạo thành một âm "cờ" gọn ở cuối từ!', color: '#22C55E', bg: '#DCFCE7',
      examples: [
        { en: 'Duck', vi: 'Con Vịt', emoji: '🦆' },
        { en: 'Clock', vi: 'Đồng Hồ', emoji: '⏰' },
        { en: 'Sock', vi: 'Chiếc Tất', emoji: '🧦' },
        { en: 'Truck', vi: 'Xe Tải', emoji: '🚚' }
      ]
    },
    {
      letter: 'NG', isDigraph: true, nameIpa: 'N + G', nameVi: 'Ghép N và G', nameSpeak: 'N, G',
      phonicsIpa: '/ŋ/', phonicsVi: 'Âm mũi "ngờ"', phonicsSpeak: 'nng, king',
      tip: 'Đọc giống âm "ng" ở cuối từ trong tiếng Việt, ngân nhẹ ở mũi!', color: '#EAB308', bg: '#FEF9C3',
      examples: [
        { en: 'King', vi: 'Nhà Vua', emoji: '👑' },
        { en: 'Ring', vi: 'Chiếc Nhẫn', emoji: '💍' },
        { en: 'Sing', vi: 'Ca Hát', emoji: '🎤' },
        { en: 'Wing', vi: 'Đôi Cánh', emoji: '🪽' }
      ]
    },
    {
      letter: 'OO', isDigraph: true, nameIpa: 'O + O', nameVi: 'Hai chữ O', nameSpeak: 'double O',
      phonicsIpa: '/uː/', phonicsVi: 'Âm "u" kéo dài', phonicsSpeak: 'ooo, moon',
      tip: 'Chu môi đọc "u..." dài như tiếng gió thổi hoặc tiếng cú kêu!', color: '#6366F1', bg: '#E0E7FF',
      examples: [
        { en: 'Moon', vi: 'Mặt Trăng', emoji: '🌙' },
        { en: 'Spoon', vi: 'Cái Thìa', emoji: '🥄' },
        { en: 'Balloon', vi: 'Bóng Bay', emoji: '🎈' },
        { en: 'Zoo', vi: 'Sở Thú', emoji: '🦒' }
      ]
    }
  ];

  // 32 Blending words grouped into 6 Word Families
  const BLEND_FAMILIES = [
    { id: 'all', label: '🌈 Tất cả (33 từ)' },
    { id: 'at_an', label: '🐱 Nhóm -AT / -AN' },
    { id: 'og_ox', label: '🐶 Nhóm -OG / -OX' },
    { id: 'un_ug', label: '☀️ Nhóm -UN / -UG' },
    { id: 'ig_in', label: '🐷 Nhóm -IG / -IN' },
    { id: 'ed_en', label: '🛏️ Nhóm -ED / -EN' },
    { id: 'digraphs', label: '✨ Âm ghép SH/CH/TH' }
  ];

  const BLEND_WORDS = [
    // -AT / -AN (6)
    { word: 'CAT', family: 'at_an', familyLabel: 'Nhóm vần -AT', vi: 'Con Mèo', emoji: '🐱', ipa: '/kæt/', parts: [{ ch: 'C', speak: 'kuh', ipa: '/k/' }, { ch: 'A', speak: 'ah', ipa: '/æ/' }, { ch: 'T', speak: 'tuh', ipa: '/t/' }] },
    { word: 'HAT', family: 'at_an', familyLabel: 'Nhóm vần -AT', vi: 'Cái Mũ', emoji: '🎩', ipa: '/hæt/', parts: [{ ch: 'H', speak: 'huh', ipa: '/h/' }, { ch: 'A', speak: 'ah', ipa: '/æ/' }, { ch: 'T', speak: 'tuh', ipa: '/t/' }] },
    { word: 'BAT', family: 'at_an', familyLabel: 'Nhóm vần -AT', vi: 'Con Dơi', emoji: '🦇', ipa: '/bæt/', parts: [{ ch: 'B', speak: 'buh', ipa: '/b/' }, { ch: 'A', speak: 'ah', ipa: '/æ/' }, { ch: 'T', speak: 'tuh', ipa: '/t/' }] },
    { word: 'RAT', family: 'at_an', familyLabel: 'Nhóm vần -AT', vi: 'Con Chuột', emoji: '🐀', ipa: '/ræt/', parts: [{ ch: 'R', speak: 'rrr', ipa: '/r/' }, { ch: 'A', speak: 'ah', ipa: '/æ/' }, { ch: 'T', speak: 'tuh', ipa: '/t/' }] },
    { word: 'VAN', family: 'at_an', familyLabel: 'Nhóm vần -AN', vi: 'Xe Tải Nhỏ', emoji: '🚐', ipa: '/væn/', parts: [{ ch: 'V', speak: 'vvv', ipa: '/v/' }, { ch: 'A', speak: 'ah', ipa: '/æ/' }, { ch: 'N', speak: 'nnn', ipa: '/n/' }] },
    { word: 'PAN', family: 'at_an', familyLabel: 'Nhóm vần -AN', vi: 'Cái Chảo', emoji: '🍳', ipa: '/pæn/', parts: [{ ch: 'P', speak: 'puh', ipa: '/p/' }, { ch: 'A', speak: 'ah', ipa: '/æ/' }, { ch: 'N', speak: 'nnn', ipa: '/n/' }] },

    // -OG / -OX (5)
    { word: 'DOG', family: 'og_ox', familyLabel: 'Nhóm vần -OG', vi: 'Con Chó', emoji: '🐶', ipa: '/dɒɡ/', parts: [{ ch: 'D', speak: 'duh', ipa: '/d/' }, { ch: 'O', speak: 'aw', ipa: '/ɒ/' }, { ch: 'G', speak: 'guh', ipa: '/ɡ/' }] },
    { word: 'FROG', family: 'og_ox', familyLabel: 'Nhóm vần -OG', vi: 'Con Ếch', emoji: '🐸', ipa: '/frɒɡ/', parts: [{ ch: 'FR', speak: 'fruh', ipa: '/fr/' }, { ch: 'O', speak: 'aw', ipa: '/ɒ/' }, { ch: 'G', speak: 'guh', ipa: '/ɡ/' }] },
    { word: 'LOG', family: 'og_ox', familyLabel: 'Nhóm vần -OG', vi: 'Khúc Gỗ', emoji: '🪵', ipa: '/lɒɡ/', parts: [{ ch: 'L', speak: 'lll', ipa: '/l/' }, { ch: 'O', speak: 'aw', ipa: '/ɒ/' }, { ch: 'G', speak: 'guh', ipa: '/ɡ/' }] },
    { word: 'BOX', family: 'og_ox', familyLabel: 'Nhóm vần -OX', vi: 'Cái Hộp', emoji: '📦', ipa: '/bɒks/', parts: [{ ch: 'B', speak: 'buh', ipa: '/b/' }, { ch: 'O', speak: 'aw', ipa: '/ɒ/' }, { ch: 'X', speak: 'ks', ipa: '/ks/' }] },
    { word: 'FOX', family: 'og_ox', familyLabel: 'Nhóm vần -OX', vi: 'Con Cáo', emoji: '🦊', ipa: '/fɒks/', parts: [{ ch: 'F', speak: 'fff', ipa: '/f/' }, { ch: 'O', speak: 'aw', ipa: '/ɒ/' }, { ch: 'X', speak: 'ks', ipa: '/ks/' }] },

    // -UN / -UG (5)
    { word: 'SUN', family: 'un_ug', familyLabel: 'Nhóm vần -UN', vi: 'Mặt Trời', emoji: '☀️', ipa: '/sʌn/', parts: [{ ch: 'S', speak: 'sss', ipa: '/s/' }, { ch: 'U', speak: 'uh', ipa: '/ʌ/' }, { ch: 'N', speak: 'nnn', ipa: '/n/' }] },
    { word: 'RUN', family: 'un_ug', familyLabel: 'Nhóm vần -UN', vi: 'Chạy Nhanh', emoji: '🏃', ipa: '/rʌn/', parts: [{ ch: 'R', speak: 'rrr', ipa: '/r/' }, { ch: 'U', speak: 'uh', ipa: '/ʌ/' }, { ch: 'N', speak: 'nnn', ipa: '/n/' }] },
    { word: 'BUS', family: 'un_ug', familyLabel: 'Nhóm vần -US', vi: 'Xe Buýt', emoji: '🚌', ipa: '/bʌs/', parts: [{ ch: 'B', speak: 'buh', ipa: '/b/' }, { ch: 'U', speak: 'uh', ipa: '/ʌ/' }, { ch: 'S', speak: 'sss', ipa: '/s/' }] },
    { word: 'CUP', family: 'un_ug', familyLabel: 'Nhóm vần -UP', vi: 'Cái Cốc', emoji: '☕', ipa: '/kʌp/', parts: [{ ch: 'C', speak: 'kuh', ipa: '/k/' }, { ch: 'U', speak: 'uh', ipa: '/ʌ/' }, { ch: 'P', speak: 'puh', ipa: '/p/' }] },
    { word: 'BUG', family: 'un_ug', familyLabel: 'Nhóm vần -UG', vi: 'Con Bọ', emoji: '🐞', ipa: '/bʌɡ/', parts: [{ ch: 'B', speak: 'buh', ipa: '/b/' }, { ch: 'U', speak: 'uh', ipa: '/ʌ/' }, { ch: 'G', speak: 'guh', ipa: '/ɡ/' }] },
    { word: 'HUG', family: 'un_ug', familyLabel: 'Nhóm vần -UG', vi: 'Ôm Nhau', emoji: '🤗', ipa: '/hʌɡ/', parts: [{ ch: 'H', speak: 'huh', ipa: '/h/' }, { ch: 'U', speak: 'uh', ipa: '/ʌ/' }, { ch: 'G', speak: 'guh', ipa: '/ɡ/' }] },

    // -IG / -IN (5)
    { word: 'PIG', family: 'ig_in', familyLabel: 'Nhóm vần -IG', vi: 'Con Heo', emoji: '🐷', ipa: '/pɪɡ/', parts: [{ ch: 'P', speak: 'puh', ipa: '/p/' }, { ch: 'I', speak: 'ih', ipa: '/ɪ/' }, { ch: 'G', speak: 'guh', ipa: '/ɡ/' }] },
    { word: 'BIG', family: 'ig_in', familyLabel: 'Nhóm vần -IG', vi: 'To Lớn', emoji: '🐘', ipa: '/bɪɡ/', parts: [{ ch: 'B', speak: 'buh', ipa: '/b/' }, { ch: 'I', speak: 'ih', ipa: '/ɪ/' }, { ch: 'G', speak: 'guh', ipa: '/ɡ/' }] },
    { word: 'DIG', family: 'ig_in', familyLabel: 'Nhóm vần -IG', vi: 'Đào Đất', emoji: '⛏️', ipa: '/dɪɡ/', parts: [{ ch: 'D', speak: 'duh', ipa: '/d/' }, { ch: 'I', speak: 'ih', ipa: '/ɪ/' }, { ch: 'G', speak: 'guh', ipa: '/ɡ/' }] },
    { word: 'PIN', family: 'ig_in', familyLabel: 'Nhóm vần -IN', vi: 'Cái Ghim', emoji: '📍', ipa: '/pɪn/', parts: [{ ch: 'P', speak: 'puh', ipa: '/p/' }, { ch: 'I', speak: 'ih', ipa: '/ɪ/' }, { ch: 'N', speak: 'nnn', ipa: '/n/' }] },
    { word: 'BIN', family: 'ig_in', familyLabel: 'Nhóm vần -IN', vi: 'Thùng Rác', emoji: '🗑️', ipa: '/bɪn/', parts: [{ ch: 'B', speak: 'buh', ipa: '/b/' }, { ch: 'I', speak: 'ih', ipa: '/ɪ/' }, { ch: 'N', speak: 'nnn', ipa: '/n/' }] },

    // -ED / -EN (5)
    { word: 'BED', family: 'ed_en', familyLabel: 'Nhóm vần -ED', vi: 'Cái Giường', emoji: '🛏️', ipa: '/bed/', parts: [{ ch: 'B', speak: 'buh', ipa: '/b/' }, { ch: 'E', speak: 'eh', ipa: '/e/' }, { ch: 'D', speak: 'duh', ipa: '/d/' }] },
    { word: 'RED', family: 'ed_en', familyLabel: 'Nhóm vần -ED', vi: 'Màu Đỏ', emoji: '🍓', ipa: '/red/', parts: [{ ch: 'R', speak: 'rrr', ipa: '/r/' }, { ch: 'E', speak: 'eh', ipa: '/e/' }, { ch: 'D', speak: 'duh', ipa: '/d/' }] },
    { word: 'PEN', family: 'ed_en', familyLabel: 'Nhóm vần -EN', vi: 'Bút Mực', emoji: '🖊️', ipa: '/pen/', parts: [{ ch: 'P', speak: 'puh', ipa: '/p/' }, { ch: 'E', speak: 'eh', ipa: '/e/' }, { ch: 'N', speak: 'nnn', ipa: '/n/' }] },
    { word: 'HEN', family: 'ed_en', familyLabel: 'Nhóm vần -EN', vi: 'Gà Mái', emoji: '🐔', ipa: '/hen/', parts: [{ ch: 'H', speak: 'huh', ipa: '/h/' }, { ch: 'E', speak: 'eh', ipa: '/e/' }, { ch: 'N', speak: 'nnn', ipa: '/n/' }] },
    { word: 'TEN', family: 'ed_en', familyLabel: 'Nhóm vần -EN', vi: 'Số Mười (10)', emoji: '🔟', ipa: '/ten/', parts: [{ ch: 'T', speak: 'tuh', ipa: '/t/' }, { ch: 'E', speak: 'eh', ipa: '/e/' }, { ch: 'N', speak: 'nnn', ipa: '/n/' }] },

    // Digraphs SH / CH / TH (6)
    { word: 'SHIP', family: 'digraphs', familyLabel: 'Âm ghép SH', vi: 'Con Tàu', emoji: '🚢', ipa: '/ʃɪp/', parts: [{ ch: 'SH', speak: 'shhh', ipa: '/ʃ/' }, { ch: 'I', speak: 'ih', ipa: '/ɪ/' }, { ch: 'P', speak: 'puh', ipa: '/p/' }] },
    { word: 'FISH', family: 'digraphs', familyLabel: 'Âm ghép SH', vi: 'Con Cá', emoji: '🐟', ipa: '/fɪʃ/', parts: [{ ch: 'F', speak: 'fff', ipa: '/f/' }, { ch: 'I', speak: 'ih', ipa: '/ɪ/' }, { ch: 'SH', speak: 'shhh', ipa: '/ʃ/' }] },
    { word: 'SHOP', family: 'digraphs', familyLabel: 'Âm ghép SH', vi: 'Cửa Hàng', emoji: '🏪', ipa: '/ʃɒp/', parts: [{ ch: 'SH', speak: 'shhh', ipa: '/ʃ/' }, { ch: 'O', speak: 'aw', ipa: '/ɒ/' }, { ch: 'P', speak: 'puh', ipa: '/p/' }] },
    { word: 'CHIP', family: 'digraphs', familyLabel: 'Âm ghép CH', vi: 'Khoai Chiên', emoji: '🍟', ipa: '/tʃɪp/', parts: [{ ch: 'CH', speak: 'chuh', ipa: '/tʃ/' }, { ch: 'I', speak: 'ih', ipa: '/ɪ/' }, { ch: 'P', speak: 'puh', ipa: '/p/' }] },
    { word: 'CHIN', family: 'digraphs', familyLabel: 'Âm ghép CH', vi: 'Cái Cằm', emoji: '🧑', ipa: '/tʃɪn/', parts: [{ ch: 'CH', speak: 'chuh', ipa: '/tʃ/' }, { ch: 'I', speak: 'ih', ipa: '/ɪ/' }, { ch: 'N', speak: 'nnn', ipa: '/n/' }] },
    { word: 'BATH', family: 'digraphs', familyLabel: 'Âm ghép TH', vi: 'Bồn Tắm', emoji: '🛁', ipa: '/bɑːθ/', parts: [{ ch: 'B', speak: 'buh', ipa: '/b/' }, { ch: 'A', speak: 'ah', ipa: '/ɑː/' }, { ch: 'TH', speak: 'thhh', ipa: '/θ/' }] }
  ];

  // Classic Twinkle-Twinkle / ABC Song note frequencies
  const ABC_MELODY = [
    261.63, 261.63, 392.00, 392.00, 440.00, 440.00, 392.00,
    349.23, 349.23, 329.63, 329.63, 293.66, 293.66, 261.63,
    392.00, 392.00, 349.23, 349.23, 329.63, 329.63, 293.66,
    392.00, 392.00, 349.23, 329.63, 293.66
  ];

  const pState = {
    selectedIndex: 0,
    filter: 'all', // 'all' | 'vowels' | 'digraphs'
    activeTab: 'board', // 'board' | 'blend' | 'quiz'
    songPlaying: false,
    songTimers: [],
    blendFamily: 'all',
    blendIndex: 0,
    blendTimers: [],
    quiz: {
      quizMode: 'listen', // 'listen' | 'initial' | 'rhyme'
      pool: [],
      index: 0,
      streak: 0,
      answer: null,
      subMode: 'phonics',
      answered: false
    }
  };

  const $ = id => document.getElementById(id);

  function getActiveBoardDataset() {
    return pState.filter === 'digraphs' ? DIGRAPHS_DATA : ALPHABET_DATA;
  }

  function getActiveBlendPool() {
    if (pState.blendFamily === 'all') return BLEND_WORDS;
    return BLEND_WORDS.filter(w => w.family === pState.blendFamily);
  }

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
    const letterCount = ALPHABET_DATA.filter(x => state.learnedLetters.has(x.letter)).length;
    const totalCount = state.learnedLetters.size;
    const homeBadge = $('phonics-home-progress');
    if (homeBadge) homeBadge.textContent = `${ letterCount } / 26`;
    const pill = $('phonics-mastered-pill');
    if (pill) pill.textContent = `⭐ Đã thuộc: ${ totalCount } / ${ ALPHABET_DATA.length + DIGRAPHS_DATA.length }`;
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
    if (typeof window.recordActivity === 'function') {
      window.recordActivity({
        kind: 'phonics',
        tab: initialTab,
        icon: '🔤',
        title: 'Bảng Chữ Cái ABC & Phonics',
        subtitle: '26 chữ cái, 8 âm ghép đôi & 33 từ ghép vần'
      });
    }
    switchPhonicsTab(initialTab);
  }

  window.openPhonicsView = openPhonics;

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
      renderBlendFamilyBar();
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
     Tab 1: Alphabet A-Z, Digraphs & Spotlight Card
     ========================================================================== */
  function renderAlphabetGrid() {
    const grid = $('alphabet-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const dataset = getActiveBoardDataset();
    const items = dataset.map((item, idx) => ({ item, idx }))
      .filter(({ item }) => pState.filter !== 'vowels' || item.isVowel);

    items.forEach(({ item, idx }) => {
      const tile = document.createElement('button');
      tile.type = 'button';
      tile.className = 'alpha-tile';
      tile.id = `alpha-tile-${ item.letter }`;
      if (item.isVowel) tile.classList.add('is-vowel');
      if (item.isDigraph) tile.classList.add('is-digraph');
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
    const dataset = getActiveBoardDataset();
    const data = dataset[pState.selectedIndex] || dataset[0];
    if (!data) return;

    const card = $('phonics-spotlight-card');
    card.style.setProperty('--spot-color', data.color);
    card.style.setProperty('--spot-bg', data.bg);

    const typeBadge = $('letter-type-badge');
    if (data.isDigraph) {
      typeBadge.textContent = '✨ Âm ghép đôi (Digraph)';
      typeBadge.classList.add('vowel');
    } else if (data.isVowel) {
      typeBadge.textContent = '🌟 Nguyên âm (Vowel)';
      typeBadge.classList.add('vowel');
    } else {
      typeBadge.textContent = '🔤 Phụ âm (Consonant)';
      typeBadge.classList.remove('vowel');
    }

    const isLearned = state.learnedLetters.has(data.letter);
    $('letter-learned-badge').classList.toggle('visible', isLearned);

    $('big-letter-box').classList.toggle('is-digraph', Boolean(data.isDigraph));
    $('spotlight-upper').textContent = data.letter;
    $('spotlight-lower').textContent = data.letter.toLowerCase();
    $('spotlight-name-label').textContent = data.isDigraph ? 'Cấu tạo chữ ghép' : 'Tên chữ cái (Letter Name)';
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
      $('mark-letter-text').textContent = `Đã thuộc ${ data.letter }! (+1 Sao)`;
    } else {
      markBtn.classList.remove('is-learned');
      $('mark-letter-icon').textContent = '⭐';
      $('mark-letter-text').textContent = `Bé đã thuộc ${ data.letter }!`;
    }

    updatePhonicsProgressUI();

    if (autoSpeak) {
      setTimeout(() => {
        speakEnglish(`${ data.isDigraph ? data.phonicsSpeak : `${ data.letter }, ${ data.phonicsSpeak }` }`, 0.86);
      }, 140);
    }
  }

  function navigateLetter(delta) {
    stopAbcSong();
    const dataset = getActiveBoardDataset();
    const pool = pState.filter === 'vowels'
      ? dataset.map((item, idx) => ({ item, idx })).filter(x => x.item.isVowel)
      : dataset.map((item, idx) => ({ item, idx }));
    const pos = Math.max(0, pool.findIndex(x => x.idx === pState.selectedIndex));
    const next = pool[(pos + delta + pool.length) % pool.length];
    pState.selectedIndex = next.idx;
    playSoundEffect('pop');
    renderAlphabetGrid();
    renderLetterSpotlight(true);
  }

  function toggleMarkLetterLearned() {
    const dataset = getActiveBoardDataset();
    const data = dataset[pState.selectedIndex];
    if (!data) return;

    if (!state.learnedLetters.has(data.letter)) {
      state.learnedLetters.add(data.letter);
      state.stars += 1;
      playSoundEffect('star');
      launchConfettiBurst();
      speakEnglish(`Awesome! ${ data.examples[0].en }!`, 0.92);
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

    if (pState.filter !== 'all') {
      pState.filter = 'all';
      pState.selectedIndex = 0;
      $('btn-filter-all-letters').classList.add('active');
      $('btn-filter-vowels').classList.remove('active');
      $('btn-filter-digraphs').classList.remove('active');
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
     Tab 2: CVC & Word-Family Blending (32 Words)
     ========================================================================== */
  function renderBlendFamilyBar() {
    const bar = $('blend-family-bar');
    if (!bar) return;
    bar.innerHTML = '';

    BLEND_FAMILIES.forEach(fam => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `filter-pill ${ pState.blendFamily === fam.id ? 'active' : '' }`;
      btn.textContent = fam.label;
      btn.addEventListener('click', () => {
        playSoundEffect('pop');
        pState.blendFamily = fam.id;
        pState.blendIndex = 0;
        renderBlendFamilyBar();
        renderBlendWord(true);
      });
      bar.appendChild(btn);
    });
  }

  function renderBlendWord(autoSpeak = false) {
    stopBlendTimers();
    const pool = getActiveBlendPool();
    if (pState.blendIndex >= pool.length) pState.blendIndex = 0;
    const item = pool[pState.blendIndex];
    if (!item) return;

    $('blend-progress-label').textContent = `Từ ${ pState.blendIndex + 1 } / ${ pool.length }`;
    $('blend-family-badge').textContent = `🎶 ${ item.familyLabel }`;
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
      const isDigraph = part.ch.length > 1;
      if (isVowel) tile.classList.add('is-vowel');
      if (isDigraph) tile.classList.add('is-digraph');
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
    const pool = getActiveBlendPool();
    const item = pool[pState.blendIndex];
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
     Tab 3: 3-Mode Phonics Quiz (Listen, Initial Sound _at, Rhyming Match)
     ========================================================================== */
  function startPhonicsQuiz() {
    const q = pState.quiz;
    q.index = 0;
    q.streak = 0;

    if (q.quizMode === 'rhyme') {
      const rhymingFamilies = ['at_an', 'og_ox', 'un_ug', 'ig_in', 'ed_en'];
      const candidates = BLEND_WORDS.filter(w => {
        if (!rhymingFamilies.includes(w.family)) return false;
        const end = w.word.slice(-2);
        return BLEND_WORDS.some(other => other.word !== w.word && other.word.endsWith(end));
      });
      q.pool = shuffleArray(candidates).slice(0, 10);
    } else if (q.quizMode === 'initial') {
      q.pool = shuffleArray(BLEND_WORDS.filter(w => w.parts[0].ch.length === 1)).slice(0, 10);
    } else {
      q.pool = shuffleArray([...ALPHABET_DATA, ...DIGRAPHS_DATA]).slice(0, 10);
    }

    renderPhonicsQuizQuestion();
  }

  function speakPhonicsQuizPrompt() {
    const q = pState.quiz;
    if (!q.answer) return;

    if (q.quizMode === 'listen') {
      speakEnglish(q.subMode === 'name' ? q.answer.nameSpeak : q.answer.phonicsSpeak, 0.86);
    } else if (q.quizMode === 'initial') {
      speakEnglish(`${ q.answer.word.toLowerCase() }. ${ q.answer.parts[0].speak }, ${ q.answer.word.toLowerCase() }`, 0.85);
    } else {
      speakEnglish(`Which word rhymes with ${ q.answer.word.toLowerCase() }?`, 0.86);
    }
  }

  function renderPhonicsQuizQuestion() {
    const q = pState.quiz;
    const target = q.pool[q.index];
    q.answer = target;
    q.answered = false;
    q.subMode = q.index % 2 === 0 ? 'phonics' : 'name';

    $('pquiz-progress-label').textContent = `Câu ${ q.index + 1 } / ${ q.pool.length }`;
    $('pquiz-streak-label').textContent = `🔥 Chuỗi đúng: ${ q.streak }`;
    $('pquiz-feedback-banner').classList.add('hidden');
    $('pquiz-hint-box').classList.add('hidden');

    const visualPrompt = $('pquiz-visual-prompt');
    const grid = $('pquiz-options-grid');
    grid.innerHTML = '';

    if (q.quizMode === 'listen') {
      visualPrompt.classList.add('hidden');
      $('pquiz-instruction').textContent = target.isDigraph
        ? '👂 Nghe âm ghép và chọn đúng thẻ âm ghép nhé!'
        : q.subMode === 'phonics'
          ? '👂 Nghe âm Phonics và chọn đúng chữ cái bắt đầu cho từ mẫu nhé!'
          : '👂 Nghe tên chữ cái tiếng Anh và chọn đúng thẻ chữ nhé!';

      $('pquiz-hint-box').textContent = `${ target.examples[0].emoji } ${ target.examples[0].en } (${ target.examples[0].vi })`;

      const source = target.isDigraph ? DIGRAPHS_DATA : ALPHABET_DATA;
      const distractors = shuffleArray(source.filter(x => x.letter !== target.letter)).slice(0, 3);
      const options = shuffleArray([target, ...distractors]);

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
        btn.addEventListener('click', () => handlePhonicsQuizPick(btn, opt.letter === target.letter, `${ opt.letter } (${ opt.examples[0].en } - ${ opt.examples[0].vi })`));
        grid.appendChild(btn);
      });
    } else if (q.quizMode === 'initial') {
      const firstCh = target.parts[0].ch;
      const rest = target.word.slice(1);
      $('pquiz-instruction').textContent = '🔤 Bé hãy nhìn hình, nghe từ và chọn chữ cái đầu còn thiếu nhé!';
      visualPrompt.classList.remove('hidden');
      visualPrompt.innerHTML = `
        <span class="pqv-emoji">${ target.emoji }</span>
        <span class="pqv-masked"><mark>_</mark>${ rest }</span>
        <span class="pqv-vi">(${ target.vi })</span>
      `;
      $('pquiz-hint-box').textContent = `Âm đầu là "${ target.parts[0].ipa }" trong từ ${ target.word }`;

      const distractors = shuffleArray(ALPHABET_DATA.filter(x => x.letter !== firstCh)).slice(0, 3);
      const options = shuffleArray([ALPHABET_DATA.find(x => x.letter === firstCh), ...distractors]);

      options.forEach(opt => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'pquiz-option-btn';
        btn.style.setProperty('--opt-color', opt.color);
        btn.style.setProperty('--opt-bg', opt.bg);
        btn.innerHTML = `<span class="pquiz-letter">${ opt.letter } <small>${ opt.letter.toLowerCase() }</small></span>`;
        btn.addEventListener('click', () => handlePhonicsQuizPick(btn, opt.letter === firstCh, `${ target.word } (${ target.vi })`));
        grid.appendChild(btn);
      });
    } else {
      // Rhyming match
      const ending = target.word.slice(-2);
      const rhymeMatches = BLEND_WORDS.filter(w => w.word !== target.word && w.word.endsWith(ending));
      const rhymeMatch = rhymeMatches[Math.floor(Math.random() * rhymeMatches.length)];
      const distractors = shuffleArray(BLEND_WORDS.filter(w => !w.word.endsWith(ending) && w.word !== target.word)).slice(0, 3);
      const options = shuffleArray([rhymeMatch, ...distractors]);

      $('pquiz-instruction').textContent = `🎶 Tìm từ CÓ CÙNG VẦN (${ target.familyLabel }) với từ mẫu nhé!`;
      visualPrompt.classList.remove('hidden');
      visualPrompt.innerHTML = `
        <span class="pqv-emoji">${ target.emoji }</span>
        <span class="pqv-masked">${ target.word }</span>
        <span class="pqv-vi">(${ target.vi })</span>
      `;
      $('pquiz-hint-box').textContent = `Tìm từ có đuôi vần "-${ ending }" giống ${ target.word }!`;

      options.forEach(opt => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'pquiz-option-btn rhyme-opt';
        btn.style.setProperty('--opt-color', '#0D9488');
        btn.style.setProperty('--opt-bg', '#F0FDFA');
        btn.innerHTML = `
          <span class="pquiz-word-hint">${ opt.emoji }</span>
          <span class="pquiz-rhyme-word">${ opt.word }</span>
        `;
        btn.addEventListener('click', () => handlePhonicsQuizPick(btn, opt.word === rhymeMatch.word, `${ target.word } & ${ rhymeMatch.word } (${ rhymeMatch.vi })`));
        grid.appendChild(btn);
      });
    }

    setTimeout(speakPhonicsQuizPrompt, 200);
  }

  function handlePhonicsQuizPick(btn, isCorrect, labelText) {
    const q = pState.quiz;
    if (q.answered) return;

    if (isCorrect) {
      q.answered = true;
      q.streak += 1;
      state.stars += 2;
      if (q.quizMode === 'listen' && q.answer.letter) {
        state.learnedLetters.add(q.answer.letter);
      }
      saveProgress();
      updateHeaderAndMissionUI();
      updatePhonicsProgressUI();

      btn.classList.add('correct');
      playSoundEffect('correct');
      launchConfettiBurst();
      speakEnglish(q.quizMode === 'listen' ? `Great! ${ q.answer.examples[0].en }!` : `Awesome! ${ q.answer.word.toLowerCase() }!`, 0.92);

      $('pquiz-hint-box').classList.remove('hidden');
      const isLast = q.index >= q.pool.length - 1;
      $('pquiz-feedback-msg').textContent = `🎉 Giỏi lắm! ${ labelText } (+2 Sao)`;
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
  function setBoardFilter(filterName) {
    stopAbcSong();
    playSoundEffect('pop');
    pState.filter = filterName;
    $('btn-filter-all-letters').classList.toggle('active', filterName === 'all');
    $('btn-filter-vowels').classList.toggle('active', filterName === 'vowels');
    $('btn-filter-digraphs').classList.toggle('active', filterName === 'digraphs');

    if (filterName === 'vowels') {
      pState.selectedIndex = 0; // 'A'
    } else {
      pState.selectedIndex = 0;
    }
    renderAlphabetGrid();
    renderLetterSpotlight(true);
  }

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

    $('btn-filter-all-letters').addEventListener('click', () => setBoardFilter('all'));
    $('btn-filter-vowels').addEventListener('click', () => setBoardFilter('vowels'));
    $('btn-filter-digraphs').addEventListener('click', () => setBoardFilter('digraphs'));

    $('btn-abc-song').addEventListener('click', toggleAbcSong);
    $('btn-prev-letter').addEventListener('click', () => navigateLetter(-1));
    $('btn-next-letter').addEventListener('click', () => navigateLetter(1));

    $('btn-play-letter-name').addEventListener('click', () => {
      const data = getActiveBoardDataset()[pState.selectedIndex];
      if (data) speakEnglish(data.nameSpeak, 0.86);
    });

    $('btn-play-letter-phonics').addEventListener('click', () => {
      const data = getActiveBoardDataset()[pState.selectedIndex];
      if (data) speakEnglish(data.phonicsSpeak, 0.82);
    });

    $('btn-play-letter-chant').addEventListener('click', () => {
      const data = getActiveBoardDataset()[pState.selectedIndex];
      if (data) {
        const line = data.isDigraph
          ? `${ data.phonicsSpeak }. ${ data.examples[0].en } and ${ data.examples[1].en }!`
          : `${ data.letter } is for ${ data.examples[0].en }. ${ data.phonicsSpeak }!`;
        speakEnglish(line, 0.85);
      }
    });

    $('btn-mark-letter-learned').addEventListener('click', toggleMarkLetterLearned);

    // Blending tab buttons
    $('btn-blend-word').addEventListener('click', () => playBlendingSequence(false));
    $('btn-blend-slow').addEventListener('click', () => playBlendingSequence(true));
    $('btn-blend-prev').addEventListener('click', () => {
      playSoundEffect('pop');
      const pool = getActiveBlendPool();
      pState.blendIndex = (pState.blendIndex - 1 + pool.length) % pool.length;
      renderBlendWord(true);
    });
    $('btn-blend-next').addEventListener('click', () => {
      playSoundEffect('pop');
      const pool = getActiveBlendPool();
      pState.blendIndex = (pState.blendIndex + 1) % pool.length;
      renderBlendWord(true);
    });

    // Quiz mode switcher + buttons
    document.querySelectorAll('#pquiz-mode-bar [data-pqmode]').forEach(btn => {
      btn.addEventListener('click', () => {
        playSoundEffect('pop');
        pState.quiz.quizMode = btn.dataset.pqmode;
        document.querySelectorAll('#pquiz-mode-bar [data-pqmode]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        startPhonicsQuiz();
      });
    });

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
