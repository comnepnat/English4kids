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
        bg: 'assets/art/painted_bg_zoo.webp',
        mood: 'morning',
        pan: 'right',
        chars: [{ id: 'leo', x: 20, y: 10, scale: 0.95 }],
        props: [
          { emoji: '🌳', label: 'Tree', vi: 'Cái cây', x: 74, y: 34, size: 74 },
          { emoji: '🔴', label: 'Ball', vi: 'Quả bóng', x: 64, y: 16, size: 52 }
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
        bg: 'assets/art/painted_bg_zoo.webp',
        mood: 'sunny',
        pan: 'center',
        chars: [
          { id: 'leo', x: 18, y: 10, scale: 0.94 },
          { id: 'lulu', x: 66, y: 10, scale: 0.94, flip: true }
        ],
        props: [
          { emoji: '🔴', label: 'Red Ball', vi: 'Bóng đỏ', x: 50, y: 18, size: 60 },
          { emoji: '🌸', label: 'Flower', vi: 'Bông hoa', x: 84, y: 18, size: 46 }
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
        bg: 'assets/art/painted_hub_games.webp',
        mood: 'sunny',
        pan: 'center',
        chars: [
          { id: 'leo', x: 20, y: 8, scale: 0.94 },
          { id: 'lulu', x: 68, y: 8, scale: 0.94, flip: true }
        ],
        props: [
          { emoji: '🔴', label: 'Catch', vi: 'Bắt bóng', x: 48, y: 52, size: 64 },
          { emoji: '🎈', label: 'Balloon', vi: 'Bóng bay', x: 84, y: 70, size: 54 }
        ],
        en: '"Thank you, Lulu! Let us play together!" They kick and catch the ball and laugh out loud.',
        vi: '"Cảm ơn Lulu nhé! Chúng mình cùng chơi nào!" Hai bạn đá bóng, bắt bóng và cười vang thật vui.',
        vocab: [
          { w: 'together', ipa: '/təˈɡeð.ər/', vi: 'cùng nhau', emoji: '🤝' },
          { w: 'catch', ipa: '/kætʃ/', vi: 'bắt lấy', emoji: '🙌' },
          { w: 'laugh', ipa: '/læf/', vi: 'cười vang', emoji: '😄' }
        ]
      },
      {
        bg: 'assets/art/painted_home_meadow.webp',
        mood: 'sunset',
        pan: 'right',
        chars: [
          { id: 'leo', x: 24, y: 10, scale: 0.94 },
          { id: 'lulu', x: 52, y: 10, scale: 0.92, flip: true }
        ],
        props: [
          { emoji: '⭐', label: 'Happy', vi: 'Vui vẻ', x: 76, y: 68, size: 56 },
          { emoji: '❤️', label: 'Friends', vi: 'Bạn thân', x: 42, y: 58, size: 48 }
        ],
        en: 'Playing with a friend is the best fun of all. What a happy day for Leo and Lulu!',
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
    coverBg: 'assets/art/painted_hub_vocab.webp',
    coverChar: 'mimi',
    coverEmoji: '🌻',
    accent: '#16A34A',
    softBg: '#F0FDF4',
    pages: [
      {
        bg: 'assets/art/painted_hub_vocab.webp',
        mood: 'morning',
        pan: 'left',
        chars: [{ id: 'mimi', x: 20, y: 10, scale: 0.98 }],
        props: [
          { emoji: '🌻', label: 'Sunflower', vi: 'Hoa hướng dương', x: 68, y: 20, size: 70 },
          { emoji: '☀️', label: 'Morning', vi: 'Buổi sáng', x: 80, y: 74, size: 54 }
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
        bg: 'assets/art/painted_home_meadow.webp',
        mood: 'sunny',
        pan: 'center',
        chars: [{ id: 'mimi', x: 22, y: 10, scale: 0.95 }],
        props: [
          { emoji: '💧', label: 'Water', vi: 'Nước', x: 56, y: 42, size: 58 },
          { emoji: '🌱', label: 'Sprout', vi: 'Chồi non', x: 70, y: 14, size: 62 }
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
        bg: 'assets/art/painted_hub_vocab.webp',
        mood: 'sunny',
        pan: 'right',
        chars: [{ id: 'mimi', x: 18, y: 10, scale: 0.94 }],
        props: [
          { emoji: '🍓', label: 'Strawberry', vi: 'Dâu tây', x: 58, y: 18, size: 64 },
          { emoji: '🍎', label: 'Apple', vi: 'Quả táo', x: 78, y: 26, size: 60 }
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
        bg: 'assets/art/painted_hub_phonics.webp',
        mood: 'sunny',
        pan: 'center',
        chars: [{ id: 'mimi', x: 20, y: 10, scale: 0.94 }],
        props: [
          { emoji: '🐝', label: 'Bee', vi: 'Con ong', x: 64, y: 58, size: 56 },
          { emoji: '🦋', label: 'Butterfly', vi: 'Con bướm', x: 80, y: 66, size: 58 }
        ],
        en: 'Buzz, buzz! A friendly yellow bee and a blue butterfly dance around the tall sunflowers.',
        vi: 'Vo ve, vo ve! Một chú ong vàng thân thiện và bạn bướm xanh đang khiêu vũ quanh hoa hướng dương cao.',
        vocab: [
          { w: 'bee', ipa: '/biː/', vi: 'con ong', emoji: '🐝' },
          { w: 'butterfly', ipa: '/ˈbʌt.ər.flaɪ/', vi: 'con bướm', emoji: '🦋' },
          { w: 'dance', ipa: '/dæns/', vi: 'nhảy múa', emoji: '💃' }
        ]
      },
      {
        bg: 'assets/art/painted_bg_montessori.webp',
        mood: 'cozy',
        pan: 'center',
        chars: [{ id: 'mimi', x: 22, y: 8, scale: 0.94 }],
        props: [
          { emoji: '🧺', label: 'Basket', vi: 'Cái giỏ', x: 62, y: 16, size: 68 },
          { emoji: '🍓', label: 'Fruit', vi: 'Trái cây', x: 78, y: 22, size: 52 }
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
        bg: 'assets/art/painted_home_meadow.webp',
        mood: 'sunny',
        pan: 'center',
        chars: [
          { id: 'mimi', x: 20, y: 10, scale: 0.94 },
          { id: 'leo', x: 54, y: 10, scale: 0.94, flip: true }
        ],
        props: [
          { emoji: '🍓', label: 'Share', vi: 'Chia sẻ', x: 42, y: 38, size: 54 },
          { emoji: '🌻', label: 'Garden', vi: 'Khu vườn', x: 80, y: 18, size: 60 }
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
    coverBg: 'assets/art/painted_bg_montessori.webp',
    coverChar: 'lulu',
    coverEmoji: '☔',
    accent: '#EC4899',
    softBg: '#FDF2F8',
    pages: [
      {
        bg: 'assets/art/painted_home_meadow.webp',
        mood: 'rainy',
        pan: 'left',
        chars: [{ id: 'lulu', x: 22, y: 10, scale: 0.96 }],
        props: [
          { emoji: '🌧️', label: 'Rain', vi: 'Cơn mưa', x: 64, y: 68, size: 64 },
          { emoji: '☁️', label: 'Cloud', vi: 'Đám mây', x: 34, y: 74, size: 58 }
        ],
        en: 'Pitter-patter! Soft blue raindrops tap on the window. It is a rainy afternoon.',
        vi: 'Tí tách, tí tách! Những hạt mưa xanh dịu dàng gõ nhịp bên khung cửa sổ. Trời đang có một buổi chiều mưa.',
        vocab: [
          { w: 'raindrops', ipa: '/ˈreɪn.drɒps/', vi: 'hạt mưa', emoji: '💧' },
          { w: 'window', ipa: '/ˈwɪn.doʊ/', vi: 'cửa sổ', emoji: '🪟' },
          { w: 'rainy', ipa: '/ˈreɪ.ni/', vi: 'có mưa', emoji: '🌧️' }
        ]
      },
      {
        bg: 'assets/art/painted_bg_montessori.webp',
        mood: 'cozy',
        pan: 'left',
        chars: [{ id: 'lulu', x: 24, y: 8, scale: 0.96 }],
        props: [
          { emoji: '🧁', label: 'Cupcake', vi: 'Bánh nướng nhỏ', x: 68, y: 20, size: 68 },
          { emoji: '☕', label: 'Warm Tea', vi: 'Trà ấm', x: 52, y: 18, size: 58 }
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
        bg: 'assets/art/painted_bg_montessori.webp',
        mood: 'cozy',
        pan: 'right',
        chars: [
          { id: 'lulu', x: 20, y: 8, scale: 0.94 },
          { id: 'toby', x: 66, y: 8, scale: 0.94, flip: true }
        ],
        props: [
          { emoji: '☂️', label: 'Umbrella', vi: 'Cái ô', x: 48, y: 38, size: 62 }
        ],
        en: 'Knock, knock! Toby the fox comes to the door with his bright umbrella. "Come in, Toby!"',
        vi: 'Cốc, cốc! Cáo Toby gõ cửa với chiếc ô rực rỡ trên tay. "Mời Toby vào nhà nhé!"',
        vocab: [
          { w: 'door', ipa: '/dɔːr/', vi: 'cánh cửa', emoji: '🚪' },
          { w: 'umbrella', ipa: '/ʌmˈbrel.ə/', vi: 'cái ô / cây dù', emoji: '☂️' }
        ]
      },
      {
        bg: 'assets/art/painted_hub_stories.webp',
        mood: 'cozy',
        pan: 'center',
        chars: [
          { id: 'lulu', x: 20, y: 8, scale: 0.92 },
          { id: 'toby', x: 66, y: 8, scale: 0.92, flip: true }
        ],
        props: [
          { emoji: '📖', label: 'Storybook', vi: 'Sách truyện', x: 48, y: 20, size: 64 },
          { emoji: '🍪', label: 'Cookie', vi: 'Bánh quy', x: 48, y: 56, size: 52 }
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
          { emoji: '🌈', label: 'Rainbow', vi: 'Cầu vồng', x: 50, y: 66, size: 78 }
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
          { emoji: '💖', label: 'Kindness', vi: 'Sự ấm áp', x: 76, y: 64, size: 56 }
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
    coverBg: 'assets/art/painted_bg_zoo.webp',
    coverChar: 'toby',
    coverEmoji: '🐶',
    accent: '#F97316',
    softBg: '#FFF7ED',
    pages: [
      {
        bg: 'assets/art/painted_bg_zoo.webp',
        mood: 'morning',
        pan: 'left',
        chars: [{ id: 'toby', x: 20, y: 10, scale: 0.96 }],
        props: [
          { emoji: '🐶', label: 'Puppy', vi: 'Chú cún con', x: 66, y: 14, size: 68 },
          { emoji: '🌳', label: 'Park', vi: 'Công viên', x: 82, y: 36, size: 58 }
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
        bg: 'assets/art/painted_bg_zoo.webp',
        mood: 'sunny',
        pan: 'center',
        chars: [{ id: 'toby', x: 22, y: 10, scale: 0.96 }],
        props: [
          { emoji: '🐶', label: 'Lost Puppy', vi: 'Cún đi lạc', x: 60, y: 16, size: 70 },
          { emoji: '💧', label: 'Water', vi: 'Nước uống', x: 78, y: 18, size: 48 }
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
        bg: 'assets/art/painted_hub_milestones.webp',
        mood: 'sunny',
        pan: 'left',
        chars: [
          { id: 'toby', x: 18, y: 10, scale: 0.92 },
          { id: 'leo', x: 70, y: 10, scale: 0.92, flip: true }
        ],
        props: [
          { emoji: '🐶', label: 'Puppy', vi: 'Cún con', x: 46, y: 14, size: 60 },
          { emoji: '🏷️', label: 'Name Tag', vi: 'Thẻ tên', x: 48, y: 52, size: 54 }
        ],
        en: 'Leo comes to help. They look closely at the puppy\'s red collar. "Look!" says Toby. "His name is Max, and he lives near the bakery!"',
        vi: 'Leo chạy tới giúp sức. Hai bạn nhìn kỹ chiếc vòng cổ màu đỏ của cún. "Nhìn kìa!" Toby reo lên. "Cậu ấy tên là Max và nhà ở gần tiệm bánh!"',
        vocab: [
          { w: 'collar', ipa: '/ˈkɒl.ər/', vi: 'vòng cổ', emoji: '🏷️' },
          { w: 'bakery', ipa: '/ˈbeɪ.kər.i/', vi: 'tiệm bánh', emoji: '🧁' }
        ]
      },
      {
        bg: 'assets/art/painted_hub_stories.webp',
        mood: 'cozy',
        pan: 'center',
        chars: [
          { id: 'toby', x: 18, y: 8, scale: 0.92 },
          { id: 'leo', x: 68, y: 8, scale: 0.92, flip: true }
        ],
        props: [
          { emoji: '🐶', label: 'Max', vi: 'Chú cún Max', x: 46, y: 14, size: 62 },
          { emoji: '🏡', label: 'Home', vi: 'Ngôi nhà', x: 48, y: 56, size: 60 }
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
        bg: 'assets/art/painted_home_meadow.webp',
        mood: 'sunny',
        pan: 'right',
        chars: [
          { id: 'toby', x: 20, y: 10, scale: 0.92 },
          { id: 'leo', x: 46, y: 10, scale: 0.92 }
        ],
        props: [
          { emoji: '🐶', label: 'Happy Max', vi: 'Max vui mừng', x: 74, y: 16, size: 66 },
          { emoji: '❤️', label: 'Love', vi: 'Yêu thương', x: 74, y: 56, size: 50 }
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
        bg: 'assets/art/painted_home_meadow.webp',
        mood: 'sunset',
        pan: 'center',
        chars: [
          { id: 'toby', x: 24, y: 10, scale: 0.94 },
          { id: 'leo', x: 58, y: 10, scale: 0.94, flip: true }
        ],
        props: [
          { emoji: '🧁', label: 'Treat', vi: 'Bánh ngọt', x: 44, y: 24, size: 54 },
          { emoji: '⭐', label: 'Kind Hero', vi: 'Người tốt bụng', x: 78, y: 68, size: 54 }
        ],
        en: 'Max\'s owner gives Toby and Leo two warm muffins as a thank-you gift. Helping someone in need makes the heart shine bright.',
        vi: 'Chủ của Max tặng Toby và Leo hai chiếc bánh nướng ấm nóng để cảm ơn. Giúp đỡ khi ai đó cần khiến trái tim luôn tỏa sáng.',
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
          { id: 'leo', x: 14, y: 10, scale: 0.9 },
          { id: 'mimi', x: 38, y: 10, scale: 0.9 }
        ],
        props: [
          { emoji: '🧺', label: 'Picnic Basket', vi: 'Giỏ dã ngoại', x: 70, y: 16, size: 68 },
          { emoji: '🎈', label: 'Balloons', vi: 'Bóng bay', x: 80, y: 64, size: 58 }
        ],
        en: 'It is Saturday morning! Leo, Mimi, Toby, and Lulu are going on a big picnic on Sunny Hill.',
        vi: 'Sáng thứ Bảy đã đến! Leo, Mimi, Toby và Lulu cùng nhau đi dã ngoại trên Đồi Nắng.',
        vocab: [
          { w: 'Saturday', ipa: '/ˈsæt.ər.deɪ/', vi: 'Thứ Bảy', emoji: '📅' },
          { w: 'picnic', ipa: '/ˈpɪk.nɪk/', vi: 'buổi dã ngoại', emoji: '🧺' }
        ]
      },
      {
        bg: 'assets/art/painted_home_meadow.webp',
        mood: 'sunny',
        pan: 'center',
        chars: [
          { id: 'mimi', x: 20, y: 10, scale: 0.92 },
          { id: 'lulu', x: 66, y: 10, scale: 0.92, flip: true }
        ],
        props: [
          { emoji: '🍎', label: 'Apples', vi: 'Táo đỏ', x: 46, y: 20, size: 56 },
          { emoji: '🍌', label: 'Bananas', vi: 'Chuối vàng', x: 52, y: 48, size: 56 }
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
        bg: 'assets/art/painted_home_meadow.webp',
        mood: 'sunny',
        pan: 'right',
        chars: [
          { id: 'toby', x: 20, y: 10, scale: 0.92 },
          { id: 'leo', x: 66, y: 10, scale: 0.92, flip: true }
        ],
        props: [
          { emoji: '🥪', label: 'Sandwich', vi: 'Bánh mì kẹp', x: 44, y: 18, size: 62 },
          { emoji: '🍉', label: 'Watermelon', vi: 'Dưa hấu', x: 54, y: 46, size: 58 }
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
          { emoji: '🎸', label: 'Guitar', vi: 'Đàn ghi-ta', x: 46, y: 26, size: 66 },
          { emoji: '🎵', label: 'Music', vi: 'Âm nhạc', x: 54, y: 66, size: 52 }
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
        bg: 'assets/art/painted_home_meadow.webp',
        mood: 'morning',
        pan: 'center',
        chars: [
          { id: 'mimi', x: 22, y: 10, scale: 0.92 },
          { id: 'leo', x: 64, y: 10, scale: 0.92, flip: true }
        ],
        props: [
          { emoji: '♻️', label: 'Clean Up', vi: 'Dọn dẹp', x: 48, y: 28, size: 62 }
        ],
        en: 'Before going home, all four friends pick up every wrapper and leave the green hill spotless and clean.',
        vi: 'Trước khi ra về, cả bốn bạn cùng nhặt sạch từng mẩu giấy gói để ngọn đồi xanh luôn sạch đẹp tinh tươm.',
        vocab: [
          { w: 'before', ipa: '/bɪˈfɔːr/', vi: 'trước khi', emoji: '⏰' },
          { w: 'spotless', ipa: '/ˈspɒt.ləs/', vi: 'sạch tinh tươm', emoji: '✨' }
        ]
      },
      {
        bg: 'assets/art/painted_home_meadow.webp',
        mood: 'sunset',
        pan: 'right',
        chars: [
          { id: 'leo', x: 10, y: 10, scale: 0.85 },
          { id: 'mimi', x: 32, y: 10, scale: 0.85 },
          { id: 'toby', x: 54, y: 10, scale: 0.85, flip: true },
          { id: 'lulu', x: 74, y: 10, scale: 0.85, flip: true }
        ],
        props: [
          { emoji: '⭐', label: 'Teamwork', vi: 'Đoàn kết', x: 50, y: 72, size: 56 }
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
        chars: [{ id: 'leo', x: 16, y: 8, scale: 0.94 }],
        props: [
          { emoji: '🤿', label: 'Diving Mask', vi: 'Kính lặn', x: 54, y: 62, size: 60 },
          { emoji: '🐠', label: 'Tropical Fish', vi: 'Cá nhiệt đới', x: 76, y: 50, size: 64 }
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
        chars: [{ id: 'leo', x: 16, y: 8, scale: 0.9 }],
        props: [
          { emoji: '🐳', label: 'Whale', vi: 'Cá voi', x: 64, y: 56, size: 78 },
          { emoji: '🐚', label: 'Shell', vi: 'Vỏ sò', x: 78, y: 14, size: 52 }
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
          { emoji: '🐢', label: 'Sea Turtle', vi: 'Rùa biển', x: 62, y: 42, size: 72 },
          { emoji: '🪸', label: 'Coral', vi: 'San hô', x: 80, y: 16, size: 58 }
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
          { emoji: '♻️', label: 'Recycle', vi: 'Tái chế', x: 56, y: 48, size: 64 },
          { emoji: '🐢', label: 'Thank You', vi: 'Cảm ơn', x: 76, y: 24, size: 62 }
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
          { emoji: '🐙', label: 'Octopus', vi: 'Bạch tuộc', x: 56, y: 22, size: 60 },
          { emoji: '🐡', label: 'Fish', vi: 'Cá biển', x: 76, y: 60, size: 58 }
        ],
        en: 'Now the tiny fish, a shy octopus, and bright starfish come out to play. The secret of the reef is simple: every creature depends on clean water.',
        vi: 'Giờ đây đàn cá nhỏ, chú bạch tuộc nhút nhát và sao biển rực rỡ cùng ùa ra vui chơi. Bí mật của rạn san hô thật giản dị: mọi sinh vật đều cần làn nước sạch.',
        vocab: [
          { w: 'depends', ipa: '/dɪˈpendz/', vi: 'phụ thuộc vào', emoji: '🌊' },
          { w: 'secret', ipa: '/ˈsiː.krət/', vi: 'bí mật', emoji: '✨' }
        ]
      },
      {
        bg: 'assets/art/painted_home_meadow.webp',
        mood: 'sunset',
        pan: 'right',
        chars: [
          { id: 'leo', x: 24, y: 10, scale: 0.94 },
          { id: 'mimi', x: 58, y: 10, scale: 0.94, flip: true }
        ],
        props: [
          { emoji: '🌍', label: 'Earth', vi: 'Trái Đất', x: 46, y: 64, size: 64 }
        ],
        en: 'Back on shore, Leo drops the bottle into the recycling bin. Even one small kind action helps protect our whole blue ocean.',
        vi: 'Trở lại bờ, Leo bỏ chai nhựa vào thùng tái chế. Chỉ một hành động nhỏ tử tế thôi cũng góp phần bảo vệ cả đại dương xanh.',
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
    coverBg: 'assets/art/painted_hub_games.webp',
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
          { emoji: '🪁', label: 'Kite', vi: 'Cánh diều', x: 64, y: 42, size: 70 },
          { emoji: '✏️', label: 'Design', vi: 'Thiết kế', x: 78, y: 16, size: 52 }
        ],
        en: 'Mimi wants to build her very own diamond kite. On her wooden desk, she lays out light paper, bamboo sticks, and colorful ribbons.',
        vi: 'Mimi muốn tự tay làm một chiếc diều hình thoi cho riêng mình. Trên bàn gỗ, cô đặt giấy mỏng, thanh tre nhẹ và những dải ruy-băng rực rỡ.',
        vocab: [
          { w: 'diamond', ipa: '/ˈdaɪ.mənd/', vi: 'hình thoi', emoji: '💠' },
          { w: 'bamboo', ipa: '/bæmˈbuː/', vi: 'cây tre', emoji: '🎋' }
        ]
      },
      {
        bg: 'assets/art/painted_home_meadow.webp',
        mood: 'sunny',
        pan: 'center',
        chars: [
          { id: 'mimi', x: 20, y: 10, scale: 0.92 },
          { id: 'toby', x: 66, y: 10, scale: 0.92, flip: true }
        ],
        props: [
          { emoji: '🪁', label: 'First Try', vi: 'Lần thử đầu', x: 46, y: 26, size: 62 },
          { emoji: '💨', label: 'Wind', vi: 'Cơn gió', x: 76, y: 66, size: 56 }
        ],
        en: 'Mimi and Toby run across the breezy meadow to test the kite. Up it goes—then swoop! It spins and tumbles softly into the grass.',
        vi: 'Mimi và Toby chạy dọc thảo nguyên lộng gió để thả thử. Diều vừa bay lên — rồi vù! Nó xoay vòng và đáp nhẹ xuống bãi cỏ.',
        vocab: [
          { w: 'breezy', ipa: '/ˈbriː.zi/', vi: 'lộng gió nhẹ', emoji: '💨' },
          { w: 'tumbles', ipa: '/ˈtʌm.bəlz/', vi: 'lộn nhào xuống', emoji: '🪁' }
        ]
      },
      {
        bg: 'assets/art/painted_bg_montessori.webp',
        mood: 'cozy',
        pan: 'right',
        chars: [
          { id: 'mimi', x: 22, y: 8, scale: 0.92 },
          { id: 'toby', x: 66, y: 8, scale: 0.92, flip: true }
        ],
        props: [
          { emoji: '💡', label: 'Idea', vi: 'Ý tưởng', x: 48, y: 62, size: 60 },
          { emoji: '🎀', label: 'Tail Ribbon', vi: 'Đuôi diều', x: 48, y: 22, size: 58 }
        ],
        en: 'Mimi does not give up. She thinks like a scientist: "Why did it spin? It needs balance! Let us tie a long ribbon tail to steady it."',
        vi: 'Mimi không hề bỏ cuộc. Cô suy nghĩ như một nhà khoa học: "Sao nó lại xoay nhỉ? Cần sự cân bằng! Hãy buộc thêm đuôi ruy-băng dài để giữ thăng bằng."',
        vocab: [
          { w: 'scientist', ipa: '/ˈsaɪ.ən.tɪst/', vi: 'nhà khoa học', emoji: '🔬' },
          { w: 'balance', ipa: '/ˈbæl.əns/', vi: 'sự cân bằng', emoji: '⚖️' }
        ]
      },
      {
        bg: 'assets/art/painted_home_meadow.webp',
        mood: 'sunny',
        pan: 'left',
        chars: [{ id: 'mimi', x: 20, y: 10, scale: 0.94 }],
        props: [
          { emoji: '🪁', label: 'Soaring Kite', vi: 'Diều bay cao', x: 66, y: 68, size: 74 },
          { emoji: '☁️', label: 'Clouds', vi: 'Mây trắng', x: 38, y: 74, size: 56 }
        ],
        en: 'On the second try, the wind catches the bright kite smoothly. Higher and higher it climbs, dancing steadily beside the white clouds!',
        vi: 'Ở lần thử thứ hai, cơn gió nâng cánh diều lên thật êm ái. Diều bay càng lúc càng cao, lượn vững vàng bên những đám mây trắng!',
        vocab: [
          { w: 'climbs', ipa: '/klaɪmz/', vi: 'bay lên cao', emoji: '⬆️' },
          { w: 'steadily', ipa: '/ˈsted.əl.i/', vi: 'vững vàng', emoji: '✨' }
        ]
      },
      {
        bg: 'assets/art/painted_hub_games.webp',
        mood: 'sunny',
        pan: 'center',
        chars: [
          { id: 'mimi', x: 18, y: 10, scale: 0.92 },
          { id: 'toby', x: 66, y: 10, scale: 0.92, flip: true }
        ],
        props: [
          { emoji: '🪁', label: 'Flying High', vi: 'Bay cao', x: 48, y: 68, size: 68 },
          { emoji: '🌟', label: 'Proud', vi: 'Tự hào', x: 80, y: 58, size: 52 }
        ],
        en: '"You did it, Mimi!" Toby cheers as he takes a turn holding the string. The ribbon tail flutters like a tiny rainbow in the breeze.',
        vi: '"Bạn làm được rồi, Mimi ơi!" Toby reo hò khi tới lượt cầm dây diều. Dải đuôi ruy-băng phấp phới như chiếc cầu vồng nhỏ trong gió.',
        vocab: [
          { w: 'cheers', ipa: '/tʃɪərz/', vi: 'reo hò cổ vũ', emoji: '🎉' },
          { w: 'flutters', ipa: '/ˈflʌt.ərz/', vi: 'phấp phới', emoji: '🎀' }
        ]
      },
      {
        bg: 'assets/art/painted_home_meadow.webp',
        mood: 'sunset',
        pan: 'center',
        chars: [
          { id: 'mimi', x: 24, y: 10, scale: 0.94 },
          { id: 'toby', x: 58, y: 10, scale: 0.94, flip: true }
        ],
        props: [
          { emoji: '🏆', label: 'Keep Trying', vi: 'Kiên trì', x: 46, y: 24, size: 58 }
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
          { emoji: '📖', label: 'Glowing Book', vi: 'Cuốn sách phát sáng', x: 64, y: 22, size: 68 },
          { emoji: '✨', label: 'Starlight', vi: 'Ánh sao', x: 76, y: 66, size: 56 }
        ],
        en: 'At the top of Whispering Hill stood an ancient oak tree hung with golden lanterns. Every twilight, its hollow trunk opened into the Starlight Library.',
        vi: 'Trên đỉnh Đồi Thì Thầm có một cây sồi cổ thụ treo đầy đèn lồng vàng. Mỗi lúc hoàng hôn, thân cây mở ra một Thư Viện Ánh Sao kỳ diệu.',
        vocab: [
          { w: 'ancient', ipa: '/ˈeɪn.ʃənt/', vi: 'cổ xưa', emoji: '🌳' },
          { w: 'twilight', ipa: '/ˈtwaɪ.laɪt/', vi: 'hoàng hôn', emoji: '🌆' }
        ]
      },
      {
        bg: 'assets/art/painted_hub_vocab.webp',
        mood: 'cozy',
        pan: 'left',
        chars: [
          { id: 'lulu', x: 18, y: 10, scale: 0.92 },
          { id: 'mimi', x: 68, y: 10, scale: 0.92, flip: true }
        ],
        props: [
          { emoji: '🧭', label: 'Compass', vi: 'La bàn', x: 48, y: 42, size: 64 }
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
          { emoji: '🐋', label: 'Deep Ocean', vi: 'Đại dương sâu', x: 66, y: 54, size: 74 },
          { emoji: '✨', label: 'Wonder', vi: 'Kỳ diệu', x: 46, y: 68, size: 52 }
        ],
        en: 'As Lulu turned the first page, soft sketches lifted into the air like glowing fireflies. Suddenly, they were reading about giant whales crossing deep ocean trenches.',
        vi: 'Khi Lulu lật trang đầu tiên, những nét vẽ mềm mại bay lên không trung như đom đóm phát sáng. Bỗng chốc hai bạn như đang du hành cùng cá voi giữa đại dương sâu thẳm.',
        vocab: [
          { w: 'sketches', ipa: '/ˈsketʃ.ɪz/', vi: 'bức phác thảo', emoji: '🎨' },
          { w: 'trenches', ipa: '/ˈtren.tʃɪz/', vi: 'rãnh đại dương', emoji: '🌊' }
        ]
      },
      {
        bg: 'assets/art/painted_hub_milestones.webp',
        mood: 'starry',
        pan: 'right',
        chars: [{ id: 'mimi', x: 20, y: 10, scale: 0.9 }],
        props: [
          { emoji: '🚀', label: 'Space', vi: 'Vũ trụ', x: 66, y: 62, size: 70 },
          { emoji: '🌙', label: 'Moon', vi: 'Mặt trăng', x: 44, y: 72, size: 56 }
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
          { emoji: '✏️', label: 'Write', vi: 'Viết tiếp', x: 46, y: 30, size: 62 }
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
          { emoji: '🌟', label: 'Knowledge', vi: 'Tri thức', x: 46, y: 68, size: 58 }
        ],
        en: 'Lulu and Mimi wrote down their favorite questions about nature and stars. Walking home beneath the lantern-lit branches, they knew the magic of reading would always stay with them.',
        vi: 'Lulu và Mimi viết xuống những câu hỏi thú vị nhất của mình về thiên nhiên và các vì sao. Bước về nhà dưới tán cây đèn lồng, hai bạn hiểu phép màu của việc đọc sách sẽ luôn ở bên mình.',
        vocab: [
          { w: 'beneath', ipa: '/bɪˈniːθ/', vi: 'bên dưới', emoji: '🌳' },
          { w: 'knowledge', ipa: '/ˈnɒl.ɪdʒ/', vi: 'tri thức', emoji: '📚' }
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
    coverBg: 'assets/art/painted_home_meadow.webp',
    coverChar: 'toby',
    coverEmoji: '🧭',
    accent: '#059669',
    softBg: '#ECFDF5',
    pages: [
      {
        bg: 'assets/art/painted_home_meadow.webp',
        mood: 'morning',
        pan: 'left',
        chars: [
          { id: 'leo', x: 18, y: 10, scale: 0.92 },
          { id: 'toby', x: 46, y: 10, scale: 0.92 }
        ],
        props: [
          { emoji: '🗺️', label: 'Map', vi: 'Bản đồ', x: 74, y: 34, size: 64 },
          { emoji: '🧭', label: 'Compass', vi: 'La bàn', x: 80, y: 66, size: 54 }
        ],
        en: 'Armed with a hand-drawn map and a trusty compass, Leo and Toby set out early to explore the winding river of Green Valley.',
        vi: 'Mang theo tấm bản đồ vẽ tay và chiếc la bàn tin cậy, Leo và Toby khởi hành từ sớm để khám phá dòng sông uốn lượn của Thung Lũng Xanh.',
        vocab: [
          { w: 'valley', ipa: '/ˈvæl.i/', vi: 'thung lũng', emoji: '🏞️' },
          { w: 'winding', ipa: '/ˈwaɪn.dɪŋ/', vi: 'uốn lượn', emoji: '🌊' }
        ]
      },
      {
        bg: 'assets/art/painted_bg_zoo.webp',
        mood: 'sunny',
        pan: 'center',
        chars: [
          { id: 'leo', x: 20, y: 10, scale: 0.92 },
          { id: 'toby', x: 64, y: 10, scale: 0.92, flip: true }
        ],
        props: [
          { emoji: '⛰️', label: 'Ridge', vi: 'Sườn đồi', x: 46, y: 58, size: 64 }
        ],
        en: 'Along the dusty trail, they observed how highland streams flowed downward to nourish the meadows below. Toby sketched each landmark in his notebook.',
        vi: 'Dọc con đường mòn, hai bạn quan sát cách những con suối vùng cao chảy xuống tưới mát cho đồng cỏ bên dưới. Toby phác họa từng địa danh vào sổ tay.',
        vocab: [
          { w: 'observed', ipa: '/əbˈzɜːrvd/', vi: 'quan sát', emoji: '👀' },
          { w: 'nourish', ipa: '/ˈnɜːr.ɪʃ/', vi: 'nuôi dưỡng', emoji: '🌱' }
        ]
      },
      {
        bg: 'assets/art/painted_home_meadow.webp',
        mood: 'rainy',
        pan: 'center',
        chars: [
          { id: 'leo', x: 20, y: 10, scale: 0.92 },
          { id: 'toby', x: 66, y: 10, scale: 0.92, flip: true }
        ],
        props: [
          { emoji: '🌧️', label: 'Shower', vi: 'Cơn mưa rào', x: 48, y: 70, size: 64 }
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
          { emoji: '🌈', label: 'Rainbow', vi: 'Cầu vồng', x: 48, y: 68, size: 70 },
          { emoji: '🌉', label: 'Wooden Bridge', vi: 'Cây cầu gỗ', x: 48, y: 22, size: 60 }
        ],
        en: 'When the mist cleared, a sparkling wooden footbridge appeared ahead. Together they crossed the river, cheering as they spotted the glowing treehouse in the distance.',
        vi: 'Khi làn sương tan đi, một cây cầu gỗ lấp lánh hiện ra phía trước. Cả hai cùng băng qua sông, reo vui khi thấy ngôi nhà cây sáng đèn ở đằng xa.',
        vocab: [
          { w: 'mist', ipa: '/mɪst/', vi: 'làn sương', emoji: '🌫️' },
          { w: 'appeared', ipa: '/əˈpɪərd/', vi: 'hiện ra', emoji: '✨' }
        ]
      },
      {
        bg: 'assets/art/painted_hub_milestones.webp',
        mood: 'sunset',
        pan: 'center',
        chars: [
          { id: 'leo', x: 22, y: 10, scale: 0.92 },
          { id: 'toby', x: 64, y: 10, scale: 0.92, flip: true }
        ],
        props: [
          { emoji: '🔭', label: 'Viewpoint', vi: 'Đài ngắm cảnh', x: 46, y: 34, size: 64 }
        ],
        en: 'From the hilltop viewpoint, the entire valley stretched out like a patchwork quilt of emerald fields, orchards, and winding paths.',
        vi: 'Từ đỉnh đồi ngắm cảnh, cả thung lũng trải dài như tấm chăn ghép sắc màu của đồng ruộng xanh ngọc, vườn cây ăn trái và những lối mòn uốn quanh.',
        vocab: [
          { w: 'entire', ipa: '/ɪnˈtaɪər/', vi: 'toàn bộ', emoji: '🌍' },
          { w: 'orchards', ipa: '/ˈɔːr.tʃərdz/', vi: 'vườn cây ăn trái', emoji: '🍎' }
        ]
      },
      {
        bg: 'assets/art/painted_home_meadow.webp',
        mood: 'sunset',
        pan: 'center',
        chars: [
          { id: 'leo', x: 24, y: 10, scale: 0.94 },
          { id: 'toby', x: 58, y: 10, scale: 0.94, flip: true }
        ],
        props: [
          { emoji: '⭐', label: 'Adventure', vi: 'Chuyến phiêu lưu', x: 78, y: 68, size: 56 }
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
    coverBg: 'assets/art/painted_hub_milestones.webp',
    coverChar: 'mimi',
    coverEmoji: '🕰️',
    accent: '#D97706',
    softBg: '#FFFBEB',
    pages: [
      {
        bg: 'assets/art/painted_hub_milestones.webp',
        mood: 'morning',
        pan: 'left',
        chars: [{ id: 'mimi', x: 18, y: 10, scale: 0.92 }],
        props: [
          { emoji: '🕰️', label: 'Town Clock', vi: 'Đồng hồ quảng trường', x: 66, y: 42, size: 74 },
          { emoji: '⚙️', label: 'Gears', vi: 'Bánh răng', x: 80, y: 20, size: 54 }
        ],
        en: 'For fifty years, the golden tower clock at Meadow Square chimed every sunrise without fail. One autumn morning, however, its great brass hands suddenly fell silent.',
        vi: 'Suốt năm mươi năm, chiếc đồng hồ tháp vàng ở Quảng trường Thảo Nguyên luôn ngân vang mỗi bình minh chưa từng sai nhịp. Thế nhưng một sáng mùa thu, đôi kim đồng lớn bỗng ngừng lại lặng im.',
        vocab: [
          { w: 'chimed', ipa: '/tʃaɪmd/', vi: 'ngân vang tiếng chuông', emoji: '🔔' },
          { w: 'silent', ipa: '/ˈsaɪ.lənt/', vi: 'im lặng', emoji: '🤫' }
        ]
      },
      {
        bg: 'assets/art/painted_bg_montessori.webp',
        mood: 'cozy',
        pan: 'center',
        chars: [
          { id: 'mimi', x: 20, y: 8, scale: 0.92 },
          { id: 'leo', x: 68, y: 8, scale: 0.92, flip: true }
        ],
        props: [
          { emoji: '🔍', label: 'Inspect', vi: 'Kiểm tra kỹ', x: 48, y: 44, size: 64 }
        ],
        en: 'Mimi, the young apprentice clockmaker, climbed the spiral staircase with Leo. Instead of guessing, she carefully examined every tiny spring and cogwheel under warm lamplight.',
        vi: 'Mimi, cô học việc trẻ của tiệm đồng hồ, leo lên cầu thang xoắn ốc cùng Leo. Thay vì đoán mò, cô cẩn trọng kiểm tra từng chiếc lò xo và bánh răng nhỏ dưới ánh đèn ấm.',
        vocab: [
          { w: 'apprentice', ipa: '/əˈpren.tɪs/', vi: 'người học việc', emoji: '🛠️' },
          { w: 'examined', ipa: '/ɪɡˈzæm.ɪnd/', vi: 'kiểm tra kỹ lưỡng', emoji: '🔍' }
        ]
      },
      {
        bg: 'assets/art/painted_bg_montessori.webp',
        mood: 'cozy',
        pan: 'right',
        chars: [{ id: 'mimi', x: 22, y: 8, scale: 0.94 }],
        props: [
          { emoji: '⚙️', label: 'Tiny Gear', vi: 'Bánh răng nhỏ', x: 62, y: 38, size: 68 },
          { emoji: '🪶', label: 'Feather', vi: 'Chiếc lông chim', x: 78, y: 58, size: 54 }
        ],
        en: 'Tucked deep inside the main wheel was a single bent tooth and a stray sparrow feather. "Remarkable," Mimi murmured. "Even the smallest neglected piece can pause an entire mechanism."',
        vi: 'Nằm sâu bên trong bánh xe chính là một răng cưa bị cong và chiếc lông chim sẻ lạc vào. "Đáng kinh ngạc thật," Mimi khẽ nói. "Ngay cả chi tiết nhỏ nhất bị bỏ quên cũng có thể làm dừng cả bộ máy."',
        vocab: [
          { w: 'neglected', ipa: '/nɪˈɡlek.tɪd/', vi: 'bị bỏ quên', emoji: '⚙️' },
          { w: 'mechanism', ipa: '/ˈmek.ə.nɪ.zəm/', vi: 'cơ chế / bộ máy', emoji: '🔧' }
        ]
      },
      {
        bg: 'assets/art/painted_bg_montessori.webp',
        mood: 'cozy',
        pan: 'left',
        chars: [
          { id: 'mimi', x: 20, y: 8, scale: 0.92 },
          { id: 'leo', x: 66, y: 8, scale: 0.92, flip: true }
        ],
        props: [
          { emoji: '🔧', label: 'Precision', vi: 'Chính xác', x: 46, y: 34, size: 64 }
        ],
        en: 'Hour after hour, Mimi shaped a replacement brass gear with steady hands while Leo polished the pendulum. Precision demanded patience, and neither of them rushed the craft.',
        vi: 'Hết giờ này sang giờ khác, Mimi giũa một bánh răng đồng thay thế bằng đôi tay vững vàng, trong khi Leo đánh bóng con lắc. Sự chính xác đòi hỏi kiên nhẫn và không ai trong hai bạn vội vàng.',
        vocab: [
          { w: 'precision', ipa: '/prɪˈsɪʒ.ən/', vi: 'sự chính xác', emoji: '🎯' },
          { w: 'craft', ipa: '/krɑːft/', vi: 'nghề thủ công', emoji: '🛠️' }
        ]
      },
      {
        bg: 'assets/art/painted_hub_milestones.webp',
        mood: 'sunny',
        pan: 'center',
        chars: [
          { id: 'mimi', x: 22, y: 10, scale: 0.92 },
          { id: 'leo', x: 64, y: 10, scale: 0.92, flip: true }
        ],
        props: [
          { emoji: '🔔', label: 'Chime', vi: 'Tiếng chuông ngân', x: 48, y: 66, size: 66 },
          { emoji: '✨', label: 'Success', vi: 'Thành công', x: 78, y: 62, size: 54 }
        ],
        en: 'At dawn, the final screw clicked into place. Tick... tock... Bong! A rich, resonant chime echoed across the sunlit square, and townsfolk below burst into applause.',
        vi: 'Lúc bình minh, chiếc ốc cuối cùng khớp vào vị trí. Tích... tắc... Boong! Một tiếng chuông trầm ấm vang vọng khắp quảng trường ngập nắng, và người dân bên dưới vỡ òa vỗ tay.',
        vocab: [
          { w: 'resonant', ipa: '/ˈrez.ən.ənt/', vi: 'vang vọng trầm ấm', emoji: '🔔' },
          { w: 'applause', ipa: '/əˈplɔːz/', vi: 'tràng pháo tay', emoji: '👏' }
        ]
      },
      {
        bg: 'assets/art/painted_home_meadow.webp',
        mood: 'sunset',
        pan: 'center',
        chars: [
          { id: 'mimi', x: 24, y: 10, scale: 0.94 },
          { id: 'leo', x: 58, y: 10, scale: 0.94, flip: true }
        ],
        props: [
          { emoji: '🕰️', label: 'Promise Kept', vi: 'Giữ trọn lời hứa', x: 46, y: 26, size: 60 }
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
  }
];
