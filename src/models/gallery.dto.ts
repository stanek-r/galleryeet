import { GalleryeetContentDto, GalleryeetFullContentDto } from './content.dto';

export interface GalleryeetGalleryOrderDto {
  contentId: string;
  order: number;
}

export interface GalleryeetGalleryDto {
  galleryId: string;
  createdAt: string;
  title: string;
  description?: string;
}

export interface GalleryeetFullGalleryDto extends GalleryeetGalleryDto {
  thumbnail: GalleryeetContentDto;
  contents: (GalleryeetFullContentDto & GalleryeetGalleryOrderDto)[];
}

export interface GalleryeetCreateGalleryDto {
  title: string;
  description?: string;
  thumbnailId: string;
  contentIds: string[];
}
