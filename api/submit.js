export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { name, age, format, contact } = req.body;

  if (!name || !contact) return res.status(400).json({ error: 'missing fields' });

  const lines = [
    '📩 *Новая заявка на занятие*',
    `👤 Имя: ${name}`,
    age ? `🎂 Возраст: ${age}` : null,
    `📋 Формат: ${format}`,
    `📞 Контакт: ${contact}`,
  ].filter(Boolean).join('\n');

  const tgRes = await fetch(
    `https://api.telegram.org/bot8630232495:AAFCOBWQxm3IZKPNTEwUWI9494Vhwg3POCk/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: 731259454, text: lines, parse_mode: 'Markdown' }),
    }
  );

  if (!tgRes.ok) return res.status(500).json({ error: 'telegram error' });
  return res.status(200).json({ ok: true });
}
