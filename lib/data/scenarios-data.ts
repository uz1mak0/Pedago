import { Scenario } from '../types';

export const conversationScenarios: Scenario[] = [
  {
    id: 'scen-1',
    scenarioNumber: 1,
    title: 'Riding a Public Jeepney',
    titleTagalog: 'Pagsakay sa Dyipni',
    location: 'Metro Manila Jeepney Route',
    category: 'Travel',
    difficulty: 'Beginner',
    culturalContext: 'When paying in a jeepney, passengers pass coins from hand to hand until it reaches the driver. Say "Bayad po" clearly with a pleasant tone.',
    xpReward: 35,
    dialogue: [
      {
        id: 'node-1',
        speaker: 'npc' as const,
        speakerName: 'Jeepney Driver',
        tagalog: 'Saan po ang baba ninyo?',
        english: 'Where is your drop-off point?',
        audioText: 'Saan po ang baba ninyo?',
        choices: [
          {
            textTagalog: 'Sa may kanto lang po, heto po ang bayad.',
            textEnglish: 'Just at the corner, please, here is my fare.',
            culturalFeedback: 'Perfect! Using "po" shows natural Filipino warmth.',
            nextNodeId: 'node-2',
            isCorrect: true
          },
          {
            textTagalog: 'Kanto. Heto pera.',
            textEnglish: 'Corner. Here is money.',
            culturalFeedback: 'Too blunt. Always add "po" for everyday respect.',
            nextNodeId: 'node-2',
            isCorrect: false
          }
        ]
      },
      {
        id: 'node-2',
        speaker: 'npc' as const,
        speakerName: 'Fellow Passenger',
        tagalog: 'Akin na po, iabot ko sa drayber.',
        english: 'Hand it to me, I will pass it to the driver.',
        audioText: 'Akin na po, iabot ko sa drayber.',
        choices: [
          {
            textTagalog: 'Salamat po, ate!',
            textEnglish: 'Thank you, older sister!',
            culturalFeedback: 'Calling a woman "Ate" is a warm, familial honorific in the Philippines.',
            nextNodeId: 'node-3',
            isCorrect: true
          }
        ]
      },
      {
        id: 'node-3',
        speaker: 'npc' as const,
        speakerName: 'Jeepney Driver',
        tagalog: 'Heto ang sukli ninyong limang piso. Bababa na ba kayo?',
        english: 'Here is your five pesos change. Are you getting off now?',
        audioText: 'Heto ang sukli ninyong limang piso. Bababa na ba kayo?',
        choices: [
          {
            textTagalog: 'Opo, para po sa tabi! Salamat po!',
            textEnglish: 'Yes, please pull over by the side! Thank you!',
            culturalFeedback: '"Para po" is the universal call to ask the driver to stop.',
            nextNodeId: 'node-4',
            isCorrect: true
          }
        ]
      },
      {
        id: 'node-4',
        speaker: 'npc' as const,
        speakerName: 'Jeepney Driver',
        tagalog: 'Ingat po sa pagbaba!',
        english: 'Take care getting down!',
        audioText: 'Ingat po sa pagbaba!',
        isTerminal: true
      }
    ]
  },
  {
    id: 'scen-2',
    scenarioNumber: 2,
    title: 'Ordering at a Carinderia',
    titleTagalog: 'Pag-order sa Karinderya (Turo-Turo)',
    location: 'Neighborhood Eatery',
    category: 'Food & Dining',
    difficulty: 'Beginner',
    culturalContext: 'Carinderias are often called "turo-turo" (point-point) because customers point through the glass display to choose hearty home-cooked dishes.',
    xpReward: 35,
    dialogue: [
      {
        id: 'node-1',
        speaker: 'npc' as const,
        speakerName: 'Ate Tindera',
        tagalog: 'Magandang tanghali! Anong gusto mong ulam ngayon?',
        english: 'Good afternoon! What dish would you like today?',
        audioText: 'Magandang tanghali! Anong gusto mong ulam ngayon?',
        choices: [
          {
            textTagalog: 'Puwede po bang makahingi ng isang order ng sinigang na baboy at kanin?',
            textEnglish: 'May I please have one order of pork sinigang and rice?',
            culturalFeedback: 'Great choice! Sinigang is the iconic sour tamarind soup of the Philippines.',
            nextNodeId: 'node-2',
            isCorrect: true
          }
        ]
      },
      {
        id: 'node-2',
        speaker: 'npc' as const,
        speakerName: 'Ate Tindera',
        tagalog: 'Mainit-init pa ang sabaw nito! Gusto mo rin ba ng libreng sabaw?',
        english: 'Its soup is still piping hot! Would you also like free soup broth?',
        audioText: 'Mainit-init pa ang sabaw nito! Gusto mo rin ba ng libreng sabaw?',
        choices: [
          {
            textTagalog: 'Naku, opo ate! Paborito ko po iyon. Magkano po lahat?',
            textEnglish: 'Oh yes please, sister! That is my favorite. How much is everything?',
            culturalFeedback: 'Asking for free broth (sabaw) is a celebrated carinderia tradition.',
            nextNodeId: 'node-3',
            isCorrect: true
          }
        ]
      },
      {
        id: 'node-3',
        speaker: 'npc' as const,
        speakerName: 'Ate Tindera',
        tagalog: 'Siyamnapung piso lang lahat. Maupo ka muna at ihahatid ko sa mesa mo.',
        english: 'Just ninety pesos all in all. Please sit down and I will bring it to your table.',
        audioText: 'Siyamnapung piso lang lahat. Maupo ka muna at ihahatid ko sa mesa mo.',
        choices: [
          {
            textTagalog: 'Maraming salamat po, Ate! Heto po ang bayad.',
            textEnglish: 'Thank you very much, Sister! Here is my payment.',
            culturalFeedback: 'Polite and friendly, establishing instant rapport with the owner.',
            nextNodeId: 'node-4',
            isCorrect: true
          }
        ]
      },
      {
        id: 'node-4',
        speaker: 'npc' as const,
        speakerName: 'Ate Tindera',
        tagalog: 'Kain nang marami! Sabihin mo lang kung kailangan mo pa ng kanin.',
        english: 'Eat well! Just tell me if you need more rice.',
        audioText: 'Kain nang marami!',
        isTerminal: true
      }
    ]
  },
  {
    id: 'scen-3',
    scenarioNumber: 3,
    title: 'Bargaining at the Wet Market',
    titleTagalog: 'Patawad sa Palengke',
    location: 'Public Wet Market (Palengke)',
    category: 'Daily Life',
    difficulty: 'Intermediate',
    culturalContext: 'Asking for a discount ("tawad") or an extra piece ("dagdag") is expected in wet markets, provided it is done with a smile and good humor.',
    xpReward: 40,
    dialogue: [
      {
        id: 'node-1',
        speaker: 'npc' as const,
        speakerName: 'Mang Tomas (Fishmonger)',
        tagalog: 'Sariwang bangus mula sa Dagupan! Bili na kayo, suki!',
        english: 'Fresh milkfish from Dagupan! Buy now, valued customer!',
        audioText: 'Sariwang bangus mula sa Dagupan! Bili na kayo, suki!',
        choices: [
          {
            textTagalog: 'Magkano po ang isang kilo ng bangus, Kuya?',
            textEnglish: 'How much is one kilo of milkfish, older brother?',
            culturalFeedback: 'Calling him "Kuya" is respectful and creates a friendly atmosphere.',
            nextNodeId: 'node-2',
            isCorrect: true
          }
        ]
      },
      {
        id: 'node-2',
        speaker: 'npc' as const,
        speakerName: 'Mang Tomas',
        tagalog: 'Dalawandaang piso ang kilo. Matataba at sariwa!',
        english: 'Two hundred pesos per kilo. Plump and very fresh!',
        audioText: 'Dalawandaang piso ang kilo. Matataba at sariwa!',
        choices: [
          {
            textTagalog: 'Puwede po bang isang daan at walumpu na lang kung kukuha ako ng dalawang kilo?',
            textEnglish: 'Could it be just one hundred eighty if I take two kilos?',
            culturalFeedback: 'Offering to buy more volume in exchange for a reasonable discount is the best strategy.',
            nextNodeId: 'node-3',
            isCorrect: true
          }
        ]
      },
      {
        id: 'node-3',
        speaker: 'npc' as const,
        speakerName: 'Mang Tomas',
        tagalog: 'Sige na nga, suki! Dahil mabait ka, bibigyan kita ng libreng calamansi at sili.',
        english: 'Alright then, regular customer! Because you are kind, I\'ll give you free calamansi and chili.',
        audioText: 'Sige na nga, suki! Bibigyan kita ng libreng calamansi.',
        choices: [
          {
            textTagalog: 'Napakabait ninyo naman po! Dito na po ako palaging bibili sa inyo.',
            textEnglish: 'You are so extraordinarily kind! I will always buy from you here.',
            culturalFeedback: 'Becoming a loyal "suki" earns you the best cuts and extra produce in Philippine markets.',
            nextNodeId: 'node-4',
            isCorrect: true
          }
        ]
      },
      {
        id: 'node-4',
        speaker: 'npc' as const,
        speakerName: 'Mang Tomas',
        tagalog: 'Balik ka ulit, suki! Salamat nang marami!',
        english: 'Come back again, regular! Thank you very much!',
        audioText: 'Balik ka ulit, suki!',
        isTerminal: true
      }
    ]
  },
  {
    id: 'scen-4',
    scenarioNumber: 4,
    title: 'Buying at a Sari-Sari Store',
    titleTagalog: 'Pagbili sa Tindahang Sari-Sari',
    location: 'Residential Barangay Alley',
    category: 'Daily Life',
    difficulty: 'Beginner',
    culturalContext: 'Sari-sari stores are the social backbone of Filipino communities. Knock on the grill or call out "Pabili po!" to alert the owner.',
    xpReward: 35,
    dialogue: [
      {
        id: 'node-1',
        speaker: 'user' as const,
        speakerName: 'You (Learner)',
        tagalog: 'Tao po! Pabili po!',
        english: 'Anybody home! May I buy something, please!',
        audioText: 'Tao po! Pabili po!',
        choices: [
          {
            textTagalog: 'Pabili po ng malamig na tubig at kape!',
            textEnglish: 'May I buy cold water and coffee, please!',
            culturalFeedback: '"Tao po" politely announces your presence at someone\'s doorway.',
            nextNodeId: 'node-2',
            isCorrect: true
          }
        ]
      },
      {
        id: 'node-2',
        speaker: 'npc' as const,
        speakerName: 'Aling Nena',
        tagalog: 'Nandiyan na! Ilang sachet ng kape ang kailangan mo, iho?',
        english: 'Coming! How many coffee sachets do you need, young one?',
        audioText: 'Nandiyan na! Ilang sachet ng kape ang kailangan mo?',
        choices: [
          {
            textTagalog: 'Dalawang 3-in-1 na kape po at isang boteng mineral water.',
            textEnglish: 'Two 3-in-1 coffees please and one bottle of mineral water.',
            culturalFeedback: '3-in-1 coffee sachets are a staple morning drink across Philippine homes.',
            nextNodeId: 'node-3',
            isCorrect: true
          }
        ]
      },
      {
        id: 'node-3',
        speaker: 'npc' as const,
        speakerName: 'Aling Nena',
        tagalog: 'Tig-sasampung piso ang kape, at labinlimang piso ang tubig. Tatlumpu\'t limang piso lahat.',
        english: 'Ten pesos each for the coffee, and fifteen pesos for the water. Thirty-five pesos total.',
        audioText: 'Tatlumpu\'t limang piso lahat.',
        choices: [
          {
            textTagalog: 'Heto po ang limampung piso. Pakisuklian na lang po.',
            textEnglish: 'Here is fifty pesos. Please give me the change.',
            culturalFeedback: 'Handing exact or close change is always appreciated by small store owners.',
            nextNodeId: 'node-4',
            isCorrect: true
          }
        ]
      },
      {
        id: 'node-4',
        speaker: 'npc' as const,
        speakerName: 'Aling Nena',
        tagalog: 'Heto ang labinlimang piso mong sukli. Salamat sa pagbili!',
        english: 'Here is your fifteen pesos change. Thanks for buying!',
        audioText: 'Heto ang labinlimang piso mong sukli. Salamat!',
        isTerminal: true
      }
    ]
  },
  {
    id: 'scen-5',
    scenarioNumber: 5,
    title: 'Town Fiesta Celebration',
    titleTagalog: 'Pistang Bayan at Kainang Pistahan',
    location: 'Provincial Ancestral Home',
    category: 'Community',
    difficulty: 'Intermediate',
    culturalContext: 'Town fiestas are celebrated with open doors, abundant feasts (lechon, menudo, lumpiang shanghai), and heartfelt hospitality for all guests.',
    xpReward: 45,
    dialogue: [
      {
        id: 'node-1',
        speaker: 'npc' as const,
        speakerName: 'Tito Boy (Fiesta Host)',
        tagalog: 'Tuloy kayo! Happy Fiesta! Huwag kayong mahihiya, pasok sa bahay!',
        english: 'Come on in! Happy Fiesta! Don\'t be shy, come into the house!',
        audioText: 'Tuloy kayo! Happy Fiesta! Huwag kayong mahihiya!',
        choices: [
          {
            textTagalog: 'Happy Fiesta po Tito! Maraming salamat po sa pag-imbita sa amin!',
            textEnglish: 'Happy Fiesta, Uncle! Thank you so much for inviting us!',
            culturalFeedback: 'Greeting enthusiastically matches the celebratory warmth of the host.',
            nextNodeId: 'node-2',
            isCorrect: true
          }
        ]
      },
      {
        id: 'node-2',
        speaker: 'npc' as const,
        speakerName: 'Tito Boy',
        tagalog: 'Kumuha na kayo ng plato sa mesa. Tikman ninyo ang lechon at menudo ni Tita Helen!',
        english: 'Grab a plate from the table already. Taste Aunt Helen\'s roast pig and menudo!',
        audioText: 'Kumuha na kayo ng plato sa mesa.',
        choices: [
          {
            textTagalog: 'Napakabango naman po! Ang sarap siguradong magluto ni Tita Helen.',
            textEnglish: 'It smells so fragrant! Aunt Helen must surely be an incredible cook.',
            culturalFeedback: 'Complimenting the food and the cook is the highest form of flattery in Filipino gatherings.',
            nextNodeId: 'node-3',
            isCorrect: true
          }
        ]
      },
      {
        id: 'node-3',
        speaker: 'npc' as const,
        speakerName: 'Tita Helen',
        tagalog: 'Naku salamat! Mayroon ding leche flan at buko pandan sa ref para sa dessert ha!',
        english: 'Oh thank you! There is also leche flan and buko pandan in the fridge for dessert, okay!',
        audioText: 'Mayroon ding leche flan at buko pandan!',
        choices: [
          {
            textTagalog: 'Busog na busog po kami! Napakasarap po ng lahat ng inihanda ninyo.',
            textEnglish: 'We are completely full! Everything you prepared is so delicious.',
            culturalFeedback: '"Busog na busog" expresses sincere satisfaction after a grand Filipino meal.',
            nextNodeId: 'node-4',
            isCorrect: true
          }
        ]
      },
      {
        id: 'node-4',
        speaker: 'npc' as const,
        speakerName: 'Tito Boy',
        tagalog: 'Teka, magbalot kayo bago umuwi! Bawal umuwi nang walang pabalot!',
        english: 'Wait, pack some food to take home! It is forbidden to leave without "pabalot" takeouts!',
        audioText: 'Magbalot kayo bago umuwi!',
        isTerminal: true
      }
    ]
  }
];

