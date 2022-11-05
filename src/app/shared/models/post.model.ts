import { PostConditionEnum } from "../enums/PostConditionEnum";
import { PostStatusEnum } from "../enums/PostStatusEnum";
import { PostTagEnum } from "../enums/PostTagEnum";

export class Post{
  public id: Number;
  public title: string;
  public location: string;
  public condition: PostConditionEnum;
  public description: string;
  public tag: PostTagEnum;
  public pictures: string[];
  public contactEmail: string;
  public contactPhone: string;
  public status: PostStatusEnum;
  public lastUpdatedOn: string;

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
                this.title = PostTitle;
                this.location = PostLocation;
                this.condition = PostCondition;
                this.description = PostDescription;
                this.tag = PostTag;
                this.pictures = PostPictures;
                this.contactEmail = PostContactEmail;
                this.contactPhone = PostContactPhone;
                this.id = PostId;
                this.status = PostStatus;
  }
}
