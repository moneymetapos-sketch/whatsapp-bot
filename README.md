# WhatsApp Gateway API

تطبيق وسيط مجاني لإرسال واستقبال رسائل واتساب عبر API بسيطة، باستخدام تقنية أتمتة واتساب ويب (WhatsApp Web Automation).

## المميزات

✅ **إرسال رسائل نصية** إلى جهات اتصال فردية  
✅ **إرسال رسائل إلى مجموعات**  
✅ **الحصول على قائمة جهات الاتصال**  
✅ **الحصول على قائمة المحادثات**  
✅ **مجاني تماماً** - لا توجد رسوم API  
✅ **سهل التكامل** - واجهة REST API بسيطة  
✅ **يعمل 24 ساعة** - عند النشر على خادم مستمر

## المتطلبات

- **Node.js** إصدار 18 أو أحدث
- **npm** أو **yarn**
- حساب واتساب نشط (رقم هاتف صحيح)

## التثبيت المحلي

### 1. استنساخ المشروع أو تحميل الملفات

```bash
git clone https://github.com/yourusername/whatsapp-gateway.git
cd whatsapp-gateway
```

### 2. تثبيت المكتبات

```bash
npm install
```

### 3. تشغيل التطبيق

```bash
npm start
```

سيظهر رمز الاستجابة السريعة (QR Code) في الكونسول. قم بمسح هذا الرمز باستخدام تطبيق واتساب على هاتفك.

### 4. الوصول إلى الـ API

بعد مسح الرمز بنجاح، يمكنك الوصول إلى الـ API على:

```
http://localhost:3000
```

## استخدام الـ API

### 1. التحقق من حالة الاتصال

**الطلب:**
```bash
GET http://localhost:3000/status
```

**الرد:**
```json
{
  "status": "ready",
  "isConnected": true,
  "hasQR": false,
  "message": "WhatsApp is connected and ready to send messages"
}
```

### 2. إرسال رسالة نصية

**الطلب:**
```bash
POST http://localhost:3000/send-message
Content-Type: application/json

{
  "phoneNumber": "966501234567",
  "message": "مرحباً! هذه رسالة تجريبية"
}
```

**ملاحظات:**
- استخدم رقم الهاتف بدون علامة `+` (مثال: `966501234567` بدلاً من `+966501234567`)
- تأكد من أن جهة الاتصال موجودة في قائمة جهات اتصالك في واتساب

**الرد:**
```json
{
  "success": true,
  "message": "Message sent successfully",
  "messageId": "wamid.xxxxx",
  "phoneNumber": "966501234567",
  "timestamp": "2024-02-03T12:00:00.000Z"
}
```

### 3. إرسال رسالة إلى مجموعة

**الطلب:**
```bash
POST http://localhost:3000/send-message-group
Content-Type: application/json

{
  "groupId": "120363123456789-1234567890@g.us",
  "message": "مرحباً بالجميع في المجموعة!"
}
```

**الحصول على معرف المجموعة:**
استخدم الـ endpoint `/chats` للحصول على معرفات المجموعات.

### 4. الحصول على قائمة جهات الاتصال

**الطلب:**
```bash
GET http://localhost:3000/contacts
```

**الرد:**
```json
{
  "success": true,
  "count": 5,
  "contacts": [
    {
      "id": "966501234567",
      "name": "أحمد",
      "number": "966501234567"
    },
    {
      "id": "966509876543",
      "name": "فاطمة",
      "number": "966509876543"
    }
  ]
}
```

### 5. الحصول على قائمة المحادثات

**الطلب:**
```bash
GET http://localhost:3000/chats
```

**الرد:**
```json
{
  "success": true,
  "count": 3,
  "chats": [
    {
      "id": "966501234567@c.us",
      "name": "أحمد",
      "isGroup": false,
      "unreadCount": 0,
      "timestamp": 1707025200
    },
    {
      "id": "120363123456789-1234567890@g.us",
      "name": "مجموعة العمل",
      "isGroup": true,
      "unreadCount": 5,
      "timestamp": 1707025200
    }
  ]
}
```

### 6. الحصول على رمز الاستجابة السريعة (QR Code)

**الطلب:**
```bash
GET http://localhost:3000/qr
```

**الرد:**
```json
{
  "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADCAYAAADQF3NwAAAAAklEQVR4nO3..."
}
```

### 7. تسجيل الخروج

**الطلب:**
```bash
POST http://localhost:3000/logout
```

**الرد:**
```json
{
  "success": true,
  "message": "Logged out successfully. Please restart the application."
}
```

## النشر على منصة Render (مجاني)

### الخطوة 1: إنشاء حساب على Render