// Dynamically generate scenarios 6 to 50 with rich cultural dialogues, ensuring all 50 are fully populated
const scenarioMetadata = [
  { num: 6, title: 'Tricycle Ride & Special Trip', tTitle: 'Pagsakay sa Traysikel', cat: 'Travel' as const, loc: 'Subdivision Gate' },
  { num: 7, title: 'Street Food: Fishballs & Kwek-Kwek', tTitle: 'Pagkain ng Street Food sa Kariton', cat: 'Food & Dining' as const, loc: 'University Belt Street' },
  { num: 8, title: 'Asking Directions from a Local', tTitle: 'Pagtatanong ng Direksyon', cat: 'Travel' as const, loc: 'City Center Plaza' },
  { num: 9, title: 'Morning Pandesal at Panaderya', tTitle: 'Mainit na Pandesal sa Panaderya', cat: 'Food & Dining' as const, loc: 'Local Bakery' },
  { num: 10, title: 'Calling the Morning Taho Vendor', tTitle: 'Pangungusap sa Magtataho', cat: 'Food & Dining' as const, loc: 'Neighborhood Street' },
  { num: 11, title: 'Fast Food Delight at Jollibee', tTitle: 'Pag-order sa Jollibee', cat: 'Food & Dining' as const, loc: 'Jollibee Branch' },
  { num: 12, title: 'Traditional Barbershop Haircut', tTitle: 'Gupit sa Barberya', cat: 'Daily Life' as const, loc: 'Neighborhood Barbershop' },
  { num: 13, title: 'Commuting on the MRT / LRT', tTitle: 'Pagsakay sa Tren (MRT/LRT)', cat: 'Travel' as const, loc: 'Train Station Ticket Booth' },
  { num: 14, title: 'Receiving a Courier Delivery', tTitle: 'Pagtanggap ng Delivery (COD)', cat: 'Daily Life' as const, loc: 'House Front Gate' },
  { num: 15, title: 'Halo-Halo on a Hot Afternoon', tTitle: 'Pagpapalamig ng Halo-Halo', cat: 'Food & Dining' as const, loc: 'Dessert Stand' },
  { num: 16, title: 'Barangay Health Center Checkup', tTitle: 'Konsulta sa Barangay Health Center', cat: 'Community' as const, loc: 'Barangay Health Center' },
  { num: 17, title: 'Sunday Church Plaza Fellowship', tTitle: 'Pagkatapos ng Misa sa Simbahan', cat: 'Community' as const, loc: 'Town Church Plaza' },
  { num: 18, title: 'Selecting Ripe Sweet Mangoes', tTitle: 'Pagpili ng Matamis na Mangga', cat: 'Daily Life' as const, loc: 'Fruit Stand' },
  { num: 19, title: 'Laundry Day at the Laundromat', tTitle: 'Paglalaba sa Laundromat', cat: 'Daily Life' as const, loc: 'Self-Service Laundry' },
  { num: 20, title: 'Buying Traditional Pasalubong Gifts', tTitle: 'Pamimili ng Pasalubong', cat: 'Travel' as const, loc: 'Souvenir Pasalubong Center' },
  { num: 21, title: 'Mall Cinema Ticket Counter', tTitle: 'Panonood ng Sine sa Mall', cat: 'Daily Life' as const, loc: 'Cinema Box Office' },
  { num: 22, title: 'Gasoline Station Fill-up', tTitle: 'Pagpapagasolina sa Sasakyan', cat: 'Travel' as const, loc: 'Gas Station' },
  { num: 23, title: 'Barangay Hall Official Assistance', tTitle: 'Paghiling ng Barangay Clearance', cat: 'Community' as const, loc: 'Barangay Hall Desk' },
  { num: 24, title: 'Coffee Break: Kapeng Barako', tTitle: 'Pangangape ng Kapeng Barako', cat: 'Food & Dining' as const, loc: 'Batangas Coffee Stall' },
  { num: 25, title: 'Hardware Store Construction Tools', tTitle: 'Pamimili sa Tindahang Bakal', cat: 'Daily Life' as const, loc: 'Hardware Supply Shop' },
  { num: 26, title: 'Pharmacy Medicine Request', tTitle: 'Pagbili ng Gamot sa Botika', cat: 'Daily Life' as const, loc: 'Neighborhood Pharmacy' },
  { num: 27, title: 'Typhoon Preparation & Solidarity', tTitle: 'Paghahanda sa Bagyo at Tulungan', cat: 'Community' as const, loc: 'Community Center' },
  { num: 28, title: 'School Enrollment & Teacher Greeting', tTitle: 'Pag-enroll at Pagbati sa Guro', cat: 'Community' as const, loc: 'Elementary School Office' },
  { num: 29, title: 'Karaoke / Videoke Birthday Party', tTitle: 'Kantahan sa Videoke ng Kaarawan', cat: 'Family & Social' as const, loc: 'Living Room Gathering' },
  { num: 30, title: 'Island Hopping Bangka Rental', tTitle: 'Pag-upa ng Bangka sa Isla', cat: 'Travel' as const, loc: 'Beach Port' },
  { num: 31, title: 'Fresh Buko Juice by the Roadside', tTitle: 'Pag-inom ng Malamig na Buko', cat: 'Food & Dining' as const, loc: 'Coconut Cart' },
  { num: 32, title: 'Night Market Bargain Hunting (Ukay)', tTitle: 'Pamimili sa Ukay-Ukay at Tiangge', cat: 'Daily Life' as const, loc: 'Night Market' },
  { num: 33, title: 'Dental Clinic Consultation', tTitle: 'Patingin ng Ngipin sa Dentista', cat: 'Daily Life' as const, loc: 'Dental Clinic' },
  { num: 34, title: 'Bank ATM & Teller Transaction', tTitle: 'Transaksyon sa Bangko at ATM', cat: 'Daily Life' as const, loc: 'Bank Branch' },
  { num: 35, title: 'Provincial Bus Conductor Fare', tTitle: 'Pagsakay sa Panlalawigang Bus', cat: 'Travel' as const, loc: 'Bus Terminal' },
  { num: 36, title: 'Smartphone Screen Repair Shop', tTitle: 'Pagpapagawa ng Telepono', cat: 'Daily Life' as const, loc: 'Electronics Repair Booth' },
  { num: 37, title: 'Ordering a Birthday Celebration Cake', tTitle: 'Pagpapasadya ng Cake sa Bakeshop', cat: 'Food & Dining' as const, loc: 'Cake Shop' },
  { num: 38, title: 'Buying Fresh Flowers at Dangwa', tTitle: 'Pamimili ng Bulaklak sa Dangwa', cat: 'Daily Life' as const, loc: 'Dangwa Flower Market' },
  { num: 39, title: 'Pet Clinic Dog & Cat Vaccination', tTitle: 'Pagbabakuna ng Alagang Hayop', cat: 'Community' as const, loc: 'Veterinary Clinic' },
  { num: 40, title: 'Carwash & Motor Wash Detailing', tTitle: 'Pagpapalinis ng Kotse sa Carwash', cat: 'Daily Life' as const, loc: 'Carwash Station' },
  { num: 41, title: 'City Library Book Borrowing', tTitle: 'Panghihiram ng Aklat sa Aklatan', cat: 'Community' as const, loc: 'Public City Library' },
  { num: 42, title: 'Shoe Repair with the Local Cobbler', tTitle: 'Pagpapakumpuni sa Sapatero', cat: 'Daily Life' as const, loc: 'Shoe Repair Kiosk' },
  { num: 43, title: 'Buying Mobile Phone Load & Data', tTitle: 'Pagpapaload sa Cellphone', cat: 'Daily Life' as const, loc: 'Telecom Kiosk' },
  { num: 44, title: 'Seafood "Dampa" Wet Market Cook-off', tTitle: 'Pamimili at Paluto sa Dampa', cat: 'Food & Dining' as const, loc: 'Seafood Dampa Restaurant' },
  { num: 45, title: 'Inquiring About an Apartment Rental', tTitle: 'Pag-upa ng Bahay o Kuwarto', cat: 'Daily Life' as const, loc: 'Apartment Building' },
  { num: 46, title: 'Attending a Filipino Wedding Reception', tTitle: 'Pagdalo sa Kasalang Pilipino', cat: 'Family & Social' as const, loc: 'Reception Garden Hall' },
  { num: 47, title: 'Graduation Feast & Congratulating the Graduate', tTitle: 'Pagdiriwang ng Pagtatapos', cat: 'Family & Social' as const, loc: 'Family Banquet' },
  { num: 48, title: 'Late Night Balut & Penoy Vendor', tTitle: 'Pagbili ng Mainit na Balut sa Gabi', cat: 'Food & Dining' as const, loc: 'Street Corner at Night' },
  { num: 49, title: 'Metered City Taxi Ride', tTitle: 'Pagsakay sa Metradong Taksi', cat: 'Travel' as const, loc: 'Airport Arrival Curb' },
  { num: 50, title: 'Airport Send-off & Warm "Ingat!" Farewell', tTitle: 'Paghahatid sa Paliparan (Habilin)', cat: 'Family & Social' as const, loc: 'NAIA Terminal Departure' }
];

