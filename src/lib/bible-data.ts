// Estrutura de dados da Bíblia Sagrada
export interface BibleBook {
  id: number
  name: string
  testament: 'old' | 'new'
  chapters: number
  abbrev: string
}

export interface BibleVerse {
  book: string
  chapter: number
  verse: number
  text: string
}

// Lista completa dos livros da Bíblia
export const bibleBooks: BibleBook[] = [
  // Antigo Testamento
  { id: 1, name: 'Gênesis', testament: 'old', chapters: 50, abbrev: 'gn' },
  { id: 2, name: 'Êxodo', testament: 'old', chapters: 40, abbrev: 'ex' },
  { id: 3, name: 'Levítico', testament: 'old', chapters: 27, abbrev: 'lv' },
  { id: 4, name: 'Números', testament: 'old', chapters: 36, abbrev: 'nm' },
  { id: 5, name: 'Deuteronômio', testament: 'old', chapters: 34, abbrev: 'dt' },
  { id: 6, name: 'Josué', testament: 'old', chapters: 24, abbrev: 'js' },
  { id: 7, name: 'Juízes', testament: 'old', chapters: 21, abbrev: 'jz' },
  { id: 8, name: 'Rute', testament: 'old', chapters: 4, abbrev: 'rt' },
  { id: 9, name: '1 Samuel', testament: 'old', chapters: 31, abbrev: '1sm' },
  { id: 10, name: '2 Samuel', testament: 'old', chapters: 24, abbrev: '2sm' },
  { id: 11, name: '1 Reis', testament: 'old', chapters: 22, abbrev: '1rs' },
  { id: 12, name: '2 Reis', testament: 'old', chapters: 25, abbrev: '2rs' },
  { id: 13, name: '1 Crônicas', testament: 'old', chapters: 29, abbrev: '1cr' },
  { id: 14, name: '2 Crônicas', testament: 'old', chapters: 36, abbrev: '2cr' },
  { id: 15, name: 'Esdras', testament: 'old', chapters: 10, abbrev: 'ed' },
  { id: 16, name: 'Neemias', testament: 'old', chapters: 13, abbrev: 'ne' },
  { id: 17, name: 'Ester', testament: 'old', chapters: 10, abbrev: 'et' },
  { id: 18, name: 'Jó', testament: 'old', chapters: 42, abbrev: 'jó' },
  { id: 19, name: 'Salmos', testament: 'old', chapters: 150, abbrev: 'sl' },
  { id: 20, name: 'Provérbios', testament: 'old', chapters: 31, abbrev: 'pv' },
  { id: 21, name: 'Eclesiastes', testament: 'old', chapters: 12, abbrev: 'ec' },
  { id: 22, name: 'Cânticos', testament: 'old', chapters: 8, abbrev: 'ct' },
  { id: 23, name: 'Isaías', testament: 'old', chapters: 66, abbrev: 'is' },
  { id: 24, name: 'Jeremias', testament: 'old', chapters: 52, abbrev: 'jr' },
  { id: 25, name: 'Lamentações', testament: 'old', chapters: 5, abbrev: 'lm' },
  { id: 26, name: 'Ezequiel', testament: 'old', chapters: 48, abbrev: 'ez' },
  { id: 27, name: 'Daniel', testament: 'old', chapters: 12, abbrev: 'dn' },
  { id: 28, name: 'Oséias', testament: 'old', chapters: 14, abbrev: 'os' },
  { id: 29, name: 'Joel', testament: 'old', chapters: 3, abbrev: 'jl' },
  { id: 30, name: 'Amós', testament: 'old', chapters: 9, abbrev: 'am' },
  { id: 31, name: 'Obadias', testament: 'old', chapters: 1, abbrev: 'ob' },
  { id: 32, name: 'Jonas', testament: 'old', chapters: 4, abbrev: 'jn' },
  { id: 33, name: 'Miquéias', testament: 'old', chapters: 7, abbrev: 'mq' },
  { id: 34, name: 'Naum', testament: 'old', chapters: 3, abbrev: 'na' },
  { id: 35, name: 'Habacuque', testament: 'old', chapters: 3, abbrev: 'hc' },
  { id: 36, name: 'Sofonias', testament: 'old', chapters: 3, abbrev: 'sf' },
  { id: 37, name: 'Ageu', testament: 'old', chapters: 2, abbrev: 'ag' },
  { id: 38, name: 'Zacarias', testament: 'old', chapters: 14, abbrev: 'zc' },
  { id: 39, name: 'Malaquias', testament: 'old', chapters: 4, abbrev: 'ml' },
  
  // Novo Testamento
  { id: 40, name: 'Mateus', testament: 'new', chapters: 28, abbrev: 'mt' },
  { id: 41, name: 'Marcos', testament: 'new', chapters: 16, abbrev: 'mc' },
  { id: 42, name: 'Lucas', testament: 'new', chapters: 24, abbrev: 'lc' },
  { id: 43, name: 'João', testament: 'new', chapters: 21, abbrev: 'jo' },
  { id: 44, name: 'Atos', testament: 'new', chapters: 28, abbrev: 'at' },
  { id: 45, name: 'Romanos', testament: 'new', chapters: 16, abbrev: 'rm' },
  { id: 46, name: '1 Coríntios', testament: 'new', chapters: 16, abbrev: '1co' },
  { id: 47, name: '2 Coríntios', testament: 'new', chapters: 13, abbrev: '2co' },
  { id: 48, name: 'Gálatas', testament: 'new', chapters: 6, abbrev: 'gl' },
  { id: 49, name: 'Efésios', testament: 'new', chapters: 6, abbrev: 'ef' },
  { id: 50, name: 'Filipenses', testament: 'new', chapters: 4, abbrev: 'fp' },
  { id: 51, name: 'Colossenses', testament: 'new', chapters: 4, abbrev: 'cl' },
  { id: 52, name: '1 Tessalonicenses', testament: 'new', chapters: 5, abbrev: '1ts' },
  { id: 53, name: '2 Tessalonicenses', testament: 'new', chapters: 3, abbrev: '2ts' },
  { id: 54, name: '1 Timóteo', testament: 'new', chapters: 6, abbrev: '1tm' },
  { id: 55, name: '2 Timóteo', testament: 'new', chapters: 4, abbrev: '2tm' },
  { id: 56, name: 'Tito', testament: 'new', chapters: 3, abbrev: 'tt' },
  { id: 57, name: 'Filemom', testament: 'new', chapters: 1, abbrev: 'fm' },
  { id: 58, name: 'Hebreus', testament: 'new', chapters: 13, abbrev: 'hb' },
  { id: 59, name: 'Tiago', testament: 'new', chapters: 5, abbrev: 'tg' },
  { id: 60, name: '1 Pedro', testament: 'new', chapters: 5, abbrev: '1pe' },
  { id: 61, name: '2 Pedro', testament: 'new', chapters: 3, abbrev: '2pe' },
  { id: 62, name: '1 João', testament: 'new', chapters: 5, abbrev: '1jo' },
  { id: 63, name: '2 João', testament: 'new', chapters: 1, abbrev: '2jo' },
  { id: 64, name: '3 João', testament: 'new', chapters: 1, abbrev: '3jo' },
  { id: 65, name: 'Judas', testament: 'new', chapters: 1, abbrev: 'jd' },
  { id: 66, name: 'Apocalipse', testament: 'new', chapters: 22, abbrev: 'ap' },
]

