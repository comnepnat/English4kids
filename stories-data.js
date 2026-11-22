/**
 * English4Kids - 18 Interactive Animated Episodes (Khan Academy Kids Style)
 * Spans Pre-A1 -> B2 with 4 Animated Hosts (Leo, Mimi, Toby, Lulu)
 * and 4 Interactive Scene Types: 'interact', 'count', 'sequence', 'dialogue'.
 */
const STORY_HOSTS = {
  leo:  { name: 'Leo',  emoji: '🦁', role: 'Nhà Thám Hiểm' },
  mimi: { name: 'Mimi', emoji: '🐼', role: 'Nhà Khoa Học' },
  toby: { name: 'Toby', emoji: '🦊', role: 'Thám Tử & Đếm Số' },
  lulu: { name: 'Lulu', emoji: '🐰', role: 'Nhạc Sĩ & Đầu Bếp' }
};

const STORY_EPISODES = [
  /* ======================= PRE-A1 (4 EPISODES) ======================= */
  {
    id: 'zoo',
    num: 'Tập 1',
    level: 'Pre-A1',
    host: 'leo',
    titleVi: 'Chuyến Đi Sở Thú',
    titleEn: 'A Day at the Zoo',
    icon: '🦁',
    duration: '2 phút • 4 thử thách',
    theme: 'zoo',
    color: '#22C55E',
    bgSoft: '#DCFCE7',
    scenes: [
      {
        type: 'story',
        leoMood: 'wave',
        props: [
          { emoji: '🌳', x: 15, y: 58, size: 3.4 },
          { emoji: '🦒', x: 78, y: 52, size: 3.6, anim: 'float' },
          { emoji: '🦜', x: 64, y: 20, size: 2.3, anim: 'bob' }
        ],
        en: 'Hello friends! Welcome to the Sunny Zoo!',
        vi: 'Chào các bạn nhỏ! Chào mừng đến với Sở Thú Nắng Vàng!',
        durationMs: 4200
      },
      {
        type: 'interact',
        leoMood: 'ask',
        promptEn: 'Can you tap the Elephant? It has a long trunk!',
        promptVi: 'Bé hãy chạm vào bạn Voi (Elephant) có chiếc vòi dài nhé!',
        targetId: 'elephant',
        successEn: 'Yay! That is the big Elephant!',
        successVi: 'Hoan hô! Đúng là bạn Voi (Elephant) to lớn rồi!',
        items: [
          { id: 'cat', emoji: '🐱', label: 'Cat', x: 25, y: 62 },
          { id: 'elephant', emoji: '🐘', label: 'Elephant', x: 54, y: 56 },
          { id: 'duck', emoji: '🦆', label: 'Duck', x: 82, y: 64 }
        ]
      },
      {
        type: 'count',
        leoMood: 'ask',
        promptEn: 'Look! Monkeys love bananas! Tap each Monkey to count them!',
        promptVi: 'Nhìn kìa! Các bạn Khỉ thích chuối! Chạm từng bạn Khỉ để cùng đếm nào!',
        itemNoun: 'monkeys',
        successEn: 'One, two, three! Three playful monkeys!',
        successVi: '1, 2, 3! Có tất cả 3 bạn Khỉ (Three monkeys) tinh nghịch!',
        items: [
          { id: 'm1', emoji: '🐵', label: 'Monkey', x: 28, y: 52 },
          { id: 'm2', emoji: '🐵', label: 'Monkey', x: 54, y: 42 },
          { id: 'm3', emoji: '🐵', label: 'Monkey', x: 80, y: 54 }
        ]
      },
      {
        type: 'interact',
        leoMood: 'ask',
        promptEn: 'Now find the tall Giraffe!',
        promptVi: 'Bây giờ bé hãy tìm bạn Hươu Cao Cổ (Giraffe) nhé!',
        targetId: 'giraffe',
        successEn: 'Superstar! The Giraffe is super tall!',
        successVi: 'Siêu sao! Bạn Hươu Cao Cổ (Giraffe) thật cao lớn!',
        items: [
          { id: 'rabbit', emoji: '🐰', label: 'Rabbit', x: 26, y: 64 },
          { id: 'frog', emoji: '🐸', label: 'Frog', x: 54, y: 64 },
          { id: 'giraffe', emoji: '🦒', label: 'Giraffe', x: 80, y: 52 }
        ]
      },
      {
        type: 'story',
        leoMood: 'celebrate',
        props: [
          { emoji: '🐘', x: 22, y: 60, size: 3.1, anim: 'bob' },
          { emoji: '🐵', x: 52, y: 56, size: 3.1, anim: 'float' },
          { emoji: '🦒', x: 82, y: 52, size: 3.3, anim: 'bob' }
        ],
        en: 'Great job! All the zoo animals say thank you!',
        vi: 'Bé giỏi quá! Tất cả các bạn thú trong sở thú đều gửi lời cảm ơn bé!',
        durationMs: 4200
      }
    ]
  },
  {
    id: 'rainbow',
    num: 'Tập 2',
    level: 'Pre-A1',
    host: 'leo',
    titleVi: 'Xưởng Vẽ Cầu Vồng',
    titleEn: 'Rainbow Art Studio',
    icon: '🎨',
    duration: '2 phút • 3 thử thách',
    theme: 'art',
    color: '#EC4899',
    bgSoft: '#FCE7F3',
    scenes: [
      {
        type: 'story',
        leoMood: 'wave',
        props: [
          { emoji: '🌈', x: 54, y: 24, size: 4.2, anim: 'float' },
          { emoji: '🎨', x: 78, y: 62, size: 3.2, anim: 'bob' },
          { emoji: '🖌️', x: 24, y: 60, size: 2.8 }
        ],
        en: 'Welcome to my Art Studio! Let us paint a bright rainbow!',
        vi: 'Chào mừng đến xưởng vẽ của Leo! Cùng tô màu một chiếc cầu vồng rực rỡ nhé!',
        durationMs: 4400
      },
      {
        type: 'interact',
        leoMood: 'ask',
        promptEn: 'First, tap the color Red!',
        promptVi: 'Đầu tiên, bé hãy chạm vào màu Đỏ (Red) nhé!',
        targetId: 'red',
        successEn: 'Wonderful! Red like a sweet strawberry!',
        successVi: 'Tuyệt lắm! Màu Đỏ (Red) như quả dâu tây ngọt!',
        items: [
          { id: 'red', colorHex: '#EF4444', emoji: '🍓', label: 'Red', x: 26, y: 58 },
          { id: 'blue', colorHex: '#3B82F6', emoji: '🐳', label: 'Blue', x: 54, y: 58 },
          { id: 'yellow', colorHex: '#FACC15', emoji: '🌻', label: 'Yellow', x: 82, y: 58 }
        ]
      },
      {
        type: 'sequence',
        leoMood: 'ask',
        promptEn: 'Paint the rainbow in order! Tap Red, then Yellow, then Blue!',
        promptVi: 'Tô cầu vồng theo đúng thứ tự: Chạm Đỏ (Red) ➔ Vàng (Yellow) ➔ Xanh Dương (Blue)!',
        order: ['red', 'yellow', 'blue'],
        successEn: 'Bravo! Red, Yellow, and Blue make a magical rainbow!',
        successVi: 'Xuất sắc! Đỏ, Vàng và Xanh Dương tạo nên cầu vồng rực rỡ!',
        items: [
          { id: 'blue', colorHex: '#3B82F6', emoji: '🌊', label: 'Blue', x: 80, y: 58 },
          { id: 'red', colorHex: '#EF4444', emoji: '🍎', label: 'Red', x: 26, y: 58 },
          { id: 'yellow', colorHex: '#FACC15', emoji: '☀️', label: 'Yellow', x: 53, y: 58 }
        ]
      },
      {
        type: 'interact',
        leoMood: 'ask',
        promptEn: 'Now tap the bright Purple grapes!',
        promptVi: 'Giờ hãy chạm vào màu Tím (Purple) như chùm nho nhé!',
        targetId: 'purple',
        successEn: 'Amazing! Purple makes our painting shine!',
        successVi: 'Tuyệt vời! Màu Tím (Purple) làm bức tranh thêm lung linh!',
        items: [
          { id: 'green', colorHex: '#22C55E', emoji: '🌿', label: 'Green', x: 26, y: 58 },
          { id: 'purple', colorHex: '#A855F7', emoji: '🍇', label: 'Purple', x: 54, y: 58 },
          { id: 'orange', colorHex: '#F97316', emoji: '🍊', label: 'Orange', x: 82, y: 58 }
        ]
      },
      {
        type: 'story',
        leoMood: 'celebrate',
        props: [
          { emoji: '🌈', x: 52, y: 36, size: 5.0, anim: 'float' },
          { emoji: '✨', x: 22, y: 34, size: 2.6, anim: 'bob' },
          { emoji: '✨', x: 82, y: 34, size: 2.6, anim: 'bob' }
        ],
        en: 'You are a little artist! What a beautiful rainbow!',
        vi: 'Bé đúng là một họa sĩ nhí tài ba! Chiếc cầu vồng đẹp quá!',
        durationMs: 4200
      }
    ]
  },
  {
    id: 'market',
    num: 'Tập 3',
    level: 'Pre-A1',
    host: 'leo',
    titleVi: 'Đi Chợ Trái Cây',
    titleEn: 'Fruit Market Adventure',
    icon: '🍎',
    duration: '2 phút • 3 thử thách',
    theme: 'market',
    color: '#F97316',
    bgSoft: '#FFEDD5',
    scenes: [
      {
        type: 'story',
        leoMood: 'wave',
        props: [
          { emoji: '🧺', x: 52, y: 62, size: 3.4, anim: 'bob' },
          { emoji: '🍎', x: 24, y: 42, size: 2.6 },
          { emoji: '🍉', x: 80, y: 42, size: 2.8 }
        ],
        en: 'Let us go to the Fruit Market and fill our basket!',
        vi: 'Cùng đi chợ Trái Cây và chọn những loại quả tươi ngon vào giỏ nhé!',
        durationMs: 4300
      },
      {
        type: 'interact',
        leoMood: 'ask',
        promptEn: 'Please put the Watermelon in the basket!',
        promptVi: 'Bé hãy chọn quả Dưa Hấu (Watermelon) bỏ vào giỏ giúp Leo nhé!',
        targetId: 'watermelon',
        successEn: 'Yummy! Cold Watermelon is so refreshing!',
        successVi: 'Ngon quá! Quả Dưa Hấu (Watermelon) mát lành thật tuyệt!',
        items: [
          { id: 'apple', emoji: '🍎', label: 'Apple', x: 26, y: 58 },
          { id: 'watermelon', emoji: '🍉', label: 'Watermelon', x: 54, y: 58 },
          { id: 'pear', emoji: '🍐', label: 'Pear', x: 82, y: 58 }
        ]
      },
      {
        type: 'count',
        leoMood: 'ask',
        promptEn: 'Help me count the red Apples! Tap every Apple!',
        promptVi: 'Giúp Leo đếm những quả Táo đỏ nhé! Chạm lần lượt từng quả Táo nào!',
        itemNoun: 'apples',
        successEn: 'Fantastic! Four crunchy red apples!',
        successVi: 'Tuyệt vời! Có 4 quả táo đỏ (Four apples) giòn ngọt!',
        items: [
          { id: 'a1', emoji: '🍎', label: 'Apple', x: 22, y: 56 },
          { id: 'a2', emoji: '🍎', label: 'Apple', x: 42, y: 44 },
          { id: 'a3', emoji: '🍎', label: 'Apple', x: 64, y: 44 },
          { id: 'a4', emoji: '🍎', label: 'Apple', x: 84, y: 56 }
        ]
      },
      {
        type: 'interact',
        leoMood: 'ask',
        promptEn: 'Last one! Tap the Pineapple with a green crown!',
        promptVi: 'Quả cuối cùng! Chạm vào quả Dứa (Pineapple) có chiếc vương miện lá xanh!',
        targetId: 'pineapple',
        successEn: 'Fantastic! Our fruit basket is full!',
        successVi: 'Xuất sắc! Giỏ trái cây của chúng mình đã đầy ắp rồi!',
        items: [
          { id: 'grapes', emoji: '🍇', label: 'Grapes', x: 26, y: 58 },
          { id: 'cherry', emoji: '🍒', label: 'Cherry', x: 54, y: 58 },
          { id: 'pineapple', emoji: '🍍', label: 'Pineapple', x: 82, y: 58 }
        ]
      },
      {
        type: 'story',
        leoMood: 'celebrate',
        props: [
          { emoji: '🍉', x: 24, y: 58, size: 3.0, anim: 'bob' },
          { emoji: '🍎', x: 52, y: 54, size: 3.0, anim: 'float' },
          { emoji: '🍍', x: 80, y: 58, size: 3.0, anim: 'bob' }
        ],
        en: 'Eating fruits every day helps us grow big and strong!',
        vi: 'Ăn trái cây mỗi ngày giúp chúng mình lớn nhanh và thật khỏe mạnh!',
        durationMs: 4200
      }
    ]
  },
  {
    id: 'counting_farm',
    num: 'Tập 4',
    level: 'Pre-A1',
    host: 'toby',
    titleVi: 'Nông Trại Tập Đếm',
    titleEn: 'Sunny Counting Farm',
    icon: '🐥',
    duration: '2.5 phút • 4 thử thách',
    theme: 'farm',
    color: '#84CC16',
    bgSoft: '#ECFCCB',
    scenes: [
      {
        type: 'story',
        leoMood: 'wave',
        props: [
          { emoji: '🚜', x: 24, y: 64, size: 3.2, anim: 'bob' },
          { emoji: '🏡', x: 54, y: 42, size: 3.8 },
          { emoji: '🌻', x: 82, y: 62, size: 2.8, anim: 'float' }
        ],
        en: 'Hi! I am Toby the Fox! Let us count animals on the Sunny Farm!',
        vi: 'Xin chào! Tớ là Cáo Toby! Hãy cùng đếm các bạn thú ở Nông Trại Nắng Vàng nhé!',
        durationMs: 4400
      },
      {
        type: 'count',
        leoMood: 'ask',
        promptEn: 'Tap each yellow Chick to count how many there are!',
        promptVi: 'Chạm vào từng bạn Gà Con (Chick) màu vàng để đếm xem có mấy bạn nhé!',
        itemNoun: 'chicks',
        successEn: 'Yay! One, two, three, four little chicks!',
        successVi: 'Hoan hô! 1, 2, 3, 4 — Có 4 bạn Gà Con thật đáng yêu!',
        items: [
          { id: 'c1', emoji: '🐥', label: 'Chick', x: 22, y: 60 },
          { id: 'c2', emoji: '🐥', label: 'Chick', x: 43, y: 48 },
          { id: 'c3', emoji: '🐥', label: 'Chick', x: 64, y: 60 },
          { id: 'c4', emoji: '🐥', label: 'Chick', x: 84, y: 48 }
        ]
      },
      {
        type: 'interact',
        leoMood: 'ask',
        promptEn: 'Moo! Who gives us fresh milk? Tap the Cow!',
        promptVi: 'Ùm bò! Ai cho chúng ta sữa tươi nhỉ? Chạm vào bạn Bò (Cow) nào!',
        targetId: 'cow',
        successEn: 'Moo! The friendly Cow says hello!',
        successVi: 'Ùm bò! Bạn Bò (Cow) thân thiện đang chào bé kìa!',
        items: [
          { id: 'pig', emoji: '🐷', label: 'Pig', x: 26, y: 60 },
          { id: 'cow', emoji: '🐮', label: 'Cow', x: 54, y: 56 },
          { id: 'sheep', emoji: '🐑', label: 'Sheep', x: 82, y: 60 }
        ]
      },
      {
        type: 'count',
        leoMood: 'ask',
        promptEn: 'Quack quack! Count all five Ducks in the pond!',
        promptVi: 'Cạp cạp! Cùng đếm đủ 5 bạn Vịt (Ducks) đang bơi dưới ao nào!',
        itemNoun: 'ducks',
        successEn: 'Amazing! Five happy ducks swimming together!',
        successVi: 'Giỏi quá! Có tất cả 5 bạn Vịt (Five ducks) đang bơi vui vẻ!',
        items: [
          { id: 'd1', emoji: '🦆', label: 'Duck', x: 18, y: 62 },
          { id: 'd2', emoji: '🦆', label: 'Duck', x: 35, y: 46 },
          { id: 'd3', emoji: '🦆', label: 'Duck', x: 53, y: 62 },
          { id: 'd4', emoji: '🦆', label: 'Duck', x: 70, y: 46 },
          { id: 'd5', emoji: '🦆', label: 'Duck', x: 86, y: 62 }
        ]
      },
      {
        type: 'dialogue',
        leoMood: 'ask',
        promptEn: 'The farmer gives us a basket of eggs! What do we say?',
        promptVi: 'Bác nông dân tặng chúng mình giỏ trứng tươi! Bé sẽ nói gì cho lễ phép nhỉ?',
        targetId: 'thanks',
        successEn: 'Thank you very much! You are so polite!',
        successVi: 'Cảm ơn bác rất nhiều (Thank you very much)! Bé thật ngoan và lễ phép!',
        options: [
          { id: 'thanks', emoji: '💛', en: 'Thank you very much!', vi: 'Cảm ơn rất nhiều!' },
          { id: 'night', emoji: '🌙', en: 'Good night!', vi: 'Chúc ngủ ngon!' },
          { id: 'bye', emoji: '😴', en: 'I am sleepy.', vi: 'Tớ buồn ngủ rồi.' }
        ]
      },
      {
        type: 'story',
        leoMood: 'celebrate',
        props: [
          { emoji: '🐮', x: 26, y: 60, size: 3.1, anim: 'bob' },
          { emoji: '🐥', x: 54, y: 58, size: 3.0, anim: 'float' },
          { emoji: '🦆', x: 80, y: 60, size: 3.0, anim: 'bob' }
        ],
        en: 'You are a Counting Star! See you back on the farm soon!',
        vi: 'Bé đúng là Ngôi Sao Tập Đếm! Hẹn gặp lại bé ở nông trại nhé!',
        durationMs: 4200
      }
    ]
  },

  /* ======================= A1 (4 EPISODES) ======================= */
  {
    id: 'city',
    num: 'Tập 5',
    level: 'A1',
    host: 'leo',
    titleVi: 'Thành Phố Xe Cộ',
    titleEn: 'Busy City Vehicles',
    icon: '🚗',
    duration: '2 phút • 3 thử thách',
    theme: 'city',
    color: '#EF4444',
    bgSoft: '#FEE2E2',
    scenes: [
      {
        type: 'story',
        leoMood: 'wave',
        props: [
          { emoji: '🏙️', x: 50, y: 36, size: 3.8 },
          { emoji: '🚗', x: 24, y: 66, size: 3.0, anim: 'bob' },
          { emoji: '🚌', x: 78, y: 66, size: 3.2, anim: 'bob' }
        ],
        en: 'Beep beep! Let us explore the Busy City streets!',
        vi: 'Bíp bíp! Cùng khám phá các phương tiện trên đường phố nhộn nhịp nào!',
        durationMs: 4200
      },
      {
        type: 'interact',
        leoMood: 'ask',
        promptEn: 'Tap the yellow School Bus!',
        promptVi: 'Bé hãy chạm vào chiếc Xe Buýt (Bus) màu vàng nhé!',
        targetId: 'bus',
        successEn: 'Beep beep! The Bus takes kids to school!',
        successVi: 'Bíp bíp! Xe Buýt (Bus) đưa các bạn nhỏ đến trường!',
        items: [
          { id: 'bike', emoji: '🚲', label: 'Bike', x: 26, y: 62 },
          { id: 'bus', emoji: '🚌', label: 'Bus', x: 54, y: 60 },
          { id: 'boat', emoji: '⛵', label: 'Boat', x: 82, y: 62 }
        ]
      },
      {
        type: 'dialogue',
        leoMood: 'ask',
        promptEn: 'Look! The traffic light is RED! What should the cars do?',
        promptVi: 'Nhìn kìa! Đèn giao thông đang màu ĐỎ! Các xe phải làm gì nhỉ?',
        targetId: 'stop',
        successEn: 'Yes! Red light means Stop and wait safely!',
        successVi: 'Đúng rồi! Đèn đỏ là Dừng lại (Stop) và chờ an toàn!',
        options: [
          { id: 'stop', emoji: '🛑', en: 'Stop and wait safely!', vi: 'Dừng lại và chờ an toàn!' },
          { id: 'fast', emoji: '🏎️', en: 'Drive super fast!', vi: 'Chạy thật nhanh!' },
          { id: 'fly', emoji: '✈️', en: 'Fly to the moon!', vi: 'Bay lên mặt trăng!' }
        ]
      },
      {
        type: 'interact',
        leoMood: 'ask',
        promptEn: 'Look up in the sky! Tap the Helicopter!',
        promptVi: 'Nhìn lên bầu trời kìa! Chạm vào Máy Bay Trực Thăng (Helicopter) nhé!',
        targetId: 'helicopter',
        successEn: 'Whoosh! The Helicopter flies high in the sky!',
        successVi: 'Vù vù! Máy Bay Trực Thăng (Helicopter) bay vút lên cao!',
        items: [
          { id: 'car', emoji: '🚗', label: 'Car', x: 26, y: 64 },
          { id: 'ship', emoji: '🚢', label: 'Ship', x: 54, y: 62 },
          { id: 'helicopter', emoji: '🚁', label: 'Helicopter', x: 80, y: 40 }
        ]
      },
      {
        type: 'story',
        leoMood: 'celebrate',
        props: [
          { emoji: '🚌', x: 24, y: 62, size: 3.0, anim: 'bob' },
          { emoji: '🚒', x: 54, y: 62, size: 3.0, anim: 'bob' },
          { emoji: '🚁', x: 80, y: 36, size: 3.1, anim: 'float' }
        ],
        en: 'Remember to always wear your seatbelt and stay safe!',
        vi: 'Nhớ luôn thắt dây an toàn khi đi xe để thật an toàn bé nhé!',
        durationMs: 4200
      }
    ]
  },
  {
    id: 'morning',
    num: 'Tập 6',
    level: 'A1',
    host: 'leo',
    titleVi: 'Buổi Sáng Của Bé',
    titleEn: 'Happy Morning Routine',
    icon: '🏡',
    duration: '2 phút • 3 thử thách',
    theme: 'home',
    color: '#F59E0B',
    bgSoft: '#FEF3C7',
    scenes: [
      {
        type: 'story',
        leoMood: 'wave',
        props: [
          { emoji: '🌅', x: 52, y: 26, size: 3.8, anim: 'float' },
          { emoji: '🛏️', x: 26, y: 62, size: 3.2 },
          { emoji: '⏰', x: 78, y: 58, size: 2.8, anim: 'bob' }
        ],
        en: 'Good morning! Time to wake up and get ready for school!',
        vi: 'Chào buổi sáng! Đến giờ thức dậy và chuẩn bị đi học rồi!',
        durationMs: 4300
      },
      {
        type: 'interact',
        leoMood: 'ask',
        promptEn: 'Tap the Toothbrush to brush our teeth!',
        promptVi: 'Chạm vào Bàn Chải (Toothbrush) để đánh răng sạch bóng nào!',
        targetId: 'toothbrush',
        successEn: 'Sparkling clean! What a bright smile!',
        successVi: 'Răng sạch sáng bóng rồi! Nụ cười thật tươi!',
        items: [
          { id: 'pillow', emoji: '🛋️', label: 'Pillow', x: 26, y: 60 },
          { id: 'toothbrush', emoji: '🪥', label: 'Toothbrush', x: 54, y: 58 },
          { id: 'clock', emoji: '⏰', label: 'Clock', x: 82, y: 60 }
        ]
      },
      {
        type: 'sequence',
        leoMood: 'ask',
        promptEn: 'Put our morning routine in order! Wake up, Eat Breakfast, then Go to School!',
        promptVi: 'Sắp xếp buổi sáng đúng thứ tự: Thức dậy ➔ Ăn sáng ➔ Đến trường!',
        order: ['wake', 'eat', 'school'],
        successEn: 'Perfect order! You have a super healthy morning habit!',
        successVi: 'Chính xác tuyệt đối! Bé có thói quen buổi sáng thật khoa học!',
        items: [
          { id: 'school', emoji: '🏫', label: 'Go to School', x: 80, y: 58 },
          { id: 'wake', emoji: '⏰', label: 'Wake Up', x: 26, y: 58 },
          { id: 'eat', emoji: '🥣', label: 'Eat Breakfast', x: 53, y: 58 }
        ]
      },
      {
        type: 'interact',
        leoMood: 'ask',
        promptEn: 'Do not forget your school Backpack!',
        promptVi: 'Đừng quên chiếc Cặp Sách (Backpack) đi học nhé bé ơi!',
        targetId: 'backpack',
        successEn: 'All set! Have a wonderful day at school!',
        successVi: 'Sẵn sàng rồi! Chúc bé một ngày đi học thật vui!',
        items: [
          { id: 'ball', emoji: '⚽', label: 'Ball', x: 26, y: 60 },
          { id: 'teddy', emoji: '🧸', label: 'Teddy Bear', x: 54, y: 60 },
          { id: 'backpack', emoji: '🎒', label: 'Backpack', x: 82, y: 58 }
        ]
      },
      {
        type: 'story',
        leoMood: 'celebrate',
        props: [
          { emoji: '🏫', x: 52, y: 46, size: 4.0 },
          { emoji: '🎒', x: 26, y: 62, size: 2.8, anim: 'bob' },
          { emoji: '🌟', x: 80, y: 36, size: 2.8, anim: 'float' }
        ],
        en: 'Hooray! You are ready to learn new things today!',
        vi: 'Hoan hô! Bé đã sẵn sàng học thêm thật nhiều điều thú vị hôm nay!',
        durationMs: 4200
      }
    ]
  },
  {
    id: 'weather_picnic',
    num: 'Tập 7',
    level: 'A1',
    host: 'lulu',
    titleVi: 'Dã Ngoại Bốn Mùa Thời Tiết',
    titleEn: 'Weather Picnic Day',
    icon: '⛅',
    duration: '2.5 phút • 3 thử thách',
    theme: 'weather',
    color: '#0EA5E9',
    bgSoft: '#E0F2FE',
    scenes: [
      {
        type: 'story',
        leoMood: 'wave',
        props: [
          { emoji: '⛅', x: 30, y: 26, size: 3.4, anim: 'float' },
          { emoji: '🧺', x: 56, y: 64, size: 3.2 },
          { emoji: '🪁', x: 80, y: 30, size: 2.8, anim: 'bob' }
        ],
        en: 'Hi friends! I am Lulu! Let us check the weather before our picnic!',
        vi: 'Chào các bạn! Tớ là Thỏ Lulu! Hãy cùng xem thời tiết trước khi đi dã ngoại nhé!',
        durationMs: 4400
      },
      {
        type: 'interact',
        leoMood: 'ask',
        promptEn: 'Oh no! Raindrops are falling! Tap the Umbrella to stay dry!',
        promptVi: 'Ôi trời đổ mưa rồi! Chạm vào Chiếc Ô (Umbrella) để không bị ướt nào!',
        targetId: 'umbrella',
        successEn: 'Phew! The Umbrella keeps us nice and dry!',
        successVi: 'May quá! Chiếc Ô (Umbrella) giúp chúng mình luôn khô ráo!',
        items: [
          { id: 'umbrella', emoji: '☂️', label: 'Umbrella', x: 26, y: 58 },
          { id: 'icecream', emoji: '🍦', label: 'Ice Cream', x: 54, y: 58 },
          { id: 'sunglasses', emoji: '🕶️', label: 'Sunglasses', x: 82, y: 58 }
        ]
      },
      {
        type: 'count',
        leoMood: 'ask',
        promptEn: 'The rain stopped! Tap all four fluffy Clouds to blow them away!',
        promptVi: 'Tạnh mưa rồi! Chạm vào đủ 4 đám Mây (Clouds) để nắng vàng hiện ra nhé!',
        itemNoun: 'clouds',
        successEn: 'Hooray! Four clouds floated away and the sun is shining!',
        successVi: 'Hoan hô! 4 đám mây đã bay đi và ông mặt trời lại tỏa nắng!',
        items: [
          { id: 'cl1', emoji: '☁️', label: 'Cloud', x: 22, y: 40 },
          { id: 'cl2', emoji: '☁️', label: 'Cloud', x: 44, y: 54 },
          { id: 'cl3', emoji: '☁️', label: 'Cloud', x: 66, y: 38 },
          { id: 'cl4', emoji: '☁️', label: 'Cloud', x: 84, y: 54 }
        ]
      },
      {
        type: 'dialogue',
        leoMood: 'ask',
        promptEn: 'Now it is sunny and warm! What is the weather like today?',
        promptVi: 'Bây giờ nắng vàng ấm áp quá! Trả lời câu hỏi thời tiết bằng tiếng Anh nhé!',
        targetId: 'sunny',
        successEn: 'It is sunny and warm! Perfect for flying a kite!',
        successVi: 'Trời nắng và ấm áp (It is sunny and warm)! Quá tuyệt để thả diều!',
        options: [
          { id: 'sunny', emoji: '☀️', en: 'It is sunny and warm!', vi: 'Trời nắng và ấm áp!' },
          { id: 'snowy', emoji: '❄️', en: 'It is snowy and freezing!', vi: 'Trời có tuyết lạnh cóng!' },
          { id: 'stormy', emoji: '⛈️', en: 'There is a big storm!', vi: 'Đang có bão lớn!' }
        ]
      },
      {
        type: 'story',
        leoMood: 'celebrate',
        props: [
          { emoji: '☀️', x: 52, y: 26, size: 3.8, anim: 'float' },
          { emoji: '🪁', x: 26, y: 48, size: 3.1, anim: 'bob' },
          { emoji: '🥪', x: 78, y: 62, size: 2.9, anim: 'bob' }
        ],
        en: 'Sunny, rainy, or windy, every day is a fun adventure!',
        vi: 'Dù nắng, mưa hay gió mát, mỗi ngày đều là một chuyến phiêu lưu thật vui!',
        durationMs: 4200
      }
    ]
  },
  {
    id: 'music_band',
    num: 'Tập 8',
    level: 'A1',
    host: 'lulu',
    titleVi: 'Ban Nhạc Rừng Xanh',
    titleEn: 'Forest Music Band',
    icon: '🎸',
    duration: '2.5 phút • 3 thử thách',
    theme: 'music',
    color: '#A855F7',
    bgSoft: '#F3E8FF',
    scenes: [
      {
        type: 'story',
        leoMood: 'wave',
        props: [
          { emoji: '🎵', x: 26, y: 30, size: 2.8, anim: 'float' },
          { emoji: '🎸', x: 54, y: 56, size: 3.6, anim: 'bob' },
          { emoji: '🎶', x: 80, y: 28, size: 3.0, anim: 'float' }
        ],
        en: 'Welcome to our Forest Concert! Let us play music together!',
        vi: 'Chào mừng đến buổi Hòa Nhạc Rừng Xanh! Cùng chơi nhạc với Thỏ Lulu nào!',
        durationMs: 4300
      },
      {
        type: 'interact',
        leoMood: 'ask',
        promptEn: 'Tap the shiny golden Trumpet!',
        promptVi: 'Hãy chạm vào chiếc Kèn Trăm-pét (Trumpet) màu vàng lấp lánh nào!',
        targetId: 'trumpet',
        successEn: 'Toot toot! The Trumpet sounds bright and cheerful!',
        successVi: 'Tò te! Tiếng Kèn Trăm-pét (Trumpet) thật vang và rộn ràng!',
        items: [
          { id: 'violin', emoji: '🎻', label: 'Violin', x: 26, y: 58 },
          { id: 'trumpet', emoji: '🎺', label: 'Trumpet', x: 54, y: 58 },
          { id: 'piano', emoji: '🎹', label: 'Piano', x: 82, y: 58 }
        ]
      },
      {
        type: 'count',
        leoMood: 'ask',
        promptEn: 'Let us keep the rhythm! Tap all four Drums to beat!',
        promptVi: 'Cùng giữ nhịp điệu nhé! Chạm lần lượt vào cả 4 chiếc Trống (Drums) nào!',
        itemNoun: 'drums',
        successEn: 'Boom, boom, boom, boom! Four steady drum beats!',
        successVi: 'Tùng, tùng, tùng, tùng! 4 nhịp trống thật đều và hay!',
        items: [
          { id: 'dr1', emoji: '🥁', label: 'Drum', x: 22, y: 58 },
          { id: 'dr2', emoji: '🥁', label: 'Drum', x: 43, y: 48 },
          { id: 'dr3', emoji: '🥁', label: 'Drum', x: 64, y: 58 },
          { id: 'dr4', emoji: '🥁', label: 'Drum', x: 84, y: 48 }
        ]
      },
      {
        type: 'sequence',
        leoMood: 'ask',
        promptEn: 'Help our band perform! Tap Practice, then Perform, then Applause!',
        promptVi: 'Giúp ban nhạc biểu diễn đúng trình tự: Luyện tập ➔ Biểu diễn ➔ Vỗ tay!',
        order: ['practice', 'perform', 'applause'],
        successEn: 'Bravo! Practice makes our concert unforgettable!',
        successVi: 'Hoan hô! Chăm chỉ luyện tập giúp buổi biểu diễn thật bùng nổ!',
        items: [
          { id: 'applause', emoji: '👏', label: 'Applause', x: 80, y: 58 },
          { id: 'perform', emoji: '🎤', label: 'Perform', x: 53, y: 58 },
          { id: 'practice', emoji: '🎼', label: 'Practice', x: 26, y: 58 }
        ]
      },
      {
        type: 'story',
        leoMood: 'celebrate',
        props: [
          { emoji: '🎸', x: 24, y: 58, size: 3.1, anim: 'bob' },
          { emoji: '🎤', x: 54, y: 52, size: 3.3, anim: 'float' },
          { emoji: '👏', x: 82, y: 58, size: 3.1, anim: 'bob' }
        ],
        en: 'What a wonderful concert! Thank you, musical superstar!',
        vi: 'Buổi hòa nhạc thật tuyệt vời! Cảm ơn siêu sao âm nhạc nhí nhé!',
        durationMs: 4200
      }
    ]
  },

  /* ======================= A2 (4 EPISODES) ======================= */
  {
    id: 'space',
    num: 'Tập 9',
    level: 'A2',
    host: 'leo',
    titleVi: 'Du Hành Vũ Trụ',
    titleEn: 'Space Explorer',
    icon: '🚀',
    duration: '2.5 phút • 4 thử thách',
    theme: 'space',
    color: '#7C3AED',
    bgSoft: '#EDE9FE',
    scenes: [
      {
        type: 'story',
        leoMood: 'wave',
        props: [
          { emoji: '🚀', x: 52, y: 48, size: 4.0, anim: 'float' },
          { emoji: '🪐', x: 22, y: 28, size: 3.0, anim: 'bob' },
          { emoji: '⭐', x: 80, y: 24, size: 2.6, anim: 'bob' }
        ],
        en: '3, 2, 1, Blast off! Let us explore outer space!',
        vi: '3, 2, 1, Phóng tên lửa! Cùng Leo khám phá vũ trụ bao la nào!',
        durationMs: 4300
      },
      {
        type: 'interact',
        leoMood: 'ask',
        promptEn: 'Tap our home planet Earth!',
        promptVi: 'Bé hãy chạm vào hành tinh Trái Đất (Earth) thân yêu của chúng ta nhé!',
        targetId: 'earth',
        successEn: 'Beautiful! Earth is blue and green!',
        successVi: 'Đẹp quá! Trái Đất (Earth) có màu xanh dương và xanh lá!',
        items: [
          { id: 'earth', emoji: '🌍', label: 'Earth', x: 26, y: 52 },
          { id: 'saturn', emoji: '🪐', label: 'Saturn', x: 54, y: 50 },
          { id: 'moon', emoji: '🌙', label: 'Moon', x: 82, y: 52 }
        ]
      },
      {
        type: 'interact',
        leoMood: 'ask',
        promptEn: 'Who wears a space suit? Tap the Astronaut!',
        promptVi: 'Ai mặc bộ đồ du hành vũ trụ nhỉ? Chạm vào Phi Hành Gia (Astronaut) nào!',
        targetId: 'astronaut',
        successEn: 'Awesome! The Astronaut floats in space!',
        successVi: 'Tuyệt vời! Cô chú Phi Hành Gia (Astronaut) bay lơ lửng ngoài không gian!',
        items: [
          { id: 'alien', emoji: '👽', label: 'Alien', x: 26, y: 56 },
          { id: 'astronaut', emoji: '🧑‍🚀', label: 'Astronaut', x: 54, y: 52 },
          { id: 'robot', emoji: '🤖', label: 'Robot', x: 82, y: 56 }
        ]
      },
      {
        type: 'count',
        leoMood: 'ask',
        promptEn: 'Make a wish! Count all five glowing Stars!',
        promptVi: 'Hãy ước một điều ước! Chạm đếm đủ 5 Ngôi Sao (Stars) lấp lánh nào!',
        itemNoun: 'stars',
        successEn: 'Twinkle twinkle! Five glowing stars in the galaxy!',
        successVi: 'Lấp lánh quá! 5 ngôi sao rực sáng trên dải ngân hà!',
        items: [
          { id: 's1', emoji: '⭐', label: 'Star', x: 20, y: 42 },
          { id: 's2', emoji: '⭐', label: 'Star', x: 37, y: 58 },
          { id: 's3', emoji: '⭐', label: 'Star', x: 54, y: 38 },
          { id: 's4', emoji: '⭐', label: 'Star', x: 71, y: 58 },
          { id: 's5', emoji: '⭐', label: 'Star', x: 86, y: 42 }
        ]
      },
      {
        type: 'story',
        leoMood: 'celebrate',
        props: [
          { emoji: '🌍', x: 24, y: 54, size: 3.1, anim: 'float' },
          { emoji: '🚀', x: 52, y: 46, size: 3.6, anim: 'bob' },
          { emoji: '🏆', x: 80, y: 54, size: 3.1, anim: 'float' }
        ],
        en: 'Mission complete! You are a true Space Champion!',
        vi: 'Hoàn thành sứ mệnh vũ trụ! Bé đúng là Nhà Vô Địch Vũ Trụ!',
        durationMs: 4200
      }
    ]
  },
  {
    id: 'ocean_dive',
    num: 'Tập 10',
    level: 'A2',
    host: 'leo',
    titleVi: 'Lặn Biển Khám Phá Đại Dương',
    titleEn: 'Deep Ocean Dive',
    icon: '🐳',
    duration: '2.5 phút • 3 thử thách',
    theme: 'ocean',
    color: '#0284C7',
    bgSoft: '#E0F2FE',
    scenes: [
      {
        type: 'story',
        leoMood: 'wave',
        props: [
          { emoji: '🤿', x: 24, y: 46, size: 3.0, anim: 'float' },
          { emoji: '🐳', x: 56, y: 44, size: 4.0, anim: 'bob' },
          { emoji: '🪸', x: 80, y: 68, size: 3.0 }
        ],
        en: 'Splash! Put on your diving mask and explore the coral reef!',
        vi: 'Ùm! Đeo kính lặn vào và cùng Leo khám phá rạn san hô đại dương nào!',
        durationMs: 4400
      },
      {
        type: 'interact',
        leoMood: 'ask',
        promptEn: 'Which sea creature has eight long arms? Tap the Octopus!',
        promptVi: 'Sinh vật biển nào có 8 chiếc xúc tu dài nhỉ? Chạm vào Bạch Tuộc (Octopus)!',
        targetId: 'octopus',
        successEn: 'Smart! The Octopus has eight clever arms!',
        successVi: 'Thông minh quá! Bạch Tuộc (Octopus) có tới 8 chiếc xúc tu khéo léo!',
        items: [
          { id: 'crab', emoji: '🦀', label: 'Crab', x: 26, y: 60 },
          { id: 'octopus', emoji: '🐙', label: 'Octopus', x: 54, y: 54 },
          { id: 'starfish', emoji: '⭐', label: 'Starfish', x: 82, y: 62 }
        ]
      },
      {
        type: 'count',
        leoMood: 'ask',
        promptEn: 'Look! Baby Sea Turtles are swimming! Tap to count them all!',
        promptVi: 'Nhìn kìa! Các bạn Rùa Biển đang bơi! Chạm để đếm hết các bạn ấy nhé!',
        itemNoun: 'turtles',
        successEn: 'Wonderful! Four gentle sea turtles gliding through the water!',
        successVi: 'Tuyệt vời! 4 bạn Rùa Biển (Four turtles) đang bơi nhẹ nhàng dưới làn nước!',
        items: [
          { id: 't1', emoji: '🐢', label: 'Turtle', x: 22, y: 56 },
          { id: 't2', emoji: '🐢', label: 'Turtle', x: 43, y: 42 },
          { id: 't3', emoji: '🐢', label: 'Turtle', x: 64, y: 58 },
          { id: 't4', emoji: '🐢', label: 'Turtle', x: 84, y: 44 }
        ]
      },
      {
        type: 'dialogue',
        leoMood: 'ask',
        promptEn: 'We see a plastic bottle floating in the ocean. What should we do?',
        promptVi: 'Chúng mình thấy một chai nhựa trôi trên biển. Mình nên làm gì nhỉ?',
        targetId: 'clean',
        successEn: 'Heroic! Picking up plastic keeps dolphins and turtles safe!',
        successVi: 'Thật tuyệt vời! Nhặt rác nhựa giúp cá heo và rùa biển luôn an toàn!',
        options: [
          { id: 'clean', emoji: '♻️', en: 'Pick it up and recycle it!', vi: 'Nhặt lên và đem đi tái chế!' },
          { id: 'leave', emoji: '🙈', en: 'Leave it in the water.', vi: 'Cứ để nó trôi dưới nước.' },
          { id: 'more', emoji: '🗑️', en: 'Throw more trash.', vi: 'Vứt thêm rác xuống.' }
        ]
      },
      {
        type: 'story',
        leoMood: 'celebrate',
        props: [
          { emoji: '🐬', x: 24, y: 48, size: 3.2, anim: 'float' },
          { emoji: '🐢', x: 54, y: 58, size: 3.1, anim: 'bob' },
          { emoji: '🪸', x: 82, y: 62, size: 3.1 }
        ],
        en: 'The ocean animals cheer for you! You are an Ocean Guardian!',
        vi: 'Các bạn sinh vật biển cổ vũ cho bé! Bé là Người Bảo Vệ Đại Dương!',
        durationMs: 4200
      }
    ]
  },
  {
    id: 'bakery_chef',
    num: 'Tập 11',
    level: 'A2',
    host: 'lulu',
    titleVi: 'Đầu Bếp Nhí Làm Bánh',
    titleEn: 'Little Bakery Chef',
    icon: '🧁',
    duration: '2.5 phút • 3 thử thách',
    theme: 'bakery',
    color: '#F43F5E',
    bgSoft: '#FFE4E6',
    scenes: [
      {
        type: 'story',
        leoMood: 'wave',
        props: [
          { emoji: '👩‍🍳', x: 24, y: 56, size: 3.3 },
          { emoji: '🧁', x: 54, y: 54, size: 3.6, anim: 'float' },
          { emoji: '🥐', x: 80, y: 58, size: 3.0, anim: 'bob' }
        ],
        en: 'Welcome to Lulu Bakery! Today we are baking sweet cupcakes!',
        vi: 'Chào mừng đến Tiệm Bánh của Lulu! Hôm nay chúng mình sẽ nướng bánh cupcake ngọt ngào!',
        durationMs: 4400
      },
      {
        type: 'sequence',
        leoMood: 'ask',
        promptEn: 'Follow the recipe in order! Tap Flour, then Mix Dough, then Bake!',
        promptVi: 'Làm đúng công thức nấu ăn nhé: Bột mì (Flour) ➔ Trộn bột (Mix) ➔ Nướng bánh (Bake)!',
        order: ['flour', 'mix', 'bake'],
        successEn: 'Yum! The kitchen smells like fresh warm cupcakes!',
        successVi: 'Thơm quá! Căn bếp ngập tràn mùi bánh cupcake mới nướng!',
        items: [
          { id: 'bake', emoji: '♨️', label: 'Bake', x: 80, y: 58 },
          { id: 'flour', emoji: '🌾', label: 'Flour', x: 26, y: 58 },
          { id: 'mix', emoji: '🥣', label: 'Mix Dough', x: 53, y: 58 }
        ]
      },
      {
        type: 'count',
        leoMood: 'ask',
        promptEn: 'Ding! The oven is done! Count all four Cupcakes on the tray!',
        promptVi: 'Ting! Lò nướng xong rồi! Chạm đếm đủ 4 chiếc bánh Cupcake trên khay nào!',
        itemNoun: 'cupcakes',
        successEn: 'Delicious! Four freshly baked cupcakes ready to share!',
        successVi: 'Ngon tuyệt! 4 chiếc bánh cupcake nóng hổi đã sẵn sàng!',
        items: [
          { id: 'cp1', emoji: '🧁', label: 'Cupcake', x: 22, y: 56 },
          { id: 'cp2', emoji: '🧁', label: 'Cupcake', x: 43, y: 48 },
          { id: 'cp3', emoji: '🧁', label: 'Cupcake', x: 64, y: 56 },
          { id: 'cp4', emoji: '🧁', label: 'Cupcake', x: 84, y: 48 }
        ]
      },
      {
        type: 'dialogue',
        leoMood: 'ask',
        promptEn: 'A customer arrives at our bakery. How should we welcome them?',
        promptVi: 'Có vị khách ghé tiệm bánh! Đầu bếp nhí nên chào đón khách thế nào cho lịch sự?',
        targetId: 'order',
        successEn: 'Welcome! What would you like to order today? So polite!',
        successVi: 'Chào mừng quý khách! Bạn muốn đặt món gì hôm nay? Thật chuyên nghiệp!',
        options: [
          { id: 'order', emoji: '😊', en: 'Welcome! What would you like?', vi: 'Chào mừng! Bạn muốn dùng món gì?' },
          { id: 'close', emoji: '🚪', en: 'Go away, I am busy!', vi: 'Đi chỗ khác đi, tớ bận!' },
          { id: 'sleep', emoji: '💤', en: 'Where is my bed?', vi: 'Giường của tớ ở đâu?' }
        ]
      },
      {
        type: 'story',
        leoMood: 'celebrate',
        props: [
          { emoji: '🧁', x: 26, y: 56, size: 3.2, anim: 'bob' },
          { emoji: '🎂', x: 54, y: 52, size: 3.6, anim: 'float' },
          { emoji: '⭐', x: 80, y: 40, size: 3.0, anim: 'bob' }
        ],
        en: 'Five stars for our Little Bakery Chef! Sharing food brings joy!',
        vi: '5 sao cho Đầu Bếp Nhí tài ba! Chia sẻ món ngon mang lại niềm vui!',
        durationMs: 4200
      }
    ]
  },
  {
    id: 'feelings_park',
    num: 'Tập 12',
    level: 'A2',
    host: 'toby',
    titleVi: 'Công Viên Cảm Xúc & Sẻ Chia',
    titleEn: 'Feelings & Kindness Park',
    icon: '💖',
    duration: '2.5 phút • 3 thử thách',
    theme: 'park',
    color: '#EC4899',
    bgSoft: '#FCE7F3',
    scenes: [
      {
        type: 'story',
        leoMood: 'wave',
        props: [
          { emoji: '🌳', x: 20, y: 56, size: 3.4 },
          { emoji: '💖', x: 54, y: 34, size: 3.4, anim: 'float' },
          { emoji: '🛝', x: 80, y: 58, size: 3.2 }
        ],
        en: 'Hello! Today at the park, let us learn about feelings and kindness!',
        vi: 'Chào bé! Hôm nay ở công viên, hãy cùng Cáo Toby học về cảm xúc và lòng tốt nhé!',
        durationMs: 4500
      },
      {
        type: 'interact',
        leoMood: 'ask',
        promptEn: 'Mimi dropped her ice cream and feels Sad. Tap the Sad face!',
        promptVi: 'Mimi làm rơi kem nên cảm thấy Buồn (Sad). Chạm vào biểu cảm Buồn nhé!',
        targetId: 'sad',
        successEn: 'Good eyes! Noticing when a friend is sad shows empathy!',
        successVi: 'Tinh mắt lắm! Nhận ra khi bạn đang buồn là biểu hiện của sự đồng cảm!',
        items: [
          { id: 'happy', emoji: '😄', label: 'Happy', x: 26, y: 58 },
          { id: 'sad', emoji: '😢', label: 'Sad', x: 54, y: 58 },
          { id: 'surprised', emoji: '😲', label: 'Surprised', x: 82, y: 58 }
        ]
      },
      {
        type: 'dialogue',
        leoMood: 'ask',
        promptEn: 'What is the kindest thing to say to cheer Mimi up?',
        promptVi: 'Lời nói dịu dàng nhất để an ủi bạn Mimi lúc này là gì nhỉ?',
        targetId: 'share',
        successEn: 'It is okay! Let us share my ice cream! Mimi is smiling again!',
        successVi: 'Không sao đâu! Cùng ăn chung kem với tớ nhé! Mimi cười tươi lại rồi!',
        options: [
          { id: 'share', emoji: '🤝', en: 'It is okay! Let us share mine!', vi: 'Không sao đâu! Ăn chung với tớ nhé!' },
          { id: 'laugh', emoji: '😜', en: 'Haha, you dropped it!', vi: 'Haha, cậu làm rơi rồi!' },
          { id: 'ignore', emoji: '🚶', en: 'I do not care.', vi: 'Tớ chẳng quan tâm.' }
        ]
      },
      {
        type: 'sequence',
        leoMood: 'ask',
        promptEn: 'When we feel Angry, how do we calm down? Stop, Breathe, then Talk!',
        promptVi: 'Khi giận dữ, hãy bình tĩnh theo 3 bước: Dừng lại ➔ Hít thở sâu ➔ Nói nhẹ nhàng!',
        order: ['stop', 'breathe', 'talk'],
        successEn: 'Wise choice! Deep breaths help our heart feel calm and peaceful!',
        successVi: 'Lựa chọn sáng suốt! Hít thở sâu giúp trái tim bình an trở lại!',
        items: [
          { id: 'talk', emoji: '💬', label: 'Talk Calmly', x: 80, y: 58 },
          { id: 'breathe', emoji: '🌬️', label: 'Deep Breath', x: 53, y: 58 },
          { id: 'stop', emoji: '✋', label: 'Pause', x: 26, y: 58 }
        ]
      },
      {
        type: 'story',
        leoMood: 'celebrate',
        props: [
          { emoji: '😊', x: 26, y: 56, size: 3.1, anim: 'bob' },
          { emoji: '💖', x: 54, y: 44, size: 3.6, anim: 'float' },
          { emoji: '🤝', x: 80, y: 56, size: 3.1, anim: 'bob' }
        ],
        en: 'Kind words make the whole park brighter! We are proud of you!',
        vi: 'Những lời nói tử tế làm cả công viên rạng rỡ hơn! Tớ rất tự hào về bé!',
        durationMs: 4200
      }
    ]
  },

  /* ======================= B1 (3 EPISODES) ======================= */
  {
    id: 'eco_heroes',
    num: 'Tập 13',
    level: 'B1',
    host: 'mimi',
    titleVi: 'Biệt Đội Xanh Bảo Vệ Trái Đất',
    titleEn: 'Eco-Heroes Save Earth',
    icon: '♻️',
    duration: '3 phút • 3 thử thách',
    theme: 'eco',
    color: '#059669',
    bgSoft: '#D1FAE5',
    scenes: [
      {
        type: 'story',
        leoMood: 'wave',
        props: [
          { emoji: '🌍', x: 52, y: 42, size: 3.8, anim: 'float' },
          { emoji: '♻️', x: 24, y: 58, size: 3.0, anim: 'bob' },
          { emoji: '🌱', x: 80, y: 60, size: 3.0, anim: 'bob' }
        ],
        en: 'Hello Eco-Hero! I am Mimi. Today we will protect our environment!',
        vi: 'Chào Siêu Anh Hùng Xanh! Tớ là Mimi. Hôm nay chúng ta cùng bảo vệ môi trường nhé!',
        durationMs: 4500
      },
      {
        type: 'interact',
        leoMood: 'ask',
        promptEn: 'Which clean invention turns sunlight into electricity? Tap the Solar Panel!',
        promptVi: 'Phát minh xanh nào biến ánh nắng thành điện năng? Chạm vào Tấm Pin Mặt Trời (Solar Panel)!',
        targetId: 'solar',
        successEn: 'Brilliant! Solar energy reduces pollution and helps our climate!',
        successVi: 'Xuất sắc! Năng lượng mặt trời giúp giảm ô nhiễm và bảo vệ khí hậu!',
        items: [
          { id: 'smoke', emoji: '🏭', label: 'Pollution', x: 26, y: 58 },
          { id: 'solar', emoji: '☀️', label: 'Solar Panel', x: 54, y: 56 },
          { id: 'trash', emoji: '🗑️', label: 'Waste', x: 82, y: 58 }
        ]
      },
      {
        type: 'count',
        leoMood: 'ask',
        promptEn: 'Let us reforest the valley! Tap to plant all four young Trees!',
        promptVi: 'Hãy cùng trồng lại rừng cho thung lũng! Chạm trồng đủ 4 cây xanh nào!',
        itemNoun: 'trees',
        successEn: 'Awesome! Four growing trees create fresh oxygen for wildlife!',
        successVi: 'Tuyệt vời! 4 cây xanh đang lớn mang lại khí ô-xy trong lành cho thiên nhiên!',
        items: [
          { id: 'tr1', emoji: '🌲', label: 'Tree', x: 22, y: 58 },
          { id: 'tr2', emoji: '🌳', label: 'Tree', x: 43, y: 52 },
          { id: 'tr3', emoji: '🌲', label: 'Tree', x: 64, y: 58 },
          { id: 'tr4', emoji: '🌳', label: 'Tree', x: 84, y: 52 }
        ]
      },
      {
        type: 'dialogue',
        leoMood: 'ask',
        promptEn: 'How can students conserve resources every day at school?',
        promptVi: 'Học sinh có thể bảo tồn tài nguyên mỗi ngày ở trường bằng cách nào?',
        targetId: 'recycle',
        successEn: 'Exactly! Using reusable bottles and recycling paper makes a real impact!',
        successVi: 'Chính xác! Dùng bình nước tái sử dụng và tái chế giấy tạo nên thay đổi lớn!',
        options: [
          { id: 'recycle', emoji: '♻️', en: 'Recycle paper and bring reusable bottles!', vi: 'Tái chế giấy và mang bình nước dùng nhiều lần!' },
          { id: 'lights', emoji: '💡', en: 'Leave all lights on all night.', vi: 'Bật hết đèn sáng suốt cả đêm.' },
          { id: 'plastic', emoji: '🥤', en: 'Use ten plastic cups every day.', vi: 'Dùng mười cốc nhựa mỗi ngày.' }
        ]
      },
      {
        type: 'story',
        leoMood: 'celebrate',
        props: [
          { emoji: '🌳', x: 22, y: 58, size: 3.1, anim: 'bob' },
          { emoji: '🌍', x: 52, y: 44, size: 3.8, anim: 'float' },
          { emoji: '🦋', x: 80, y: 42, size: 2.9, anim: 'float' }
        ],
        en: 'Together we can conserve habitats and keep Earth green!',
        vi: 'Cùng nhau chúng ta có thể bảo tồn hệ sinh thái và giữ Trái Đất mãi xanh!',
        durationMs: 4300
      }
    ]
  },
  {
    id: 'world_traveler',
    num: 'Tập 14',
    level: 'B1',
    host: 'leo',
    titleVi: 'Du Lịch Vòng Quanh Thế Giới',
    titleEn: 'Around the World Explorer',
    icon: '✈️',
    duration: '3 phút • 3 thử thách',
    theme: 'city',
    color: '#2563EB',
    bgSoft: '#DBEAFE',
    scenes: [
      {
        type: 'story',
        leoMood: 'wave',
        props: [
          { emoji: '✈️', x: 54, y: 34, size: 3.8, anim: 'float' },
          { emoji: '🧳', x: 26, y: 62, size: 3.1 },
          { emoji: '🗺️', x: 80, y: 56, size: 3.0, anim: 'bob' }
        ],
        en: 'Pack your luggage! Today we are flying abroad to discover world cultures!',
        vi: 'Xếp hành lý nào! Hôm nay chúng ta bay ra nước ngoài khám phá văn hóa thế giới!',
        durationMs: 4500
      },
      {
        type: 'sequence',
        leoMood: 'ask',
        promptEn: 'Get ready to fly! Tap Check-in, then Boarding Pass, then Flight Departure!',
        promptVi: 'Chuẩn bị lên máy bay đúng thứ tự: Làm thủ tục ➔ Thẻ lên máy bay ➔ Khởi hành!',
        order: ['checkin', 'boarding', 'flight'],
        successEn: 'Smooth departure! Fasten your seatbelt for an exciting journey!',
        successVi: 'Khởi hành suôn sẻ! Thắt dây an toàn cho chuyến du hành kỳ thú nào!',
        items: [
          { id: 'flight', emoji: '🛫', label: 'Departure', x: 80, y: 58 },
          { id: 'checkin', emoji: '🧳', label: 'Check-in', x: 26, y: 58 },
          { id: 'boarding', emoji: '🎫', label: 'Boarding Pass', x: 53, y: 58 }
        ]
      },
      {
        type: 'interact',
        leoMood: 'ask',
        promptEn: 'We arrived! Tap the famous Landmark where we can learn ancient history!',
        promptVi: 'Chúng mình tới nơi rồi! Chạm vào Địa Danh Lịch Sử (Monument / Temple) nổi tiếng!',
        targetId: 'temple',
        successEn: 'Incredible! Exploring historic temples teaches us about ancient civilizations!',
        successVi: 'Tuyệt vời! Tham quan ngôi đền cổ giúp chúng ta hiểu về nền văn minh xưa!',
        items: [
          { id: 'temple', emoji: '🏛️', label: 'Monument', x: 26, y: 56 },
          { id: 'luggage', emoji: '🧳', label: 'Luggage', x: 54, y: 60 },
          { id: 'sofa', emoji: '🛋️', label: 'Sofa', x: 82, y: 60 }
        ]
      },
      {
        type: 'dialogue',
        leoMood: 'ask',
        promptEn: 'At the hotel reception, how do you politely ask about your reservation?',
        promptVi: 'Ở quầy lễ tân khách sạn, bạn hỏi về phòng đã đặt trước như thế nào cho chuẩn B1?',
        targetId: 'res',
        successEn: 'Hello, I have a reservation under my family name! Fluent and polite!',
        successVi: 'Xin chào, tôi có đặt phòng trước dưới tên gia đình tôi! Rất trôi chảy và lịch sự!',
        options: [
          { id: 'res', emoji: '🛎️', en: 'Hello, I have a reservation for tonight.', vi: 'Xin chào, tôi có đặt phòng cho tối nay.' },
          { id: 'hungry', emoji: '🍕', en: 'Give me free pizza now.', vi: 'Cho tôi pizza miễn phí ngay.' },
          { id: 'lost', emoji: '🛸', en: 'Where is the spaceship?', vi: 'Tàu vũ trụ ở đâu thế?' }
        ]
      },
      {
        type: 'story',
        leoMood: 'celebrate',
        props: [
          { emoji: '🗼', x: 24, y: 54, size: 3.1, anim: 'bob' },
          { emoji: '🌍', x: 54, y: 46, size: 3.6, anim: 'float' },
          { emoji: '📸', x: 80, y: 58, size: 3.0, anim: 'bob' }
        ],
        en: 'Every journey brings wonderful memories and new friendships!',
        vi: 'Mỗi chuyến đi đều mang lại những kỷ niệm tuyệt đẹp và những người bạn mới!',
        durationMs: 4200
      }
    ]
  },
  {
    id: 'science_lab',
    num: 'Tập 15',
    level: 'B1',
    host: 'mimi',
    titleVi: 'Phòng Thí Nghiệm Kỳ Diệu',
    titleEn: "Mimi's Science Lab",
    icon: '🔬',
    duration: '3 phút • 3 thử thách',
    theme: 'lab',
    color: '#0891B2',
    bgSoft: '#CFFAFE',
    scenes: [
      {
        type: 'story',
        leoMood: 'wave',
        props: [
          { emoji: '🔬', x: 26, y: 58, size: 3.4, anim: 'bob' },
          { emoji: '🧪', x: 54, y: 52, size: 3.4, anim: 'float' },
          { emoji: '⚡', x: 80, y: 42, size: 3.0, anim: 'bob' }
        ],
        en: 'Welcome to my Science Laboratory! Let us run exciting experiments!',
        vi: 'Chào mừng đến Phòng Thí Nghiệm của Mimi! Cùng làm những thí nghiệm khoa học kỳ thú nhé!',
        durationMs: 4500
      },
      {
        type: 'interact',
        leoMood: 'ask',
        promptEn: 'Which tool helps scientists see tiny cells? Tap the Microscope!',
        promptVi: 'Dụng cụ nào giúp nhà khoa học nhìn thấy tế bào siêu nhỏ? Chạm vào Kính Hiển Vi (Microscope)!',
        targetId: 'microscope',
        successEn: 'Spot on! A Microscope magnifies tiny organisms clearly!',
        successVi: 'Chính xác! Kính Hiển Vi (Microscope) phóng đại các sinh vật siêu nhỏ cực rõ!',
        items: [
          { id: 'magnet', emoji: '🧲', label: 'Magnet', x: 26, y: 58 },
          { id: 'microscope', emoji: '🔬', label: 'Microscope', x: 54, y: 56 },
          { id: 'battery', emoji: '🔋', label: 'Battery', x: 82, y: 58 }
        ]
      },
      {
        type: 'sequence',
        leoMood: 'ask',
        promptEn: 'Build the Water Cycle! Tap Evaporate, then Condense, then Rain!',
        promptVi: 'Sắp xếp Vòng Tuần Hoàn Nước: Bay hơi (Evaporate) ➔ Ngưng tụ (Condense) ➔ Mưa rơi (Rain)!',
        order: ['evaporate', 'condense', 'rain'],
        successEn: 'Outstanding! Sunlight evaporates water, clouds condense it, and rain falls!',
        successVi: 'Xuất sắc! Ánh nắng làm nước bay hơi, tạo mây ngưng tụ rồi rơi xuống thành mưa!',
        items: [
          { id: 'rain', emoji: '🌧️', label: 'Rain', x: 80, y: 58 },
          { id: 'condense', emoji: '☁️', label: 'Condense', x: 53, y: 58 },
          { id: 'evaporate', emoji: '💨', label: 'Evaporate', x: 26, y: 58 }
        ]
      },
      {
        type: 'dialogue',
        leoMood: 'ask',
        promptEn: 'Why does an apple fall down from a tree instead of floating up?',
        promptVi: 'Vì sao quả táo rơi xuống đất thay vì bay lơ lửng lên trời nhỉ?',
        targetId: 'gravity',
        successEn: 'Because of Gravity! Earth pulls objects gently toward its center!',
        successVi: 'Nhờ Trọng Lực (Gravity)! Trái Đất tạo lực hấp dẫn hút mọi vật về phía tâm!',
        options: [
          { id: 'gravity', emoji: '🍎', en: 'Because Earth has gravity!', vi: 'Vì Trái Đất có trọng lực!' },
          { id: 'magic', emoji: '🪄', en: 'Because apples dislike clouds.', vi: 'Vì quả táo không thích mây.' },
          { id: 'wind', emoji: '🎈', en: 'Because gravity pushes upward.', vi: 'Vì trọng lực đẩy lên trên.' }
        ]
      },
      {
        type: 'story',
        leoMood: 'celebrate',
        props: [
          { emoji: '🔬', x: 24, y: 58, size: 3.1, anim: 'bob' },
          { emoji: '💡', x: 54, y: 42, size: 3.6, anim: 'float' },
          { emoji: '🧪', x: 80, y: 58, size: 3.1, anim: 'bob' }
        ],
        en: 'Curiosity leads to great discoveries! Keep asking great questions!',
        vi: 'Sự tò mò dẫn lối tới những khám phá vĩ đại! Hãy luôn đặt những câu hỏi hay nhé!',
        durationMs: 4200
      }
    ]
  },

  /* ======================= B2 (3 EPISODES) ======================= */
  {
    id: 'future_city',
    num: 'Tập 16',
    level: 'B2',
    host: 'mimi',
    titleVi: 'Thành Phố Tương Lai & AI',
    titleEn: 'Future City & Innovation',
    icon: '🤖',
    duration: '3 phút • 3 thử thách',
    theme: 'future',
    color: '#4F46E5',
    bgSoft: '#E0E7FF',
    scenes: [
      {
        type: 'story',
        leoMood: 'wave',
        props: [
          { emoji: '🤖', x: 26, y: 56, size: 3.4, anim: 'bob' },
          { emoji: '🏙️', x: 54, y: 42, size: 4.0 },
          { emoji: '⚡', x: 82, y: 38, size: 3.0, anim: 'float' }
        ],
        en: 'Welcome to Tomorrow City! Let us see how sustainable innovation shapes our future!',
        vi: 'Chào mừng đến Thành Phố Tương Lai! Cùng xem đổi mới bền vững kiến tạo ngày mai ra sao!',
        durationMs: 4600
      },
      {
        type: 'sequence',
        leoMood: 'ask',
        promptEn: 'How do pioneers build a breakthrough? Tap Research, Prototype, then Launch!',
        promptVi: 'Quy trình tạo nên bước đột phá công nghệ: Nghiên cứu ➔ Nguyên mẫu ➔ Ra mắt!',
        order: ['research', 'prototype', 'launch'],
        successEn: 'Exactly! Careful research and testing prototypes ensure reliable technology!',
        successVi: 'Chính xác! Nghiên cứu kỹ và thử nghiệm nguyên mẫu tạo ra công nghệ đáng tin cậy!',
        items: [
          { id: 'launch', emoji: '🚀', label: 'Launch', x: 80, y: 58 },
          { id: 'research', emoji: '🔬', label: 'Research', x: 26, y: 58 },
          { id: 'prototype', emoji: '📐', label: 'Prototype', x: 53, y: 58 }
        ]
      },
      {
        type: 'interact',
        leoMood: 'ask',
        promptEn: 'Which digital shield protects our personal data online? Tap Cybersecurity!',
        promptVi: 'Lá chắn số nào bảo vệ dữ liệu cá nhân trên mạng? Chạm vào An Ninh Mạng (Cybersecurity)!',
        targetId: 'cyber',
        successEn: 'Well done! Strong passwords and cybersecurity keep our digital world safe!',
        successVi: 'Rất giỏi! Mật khẩu mạnh và an ninh mạng bảo vệ thế giới số luôn an toàn!',
        items: [
          { id: 'cyber', emoji: '🔐', label: 'Cybersecurity', x: 26, y: 56 },
          { id: 'drone', emoji: '🚁', label: 'Drone', x: 54, y: 56 },
          { id: 'vr', emoji: '🥽', label: 'Virtual', x: 82, y: 56 }
        ]
      },
      {
        type: 'dialogue',
        leoMood: 'ask',
        promptEn: 'How should humans collaborate with Artificial Intelligence wisely?',
        promptVi: 'Con người nên hợp tác với Trí Tuệ Nhân Tạo (AI) một cách thông minh ra sao?',
        targetId: 'collab',
        successEn: 'Wise perspective! AI is a helpful tool while human creativity and ethics lead!',
        successVi: 'Góc nhìn thật sâu sắc! AI là công cụ hỗ trợ, còn sáng tạo và đạo đức con người dẫn dắt!',
        options: [
          { id: 'collab', emoji: '🤝', en: 'Use AI as a tool guided by human ethics.', vi: 'Dùng AI như công cụ dưới định hướng đạo đức con người.' },
          { id: 'stop', emoji: '🙈', en: 'Stop learning because AI knows everything.', vi: 'Ngừng học vì AI biết hết rồi.' },
          { id: 'never', emoji: '🚫', en: 'Never verify any facts or data.', vi: 'Không bao giờ kiểm chứng dữ liệu.' }
        ]
      },
      {
        type: 'story',
        leoMood: 'celebrate',
        props: [
          { emoji: '🤖', x: 24, y: 56, size: 3.1, anim: 'bob' },
          { emoji: '🌱', x: 54, y: 54, size: 3.4, anim: 'float' },
          { emoji: '🚀', x: 82, y: 44, size: 3.2, anim: 'float' }
        ],
        en: 'With vision and sustainability, you can build an extraordinary future!',
        vi: 'Với tầm nhìn và sự bền vững, bạn có thể kiến tạo một tương lai phi thường!',
        durationMs: 4300
      }
    ]
  },
  {
    id: 'detective_mystery',
    num: 'Tập 17',
    level: 'B2',
    host: 'toby',
    titleVi: 'Thám Tử Nhí Giải Mã Bí Ẩn',
    titleEn: 'Critical Thinking Detective',
    icon: '🕵️',
    duration: '3 phút • 3 thử thách',
    theme: 'detective',
    color: '#7C3AED',
    bgSoft: '#F3E8FF',
    scenes: [
      {
        type: 'story',
        leoMood: 'wave',
        props: [
          { emoji: '🔍', x: 28, y: 52, size: 3.4, anim: 'bob' },
          { emoji: '🕵️', x: 54, y: 52, size: 3.6, anim: 'float' },
          { emoji: '📋', x: 80, y: 56, size: 3.0 }
        ],
        en: 'Case open! The golden trophy vanished from school. Let us use critical thinking!',
        vi: 'Mở hồ sơ vụ án! Chiếc cúp vàng ở trường biến mất. Hãy dùng tư duy phân tích giải mã nào!',
        durationMs: 4600
      },
      {
        type: 'interact',
        leoMood: 'ask',
        promptEn: 'Good detectives look for facts, not guesses! Tap the Evidence!',
        promptVi: 'Thám tử giỏi dựa vào dữ kiện thật, không đoán mò! Chạm vào Bằng Chứng (Evidence)!',
        targetId: 'evidence',
        successEn: 'Sharp mind! Reliable evidence helps us stay objective and accurate!',
        successVi: 'Sắc bén lắm! Bằng chứng đáng tin cậy giúp chúng ta luôn khách quan và chính xác!',
        items: [
          { id: 'rumor', emoji: '🗯️', label: 'Rumor', x: 26, y: 58 },
          { id: 'evidence', emoji: '📋', label: 'Evidence', x: 54, y: 56 },
          { id: 'bias', emoji: '🙈', label: 'Bias', x: 82, y: 58 }
        ]
      },
      {
        type: 'sequence',
        leoMood: 'ask',
        promptEn: 'Solve the mystery step by step! Investigate, Analyze, then Conclude!',
        promptVi: 'Giải mã theo đúng quy trình logic: Điều tra ➔ Phân tích ➔ Kết luận!',
        order: ['investigate', 'analyze', 'conclude'],
        successEn: 'Case solved! The janitor simply polished the trophy for assembly!',
        successVi: 'Phá án thành công! Bác bảo vệ chỉ mang chiếc cúp đi đánh bóng cho buổi lễ thôi!',
        items: [
          { id: 'conclude', emoji: '🏁', label: 'Conclude', x: 80, y: 58 },
          { id: 'analyze', emoji: '🧠', label: 'Analyze', x: 53, y: 58 },
          { id: 'investigate', emoji: '🔎', label: 'Investigate', x: 26, y: 58 }
        ]
      },
      {
        type: 'dialogue',
        leoMood: 'ask',
        promptEn: 'Which B2 connector best completes: "We checked every clue; ______, we found the truth."',
        promptVi: 'Từ nối học thuật B2 nào hợp nhất: "Chúng tôi kiểm tra mọi manh mối; ______, ta đã tìm ra sự thật."',
        targetId: 'therefore',
        successEn: 'Therefore! It clearly links the evidence to our logical conclusion!',
        successVi: 'Therefore (Vì vậy / Do đó)! Liên kết cực chuẩn giữa bằng chứng và kết luận logic!',
        options: [
          { id: 'therefore', emoji: '➡️', en: 'Therefore (Do đó)', vi: 'Chỉ kết quả hợp lý' },
          { id: 'although', emoji: '🔀', en: 'Although (Mặc dù)', vi: 'Chỉ sự tương phản' },
          { id: 'whereas', emoji: '⚖️', en: 'Whereas (Trong khi)', vi: 'So sánh đối lập' }
        ]
      },
      {
        type: 'story',
        leoMood: 'celebrate',
        props: [
          { emoji: '🏆', x: 54, y: 46, size: 3.8, anim: 'float' },
          { emoji: '🔍', x: 24, y: 58, size: 3.0, anim: 'bob' },
          { emoji: '🧠', x: 82, y: 56, size: 3.1, anim: 'bob' }
        ],
        en: 'Bravo, Detective! Logic and clear reasoning solve even complex puzzles!',
        vi: 'Xuất sắc, Thám Tử Nhí! Tư duy logic giúp giải quyết cả những câu đố phức tạp nhất!',
        durationMs: 4300
      }
    ]
  },
  {
    id: 'global_summit',
    num: 'Tập 18',
    level: 'B2',
    host: 'leo',
    titleVi: 'Diễn Đàn Công Dân Toàn Cầu',
    titleEn: 'Young Global Leaders Summit',
    icon: '🌍',
    duration: '3 phút • 3 thử thách',
    theme: 'summit',
    color: '#0D9488',
    bgSoft: '#CCFBF1',
    scenes: [
      {
        type: 'story',
        leoMood: 'wave',
        props: [
          { emoji: '🌐', x: 52, y: 40, size: 3.8, anim: 'float' },
          { emoji: '🎤', x: 26, y: 58, size: 3.1, anim: 'bob' },
          { emoji: '🤝', x: 80, y: 58, size: 3.2, anim: 'bob' }
        ],
        en: 'Welcome to the Global Youth Summit! Today we practice persuasive presentations!',
        vi: 'Chào mừng đến Hội Nghị Thanh Thiếu Niên Toàn Cầu! Cùng luyện kỹ năng thuyết trình B2 nhé!',
        durationMs: 4600
      },
      {
        type: 'sequence',
        leoMood: 'ask',
        promptEn: 'Organize a winning speech! Tap Introduction, Evidence, then Summary!',
        promptVi: 'Sắp xếp bố cục bài thuyết trình chuẩn B2: Mở bài ➔ Bằng chứng ➔ Tóm tắt!',
        order: ['intro', 'evidence', 'summary'],
        successEn: 'Compelling structure! A clear flow persuades any audience!',
        successVi: 'Bố cục đầy thuyết phục! Mạch trình bày rõ ràng chinh phục mọi khán giả!',
        items: [
          { id: 'summary', emoji: '📋', label: 'Summary', x: 80, y: 58 },
          { id: 'intro', emoji: '🎤', label: 'Introduction', x: 26, y: 58 },
          { id: 'evidence', emoji: '📊', label: 'Evidence', x: 53, y: 58 }
        ]
      },
      {
        type: 'dialogue',
        leoMood: 'ask',
        promptEn: 'During a debate, another speaker shares a different perspective. How do you respond?',
        promptVi: 'Trong cuộc tranh luận, một bạn nêu góc nhìn khác. Bạn phản hồi sao cho chuẩn mực B2?',
        targetId: 'respect',
        successEn: 'Respectful and persuasive! Great leaders listen with empathy and justify ideas clearly!',
        successVi: 'Tôn trọng và thuyết phục! Nhà lãnh đạo giỏi luôn lắng nghe đồng cảm và lập luận rõ ràng!',
        options: [
          { id: 'respect', emoji: '🤝', en: 'I see your point; however, consider this evidence.', vi: 'Tôi hiểu ý bạn; tuy nhiên hãy xem xét bằng chứng này.' },
          { id: 'shout', emoji: '😠', en: 'You are completely wrong, stop talking!', vi: 'Bạn sai hoàn toàn, ngừng nói đi!' },
          { id: 'leave', emoji: '🏃', en: 'I do not want to listen to anyone.', vi: 'Tôi không muốn nghe ai cả.' }
        ]
      },
      {
        type: 'interact',
        leoMood: 'ask',
        promptEn: 'Tap the core value that unites diverse communities in harmony: Cooperation!',
        promptVi: 'Chạm vào giá trị cốt lõi gắn kết các cộng đồng đa dạng: Sự Hợp Tác (Cooperation)!',
        targetId: 'coop',
        successEn: 'Magnificent! Cooperation and solidarity inspire positive global change!',
        successVi: 'Tuyệt vời! Sự hợp tác và đoàn kết truyền cảm hứng tạo nên thay đổi tích cực toàn cầu!',
        items: [
          { id: 'coop', emoji: '🤝', label: 'Cooperation', x: 26, y: 56 },
          { id: 'conflict', emoji: '⚡', label: 'Conflict', x: 54, y: 58 },
          { id: 'isolation', emoji: '🧱', label: 'Barrier', x: 82, y: 58 }
        ]
      },
      {
        type: 'story',
        leoMood: 'celebrate',
        props: [
          { emoji: '🏆', x: 24, y: 54, size: 3.2, anim: 'bob' },
          { emoji: '🌍', x: 54, y: 44, size: 3.8, anim: 'float' },
          { emoji: '✨', x: 82, y: 40, size: 3.0, anim: 'bob' }
        ],
        en: 'Congratulations, Global Leader! Your English fluency can inspire the world!',
        vi: 'Chúc mừng Công Dân Toàn Cầu! Khả năng tiếng Anh trôi chảy của bạn sẽ truyền cảm hứng cho thế giới!',
        durationMs: 4400
      }
    ]
  }
];
