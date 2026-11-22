/**
 * English4Kids - Core Flashcards & Interactive Audio Learning Engine (Age 6)
 * Features:
 * - 6 Rich Topics (Animals, Colors, Family, Numbers, Fruits, School & Toys)
 * - 48 Curated Flashcards with IPA phonetics, syllables, Vietnamese meanings,
 *   example sentences, and kid-friendly memory tips.
 * - Web Speech API English pronunciation (Normal speed, Slow turtle speed, Spelling mode).
 * - Web Audio API synthesized sound effects (chime, flip, celebration, gentle buzz).
 * - LocalStorage persistence for learned cards & earned stars.
 */

const TOPICS_DATA = [
  {
    id: 'animals',
    titleVi: 'Động Vật Đáng Yêu',
    titleEn: 'Cute Animals',
    icon: '🦁',
    description: 'Làm quen với các bạn thú ngộ nghĩnh trong rừng và quanh nhà!',
    theme: {
      accent: '#FF7A00',
      border: '#FFD24C',
      shadow: '#E5B21D',
      bgSoft: '#FFF4D6'
    },
    cards: [
      {
        id: 'ani_lion',
        en: 'Lion',
        vi: 'Con Sư Tử',
        phonetic: '/ˈlaɪ.ən/',
        syllables: ['Li', 'on'],
        emoji: '🦁',
        artBg: '#FFF3C4',
        exampleEn: 'The lion is the king of the jungle.',
        exampleVi: 'Sư tử là chúa tể rừng xanh.',
        funFact: 'Mẹo nhớ: Sư tử có chiếc bờm xù quanh cổ và tiếng gầm thật vang!'
      },
      {
        id: 'ani_elephant',
        en: 'Elephant',
        vi: 'Con Voi',
        phonetic: '/ˈel.ɪ.fənt/',
        syllables: ['El', 'e', 'phant'],
        emoji: '🐘',
        artBg: '#E0F2FE',
        exampleEn: 'The elephant has a long trunk.',
        exampleVi: 'Bạn voi có chiếc vòi thật dài.',
        funFact: 'Mẹo nhớ: Đọc là "E-li-phần" – bạn voi to lớn thích phun nước bằng vòi!'
      },
      {
        id: 'ani_monkey',
        en: 'Monkey',
        vi: 'Con Khỉ',
        phonetic: '/ˈmʌŋ.ki/',
        syllables: ['Mon', 'key'],
        emoji: '🐵',
        artBg: '#FEF3C7',
        exampleEn: 'The monkey loves eating bananas.',
        exampleVi: 'Bạn khỉ rất thích ăn chuối chín.',
        funFact: 'Mẹo nhớ: "Măn-ki" leo trèo thoăn thoắt trên cành cây!'
      },
      {
        id: 'ani_rabbit',
        en: 'Rabbit',
        vi: 'Con Thỏ',
        phonetic: '/ˈræb.ɪt/',
        syllables: ['Rab', 'bit'],
        emoji: '🐰',
        artBg: '#FCE7F3',
        exampleEn: 'The white rabbit has long ears.',
        exampleVi: 'Bạn thỏ trắng có đôi tai dài.',
        funFact: 'Mẹo nhớ: Thỏ "Ráp-bịt" nhảy tưng tưng và mê ăn cà rốt!'
      },
      {
        id: 'ani_dog',
        en: 'Dog',
        vi: 'Con Chó',
        phonetic: '/dɒɡ/',
        syllables: ['Dog'],
        emoji: '🐶',
        artBg: '#FFEDD5',
        exampleEn: 'My dog is very friendly.',
        exampleVi: 'Bạn cún nhà tớ rất thân thiện.',
        funFact: 'Mẹo nhớ: Cún con vẫy đuôi mừng mỗi khi bé đi học về!'
      },
      {
        id: 'ani_cat',
        en: 'Cat',
        vi: 'Con Mèo',
        phonetic: '/kæt/',
        syllables: ['Cat'],
        emoji: '🐱',
        artBg: '#FEF9C3',
        exampleEn: 'The cute cat says meow.',
        exampleVi: 'Bạn mèo xinh kêu meo meo.',
        funFact: 'Mẹo nhớ: Bắt đầu bằng chữ C – "Két" là bạn mèo thích tắm nắng!'
      },
      {
        id: 'ani_duck',
        en: 'Duck',
        vi: 'Con Vịt',
        phonetic: '/dʌk/',
        syllables: ['Duck'],
        emoji: '🦆',
        artBg: '#DCFCE7',
        exampleEn: 'The yellow duck swims in the pond.',
        exampleVi: 'Bạn vịt vàng bơi dưới ao.',
        funFact: 'Mẹo nhớ: Vịt "Đắc" kêu cạp cạp và bơi dưới nước siêu giỏi!'
      },
      {
        id: 'ani_tiger',
        en: 'Tiger',
        vi: 'Con Hổ',
        phonetic: '/ˈtaɪ.ɡər/',
        syllables: ['Ti', 'ger'],
        emoji: '🐯',
        artBg: '#FFEDD5',
        exampleEn: 'The tiger has orange and black stripes.',
        exampleVi: 'Con hổ có những vệt vằn cam và đen.',
        funFact: 'Mẹo nhớ: "Tai-gờ" là bạn hổ dũng mãnh với bộ lông vằn sọc!'
      }
    ]
  },
  {
    id: 'colors',
    titleVi: 'Thế Giới Màu Sắc',
    titleEn: 'Bright Colors',
    icon: '🎨',
    description: 'Khám phá bảng màu cầu vồng rực rỡ xung quanh bé!',
    theme: {
      accent: '#FF4D8D',
      border: '#F472B6',
      shadow: '#DB2777',
      bgSoft: '#FCE7F3'
    },
    cards: [
      {
        id: 'col_red',
        en: 'Red',
        vi: 'Màu Đỏ',
        phonetic: '/red/',
        syllables: ['Red'],
        emoji: '🍓',
        colorHex: '#EF4444',
        artBg: '#FEE2E2',
        exampleEn: 'This strawberry is bright red.',
        exampleVi: 'Quả dâu tây này có màu đỏ tươi.',
        funFact: 'Mẹo nhớ: "Rét" – Màu đỏ rực rỡ như quả dâu tây và xe cứu hỏa!'
      },
      {
        id: 'col_blue',
        en: 'Blue',
        vi: 'Màu Xanh Dương',
        phonetic: '/bluː/',
        syllables: ['Blue'],
        emoji: '🐳',
        colorHex: '#3B82F6',
        artBg: '#DBEAFE',
        exampleEn: 'The sky and the ocean are blue.',
        exampleVi: 'Bầu trời và biển cả có màu xanh dương.',
        funFact: 'Mẹo nhớ: "Bờ-lu" – Xanh mát như bầu trời buổi sáng!'
      },
      {
        id: 'col_yellow',
        en: 'Yellow',
        vi: 'Màu Vàng',
        phonetic: '/ˈjel.əʊ/',
        syllables: ['Yel', 'low'],
        emoji: '🌻',
        colorHex: '#FACC15',
        artBg: '#FEF9C3',
        exampleEn: 'The sun is bright yellow.',
        exampleVi: 'Ông mặt trời có màu vàng tươi.',
        funFact: 'Mẹo nhớ: "De-lầu" – Màu vàng ấm áp của hoa hướng dương và mặt trời!'
      },
      {
        id: 'col_green',
        en: 'Green',
        vi: 'Màu Xanh Lá',
        phonetic: '/ɡriːn/',
        syllables: ['Green'],
        emoji: '🌿',
        colorHex: '#22C55E',
        artBg: '#DCFCE7',
        exampleEn: 'The leaves on the tree are green.',
        exampleVi: 'Những chiếc lá trên cây có màu xanh lá.',
        funFact: 'Mẹo nhớ: "Gờ-rin" – Màu xanh tươi mát của cỏ cây và chú ếch cốm!'
      },
      {
        id: 'col_orange',
        en: 'Orange',
        vi: 'Màu Cam',
        phonetic: '/ˈɒr.ɪndʒ/',
        syllables: ['Or', 'ange'],
        emoji: '🍊',
        colorHex: '#F97316',
        artBg: '#FFEDD5',
        exampleEn: 'Carrots and pumpkins are orange.',
        exampleVi: 'Củ cà rốt và quả bí ngô có màu cam.',
        funFact: 'Mẹo nhớ: Từ "Orange" vừa là màu cam, vừa là quả cam mọng nước!'
      },
      {
        id: 'col_pink',
        en: 'Pink',
        vi: 'Màu Hồng',
        phonetic: '/pɪŋk/',
        syllables: ['Pink'],
        emoji: '🦩',
        colorHex: '#EC4899',
        artBg: '#FCE7F3',
        exampleEn: 'She likes her pink dress.',
        exampleVi: 'Bạn ấy thích chiếc váy màu hồng của mình.',
        funFact: 'Mẹo nhớ: "Pinh" – Màu hồng ngọt ngào như kẹo bông gòn!'
      },
      {
        id: 'col_purple',
        en: 'Purple',
        vi: 'Màu Tím',
        phonetic: '/ˈpɜː.pəl/',
        syllables: ['Pur', 'ple'],
        emoji: '🍇',
        colorHex: '#A855F7',
        artBg: '#F3E8FF',
        exampleEn: 'These sweet grapes are purple.',
        exampleVi: 'Chùm nho ngọt này có màu tím.',
        funFact: 'Mẹo nhớ: "Pơ-pồ" – Khi pha màu đỏ với màu xanh dương sẽ ra màu tím!'
      },
      {
        id: 'col_white',
        en: 'White',
        vi: 'Màu Trắng',
        phonetic: '/waɪt/',
        syllables: ['White'],
        emoji: '⛄',
        colorHex: '#FFFFFF',
        artBg: '#E2E8F0',
        exampleEn: 'The clouds and snow are white.',
        exampleVi: 'Những đám mây và tuyết có màu trắng.',
        funFact: 'Mẹo nhớ: "Oai-tờ" – Trắng tinh như người tuyết và đám mây bồng bềnh!'
      }
    ]
  },
  {
    id: 'family',
    titleVi: 'Gia Đình Thân Yêu',
    titleEn: 'My Family',
    icon: '👨‍👩‍👧‍👦',
    description: 'Cách gọi Ông Bà, Bố Mẹ và Anh Chị Em bằng tiếng Anh!',
    theme: {
      accent: '#22A2F2',
      border: '#60A5FA',
      shadow: '#2563EB',
      bgSoft: '#DBEAFE'
    },
    cards: [
      {
        id: 'fam_father',
        en: 'Father',
        vi: 'Bố / Ba',
        phonetic: '/ˈfɑː.ðər/',
        syllables: ['Fa', 'ther'],
        emoji: '👨',
        artBg: '#DBEAFE',
        exampleEn: 'My father plays football with me.',
        exampleVi: 'Bố chơi đá bóng cùng với tớ.',
        funFact: 'Mẹo nhớ: Ngoài "Father", bé có thể gọi thân mật là "Daddy" hoặc "Dad"!'
      },
      {
        id: 'fam_mother',
        en: 'Mother',
        vi: 'Mẹ / Má',
        phonetic: '/ˈmʌð.ər/',
        syllables: ['Mo', 'ther'],
        emoji: '👩',
        artBg: '#FCE7F3',
        exampleEn: 'My mother tells me bedtime stories.',
        exampleVi: 'Mẹ kể chuyện chúc ngủ ngon cho tớ.',
        funFact: 'Mẹo nhớ: Bé cũng có thể gọi mẹ yêu là "Mommy" hoặc "Mom" nhé!'
      },
      {
        id: 'fam_brother',
        en: 'Brother',
        vi: 'Anh / Em Trai',
        phonetic: '/ˈbrʌð.ər/',
        syllables: ['Bro', 'ther'],
        emoji: '👦',
        artBg: '#E0F2FE',
        exampleEn: 'My brother shares his toys with me.',
        exampleVi: 'Anh trai chia sẻ đồ chơi cùng tớ.',
        funFact: 'Mẹo nhớ: "Bờ-ra-đờ" là anh trai hoặc em trai trong nhà!'
      },
      {
        id: 'fam_sister',
        en: 'Sister',
        vi: 'Chị / Em Gái',
        phonetic: '/ˈsɪs.tər/',
        syllables: ['Sis', 'ter'],
        emoji: '👧',
        artBg: '#FCE7F3',
        exampleEn: 'My sister loves drawing pictures.',
        exampleVi: 'Chị gái tớ rất thích vẽ tranh.',
        funFact: 'Mẹo nhớ: "Xít-xờ-tờ" là chị gái hoặc em gái thân thương!'
      },
      {
        id: 'fam_grandpa',
        en: 'Grandpa',
        vi: 'Ông (Nội / Ngoại)',
        phonetic: '/ˈɡræn.pɑː/',
        syllables: ['Grand', 'pa'],
        emoji: '👴',
        artBg: '#FEF3C7',
        exampleEn: 'Grandpa plants flowers in the garden.',
        exampleVi: 'Ông trồng nhiều hoa đẹp trong vườn.',
        funFact: 'Mẹo nhớ: Tên đầy đủ là "Grandfather", gọi thân thương là "Grandpa"!'
      },
      {
        id: 'fam_grandma',
        en: 'Grandma',
        vi: 'Bà (Nội / Ngoại)',
        phonetic: '/ˈɡræn.mɑː/',
        syllables: ['Grand', 'ma'],
        emoji: '👵',
        artBg: '#FFEDD5',
        exampleEn: 'Grandma bakes delicious cookies.',
        exampleVi: 'Bà nướng những chiếc bánh quy thật thơm ngon.',
        funFact: 'Mẹo nhớ: Tên đầy đủ là "Grandmother", gọi gần gũi là "Grandma"!'
      },
      {
        id: 'fam_baby',
        en: 'Baby',
        vi: 'Em Bé',
        phonetic: '/ˈbeɪ.bi/',
        syllables: ['Ba', 'by'],
        emoji: '👶',
        artBg: '#FEF9C3',
        exampleEn: 'The little baby has a sweet smile.',
        exampleVi: 'Em bé nhỏ có nụ cười thật đáng yêu.',
        funFact: 'Mẹo nhớ: "Bây-bi" là em bé nhỏ xíu hay cười khanh khách!'
      },
      {
        id: 'fam_family',
        en: 'Family',
        vi: 'Gia Đình',
        phonetic: '/ˈfæm.əl.i/',
        syllables: ['Fam', 'i', 'ly'],
        emoji: '🏡',
        artBg: '#DCFCE7',
        exampleEn: 'I love my happy family very much.',
        exampleVi: 'Tớ yêu gia đình hạnh phúc của tớ rất nhiều.',
        funFact: 'Mẹo nhớ: "Phe-mi-li" là tổ ấm có ông bà, bố mẹ và các con!'
      }
    ]
  },
  {
    id: 'numbers',
    titleVi: 'Bé Tập Đếm Số',
    titleEn: 'Fun Numbers',
    icon: '🔢',
    description: 'Tập đếm từ 1 đến 8 bằng tiếng Anh thật vui và dễ nhớ!',
    theme: {
      accent: '#22C55E',
      border: '#4ADE80',
      shadow: '#16A34A',
      bgSoft: '#DCFCE7'
    },
    cards: [
      {
        id: 'num_1',
        en: 'One',
        vi: 'Số Một (1)',
        phonetic: '/wʌn/',
        syllables: ['One'],
        numberVal: 1,
        emoji: '1️⃣',
        countIcon: '⭐',
        artBg: '#FEF9C3',
        exampleEn: 'I have one bright red apple.',
        exampleVi: 'Tớ có một quả táo đỏ tươi.',
        funFact: 'Mẹo nhớ: Đọc là "Oăn" – Giơ 1 ngón tay trỏ lên nào!'
      },
      {
        id: 'num_2',
        en: 'Two',
        vi: 'Số Hai (2)',
        phonetic: '/tuː/',
        syllables: ['Two'],
        numberVal: 2,
        emoji: '2️⃣',
        countIcon: '🍒',
        artBg: '#DBEAFE',
        exampleEn: 'We have two hands and two eyes.',
        exampleVi: 'Chúng mình có hai bàn tay và hai con mắt.',
        funFact: 'Mẹo nhớ: Đọc là "Tu" – Giơ 2 ngón tay chữ V chiến thắng!'
      },
      {
        id: 'num_3',
        en: 'Three',
        vi: 'Số Ba (3)',
        phonetic: '/θriː/',
        syllables: ['Three'],
        numberVal: 3,
        emoji: '3️⃣',
        countIcon: '🎈',
        artBg: '#FCE7F3',
        exampleEn: 'There are three balloons in the sky.',
        exampleVi: 'Có ba quả bóng bay trên bầu trời.',
        funFact: 'Mẹo nhớ: Đọc là "Thờ-ri" – Ba quả bóng bay đủ màu!'
      },
      {
        id: 'num_4',
        en: 'Four',
        vi: 'Số Bốn (4)',
        phonetic: '/fɔːr/',
        syllables: ['Four'],
        numberVal: 4,
        emoji: '4️⃣',
        countIcon: '🍀',
        artBg: '#DCFCE7',
        exampleEn: 'A car has four round wheels.',
        exampleVi: 'Chiếc xe ô tô có bốn bánh xe tròn.',
        funFact: 'Mẹo nhớ: Đọc là "Pho" – Như cỏ bốn lá may mắn!'
      },
      {
        id: 'num_5',
        en: 'Five',
        vi: 'Số Năm (5)',
        phonetic: '/faɪv/',
        syllables: ['Five'],
        numberVal: 5,
        emoji: '5️⃣',
        countIcon: '🖐️',
        artBg: '#FFEDD5',
        exampleEn: 'High five with five fingers!',
        exampleVi: 'Đập tay "High five" với năm ngón tay trên bàn tay!',
        funFact: 'Mẹo nhớ: "Phai-vờ" – Xòe cả bàn tay 5 ngón đập tay High Five!'
      },
      {
        id: 'num_6',
        en: 'Six',
        vi: 'Số Sáu (6)',
        phonetic: '/sɪks/',
        syllables: ['Six'],
        numberVal: 6,
        emoji: '6️⃣',
        countIcon: '🐝',
        artBg: '#FEF3C7',
        exampleEn: 'I am six years old today!',
        exampleVi: 'Hôm nay tớ tròn sáu tuổi rồi!',
        funFact: 'Mẹo nhớ: "Xích-xờ" – Chính là số tuổi của bé 6 tuổi đó!'
      },
      {
        id: 'num_7',
        en: 'Seven',
        vi: 'Số Bảy (7)',
        phonetic: '/ˈsev.ən/',
        syllables: ['Sev', 'en'],
        numberVal: 7,
        emoji: '7️⃣',
        countIcon: '🌈',
        artBg: '#E0F2FE',
        exampleEn: 'A rainbow has seven beautiful colors.',
        exampleVi: 'Cầu vồng có bảy sắc màu tuyệt đẹp.',
        funFact: 'Mẹo nhớ: "Xe-vần" – 7 sắc cầu vồng và 7 ngày trong tuần!'
      },
      {
        id: 'num_8',
        en: 'Eight',
        vi: 'Số Tám (8)',
        phonetic: '/eɪt/',
        syllables: ['Eight'],
        numberVal: 8,
        emoji: '8️⃣',
        countIcon: '🐙',
        artBg: '#F3E8FF',
        exampleEn: 'An octopus has eight legs.',
        exampleVi: 'Bạn bạch tuộc có tám cái xúc tu.',
        funFact: 'Mẹo nhớ: Đọc là "Ấy-tờ" – Bạn bạch tuộc vui tính có 8 chân!'
      }
    ]
  },
  {
    id: 'fruits',
    titleVi: 'Trái Cây Ngọt Lành',
    titleEn: 'Yummy Fruits',
    icon: '🍎',
    description: 'Những loại quả thơm ngon nhiều vitamin bé ăn mỗi ngày!',
    theme: {
      accent: '#F97316',
      border: '#FB923C',
      shadow: '#EA580C',
      bgSoft: '#FFEDD5'
    },
    cards: [
      {
        id: 'fru_apple',
        en: 'Apple',
        vi: 'Quả Táo',
        phonetic: '/ˈæp.əl/',
        syllables: ['Ap', 'ple'],
        emoji: '🍎',
        artBg: '#FEE2E2',
        exampleEn: 'This red apple is crunchy and sweet.',
        exampleVi: 'Quả táo đỏ này giòn và ngọt lắm.',
        funFact: 'Mẹo nhớ: "Áp-pồ" – Từ tiếng Anh đầu tiên bắt đầu bằng chữ A!'
      },
      {
        id: 'fru_banana',
        en: 'Banana',
        vi: 'Quả Chuối',
        phonetic: '/bəˈnɑː.nə/',
        syllables: ['Ba', 'na', 'na'],
        emoji: '🍌',
        artBg: '#FEF9C3',
        exampleEn: 'Monkeys love peeling yellow bananas.',
        exampleVi: 'Các bạn khỉ rất thích bóc chuối vàng.',
        funFact: 'Mẹo nhớ: "Bờ-na-nờ" có tới 3 chữ A, đọc lên nghe vui tai như bài hát!'
      },
      {
        id: 'fru_watermelon',
        en: 'Watermelon',
        vi: 'Quả Dưa Hấu',
        phonetic: '/ˈwɔː.təˌmel.ən/',
        syllables: ['Wa', 'ter', 'mel', 'on'],
        emoji: '🍉',
        artBg: '#DCFCE7',
        exampleEn: 'Cold watermelon is great in summer.',
        exampleVi: 'Dưa hấu mát lành ăn mùa hè thật tuyệt.',
        funFact: 'Mẹo nhớ: Ghép từ "Water" (nước) + "Melon" (dưa) = Dưa hấu mọng nước!'
      },
      {
        id: 'fru_strawberry',
        en: 'Strawberry',
        vi: 'Quả Dâu Tây',
        phonetic: '/ˈstrɔː.bər.i/',
        syllables: ['Straw', 'ber', 'ry'],
        emoji: '🍓',
        artBg: '#FCE7F3',
        exampleEn: 'I like strawberry ice cream.',
        exampleVi: 'Tớ thích kem vị dâu tây.',
        funFact: 'Mẹo nhớ: Quả dâu đỏ có những hạt nhỏ li ti bên ngoài!'
      },
      {
        id: 'fru_grapes',
        en: 'Grapes',
        vi: 'Chùm Nho',
        phonetic: '/ɡreɪps/',
        syllables: ['Grapes'],
        emoji: '🍇',
        artBg: '#F3E8FF',
        exampleEn: 'Purple grapes grow in bunches.',
        exampleVi: 'Những quả nho tím mọc thành từng chùm.',
        funFact: 'Mẹo nhớ: "Gờ-rếp-xờ" – Chùm nho ngọt lịm nhiều quả!'
      },
      {
        id: 'fru_mango',
        en: 'Mango',
        vi: 'Quả Xoài',
        phonetic: '/ˈmæŋ.ɡəʊ/',
        syllables: ['Man', 'go'],
        emoji: '🥭',
        artBg: '#FEF3C7',
        exampleEn: 'Ripe mango is yellow and juicy.',
        exampleVi: 'Xoài chín có màu vàng và rất thơm ngọt.',
        funFact: 'Mẹo nhớ: "Men-gầu" – Quả xoài chín vàng thơm lừng!'
      }
    ]
  },
  {
    id: 'school',
    titleVi: 'Đồ Dùng & Đồ Chơi',
    titleEn: 'School & Toys',
    icon: '🎒',
    description: 'Hành trang cho bé 6 tuổi chuẩn bị vào lớp 1 thật tự tin!',
    theme: {
      accent: '#14B8A6',
      border: '#2DD4BF',
      shadow: '#0D9488',
      bgSoft: '#CCFBF1'
    },
    cards: [
      {
        id: 'sch_book',
        en: 'Book',
        vi: 'Quyển Sách',
        phonetic: '/bʊk/',
        syllables: ['Book'],
        emoji: '📘',
        artBg: '#DBEAFE',
        exampleEn: 'I read a picture book every day.',
        exampleVi: 'Tớ đọc sách tranh mỗi ngày.',
        funFact: 'Mẹo nhớ: "Búc" – Mở trang sách ra là bao nhiêu điều kỳ diệu!'
      },
      {
        id: 'sch_pencil',
        en: 'Pencil',
        vi: 'Bút Chì',
        phonetic: '/ˈpen.səl/',
        syllables: ['Pen', 'cil'],
        emoji: '✏️',
        artBg: '#FEF9C3',
        exampleEn: 'I write my name with a pencil.',
        exampleVi: 'Tớ viết tên mình bằng chiếc bút chì.',
        funFact: 'Mẹo nhớ: "Pen-xồ" là bút chì tập viết cho học sinh lớp 1!'
      },
      {
        id: 'sch_backpack',
        en: 'Backpack',
        vi: 'Cặp Sách / Ba Lô',
        phonetic: '/ˈbæk.pæk/',
        syllables: ['Back', 'pack'],
        emoji: '🎒',
        artBg: '#FEE2E2',
        exampleEn: 'My school backpack is ready.',
        exampleVi: 'Chiếc cặp đi học của tớ đã sẵn sàng.',
        funFact: 'Mẹo nhớ: Ghép "Back" (sau lưng) + "Pack" (túi) = Chiếc ba lô đeo lưng!'
      },
      {
        id: 'sch_ball',
        en: 'Ball',
        vi: 'Quả Bóng',
        phonetic: '/bɔːl/',
        syllables: ['Ball'],
        emoji: '⚽',
        artBg: '#DCFCE7',
        exampleEn: 'Kick the ball into the goal!',
        exampleVi: 'Sút quả bóng vào khung thành nào!',
        funFact: 'Mẹo nhớ: Đọc là "Bô" – Quả bóng tròn lăn tròn trên sân!'
      },
      {
        id: 'sch_robot',
        en: 'Robot',
        vi: 'Người Máy',
        phonetic: '/ˈrəʊ.bɒt/',
        syllables: ['Ro', 'bot'],
        emoji: '🤖',
        artBg: '#E0F2FE',
        exampleEn: 'The toy robot can walk and dance.',
        exampleVi: 'Chú người máy đồ chơi biết đi và nhảy múa.',
        funFact: 'Mẹo nhớ: "Râu-bọt" – Gần giống hệt cách gọi Robot trong tiếng Việt!'
      },
      {
        id: 'sch_teddy',
        en: 'Teddy Bear',
        vi: 'Gấu Bông',
        phonetic: '/ˈted.i ˌbeər/',
        syllables: ['Ted', 'dy', 'Bear'],
        emoji: '🧸',
        artBg: '#FFEDD5',
        exampleEn: 'I hug my soft teddy bear to sleep.',
        exampleVi: 'Tớ ôm bạn gấu bông mềm mại đi ngủ.',
        funFact: 'Mẹo nhớ: Bạn gấu bông ấm áp luôn đồng hành cùng bé!'
      }
    ]
  }
];

