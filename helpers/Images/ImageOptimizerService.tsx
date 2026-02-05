import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';

export type OptimizedImage = {
  uri: string;
  width: number;
  height: number;
  mimeType: string;
};

export class ImageOptimizerService {
  static async optimize(uri: string): Promise<OptimizedImage> {
    // Crear el contexto de manipulación
    const context = ImageManipulator.manipulate(uri);

    // Aplicar transformación
    context.resize({ width: 1024 });

    // Renderizar la imagen
    const imageRef = await context.renderAsync();

    // Guardar el resultado
    const result = await imageRef.saveAsync({ compress: 0.6, format: SaveFormat.JPEG });

    // Liberar memoria
    context.release();
    imageRef.release();

    return {
      uri: result.uri,
      width: result.width,
      height: result.height,
      mimeType: 'image/jpeg'
    };
  }
}
