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
              PostTags: TagEnum[],
              PostPictures: string[],
              PostContactEmail: string,
              PostContactPhone: string,
              PostStatus: PostStatusEnum)
  {
              super(PostTitle, PostLocation, PostCondition, PostDescription, PostTags, PostPictures, PostContactEmail, PostContactPhone);
              this.PostStatus = PostStatus;
  }
}