/* ==========================================================================
   App State & LocalStorage Persistence
   ========================================================================== */
const STORAGE_KEY = 'english4kids_v1_progress';

const state = {
  stars: 0,
  learnedIds: new Set(),
  soundEnabled: true,
  currentTopicId: 'animals',
  currentCardIndex: 0,
  isFlipped: false,
  activeMode: 'learn', // 'learn' | 'quiz'
  quiz: {
    pool: [],
    currentIndex: 0,
    streak: 0,
    currentAnswer: null,
    answered: false
  }
};

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (typeof parsed.stars === 'number') state.stars = parsed.stars;
    if (Array.isArray(parsed.learnedIds)) {
      state.learnedIds = new Set(parsed.learnedIds);
    }
    if (typeof parsed.soundEnabled === 'boolean') {
      state.soundEnabled = parsed.soundEnabled;
    }
  } catch (err) {
    console.warn('Could not read saved progress:', err);
  }
}

function saveProgress() {
  try {
    const payload = {
      stars: state.stars,
      learnedIds: Array.from(state.learnedIds),
      soundEnabled: state.soundEnabled
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.warn('Could not save progress:', err);
  }
}

/* ==========================================================================
   Web Audio API Synthesized Sound Effects (No external MP3 required)
   ========================================================================== */
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playSoundEffect(type) {
  if (!state.soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  if (type === 'pop' || type === 'flip') {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(type === 'pop' ? 520 : 380, now);
    osc.frequency.exponentialRampToValueAtTime(type === 'pop' ? 780 : 620, now + 0.09);
    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  } else if (type === 'star' || type === 'correct') {
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      const startTime = now + idx * 0.075;
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.18, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.23);
    });
  } else if (type === 'wrong') {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(240, now);
    osc.frequency.linearRampToValueAtTime(170, now + 0.22);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  }
}

