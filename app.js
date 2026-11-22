/**
 * English4Kids - Core Flashcards & Interactive Audio Learning Engine (Age 6)
 * Features:
 * - 12 Rich Topics (134+ Curated Flashcards matching Grade 1 / Cambridge Starters)
 * - IPA phonetics, syllables, Vietnamese meanings, example sentences, memory tips.
 * - Web Speech API pronunciation (Normal, Slow turtle speed, Spelling mode).
 * - Web Audio API synthesized sound effects + LocalStorage persistence.
 */

const TOPICS_DATA = [
  {
    id: 'animals',
    titleVi: 'Động Vật Đáng Yêu',
    titleEn: 'Cute Animals',
    icon: '🦁',
    description: 'Làm quen với 12 bạn thú ngộ nghĩnh trong rừng, dưới nước và quanh nhà!',
    theme: { accent: '#FF7A00', border: '#FFD24C', shadow: '#E5B21D', bgSoft: '#FFF4D6' },
    cards: [
      { id: 'ani_lion', en: 'Lion', vi: 'Con Sư Tử', phonetic: '/ˈlaɪ.ən/', syllables: ['Li', 'on'], emoji: '🦁', artBg: '#FFF3C4', exampleEn: 'The lion is the king of the jungle.', exampleVi: 'Sư tử là chúa tể rừng xanh.', funFact: 'Mẹo nhớ: Sư tử có chiếc bờm xù quanh cổ và tiếng gầm thật vang!' },
      { id: 'ani_elephant', en: 'Elephant', vi: 'Con Voi', phonetic: '/ˈel.ɪ.fənt/', syllables: ['El', 'e', 'phant'], emoji: '🐘', artBg: '#E0F2FE', exampleEn: 'The elephant has a long trunk.', exampleVi: 'Bạn voi có chiếc vòi thật dài.', funFact: 'Mẹo nhớ: Đọc là "E-li-phần" – bạn voi to lớn thích phun nước bằng vòi!' },
      { id: 'ani_monkey', en: 'Monkey', vi: 'Con Khỉ', phonetic: '/ˈmʌŋ.ki/', syllables: ['Mon', 'key'], emoji: '🐵', artBg: '#FEF3C7', exampleEn: 'The monkey loves eating bananas.', exampleVi: 'Bạn khỉ rất thích ăn chuối chín.', funFact: 'Mẹo nhớ: "Măn-ki" leo trèo thoăn thoắt trên cành cây!' },
      { id: 'ani_rabbit', en: 'Rabbit', vi: 'Con Thỏ', phonetic: '/ˈræb.ɪt/', syllables: ['Rab', 'bit'], emoji: '🐰', artBg: '#FCE7F3', exampleEn: 'The white rabbit has long ears.', exampleVi: 'Bạn thỏ trắng có đôi tai dài.', funFact: 'Mẹo nhớ: Thỏ "Ráp-bịt" nhảy tưng tưng và mê ăn cà rốt!' },
      { id: 'ani_dog', en: 'Dog', vi: 'Con Chó', phonetic: '/dɒɡ/', syllables: ['Dog'], emoji: '🐶', artBg: '#FFEDD5', exampleEn: 'My dog is very friendly.', exampleVi: 'Bạn cún nhà tớ rất thân thiện.', funFact: 'Mẹo nhớ: Cún con vẫy đuôi mừng mỗi khi bé đi học về!' },
      { id: 'ani_cat', en: 'Cat', vi: 'Con Mèo', phonetic: '/kæt/', syllables: ['Cat'], emoji: '🐱', artBg: '#FEF9C3', exampleEn: 'The cute cat says meow.', exampleVi: 'Bạn mèo xinh kêu meo meo.', funFact: 'Mẹo nhớ: Bắt đầu bằng chữ C – "Két" là bạn mèo thích tắm nắng!' },
      { id: 'ani_duck', en: 'Duck', vi: 'Con Vịt', phonetic: '/dʌk/', syllables: ['Duck'], emoji: '🦆', artBg: '#DCFCE7', exampleEn: 'The yellow duck swims in the pond.', exampleVi: 'Bạn vịt vàng bơi dưới ao.', funFact: 'Mẹo nhớ: Vịt "Đắc" kêu cạp cạp và bơi dưới nước siêu giỏi!' },
      { id: 'ani_tiger', en: 'Tiger', vi: 'Con Hổ', phonetic: '/ˈtaɪ.ɡər/', syllables: ['Ti', 'ger'], emoji: '🐯', artBg: '#FFEDD5', exampleEn: 'The tiger has orange and black stripes.', exampleVi: 'Con hổ có những vệt vằn cam và đen.', funFact: 'Mẹo nhớ: "Tai-gờ" là bạn hổ dũng mãnh với bộ lông vằn sọc!' },
      { id: 'ani_bear', en: 'Bear', vi: 'Con Gấu', phonetic: '/beər/', syllables: ['Bear'], emoji: '🐻', artBg: '#FEF3C7', exampleEn: 'The brown bear likes sweet honey.', exampleVi: 'Bạn gấu nâu thích ăn mật ong ngọt.', funFact: 'Mẹo nhớ: "Be-ờ" – Bạn gấu to tròn rất mê mật ong!' },
      { id: 'ani_frog', en: 'Frog', vi: 'Con Ếch', phonetic: '/frɒɡ/', syllables: ['Frog'], emoji: '🐸', artBg: '#DCFCE7', exampleEn: 'The green frog can jump high.', exampleVi: 'Chú ếch xanh có thể nhảy rất cao.', funFact: 'Mẹo nhớ: "Phờ-rọc" – Chú ếch xanh ngồi trên lá sen kêu ộp ộp!' },
      { id: 'ani_bird', en: 'Bird', vi: 'Con Chim', phonetic: '/bɜːd/', syllables: ['Bird'], emoji: '🐦', artBg: '#E0F2FE', exampleEn: 'The little bird sings in the tree.', exampleVi: 'Chú chim nhỏ hót líu lo trên cây.', funFact: 'Mẹo nhớ: "Bớt" – Bạn chim có đôi cánh bay lượn trên bầu trời!' },
      { id: 'ani_fish', en: 'Fish', vi: 'Con Cá', phonetic: '/fɪʃ/', syllables: ['Fish'], emoji: '🐟', artBg: '#DBEAFE', exampleEn: 'The colorful fish swims in the water.', exampleVi: 'Bạn cá nhiều màu bơi tung tăng dưới nước.', funFact: 'Mẹo nhớ: "Phít-sờ" – Bạn cá thở bong bóng dưới nước!' }
    ]
  },
  {
    id: 'colors',
    titleVi: 'Thế Giới Màu Sắc',
    titleEn: 'Bright Colors',
    icon: '🎨',
    description: 'Khám phá 10 sắc màu cầu vồng rực rỡ xung quanh bé!',
    theme: { accent: '#FF4D8D', border: '#F472B6', shadow: '#DB2777', bgSoft: '#FCE7F3' },
    cards: [
      { id: 'col_red', en: 'Red', vi: 'Màu Đỏ', phonetic: '/red/', syllables: ['Red'], emoji: '🍓', colorHex: '#EF4444', artBg: '#FEE2E2', exampleEn: 'This strawberry is bright red.', exampleVi: 'Quả dâu tây này có màu đỏ tươi.', funFact: 'Mẹo nhớ: "Rét" – Màu đỏ rực rỡ như quả dâu tây và xe cứu hỏa!' },
      { id: 'col_blue', en: 'Blue', vi: 'Màu Xanh Dương', phonetic: '/bluː/', syllables: ['Blue'], emoji: '🐳', colorHex: '#3B82F6', artBg: '#DBEAFE', exampleEn: 'The sky and the ocean are blue.', exampleVi: 'Bầu trời và biển cả có màu xanh dương.', funFact: 'Mẹo nhớ: "Bờ-lu" – Xanh mát như bầu trời buổi sáng!' },
      { id: 'col_yellow', en: 'Yellow', vi: 'Màu Vàng', phonetic: '/ˈjel.əʊ/', syllables: ['Yel', 'low'], emoji: '🌻', colorHex: '#FACC15', artBg: '#FEF9C3', exampleEn: 'The sun is bright yellow.', exampleVi: 'Ông mặt trời có màu vàng tươi.', funFact: 'Mẹo nhớ: "De-lầu" – Màu vàng ấm áp của hoa hướng dương!' },
      { id: 'col_green', en: 'Green', vi: 'Màu Xanh Lá', phonetic: '/ɡriːn/', syllables: ['Green'], emoji: '🌿', colorHex: '#22C55E', artBg: '#DCFCE7', exampleEn: 'The leaves on the tree are green.', exampleVi: 'Những chiếc lá trên cây có màu xanh lá.', funFact: 'Mẹo nhớ: "Gờ-rin" – Màu xanh tươi mát của cỏ cây và chú ếch!' },
      { id: 'col_orange', en: 'Orange', vi: 'Màu Cam', phonetic: '/ˈɒr.ɪndʒ/', syllables: ['Or', 'ange'], emoji: '🍊', colorHex: '#F97316', artBg: '#FFEDD5', exampleEn: 'Carrots and pumpkins are orange.', exampleVi: 'Củ cà rốt và quả bí ngô có màu cam.', funFact: 'Mẹo nhớ: Từ "Orange" vừa là màu cam, vừa là quả cam mọng nước!' },
      { id: 'col_pink', en: 'Pink', vi: 'Màu Hồng', phonetic: '/pɪŋk/', syllables: ['Pink'], emoji: '🦩', colorHex: '#EC4899', artBg: '#FCE7F3', exampleEn: 'She likes her pink dress.', exampleVi: 'Bạn ấy thích chiếc váy màu hồng của mình.', funFact: 'Mẹo nhớ: "Pinh" – Màu hồng ngọt ngào như kẹo bông gòn!' },
      { id: 'col_purple', en: 'Purple', vi: 'Màu Tím', phonetic: '/ˈpɜː.pəl/', syllables: ['Pur', 'ple'], emoji: '🍇', colorHex: '#A855F7', artBg: '#F3E8FF', exampleEn: 'These sweet grapes are purple.', exampleVi: 'Chùm nho ngọt này có màu tím.', funFact: 'Mẹo nhớ: "Pơ-pồ" – Khi pha màu đỏ với xanh dương sẽ ra màu tím!' },
      { id: 'col_white', en: 'White', vi: 'Màu Trắng', phonetic: '/waɪt/', syllables: ['White'], emoji: '⛄', colorHex: '#FFFFFF', artBg: '#E2E8F0', exampleEn: 'The clouds and snow are white.', exampleVi: 'Những đám mây và tuyết có màu trắng.', funFact: 'Mẹo nhớ: "Oai-tờ" – Trắng tinh như người tuyết và đám mây!' },
      { id: 'col_black', en: 'Black', vi: 'Màu Đen', phonetic: '/blæk/', syllables: ['Black'], emoji: '🐼', colorHex: '#1E293B', artBg: '#E2E8F0', exampleEn: 'The night sky is black.', exampleVi: 'Bầu trời ban đêm có màu đen.', funFact: 'Mẹo nhớ: "Bờ-lách" – Đen nhánh như đôi tai bạn gấu trúc!' },
      { id: 'col_brown', en: 'Brown', vi: 'Màu Nâu', phonetic: '/braʊn/', syllables: ['Brown'], emoji: '🍫', colorHex: '#92400E', artBg: '#FFEDD5', exampleEn: 'Chocolate and tree trunks are brown.', exampleVi: 'Sô-cô-la và thân cây có màu nâu.', funFact: 'Mẹo nhớ: "Bờ-rao" – Màu nâu ngọt ngào của thanh sô-cô-la!' }
    ]
  },
  {
    id: 'family',
    titleVi: 'Gia Đình Thân Yêu',
    titleEn: 'My Family',
    icon: '👨‍👩‍👧‍👦',
    description: 'Cách gọi Ông Bà, Bố Mẹ, Cô Chú và Anh Chị Em bằng tiếng Anh!',
    theme: { accent: '#22A2F2', border: '#60A5FA', shadow: '#2563EB', bgSoft: '#DBEAFE' },
    cards: [
      { id: 'fam_father', en: 'Father', vi: 'Bố / Ba', phonetic: '/ˈfɑː.ðər/', syllables: ['Fa', 'ther'], emoji: '👨', artBg: '#DBEAFE', exampleEn: 'My father plays football with me.', exampleVi: 'Bố chơi đá bóng cùng với tớ.', funFact: 'Mẹo nhớ: Ngoài "Father", bé có thể gọi thân mật là "Daddy" hoặc "Dad"!' },
      { id: 'fam_mother', en: 'Mother', vi: 'Mẹ / Má', phonetic: '/ˈmʌð.ər/', syllables: ['Mo', 'ther'], emoji: '👩', artBg: '#FCE7F3', exampleEn: 'My mother tells me bedtime stories.', exampleVi: 'Mẹ kể chuyện chúc ngủ ngon cho tớ.', funFact: 'Mẹo nhớ: Bé cũng có thể gọi mẹ yêu là "Mommy" hoặc "Mom" nhé!' },
      { id: 'fam_brother', en: 'Brother', vi: 'Anh / Em Trai', phonetic: '/ˈbrʌð.ər/', syllables: ['Bro', 'ther'], emoji: '👦', artBg: '#E0F2FE', exampleEn: 'My brother shares his toys with me.', exampleVi: 'Anh trai chia sẻ đồ chơi cùng tớ.', funFact: 'Mẹo nhớ: "Bờ-ra-đờ" là anh trai hoặc em trai trong nhà!' },
      { id: 'fam_sister', en: 'Sister', vi: 'Chị / Em Gái', phonetic: '/ˈsɪs.tər/', syllables: ['Sis', 'ter'], emoji: '👧', artBg: '#FCE7F3', exampleEn: 'My sister loves drawing pictures.', exampleVi: 'Chị gái tớ rất thích vẽ tranh.', funFact: 'Mẹo nhớ: "Xít-xờ-tờ" là chị gái hoặc em gái thân thương!' },
      { id: 'fam_grandpa', en: 'Grandpa', vi: 'Ông (Nội / Ngoại)', phonetic: '/ˈɡræn.pɑː/', syllables: ['Grand', 'pa'], emoji: '👴', artBg: '#FEF3C7', exampleEn: 'Grandpa plants flowers in the garden.', exampleVi: 'Ông trồng nhiều hoa đẹp trong vườn.', funFact: 'Mẹo nhớ: Tên đầy đủ là "Grandfather", gọi thân thương là "Grandpa"!' },
      { id: 'fam_grandma', en: 'Grandma', vi: 'Bà (Nội / Ngoại)', phonetic: '/ˈɡræn.mɑː/', syllables: ['Grand', 'ma'], emoji: '👵', artBg: '#FFEDD5', exampleEn: 'Grandma bakes delicious cookies.', exampleVi: 'Bà nướng những chiếc bánh quy thật thơm ngon.', funFact: 'Mẹo nhớ: Tên đầy đủ là "Grandmother", gọi gần gũi là "Grandma"!' },
      { id: 'fam_baby', en: 'Baby', vi: 'Em Bé', phonetic: '/ˈbeɪ.bi/', syllables: ['Ba', 'by'], emoji: '👶', artBg: '#FEF9C3', exampleEn: 'The little baby has a sweet smile.', exampleVi: 'Em bé nhỏ có nụ cười thật đáng yêu.', funFact: 'Mẹo nhớ: "Bây-bi" là em bé nhỏ xíu hay cười khanh khách!' },
      { id: 'fam_family', en: 'Family', vi: 'Gia Đình', phonetic: '/ˈfæm.əl.i/', syllables: ['Fam', 'i', 'ly'], emoji: '🏡', artBg: '#DCFCE7', exampleEn: 'I love my happy family very much.', exampleVi: 'Tớ yêu gia đình hạnh phúc của tớ rất nhiều.', funFact: 'Mẹo nhớ: "Phe-mi-li" là tổ ấm có ông bà, bố mẹ và các con!' },
      { id: 'fam_uncle', en: 'Uncle', vi: 'Chú / Bác / Cậu', phonetic: '/ˈʌŋ.kəl/', syllables: ['Un', 'cle'], emoji: '🧔', artBg: '#E0F2FE', exampleEn: 'My uncle gives me a new bike.', exampleVi: 'Chú tớ tặng tớ một chiếc xe đạp mới.', funFact: 'Mẹo nhớ: "Ăng-cồ" dùng để gọi chú, bác hoặc cậu!' },
      { id: 'fam_aunt', en: 'Aunt', vi: 'Cô / Dì / Bác Gái', phonetic: '/ɑːnt/', syllables: ['Aunt'], emoji: '👱‍♀️', artBg: '#FCE7F3', exampleEn: 'My aunt makes tasty juice.', exampleVi: 'Cô tớ pha nước ép trái cây rất ngon.', funFact: 'Mẹo nhớ: "An-tờ" dùng để gọi cô, dì hoặc bác gái!' }
    ]
  },
  {
    id: 'numbers',
    titleVi: 'Bé Tập Đếm 1–20',
    titleEn: 'Numbers 1 to 20',
    icon: '🔢',
    description: 'Tập đếm trọn vẹn từ 1 đến 20 bằng tiếng Anh chuẩn lớp 1!',
    theme: { accent: '#22C55E', border: '#4ADE80', shadow: '#16A34A', bgSoft: '#DCFCE7' },
    cards: [
      { id: 'num_1', en: 'One', vi: 'Số Một (1)', phonetic: '/wʌn/', syllables: ['One'], numberVal: 1, emoji: '1️⃣', countIcon: '⭐', artBg: '#FEF9C3', exampleEn: 'I have one bright red apple.', exampleVi: 'Tớ có một quả táo đỏ tươi.', funFact: 'Mẹo nhớ: Đọc là "Oăn" – Giơ 1 ngón tay trỏ lên nào!' },
      { id: 'num_2', en: 'Two', vi: 'Số Hai (2)', phonetic: '/tuː/', syllables: ['Two'], numberVal: 2, emoji: '2️⃣', countIcon: '🍒', artBg: '#DBEAFE', exampleEn: 'We have two hands and two eyes.', exampleVi: 'Chúng mình có hai bàn tay và hai con mắt.', funFact: 'Mẹo nhớ: Đọc là "Tu" – Giơ 2 ngón tay chữ V chiến thắng!' },
      { id: 'num_3', en: 'Three', vi: 'Số Ba (3)', phonetic: '/θriː/', syllables: ['Three'], numberVal: 3, emoji: '3️⃣', countIcon: '🎈', artBg: '#FCE7F3', exampleEn: 'There are three balloons in the sky.', exampleVi: 'Có ba quả bóng bay trên bầu trời.', funFact: 'Mẹo nhớ: Đọc là "Thờ-ri" – Ba quả bóng bay đủ màu!' },
      { id: 'num_4', en: 'Four', vi: 'Số Bốn (4)', phonetic: '/fɔːr/', syllables: ['Four'], numberVal: 4, emoji: '4️⃣', countIcon: '🍀', artBg: '#DCFCE7', exampleEn: 'A car has four round wheels.', exampleVi: 'Chiếc xe ô tô có bốn bánh xe tròn.', funFact: 'Mẹo nhớ: Đọc là "Pho" – Như cỏ bốn lá may mắn!' },
      { id: 'num_5', en: 'Five', vi: 'Số Năm (5)', phonetic: '/faɪv/', syllables: ['Five'], numberVal: 5, emoji: '5️⃣', countIcon: '🖐️', artBg: '#FFEDD5', exampleEn: 'High five with five fingers!', exampleVi: 'Đập tay "High five" với năm ngón tay!', funFact: 'Mẹo nhớ: "Phai-vờ" – Xòe cả bàn tay 5 ngón đập tay High Five!' },
      { id: 'num_6', en: 'Six', vi: 'Số Sáu (6)', phonetic: '/sɪks/', syllables: ['Six'], numberVal: 6, emoji: '6️⃣', countIcon: '🐝', artBg: '#FEF3C7', exampleEn: 'I am six years old today!', exampleVi: 'Hôm nay tớ tròn sáu tuổi rồi!', funFact: 'Mẹo nhớ: "Xích-xờ" – Chính là số tuổi của bé 6 tuổi đó!' },
      { id: 'num_7', en: 'Seven', vi: 'Số Bảy (7)', phonetic: '/ˈsev.ən/', syllables: ['Sev', 'en'], numberVal: 7, emoji: '7️⃣', countIcon: '🌈', artBg: '#E0F2FE', exampleEn: 'A rainbow has seven beautiful colors.', exampleVi: 'Cầu vồng có bảy sắc màu tuyệt đẹp.', funFact: 'Mẹo nhớ: "Xe-vần" – 7 sắc cầu vồng và 7 ngày trong tuần!' },
      { id: 'num_8', en: 'Eight', vi: 'Số Tám (8)', phonetic: '/eɪt/', syllables: ['Eight'], numberVal: 8, emoji: '8️⃣', countIcon: '🐙', artBg: '#F3E8FF', exampleEn: 'An octopus has eight legs.', exampleVi: 'Bạn bạch tuộc có tám cái xúc tu.', funFact: 'Mẹo nhớ: Đọc là "Ấy-tờ" – Bạn bạch tuộc vui tính có 8 chân!' },
      { id: 'num_9', en: 'Nine', vi: 'Số Chín (9)', phonetic: '/naɪn/', syllables: ['Nine'], numberVal: 9, emoji: '9️⃣', countIcon: '🌼', artBg: '#FEF9C3', exampleEn: 'There are nine flowers in the vase.', exampleVi: 'Có chín bông hoa trong lọ.', funFact: 'Mẹo nhớ: "Nai-nờ" – Số 9 lớn hơn số 8 một đơn vị!' },
      { id: 'num_10', en: 'Ten', vi: 'Số Mười (10)', phonetic: '/ten/', syllables: ['Ten'], numberVal: 10, emoji: '🔟', countIcon: '🍎', artBg: '#FEE2E2', exampleEn: 'I have ten fingers on two hands.', exampleVi: 'Tớ có mười ngón tay trên hai bàn tay.', funFact: 'Mẹo nhớ: "Ten" – Điểm 10 tròn trĩnh khi bé chăm ngoan!' },
      { id: 'num_11', en: 'Eleven', vi: 'Số Mười Một (11)', phonetic: '/ɪˈlev.ən/', syllables: ['E', 'lev', 'en'], numberVal: 11, emoji: '11', countIcon: '⭐', artBg: '#DBEAFE', exampleEn: 'A football team has eleven players.', exampleVi: 'Một đội bóng đá có mười một cầu thủ.', funFact: 'Mẹo nhớ: "I-le-vần" – Số 11 giống như 2 bạn đứng cạnh nhau!' },
      { id: 'num_12', en: 'Twelve', vi: 'Số Mười Hai (12)', phonetic: '/twelv/', syllables: ['Twelve'], numberVal: 12, emoji: '12', countIcon: '🕒', artBg: '#FCE7F3', exampleEn: 'A year has twelve months.', exampleVi: 'Một năm có mười hai tháng.', funFact: 'Mẹo nhớ: "Thờ-eo-vờ" – Trên mặt đồng hồ có từ 1 đến 12 giờ!' },
      { id: 'num_13', en: 'Thirteen', vi: 'Số Mười Ba (13)', phonetic: '/ˌθɜːˈtiːn/', syllables: ['Thir', 'teen'], numberVal: 13, emoji: '13', countIcon: '🍬', artBg: '#FEF3C7', exampleEn: 'There are thirteen candies in the jar.', exampleVi: 'Có mười ba viên kẹo trong hũ.', funFact: 'Mẹo nhớ: Từ 13 đến 19 đều có đuôi "-teen" ở cuối!' },
      { id: 'num_14', en: 'Fourteen', vi: 'Số Mười Bốn (14)', phonetic: '/ˌfɔːˈtiːn/', syllables: ['Four', 'teen'], numberVal: 14, emoji: '14', countIcon: '🍓', artBg: '#DCFCE7', exampleEn: 'Fourteen strawberries are on the plate.', exampleVi: 'Có mười bốn quả dâu tây trên đĩa.', funFact: 'Mẹo nhớ: Ghép "Four" (4) + "teen" = Fourteen (14)!' },
      { id: 'num_15', en: 'Fifteen', vi: 'Số Mười Lăm (15)', phonetic: '/ˌfɪfˈtiːn/', syllables: ['Fif', 'teen'], numberVal: 15, emoji: '15', countIcon: '🎈', artBg: '#FFEDD5', exampleEn: 'We wait fifteen minutes for the bus.', exampleVi: 'Chúng mình đợi xe buýt mười lăm phút.', funFact: 'Mẹo nhớ: "Phíp-tin" – Chú ý đọc là "Fif" chứ không phải "Five" nhé!' },
      { id: 'num_16', en: 'Sixteen', vi: 'Số Mười Sáu (16)', phonetic: '/ˌsɪksˈtiːn/', syllables: ['Six', 'teen'], numberVal: 16, emoji: '16', countIcon: '🌟', artBg: '#E0F2FE', exampleEn: 'I counted sixteen stars tonight.', exampleVi: 'Tối nay tớ đếm được mười sáu ngôi sao.', funFact: 'Mẹo nhớ: Ghép "Six" (6) + "teen" = Sixteen (16)!' },
      { id: 'num_17', en: 'Seventeen', vi: 'Số Mười Bảy (17)', phonetic: '/ˌsev.ənˈtiːn/', syllables: ['Sev', 'en', 'teen'], numberVal: 17, emoji: '17', countIcon: '🦋', artBg: '#F3E8FF', exampleEn: 'Seventeen butterflies fly in the garden.', exampleVi: 'Mười bảy chú bướm bay trong vườn.', funFact: 'Mẹo nhớ: Ghép "Seven" (7) + "teen" = Seventeen (17)!' },
      { id: 'num_18', en: 'Eighteen', vi: 'Số Mười Tám (18)', phonetic: '/ˌeɪˈtiːn/', syllables: ['Eigh', 'teen'], numberVal: 18, emoji: '18', countIcon: '🍪', artBg: '#FEF9C3', exampleEn: 'Grandma baked eighteen cookies.', exampleVi: 'Bà nướng mười tám chiếc bánh quy.', funFact: 'Mẹo nhớ: "Ấy-tin" – Ghép số 8 (Eight) với đuôi "-teen"!' },
      { id: 'num_19', en: 'Nineteen', vi: 'Số Mười Chín (19)', phonetic: '/ˌnaɪnˈtiːn/', syllables: ['Nine', 'teen'], numberVal: 19, emoji: '19', countIcon: '🖍️', artBg: '#FCE7F3', exampleEn: 'I have nineteen colorful crayons.', exampleVi: 'Tớ có mười chín cây bút sáp màu.', funFact: 'Mẹo nhớ: Ghép "Nine" (9) + "teen" = Nineteen (19)!' },
      { id: 'num_20', en: 'Twenty', vi: 'Số Hai Mươi (20)', phonetic: '/ˈtwen.ti/', syllables: ['Twen', 'ty'], numberVal: 20, emoji: '20', countIcon: '🏆', artBg: '#DCFCE7', exampleEn: 'Hurray! I can count to twenty!', exampleVi: 'Hoan hô! Tớ đếm được đến hai mươi rồi!', funFact: 'Mẹo nhớ: "Thoen-ti" – 20 là tròn 2 bàn tay + 2 bàn chân cộng lại!' }
    ]
  },
  {
    id: 'fruits',
    titleVi: 'Trái Cây Ngọt Lành',
    titleEn: 'Yummy Fruits',
    icon: '🍎',
    description: '10 loại quả thơm ngon giàu vitamin bé ăn mỗi ngày!',
    theme: { accent: '#F97316', border: '#FB923C', shadow: '#EA580C', bgSoft: '#FFEDD5' },
    cards: [
      { id: 'fru_apple', en: 'Apple', vi: 'Quả Táo', phonetic: '/ˈæp.əl/', syllables: ['Ap', 'ple'], emoji: '🍎', artBg: '#FEE2E2', exampleEn: 'This red apple is crunchy and sweet.', exampleVi: 'Quả táo đỏ này giòn và ngọt lắm.', funFact: 'Mẹo nhớ: "Áp-pồ" – Từ tiếng Anh đầu tiên bắt đầu bằng chữ A!' },
      { id: 'fru_banana', en: 'Banana', vi: 'Quả Chuối', phonetic: '/bəˈnɑː.nə/', syllables: ['Ba', 'na', 'na'], emoji: '🍌', artBg: '#FEF9C3', exampleEn: 'Monkeys love peeling yellow bananas.', exampleVi: 'Các bạn khỉ rất thích bóc chuối vàng.', funFact: 'Mẹo nhớ: "Bờ-na-nờ" có tới 3 chữ A, đọc lên nghe vui tai như bài hát!' },
      { id: 'fru_watermelon', en: 'Watermelon', vi: 'Quả Dưa Hấu', phonetic: '/ˈwɔː.təˌmel.ən/', syllables: ['Wa', 'ter', 'mel', 'on'], emoji: '🍉', artBg: '#DCFCE7', exampleEn: 'Cold watermelon is great in summer.', exampleVi: 'Dưa hấu mát lành ăn mùa hè thật tuyệt.', funFact: 'Mẹo nhớ: Ghép từ "Water" (nước) + "Melon" (dưa) = Dưa hấu mọng nước!' },
      { id: 'fru_strawberry', en: 'Strawberry', vi: 'Quả Dâu Tây', phonetic: '/ˈstrɔː.bər.i/', syllables: ['Straw', 'ber', 'ry'], emoji: '🍓', artBg: '#FCE7F3', exampleEn: 'I like strawberry ice cream.', exampleVi: 'Tớ thích kem vị dâu tây.', funFact: 'Mẹo nhớ: Quả dâu đỏ có những hạt nhỏ li ti bên ngoài!' },
      { id: 'fru_grapes', en: 'Grapes', vi: 'Chùm Nho', phonetic: '/ɡreɪps/', syllables: ['Grapes'], emoji: '🍇', artBg: '#F3E8FF', exampleEn: 'Purple grapes grow in bunches.', exampleVi: 'Những quả nho tím mọc thành từng chùm.', funFact: 'Mẹo nhớ: "Gờ-rếp-xờ" – Chùm nho ngọt lịm nhiều quả!' },
      { id: 'fru_mango', en: 'Mango', vi: 'Quả Xoài', phonetic: '/ˈmæŋ.ɡəʊ/', syllables: ['Man', 'go'], emoji: '🥭', artBg: '#FEF3C7', exampleEn: 'Ripe mango is yellow and juicy.', exampleVi: 'Xoài chín có màu vàng và rất thơm ngọt.', funFact: 'Mẹo nhớ: "Men-gầu" – Quả xoài chín vàng thơm lừng!' },
      { id: 'fru_pineapple', en: 'Pineapple', vi: 'Quả Dứa / Thơm', phonetic: '/ˈpaɪnˌæp.əl/', syllables: ['Pine', 'ap', 'ple'], emoji: '🍍', artBg: '#FEF9C3', exampleEn: 'The pineapple wears a green crown.', exampleVi: 'Quả dứa đội một chiếc vương miện lá xanh.', funFact: 'Mẹo nhớ: Có chữ "Apple" ở cuối cùng, ghép với "Pine" thành quả dứa!' },
      { id: 'fru_pear', en: 'Pear', vi: 'Quả Lê', phonetic: '/peər/', syllables: ['Pear'], emoji: '🍐', artBg: '#DCFCE7', exampleEn: 'This green pear is soft and sweet.', exampleVi: 'Quả lê xanh này mềm và ngọt.', funFact: 'Mẹo nhớ: "Pe-ờ" – Quả lê dáng bầu như chiếc chuông nhỏ!' },
      { id: 'fru_cherry', en: 'Cherry', vi: 'Quả Anh Đào', phonetic: '/ˈtʃer.i/', syllables: ['Cher', 'ry'], emoji: '🍒', artBg: '#FEE2E2', exampleEn: 'Two red cherries sit on the cake.', exampleVi: 'Hai quả anh đào đỏ nằm trên chiếc bánh.', funFact: 'Mẹo nhớ: "Che-ri" – Quả nhỏ xinh màu đỏ hay trang trí trên bánh kem!' },
      { id: 'fru_peach', en: 'Peach', vi: 'Quả Đào', phonetic: '/piːtʃ/', syllables: ['Peach'], emoji: '🍑', artBg: '#FFEDD5', exampleEn: 'The pink peach smells wonderful.', exampleVi: 'Quả đào hồng có mùi thơm thật dễ chịu.', funFact: 'Mẹo nhớ: "Pít-chờ" – Quả đào mọng nước có lớp vỏ mịn màng!' }
    ]
  },
  {
    id: 'school',
    titleVi: 'Đồ Dùng & Đồ Chơi',
    titleEn: 'School & Toys',
    icon: '🎒',
    description: '10 món đồ dùng học tập & đồ chơi quen thuộc cho bé chuẩn bị vào lớp 1!',
    theme: { accent: '#14B8A6', border: '#2DD4BF', shadow: '#0D9488', bgSoft: '#CCFBF1' },
    cards: [
      { id: 'sch_book', en: 'Book', vi: 'Quyển Sách', phonetic: '/bʊk/', syllables: ['Book'], emoji: '📘', artBg: '#DBEAFE', exampleEn: 'I read a picture book every day.', exampleVi: 'Tớ đọc sách tranh mỗi ngày.', funFact: 'Mẹo nhớ: "Búc" – Mở trang sách ra là bao nhiêu điều kỳ diệu!' },
      { id: 'sch_pencil', en: 'Pencil', vi: 'Bút Chì', phonetic: '/ˈpen.səl/', syllables: ['Pen', 'cil'], emoji: '✏️', artBg: '#FEF9C3', exampleEn: 'I write my name with a pencil.', exampleVi: 'Tớ viết tên mình bằng chiếc bút chì.', funFact: 'Mẹo nhớ: "Pen-xồ" là bút chì tập viết cho học sinh lớp 1!' },
      { id: 'sch_backpack', en: 'Backpack', vi: 'Cặp Sách / Ba Lô', phonetic: '/ˈbæk.pæk/', syllables: ['Back', 'pack'], emoji: '🎒', artBg: '#FEE2E2', exampleEn: 'My school backpack is ready.', exampleVi: 'Chiếc cặp đi học của tớ đã sẵn sàng.', funFact: 'Mẹo nhớ: Ghép "Back" (sau lưng) + "Pack" (túi) = Chiếc ba lô đeo lưng!' },
      { id: 'sch_ball', en: 'Ball', vi: 'Quả Bóng', phonetic: '/bɔːl/', syllables: ['Ball'], emoji: '⚽', artBg: '#DCFCE7', exampleEn: 'Kick the ball into the goal!', exampleVi: 'Sút quả bóng vào khung thành nào!', funFact: 'Mẹo nhớ: Đọc là "Bô" – Quả bóng tròn lăn trên sân!' },
      { id: 'sch_robot', en: 'Robot', vi: 'Người Máy', phonetic: '/ˈrəʊ.bɒt/', syllables: ['Ro', 'bot'], emoji: '🤖', artBg: '#E0F2FE', exampleEn: 'The toy robot can walk and dance.', exampleVi: 'Chú người máy đồ chơi biết đi và nhảy múa.', funFact: 'Mẹo nhớ: "Râu-bọt" – Gần giống hệt cách gọi Robot trong tiếng Việt!' },
      { id: 'sch_teddy', en: 'Teddy Bear', vi: 'Gấu Bông', phonetic: '/ˈted.i ˌbeər/', syllables: ['Ted', 'dy', 'Bear'], emoji: '🧸', artBg: '#FFEDD5', exampleEn: 'I hug my soft teddy bear to sleep.', exampleVi: 'Tớ ôm bạn gấu bông mềm mại đi ngủ.', funFact: 'Mẹo nhớ: Bạn gấu bông ấm áp luôn đồng hành cùng bé!' },
      { id: 'sch_ruler', en: 'Ruler', vi: 'Thước Kẻ', phonetic: '/ˈruː.lər/', syllables: ['Ru', 'ler'], emoji: '📏', artBg: '#FEF3C7', exampleEn: 'Use a ruler to draw straight lines.', exampleVi: 'Dùng thước kẻ để vẽ đường thẳng nhé.', funFact: 'Mẹo nhớ: "Ru-lờ" – Giúp bé kẻ vở thật thẳng hàng!' },
      { id: 'sch_crayon', en: 'Crayon', vi: 'Bút Sáp Màu', phonetic: '/ˈkreɪ.ɒn/', syllables: ['Cray', 'on'], emoji: '🖍️', artBg: '#FCE7F3', exampleEn: 'I color the rainbow with crayons.', exampleVi: 'Tớ tô màu cầu vồng bằng bút sáp màu.', funFact: 'Mẹo nhớ: "Cờ-rây-on" – Hộp bút sáp nhiều màu cho giờ Mỹ thuật!' },
      { id: 'sch_scissors', en: 'Scissors', vi: 'Cái Kéo', phonetic: '/ˈsɪz.əz/', syllables: ['Scis', 'sors'], emoji: '✂️', artBg: '#E0E7FF', exampleEn: 'Be careful when cutting paper with scissors.', exampleVi: 'Cẩn thận khi cắt giấy thủ công bằng kéo nhé.', funFact: 'Mẹo nhớ: "Xi-dơ" luôn có chữ s ở cuối vì kéo có 2 lưỡi!' },
      { id: 'sch_doll', en: 'Doll', vi: 'Búp Bê', phonetic: '/dɒl/', syllables: ['Doll'], emoji: '🪆', artBg: '#FCE7F3', exampleEn: 'My doll wears a pretty hat.', exampleVi: 'Bạn búp bê của tớ đội chiếc mũ xinh.', funFact: 'Mẹo nhớ: "Đo-lờ" – Bạn búp bê xinh xắn trong phòng đồ chơi!' }
    ]
  },
  {
    id: 'body',
    titleVi: 'Cơ Thể Của Bé',
    titleEn: 'My Body',
    icon: '🧍',
    description: 'Nhận biết các bộ phận trên khuôn mặt và cơ thể bằng tiếng Anh!',
    theme: { accent: '#EC4899', border: '#F472B6', shadow: '#BE185D', bgSoft: '#FCE7F3' },
    cards: [
      { id: 'bod_head', en: 'Head', vi: 'Cái Đầu', phonetic: '/hed/', syllables: ['Head'], emoji: '👦', artBg: '#FEF3C7', exampleEn: 'Nod your head up and down.', exampleVi: 'Gật đầu lên xuống nào.', funFact: 'Mẹo nhớ: "Hét-đờ" – Nhớ bài hát "Head, Shoulders, Knees and Toes"!' },
      { id: 'bod_eyes', en: 'Eyes', vi: 'Đôi Mắt', phonetic: '/aɪz/', syllables: ['Eyes'], emoji: '👀', artBg: '#E0F2FE', exampleEn: 'I see the world with my two eyes.', exampleVi: 'Tớ nhìn thế giới bằng đôi mắt của mình.', funFact: 'Mẹo nhớ: "Ai-zờ" – Nháy đôi mắt tròn xoe nào!' },
      { id: 'bod_ears', en: 'Ears', vi: 'Đôi Tai', phonetic: '/ɪəz/', syllables: ['Ears'], emoji: '👂', artBg: '#FFEDD5', exampleEn: 'Listen to music with your ears.', exampleVi: 'Lắng nghe âm nhạc bằng đôi tai của bé.', funFact: 'Mẹo nhớ: "I-ơ-zờ" – Hai cái tai giúp bé nghe lời cô giáo!' },
      { id: 'bod_nose', en: 'Nose', vi: 'Cái Mũi', phonetic: '/nəʊz/', syllables: ['Nose'], emoji: '👃', artBg: '#FCE7F3', exampleEn: 'Smell the flowers with your nose.', exampleVi: 'Ngửi hương hoa thơm bằng cái mũi nhé.', funFact: 'Mẹo nhớ: "Nâu-zờ" – Chạm tay vào chiếc mũi xinh!' },
      { id: 'bod_mouth', en: 'Mouth', vi: 'Cái Miệng', phonetic: '/maʊθ/', syllables: ['Mouth'], emoji: '👄', artBg: '#FEE2E2', exampleEn: 'Open your mouth and say Ahh!', exampleVi: 'Há miệng ra và nói "A" nào!', funFact: 'Mẹo nhớ: "Mao-thờ" – Miệng dùng để nói tiếng Anh và cười thật tươi!' },
      { id: 'bod_hands', en: 'Hands', vi: 'Đôi Bàn Tay', phonetic: '/hændz/', syllables: ['Hands'], emoji: '🙌', artBg: '#DCFCE7', exampleEn: 'Clap your hands together!', exampleVi: 'Vỗ tay cùng nhau nào!', funFact: 'Mẹo nhớ: "Hen-zờ" – Rửa sạch đôi bàn tay trước khi ăn!' },
      { id: 'bod_fingers', en: 'Fingers', vi: 'Ngón Tay', phonetic: '/ˈfɪŋ.ɡəz/', syllables: ['Fin', 'gers'], emoji: '🖐️', artBg: '#FEF9C3', exampleEn: 'Count from one to ten on your fingers.', exampleVi: 'Đếm từ 1 đến 10 trên các ngón tay.', funFact: 'Mẹo nhớ: "Phin-gơ-zờ" – Bàn tay có 5 ngón tay ngoan!' },
      { id: 'bod_legs', en: 'Legs', vi: 'Đôi Chân', phonetic: '/leɡz/', syllables: ['Legs'], emoji: '🦵', artBg: '#DBEAFE', exampleEn: 'Strong legs help me run fast.', exampleVi: 'Đôi chân khỏe giúp tớ chạy thật nhanh.', funFact: 'Mẹo nhớ: "Lét-gờ-zờ" – Nhảy lò cò bằng đôi chân khỏe!' },
      { id: 'bod_feet', en: 'Feet', vi: 'Bàn Chân', phonetic: '/fiːt/', syllables: ['Feet'], emoji: '🦶', artBg: '#FFEDD5', exampleEn: 'Stomp your feet on the floor.', exampleVi: 'Giậm bàn chân xuống sàn nào.', funFact: 'Mẹo nhớ: 1 bàn chân là "Foot", 2 bàn chân là "Feet"!' },
      { id: 'bod_hair', en: 'Hair', vi: 'Mái Tóc', phonetic: '/heər/', syllables: ['Hair'], emoji: '💇', artBg: '#F3E8FF', exampleEn: 'Brush your hair every morning.', exampleVi: 'Chải tóc gọn gàng mỗi buổi sáng.', funFact: 'Mẹo nhớ: "He-ờ" – Mái tóc mượt mà trên đầu bé!' }
    ]
  },
  {
    id: 'clothes',
    titleVi: 'Quần Áo Xinh Xắn',
    titleEn: 'Clothes',
    icon: '👕',
    description: '10 từ vựng về trang phục bé mặc đi học và đi chơi mỗi ngày!',
    theme: { accent: '#8B5CF6', border: '#A78BFA', shadow: '#6D28D9', bgSoft: '#EDE9FE' },
    cards: [
      { id: 'clo_tshirt', en: 'T-shirt', vi: 'Áo Phông / Áo Thun', phonetic: '/ˈtiː.ʃɜːt/', syllables: ['T', 'shirt'], emoji: '👕', artBg: '#DBEAFE', exampleEn: 'I wear a cool blue T-shirt.', exampleVi: 'Tớ mặc chiếc áo phông xanh thật mát.', funFact: 'Mẹo nhớ: Trải áo ra trông giống hình chữ T nên gọi là "T-shirt"!' },
      { id: 'clo_dress', en: 'Dress', vi: 'Cái Váy Đầm', phonetic: '/dres/', syllables: ['Dress'], emoji: '👗', artBg: '#FCE7F3', exampleEn: 'She wears a pretty pink dress.', exampleVi: 'Bạn ấy mặc chiếc váy màu hồng thật xinh.', funFact: 'Mẹo nhớ: "Đờ-rét-xờ" – Chiếc váy công chúa bồng bềnh!' },
      { id: 'clo_pants', en: 'Pants', vi: 'Quần Dài', phonetic: '/pænts/', syllables: ['Pants'], emoji: '👖', artBg: '#E0F2FE', exampleEn: 'Put on your pants before going out.', exampleVi: 'Mặc quần dài vào trước khi ra ngoài nhé.', funFact: 'Mẹo nhớ: "Pen-txờ" luôn có chữ s vì quần có 2 ống quần!' },
      { id: 'clo_shorts', en: 'Shorts', vi: 'Quần Đùi / Quần Short', phonetic: '/ʃɔːts/', syllables: ['Shorts'], emoji: '🩳', artBg: '#DCFCE7', exampleEn: 'Shorts are great for hot sunny days.', exampleVi: 'Quần short rất hợp mặc vào ngày nắng nóng.', funFact: 'Mẹo nhớ: "Short" nghĩa là ngắn, thêm "s" thành quần ngắn!' },
      { id: 'clo_shoes', en: 'Shoes', vi: 'Đôi Giày', phonetic: '/ʃuːz/', syllables: ['Shoes'], emoji: '👟', artBg: '#FEF3C7', exampleEn: 'Tie your shoes before running.', exampleVi: 'Buộc dây giày cẩn thận trước khi chạy nhé.', funFact: 'Mẹo nhớ: "Su-zờ" – Đôi giày thể thao êm chân đi học!' },
      { id: 'clo_socks', en: 'Socks', vi: 'Đôi Tất / Vớ', phonetic: '/sɒks/', syllables: ['Socks'], emoji: '🧦', artBg: '#FFEDD5', exampleEn: 'Keep your feet warm with socks.', exampleVi: 'Giữ ấm bàn chân bằng đôi tất nhé.', funFact: 'Mẹo nhớ: "Xóc-xờ" – Luôn đi đôi tất trước khi xỏ giày!' },
      { id: 'clo_hat', en: 'Hat', vi: 'Cái Mũ / Nón', phonetic: '/hæt/', syllables: ['Hat'], emoji: '🧢', artBg: '#FEE2E2', exampleEn: 'Wear a hat in the sunshine.', exampleVi: 'Đội mũ khi đi ngoài trời nắng nhé.', funFact: 'Mẹo nhớ: "Hát" – Từ ngắn 3 chữ cái: H - A - T!' },
      { id: 'clo_jacket', en: 'Jacket', vi: 'Áo Khoác', phonetic: '/ˈdʒæk.ɪt/', syllables: ['Jack', 'et'], emoji: '🧥', artBg: '#E0E7FF', exampleEn: 'Wear a warm jacket when it is cold.', exampleVi: 'Mặc áo khoác ấm khi trời lạnh nhé.', funFact: 'Mẹo nhớ: "Giắc-kịt" – Chiếc áo khoác kéo khóa giữ ấm!' },
      { id: 'clo_glasses', en: 'Glasses', vi: 'Cái Kính', phonetic: '/ˈɡlɑː.sɪz/', syllables: ['Glass', 'es'], emoji: '👓', artBg: '#F3E8FF', exampleEn: 'Grandpa wears glasses to read books.', exampleVi: 'Ông đeo kính để đọc sách.', funFact: 'Mẹo nhớ: Kính có 2 mắt kính nên luôn viết số nhiều "Glasses"!' },
      { id: 'clo_crown', en: 'Crown', vi: 'Vương Miện', phonetic: '/kraʊn/', syllables: ['Crown'], emoji: '👑', artBg: '#FEF9C3', exampleEn: 'The little king wears a golden crown.', exampleVi: 'Vị vua nhỏ đội chiếc vương miện vàng.', funFact: 'Mẹo nhớ: "Cờ-rao" – Phần thưởng lấp lánh cho bé giỏi nhất!' }
    ]
  },
  {
    id: 'food',
    titleVi: 'Đồ Ăn & Thức Uống',
    titleEn: 'Food & Drinks',
    icon: '🍔',
    description: '10 món ăn và thức uống thơm ngon bé yêu thích hàng ngày!',
    theme: { accent: '#EAB308', border: '#FACC15', shadow: '#CA8A04', bgSoft: '#FEF9C3' },
    cards: [
      { id: 'foo_rice', en: 'Rice', vi: 'Cơm / Gạo', phonetic: '/raɪs/', syllables: ['Rice'], emoji: '🍚', artBg: '#F8FAFC', exampleEn: 'I eat warm rice with my family.', exampleVi: 'Tớ ăn cơm ấm cùng với gia đình.', funFact: 'Mẹo nhớ: "Rai-xờ" – Món cơm trắng dẻo thơm quen thuộc mỗi bữa!' },
      { id: 'foo_bread', en: 'Bread', vi: 'Bánh Mì', phonetic: '/bred/', syllables: ['Bread'], emoji: '🍞', artBg: '#FFEDD5', exampleEn: 'We eat fresh bread for breakfast.', exampleVi: 'Chúng mình ăn bánh mì tươi cho bữa sáng.', funFact: 'Mẹo nhớ: "Bờ-rét" – Ổ bánh mì vàng giòn thơm phức!' },
      { id: 'foo_egg', en: 'Egg', vi: 'Quả Trứng', phonetic: '/eɡ/', syllables: ['Egg'], emoji: '🥚', artBg: '#FEF9C3', exampleEn: 'One boiled egg is very healthy.', exampleVi: 'Một quả trứng luộc rất tốt cho sức khỏe.', funFact: 'Mẹo nhớ: "Éc-gờ" – Bắt đầu bằng chữ E!' },
      { id: 'foo_milk', en: 'Milk', vi: 'Sữa Tươi', phonetic: '/mɪlk/', syllables: ['Milk'], emoji: '🥛', artBg: '#E0F2FE', exampleEn: 'Drink a glass of milk to grow tall.', exampleVi: 'Uống một ly sữa để cao lớn nhé.', funFact: 'Mẹo nhớ: "Miu-kờ" – Ly sữa trắng giúp bé tăng chiều cao!' },
      { id: 'foo_water', en: 'Water', vi: 'Nước Lọc', phonetic: '/ˈwɔː.tər/', syllables: ['Wa', 'ter'], emoji: '💧', artBg: '#DBEAFE', exampleEn: 'Drink clean water every day.', exampleVi: 'Hãy uống nước sạch mỗi ngày nhé.', funFact: 'Mẹo nhớ: "O-tờ" – Cơ thể chúng mình rất cần uống đủ nước!' },
      { id: 'foo_juice', en: 'Juice', vi: 'Nước Ép', phonetic: '/dʒuːs/', syllables: ['Juice'], emoji: '🧃', artBg: '#FFEDD5', exampleEn: 'Orange juice is sweet and cool.', exampleVi: 'Nước cam ép thật ngọt và mát.', funFact: 'Mẹo nhớ: "Giu-xờ" – Nước ép trái cây giàu vitamin!' },
      { id: 'foo_cake', en: 'Cake', vi: 'Bánh Ngọt / Bánh Kem', phonetic: '/keɪk/', syllables: ['Cake'], emoji: '🎂', artBg: '#FCE7F3', exampleEn: 'Happy birthday! Let us cut the cake.', exampleVi: 'Chúc mừng sinh nhật! Cùng cắt bánh kem nào.', funFact: 'Mẹo nhớ: "Kếch" – Bánh sinh nhật cắm nến lung linh!' },
      { id: 'foo_icecream', en: 'Ice Cream', vi: 'Kem Mát Lạnh', phonetic: '/ˈaɪs ˌkriːm/', syllables: ['Ice', 'Cream'], emoji: '🍦', artBg: '#FCE7F3', exampleEn: 'I love eating cold ice cream.', exampleVi: 'Tớ thích ăn cây kem mát lạnh.', funFact: 'Mẹo nhớ: "Ai-xờ Cờ-rim" – Kem tan mát lạnh mùa hè!' },
      { id: 'foo_pizza', en: 'Pizza', vi: 'Bánh Pizza', phonetic: '/ˈpiːt.sə/', syllables: ['Piz', 'za'], emoji: '🍕', artBg: '#FEE2E2', exampleEn: 'Pizza has melted cheese on top.', exampleVi: 'Bánh pizza có phô mai tan chảy bên trên.', funFact: 'Mẹo nhớ: Đọc giống như "Pi-da", hình tam giác rất ngon!' },
      { id: 'foo_cheese', en: 'Cheese', vi: 'Phô Mai', phonetic: '/tʃiːz/', syllables: ['Cheese'], emoji: '🧀', artBg: '#FEF9C3', exampleEn: 'Little mice love yellow cheese.', exampleVi: 'Các bạn chuột nhỏ rất thích phô mai vàng.', funFact: 'Mẹo nhớ: Khi chụp ảnh hãy cười và nói "Cheese!" nhé!' }
    ]
  },
  {
    id: 'weather',
    titleVi: 'Thời Tiết & Thiên Nhiên',
    titleEn: 'Weather & Nature',
    icon: '🌤️',
    description: '10 từ vựng về bầu trời, nắng mưa, cây cối và thiên nhiên quanh bé!',
    theme: { accent: '#0EA5E9', border: '#38BDF8', shadow: '#0284C7', bgSoft: '#E0F2FE' },
    cards: [
      { id: 'wea_sun', en: 'Sun', vi: 'Mặt Trời', phonetic: '/sʌn/', syllables: ['Sun'], emoji: '☀️', artBg: '#FEF9C3', exampleEn: 'The warm sun shines in the morning.', exampleVi: 'Ông mặt trời ấm áp tỏa nắng buổi sáng.', funFact: 'Mẹo nhớ: "Xăn" – Ông mặt trời tỏa nắng vàng!' },
      { id: 'wea_rain', en: 'Rain', vi: 'Cơn Mưa', phonetic: '/reɪn/', syllables: ['Rain'], emoji: '🌧️', artBg: '#DBEAFE', exampleEn: 'Take an umbrella in the rain.', exampleVi: 'Nhớ mang ô khi trời mưa nhé.', funFact: 'Mẹo nhớ: "Rên" – Hạt mưa rơi tí tách làm cây cối xanh tươi!' },
      { id: 'wea_cloud', en: 'Cloud', vi: 'Đám Mây', phonetic: '/klaʊd/', syllables: ['Cloud'], emoji: '☁️', artBg: '#F1F5F9', exampleEn: 'Fluffy clouds float in the sky.', exampleVi: 'Những đám mây bồng bềnh trôi trên trời.', funFact: 'Mẹo nhớ: "Cờ-lao" – Đám mây trắng xốp như kẹo bông!' },
      { id: 'wea_wind', en: 'Wind', vi: 'Gió Thổi', phonetic: '/wɪnd/', syllables: ['Wind'], emoji: '🌬️', artBg: '#E0F2FE', exampleEn: 'The cool wind flies my kite.', exampleVi: 'Làn gió mát thổi cánh diều của tớ bay lên.', funFact: 'Mẹo nhớ: "Uyn-đờ" – Gió thổi vi vu giúp diều bay cao!' },
      { id: 'wea_rainbow', en: 'Rainbow', vi: 'Cầu Vồng', phonetic: '/ˈreɪn.bəʊ/', syllables: ['Rain', 'bow'], emoji: '🌈', artBg: '#FCE7F3', exampleEn: 'Look at the rainbow after the rain!', exampleVi: 'Nhìn cầu vồng sau cơn mưa kìa!', funFact: 'Mẹo nhớ: Ghép "Rain" (mưa) + "Bow" (cung) = Cầu vồng bảy sắc!' },
      { id: 'wea_star', en: 'Star', vi: 'Ngôi Sao', phonetic: '/stɑːr/', syllables: ['Star'], emoji: '⭐', artBg: '#FEF9C3', exampleEn: 'Twinkle, twinkle, little star!', exampleVi: 'Lấp lánh, lấp lánh ngôi sao nhỏ!', funFact: 'Mẹo nhớ: "Xờ-ta" – Ngôi sao lấp lánh trên bầu trời đêm!' },
      { id: 'wea_moon', en: 'Moon', vi: 'Mặt Trăng', phonetic: '/muːn/', syllables: ['Moon'], emoji: '🌙', artBg: '#EDE9FE', exampleEn: 'The moon shines softly at night.', exampleVi: 'Chị Hằng tỏa sáng dịu dàng vào ban đêm.', funFact: 'Mẹo nhớ: "Mun" – Mặt trăng lưỡi liềm và trăng rằm!' },
      { id: 'wea_tree', en: 'Tree', vi: 'Cái Cây', phonetic: '/triː/', syllables: ['Tree'], emoji: '🌳', artBg: '#DCFCE7', exampleEn: 'Big green trees give us cool shade.', exampleVi: 'Những cái cây xanh lớn cho chúng mình bóng mát.', funFact: 'Mẹo nhớ: "Tờ-ri" – Cây xanh tỏa bóng mát cho sân trường!' },
      { id: 'wea_flower', en: 'Flower', vi: 'Bông Hoa', phonetic: '/ˈflaʊ.ər/', syllables: ['Flow', 'er'], emoji: '🌸', artBg: '#FCE7F3', exampleEn: 'Bees love visiting colorful flowers.', exampleVi: 'Các bạn ong thích ghé thăm những bông hoa rực rỡ.', funFact: 'Mẹo nhớ: "Phờ-lao-ờ" – Bông hoa nở rộ khoe sắc!' },
      { id: 'wea_snow', en: 'Snow', vi: 'Tuyết Rơi', phonetic: '/snəʊ/', syllables: ['Snow'], emoji: '❄️', artBg: '#E0F2FE', exampleEn: 'Kids make a snowman in the snow.', exampleVi: 'Các bạn nhỏ nặn người tuyết trong tuyết trắng.', funFact: 'Mẹo nhớ: "Xờ-nâu" – Bông tuyết trắng xóa lạnh buốt!' }
    ]
  },
  {
    id: 'vehicles',
    titleVi: 'Phương Tiện Giao Thông',
    titleEn: 'Vehicles',
    icon: '🚗',
    description: '10 phương tiện đường bộ, đường thủy, đường sắt và bầu trời cực ngầu!',
    theme: { accent: '#EF4444', border: '#F87171', shadow: '#DC2626', bgSoft: '#FEE2E2' },
    cards: [
      { id: 'veh_car', en: 'Car', vi: 'Xe Ô Tô', phonetic: '/kɑːr/', syllables: ['Car'], emoji: '🚗', artBg: '#FEE2E2', exampleEn: 'My family drives a red car.', exampleVi: 'Gia đình tớ lái một chiếc ô tô màu đỏ.', funFact: 'Mẹo nhớ: "Ca" – Ô tô chạy bon bon trên đường!' },
      { id: 'veh_bus', en: 'Bus', vi: 'Xe Buýt', phonetic: '/bʌs/', syllables: ['Bus'], emoji: '🚌', artBg: '#FEF9C3', exampleEn: 'The yellow school bus takes kids to school.', exampleVi: 'Xe buýt trường màu vàng đưa các bạn tới trường.', funFact: 'Mẹo nhớ: "Bắt-xờ" – Nhớ bài hát "The Wheels on the Bus"!' },
      { id: 'veh_bike', en: 'Bike', vi: 'Xe Đạp', phonetic: '/baɪk/', syllables: ['Bike'], emoji: '🚲', artBg: '#DCFCE7', exampleEn: 'I ride my bike in the park.', exampleVi: 'Tớ đạp xe đạp trong công viên.', funFact: 'Mẹo nhớ: "Bai-kờ" – Tên đầy đủ là "Bicycle", gọi gọn là "Bike"!' },
      { id: 'veh_train', en: 'Train', vi: 'Tàu Hỏa', phonetic: '/treɪn/', syllables: ['Train'], emoji: '🚂', artBg: '#E0F2FE', exampleEn: 'The long train goes choo-choo!', exampleVi: 'Đoàn tàu hỏa dài kêu xình xịch!', funFact: 'Mẹo nhớ: "Trên" – Tàu hỏa chạy trên đường ray!' },
      { id: 'veh_plane', en: 'Plane', vi: 'Máy Bay', phonetic: '/pleɪn/', syllables: ['Plane'], emoji: '✈️', artBg: '#DBEAFE', exampleEn: 'The airplane flies high above the clouds.', exampleVi: 'Chiếc máy bay bay cao trên những đám mây.', funFact: 'Mẹo nhớ: "Pờ-lên" – Máy bay sải cánh trên bầu trời!' },
      { id: 'veh_boat', en: 'Boat', vi: 'Thuyền / Tàu Thủy', phonetic: '/bəʊt/', syllables: ['Boat'], emoji: '⛵', artBg: '#CCFBF1', exampleEn: 'The sailboat glides on the sea.', exampleVi: 'Chiếc thuyền buồm lướt nhẹ trên mặt biển.', funFact: 'Mẹo nhớ: "Bâu-tờ" – Nhớ bài hát "Row, row, row your boat"!' },
      { id: 'veh_firetruck', en: 'Fire Truck', vi: 'Xe Cứu Hỏa', phonetic: '/ˈfaɪə trʌk/', syllables: ['Fire', 'Truck'], emoji: '🚒', artBg: '#FEE2E2', exampleEn: 'The fire truck helps put out fires.', exampleVi: 'Xe cứu hỏa giúp dập tắt đám cháy.', funFact: 'Mẹo nhớ: "Fire" (lửa) + "Truck" (xe tải) = Xe cứu hỏa đỏ!' },
      { id: 'veh_helicopter', en: 'Helicopter', vi: 'Máy Bay Trực Thăng', phonetic: '/ˈhel.ɪ.kɒp.tər/', syllables: ['Hel', 'i', 'cop', 'ter'], emoji: '🚁', artBg: '#FEF3C7', exampleEn: 'A helicopter has spinning blades on top.', exampleVi: 'Máy bay trực thăng có cánh quạt xoay trên nóc.', funFact: 'Mẹo nhớ: "He-li-cóp-tờ" – Trực thăng bay lên thẳng đứng!' },
      { id: 'veh_rocket', en: 'Rocket', vi: 'Tên Lửa', phonetic: '/ˈrɒk.ɪt/', syllables: ['Rock', 'et'], emoji: '🚀', artBg: '#EDE9FE', exampleEn: 'The space rocket flies to the moon!', exampleVi: 'Tên lửa vũ trụ bay lên mặt trăng!', funFact: 'Mẹo nhớ: "Róc-kịt" – Phóng vút vào vũ trụ!' },
      { id: 'veh_taxi', en: 'Taxi', vi: 'Xe Taxi', phonetic: '/ˈtæk.si/', syllables: ['Tax', 'i'], emoji: '🚕', artBg: '#FEF9C3', exampleEn: 'We take a yellow taxi to the zoo.', exampleVi: 'Chúng mình đi xe taxi màu vàng đến sở thú.', funFact: 'Mẹo nhớ: Đọc giống hệt tiếng Việt "Tắc-xi"!' }
    ]
  },
  {
    id: 'shapes_actions',
    titleVi: 'Hình Khối & Hành Động',
    titleEn: 'Shapes & Actions',
    icon: '⭐',
    description: '12 từ về các hình khối toán lớp 1 và những hành động vui mỗi ngày!',
    theme: { accent: '#6366F1', border: '#818CF8', shadow: '#4F46E5', bgSoft: '#E0E7FF' },
    cards: [
      { id: 'shp_circle', en: 'Circle', vi: 'Hình Tròn', phonetic: '/ˈsɜː.kəl/', syllables: ['Cir', 'cle'], emoji: '⭕', artBg: '#FEE2E2', exampleEn: 'A clock and a wheel are circles.', exampleVi: 'Mặt đồng hồ và bánh xe có hình tròn.', funFact: 'Mẹo nhớ: "Xơ-cồ" – Vòng tròn khép kín như chiếc bánh xe!' },
      { id: 'shp_square', en: 'Square', vi: 'Hình Vuông', phonetic: '/skweər/', syllables: ['Square'], emoji: '🟦', artBg: '#DBEAFE', exampleEn: 'A square has four equal sides.', exampleVi: 'Hình vuông có bốn cạnh bằng nhau.', funFact: 'Mẹo nhớ: "Xờ-que-ờ" – Hình vuông ngay ngắn 4 cạnh bằng nhau!' },
      { id: 'shp_triangle', en: 'Triangle', vi: 'Hình Tam Giác', phonetic: '/ˈtraɪ.æŋ.ɡəl/', syllables: ['Tri', 'an', 'gle'], emoji: '🔺', artBg: '#FEF3C7', exampleEn: 'A triangle has three corners.', exampleVi: 'Hình tam giác có ba góc nhọn.', funFact: 'Mẹo nhớ: "Tri" nghĩa là 3 – Hình có 3 cạnh như miếng bánh pizza!' },
      { id: 'shp_heart', en: 'Heart', vi: 'Hình Trái Tim', phonetic: '/hɑːt/', syllables: ['Heart'], emoji: '❤️', artBg: '#FCE7F3', exampleEn: 'I draw a red heart for Mom.', exampleVi: 'Tớ vẽ hình trái tim đỏ tặng mẹ.', funFact: 'Mẹo nhớ: "Hát-tờ" – Biểu tượng của tình yêu thương!' },
      { id: 'act_run', en: 'Run', vi: 'Chạy Nhanh', phonetic: '/rʌn/', syllables: ['Run'], emoji: '🏃', artBg: '#DCFCE7', exampleEn: 'Kids run happily on the playground.', exampleVi: 'Các bạn nhỏ chạy nhảy vui vẻ trên sân chơi.', funFact: 'Mẹo nhớ: "Răn" – Vừa nói "Run!" vừa chạy tại chỗ thật vui!' },
      { id: 'act_jump', en: 'Jump', vi: 'Nhảy Lên', phonetic: '/dʒʌmp/', syllables: ['Jump'], emoji: '🦘', artBg: '#FFEDD5', exampleEn: 'Jump up high like a kangaroo!', exampleVi: 'Nhảy thật cao như chú chuột túi nào!', funFact: 'Mẹo nhớ: "Giăm-pờ" – Bật nhảy lên cao bằng 2 chân!' },
      { id: 'act_sing', en: 'Sing', vi: 'Ca Hát', phonetic: '/sɪŋ/', syllables: ['Sing'], emoji: '🎤', artBg: '#FCE7F3', exampleEn: 'Let us sing the ABC song!', exampleVi: 'Cùng hát bài hát bảng chữ cái ABC nào!', funFact: 'Mẹo nhớ: "Xinh" – Cầm micro hát thật hay!' },
      { id: 'act_dance', en: 'Dance', vi: 'Nhảy Múa', phonetic: '/dɑːns/', syllables: ['Dance'], emoji: '💃', artBg: '#EDE9FE', exampleEn: 'Dance to the cheerful music!', exampleVi: 'Nhảy múa theo điệu nhạc vui tươi nào!', funFact: 'Mẹo nhớ: "Đan-xờ" – Lắc lư theo nhịp nhạc!' },
      { id: 'act_sleep', en: 'Sleep', vi: 'Ngủ Ngon', phonetic: '/sliːp/', syllables: ['Sleep'], emoji: '😴', artBg: '#E0F2FE', exampleEn: 'Go to sleep early to stay healthy.', exampleVi: 'Đi ngủ sớm để thật khỏe mạnh nhé.', funFact: 'Mẹo nhớ: "Xờ-líp" – Nhắm mắt ngủ ngoan lúc 9 giờ tối!' },
      { id: 'act_eat', en: 'Eat', vi: 'Ăn Ngon', phonetic: '/iːt/', syllables: ['Eat'], emoji: '🍽️', artBg: '#FEF9C3', exampleEn: 'Eat healthy fruits and veggies!', exampleVi: 'Hãy ăn thật nhiều trái cây và rau củ nhé!', funFact: 'Mẹo nhớ: "Ít" – Ăn hết suất cơm để mau lớn!' },
      { id: 'act_read', en: 'Read', vi: 'Đọc Sách', phonetic: '/riːd/', syllables: ['Read'], emoji: '📖', artBg: '#DBEAFE', exampleEn: 'I read English stories with Mom.', exampleVi: 'Tớ đọc truyện tiếng Anh cùng với mẹ.', funFact: 'Mẹo nhớ: "Rít-đờ" – Chăm đọc sách mỗi ngày thật thông minh!' },
      { id: 'act_smile', en: 'Smile', vi: 'Mỉm Cười', phonetic: '/smaɪl/', syllables: ['Smile'], emoji: '😊', artBg: '#FEF9C3', exampleEn: 'Give everyone a big warm smile!', exampleVi: 'Hãy tặng mọi người một nụ cười thật tươi!', funFact: 'Mẹo nhớ: "Xờ-mai" – Nụ cười giúp mỗi ngày đều vui!' }
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
  learnedLetters: new Set(),
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
    if (Array.isArray(parsed.learnedLetters)) {
      state.learnedLetters = new Set(parsed.learnedLetters);
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
      learnedLetters: Array.from(state.learnedLetters),
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
    btn.textContent = typeof card.numberVal === 'number' ? String(card.numberVal) : card.emoji;
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
    const isLarge = card.numberVal > 10;
    const repeatedIcons = Array.from({ length: card.numberVal }, () => card.countIcon).join('');
    return `
      <div class="number-badge-giant ${ isLarge ? 'is-large' : '' }">
        <span>${ card.numberVal }</span>
        <div class="number-dots-row ${ isLarge ? 'compact' : '' }">${ repeatedIcons }</div>
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
  document.getElementById('back-mini-illustration').textContent = typeof card.numberVal === 'number' ? card.countIcon : card.emoji;
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

  state.quiz.pool = shuffleArray(sourceCards).slice(0, 8);
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
    const visualHTML = opt.colorHex
      ? `<span class="opt-swatch" style="background:${ opt.colorHex }"></span>`
      : typeof opt.numberVal === 'number'
        ? `<span class="opt-num-badge">${ opt.numberVal }</span>`
        : `<span class="opt-emoji">${ opt.emoji }</span>`;
    btn.innerHTML = `
      ${ visualHTML }
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
    state.learnedLetters.clear();
    saveProgress();
    updateHeaderAndMissionUI();
    renderTopicsGrid();
    if (typeof window.refreshPhonicsUI === 'function') {
      window.refreshPhonicsUI();
    }
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
