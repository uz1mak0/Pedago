import { GrammarExercise } from '../types';

export const grammarExercises: GrammarExercise[] = [
  {
    id: 'grammar-1',
    topicNumber: 1,
    topic: 'Actor Focus: -um- Infix',
    category: 'Focus System',
    title: 'Actor Focus with -um-',
    tagalogTitle: 'Pokus sa Tagaganap (-um-)',
    level: 'Beginner',
    summary: 'The -um- infix puts the person or actor doing the action at the center of the sentence.',
    formula: 'Root word + infix -um- after first consonant (k-um-ain, p-um-unta)',
    detailedExplanation: 'In Tagalog, verbs change affixes depending on what is the focus (ang-phrase) of the sentence. When using -um-, the actor is in focus. For roots starting with a vowel, um- is prefixed (inom -> uminom). For roots starting with a consonant, -um- is infixed after the first consonant (kain -> kumain).',
    examples: [
      { tagalog: 'Kumain si Marco ng mangga.', english: 'Marco ate a mango.', breakdown: 'k-um-ain (ate) + si Marco (actor focus) + ng mangga (object)' },
      { tagalog: 'Pumunta kami sa Maynila kahapon.', english: 'We went to Manila yesterday.', breakdown: 'p-um-unta (went) + kami (exclusive we) + sa Maynila (to Manila)' }
    ],
    quiz: [
      {
        id: 'q1-1',
        question: 'Which word uses the actor-focus -um- infix correctly for the root "basa" (read)?',
        options: ['Magbasa', 'Bumasa', 'Basahin', 'Binasa'],
        correctIndex: 1,
        explanation: 'Bumasa places -um- right after the first consonant "b".'
      }
    ]
  },
  {
    id: 'grammar-2',
    topicNumber: 2,
    topic: 'Actor Focus: mag- Prefix',
    category: 'Focus System',
    title: 'Actor Focus with mag-',
    tagalogTitle: 'Pokus sa Tagaganap (mag-)',
    level: 'Beginner',
    summary: 'The mag- prefix indicates deliberate, professional, or intensive actor-focused actions.',
    formula: 'mag- + root word (mag-aral, magluto, maglinis)',
    detailedExplanation: 'While both -um- and mag- are actor focus affixes, mag- often denotes more deliberate, repeated, or external actions. Note that a hyphen is mandatory if the root begins with a vowel (mag-aral, mag-isa), and omitted if it begins with a consonant (magluto).',
    examples: [
      { tagalog: 'Nagluto si Nanay ng masarap na sinigang.', english: 'Mom cooked delicious sinigang.', breakdown: 'Nag- (past of mag-) + luto (cook) + si Nanay (actor)' },
      { tagalog: 'Mag-aaral ako mamayang gabi.', english: 'I will study later tonight.', breakdown: 'Mag-aa-ral (future reduplicated) + ako (I)' }
    ],
    quiz: [
      {
        id: 'q2-1',
        question: 'How do you correctly write the mag- form for the root "aral" (study)?',
        options: ['Magaral', 'Mag-aral', 'Umaral', 'Aralin'],
        correctIndex: 1,
        explanation: 'In Tagalog orthography, mag- must have a hyphen before a root starting with a vowel.'
      }
    ]
  },
  {
    id: 'grammar-3',
    topicNumber: 3,
    topic: 'Object Focus: -in- Suffix',
    category: 'Focus System',
    title: 'Object / Patient Focus with -in-',
    tagalogTitle: 'Pokus sa Layon (-in / -hin)',
    level: 'Beginner',
    summary: 'The -in- suffix places the direct receiver or object of the action in the spotlight.',
    formula: 'Root word + -in (or -hin if ending in vowel): kainin, basahin',
    detailedExplanation: 'When the specific object is definite or known to the speaker, Tagalog speakers prefer Object Focus over Actor Focus. The object is marked by "ang", while the actor takes the "ng" marker (e.g., Kinain ko ang saging = The banana was eaten by me).',
    examples: [
      { tagalog: 'Kainin mo ang gulay.', english: 'Eat the vegetables.', breakdown: 'kain-in (eat it) + mo (by you) + ang gulay (the vegetable)' },
      { tagalog: 'Basahin natin ang aklat na ito.', english: 'Let us read this book.', breakdown: 'basa-hin (read) + natin (by us) + ang aklat (the book)' }
    ],
    quiz: [
      {
        id: 'q3-1',
        question: 'In "Kinain ko ang mangga", what is in the grammatical focus?',
        options: ['The person eating (ko)', 'The mango (ang mangga)', 'The kitchen', 'The time of day'],
        correctIndex: 1,
        explanation: '"Ang mangga" is marked by "ang", making it the focused object of the verb "kinain".'
      }
    ]
  },
  {
    id: 'grammar-4',
    topicNumber: 4,
    topic: 'Locative Focus: -an Suffix',
    category: 'Focus System',
    title: 'Locative Focus with -an / -han',
    tagalogTitle: 'Pokus sa Ganapan (-an / -han)',
    level: 'Intermediate',
    summary: 'Directs the sentence focus to the place, surface, or direction where the action happens.',
    formula: 'Root + -an / -han (sulatan, hugasan, puntahan)',
    detailedExplanation: 'Locative focus elevates the location or surface to the "ang" position. For instance, instead of saying "I washed the plates", locative focus highlights the sink or the dishes surface: "Hugasan mo ang plato" (Wash the plates).',
    examples: [
      { tagalog: 'Puntahan natin ang magandang talon sa Laguna.', english: 'Let us visit the beautiful waterfall in Laguna.', breakdown: 'punta-han (visit/go to) + natin (by us) + ang magandang talon (the waterfall - focus)' },
      { tagalog: 'Hugasán mo ang mga plato.', english: 'Wash the plates.', breakdown: 'hugas-an (wash surface) + mo (by you) + ang mga plato (plates)' }
    ],
    quiz: [
      {
        id: 'q4-1',
        question: 'Which suffix marks locative or direction focus?',
        options: ['-um-', 'mag-', '-an / -han', 'maka-'],
        correctIndex: 2,
        explanation: '-an / -han is the primary locative suffix in Tagalog.'
      }
    ]
  },
  {
    id: 'grammar-5',
    topicNumber: 5,
    topic: 'Benefactive Focus: i- Prefix',
    category: 'Focus System',
    title: 'Benefactive Focus with i-',
    tagalogTitle: 'Pokus sa Tagatanggap (i-)',
    level: 'Intermediate',
    summary: 'Focuses on the beneficiary — the person for whom an action is performed.',
    formula: 'i- + Root (ibili, iluto, ikuha)',
    detailedExplanation: 'When you do something for someone else with affection or service, Tagalog uses benefactive verbs with prefix i-. The person receiving the benefit is highlighted with "si" or "ang".',
    examples: [
      { tagalog: 'Ipagluto mo si Tatay ng hapunan.', english: 'Cook dinner for Dad.', breakdown: 'Ipag-luto (cook for) + mo (by you) + si Tatay (beneficiary focus) + ng hapunan (dinner)' },
      { tagalog: 'Ibinili ko ang kapatid ko ng bagong sapatos.', english: 'I bought my sibling new shoes.', breakdown: 'I-binili (bought for) + ko (by me) + ang kapatid ko (beneficiary) + ng sapatos (shoes)' }
    ],
    quiz: [
      {
        id: 'q5-1',
        question: 'In benefactive focus, who or what receives the "ang / si" marker?',
        options: ['The tool used', 'The person benefiting from the action', 'The location', 'The time'],
        correctIndex: 1,
        explanation: 'Benefactive focus elevates the beneficiary of the act.'
      }
    ]
  },
  {
    id: 'grammar-6',
    topicNumber: 6,
    topic: 'Instrumental Focus: ipang- Prefix',
    category: 'Focus System',
    title: 'Instrumental Focus with ipang-',
    tagalogTitle: 'Pokus sa Kagamitan (ipang-)',
    level: 'Advanced',
    summary: 'Focuses on the tool, utensil, or instrument used to accomplish the verb.',
    formula: 'ipang- + Root (ipanghiwa, ipanglinis, ipansulat)',
    detailedExplanation: 'Instrumental focus makes the tool itself the grammatical subject. Notice phonetic nasal assimilation: ipang- + hiwa -> ipanghiwa; ipang- + sulat -> ipansulat (ng becomes n before s).',
    examples: [
      { tagalog: 'Ipinanghiwa niya ang kutsilyo sa karne.', english: 'He used the knife to cut the meat.', breakdown: 'I-pinang-hiwa (used to slice) + niya (by him) + ang kutsilyo (the knife - focus)' },
      { tagalog: 'Ipansulat mo ang bolpen na ito.', english: 'Use this ballpen for writing.', breakdown: 'Ipan-sulat (use to write) + mo (by you) + ang bolpen (ballpen)' }
    ],
    quiz: [
      {
        id: 'q6-1',
        question: 'Which affix is used when the utensil/instrument is the focus of the sentence?',
        options: ['ipang-', '-um-', 'maka-', 'pa-'],
        correctIndex: 0,
        explanation: 'ipang- is the dedicated instrumental focus prefix.'
      }
    ]
  },
  {
    id: 'grammar-7',
    topicNumber: 7,
    topic: 'Causative Affix: pa- and magpa-',
    category: 'Focus System',
    title: 'Causative Actions with pa- / magpa-',
    tagalogTitle: 'Kawsatibong Pandiwa (pa- / magpa-)',
    level: 'Intermediate',
    summary: 'Expresses causing, having, letting, or requesting someone else to do an action.',
    formula: 'magpa- + root (magpagupit = get a haircut, magpalinis = have cleaned)',
    detailedExplanation: 'Causative affixes are ubiquitous in daily Filipino life. When you visit a salon, you say "Magpapagupit ako" (I will have my hair cut), rather than saying you will cut your own hair.',
    examples: [
      { tagalog: 'Magpapagupit ako bukas sa barbero.', english: 'I will get a haircut tomorrow at the barbershop.', breakdown: 'Mag-pa-pa-gupit (will cause hair cut) + ako (I) + bukas (tomorrow)' },
      { tagalog: 'Pinalinis ni Maria ang kuwarto sa kaniyang kapatid.', english: 'Maria had her sibling clean the room.', breakdown: 'Pina-linis (had cleaned) + ni Maria (by Maria) + ang kuwarto (the room)' }
    ],
    quiz: [
      {
        id: 'q7-1',
        question: 'What does "Magpapaluto si Kuya" mean?',
        options: ['Kuya will cook by himself', 'Kuya will have someone cook food', 'Kuya ate all the food', 'Kuya dislikes food'],
        correctIndex: 1,
        explanation: 'The causative "magpa-" indicates having or causing someone else to perform the action.'
      }
    ]
  },
  {
    id: 'grammar-8',
    topicNumber: 8,
    topic: 'Ability Affix: maka- and makapag-',
    category: 'Focus System',
    title: 'Ability & Involuntary Actions with maka-',
    tagalogTitle: 'Pandiwa ng Kakayahan (maka- / makapag-)',
    level: 'Intermediate',
    summary: 'Distinguishes ability ("can do") or accidental actions from deliberate actions.',
    formula: 'maka- / naká- + root (nakatulog = fell asleep, nakapunta = was able to go)',
    detailedExplanation: 'In English, "I slept" and "I fell asleep" use the same root. In Tagalog, "Natulog ako" means I intentionally went to sleep, while "Nakatulog ako" means I accidentally dozed off or was able to sleep.',
    examples: [
      { tagalog: 'Hindi ako nakatulog kagabi dahil sa ingay.', english: 'I was unable to sleep last night due to noise.', breakdown: 'Hindi (not) + nakatulog (able to sleep) + kagabi (last night)' },
      { tagalog: 'Makakauwi ka ba nang maaga?', english: 'Will you be able to come home early?', breakdown: 'Maka-ka-uwi (able to go home) + ka (you) + ba (question)' }
    ],
    quiz: [
      {
        id: 'q8-1',
        question: 'What is the key difference between "Natulog ako" and "Nakatulog ako"?',
        options: ['No difference', '"Natulog" is deliberate sleep; "Nakatulog" is falling asleep accidentally or being able to sleep', '"Nakatulog" is future tense', '"Natulog" is for children only'],
        correctIndex: 1,
        explanation: 'maka-/naka- encodes ability or unintentional/accidental occurrence.'
      }
    ]
  },
  {
    id: 'grammar-9',
    topicNumber: 9,
    topic: 'Social / Cooperative Affix: maki-',
    category: 'Focus System',
    title: 'Social & Polite Requests with maki-',
    tagalogTitle: 'Pokus sa Pakikisama (maki- / makipag-)',
    level: 'Intermediate',
    summary: 'Expresses joining in, sharing, or politely requesting permission to use or participate.',
    formula: 'maki- + root (makisuyo, makisabay, makitira)',
    detailedExplanation: 'Pakikisama (social harmony) is a cornerstone of Filipino culture. "Makisabay" means to hitch a ride together; "Makisuyo" means to politely ask a small favor.',
    examples: [
      { tagalog: 'Makisuyo naman po, pakiabot ng bayad.', english: 'May I kindly ask a favor, please pass my fare.', breakdown: 'Maki-suyo (request favor) + naman (softener) + po (polite) + pakiabot (please pass)' },
      { tagalog: 'Nakikain kami sa pista kanina.', english: 'We joined in eating at the fiesta earlier.', breakdown: 'Naki-kain (joined in eating) + kami (we)' }
    ],
    quiz: [
      {
        id: 'q9-1',
        question: 'What social value does the prefix "maki-" linguistically embody?',
        options: ['Individualism', 'Pakikisama (camaraderie & polite cooperation)', 'Aggression', 'Silence'],
        correctIndex: 1,
        explanation: 'maki- is the grammatical marker of social participation and courteous requests.'
      }
    ]
  },
  {
    id: 'grammar-10',
    topicNumber: 10,
    topic: 'Reciprocal: mag-...-an',
    category: 'Focus System',
    title: 'Reciprocal & Collective: mag-...-an',
    tagalogTitle: 'Pandiwa ng Palitan (mag-...-an)',
    level: 'Intermediate',
    summary: 'Describes actions done to one another reciprocally or by groups in unison.',
    formula: 'mag- + root + -an (magtulungan = help each other, mag-usap = converse)',
    detailedExplanation: 'When two or more parties do an action to each other, the circumfix mag-...-an or prefix mag- is used with plural pronouns (tayo, sila, kayo).',
    examples: [
      { tagalog: 'Dapat tayong magtulungan sa oras ng pagsubok.', english: 'We should help one another during times of trial.', breakdown: 'Dapat (should) + tayong (we) + mag-tulung-an (help each other)' },
      { tagalog: 'Nagyakapan ang magkaibigan nang magkita sila.', english: 'The friends hugged each other when they met.', breakdown: 'Nag-yakap-an (hugged each other) + ang magkaibigan (the friends)' }
    ],
    quiz: [
      {
        id: 'q10-1',
        question: 'What does "magtulungan" mean?',
        options: ['Help oneself only', 'Help each other collaboratively', 'Ask for help loudly', 'Stop helping'],
        correctIndex: 1,
        explanation: 'mag-...-an expresses mutual, reciprocal action among people.'
      }
    ]
  },
  {
    id: 'grammar-11',
    topicNumber: 11,
    topic: 'The Three Verbal Aspects (Tenses)',
    category: 'Verbal Aspects',
    title: 'The Tagalog Aspect System: Completed, Incompleted, Contemplated',
    tagalogTitle: 'Tatlong Aspekto ng Pandiwa',
    level: 'Beginner',
    summary: 'Tagalog verbs reflect aspect (whether the action has started, is ongoing, or hasn’t begun) rather than pure tense.',
    formula: 'Completed (Naganap), Incompleted (Nagaganap), Contemplated (Magaganap)',
    detailedExplanation: 'Unlike English past/present/future which depends on a strict timeline, Tagalog grammatical aspect views whether an action is completed, ongoing, or yet to occur. Notice how the root repeats its first syllable for ongoing and future states.',
    examples: [
      { tagalog: 'Kumain (Completed), Kumakain (Ongoing), Kakain (Future).', english: 'Ate, Eating, Will eat.', breakdown: 'k-um-ain -> k-um-a-kain -> ka-kain' },
      { tagalog: 'Nagluto (Completed), Nagluluto (Ongoing), Magluluto (Future).', english: 'Cooked, Cooking, Will cook.', breakdown: 'nag-luto -> nag-lu-luto -> mag-lu-luto' }
    ],
    quiz: [
      {
        id: 'q11-1',
        question: 'Which of the following represents the ongoing (incompleted) aspect of "sulat"?',
        options: ['Sumulat', 'Sumusulat', 'Susulat', 'Magsulat'],
        correctIndex: 1,
        explanation: 'Sumusulat reduplicates the first syllable (su) while keeping the -um- infix.'
      }
    ]
  },
  {
    id: 'grammar-12',
    topicNumber: 12,
    topic: 'Reduplication Rules for Verbs',
    category: 'Verbal Aspects',
    title: 'Syllable Reduplication (Pag-uulit ng Pantig)',
    tagalogTitle: 'Tuntunin sa Pag-uulit ng Pantig',
    level: 'Beginner',
    summary: 'Repeating the first consonant-vowel (CV) of the root signals uncompleted or future action.',
    formula: 'First CV + Root (basa -> ba-basa; luto -> lu-luto; alis -> a-alis)',
    detailedExplanation: 'Reduplication is one of the most productive morphological patterns in Austronesian languages. If a root begins with a vowel (e.g. alis), only the vowel is repeated: a-alis. If it begins with consonant + vowel (e.g. gawa), both are repeated: ga-gawa.',
    examples: [
      { tagalog: 'Aalis ang barko mamaya.', english: 'The boat will depart later.', breakdown: 'A-alis (will depart) + ang barko (the ship)' },
      { tagalog: 'Nanonood kami ng telebisyon.', english: 'We are watching television.', breakdown: 'Na-no-nood (watching)' }
    ],
    quiz: [
      {
        id: 'q12-1',
        question: 'What is the future reduplicated form of the verb root "inom" (drink)?',
        options: ['Iinom', 'Inominom', 'Uminom', 'Mag-inom'],
        correctIndex: 0,
        explanation: 'Since "inom" starts with vowel "i", only the initial vowel is reduplicated: i-inom.'
      }
    ]
  },
  {
    id: 'grammar-13',
    topicNumber: 13,
    topic: 'Case Markers: Ang Set (Focus Marker)',
    category: 'Case Markers',
    title: 'The Focus Marker: Ang / Si / Sina',
    tagalogTitle: 'Mga Pantukoy na Ang / Si / Sina',
    level: 'Beginner',
    summary: 'Marks the central topic or focus of the sentence (equivalent to "the" or proper name subject).',
    formula: 'ang (common noun) | si (singular person) | sina (plural people)',
    detailedExplanation: 'The "ang" set marks the trigger or primary participant of the verb. Always use "si" for an individual person’s name (si Juan), "sina" for multiple named people (sina Juan at Maria), and "ang" or "ang mga" for common nouns (ang bata, ang mga bata).',
    examples: [
      { tagalog: 'Matalino si Sofia.', english: 'Sofia is intelligent.', breakdown: 'Matalino (smart) + si Sofia (person focus)' },
      { tagalog: 'Dumating na ang mga bisita.', english: 'The guests have already arrived.', breakdown: 'Dumating na (arrived already) + ang mga bisita (the guests)' }
    ],
    quiz: [
      {
        id: 'q13-1',
        question: 'Which marker should precede the names "Rico and Carlo"?',
        options: ['Si', 'Sina', 'Ang', 'Kay'],
        correctIndex: 1,
        explanation: '"Sina" is the plural focus personal marker used for two or more named individuals.'
      }
    ]
  },
  {
    id: 'grammar-14',
    topicNumber: 14,
    topic: 'Case Markers: Ng Set (Actor & Possessive)',
    category: 'Case Markers',
    title: 'The Non-Focus & Genitive Marker: Ng / Ni / Nina',
    tagalogTitle: 'Mga Pantukoy na Ng / Ni / Nina',
    level: 'Beginner',
    summary: 'Pronounced "nang". Marks non-focus actors, direct objects of actor-focus verbs, and possession.',
    formula: 'ng (common noun) | ni (singular person) | nina (plural people)',
    detailedExplanation: 'Crucial pronunciation rule: "ng" is spelled as two letters but pronounced "nang". It acts like English "of" or "by", and introduces the owner in possessive phrases (bahay ni Pedro = Pedro\'s house).',
    examples: [
      { tagalog: 'Ito ang kotse ni Kuya Ben.', english: 'This is older brother Ben\'s car.', breakdown: 'Ito (this) + ang kotse (the car) + ni Kuya Ben (of Kuya Ben)' },
      { tagalog: 'Nagsulat ang bata ng liham.', english: 'The child wrote a letter.', breakdown: 'Nagsulat (wrote) + ang bata (actor) + ng liham (object: a letter)' }
    ],
    quiz: [
      {
        id: 'q14-1',
        question: 'How is the Tagalog word "ng" pronounced in spoken conversation?',
        options: ['En-jee', 'Nang', 'Ning', 'Ung'],
        correctIndex: 1,
        explanation: 'Spelled "ng", it is universally pronounced "nang" by native speakers.'
      }
    ]
  },
  {
    id: 'grammar-15',
    topicNumber: 15,
    topic: 'Case Markers: Sa Set (Direction & Oblique)',
    category: 'Case Markers',
    title: 'The Oblique & Direction Marker: Sa / Kay / Kina',
    tagalogTitle: 'Mga Pantukoy na Sa / Kay / Kina',
    level: 'Beginner',
    summary: 'Marks locations, directions (to/from/in/at), and beneficiaries.',
    formula: 'sa (places/common nouns) | kay (singular person) | kina (plural people)',
    detailedExplanation: '"Sa" is a versatile prepositional marker covering in, on, at, to, from, and with. When referring to someone’s home or family, "kina" is used: "Pumunta kami kina Lola" means "We went to Grandma\'s house/family".',
    examples: [
      { tagalog: 'Ibigay mo ang prutas kay Nanay.', english: 'Give the fruit to Mom.', breakdown: 'Ibigay mo (give) + ang prutas (the fruit) + kay Nanay (to Mom)' },
      { tagalog: 'Nasa mesa ang susi.', english: 'The key is on the table.', breakdown: 'Nasa mesa (on the table) + ang susi (the key)' }
    ],
    quiz: [
      {
        id: 'q15-1',
        question: 'How do you say "Give this to Maria"?',
        options: ['Ibigay mo ito sa Maria', 'Ibigay mo ito kay Maria', 'Ibigay mo ito ni Maria', 'Ibigay mo ito si Maria'],
        correctIndex: 1,
        explanation: '"Kay" is the singular personal oblique marker for named persons.'
      }
    ]
  },
  {
    id: 'grammar-16',
    topicNumber: 16,
    topic: 'Personal Pronouns: Ang Set (Subject Pronouns)',
    category: 'Pronouns & Demonstratives',
    title: 'Subject Pronouns: Ako, Ikaw/Ka, Siya, Tayo, Kami, Kayo, Sila',
    tagalogTitle: 'Mga Panghalip Panao: Anyong Ang',
    level: 'Beginner',
    summary: 'The pronouns that act as sentence topic or focus: I, you, he/she, we, you all, they.',
    formula: 'Ako (I) | Ikaw / Ka (You) | Siya (He/She) | Tayo / Kami (We) | Kayo (You all) | Sila (They)',
    detailedExplanation: 'Note on "Ka" vs "Ikaw": "Ka" is an enclitic and can NEVER start a sentence (e.g., Maganda ka). "Ikaw" is used when placed at the beginning of a clause (e.g., Ikaw ang mahal ko). Tagalog pronouns are gender-neutral: "siya" means both he and she.',
    examples: [
      { tagalog: 'Guro ako sa Maynila.', english: 'I am a teacher in Manila.', breakdown: 'Guro (teacher) + ako (I) + sa Maynila (in Manila)' },
      { tagalog: 'Sila ang mga kaibigan ko.', english: 'They are my friends.', breakdown: 'Sila (they) + ang mga kaibigan (the friends) + ko (my)' }
    ],
    quiz: [
      {
        id: 'q16-1',
        question: 'Can the pronoun "ka" start a sentence?',
        options: ['Yes, always', 'No, never; use "ikaw" at the start of a sentence', 'Only on Tuesdays', 'Only in questions'],
        correctIndex: 1,
        explanation: '"Ka" is an enclitic pronoun and must follow another word; "ikaw" starts clauses.'
      }
    ]
  },
  {
    id: 'grammar-17',
    topicNumber: 17,
    topic: 'The Inclusive Tayo vs Exclusive Kami',
    category: 'Pronouns & Demonstratives',
    title: 'Inclusive "Tayo" vs. Exclusive "Kami"',
    tagalogTitle: 'Panghalip: Tayo laban sa Kami',
    level: 'Beginner',
    summary: 'Tagalog makes a strict, polite distinction whether the listener is included in "we" or excluded.',
    formula: 'Tayo = Speaker + Listener(s) | Kami = Speaker + Others (NOT the listener)',
    detailedExplanation: 'This is one of the most culturally vital features of Tagalog. If you tell a host "Aalis na kami", it means you and your group are leaving, not the host. If you say "Kumain na tayo", you are inviting the listener to eat together with you.',
    examples: [
      { tagalog: 'Kumain na tayo! (Inviting the listener to join)', english: 'Let\'s all eat together! (You and me)', breakdown: 'Kumain na (eat now) + tayo (inclusive we)' },
      { tagalog: 'Pumunta kami sa Boracay (Listener didn\'t go).', english: 'We went to Boracay (without you).', breakdown: 'Pumunta (went) + kami (exclusive we) + sa Boracay' }
    ],
    quiz: [
      {
        id: 'q17-1',
        question: 'If you are inviting your dining companion to eat with you right now, which word do you use?',
        options: ['Kami', 'Tayo', 'Sila', 'Kayo'],
        correctIndex: 1,
        explanation: '"Tayo" includes the person you are speaking with.'
      }
    ]
  },
  {
    id: 'grammar-18',
    topicNumber: 18,
    topic: 'Personal Pronouns: Ng Set (Possessive & Agent)',
    category: 'Pronouns & Demonstratives',
    title: 'The Ng Pronoun Set: Ko, Mo, Niya, Natin, Namin, Ninyo, Nila',
    tagalogTitle: 'Mga Panghalip na Anyong Ng',
    level: 'Beginner',
    summary: 'Functions as possessives ("my, your, his/her") and as the actor in object-focus verbs.',
    formula: 'Noun + ko / mo / niya / natin / namin / ninyo / nila',
    detailedExplanation: 'In Tagalog, post-nominal possessive pronouns immediately follow the noun they own: "bahay ko" (my house), "kaibigan mo" (your friend). They also serve as the doer in goal-focused sentences: "Ginawa ko ito" (I made this).',
    examples: [
      { tagalog: 'Saan ang bahay mo?', english: 'Where is your house?', breakdown: 'Saan (where) + ang bahay (the house) + mo (your)' },
      { tagalog: 'Binili nila ang prutas.', english: 'They bought the fruit.', breakdown: 'Binili (bought) + nila (by them) + ang prutas (the fruit)' }
    ],
    quiz: [
      {
        id: 'q18-1',
        question: 'How do you say "my bag" in Tagalog using the Ng pronoun set?',
        options: ['Bag akin', 'Bag ko', 'Bag ako', 'Aking ko'],
        correctIndex: 1,
        explanation: 'Post-nominal possessives follow the noun directly: "bag ko".'
      }
    ]
  },
  {
    id: 'grammar-19',
    topicNumber: 19,
    topic: 'Personal Pronouns: Sa Set (Pre-nominal Possessives)',
    category: 'Pronouns & Demonstratives',
    title: 'Pre-nominal Possessives & Obliques: Akin, Iyo, Kaniya, Atin, Amin, Inyo, Kanila',
    tagalogTitle: 'Mga Panghalip na Anyong Sa',
    level: 'Intermediate',
    summary: 'Used before nouns with ligature (aking bahay) or standalone as "mine, yours, hers".',
    formula: 'Akin(g) | Iyo(ng) | Kaniya(ng) | Atin(g) | Amin(g) | Inyo(ng) | Kanila(ng)',
    detailedExplanation: 'While "bahay ko" places "ko" after the noun, "sa akin" can precede the noun when linked with the ligature: "aking bahay" (my house). It also stands alone to emphasize ownership: "Akin ito!" (This is mine!).',
    examples: [
      { tagalog: 'Akin ang pulang payong na ito.', english: 'This red umbrella is mine.', breakdown: 'Akin (mine) + ang pulang payong (the red umbrella)' },
      { tagalog: 'Para sa kaniya ang bulaklak.', english: 'The flower is for him/her.', breakdown: 'Para sa kaniya (for him/her) + ang bulaklak (the flower)' }
    ],
    quiz: [
      {
        id: 'q19-1',
        question: 'What is the pre-nominal equivalent of "kotse mo" (your car)?',
        options: ['Iyong kotse', 'Aking kotse', 'Kaniyang kotse', 'Inyong ako'],
        correctIndex: 0,
        explanation: '"Iyo" + ligature "-ng" + "kotse" = "Iyong kotse".'
      }
    ]
  },
  {
    id: 'grammar-20',
    topicNumber: 20,
    topic: 'Demonstratives: Ito, Iyan, Iyon',
    category: 'Pronouns & Demonstratives',
    title: 'Demonstrative Pronouns: Ito, Iyan, Iyon',
    tagalogTitle: 'Mga Panghalip Pamatlig: Ito, Iyan, Iyon',
    level: 'Beginner',
    summary: 'Three-way spatial system: close to speaker (ito), close to listener (iyan), far from both (iyon).',
    formula: 'Ito (this here) | Iyan (that near you) | Iyon (that over there)',
    detailedExplanation: 'English only distinguishes two distances (this/that). Tagalog strictly uses a three-way spatial distinction. If something is near the person you are talking to, you must use "iyan". If it is distant from both of you, use "iyon".',
    examples: [
      { tagalog: 'Ano ito? (Holding an item)', english: 'What is this? (Near speaker)', breakdown: 'Ano (what) + ito (this)' },
      { tagalog: 'Gusto ko iyon! (Pointing into the distance)', english: 'I want that one over there!', breakdown: 'Gusto ko (I want) + iyon (that far away)' }
    ],
    quiz: [
      {
        id: 'q20-1',
        question: 'If your friend is holding a phone, which demonstrative do you use to refer to it?',
        options: ['Ito', 'Iyan', 'Iyon', 'Doon'],
        correctIndex: 1,
        explanation: '"Iyan" refers specifically to objects close to or held by the listener.'
      }
    ]
  }
];

