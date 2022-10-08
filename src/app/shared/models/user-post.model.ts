import { PostConditionEnum } from "../enums/PostConditionEnum";
import { PostStatusEnum } from "../enums/PostStatusEnum";
import { TagEnum } from "../enums/TagEnum";
import { Post } from "./post.model";

export class UserPost extends Post
{
  public PostStatus: PostStatusEnum;

  constructor(PostTitle: string,
              PostLocation: string,
              PostCondition: PostConditionEnum,
              PostDescription: string,
              PostTag: TagEnum,
              PostPictures: string[],
              PostContactEmail: string,
              PostContactPhone: string,
              PostStatus: PostStatusEnum,
              PostId: Number=-1)
  {
              super(PostTitle, PostLocation, PostCondition, PostDescription, PostTag, PostPictures, PostContactEmail, PostContactPhone, PostId);
              this.PostStatus = PostStatus;
  }
}
