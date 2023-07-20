/**
 * strategy design pattern for real-world example.
 *  - 文件格式轉換器
 *  - 加密器
 *  - 壓縮器
 *  - 排序算法
 *  - 搜索算法
 * 
 * 
 * Reference:
 *  - https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
 */


// 實例1: 文件格式轉換器
{
  interface Formatter {
    format(data: string): string;
  }

  class MarkdownFormatter implements Formatter {
    public format(data: string): string {
      return data.replace("/\n/g", "\n\n");
    }
  }

  class HTMLFormatter implements Formatter {
    format(data: string): string {
      return data.replace("/\n/g", "<br>");
    }
  }

  class TextFormatter implements Formatter {
    public format(data: string): string {
      return data;
    }
  }

  class FormatterFactory {
    public static getFormatter(format: string): Formatter {
      switch (format) {
        case 'markdown':
          return new MarkdownFormatter();
        case 'html': 
          return new HTMLFormatter();
        case 'text':
          return new TextFormatter();
        default:
          throw new Error('Unknown  format');
      }
    }
  }

  const data = "this is some text.";
  const markdownFormatter = FormatterFactory.getFormatter("markdown");
  const htmlFormatter = FormatterFactory.getFormatter("html");
  const textFormatter = FormatterFactory.getFormatter("text");

  // TODO: 尚未處理<p></p>
  console.log(markdownFormatter.format(data)); // This is some text.
  console.log(htmlFormatter.format(data)); // <p>This is some text.</p>
  console.log(textFormatter.format(data)); // This is some text.
}


// 實例2: 加密器
import * as crypto from 'crypto';

// TODO: code refactory crypto.
{ 
  interface Encryptor {
    encrypt(data: string): Buffer;
  }
  
  class MD5Encryptor implements Encryptor {
    public encrypt(data: string): Buffer {
      return crypto.createHash('md5')
        .update(data)
        .digest();
        // .toString();
    }
  }
  
  class SHA1Encryptor implements Encryptor {
    public encrypt(data: string): Buffer {
      return crypto.createHash('sha1')
        .update(data)
        .digest();
        // .toString();
    }
  }
  
  class SHA256Encryptor implements Encryptor {
    public encrypt(data: string): Buffer {
      return crypto.createHash('sha256')
        .update(data)
        .digest();
        // .toString();
    }
  }
  
  class EncryptorFactory {
    public static getEncryptor(algorithm: string): Encryptor {
      switch (algorithm) {
        case "md5":
          return new MD5Encryptor();
        case "sha1":
          return new SHA1Encryptor();
        case "sha256":
          return new SHA256Encryptor();
        default:
          throw new Error("Unknown algorithm");
      }
    }
  }

  const data = "This is some text.";

  const md5_res = new MD5Encryptor();
  console.log(`md5: ${md5_res.encrypt(data)}`);
  const md5Encryptor = EncryptorFactory.getEncryptor("md5");
  console.log(md5Encryptor.encrypt(data));
  

  const sha1_res = new SHA1Encryptor();
  console.log(`sha1: ${sha1_res.encrypt(data)}`);
  const sha1Encryptor = EncryptorFactory.getEncryptor("sha1");
  console.log(sha1Encryptor.encrypt(data));
  
  
  const sha256_res = new SHA256Encryptor();
  console.log(`sha256: ${sha256_res.encrypt(data)}`);
  const sha256Encryptor = EncryptorFactory.getEncryptor("sha256");
  console.log(sha256Encryptor.encrypt(data));
  

  // console.log(md5Encryptor.encrypt(data)); // 5eb63bbbe01eeed093cb22bb8f5acdc327ba613b
  // console.log(sha1Encryptor.encrypt(data)); // 5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8
  // console.log(sha256Encryptor.encrypt(data)); // ebcb85710311535c185c9580194508841985198843b84695e792d4b0c4048d34
}

// 實例3: 壓縮器
{
  interface Compressor {
    compress(data: string): string;
  }
  
  class GzipCompressor implements Compressor {
    public compress(data: string): string {
      return zlib.gzip(data);
    }
  }
  
  class Bzip2Compressor implements Compressor {
    public compress(data: string): string {
      return zlib.bzip2(data);
    }
  }
  
  class CompressorFactory {
    public static getCompressor(algorithm: string): Compressor {
      switch (algorithm) {
        case "gzip":
          return new GzipCompressor();
        case "bzip2":
          return new Bzip2Compressor();
        default:
          throw new Error("Unknown algorithm");
      }
    }
  }
  
  const data = "This is some text.";
  
  const compressor = CompressorFactory.getCompressor("gzip");
  const compressedData = compressor.compress(data);
  
  console.log(compressedData); // ZGVmYXVsdGRvbWFpbnRz
}

// 實例4: 排序算法


// 實例5: 搜索算法

