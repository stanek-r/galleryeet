import { GalleryeetContentDto } from './content.dto';
import { GalleryeetCommentDto } from './comment.dto';

export interface GalleryeetPostDto {
  postId: string;
  createdAt: string;
  title: string;
  content: string;
}

export interface GalleryeetFullPostDto extends GalleryeetPostDto {
  thumbnail: GalleryeetContentDto;
  contents: GalleryeetContentDto[];
  comments: GalleryeetCommentDto[];
}

export interface GalleryeetCreatePostDto {
  title: string;
  content: string;
  thumbnailId: string;
  contentIds: string[];
}
