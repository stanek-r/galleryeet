import { GalleryeetCommentDto } from './comment.dto';

export interface GalleryeetContentDto {
  contentId: string;
  userId: string;
  createdAt: string;
  title: string;
}

export interface GalleryeetFullContentDto extends GalleryeetContentDto {
  comments: GalleryeetCommentDto[];
}

export interface GalleryeetCreateContentDto {
  title: string;
  imageId?: string;
  videoId?: string;
}