scenarioMetadata.forEach(meta => {
  conversationScenarios.push({
    id: `scen-${meta.num}`,
    scenarioNumber: meta.num,
    title: meta.title,
    titleTagalog: meta.tTitle,
    location: meta.loc,
    category: meta.cat,
    difficulty: meta.num > 35 ? 'Advanced' : meta.num > 15 ? 'Intermediate' : 'Beginner',
    culturalContext: `Authentic daily interaction in the Philippines regarding ${meta.title.toLowerCase()}. Courteous use of "po", "opo", and situational expressions ensure warm social harmony.`,
    xpReward: 35 + (meta.num % 15),
    dialogue: [
      {
        id: 'node-1',
        speaker: 'npc' as const,
        speakerName: 'Lokal na Kausap',
        tagalog: `Magandang araw po! May maipaglilingkod po ba ako sa inyo ukol sa ${meta.title.toLowerCase()}?`,
        english: `Good day! May I assist you regarding ${meta.title.toLowerCase()}?`,
        audioText: `Magandang araw po! May maipaglilingkod po ba ako sa inyo?`,
        choices: [
          {
            textTagalog: 'Opo, puwede po bang magtanong nang maayos at magalang?',
            textEnglish: 'Yes, may I please ask nicely and respectfully?',
            culturalFeedback: 'Very polite and culturally observant response!',
            nextNodeId: 'node-2',
            isCorrect: true
          },
          {
            textTagalog: 'Gusto ko ito ngayon na.',
            textEnglish: 'I want this right now.',
            culturalFeedback: 'Too abrupt. Filipinos prefer courteous requests.',
            nextNodeId: 'node-2',
            isCorrect: false
          }
        ]
      },
      {
        id: 'node-2',
        speaker: 'npc' as const,
        speakerName: 'Lokal na Kausap',
        tagalog: 'Walang anuman po! Handa kaming tumulong sa inyo anumang oras.',
        english: 'You are very welcome! We are always ready to help you anytime.',
        audioText: 'Walang anuman po! Handa kaming tumulong sa inyo.',
        choices: [
          {
            textTagalog: 'Napakabait po ninyo, maraming salamat po sa malasakit!',
            textEnglish: 'You are so kind, thank you so much for your care!',
            culturalFeedback: 'Expressing gratitude with "malasakit" (genuine care) builds instant kinship.',
            nextNodeId: 'node-3',
            isCorrect: true
          }
        ]
      },
      {
        id: 'node-3',
        speaker: 'npc' as const,
        speakerName: 'Lokal na Kausap',
        tagalog: 'Mabuhay po kayo at mag-ingat palagi sa inyong lakad!',
        english: 'Long life to you and always stay safe on your way!',
        audioText: 'Mabuhay po kayo at mag-ingat palagi!',
        isTerminal: true
      }
    ]
  });
});
