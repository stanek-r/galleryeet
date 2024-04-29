export interface GalleryeetCommentDto {
  commentId: string;
  userId: string;
  createdAt: string;
  text: string;
  postId?: string;
  contentId?: string;
}

export interface GalleryeetCreateCommentDto {
  text: string;
  postId?: string;
  contentId?: string;
}
