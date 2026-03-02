import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")

REVIEW_PROMPT = """You are an expert code reviewer. Analyze the following {language} code and return a structured JSON review.

**Code to review:**
```{language}
{code}
```

Return ONLY valid JSON (no markdown, no code fences) with this exact structure:
{{
  "score": <number 1-10>,
  "bugs": [
    {{
      "line": <line number or null>,
      "issue": "<description>",
      "severity": "<low|medium|high|critical>"
    }}
  ],
  "security_issues": [
    {{
      "issue": "<description>",
      "severity": "<low|medium|high|critical>",
      "recommendation": "<fix suggestion>"
    }}
  ],
  "performance": [
    {{
      "issue": "<description>",
      "suggestion": "<improvement>"
    }}
  ],
  "suggestions": ["<general improvement suggestion>"],
  "improved_code": "<improved version of the code>",
  "summary": "<brief overall summary of code quality>"
}}

Rules:
- Score 1-10 (10 = perfect code)
- Be thorough but fair
- If no issues found in a category, return empty array []
- improved_code should be the full corrected version
- summary should be 2-3 sentences
"""


async def review_code(code: str, language: str) -> dict:
    """Send code to Gemini API for review and return structured feedback."""
    prompt = REVIEW_PROMPT.format(language=language, code=code)

    try:
        response = await model.generate_content_async(prompt)
        text = response.text.strip()

        # Clean up response — remove markdown fences if present
        if text.startswith("```"):
            text = text.split("\n", 1)[1]  # remove first line
        if text.endswith("```"):
            text = text.rsplit("```", 1)[0]
        text = text.strip()

        result = json.loads(text)

        # Validate and set defaults
        result.setdefault("score", 5)
        result.setdefault("bugs", [])
        result.setdefault("security_issues", [])
        result.setdefault("performance", [])
        result.setdefault("suggestions", [])
        result.setdefault("improved_code", code)
        result.setdefault("summary", "Review completed.")

        return result

    except json.JSONDecodeError:
        return {
            "score": 0,
            "bugs": [],
            "security_issues": [],
            "performance": [],
            "suggestions": ["AI returned invalid response. Please try again."],
            "improved_code": code,
            "summary": "Failed to parse AI response.",
        }
    except Exception as e:
        return {
            "score": 0,
            "bugs": [],
            "security_issues": [],
            "performance": [],
            "suggestions": [f"Error: {str(e)}"],
            "improved_code": code,
            "summary": f"Error during review: {str(e)}",
        }
