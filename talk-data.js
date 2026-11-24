/**
 * English4Kids — Interactive Speaking & Roleplay Missions (talk-data.js)
 * 8 Kid-Friendly Free Roleplay Conversations (Pre-A1 -> B1) + Free AI Conversation Starters
 * Works 100% free without any API key (with real microphone SpeechRecognition + tap-to-say chips).
 */
const TALK_MISSIONS = [
  {
    id: 'talk_hello',
    level: 'Pre-A1',
    ageHint: '4–6 tuổi',
    mascot: 'leo',
    mascotName: 'Sư tử Leo',
    bg: 'assets/art/painted_home_meadow.webp',
    icon: '👋',
    accent: '#F97316',
    softBg: '#FFF7ED',
    titleVi: 'Làm Quen Với Leo',
    titleEn: 'Say Hello to Leo',
    descVi: 'Chào hỏi, giới thiệu tên, tuổi và màu yêu thích.',
    turns: [
      {
        botEn: 'Hello, friend! My name is Leo. How are you today?',
        botVi: 'Xin chào bạn nhỏ! Tớ tên là Leo. Hôm nay bạn thấy thế nào?',
        options: [
          { en: 'I am happy!', vi: 'Tớ rất vui!', icon: '😊', keywords: ['happy', 'good', 'great', 'fine', 'awesome', 'wonderful'], replyEn: 'Yay! I am so glad you are happy today!', replyVi: 'Hoan hô! Tớ rất vui khi hôm nay bạn thấy hạnh phúc!' },
          { en: 'I am great, thank you!', vi: 'Tớ rất khỏe, cảm ơn bạn!', icon: '🌟', keywords: ['great', 'thank', 'thanks', 'good', 'fine'], replyEn: 'Awesome! Thank you for being so polite!', replyVi: 'Tuyệt vời! Cảm ơn bạn đã trả lời thật lịch sự nhé!' },
          { en: 'I am a little sleepy.', vi: 'Tớ hơi buồn ngủ một chút.', icon: '😴', keywords: ['sleepy', 'tired', 'okay', 'ok'], replyEn: 'Haha, let us stretch our arms and wake up together!', replyVi: 'Haha, chúng mình cùng vươn vai cho tỉnh táo nào!' }
        ],
        fallbackReplyEn: 'Nice to talk with you! You are doing great!',
        fallbackReplyVi: 'Rất vui được trò chuyện với bạn! Bạn nói tốt lắm!'
      },
      {
        botEn: 'What is your favorite color? I love sunny yellow!',
        botVi: 'Màu sắc yêu thích của bạn là gì? Tớ thích màu vàng nắng ấm!',
        options: [
          { en: 'I like red!', vi: 'Tớ thích màu đỏ!', icon: '🔴', keywords: ['red', 'pink', 'orange'], replyEn: 'Bright and cheerful! Like a sweet red apple!', replyVi: 'Rực rỡ và vui tươi quá! Giống như quả táo đỏ ngọt ngào vậy!' },
          { en: 'My favorite color is blue.', vi: 'Màu yêu thích của tớ là xanh dương.', icon: '🔵', keywords: ['blue', 'sky', 'purple'], replyEn: 'Cool! Blue like the big sky and the ocean!', replyVi: 'Tuyệt quá! Xanh như bầu trời rộng lớn và đại dương vậy!' },
          { en: 'I love green!', vi: 'Tớ yêu màu xanh lá!', icon: '🟢', keywords: ['green', 'yellow', 'white', 'black'], replyEn: 'Wonderful! Green like fresh trees and soft grass!', replyVi: 'Thật tuyệt! Xanh như tán cây tươi mát và thảm cỏ mềm!' }
        ],
        fallbackReplyEn: 'Ooh, that is a super pretty color!',
        fallbackReplyVi: 'Ồ, đó là một màu sắc siêu đẹp luôn!'
      },
      {
        botEn: 'Do you like playing outside in the sun?',
        botVi: 'Bạn có thích chơi ngoài trời nắng ấm không?',
        options: [
          { en: 'Yes, I love playing outside!', vi: 'Có, tớ rất thích chơi ngoài trời!', icon: '☀️', keywords: ['yes', 'love', 'like', 'outside', 'play'], replyEn: 'Me too! Let us kick my big red ball together!', replyVi: 'Tớ cũng vậy! Cùng đá quả bóng đỏ to của tớ nhé!' },
          { en: 'Yes, I like running in the park.', vi: 'Có, tớ thích chạy trong công viên.', icon: '🏃', keywords: ['park', 'run', 'running', 'yes', 'ball'], replyEn: 'Hooray! Running in the park is so much fun!', replyVi: 'Hoan hô! Chạy nhảy trong công viên vui cực kỳ!' },
          { en: 'I like reading books at home.', vi: 'Tớ thích đọc sách ở nhà.', icon: '📖', keywords: ['read', 'book', 'books', 'home', 'no', 'draw'], replyEn: 'Reading cozy books is awesome too! We can read together!', replyVi: 'Đọc sách ấm cúng cũng rất tuyệt! Chúng mình cùng đọc nhé!' }
        ],
        fallbackReplyEn: 'That sounds like so much fun!',
        fallbackReplyVi: 'Nghe thật là vui quá đi!'
      },
      {
        botEn: 'You spoke English so clearly! Ready to say goodbye for now?',
        botVi: 'Bạn nói tiếng Anh rõ ràng quá! Sẵn sàng tạm biệt tớ chưa nào?',
        options: [
          { en: 'Goodbye, Leo! See you soon!', vi: 'Tạm biệt Leo! Hẹn sớm gặp lại nhé!', icon: '👋', keywords: ['bye', 'goodbye', 'see', 'soon'], replyEn: 'Bye-bye! High five! You earned shiny gold stars!', replyVi: 'Tạm biệt nhé! Đập tay nào! Bạn nhận được sao vàng lấp lánh rồi!' },
          { en: 'Thank you, Leo! Bye!', vi: 'Cảm ơn Leo nhé! Tạm biệt!', icon: '💛', keywords: ['thank', 'thanks', 'bye'], replyEn: 'You are welcome, superstar! Come chat again soon!', replyVi: 'Không có gì đâu siêu sao nhỏ! Sớm quay lại nói chuyện nhé!' },
          { en: 'See you tomorrow!', vi: 'Hẹn gặp bạn ngày mai nhé!', icon: '🌈', keywords: ['tomorrow', 'see', 'later', 'yes'], replyEn: 'See you tomorrow, my clever friend!', replyVi: 'Hẹn gặp lại bạn ngày mai nhé người bạn thông minh!' }
        ],
        fallbackReplyEn: 'Bye-bye! You did an amazing job speaking English today!',
        fallbackReplyVi: 'Tạm biệt! Hôm nay bạn luyện nói tiếng Anh xuất sắc lắm!'
      }
    ]
  },
  {
    id: 'talk_fruit_shop',
    level: 'Pre-A1',
    ageHint: '4–6 tuổi',
    mascot: 'mimi',
    mascotName: 'Gấu trúc Mimi',
    bg: 'assets/art/books/scene_valley_green.webp',
    icon: '🍓',
    accent: '#10B981',
    softBg: '#ECFDF5',
    titleVi: 'Cửa Hàng Trái Cây Của Mimi',
    titleEn: "Mimi's Fruit Stand",
    descVi: 'Tập mua trái cây, đếm số lượng và nói lời cảm ơn.',
    turns: [
      {
        botEn: 'Welcome to my sunny fruit stand! What fruit would you like today?',
        botVi: 'Chào mừng đến quầy trái cây ngập nắng của tớ! Hôm nay bạn muốn mua quả gì nào?',
        options: [
          { en: 'I want apples, please!', vi: 'Cho tớ táo nhé!', icon: '🍎', keywords: ['apple', 'apples', 'red'], replyEn: 'Yummy! Fresh crunchy red apples are right here!', replyVi: 'Ngon quá! Táo đỏ tươi giòn ngay đây rồi!' },
          { en: 'I would like bananas, please.', vi: 'Tớ muốn mua chuối ạ.', icon: '🍌', keywords: ['banana', 'bananas', 'yellow'], replyEn: 'Great choice! Sweet yellow bananas!', replyVi: 'Lựa chọn tuyệt vời! Chuối vàng ngọt lịm!' },
          { en: 'Strawberries, please!', vi: 'Cho tớ dâu tây nhé!', icon: '🍓', keywords: ['strawberry', 'strawberries', 'berry', 'berries'], replyEn: 'Ooh, I just picked these sweet strawberries this morning!', replyVi: 'Ồ, tớ vừa hái những quả dâu ngọt này sáng nay đấy!' }
        ],
        fallbackReplyEn: 'Delicious choice! Fresh fruit makes us strong!',
        fallbackReplyVi: 'Lựa chọn ngon tuyệt! Trái cây tươi giúp chúng mình khỏe mạnh!'
      },
      {
        botEn: 'How many would you like? One, two, or three?',
        botVi: 'Bạn muốn lấy mấy quả nào? Một, hai hay ba quả?',
        options: [
          { en: 'Two, please!', vi: 'Hai quả nhé!', icon: '2️⃣', keywords: ['two', '2'], replyEn: 'One, two! Two juicy pieces in your basket!', replyVi: 'Một, hai! Hai quả mọng nước đã vào giỏ rồi!' },
          { en: 'Three, please!', vi: 'Cho tớ ba quả nhé!', icon: '3️⃣', keywords: ['three', '3'], replyEn: 'One, two, three! Three big ones for you!', replyVi: 'Một, hai, ba! Ba quả to tròn cho bạn nè!' },
          { en: 'Five, please! For my family.', vi: 'Năm quả nhé! Cho cả nhà tớ.', icon: '5️⃣', keywords: ['five', '5', 'four', '4', 'one', '1', 'family'], replyEn: 'How kind of you to share with your family!', replyVi: 'Bạn thật tốt bụng khi chia sẻ cùng cả gia đình!' }
        ],
        fallbackReplyEn: 'Got it! I will pack them carefully for you!',
        fallbackReplyVi: 'Rõ rồi! Tớ sẽ gói thật cẩn thận cho bạn nhé!'
      },
      {
        botEn: 'Would you like a cute green bag to carry your fruit?',
        botVi: 'Bạn có muốn một chiếc túi xanh xinh xắn để đựng trái cây không?',
        options: [
          { en: 'Yes, please!', vi: 'Có, cảm ơn bạn!', icon: '🛍️', keywords: ['yes', 'please', 'sure', 'bag'], replyEn: 'Here is your reusable green bag! It helps our Earth!', replyVi: 'Túi xanh tái sử dụng của bạn đây! Dùng túi này giúp bảo vệ Trái Đất đấy!' },
          { en: 'No, thank you. I have a basket!', vi: 'Không cần đâu, tớ có giỏ rồi!', icon: '🧺', keywords: ['no', 'basket', 'have', 'thank'], replyEn: 'Smart! Bringing your own basket is super eco-friendly!', replyVi: 'Thông minh quá! Tự mang giỏ đi chợ rất thân thiện môi trường!' },
          { en: 'Yes, I love green!', vi: 'Có ạ, tớ thích màu xanh!', icon: '💚', keywords: ['green', 'love', 'yes'], replyEn: 'Yay! Green is my favorite color too!', replyVi: 'Hoan hô! Xanh lá cũng là màu tớ thích nhất!' }
        ],
        fallbackReplyEn: 'All packed and ready to go!',
        fallbackReplyVi: 'Đã gói xong gọn gàng rồi đây!'
      },
      {
        botEn: 'Here you are! Enjoy your sweet fruit!',
        botVi: 'Của bạn đây nhé! Chúc bạn ăn trái cây thật ngon miệng!',
        options: [
          { en: 'Thank you so much, Mimi!', vi: 'Cảm ơn Mimi rất nhiều!', icon: '🙏', keywords: ['thank', 'thanks', 'mimi'], replyEn: 'You are so welcome! Come visit my garden anytime!', replyVi: 'Không có gì đâu! Lúc nào rảnh ghé vườn tớ chơi tiếp nhé!' },
          { en: 'Yum! Thank you! Goodbye!', vi: 'Ngon quá! Cảm ơn và tạm biệt!', icon: '😋', keywords: ['yum', 'yummy', 'bye', 'goodbye', 'thank'], replyEn: 'Bye-bye! You are a polite little shopper!', replyVi: 'Tạm biệt! Bạn là vị khách nhí lịch sự nhất luôn!' },
          { en: 'Have a nice day!', vi: 'Chúc bạn một ngày tốt lành!', icon: '🌻', keywords: ['nice', 'day', 'good', 'bye'], replyEn: 'Have a sunny day too, my friend!', replyVi: 'Chúc bạn cũng có một ngày ngập nắng nhé!' }
        ],
        fallbackReplyEn: 'Thank you for visiting! See you next time!',
        fallbackReplyVi: 'Cảm ơn bạn đã ghé thăm! Hẹn gặp lại lần sau nhé!'
      }
    ]
  },
  {
    id: 'talk_pet_friend',
    level: 'A1',
    ageHint: '6–8 tuổi',
    mascot: 'toby',
    mascotName: 'Cáo Toby',
    bg: 'assets/art/books/scene_forest.webp',
    icon: '🐶',
    accent: '#EA580C',
    softBg: '#FFF7ED',
    titleVi: 'Thú Cưng Đáng Yêu',
    titleEn: 'My Favorite Pet',
    descVi: 'Kể về chú cún, chú mèo hay thỏ bông bé yêu thích.',
    turns: [
      {
        botEn: 'Hi there! I just helped a cute brown puppy find his home. What animal do you like best?',
        botVi: 'Chào bạn! Tớ vừa giúp một chú cún nâu về nhà. Bạn thích loài vật nào nhất?',
        options: [
          { en: 'I like cute puppies!', vi: 'Tớ thích những chú cún đáng yêu!', icon: '🐶', keywords: ['dog', 'puppy', 'puppies', 'dogs'], replyEn: 'Woof! Puppies love wagging their tails and playing fetch!', replyVi: 'Gâu gâu! Cún con rất thích vẫy đuôi và chơi nhặt bóng!' },
          { en: 'I love soft little cats.', vi: 'Tớ thích những chú mèo nhỏ mềm mại.', icon: '🐱', keywords: ['cat', 'cats', 'kitten', 'kitty'], replyEn: 'Meow! Cats are so cozy and love taking sunny naps!', replyVi: 'Meo meo! Mèo con rất êm ái và thích ngủ trưa dưới nắng!' },
          { en: 'I like fluffy rabbits!', vi: 'Tớ thích những chú thỏ bông!', icon: '🐇', keywords: ['rabbit', 'rabbits', 'bunny', 'bird', 'fish', 'turtle'], replyEn: 'Hop, hop! Rabbits have such soft ears and love carrots!', replyVi: 'Nhảy nhót nào! Thỏ có đôi tai mềm và mê cà rốt lắm!' }
        ],
        fallbackReplyEn: 'Ooh, that is such a wonderful animal!',
        fallbackReplyVi: 'Ồ, đó là một loài vật thật dễ thương!'
      },
      {
        botEn: 'If you had a pet, what fun name would you give it?',
        botVi: 'Nếu có một bạn thú cưng, bạn sẽ đặt cho nó cái tên vui nhộn nào?',
        options: [
          { en: 'I would name it Max!', vi: 'Tớ sẽ đặt tên là Max!', icon: '🏷️', keywords: ['max', 'name', 'lucky', 'coco', 'milo'], replyEn: 'What a friendly and brave name!', replyVi: 'Thật là một cái tên thân thiện và dũng cảm!' },
          { en: 'I would call it Sunny!', vi: 'Tớ sẽ gọi nó là Sunny!', icon: '☀️', keywords: ['sunny', 'snow', 'bella', 'luna', 'star'], replyEn: 'Sunny! That sounds bright and cheerful!', replyVi: 'Sunny! Nghe thật tươi sáng và vui vẻ!' },
          { en: 'I would name it Cookie!', vi: 'Tớ sẽ đặt tên là Cookie!', icon: '🍪', keywords: ['cookie', 'milo', 'boba', 'mochi', 'candy'], replyEn: 'Haha, Cookie is an adorable and sweet name!', replyVi: 'Haha, Cookie là một cái tên ngọt ngào đáng yêu quá!' }
        ],
        fallbackReplyEn: 'Haha, I love that name! Your pet would be so happy!',
        fallbackReplyVi: 'Haha, tớ mê cái tên đó lắm! Thú cưng của bạn chắc thích mê!'
      },
      {
        botEn: 'How do we take good care of our pets every day?',
        botVi: 'Chúng mình chăm sóc thú cưng mỗi ngày như thế nào nhỉ?',
        options: [
          { en: 'Give them fresh water and food.', vi: 'Cho chúng uống nước mát và ăn ngon.', icon: '🥣', keywords: ['water', 'food', 'feed', 'eat', 'drink'], replyEn: 'Yes! Clean water and healthy food keep pets strong!', replyVi: 'Đúng rồi! Nước sạch và đồ ăn ngon giúp thú cưng khỏe mạnh!' },
          { en: 'Play and walk in the park.', vi: 'Chơi đùa và dắt đi dạo công viên.', icon: '🌳', keywords: ['play', 'walk', 'park', 'run'], replyEn: 'Great answer! Pets love exercise and playtime with us!', replyVi: 'Trả lời chuẩn luôn! Thú cưng rất thích vận động và chơi cùng mình!' },
          { en: 'Give them gentle hugs and love.', vi: 'Ôm nhẹ nhàng và yêu thương chúng.', icon: '❤️', keywords: ['hug', 'love', 'kind', 'gentle', 'brush'], replyEn: 'Aww, kindness and love make every pet feel safe!', replyVi: 'Ôi, sự dịu dàng và yêu thương giúp thú cưng luôn thấy an toàn!' }
        ],
        fallbackReplyEn: 'You would be the best, kindest pet owner ever!',
        fallbackReplyVi: 'Bạn chắc chắn là người chăm sóc thú cưng tốt bụng nhất!'
      },
      {
        botEn: 'Thanks for chatting about pets with me! What do you want to say to your pet?',
        botVi: 'Cảm ơn bạn đã trò chuyện về thú cưng với tớ! Bạn muốn nói gì với bạn thú cưng nào?',
        options: [
          { en: 'You are my best friend!', vi: 'Bạn là người bạn thân nhất của tớ!', icon: '💖', keywords: ['friend', 'best', 'love'], replyEn: 'Woof, woof! That makes my tail wag with joy! Great job today!', replyVi: 'Gâu gâu! Nghe mà tớ mừng vẫy đuôi luôn! Hôm nay bạn nói giỏi lắm!' },
          { en: 'Let us go play together!', vi: 'Chúng mình cùng đi chơi nhé!', icon: '⚽', keywords: ['play', 'together', 'go', 'fun'], replyEn: 'Yay! Adventure time! You earned gold stars for speaking!', replyVi: 'Hoan hô! Giờ phiêu lưu tới rồi! Bạn đã nhận sao vàng luyện nói!' },
          { en: 'Good boy! Good girl!', vi: 'Ngoan lắm! Giỏi lắm!', icon: '⭐', keywords: ['good', 'boy', 'girl', 'cute', 'smart'], replyEn: 'Hehe, and YOU are a superstar English speaker!', replyVi: 'Hehe, còn BẠN là siêu sao nói tiếng Anh đấy!' }
        ],
        fallbackReplyEn: 'So sweet! You spoke wonderful English with Toby today!',
        fallbackReplyVi: 'Ngọt ngào quá! Hôm nay bạn nói tiếng Anh với Toby rất tuyệt!'
      }
    ]
  },
  {
    id: 'talk_weather_play',
    level: 'A1',
    ageHint: '6–8 tuổi',
    mascot: 'lulu',
    mascotName: 'Thỏ Lulu',
    bg: 'assets/art/books/scene_hills.webp',
    icon: '🪁',
    accent: '#EC4899',
    softBg: '#FDF2F8',
    titleVi: 'Thời Tiết & Đi Chơi',
    titleEn: 'Weather & Playtime',
    descVi: 'Nói về trời nắng, trời mưa và trò chơi yêu thích.',
    turns: [
      {
        botEn: 'Look outside the window! What is the weather like today?',
        botVi: 'Nhìn ra ngoài cửa sổ kìa! Thời tiết hôm nay thế nào nhỉ?',
        options: [
          { en: 'It is sunny and warm!', vi: 'Trời có nắng và ấm áp!', icon: '☀️', keywords: ['sunny', 'sun', 'warm', 'hot', 'bright'], replyEn: 'Wonderful! A sunny day is perfect for flying kites!', replyVi: 'Tuyệt vời! Ngày nắng ấm rất hợp để đi thả diều!' },
          { en: 'It is rainy today.', vi: 'Hôm nay trời mưa.', icon: '🌧️', keywords: ['rain', 'rainy', 'wet', 'storm'], replyEn: 'Pitter-patter! Rainy days are cozy for warm tea and books!', replyVi: 'Tí tách! Ngày mưa thật ấm cúng để uống trà và đọc truyện!' },
          { en: 'It is windy and cool!', vi: 'Trời nhiều gió và mát mẻ!', icon: '💨', keywords: ['wind', 'windy', 'cool', 'cloudy', 'cold'], replyEn: 'Whoosh! Cool wind makes kites dance high in the sky!', replyVi: 'Vù vù! Gió mát làm cánh diều bay lượn thật cao trên bầu trời!' }
        ],
        fallbackReplyEn: 'Every kind of weather can be fun in its own way!',
        fallbackReplyVi: 'Kiểu thời tiết nào cũng có niềm vui riêng nhỉ!'
      },
      {
        botEn: 'What should we wear when we go outside?',
        botVi: 'Chúng mình nên mặc gì khi ra ngoài trời nhỉ?',
        options: [
          { en: 'A hat and sunglasses!', vi: 'Một chiếc mũ và kính râm!', icon: '🧢', keywords: ['hat', 'cap', 'sunglasses', 'shirt', 'shorts'], replyEn: 'Smart! A hat keeps our head cool in the sun!', replyVi: 'Thông minh quá! Đội mũ giúp đầu luôn mát mẻ dưới nắng!' },
          { en: 'A raincoat and boots!', vi: 'Áo mưa và ủng đi mưa!', icon: '☂️', keywords: ['raincoat', 'coat', 'boots', 'umbrella', 'jacket'], replyEn: 'Splash! Rain boots are so fun for jumping over puddles!', replyVi: 'Tõm tõm! Đi ủng mưa để nhảy qua vũng nước vui lắm!' },
          { en: 'A warm sweater and sneakers!', vi: 'Áo len ấm và giày thể thao!', icon: '👟', keywords: ['sweater', 'shoes', 'sneakers', 'pants', 'jacket'], replyEn: 'Cozy and comfy! Ready to walk and explore!', replyVi: 'Ấm áp và thoải mái! Sẵn sàng đi khám phá thôi!' }
        ],
        fallbackReplyEn: 'Awesome outfit! You are all ready!',
        fallbackReplyVi: 'Trang phục chuẩn lắm! Bạn sẵn sàng rồi đấy!'
      },
      {
        botEn: 'What fun game shall we play together today?',
        botVi: 'Hôm nay chúng mình cùng chơi trò gì vui nhỉ?',
        options: [
          { en: 'Let us fly a colorful kite!', vi: 'Cùng thả một con diều sặc sỡ nhé!', icon: '🪁', keywords: ['kite', 'fly', 'wind'], replyEn: 'Wheee! Watch our kite soar up to the clouds!', replyVi: 'Vút lên nào! Nhìn con diều của chúng mình bay lên tận mây kìa!' },
          { en: 'Let us ride our bikes!', vi: 'Cùng đạp xe đạp nhé!', icon: '🚲', keywords: ['bike', 'bicycle', 'ride', 'ball', 'soccer', 'football'], replyEn: 'Ring, ring! Riding bikes down the green path is awesome!', replyVi: 'Kính coong! Đạp xe dọc con đường xanh thích mê!' },
          { en: 'Let us have a tea party!', vi: 'Cùng mở tiệc trà nhé!', icon: '🫖', keywords: ['tea', 'party', 'draw', 'paint', 'game', 'read'], replyEn: 'Yay! I will bring sweet cupcakes and storybooks!', replyVi: 'Hoan hô! Tớ sẽ mang bánh cupcake ngọt và truyện tranh tới!' }
        ],
        fallbackReplyEn: 'Ooh, I love playing that with you!',
        fallbackReplyVi: 'Ồ, tớ thích chơi trò đó cùng bạn lắm!'
      },
      {
        botEn: 'That was the best playtime ever! Are you ready for your stars?',
        botVi: 'Đúng là buổi đi chơi vui nhất luôn! Bạn sẵn sàng nhận sao chưa nào?',
        options: [
          { en: 'Yes! I had so much fun!', vi: 'Có ạ! Tớ thấy vui cực kỳ!', icon: '🎉', keywords: ['yes', 'fun', 'happy', 'great'], replyEn: 'Hooray! You spoke English like a champion!', replyVi: 'Hoan hô! Bạn nói tiếng Anh như một nhà vô địch!' },
          { en: 'Thank you, Lulu! See you again!', vi: 'Cảm ơn Lulu! Hẹn gặp lại nhé!', icon: '🐰', keywords: ['thank', 'lulu', 'see', 'bye'], replyEn: 'See you next time, my bright star!', replyVi: 'Hẹn gặp lại nhé, ngôi sao sáng của tớ!' }
        ],
        fallbackReplyEn: 'Yay! Here come your shiny stars!',
        fallbackReplyVi: 'Hoan hô! Những ngôi sao lấp lánh dành cho bạn đây!'
      }
    ]
  },
  {
    id: 'talk_cafe',
    level: 'A2',
    ageHint: '8–10 tuổi',
    mascot: 'mimi',
    mascotName: 'Đầu bếp Mimi',
    bg: 'assets/art/books/scene_cottage.webp',
    icon: '🧁',
    accent: '#D97706',
    softBg: '#FFFBEB',
    titleVi: 'Gọi Món Tiệm Bánh Ấm Cúng',
    titleEn: 'At the Cozy Bakery',
    descVi: 'Luyện gọi đồ ăn, đồ uống thật lịch sự bằng tiếng Anh.',
    turns: [
      {
        botEn: 'Good afternoon! Welcome to Cozy Bakery. What would you like to eat today?',
        botVi: 'Chào buổi chiều! Chào mừng đến Tiệm Bánh Ấm Cúng. Hôm nay bạn muốn dùng món bánh gì ạ?',
        options: [
          { en: 'I would like a warm blueberry muffin, please.', vi: 'Cho mình một chiếc bánh nướng việt quất ấm nhé.', icon: '🧁', keywords: ['muffin', 'blueberry', 'cupcake', 'cake'], replyEn: 'Excellent choice! Our blueberry muffins just came out of the oven!', replyVi: 'Lựa chọn tuyệt hảo! Bánh nướng việt quất vừa mới ra lò luôn!' },
          { en: 'Can I have a cheese sandwich, please?', vi: 'Mình gọi một chiếc bánh mì kẹp phô mai được không?', icon: '🥪', keywords: ['sandwich', 'bread', 'cheese', 'croissant'], replyEn: 'Of course! One fresh toasted cheese sandwich coming right up!', replyVi: 'Tất nhiên rồi! Một phần bánh mì kẹp phô mai nóng giòn có ngay!' },
          { en: 'I would like two chocolate cookies, please.', vi: 'Cho mình hai chiếc bánh quy sô-cô-la nhé.', icon: '🍪', keywords: ['cookie', 'cookies', 'chocolate'], replyEn: 'Yum! Crunchy chocolate cookies are everyone\'s favorite!', replyVi: 'Ngon tuyệt! Bánh quy sô-cô-la giòn rụm ai cũng mê!' }
        ],
        fallbackReplyEn: 'Sounds delicious! Let me prepare that fresh for you!',
        fallbackReplyVi: 'Nghe thật ngon! Để mình chuẩn bị nóng hổi cho bạn ngay!'
      },
      {
        botEn: 'And what would you like to drink with that?',
        botVi: 'Và bạn muốn gọi thêm đồ uống gì dùng kèm nào?',
        options: [
          { en: 'A glass of orange juice, please.', vi: 'Một ly nước cam ép nhé.', icon: '🍊', keywords: ['orange', 'juice', 'apple'], replyEn: 'Fresh squeezed orange juice — full of vitamins!', replyVi: 'Nước cam tươi vắt — tràn đầy vitamin luôn!' },
          { en: 'I would like warm milk with honey.', vi: 'Mình muốn một ly sữa ấm mật ong.', icon: '🥛', keywords: ['milk', 'honey', 'warm', 'hot', 'cocoa', 'chocolate'], replyEn: 'So cozy! Warm honey milk is super comforting!', replyVi: 'Ấm cúng quá! Sữa ấm mật ong thật dễ chịu!' },
          { en: 'Just a cup of cool water, please.', vi: 'Chỉ cần một ly nước mát thôi ạ.', icon: '💧', keywords: ['water', 'tea', 'cup'], replyEn: 'Coming right up! Cool fresh water is always healthy!', replyVi: 'Có ngay đây ạ! Nước mát tinh khiết luôn tốt cho sức khỏe!' }
        ],
        fallbackReplyEn: 'Great drink choice! I will bring it to your table.',
        fallbackReplyVi: 'Đồ uống chuẩn lắm! Mình sẽ mang ra bàn cho bạn ngay.'
      },
      {
        botEn: 'Would you like to eat here by the window, or take it to go?',
        botVi: 'Bạn muốn ngồi ăn ở bàn cạnh cửa sổ hay mang đi ạ?',
        options: [
          { en: 'I will eat here by the window, please.', vi: 'Mình ngồi ăn ở đây cạnh cửa sổ nhé.', icon: '🪟', keywords: ['here', 'window', 'stay', 'table'], replyEn: 'Lovely! You can watch the butterflies in the garden while eating!', replyVi: 'Tuyệt vời! Bạn có thể vừa ăn vừa ngắm bướm ngoài vườn đấy!' },
          { en: 'To go, please! I am having a picnic.', vi: 'Gói mang đi nhé! Mình sắp đi dã ngoại.', icon: '🧺', keywords: ['go', 'take', 'picnic', 'home', 'away'], replyEn: 'Fun! I will wrap it neatly in a picnic box for you!', replyVi: 'Vui quá! Mình sẽ gói thật gọn gàng vào hộp dã ngoại cho bạn!' }
        ],
        fallbackReplyEn: 'No problem at all! Here is your tray!',
        fallbackReplyVi: 'Không vấn đề gì! Khay bánh của bạn đây ạ!'
      },
      {
        botEn: 'Here is your order! Everything is on the house for such a polite speaker. How does it taste?',
        botVi: 'Món của bạn đây! Miễn phí luôn vì bạn nói chuyện rất lịch sự. Bạn thấy vị thế nào?',
        options: [
          { en: 'It is delicious! Thank you so much!', vi: 'Ngon tuyệt cú mèo! Cảm ơn bạn nhiều nhé!', icon: '😋', keywords: ['delicious', 'yummy', 'good', 'great', 'thank'], replyEn: 'My pleasure! Your polite English was 10 out of 10!', replyVi: 'Rất hân hạnh! Tiếng Anh giao tiếp lịch sự của bạn đạt 10/10 luôn!' },
          { en: 'So warm and tasty! See you again!', vi: 'Thật ấm và ngon miệng! Hẹn gặp lại nhé!', icon: '⭐', keywords: ['warm', 'tasty', 'sweet', 'see', 'bye'], replyEn: 'See you soon at Cozy Bakery! Great job!', replyVi: 'Hẹn sớm gặp lại tại Tiệm Bánh Ấm Cúng! Giỏi lắm!' }
        ],
        fallbackReplyEn: 'Thank you for visiting Cozy Bakery! You did wonderfully!',
        fallbackReplyVi: 'Cảm ơn bạn đã ghé Tiệm Bánh Ấm Cúng! Bạn làm xuất sắc lắm!'
      }
    ]
  },
  {
    id: 'talk_school',
    level: 'A2',
    ageHint: '8–10 tuổi',
    mascot: 'leo',
    mascotName: 'Sư tử Leo',
    bg: 'assets/art/painted_bg_montessori.webp',
    icon: '🎒',
    accent: '#3B82F6',
    softBg: '#EFF6FF',
    titleVi: 'Một Ngày Ở Trường Học',
    titleEn: 'My School Day',
    descVi: 'Kể về môn học yêu thích, bạn thân và sở thích sau giờ học.',
    turns: [
      {
        botEn: 'Hey friend! How was school today? What subject do you enjoy learning most?',
        botVi: 'Này bạn ơi! Hôm nay ở trường thế nào? Bạn thích học môn nào nhất?',
        options: [
          { en: 'I love English and reading stories!', vi: 'Tớ thích tiếng Anh và đọc truyện!', icon: '📚', keywords: ['english', 'reading', 'story', 'stories', 'literature'], replyEn: 'Awesome! Reading stories helps our imagination fly!', replyVi: 'Tuyệt vời! Đọc truyện giúp trí tưởng tượng bay cao!' },
          { en: 'My favorite subject is Math and Science.', vi: 'Môn yêu thích của tớ là Toán và Khoa học.', icon: '🔬', keywords: ['math', 'science', 'computer', 'coding'], replyEn: 'Cool! Solving puzzles and doing experiments is super exciting!', replyVi: 'Ngầu quá! Giải đố và làm thí nghiệm thật là thú vị!' },
          { en: 'I really like Art and Music!', vi: 'Tớ rất thích Mỹ thuật và Âm nhạc!', icon: '🎨', keywords: ['art', 'music', 'draw', 'drawing', 'sport', 'pe'], replyEn: 'Creative! Painting pictures and singing songs brings so much joy!', replyVi: 'Sáng tạo quá! Vẽ tranh và ca hát mang lại thật nhiều niềm vui!' }
        ],
        fallbackReplyEn: 'That is a really interesting subject! Keep being curious!',
        fallbackReplyVi: 'Đó là một môn học rất thú vị! Hãy luôn giữ sự ham học hỏi nhé!'
      },
      {
        botEn: 'Who do you like to play or study with during break time?',
        botVi: 'Giờ ra chơi bạn thích chơi hoặc học cùng ai?',
        options: [
          { en: 'I play games with my best friend.', vi: 'Tớ chơi trò chơi cùng bạn thân.', icon: '🤝', keywords: ['friend', 'friends', 'best', 'play'], replyEn: 'Best friends make every school day brighter!', replyVi: 'Có bạn thân khiến mỗi ngày đi học thêm rực rỡ!' },
          { en: 'I talk with my classmates in the yard.', vi: 'Tớ trò chuyện cùng các bạn cùng lớp ở sân trường.', icon: '🌳', keywords: ['classmate', 'classmates', 'yard', 'talk', 'soccer', 'football'], replyEn: 'Laughing and sharing stories at recess is the best!', replyVi: 'Cười đùa và kể chuyện giờ ra chơi là thích nhất!' },
          { en: 'I read books in the school library.', vi: 'Tớ đọc sách ở thư viện trường.', icon: '📖', keywords: ['library', 'read', 'book', 'books', 'quiet'], replyEn: 'A quiet library is like a treasure chest of knowledge!', replyVi: 'Thư viện yên tĩnh giống như một kho báu tri thức vậy!' }
        ],
        fallbackReplyEn: 'Sounds like you have wonderful friends at school!',
        fallbackReplyVi: 'Nghe thật vui, chắc bạn có nhiều bạn tốt ở trường lắm!'
      },
      {
        botEn: 'What do you like doing after school when you finish your homework?',
        botVi: 'Sau giờ học, khi làm xong bài tập về nhà bạn thích làm gì?',
        options: [
          { en: 'I like riding my bike or playing sports.', vi: 'Tớ thích đạp xe hoặc chơi thể thao.', icon: '⚽', keywords: ['bike', 'sport', 'sports', 'football', 'soccer', 'swim', 'play'], replyEn: 'Active and healthy! Moving our body gives us energy!', replyVi: 'Năng động và khỏe khoắn! Vận động giúp cơ thể tràn đầy năng lượng!' },
          { en: 'I like drawing or building Lego.', vi: 'Tớ thích vẽ tranh hoặc lắp ráp Lego.', icon: '🧱', keywords: ['draw', 'drawing', 'lego', 'build', 'music', 'piano'], replyEn: 'You have an inventor\'s imagination! I would love to see what you build!', replyVi: 'Bạn có trí tưởng tượng của nhà phát minh đấy! Tớ rất muốn xem sản phẩm của bạn!' },
          { en: 'I help my parents and practice English!', vi: 'Tớ phụ giúp bố mẹ và luyện tiếng Anh!', icon: '⭐', keywords: ['help', 'parent', 'mom', 'dad', 'english', 'study', 'read'], replyEn: 'Wow, so responsible and hardworking! Your parents must be super proud!', replyVi: 'Chà, thật có trách nhiệm và chăm chỉ! Bố mẹ chắc tự hào về bạn lắm!' }
        ],
        fallbackReplyEn: 'That is a great way to spend your afternoon!',
        fallbackReplyVi: 'Đó là một cách thật tuyệt để tận hưởng buổi chiều!'
      },
      {
        botEn: 'You told me all about your school day in clear English! Ready for your reward?',
        botVi: 'Bạn đã kể về ngày đi học bằng tiếng Anh thật rõ ràng! Sẵn sàng nhận thưởng chưa?',
        options: [
          { en: 'Yes! Speaking English is fun!', vi: 'Có ạ! Nói tiếng Anh thật vui!', icon: '🎉', keywords: ['yes', 'fun', 'love', 'great'], replyEn: 'High five! Keep practicing a little every day!', replyVi: 'Đập tay nào! Hãy luyện nói mỗi ngày một chút nhé!' },
          { en: 'Thank you, Leo! See you next time!', vi: 'Cảm ơn Leo! Hẹn gặp lại lần sau nhé!', icon: '🦁', keywords: ['thank', 'thanks', 'leo', 'see', 'bye'], replyEn: 'You are welcome, scholar! Shiny gold stars for you!', replyVi: 'Không có gì đâu học giả nhí! Sao vàng lấp lánh cho bạn đây!' }
        ],
        fallbackReplyEn: 'Awesome conversation! You did a fantastic job!',
        fallbackReplyVi: 'Cuộc trò chuyện tuyệt vời! Bạn đã làm rất tốt!'
      }
    ]
  },
  {
    id: 'talk_storybook',
    level: 'B1',
    ageHint: '10–13 tuổi',
    mascot: 'lulu',
    mascotName: 'Thủ thư Lulu',
    bg: 'assets/art/painted_hub_srs.webp',
    icon: '🏰',
    accent: '#8B5CF6',
    softBg: '#F3E8FF',
    titleVi: 'Câu Lạc Bộ Truyện Cổ Tích',
    titleEn: 'Storybook Book Club',
    descVi: 'Thảo luận nhân vật yêu thích và bài học từ truyện cổ tích & ngụ ngôn.',
    turns: [
      {
        botEn: 'Welcome to the Starlight Book Club! Which fairy tale or fable did you enjoy most?',
        botVi: 'Chào mừng đến Câu lạc bộ Sách Ánh Sao! Bạn thích truyện cổ tích hay ngụ ngôn nào nhất?',
        options: [
          { en: 'I loved The Three Little Pigs!', vi: 'Tớ rất thích truyện Ba Chú Heo Con!', icon: '🐷', keywords: ['pig', 'pigs', 'three', 'brick', 'wolf'], replyEn: 'Such a classic! The third pig\'s sturdy brick house saved everyone!', replyVi: 'Kinh điển luôn! Ngôi nhà gạch kiên cố của chú heo út đã cứu cả ba anh em!' },
          { en: 'My favorite is The Tortoise and the Hare.', vi: 'Truyện tớ thích nhất là Rùa và Thỏ.', icon: '🐢', keywords: ['tortoise', 'turtle', 'hare', 'rabbit', 'race'], replyEn: 'Great pick! Slow and steady really does win the race!', replyVi: 'Lựa chọn hay quá! Chậm mà chắc thực sự sẽ về đích chiến thắng!' },
          { en: 'I enjoyed Jack and the Beanstalk!', vi: 'Tớ thích truyện Jack và Cây Đậu Thần!', icon: '🌱', keywords: ['jack', 'bean', 'beanstalk', 'giant', 'red', 'lion', 'mouse', 'ant'], replyEn: 'What an exciting adventure up above the clouds!', replyVi: 'Đúng là một chuyến phiêu lưu kỳ thú lên tận trên tầng mây!' }
        ],
        fallbackReplyEn: 'Ooh, that is a wonderful story with a great adventure!',
        fallbackReplyVi: 'Ồ, đó là một câu chuyện tuyệt hay với cuộc phiêu lưu thú vị!'
      },
      {
        botEn: 'Why did you like the main character in that story?',
        botVi: 'Vì sao bạn lại ấn tượng với nhân vật chính trong câu chuyện đó?',
        options: [
          { en: 'Because they were brave and clever!', vi: 'Bởi vì nhân vật ấy rất dũng cảm và thông minh!', icon: '💡', keywords: ['brave', 'clever', 'smart', 'courage'], replyEn: 'Yes! Courage and quick thinking help us solve tough problems!', replyVi: 'Đúng vậy! Lòng dũng cảm và sự nhanh trí giúp ta giải quyết khó khăn!' },
          { en: 'Because they worked hard and never gave up.', vi: 'Vì họ chăm chỉ và không bao giờ bỏ cuộc.', icon: '💪', keywords: ['work', 'worked', 'hard', 'steady', 'patient', 'careful', 'give up'], replyEn: 'That is a superpower in real life too — patience always pays off!', replyVi: 'Đó cũng là siêu năng lực ngoài đời thực đấy — sự kiên trì luôn được đền đáp!' },
          { en: 'Because they were kind and helped friends.', vi: 'Vì họ tốt bụng và biết giúp đỡ bạn bè.', icon: '💛', keywords: ['kind', 'help', 'helped', 'friend', 'share', 'shared'], replyEn: 'Beautiful answer! Even the smallest act of kindness matters!', replyVi: 'Câu trả lời thật đẹp! Ngay cả hành động tử tế nhỏ bé nhất cũng thật đáng quý!' }
        ],
        fallbackReplyEn: 'That is a very thoughtful reason! You are a great reader!',
        fallbackReplyVi: 'Lý do rất sâu sắc! Bạn đúng là một độc giả xuất sắc!'
      },
      {
        botEn: 'If you could write your own storybook, what would it be about?',
        botVi: 'Nếu được tự viết một cuốn truyện tranh của riêng mình, bạn sẽ viết về điều gì?',
        options: [
          { en: 'A story about exploring space and planets!', vi: 'Một câu chuyện khám phá vũ trụ và các hành tinh!', icon: '🚀', keywords: ['space', 'planet', 'planets', 'star', 'stars', 'galaxy', 'moon'], replyEn: 'Whoa! A cosmic adventure across the stars sounds unforgettable!', replyVi: 'Chà! Một chuyến phiêu lưu vũ trụ xuyên các vì sao nghe thật khó quên!' },
          { en: 'An ocean adventure saving sea animals.', vi: 'Chuyến phiêu lưu đại dương giải cứu sinh vật biển.', icon: '🐳', keywords: ['ocean', 'sea', 'whale', 'turtle', 'fish', 'animal', 'animals'], replyEn: 'Wonderful! Protecting nature and ocean friends is an inspiring theme!', replyVi: 'Tuyệt vời! Bảo vệ thiên nhiên và các bạn biển là chủ đề đầy cảm hứng!' },
          { en: 'A magical forest with talking animals.', vi: 'Một khu rừng phép thuật với các bạn thú biết nói.', icon: '🌲', keywords: ['forest', 'magic', 'magical', 'dragon', 'castle', 'friend'], replyEn: 'I would definitely read that book from cover to cover!', replyVi: 'Tớ chắc chắn sẽ đọc nghiền ngẫm cuốn sách đó từ trang đầu đến trang cuối!' }
        ],
        fallbackReplyEn: 'What an imaginative idea! Every reader can become an author!',
        fallbackReplyVi: 'Ý tưởng thật giàu trí tưởng tượng! Mỗi độc giả đều có thể trở thành tác giả!'
      },
      {
        botEn: 'Thank you for sharing your ideas in our Book Club! What is your takeaway today?',
        botVi: 'Cảm ơn bạn đã chia sẻ ý tưởng trong Câu lạc bộ Sách! Thông điệp bạn tâm đắc hôm nay là gì?',
        options: [
          { en: 'Reading helps us learn new words every day!', vi: 'Đọc sách giúp chúng ta học từ mới mỗi ngày!', icon: '📖', keywords: ['read', 'reading', 'learn', 'words', 'english'], replyEn: 'Spot on! You spoke thoughtfully and fluently — Bravo!', replyVi: 'Chuẩn không cần chỉnh! Bạn diễn đạt thật sâu sắc và trôi chảy — Hoan hô!' },
          { en: 'Be kind, brave, and keep trying!', vi: 'Hãy tử tế, dũng cảm và không ngừng cố gắng!', icon: '🌟', keywords: ['kind', 'brave', 'try', 'trying', 'good'], replyEn: 'A golden motto! Here are your Book Club gold stars!', replyVi: 'Một châm ngôn vàng! Sao vàng Câu lạc bộ Sách dành cho bạn đây!' }
        ],
        fallbackReplyEn: 'Bravo! You are an articulate young storyteller!',
        fallbackReplyVi: 'Hoan hô! Bạn là người kể chuyện trẻ diễn đạt thật mạch lạc!'
      }
    ]
  },
  {
    id: 'talk_dream_trip',
    level: 'B1',
    ageHint: '10–13 tuổi',
    mascot: 'toby',
    mascotName: 'Nhà thám hiểm Toby',
    bg: 'assets/art/books/scene_beach.webp',
    icon: '🧭',
    accent: '#0EA5E9',
    softBg: '#F0F9FF',
    titleVi: 'Chuyến Du Lịch Mơ Ước',
    titleEn: 'My Dream Adventure',
    descVi: 'Lên kế hoạch du lịch biển, núi hoặc khám phá thế giới bằng tiếng Anh.',
    turns: [
      {
        botEn: 'Pack your compass, explorer! If you could travel anywhere in the world, where would you go?',
        botVi: 'Chuẩn bị la bàn nào nhà thám hiểm! Nếu được đi du lịch bất cứ đâu trên thế giới, bạn muốn tới đâu?',
        options: [
          { en: 'I would love to visit a sunny tropical beach!', vi: 'Tớ rất muốn tới một bãi biển nhiệt đới ngập nắng!', icon: '🏖️', keywords: ['beach', 'sea', 'ocean', 'island', 'swim'], replyEn: 'Crystal blue waves and golden sand — count me in!', replyVi: 'Sóng xanh trong vắt và cát vàng — cho tớ đi cùng với nhé!' },
          { en: 'I want to hike up snowy mountains!', vi: 'Tớ muốn leo lên những ngọn núi phủ tuyết!', icon: '⛰️', keywords: ['mountain', 'mountains', 'snow', 'hike', 'forest', 'nature'], replyEn: 'Fresh mountain air and breathtaking views from the summit!', replyVi: 'Không khí núi cao trong lành và khung cảnh đỉnh núi ngoạn mục!' },
          { en: 'I would like to explore a famous city and museums!', vi: 'Tớ muốn khám phá một thành phố nổi tiếng và các bảo tàng!', icon: '🏙️', keywords: ['city', 'museum', 'london', 'japan', 'paris', 'world', 'country'], replyEn: 'Exciting! Visiting museums and tasting new food is unforgettable!', replyVi: 'Thú vị quá! Thăm bảo tàng và nếm thử món ăn mới thật khó quên!' }
        ],
        fallbackReplyEn: 'Ooh, what a dream destination! That sounds amazing!',
        fallbackReplyVi: 'Ồ, đúng là điểm đến trong mơ! Nghe tuyệt vời quá!'
      },
      {
        botEn: 'What are two important things you will pack in your backpack?',
        botVi: 'Hai món đồ quan trọng nhất bạn sẽ bỏ vào ba lô là gì?',
        options: [
          { en: 'A water bottle and a map!', vi: 'Một bình nước và một tấm bản đồ!', icon: '🗺️', keywords: ['water', 'map', 'compass', 'bottle', 'snack', 'food'], replyEn: 'Spoken like a true explorer! Staying hydrated and knowing the trail is key!', replyVi: 'Chuẩn phong thái nhà thám hiểm! Đủ nước và biết đường đi là quan trọng nhất!' },
          { en: 'A camera and my sketchbook!', vi: 'Một chiếc máy ảnh và sổ vẽ!', icon: '📷', keywords: ['camera', 'book', 'sketchbook', 'notebook', 'phone', 'photo'], replyEn: 'Wonderful! You can capture memories and draw everything you discover!', replyVi: 'Tuyệt quá! Bạn có thể lưu giữ kỷ niệm và vẽ lại mọi khám phá!' },
          { en: 'A warm jacket and comfortable shoes!', vi: 'Một chiếc áo khoác ấm và đôi giày êm!', icon: '🥾', keywords: ['jacket', 'shoes', 'clothes', 'hat', 'umbrella'], replyEn: 'Smart planning! Being prepared for any weather makes every trip smoother!', replyVi: 'Chuẩn bị chu đáo quá! Sẵn sàng cho mọi thời tiết giúp chuyến đi suôn sẻ!' }
        ],
        fallbackReplyEn: 'Great packing list! You are totally ready for takeoff!',
        fallbackReplyVi: 'Danh sách đồ đạc chuẩn lắm! Bạn sẵn sàng lên đường rồi!'
      },
      {
        botEn: 'What is the very first thing you want to do when you arrive?',
        botVi: 'Điều đầu tiên bạn muốn làm ngay khi đặt chân tới nơi là gì?',
        options: [
          { en: 'Try the delicious local food!', vi: 'Thử các món ăn địa phương thơm ngon!', icon: '🍜', keywords: ['food', 'eat', 'try', 'taste', 'ice cream'], replyEn: 'Yum! Tasting new dishes is the tastiest way to learn about a culture!', replyVi: 'Ngon quá! Thưởng thức món mới là cách thú vị nhất để hiểu văn hóa!' },
          { en: 'Take photos and explore nature!', vi: 'Chụp ảnh và khám phá thiên nhiên!', icon: '🌿', keywords: ['photo', 'photos', 'explore', 'nature', 'walk', 'swim', 'look'], replyEn: 'Awesome! Discovering hidden trails and wildlife is pure magic!', replyVi: 'Tuyệt vời! Khám phá những lối nhỏ và thiên nhiên hoang dã thật kỳ diệu!' },
          { en: 'Make new friends and practice English!', vi: 'Kết bạn mới và thực hành nói tiếng Anh!', icon: '🌍', keywords: ['friend', 'friends', 'english', 'speak', 'people', 'talk'], replyEn: 'That is the superpower of English — it connects us with friends everywhere!', replyVi: 'Đó chính là siêu năng lực của tiếng Anh — kết nối chúng ta với bạn bè khắp nơi!' }
        ],
        fallbackReplyEn: 'I love your adventurous spirit! That will be a blast!',
        fallbackReplyVi: 'Tớ rất thích tinh thần phiêu lưu của bạn! Chắc chắn sẽ vui nổ trời!'
      },
      {
        botEn: 'Bon voyage, explorer! Ready to collect your adventure stars?',
        botVi: 'Thượng lộ bình an nhé nhà thám hiểm! Sẵn sàng nhận sao phiêu lưu chưa?',
        options: [
          { en: 'Yes! Let the adventure begin!', vi: 'Sẵn sàng! Bắt đầu cuộc phiêu lưu thôi!', icon: '🚀', keywords: ['yes', 'adventure', 'ready', 'go'], replyEn: 'Hooray! Your fluent English unlocked shiny gold stars!', replyVi: 'Hoan hô! Khả năng nói tiếng Anh trôi chảy của bạn đã mở khóa sao vàng!' },
          { en: 'Thank you, Toby! That was awesome!', vi: 'Cảm ơn Toby! Cuộc trò chuyện tuyệt lắm!', icon: '🦊', keywords: ['thank', 'thanks', 'toby', 'awesome', 'great'], replyEn: 'Anytime, fellow traveler! See you on our next journey!', replyVi: 'Lúc nào cũng sẵn lòng nhé bạn đồng hành! Hẹn gặp ở hành trình tiếp theo!' }
        ],
        fallbackReplyEn: 'Fantastic job! You are ready to explore the world in English!',
        fallbackReplyVi: 'Xuất sắc! Bạn đã sẵn sàng khám phá thế giới bằng tiếng Anh rồi!'
      }
    ]
  }
];

const TALK_AI_STARTERS = [
  { icon: '🦁', en: 'Hi Leo! Let us talk about animals.', vi: 'Chào Leo! Nói chuyện về động vật nhé.' },
  { icon: '🏰', en: 'Can we make up a short fairy tale together?', vi: 'Cùng nghĩ một truyện cổ tích ngắn nhé?' },
  { icon: '🍕', en: 'Let us pretend you run a pizza shop!', vi: 'Giả vờ cậu mở tiệm pizza đi!' },
  { icon: '🚀', en: 'Ask me 3 fun trivia questions in English!', vi: 'Đố tớ 3 câu hỏi vui bằng tiếng Anh đi!' }
];
