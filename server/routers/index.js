const router = require('express').Router();
const axios = require('axios');
const sharp = require('sharp');
const midtransClient = require('midtrans-client');

const { Manga, Chapter } = require('../models');

router.get('/', async (req, res) => {
  res.json({ message: 'Masuk' });
});


router.get('/chapter/:hash/:imageName', async (req, res) => {
  const { hash, imageName } = req.params;
  const url = `https://uploads.mangadex.org/data/${hash}/${imageName}`;
  const response = await axios({
    method: 'GET',
    url: url,
    responseType: 'stream',
  });

  res.setHeader('Content-Type', 'image/webp');
  
  const transform = sharp().webp();
  response.data.pipe(transform).pipe(res);
})


router.get('/manga/chapter', async (req, res) => {
  try {
    const { chapterId } = req.query;
    const response = await axios({
      method: 'GET',
      url: `https://api.mangadex.org/at-home/server/${chapterId}`,
    });

    const images = response.data.chapter.data.map((imageName, index) => {
      return {
        id: index,
        // imgUrl: `https://dzmanga-production.up.railway.app/chapter/${response.data.chapter.hash}/${imageName}`,
        imgUrl: `http://localhost:4000/chapter/${response.data.chapter.hash}/${imageName}`,
      };
    });

    res.json(images);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

router.get('/cover/:mangaId/:imageId', async (req, res) => {
  const { mangaId, imageId } = req.params;
  const url = `https://uploads.mangadex.org/covers/${mangaId}/${imageId}.512.jpg`;
  const response = await axios({
    method: 'GET',
    url: url,
    responseType: 'stream',
  });

  res.setHeader('Content-Type', 'image/jpeg');
  response.data.pipe(res);
});

router.get('/manga/cover', async (req, res) => {
  try {
    const { mangaId, coverId } = req.query;

    // const coverImgUrl = `https://dzmanga-production.up.railway.app/cover/${mangaId}/${coverId}`;
    const coverImgUrl = `http://localhost:4000/cover/${mangaId}/${coverId}`;

    res.json(coverImgUrl);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/allmanga', async (req, res) => {
  try {
    const { data } = await axios({
      method: 'GET',
      url: 'https://api.mangadex.org/list/8ba3dccc-0129-45fe-a409-7a674e3f6fd4/feed',
      params: {
        translatedLanguage: ['en'],
        order: {
          createdAt: 'desc',
          updatedAt: 'desc',
          publishAt: 'desc',
          readableAt: 'desc',
          volume: 'desc',
          chapter: 'desc',
        },
      },
    });

    // const fetchData = data.data[0].relationships;

    // const mangasData = fetchData.pop()

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/manga', async (req, res) => {
  try {
    const data = await Manga.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: {
        model: Chapter,
      },
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/midtrans-token', async (req, res) => {
  try {
    const { email, donation } = req.body;

    function generateRandomString() {
      const randomNumbers = Math.floor(Math.random() * 900) + 100;
      const randomLetters = Math.random().toString(36).substring(2, 5).toUpperCase();
      const randomDigits = Math.floor(Math.random() * 900) + 100;
      const randomString = `DZMANGA_${randomNumbers}${randomLetters}${randomDigits}`;

      return randomString;
    }

    const randomOrderId = generateRandomString();

    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_KEY,
    });

    let parameter = {
      transaction_details: {
        order_id: randomOrderId,
        gross_amount: donation,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        email: email,
      },
    };

    const midtransToken = await snap.createTransaction(parameter);

    res.status(201).json(midtransToken);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