1. اذهب إلى [render.com](https://render.com)
2. قم بالتسجيل باستخدام حسابك على GitHub أو Google

### الخطوة 2: إنشاء Web Service جديد

1. من لوحة التحكم، اضغط على **New +** ثم اختر **Web Service**
2. اختر **Build and deploy from a Git repository**
3. اربط حسابك على GitHub

### الخطوة 3: اختيار المشروع

1. ابحث عن مشروع `whatsapp-gateway` الخاص بك
2. اضغط **Connect**

### الخطوة 4: تكوين الخدمة

ملء الحقول التالية:

| الحقل | القيمة |
| --- | --- |
| **Name** | `whatsapp-gateway` |
| **Environment** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | `Free` |

### الخطوة 5: النشر

اضغط **Create Web Service** وانتظر انتهاء النشر (قد يستغرق 5-10 دقائق).

بعد انتهاء النشر، ستحصل على رابط مثل:
```
https://whatsapp-gateway.onrender.com
```

### الخطوة 6: مسح الباركود

1. اذهب إلى `https://whatsapp-gateway.onrender.com`
2. ستظهر رسالة في السجلات (Logs) تطلب منك مسح الباركود
3. اضغط على **Logs** في لوحة التحكم لرؤية الرمز
4. امسح الرمز باستخدام تطبيق واتساب

### الخطوة 7: استخدام الـ API

الآن يمكنك استخدام الـ API باستخدام الرابط:
```
https://whatsapp-gateway.onrender.com/send-message
```

## النشر على منصة Railway (مجاني)

### الخطوة 1: إنشاء حساب على Railway

1. اذهب إلى [railway.app](https://railway.app)
2. قم بالتسجيل باستخدام حسابك على GitHub

### الخطوة 2: إنشاء مشروع جديد

1. اضغط **New Project**
2. اختر **Deploy from GitHub repo**

### الخطوة 3: اختيار المشروع

ابحث عن مشروع `whatsapp-gateway` الخاص بك واختره.

### الخطوة 4: تكوين المتغيرات

في قسم **Variables**، أضف:

```
PORT=3000
NODE_ENV=production
```

### الخطوة 5: النشر

سيتم النشر تلقائياً. انتظر حتى تظهر رسالة "Deployed successfully".

### الخطوة 6: الحصول على الرابط

اذهب إلى **Settings** ثم **Domains** للحصول على رابط التطبيق.

## تكامل مع موقعك

### مثال باستخدام JavaScript

```javascript
async function sendWhatsAppMessage(phoneNumber, message) {
  try {
    const response = await fetch('https://your-domain.com/send-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phoneNumber: phoneNumber,
        message: message
      })
    });

    const data = await response.json();
    if (data.success) {
      console.log('✅ Message sent successfully!');
      return data;
    } else {
      console.error('❌ Failed to send message:', data.error);
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// الاستخدام
sendWhatsAppMessage('966501234567', 'مرحباً! هذه رسالة من موقعي');
```

### مثال باستخدام Python

```python
import requests

def send_whatsapp_message(phone_number, message):
    url = 'https://your-domain.com/send-message'
    payload = {
        'phoneNumber': phone_number,
        'message': message
    }
    
    try:
        response = requests.post(url, json=payload)
        data = response.json()
        
        if data.get('success'):
            print('✅ Message sent successfully!')
            return data
        else:
            print(f'❌ Failed to send message: {data.get("error")}')
    except Exception as e:
        print(f'❌ Error: {e}')

# الاستخدام
send_whatsapp_message('966501234567', 'مرحباً! هذه رسالة من موقعي')
```

## التحديات والمخاطر

⚠️ **مهم:** يرجى قراءة النقاط التالية قبل الاستخدام:

1. **خطر الحظر:** واتساب قد تحظر الأرقام التي تستخدم أتمتة واتساب ويب بشكل مكثف. استخدم هذا التطبيق بحذر وعدم الإفراط في الإرسال.

2. **عدم الاستقرار:** قد تنقطع جلسة الاتصال بسبب تحديثات واتساب أو مشاكل في الشبكة.

3. **الخصوصية:** تأكد من أن لديك إذن من المستخدمين قبل إرسال رسائل لهم.

4. **الامتثال القانوني:** استخدم هذا التطبيق بما يتوافق مع القوانين المحلية والدولية.

## استكشاف الأخطاء

### المشكلة: لا يظهر رمز الاستجابة السريعة

**الحل:**
- تأكد من أن التطبيق يعمل بشكل صحيح
- تحقق من السجلات (Logs) للأخطاء
- أعد تشغيل التطبيق

### المشكلة: فشل إرسال الرسالة

**الحل:**
- تأكد من أن جهة الاتصال موجودة في قائمة جهات اتصالك
- تحقق من صيغة رقم الهاتف (بدون علامة `+`)
- تأكد من أن الاتصال جاهز (استخدم `/status`)

### المشكلة: انقطاع الاتصال بشكل متكرر

**الحل:**
- قد تكون هناك مشكلة في الشبكة
- حاول إعادة تشغيل التطبيق
- تحقق من سجلات الخطأ

## الدعم والمساعدة

إذا واجهت أي مشاكل، يرجى:

1. التحقق من السجلات (Logs) للأخطاء
2. قراءة قسم استكشاف الأخطاء أعلاه
3. البحث عن الحل في مستودع المشروع

## الترخيص

هذا المشروع مرخص تحت رخصة MIT.

## الشكر والتقدير

شكراً لاستخدامك WhatsApp Gateway API!

---

**ملاحظة:** هذا المشروع غير رسمي وغير مدعوم من قبل Meta أو WhatsApp. استخدمه على مسؤوليتك الخاصة.