/* ==========================================================================
   Web Speech API - English Pronunciation (Normal, Slow & Spelling)
   ========================================================================== */
function speakEnglish(text, rate = 0.9) {
  if (!('speechSynthesis' in window)) {
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = rate;
  utterance.pitch = 1.1; // Friendly, clear pitch for children

  const voices = window.speechSynthesis.getVoices();
  const preferredVoice =
    voices.find(v => v.lang === 'en-US' && /Google|Samantha|Natural|Zira|Aria/i.test(v.name)) ||
    voices.find(v => v.lang.startsWith('en-US')) ||
    voices.find(v => v.lang.startsWith('en'));

  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  const speakBtn = document.getElementById('btn-speak-normal');
  if (speakBtn) speakBtn.classList.add('speaking');

  utterance.onend = () => {
    if (speakBtn) speakBtn.classList.remove('speaking');
  };
  utterance.onerror = () => {
    if (speakBtn) speakBtn.classList.remove('speaking');
  };

  window.speechSynthesis.speak(utterance);
}

function spellWordOutLoud(word) {
  const letters = word
    .replace(/[^a-zA-Z]/g, '')
    .toUpperCase()
    .split('');
  const spelledSequence = `${ letters.join('. ') }. ${ word }!`;
  speakEnglish(spelledSequence, 0.78);
}

/* ==========================================================================
   UI Rendering: Header Stats & Home Topic Cards
   ========================================================================== */
function updateHeaderAndMissionUI() {
  const totalStarsEl = document.getElementById('total-stars-count');
  const totalLearnedEl = document.getElementById('total-learned-count');
  const missionTextEl = document.getElementById('daily-mission-text');
  const missionBarEl = document.getElementById('daily-mission-bar');
  const soundIconEl = document.getElementById('sound-toggle-icon');

  const learnedCount = state.learnedIds.size;
  totalStarsEl.textContent = state.stars;
  totalLearnedEl.textContent = learnedCount;

  const dailyGoal = 5;
  const missionCount = Math.min(learnedCount, dailyGoal);
  const percent = Math.round((missionCount / dailyGoal) * 100);
  missionTextEl.textContent = `${ missionCount } / ${ dailyGoal } từ`;
  missionBarEl.style.width = `${ percent }%`;

  soundIconEl.textContent = state.soundEnabled ? '🔊' : '🔇';
}

function renderTopicsGrid() {
  const grid = document.getElementById('topics-grid');
  grid.innerHTML = '';

  TOPICS_DATA.forEach(topic => {
    const learnedInTopic = topic.cards.filter(c => state.learnedIds.has(c.id)).length;
    const totalInTopic = topic.cards.length;

    const cardBtn = document.createElement('button');
    cardBtn.type = 'button';
    cardBtn.className = 'topic-card';
    cardBtn.id = `topic-card-${ topic.id }`;
    cardBtn.style.setProperty('--topic-accent', topic.theme.accent);
    cardBtn.style.setProperty('--topic-border', topic.theme.border);
    cardBtn.style.setProperty('--topic-shadow', topic.theme.shadow);
    cardBtn.style.setProperty('--topic-bg-soft', topic.theme.bgSoft);

    cardBtn.innerHTML = `
      <div>
        <div class="topic-card-top">
          <div class="topic-icon-bubble" aria-hidden="true">${ topic.icon }</div>
          <div class="topic-info">
            <h3>${ topic.titleVi }</h3>
            <span class="topic-en-subtitle">${ topic.titleEn }</span>
          </div>
        </div>
        <p class="topic-desc" style="margin-top: 12px;">${ topic.description }</p>
      </div>
      <div class="topic-card-footer">
        <span class="topic-progress-badge">
          ⭐ Đã thuộc: <strong>${ learnedInTopic }/${ totalInTopic }</strong>
        </span>
        <span class="topic-play-cta">Học ngay ➔</span>
      </div>
    `;

    cardBtn.addEventListener('click', () => {
      playSoundEffect('pop');
      openTopicDeck(topic.id, 'learn');
    });

    grid.appendChild(cardBtn);
  });
}

/* ==========================================================================
   UI Rendering: Flashcard Deck View
   ========================================================================== */
function getCurrentTopic() {
  return TOPICS_DATA.find(t => t.id === state.currentTopicId) || TOPICS_DATA[0];
}

function openTopicDeck(topicId, initialMode = 'learn') {
  state.currentTopicId = topicId;
  state.currentCardIndex = 0;
  state.isFlipped = false;

  document.getElementById('view-home').classList.remove('active');
  document.getElementById('view-flashcard').classList.add('active');

  const topic = getCurrentTopic();
  document.getElementById('current-topic-icon').textContent = topic.icon;
  document.getElementById('current-topic-title').textContent = `${ topic.titleVi } (${ topic.titleEn })`;

  const flashcard3d = document.getElementById('flashcard-3d');
  flashcard3d.style.setProperty('--card-accent-border', topic.theme.border);
  flashcard3d.style.setProperty('--card-accent-shadow', topic.theme.shadow);

  switchMode(initialMode);
}

function switchMode(mode) {
  state.activeMode = mode;
  const tabLearn = document.getElementById('tab-mode-learn');
  const tabQuiz = document.getElementById('tab-mode-quiz');
  const subviewLearn = document.getElementById('subview-learn');
  const subviewQuiz = document.getElementById('subview-quiz');
  const dotsBar = document.getElementById('card-dots-bar');

  if (mode === 'learn') {
    tabLearn.classList.add('active');
    tabLearn.setAttribute('aria-selected', 'true');
    tabQuiz.classList.remove('active');
    tabQuiz.setAttribute('aria-selected', 'false');

    subviewLearn.classList.remove('hidden');
    dotsBar.classList.remove('hidden');
    subviewQuiz.classList.add('hidden');

    renderCurrentFlashcard(true);
  } else {
    tabQuiz.classList.add('active');
    tabQuiz.setAttribute('aria-selected', 'true');
    tabLearn.classList.remove('active');
    tabLearn.setAttribute('aria-selected', 'false');

    subviewLearn.classList.add('hidden');
    dotsBar.classList.add('hidden');
    subviewQuiz.classList.remove('hidden');

    startTopicQuiz(getCurrentTopic().cards);
  }
}

function renderCardDots() {
  const topic = getCurrentTopic();
  const dotsBar = document.getElementById('card-dots-bar');
  dotsBar.innerHTML = '';

  topic.cards.forEach((card, index) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'card-dot-btn';
    if (index === state.currentCardIndex) btn.classList.add('active');
    if (state.learnedIds.has(card.id)) btn.classList.add('learned');
    btn.textContent = card.emoji;
    btn.title = `${ card.en } - ${ card.vi }`;

    btn.addEventListener('click', () => {
      playSoundEffect('pop');
      state.currentCardIndex = index;
      state.isFlipped = false;
      renderCurrentFlashcard(true);
    });

    dotsBar.appendChild(btn);
  });
}

