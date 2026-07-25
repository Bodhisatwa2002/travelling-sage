export interface BlogPost {
  slug: string;
  issueNumber: string;
  title: string;
  subtitle?: string;
  category: string;
  author: string;
  readTime: string;
  image: string;
  featured?: boolean;
  content?: {
    heading: string;
    paragraphs: string[];
    subSections?: { heading: string; paragraphs: string[] }[];
  }[];
}

export const posts: BlogPost[] = [
  {
    slug: "pondicherry-where-france-meets-india-by-the-sea",
    issueNumber: "No. 022",
    title: "Pondicherry — where France meets India by the sea",
    subtitle:
      "A coastal town that blends French colonial charm with Tamil culture and spiritual retreats.",
    category: "Culture",
    author: "Arjun Mehta",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
    content: [
      {
        heading: "Introduction",
        paragraphs: [
          "Pondicherry, now officially Puducherry, is unlike any other town in India. Its tree-lined boulevards, mustard-yellow colonial buildings, and quiet promenades along the Bay of Bengal feel like stepping into a different era.",
          "The town is divided into the French Quarter (Ville Blanche) and the Tamil Quarter, each with its own distinct character. Together, they create a fascinating cultural mosaic.",
          "Whether you come for the beaches, the ashrams, or the buttery croissants, Pondicherry has a way of slowing you down and making you stay longer than planned.",
        ],
      },
      {
        heading: "The French Quarter",
        paragraphs: [
          "Walking through the French Quarter feels like being transported to a small Mediterranean town. Bougainvillea spills over whitewashed walls, and the streets carry names like Rue Suffren and Rue Dumas.",
          "The architecture is a blend of French colonial and Tamil styles. Many heritage buildings have been restored as boutique hotels, cafés, and art galleries.",
        ],
      },
      {
        heading: "Exploring Pondicherry",
        paragraphs: [
          "Beyond the French Quarter, Pondicherry offers spiritual depth, culinary adventures, and serene beaches that make it a complete destination.",
          "The best way to explore is on foot or by renting a bicycle — the town is flat and compact enough to cover in a day.",
        ],
        subSections: [
          {
            heading: "Auroville and Sri Aurobindo Ashram",
            paragraphs: [
              "Auroville, the experimental township founded in 1968, lies just outside Pondicherry. Its golden Matrimandir is an architectural wonder and a space for silent meditation.",
              "The Sri Aurobindo Ashram in the heart of town is another spiritual landmark. Visitors can explore its tranquil courtyard and learn about the philosophy of integral yoga.",
            ],
          },
          {
            heading: "Food and café culture",
            paragraphs: [
              "Pondicherry's food scene is a delightful fusion. French bakeries sit alongside South Indian thali joints, and seafood is fresh from the morning catch.",
              "• Baker Street for croissants and baguettes\n• Villa Shanti for Franco-Tamil fine dining\n• Café des Arts for coffee in a heritage courtyard",
              "Don't miss the street-side filter coffee and freshly made dosas in the Tamil Quarter.",
            ],
          },
          {
            heading: "Beaches and the Promenade",
            paragraphs: [
              "The Rock Beach promenade is the soul of Pondicherry. Closed to traffic in the evenings, it becomes a gathering place for locals and travelers alike.",
              "For swimming, head to Paradise Beach or Serenity Beach, both a short ride from the town center.",
            ],
          },
        ],
      },
      {
        heading: "Conclusion",
        paragraphs: [
          "Pondicherry is a place where cultures blend effortlessly and time moves at its own pace. It rewards the curious traveler who wanders without a rigid plan.",
          "Come for a weekend and you might find yourself extending your stay — that's the Pondy effect.",
        ],
      },
    ],
  },
  {
    slug: "banaras-the-eternal-city-on-the-ganges",
    issueNumber: "No. 021",
    title: "Banaras — the eternal city on the Ganges",
    subtitle:
      "One of the oldest living cities in the world, where life and death dance along the river ghats.",
    category: "Heritage",
    author: "Priya Sharma",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80",
    content: [
      {
        heading: "Introduction",
        paragraphs: [
          "Varanasi — or Banaras, as locals lovingly call it — is a city that defies simple description. It is ancient, chaotic, spiritual, and deeply alive, all at once.",
          "Situated on the banks of the Ganges in Uttar Pradesh, Banaras has been a center of learning, culture, and devotion for over 3,000 years. Mark Twain famously wrote that it is 'older than history, older than tradition.'",
          "To visit Banaras is to confront the full spectrum of human existence — birth, death, prayer, and celebration all unfold openly along its ghats.",
        ],
      },
      {
        heading: "The ghats of Varanasi",
        paragraphs: [
          "There are over 80 ghats lining the western bank of the Ganges. Each has its own story and purpose. Dashashwamedh Ghat is the most famous, hosting the spectacular Ganga Aarti every evening.",
          "Manikarnika Ghat is the primary cremation ghat, where funeral pyres burn continuously. It is a profound and humbling place to witness.",
        ],
      },
      {
        heading: "Experiencing Banaras",
        paragraphs: [
          "Banaras is best experienced through its lanes, its food, and its rituals. No guidebook can fully prepare you for the sensory overload of this city.",
          "Wake up before dawn for a boat ride on the Ganges — it is the defining experience of any visit to Varanasi.",
        ],
        subSections: [
          {
            heading: "The morning boat ride",
            paragraphs: [
              "As the sun rises over the eastern bank, the ghats come alive. Pilgrims bathe in the sacred river, priests perform morning prayers, and the sound of temple bells fills the air.",
              "Hire a boatman at Dashashwamedh or Assi Ghat and float gently along the riverfront. The city unfolds like a living painting.",
            ],
          },
          {
            heading: "Lanes, temples, and silk",
            paragraphs: [
              "The narrow galis (lanes) of Banaras are a labyrinth of temples, silk shops, and street food stalls. Getting lost here is half the fun.",
              "• Kashi Vishwanath Temple — the holiest Shiva temple\n• Banarasi silk sarees — handwoven masterpieces\n• Blue Lassi Shop — legendary lassi with seasonal fruits",
              "The Banaras Hindu University campus also offers a peaceful retreat with its Bharat Kala Bhavan museum.",
            ],
          },
          {
            heading: "Food of Banaras",
            paragraphs: [
              "Banarasi cuisine is rich and indulgent. The city is famous for its chaat, kachori-sabzi breakfasts, and an endless variety of sweets.",
              "Try the tamatar chaat at Deena Chaat Bhandar and the malaiyo (a winter-only milk froth dessert) if you visit between November and February.",
            ],
          },
        ],
      },
      {
        heading: "Conclusion",
        paragraphs: [
          "Banaras doesn't seek your approval. It exists on its own terms, raw and unapologetic. It can overwhelm you, move you, and change you — often all in a single day.",
          "Visit with an open heart and leave your expectations at the door. The city will reveal itself to those who are patient enough to listen.",
        ],
      },
    ],
  },
  {
    slug: "nagaland-exploring-indias-wild-northeast-frontier",
    issueNumber: "No. 020",
    title: "Nagaland — exploring India's wild northeast frontier",
    subtitle:
      "Tribal traditions, misty mountains, and the legendary Hornbill Festival await in this remote state.",
    category: "Adventure",
    author: "Rohan Kapoor",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    content: [
      {
        heading: "Introduction",
        paragraphs: [
          "Nagaland sits in India's far northeast, a land of rolling hills, dense forests, and warrior tribes who have preserved their customs for centuries. It remains one of the least-visited states in India — and that's precisely its appeal.",
          "Home to 16 major tribes, each with its own language, dress, and traditions, Nagaland offers a cultural richness that few places in India can match.",
          "The state capital, Kohima, and the cultural hub of Dimapur serve as gateways to a world that feels entirely separate from mainland India.",
        ],
      },
      {
        heading: "The Hornbill Festival",
        paragraphs: [
          "Held every December in Kisama Heritage Village near Kohima, the Hornbill Festival is Nagaland's biggest cultural showcase. All 16 tribes come together to display their traditional dances, music, crafts, and cuisine.",
          "The festival is named after the Indian Hornbill, a large and colorful bird revered across Naga culture. It's the best time to visit if you want to experience the full diversity of Naga traditions.",
        ],
      },
      {
        heading: "Discovering Nagaland",
        paragraphs: [
          "Beyond the Hornbill Festival, Nagaland offers trekking, village homestays, and encounters with communities that live close to the land.",
          "Travel here requires patience — roads are winding, distances take longer than expected, and inner line permits are needed for some areas.",
        ],
        subSections: [
          {
            heading: "Kohima and the war cemetery",
            paragraphs: [
              "Kohima was the site of one of World War II's most decisive battles. The Kohima War Cemetery, maintained by the Commonwealth War Graves Commission, is a moving memorial with the famous epitaph: 'When You Go Home, Tell Them Of Us And Say, For Your Tomorrow, We Gave Our Today.'",
              "The city itself is built on a hillside, with the Kohima Cathedral and local markets offering glimpses into everyday Naga life.",
            ],
          },
          {
            heading: "Village stays and tribal culture",
            paragraphs: [
              "Visiting a Naga village is the highlight of any trip. Khonoma, India's first green village, is a model of conservation and community living.",
              "• Khonoma — terraced fields and Angami warrior history\n• Longwa — a village split between India and Myanmar\n• Tuophema — a purpose-built tourist village with traditional morungs (dormitories)",
              "Naga hospitality is warm and genuine. Expect smoked meats, rice beer, and stories shared around a fire.",
            ],
          },
          {
            heading: "Naga cuisine",
            paragraphs: [
              "Naga food is bold, smoky, and unlike anything else in India. Smoked pork with bamboo shoot, axone (fermented soybean), and raja mircha (king chilli) are staples.",
              "The cuisine reflects a deep connection to the land — most ingredients are locally grown, foraged, or hunted.",
            ],
          },
        ],
      },
      {
        heading: "Conclusion",
        paragraphs: [
          "Nagaland is India at its most raw and authentic. It challenges your idea of what India looks like and rewards you with experiences you won't find anywhere else on earth.",
          "If you're seeking something truly off the beaten path, Nagaland will not disappoint.",
        ],
      },
    ],
  },
  {
    slug: "rishikesh-yoga-rapids-and-the-foothills-of-the-himalayas",
    issueNumber: "No. 019",
    title: "Rishikesh — yoga, rapids, and the foothills of the Himalayas",
    subtitle:
      "Where the Ganges meets the mountains, offering adventure and inner peace in equal measure.",
    category: "Adventure",
    author: "Kavya Nair",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&q=80",
    content: [
      {
        heading: "Introduction",
        paragraphs: [
          "Rishikesh sits at the point where the Ganges leaves the Himalayan foothills and flows into the plains. This transition zone creates a landscape of dramatic beauty — forested hills, white sand beaches along the river, and suspension bridges swaying over turquoise water.",
          "Known as the 'Yoga Capital of the World,' Rishikesh gained global fame when the Beatles visited Maharishi Mahesh Yogi's ashram in 1968. Today, it attracts a steady stream of yoga practitioners, backpackers, and adventure seekers.",
          "The town offers a rare combination: spiritual depth alongside adrenaline-pumping activities like white-water rafting, bungee jumping, and cliff diving.",
        ],
      },
      {
        heading: "Yoga and ashrams",
        paragraphs: [
          "Dozens of ashrams and yoga schools line both banks of the Ganges. From drop-in classes to month-long teacher training courses, there's something for every level of practice.",
          "The Beatles Ashram (Chaurasi Kutia) has been partially restored and is now open to visitors. Its graffiti-covered meditation cells have become one of Rishikesh's most photographed spots.",
        ],
      },
      {
        heading: "Adventures in Rishikesh",
        paragraphs: [
          "Rishikesh has transformed into India's adventure sports capital. The Ganges provides world-class rapids, and the surrounding hills offer plenty of trekking and camping opportunities.",
          "Most adventure activities are concentrated around Shivpuri, about 16 kilometers upstream from the main town.",
        ],
        subSections: [
          {
            heading: "White-water rafting",
            paragraphs: [
              "Rafting on the Ganges is the quintessential Rishikesh experience. Routes range from 9 to 36 kilometers, with rapids graded from I to IV.",
              "The best season for rafting is September to November and March to May. Avoid the monsoon months when the river runs dangerously high.",
            ],
          },
          {
            heading: "Beyond rafting",
            paragraphs: [
              "Rishikesh offers more than just water sports. The surrounding area is perfect for multi-day treks and camping by the river.",
              "• Bungee jumping at Jumpin Heights (83 meters)\n• Cliff jumping at various points along the Ganges\n• Camping at Shivpuri and Byasi\n• Trekking to Neer Garh waterfall",
              "The Lakshman Jhula and Ram Jhula suspension bridges are iconic landmarks worth crossing on foot.",
            ],
          },
          {
            heading: "Cafés and the backpacker scene",
            paragraphs: [
              "Tapovan and Laxman Jhula areas are packed with cafés serving everything from Israeli shakshuka to Italian pasta, alongside traditional Indian thalis.",
              "The German Bakery, Little Buddha Café, and Freedom Café are popular hangouts where travelers swap stories over chai and banana pancakes.",
            ],
          },
        ],
      },
      {
        heading: "Conclusion",
        paragraphs: [
          "Rishikesh manages to be both deeply spiritual and wildly adventurous. You can start your morning with a yoga session overlooking the Ganges and end your day tumbling through Class IV rapids.",
          "It's a town that doesn't force you to choose between stillness and excitement — it offers both, generously.",
        ],
      },
    ],
  },
  {
    slug: "delhi-layers-of-history-beneath-a-modern-capital",
    issueNumber: "No. 018",
    title: "Delhi — layers of history beneath a modern capital",
    subtitle:
      "From Mughal monuments to street food alleys, Delhi is a city of endless discovery.",
    category: "Heritage",
    author: "Arjun Mehta",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80",
    content: [
      {
        heading: "Introduction",
        paragraphs: [
          "Delhi is not one city but many, layered on top of each other over centuries. Legend holds that seven cities have risen and fallen on this site. The result is a capital where Mughal tombs sit beside glass-fronted malls, and ancient stepwells hide behind modern housing colonies.",
          "For first-time visitors, Delhi can feel overwhelming. The traffic, the crowds, the heat — it's a full-body experience. But beneath the chaos lies a city of staggering beauty and depth.",
          "The key to enjoying Delhi is to surrender to its rhythm. Don't try to see everything. Instead, pick a neighborhood, explore it deeply, and let the city reveal itself.",
        ],
      },
      {
        heading: "Old Delhi — the Mughal city",
        paragraphs: [
          "Shahjahanabad, the walled city built by the Mughal emperor Shah Jahan in the 17th century, is the heart of Old Delhi. Its narrow lanes — Chandni Chowk, Dariba Kalan, Kinari Bazaar — are a sensory onslaught of sights, sounds, and smells.",
          "Jama Masjid, India's largest mosque, stands at the center. Climb its minaret for panoramic views over the rooftops of Old Delhi.",
        ],
      },
      {
        heading: "Discovering Delhi",
        paragraphs: [
          "Delhi rewards the curious traveler who ventures beyond the standard tourist circuit. Each neighborhood has its own character, its own food, and its own history.",
          "A mix of metro rides, auto-rickshaws, and walking is the best way to navigate the city.",
        ],
        subSections: [
          {
            heading: "Monuments and museums",
            paragraphs: [
              "Humayun's Tomb, a UNESCO World Heritage Site, is the architectural precursor to the Taj Mahal. Its Mughal gardens are a peaceful escape from the city's noise.",
              "Qutub Minar, the towering 12th-century minaret in Mehrauli, is surrounded by ruins that tell the story of Delhi's earliest sultanates.",
            ],
          },
          {
            heading: "Street food of Delhi",
            paragraphs: [
              "Delhi's street food is legendary. The city is a melting pot of flavors from across India, and its street stalls serve some of the best food you'll eat anywhere.",
              "• Paranthe Wali Gali — stuffed parathas since 1875\n• Karim's near Jama Masjid — Mughlai kebabs and curries\n• Dilli Haat — regional cuisines from across India\n• Natraj's chaat in Chandni Chowk — dahi bhalla and aloo tikki",
              "Don't skip the winter-special treats: gajar ka halwa, moong dal halwa, and piping hot jalebi.",
            ],
          },
          {
            heading: "New Delhi and beyond",
            paragraphs: [
              "Lutyens' Delhi — the British-designed capital — offers wide boulevards, India Gate, and Rashtrapati Bhavan. Lodhi Art District features murals by international street artists on the walls of a colonial-era neighborhood.",
              "Hauz Khas Village, Mehrauli Archaeological Park, and the stepwells of Agrasen ki Baoli are lesser-known gems worth seeking out.",
            ],
          },
        ],
      },
      {
        heading: "Conclusion",
        paragraphs: [
          "Delhi is a city that reveals itself slowly. First visits can be jarring, but return visits are always rewarding. There is always another lane to explore, another monument to discover, another dish to taste.",
          "Give Delhi time. It is not a city that performs for you — it invites you to participate.",
        ],
      },
    ],
  },
  {
    slug: "valley-of-flowers-a-himalayan-paradise-in-bloom",
    issueNumber: "No. 017",
    title: "Valley of Flowers — a Himalayan paradise in bloom",
    subtitle:
      "A UNESCO World Heritage trek through meadows of rare wildflowers at 3,600 meters.",
    category: "Trekking",
    author: "Priya Sharma",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1490682143684-14369e18dce8?w=800&q=80",
    content: [
      {
        heading: "Introduction",
        paragraphs: [
          "Hidden in the western Himalayas of Uttarakhand, the Valley of Flowers is one of India's most extraordinary natural wonders. This alpine meadow, cradled between mountain peaks at an altitude of 3,600 meters, explodes into color every monsoon season.",
          "Designated a UNESCO World Heritage Site in 2005, the valley is home to over 600 species of flowering plants, many of which are rare or endemic to this region.",
          "The valley was 'discovered' by British mountaineer Frank Smythe in 1931 during his return from a Kamet expedition. He was so captivated that he returned to document its flora and wrote a book about it.",
        ],
      },
      {
        heading: "Getting to the valley",
        paragraphs: [
          "The journey begins at Govindghat, a small town on the Rishikesh-Badrinath highway. From here, a 13-kilometer trek leads to Ghangaria, the base village for both the Valley of Flowers and Hemkund Sahib.",
          "Ghangaria sits at 3,050 meters and serves as the overnight halt. The valley itself is a further 3.5 kilometers from Ghangaria.",
        ],
      },
      {
        heading: "Trekking through the valley",
        paragraphs: [
          "The Valley of Flowers is open from June to October, with peak bloom typically in late July and August. The flowers change through the season, offering a different palette each month.",
          "The trek itself is moderate in difficulty but requires a reasonable level of fitness due to the altitude.",
        ],
        subSections: [
          {
            heading: "The flora",
            paragraphs: [
              "The valley's flowers include Himalayan blue poppies, brahmakamal, cobra lilies, marigolds, daisies, and orchids. The landscape changes dramatically from the entrance to the deeper reaches of the valley.",
              "Rare medicinal plants used in traditional Ayurvedic medicine also grow here, making it a site of scientific interest as well.",
            ],
          },
          {
            heading: "What to expect on the trail",
            paragraphs: [
              "The trail from Ghangaria to the valley crosses streams, passes waterfalls, and gradually opens into the vast meadow. Clouds roll in by afternoon, adding a mystical quality to the landscape.",
              "• Best time: Late July to mid-August for peak bloom\n• Entry fee: INR 150 for Indians, INR 600 for foreigners\n• Photography: Allowed, but tripods need special permission\n• Duration: Most visitors spend 4-5 hours in the valley",
              "Carry rain gear — the monsoon weather is unpredictable and showers are common even on clear mornings.",
            ],
          },
          {
            heading: "Staying in Ghangaria",
            paragraphs: [
              "Ghangaria offers basic guesthouses and a GMVN (government) tourist rest house. Accommodation fills up quickly in peak season, so arriving early is advisable.",
              "The village has no road access — everything, including building materials, is carried in by mules or porters. Keep your expectations simple and enjoy the remoteness.",
            ],
          },
        ],
      },
      {
        heading: "Conclusion",
        paragraphs: [
          "The Valley of Flowers is one of those rare places that lives up to its name. Walking through acres of wildflowers with snow-capped peaks as a backdrop is a genuinely life-affirming experience.",
          "It requires effort to reach, but the reward is a landscape so beautiful it feels almost unreal. Go before the season ends, and let the mountains work their magic.",
        ],
      },
    ],
  },
  {
    slug: "hemkund-sahib-trek-a-sacred-pilgrimage-above-the-clouds",
    issueNumber: "No. 016",
    title: "Hemkund Sahib trek — a sacred pilgrimage above the clouds",
    subtitle:
      "A high-altitude Sikh shrine at 4,329 meters, surrounded by seven snow-capped peaks.",
    category: "Trekking",
    author: "Rohan Kapoor",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    content: [
      {
        heading: "Introduction",
        paragraphs: [
          "Hemkund Sahib (also spelled Hemkunt) is one of the highest Sikh gurdwaras in the world, perched at 4,329 meters in the Chamoli district of Uttarakhand. The glacial lake it sits beside, surrounded by seven peaks (Hathi Parvat and Saptrishi peaks), is a sight of extraordinary beauty.",
          "The shrine is mentioned in the Dasam Granth, the religious text attributed to Guru Gobind Singh, who is believed to have meditated here in a previous life.",
          "Open only from May to October due to heavy snowfall, the pilgrimage to Hemkund Sahib is both a spiritual journey and a serious high-altitude trek.",
        ],
      },
      {
        heading: "The route",
        paragraphs: [
          "The trek to Hemkund Sahib starts from Govindghat (1,800 meters) and passes through Ghangaria (3,050 meters). From Ghangaria, it's a steep 6-kilometer climb to the shrine, gaining nearly 1,300 meters of altitude.",
          "The trail is well-maintained but relentlessly uphill. Mule services are available for those who find the climb too strenuous.",
        ],
      },
      {
        heading: "The pilgrimage experience",
        paragraphs: [
          "Hemkund Sahib attracts thousands of Sikh pilgrims each season, but the trek's beauty draws hikers of all backgrounds. The combination of devotion and natural grandeur makes it a unique Indian experience.",
          "The gurdwara offers langar (communal meals) to all visitors, a welcome comfort after the demanding climb.",
        ],
        subSections: [
          {
            heading: "The glacial lake",
            paragraphs: [
              "The star-shaped Hemkund lake, fed by glacial melt, sits in a bowl surrounded by peaks. Pilgrims take a dip in the icy waters despite the freezing temperature — an act of devotion and endurance.",
              "The lake's surface reflects the surrounding mountains on clear days, creating a mirror-like effect that is breathtaking to witness.",
            ],
          },
          {
            heading: "Preparation and fitness",
            paragraphs: [
              "This trek should not be underestimated. The altitude gain is significant, and altitude sickness is a real concern for those who aren't acclimatized.",
              "• Start training at least a month before the trek\n• Spend a night in Ghangaria to acclimatize\n• Carry warm layers — temperatures can drop below zero at the top\n• Start early (5-6 AM) to avoid afternoon clouds and rain",
              "Drinking plenty of water and ascending slowly are the best defenses against altitude-related issues.",
            ],
          },
          {
            heading: "Combining with Valley of Flowers",
            paragraphs: [
              "Since both treks start from Ghangaria, most trekkers combine the Valley of Flowers and Hemkund Sahib into a single trip. Allow at least 3-4 days from Govindghat.",
              "Day 1: Trek to Ghangaria. Day 2: Valley of Flowers. Day 3: Hemkund Sahib. Day 4: Return to Govindghat. This itinerary allows comfortable pacing.",
            ],
          },
        ],
      },
      {
        heading: "Conclusion",
        paragraphs: [
          "Hemkund Sahib is more than a trek — it's a pilgrimage into the sky. The combination of physical challenge, spiritual significance, and raw Himalayan beauty makes it unforgettable.",
          "Whether you come for faith or for the mountains, Hemkund will leave a lasting impression. It's a reminder that some of the most sacred places on earth require effort to reach.",
        ],
      },
    ],
  },
  {
    slug: "hidden-gems-of-old-delhi-a-walking-guide",
    issueNumber: "No. 015",
    title: "Hidden gems of Old Delhi — a walking guide",
    subtitle:
      "Beyond Chandni Chowk: discovering forgotten havelis, stepwells, and secret food spots.",
    category: "Culture",
    author: "Kavya Nair",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
    featured: true,
    content: [
      {
        heading: "Introduction",
        paragraphs: [
          "Old Delhi is one of those places that most tourists think they know — a quick rickshaw ride through Chandni Chowk, a visit to the Red Fort, and a plate of chaat. But the real magic of Shahjahanabad lies in what most visitors walk right past.",
          "Behind the main bazaars are crumbling Mughal-era havelis, hidden mosques, and communities that have lived in the same lanes for generations.",
          "This walking guide takes you off the tourist trail and into the heart of a city within a city.",
        ],
      },
      {
        heading: "Starting at Jama Masjid",
        paragraphs: [
          "Begin your walk at Jama Masjid, Shah Jahan's magnificent mosque. Climb the southern minaret for a bird's-eye view of the Old Delhi roofscape — a jumble of wires, kites, satellite dishes, and pigeons.",
          "From the mosque steps, plunge into the lanes heading north toward Chandni Chowk.",
        ],
      },
      {
        heading: "Walking through the lanes",
        paragraphs: [
          "Old Delhi's galis (lanes) are organized by trade. Dariba Kalan is the jewelry lane, Kinari Bazaar sells wedding accessories, and Khari Baoli is Asia's largest spice market.",
          "But the most interesting discoveries happen when you turn off these main arteries into the smaller residential lanes.",
        ],
        subSections: [
          {
            heading: "The forgotten havelis",
            paragraphs: [
              "Several magnificent havelis survive in various states of repair. Chunnamal Haveli, built in the 1840s, is one of the finest — its interiors feature European-style frescoes and Mughal arches.",
              "Mirza Ghalib's haveli in Gali Qasim Jaan has been partially restored as a museum dedicated to the great Urdu poet.",
            ],
          },
          {
            heading: "Food stops along the way",
            paragraphs: [
              "The best Old Delhi food isn't in the famous spots — it's in the unnamed stalls that have been serving the same dish for decades.",
              "• Haji Shabrati's nihari near Chitli Qabar\n• Kallu's rabri faluda in Matia Mahal\n• Bade Miya's kebabs near Gate No. 1 of Jama Masjid",
              "Eat where the locals eat. If a stall has a queue, join it.",
            ],
          },
          {
            heading: "Tips for walking Old Delhi",
            paragraphs: [
              "Wear comfortable shoes — the lanes are uneven and often slippery. Start early in the morning when the light is soft and the crowds are thinner.",
              "Be respectful when photographing people and homes. A smile and a nod go a long way in Old Delhi.",
            ],
          },
        ],
      },
      {
        heading: "Conclusion",
        paragraphs: [
          "Old Delhi is a place that rewards slow exploration. Every lane has a story, every doorway hides a history. You won't see it all in one visit — and that's the point.",
          "Come back again and again. The city will always have something new to show you.",
        ],
      },
    ],
  },
  {
    slug: "rishikesh-to-badrinath-the-ultimate-uttarakhand-road-trip",
    issueNumber: "No. 014",
    title: "Rishikesh to Badrinath — the ultimate Uttarakhand road trip",
    subtitle:
      "A journey through the Garhwal Himalayas along one of India's most dramatic mountain highways.",
    category: "Adventure",
    author: "Arjun Mehta",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80",
    content: [
      {
        heading: "Introduction",
        paragraphs: [
          "The road from Rishikesh to Badrinath is one of India's great mountain drives. Stretching roughly 300 kilometers through the Garhwal Himalayas, it follows the Alaknanda River valley through increasingly dramatic gorges and high-altitude landscapes.",
          "This is not a drive for the faint-hearted. Narrow roads, hairpin bends, and the occasional landslide make it an adventure in itself. But the rewards — towering peaks, sacred confluences, and remote pilgrimage towns — are immense.",
          "The route passes through several significant stops: Devprayag, Rudraprayag, Karnaprayag, Joshimath, and finally Badrinath, one of the four Char Dham pilgrimage sites.",
        ],
      },
      {
        heading: "The prayags — sacred confluences",
        paragraphs: [
          "Uttarakhand is called Dev Bhoomi (Land of the Gods) for a reason. Along this route, you'll pass multiple prayags — points where rivers meet. The most dramatic is Devprayag, where the Bhagirathi and Alaknanda rivers merge to form the Ganges.",
          "Each prayag has a temple and a viewing point. Stopping at these confluences adds spiritual and visual depth to the journey.",
        ],
      },
      {
        heading: "Stops along the route",
        paragraphs: [
          "The Rishikesh-Badrinath highway is best done over 2-3 days to allow time for stops and to avoid driving fatigue on mountain roads.",
          "Break the journey at Joshimath, the last major town before Badrinath and the winter seat of the Badrinath temple's deity.",
        ],
        subSections: [
          {
            heading: "Devprayag and Rudraprayag",
            paragraphs: [
              "Devprayag is worth at least an hour's stop. The sight of two rivers of different colors merging is mesmerizing. Rudraprayag, where the Mandakini meets the Alaknanda, is the gateway to the Kedarnath valley.",
              "Both towns have simple restaurants serving dal-chawal and Garhwali cuisine.",
            ],
          },
          {
            heading: "Joshimath — gateway to the peaks",
            paragraphs: [
              "Joshimath is the base for Auli (skiing), the Valley of Flowers, and several high-altitude treks. The town has been in the news for land subsidence, but it remains a crucial stop on the route.",
              "• Cable car to Auli for panoramic Himalayan views\n• Narsingh Temple — one of the original Shankaracharya maths\n• Hot springs at Tapovan, accessible from Joshimath",
              "Stay overnight here to acclimatize before pushing on to Badrinath at 3,133 meters.",
            ],
          },
          {
            heading: "Badrinath — the final destination",
            paragraphs: [
              "Badrinath Temple, dedicated to Lord Vishnu, sits at the head of the valley surrounded by the Nar and Narayana mountain ranges. The temple itself is a colorful, almost cheerful structure — surprising at this altitude.",
              "The Tapt Kund hot springs near the temple are a highlight. Pilgrims bathe here before entering the shrine. Mana Village, India's last village before the Tibetan border, is a 3-kilometer walk from Badrinath.",
            ],
          },
        ],
      },
      {
        heading: "Conclusion",
        paragraphs: [
          "The Rishikesh to Badrinath road trip is India mountain driving at its most intense and most rewarding. It combines pilgrimage, adventure, and some of the most stunning scenery on the planet.",
          "Drive carefully, respect the mountains, and give yourself enough time to absorb the journey. This is not a route to rush.",
        ],
      },
    ],
  },
  {
    slug: "planning-your-first-himalayan-trek-a-beginners-guide",
    issueNumber: "No. 005",
    title: "Planning your first Himalayan trek — a beginner's guide",
    subtitle:
      "Everything you need to know before lacing up your boots for the mountains.",
    category: "Trekking",
    author: "Rohan Kapoor",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&q=80",
    featured: true,
    content: [
      {
        heading: "Introduction",
        paragraphs: [
          "The Himalayas call to every traveler in India at some point. Whether it's the snow-capped peaks visible from a train window or a friend's trek photos on social media, the pull is universal. But turning that inspiration into an actual trek can feel daunting.",
          "This guide covers everything a beginner needs to know — from choosing the right trek to packing the right gear. No jargon, no unnecessary complexity.",
          "The truth is, you don't need to be an athlete to trek in the Himalayas. You need reasonable fitness, proper preparation, and the willingness to be uncomfortable for a few days.",
        ],
      },
      {
        heading: "Choosing your first trek",
        paragraphs: [
          "Not all Himalayan treks are created equal. Some are gentle walks through meadows; others are multi-week expeditions above 5,000 meters. For beginners, the sweet spot is a moderate trek of 4-6 days at altitudes below 4,500 meters.",
          "Popular beginner treks include Kedarkantha, Brahmatal, Hampta Pass, and the Valley of Flowers. Each offers stunning scenery without extreme technical difficulty.",
        ],
      },
      {
        heading: "Preparation and gear",
        paragraphs: [
          "Preparation is more important than expensive gear. A well-trained body with basic equipment will always outperform an unfit trekker with the latest gear.",
          "Start preparing at least 6-8 weeks before your trek date.",
        ],
        subSections: [
          {
            heading: "Physical preparation",
            paragraphs: [
              "Focus on cardiovascular fitness and leg strength. Jogging, stair climbing, and cycling are excellent preparation. The most important muscle for trekking is your heart — train it well.",
              "Practice walking on inclines with a loaded backpack. Start with 5 kilograms and gradually increase to your expected pack weight.",
            ],
          },
          {
            heading: "Essential gear checklist",
            paragraphs: [
              "You don't need to buy everything new. Many items can be rented in towns like Rishikesh, Manali, or at the trek base.",
              "• Trekking shoes with ankle support — break them in before the trek\n• Three-layer clothing system: base layer, insulating layer, waterproof shell\n• Backpack (40-50 liters) with rain cover\n• Headlamp, water bottle, sunscreen, and basic first-aid kit",
              "Avoid cotton clothing — it retains moisture and takes forever to dry. Choose synthetic or merino wool base layers.",
            ],
          },
          {
            heading: "Dealing with altitude",
            paragraphs: [
              "Altitude sickness is the biggest risk on Himalayan treks. The golden rule is to ascend gradually — no more than 300-500 meters of sleeping altitude gain per day above 3,000 meters.",
              "Stay hydrated, avoid alcohol, and listen to your body. If you have a persistent headache, nausea, or difficulty breathing, descend immediately. The mountains will always be there for another attempt.",
            ],
          },
        ],
      },
      {
        heading: "Conclusion",
        paragraphs: [
          "Your first Himalayan trek will likely be one of the most memorable experiences of your life. The combination of physical challenge, natural beauty, and the camaraderie of fellow trekkers creates something truly special.",
          "Don't wait for the perfect moment or the perfect fitness level. Start preparing today, pick a trek that matches your ability, and take the first step. The mountains are waiting.",
        ],
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return posts.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}
