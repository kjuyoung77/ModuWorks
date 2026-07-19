// ===== 공유 데이터·설정 (index.html · country.html 공용) =====
// ⚠️ anon/publishable(공개) 키만 프론트에. service_role(비밀) 키는 절대 금지 — 데이터는 RLS가 지킴.
const SB_URL = "https://gfpbvtcaxozcvoqfhxps.supabase.co";
const SB_KEY = "sb_publishable_rdSZJSTgLwHslFTTnnnchA_39UC1P36";   // Publishable(공개) 키 — 브라우저 안전, RLS가 데이터 보호
const sb = (window.supabase && !SB_KEY.startsWith("여기에")) ? window.supabase.createClient(SB_URL, SB_KEY) : null;

// landmark = 위키백과 문서명(ko/en) → 히어로 사진·명소 해설. fun = 재미있는 사실.
const COUNTRIES = [
  { id:1, name:"대한민국", nameEn:"South Korea", flag:"🇰🇷", capital:"서울", capitalEn:"Seoul", region:"아시아", population:51700000, area:100210, languages:"한국어", languagesEn:"Korean", religion:"무종교·개신교·불교·가톨릭", religionEn:"None·Protestant·Buddhist·Catholic", currency:"원 (KRW)", currencyEn:"Won (KRW)", dial:"+82", desc:"정보통신 강국이자 K-컬처의 중심. 삼면이 바다인 반도 국가.", descEn:"A tech powerhouse and the heart of K-culture — a peninsula bordered by sea on three sides.", landmark:"광화문", landmarkEn:"Gwanghwamun", heroPos:"center 42%", fun:"한글은 1443년 세종대왕이 창제해, 세계에서 유일하게 만든 사람과 반포일·원리가 기록된 문자예요.", funEn:"Hangul, created in 1443 by King Sejong, is the only writing system whose inventor, promulgation date, and design principles are all on record." },
  { id:2, name:"일본", nameEn:"Japan", flag:"🇯🇵", capital:"도쿄", capitalEn:"Tokyo", region:"아시아", population:124000000, area:377975, languages:"일본어", languagesEn:"Japanese", religion:"신토·불교", religionEn:"Shinto·Buddhist", currency:"엔 (JPY)", currencyEn:"Yen (JPY)", dial:"+81", desc:"약 14,000개의 섬으로 이루어진 섬나라. 지진 대비 기술이 발달.", descEn:"An island nation of about 14,000 islands, with highly developed earthquake-preparedness technology.", landmark:"후지산", landmarkEn:"Mount Fuji", heroPos:"center 30%", fun:"환태평양 조산대에 있어 전 세계 지진의 상당수가 일본 주변에서 일어나요. 자판기 밀도도 세계 최고 수준.", funEn:"Sitting on the Pacific Ring of Fire, Japan sees a large share of the world's earthquakes — and has one of the highest vending-machine densities on Earth." },
  { id:3, name:"중국", nameEn:"China", flag:"🇨🇳", capital:"베이징", capitalEn:"Beijing", region:"아시아", population:1410000000, area:9596960, languages:"중국어(표준어)", languagesEn:"Chinese (Mandarin)", religion:"무종교·불교·도교", religionEn:"None·Buddhist·Taoist", currency:"위안 (CNY)", currencyEn:"Yuan (CNY)", dial:"+86", desc:"세계에서 인구가 가장 많은 나라 중 하나이자 면적 세계 4위권.", descEn:"One of the world's most populous countries and the 4th largest by area.", landmark:"만리장성", landmarkEn:"Great Wall of China", fun:"만리장성은 이어 붙이면 2만 km가 넘지만, 흔한 오해와 달리 우주에서 맨눈으로 보이지는 않아요.", funEn:"The Great Wall stretches over 20,000 km when joined, but contrary to popular belief it can't be seen with the naked eye from space." },
  { id:4, name:"인도", nameEn:"India", flag:"🇮🇳", capital:"뉴델리", capitalEn:"New Delhi", region:"아시아", population:1428000000, area:3287263, languages:"힌디어·영어 외", languagesEn:"Hindi·English & more", religion:"힌두교·이슬람교", religionEn:"Hindu·Muslim", currency:"루피 (INR)", currencyEn:"Rupee (INR)", dial:"+91", desc:"2023년 세계 인구 1위. 22개 공용어가 헌법에 등재된 다언어 국가.", descEn:"The world's most populous country as of 2023, with 22 official languages in its constitution.", landmark:"타지마할", landmarkEn:"Taj Mahal", fun:"숫자 0과 십진법 체계를 발전시킨 수학의 나라. 영화 산업(발리우드)은 연간 제작 편수 세계 최다.", funEn:"The land that developed zero and the decimal system. Its film industry (Bollywood) produces the most films per year in the world." },
  { id:5, name:"태국", nameEn:"Thailand", flag:"🇹🇭", capital:"방콕", capitalEn:"Bangkok", region:"아시아", population:71700000, area:513120, languages:"태국어", languagesEn:"Thai", religion:"불교(상좌부)", religionEn:"Buddhist (Theravada)", currency:"바트 (THB)", currencyEn:"Baht (THB)", dial:"+66", desc:"'미소의 나라'. 동남아에서 식민 지배를 받지 않은 유일한 나라.", descEn:"The 'Land of Smiles' — the only Southeast Asian nation never colonized.", landmark:"왓 아룬", landmarkEn:"Wat Arun", fun:"수도 방콕의 정식 이름은 세계에서 가장 긴 지명이에요. '태국(Thai)'은 '자유'라는 뜻.", funEn:"Bangkok's full ceremonial name is the longest place name in the world. 'Thai' means 'free.'" },
  { id:6, name:"베트남", nameEn:"Vietnam", flag:"🇻🇳", capital:"하노이", capitalEn:"Hanoi", region:"아시아", population:98900000, area:331212, languages:"베트남어", languagesEn:"Vietnamese", religion:"무종교·불교", religionEn:"None·Buddhist", currency:"동 (VND)", currencyEn:"Dong (VND)", dial:"+84", desc:"쌀국수(퍼)와 커피로 유명. 남북으로 길게 뻗은 지형.", descEn:"Famous for pho and coffee, with a long north-south geography.", landmark:"하롱베이", landmarkEn:"Ha Long Bay", fun:"세계 2위 커피 수출국이에요. 연유를 넣은 진한 베트남 커피가 유명.", funEn:"The world's 2nd-largest coffee exporter, known for strong Vietnamese coffee served with condensed milk." },
  { id:7, name:"인도네시아", nameEn:"Indonesia", flag:"🇮🇩", capital:"자카르타", capitalEn:"Jakarta", region:"아시아", population:277000000, area:1904569, languages:"인도네시아어", languagesEn:"Indonesian", religion:"이슬람교", religionEn:"Muslim", currency:"루피아 (IDR)", currencyEn:"Rupiah (IDR)", dial:"+62", desc:"1만 7천여 개 섬으로 이루어진 세계 최대의 도서(섬) 국가.", descEn:"The world's largest archipelagic nation, made up of over 17,000 islands.", landmark:"보로부두르", landmarkEn:"Borobudur", fun:"1만 7천여 개 섬 중 사람이 사는 곳은 약 6천 개. 지역 언어가 700개가 넘어요.", funEn:"Of its 17,000+ islands, about 6,000 are inhabited, and it has more than 700 local languages." },
  { id:8, name:"사우디아라비아", nameEn:"Saudi Arabia", flag:"🇸🇦", capital:"리야드", capitalEn:"Riyadh", region:"아시아", population:36900000, area:2149690, languages:"아랍어", languagesEn:"Arabic", religion:"이슬람교", religionEn:"Muslim", currency:"리얄 (SAR)", currencyEn:"Riyal (SAR)", dial:"+966", desc:"이슬람 성지 메카·메디나가 있는 나라. 세계적인 산유국.", descEn:"Home to the Islamic holy cities of Mecca and Medina, and a leading oil producer.", landmark:"메카", landmarkEn:"Mecca", fun:"국토 대부분이 사막이라 1년 내내 흐르는 강이 하나도 없는 나라예요.", funEn:"Mostly desert, it's one of the only countries with no permanent rivers at all." },
  { id:9, name:"프랑스", nameEn:"France", flag:"🇫🇷", capital:"파리", capitalEn:"Paris", region:"유럽", population:68000000, area:551695, languages:"프랑스어", languagesEn:"French", religion:"가톨릭·무종교", religionEn:"Catholic·None", currency:"유로 (EUR)", currencyEn:"Euro (EUR)", dial:"+33", desc:"세계에서 관광객이 가장 많이 찾는 나라. 예술과 요리의 중심.", descEn:"The world's most-visited country — a center of art and cuisine.", landmark:"에펠탑", landmarkEn:"Eiffel Tower", fun:"에펠탑은 1889년 만국박람회용 임시 구조물로, 원래 20년 뒤 철거될 예정이었어요. 관광객 세계 1위 국가.", funEn:"The Eiffel Tower was a temporary structure for the 1889 World's Fair, meant to be dismantled 20 years later. France is the #1 tourist destination." },
  { id:10, name:"독일", nameEn:"Germany", flag:"🇩🇪", capital:"베를린", capitalEn:"Berlin", region:"유럽", population:84000000, area:357588, languages:"독일어", languagesEn:"German", religion:"개신교·가톨릭", religionEn:"Protestant·Catholic", currency:"유로 (EUR)", currencyEn:"Euro (EUR)", dial:"+49", desc:"유럽 최대 경제국. 자동차·기계 산업과 맥주 축제로 유명.", descEn:"Europe's largest economy, famous for its auto and machinery industries and its beer festival.", landmark:"브란덴부르크 문", landmarkEn:"Brandenburg Gate", fun:"고속도로 아우토반의 일부 구간은 공식 속도 제한이 없어요. 빵 종류가 3천 가지가 넘습니다.", funEn:"Parts of the Autobahn have no official speed limit, and Germany has over 3,000 kinds of bread." },
  { id:11, name:"영국", nameEn:"United Kingdom", flag:"🇬🇧", capital:"런던", capitalEn:"London", region:"유럽", population:67000000, area:242495, languages:"영어", languagesEn:"English", religion:"개신교(성공회)·무종교", religionEn:"Protestant (Anglican)·None", currency:"파운드 (GBP)", currencyEn:"Pound (GBP)", dial:"+44", desc:"산업혁명의 발상지. 잉글랜드·스코틀랜드·웨일스·북아일랜드의 연합.", descEn:"Birthplace of the Industrial Revolution — a union of England, Scotland, Wales, and Northern Ireland.", landmark:"빅 벤", landmarkEn:"Big Ben", fun:"'빅 벤'은 사실 시계탑이 아니라 그 안에 달린 큰 종의 이름이에요. 지금도 도로 좌측통행.", funEn:"'Big Ben' is actually the name of the great bell inside the tower, not the tower itself. Traffic still drives on the left." },
  { id:12, name:"이탈리아", nameEn:"Italy", flag:"🇮🇹", capital:"로마", capitalEn:"Rome", region:"유럽", population:59000000, area:301340, languages:"이탈리아어", languagesEn:"Italian", religion:"가톨릭", religionEn:"Catholic", currency:"유로 (EUR)", currencyEn:"Euro (EUR)", dial:"+39", desc:"로마 제국과 르네상스의 본고장. 파스타·피자의 나라.", descEn:"Home of the Roman Empire and the Renaissance — the land of pasta and pizza.", landmark:"콜로세움", landmarkEn:"Colosseum", fun:"유네스코 세계유산이 세계에서 가장 많은 나라 중 하나예요. 피자·파스타의 본고장.", funEn:"It has one of the highest counts of UNESCO World Heritage Sites in the world, and is the birthplace of pizza and pasta." },
  { id:13, name:"스페인", nameEn:"Spain", flag:"🇪🇸", capital:"마드리드", capitalEn:"Madrid", region:"유럽", population:48000000, area:505990, languages:"스페인어", languagesEn:"Spanish", religion:"가톨릭", religionEn:"Catholic", currency:"유로 (EUR)", currencyEn:"Euro (EUR)", dial:"+34", desc:"플라멩코와 축구, 가우디 건축으로 유명한 이베리아 반도의 나라.", descEn:"An Iberian nation famous for flamenco, football, and Gaudí's architecture.", landmark:"사그라다 파밀리아", landmarkEn:"Sagrada Família", fun:"가우디의 사그라다 파밀리아는 1882년 착공해 140여 년째 건축 중이에요. 오후 낮잠(시에스타) 문화.", funEn:"Gaudí's Sagrada Família, begun in 1882, has been under construction for over 140 years. Spain is known for its afternoon siesta." },
  { id:14, name:"노르웨이", nameEn:"Norway", flag:"🇳🇴", capital:"오슬로", capitalEn:"Oslo", region:"유럽", population:5500000, area:385207, languages:"노르웨이어", languagesEn:"Norwegian", religion:"개신교(루터교)", religionEn:"Protestant (Lutheran)", currency:"크로네 (NOK)", currencyEn:"Krone (NOK)", dial:"+47", desc:"피오르와 백야로 유명. 삶의 질·복지 수준이 세계 최상위권.", descEn:"Famous for fjords and the midnight sun, with one of the highest qualities of life in the world.", landmark:"예이랑에르 피오르", landmarkEn:"Geirangerfjord", fun:"여름엔 해가 지지 않는 백야, 겨울엔 오로라를 볼 수 있어요. 전기차 보급률 세계 최고 수준.", funEn:"In summer the sun never sets; in winter you can see the aurora. It has one of the world's highest EV-adoption rates." },
  { id:15, name:"바티칸 시국", nameEn:"Vatican City", flag:"🇻🇦", capital:"바티칸 시(도시국가)", capitalEn:"Vatican City (city-state)", region:"유럽", population:825, area:0.49, languages:"라틴어·이탈리아어", languagesEn:"Latin·Italian", religion:"가톨릭", religionEn:"Catholic", currency:"유로 (EUR)", currencyEn:"Euro (EUR)", dial:"+379", desc:"세계에서 가장 작은 독립국. 가톨릭 교회의 중심인 성좌.", descEn:"The world's smallest independent state and the seat of the Catholic Church.", landmark:"성 베드로 대성전", landmarkEn:"St. Peter's Basilica", fun:"세계에서 가장 작은 나라(약 0.49km²)로, 인구 대부분이 성직자예요. 자체 우체국도 있어요.", funEn:"The smallest country on Earth (about 0.49 km²), where most residents are clergy. It even has its own post office." },
  { id:16, name:"미국", nameEn:"United States", flag:"🇺🇸", capital:"워싱턴 D.C.", capitalEn:"Washington, D.C.", region:"북아메리카", population:335000000, area:9833517, languages:"영어(사실상)", languagesEn:"English (de facto)", religion:"개신교·가톨릭·무종교", religionEn:"Protestant·Catholic·None", currency:"달러 (USD)", currencyEn:"Dollar (USD)", dial:"+1", desc:"50개 주의 연방 국가. 세계 최대의 경제·문화 영향력.", descEn:"A federation of 50 states with the world's largest economic and cultural influence.", landmark:"자유의 여신상", landmarkEn:"Statue of Liberty", fun:"국립공원 제도를 세계 최초로 만든 나라예요(옐로스톤, 1872년). 50개 주의 연방국.", funEn:"It created the world's first national park (Yellowstone, 1872). A federation of 50 states." },
  { id:17, name:"캐나다", nameEn:"Canada", flag:"🇨🇦", capital:"오타와", capitalEn:"Ottawa", region:"북아메리카", population:39000000, area:9984670, languages:"영어·프랑스어", languagesEn:"English·French", religion:"가톨릭·개신교·무종교", religionEn:"Catholic·Protestant·None", currency:"캐나다달러 (CAD)", currencyEn:"Canadian Dollar (CAD)", dial:"+1", desc:"면적 세계 2위. 광활한 자연과 다문화 사회로 유명.", descEn:"The 2nd-largest country by area, known for vast nature and a multicultural society.", landmark:"나이아가라 폭포", landmarkEn:"Niagara Falls", fun:"전 세계 호수의 절반 이상이 캐나다에 있을 만큼 호수가 많아요. 국토 면적 세계 2위.", funEn:"More than half of all the world's lakes are in Canada. It's the 2nd-largest country by land area." },
  { id:18, name:"멕시코", nameEn:"Mexico", flag:"🇲🇽", capital:"멕시코시티", capitalEn:"Mexico City", region:"북아메리카", population:128000000, area:1964375, languages:"스페인어", languagesEn:"Spanish", religion:"가톨릭", religionEn:"Catholic", currency:"페소 (MXN)", currencyEn:"Peso (MXN)", dial:"+52", desc:"마야·아즈텍 문명의 후예. 타코와 활기찬 축제 문화.", descEn:"Heir to the Maya and Aztec civilizations, with tacos and vibrant festivals.", landmark:"치첸이트사", landmarkEn:"Chichen Itza", fun:"초콜릿·옥수수·토마토·고추의 원산지예요. 마야·아즈텍 문명의 후예.", funEn:"The birthplace of chocolate, corn, tomatoes, and chili peppers, and heir to the Maya and Aztec civilizations." },
  { id:19, name:"브라질", nameEn:"Brazil", flag:"🇧🇷", capital:"브라질리아", capitalEn:"Brasília", region:"남아메리카", population:214000000, area:8515767, languages:"포르투갈어", languagesEn:"Portuguese", religion:"가톨릭·개신교", religionEn:"Catholic·Protestant", currency:"헤알 (BRL)", currencyEn:"Real (BRL)", dial:"+55", desc:"아마존 열대우림의 약 60%를 품은 남미 최대국. 축구와 삼바.", descEn:"South America's largest country, holding about 60% of the Amazon rainforest — football and samba.", landmark:"구세주 그리스도상", landmarkEn:"Christ the Redeemer (statue)", fun:"아마존 열대우림의 약 60%를 품은 나라. 축구 월드컵 최다 우승국(5회).", funEn:"It holds about 60% of the Amazon rainforest and has won the most World Cups (5)." },
  { id:20, name:"아르헨티나", nameEn:"Argentina", flag:"🇦🇷", capital:"부에노스아이레스", capitalEn:"Buenos Aires", region:"남아메리카", population:46000000, area:2780400, languages:"스페인어", languagesEn:"Spanish", religion:"가톨릭", religionEn:"Catholic", currency:"페소 (ARS)", currencyEn:"Peso (ARS)", dial:"+54", desc:"탱고의 고향. 소고기와 축구, 파타고니아의 대자연.", descEn:"The home of tango — beef, football, and the vast nature of Patagonia.", landmark:"이과수 폭포", landmarkEn:"Iguazu Falls", fun:"탱고의 발상지예요. 세계에서 가장 남쪽에 있는 도시(우수아이아)가 있어요.", funEn:"The birthplace of tango, and home to the world's southernmost city (Ushuaia)." },
  { id:21, name:"페루", nameEn:"Peru", flag:"🇵🇪", capital:"리마", capitalEn:"Lima", region:"남아메리카", population:34000000, area:1285216, languages:"스페인어·케추아어", languagesEn:"Spanish·Quechua", religion:"가톨릭", religionEn:"Catholic", currency:"솔 (PEN)", currencyEn:"Sol (PEN)", dial:"+51", desc:"잉카 문명의 마추픽추가 있는 나라. 안데스 산맥이 관통.", descEn:"Home to the Inca site of Machu Picchu, crossed by the Andes.", landmark:"마추픽추", landmarkEn:"Machu Picchu", fun:"잉카의 공중도시 마추픽추가 해발 2,430m에 있어요. 감자의 원산지로 품종이 수천 가지.", funEn:"The Inca sky-city Machu Picchu sits at 2,430 m. Peru is the birthplace of the potato, with thousands of varieties." },
  { id:22, name:"이집트", nameEn:"Egypt", flag:"🇪🇬", capital:"카이로", capitalEn:"Cairo", region:"아프리카", population:109000000, area:1010408, languages:"아랍어", languagesEn:"Arabic", religion:"이슬람교·콥트교", religionEn:"Muslim·Coptic", currency:"파운드 (EGP)", currencyEn:"Pound (EGP)", dial:"+20", desc:"기자의 대피라미드 등 고대 문명 유산. 나일강 문명의 발상지.", descEn:"Ancient heritage like the Great Pyramids of Giza — the cradle of Nile civilization.", landmark:"기자의 대피라미드", landmarkEn:"Great Pyramid of Giza", fun:"대피라미드는 약 4,500년 전 지어져, 세계 7대 불가사의 중 유일하게 지금까지 남아 있어요.", funEn:"Built about 4,500 years ago, the Great Pyramid is the only one of the Seven Wonders of the Ancient World still standing." },
  { id:23, name:"남아프리카 공화국", nameEn:"South Africa", flag:"🇿🇦", capital:"프리토리아·케이프타운·블룸폰테인", capitalEn:"Pretoria·Cape Town·Bloemfontein", region:"아프리카", population:60000000, area:1221037, languages:"11개 공용어", languagesEn:"11 official languages", religion:"개신교·가톨릭", religionEn:"Protestant·Catholic", currency:"랜드 (ZAR)", currencyEn:"Rand (ZAR)", dial:"+27", desc:"행정·입법·사법 수도가 세 도시로 나뉜 나라. 공용어가 11개.", descEn:"A nation with three capital cities for its executive, legislative, and judicial branches, and 11 official languages.", landmark:"테이블 산", landmarkEn:"Table Mountain", fun:"행정·입법·사법 수도가 세 도시로 나뉜 유일한 나라예요. 공용어가 무려 11개.", funEn:"The only country whose executive, legislative, and judicial capitals are three different cities — with 11 official languages." },
  { id:24, name:"케냐", nameEn:"Kenya", flag:"🇰🇪", capital:"나이로비", capitalEn:"Nairobi", region:"아프리카", population:55000000, area:580367, languages:"스와힐리어·영어", languagesEn:"Swahili·English", religion:"개신교·가톨릭", religionEn:"Protestant·Catholic", currency:"실링 (KES)", currencyEn:"Shilling (KES)", dial:"+254", desc:"사파리와 마사이마라 초원, 마라톤 강국으로 유명.", descEn:"Famous for safaris, the Maasai Mara plains, and marathon greatness.", landmark:"마사이마라 국립보호구", landmarkEn:"Maasai Mara", fun:"매년 수백만 마리 누 떼의 대이동이 펼쳐지는 마사이마라가 있어요. 세계적인 마라톤 강국.", funEn:"Home to the Maasai Mara, where millions of wildebeest migrate each year. A world powerhouse in marathon running." },
  { id:25, name:"호주", nameEn:"Australia", flag:"🇦🇺", capital:"캔버라", capitalEn:"Canberra", region:"오세아니아", population:26000000, area:7692024, languages:"영어(사실상)", languagesEn:"English (de facto)", religion:"기독교·무종교", religionEn:"Christian·None", currency:"호주달러 (AUD)", currencyEn:"Australian Dollar (AUD)", dial:"+61", desc:"나라이자 하나의 대륙. 캥거루·코알라 등 고유종의 보고.", descEn:"A country that is also a whole continent — a haven for unique species like kangaroos and koalas.", landmark:"시드니 오페라 하우스", landmarkEn:"Sydney Opera House", fun:"나라이자 하나의 대륙이에요. 사람보다 캥거루가 더 많다고 할 정도.", funEn:"It's a country and a continent at once — said to have more kangaroos than people." },
  { id:26, name:"뉴질랜드", nameEn:"New Zealand", flag:"🇳🇿", capital:"웰링턴", capitalEn:"Wellington", region:"오세아니아", population:5200000, area:268021, languages:"영어·마오리어", languagesEn:"English·Māori", religion:"기독교·무종교", religionEn:"Christian·None", currency:"뉴질랜드달러 (NZD)", currencyEn:"New Zealand Dollar (NZD)", dial:"+64", desc:"마오리 문화와 청정 자연. 『반지의 제왕』 촬영지로 유명.", descEn:"Māori culture and pristine nature — famous as the filming location for The Lord of the Rings.", landmark:"밀퍼드사운드", landmarkEn:"Milford Sound", fun:"사람보다 양이 훨씬 많은 나라예요. 『반지의 제왕』 촬영지로도 유명.", funEn:"A country with far more sheep than people, famous as the filming location for The Lord of the Rings." },
  { id:27, name:"필리핀", nameEn:"Philippines", flag:"🇵🇭", capital:"마닐라", capitalEn:"Manila", region:"아시아", population:117000000, area:300000, languages:"필리핀어·영어", languagesEn:"Filipino·English", religion:"가톨릭", religionEn:"Catholic", currency:"페소 (PHP)", currencyEn:"Peso (PHP)", dial:"+63", desc:"7천여 개 섬으로 이루어진 동남아 국가. 아시아 최대 가톨릭 국가.", descEn:"A Southeast Asian nation of over 7,000 islands and Asia's largest Catholic country.", landmark:"마욘 화산", landmarkEn:"Mayon Volcano", fun:"7,641개의 섬으로 이루어져 있어요. 영어를 공용어로 써 영어 사용 인구가 많습니다.", funEn:"Made up of 7,641 islands, with English as an official language and a large English-speaking population." },
  { id:28, name:"싱가포르", nameEn:"Singapore", flag:"🇸🇬", capital:"싱가포르(도시국가)", capitalEn:"Singapore (city-state)", region:"아시아", population:5900000, area:728, languages:"영어·중국어·말레이어·타밀어", languagesEn:"English·Chinese·Malay·Tamil", religion:"불교·기독교·이슬람교", religionEn:"Buddhist·Christian·Muslim", currency:"싱가포르달러 (SGD)", currencyEn:"Singapore Dollar (SGD)", dial:"+65", desc:"도시 전체가 하나의 나라인 도시국가. 금융·물류 허브.", descEn:"A city-state where the whole city is the country — a finance and logistics hub.", landmark:"마리나 베이 샌즈", landmarkEn:"Marina Bay Sands", fun:"길거리에 껌 판매·반입이 엄격히 규제되는 것으로 유명해요. 4개 공용어를 씁니다.", funEn:"Famous for its strict rules on chewing gum. It has four official languages." },
  { id:29, name:"튀르키예", nameEn:"Türkiye", flag:"🇹🇷", capital:"앙카라", capitalEn:"Ankara", region:"아시아", population:85000000, area:783562, languages:"튀르키예어", languagesEn:"Turkish", religion:"이슬람교", religionEn:"Muslim", currency:"리라 (TRY)", currencyEn:"Lira (TRY)", dial:"+90", desc:"아시아와 유럽에 걸친 나라. 동서 문명의 교차로.", descEn:"A country straddling Asia and Europe — a crossroads of civilizations.", landmark:"아야소피아", landmarkEn:"Hagia Sophia", fun:"한 나라가 두 대륙(아시아·유럽)에 걸쳐 있어요. 이스탄불은 두 대륙에 도시가 나뉘어 있습니다.", funEn:"A single country spanning two continents — Istanbul itself sits on both Asia and Europe." },
  { id:30, name:"아랍에미리트", nameEn:"United Arab Emirates", flag:"🇦🇪", capital:"아부다비", capitalEn:"Abu Dhabi", region:"아시아", population:9400000, area:83600, languages:"아랍어", languagesEn:"Arabic", religion:"이슬람교", religionEn:"Muslim", currency:"디르함 (AED)", currencyEn:"Dirham (AED)", dial:"+971", desc:"7개 토후국의 연합. 사막 위에 세운 초현대 도시로 유명.", descEn:"A federation of seven emirates, famous for ultramodern cities built on the desert.", landmark:"부르즈 할리파", landmarkEn:"Burj Khalifa", fun:"세계에서 가장 높은 건물 부르즈 할리파(828m)가 두바이에 있어요.", funEn:"The world's tallest building, the Burj Khalifa (828 m), stands in Dubai." },
  { id:31, name:"네덜란드", nameEn:"Netherlands", flag:"🇳🇱", capital:"암스테르담", capitalEn:"Amsterdam", region:"유럽", population:17800000, area:41850, languages:"네덜란드어", languagesEn:"Dutch", religion:"무종교·가톨릭·개신교", religionEn:"None·Catholic·Protestant", currency:"유로 (EUR)", currencyEn:"Euro (EUR)", dial:"+31", desc:"국토의 상당 부분이 해수면보다 낮은 나라. 운하·풍차·자전거로 유명.", descEn:"A country where much of the land lies below sea level — famous for canals, windmills, and bikes.", landmark:"킨더다이크", landmarkEn:"Kinderdijk", fun:"국토의 약 4분의 1이 해수면보다 낮아 둑과 간척으로 땅을 지켜요. 자전거가 인구보다 많습니다.", funEn:"About a quarter of the land is below sea level, kept dry by dikes. There are more bikes than people." },
  { id:32, name:"스위스", nameEn:"Switzerland", flag:"🇨🇭", capital:"베른", capitalEn:"Bern", region:"유럽", population:8800000, area:41285, languages:"독일어·프랑스어·이탈리아어", languagesEn:"German·French·Italian", religion:"가톨릭·개신교", religionEn:"Catholic·Protestant", currency:"스위스프랑 (CHF)", currencyEn:"Swiss Franc (CHF)", dial:"+41", desc:"알프스의 나라. 영세중립국이자 시계·금융·정밀산업으로 유명.", descEn:"The land of the Alps — a neutral state famous for watches, finance, and precision industry.", landmark:"마터호른", landmarkEn:"Matterhorn", fun:"공용어가 4개(독일어·프랑스어·이탈리아어·로만슈어)예요. 오랜 영세중립국입니다.", funEn:"It has four official languages (German·French·Italian·Romansh) and is a long-standing neutral state." },
  { id:33, name:"스웨덴", nameEn:"Sweden", flag:"🇸🇪", capital:"스톡홀름", capitalEn:"Stockholm", region:"유럽", population:10500000, area:450295, languages:"스웨덴어", languagesEn:"Swedish", religion:"개신교(루터교)·무종교", religionEn:"Protestant (Lutheran)·None", currency:"크로나 (SEK)", currencyEn:"Krona (SEK)", dial:"+46", desc:"복지와 디자인의 나라. 노벨상 시상식이 열리는 곳.", descEn:"A land of welfare and design — home of the Nobel Prize ceremony.", landmark:"감라스탄", landmarkEn:"Gamla stan", fun:"노벨상 시상식이 매년 스톡홀름에서 열려요(평화상만 오슬로). 이케아·볼보의 나라.", funEn:"The Nobel Prize ceremony is held in Stockholm each year (except the Peace Prize, in Oslo). Home of IKEA and Volvo." },
  { id:34, name:"그리스", nameEn:"Greece", flag:"🇬🇷", capital:"아테네", capitalEn:"Athens", region:"유럽", population:10400000, area:131957, languages:"그리스어", languagesEn:"Greek", religion:"정교회", religionEn:"Orthodox", currency:"유로 (EUR)", currencyEn:"Euro (EUR)", dial:"+30", desc:"서양 문명·민주주의·올림픽의 발상지. 6천여 개의 섬.", descEn:"The cradle of Western civilization, democracy, and the Olympics, with over 6,000 islands.", landmark:"파르테논 신전", landmarkEn:"Parthenon", fun:"민주주의와 올림픽이 시작된 나라예요. 6천여 개의 섬 중 사람이 사는 곳은 약 200여 곳.", funEn:"The birthplace of democracy and the Olympics. Of its 6,000+ islands, only about 200 are inhabited." },
  { id:35, name:"포르투갈", nameEn:"Portugal", flag:"🇵🇹", capital:"리스본", capitalEn:"Lisbon", region:"유럽", population:10300000, area:92212, languages:"포르투갈어", languagesEn:"Portuguese", religion:"가톨릭", religionEn:"Catholic", currency:"유로 (EUR)", currencyEn:"Euro (EUR)", dial:"+351", desc:"대항해시대를 연 나라. 이베리아 반도 서쪽 끝.", descEn:"The nation that launched the Age of Discovery, at the western edge of Iberia.", landmark:"벨렘 탑", landmarkEn:"Belém Tower", fun:"대항해시대를 이끌며 포르투갈어를 여러 대륙에 남겼어요(브라질 등). 에그타르트의 원조.", funEn:"It led the Age of Discovery and spread Portuguese across continents (e.g. Brazil). The home of the egg tart (pastel de nata)." },
  { id:36, name:"러시아", nameEn:"Russia", flag:"🇷🇺", capital:"모스크바", capitalEn:"Moscow", region:"유럽", population:144000000, area:17098242, languages:"러시아어", languagesEn:"Russian", religion:"정교회·무종교", religionEn:"Orthodox·None", currency:"루블 (RUB)", currencyEn:"Ruble (RUB)", dial:"+7", desc:"세계에서 면적이 가장 넓은 나라. 유럽과 아시아에 걸쳐 11개 시간대.", descEn:"The largest country in the world by area, spanning Europe and Asia across 11 time zones.", landmark:"성 바실리 대성당", landmarkEn:"Saint Basil's Cathedral", fun:"국토 면적 세계 1위로, 시간대가 11개나 됩니다.", funEn:"The world's largest country by area, with a remarkable 11 time zones." },
  { id:37, name:"칠레", nameEn:"Chile", flag:"🇨🇱", capital:"산티아고", capitalEn:"Santiago", region:"남아메리카", population:19600000, area:756102, languages:"스페인어", languagesEn:"Spanish", religion:"가톨릭", religionEn:"Catholic", currency:"페소 (CLP)", currencyEn:"Peso (CLP)", dial:"+56", desc:"남북으로 4,300km 길게 뻗은 나라. 아타카마 사막과 파타고니아.", descEn:"A country stretching 4,300 km north to south — from the Atacama Desert to Patagonia.", landmark:"모아이", landmarkEn:"Moai", fun:"남북으로 매우 길고 동서로는 좁아요. 세계에서 가장 건조한 아타카마 사막이 있습니다.", funEn:"Extremely long north-to-south and narrow east-to-west. Home to the Atacama, the world's driest desert." },
  { id:38, name:"콜롬비아", nameEn:"Colombia", flag:"🇨🇴", capital:"보고타", capitalEn:"Bogotá", region:"남아메리카", population:52000000, area:1141748, languages:"스페인어", languagesEn:"Spanish", religion:"가톨릭", religionEn:"Catholic", currency:"페소 (COP)", currencyEn:"Peso (COP)", dial:"+57", desc:"커피와 에메랄드로 유명. 카리브해와 태평양을 동시에 낀 나라.", descEn:"Famous for coffee and emeralds, bordering both the Caribbean and the Pacific.", landmark:"카르타헤나", landmarkEn:"Cartagena", fun:"고급 아라비카 커피 산지로 유명해요. 세계 에메랄드의 상당량을 생산합니다.", funEn:"Renowned for high-quality Arabica coffee, and a leading producer of the world's emeralds." },
  { id:39, name:"나이지리아", nameEn:"Nigeria", flag:"🇳🇬", capital:"아부자", capitalEn:"Abuja", region:"아프리카", population:223000000, area:923768, languages:"영어", languagesEn:"English", religion:"이슬람교·기독교", religionEn:"Muslim·Christian", currency:"나이라 (NGN)", currencyEn:"Naira (NGN)", dial:"+234", desc:"아프리카에서 인구가 가장 많은 나라. 활발한 영화·음악 산업.", descEn:"Africa's most populous country, with a vibrant film and music industry.", landmark:"주마 록", landmarkEn:"Zuma Rock", fun:"아프리카 인구 1위 국가예요. 영화산업 '놀리우드'는 제작 편수가 세계 최상위권.", funEn:"Africa's most populous country. Its film industry, 'Nollywood,' is among the world's most prolific." },
  { id:40, name:"모로코", nameEn:"Morocco", flag:"🇲🇦", capital:"라바트", capitalEn:"Rabat", region:"아프리카", population:37000000, area:446550, languages:"아랍어·베르베르어", languagesEn:"Arabic·Berber", religion:"이슬람교", religionEn:"Muslim", currency:"디르함 (MAD)", currencyEn:"Dirham (MAD)", dial:"+212", desc:"사하라 사막과 아틀라스 산맥, 미로 같은 옛 도시(메디나)로 유명.", descEn:"Famous for the Sahara, the Atlas Mountains, and labyrinthine old towns (medinas).", landmark:"제마 엘프나", landmarkEn:"Jemaa el-Fnaa", fun:"파란 도시 셰프샤우엔, 붉은 도시 마라케시 등 색으로 유명한 도시가 많아요.", funEn:"Known for colorful cities like blue Chefchaouen and red Marrakesh." }
];
const REGIONS = ["전체","아시아","유럽","북아메리카","남아메리카","아프리카","오세아니아"];
const REGION_EN = { "전체":"All", "아시아":"Asia", "유럽":"Europe", "북아메리카":"North America", "남아메리카":"South America", "아프리카":"Africa", "오세아니아":"Oceania" };

