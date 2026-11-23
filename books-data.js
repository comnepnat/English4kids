/**
 * English4Kids — Illustrated Read & Listen Storybooks Library (books-data.js)
 * 10 Original Graded Picture Books (60 Illustrated Pages • Pre-A1 to B2)
 * Each page pairs a hand-painted gouache scene, full-body painted characters,
 * interactive tappable 3D props, natural children's English narration,
 * clickable highlighted vocabulary with IPA, and optional Vietnamese translation.
 */
const BOOKS_DATA = [
  /* ========================================================================
     BOOK 1 — Pre-A1 (4–6 tuổi): Leo's Big Red Ball
     ======================================================================== */
  {
    id: 'book_red_ball',
    num: 1,
    level: 'Pre-A1',
    ageHint: '4–6 tuổi',
    titleEn: "Leo's Big Red Ball",
    titleVi: 'Quả Bóng Đỏ Của Leo',
    subtitle: 'Tình bạn & Màu sắc',
    minutes: '2 phút',
    coverBg: 'assets/art/painted_home_meadow.webp',
    coverChar: 'leo',
    coverEmoji: '🔴',
    accent: '#EF4444',
    softBg: '#FEF2F2',
    pages: [
      {
        bg: 'assets/art/painted_home_meadow.webp',
        mood: 'sunny',
        pan: 'left',
        chars: [{ id: 'leo', x: 24, y: 10, scale: 1.0 }],
        props: [
          { emoji: '🔴', label: 'Ball', vi: 'Quả bóng', x: 64, y: 20, size: 70 },
          { emoji: '☀️', label: 'Sun', vi: 'Mặt trời', x: 78, y: 74, size: 58 }
        ],
        en: 'Good morning! Leo has a big red ball. He loves to play outside in the sun.',
        vi: 'Chào buổi sáng! Leo có một quả bóng màu đỏ thật to. Cậu thích chơi ngoài trời nắng ấm.',
        vocab: [
          { w: 'big', ipa: '/bɪɡ/', vi: 'to lớn', emoji: '🔴' },
          { w: 'ball', ipa: '/bɔːl/', vi: 'quả bóng', emoji: '⚽' },
          { w: 'sun', ipa: '/sʌn/', vi: 'mặt trời', emoji: '☀️' }
        ]
      },
      {
        bg: 'assets/art/painted_home_meadow.webp',
        mood: 'sunny',
        pan: 'center',
        chars: [{ id: 'leo', x: 18, y: 12, scale: 0.96 }],
        props: [
          { emoji: '🔴', label: 'Bounce', vi: 'Nảy lên', x: 52, y: 58, size: 68 },
          { emoji: '🦋', label: 'Butterfly', vi: 'Con bướm', x: 78, y: 66, size: 54 }
        ],
        en: 'Bounce, bounce, bounce! The red ball jumps high into the blue sky.',
        vi: 'Nảy lên nào! Quả bóng đỏ bật thật cao lên bầu trời xanh.',
        vocab: [
          { w: 'bounce', ipa: '/baʊns/', vi: 'nảy lên', emoji: '🔴' },
          { w: 'high', ipa: '/haɪ/', vi: 'cao', emoji: '⬆️' },
          { w: 'sky', ipa: '/skaɪ/', vi: 'bầu trời', emoji: '🌤️' }
        ]
      },
      {
        bg: 'assets/art/books/scene_valley_green.webp',
        mood: 'morning',
        pan: 'right',
        chars: [{ id: 'leo', x: 20, y: 10, scale: 0.95 }],
        props: [
          { emoji: '🌳', label: 'Tall Tree', vi: 'Cái cây cao', x: 74, y: 12, size: 144, role: 'scenery' },
          { emoji: '🔴', label: 'Red Ball', vi: 'Quả bóng đỏ', x: 64, y: 10, size: 60, role: 'object', z: 5 }
        ],
        en: 'Oh no! The ball rolls fast down the green hill and hides behind a tall tree.',
        vi: 'Ôi không! Quả bóng lăn thật nhanh xuống ngọn đồi xanh và trốn sau một cái cây cao.',
        vocab: [
          { w: 'rolls', ipa: '/roʊlz/', vi: 'lăn đi', emoji: '🔴' },
          { w: 'hill', ipa: '/hɪl/', vi: 'ngọn đồi', emoji: '⛰️' },
          { w: 'tree', ipa: '/triː/', vi: 'cái cây', emoji: '🌳' }
        ]
      },
      {
        bg: 'assets/art/books/scene_valley_green.webp',
        mood: 'sunny',
        pan: 'center',
        chars: [
          { id: 'leo', x: 18, y: 10, scale: 0.94 },
          { id: 'lulu', x: 66, y: 10, scale: 0.94, flip: true }
        ],
        props: [
          { emoji: '🔴', label: 'Red Ball', vi: 'Bóng đỏ', x: 48, y: 14, size: 70, role: 'object' }
        ],
        en: 'Look who is there! Lulu the bunny holds the red ball. "Here is your ball, Leo!" she smiles.',
        vi: 'Nhìn xem ai kia! Thỏ Lulu đang cầm quả bóng đỏ. "Bóng của bạn đây nè, Leo!" cô bạn mỉm cười.',
        vocab: [
          { w: 'bunny', ipa: '/ˈbʌn.i/', vi: 'thỏ con', emoji: '🐰' },
          { w: 'holds', ipa: '/hoʊldz/', vi: 'cầm giữ', emoji: '🤲' },
          { w: 'smiles', ipa: '/smaɪlz/', vi: 'mỉm cười', emoji: '😊' }
        ]
      },
      {
        bg: 'assets/art/books/scene_hills.webp',
        mood: 'sunny',
        pan: 'center',
        chars: [
          { id: 'leo', x: 20, y: 8, scale: 0.94 },
          { id: 'lulu', x: 68, y: 8, scale: 0.94, flip: true }
        ],
        props: [
          { emoji: '🔴', label: 'Catch', vi: 'Bắt bóng', x: 46, y: 42, size: 76, role: 'object' }
        ],
        en: '"Thank you, Lulu! Let\'s play together!" They kick and catch the ball and laugh out loud.',
        vi: '"Cảm ơn Lulu nhé! Chúng mình cùng chơi nào!" Hai bạn đá bóng, bắt bóng và cười vang thật vui.',
        vocab: [
          { w: 'together', ipa: '/təˈɡeð.ər/', vi: 'cùng nhau', emoji: '🤝' },
          { w: 'catch', ipa: '/kætʃ/', vi: 'bắt lấy', emoji: '🙌' },
          { w: 'laugh', ipa: '/læf/', vi: 'cười vang', emoji: '😄' }
        ]
      },
      {
        bg: 'assets/art/books/scene_sunset.webp',
        mood: 'sunset',
        pan: 'right',
        chars: [
          { id: 'leo', x: 24, y: 10, scale: 0.94 },
          { id: 'lulu', x: 54, y: 10, scale: 0.92, flip: true }
        ],
        props: [
          { emoji: '⭐', label: 'Happy', vi: 'Vui vẻ', x: 76, y: 68, size: 56, role: 'badge' },
          { emoji: '❤️', label: 'Friends', vi: 'Bạn thân', x: 42, y: 58, size: 50, role: 'badge' }
        ],
        en: 'Playing with a friend is the most fun of all. What a happy day for Leo and Lulu!',
        vi: 'Chơi cùng bạn thân là niềm vui tuyệt vời nhất. Thật là một ngày hạnh phúc của Leo và Lulu!',
        vocab: [
          { w: 'friend', ipa: '/frend/', vi: 'người bạn', emoji: '🤝' },
          { w: 'happy', ipa: '/ˈhæp.i/', vi: 'vui vẻ', emoji: '😄' },
          { w: 'day', ipa: '/deɪ/', vi: 'ngày', emoji: '☀️' }
        ]
      }
    ],
    quiz: [
      {
        qEn: 'What color is Leo\'s big ball?',
        qVi: 'Quả bóng to của Leo màu gì?',
        options: [
          { text: 'Red (Màu đỏ)', emoji: '🔴', correct: true },
          { text: 'Blue (Màu xanh)', emoji: '🔵', correct: false },
          { text: 'Green (Màu lá)', emoji: '🟢', correct: false }
        ]
      },
      {
        qEn: 'Who helps Leo find the ball?',
        qVi: 'Ai đã giúp Leo tìm lại quả bóng?',
        options: [
          { text: 'Lulu the bunny', emoji: '🐰', correct: true },
          { text: 'A big whale', emoji: '🐳', correct: false },
          { text: 'A sleepy owl', emoji: '🦉', correct: false }
        ]
      }
    ]
  },

  /* ========================================================================
     BOOK 2 — Pre-A1 (4–6 tuổi): Mimi's Morning Garden
     ======================================================================== */
  {
    id: 'book_mimi_garden',
    num: 2,
    level: 'Pre-A1',
    ageHint: '4–6 tuổi',
    titleEn: "Mimi's Morning Garden",
    titleVi: 'Khu Vườn Buổi Sáng Của Mimi',
    subtitle: 'Thiên nhiên & Tập đếm',
    minutes: '2 phút',
    coverBg: 'assets/art/books/scene_valley_green.webp',
    coverChar: 'mimi',
    coverEmoji: '🌻',
    accent: '#16A34A',
    softBg: '#F0FDF4',
    pages: [
      {
        bg: 'assets/art/books/scene_valley_green.webp',
        mood: 'morning',
        pan: 'left',
        chars: [{ id: 'mimi', x: 20, y: 10, scale: 0.98 }],
        props: [
          { emoji: '🌻', label: 'Sunflower', vi: 'Hoa hướng dương', x: 66, y: 10, size: 108, role: 'scenery' },
          { emoji: '☀️', label: 'Morning Sun', vi: 'Nắng buổi sáng', x: 80, y: 72, size: 60, role: 'badge' }
        ],
        en: 'Mimi wakes up early and walks into her sunny garden. The warm morning air smells sweet.',
        vi: 'Mimi thức dậy sớm và bước vào khu vườn ngập nắng. Không khí buổi sáng thật trong lành và thơm mát.',
        vocab: [
          { w: 'garden', ipa: '/ˈɡɑːr.dən/', vi: 'khu vườn', emoji: '🌻' },
          { w: 'morning', ipa: '/ˈmɔːr.nɪŋ/', vi: 'buổi sáng', emoji: '☀️' },
          { w: 'sweet', ipa: '/swiːt/', vi: 'ngọt ngào', emoji: '🌸' }
        ]
      },
      {
        bg: 'assets/art/books/scene_hills.webp',
        mood: 'sunny',
        pan: 'center',
        chars: [{ id: 'mimi', x: 22, y: 10, scale: 0.95 }],
        props: [
          { emoji: '💧', label: 'Cool Water', vi: 'Tưới nước mát', x: 56, y: 38, size: 62, role: 'badge' },
          { emoji: '🌱', label: 'Tiny Sprout', vi: 'Chồi non bé xíu', x: 66, y: 10, size: 88, role: 'scenery' }
        ],
        en: 'She pours cool water onto a tiny green sprout. "Drink up, little plant!" Mimi whispers.',
        vi: 'Cô bạn tưới dòng nước mát lên chồi non xanh bé xíu. "Uống nước ngoan nhé, cây nhỏ ơi!" Mimi thì thầm.',
        vocab: [
          { w: 'water', ipa: '/ˈwɔː.tər/', vi: 'nước', emoji: '💧' },
          { w: 'sprout', ipa: '/spraʊt/', vi: 'chồi non', emoji: '🌱' },
          { w: 'plant', ipa: '/plænt/', vi: 'cây xanh', emoji: '🌿' }
        ]
      },
      {
        bg: 'assets/art/books/scene_valley_green.webp',
        mood: 'sunny',
        pan: 'right',
        chars: [{ id: 'mimi', x: 18, y: 10, scale: 0.94 }],
        props: [
          { emoji: '🍓', label: 'Strawberry 1', vi: 'Quả dâu số 1', x: 48, y: 10, size: 70, role: 'object' },
          { emoji: '🍓', label: 'Strawberry 2', vi: 'Quả dâu số 2', x: 64, y: 12, size: 74, role: 'object' },
          { emoji: '🍓', label: 'Strawberry 3', vi: 'Quả dâu số 3', x: 80, y: 10, size: 70, role: 'object' }
        ],
        en: 'One, two, three! Mimi counts three bright red strawberries hiding under the green leaves.',
        vi: 'Một, hai, ba! Mimi đếm được ba quả dâu tây đỏ mọng đang trốn dưới tán lá xanh.',
        vocab: [
          { w: 'counts', ipa: '/kaʊnts/', vi: 'đếm', emoji: '🔢' },
          { w: 'strawberries', ipa: '/ˈstrɔː.ber.iz/', vi: 'quả dâu tây', emoji: '🍓' },
          { w: 'leaves', ipa: '/liːvz/', vi: 'những chiếc lá', emoji: '🍃' }
        ]
      },
      {
        bg: 'assets/art/books/scene_hills.webp',
        mood: 'sunny',
        pan: 'center',
        chars: [{ id: 'mimi', x: 20, y: 10, scale: 0.94 }],
        props: [
          { emoji: '🌻', label: 'Tall Sunflowers', vi: 'Hoa hướng dương cao', x: 66, y: 10, size: 118, role: 'scenery' },
          { emoji: '🐝', label: 'Yellow Bee', vi: 'Chú ong vàng', x: 52, y: 52, size: 68, role: 'actor' },
          { emoji: '🦋', label: 'Blue Butterfly', vi: 'Bạn bướm xanh', x: 80, y: 58, size: 74, role: 'actor' }
        ],
        en: 'Buzz, buzz! A friendly yellow bee and a blue butterfly dance around the tall sunflowers.',
        vi: 'Vo ve, vo ve! Một chú ong vàng thân thiện và bạn bướm xanh đang nhảy múa quanh những bông hoa hướng dương cao.',
        vocab: [
          { w: 'bee', ipa: '/biː/', vi: 'con ong', emoji: '🐝' },
          { w: 'butterfly', ipa: '/ˈbʌt.ər.flaɪ/', vi: 'con bướm', emoji: '🦋' },
          { w: 'dance', ipa: '/dæns/', vi: 'nhảy múa', emoji: '💃' }
        ]
      },
      {
        bg: 'assets/art/books/scene_cottage.webp',
        mood: 'cozy',
        pan: 'center',
        chars: [{ id: 'mimi', x: 22, y: 8, scale: 0.94 }],
        props: [
          { emoji: '🧺', label: 'Woven Basket', vi: 'Chiếc giỏ đan', x: 60, y: 10, size: 92, role: 'object' },
          { emoji: '🍓', label: 'Fresh Berries', vi: 'Dâu tây tươi sạch', x: 76, y: 14, size: 70, role: 'object' }
        ],
        en: 'Mimi places the fresh berries neatly into her woven basket. She washes them with clean water.',
        vi: 'Mimi xếp những quả dâu tươi gọn gàng vào chiếc giỏ đan. Cô bạn rửa chúng thật sạch với nước mát.',
        vocab: [
          { w: 'fresh', ipa: '/freʃ/', vi: 'tươi ngon', emoji: '🍓' },
          { w: 'basket', ipa: '/ˈbæs.kɪt/', vi: 'cái giỏ', emoji: '🧺' },
          { w: 'clean', ipa: '/kliːn/', vi: 'sạch sẽ', emoji: '✨' }
        ]
      },
      {
        bg: 'assets/art/books/scene_valley_green.webp',
        mood: 'sunny',
        pan: 'center',
        chars: [
          { id: 'mimi', x: 20, y: 10, scale: 0.94 },
          { id: 'leo', x: 54, y: 10, scale: 0.94, flip: true }
        ],
        props: [
          { emoji: '🍓', label: 'Share Berries', vi: 'Chia sẻ dâu ngọt', x: 38, y: 20, size: 72, role: 'object' },
          { emoji: '🌻', label: 'Garden', vi: 'Khu vườn', x: 82, y: 12, size: 98, role: 'scenery' }
        ],
        en: 'Mimi shares the sweet strawberries with Leo. "Yum! Your garden is wonderful, Mimi!"',
        vi: 'Mimi chia sẻ những quả dâu ngọt lành với Leo. "Ngon quá! Khu vườn của bạn thật tuyệt vời, Mimi ơi!"',
        vocab: [
          { w: 'shares', ipa: '/ʃerz/', vi: 'chia sẻ', emoji: '🤝' },
          { w: 'wonderful', ipa: '/ˈwʌn.dər.fəl/', vi: 'tuyệt vời', emoji: '🌟' }
        ]
      }
    ],
    quiz: [
      {
        qEn: 'How many red strawberries does Mimi count?',
        qVi: 'Mimi đã đếm được mấy quả dâu tây đỏ?',
        options: [
          { text: 'Three (3 quả)', emoji: '🍓', correct: true },
          { text: 'Ten (10 quả)', emoji: '🍎', correct: false },
          { text: 'One (1 quả)', emoji: '🍌', correct: false }
        ]
      },
      {
        qEn: 'Who dances around the sunflowers?',
        qVi: 'Ai đã nhảy múa quanh những bông hoa hướng dương?',
        options: [
          { text: 'A bee and a butterfly', emoji: '🐝', correct: true },
          { text: 'A tiger and a bear', emoji: '🐯', correct: false },
          { text: 'A bus and a boat', emoji: '🚌', correct: false }
        ]
      }
    ]
  },

  /* ========================================================================
     BOOK 3 — Pre-A1 (4–6 tuổi): Lulu's Rainy Day Tea
     ======================================================================== */
  {
    id: 'book_rainy_tea',
    num: 3,
    level: 'Pre-A1',
    ageHint: '4–6 tuổi',
    titleEn: "Lulu's Rainy Day Tea",
    titleVi: 'Tiệc Trà Ngày Mưa Của Lulu',
    subtitle: 'Thời tiết & Sẻ chia ấm áp',
    minutes: '2 phút',
    coverBg: 'assets/art/books/scene_cottage.webp',
    coverChar: 'lulu',
    coverEmoji: '☔',
    accent: '#EC4899',
    softBg: '#FDF2F8',
    pages: [
      {
        bg: 'assets/art/books/scene_cottage_rainy.webp',
        mood: 'rainy',
        pan: 'center',
        chars: [{ id: 'lulu', x: 24, y: 8, scale: 0.96 }],
        props: [
          { emoji: '🌧️', label: 'Raindrops', vi: 'Mưa bên cửa sổ', x: 52, y: 58, size: 78, role: 'badge' }
        ],
        en: 'Pitter-patter! Soft blue raindrops tap on the window. It is a rainy afternoon.',
        vi: 'Tí tách, tí tách! Những hạt mưa xanh dịu dàng gõ nhịp bên khung cửa sổ. Hôm nay là một buổi chiều mưa dịu mát.',
        vocab: [
          { w: 'raindrops', ipa: '/ˈreɪn.drɒps/', vi: 'hạt mưa', emoji: '💧' },
          { w: 'window', ipa: '/ˈwɪn.doʊ/', vi: 'cửa sổ', emoji: '🪟' },
          { w: 'rainy', ipa: '/ˈreɪ.ni/', vi: 'có mưa', emoji: '🌧️' }
        ]
      },
      {
        bg: 'assets/art/books/scene_cottage.webp',
        mood: 'cozy',
        pan: 'left',
        chars: [{ id: 'lulu', x: 24, y: 8, scale: 0.96 }],
        props: [
          { emoji: '🫖', label: 'Honey Tea', vi: 'Ấm trà mật ong', x: 52, y: 10, size: 84, role: 'object' },
          { emoji: '🧁', label: 'Sweet Cupcakes', vi: 'Bánh nướng ngọt', x: 70, y: 10, size: 82, role: 'object' }
        ],
        en: 'Inside her cozy house, Lulu makes warm honey tea and sets out sweet cupcakes.',
        vi: 'Trong ngôi nhà ấm cúng, Lulu pha một ấm trà mật ong thơm lừng và bày ra những chiếc bánh ngọt.',
        vocab: [
          { w: 'cozy', ipa: '/ˈkoʊ.zi/', vi: 'ấm cúng', emoji: '🏡' },
          { w: 'warm', ipa: '/wɔːrm/', vi: 'ấm áp', emoji: '☕' },
          { w: 'cupcakes', ipa: '/ˈkʌp.keɪks/', vi: 'bánh nướng nhỏ', emoji: '🧁' }
        ]
      },
      {
        bg: 'assets/art/books/scene_cottage.webp',
        mood: 'cozy',
        pan: 'right',
        chars: [
          { id: 'lulu', x: 22, y: 8, scale: 0.94 },
          { id: 'toby', x: 68, y: 8, scale: 0.94, flip: true }
        ],
        props: [
          { emoji: '☂️', label: 'Bright Umbrella', vi: 'Chiếc ô rực rỡ', x: 48, y: 20, size: 86, role: 'object' }
        ],
        en: 'Knock, knock! Toby the fox comes to the door with his bright umbrella. "Come in, Toby!"',
        vi: 'Cốc, cốc! Cáo Toby gõ cửa với chiếc ô rực rỡ trên tay. "Mời Toby vào nhà nhé!"',
        vocab: [
          { w: 'door', ipa: '/dɔːr/', vi: 'cánh cửa', emoji: '🚪' },
          { w: 'umbrella', ipa: '/ʌmˈbrel.ə/', vi: 'cái ô / cây dù', emoji: '☂️' }
        ]
      },
      {
        bg: 'assets/art/books/scene_cottage.webp',
        mood: 'cozy',
        pan: 'center',
        chars: [
          { id: 'lulu', x: 20, y: 8, scale: 0.92 },
          { id: 'toby', x: 68, y: 8, scale: 0.92, flip: true }
        ],
        props: [
          { emoji: '📖', label: 'Picture Book', vi: 'Cuốn truyện tranh', x: 44, y: 10, size: 84, role: 'object' },
          { emoji: '🍪', label: 'Crunchy Cookies', vi: 'Bánh quy giòn', x: 56, y: 10, size: 66, role: 'object' }
        ],
        en: 'They sip warm tea, eat crunchy cookies, and read a funny picture book together.',
        vi: 'Hai bạn nhâm nhi trà ấm, ăn bánh quy giòn tan và cùng nhau đọc một cuốn truyện tranh thật vui.',
        vocab: [
          { w: 'cookies', ipa: '/ˈkʊk.iz/', vi: 'bánh quy', emoji: '🍪' },
          { w: 'read', ipa: '/riːd/', vi: 'đọc sách', emoji: '📖' },
          { w: 'funny', ipa: '/ˈfʌn.i/', vi: 'vui nhộn', emoji: '😄' }
        ]
      },
      {
        bg: 'assets/art/painted_home_meadow.webp',
        mood: 'sunny',
        pan: 'center',
        chars: [
          { id: 'lulu', x: 24, y: 10, scale: 0.94 },
          { id: 'toby', x: 58, y: 10, scale: 0.94, flip: true }
        ],
        props: [
          { emoji: '🌈', label: 'Bright Rainbow', vi: 'Cầu vồng rực rỡ', x: 50, y: 66, size: 82, role: 'badge' }
        ],
        en: 'Soon the rain stops! Look up at the sky—a bright rainbow shines over the green hills.',
        vi: 'Chẳng mấy chốc cơn mưa tạnh hẳn! Ngước lên bầu trời kìa — một dải cầu vồng rực rỡ tỏa sáng trên đồi xanh.',
        vocab: [
          { w: 'stops', ipa: '/stɒps/', vi: 'dừng lại', emoji: '✋' },
          { w: 'rainbow', ipa: '/ˈreɪn.boʊ/', vi: 'cầu vồng', emoji: '🌈' },
          { w: 'shines', ipa: '/ʃaɪnz/', vi: 'tỏa sáng', emoji: '✨' }
        ]
      },
      {
        bg: 'assets/art/painted_home_meadow.webp',
        mood: 'sunny',
        pan: 'right',
        chars: [
          { id: 'lulu', x: 24, y: 10, scale: 0.94 },
          { id: 'toby', x: 56, y: 10, scale: 0.94, flip: true }
        ],
        props: [
          { emoji: '💖', label: 'Good Friends', vi: 'Tình bạn ngọt ngào', x: 76, y: 64, size: 58, role: 'badge' }
        ],
        en: 'Rainy days can be cozy, and sunny days are bright. Every day is sweet with a good friend!',
        vi: 'Ngày mưa thật ấm cúng, còn ngày nắng lại rạng rỡ. Ngày nào cũng thật ngọt ngào khi có bạn thân bên cạnh!',
        vocab: [
          { w: 'bright', ipa: '/braɪt/', vi: 'tươi sáng', emoji: '☀️' },
          { w: 'every', ipa: '/ˈev.ri/', vi: 'mỗi / mọi', emoji: '🌟' }
        ]
      }
    ],
    quiz: [
      {
        qEn: 'What does Lulu make on the rainy day?',
        qVi: 'Lulu đã chuẩn bị gì vào ngày mưa?',
        options: [
          { text: 'Warm honey tea & cupcakes', emoji: '🧁', correct: true },
          { text: 'Cold ice cream', emoji: '🍦', correct: false },
          { text: 'A toy rocket', emoji: '🚀', correct: false }
        ]
      },
      {
        qEn: 'What shines in the sky after the rain stops?',
        qVi: 'Điều gì tỏa sáng trên bầu trời sau khi tạnh mưa?',
        options: [
          { text: 'A bright rainbow', emoji: '🌈', correct: true },
          { text: 'A dark storm', emoji: '⛈️', correct: false },
          { text: 'A yellow bus', emoji: '🚌', correct: false }
        ]
      }
    ]
  },

  /* ========================================================================
     BOOK 4 — A1 (6–8 tuổi): Toby and the Lost Puppy
     ======================================================================== */
  {
    id: 'book_lost_puppy',
    num: 4,
    level: 'A1',
    ageHint: '6–8 tuổi',
    titleEn: 'Toby and the Lost Puppy',
    titleVi: 'Toby Và Chú Cún Đi Lạc',
    subtitle: 'Lòng tốt & Giúp đỡ',
    minutes: '3 phút',
    coverBg: 'assets/art/books/scene_forest.webp',
    coverChar: 'toby',
    coverEmoji: '🐶',
    accent: '#F97316',
    softBg: '#FFF7ED',
    pages: [
      {
        bg: 'assets/art/books/scene_forest.webp',
        mood: 'morning',
        pan: 'left',
        chars: [{ id: 'toby', x: 22, y: 10, scale: 0.96 }],
        props: [
          { emoji: '🐕', svg: 'svg:brown_puppy', label: 'Little Puppy', vi: 'Chú cún con sau bụi cây', x: 68, y: 10, size: 104, role: 'actor' }
        ],
        en: 'One sunny afternoon, Toby walks through the quiet park. Suddenly, he hears a tiny "Woof, woof!" behind a bush.',
        vi: 'Một buổi chiều nắng đẹp, Toby đi dạo qua công viên yên bình. Bỗng nhiên, cậu nghe thấy tiếng "Gâu, gâu!" khe khẽ sau bụi cây.',
        vocab: [
          { w: 'park', ipa: '/pɑːrk/', vi: 'công viên', emoji: '🌳' },
          { w: 'hears', ipa: '/hɪərz/', vi: 'nghe thấy', emoji: '👂' },
          { w: 'tiny', ipa: '/ˈtaɪ.ni/', vi: 'bé xíu', emoji: '🐶' }
        ]
      },
      {
        bg: 'assets/art/books/scene_forest.webp',
        mood: 'sunny',
        pan: 'center',
        chars: [{ id: 'toby', x: 22, y: 10, scale: 0.96 }],
        props: [
          { emoji: '🐕', svg: 'svg:brown_puppy', label: 'Brown Puppy', vi: 'Cún nâu tai cụp', x: 62, y: 10, size: 112, role: 'actor' },
          { emoji: '💧', label: 'Fresh Water', vi: 'Nước mát cho cún', x: 44, y: 16, size: 64, role: 'object' }
        ],
        en: 'It is a little brown puppy with soft floppy ears. He looks scared and lost. Toby gently gives him fresh water.',
        vi: 'Đó là một chú cún nâu nhỏ với đôi tai cụp mềm mại. Cún con trông có vẻ sợ hãi vì bị lạc. Toby nhẹ nhàng đưa nước mát cho cún uống.',
        vocab: [
          { w: 'puppy', ipa: '/ˈpʌp.i/', vi: 'cún con', emoji: '🐶' },
          { w: 'lost', ipa: '/lɒst/', vi: 'bị lạc', emoji: '🧭' },
          { w: 'gently', ipa: '/ˈdʒent.li/', vi: 'nhẹ nhàng', emoji: '💛' }
        ]
      },
      {
        bg: 'assets/art/books/scene_path_flip.webp',
        mood: 'sunny',
        pan: 'left',
        chars: [
          { id: 'toby', x: 18, y: 10, scale: 0.92 },
          { id: 'leo', x: 70, y: 10, scale: 0.92, flip: true }
        ],
        props: [
          { emoji: '🐕', svg: 'svg:brown_puppy', label: 'Max the Puppy', vi: 'Cún con Max', x: 46, y: 10, size: 104, role: 'actor' },
          { emoji: '🏷️', label: 'Red Collar Tag', vi: 'Thẻ tên vòng cổ đỏ', x: 46, y: 48, size: 62, role: 'badge' }
        ],
        en: 'Leo comes to help. They look closely at the puppy\'s red collar. "Look!" says Toby. "His name is Max, and he lives near the bakery!"',
        vi: 'Leo chạy tới giúp sức. Hai bạn nhìn kỹ chiếc vòng cổ màu đỏ của cún. "Nhìn kìa!" Toby reo lên. "Cậu ấy tên là Max và nhà ở gần tiệm bánh!"',
        vocab: [
          { w: 'collar', ipa: '/ˈkɒl.ər/', vi: 'vòng cổ', emoji: '🏷️' },
          { w: 'bakery', ipa: '/ˈbeɪ.kər.i/', vi: 'tiệm bánh', emoji: '🧁' }
        ]
      },
      {
        bg: 'assets/art/books/scene_path.webp',
        mood: 'sunny',
        pan: 'center',
        chars: [
          { id: 'toby', x: 16, y: 8, scale: 0.92 },
          { id: 'leo', x: 38, y: 8, scale: 0.92 }
        ],
        props: [
          { emoji: '🐕', svg: 'svg:brown_puppy', label: 'Max Wagging Tail', vi: 'Max vẫy đuôi dẫn đường', x: 58, y: 10, size: 96, flip: true, role: 'actor' },
          { emoji: '🏪', label: 'Warm Bakery', vi: 'Tiệm bánh ấm áp', x: 82, y: 14, size: 124, role: 'scenery' },
          { emoji: '🥐', label: 'Fresh Bread', vi: 'Bánh thơm lừng', x: 82, y: 58, size: 56, role: 'badge' }
        ],
        en: 'Toby and Leo walk down the street toward the warm bakery. Max wags his fluffy tail faster and faster because he knows the way!',
        vi: 'Toby và Leo bước dọc con phố về phía tiệm bánh ấm áp. Max vẫy chiếc đuôi xù ngày càng nhanh vì cậu đã nhận ra đường về nhà!',
        vocab: [
          { w: 'street', ipa: '/striːt/', vi: 'con phố', emoji: '🛣️' },
          { w: 'wags', ipa: '/wæɡz/', vi: 'vẫy đuôi', emoji: '🐶' },
          { w: 'way', ipa: '/weɪ/', vi: 'đường đi', emoji: '🧭' }
        ]
      },
      {
        bg: 'assets/art/books/scene_valley_green.webp',
        mood: 'sunny',
        pan: 'right',
        chars: [
          { id: 'toby', x: 18, y: 10, scale: 0.92 },
          { id: 'leo', x: 40, y: 10, scale: 0.92 }
        ],
        props: [
          { emoji: '🐕', svg: 'svg:brown_puppy', label: 'Happy Max', vi: 'Max vui mừng đoàn tụ', x: 60, y: 10, size: 96, flip: true, role: 'actor' },
          { emoji: '👩', svg: 'svg:mother_woman', label: 'Max\'s Family', vi: 'Gia đình của Max', x: 80, y: 10, size: 118, role: 'actor' },
          { emoji: '❤️', label: 'Safe & Home', vi: 'An toàn về nhà', x: 70, y: 58, size: 54, role: 'badge' }
        ],
        en: 'Max\'s family runs out with big happy smiles. "Max! You are safe! Thank you so much for bringing him home!"',
        vi: 'Gia đình của Max chạy ùa ra với nụ cười rạng rỡ. "Max ơi! Con an toàn rồi! Cảm ơn hai bạn nhỏ rất nhiều vì đã đưa Max về nhà!"',
        vocab: [
          { w: 'family', ipa: '/ˈfæm.əl.i/', vi: 'gia đình', emoji: '🏡' },
          { w: 'safe', ipa: '/seɪf/', vi: 'an toàn', emoji: '🛡️' },
          { w: 'bringing', ipa: '/ˈbrɪŋ.ɪŋ/', vi: 'đưa về', emoji: '🤝' }
        ]
      },
      {
        bg: 'assets/art/books/scene_sunset.webp',
        mood: 'sunset',
        pan: 'center',
        chars: [
          { id: 'toby', x: 24, y: 10, scale: 0.94 },
          { id: 'leo', x: 58, y: 10, scale: 0.94, flip: true }
        ],
        props: [
          { emoji: '🧁', label: 'Warm Muffins', vi: 'Bánh nướng cảm ơn', x: 42, y: 12, size: 80, role: 'object' },
          { emoji: '⭐', label: 'Kind Hero', vi: 'Người tốt bụng', x: 78, y: 68, size: 56, role: 'badge' }
        ],
        en: 'Max\'s owner gives Toby and Leo two warm muffins as a thank-you gift. Helping someone in need makes the heart shine bright.',
        vi: 'Chủ của Max tặng Toby và Leo hai chiếc bánh nướng ấm nóng để cảm ơn. Giúp đỡ người khác lúc khó khăn khiến trái tim mình luôn ấm áp và rạng rỡ.',
        vocab: [
          { w: 'gift', ipa: '/ɡɪft/', vi: 'món quà', emoji: '🎁' },
          { w: 'helping', ipa: '/ˈhel.pɪŋ/', vi: 'giúp đỡ', emoji: '🤝' },
          { w: 'heart', ipa: '/hɑːrt/', vi: 'trái tim', emoji: '❤️' }
        ]
      }
    ],
    quiz: [
      {
        qEn: 'What is the lost puppy\'s name?',
        qVi: 'Chú cún đi lạc tên là gì?',
        options: [
          { text: 'Max', emoji: '🐶', correct: true },
          { text: 'Bella', emoji: '🐱', correct: false },
          { text: 'Coco', emoji: '🦜', correct: false }
        ]
      },
      {
        qEn: 'How did Toby and Leo know where Max lived?',
        qVi: 'Làm sao Toby và Leo biết nhà của Max ở đâu?',
        options: [
          { text: 'They checked his red collar', emoji: '🏷️', correct: true },
          { text: 'They flew in a rocket', emoji: '🚀', correct: false },
          { text: 'They asked a fish', emoji: '🐟', correct: false }
        ]
      }
    ]
  },

  /* ========================================================================
     BOOK 5 — A1 (6–8 tuổi): Picnic by the Sunny Hill
     ======================================================================== */
  {
    id: 'book_blue_lake',
    num: 5,
    level: 'A1',
    ageHint: '6–8 tuổi',
    titleEn: 'Picnic by the Sunny Hill',
    titleVi: 'Chuyến Dã Ngoại Trên Đồi Nắng',
    subtitle: 'Ẩm thực & Hợp tác',
    minutes: '3 phút',
    coverBg: 'assets/art/painted_hub_games.webp',
    coverChar: 'leo',
    coverEmoji: '🧺',
    accent: '#0EA5E9',
    softBg: '#F0F9FF',
    pages: [
      {
        bg: 'assets/art/painted_hub_games.webp',
        mood: 'sunny',
        pan: 'left',
        chars: [
          { id: 'leo', x: 16, y: 10, scale: 0.9 },
          { id: 'mimi', x: 40, y: 10, scale: 0.9 }
        ],
        props: [
          { emoji: '🧺', label: 'Picnic Basket', vi: 'Giỏ dã ngoại', x: 70, y: 12, size: 84, role: 'object' },
          { emoji: '🎈', label: 'Balloons', vi: 'Bóng bay', x: 80, y: 64, size: 60, role: 'badge' }
        ],
        en: 'It is Saturday morning! Leo, Mimi, Toby, and Lulu are going on a big picnic on Sunny Hill.',
        vi: 'Sáng thứ Bảy đã đến! Leo, Mimi, Toby và Lulu cùng nhau đi dã ngoại trên Đồi Nắng.',
        vocab: [
          { w: 'Saturday', ipa: '/ˈsæt.ər.deɪ/', vi: 'Thứ Bảy', emoji: '📅' },
          { w: 'picnic', ipa: '/ˈpɪk.nɪk/', vi: 'buổi dã ngoại', emoji: '🧺' }
        ]
      },
      {
        bg: 'assets/art/books/scene_valley_green.webp',
        mood: 'sunny',
        pan: 'center',
        chars: [
          { id: 'mimi', x: 20, y: 10, scale: 0.92 },
          { id: 'lulu', x: 66, y: 10, scale: 0.92, flip: true }
        ],
        props: [
          { emoji: '🍎', label: 'Crisp Apples', vi: 'Táo đỏ giòn', x: 40, y: 12, size: 74, role: 'object' },
          { emoji: '🍌', label: 'Sweet Bananas', vi: 'Chuối vàng ngọt', x: 54, y: 12, size: 74, role: 'object' }
        ],
        en: 'Everyone brings something yummy to share. Mimi packs crisp red apples, and Lulu brings sweet yellow bananas.',
        vi: 'Ai cũng mang theo món ngon để chia sẻ. Mimi gói những quả táo đỏ giòn, còn Lulu mang chuối vàng ngọt lịm.',
        vocab: [
          { w: 'everyone', ipa: '/ˈev.ri.wʌn/', vi: 'mọi người', emoji: '👥' },
          { w: 'packs', ipa: '/pæks/', vi: 'đóng gói', emoji: '🎒' },
          { w: 'crisp', ipa: '/krɪsp/', vi: 'giòn tan', emoji: '🍎' }
        ]
      },
      {
        bg: 'assets/art/books/scene_valley_green.webp',
        mood: 'sunny',
        pan: 'right',
        chars: [
          { id: 'toby', x: 20, y: 10, scale: 0.92 },
          { id: 'leo', x: 66, y: 10, scale: 0.92, flip: true }
        ],
        props: [
          { emoji: '🥪', label: 'Sandwiches', vi: 'Bánh mì kẹp tươi', x: 40, y: 12, size: 78, role: 'object' },
          { emoji: '🍉', label: 'Watermelon', vi: 'Dưa hấu mọng nước', x: 56, y: 12, size: 78, role: 'object' }
        ],
        en: 'Toby carries fresh sandwiches, and Leo brings juicy slices of watermelon. They spread a large blanket on the soft grass.',
        vi: 'Toby xách theo bánh mì kẹp tươi ngon, còn Leo mang dưa hấu mọng nước. Các bạn trải một tấm thảm rộng trên bãi cỏ êm.',
        vocab: [
          { w: 'juicy', ipa: '/ˈdʒuː.si/', vi: 'mọng nước', emoji: '🍉' },
          { w: 'blanket', ipa: '/ˈblæŋ.kɪt/', vi: 'tấm thảm / chăn', emoji: '🧺' },
          { w: 'grass', ipa: '/ɡræs/', vi: 'bãi cỏ', emoji: '🌿' }
        ]
      },
      {
        bg: 'assets/art/painted_hub_phonics.webp',
        mood: 'sunny',
        pan: 'center',
        chars: [
          { id: 'lulu', x: 18, y: 10, scale: 0.9 },
          { id: 'toby', x: 68, y: 10, scale: 0.9, flip: true }
        ],
        props: [
          { emoji: '🎸', label: 'Guitar', vi: 'Đàn ghi-ta', x: 42, y: 16, size: 84, role: 'object' },
          { emoji: '🎵', label: 'Concert Music', vi: 'Âm nhạc vui tươi', x: 54, y: 66, size: 56, role: 'badge' }
        ],
        en: 'After lunch, Lulu plays cheerful songs and little birds sing along in the trees. The meadow feels like a concert!',
        vi: 'Sau bữa trưa, Lulu chơi những bản nhạc vui tươi và mấy chú chim nhỏ trên cây cũng hót theo. Thảo nguyên như một buổi hòa nhạc!',
        vocab: [
          { w: 'cheerful', ipa: '/ˈtʃɪr.fəl/', vi: 'vui tươi', emoji: '🎵' },
          { w: 'birds', ipa: '/bɜːrdz/', vi: 'những chú chim', emoji: '🐦' },
          { w: 'concert', ipa: '/ˈkɒn.sɜːrt/', vi: 'buổi hòa nhạc', emoji: '🎸' }
        ]
      },
      {
        bg: 'assets/art/books/scene_hills.webp',
        mood: 'morning',
        pan: 'center',
        chars: [
          { id: 'mimi', x: 22, y: 10, scale: 0.92 },
          { id: 'leo', x: 64, y: 10, scale: 0.92, flip: true }
        ],
        props: [
          { emoji: '♻️', label: 'Clean Up', vi: 'Dọn dẹp sạch sẽ', x: 46, y: 16, size: 78, role: 'object' }
        ],
        en: 'Before going home, all four friends pick up every wrapper and leave the green hill spotless and clean.',
        vi: 'Trước khi ra về, cả bốn bạn cùng nhặt sạch từng mẩu giấy gói để ngọn đồi xanh luôn sạch đẹp tinh tươm.',
        vocab: [
          { w: 'before', ipa: '/bɪˈfɔːr/', vi: 'trước khi', emoji: '⏰' },
          { w: 'spotless', ipa: '/ˈspɒt.ləs/', vi: 'sạch tinh tươm', emoji: '✨' }
        ]
      },
      {
        bg: 'assets/art/books/scene_sunset.webp',
        mood: 'sunset',
        pan: 'right',
        chars: [
          { id: 'leo', x: 14, y: 10, scale: 0.85 },
          { id: 'mimi', x: 36, y: 10, scale: 0.85 },
          { id: 'toby', x: 58, y: 10, scale: 0.85, flip: true },
          { id: 'lulu', x: 78, y: 10, scale: 0.85, flip: true }
        ],
        props: [
          { emoji: '⭐', label: 'Teamwork', vi: 'Đoàn kết sẻ chia', x: 50, y: 72, size: 58, role: 'badge' }
        ],
        en: 'When everyone helps and shares, a simple picnic becomes a memory to treasure forever.',
        vi: 'Khi ai cũng biết sẻ chia và chung tay, một chuyến dã ngoại giản dị sẽ trở thành kỷ niệm quý giá mãi mãi.',
        vocab: [
          { w: 'memory', ipa: '/ˈmem.ər.i/', vi: 'kỷ niệm', emoji: '🌟' },
          { w: 'treasure', ipa: '/ˈtreʒ.ər/', vi: 'trân quý', emoji: '💎' }
        ]
      }
    ],
    quiz: [
      {
        qEn: 'What fruit did Leo bring to the picnic?',
        qVi: 'Leo đã mang loại trái cây nào đi dã ngoại?',
        options: [
          { text: 'Juicy watermelon', emoji: '🍉', correct: true },
          { text: 'Sour lemons', emoji: '🍋', correct: false },
          { text: 'Green pears', emoji: '🍐', correct: false }
        ]
      },
      {
        qEn: 'What did the friends do before going home?',
        qVi: 'Các bạn nhỏ đã làm gì trước khi ra về?',
        options: [
          { text: 'Cleaned up the hill', emoji: '♻️', correct: true },
          { text: 'Left their basket behind', emoji: '🧺', correct: false },
          { text: 'Climbed a mountain', emoji: '⛰️', correct: false }
        ]
      }
    ]
  },

  /* ========================================================================
     BOOK 6 — A2 (8–10 tuổi): The Secret of the Coral Reef
     ======================================================================== */
  {
    id: 'book_coral_reef',
    num: 6,
    level: 'A2',
    ageHint: '8–10 tuổi',
    titleEn: 'The Secret of the Coral Reef',
    titleVi: 'Bí Mật Rạn San Hô',
    subtitle: 'Đại dương & Bảo vệ biển xanh',
    minutes: '3 phút',
    coverBg: 'assets/art/painted_bg_ocean.webp',
    coverChar: 'leo',
    coverEmoji: '🐳',
    accent: '#0284C7',
    softBg: '#E0F2FE',
    pages: [
      {
        bg: 'assets/art/painted_bg_ocean.webp',
        mood: 'ocean',
        pan: 'center',
        chars: [{ id: 'leo', x: 18, y: 8, scale: 0.94 }],
        props: [
          { emoji: '🤿', label: 'Diving Mask', vi: 'Kính lặn biển', x: 50, y: 54, size: 70, role: 'object' },
          { emoji: '🐠', label: 'Tropical Fish', vi: 'Cá nhiệt đới', x: 74, y: 38, size: 84, role: 'actor' }
        ],
        en: 'Leo puts on his diving mask and slips into the clear turquoise sea. Sunlight dances down through the cool water like golden ribbons.',
        vi: 'Leo đeo kính lặn và thả mình xuống làn nước biển xanh ngọc trong vắt. Ánh nắng nhảy múa xuyên qua làn nước mát như những dải lụa vàng.',
        vocab: [
          { w: 'turquoise', ipa: '/ˈtɜːr.kwɔɪz/', vi: 'màu xanh ngọc', emoji: '🌊' },
          { w: 'sunlight', ipa: '/ˈsʌn.laɪt/', vi: 'ánh nắng', emoji: '☀️' }
        ]
      },
      {
        bg: 'assets/art/painted_bg_ocean.webp',
        mood: 'ocean',
        pan: 'left',
        chars: [{ id: 'leo', x: 18, y: 8, scale: 0.9 }],
        props: [
          { emoji: '🐳', label: 'Baby Whale', vi: 'Cá voi con hiền lành', x: 64, y: 42, size: 112, role: 'actor' },
          { emoji: '🐚', label: 'Sea Shell', vi: 'Vỏ sò dưới cát', x: 78, y: 10, size: 64, role: 'object' }
        ],
        en: 'A gentle baby whale glides past with a joyful song. "Welcome to our coral reef!" the whale hums. "Thousands of sea creatures call this reef home."',
        vi: 'Một chú cá voi con hiền lành lướt qua với tiếng hát vui tươi. "Chào mừng đến rạn san hô của chúng tôi! Hàng ngàn sinh vật biển coi nơi đây là mái nhà."',
        vocab: [
          { w: 'glides', ipa: '/ɡlaɪdz/', vi: 'lướt nhẹ', emoji: '🐳' },
          { w: 'creatures', ipa: '/ˈkriː.tʃərz/', vi: 'sinh vật', emoji: '🐠' }
        ]
      },
      {
        bg: 'assets/art/painted_bg_ocean.webp',
        mood: 'ocean',
        pan: 'right',
        chars: [{ id: 'leo', x: 18, y: 8, scale: 0.9 }],
        props: [
          { emoji: '🐢', label: 'Sea Turtle', vi: 'Rùa biển lo lắng', x: 62, y: 34, size: 98, role: 'actor' },
          { emoji: '🪸', label: 'Pink Coral', vi: 'San hô hồng', x: 80, y: 10, size: 78, role: 'scenery' }
        ],
        en: 'Near a pink coral garden, Leo spots a sea turtle swimming around a plastic bottle stuck between two rocks. The turtle looks worried.',
        vi: 'Gần vườn san hô hồng, Leo thấy một chú rùa biển đang bơi quanh một chai nhựa mắc kẹt giữa hai tảng đá. Chú rùa trông rất lo lắng.',
        vocab: [
          { w: 'plastic', ipa: '/ˈplæs.tɪk/', vi: 'nhựa', emoji: '♻️' },
          { w: 'worried', ipa: '/ˈwʌr.id/', vi: 'lo lắng', emoji: '🐢' }
        ]
      },
      {
        bg: 'assets/art/painted_bg_ocean.webp',
        mood: 'ocean',
        pan: 'center',
        chars: [{ id: 'leo', x: 22, y: 8, scale: 0.94 }],
        props: [
          { emoji: '♻️', label: 'Clean Reef', vi: 'Nhặt rác bảo vệ biển', x: 52, y: 42, size: 74, role: 'badge' },
          { emoji: '🐢', label: 'Happy Turtle', vi: 'Rùa biển cảm ơn', x: 74, y: 24, size: 96, role: 'actor' }
        ],
        en: 'Leo carefully lifts the plastic bottle out of the reef and tucks it into his mesh bag. The sea turtle flips happily and gives a grateful nod.',
        vi: 'Leo cẩn thận nhặt chai nhựa ra khỏi rạn san hô và bỏ gọn vào túi lưới. Chú rùa biển lộn vòng vui mừng và gật đầu cảm ơn.',
        vocab: [
          { w: 'carefully', ipa: '/ˈker.fəl.i/', vi: 'cẩn thận', emoji: '🤲' },
          { w: 'grateful', ipa: '/ˈɡreɪt.fəl/', vi: 'biết ơn', emoji: '💙' }
        ]
      },
      {
        bg: 'assets/art/painted_bg_ocean.webp',
        mood: 'ocean',
        pan: 'left',
        chars: [{ id: 'leo', x: 18, y: 8, scale: 0.92 }],
        props: [
          { emoji: '🐙', label: 'Shy Octopus', vi: 'Bạch tuộc dễ thương', x: 54, y: 18, size: 92, role: 'actor' },
          { emoji: '🐡', label: 'Ocean Fish', vi: 'Đàn cá biển', x: 76, y: 50, size: 80, role: 'actor' }
        ],
        en: 'Now the tiny fish, a shy octopus, and bright starfish come out to play. The secret of the reef is simple: every creature depends on clean water.',
        vi: 'Giờ đây đàn cá nhỏ, chú bạch tuộc nhút nhát và sao biển rực rỡ cùng ùa ra vui chơi. Bí mật của rạn san hô thật giản dị: mọi sinh vật đều cần làn nước sạch.',
        vocab: [
          { w: 'depends', ipa: '/dɪˈpendz/', vi: 'phụ thuộc vào', emoji: '🌊' },
          { w: 'secret', ipa: '/ˈsiː.krət/', vi: 'bí mật', emoji: '✨' }
        ]
      },
      {
        bg: 'assets/art/books/scene_beach.webp',
        mood: 'sunset',
        pan: 'center',
        chars: [
          { id: 'leo', x: 24, y: 8, scale: 0.94 },
          { id: 'mimi', x: 74, y: 8, scale: 0.94, flip: true }
        ],
        props: [
          { emoji: '♻️', label: 'Recycling Bin', vi: 'Thùng phân loại tái chế', x: 48, y: 10, size: 82, role: 'object' },
          { emoji: '🌍', label: 'Protect Ocean', vi: 'Bảo vệ đại dương xanh', x: 50, y: 58, size: 64, role: 'badge' }
        ],
        en: 'Back on shore, Leo drops the bottle into the recycling bin. Even one small kind action helps protect our whole blue ocean.',
        vi: 'Trở lại bờ, Leo bỏ chai nhựa vào thùng tái chế. Chỉ một hành động tử tế nhỏ bé thôi cũng góp phần bảo vệ cả đại dương xanh.',
        vocab: [
          { w: 'protect', ipa: '/prəˈtekt/', vi: 'bảo vệ', emoji: '🌍' },
          { w: 'ocean', ipa: '/ˈoʊ.ʃən/', vi: 'đại dương', emoji: '🌊' }
        ]
      }
    ],
    quiz: [
      {
        qEn: 'What did Leo remove from the coral reef?',
        qVi: 'Leo đã nhặt bỏ thứ gì khỏi rạn san hô?',
        options: [
          { text: 'A plastic bottle', emoji: '♻️', correct: true },
          { text: 'A golden crown', emoji: '👑', correct: false },
          { text: 'A red umbrella', emoji: '☂️', correct: false }
        ]
      },
      {
        qEn: 'What is the secret of the coral reef?',
        qVi: 'Bí mật của rạn san hô là gì?',
        options: [
          { text: 'Every sea creature needs clean water', emoji: '🌊', correct: true },
          { text: 'Fish love loud cars', emoji: '🚗', correct: false },
          { text: 'Coral grows in the desert', emoji: '🏜️', correct: false }
        ]
      }
    ]
  },

  /* ========================================================================
     BOOK 7 — A2 (8–10 tuổi): Mimi's Wind Kite
     ======================================================================== */
  {
    id: 'book_little_kite',
    num: 7,
    level: 'A2',
    ageHint: '8–10 tuổi',
    titleEn: "Mimi's Wind Kite",
    titleVi: 'Cánh Diều Gió Của Mimi',
    subtitle: 'Khoa học nhỏ & Kiên trì',
    minutes: '3 phút',
    coverBg: 'assets/art/books/scene_hills.webp',
    coverChar: 'mimi',
    coverEmoji: '🪁',
    accent: '#8B5CF6',
    softBg: '#F5F3FF',
    pages: [
      {
        bg: 'assets/art/painted_bg_montessori.webp',
        mood: 'morning',
        pan: 'left',
        chars: [{ id: 'mimi', x: 20, y: 8, scale: 0.94 }],
        props: [
          { emoji: '🪁', label: 'Diamond Kite', vi: 'Cánh diều hình thoi', x: 62, y: 22, size: 88, role: 'object' },
          { emoji: '🎀', label: 'Ribbons', vi: 'Ruy-băng màu sắc', x: 78, y: 14, size: 66, role: 'object' }
        ],
        en: 'Mimi wants to build her very own diamond kite. On her wooden desk, she lays out light paper, bamboo sticks, and colorful ribbons.',
        vi: 'Mimi muốn tự tay làm một chiếc diều hình thoi cho riêng mình. Trên bàn gỗ, cô đặt giấy mỏng, thanh tre nhẹ và những dải ruy-băng rực rỡ.',
        vocab: [
          { w: 'diamond', ipa: '/ˈdaɪ.mənd/', vi: 'hình thoi', emoji: '💠' },
          { w: 'bamboo', ipa: '/bæmˈbuː/', vi: 'cây tre', emoji: '🎋' }
        ]
      },
      {
        bg: 'assets/art/books/scene_hills.webp',
        mood: 'windy',
        pan: 'center',
        chars: [
          { id: 'mimi', x: 20, y: 10, scale: 0.92 },
          { id: 'toby', x: 66, y: 10, scale: 0.92, flip: true }
        ],
        props: [
          { emoji: '🪁', label: 'Spinning Kite', vi: 'Diều bị xoay vòng', x: 46, y: 18, size: 80, tilt: 35, role: 'object' },
          { emoji: '💨', label: 'Wind', vi: 'Cơn gió', x: 76, y: 66, size: 58, role: 'badge' }
        ],
        en: 'Mimi and Toby run across the breezy meadow to test the kite. Up it goes—then swoop! It spins and tumbles softly into the grass.',
        vi: 'Mimi và Toby chạy dọc thảo nguyên lộng gió để thả thử. Diều vừa bay lên — rồi vù! Nó xoay vòng và đáp nhẹ xuống bãi cỏ.',
        vocab: [
          { w: 'breezy', ipa: '/ˈbriː.zi/', vi: 'lộng gió nhẹ', emoji: '💨' },
          { w: 'tumbles', ipa: '/ˈtʌm.bəlz/', vi: 'lộn nhào xuống', emoji: '🪁' }
        ]
      },
      {
        bg: 'assets/art/books/scene_cottage.webp',
        mood: 'cozy',
        pan: 'right',
        chars: [
          { id: 'mimi', x: 22, y: 8, scale: 0.92 },
          { id: 'toby', x: 66, y: 8, scale: 0.92, flip: true }
        ],
        props: [
          { emoji: '💡', label: 'Idea', vi: 'Ý tưởng khoa học', x: 48, y: 60, size: 62, role: 'badge' },
          { emoji: '🎀', label: 'Long Ribbon Tail', vi: 'Đuôi diều giữ thăng bằng', x: 46, y: 14, size: 78, role: 'object' }
        ],
        en: 'Mimi does not give up. She thinks like a scientist: "Why did it spin? It needs balance! Let\'s tie a long ribbon tail to steady it."',
        vi: 'Mimi không hề bỏ cuộc. Cô suy nghĩ như một nhà khoa học: "Sao nó lại xoay nhỉ? Cần sự cân bằng! Hãy buộc thêm đuôi ruy-băng dài để giữ thăng bằng."',
        vocab: [
          { w: 'scientist', ipa: '/ˈsaɪ.ən.tɪst/', vi: 'nhà khoa học', emoji: '🔬' },
          { w: 'balance', ipa: '/ˈbæl.əns/', vi: 'sự cân bằng', emoji: '⚖️' }
        ]
      },
      {
        bg: 'assets/art/books/scene_hills.webp',
        mood: 'windy',
        pan: 'left',
        chars: [{ id: 'mimi', x: 20, y: 10, scale: 0.94 }],
        props: [
          { emoji: '🪁', label: 'Soaring Kite', vi: 'Diều bay cao', x: 66, y: 58, size: 96, role: 'object' },
          { emoji: '☁️', label: 'White Clouds', vi: 'Mây trắng', x: 38, y: 68, size: 72, role: 'scenery' }
        ],
        en: 'On the second try, the wind catches the bright kite smoothly. Higher and higher it climbs, dancing steadily beside the white clouds!',
        vi: 'Ở lần thử thứ hai, cơn gió nâng cánh diều lên thật êm ái. Diều bay càng lúc càng cao, lượn vững vàng bên những đám mây trắng!',
        vocab: [
          { w: 'climbs', ipa: '/klaɪmz/', vi: 'bay lên cao', emoji: '⬆️' },
          { w: 'steadily', ipa: '/ˈsted.əl.i/', vi: 'vững vàng', emoji: '✨' }
        ]
      },
      {
        bg: 'assets/art/books/scene_hills_wide.webp',
        mood: 'sunny',
        pan: 'center',
        chars: [
          { id: 'mimi', x: 18, y: 10, scale: 0.92 },
          { id: 'toby', x: 66, y: 10, scale: 0.92, flip: true }
        ],
        props: [
          { emoji: '🪁', label: 'Flying High', vi: 'Diều bay phấp phới', x: 48, y: 58, size: 92, role: 'object' },
          { emoji: '🎀', label: 'Ribbon Tail', vi: 'Đuôi diều cầu vồng', x: 40, y: 42, size: 64, role: 'object' }
        ],
        en: '"You did it, Mimi!" Toby cheers as he takes a turn holding the string. The ribbon tail flutters like a tiny rainbow in the breeze.',
        vi: '"Bạn làm được rồi, Mimi ơi!" Toby reo hò khi tới lượt cầm dây diều. Dải đuôi ruy-băng phấp phới như chiếc cầu vồng nhỏ trong gió.',
        vocab: [
          { w: 'cheers', ipa: '/tʃɪərz/', vi: 'reo hò cổ vũ', emoji: '🎉' },
          { w: 'flutters', ipa: '/ˈflʌt.ərz/', vi: 'phấp phới', emoji: '🎀' }
        ]
      },
      {
        bg: 'assets/art/books/scene_sunset.webp',
        mood: 'sunset',
        pan: 'center',
        chars: [
          { id: 'mimi', x: 24, y: 10, scale: 0.94 },
          { id: 'toby', x: 58, y: 10, scale: 0.94, flip: true }
        ],
        props: [
          { emoji: '🪁', label: 'Keep Trying', vi: 'Kiên trì sáng tạo', x: 44, y: 54, size: 84, role: 'object' }
        ],
        en: 'Mistakes are just clues that help us learn. When we stay curious and try again, our ideas can truly fly!',
        vi: 'Sai sót chỉ là những manh mối giúp ta học hỏi. Khi ta luôn tò mò và thử lại, ý tưởng của mình thực sự có thể bay cao!',
        vocab: [
          { w: 'clues', ipa: '/kluːz/', vi: 'manh mối', emoji: '🔍' },
          { w: 'curious', ipa: '/ˈkjʊr.i.əs/', vi: 'tò mò ham học', emoji: '💡' }
        ]
      }
    ],
    quiz: [
      {
        qEn: 'How did Mimi fix her spinning kite?',
        qVi: 'Mimi đã sửa cánh diều bị xoay bằng cách nào?',
        options: [
          { text: 'She tied a long ribbon tail for balance', emoji: '🎀', correct: true },
          { text: 'She put heavy rocks on it', emoji: '🪨', correct: false },
          { text: 'She hid it under the bed', emoji: '🛏️', correct: false }
        ]
      },
      {
        qEn: 'What lesson does Mimi\'s kite teach us?',
        qVi: 'Câu chuyện cánh diều của Mimi dạy ta điều gì?',
        options: [
          { text: 'Mistakes are clues—keep trying!', emoji: '💡', correct: true },
          { text: 'Never play outdoors', emoji: '🏠', correct: false },
          { text: 'Stop after the first try', emoji: '🛑', correct: false }
        ]
      }
    ]
  },

  /* ========================================================================
     BOOK 8 — B1 (10–13 tuổi): The Starlight Library
     ======================================================================== */
  {
    id: 'book_starlight_library',
    num: 8,
    level: 'B1',
    ageHint: '10–13 tuổi',
    titleEn: 'The Starlight Library',
    titleVi: 'Thư Viện Ánh Sao',
    subtitle: 'Trí tưởng tượng & Tri thức',
    minutes: '4 phút',
    coverBg: 'assets/art/painted_hub_srs.webp',
    coverChar: 'lulu',
    coverEmoji: '✨',
    accent: '#4F46E5',
    softBg: '#EEF2FF',
    pages: [
      {
        bg: 'assets/art/painted_hub_srs.webp',
        mood: 'starry',
        pan: 'center',
        chars: [{ id: 'lulu', x: 18, y: 10, scale: 0.94 }],
        props: [
          { emoji: '🏮', label: 'Golden Lantern', vi: 'Đèn lồng vàng', x: 64, y: 48, size: 74, role: 'object' },
          { emoji: '✨', label: 'Starlight', vi: 'Ánh sao', x: 78, y: 66, size: 58, role: 'badge' }
        ],
        en: 'At the top of Whispering Hill stood an ancient oak tree hung with golden lanterns. Every twilight, its hollow trunk opened into the Starlight Library.',
        vi: 'Trên đỉnh Đồi Thì Thầm có một cây sồi cổ thụ treo đầy đèn lồng vàng. Mỗi lúc hoàng hôn, thân cây mở ra một Thư Viện Ánh Sao kỳ diệu.',
        vocab: [
          { w: 'ancient', ipa: '/ˈeɪn.ʃənt/', vi: 'cổ xưa', emoji: '🌳' },
          { w: 'twilight', ipa: '/ˈtwaɪ.laɪt/', vi: 'hoàng hôn', emoji: '🌆' }
        ]
      },
      {
        bg: 'assets/art/books/scene_cottage.webp',
        mood: 'cozy',
        pan: 'left',
        chars: [
          { id: 'lulu', x: 18, y: 10, scale: 0.92 },
          { id: 'mimi', x: 68, y: 10, scale: 0.92, flip: true }
        ],
        props: [
          { emoji: '📖', label: 'Silver-Bound Volume', vi: 'Cuốn sách bìa bạc', x: 42, y: 12, size: 84, role: 'object' },
          { emoji: '🧭', label: 'Brass Compass', vi: 'La bàn bằng đồng', x: 56, y: 14, size: 68, role: 'object' }
        ],
        en: 'Lulu and Mimi stepped inside and found shelves curving up like wooden staircases. One silver-bound volume rested on a pedestal with a tiny brass compass.',
        vi: 'Lulu và Mimi bước vào trong và thấy những kệ sách uốn lượn như cầu thang gỗ. Một cuốn sách bìa bạc nằm trên bục cùng chiếc la bàn đồng nhỏ.',
        vocab: [
          { w: 'volume', ipa: '/ˈvɒl.juːm/', vi: 'cuốn sách', emoji: '📖' },
          { w: 'compass', ipa: '/ˈkʌm.pəs/', vi: 'la bàn', emoji: '🧭' }
        ]
      },
      {
        bg: 'assets/art/painted_bg_ocean.webp',
        mood: 'ocean',
        pan: 'center',
        chars: [{ id: 'lulu', x: 20, y: 8, scale: 0.9 }],
        props: [
          { emoji: '🐋', label: 'Giant Whale', vi: 'Cá voi đại dương', x: 66, y: 46, size: 104, role: 'actor' },
          { emoji: '✨', label: 'Glowing Sketches', vi: 'Nét vẽ phát sáng', x: 46, y: 66, size: 56, role: 'badge' }
        ],
        en: 'As Lulu turned the first page, soft sketches lifted into the air like glowing fireflies. Suddenly, they were reading about giant whales crossing deep ocean trenches.',
        vi: 'Khi Lulu lật trang đầu tiên, những nét vẽ mềm mại bay lên không trung như đom đóm phát sáng. Bỗng chốc hai bạn như đang du hành cùng cá voi giữa đại dương sâu thẳm.',
        vocab: [
          { w: 'sketches', ipa: '/ˈsketʃ.ɪz/', vi: 'bức phác thảo', emoji: '🎨' },
          { w: 'trenches', ipa: '/ˈtren.tʃɪz/', vi: 'rãnh đại dương', emoji: '🌊' }
        ]
      },
      {
        bg: 'assets/art/books/scene_night.webp',
        mood: 'starry',
        pan: 'center',
        chars: [{ id: 'mimi', x: 20, y: 10, scale: 0.9 }],
        props: [
          { emoji: '🌌', svg: 'svg:galaxy_swirl', label: 'Distant Galaxy', vi: 'Thiên hà xa xôi', x: 68, y: 46, size: 122, role: 'scenery' },
          { emoji: '🌙', label: 'Crescent Moon', vi: 'Trăng lưỡi liềm', x: 44, y: 64, size: 74, role: 'scenery' },
          { emoji: '📖', label: 'Magic of Books', vi: 'Sách mở ra vũ trụ', x: 54, y: 12, size: 80, role: 'object' }
        ],
        en: 'On the next chapter, golden constellations swirled overhead. "A single book can carry us across oceans and distant galaxies without leaving our chair," Mimi marveled.',
        vi: 'Sang chương tiếp theo, những chòm sao vàng xoay chuyển trên cao. "Chỉ một cuốn sách thôi có thể đưa ta vượt đại dương và chạm tới thiên hà xa xôi mà chẳng cần rời khỏi ghế," Mimi trầm trồ.',
        vocab: [
          { w: 'constellations', ipa: '/ˌkɒn.stəˈleɪ.ʃənz/', vi: 'các chòm sao', emoji: '✨' },
          { w: 'marveled', ipa: '/ˈmɑːr.vəld/', vi: 'trầm trồ kinh ngạc', emoji: '🤩' }
        ]
      },
      {
        bg: 'assets/art/painted_hub_vocab.webp',
        mood: 'cozy',
        pan: 'center',
        chars: [
          { id: 'lulu', x: 18, y: 10, scale: 0.92 },
          { id: 'mimi', x: 66, y: 10, scale: 0.92, flip: true }
        ],
        props: [
          { emoji: '✏️', label: 'Write Your Discovery', vi: 'Viết tiếp khám phá', x: 46, y: 24, size: 76, role: 'object' }
        ],
        en: 'At the very end, the final pages were completely blank. A gentle note read: "Every reader becomes an author. Write your own discovery here."',
        vi: 'Ở phần cuối cùng, những trang giấy vẫn còn trắng tinh. Một dòng nhắn nhủ dịu dàng viết: "Mỗi người đọc đều là một tác giả. Hãy viết tiếp khám phá của riêng bạn tại đây."',
        vocab: [
          { w: 'author', ipa: '/ˈɔː.θər/', vi: 'tác giả', emoji: '✏️' },
          { w: 'discovery', ipa: '/dɪˈskʌv.ər.i/', vi: 'khám phá mới', emoji: '🔭' }
        ]
      },
      {
        bg: 'assets/art/painted_hub_srs.webp',
        mood: 'starry',
        pan: 'center',
        chars: [
          { id: 'lulu', x: 24, y: 10, scale: 0.92 },
          { id: 'mimi', x: 58, y: 10, scale: 0.92, flip: true }
        ],
        props: [
          { emoji: '🌟', label: 'Knowledge', vi: 'Tri thức tỏa sáng', x: 46, y: 66, size: 62, role: 'badge' }
        ],
        en: 'Lulu and Mimi wrote down their favorite questions about nature and stars. Walking home beneath the lantern-lit branches, they knew the magic of reading would always stay with them.',
        vi: 'Lulu và Mimi viết xuống những câu hỏi thú vị nhất của mình về thiên nhiên và các vì sao. Bước về nhà dưới tán cây đèn lồng, hai bạn hiểu phép màu của việc đọc sách sẽ luôn ở bên mình.',
        vocab: [
          { w: 'beneath', ipa: '/bɪˈniːθ/', vi: 'bên dưới', emoji: '🌳' },
          { w: 'branches', ipa: '/ˈbræn.tʃɪz/', vi: 'những cành cây', emoji: '🌿' }
        ]
      }
    ],
    quiz: [
      {
        qEn: 'What did Lulu and Mimi find at the end of the silver book?',
        qVi: 'Lulu và Mimi đã thấy gì ở những trang cuối cuốn sách bìa bạc?',
        options: [
          { text: 'Blank pages inviting readers to write', emoji: '✏️', correct: true },
          { text: 'A locked treasure chest', emoji: '🔒', correct: false },
          { text: 'A recipe for soup', emoji: '🍲', correct: false }
        ]
      },
      {
        qEn: 'Why did Mimi marvel at the Starlight Library?',
        qVi: 'Vì sao Mimi lại trầm trồ về Thư Viện Ánh Sao?',
        options: [
          { text: 'Books can take us across oceans and galaxies', emoji: '🚀', correct: true },
          { text: 'It was full of video games', emoji: '🎮', correct: false },
          { text: 'It had free ice cream', emoji: '🍦', correct: false }
        ]
      }
    ]
  },

  /* ========================================================================
     BOOK 9 — B1 (10–13 tuổi): Journey Across the Green Valley
     ======================================================================== */
  {
    id: 'book_green_valley',
    num: 9,
    level: 'B1',
    ageHint: '10–13 tuổi',
    titleEn: 'Journey Across the Green Valley',
    titleVi: 'Hành Trình Qua Thung Lũng Xanh',
    subtitle: 'Địa lý & Tinh thần đồng đội',
    minutes: '4 phút',
    coverBg: 'assets/art/books/scene_valley_green.webp',
    coverChar: 'toby',
    coverEmoji: '🧭',
    accent: '#059669',
    softBg: '#ECFDF5',
    pages: [
      {
        bg: 'assets/art/books/scene_valley_green.webp',
        mood: 'morning',
        pan: 'left',
        chars: [
          { id: 'leo', x: 18, y: 10, scale: 0.92 },
          { id: 'toby', x: 46, y: 10, scale: 0.92 }
        ],
        props: [
          { emoji: '🗺️', label: 'Hand-Drawn Map', vi: 'Bản đồ vẽ tay', x: 70, y: 14, size: 84, role: 'object' },
          { emoji: '🧭', label: 'Trusty Compass', vi: 'La bàn định hướng', x: 82, y: 48, size: 68, role: 'object' }
        ],
        en: 'Armed with a hand-drawn map and a trusty compass, Leo and Toby set out early to explore the winding river of Green Valley.',
        vi: 'Mang theo tấm bản đồ vẽ tay và chiếc la bàn tin cậy, Leo và Toby khởi hành từ sớm để khám phá dòng sông uốn lượn của Thung Lũng Xanh.',
        vocab: [
          { w: 'valley', ipa: '/ˈvæl.i/', vi: 'thung lũng', emoji: '🏞️' },
          { w: 'winding', ipa: '/ˈwaɪn.dɪŋ/', vi: 'uốn lượn', emoji: '🌊' }
        ]
      },
      {
        bg: 'assets/art/books/scene_path.webp',
        mood: 'sunny',
        pan: 'center',
        chars: [
          { id: 'leo', x: 20, y: 10, scale: 0.92 },
          { id: 'toby', x: 64, y: 10, scale: 0.92, flip: true }
        ],
        props: [
          { emoji: '⛰️', label: 'Highland Ridge', vi: 'Sườn đồi cao', x: 46, y: 38, size: 96, role: 'scenery' },
          { emoji: '📓', label: 'Sketchbook', vi: 'Sổ tay phác họa', x: 46, y: 10, size: 70, role: 'object' }
        ],
        en: 'Along the dusty trail, they observed how highland streams flowed downward to nourish the meadows below. Toby sketched each landmark in his notebook.',
        vi: 'Dọc con đường mòn, hai bạn quan sát cách những con suối vùng cao chảy xuống tưới mát cho đồng cỏ bên dưới. Toby phác họa từng địa danh vào sổ tay.',
        vocab: [
          { w: 'observed', ipa: '/əbˈzɜːrvd/', vi: 'quan sát', emoji: '👀' },
          { w: 'nourish', ipa: '/ˈnɜːr.ɪʃ/', vi: 'nuôi dưỡng', emoji: '🌱' }
        ]
      },
      {
        bg: 'assets/art/books/scene_forest.webp',
        mood: 'rainy',
        pan: 'center',
        chars: [
          { id: 'leo', x: 24, y: 10, scale: 0.92 },
          { id: 'toby', x: 66, y: 10, scale: 0.92, flip: true }
        ],
        props: [
          { emoji: '🧭', label: 'Check Compass', vi: 'Xem lại la bàn dưới tán sồi', x: 46, y: 14, size: 76, role: 'object', z: 5 }
        ],
        en: 'At noon, gray clouds drifted over the ridge and a sudden summer shower began. Instead of panicking, they sheltered under a wide oak canopy and checked their compass.',
        vi: 'Giữa trưa, mây xám kéo tới sườn đồi và một cơn mưa rào mùa hè bất chợt đổ xuống. Thay vì hoảng hốt, hai bạn trú dưới tán sồi rộng và xem lại la bàn.',
        vocab: [
          { w: 'panicking', ipa: '/ˈpæn.ɪk.ɪŋ/', vi: 'hoảng hốt', emoji: '😌' },
          { w: 'sheltered', ipa: '/ˈʃel.tərd/', vi: 'trú ẩn', emoji: '🌳' }
        ]
      },
      {
        bg: 'assets/art/painted_home_meadow.webp',
        mood: 'sunny',
        pan: 'right',
        chars: [
          { id: 'leo', x: 18, y: 10, scale: 0.92 },
          { id: 'toby', x: 66, y: 10, scale: 0.92, flip: true }
        ],
        props: [
          { emoji: '🌉', label: 'Wooden Footbridge', vi: 'Cây cầu gỗ qua sông', x: 46, y: 14, size: 96, role: 'scenery' },
          { emoji: '🌈', label: 'Rainbow', vi: 'Cầu vồng sau mưa', x: 48, y: 66, size: 74, role: 'badge' }
        ],
        en: 'When the mist cleared, a sparkling wooden footbridge appeared ahead. Together they crossed the river, cheering as they spotted the glowing treehouse in the distance.',
        vi: 'Khi làn sương tan đi, một cây cầu gỗ lấp lánh hiện ra phía trước. Cả hai cùng băng qua sông, reo vui khi thấy ngôi nhà cây sáng đèn ở đằng xa.',
        vocab: [
          { w: 'mist', ipa: '/mɪst/', vi: 'làn sương', emoji: '🌫️' },
          { w: 'appeared', ipa: '/əˈpɪərd/', vi: 'hiện ra', emoji: '✨' }
        ]
      },
      {
        bg: 'assets/art/books/scene_sunset.webp',
        mood: 'sunset',
        pan: 'center',
        chars: [
          { id: 'leo', x: 22, y: 10, scale: 0.92 },
          { id: 'toby', x: 64, y: 10, scale: 0.92, flip: true }
        ],
        props: [
          { emoji: '🔭', label: 'Hilltop Viewpoint', vi: 'Kính ngắm toàn cảnh thung lũng', x: 46, y: 14, size: 88, role: 'object' }
        ],
        en: 'From the hilltop viewpoint, the entire valley stretched out like a patchwork quilt of emerald fields, orchards, and winding paths.',
        vi: 'Từ đỉnh đồi ngắm cảnh, cả thung lũng trải dài như tấm chăn ghép sắc màu của đồng ruộng xanh ngọc, vườn cây ăn trái và những lối mòn uốn quanh.',
        vocab: [
          { w: 'entire', ipa: '/ɪnˈtaɪər/', vi: 'toàn bộ', emoji: '🌍' },
          { w: 'orchards', ipa: '/ˈɔːr.tʃərdz/', vi: 'vườn cây ăn trái', emoji: '🍎' }
        ]
      },
      {
        bg: 'assets/art/books/scene_valley_green.webp',
        mood: 'sunset',
        pan: 'center',
        chars: [
          { id: 'leo', x: 24, y: 10, scale: 0.94 },
          { id: 'toby', x: 58, y: 10, scale: 0.94, flip: true }
        ],
        props: [
          { emoji: '🗺️', label: 'Next Map', vi: 'Bản đồ hành trình mới', x: 42, y: 12, size: 78, role: 'object' },
          { emoji: '⭐', label: 'Adventure', vi: 'Tinh thần đồng đội', x: 78, y: 68, size: 58, role: 'badge' }
        ],
        en: 'Every great journey requires patience, preparation, and a partner you can trust. Leo and Toby were already planning their next map.',
        vi: 'Mọi hành trình tuyệt vời đều cần sự kiên nhẫn, chuẩn bị kỹ lưỡng và một người bạn đồng hành đáng tin cậy. Leo và Toby đã bắt đầu vẽ tấm bản đồ tiếp theo.',
        vocab: [
          { w: 'patience', ipa: '/ˈpeɪ.ʃəns/', vi: 'sự kiên nhẫn', emoji: '⏳' },
          { w: 'preparation', ipa: '/ˌprep.əˈreɪ.ʃən/', vi: 'sự chuẩn bị', emoji: '🎒' }
        ]
      }
    ],
    quiz: [
      {
        qEn: 'What did Leo and Toby do when the sudden rain shower started?',
        qVi: 'Leo và Toby đã làm gì khi cơn mưa rào bất chợt đổ xuống?',
        options: [
          { text: 'Sheltered under an oak tree and checked their compass', emoji: '🌳', correct: true },
          { text: 'Threw away their map', emoji: '🗺️', correct: false },
          { text: 'Swam across the ocean', emoji: '🌊', correct: false }
        ]
      },
      {
        qEn: 'According to the story, what does every great journey require?',
        qVi: 'Theo câu chuyện, mỗi hành trình tuyệt vời cần điều gì?',
        options: [
          { text: 'Patience, preparation, and a trusted partner', emoji: '🤝', correct: true },
          { text: 'Only running as fast as possible', emoji: '🏃', correct: false },
          { text: 'Never checking the weather', emoji: '🌧️', correct: false }
        ]
      }
    ]
  },

  /* ========================================================================
     BOOK 10 — B2 (12–15+ tuổi): The Clockmaker's Promise
     ======================================================================== */
  {
    id: 'book_clockmaker',
    num: 10,
    level: 'B2',
    ageHint: '12–15+ tuổi',
    titleEn: "The Clockmaker's Promise",
    titleVi: 'Lời Hứa Của Người Thợ Đồng Hồ',
    subtitle: 'Thời gian, Trách nhiệm & Sáng tạo',
    minutes: '4 phút',
    coverBg: 'assets/art/books/scene_autumn.webp',
    coverChar: 'mimi',
    coverEmoji: '🕰️',
    accent: '#D97706',
    softBg: '#FFFBEB',
    pages: [
      {
        bg: 'assets/art/books/scene_autumn.webp',
        mood: 'morning',
        pan: 'left',
        chars: [{ id: 'mimi', x: 20, y: 10, scale: 0.92 }],
        props: [
          { emoji: '🕰️', svg: 'svg:clock_tower', label: 'Golden Tower Clock', vi: 'Tháp đồng hồ vàng', x: 64, y: 8, w: 156, h: 215, role: 'scenery' },
          { emoji: '🍂', label: 'Autumn Morning', vi: 'Buổi sáng mùa thu', x: 84, y: 62, size: 60, role: 'badge' }
        ],
        en: 'For fifty years, the golden tower clock at Meadow Square chimed every sunrise without fail. One autumn morning, however, its great brass hands suddenly fell silent.',
        vi: 'Suốt năm mươi năm, chiếc đồng hồ tháp vàng ở Quảng trường Thảo Nguyên luôn ngân vang mỗi bình minh chưa từng sai nhịp. Thế nhưng một sáng mùa thu, đôi kim đồng lớn bỗng ngừng lại lặng im.',
        vocab: [
          { w: 'chimed', ipa: '/tʃaɪmd/', vi: 'ngân vang tiếng chuông', emoji: '🔔' },
          { w: 'silent', ipa: '/ˈsaɪ.lənt/', vi: 'im lặng', emoji: '🤫' }
        ]
      },
      {
        bg: 'assets/art/books/scene_cottage.webp',
        mood: 'cozy',
        pan: 'center',
        chars: [
          { id: 'mimi', x: 20, y: 8, scale: 0.92 },
          { id: 'leo', x: 68, y: 8, scale: 0.92, flip: true }
        ],
        props: [
          { emoji: '⚙️', label: 'Cogwheels', vi: 'Hệ thống bánh răng', x: 44, y: 12, size: 88, role: 'object' },
          { emoji: '🔍', label: 'Inspect Carefully', vi: 'Soi kính kiểm tra', x: 52, y: 46, size: 68, role: 'object' }
        ],
        en: 'Mimi, the young apprentice clockmaker, climbed the spiral staircase with Leo. Instead of guessing, she carefully examined every tiny spring and cogwheel under warm lamplight.',
        vi: 'Mimi, cô học việc trẻ của tiệm đồng hồ, leo lên cầu thang xoắn ốc cùng Leo. Thay vì đoán mò, cô cẩn trọng kiểm tra từng chiếc lò xo và bánh răng nhỏ dưới ánh đèn ấm.',
        vocab: [
          { w: 'apprentice', ipa: '/əˈpren.tɪs/', vi: 'người học việc', emoji: '🛠️' },
          { w: 'examined', ipa: '/ɪɡˈzæm.ɪnd/', vi: 'kiểm tra kỹ lưỡng', emoji: '🔍' }
        ]
      },
      {
        bg: 'assets/art/books/scene_cottage.webp',
        mood: 'cozy',
        pan: 'right',
        chars: [{ id: 'mimi', x: 22, y: 8, scale: 0.94 }],
        props: [
          { emoji: '⚙️', label: 'Main Gear Wheel', vi: 'Bánh răng chính', x: 58, y: 12, size: 98, role: 'object' },
          { emoji: '🪶', label: 'Sparrow Feather', vi: 'Chiếc lông chim sẻ kẹt', x: 74, y: 34, size: 74, role: 'object' }
        ],
        en: 'Tucked deep inside the main wheel was a single bent tooth and a stray sparrow feather. "Remarkable," Mimi murmured. "Even the smallest neglected piece can pause an entire mechanism."',
        vi: 'Nằm sâu bên trong bánh xe chính là một răng cưa bị cong và chiếc lông chim sẻ lạc vào. "Đáng kinh ngạc thật," Mimi khẽ nói. "Ngay cả chi tiết nhỏ nhất bị bỏ quên cũng có thể làm dừng cả bộ máy."',
        vocab: [
          { w: 'neglected', ipa: '/nɪˈɡlek.tɪd/', vi: 'bị bỏ quên', emoji: '⚙️' },
          { w: 'mechanism', ipa: '/ˈmek.ə.nɪ.zəm/', vi: 'cơ chế / bộ máy', emoji: '🔧' }
        ]
      },
      {
        bg: 'assets/art/books/scene_cottage.webp',
        mood: 'cozy',
        pan: 'left',
        chars: [
          { id: 'mimi', x: 20, y: 8, scale: 0.92 },
          { id: 'leo', x: 66, y: 8, scale: 0.92, flip: true }
        ],
        props: [
          { emoji: '🔧', label: 'Precision Tools', vi: 'Dụng cụ chế tác', x: 42, y: 12, size: 80, role: 'object' },
          { emoji: '⚙️', label: 'New Brass Gear', vi: 'Bánh răng đồng mới', x: 54, y: 36, size: 74, role: 'object' }
        ],
        en: 'Hour after hour, Mimi shaped a replacement brass gear with steady hands while Leo polished the pendulum. Precision demanded patience, and neither of them rushed the craft.',
        vi: 'Hết giờ này sang giờ khác, Mimi giũa một bánh răng đồng thay thế bằng đôi tay vững vàng, trong khi Leo đánh bóng con lắc. Sự chính xác đòi hỏi lòng kiên nhẫn, nên cả hai bạn chẳng hề vội vàng.',
        vocab: [
          { w: 'precision', ipa: '/prɪˈsɪʒ.ən/', vi: 'sự chính xác', emoji: '🎯' },
          { w: 'craft', ipa: '/krɑːft/', vi: 'nghề thủ công', emoji: '🛠️' }
        ]
      },
      {
        bg: 'assets/art/books/scene_valley_green.webp',
        mood: 'sunny',
        pan: 'center',
        chars: [
          { id: 'mimi', x: 18, y: 10, scale: 0.9 },
          { id: 'leo', x: 78, y: 10, scale: 0.9, flip: true }
        ],
        props: [
          { emoji: '🕰️', svg: 'svg:clock_tower', label: 'Tower Clock Chiming', vi: 'Tháp đồng hồ điểm chuông', x: 48, y: 8, w: 152, h: 210, role: 'scenery' },
          { emoji: '🔔', label: 'Bong! Chime!', vi: 'Tiếng chuông vang vọng', x: 48, y: 74, size: 62, role: 'badge' }
        ],
        en: 'At dawn, the final screw clicked into place. Tick... tock... Bong! A rich, resonant chime echoed across the sunlit square, and townsfolk below burst into applause.',
        vi: 'Lúc bình minh, chiếc ốc cuối cùng khớp vào vị trí. Tích... tắc... Boong! Một tiếng chuông trầm ấm vang vọng khắp quảng trường ngập nắng, và người dân bên dưới vỡ òa vỗ tay.',
        vocab: [
          { w: 'resonant', ipa: '/ˈrez.ən.ənt/', vi: 'vang vọng trầm ấm', emoji: '🔔' },
          { w: 'applause', ipa: '/əˈplɔːz/', vi: 'tràng pháo tay', emoji: '👏' }
        ]
      },
      {
        bg: 'assets/art/books/scene_sunset.webp',
        mood: 'sunset',
        pan: 'center',
        chars: [
          { id: 'mimi', x: 22, y: 10, scale: 0.94 },
          { id: 'leo', x: 52, y: 10, scale: 0.94, flip: true }
        ],
        props: [
          { emoji: '🕰️', svg: 'svg:clock_tower', label: 'Promise Kept', vi: 'Tháp đồng hồ bình yên', x: 80, y: 8, w: 142, h: 196, role: 'scenery' }
        ],
        en: 'Mimi smiled at the golden horizon. Keeping a promise is never about grand speeches—it is built quietly, one careful step at a time.',
        vi: 'Mimi mỉm cười nhìn chân trời rực nắng. Giữ trọn một lời hứa chưa bao giờ nằm ở những lời nói hoa mỹ — mà được xây nên lặng lẽ qua từng bước đi cẩn trọng mỗi ngày.',
        vocab: [
          { w: 'horizon', ipa: '/həˈraɪ.zən/', vi: 'đường chân trời', emoji: '🌅' },
          { w: 'promise', ipa: '/ˈprɒm.ɪs/', vi: 'lời hứa', emoji: '🤝' }
        ]
      }
    ],
    quiz: [
      {
        qEn: 'What caused the golden tower clock to stop?',
        qVi: 'Điều gì khiến chiếc đồng hồ tháp vàng ngừng chạy?',
        options: [
          { text: 'A bent gear tooth and a stray feather', emoji: '⚙️', correct: true },
          { text: 'A heavy snowstorm', emoji: '❄️', correct: false },
          { text: 'A missing rooftop', emoji: '🏠', correct: false }
        ]
      },
      {
        qEn: 'What is the main message of the story?',
        qVi: 'Thông điệp chính của câu chuyện là gì?',
        options: [
          { text: 'Promises are kept through patience and careful work', emoji: '🕰️', correct: true },
          { text: 'Always rush to finish as fast as you can', emoji: '⚡', correct: false },
          { text: 'Small details never matter', emoji: '❌', correct: false }
        ]
      }
    ]
  },

  /* ========================================================================
     BOOK 11 — NGỤ NGÔN (FABLE) — Pre-A1 (4–6 tuổi): The Tortoise and the Hare
     ======================================================================== */
  {
    id: 'book_tortoise_hare',
    num: 11,
    category: 'fable',
    level: 'Pre-A1',
    ageHint: '4–6 tuổi',
    titleEn: 'The Tortoise and the Hare',
    titleVi: 'Rùa Và Thỏ',
    subtitle: 'Truyện ngụ ngôn Ê-dốp • Kiên trì',
    moralEn: 'Slow and steady wins the race.',
    moralVi: 'Chậm mà chắc, kiên trì không bỏ cuộc sẽ giành chiến thắng.',
    minutes: '2 phút',
    coverBg: 'assets/art/books/scene_path.webp',
    coverChar: 'lulu',
    coverActors: [
      { emoji: '🐇', x: 26, y: 6, size: 78, flip: true },
      { emoji: '🐢', x: 56, y: 6, size: 72, flip: true }
    ],
    coverEmoji: '🏁',
    accent: '#10B981',
    softBg: '#ECFDF5',
    pages: [
      {
        bg: 'assets/art/books/scene_path.webp',
        mood: 'sunny',
        pan: 'left',
        chars: [],
        props: [
          { emoji: '🐇', label: 'Fast Hare', vi: 'Thỏ chạy nhanh', x: 24, y: 10, size: 112, flip: true, role: 'actor' },
          { emoji: '🐢', label: 'Tortoise', vi: 'Bạn Rùa', x: 52, y: 10, size: 96, flip: true, role: 'actor' },
          { emoji: '🌳', label: 'Big Tree', vi: 'Cây cổ thụ (Đích)', x: 84, y: 24, size: 120, role: 'scenery' },
          { emoji: '🏁', label: 'Start Race', vi: 'Vạch xuất phát', x: 38, y: 42, size: 58, role: 'badge' }
        ],
        en: 'One sunny morning, a fast hare laughed at a slow little tortoise. "Let\'s have a race to the big tree!" said the tortoise calmly.',
        vi: 'Một buổi sáng nắng đẹp, chú Thỏ chạy nhanh cười nhạo bạn Rùa chậm chạp. "Chúng mình cùng thi chạy tới cái cây lớn kia nhé!" Rùa bình tĩnh nói.',
        vocab: [
          { w: 'fast', ipa: '/fæst/', vi: 'nhanh nhẹn', emoji: '🐇' },
          { w: 'slow', ipa: '/sloʊ/', vi: 'chậm rãi', emoji: '🐢' },
          { w: 'race', ipa: '/reɪs/', vi: 'cuộc đua', emoji: '🏁' }
        ]
      },
      {
        bg: 'assets/art/books/scene_path.webp',
        mood: 'sunny',
        pan: 'center',
        chars: [],
        props: [
          { emoji: '🐢', label: 'Step by Step', vi: 'Đi từng bước', x: 22, y: 10, size: 94, flip: true, role: 'actor' },
          { emoji: '💨', label: 'Zoom!', vi: 'Phóng vút đi', x: 54, y: 18, size: 64, role: 'badge' },
          { emoji: '🐇', label: 'Hare Ahead', vi: 'Thỏ phóng lên trước', x: 76, y: 16, size: 114, flip: true, role: 'actor' }
        ],
        en: 'Ready, set, go! The hare zoomed far ahead in a flash. The little tortoise just smiled and walked step by step.',
        vi: 'Chuẩn bị, bắt đầu! Thỏ phóng vút lên phía trước trong chớp mắt. Rùa nhỏ chỉ mỉm cười và bước đi từng bước một.',
        vocab: [
          { w: 'ahead', ipa: '/əˈhed/', vi: 'phía trước', emoji: '➡️' },
          { w: 'step', ipa: '/step/', vi: 'bước chân', emoji: '👣' }
        ]
      },
      {
        bg: 'assets/art/books/scene_hills.webp',
        mood: 'morning',
        pan: 'right',
        chars: [],
        props: [
          { emoji: '🌳', label: 'Shady Tree', vi: 'Gốc cây râm mát', x: 64, y: 14, size: 148, role: 'scenery' },
          { emoji: '🐇', label: 'Sleeping Hare', vi: 'Thỏ nằm ngủ', x: 54, y: 8, size: 106, role: 'actor' },
          { emoji: '💤', label: 'Quick Nap', vi: 'Ngủ trưa khò khò', x: 46, y: 42, size: 60, role: 'badge' },
          { emoji: '🐢', label: 'Tortoise Coming', vi: 'Rùa đang đi tới', x: 18, y: 12, size: 74, flip: true, role: 'actor' }
        ],
        en: 'The hare looked back and saw no one. "I am so fast! I have time for a quick nap," he yawned under a shady tree.',
        vi: 'Thỏ ngoái lại chẳng thấy ai. "Mình chạy nhanh thế này cơ mà! Nghỉ chợp mắt một lát cũng kịp," Thỏ ngáp dài dưới gốc cây mát.',
        vocab: [
          { w: 'nap', ipa: '/næp/', vi: 'giấc ngủ ngắn', emoji: '💤' },
          { w: 'shady', ipa: '/ˈʃeɪ.di/', vi: 'râm mát', emoji: '🌳' }
        ]
      },
      {
        bg: 'assets/art/books/scene_path.webp',
        mood: 'sunny',
        pan: 'left',
        chars: [],
        props: [
          { emoji: '🌳', label: 'Tree', vi: 'Gốc cây', x: 24, y: 20, size: 128, role: 'scenery' },
          { emoji: '🐇', label: 'Sound Asleep', vi: 'Thỏ vẫn ngủ say', x: 28, y: 10, size: 96, role: 'actor' },
          { emoji: '💤', label: 'Zzz', vi: 'Ngủ say', x: 34, y: 42, size: 52, role: 'badge' },
          { emoji: '🐢', label: 'Passed the Hare!', vi: 'Rùa vượt lên trước', x: 72, y: 10, size: 112, flip: true, role: 'actor' }
        ],
        en: 'While the hare slept soundly, the tortoise kept going. He did not stop, and he did not give up. Quietly, he passed the sleeping hare!',
        vi: 'Trong lúc Thỏ ngủ say giấc, Rùa vẫn bền bỉ tiến về phía trước. Cậu không dừng lại cũng chẳng bỏ cuộc, rồi lặng lẽ vượt qua bạn Thỏ đang ngủ!',
        vocab: [
          { w: 'slept', ipa: '/slept/', vi: 'đã ngủ', emoji: '💤' },
          { w: 'passed', ipa: '/pæst/', vi: 'vượt qua', emoji: '🐢' }
        ]
      },
      {
        bg: 'assets/art/books/scene_path_flip.webp',
        mood: 'sunny',
        pan: 'center',
        chars: [],
        props: [
          { emoji: '🐇', label: 'Too Late!', vi: 'Thỏ đuổi theo', x: 20, y: 14, size: 96, flip: true, role: 'actor' },
          { emoji: '🐢', label: 'Winner!', vi: 'Rùa về đích trước', x: 64, y: 10, size: 118, flip: true, role: 'actor' },
          { emoji: '🏁', label: 'Finish Line', vi: 'Vạch đích', x: 80, y: 14, size: 104, role: 'scenery' },
          { emoji: '🎉', label: 'Cheer!', vi: 'Reo hò cổ vũ', x: 64, y: 52, size: 62, role: 'badge' }
        ],
        en: 'The hare woke up and ran as fast as he could, but it was too late! The tortoise crossed the finish line first while everyone cheered.',
        vi: 'Thỏ giật mình tỉnh dậy chạy hết sức nhưng đã quá muộn! Rùa đã chạm vạch đích trước trong tiếng reo hò cổ vũ của mọi người.',
        vocab: [
          { w: 'finish', ipa: '/ˈfɪn.ɪʃ/', vi: 'vạch đích / kết thúc', emoji: '🏁' },
          { w: 'first', ipa: '/fɜːrst/', vi: 'đầu tiên', emoji: '🥇' }
        ]
      },
      {
        bg: 'assets/art/books/scene_sunset.webp',
        mood: 'sunset',
        pan: 'center',
        chars: [],
        props: [
          { emoji: '🐇', label: 'Humble Hare', vi: 'Thỏ mỉm cười', x: 30, y: 10, size: 108, flip: true, role: 'actor' },
          { emoji: '🏆', label: 'Winner Trophy', vi: 'Cúp chiến thắng', x: 50, y: 12, size: 92, role: 'object' },
          { emoji: '🐢', label: 'Steady Tortoise', vi: 'Rùa kiên trì', x: 70, y: 10, size: 104, role: 'actor' }
        ],
        en: 'The hare smiled and shook the tortoise\'s hand. "You taught me a great lesson today: slow and steady wins the race!"',
        vi: 'Thỏ mỉm cười bắt tay chúc mừng Rùa. "Hôm nay bạn đã dạy mình một bài học thật quý: chậm mà chắc sẽ giành chiến thắng!"',
        vocab: [
          { w: 'lesson', ipa: '/ˈles.ən/', vi: 'bài học', emoji: '📖' },
          { w: 'steady', ipa: '/ˈsted.i/', vi: 'đều đặn bền bỉ', emoji: '🏆' }
        ]
      }
    ],
    quiz: [
      {
        qEn: 'Why did the fast hare lose the race?',
        qVi: 'Vì sao chú Thỏ chạy nhanh lại thua cuộc đua?',
        options: [
          { text: 'He stopped to take a nap', emoji: '💤', correct: true },
          { text: 'He forgot his shoes', emoji: '👟', correct: false },
          { text: 'He jumped into a river', emoji: '🌊', correct: false }
        ]
      },
      {
        qEn: 'What is the moral of this fable?',
        qVi: 'Bài học của câu chuyện ngụ ngôn này là gì?',
        options: [
          { text: 'Slow and steady wins the race', emoji: '🏆', correct: true },
          { text: 'Never try anything new', emoji: '🛑', correct: false },
          { text: 'Always laugh at slow friends', emoji: '😅', correct: false }
        ]
      }
    ]
  },

  /* ========================================================================
     BOOK 12 — NGỤ NGÔN (FABLE) — A1 (6–8 tuổi): The Ant and the Grasshopper
     ======================================================================== */
  {
    id: 'book_ant_grasshopper',
    num: 12,
    category: 'fable',
    level: 'A1',
    ageHint: '6–8 tuổi',
    titleEn: 'The Ant and the Grasshopper',
    titleVi: 'Kiến Và Châu Chấu',
    subtitle: 'Truyện ngụ ngôn Ê-dốp • Chăm chỉ',
    moralEn: 'Work hard today so you are ready for tomorrow.',
    moralVi: 'Chăm chỉ chuẩn bị từ hôm nay để luôn vững vàng cho ngày mai.',
    minutes: '3 phút',
    coverBg: 'assets/art/books/scene_valley_green.webp',
    coverChar: 'mimi',
    coverActors: [
      { emoji: '🐜', x: 26, y: 6, size: 76, flip: true },
      { emoji: '🦗', x: 58, y: 8, size: 78 }
    ],
    coverEmoji: '🌾',
    accent: '#EA580C',
    softBg: '#FFF7ED',
    pages: [
      {
        bg: 'assets/art/books/scene_valley_green.webp',
        mood: 'sunny',
        pan: 'left',
        chars: [],
        props: [
          { emoji: '🐜', label: 'Little Ant', vi: 'Kiến nhỏ chăm chỉ', x: 26, y: 10, size: 106, flip: true, role: 'actor' },
          { emoji: '🌾', label: 'Grain of Wheat', vi: 'Bó lúa mì', x: 38, y: 20, size: 84, role: 'object' },
          { emoji: '🦗', label: 'Grasshopper', vi: 'Châu Chấu ca hát', x: 74, y: 12, size: 112, role: 'actor' },
          { emoji: '☀️', label: 'Summer Sun', vi: 'Nắng mùa hè', x: 84, y: 66, size: 68, role: 'badge' }
        ],
        en: 'On a warm summer day, a little ant carried heavy grains of wheat back to her nest. Nearby, a green grasshopper sang happily in the sun.',
        vi: 'Vào một ngày hè ấm áp, chú Kiến nhỏ cần mẫn khuân từng hạt lúa mì nặng về tổ. Gần đó, Châu Chấu xanh đang ca hát vui vẻ dưới ánh nắng.',
        vocab: [
          { w: 'summer', ipa: '/ˈsʌm.ər/', vi: 'mùa hè', emoji: '☀️' },
          { w: 'carried', ipa: '/ˈkær.id/', vi: 'khuân vác', emoji: '🐜' },
          { w: 'nest', ipa: '/nest/', vi: 'cái tổ', emoji: '🏡' }
        ]
      },
      {
        bg: 'assets/art/books/scene_hills.webp',
        mood: 'sunny',
        pan: 'center',
        chars: [],
        props: [
          { emoji: '🐜', label: 'Store Food', vi: 'Kiến tích trữ lương thực', x: 26, y: 10, size: 104, flip: true, role: 'actor' },
          { emoji: '🧺', label: 'Food Basket', vi: 'Giỏ lương thực', x: 42, y: 10, size: 80, role: 'object' },
          { emoji: '🦗', label: 'Sing & Dance', vi: 'Châu Chấu hát múa', x: 72, y: 12, size: 114, role: 'actor' },
          { emoji: '🎻', label: 'Violin Music', vi: 'Đàn vĩ cầm', x: 64, y: 34, size: 74, role: 'object' },
          { emoji: '🎵', label: 'Song', vi: 'Khúc nhạc', x: 80, y: 56, size: 56, role: 'badge' }
        ],
        en: '"Why do you work so hard, Ant? Come sing and dance with me!" laughed the grasshopper. "Winter is coming, and I must store food," replied the ant.',
        vi: '"Sao Kiến làm việc vất vả thế? Ra đây hát múa cùng mình nào!" Châu Chấu cười nói. "Mùa đông sắp đến rồi, mình phải tích trữ thức ăn," Kiến đáp.',
        vocab: [
          { w: 'winter', ipa: '/ˈwɪn.tər/', vi: 'mùa đông', emoji: '❄️' },
          { w: 'store', ipa: '/stɔːr/', vi: 'tích trữ', emoji: '🧺' }
        ]
      },
      {
        bg: 'assets/art/books/scene_autumn.webp',
        mood: 'morning',
        pan: 'right',
        chars: [],
        props: [
          { emoji: '🐜', label: 'Busy Ant', vi: 'Kiến gom hạt mùa thu', x: 30, y: 10, size: 108, flip: true, role: 'actor' },
          { emoji: '🌰', label: 'Acorns & Nuts', vi: 'Hạt dẻ tích trữ', x: 52, y: 10, size: 84, role: 'object' },
          { emoji: '🏡', label: 'Cozy Nest', vi: 'Tổ Kiến ấm áp', x: 78, y: 16, size: 118, role: 'scenery' },
          { emoji: '🍂', label: 'Autumn Leaves', vi: 'Lá vàng mùa thu', x: 24, y: 58, size: 68, role: 'badge' }
        ],
        en: 'Autumn arrived and golden leaves fell from the trees. The ant kept gathering seeds and nuts until her cozy pantry was completely full.',
        vi: 'Mùa thu tới, lá vàng rơi rụng khắp nơi. Kiến vẫn miệt mài gom hạt giống và quả hạch cho đến khi kho thức ăn ấm cúng đầy ắp.',
        vocab: [
          { w: 'autumn', ipa: '/ˈɔː.təm/', vi: 'mùa thu', emoji: '🍂' },
          { w: 'gathering', ipa: '/ˈɡæð.ər.ɪŋ/', vi: 'thu gom', emoji: '🌰' }
        ]
      },
      {
        bg: 'assets/art/books/scene_winter.webp',
        mood: 'snowy',
        pan: 'center',
        chars: [],
        props: [
          { emoji: '🦗', label: 'Cold Grasshopper', vi: 'Châu Chấu lạnh và đói', x: 38, y: 10, size: 114, flip: true, role: 'actor' },
          { emoji: '⛄', label: 'Snowy Field', vi: 'Cánh đồng tuyết trắng', x: 74, y: 14, size: 106, role: 'scenery' },
          { emoji: '❄️', label: 'Freezing Wind', vi: 'Gió đông lạnh buốt', x: 24, y: 60, size: 66, role: 'badge' }
        ],
        en: 'Soon freezing winter winds blew across the field. Snow covered the ground, and the poor grasshopper had nothing left to eat.',
        vi: 'Chẳng mấy chốc gió đông lạnh buốt thổi qua cánh đồng. Tuyết phủ trắng mặt đất, và Châu Chấu tội nghiệp chẳng còn chút gì để ăn.',
        vocab: [
          { w: 'freezing', ipa: '/ˈfriː.zɪŋ/', vi: 'lạnh cóng', emoji: '❄️' },
          { w: 'nothing', ipa: '/ˈnʌθ.ɪŋ/', vi: 'không còn gì', emoji: '🥣' }
        ]
      },
      {
        bg: 'assets/art/books/scene_cottage.webp',
        mood: 'cozy',
        pan: 'center',
        chars: [],
        props: [
          { emoji: '🐜', label: 'Kind Ant', vi: 'Kiến tốt bụng', x: 26, y: 8, size: 108, flip: true, role: 'actor' },
          { emoji: '🍲', label: 'Warm Soup', vi: 'Bát súp nóng hổi', x: 50, y: 12, size: 96, role: 'object' },
          { emoji: '🦗', label: 'Grateful Friend', vi: 'Châu Chấu cảm động', x: 74, y: 10, size: 108, role: 'actor' }
        ],
        en: 'Shivering, the grasshopper knocked on the ant\'s door. The kind ant welcomed him inside and shared a bowl of warm soup.',
        vi: 'Run cầm cập vì lạnh, Châu Chấu gõ cửa nhà Kiến. Bạn Kiến tốt bụng mời Châu Chấu vào nhà và chia sẻ một bát súp ấm nóng.',
        vocab: [
          { w: 'welcomed', ipa: '/ˈwel.kəmd/', vi: 'chào đón', emoji: '🚪' },
          { w: 'shared', ipa: '/ʃerd/', vi: 'chia sẻ', emoji: '🍲' }
        ]
      },
      {
        bg: 'assets/art/books/scene_valley_green.webp',
        mood: 'sunny',
        pan: 'center',
        chars: [],
        props: [
          { emoji: '🐜', label: 'Ant', vi: 'Kiến chăm chỉ', x: 30, y: 10, size: 106, flip: true, role: 'actor' },
          { emoji: '🌾', label: 'Work Together', vi: 'Cùng thu hoạch', x: 50, y: 12, size: 86, role: 'object' },
          { emoji: '🦗', label: 'Grasshopper', vi: 'Châu Chấu giữ lời hứa', x: 70, y: 10, size: 108, role: 'actor' },
          { emoji: '🎵', label: 'Joyful Song', vi: 'Tiếng nhạc vui', x: 52, y: 58, size: 58, role: 'badge' }
        ],
        en: '"Thank you, Ant! Next summer, I will help gather food first and play music afterward," promised the grasshopper. There is a time for work and a time for play.',
        vi: '"Cảm ơn Kiến nhiều lắm! Mùa hè tới mình sẽ phụ gom thức ăn trước rồi mới chơi nhạc sau," Châu Chấu hứa. Có thời gian để làm việc và cũng có thời gian để vui chơi.',
        vocab: [
          { w: 'promised', ipa: '/ˈprɒm.ɪst/', vi: 'đã hứa', emoji: '🤝' },
          { w: 'afterward', ipa: '/ˈæf.tər.wərd/', vi: 'sau đó', emoji: '🎵' }
        ]
      }
    ],
    quiz: [
      {
        qEn: 'Why did the ant work hard during summer?',
        qVi: 'Vì sao chú Kiến làm việc chăm chỉ suốt mùa hè?',
        options: [
          { text: 'To store food for winter', emoji: '🌾', correct: true },
          { text: 'To build a sailboat', emoji: '⛵', correct: false },
          { text: 'To hide from the sun', emoji: '☀️', correct: false }
        ]
      },
      {
        qEn: 'What did the kind ant do when the hungry grasshopper knocked?',
        qVi: 'Bạn Kiến tốt bụng đã làm gì khi Châu Chấu đói bụng gõ cửa?',
        options: [
          { text: 'Welcomed him and shared warm soup', emoji: '🍲', correct: true },
          { text: 'Closed the window', emoji: '🪟', correct: false },
          { text: 'Moved to another forest', emoji: '🌳', correct: false }
        ]
      }
    ]
  },

  /* ========================================================================
     BOOK 13 — NGỤ NGÔN (FABLE) — A2 (8–10 tuổi): The Lion and the Mouse
     ======================================================================== */
  {
    id: 'book_lion_mouse',
    num: 13,
    category: 'fable',
    level: 'A2',
    ageHint: '8–10 tuổi',
    titleEn: 'The Lion and the Mouse',
    titleVi: 'Sư Tử Và Chuột Nhắt',
    subtitle: 'Truyện ngụ ngôn Ê-dốp • Lòng nhân hậu',
    moralEn: 'No act of kindness, no matter how small, is ever wasted.',
    moralVi: 'Không có lòng tốt nào là nhỏ bé — ai cũng có thể giúp ích khi bạn cần.',
    minutes: '3 phút',
    coverBg: 'assets/art/books/scene_forest.webp',
    coverChar: 'leo',
    coverEmoji: '🐁',
    accent: '#D97706',
    softBg: '#FFFBEB',
    pages: [
      {
        bg: 'assets/art/books/scene_path.webp',
        mood: 'sunny',
        pan: 'left',
        chars: [{ id: 'leo', x: 30, y: 8, scale: 1.0 }],
        props: [
          { emoji: '🐁', label: 'Tiny Mouse', vi: 'Chú Chuột nhắt', x: 54, y: 8, size: 84, role: 'actor' },
          { emoji: '💤', label: 'Napping Lion', vi: 'Sư Tử đang ngủ trưa', x: 20, y: 62, size: 58, role: 'badge' }
        ],
        en: 'One warm afternoon, a mighty lion was napping beneath a tall tree. A tiny mouse accidentally scampered right across his golden paw and woke him up!',
        vi: 'Một buổi chiều ấm áp, chú Sư Tử oai vệ đang ngủ trưa dưới gốc cây cao. Một chú Chuột nhắt vô tình chạy vọt qua bàn chân vàng và đánh thức Sư Tử dậy!',
        vocab: [
          { w: 'mighty', ipa: '/ˈmaɪ.ti/', vi: 'mạnh mẽ oai vệ', emoji: '🦁' },
          { w: 'accidentally', ipa: '/ˌæk.sɪˈden.təl.i/', vi: 'vô tình', emoji: '🐭' }
        ]
      },
      {
        bg: 'assets/art/books/scene_path.webp',
        mood: 'morning',
        pan: 'center',
        chars: [{ id: 'leo', x: 28, y: 8, scale: 0.98 }],
        props: [
          { emoji: '🐁', label: 'Little Mouse', vi: 'Chuột nhỏ xin tha', x: 64, y: 10, size: 88, role: 'actor' },
          { emoji: '💛', label: 'Kindness', vi: 'Lòng nhân hậu', x: 48, y: 56, size: 58, role: 'badge' }
        ],
        en: '"Please let me go!" squeaked the little mouse. "Someday I might even help you!" The lion chuckled gently and let the tiny creature run free.',
        vi: '"Xin hãy tha cho tôi!" Chuột nhắt rụt rè kêu lên. "Biết đâu một ngày nào đó tôi có thể giúp lại ngài!" Sư Tử bật cười hiền hậu và thả chú chuột nhỏ đi.',
        vocab: [
          { w: 'squeaked', ipa: '/skwiːkt/', vi: 'kêu chít chít', emoji: '🐭' },
          { w: 'chuckled', ipa: '/ˈtʃʌk.əld/', vi: 'cười khẽ', emoji: '😊' }
        ]
      },
      {
        bg: 'assets/art/books/scene_forest.webp',
        mood: 'sunset',
        pan: 'right',
        chars: [{ id: 'leo', x: 44, y: 8, scale: 0.95 }],
        props: [
          { emoji: '🕸️', svg: 'svg:rope_net', label: 'Rope Net', vi: 'Lưới dây thừng', x: 44, y: 6, size: 185, role: 'object', z: 5 },
          { emoji: '🔊', label: 'Loud Roar!', vi: 'Tiếng gầm cứu viện', x: 74, y: 62, size: 62, role: 'badge' }
        ],
        en: 'A few days later, the lion stepped into a thick rope net left in the forest. No matter how hard he pulled, he could not escape, so he let out a loud roar.',
        vi: 'Vài ngày sau, Sư Tử mắc phải một tấm lưới dây thừng dày trong rừng. Dù cố sức giằng co thế nào cũng không thoát được, cậu đành cất tiếng gầm vang.',
        vocab: [
          { w: 'escape', ipa: '/ɪˈskeɪp/', vi: 'thoát ra', emoji: '🕸️' },
          { w: 'roar', ipa: '/rɔːr/', vi: 'tiếng gầm', emoji: '🦁' }
        ]
      },
      {
        bg: 'assets/art/books/scene_forest.webp',
        mood: 'morning',
        pan: 'center',
        chars: [{ id: 'leo', x: 34, y: 8, scale: 0.95 }],
        props: [
          { emoji: '🕸️', svg: 'svg:rope_net', label: 'Thick Ropes', vi: 'Lưới dây thừng', x: 34, y: 8, size: 170, role: 'object', z: 5 },
          { emoji: '🐁', label: 'Chew the Ropes', vi: 'Chuột gặm đứt dây', x: 64, y: 12, size: 96, role: 'actor', z: 6 }
        ],
        en: 'Hearing the roar, the little mouse hurried straight through the bushes. "Don\'t worry, my friend! I will chew through these ropes!" she called out bravely.',
        vi: 'Nghe thấy tiếng gầm, Chuột nhắt vội vàng len qua bụi cây chạy tới. "Đừng lo nhé bạn ơi! Tôi sẽ gặm đứt đám dây thừng này!" chú chuột dũng cảm nói.',
        vocab: [
          { w: 'hurried', ipa: '/ˈhɜːr.id/', vi: 'vội vàng chạy tới', emoji: '🏃' },
          { w: 'bravely', ipa: '/ˈbreɪv.li/', vi: 'một cách dũng cảm', emoji: '💪' }
        ]
      },
      {
        bg: 'assets/art/books/scene_forest.webp',
        mood: 'sunny',
        pan: 'center',
        chars: [{ id: 'leo', x: 30, y: 10, scale: 0.98 }],
        props: [
          { emoji: '🐁', label: 'Hero Mouse', vi: 'Chuột nhỏ anh hùng', x: 66, y: 10, size: 96, role: 'actor' },
          { emoji: '🧶', label: 'Broken Rope', vi: 'Dây lưới đã đứt', x: 82, y: 8, size: 68, role: 'object' },
          { emoji: '✨', label: 'Completely Free!', vi: 'Thoát khỏi lưới!', x: 48, y: 60, size: 62, role: 'badge' }
        ],
        en: 'With her sharp little teeth, the mouse nibbled one knot after another until the heavy net fell open. At last, the lion stepped out completely free!',
        vi: 'Bằng hàm răng nhỏ sắc bén, Chuột nhắt gặm đứt hết nút thắt này đến nút thắt khác cho tới khi tấm lưới bung ra. Cuối cùng Sư Tử đã hoàn toàn tự do!',
        vocab: [
          { w: 'nibbled', ipa: '/ˈnɪb.əld/', vi: 'gặm từng chút', emoji: '🐭' },
          { w: 'completely', ipa: '/kəmˈpliːt.li/', vi: 'hoàn toàn', emoji: '✨' }
        ]
      },
      {
        bg: 'assets/art/books/scene_sunset.webp',
        mood: 'sunset',
        pan: 'right',
        chars: [{ id: 'leo', x: 32, y: 10, scale: 0.98 }],
        props: [
          { emoji: '🐁', label: 'Lifelong Friend', vi: 'Đôi bạn thân thiết', x: 64, y: 12, size: 94, role: 'actor' },
          { emoji: '❤️', label: 'Gratitude', vi: 'Lòng biết ơn', x: 48, y: 58, size: 60, role: 'badge' }
        ],
        en: '"You were right, little friend," said the lion warmly. "Even the smallest friend can be the greatest help." From that day on, they were lifelong friends.',
        vi: '"Bạn đã nói đúng đấy, người bạn nhỏ ạ," Sư Tử xúc động nói. "Ngay cả người bạn bé nhỏ nhất cũng có thể giúp đỡ thật lớn lao." Từ hôm đó, cả hai trở thành đôi bạn thân suốt đời.',
        vocab: [
          { w: 'greatest', ipa: '/ˈɡreɪ.tɪst/', vi: 'tuyệt vời nhất', emoji: '🌟' },
          { w: 'lifelong', ipa: '/ˈlaɪf.lɒŋ/', vi: 'suốt đời', emoji: '🤝' }
        ]
      }
    ],
    quiz: [
      {
        qEn: 'How did the little mouse save the mighty lion?',
        qVi: 'Chú Chuột nhỏ đã cứu Sư Tử bằng cách nào?',
        options: [
          { text: 'She chewed through the rope net', emoji: '🐭', correct: true },
          { text: 'She called a giant helicopter', emoji: '🚁', correct: false },
          { text: 'She dug a swimming pool', emoji: '🏊', correct: false }
        ]
      },
      {
        qEn: 'What does this fable teach us?',
        qVi: 'Câu chuyện ngụ ngôn này dạy ta điều gì?',
        options: [
          { text: 'Even a small friend can be a big help', emoji: '❤️', correct: true },
          { text: 'Only big animals can be heroes', emoji: '🐘', correct: false },
          { text: 'Never help anyone in trouble', emoji: '🚫', correct: false }
        ]
      }
    ]
  },

  /* ========================================================================
     BOOK 14 — CỔ TÍCH (FAIRY TALE) — A1 (6–8 tuổi): The Three Little Pigs
     ======================================================================== */
  {
    id: 'book_three_pigs',
    num: 14,
    category: 'fairytale',
    level: 'A1',
    ageHint: '6–8 tuổi',
    titleEn: 'The Three Little Pigs',
    titleVi: 'Ba Chú Heo Con',
    subtitle: 'Truyện cổ tích kinh điển • Cẩn thận',
    moralEn: 'Careful work and smart planning keep you safe and strong.',
    moralVi: 'Làm việc cẩn thận và chu đáo sẽ giúp ta luôn vững vàng và an toàn.',
    minutes: '3 phút',
    coverBg: 'assets/art/books/pigs_p1.webp',
    fullCoverArt: true,
    coverChar: 'toby',
    coverEmoji: '🐷',
    accent: '#EC4899',
    softBg: '#FDF2F8',
    pages: [
      {
        bg: 'assets/art/books/pigs_p1.webp',
        fullArt: true,
        mood: 'sunny',
        pan: 'center',
        chars: [],
        props: [
          { emoji: '🌾', label: 'Straw', vi: 'Bó rơm vàng', x: 22, y: 74, role: 'hotspot' },
          { emoji: '🪵', label: 'Sticks', vi: 'Cành cây gỗ', x: 50, y: 74, role: 'hotspot' },
          { emoji: '🧱', label: 'Bricks', vi: 'Gạch đỏ chắc chắn', x: 76, y: 74, role: 'hotspot' }
        ],
        en: 'Once upon a time, three little pigs set out into the sunny valley to build their very own houses. Each pig chose a different material.',
        vi: 'Ngày xửa ngày xưa, có ba chú heo con cùng đi tới thung lũng ngập nắng để tự xây ngôi nhà cho riêng mình. Mỗi chú chọn một vật liệu khác nhau.',
        vocab: [
          { w: 'build', ipa: '/bɪld/', vi: 'xây dựng', emoji: '🧱' },
          { w: 'different', ipa: '/ˈdɪf.ər.ənt/', vi: 'khác nhau', emoji: '🏡' }
        ]
      },
      {
        bg: 'assets/art/books/pigs_p2.webp',
        fullArt: true,
        mood: 'sunny',
        pan: 'center',
        chars: [],
        props: [
          { emoji: '🌾', label: 'Straw House', vi: 'Ngôi nhà rơm', x: 24, y: 74, role: 'hotspot' },
          { emoji: '🪵', label: 'Stick House', vi: 'Ngôi nhà cành gỗ', x: 76, y: 74, role: 'hotspot' }
        ],
        en: 'The first pig quickly built a house of golden straw. The second pig built a house of wooden sticks so they could both finish early and play.',
        vi: 'Heo anh cả dựng vội một ngôi nhà bằng rơm vàng. Heo anh hai làm nhà bằng những cành cây nhỏ để cả hai xong sớm còn đi chơi.',
        vocab: [
          { w: 'straw', ipa: '/strɔː/', vi: 'rơm khô', emoji: '🌾' },
          { w: 'sticks', ipa: '/stɪks/', vi: 'cành cây gỗ', emoji: '🪵' }
        ]
      },
      {
        bg: 'assets/art/books/pigs_p3.webp',
        fullArt: true,
        mood: 'morning',
        pan: 'center',
        chars: [],
        props: [
          { emoji: '🐷', label: 'Careful Pig', vi: 'Heo út cẩn thận', x: 34, y: 72, role: 'hotspot' },
          { emoji: '🧱', label: 'Red Bricks', vi: 'Nhà gạch đỏ kiên cố', x: 70, y: 78, role: 'hotspot' }
        ],
        en: 'The third little pig took his time and carefully laid heavy red bricks, one on top of another. His sturdy brick house had a strong wooden door.',
        vi: 'Riêng chú heo út không hề vội vàng mà cẩn thận xếp từng viên gạch đỏ chắc chắn. Ngôi nhà gạch kiên cố của cậu có cánh cửa gỗ thật vững.',
        vocab: [
          { w: 'bricks', ipa: '/brɪks/', vi: 'những viên gạch', emoji: '🧱' },
          { w: 'sturdy', ipa: '/ˈstɜːr.di/', vi: 'kiên cố vững chắc', emoji: '🏠' }
        ]
      },
      {
        bg: 'assets/art/books/pigs_p4.webp',
        fullArt: true,
        mood: 'windy',
        pan: 'center',
        chars: [],
        props: [
          { emoji: '🐺', label: 'Big Wolf', vi: 'Lão Sói to lớn', x: 24, y: 74, role: 'hotspot' },
          { emoji: '💨', label: 'Huff & Puff', vi: 'Thổi phù phù', x: 56, y: 80, role: 'hotspot' },
          { emoji: '🐖', label: 'Run Safely', vi: 'Hai anh em chạy trốn', x: 80, y: 40, role: 'hotspot' }
        ],
        en: 'One windy day, a big wolf arrived and puffed with all his might! Whoosh! Down blew the straw house, and soon down blew the stick house too!',
        vi: 'Một ngày nhiều gió, lão Sói to lớn kéo tới và lấy hết sức thổi phù một hơi! Vù! Ngôi nhà rơm đổ sập, và chẳng mấy chốc nhà gỗ cũng bay mất!',
        vocab: [
          { w: 'wolf', ipa: '/wʊlf/', vi: 'chó sói', emoji: '🐺' },
          { w: 'might', ipa: '/maɪt/', vi: 'sức mạnh', emoji: '💨' }
        ]
      },
      {
        bg: 'assets/art/books/pigs_p5.webp',
        fullArt: true,
        mood: 'windy',
        pan: 'center',
        chars: [],
        props: [
          { emoji: '🐺', label: 'Out of Breath', vi: 'Sói thổi đến hụt hơi', x: 24, y: 66, role: 'hotspot' },
          { emoji: '🧱', label: 'Strong Brick Wall', vi: 'Tường gạch vững chãi', x: 76, y: 76, role: 'hotspot' },
          { emoji: '🐷', label: 'Safe Inside', vi: 'An toàn bên trong', x: 80, y: 20, role: 'hotspot' }
        ],
        en: 'The two brothers ran safely to the brick house. The wolf huffed and puffed as hard as he could, but the strong brick walls did not budge an inch!',
        vi: 'Hai người anh chạy kịp sang nhà gạch an toàn. Lão Sói hít hơi thổi mạnh hết cỡ nhưng những bức tường gạch vững chắc vẫn không hề lung lay!',
        vocab: [
          { w: 'safely', ipa: '/ˈseɪf.li/', vi: 'một cách an toàn', emoji: '🛡️' },
          { w: 'budge', ipa: '/bʌdʒ/', vi: 'nhúc nhích / lung lay', emoji: '🧱' }
        ]
      },
      {
        bg: 'assets/art/books/pigs_p6.webp',
        fullArt: true,
        mood: 'sunny',
        pan: 'center',
        chars: [],
        props: [
          { emoji: '🏡', label: 'Brick Cottage', vi: 'Ngôi nhà gạch ấm áp', x: 24, y: 78, role: 'hotspot' },
          { emoji: '🎉', label: 'Dance with Joy', vi: 'Nhảy múa mừng rỡ', x: 54, y: 64, role: 'hotspot' },
          { emoji: '🐺', label: 'Wolf Leaves', vi: 'Sói bỏ chạy biệt tăm', x: 82, y: 72, role: 'hotspot' }
        ],
        en: 'Tired and out of breath, the wolf hurried away for good. The three little pigs danced with joy and worked together to build strong brick homes.',
        vi: 'Mệt lử và hụt hơi, lão Sói đành bỏ chạy biệt tăm. Ba chú heo con nhảy múa mừng rỡ rồi cùng nhau xây thêm những ngôi nhà gạch thật vững chắc.',
        vocab: [
          { w: 'breath', ipa: '/breθ/', vi: 'hơi thở', emoji: '💨' },
          { w: 'joy', ipa: '/dʒɔɪ/', vi: 'niềm vui', emoji: '🎉' }
        ]
      }
    ],
    quiz: [
      {
        qEn: 'Which house stayed strong when the wolf blew?',
        qVi: 'Ngôi nhà nào vẫn đứng vững khi chó sói thổi?',
        options: [
          { text: 'The sturdy brick house', emoji: '🧱', correct: true },
          { text: 'The straw house', emoji: '🌾', correct: false },
          { text: 'The stick house', emoji: '🪵', correct: false }
        ]
      },
      {
        qEn: 'Why did the third little pig\'s house keep everyone safe?',
        qVi: 'Vì sao ngôi nhà của chú heo út giữ an toàn cho cả ba anh em?',
        options: [
          { text: 'He took his time and built carefully', emoji: '🏠', correct: true },
          { text: 'He painted it purple', emoji: '🎨', correct: false },
          { text: 'He built it in five seconds', emoji: '⚡', correct: false }
        ]
      }
    ]
  },

  /* ========================================================================
     BOOK 15 — CỔ TÍCH (FAIRY TALE) — A2 (8–10 tuổi): Little Red Riding Hood
     ======================================================================== */
  {
    id: 'book_red_riding_hood',
    num: 15,
    category: 'fairytale',
    level: 'A2',
    ageHint: '8–10 tuổi',
    titleEn: 'Little Red Riding Hood',
    titleVi: 'Cô Bé Quàng Khăn Đỏ',
    subtitle: 'Truyện cổ tích kinh điển • An toàn',
    moralEn: 'Stay on the safe path and be careful when talking to strangers.',
    moralVi: 'Luôn đi đúng con đường an toàn và biết cảnh giác trước người lạ.',
    minutes: '3 phút',
    coverBg: 'assets/art/books/red_p2.webp',
    fullCoverArt: true,
    coverChar: 'lulu',
    coverEmoji: '🧺',
    accent: '#DC2626',
    softBg: '#FEF2F2',
    pages: [
      {
        bg: 'assets/art/books/scene_valley_green.webp',
        mood: 'morning',
        pan: 'left',
        chars: [],
        props: [
          { emoji: '🏡', label: 'Home Cottage', vi: 'Ngôi nhà của hai mẹ con', x: 20, y: 14, size: 128, role: 'scenery' },
          { emoji: '👩', svg: 'svg:mother_woman', label: 'Mother', vi: 'Mẹ dặn dò', x: 44, y: 8, size: 124, role: 'actor' },
          { emoji: '🧺', label: 'Basket of Muffins', vi: 'Giỏ bánh biếu bà', x: 58, y: 10, size: 72, role: 'object', z: 5 },
          { emoji: '👧', svg: 'svg:red_hood_girl', label: 'Little Red Riding Hood', vi: 'Cô bé Quàng Khăn Đỏ', x: 74, y: 8, size: 118, role: 'actor' }
        ],
        en: 'Once upon a time, a cheerful girl wore a bright red cape wherever she went. One morning, her mother packed a basket of warm muffins for her grandmother.',
        vi: 'Ngày xửa ngày xưa, có một cô bé vui tươi luôn khoác chiếc áo choàng màu đỏ rực. Một buổi sáng, mẹ gói một giỏ bánh nướng ấm nóng để cô mang sang thăm bà ngoại.',
        vocab: [
          { w: 'cape', ipa: '/keɪp/', vi: 'áo choàng', emoji: '🧣' },
          { w: 'grandmother', ipa: '/ˈɡræn.mʌð.ər/', vi: 'bà ngoại', emoji: '👵' }
        ]
      },
      {
        bg: 'assets/art/books/red_p2.webp',
        fullArt: true,
        mood: 'sunny',
        pan: 'center',
        chars: [],
        props: [
          { emoji: '👧', label: 'Little Red', vi: 'Cô bé Quàng Khăn Đỏ', x: 42, y: 66, role: 'hotspot' },
          { emoji: '🧺', label: 'Muffin Basket', vi: 'Giỏ bánh thơm', x: 58, y: 20, role: 'hotspot' },
          { emoji: '🐺', label: 'Sneaky Wolf', vi: 'Con sói ranh mãnh', x: 80, y: 74, role: 'hotspot' }
        ],
        en: 'Along the forest path, a sneaky wolf stepped out and asked where she was going. Forgetting her mother\'s advice, she told him about Grandmother\'s cottage.',
        vi: 'Dọc con đường rừng, một con sói ranh mãnh bước ra hỏi cô bé đi đâu. Quên mất lời mẹ dặn, cô bé thật thà kể về ngôi nhà nhỏ của bà ngoại.',
        vocab: [
          { w: 'sneaky', ipa: '/ˈsniː.ki/', vi: 'ranh mãnh lén lút', emoji: '🐺' },
          { w: 'advice', ipa: '/ədˈvaɪs/', vi: 'lời khuyên dặn', emoji: '💡' }
        ]
      },
      {
        bg: 'assets/art/books/red_p3.webp',
        fullArt: true,
        mood: 'cozy',
        pan: 'center',
        chars: [],
        props: [
          { emoji: '👵', label: 'Clever Grandmother', vi: 'Bà ngoại nhanh trí trốn trong tủ', x: 24, y: 74, role: 'hotspot' },
          { emoji: '🐺', label: 'Wolf Enters', vi: 'Sói lẻn vào cửa trước', x: 80, y: 74, role: 'hotspot' }
        ],
        en: 'The wolf took a shortcut and reached the cottage first. Hearing his heavy footsteps, clever Grandmother quickly hid safely inside the wooden closet!',
        vi: 'Con sói đi đường tắt và tới nhà bà trước. Nghe thấy tiếng bước chân nặng nề, bà ngoại thông minh liền nhanh trí trốn an toàn vào trong tủ gỗ!',
        vocab: [
          { w: 'shortcut', ipa: '/ˈʃɔːrt.kʌt/', vi: 'đường tắt', emoji: '🧭' },
          { w: 'cottage', ipa: '/ˈkɒt.ɪdʒ/', vi: 'ngôi nhà nhỏ', emoji: '🏡' }
        ]
      },
      {
        bg: 'assets/art/books/scene_cottage.webp',
        mood: 'cozy',
        pan: 'left',
        chars: [],
        props: [
          { emoji: '👧', svg: 'svg:red_hood_girl', label: 'Careful Little Red', vi: 'Khăn Đỏ nhận ra điểm lạ', x: 24, y: 8, size: 122, role: 'actor' },
          { emoji: '🐺', svg: 'svg:wolf_in_bed', label: 'Wolf in Disguise', vi: 'Sói giả làm bà ngoại trên giường', x: 68, y: 8, w: 174, h: 152, role: 'actor', z: 5 }
        ],
        en: 'When Little Red arrived, she noticed something strange right away. "Grandmother, what big ears and bright eyes you have!" she said, stepping carefully toward the door.',
        vi: 'Khi Khăn Đỏ tới nơi, cô bé lập tức nhận ra điều bất thường. "Bà ơi, sao hôm nay tai bà to và mắt bà sáng thế ạ?" cô vừa hỏi vừa lùi cẩn thận về phía cửa.',
        vocab: [
          { w: 'noticed', ipa: '/ˈnoʊ.tɪst/', vi: 'nhận ra', emoji: '👀' },
          { w: 'strange', ipa: '/streɪndʒ/', vi: 'kỳ lạ', emoji: '❓' }
        ]
      },
      {
        bg: 'assets/art/books/scene_forest.webp',
        mood: 'sunny',
        pan: 'center',
        chars: [],
        props: [
          { emoji: '🧔', svg: 'svg:woodcutter', label: 'Friendly Woodcutter', vi: 'Bác tiều phu tốt bụng', x: 22, y: 8, size: 128, role: 'actor' },
          { emoji: '🪓', label: 'Woodcutter\'s Axe', vi: 'Chiếc rìu đốn củi', x: 35, y: 22, size: 70, role: 'object', z: 5 },
          { emoji: '👧', svg: 'svg:red_hood_girl', label: 'Safe Little Red', vi: 'Khăn Đỏ an toàn', x: 50, y: 8, size: 112, role: 'actor' },
          { emoji: '🐺', svg: 'svg:big_wolf', label: 'Wolf Bolted Away!', vi: 'Sói hoảng sợ bỏ chạy', x: 80, y: 10, size: 118, flip: true, role: 'actor' }
        ],
        en: 'Just then, a friendly woodcutter working nearby heard Little Red call for help. He rushed in, and the startled wolf bolted out the back door into the woods forever.',
        vi: 'Đúng lúc ấy, bác tiều phu tốt bụng làm việc gần đó nghe thấy tiếng Khăn Đỏ gọi giúp đỡ. Bác vội chạy vào, khiến con sói hoảng hốt phóng ra cửa sau chạy biệt vào rừng sâu.',
        vocab: [
          { w: 'startled', ipa: '/ˈstɑːr.təld/', vi: 'giật mình hoảng hốt', emoji: '😮' },
          { w: 'bolted', ipa: '/ˈboʊl.tɪd/', vi: 'phóng vụt chạy', emoji: '💨' }
        ]
      },
      {
        bg: 'assets/art/books/scene_cottage.webp',
        mood: 'cozy',
        pan: 'center',
        chars: [],
        props: [
          { emoji: '👵', svg: 'svg:grandmother', label: 'Grandmother', vi: 'Bà ngoại ôm cháu', x: 24, y: 8, size: 124, role: 'actor' },
          { emoji: '👧', svg: 'svg:red_hood_girl', label: 'Little Red', vi: 'Cô bé Quàng Khăn Đỏ', x: 46, y: 8, size: 116, role: 'actor' },
          { emoji: '🧁', label: 'Warm Muffins', vi: 'Bánh nướng ấm nóng', x: 61, y: 10, size: 68, role: 'object', z: 5 },
          { emoji: '🧔', svg: 'svg:woodcutter', label: 'Woodcutter Guest', vi: 'Bác tiều phu cùng dự tiệc trà', x: 78, y: 8, size: 122, role: 'actor' }
        ],
        en: 'Grandmother stepped out with a big hug, and they shared warm muffins and tea with the woodcutter. Little Red promised to always stay on the safe path.',
        vi: 'Bà ngoại bước ra ôm chầm lấy cháu, rồi cả nhà cùng mời bác tiều phu thưởng thức trà và bánh ấm. Cô bé Quàng Khăn Đỏ tự hứa từ nay sẽ luôn đi đúng đường an toàn.',
        vocab: [
          { w: 'hug', ipa: '/hʌɡ/', vi: 'cái ôm', emoji: '🤗' },
          { w: 'path', ipa: '/pæθ/', vi: 'con đường', emoji: '🛤️' }
        ]
      }
    ],
    quiz: [
      {
        qEn: 'Where did clever Grandmother hide when she heard the wolf?',
        qVi: 'Bà ngoại thông minh đã trốn ở đâu khi nghe thấy tiếng sói?',
        options: [
          { text: 'Safely inside the wooden closet', emoji: '🏡', correct: true },
          { text: 'On top of a tall cloud', emoji: '☁️', correct: false },
          { text: 'Under a sailboat', emoji: '⛵', correct: false }
        ]
      },
      {
        qEn: 'Who helped scare the sneaky wolf away?',
        qVi: 'Ai đã giúp đuổi con sói ranh mãnh đi?',
        options: [
          { text: 'A friendly woodcutter nearby', emoji: '🪓', correct: true },
          { text: 'A tiny goldfish', emoji: '🐠', correct: false },
          { text: 'A sleepy turtle', emoji: '🐢', correct: false }
        ]
      }
    ]
  },

  /* ========================================================================
     BOOK 16 — CỔ TÍCH (FAIRY TALE) — B1 (10–13 tuổi): Jack and the Beanstalk
     ======================================================================== */
  {
    id: 'book_jack_beanstalk',
    num: 16,
    category: 'fairytale',
    level: 'B1',
    ageHint: '10–13 tuổi',
    titleEn: 'Jack and the Beanstalk',
    titleVi: 'Jack Và Cây Đậu Thần',
    subtitle: 'Truyện cổ tích kinh điển • Dũng cảm',
    moralEn: 'Courage and quick thinking help us overcome even giant challenges.',
    moralVi: 'Lòng dũng cảm và sự nhanh trí giúp ta vượt qua cả những thử thách khổng lồ.',
    minutes: '4 phút',
    coverBg: 'assets/art/books/scene_sky.webp',
    coverChar: 'leo',
    coverActors: [
      { emoji: '🏰', x: 74, y: 24, size: 88 },
      { emoji: '🌱', svg: 'svg:beanstalk', x: 50, y: 0, w: 78, h: 175 },
      { emoji: '👦', svg: 'svg:jack_boy', x: 26, y: 4, size: 92 }
    ],
    coverEmoji: '🏰',
    accent: '#059669',
    softBg: '#ECFDF5',
    pages: [
      {
        bg: 'assets/art/books/scene_valley_green.webp',
        mood: 'morning',
        pan: 'left',
        chars: [],
        props: [
          { emoji: '👦', svg: 'svg:jack_boy', label: 'Curious Jack', vi: 'Cậu bé Jack', x: 26, y: 8, size: 124, role: 'actor' },
          { emoji: '🫘', label: 'Five Magic Beans', vi: 'Năm hạt đậu thần', x: 52, y: 12, size: 84, role: 'object' },
          { emoji: '🏡', label: 'Garden Wall', vi: 'Vườn nhà Jack', x: 78, y: 14, size: 124, role: 'scenery' },
          { emoji: '✨', label: 'Shimmering', vi: 'Lấp lánh phép màu', x: 52, y: 50, size: 58, role: 'badge' }
        ],
        en: 'Long ago, a curious boy named Jack traded his family\'s old market cart for five shimmering magic beans. That evening, he planted them beside the garden wall.',
        vi: 'Ngày xưa, có cậu bé ham khám phá tên là Jack đã đổi chiếc xe đẩy cũ của gia đình lấy năm hạt đậu thần lấp lánh. Tối hôm đó, cậu gieo chúng ngay bên bờ tường vườn.',
        vocab: [
          { w: 'shimmering', ipa: '/ˈʃɪm.ər.ɪŋ/', vi: 'lấp lánh ánh sáng', emoji: '✨' },
          { w: 'planted', ipa: '/ˈplæn.tɪd/', vi: 'đã gieo trồng', emoji: '🌱' }
        ]
      },
      {
        bg: 'assets/art/books/scene_hills.webp',
        mood: 'sunny',
        pan: 'center',
        chars: [],
        props: [
          { emoji: '🌱', svg: 'svg:beanstalk', label: 'Enormous Beanstalk', vi: 'Cây đậu thần khổng lồ', x: 54, y: 0, w: 158, h: 355, role: 'scenery' },
          { emoji: '👦', svg: 'svg:jack_boy', label: 'Jack Climbing', vi: 'Jack leo lên cao', x: 40, y: 34, size: 108, role: 'actor', z: 5 },
          { emoji: '☁️', label: 'Drifting Clouds', vi: 'Những đám mây trắng', x: 64, y: 74, size: 96, role: 'scenery', z: 4 }
        ],
        en: 'By sunrise, an enormous green beanstalk spiraled all the way up past the drifting white clouds! Taking a deep breath, Jack began to climb higher and higher.',
        vi: 'Đến bình minh, một cây đậu xanh khổng lồ đã vươn xoắn ốc xuyên qua tận những đám mây trắng bồng bềnh! Hít một hơi thật sâu, Jack bắt đầu leo lên ngày càng cao.',
        vocab: [
          { w: 'enormous', ipa: '/ɪˈnɔːr.məs/', vi: 'khổng lồ', emoji: '🌱' },
          { w: 'spiraled', ipa: '/ˈspaɪ.rəld/', vi: 'uốn xoắn ốc', emoji: '🌀' }
        ]
      },
      {
        bg: 'assets/art/books/scene_sky.webp',
        mood: 'morning',
        pan: 'center',
        chars: [],
        props: [
          { emoji: '🏰', label: 'Cloud Castle', vi: 'Lâu đài đá trên mây', x: 52, y: 14, size: 174, role: 'scenery' },
          { emoji: '👦', svg: 'svg:jack_boy', label: 'Jack', vi: 'Jack khám phá lâu đài', x: 22, y: 10, size: 114, role: 'actor' },
          { emoji: '🎵', svg: 'svg:golden_harp', label: 'Golden Harp', vi: 'Đàn hạc vàng kỳ diệu', x: 80, y: 14, size: 108, role: 'object' }
        ],
        en: 'Above the clouds stood a towering stone castle where a grumpy giant lived. Inside the great hall, Jack discovered a magical golden harp that played sweet lullabies all by itself.',
        vi: 'Phía trên tầng mây sừng sững một tòa lâu đài đá nơi gã khổng lồ cáu kỉnh sinh sống. Trong đại sảnh, Jack phát hiện một cây đàn hạc vàng kỳ diệu tự chơi những khúc hát ru êm ái.',
        vocab: [
          { w: 'towering', ipa: '/ˈtaʊ.ər.ɪŋ/', vi: 'cao sừng sững', emoji: '🏰' },
          { w: 'discovered', ipa: '/dɪˈskʌv.ərd/', vi: 'phát hiện ra', emoji: '✨' }
        ]
      },
      {
        bg: 'assets/art/books/scene_cottage.webp',
        mood: 'cozy',
        pan: 'center',
        chars: [],
        props: [
          { emoji: '👦', svg: 'svg:jack_boy', label: 'Jack', vi: 'Jack nâng đàn hạc', x: 26, y: 8, size: 120, role: 'actor' },
          { emoji: '🎵', svg: 'svg:golden_harp', label: 'Singing Golden Harp', vi: 'Đàn hạc vàng biết hát', x: 54, y: 12, size: 120, role: 'object' },
          { emoji: '🥚', label: 'Golden Egg', vi: 'Quả trứng vàng', x: 78, y: 12, size: 84, role: 'object' },
          { emoji: '🎶', label: 'Sweet Lullaby', vi: 'Khúc hát ru êm ái', x: 56, y: 62, size: 58, role: 'badge' }
        ],
        en: 'The golden harp whispered softly, "Please take me back to the village below! The giant took me from the townspeople long ago." Jack carefully lifted the harp.',
        vi: 'Cây đàn hạc vàng khẽ thì thầm: "Xin hãy đưa tôi trở về ngôi làng bên dưới! Gã khổng lồ đã lấy tôi đi từ dân làng từ lâu lắm rồi." Jack cẩn thận nhấc cây đàn lên.',
        vocab: [
          { w: 'whispered', ipa: '/ˈwɪs.pərd/', vi: 'thì thầm', emoji: '🎵' },
          { w: 'village', ipa: '/ˈvɪl.ɪdʒ/', vi: 'ngôi làng', emoji: '🏡' }
        ]
      },
      {
        bg: 'assets/art/books/scene_sunset.webp',
        mood: 'sunset',
        pan: 'left',
        chars: [],
        props: [
          { emoji: '👹', svg: 'svg:giant_ogre', label: 'Grumpy Giant', vi: 'Gã khổng lồ đuổi theo', x: 76, y: 34, size: 152, role: 'actor' },
          { emoji: '🌱', svg: 'svg:beanstalk', label: 'Twisting Vines', vi: 'Thân cây đậu xoắn', x: 50, y: 0, w: 150, h: 345, role: 'scenery' },
          { emoji: '👦', svg: 'svg:jack_boy', label: 'Swift Jack', vi: 'Jack tụt nhanh xuống', x: 34, y: 8, size: 112, role: 'actor', z: 5 }
        ],
        en: 'Boom, boom, boom! The giant woke up and chased after him, shaking the clouds. Jack stayed calm, slid swiftly down the twisting vines, and reached his garden first!',
        vi: 'Rầm, rầm, rầm! Gã khổng lồ tỉnh dậy đuổi theo làm rung chuyển cả tầng mây. Jack giữ bình tĩnh, trượt thật nhanh theo dây đậu xoắn và chạm xuống khu vườn trước tiên!',
        vocab: [
          { w: 'swiftly', ipa: '/ˈswɪft.li/', vi: 'thật nhanh nhẹn', emoji: '💨' },
          { w: 'vines', ipa: '/vaɪnz/', vi: 'dây leo', emoji: '🌿' }
        ]
      },
      {
        bg: 'assets/art/books/scene_valley_green.webp',
        mood: 'sunny',
        pan: 'center',
        chars: [],
        props: [
          { emoji: '👦', svg: 'svg:jack_boy', label: 'Brave Jack', vi: 'Jack dũng cảm', x: 26, y: 8, size: 122, role: 'actor' },
          { emoji: '🪓', label: 'Trimmed Beanstalk', vi: 'Chiếc rìu chặt cây đậu', x: 42, y: 12, size: 78, role: 'object' },
          { emoji: '🎵', svg: 'svg:golden_harp', label: 'Golden Harp', vi: 'Đàn hạc ngân vang', x: 68, y: 12, size: 116, role: 'object' },
          { emoji: '🎉', label: 'Happy Village', vi: 'Dân làng mở hội', x: 82, y: 58, size: 62, role: 'badge' }
        ],
        en: 'Quickly, Jack trimmed the beanstalk so the giant could never climb down to trouble the village again. The golden harp filled the valley with joyful music for everyone.',
        vi: 'Nhanh trí, Jack chặt bỏ cây đậu thần để gã khổng lồ không bao giờ xuống quấy rầy dân làng được nữa. Cây đàn hạc vàng ngân vang những giai điệu hạnh phúc khắp cả thung lũng.',
        vocab: [
          { w: 'trimmed', ipa: '/trɪmd/', vi: 'cắt tỉa / chặt bỏ', emoji: '🪓' },
          { w: 'joyful', ipa: '/ˈdʒɔɪ.fəl/', vi: 'tràn đầy niềm vui', emoji: '🎉' }
        ]
      }
    ],
    quiz: [
      {
        qEn: 'What grew overnight from Jack\'s five magic beans?',
        qVi: 'Thứ gì đã mọc lên sau một đêm từ năm hạt đậu thần của Jack?',
        options: [
          { text: 'An enormous beanstalk into the clouds', emoji: '🌱', correct: true },
          { text: 'A giant pumpkin carriage', emoji: '🎃', correct: false },
          { text: 'A silver submarine', emoji: '🚤', correct: false }
        ]
      },
      {
        qEn: 'What magical treasure did Jack return to the village?',
        qVi: 'Jack đã mang báu vật kỳ diệu nào trở về cho dân làng?',
        options: [
          { text: 'A golden harp that played sweet music', emoji: '🎵', correct: true },
          { text: 'A pair of flying boots', emoji: '👢', correct: false },
          { text: 'A crystal telescope', emoji: '🔭', correct: false }
        ]
      }
    ]
  }
];

