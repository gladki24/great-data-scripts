import {GR8} from './GR8';
import {ECategory} from './Enums';
import * as mysql from 'mysql2';
import {IProduct} from './Interfaces';

function insert(product: IProduct): void {
  const update = `
    INSERT INTO
    product
    (id, title, link, image_source, price, brand_id, category_id)
    VALUES (
    '${product.id}',
    '${product.title}',
    '${product.link}',
    '${product.image_source}',
    ${product.price},
    ${product.brand_id},
    ${product.category_id}
    )`
  ;

  db.query(update, (err, result, fields) => {
    if (err) {
      console.error(err);
    }
  });
}

const GR8Instance = new GR8();

const db = mysql.createConnection({
  database: 'great_database',
  host: 'localhost',
  password: 'OasisWonderwallGR8',
  user: 'great_backend',
});

try {
  GR8Instance.getProducts([
    'https://www.zara.com/pl/pl/mezczyzna-t-shirty-l855.html?v1=719523',
    'https://www.c-and-a.com/pl/pl/shop/mezczyzni-ubrania-dla-mezczyzn-t-shirty-i-koszulki-typu-polo-t-shirty',
    'http://www.reserved.com/pl/pl/man/all-3/clothes/t-shirts',
    'https://4f.com.pl/listaProduktow.php?v7dc7c065f3=1&kat=340',
    'http://www2.hm.com/pl_pl/on/produkty/t-shirty-i-podkoszulki/krotki-rekaw.html?product-type=men_tshirtstanks_shortsleeve&sort=stock&offset=0&page-size=60',
    'https://www.cropp.com/pl/pl/chlopak/kolekcja/t-shirty',
    'http://carry.pl/pl/181-koszulki',
  ], ECategory.Tshirts).then((data) => {
    for (const product of data) {
      insert(product);
    }
  }).catch((err) => {
    console.error(err);
  });
  GR8Instance.getProducts([
    'http://carry.pl/24-polo',
    'https://4f.com.pl/listaProduktow.php?v7dc7c065f3=2&kat=341',
    'https://www.zara.com/pl/pl/mezczyzna-koszulki-polo-l733.html?v1=1046053',
    'http://www.reserved.com/pl/pl/man/all-3/clothes/polos',
    'http://www2.hm.com/pl_pl/on/produkty/t-shirty-i-podkoszulki/polo.html?pagesize=60',
    'https://www.c-and-a.com/pl/pl/shop/mezczyzni-ubrania-dla-mezczyzn-t-shirty-i-koszulki-typu-polo-koszulki-typu-polo?pagesize=60&pagenumber=1'
  ], ECategory.Polos).then(data => {
    for (const product of data) {
      insert(product);
    }
  }).catch((err) => console.error(err));

  GR8Instance.getProducts([
    'https://www.zara.com/pl/pl/mezczyzna-na-drutach-l681.html?v1=733867',
    'https://www.c-and-a.com/pl/pl/shop/mezczyzni-ubrania-dla-mezczyzn-swetry-i-kardigany?pagesize=60&pagenumber=1',
    'http://www.reserved.com/pl/pl/man/all-3/clothes/sweaters',
    'http://www2.hm.com/pl_pl/on/produkty/kardigany-i-swetry.html?product-type=men_cardigansjumpers&sort=stock&offset=0&page-size=60',
    'https://www.cropp.com/pl/pl/chlopak/kolekcja/swetry'
  ], ECategory.Sweater).then(data => {
    for (const product of data) {
      insert(product);
    }
  }).catch((err) => console.error(err));

  GR8Instance.getProducts([
    'https://www.zara.com/pl/pl/mezczyzna-bluzy-l821.html?v1=1042009',
    'https://www.c-and-a.com/pl/pl/shop/mezczyzni-ubrania-dla-mezczyzn-bluzy-trykotowe-i-rozpinane',
    'http://www.reserved.com/pl/pl/man/all-3/clothes/sweatshirts',
    'https://4f.com.pl/listaProduktow.php?v7dc7c065f3=1&kat=16',
    'https://4f.com.pl/softshell,63,0.html',
    'http://www2.hm.com/pl_pl/on/produkty/bluzy-z-kapturem-i-koszulki.html?product-type=men_hoodiessweatshirts&sort=stock&offset=0&page-size=60',
    'http://carry.pl/pl/29-bluzy',
    'https://www.cropp.com/pl/pl/chlopak/kolekcja/bluzy',
    'https://4f.com.pl/polary_meskie,22,0.html'
  ], ECategory.Jumpers).then(data => {
    for (const product of data) {
      insert(product);
    }
  }).catch((err) => console.error(err));

  GR8Instance.getProducts([
    'https://www.zara.com/pl/pl/mezczyzna-koszule-l737.html?v1=719520',
    'https://www.c-and-a.com/pl/pl/shop/mezczyzni-ubrania-dla-mezczyzn-koszule',
    'http://www.reserved.com/pl/pl/man/all-3/clothes/shirts',
    'http://www2.hm.com/pl_pl/on/produkty/koszule.html?product-type=men_shirts&sort=stock&offset=0&page-size=60',
    'http://carry.pl/25-koszule',
    'https://www.cropp.com/pl/pl/chlopak/kolekcja/koszule'
  ], ECategory.Shirts).then(data => {
    for (const product of data) {
      insert(product);
    }
  }).catch(err => console.error(err));


  GR8Instance.getProducts([
    'https://www.zara.com/pl/pl/mezczyzna-jeansy-l659.html?v1=719519',
    'https://www.zara.com/pl/pl/mezczyzna-spodnie-l838.html?v1=719514',
    'https://www.c-and-a.com/pl/pl/shop/mezczyzni-ubrania-dla-mezczyzn-spodnie',
    'https://www.c-and-a.com/pl/pl/shop/mezczyzni-ubrania-dla-mezczyzn',
    'http://www.reserved.com/pl/pl/man/all-3/clothes/trousers',
    'http://www.reserved.com/pl/pl/man/all-3/clothes/jeans',
    'https://4f.com.pl/listaProduktow.php?v7dc7c065f3=1&kat=23',
    'http://www2.hm.com/pl_pl/on/produkty/spodnie.html?product-type=men_trousers&sort=stock&offset=0&page-size=60',
    'http://www2.hm.com/pl_pl/on/produkty/dzinsy.html?product-type=men_jeans&sort=stock&offset=0&page-size=60',
    'http://carry.pl/30-spodnie',
    'https://www.cropp.com/pl/pl/chlopak/kolekcja/spodnie',
    'https://www.cropp.com/pl/pl/chlopak/kolekcja/jeans'
  ], ECategory.TrousersAndJeans).then(data => {
    for (const product of data) {
      insert(product);
    }
  }).catch((err) => console.error(err));


  GR8Instance.getProducts([
    'https://www.zara.com/pl/pl/mezczyzna-bermudy-l592.html?v1=735002',
    'https://www.c-and-a.com/pl/pl/shop/mezczyzni-ubrania-dla-mezczyzn-szorty',
    'http://www.reserved.com/pl/pl/man/all-3/clothes/shorts',
    'https://4f.com.pl/listaProduktow.php?v7dc7c065f3=1&kat=88',
    'http://www2.hm.com/pl_pl/on/produkty/szorty.html?pagesize=60'
  ], ECategory.Shorts).then(data => {
    for (const product of data) {
      insert(product);
    }
  }).catch(err => console.error(err));
  GR8Instance.getProducts([
    'https://www.zara.com/pl/pl/mezczyzna-blazers-l608.html?v1=583022',
    'https://www.zara.com/pl/pl/mezczyzna-garnitury-l808.html?v1=597508',
    'https://www.c-and-a.com/pl/pl/shop/mezczyzni-ubrania-dla-mezczyzn-garnitury-modulowe',
    'http://www.reserved.com/pl/pl/man/all-3/clothes/suits',
    'http://www.reserved.com/pl/pl/man/all-3/clothes/jackets',
    'http://www2.hm.com/pl_pl/on/produkty/marynarki-i-garnitury.html?product-type=men_blazerssuits&sort=stock&offset=0&page-size=60',
    'http://carry.pl/26-marynarki'
  ], ECategory.Suits).then(data => {
    for (const product of data) {
      insert(product);
    }
  }).catch(err => console.error(err));
  GR8Instance.getProducts([
    'http://carry.pl/27-kurtki-plaszcze',
    'https://www.zara.com/pl/pl/mezczyzna-kurtki-l640.html?v1=798001',
    'https://www.c-and-a.com/pl/pl/shop/mezczyzni-ubrania-dla-mezczyzn-kurtki-i-plaszcze?pagesize=60&pagenumber=1',
    'http://www.reserved.com/pl/pl/man/all-3/clothes/outerwear',
    'https://4f.com.pl/listaProduktow.php?v7dc7c065f3=1&kat=21',
    'http://www2.hm.com/pl_pl/on/produkty/kurtki-i-plaszcze.html?product-type=men_jacketscoats&sort=stock&offset=0&page-size=60',
    'https://www.cropp.com/pl/pl/chlopak/kolekcja/kurtki-plaszcze'
  ], ECategory.Outerwear).then(data => {
    for (const product of data) {
      insert(product);
    }
  }).catch((err) => console.error(err));
  GR8Instance.getProducts([
    'https://www.zara.com/pl/pl/mezczyzna-buty-l769.html?v1=719027',
    'http://www.reserved.com/pl/pl/man/all-3/accessories/shoes',
    'http://www2.hm.com/pl_pl/on/produkty/polbuty.html?product-type=men_shoes&sort=stock&offset=0&page-size=60',
    'https://www.cropp.com/pl/pl/chlopak/kolekcja/buty'
  ], ECategory.Shoes).then(data => {
    for (const product of data) {
      insert(product);
    }
  }).catch((err) => console.error(err));
} catch (err) {
  console.log(err);
}
