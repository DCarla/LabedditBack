export interface CommentDB {
  id: string;
  creator_id: string;
  content: string;
  likes: number;
  dislikes: number;
  created_at: string;
  post_id: string;
}

export interface CommentDBWithCreatorName {
  id: string;
  content: string;
  likes: number;
  dislikes: number;
  created_at: string;
  creator_id: string;
  creator_name: string;
  post_id: string;
}

export interface CommentModel {
  id: string;
  content: string;
  likes: number;
  dislikes: number;
  createdAt: string;
  postId: string;
  creator: {
    id: string;
    name: string;
  };
}

export interface LikeDislikeCommentDB {
  user_id: string;
  comment_id: string;
  like: number;
}

export enum COMMENT_LIKE {
  ALREADY_LIKED = "ALREADY_LIKED",
  ALREADY_DISLIKED = "ALREADY_DISLIKED",
}

export interface PostCommentDB {
  post_id: string;
  comment_id: string;
}

export interface PostCommentModel {
  postId: string;
  creatorId: string;
  name: string;
  commentId: string;
  content: string;
  likes: number;
  dislikes: number;
}

export class Comment {
  constructor(
    private id: string,
    private postId: string,
    private content: string,
    private likes: number,
    private dislikes: number,
    private createdAt: string,
    private creatorId: string,
    private creatorName: string
  ) {}

  public getId(): string {
    return this.id;
  }
  public getPostId(): string {
    return this.postId;
  }
  public setPostId(value: string) {
    this.postId = value;
  }

  public getContent(): string {
    return this.content;
  }
  public setContent(value: string) {
    this.content = value;
  }

  public getLikes(): number {
    return this.likes;
  }
  public setLikes(value: number) {
    this.likes = value;
  }
  public addLike = (): void => {
    this.likes++;
  };
  public removeLike = (): void => {
    this.likes--;
  };

  public getDislikes(): number {
    return this.dislikes;
  }
  public setDislikes(value: number) {
    this.dislikes = value;
  }
  public addDislike = (): void => {
    this.dislikes++;
  };
  public removeDislike = (): void => {
    this.dislikes--;
  };

  public getCreatedAt(): string {
    return this.createdAt;
  }

  public getCreatorId(): string {
    return this.creatorId;
  }
  public setCreatorId(value: string) {
    this.creatorId = value;
  }

  public getCreatorName(): string {
    return this.creatorName;
  }
  public setCreatorName(value: string) {
    this.creatorName = value;
  }

  public toDBModel(): CommentDB {
    return {
      id: this.id,
      creator_id: this.creatorId,
      content: this.content,
      likes: this.likes,
      dislikes: this.dislikes,
      created_at: this.createdAt,
      post_id: this.postId,
    };
  }

  public toBusinessModel(): CommentModel {
    return {
      id: this.id,
      content: this.content,
      likes: this.likes,
      dislikes: this.dislikes,
      createdAt: this.createdAt,
      postId: this.postId,
      creator: {
        id: this.creatorId,
        name: this.creatorName,
      },
    };
  }
}