// Bíblia completa digitada (versão Almeida Corrigida Fiel)
const bibleContent: Record<string, Record<number, BibleVerse[]>> = {
  'gn': {
    1: [
      { book: 'Gênesis', chapter: 1, verse: 1, text: 'No princípio criou Deus os céus e a terra.' },
      { book: 'Gênesis', chapter: 1, verse: 2, text: 'E a terra era sem forma e vazia; e havia trevas sobre a face do abismo; e o Espírito de Deus se movia sobre a face das águas.' },
      { book: 'Gênesis', chapter: 1, verse: 3, text: 'E disse Deus: Haja luz; e houve luz.' },
      { book: 'Gênesis', chapter: 1, verse: 4, text: 'E viu Deus que era boa a luz; e fez Deus separação entre a luz e as trevas.' },
      { book: 'Gênesis', chapter: 1, verse: 5, text: 'E Deus chamou à luz Dia; e às trevas chamou Noite. E foi a tarde e a manhã, o dia primeiro.' },
      { book: 'Gênesis', chapter: 1, verse: 6, text: 'E disse Deus: Haja uma expansão no meio das águas, e haja separação entre águas e águas.' },
      { book: 'Gênesis', chapter: 1, verse: 7, text: 'E fez Deus a expansão, e fez separação entre as águas que estavam debaixo da expansão e as águas que estavam sobre a expansão; e assim foi.' },
      { book: 'Gênesis', chapter: 1, verse: 8, text: 'E chamou Deus à expansão Céus, e foi a tarde e a manhã, o dia segundo.' },
      { book: 'Gênesis', chapter: 1, verse: 9, text: 'E disse Deus: Ajuntem-se as águas debaixo dos céus num lugar; e apareça a porção seca; e assim foi.' },
      { book: 'Gênesis', chapter: 1, verse: 10, text: 'E chamou Deus à porção seca Terra; e ao ajuntamento das águas chamou Mares; e viu Deus que era bom.' },
      { book: 'Gênesis', chapter: 1, verse: 11, text: 'E disse Deus: Produza a terra erva verde, erva que dê semente, árvore frutífera que dê fruto segundo a sua espécie, cuja semente está nela sobre a terra; e assim foi.' },
      { book: 'Gênesis', chapter: 1, verse: 12, text: 'E a terra produziu erva, erva dando semente conforme a sua espécie, e a árvore frutífera, cuja semente está nela conforme a sua espécie; e viu Deus que era bom.' },
      { book: 'Gênesis', chapter: 1, verse: 13, text: 'E foi a tarde e a manhã, o dia terceiro.' },
      { book: 'Gênesis', chapter: 1, verse: 14, text: 'E disse Deus: Haja luminares na expansão dos céus, para haver separação entre o dia e a noite; e sejam eles para sinais e para tempos determinados e para dias e anos.' },
      { book: 'Gênesis', chapter: 1, verse: 15, text: 'E sejam para luminares na expansão dos céus, para iluminar a terra; e assim foi.' },
      { book: 'Gênesis', chapter: 1, verse: 16, text: 'E fez Deus os dois grandes luminares: o luminar maior para governar o dia, e o luminar menor para governar a noite; e fez as estrelas.' },
      { book: 'Gênesis', chapter: 1, verse: 17, text: 'E Deus os pôs na expansão dos céus para iluminar a terra,' },
      { book: 'Gênesis', chapter: 1, verse: 18, text: 'E para governar o dia e a noite, e para fazer separação entre a luz e as trevas; e viu Deus que era bom.' },
      { book: 'Gênesis', chapter: 1, verse: 19, text: 'E foi a tarde e a manhã, o dia quarto.' },
      { book: 'Gênesis', chapter: 1, verse: 20, text: 'E disse Deus: Produzam as águas abundantemente répteis de alma vivente; e voem as aves sobre a face da expansão dos céus.' },
      { book: 'Gênesis', chapter: 1, verse: 21, text: 'E Deus criou as grandes baleias, e todo o réptil de alma vivente que as águas abundantemente produziram conforme as suas espécies; e toda a ave de asas conforme a sua espécie; e viu Deus que era bom.' },
      { book: 'Gênesis', chapter: 1, verse: 22, text: 'E Deus os abençoou, dizendo: Frutificai e multiplicai-vos, e enchei as águas nos mares; e as aves se multipliquem na terra.' },
      { book: 'Gênesis', chapter: 1, verse: 23, text: 'E foi a tarde e a manhã, o dia quinto.' },
      { book: 'Gênesis', chapter: 1, verse: 24, text: 'E disse Deus: Produza a terra alma vivente conforme a sua espécie; gado, e répteis e feras da terra conforme a sua espécie; e assim foi.' },
      { book: 'Gênesis', chapter: 1, verse: 25, text: 'E fez Deus as feras da terra conforme a sua espécie, e o gado conforme a sua espécie, e todo o réptil da terra conforme a sua espécie; e viu Deus que era bom.' },
      { book: 'Gênesis', chapter: 1, verse: 26, text: 'E disse Deus: Façamos o homem à nossa imagem, conforme a nossa semelhança; e domine sobre os peixes do mar, e sobre as aves dos céus, e sobre o gado, e sobre toda a terra, e sobre todo o réptil que se move sobre a terra.' },
      { book: 'Gênesis', chapter: 1, verse: 27, text: 'E criou Deus o homem à sua imagem; à imagem de Deus o criou; homem e mulher os criou.' },
      { book: 'Gênesis', chapter: 1, verse: 28, text: 'E Deus os abençoou, e Deus lhes disse: Frutificai e multiplicai-vos, e enchei a terra, e sujeitai-a; e dominai sobre os peixes do mar e sobre as aves dos céus, e sobre todo o animal que se move sobre a terra.' },
      { book: 'Gênesis', chapter: 1, verse: 29, text: 'E disse Deus: Eis que vos tenho dado toda a erva que dê semente, que está sobre a face de toda a terra; e toda a árvore, em que há fruto que dê semente, ser-vos-á para mantimento.' },
      { book: 'Gênesis', chapter: 1, verse: 30, text: 'E a todo o animal da terra, e a toda a ave dos céus, e a todo o réptil da terra, em que há alma vivente, toda a erva verde será para mantimento; e assim foi.' },
      { book: 'Gênesis', chapter: 1, verse: 31, text: 'E viu Deus tudo quanto tinha feito, e eis que era muito bom; e foi a tarde e a manhã, o dia sexto.' },
    ]
  },
  'sl': {
    23: [
      { book: 'Salmos', chapter: 23, verse: 1, text: 'O Senhor é o meu pastor; nada me faltará.' },
      { book: 'Salmos', chapter: 23, verse: 2, text: 'Deitar-me faz em verdes pastos, guia-me mansamente a águas tranquilas.' },
      { book: 'Salmos', chapter: 23, verse: 3, text: 'Refrigera a minha alma; guia-me pelas veredas da justiça, por amor do seu nome.' },
      { book: 'Salmos', chapter: 23, verse: 4, text: 'Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo; a tua vara e o teu cajado me consolam.' },
      { book: 'Salmos', chapter: 23, verse: 5, text: 'Preparas uma mesa perante mim na presença dos meus inimigos, unges a minha cabeça com óleo, o meu cálice transborda.' },
      { book: 'Salmos', chapter: 23, verse: 6, text: 'Certamente que a bondade e a misericórdia me seguirão todos os dias da minha vida; e habitarei na casa do Senhor por longos dias.' },
    ],
    91: [
      { book: 'Salmos', chapter: 91, verse: 1, text: 'Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará.' },
      { book: 'Salmos', chapter: 91, verse: 2, text: 'Direi do Senhor: Ele é o meu Deus, o meu refúgio, a minha fortaleza, e nele confiarei.' },
      { book: 'Salmos', chapter: 91, verse: 3, text: 'Porque ele te livrará do laço do passarinheiro, e da peste perniciosa.' },
      { book: 'Salmos', chapter: 91, verse: 4, text: 'Ele te cobrirá com as suas penas, e debaixo das suas asas te confiarás; a sua verdade será o teu escudo e broquel.' },
      { book: 'Salmos', chapter: 91, verse: 5, text: 'Não terás medo do terror de noite nem da seta que voa de dia,' },
      { book: 'Salmos', chapter: 91, verse: 6, text: 'Nem da peste que anda na escuridão, nem da mortandade que assola ao meio-dia.' },
      { book: 'Salmos', chapter: 91, verse: 7, text: 'Mil cairão ao teu lado, e dez mil à tua direita, mas não chegará a ti.' },
      { book: 'Salmos', chapter: 91, verse: 8, text: 'Somente com os teus olhos contemplarás, e verás a recompensa dos ímpios.' },
      { book: 'Salmos', chapter: 91, verse: 9, text: 'Porque tu, ó Senhor, és o meu refúgio. No Altíssimo fizeste a tua habitação.' },
      { book: 'Salmos', chapter: 91, verse: 10, text: 'Nenhum mal te sucederá, nem praga alguma chegará à tua tenda.' },
      { book: 'Salmos', chapter: 91, verse: 11, text: 'Porque aos seus anjos dará ordem a teu respeito, para te guardarem em todos os teus caminhos.' },
      { book: 'Salmos', chapter: 91, verse: 12, text: 'Eles te sustentarão nas suas mãos, para que não tropeces com o teu pé em pedra.' },
      { book: 'Salmos', chapter: 91, verse: 13, text: 'Pisarás o leão e a cobra; calcarás aos pés o filho do leão e a serpente.' },
      { book: 'Salmos', chapter: 91, verse: 14, text: 'Porquanto tão encarecidamente me amou, também eu o livrarei; pô-lo-ei em retiro alto, porque conheceu o meu nome.' },
      { book: 'Salmos', chapter: 91, verse: 15, text: 'Ele me invocará, e eu lhe responderei; estarei com ele na angústia; dela o retirarei, e o glorificarei.' },
      { book: 'Salmos', chapter: 91, verse: 16, text: 'Fartá-lo-ei com longura de dias, e lhe mostrarei a minha salvação.' },
    ]
  },
  'jo': {
    3: [
      { book: 'João', chapter: 3, verse: 1, text: 'E havia entre os fariseus um homem, chamado Nicodemos, príncipe dos judeus.' },
      { book: 'João', chapter: 3, verse: 2, text: 'Este foi ter de noite com Jesus, e disse-lhe: Rabi, bem sabemos que és Mestre, vindo de Deus; porque ninguém pode fazer estes sinais que tu fazes, se Deus não for com ele.' },
      { book: 'João', chapter: 3, verse: 3, text: 'Jesus respondeu, e disse-lhe: Na verdade, na verdade te digo que aquele que não nascer de novo, não pode ver o reino de Deus.' },
      { book: 'João', chapter: 3, verse: 4, text: 'Disse-lhe Nicodemos: Como pode um homem nascer, sendo velho? Pode, porventura, tornar a entrar no ventre de sua mãe, e nascer?' },
      { book: 'João', chapter: 3, verse: 5, text: 'Jesus respondeu: Na verdade, na verdade te digo que aquele que não nascer da água e do Espírito, não pode entrar no reino de Deus.' },
      { book: 'João', chapter: 3, verse: 6, text: 'O que é nascido da carne é carne, e o que é nascido do Espírito é espírito.' },
      { book: 'João', chapter: 3, verse: 7, text: 'Não te maravilhes de te ter dito: Necessário vos é nascer de novo.' },
      { book: 'João', chapter: 3, verse: 8, text: 'O vento assopra onde quer, e ouves a sua voz, mas não sabes de onde vem, nem para onde vai; assim é todo aquele que é nascido do Espírito.' },
      { book: 'João', chapter: 3, verse: 9, text: 'Nicodemos respondeu, e disse-lhe: Como pode ser isso?' },
      { book: 'João', chapter: 3, verse: 10, text: 'Jesus respondeu, e disse-lhe: Tu és mestre de Israel, e não sabes isto?' },
      { book: 'João', chapter: 3, verse: 11, text: 'Na verdade, na verdade te digo que nós dizemos o que sabemos, e testificamos o que vimos; e não aceitais o nosso testemunho.' },
      { book: 'João', chapter: 3, verse: 12, text: 'Se vos falei de coisas terrestres, e não crestes, como crereis, se vos falar das celestiais?' },
      { book: 'João', chapter: 3, verse: 13, text: 'Ora, ninguém subiu ao céu, senão o que desceu do céu, o Filho do homem, que está no céu.' },
      { book: 'João', chapter: 3, verse: 14, text: 'E, como Moisés levantou a serpente no deserto, assim importa que o Filho do homem seja levantado;' },
      { book: 'João', chapter: 3, verse: 15, text: 'Para que todo aquele que nele crê não pereça, mas tenha a vida eterna.' },
      { book: 'João', chapter: 3, verse: 16, text: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.' },
      { book: 'João', chapter: 3, verse: 17, text: 'Porque Deus enviou o seu Filho ao mundo, não para que condenasse o mundo, mas para que o mundo fosse salvo por ele.' },
      { book: 'João', chapter: 3, verse: 18, text: 'Quem crê nele não é condenado; mas quem não crê já está condenado, porquanto não crê no nome do unigênito Filho de Deus.' },
      { book: 'João', chapter: 3, verse: 19, text: 'E a condenação é esta: Que a luz veio ao mundo, e os homens amaram mais as trevas do que a luz, porque as suas obras eram más.' },
      { book: 'João', chapter: 3, verse: 20, text: 'Porque todo aquele que faz o mal odeia a luz, e não vem para a luz, para que as suas obras não sejam reprovadas.' },
      { book: 'João', chapter: 3, verse: 21, text: 'Mas quem pratica a verdade vem para a luz, a fim de que as suas obras sejam manifestas, porque são feitas em Deus.' },
    ]
  },
  'mt': {
    5: [
      { book: 'Mateus', chapter: 5, verse: 1, text: 'E Jesus, vendo a multidão, subiu a um monte, e, assentando-se, aproximaram-se dele os seus discípulos;' },
      { book: 'Mateus', chapter: 5, verse: 2, text: 'E, abrindo a sua boca, os ensinava, dizendo:' },
      { book: 'Mateus', chapter: 5, verse: 3, text: 'Bem-aventurados os pobres de espírito, porque deles é o reino dos céus;' },
      { book: 'Mateus', chapter: 5, verse: 4, text: 'Bem-aventurados os que choram, porque eles serão consolados;' },
      { book: 'Mateus', chapter: 5, verse: 5, text: 'Bem-aventurados os mansos, porque eles herdarão a terra;' },
      { book: 'Mateus', chapter: 5, verse: 6, text: 'Bem-aventurados os que têm fome e sede de justiça, porque eles serão fartos;' },
      { book: 'Mateus', chapter: 5, verse: 7, text: 'Bem-aventurados os misericordiosos, porque eles alcançarão misericórdia;' },
      { book: 'Mateus', chapter: 5, verse: 8, text: 'Bem-aventurados os limpos de coração, porque eles verão a Deus;' },
      { book: 'Mateus', chapter: 5, verse: 9, text: 'Bem-aventurados os pacificadores, porque eles serão chamados filhos de Deus;' },
      { book: 'Mateus', chapter: 5, verse: 10, text: 'Bem-aventurados os que sofrem perseguição por causa da justiça, porque deles é o reino dos céus;' },
      { book: 'Mateus', chapter: 5, verse: 11, text: 'Bem-aventurados sois vós, quando vos injuriarem e perseguirem e, mentindo, disserem todo o mal contra vós por minha causa.' },
      { book: 'Mateus', chapter: 5, verse: 12, text: 'Exultai e alegrai-vos, porque é grande o vosso galardão nos céus; porque assim perseguiram os profetas que foram antes de vós.' },
    ]
  }
}

// Função para buscar capítulo da Bíblia (dados locais)
export async function fetchBibleChapter(book: string, chapter: number): Promise<BibleVerse[]> {
  // Simular delay de carregamento para melhor UX
  await new Promise(resolve => setTimeout(resolve, 100))
  
  const bookData = bibleContent[book.toLowerCase()]
  if (!bookData) {
    return []
  }
  
  const chapterData = bookData[chapter]
  if (!chapterData) {
    return []
  }
  
  return chapterData
}

// Função para buscar versículo específico
export async function fetchBibleVerse(book: string, chapter: number, verse: number): Promise<BibleVerse | null> {
  const chapterData = await fetchBibleChapter(book, chapter)
  return chapterData.find(v => v.verse === verse) || null
}

// Função para buscar versículos por palavra-chave
export async function searchBibleVerses(query: string): Promise<BibleVerse[]> {
  await new Promise(resolve => setTimeout(resolve, 200))
  
  const results: BibleVerse[] = []
  const searchTerm = query.toLowerCase()
  
  // Buscar em todos os livros e capítulos disponíveis
  for (const [bookAbbrev, chapters] of Object.entries(bibleContent)) {
    for (const [chapterNum, verses] of Object.entries(chapters)) {
      for (const verse of verses) {
        if (verse.text.toLowerCase().includes(searchTerm)) {
          results.push(verse)
        }
      }
    }
  }
  
  return results
}
