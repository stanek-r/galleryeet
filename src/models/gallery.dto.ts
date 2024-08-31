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
  thumbnail: GalleryeetContentDto;
}

export interface GalleryeetFullGalleryDto extends GalleryeetGalleryDto {
  contents: (GalleryeetFullContentDto & GalleryeetGalleryOrderDto)[];
}

export interface GalleryeetCreateGalleryDto {
  title: string;
  description?: string;
  thumbnailId: string;
  contentIds: string[];
}