function buildCardIllustrationHTML(card) {
  if (card.colorHex) {
    return `
      <div class="color-swatch-giant" style="background: ${ card.colorHex };">
        <span>${ card.emoji }</span>
      </div>
    `;
  }
  if (typeof card.numberVal === 'number') {
    const repeatedIcons = Array.from({ length: card.numberVal }, () => card.countIcon).join('');
    return `
      <div class="number-badge-giant">
        <span>${ card.numberVal }</span>
        <div class="number-dots-row">${ repeatedIcons }</div>
      </div>
    `;
  }
  return `<div class="art-emoji-giant">${ card.emoji }</div>`;
}

function renderCurrentFlashcard(autoSpeak = false) {
  const topic = getCurrentTopic();
  const card = topic.cards[state.currentCardIndex];
  if (!card) return;

  const flashcard3d = document.getElementById('flashcard-3d');
  flashcard3d.classList.toggle('is-flipped', state.isFlipped);

  // Front side elements
  document.getElementById('card-index-badge').textContent = `${ state.currentCardIndex + 1 } / ${ topic.cards.length }`;

  const isLearned = state.learnedIds.has(card.id);
  const learnedBadge = document.getElementById('card-learned-badge');
  learnedBadge.classList.toggle('visible', isLearned);

  const artBox = document.getElementById('card-illustration-box');
  artBox.style.setProperty('--card-art-bg', card.artBg || '#FFF5D6');
  artBox.innerHTML = buildCardIllustrationHTML(card);

  document.getElementById('card-en-word').textContent = card.en;
  document.getElementById('card-phonetic').textContent = card.phonetic;

  const syllablesEl = document.getElementById('card-syllables');
  syllablesEl.innerHTML = card.syllables
    .map(syl => `<span class="syllable-chip">${ syl }</span>`)
    .join('');

  // Back side elements
  document.getElementById('back-mini-illustration').textContent = card.emoji;
  document.getElementById('back-en-word').textContent = `${ card.en } ${ card.phonetic }`;
  document.getElementById('back-vi-word').textContent = card.vi;
  document.getElementById('card-example-en').textContent = `"${ card.exampleEn }"`;
  document.getElementById('card-example-vi').textContent = card.exampleVi;
  document.getElementById('card-fact-text').textContent = card.funFact;

  // Mastered button state
  const markBtn = document.getElementById('btn-mark-learned');
  const markIcon = document.getElementById('mark-learned-icon');
  const markText = document.getElementById('mark-learned-text');

  if (isLearned) {
    markBtn.classList.add('is-learned');
    markIcon.textContent = '🌟';
    markText.textContent = 'Đã thuộc! (Nhận +1 Sao)';
  } else {
    markBtn.classList.remove('is-learned');
    markIcon.textContent = '⭐';
    markText.textContent = 'Bé đã thuộc từ này!';
  }

  renderCardDots();

  if (autoSpeak) {
    setTimeout(() => speakEnglish(card.en, 0.88), 180);
  }
}