// ===== 언어(i18n) =====
let LANG = (localStorage.getItem('lang') === 'en') ? 'en' : 'ko';
function setLang(l){ LANG = (l === 'en') ? 'en' : 'ko'; localStorage.setItem('lang', LANG); }
function t(k){ return (I18N[LANG] && I18N[LANG][k] != null) ? I18N[LANG][k] : (I18N.ko[k] != null ? I18N.ko[k] : k); }
// 나라별 현지화 접근자
const L = {
  name:      c => LANG==='en' ? c.nameEn      : c.name,
  region:    c => LANG==='en' ? (REGION_EN[c.region]||c.region) : c.region,
  capital:   c => LANG==='en' ? c.capitalEn   : c.capital,
  languages: c => LANG==='en' ? c.languagesEn : c.languages,
  religion:  c => LANG==='en' ? c.religionEn  : c.religion,
  currency:  c => LANG==='en' ? c.currencyEn  : c.currency,
  desc:      c => LANG==='en' ? c.descEn      : c.desc,
  fun:       c => LANG==='en' ? c.funEn       : c.fun,
  landmark:  c => LANG==='en' ? c.landmarkEn  : c.landmark
};
const regionLabel = r => LANG==='en' ? (REGION_EN[r]||r) : r;

const I18N = {
  ko: {
    docTitle:"세계 국가 도감", brand:"World Atlas · 세계 국가 도감",
    mastTitle:"세계의 나라들,<br>한 장에 담다.",
    mastSub:"40개국의 국기·수도·인구·면적·언어·종교·통화를 한눈에. 나라를 눌러 상세 페이지로 들어가고, 가봤어요·가고싶어요·댓글로 여행의 기억을 나눠요.",
    searchPh:"나라 이름으로 검색 (예: 프랑스, 브라질)", searchAria:"국가 검색",
    fav:"⭐ 즐겨찾기", popular:"🔥 인기순",
    countCountries:"개 나라", countFav:"⭐ 즐겨찾기", countSearch:"검색",
    empty:"🔎 조건에 맞는 나라가 없습니다.<br>검색어·지역을 바꾸거나 즐겨찾기를 추가해 보세요.",
    visited:"가봤어요", wish:"가고싶어요", viewsShort:"조회",
    visitTotal:"누적 방문", visitToday:"오늘", topViewed:"가장 많이 본 나라",
    beChecking:"백엔드 연결 확인 중…",
    beOffMast:"⚠️ 백엔드 미연결 — 목업 데이터로 둘러보기만 가능",
    beOn:"🟢 백엔드 연결됨 · 익명 사용자로 접속",
    beFail:"⚠️ 로그인 실패 — Supabase '익명 로그인(Anonymous)' 켰는지 확인: ",
    footer:"KDT Node · World Atlas — Frontend + Supabase (visits · views · comments · reactions · favorites, RLS)",
    back:"← 세계 국가 도감", crumbAtlas:"도감",
    ovOverview:"개요", ovMark:"나의 기록", ovLandmark:"대표 명소", ovKnow:"알아두면", ovComments:"댓글", ovMoreIn:"같은 지역",
    kCapital:"수도", kPop:"인구", kArea:"면적", kLang:"언어", kRel:"종교", kCur:"통화", kDial:"국제전화", kRegion:"지역", kViews:"조회수",
    markFavOn:"★ 즐겨찾기 됨", markFavOff:"☆ 즐겨찾기",
    wikiMore:"위키백과에서 더 보기 →", photoCredit:"사진: Wikimedia Commons", loadingWiki:"불러오는 중…",
    cmtLoading:"불러오는 중…", cmtOffList:"댓글은 백엔드 연결 후 표시돼요.",
    cmtEmpty:"아직 댓글이 없어요. 첫 댓글을 남겨보세요!", cmtFail:"댓글을 불러오지 못했어요: ",
    cmtNick:"닉네임", cmtBody:"이 나라에 대한 한마디… (여행 팁, 감상 등)", cmtPost:"댓글 등록", cmtDel:"삭제",
    cmtOff:"댓글·반응·즐겨찾기는 <b>Supabase 연결 후</b> 사용할 수 있어요. (data.js에 키를 넣고 익명 로그인을 켜면 활성화)",
    cmtNeedBoth:"닉네임과 내용을 모두 입력해 주세요.", cmtDelConfirm:"이 댓글을 삭제할까요?",
    beNeed:"백엔드 연결 후 사용할 수 있어요.",
    beOffCountry:"⚠️ 백엔드 미연결 — 정보 열람만 가능 (data.js에 키 + 익명 로그인 켜면 반응·댓글 활성화)",
    nfTitle:"나라를 찾을 수 없어요", nfDesc:"주소가 올바르지 않거나 목록에 없는 나라입니다.", nfBack:"← 세계 국가 도감으로 돌아가기",
    backToAll:"← 전체 도감으로 돌아가기"
  },
  en: {
    docTitle:"World Atlas", brand:"World Atlas",
    mastTitle:"The world's nations,<br>on a single page.",
    mastSub:"Flags, capitals, population, area, languages, religion, and currency for 40 countries at a glance. Tap a country for its page, and share your travel memories with been-there, want-to-go, and comments.",
    searchPh:"Search by country name (e.g. France, Brazil)", searchAria:"Search countries",
    fav:"⭐ Favorites", popular:"🔥 Popular",
    countCountries:" countries", countFav:"⭐ Favorites", countSearch:"search",
    empty:"🔎 No countries match your filters.<br>Try a different search or region, or add a favorite.",
    visited:"Been there", wish:"Want to go", viewsShort:"views",
    visitTotal:"Total visits", visitToday:"Today", topViewed:"Most viewed",
    beChecking:"Checking backend…",
    beOffMast:"⚠️ Backend not connected — browsing mock data only",
    beOn:"🟢 Backend connected · signed in anonymously",
    beFail:"⚠️ Sign-in failed — check that Anonymous sign-ins are enabled in Supabase: ",
    footer:"KDT Node · World Atlas — Frontend + Supabase (visits · views · comments · reactions · favorites, RLS)",
    back:"← World Atlas", crumbAtlas:"Atlas",
    ovOverview:"Overview", ovMark:"Your mark", ovLandmark:"Landmark", ovKnow:"Did you know", ovComments:"Comments", ovMoreIn:"More in",
    kCapital:"Capital", kPop:"Population", kArea:"Area", kLang:"Languages", kRel:"Religion", kCur:"Currency", kDial:"Dialing code", kRegion:"Region", kViews:"Views",
    markFavOn:"★ Favorited", markFavOff:"☆ Favorite",
    wikiMore:"Read more on Wikipedia →", photoCredit:"Photo: Wikimedia Commons", loadingWiki:"Loading…",
    cmtLoading:"Loading…", cmtOffList:"Comments appear once the backend is connected.",
    cmtEmpty:"No comments yet. Be the first!", cmtFail:"Couldn't load comments: ",
    cmtNick:"Nickname", cmtBody:"A word about this country… (tips, impressions)", cmtPost:"Post comment", cmtDel:"Delete",
    cmtOff:"Comments, reactions, and favorites work <b>once Supabase is connected</b>. (Add the key in data.js and enable anonymous sign-in.)",
    cmtNeedBoth:"Please enter both a nickname and a message.", cmtDelConfirm:"Delete this comment?",
    beNeed:"Available after the backend is connected.",
    beOffCountry:"⚠️ Backend not connected — viewing only (add the key in data.js + enable anonymous sign-in for reactions·comments)",
    nfTitle:"Country not found", nfDesc:"The address is invalid or this country isn't in the list.", nfBack:"← Back to World Atlas",
    backToAll:"← Back to the full atlas"
  }
};

