import { PostConditionEnum } from "../enums/PostConditionEnum";
import { TagEnum } from "../enums/TagEnum";

export class Post{
  public PostTitle: string;
  public PostLocation: string;
  public PostCondition: PostConditionEnum;
  public PostDescription: string;
  public PostTags: TagEnum[];
  public PostPictures: string[];
  public PostContactEmail: string;
  public PostContactPhone: string;

  constructor(PostTitle: string,
              PostLocation: string,
              PostCondition: PostConditionEnum,
              PostDescription: string,
              PostTags: TagEnum[],
              PostPictures: string[],
              PostContactEmail: string,
              PostContactPhone: string)
  {
                this.PostTitle = PostTitle;
                this.PostLocation = PostLocation;
                this.PostCondition = PostCondition;
                this.PostDescription = PostDescription;
                this.PostTags = PostTags;
                this.PostPictures = PostPictures;
                this.PostContactEmail = PostContactEmail;
                this.PostContactPhone = PostContactPhone;
  }
}