function flipFlashcard() {
  state.isFlipped = !state.isFlipped;
  playSoundEffect('flip');
  const flashcard3d = document.getElementById('flashcard-3d');
  flashcard3d.classList.toggle('is-flipped', state.isFlipped);
}

function navigateCard(delta) {
  const topic = getCurrentTopic();
  const count = topic.cards.length;
  state.currentCardIndex = (state.currentCardIndex + delta + count) % count;
  state.isFlipped = false;
  playSoundEffect('pop');
  renderCurrentFlashcard(true);
}

function toggleMarkCardLearned() {
  const topic = getCurrentTopic();
  const card = topic.cards[state.currentCardIndex];
  if (!card) return;

  if (!state.learnedIds.has(card.id)) {
    state.learnedIds.add(card.id);
    state.stars += 1;
    playSoundEffect('star');
    launchConfettiBurst();
    speakEnglish(`Awesome! ${ card.en }!`, 0.95);
  } else {
    state.learnedIds.delete(card.id);
    state.stars = Math.max(0, state.stars - 1);
    playSoundEffect('pop');
  }

  saveProgress();
  updateHeaderAndMissionUI();
  renderCurrentFlashcard(false);
}

/* ==========================================================================
   Listening Mini-Quiz Mode (Interactive Audio Challenge)
   ========================================================================== */
