/**
 * 策略模式 (Strategy Design Pattern) - 真實世界範例
 * 展示策略模式在五種常見場景的應用：
 * 1. 文件格式轉換器
 * 2. 加密器
 * 3. 壓縮器
 * 4. 排序演算法
 * 5. 搜尋演算法
 */

// ============================================================
// 實例 1：文件格式轉換器
// 不同格式（Markdown、HTML、純文字）的格式化行為被封裝成策略
// ============================================================
{
  /** [策略介面] 文字格式化器 */
  interface Formatter {
    format(data: string): string;
  }

  /** [具體策略] Markdown 格式化 */
  class MarkdownFormatter implements Formatter {
    format(data: string): string {
      return data.replace(/\n/g, '\n\n');
    }
  }

  /** [具體策略] HTML 格式化 */
  class HTMLFormatter implements Formatter {
    format(data: string): string {
      return `<p>${data.replace(/\n/g, '<br>')}</p>`;
    }
  }

  /** [具體策略] 純文字格式化 */
  class TextFormatter implements Formatter {
    format(data: string): string {
      return data;
    }
  }

  const data = 'Hello World\nThis is strategy pattern.';
  console.log('Markdown:', new MarkdownFormatter().format(data));
  console.log('HTML:', new HTMLFormatter().format(data));
  console.log('Text:', new TextFormatter().format(data));
}

// ============================================================
// 實例 2：加密器（不同演算法封裝成策略）
// ============================================================
import * as crypto from 'crypto';

{
  /** [策略介面] 加密器 */
  interface Encryptor {
    encrypt(data: string): Buffer;
  }

  /** [具體策略] MD5 加密 */
  class MD5Encryptor implements Encryptor {
    encrypt(data: string): Buffer {
      return crypto.createHash('md5').update(data).digest();
    }
  }

  /** [具體策略] SHA1 加密 */
  class SHA1Encryptor implements Encryptor {
    encrypt(data: string): Buffer {
      return crypto.createHash('sha1').update(data).digest();
    }
  }

  /** [具體策略] SHA256 加密 */
  class SHA256Encryptor implements Encryptor {
    encrypt(data: string): Buffer {
      return crypto.createHash('sha256').update(data).digest();
    }
  }

  const text = 'Hello Strategy Pattern';
  console.log('\nMD5:', new MD5Encryptor().encrypt(text).toString('hex'));
  console.log('SHA1:', new SHA1Encryptor().encrypt(text).toString('hex'));
  console.log('SHA256:', new SHA256Encryptor().encrypt(text).toString('hex'));
}

// ============================================================
// 實例 3：壓縮器（不同壓縮演算法封裝成策略）
// ============================================================
import * as zlib from 'zlib';

{
  /** [策略介面] 壓縮器 */
  interface Compressor {
    compress(data: string): Buffer;
  }

  /** [具體策略] Gzip 壓縮 */
  class GzipCompressor implements Compressor {
    compress(data: string): Buffer {
      return zlib.gzipSync(Buffer.from(data));
    }
  }

  /** [具體策略] Deflate 壓縮 */
  class DeflateCompressor implements Compressor {
    compress(data: string): Buffer {
      return zlib.deflateSync(Buffer.from(data));
    }
  }

  const text = 'This is some text to compress.';
  console.log('\nGzip 壓縮:', new GzipCompressor().compress(text).length, 'bytes');
  console.log('Deflate 壓縮:', new DeflateCompressor().compress(text).length, 'bytes');
}
