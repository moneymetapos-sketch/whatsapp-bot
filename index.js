const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// متغيرات عامة
let whatsappClient = null;
let isClientReady = false;
let qrCodeData = null;

// إنشاء عميل واتساب
const initializeWhatsApp = () => {
  whatsappClient = new Client({
    authStrategy: new LocalAuth({
      clientId: 'bot-session',
      dataPath: './.wwebjs_auth'
    }),
    puppeteer: {
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-gpu',
        '--disable-extensions'
      ]
    }
  });

  // حدث عند توليد رمز الاستجابة السريعة (QR Code)
  whatsappClient.on('qr', (qr) => {
    console.log('QR Code generated. Scan this with your WhatsApp app:');
    qrcode.generate(qr, { small: true });
    qrCodeData = qr;
  });

  // حدث عند جاهزية العميل
  whatsappClient.on('ready', () => {
    console.log('✅ WhatsApp client is ready!');
    isClientReady = true;
    qrCodeData = null;
  });

  // حدث عند فشل المصادقة
  whatsappClient.on('auth_failure', (msg) => {
    console.error('❌ Authentication failed:', msg);
    isClientReady = false;
  });

  // حدث عند قطع الاتصال
  whatsappClient.on('disconnected', (reason) => {
    console.log('⚠️ WhatsApp client disconnected:', reason);
    isClientReady = false;
    // محاولة إعادة التهيئة تلقائياً
    setTimeout(initializeWhatsApp, 5000);
  });

  // بدء العميل
  whatsappClient.initialize().catch(err => {
    console.error('❌ Failed to initialize WhatsApp client:', err);
  });
};

// ================================
// API Endpoints
// ================================

app.get('/', (req, res) => {
  res.render('dashboard');
});

/**
 * GET /status
 */
app.get('/status', (req, res) => {
  res.json({
    status: isClientReady ? 'ready' : 'not_ready',
    isConnected: isClientReady,
    hasQR: qrCodeData ? true : false,
    message: isClientReady
      ? 'WhatsApp is connected and ready to send messages'
      : 'WhatsApp is not connected. Please scan the QR code.'
  });
});

/**
 * GET /qr
 */
app.get('/qr', (req, res) => {
  if (!qrCodeData) {
    return res.json({ qrCode: null });
  }

  const QRCode = require('qrcode');
  QRCode.toDataURL(qrCodeData, (err, url) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to generate QR code image' });
    }
    res.json({ qrCode: url });
  });
});

/**
 * POST /send-message
 */
app.post('/send-message', async (req, res) => {
  try {
    if (!isClientReady) {
      return res.status(503).json({
        error: 'WhatsApp client is not ready.',
        status: 'not_ready'
      });
    }

    const { phoneNumber, message } = req.body;

    if (!phoneNumber || !message) {
      return res.status(400).json({
        error: 'Missing required fields: phoneNumber and message'
      });
    }

    const formattedNumber = phoneNumber.replace(/\D/g, '');
    const chatId = `${formattedNumber}@c.us`;

    const result = await whatsappClient.sendMessage(chatId, message);

    res.json({
      success: true,
      message: 'Message sent successfully',
      messageId: result.id.id
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({
      error: 'Failed to send message',
      details: error.message
    });
  }
});

// Server Startup
const server = app.listen(PORT, () => {
  console.log(`🚀 WhatsApp Gateway API running on port ${PORT}`);
  initializeWhatsApp();
});
