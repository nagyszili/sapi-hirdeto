import * as Jimp from 'jimp/browser/lib/jimp';

export async function imageResize(
  image: Buffer,
  width: number,
  quality: number
): Promise<Buffer>;

export async function imageResize(
  image: string,
  width: number,
  quality: number
): Promise<Buffer>;

export async function imageResize(
  image: any,
  width: any,
  quality: any
): Promise<any> {
  return (await Jimp.read(image))
    .resize(width, Jimp.AUTO)
    .quality(quality)
    .getBufferAsync(Jimp.MIME_JPEG);
}

export async function imageRotate(image: Buffer): Promise<Buffer>;

export async function imageRotate(image: string): Promise<Buffer>;

export async function imageRotate(image: any): Promise<any> {
  return (await Jimp.read(image))
    .rotate(90)
    .quality(100)
    .getBufferAsync(Jimp.MIME_JPEG);
}