function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function startTopicQuiz(cardsPool) {
  const allCards = TOPICS_DATA.flatMap(t => t.cards);
  const sourceCards = cardsPool && cardsPool.length >= 4 ? cardsPool : allCards;

  state.quiz.pool = shuffleArray(sourceCards).slice(0, 6);
  state.quiz.currentIndex = 0;
  state.quiz.streak = 0;

  renderQuizQuestion();
}

function renderQuizQuestion() {
  const qIndex = state.quiz.currentIndex;
  const totalQ = state.quiz.pool.length;
  const targetCard = state.quiz.pool[qIndex];
  state.quiz.currentAnswer = targetCard;
  state.quiz.answered = false;

  document.getElementById('quiz-progress-label').textContent = `Câu ${ qIndex + 1 } / ${ totalQ }`;
  document.getElementById('quiz-streak-label').textContent = `🔥 Chuỗi đúng: ${ state.quiz.streak }`;

  const wordReveal = document.getElementById('quiz-word-reveal');
  wordReveal.textContent = targetCard.en;
  wordReveal.classList.add('hidden');

  document.getElementById('quiz-feedback-banner').classList.add('hidden');

  // Build 4 options (1 target + 3 distractors)
  const allCards = TOPICS_DATA.flatMap(t => t.cards);
  const distractors = shuffleArray(allCards.filter(c => c.id !== targetCard.id)).slice(0, 3);
  const options = shuffleArray([targetCard, ...distractors]);

  const grid = document.getElementById('quiz-options-grid');
  grid.innerHTML = '';

  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'quiz-option-btn';
    btn.dataset.cardId = opt.id;
    btn.innerHTML = `
      <span class="opt-emoji">${ opt.emoji }</span>
      <span class="opt-vi-label">${ opt.vi }</span>
    `;

    btn.addEventListener('click', () => handleQuizOptionClick(btn, opt));
    grid.appendChild(btn);
  });

  setTimeout(() => speakEnglish(targetCard.en, 0.86), 220);
}

