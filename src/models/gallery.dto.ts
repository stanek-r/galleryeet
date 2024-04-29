import { GalleryeetContentDto, GalleryeetFullContentDto } from './content.dto';

export interface GalleryeetGalleryDto {
  galleryId: string;
  createdAt: string;
  title: string;
  description?: string;
}

export interface GalleryeetFullGalleryDto extends GalleryeetGalleryDto {
  thumbnail: GalleryeetContentDto;
  contents: GalleryeetFullContentDto[];
}

export interface GalleryeetCreateGalleryDto {
  title: string;
  description?: string;
  thumbnailId: string;
  contentIds: string[];
}
