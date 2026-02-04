/**
 * مثال على استخدام WhatsApp Gateway API
 * هذا الملف يوضح كيفية استخدام الـ API من تطبيق Node.js
 */

const axios = require('axios');

// عنوان الخادم (غيّر هذا حسب موقع التطبيق)
const API_URL = 'http://localhost:3000';

// ================================
// دالة للتحقق من حالة الاتصال
// ================================
async function checkStatus() {
  try {
    console.log('🔍 جاري التحقق من حالة الاتصال...');
    const response = await axios.get(`${API_URL}/status`);
    console.log('✅ حالة الاتصال:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ خطأ في التحقق من الحالة:', error.message);
  }
}

// ================================
// دالة لإرسال رسالة نصية
// ================================
async function sendMessage(phoneNumber, message) {
  try {
    console.log(`📤 جاري إرسال رسالة إلى ${phoneNumber}...`);
    const response = await axios.post(`${API_URL}/send-message`, {
      phoneNumber: phoneNumber,
      message: message
    });
    console.log('✅ تم إرسال الرسالة بنجاح:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ خطأ في إرسال الرسالة:', error.response?.data || error.message);
  }
}

// ================================
// دالة لإرسال رسالة إلى مجموعة
// ================================
async function sendGroupMessage(groupId, message) {
  try {
    console.log(`📤 جاري إرسال رسالة إلى المجموعة ${groupId}...`);
    const response = await axios.post(`${API_URL}/send-message-group`, {
      groupId: groupId,
      message: message
    });
    console.log('✅ تم إرسال الرسالة إلى المجموعة بنجاح:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ خطأ في إرسال الرسالة إلى المجموعة:', error.response?.data || error.message);
  }
}

// ================================
// دالة للحصول على جهات الاتصال
// ================================
async function getContacts() {
  try {
    console.log('👥 جاري جلب جهات الاتصال...');
    const response = await axios.get(`${API_URL}/contacts`);
    console.log('✅ جهات الاتصال:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ خطأ في جلب جهات الاتصال:', error.response?.data || error.message);
  }
}

// ================================
// دالة للحصول على المحادثات
// ================================
async function getChats() {
  try {
    console.log('💬 جاري جلب المحادثات...');
    const response = await axios.get(`${API_URL}/chats`);
    console.log('✅ المحادثات:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ خطأ في جلب المحادثات:', error.response?.data || error.message);
  }
}

// ================================
// دالة للحصول على رمز الاستجابة السريعة
// ================================
async function getQRCode() {
  try {
    console.log('📱 جاري جلب رمز الاستجابة السريعة...');
    const response = await axios.get(`${API_URL}/qr`);
    console.log('✅ رمز الاستجابة السريعة:', response.data.qrCode.substring(0, 50) + '...');
    return response.data;
  } catch (error) {
    console.error('❌ خطأ في جلب رمز الاستجابة السريعة:', error.response?.data || error.message);
  }
}

// ================================
// دالة لتسجيل الخروج
// ================================
async function logout() {
  try {
    console.log('🚪 جاري تسجيل الخروج...');
    const response = await axios.post(`${API_URL}/logout`);
    console.log('✅ تم تسجيل الخروج بنجاح:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ خطأ في تسجيل الخروج:', error.response?.data || error.message);
  }
}

// ================================
// مثال على الاستخدام
// ================================
async function main() {
  console.log('🚀 بدء اختبار WhatsApp Gateway API\n');

  // 1. التحقق من الحالة
  await checkStatus();
  console.log('\n---\n');

  // 2. الحصول على جهات الاتصال
  await getContacts();
  console.log('\n---\n');

  // 3. الحصول على المحادثات
  await getChats();
  console.log('\n---\n');

  // 4. إرسال رسالة نصية (غيّر الرقم والرسالة)
  await sendMessage('966501234567', 'مرحباً! هذه رسالة تجريبية من API');
  console.log('\n---\n');

  // 5. إرسال رسالة إلى مجموعة (غيّر معرف المجموعة والرسالة)
  // await sendGroupMessage('120363123456789-1234567890@g.us', 'مرحباً بالجميع!');

  console.log('\n✅ انتهى الاختبار');
}

// تشغيل المثال
if (require.main === module) {
  main().catch(console.error);
}

// تصدير الدوال للاستخدام في ملفات أخرى
module.exports = {
  checkStatus,
  sendMessage,
  sendGroupMessage,
  getContacts,
  getChats,
  getQRCode,
  logout
};
