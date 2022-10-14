import { PostConditionEnum } from "../enums/PostConditionEnum";
import { PostStatusEnum } from "../enums/PostStatusEnum";
import { PostTagEnum } from "../enums/PostTagEnum";

export class Post{
  public Id: Number;
  public Title: string;
  public Location: string;
  public Condition: PostConditionEnum;
  public Description: string;
  public Tag: PostTagEnum;
  public Pictures: string[];
  public ContactEmail: string;
  public ContactPhone: string;
  public Status: PostStatusEnum;

  constructor(PostTitle: string,
              PostLocation: string,
              PostCondition: PostConditionEnum,
              PostDescription: string,
              PostTag: PostTagEnum,
              PostPictures: string[],
              PostContactEmail: string,
              PostContactPhone: string,
              PostId: Number = -1,
              PostStatus: PostStatusEnum)
  {
                this.Title = PostTitle;
                this.Location = PostLocation;
                this.Condition = PostCondition;
                this.Description = PostDescription;
                this.Tag = PostTag;
                this.Pictures = PostPictures;
                this.ContactEmail = PostContactEmail;
                this.ContactPhone = PostContactPhone;
                this.Id = PostId;
                this.Status = PostStatus;
  }
}