// Dynamically generate the remaining 30 grammar topics (21-50) so all 50 are fully structured
const additionalGrammarTopicsData = [
  {
    num: 21,
    topic: 'Locative Demonstratives: Dito, Diyan, Doon',
    cat: 'Pronouns & Demonstratives' as const,
    title: 'Locations: Dito, Diyan, Doon (Rito, Riyan, Roon)',
    tTitle: 'Pamatlig sa Lugar (Dito, Diyan, Doon)',
    lvl: 'Beginner' as const,
    sum: 'Points to locations: here (dito), there by you (diyan), and yonder (doon).',
    form: 'dito (rito after vowel) | diyan (riyan) | doon (roon)',
    det: 'When preceded by a vowel, the "d" euphonically softens to "r" (e.g. dito -> rito; pupunta rito).',
    ex: [
      { tagalog: 'Umupo ka rito sa tabi ko.', english: 'Sit here beside me.', breakdown: 'Umupo ka (sit) + rito (here) + sa tabi ko (beside me)' },
      { tagalog: 'Malamig ba doon sa Baguio?', english: 'Is it cold over there in Baguio?', breakdown: 'Malamig ba (cold?) + doon (over there) + sa Baguio' }
    ],
    q: { q: 'When does "dito" turn into "rito"?', opts: ['After a consonant', 'After a vowel sound', 'At the end of a sentence', 'Never'], ans: 1, exp: 'Euphonic rule: d becomes r after vowels in native Tagalog speech.' }
  },
  {
    num: 22,
    topic: 'Manner Demonstratives: Ganito, Ganyan, Ganoon',
    cat: 'Pronouns & Demonstratives' as const,
    title: 'Manner: Ganito, Ganyan, Ganoon',
    tTitle: 'Pamatlig sa Paraan (Ganito, Ganyan, Ganoon)',
    lvl: 'Intermediate' as const,
    sum: 'Expresses "like this", "like that (near you)", and "like that (over there)".',
    form: 'Ganito (like this) | Ganyan (like that) | Ganoon (like that far)',
    det: 'Use "ganito" when demonstrating a physical gesture or technique yourself ("Gawin mo nang ganito" = Do it like this).',
    ex: [
      { tagalog: 'Ganito magluto ng adobo.', english: 'This is how to cook adobo.', breakdown: 'Ganito (like this) + magluto (to cook) + ng adobo' },
      { tagalog: 'Huwag kang magsalita nang ganyan.', english: 'Don\'t speak like that.', breakdown: 'Huwag (don\'t) + ganyan (like that)' }
    ],
    q: { q: 'Which word means "in this manner / like this"?', opts: ['Ganito', 'Ganyan', 'Ganoon', 'Ganoon ba'], ans: 0, exp: 'Ganito points to the manner shown by the speaker.' }
  },
  {
    num: 23,
    topic: 'The Ligature: -ng and Na',
    cat: 'Sentences & Syntax' as const,
    title: 'Connecting Words with Ligatures: Na and -ng',
    tTitle: 'Ang Pang-angkop na Na at -ng',
    lvl: 'Beginner' as const,
    sum: 'Glues adjectives to nouns and modifiers to verbs for seamless flow.',
    form: 'Ends in vowel -> append -ng (maganda-ng umaga); Ends in consonant -> na (masipag na bata)',
    det: 'If a word ends in a vowel, affix -ng to its end (babae -> babaeng matalino). If it ends in "n", drop "n" and add "-ng" (ulan -> ulang malakas). If other consonants, use separate word "na".',
    ex: [
      { tagalog: 'Magandang umaga sa inyong lahat.', english: 'Good morning to you all.', breakdown: 'Maganda + -ng (beautiful) + umaga (morning)' },
      { tagalog: 'Mabilis na tumakbo ang aso.', english: 'The dog ran quickly.', breakdown: 'Mabilis (fast) + na (ligature) + tumakbo (ran)' }
    ],
    q: { q: 'What ligature connects "mabait" (kind) with "kaibigan" (friend)?', opts: ['-ng', 'na', 'ay', 'sa'], ans: 1, exp: 'Since "mabait" ends in consonant "t", separate ligature "na" is used.' }
  },
  {
    num: 24,
    topic: 'Default Word Order: Predicate First',
    cat: 'Sentences & Syntax' as const,
    title: 'Natural Tagalog Word Order: Predicate First',
    tTitle: 'Karaniwang Ayos ng Pangungusap',
    lvl: 'Beginner' as const,
    sum: 'Unlike English (Subject-Verb-Object), natural Tagalog begins with the predicate.',
    form: 'Predicate (Verb / Adjective) + Subject / Focus',
    det: 'In conversational Tagalog, 95% of sentences place the verb or descriptor first: "Masarap ang mangga" (Delicious is the mango) instead of "Ang mangga ay masarap".',
    ex: [
      { tagalog: 'Umuulan sa labas.', english: 'It is raining outside.', breakdown: 'Umuulan (raining) + sa labas (outside)' },
      { tagalog: 'Doktor ang kapatid ko.', english: 'My sibling is a doctor.', breakdown: 'Doktor (doctor - predicate) + ang kapatid ko (subject)' }
    ],
    q: { q: 'Which sentence follows standard natural conversational Tagalog order?', opts: ['Ang pagkain ay masarap', 'Masarap ang pagkain', 'Masarap ay pagkain', 'Pagkain ang masarap ay'], ans: 1, exp: 'Predicate-first ("Masarap ang pagkain") is natural daily Tagalog.' }
  },
  {
    num: 25,
    topic: 'Inverted Word Order with "Ay"',
    cat: 'Sentences & Syntax' as const,
    title: 'The Inversion Particle: Ay',
    tTitle: 'Di-karaniwang Ayos gamit ang "Ay"',
    lvl: 'Intermediate' as const,
    sum: 'Swaps subject to the front for formal writing, speeches, and emphasis.',
    form: 'Subject + ay + Predicate',
    det: '"Ay" is an inversion marker, not the verb "to be". In rapid colloquial speech, "ay" often contracts to "\'y" after vowels (Ako\'y Pilipino).',
    ex: [
      { tagalog: 'Ang Pilipinas ay mayaman sa kultura.', english: 'The Philippines is rich in culture.', breakdown: 'Ang Pilipinas (subject) + ay (inversion) + mayaman (rich)' },
      { tagalog: 'Ako\'y natututo ng Tagalog.', english: 'I am learning Tagalog.', breakdown: 'Ako + \'y (contracted ay) + natututo (learning)' }
    ],
    q: { q: 'What is the true grammatical function of "ay"?', opts: ['The verb "to be"', 'An inversion marker placing the subject first', 'A question marker', 'A past tense affix'], ans: 1, exp: '"Ay" is an inversion particle connecting a fronted subject to its predicate.' }
  },
  {
    num: 26,
    topic: 'Existential: May and Mayroon',
    cat: 'Sentences & Syntax' as const,
    title: 'Existence & Possession: May vs. Mayroon',
    tTitle: 'Pangungusap na May at Mayroon',
    lvl: 'Beginner' as const,
    sum: 'Expresses "there is / there are" or "to have / possess".',
    form: 'May + noun directly | Mayroon + enclitic / ligature (Mayroon ba? / Mayroong pera)',
    det: 'Use "may" when followed immediately by the noun: "May tubig pa" (There is still water). Use "mayroon" when an enclitic particle intervenes ("Mayroon ka bang pera?") or as a standalone affirmative answer ("Mayroon!").',
    ex: [
      { tagalog: 'May tindahan sa kanto.', english: 'There is a store on the corner.', breakdown: 'May (there is) + tindahan (store) + sa kanto (on the corner)' },
      { tagalog: 'Mayroon ka bang tanong?', english: 'Do you have a question?', breakdown: 'Mayroon (have) + ka (you) + bang (question particle) + tanong (question)' }
    ],
    q: { q: 'Which is correct when immediately preceding the noun "oras" (time)?', opts: ['May oras ka ba?', 'Mayroon oras ka ba?', 'Wala oras ka ba?', 'Mayroong oras'], ans: 0, exp: '"May" directly precedes the noun without any ligature.' }
  },
  {
    num: 27,
    topic: 'Non-existence and Lack: Wala',
    cat: 'Sentences & Syntax' as const,
    title: 'Absence & None: Wala',
    tTitle: 'Pangungusap na Wala',
    lvl: 'Beginner' as const,
    sum: 'The exact opposite of may/mayroon: "none, nothing, absent, not have".',
    form: 'Wala + -ng + noun (Walang pera, Walang tao)',
    det: 'When "wala" links to a noun, it always takes the ligature -ng: "Walang anuman" (You are welcome / It\'s nothing at all). It can also indicate absence: "Wala siya rito" (He is not here).',
    ex: [
      { tagalog: 'Walang anuman po!', english: 'You are very welcome! (It is nothing)', breakdown: 'Wala + -ng (none) + anuman (anything) + po (polite)' },
      { tagalog: 'Wala kaming pasok ngayon.', english: 'We have no classes/work today.', breakdown: 'Wala (none) + kaming (we) + pasok (work/class) + ngayon (today)' }
    ],
    q: { q: 'How do you say "There is no problem" in Tagalog?', opts: ['Hindi problema', 'Walang problema', 'Ayaw problema', 'Huwag problema'], ans: 1, exp: '"Walang problema" uses the existential negator "wala" + ligature.' }
  },
  {
    num: 28,
    topic: 'Fact & Verb Negation: Hindi',
    cat: 'Sentences & Syntax' as const,
    title: 'Negating Facts and Actions: Hindi',
    tTitle: 'Pagtanggi gamit ang Hindi',
    lvl: 'Beginner' as const,
    sum: 'Used to negate adjectives, verbs, and declarative statements ("no / not").',
    form: 'Hindi + Predicate / Verb',
    det: '"Hindi" pulls enclitic pronouns and particles immediately to itself: "Hindi ko alam" (I do not know), where "ko" leaps before the verb.',
    ex: [
      { tagalog: 'Hindi ko alam ang sagot.', english: 'I do not know the answer.', breakdown: 'Hindi (not) + ko (by me) + alam (know) + ang sagot (the answer)' },
      { tagalog: 'Hindi maanghang ang ulam.', english: 'The dish is not spicy.', breakdown: 'Hindi (not) + maanghang (spicy) + ang ulam (the dish)' }
    ],
    q: { q: 'In the sentence "Hindi ___ alam", where does pronoun "ko" go?', opts: ['After alam ("Hindi alam ko")', 'Immediately after hindi ("Hindi ko alam")', 'At the very end', 'Nowhere'], ans: 1, exp: 'Enclitics are magnetized to "hindi".' }
  },
  {
    num: 29,
    topic: 'Prohibitive Negation: Huwag',
    cat: 'Sentences & Syntax' as const,
    title: 'Negative Commands & Warnings: Huwag',
    tTitle: 'Pagbabawal gamit ang Huwag',
    lvl: 'Beginner' as const,
    sum: 'Equivalent to "Don\'t!" or "Do not!" for imperative commands.',
    form: 'Huwag + enclitic (Huwag kang umalis = Don\'t leave!)',
    det: 'Never use "hindi" for commands. Saying "Hindi ka umalis" means "You didn\'t leave". To command someone not to leave, you MUST use "Huwag kang umalis".',
    ex: [
      { tagalog: 'Huwag kang mag-alala.', english: 'Do not worry.', breakdown: 'Huwag (don\'t) + kang (you) + mag-alala (worry)' },
      { tagalog: 'Huwag hawakan ang salamin.', english: 'Do not touch the glass.', breakdown: 'Huwag (don\'t) + hawakan (touch) + ang salamin (the glass)' }
    ],
    q: { q: 'Which word is required to command "Don\'t run!"?', opts: ['Hindi tumakbo', 'Huwag tumakbo', 'Wala tumakbo', 'Ayaw tumakbo'], ans: 1, exp: '"Huwag" is the dedicated prohibitive command marker.' }
  },
  {
    num: 30,
    topic: 'Refusal & Dislike: Ayaw',
    cat: 'Sentences & Syntax' as const,
    title: 'Refusal & Aversion: Ayaw',
    tTitle: 'Pagtanggi at Ayaw',
    lvl: 'Beginner' as const,
    sum: 'Expresses "don\'t want, dislike, refuse" (the direct opposite of gusto).',
    form: 'Ayaw + ng-pronoun / actor (Ayaw ko = I don\'t want)',
    det: 'Colloquially often pronounced "Ayoko" (shortened contraction of "Ayaw ko").',
    ex: [
      { tagalog: 'Ayoko ng ampalaya.', english: 'I don\'t want / dislike bitter melon.', breakdown: 'Ayoko (Ayaw + ko: I don\'t like) + ng ampalaya' },
      { tagalog: 'Ayaw niyang sumama sa amin.', english: 'He/she refuses to join us.', breakdown: 'Ayaw (refuses) + niyang (he/she) + sumama (join) + sa amin (us)' }
    ],
    q: { q: 'What is the everyday spoken contraction of "Ayaw ko"?', opts: ['Ayok', 'Ayoko', 'Awko', 'Ayako'], ans: 1, exp: '"Ayoko" is the universal conversational contraction.' }
  },
  {
    num: 31,
    topic: 'Politeness & Respect: Po and Opo',
    cat: 'Particles & Enclitics' as const,
    title: 'The Hallmarks of Filipino Respect: Po and Opo',
    tTitle: 'Paggalang gamit ang Po at Opo',
    lvl: 'Beginner' as const,
    sum: 'Shows deep respect, humility, and warmth to elders, strangers, and customers.',
    form: 'Opo (Yes respectfully) | Po (inserted after the first or second word)',
    det: 'Use "po" in almost every interaction with strangers, store vendors, jeepney drivers, and elders. "Opo" is the respectful form of "Oo" (yes).',
    ex: [
      { tagalog: 'Salamat po nang marami!', english: 'Thank you very much (respectful)!', breakdown: 'Salamat (thanks) + po (respect marker) + nang marami (very much)' },
      { tagalog: 'Opo, naiintindihan ko po.', english: 'Yes, I understand (respectful).', breakdown: 'Opo (respectful yes) + naiintindihan ko po' }
    ],
    q: { q: 'When is it appropriate to use "po" and "opo"?', opts: ['Only when angry', 'When speaking to elders, strangers, and showing courtesy', 'Only in formal courtrooms', 'Never in Manila'], ans: 1, exp: '"Po" and "opo" are standard courteous expressions everywhere in the Philippines.' }
  },
  {
    num: 32,
    topic: 'Question Particle: Ba',
    cat: 'Particles & Enclitics' as const,
    title: 'The Yes/No Question Marker: Ba',
    tTitle: 'Ang Partikulong Ba sa Pagtatanong',
    lvl: 'Beginner' as const,
    sum: 'Transforms any affirmative statement directly into a polite inquiry.',
    form: 'Sentence + ba (after first content word or enclitic pronoun)',
    det: '"Kumain ka na" (You have eaten) becomes "Kumain ka na ba?" (Have you eaten?). It sits in the second position of the clause.',
    ex: [
      { tagalog: 'Pilipino ka ba?', english: 'Are you Filipino?', breakdown: 'Pilipino (Filipino) + ka (you) + ba (question particle)' },
      { tagalog: 'Masarap ba ang pagkain?', english: 'Is the food delicious?', breakdown: 'Masarap (delicious) + ba (question) + ang pagkain (the food)' }
    ],
    q: { q: 'Where does "ba" usually sit in the sentence?', opts: ['At the very end of the paragraph', 'Immediately following the first word or enclitic pronoun', 'At the very front', 'It doesn\'t matter'], ans: 1, exp: '"Ba" is an enclitic and adheres to strict second-position ordering.' }
  },
  {
    num: 33,
    topic: 'Temporal Enclitics: Na and Pa',
    cat: 'Particles & Enclitics' as const,
    title: 'Already (Na) vs. Still/Yet (Pa)',
    tTitle: 'Ang mga Partikulong Na at Pa',
    lvl: 'Beginner' as const,
    sum: 'Na indicates completion or change of state; Pa indicates ongoing continuation or addition.',
    form: 'Na (now / already) | Pa (still / yet / more)',
    det: 'Pairing with negations: "Hindi na" = no longer / not anymore. "Hindi pa" = not yet.',
    ex: [
      { tagalog: 'Busog na ako, pero kakain pa ako ng dessert.', english: 'I am already full, but I will still eat dessert.', breakdown: 'Busog na (full already) + kakain pa (will still eat)' },
      { tagalog: 'Hindi pa tapos ang klase.', english: 'The class is not yet finished.', breakdown: 'Hindi pa (not yet) + tapos (finished)' }
    ],
    q: { q: 'What does "Hindi pa" mean?', opts: ['Never again', 'Not yet', 'Already done', 'Always'], ans: 1, exp: '"Hindi pa" means not yet.' }
  },
  {
    num: 34,
    topic: 'Affirmative Particle: Nga',
    cat: 'Particles & Enclitics' as const,
    title: 'Affirmation & Emphasis: Nga',
    tTitle: 'Ang Partikulong Nga',
    lvl: 'Intermediate' as const,
    sum: 'Confirms "indeed, really, truly", or softens requests politely.',
    form: 'Oo nga (Yes indeed) | Pakiabot nga (Please pass it)',
    det: '"Oo nga" is used constantly in conversation to signal agreement ("You\'re so right"). With commands, it turns blunt orders into friendly requests.',
    ex: [
      { tagalog: 'Oo nga, napakaganda rito!', english: 'Yes indeed, it is so beautiful here!', breakdown: 'Oo nga (yes indeed) + napakaganda (so beautiful)' },
      { tagalog: 'Tingnan mo nga ito.', english: 'Please take a look at this.', breakdown: 'Tingnan mo (look at) + nga (softener) + ito (this)' }
    ],
    q: { q: 'How do Filipinos naturally say "Yes, that\'s right / indeed"?', opts: ['Oo nga', 'Hindi nga', 'Bakit nga', 'Wala nga'], ans: 0, exp: '"Oo nga" is the classic phrase of warm agreement.' }
  },
  {
    num: 35,
    topic: 'Realization Particle: Pala',
    cat: 'Particles & Enclitics' as const,
    title: 'Surprise & Sudden Realization: Pala',
    tTitle: 'Ang Partikulong Pala',
    lvl: 'Intermediate' as const,
    sum: 'Expresses unexpected discoveries or "Oh, I see now!".',
    form: 'Word + pala (Ikaw pala! = Oh, it\'s you!)',
    det: 'Use "pala" whenever you learn something contrary to your assumption: "Mura pala rito" (Oh, turns out it\'s cheap here!).',
    ex: [
      { tagalog: 'Nandito ka pala!', english: 'Oh, you are here after all!', breakdown: 'Nandito ka (you are here) + pala (surprise marker)' },
      { tagalog: 'Guro pala ang kapatid mo.', english: 'Oh, turns out your sibling is a teacher.', breakdown: 'Guro (teacher) + pala (realization)' }
    ],
    q: { q: 'Which particle expresses unexpected discovery or pleasant surprise?', opts: ['Pala', 'Daw', 'Sana', 'Bakit'], ans: 0, exp: '"Pala" is the marker of discovery and pleasant surprise.' }
  },
  {
    num: 36,
    topic: 'Contrast & Softener: Naman',
    cat: 'Particles & Enclitics' as const,
    title: 'Contrast, Reciprocity & Softener: Naman',
    tTitle: 'Ang Partikulong Naman',
    lvl: 'Intermediate' as const,
    sum: 'One of the most versatile Filipino particles: shifts focus ("how about..."), returns feelings, or softens pleas.',
    form: 'Word + naman (Ikaw naman = Your turn now; Salamat naman = What a relief)',
    det: 'When someone says "Kumusta ka?", replying "Mabuti naman" adds warmth and relief.',
    ex: [
      { tagalog: 'Mabuti naman ako, ikaw naman?', english: 'I am doing well, how about you?', breakdown: 'Mabuti naman (well indeed) + ikaw naman (you in turn)' },
      { tagalog: 'Huwag ka namang magalit.', english: 'Please don\'t be mad.', breakdown: 'Huwag (don\'t) + ka (you) + namang (softener) + magalit (be angry)' }
    ],
    q: { q: 'What does "ikaw naman" mean during a conversation?', opts: ['You are wrong', 'Your turn now / How about you?', 'Never you', 'Only you'], ans: 1, exp: '"Naman" marks reciprocity or switching turns.' }
  },
  {
    num: 37,
    topic: 'Hopes & Desires: Sana',
    cat: 'Particles & Enclitics' as const,
    title: 'Wishes and Hopes: Sana',
    tTitle: 'Ang Partikulong Sana',
    lvl: 'Beginner' as const,
    sum: 'Expresses "I hope so", "hopefully", or wistful longing.',
    form: 'Sana + predicate / statement (Sana all, Sana magkita tayo)',
    det: 'Famously popularized in modern Philippine pop culture as the idiom "Sana all" (Wishing everyone had such good luck/love!).',
    ex: [
      { tagalog: 'Sana pumasa ako sa pagsusulit.', english: 'I hope I pass the exam.', breakdown: 'Sana (I hope) + pumasa ako (I pass) + sa pagsusulit (in the exam)' },
      { tagalog: 'Mag-ingat ka sana palagi.', english: 'May you always stay safe.', breakdown: 'Mag-ingat ka (stay safe) + sana (wish) + palagi (always)' }
    ],
    q: { q: 'What particle expresses hope or wishful longing?', opts: ['Sana', 'Daw', 'Kasi', 'Kaya'], ans: 0, exp: '"Sana" conveys sincere hopes and polite wishes.' }
  },
  {
    num: 38,
    topic: 'Reported Speech: Daw and Raw',
    cat: 'Particles & Enclitics' as const,
    title: 'Hearsay & Reported Speech: Daw / Raw',
    tTitle: 'Ang Partikulong Daw at Raw',
    lvl: 'Intermediate' as const,
    sum: 'Attributing information to someone else ("they say", "allegedly", "according to him/her").',
    form: 'daw (after consonants) | raw (after vowels)',
    det: 'Use "raw" if the preceding word ends in a vowel (Maganda raw). Use "daw" if it ends in a consonant (Masarap daw).',
    ex: [
      { tagalog: 'Sasama raw siya bukas.', english: 'He/she says he/she will join tomorrow.', breakdown: 'Sasama (will join) + raw (hearsay after vowel) + siya (he/she)' },
      { tagalog: 'Masarap daw ang kape sa Batangas.', english: 'They say the coffee in Batangas is delicious.', breakdown: 'Masarap (delicious) + daw (hearsay after consonant) + ang kape' }
    ],
    q: { q: 'Why is "raw" used in "Pupunta raw siya"?', opts: ['Because "pupunta" ends in a vowel', 'Because it is past tense', 'Because it is a question', 'It is random'], ans: 0, exp: 'The "d" softens to "r" following vowel endings.' }
  },
  {
    num: 39,
    topic: 'Sequential Particle: Muna',
    cat: 'Particles & Enclitics' as const,
    title: 'Prior Action: Muna',
    tTitle: 'Ang Partikulong Muna',
    lvl: 'Beginner' as const,
    sum: 'Specifies doing something "first / for the meantime / beforehand".',
    form: 'Verb + muna (Kumain muna tayo = Let us eat first)',
    det: 'Essential when asking someone to pause: "Sandali muna" (Wait just a moment first).',
    ex: [
      { tagalog: 'Teka muna, mag-isip tayo.', english: 'Wait first, let us think.', breakdown: 'Teka muna (wait first) + mag-isip tayo (let us think)' },
      { tagalog: 'Magpahinga ka muna bago umalis.', english: 'Rest first before leaving.', breakdown: 'Magpahinga ka muna (rest first) + bago umalis (before leaving)' }
    ],
    q: { q: 'What does "Teka muna" mean in daily Tagalog?', opts: ['Hurry up', 'Wait a moment first', 'Go away', 'Goodbye forever'], ans: 1, exp: '"Teka muna" is the ubiquitous colloquial phrase for "wait a moment first".' }
  },
  {
    num: 40,
    topic: 'Pseudoverb: Gusto and Nais',
    cat: 'Sentences & Syntax' as const,
    title: 'Desire and Preference: Gusto & Nais',
    tTitle: 'Mga Pandiwang Pantulong: Gusto at Nais',
    lvl: 'Beginner' as const,
    sum: 'Expresses "to want, to like, to desire".',
    form: 'Gusto + ng-pronoun + verb/object (Gusto kong magkape)',
    det: 'The person who wants must be in the "ng" set: Gusto ko (I want), Gusto mo (You want), Gusto niya (He/she wants).',
    ex: [
      { tagalog: 'Gusto kong matutong magsalita ng Tagalog.', english: 'I want to learn how to speak Tagalog.', breakdown: 'Gusto ko + -ng (I want) + matuto (to learn)' },
      { tagalog: 'Gusto mo ba ng manggang hinog?', english: 'Do you want ripe mangoes?', breakdown: 'Gusto mo ba (do you want) + ng mangga (mangoes)' }
    ],
    q: { q: 'Which pronoun pairs correctly with "Gusto" to say "I want"?', opts: ['Ako', 'Ko', 'Akin', 'Sa akin'], ans: 1, exp: 'Pseudoverb "gusto" requires the ng-set actor pronoun "ko".' }
  },
  {
    num: 41,
    topic: 'Pseudoverb: Kailangan',
    cat: 'Sentences & Syntax' as const,
    title: 'Necessity: Kailangan',
    tTitle: 'Pangangailangan: Kailangan',
    lvl: 'Beginner' as const,
    sum: 'Expresses "need to / must / have to".',
    form: 'Kailangan + actor + -ng + verb (Kailangan kong mag-aral)',
    det: 'Connects to subsequent verbs with the ligature -ng or na: "Kailangan nating magtulungan" (We need to help each other).',
    ex: [
      { tagalog: 'Kailangan nating gumising nang maaga.', english: 'We need to wake up early.', breakdown: 'Kailangan (need) + nating (we) + gumising (wake up) + maaga (early)' },
      { tagalog: 'Kailangan mo ba ng tulong?', english: 'Do you need help?', breakdown: 'Kailangan mo ba (do you need) + ng tulong (help)' }
    ],
    q: { q: 'How do you say "I need to go now"?', opts: ['Kailangan akong pumunta', 'Kailangan kong umalis na', 'Kailangan ko alis', 'Dapat ako'], ans: 1, exp: '"Kailangan kong umalis na" uses proper pronoun and aspect.' }
  },
  {
    num: 42,
    topic: 'Pseudoverb: Dapat',
    cat: 'Sentences & Syntax' as const,
    title: 'Moral Obligation: Dapat',
    tTitle: 'Tungkulin at Obligasyon: Dapat',
    lvl: 'Intermediate' as const,
    sum: 'Expresses moral duty, advice, or "should / ought to".',
    form: 'Dapat + ang-pronoun / ng-pronoun + verb (Dapat kang mag-ingat)',
    det: 'Stronger than a mere suggestion, "dapat" appeals to right conduct and ethical obligation.',
    ex: [
      { tagalog: 'Dapat tayong maging magalang sa nakatatanda.', english: 'We should be respectful to elders.', breakdown: 'Dapat tayong (we should) + maging magalang (be respectful)' },
      { tagalog: 'Dapat mong sabihin ang totoo.', english: 'You ought to tell the truth.', breakdown: 'Dapat mong (you should) + sabihin ang totoo (tell the truth)' }
    ],
    q: { q: 'What nuance does "dapat" carry compared to "puwede"?', opts: ['Permission', 'Moral duty / should', 'Inability', 'Questioning'], ans: 1, exp: '"Dapat" expresses duty and obligation.' }
  },
  {
    num: 43,
    topic: 'Pseudoverb: Puwede and Maaari',
    cat: 'Sentences & Syntax' as const,
    title: 'Possibility & Permission: Puwede & Maaari',
    tTitle: 'Pahintulot at Posibilidad: Puwede at Maaari',
    lvl: 'Beginner' as const,
    sum: 'Expresses "can / may / possible / permissible".',
    form: 'Puwede + ba + pronoun (Puwede bang magtanong?)',
    det: '"Puwede" (from Spanish puede) is the casual conversational choice; "Maaari" is the formal Tagalog equivalent.',
    ex: [
      { tagalog: 'Puwede po bang magtanong?', english: 'May I please ask a question?', breakdown: 'Puwede po bang (may I please) + magtanong (ask question)' },
      { tagalog: 'Maaari kang magpahinga rito.', english: 'You may rest here.', breakdown: 'Maaari kang (you may) + magpahinga (rest)' }
    ],
    q: { q: 'What is the polite phrase to ask "May I ask a question?"', opts: ['Bawal magtanong', 'Puwede po bang magtanong?', 'Ayaw magtanong', 'Huwag magtanong'], ans: 1, exp: '"Puwede po bang magtanong?" is courteous and idiomatic.' }
  },
  {
    num: 44,
    topic: 'Interrogatives: Question Words',
    cat: 'Sentences & Syntax' as const,
    title: 'The Core Interrogatives: Ano, Sino, Saan, Kailan, Bakit, Paano',
    tTitle: 'Mga Salitang Pananong',
    lvl: 'Beginner' as const,
    sum: 'Master the fundamental question words of everyday conversation.',
    form: 'Ano (What), Sino (Who), Saan (Where), Kailan (When), Bakit (Why), Paano (How)',
    det: 'Remember that "Saan" asks for location of an action (Saan ka pupunta?), while "Nasaan" asks for location of an object or person (Nasaan ang susi?).',
    ex: [
      { tagalog: 'Sino ang kasama mo kanina?', english: 'Who was with you earlier?', breakdown: 'Sino (who) + ang kasama mo (your companion) + kanina (earlier)' },
      { tagalog: 'Paano pumunta sa pinakamalapit na istasyon?', english: 'How do you get to the nearest station?', breakdown: 'Paano (how) + pumunta (to go) + sa istasyon (to the station)' }
    ],
    q: { q: 'What is the difference between "Saan" and "Nasaan"?', opts: ['No difference', '"Saan" asks for place of action; "Nasaan" asks where someone/something is located right now', '"Saan" means who', '"Nasaan" is only past tense'], ans: 1, exp: '"Nasaan" specifically locates physical items or people right now.' }
  },
  {
    num: 45,
    topic: 'Asking Quantities: Ilan vs. Magkano',
    cat: 'Sentences & Syntax' as const,
    title: 'Counting: Ilan (Items) vs. Magkano (Price)',
    tTitle: 'Pagtatanong ng Dami: Ilan at Magkano',
    lvl: 'Beginner' as const,
    sum: 'Ilan asks for countable quantities; Magkano asks specifically for prices.',
    form: 'Ilan ang kailangan mo? (How many?) | Magkano ito? (How much is this?)',
    det: 'At markets and shops, "Magkano po ito?" is the number one most useful shopping question in the Philippines.',
    ex: [
      { tagalog: 'Magkano po ang isang kilong mangga?', english: 'How much is one kilo of mangoes, please?', breakdown: 'Magkano po (how much) + isang kilo (one kilo) + ng mangga' },
      { tagalog: 'Ilang kapatid mayroon ka?', english: 'How many siblings do you have?', breakdown: 'Ilang (how many) + kapatid (siblings) + mayroon ka (do you have)' }
    ],
    q: { q: 'Which word do you use to ask the price of goods in a shop?', opts: ['Ilan', 'Magkano', 'Paano', 'Bakit'], ans: 1, exp: '"Magkano" specifically inquires about money and prices.' }
  },
  {
    num: 46,
    topic: 'Numbers & Hybrid Tagalog/Spanish Counting',
    cat: 'Colloquial & Everyday' as const,
    title: 'Numbers: Isa, Dalawa, Tatlo & Spanish Borrowings',
    tTitle: 'Mga Bilang sa Tagalog at Kastila',
    lvl: 'Beginner' as const,
    sum: 'Filipinos use native Tagalog numbers for counting items and Spanish loans for prices and time.',
    form: 'Native: isa (1), dalawa (2), tatlo (3), apat (4), lima (5), anim (6), pito (7), walo (8), siyam (9), sampu (10)',
    det: 'For counting people or items, native Tagalog numbers reign (dalawang tao = two people). For money over 20 pesos, Spanish numbers are customary (singkuwenta pesos = 50 pesos).',
    ex: [
      { tagalog: 'Bumili ako ng tatlong pirasong pandesal.', english: 'I bought three pieces of pandesal bread.', breakdown: 'Bumili (bought) + tatlong piraso (three pieces)' },
      { tagalog: 'Beinte pesos ang pamasahe.', english: 'The fare is twenty pesos.', breakdown: 'Beinte pesos (20 pesos) + ang pamasahe (the fare)' }
    ],
    q: { q: 'What is the Tagalog number for "five"?', opts: ['Apat', 'Lima', 'Anim', 'Pito'], ans: 1, exp: 'Lima is the Tagalog word for 5.' }
  },
  {
    num: 47,
    topic: 'Telling Time: Alas-dos and Oras',
    cat: 'Colloquial & Everyday' as const,
    title: 'Telling Time: Alas + Number',
    tTitle: 'Pagsasabi ng Oras (Alas-...)',
    lvl: 'Beginner' as const,
    sum: 'Hours are indicated using the Spanish prefix "alas-" (or "ala-una" for 1 o\'clock).',
    form: 'Ala-una (1:00) | Alas-dos (2:00) | Alas-tres (3:00) | Alas-kuwatro (4:00)',
    det: 'Time markers follow: ng umaga (in the morning), ng tanghali (at noon), ng hapon (in the afternoon), ng gabi (at night). E.g. Alas-otso ng gabi = 8:00 PM.',
    ex: [
      { tagalog: 'Alas-siyete ng umaga magsisimula ang klase.', english: 'Class will start at 7:00 in the morning.', breakdown: 'Alas-siyete (7:00) + ng umaga (morning) + magsisimula (will start)' },
      { tagalog: 'Anong oras na po?', english: 'What time is it now, please?', breakdown: 'Anong oras na (what time now) + po (polite)' }
    ],
    q: { q: 'How do you say "1:00" in Filipino time?', opts: ['Alas-isa', 'Ala-una', 'Alas-una', 'Uno oras'], ans: 1, exp: '"Ala-una" is the singular exception to the "alas-" prefix.' }
  },
  {
    num: 48,
    topic: 'Adjective Formation: Ma- Prefix',
    cat: 'Adjectives & Modifiers' as const,
    title: 'Forming Adjectives with Ma-',
    tTitle: 'Pang-uring May Panlaping Ma-',
    lvl: 'Beginner' as const,
    sum: 'Prefixing ma- to noun roots creates descriptive adjectives.',
    form: 'ma- + noun root (ganda -> maganda = beautiful; sarap -> masarap = delicious)',
    det: 'Root nouns become adjectives with ease: bait (kindness) -> mabait (kind); init (heat) -> mainit (hot); lamig (cold) -> malamig (cold).',
    ex: [
      { tagalog: 'Napakabait ng pamilya nila.', english: 'Their family is extraordinarily kind.', breakdown: 'Napaka-bait (so kind) + ng pamilya nila (their family)' },
      { tagalog: 'Masarap at sariwa ang prutas.', english: 'The fruit is delicious and fresh.', breakdown: 'Masarap (delicious) + at (and) + sariwa (fresh)' }
    ],
    q: { q: 'What adjective is formed by adding "ma-" to the root "sarap" (flavor/taste)?', opts: ['Masarap', 'Magsarap', 'Pagsarap', 'Sumarap'], ans: 0, exp: 'Masarap means delicious or flavorful.' }
  },
  {
    num: 49,
    topic: 'Comparison: Mas, Pinaka-, and Kasing-',
    cat: 'Adjectives & Modifiers' as const,
    title: 'Degrees of Comparison: Mas, Pinaka-, Kasing-',
    tTitle: 'Kaantasan ng Pang-uri',
    lvl: 'Intermediate' as const,
    sum: 'Comparative (mas = more), Superlative (pinaka- = most), and Equal (kasing- = as... as).',
    form: 'Mas + adjective (more) | Pinaka- + adjective (most) | Kasing- + root (equal)',
    det: 'To express equality: "Kasingtangkad mo si Kuya" (Older brother is as tall as you). To express superlative: "Siya ang pinakamagaling" (He is the best).',
    ex: [
      { tagalog: 'Mas mabilis ang tren kaysa sa bus.', english: 'The train is faster than the bus.', breakdown: 'Mas mabilis (faster) + kaysa sa (than)' },
      { tagalog: 'Ito ang pinakamasarap na mangga sa buong mundo.', english: 'This is the most delicious mango in the whole world.', breakdown: 'Pinaka-masarap (most delicious)' }
    ],
    q: { q: 'Which prefix indicates the superlative degree (the "most" of something)?', opts: ['Mas', 'Pinaka-', 'Medyo', 'Kasing-'], ans: 1, exp: '"Pinaka-" indicates the absolute superlative.' }
  },
  {
    num: 50,
    topic: 'Gerunds & Verbal Nouns: Ang Pag-',
    cat: 'Colloquial & Everyday' as const,
    title: 'Verbal Nouns & Gerunds: Ang Pag-...',
    tTitle: 'Pangngalang Pandiwa (Pag- + Salitang-Ugat)',
    lvl: 'Intermediate' as const,
    sum: 'Turns actions into abstract nouns and processes (e.g. studying, cooking, traveling).',
    form: 'ang pag- + root (pag-aaral = studying, paglalakbay = journey, pagluluto = cooking)',
    det: 'Verbal nouns reduplicate the root\'s first syllable when describing the active process: "Ang pag-aaral ng Tagalog ay masaya" (Studying Tagalog is fun).',
    ex: [
      { tagalog: 'Ang pag-aaral ng bagong wika ay nagbubukas ng pinto.', english: 'Studying a new language opens doors.', breakdown: 'Ang pag-aa-ral (the studying) + ng bagong wika (of new language)' },
      { tagalog: 'Mahilig siya sa pagluluto ng kakanin.', english: 'He/she loves cooking traditional rice cakes.', breakdown: 'Mahilig (fond of) + sa pagluluto (in cooking)' }
    ],
    q: { q: 'What does "Ang pagluluto" mean as a verbal noun?', opts: ['To have cooked', 'The act of cooking', 'Cooked food', 'The stove'], ans: 1, exp: 'Pag- transforms the verb into the verbal noun / gerund.' }
  }
];

// Append remaining topics into the main exported array
additionalGrammarTopicsData.forEach(item => {
  grammarExercises.push({
    id: `grammar-${item.num}`,
    topicNumber: item.num,
    topic: item.topic,
    category: item.cat,
    title: item.title,
    tagalogTitle: item.tTitle,
    level: item.lvl,
    summary: item.sum,
    formula: item.form,
    detailedExplanation: item.det,
    examples: item.ex,
    quiz: [
      {
        id: `q-${item.num}-1`,
        question: item.q.q,
        options: item.q.opts,
        correctIndex: item.q.ans,
        explanation: item.q.exp
      }
    ]
  });
});
