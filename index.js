import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const EMAIL = "Kashish0417.be23@chitkara.edu.in";

/* ---------------- HEALTH API ---------------- */
app.get("/health", (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: EMAIL
  });
});

/* ---------------- POST /bfhl ---------------- */
app.post("/bfhl", async (req, res) => {
  try {
    const body = req.body;

    /* Fibonacci */
    if (body.fibonacci !== undefined) {
      const n = body.fibonacci;
      if (typeof n !== "number" || n < 0)
        return res.status(400).json({ is_success: false });

      const fib = [];
      let a = 0, b = 1;
      for (let i = 0; i < n; i++) {
        fib.push(a);
        [a, b] = [b, a + b];
      }

      return res.json({
        is_success: true,
        official_email: EMAIL,
        data: fib
      });
    }

    /* Prime */
    if (body.prime) {
      const primes = body.prime.filter(num => {
        if (num < 2) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
          if (num % i === 0) return false;
        }
        return true;
      });

      return res.json({
        is_success: true,
        official_email: EMAIL,
        data: primes
      });
    }

    /* HCF */
    if (body.hcf) {
      const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
      const result = body.hcf.reduce(gcd);

      return res.json({
        is_success: true,
        official_email: EMAIL,
        data: result
      });
    }

    /* LCM */
    if (body.lcm) {
      const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
      const lcm = (a, b) => (a * b) / gcd(a, b);
      const result = body.lcm.reduce(lcm);

      return res.json({
        is_success: true,
        official_email: EMAIL,
        data: result
      });
    }

    /* AI */
    if (body.AI) {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + process.env.GEMINI_API_KEY,
        {
          contents: [{ parts: [{ text: body.AI }] }]
        }
      );

      const answer =
        response.data.candidates[0].content.parts[0].text.split(" ")[0];

      return res.json({
        is_success: true,
        official_email: EMAIL,
        data: answer
      });
    }

    res.status(400).json({ is_success: false });

  } catch (err) {
    res.status(500).json({ is_success: false });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
