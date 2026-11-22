/**
 * English4Kids - Interactive Animated Video Theatre (Khan Academy Kids Style)
 * 6 Multi-Scene Animated Episodes with Voiceover, Bilingual Subtitles,
 * Timeline Scrubber with Checkpoint Stars, and Direct Touch Interactivity!
 */
(function () {
  const EPISODES = [
    {
      id: 'zoo',
      num: 'Tập 1',
      titleVi: 'Chuyến Đi Sở Thú',
      titleEn: 'A Day at the Zoo',
      icon: '🦁',
      duration: '2 phút • 3 thử thách',
      theme: 'zoo',
      color: '#22C55E',
      bgSoft: '#DCFCE7',
      scenes: [
        {
          type: 'story',
          leoMood: 'wave',
          props: [
            { emoji: '🌳', x: 14, y: 58, size: 3.4 },
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
          type: 'story',
          leoMood: 'happy',
          props: [
            { emoji: '🌴', x: 18, y: 56, size: 3.4 },
            { emoji: '🍌', x: 72, y: 34, size: 2.5, anim: 'bob' },
            { emoji: '🐵', x: 58, y: 56, size: 3.4, anim: 'float' }
          ],
          en: 'Look up in the tree! Someone loves yellow bananas.',
          vi: 'Nhìn lên cây kìa! Có một bạn rất thích ăn chuối vàng đấy.',
          durationMs: 4300
        },
        {
          type: 'interact',
          leoMood: 'ask',
          promptEn: 'Tap the Monkey who loves bananas!',
          promptVi: 'Chạm vào bạn Khỉ (Monkey) thích ăn chuối nào!',
          targetId: 'monkey',
          successEn: 'Awesome! The Monkey is so playful!',
          successVi: 'Tuyệt vời! Bạn Khỉ (Monkey) thật tinh nghịch!',
          items: [
            { id: 'monkey', emoji: '🐵', label: 'Monkey', x: 28, y: 55 },
            { id: 'bear', emoji: '🐻', label: 'Bear', x: 56, y: 60 },
            { id: 'penguin', emoji: '🐧', label: 'Penguin', x: 82, y: 62 }
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
            { emoji: '🐘', x: 20, y: 60, size: 3.1, anim: 'bob' },
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
          type: 'interact',
          leoMood: 'ask',
          promptEn: 'Next, tap the color Yellow like the bright sun!',
          promptVi: 'Tiếp theo, chạm vào màu Vàng (Yellow) như ông mặt trời nào!',
          targetId: 'yellow',
          successEn: 'Bravo! Bright Yellow shines so warm!',
          successVi: 'Hoan hô! Màu Vàng (Yellow) tỏa sáng thật ấm áp!',
          items: [
            { id: 'green', colorHex: '#22C55E', emoji: '🌿', label: 'Green', x: 26, y: 58 },
            { id: 'yellow', colorHex: '#FACC15', emoji: '☀️', label: 'Yellow', x: 54, y: 58 },
            { id: 'purple', colorHex: '#A855F7', emoji: '🍇', label: 'Purple', x: 82, y: 58 }
          ]
        },
        {
          type: 'interact',
          leoMood: 'ask',
          promptEn: 'Now tap the color Blue like the ocean!',
          promptVi: 'Bây giờ chạm vào màu Xanh Dương (Blue) như biển cả nhé!',
          targetId: 'blue',
          successEn: 'Amazing! Blue makes our rainbow sparkle!',
          successVi: 'Xuất sắc! Màu Xanh Dương (Blue) làm cầu vồng thêm lung linh!',
          items: [
            { id: 'orange', colorHex: '#F97316', emoji: '🍊', label: 'Orange', x: 26, y: 58 },
            { id: 'pink', colorHex: '#EC4899', emoji: '🦩', label: 'Pink', x: 54, y: 58 },
            { id: 'blue', colorHex: '#3B82F6', emoji: '🌊', label: 'Blue', x: 82, y: 58 }
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
          type: 'interact',
          leoMood: 'ask',
          promptEn: 'Now pick the sweet Strawberry!',
          promptVi: 'Tiếp theo, hãy chọn quả Dâu Tây (Strawberry) ngọt ngào nào!',
          targetId: 'strawberry',
          successEn: 'Great! Red Strawberry smells so good!',
          successVi: 'Giỏi lắm! Quả Dâu Tây (Strawberry) thơm quá đi!',
          items: [
            { id: 'strawberry', emoji: '🍓', label: 'Strawberry', x: 26, y: 58 },
            { id: 'banana', emoji: '🍌', label: 'Banana', x: 54, y: 58 },
            { id: 'mango', emoji: '🥭', label: 'Mango', x: 82, y: 58 }
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
            { emoji: '🍓', x: 52, y: 54, size: 3.0, anim: 'float' },
            { emoji: '🍍', x: 80, y: 58, size: 3.0, anim: 'bob' }
          ],
          en: 'Eating fruits every day helps us grow big and strong!',
          vi: 'Ăn trái cây mỗi ngày giúp chúng mình lớn nhanh và thật khỏe mạnh!',
          durationMs: 4200
        }
      ]
    },
    {
      id: 'city',
      num: 'Tập 4',
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
          type: 'interact',
          leoMood: 'ask',
          promptEn: 'Wee-oo! Tap the red Fire Truck!',
          promptVi: 'Ò í e! Chạm vào chiếc Xe Cứu Hỏa (Fire Truck) màu đỏ nào!',
          targetId: 'firetruck',
          successEn: 'Heroic! The Fire Truck keeps everyone safe!',
          successVi: 'Thật dũng cảm! Xe Cứu Hỏa (Fire Truck) bảo vệ mọi người!',
          items: [
            { id: 'firetruck', emoji: '🚒', label: 'Fire Truck', x: 26, y: 60 },
            { id: 'taxi', emoji: '🚕', label: 'Taxi', x: 54, y: 62 },
            { id: 'train', emoji: '🚂', label: 'Train', x: 82, y: 60 }
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
      num: 'Tập 5',
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
          vi: 'Chào buổi sáng! Đến giờ thức dậy và chuẩn bị đi học lớp 1 rồi!',
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
          type: 'interact',
          leoMood: 'ask',
          promptEn: 'Time for breakfast! Tap the healthy Milk!',
          promptVi: 'Đến giờ ăn sáng rồi! Chạm vào ly Sữa Tươi (Milk) bổ dưỡng nhé!',
          targetId: 'milk',
          successEn: 'Delicious! Milk helps us grow tall!',
          successVi: 'Ngon tuyệt! Uống Sữa Tươi (Milk) giúp bé mau cao lớn!',
          items: [
            { id: 'milk', emoji: '🥛', label: 'Milk', x: 26, y: 58 },
            { id: 'shoe', emoji: '👟', label: 'Shoes', x: 54, y: 60 },
            { id: 'umbrella', emoji: '☂️', label: 'Umbrella', x: 82, y: 58 }
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
      id: 'space',
      num: 'Tập 6',
      titleVi: 'Du Hành Vũ Trụ',
      titleEn: 'Space Explorer',
      icon: '🚀',
      duration: '2 phút • 3 thử thách',
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
          type: 'interact',
          leoMood: 'ask',
          promptEn: 'Make a wish! Tap the glowing Star!',
          promptVi: 'Hãy ước một điều ước! Chạm vào Ngôi Sao (Star) lấp lánh nào!',
          targetId: 'star',
          successEn: 'Twinkle twinkle! You are a Space Champion!',
          successVi: 'Lấp lánh quá! Bé là Nhà Vô Địch Vũ Trụ rồi!',
          items: [
            { id: 'comet', emoji: '☄️', label: 'Comet', x: 26, y: 52 },
            { id: 'ufo', emoji: '🛸', label: 'Spaceship', x: 54, y: 52 },
            { id: 'star', emoji: '⭐', label: 'Star', x: 82, y: 50 }
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
          en: 'Mission complete! See you in the next adventure!',
          vi: 'Hoàn thành sứ mệnh vũ trụ! Hẹn gặp lại bé ở tập phim tiếp theo nhé!',
          durationMs: 4200
        }
      ]
    }
  ];

  const sState = {
    epIndex: 0,
    sceneIndex: 0,
    playing: false,
    waitingForTap: false,
    solvedInEp: new Set(),
    timer: null
  };

  const $ = id => document.getElementById(id);

  function clearStoryTimer() {
    if (sState.timer) {
      clearTimeout(sState.timer);
      sState.timer = null;
    }
  }

  function renderEpisodesGrid() {
    const grid = $('stories-home-grid');
    if (!grid) return;
    grid.innerHTML = '';

    EPISODES.forEach((ep, idx) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'story-ep-card';
      card.id = `story-ep-${ ep.id }`;
      card.style.setProperty('--ep-color', ep.color);
      card.style.setProperty('--ep-bg', ep.bgSoft);
      card.innerHTML = `
        <div class="ep-thumb">
          <span class="ep-num-badge">${ ep.num }</span>
          <span class="ep-emoji">${ ep.icon }</span>
          <span class="ep-play-circle">▶</span>
        </div>
        <div class="ep-meta">
          <h3>${ ep.titleVi }</h3>
          <span class="ep-en">${ ep.titleEn }</span>
          <span class="ep-dur">🎬 ${ ep.duration }</span>
        </div>
      `;
      card.addEventListener('click', () => {
        playSoundEffect('pop');
        openEpisode(idx);
      });
      grid.appendChild(card);
    });
  }

  function openEpisode(epIdx) {
    clearStoryTimer();
    sState.epIndex = epIdx;
    sState.sceneIndex = 0;
    sState.playing = true;
    sState.waitingForTap = false;
    sState.solvedInEp = new Set();

    document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));
    $('view-stories').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const ep = EPISODES[epIdx];
    $('story-ep-icon').textContent = ep.icon;
    $('story-ep-title').textContent = `${ ep.num }: ${ ep.titleVi } (${ ep.titleEn })`;

    if (typeof window.recordActivity === 'function') {
      window.recordActivity({
        kind: 'story',
        epIndex: epIdx,
        icon: ep.icon,
        title: `${ ep.num }: ${ ep.titleVi }`,
        subtitle: `Phim hoạt hình tương tác • ${ ep.titleEn }`
      });
    }

    renderStoryTimeline();
    renderStoryScene();
  }

  window.openStoryEpisode = openEpisode;

  function renderStoryTimeline() {
    const ep = EPISODES[sState.epIndex];
    const bar = $('story-timeline-dots');
    if (!bar) return;
    bar.innerHTML = '';

    ep.scenes.forEach((sc, idx) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = `timeline-dot ${ sc.type === 'interact' ? 'is-checkpoint' : '' }`;
      if (idx < sState.sceneIndex) dot.classList.add('passed');
      if (idx === sState.sceneIndex) dot.classList.add('current');
      dot.textContent = sc.type === 'interact' ? '⭐' : String(idx + 1);
      dot.title = sc.type === 'interact' ? 'Thử thách tương tác' : `Cảnh ${ idx + 1 }`;
      dot.addEventListener('click', () => {
        clearStoryTimer();
        playSoundEffect('pop');
        sState.sceneIndex = idx;
        sState.playing = true;
        renderStoryScene();
      });
      bar.appendChild(dot);
    });

    const pct = Math.round(((sState.sceneIndex + 1) / ep.scenes.length) * 100);
    const fill = $('story-progress-fill');
    if (fill) fill.style.width = `${ pct }%`;
  }

  function updatePlayPauseBtn() {
    const btn = $('btn-story-playpause');
    if (!btn) return;
    if (sState.waitingForTap) {
      btn.textContent = '👆 Chạm vào hình trên màn hình!';
      btn.classList.add('waiting');
    } else if (sState.playing) {
      btn.textContent = '⏸ Tạm dừng';
      btn.classList.remove('waiting');
    } else {
      btn.textContent = '▶ Tiếp tục phát';
      btn.classList.remove('waiting');
    }
  }

  function renderStoryScene() {
    clearStoryTimer();
    const ep = EPISODES[sState.epIndex];
    const scene = ep.scenes[sState.sceneIndex];
    if (!scene) return;

    const stage = $('story-stage');
    stage.className = `story-stage theme-${ ep.theme }`;

    const propsLayer = $('story-props-layer');
    propsLayer.innerHTML = '';

    const leo = $('story-leo-actor');
    leo.className = `story-leo-actor mood-${ scene.leoMood || 'wave' }`;

    const badge = $('story-checkpoint-badge');

    if (scene.type === 'story') {
      sState.waitingForTap = false;
      badge.classList.add('hidden');
      $('story-sub-en').textContent = scene.en;
      $('story-sub-vi').textContent = scene.vi;

      (scene.props || []).forEach(p => {
        const el = document.createElement('div');
        el.className = `stage-prop ${ p.anim ? `anim-${ p.anim }` : '' }`;
        el.style.left = `${ p.x }%`;
        el.style.top = `${ p.y }%`;
        el.style.fontSize = `${ p.size || 3 }rem`;
        el.textContent = p.emoji;
        propsLayer.appendChild(el);
      });

      speakEnglish(scene.en, 0.88);
      if (sState.playing) {
        sState.timer = setTimeout(() => {
          if (!sState.playing) return;
          if (sState.sceneIndex < ep.scenes.length - 1) {
            sState.sceneIndex += 1;
            renderStoryScene();
          } else {
            finishEpisode();
          }
        }, scene.durationMs || 4200);
      }
    } else {
      // Interactive Khan-Kids style checkpoint!
      sState.waitingForTap = true;
      badge.classList.remove('hidden');
      badge.textContent = '⭐ TƯƠNG TÁC: Chạm vào hình đúng trên màn hình!';
      $('story-sub-en').textContent = scene.promptEn;
      $('story-sub-vi').textContent = scene.promptVi;

      scene.items.forEach(item => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'stage-interactive-item';
        btn.dataset.itemId = item.id;
        btn.style.left = `${ item.x }%`;
        btn.style.top = `${ item.y }%`;
        const visual = item.colorHex
          ? `<span class="sii-swatch" style="background:${ item.colorHex }">${ item.emoji }</span>`
          : `<span class="sii-emoji">${ item.emoji }</span>`;
        btn.innerHTML = `${ visual }<span class="sii-label">${ item.label }</span>`;
        btn.addEventListener('click', () => handleCheckpointTap(btn, item, scene));
        propsLayer.appendChild(btn);
      });

      speakEnglish(scene.promptEn, 0.86);
    }

    renderStoryTimeline();
    updatePlayPauseBtn();
  }

  function handleCheckpointTap(btn, item, scene) {
    if (!sState.waitingForTap) return;

    if (item.id === scene.targetId) {
      sState.waitingForTap = false;
      btn.classList.add('correct-hit');
      $('story-leo-actor').className = 'story-leo-actor mood-celebrate';
      $('story-checkpoint-badge').textContent = '🎉 Chính xác! (+2 Sao vàng)';
      $('story-sub-en').textContent = scene.successEn;
      $('story-sub-vi').textContent = scene.successVi;

      if (!sState.solvedInEp.has(sState.sceneIndex)) {
        sState.solvedInEp.add(sState.sceneIndex);
        state.stars += 2;
        saveProgress();
        updateHeaderAndMissionUI();
      }

      playSoundEffect('star');
      launchConfettiBurst();
      speakEnglish(scene.successEn, 0.92);
      updatePlayPauseBtn();

      sState.timer = setTimeout(() => {
        const ep = EPISODES[sState.epIndex];
        if (sState.sceneIndex < ep.scenes.length - 1) {
          sState.sceneIndex += 1;
          sState.playing = true;
          renderStoryScene();
        } else {
          finishEpisode();
        }
      }, 2400);
    } else {
      btn.classList.remove('wrong-hit');
      void btn.offsetWidth;
      btn.classList.add('wrong-hit');
      playSoundEffect('wrong');
      speakEnglish(`Try again! ${ scene.promptEn }`, 0.86);
    }
  }

  function finishEpisode() {
    clearStoryTimer();
    sState.playing = false;
    sState.waitingForTap = false;
    const ep = EPISODES[sState.epIndex];
    if (ep && state.completedEpisodes) {
      state.completedEpisodes.add(ep.id);
    }
    state.stars += 3;
    saveProgress();
    updateHeaderAndMissionUI();
    playSoundEffect('star');
    launchConfettiBurst();

    const badge = $('story-checkpoint-badge');
    badge.classList.remove('hidden');
    badge.textContent = '🏆 Hoàn thành tập phim! (+3 Sao thưởng)';
    updatePlayPauseBtn();
  }

  function stopStories() {
    clearStoryTimer();
    sState.playing = false;
    sState.waitingForTap = false;
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }

  function bindStoryEvents() {
    $('btn-stories-back').addEventListener('click', () => {
      stopStories();
      playSoundEffect('pop');
      document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));
      $('view-stories-hub').classList.add('active');
    });

    $('btn-home-logo').addEventListener('click', stopStories);

    $('btn-story-playpause').addEventListener('click', () => {
      if (sState.waitingForTap) {
        const sc = EPISODES[sState.epIndex].scenes[sState.sceneIndex];
        if (sc) speakEnglish(sc.promptEn, 0.86);
        return;
      }
      playSoundEffect('pop');
      sState.playing = !sState.playing;
      if (sState.playing) {
        const ep = EPISODES[sState.epIndex];
        if (sState.sceneIndex >= ep.scenes.length - 1) {
          sState.sceneIndex = 0;
        }
        renderStoryScene();
      } else {
        clearStoryTimer();
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
        updatePlayPauseBtn();
      }
    });

    $('btn-story-prev').addEventListener('click', () => {
      clearStoryTimer();
      playSoundEffect('pop');
      sState.sceneIndex = Math.max(0, sState.sceneIndex - 1);
      sState.playing = true;
      renderStoryScene();
    });

    $('btn-story-next').addEventListener('click', () => {
      clearStoryTimer();
      playSoundEffect('pop');
      const ep = EPISODES[sState.epIndex];
      if (sState.sceneIndex < ep.scenes.length - 1) {
        sState.sceneIndex += 1;
        sState.playing = true;
        renderStoryScene();
      } else {
        finishEpisode();
      }
    });

    $('btn-story-replay-voice').addEventListener('click', () => {
      const sc = EPISODES[sState.epIndex].scenes[sState.sceneIndex];
      if (!sc) return;
      speakEnglish(sc.type === 'interact' ? sc.promptEn : sc.en, 0.86);
    });

    $('btn-story-next-ep').addEventListener('click', () => {
      playSoundEffect('pop');
      const nextIdx = (sState.epIndex + 1) % EPISODES.length;
      openEpisode(nextIdx);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderEpisodesGrid();
    bindStoryEvents();
  });
})();
