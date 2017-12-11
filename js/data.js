/**
 * Array de Objetos de guitarras.
 * @type {Object[]}
 */
var guitarList = [
	{
		"id": 1,
		"name": "Stratocaster USA",
		"description": "La Stratocaster para el guitarrista que pide la combinación ideal de estilo tradicional Strat® con nuevas e innovadoras características. Fabricada en México ofrece el valorado diseño Strat con un sonido y rendimiento sobrealimentados y un diapasón moderno de radio compuesto, pastillas y selector especiales y mucho más.",
		"price": 41000,
		"img": "strat.png",
		"sale": false
	},
	{
		"id": 2,
		"name": "Stratocaster Mx",
		"description": "La Stratocaster para el guitarrista que pide la combinación ideal de estilo tradicional Strat® con nuevas e innovadoras características. Fabricada en Estados Unidos ofrece el valorado diseño Strat con un sonido y rendimiento sobrealimentados y un diapasón moderno de radio compuesto, pastillas y selector especiales y mucho más.",
		"price": 23000,
		"img": "stratmx.png",
		"sale": true
	},
	{
		"id": 3,
		"name": "Telecaster USA",
		"description": "Para guitarristas que anhelan el sonido original del instrumento, además de su sonido, estética y sensaciones, la Telecaster es el epítome de uno de los instrumentos más míticos en la década de su debut, con el inconfundible estilo y chasquido Tele® de la primera época.",
		"price": 43000,
		"img": "tele.png",
		"sale": false
	},
	{
		"id": 4,
		"name": "Jaguar USA",
		"description": "Para los guitarristas que desean recuperar el sonido original, aspecto y sensaciones de la era Jaguar, Jaguar® Lacquer representa el instrumento en su máximo esplendor en la década de su debut. Cuando los guitarristas de costa a costa la popularizaron surfeando con ella sobre olas de reverberación y música instrumental.",
		"price": 55000,
		"img": "jaguar.png",
		"sale": false
	}
];

/**
 * Array de Objetos de amplificadores.
 * @type {Object[]}
 */
var ampsList = [
	{
		"id": 5,
		"name": "Blues Junior III",
		"description": "El estándar para el guitarrista de concierto y el amplificador ideal para desarrollar tu propio sonido. Los amplificadores Hot Rod ofrecen un gran volumen, fiabilidad, y capacidad de respuesta a los pedales de efectos, por un precio asequible. El Blues Junior III es un consolidado modelo de 15 vatios, con una calidez de sonido ideal para el guitarrista que necesita equipo portátil, que le permita trasladarse con facilidad del escenario al estudio, y con un gran sonido y características versátiles.",
		"price": 23000,
		"img": "blues3.png",
		"sale": true
	},
	{
		"id": 6,
		"name": "Blues Deluxe Reissue",
		"description": "El Blues Deluxe Reissue es el estándar para el guitarrista de concierto, y el amplificador equipado con un altavoz de 12\" ideal para desarrollar tu propio sonido. Los guitarristas profesionales de rock, country o blues valoran los amplificadores sencillos por su volumen, fiabilidad, capacidad de respuesta a los pedales de efectos, y su precio asequible. El Blues Deluxe Reissue ofrece 40 vatios de formidable sonido boutique de formidable calidez, y su acabado en tweed le otorga un marcado estilo vintage. Un amplificador imprescindible que recuerda la era y el sonido originales de Fender.",
		"price": 35000,
		"img": "deluxe.png",
		"sale": false
	},
	{
		"id": 7,
		"name": "Hot Rod DeVille III 410",
		"description": "Es el amplificador estándar ideal para los guitarristas de todo el mundo, tanto para sus conciertos como para desarrollar su propio sonido personal. Los guitarristas valoran los amplificadores Hot Rod por su gran volumen, fiabilidad, capacidad de respuesta a los pedales de efectos, y su precio asequible. Además de estas cualidades, el combo Hot Rod DeVille 410 III va equipado con cuatro potentes altavoces de 10\" que ofrecen rendimiento de sobra, grandes características y una apariencia clásica.",
		"price": 38000,
		"img": "hotrod.png",
		"sale": false
	}
];

/**
 * Array de Objetos de accesorios.
 * @type {Object[]}
 */
var accessoriesList = [
	{
		"id": 8,
		"name": "Tapones para oídos",
		"description": "Los tapones para los oídos serie Fender Touring ofrecen el máximo confort y protección auditiva, específicamente calibrados para uso en los músicos en largas giras. Con la nueva tecnología que permite amortiguar el ruido pero que no impiden el comunicarte durante las presentaciones y ensayos, y protegen tus oídos con una calificación de reducción de ruido de 12 decibelios.",
		"price": 300,
		"img": "plugs.png",
		"sale": true
	},
	{
		"id": 9,
		"name": "Cable",
		"description": "El cable de alimentación Fender es una línea de energía fiable que es perfecto para el escenario y estudio.",
		"price": 600,
		"img": "cable.png",
		"sale": false
	},
	{
		"id": 10,
		"name": "Púas",
		"description": "Para sacar rendimiento a tu guitarra o bajo. Las púas Fender proporcionan comodidad y flexibilidad, con una variedad de tamaños, formas y grosores que se adaptan a los estilos y preferencias de cada guitarrista. ",
		"price": 60,
		"img": "puas.png",
		"sale": false
	}
];


/**
 * Objeto final de datos por categoría
 * @type {{Guitarras: Object[], Amplificadores: Object[], Accesorios: Object[]}}
 */
var data = {
	"Guitarras": guitarList,
	"Amplificadores": ampsList,
	"Accesorios": accessoriesList
};