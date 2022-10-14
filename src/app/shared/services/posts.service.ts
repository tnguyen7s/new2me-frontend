import { Injectable } from "@angular/core";
import { PostStatusEnum } from "../enums/PostStatusEnum";
import { Post } from "../models/post.model";

@Injectable({
  providedIn: 'root'
})
export class PostService{
  private homePosts: Post[] = [
    new Post('Chair', '534 South High Noon St.Smithtown, NY 11787', 0,'', 0, ['https://grandrapidschair.com/wp-content/uploads/2016/01/250_Brady_Graphite_Honey-1.jpg'], 'joe@gmail.com', '123-345-677', 1, PostStatusEnum.Active),
    new Post('Desk', '26 Courtland St.Starkville, MS 39759', 0,'', 0, ['https://www.ikea.com/us/en/images/products/malm-desk-black-brown__0735973_pe740307_s5.jpg'], '', '', 2, PostStatusEnum.Active),
    new Post('Mattress', '748 Henry Rd.Enfield, CT 06082', 1,'', 0, ['https://www.ikea.com/us/en/images/products/vadsoe-spring-mattress-firm-light-blue__1077761_pe856998_s5.jpg?f=s'], 'alicia@gmail.com', '285-293-295', 3, PostStatusEnum.Active),
    new Post('Table', '301 A, North Pacific street, Cape Girardeau, MO, 63701', 2,'', 0, ['https://www.ikea.com/us/en/images/products/lisabo-table-black__0737106_pe740884_s5.jpg?f=s'], 'martina@gmail.com', '475-184-292', 4, PostStatusEnum.Active),
    new Post('Laptop HP core i5', '945 N. Cardinal St.Clinton Township, MI 48035', -1,'', 2, ['https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c06596684.png?imwidth=270&imdensity=1'], 'martina@gmail.com', '248-194-100', 5, PostStatusEnum.Active),
    new Post('Iphone 5', '62 Meadowbrook Drive Lombard, IL 60148', 3,'', 2, ['https://www.cnet.com/a/img/resize/db344054f386607439c1db48a5df7338178ffb63/hub/2012/09/18/7f292436-8ae8-11e2-9400-029118418759/fl_LordVoldemort.jpg?auto=webp&fit=cover&height=482&width=856'], 'adele@gmail.com', '472-392-100', 6, PostStatusEnum.Active),
    new Post('Lamp', '92 St Paul Ave.Niceville, FL 32578', 1,'', 2, ['http://mobileimages.lowes.com/productimages/c977e7ca-855b-4662-86a9-cf898abbb5d2/04117171.jpg'], 'joe@gmail.com', '482-591-184', 7, PostStatusEnum.Active),
    new Post('Shirt', 'Pittsburgh, PA 15206', 3,'', 1, ['https://moodle.com/wp-content/uploads/2021/06/22089-1.jpg'], 'alicia@gmail.com', '475-195-294', 8, PostStatusEnum.Active),
    new Post('Jeans', '174 Newcastle St.Stafford, VA 22554', 3,'', 1, ['https://media.gq.com/photos/60da183718480638c840cc4d/master/w_1280%2Cc_limit/Carhartt-relaxed-fit-tapered-leg-jean.jpg'], 'martina@gmail.com', '475-184-292', 9, PostStatusEnum.Active),
    new Post('Iphone 5', '8211 E. Franklin Ave West Deptford, NJ 08096', 2,'', 2, ['https://www.cnet.com/a/img/resize/db344054f386607439c1db48a5df7338178ffb63/hub/2012/09/18/7f292436-8ae8-11e2-9400-029118418759/fl_LordVoldemort.jpg?auto=webp&fit=cover&height=482&width=856'], 'adele@gmail.com', '472-392-100', 10, PostStatusEnum.Active),

  ];

  private userCreatedPosts: Post[] = [];

  constructor(){
  }

  /**
   * 1. create a Post object
   * 2. send the post to back end to save
   */
  public publishPost(post: Post){
    const newPost = post;

    // send the post to back end
    console.log('send post to backend', newPost);

    // TODO: delete the following steps later
    this.userCreatedPosts.push(newPost);
    this.homePosts.push(newPost);
  }


  /**
   * 1. return active posts
   */
  public getHomePosts(){
    return this.homePosts.slice();
  }

  /**
   * 1. return post given its index
   */
  public getPostByIndex(idx): Post{
    if (+idx<this.homePosts.length){
      return this.homePosts[+idx];
    }
    else
    {
      return null;
    }
  }
}
