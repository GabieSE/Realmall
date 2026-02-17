
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  /**
   * Edits an image based on a text prompt using gemini-2.5-flash-image.
   * @param imageBase64 The base64 string of the image (without prefix).
   * @param mimeType The mime type of the image (e.g., 'image/jpeg').
   * @param prompt The editing instruction.
   * @returns The edited image as a base64 data URL.
   */
  async editImage(imageBase64: string, mimeType: string, prompt: string): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: imageBase64,
              mimeType: mimeType,
            },
          },
          {
            text: `Carefully edit this product image based on the following instruction: "${prompt}". Maintain high quality and realistic lighting. Return only the edited image.`,
          },
        ],
      },
    });

    let editedBase64 = '';
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        editedBase64 = part.inlineData.data;
        break;
      }
    }

    if (!editedBase64) {
      throw new Error("No image was returned from Gemini.");
    }

    return `data:${mimeType};base64,${editedBase64}`;
  }

  /**
   * Helper to convert an image URL to base64.
   */
  async urlToBase64(url: string): Promise<{ data: string; mimeType: string }> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        const [meta, data] = result.split(',');
        const mimeType = meta.match(/:(.*?);/)?.[1] || 'image/jpeg';
        resolve({ data, mimeType });
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}

export const geminiService = new GeminiService();