// ===== 공유 헬퍼 =====
const flagCode = flag => String.fromCharCode(...[...flag].map(c => c.codePointAt(0) - 0x1F1E6 + 97));
function fmtPop(n){
  if(LANG === 'en'){
    if(n >= 1e9){ return (n/1e9).toFixed(2).replace(/\.?0+$/,'') + "B"; }
    if(n >= 1e6){ const m = n/1e6; return (m < 100 ? m.toFixed(1).replace(/\.0$/,'') : Math.round(m)) + "M"; }
    if(n >= 1e3){ return Math.round(n/1e3) + "K"; }
    return n.toLocaleString();
  }
  if(n >= 1e8){ const eok = Math.floor(n/1e8), man = Math.round((n%1e8)/1e4); return man>0 ? `${eok}억 ${man.toLocaleString()}만 명` : `${eok}억 명`; }
  if(n >= 1e4){ return `${Math.round(n/1e4).toLocaleString()}만 명`; }
  return `${n.toLocaleString()}명`;
}
const fmtArea = n => (n < 1 ? n : Math.round(n).toLocaleString()) + " km²";
const esc = s => (s||"").replace(/[&<>"]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
const countryByCode = code => COUNTRIES.find(c => flagCode(c.flag) === code);

// ===== 위키백과 랜드마크 이미지·해설 (히어로용) =====
// ko/en.wikipedia REST API는 CORS 허용 → 로컬/정적 배포 모두 fetch 가능. 실패 시 폴백.
async function fetchWiki(title, lang){
  lang = (lang === 'en') ? 'en' : 'ko';
  try{
    const r = await fetch(`https://${lang}.wikipedia.org/api/rest_v1/page/summary/` + encodeURIComponent(title), { headers:{ accept:"application/json" } });
    if(!r.ok) return null;
    const d = await r.json();
    const img = (d.originalimage && d.originalimage.source) || (d.thumbnail && d.thumbnail.source) || null;
    return { title: d.title || title, img, extract: d.extract || "", url: (d.content_urls && d.content_urls.desktop && d.content_urls.desktop.page) || "" };
  }catch(e){ return null; }
}

// ===== 방문자·조회수 백엔드 (page_views 로그 + 집계 RPC) =====
// 세션당 1회만 기록(새로고침 스팸 방지). 집계는 RPC 함수(SECURITY DEFINER)로만 읽음.
async function logView(code, uid){
  if(!sb || !uid) return;
  const key = 'pv_' + (code || 'home');
  if(sessionStorage.getItem(key)) return;
  sessionStorage.setItem(key, '1');
  try{ await sb.from('page_views').insert({ code: code || null, user_id: uid }); }catch(e){}
}
async function getVisitStats(){
  if(!sb) return null;
  try{ const { data } = await sb.rpc('get_visit_stats'); return (data && data[0]) || null; }catch(e){ return null; }
}
async function getViewCounts(){
  if(!sb) return {};
  try{ const { data } = await sb.rpc('get_view_counts'); const m = {}; (data||[]).forEach(r => m[r.code] = Number(r.views)); return m; }catch(e){ return {}; }
}