function handleQuizOptionClick(clickedBtn, chosenCard) {
  if (state.quiz.answered) return;
  const target = state.quiz.currentAnswer;

  if (chosenCard.id === target.id) {
    state.quiz.answered = true;
    state.quiz.streak += 1;
    state.stars += 2;
    state.learnedIds.add(target.id);
    saveProgress();
    updateHeaderAndMissionUI();

    clickedBtn.classList.add('correct');
    playSoundEffect('correct');
    launchConfettiBurst();
    speakEnglish(`Great job! ${ target.en }!`, 0.95);

    const wordReveal = document.getElementById('quiz-word-reveal');
    wordReveal.classList.remove('hidden');

    const banner = document.getElementById('quiz-feedback-banner');
    const msg = document.getElementById('quiz-feedback-msg');
    const nextBtn = document.getElementById('btn-quiz-next');

    const isLast = state.quiz.currentIndex >= state.quiz.pool.length - 1;
    msg.textContent = `🎉 Giỏi quá! "${ target.en }" là ${ target.vi }! (+2 Sao)`;
    nextBtn.textContent = isLast ? '🏆 Hoàn thành & Chơi lại' : 'Câu tiếp theo ➔';
    banner.classList.remove('hidden');
    document.getElementById('quiz-streak-label').textContent = `🔥 Chuỗi đúng: ${ state.quiz.streak }`;
  } else {
    state.quiz.streak = 0;
    document.getElementById('quiz-streak-label').textContent = `🔥 Chuỗi đúng: 0`;
    clickedBtn.classList.add('wrong');
    clickedBtn.disabled = true;
    playSoundEffect('wrong');
    speakEnglish(target.en, 0.85);
  }
}

/* ==========================================================================
   Celebration Confetti Particle System
   ========================================================================== */
