import express from 'express';
import cors from 'cors';
import { z } from 'zod';
import rateLimit from 'express-rate-limit';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 4000;
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173').split(',').map(v => v.trim());
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '12kb' }));
app.use('/api/contact', rateLimit({ windowMs: 15 * 60 * 1000, limit: 5, standardHeaders: 'draft-7', legacyHeaders: false }));
app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'krishna-portfolio-api' }));
const contactSchema = z.object({ name: z.string().trim().min(2).max(80), email: z.string().email().max(160), message: z.string().trim().min(10).max(2000) });
app.post('/api/contact', (req, res) => {
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ ok: false, message: 'Please provide a valid name, email and message.' });
  // Deliberately do not pretend to send email. Connect an email provider before production.
  console.info('Portfolio contact submission received:', { ...parsed.data, receivedAt: new Date().toISOString() });
  return res.status(202).json({ ok: true, message: 'Message received by the demo API. Email delivery is not configured yet.' });
});
app.listen(port, () => console.log(`Portfolio API listening on http://localhost:${port}`));
