import himelSprite from "../assets/characters/himel.png";
import lelouchSprite from "../assets/characters/lelouch.png";
import sunnySprite from '../assets/characters/Sunny_Omori.png';
import starkSprite from '../assets/characters/stark.png';
import nikoSprite from '../assets/characters/niko.png';
import satoruSprite from '../assets/characters/satoru_gojo.png';
import higurumaSprite from '../assets/characters/hiromi_higuruma.png';
import jokerSprite from '../assets/characters/joker.png';
import kiritoSprite from '../assets/characters/kirito.png';
import unikaSprite from '../assets/characters/unika.png';
import ramlethalSprite from '../assets/characters/ramlethal.png';
import linkSprite from '../assets/characters/link_zelda.png';
import agnesSprite from '../assets/characters/tachyon.png';
import eltnumSprite from '../assets/characters/eltnum.png';
import yasuoSprite from '../assets/characters/yasuo.png';

export const charactersData = [
    {
        id: "himel",
        number: "001",
        name: "Himel",
        origin: "Sousou no Frieren",
        themeColor: "#4A90E2",
        spriteUrl: himelSprite,
        cardTitle: "O Início da Jornada",
        message: "Assim como o Himmel mudou a vida da Frieren com pequenos gestos, você mudou a minha. Este espaço é para lembrar que as memórias que criamos juntos, por mais simples que pareçam, são os tesouros que vou carregar para sempre.",
        stats: { afeicao: 999, coragem: 100, nostalgia: 95 }
    },

      {
      id: "stark",
      number: "002",
      name: "Stark",
      origin: "Sousou no Frieren",
      themeColor: "#D0021B", 
      spriteUrl: starkSprite,
      cardTitle: "Superando os Medos",
      message: "O Stark morre de medo, mas vai lá e faz o que precisa ser feito pelas pessoas que ama. Olhando para ele, lembro de como a gente se apoia nos momentos de incerteza. Obrigado por ser meu porto seguro ao lado do Senhor Deus.",
      stats: { afeicao: 95, coragem: 95, fofura: 100 }
  },

  {
    id: "sunny",
    number: "003",
    name: "Sunny",
    origin: "Omori",
    themeColor: "#5b257d", 
    spriteUrl: sunnySprite,
    cardTitle: "Espaço Branco",
    message: "Mesmo nos dias em que tudo parece meio 'Omori' e dá vontade de se isolar no Espaço Branco, saber que você está por perto torna o mundo real muito mais acolhedor e seguro para mim.",
    stats: { afeicao: 90, misterio: 95, resiliencia: 1000000 }
  },

  {
    id: "lelouch",
    number: "004",
    name: "Lelouch Lamperouge",
    origin: "Code Geass",
    themeColor: "#8641b7", 
    spriteUrl: lelouchSprite,
    cardTitle: "O Comando Absoluto",
    message: "Se eu tivesse o poder do Geass, a única ordem que eu daria seria para que você nunca esquecesse o quanto é uma pessoa incrível, essencial e especial na minha vida. Mas com a fé que temos no Senhor Deus, não preciso de poderes sobrenaturais para saber que você é a pessoa mais importante do meu mundo.",
    stats: { afeicao: 100, genialidade: 100, estilo: 95 }
  },

  {
    id: "gojo",
    number: "005",
    name: "Satoru Gojo",
    origin: "Jujutsu Kaisen",
    themeColor: "#27e5eb",
    spriteUrl: satoruSprite,
    cardTitle: "O Infinito entre Nós",
    message: "Nem o Mugen do Gojo consegue medir a imensidão do amor que sinto por você. Você é, sem dúvidas, 'The Honored One' (A Pessoa Escolhida) do meu mundinho.",
    stats: { afeicao: 100, poder: 999, carisma: 100 }
  },

  {
    id: "higuruma",
    number: "006",
    name: "Hiromi Higuruma",
    origin: "Jujutsu Kaisen",
    themeColor: "#07531f",
    spriteUrl: higurumaSprite,
    cardTitle: "Veredito Final",
    message: "O julgamento do Deadly Sentencing do Higuruma abriu o caso e o veredito é incontestável: você foi declarado culpado por ser o namorado mais maravilhoso do universo. Não há direito a apelação!",
    stats: { afeicao: 90, senso_de_justica: 100, intelecto: 95 }
  },

  {
    id: "joker",
    number: "007",
    name: "Joker (Ren Amamiya)",
    origin: "Persona 5",
    themeColor: "#FF0000", 
    spriteUrl: jokerSprite,
    cardTitle: "Phantom Thief",
    message: "You never see it coming! Assim como os Phantom Thieves roubam corações corrompidos para mudar o mundo, você roubou o meu de um jeito totalmente legítimo e mudou a minha realidade para sempre. Obrigado por ser a minha 'treasure' mais preciosa.",
    stats: { afeicao: 98, agilidade: 90, estilo: 1000 }
  },

  {
    id: "kirito",
    number: "008",
    name: "Kirito (Kazuto Kirigaya)",
    origin: "Sword Art Online",
    themeColor: "#524b4b",
    spriteUrl: kiritoSprite,
    cardTitle: "Dual Wielding",
    message: "Enfrentar os desafios da vida sozinho é difícil, mas jogar em 'co-op' com você faz qualquer 'boss' de 100 andares parecer fácil. Que a gente continue evoluindo juntos nessa party para sempre!",
    stats: { afeicao: 95, determinação: 95000000, reflexo: 100 }
  },

  {
    id: "unika",
    number: "009",
    name: "Unika",
    origin: "Guilty Gear Strive",
    themeColor: "#F5A623", 
    spriteUrl: unikaSprite,
    cardTitle: "Engrenagem do Destino",
    message: "Mesmo em um mundo caótico cheio de Gears, magias e reviravoltas, encontrar você foi o evento mais certeiro e bonito que o Senhor poderia ter reservado para mim.",
    stats: { afeicao: 92, ritmo: 90000000, intensidade: 9500000 }
  },

  {
    id: "ramlethal",
    number: "010",
    name: "Ramlethal Valentine",
    origin: "Guilty Gear",
    themeColor: "#FFFFFF",
    spriteUrl: ramlethalSprite,
    cardTitle: "Descobrindo Sentimentos",
    message: "A Ramlethal começou como uma criatura sem emoções e descobriu o valor do mundo através das coisas simples (como hambúrgueres e afeto). Você me trouxe a luz em meu coração e assim tem tornado vivo todos os dias as promessas de Deus sobre nossa vida <3",
    stats: { afeicao: 97, poder_de_ataque: 98, amor_por_burguer: 100 }
  },

  {
    id: "link",
    number: "011",
    name: "Link",
    origin: "The Legend of Zelda",
    themeColor: "#417505", 
    spriteUrl: linkSprite,
    cardTitle: "A Triforce do Nosso Laço",
    message: "Não preciso acordar de um sono de 100 anos ou cruzar linhas do tempo para saber que encontrar você é a minha maior aventura. Você possui a Triforce da Sabedoria, Força e Coragem que me inspira todos os dias. Obrigada por ser você!",
    stats: { afeicao: 100, exploracao: 95, silencio_eloquente: 100 }
  },

  {
    id: "agnes",
    number: "012",
    name: "Agnes Tachyon",
    origin: "Umamusume: Pretty Derby",
    themeColor: "#B8E986",
    spriteUrl: agnesSprite,
    cardTitle: "Fórmula Perfeita",
    message: "Depois de muitos testes em laboratório e cálculos matemáticos precisos, cheguei à conclusão científica irrefutável: nossa conexão gera uma reação química perfeita e altamente positiva! impossível resistir a essa fórmula de amor e carinho que temos juntos.",
    stats: { afeicao: 91, excentricidade: 100, velocidade: 95 }
  },

  {
    id: "niko",
    number: "013",
    name: "Niko",
    origin: "OneShot",
    themeColor: "#9013FE",
    spriteUrl: nikoSprite,
    cardTitle: "Carregando o Sol",
    message: "Você só tem uma chance (OneShot) de causar um impacto profundo na vida de alguém, e você iluminou a minha vida como o Niko carregando o sol daquele mundo. Obrigado por ao lado do Senhor você ser luz que guia meus passos e aquece meu coração, mesmo nos dias mais sombrios.",
    stats: { afeicao: 100, fofura: 9999999, afinidade_com_gatos: 95 }
  },

  {
    id: "yasuo",
    number: "015",
    name: "Yasuo",
    origin: "League of Legends",
    themeColor: "#50E3C2", 
    spriteUrl: yasuoSprite,
    cardTitle: "O Vento Sempre Segue",
    message: "A espada só é boa nas mãos de quem sabe usá-la, assim como os dias só são bons quando compartilhados com você. Prometo que o nosso laço não vai passar como o vento (e sem dar o famoso '0/10' na nossa relação!).",
    stats: { afeicao: 95, mastery_7: 100, vento: 90 }
  },
  
   {
    id: "eltnum",
    number: "014",
    name: "Eltnum",
    origin: "Under Night In-Birth / Melty Blood",
    themeColor: "#BD10E0", 
    spriteUrl: eltnumSprite,
    cardTitle: "Under Night Protocol",
    message: "Uma personagem convidada cheia de quebras da quarta parede para te dizer diretamente: este projeto foi feito exclusivamente pensado em você, pixel por pixel, linha por linha de código.",
    stats: { afeicao: 90, quebra_de_quarta_parede: 100, combos: 95 }
  },
]