import { PostConditionEnum } from "../enums/PostConditionEnum";
import { TagEnum } from "../enums/TagEnum";

export class Post{
  public PostId: Number;
  public PostTitle: string;
  public PostLocation: string;
  public PostCondition: PostConditionEnum;
  public PostDescription: string;
  public PostTag: TagEnum;
  public PostPictures: string[];
  public PostContactEmail: string;
  public PostContactPhone: string;

  constructor(PostTitle: string,
              PostLocation: string,
              PostCondition: PostConditionEnum,
              PostDescription: string,
              PostTag: TagEnum,
              PostPictures: string[],
              PostContactEmail: string,
              PostContactPhone: string,
              PostId: Number = -1)
  {
                this.PostTitle = PostTitle;
                this.PostLocation = PostLocation;
                this.PostCondition = PostCondition;
                this.PostDescription = PostDescription;
                this.PostTag = PostTag;
                this.PostPictures = PostPictures;
                this.PostContactEmail = PostContactEmail;
                this.PostContactPhone = PostContactPhone;
                this.PostId = PostId;
  }
}