function launchConfettiBurst() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#FF7A00', '#FFC700', '#22C55E', '#22A2F2', '#FF4D8D', '#A855F7'];
  const particles = Array.from({ length: 55 }, () => ({
    x: canvas.width / 2 + (Math.random() - 0.5) * 140,
    y: canvas.height * 0.45,
    vx: (Math.random() - 0.5) * 14,
    vy: -Math.random() * 13 - 4,
    size: Math.random() * 9 + 6,
    color: colors[Math.floor(Math.random() * colors.length)],
    rotation: Math.random() * 360,
    vRot: (Math.random() - 0.5) * 12,
    gravity: 0.42
  }));

  let frameCount = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let activeParticles = 0;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.vRot;

      if (p.y < canvas.height + 30) {
        activeParticles++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
        ctx.restore();
      }
    });

    frameCount++;
    if (activeParticles > 0 && frameCount < 110) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  requestAnimationFrame(animate);
}

/* ==========================================================================
   Event Listeners & Initialization
   ========================================================================== */
function bindEvents() {
  // Navigation back to Home
  const goHome = () => {
    playSoundEffect('pop');
    document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));
    document.getElementById('view-home').classList.add('active');
    renderTopicsGrid();
  };

  document.getElementById('btn-home-logo').addEventListener('click', goHome);
  document.getElementById('btn-back-to-home').addEventListener('click', goHome);

  // Quick Quiz All Topics button on Home
  document.getElementById('btn-quick-quiz-all').addEventListener('click', () => {
    playSoundEffect('pop');
    openTopicDeck(TOPICS_DATA[0].id, 'quiz');
    const allCards = TOPICS_DATA.flatMap(t => t.cards);
    document.getElementById('current-topic-icon').textContent = '🎮';
    document.getElementById('current-topic-title').textContent = 'Ôn Tập Tất Cả Chủ Đề';
    startTopicQuiz(allCards);
  });

  // Sound toggle
  document.getElementById('btn-sound-toggle').addEventListener('click', () => {
    state.soundEnabled = !state.soundEnabled;
    saveProgress();
    updateHeaderAndMissionUI();
    if (state.soundEnabled) playSoundEffect('pop');
  });

  // Mode tabs inside Flashcard Deck
  document.getElementById('tab-mode-learn').addEventListener('click', () => {
    playSoundEffect('pop');
    switchMode('learn');
  });

  document.getElementById('tab-mode-quiz').addEventListener('click', () => {
    playSoundEffect('pop');
    switchMode('quiz');
  });

  // Flashcard 3D flip interactions
  const flashcard3d = document.getElementById('flashcard-3d');
  flashcard3d.addEventListener('click', e => {
    if (e.target.closest('button')) return;
    flipFlashcard();
  });

  flashcard3d.addEventListener('keydown', e => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      flipFlashcard();
    }
  });

  document.getElementById('btn-toggle-flip').addEventListener('click', flipFlashcard);
  document.getElementById('btn-flip-to-front').addEventListener('click', e => {
    e.stopPropagation();
    flipFlashcard();
  });

  // Audio controls on card
  document.getElementById('btn-speak-normal').addEventListener('click', e => {
    e.stopPropagation();
    const card = getCurrentTopic().cards[state.currentCardIndex];
    if (card) speakEnglish(card.en, 0.9);
  });

  document.getElementById('btn-speak-slow').addEventListener('click', e => {
    e.stopPropagation();
    const card = getCurrentTopic().cards[state.currentCardIndex];
    if (card) speakEnglish(card.en, 0.55);
  });

  document.getElementById('btn-speak-spell').addEventListener('click', e => {
    e.stopPropagation();
    const card = getCurrentTopic().cards[state.currentCardIndex];
    if (card) spellWordOutLoud(card.en);
  });

  document.getElementById('btn-speak-sentence').addEventListener('click', e => {
    e.stopPropagation();
    const card = getCurrentTopic().cards[state.currentCardIndex];
    if (card) speakEnglish(card.exampleEn, 0.85);
  });

  // Prev / Next Card Arrows + Keyboard Arrows
  document.getElementById('btn-prev-card').addEventListener('click', () => navigateCard(-1));
  document.getElementById('btn-next-card').addEventListener('click', () => navigateCard(1));

  window.addEventListener('keydown', e => {
    const inFlashcardView = document.getElementById('view-flashcard').classList.contains('active');
    if (!inFlashcardView || state.activeMode !== 'learn') return;
    if (e.key === 'ArrowRight') navigateCard(1);
    if (e.key === 'ArrowLeft') navigateCard(-1);
  });

  // Mark as Learned button
  document.getElementById('btn-mark-learned').addEventListener('click', toggleMarkCardLearned);

  // Quiz Buttons
  document.getElementById('btn-quiz-replay').addEventListener('click', () => {
    if (state.quiz.currentAnswer) {
      speakEnglish(state.quiz.currentAnswer.en, 0.85);
    }
  });

  document.getElementById('btn-quiz-show-word').addEventListener('click', () => {
    document.getElementById('quiz-word-reveal').classList.remove('hidden');
  });

  document.getElementById('btn-quiz-next').addEventListener('click', () => {
    playSoundEffect('pop');
    if (state.quiz.currentIndex < state.quiz.pool.length - 1) {
      state.quiz.currentIndex += 1;
      renderQuizQuestion();
    } else {
      startTopicQuiz(getCurrentTopic().cards);
    }
  });

  // Roadmap Modal
  const roadmapModal = document.getElementById('roadmap-modal');
  const openRoadmap = () => {
    playSoundEffect('pop');
    roadmapModal.classList.remove('hidden');
  };
  const closeRoadmap = () => {
    playSoundEffect('pop');
    roadmapModal.classList.add('hidden');
  };

  document.getElementById('btn-roadmap-modal').addEventListener('click', openRoadmap);
  document.getElementById('btn-close-roadmap').addEventListener('click', closeRoadmap);
  document.getElementById('btn-ok-roadmap').addEventListener('click', closeRoadmap);

  document.getElementById('btn-reset-progress').addEventListener('click', () => {
    state.stars = 0;
    state.learnedIds.clear();
    saveProgress();
    updateHeaderAndMissionUI();
    renderTopicsGrid();
    closeRoadmap();
  });
}

// Preload SpeechSynthesis voices on browsers that load them asynchronously
if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}

document.addEventListener('DOMContentLoaded', () => {
  loadProgress();
  updateHeaderAndMissionUI();
  renderTopicsGrid();
  bindEvents();
});
